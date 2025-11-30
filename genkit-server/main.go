package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/firebase/genkit/go/ai"
	"github.com/firebase/genkit/go/genkit"
	"github.com/firebase/genkit/go/plugins/googlegenai"
	"github.com/firebase/genkit/go/plugins/server"
)

// WorkoutToolInput defines the input schema for the generateWorkout tool
type WorkoutToolInput struct {
	FitnessLevel     string `json:"fitnessLevel" jsonschema:"description=The fitness level (beginner, intermediate, advanced)"`
	FitnessGoal      string `json:"fitnessGoal" jsonschema:"description=Primary fitness goal (strength, hypertrophy, endurance, power, general fitness)"`
	Equipment        string `json:"equipment" jsonschema:"description=Available equipment (bodyweight, dumbbells, barbell+rack, machines, cables, bands, etc.)"`
	SessionDuration  int    `json:"sessionDuration" jsonschema:"description=Available workout time in minutes"`
	WorkoutFocus     string `json:"workoutFocus" jsonschema:"description=Workout focus (push/pull/legs, full body, specific muscle groups, etc.)"`
	SpaceConstraints string `json:"spaceConstraints" jsonschema:"description=Space/location constraints (home, gym, hotel room, outdoor, etc.)"`
	Injuries         string `json:"injuries,omitempty" jsonschema:"description=Any current injuries or pain to work around"`
}

// WorkoutSet defines a single set in an exercise
type WorkoutSet struct {
	Reps    int     `json:"reps" jsonschema:"description=Number of repetitions"`
	SetType string  `json:"setType" jsonschema:"enum=warmup,enum=working,description=Type of set (warmup or working)"`
	Weight  float64 `json:"weight,omitempty" jsonschema:"description=Weight in pounds or kilograms (optional)"`
}

// WorkoutExercise defines an exercise with its sets
type WorkoutExercise struct {
	Name string       `json:"name" jsonschema:"description=Name of the exercise"`
	Sets []WorkoutSet `json:"sets" jsonschema:"description=List of sets for this exercise"`
}

// WorkoutOutput defines the complete workout plan output
type WorkoutOutput struct {
	Exercises    []WorkoutExercise `json:"exercises" jsonschema:"description=List of exercises in the workout"`
	Notes        string            `json:"notes,omitempty" jsonschema:"description=Additional notes or instructions for the workout"`
	WorkoutFocus string            `json:"workoutFocus,omitempty" jsonschema:"description=The focus area of this workout (e.g., push, pull, legs, full body)"`
}

// Message represents a single message in the conversation history
type Message struct {
	Role    string `json:"role" jsonschema:"description=Role of the message sender (user or model)"`
	Content string `json:"content" jsonschema:"description=Content of the message"`
}

// ChatInput defines the input schema for the chat flow
type ChatInput struct {
	Message             string    `json:"message" jsonschema:"description=User's current message"`
	ConversationHistory []Message `json:"conversationHistory,omitempty" jsonschema:"description=Previous messages in the conversation"`
}

// ChatResponse defines the response schema for the chat flow
type ChatResponse struct {
	Text           string      `json:"text" jsonschema:"description=The AI-generated response text"`
	HasToolOutput  bool        `json:"hasToolOutput" jsonschema:"description=Flag indicating if a tool was called"`
	ToolName       string      `json:"toolName,omitempty" jsonschema:"description=Name of the tool that was called (if any)"`
	ToolOutputData interface{} `json:"toolOutputData,omitempty" jsonschema:"description=Structured output from the tool (if any)"`
}

// RateLimiter implements a simple rate limiter with sliding window
type RateLimiter struct {
	mu      sync.Mutex
	clients map[string][]time.Time
	limit   int
	window  time.Duration
}

// NewRateLimiter creates a new rate limiter
func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	return &RateLimiter{
		clients: make(map[string][]time.Time),
		limit:   limit,
		window:  window,
	}
}

// Allow checks if a request from the given client should be allowed
func (rl *RateLimiter) Allow(clientID string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-rl.window)

	// Get or create client's request history
	requests, exists := rl.clients[clientID]
	if !exists {
		requests = []time.Time{}
	}

	// Remove requests outside the time window
	validRequests := []time.Time{}
	for _, reqTime := range requests {
		if reqTime.After(cutoff) {
			validRequests = append(validRequests, reqTime)
		}
	}

	// Check if limit is exceeded
	if len(validRequests) >= rl.limit {
		rl.clients[clientID] = validRequests
		return false
	}

	// Add current request and update
	validRequests = append(validRequests, now)
	rl.clients[clientID] = validRequests
	return true
}

// getClientIP extracts the client IP from the request
func getClientIP(r *http.Request) string {
	// Check X-Forwarded-For header first
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// X-Forwarded-For can contain multiple IPs, take the first one
		ips := strings.Split(xff, ",")
		if len(ips) > 0 {
			return strings.TrimSpace(ips[0])
		}
	}

	// Check X-Real-IP header
	if xri := r.Header.Get("X-Real-IP"); xri != "" {
		return strings.TrimSpace(xri)
	}

	// Fallback to RemoteAddr
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return ip
}

// rateLimitMiddleware wraps an HTTP handler with rate limiting
func rateLimitMiddleware(limiter *RateLimiter, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		clientIP := getClientIP(r)

		if !limiter.Allow(clientIP) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusTooManyRequests)
			fmt.Fprintf(w, `{"error":"Rate limit exceeded. Maximum %d requests per minute allowed."}`, limiter.limit)
			log.Printf("Rate limit exceeded for client: %s", clientIP)
			return
		}

		next(w, r)
	}
}

// CHAT_AGENT_PROMPT is the system prompt for the chat agent
const CHAT_AGENT_PROMPT = `
You are Coach Nova, an AI strength coach created by LiftLab. You help users design personalized workout plans by gathering their requirements and generating workouts using the generateWorkout tool.

## Core Behavior

You maintain an encouraging, concise coaching tone while staying strictly focused on fitness, training, and health topics. Politely deflect any non-fitness questions.

## Information Gathering

Before generating a workout, analyze the conversation history step-by-step to precisely extract the user's workout requirements. Identify what information you have and what's still missing.

**Required Fields:**
- Fitness level: beginner, intermediate, or advanced (if not stated, mark as unknown)
- Goal: strength, hypertrophy, endurance, power, or general fitness
- Focus area: push, pull, legs, chest, back, arms, shoulders, or full_body
- Equipment: bodyweight, dumbbells, barbell, machines, cables, bands
- Duration: session length in minutes
- Space: home, gym, hotel, outdoor
- Injuries: any limitations or pain (if none mentioned, assume "none")
- Primary lift PR: user's personal record for relevant lift (helps calibrate weights)

**Extraction Approach:**
1. Review the full conversation to understand context
2. Reason step-by-step about what the user has explicitly stated
3. Identify which fields are confirmed vs. still unknown
4. Ask 1-3 targeted questions to fill the most critical gaps

**Few-Shot Examples:**

Example 1 - Complete extraction:
User: "I'm a beginner and want to workout at home with no equipment"
Coach: "Perfect! How much time do you have?"
User: "About 30 minutes"
Coach: "What's your main goal - general fitness, endurance, or building strength?"
User: "General fitness"
Coach: "Great! Any injuries or areas to avoid?"
User: "No injuries"

Extracted: fitness_level=beginner, goal=general, focus=full_body, equipment=bodyweight, duration=30, space=home, injuries=none ✓ Ready to generate!

Example 2 - Partial extraction:
User: "I want to build muscle with dumbbells, 45 minutes"

Extracted: goal=hypertrophy, equipment=dumbbells, duration=45
Missing: fitness_level, focus, space, injuries
Next question: "Great goal! Are you a beginner, intermediate, or advanced? And what area would you like to focus on today?"

## Tool Usage

When you have all essential information, immediately call the generateWorkout tool. This is the ONLY way to create and display workouts.

CRITICAL: Never describe, list, or mention specific exercises in your text response. The tool displays the complete workout. Only confirm you're generating their workout.

## Examples

<example>
User: "I want to get stronger"
Coach Nova: "Great goal! To design the perfect strength plan, I need a few details:
- What equipment do you have access to?
- How much time do you have per session?
- What's your experience level?"
</example>

<example>
User: "I have a full gym, 90 minutes, intermediate level, want to focus on chest"
Coach Nova: "Perfect! Two more quick questions:
- What's your primary goal - strength, size, or endurance?
- Any injuries I should know about?"

User: "Size, no injuries"
Coach Nova: [calls generateWorkout tool immediately]
</example>

<example>
User: "The workout looks good but can I swap incline press for flat bench?"
Coach Nova: "Absolutely! What's your reasoning for the swap - preference, equipment availability, or targeting a specific area?"
</example>
`

// validateWorkoutInput validates the workout tool input
func validateWorkoutInput(input WorkoutToolInput) error {
	if input.FitnessLevel == "" {
		return fmt.Errorf("fitnessLevel is required")
	}
	if input.FitnessGoal == "" {
		return fmt.Errorf("fitnessGoal is required")
	}
	if input.Equipment == "" {
		return fmt.Errorf("equipment is required")
	}
	if input.SessionDuration <= 0 || input.SessionDuration > 300 {
		return fmt.Errorf("sessionDuration must be between 1 and 300 minutes")
	}
	if input.WorkoutFocus == "" {
		return fmt.Errorf("workoutFocus is required")
	}
	if input.SpaceConstraints == "" {
		return fmt.Errorf("spaceConstraints is required")
	}
	return nil
}

// generateWorkoutWithAI generates a workout plan using the AI model
func generateWorkoutWithAI(ctx context.Context, g *genkit.Genkit, input WorkoutToolInput) (*WorkoutOutput, error) {
	// Build user info string similar to the TypeScript implementation
	userInfo := fmt.Sprintf(`
        User Profile:
        - Fitness Level: %s
        - Primary Goal: %s
        - Available Equipment: %s
        - Session Duration: %d minutes
        - Workout Focus: %s
        - Space/Location: %s`,
		input.FitnessLevel,
		input.FitnessGoal,
		input.Equipment,
		input.SessionDuration,
		input.WorkoutFocus,
		input.SpaceConstraints,
	)

	if input.Injuries != "" {
		userInfo += fmt.Sprintf("\n        - Injuries/Pain: %s", input.Injuries)
	} else {
		userInfo += "\n        - No injuries reported"
	}

	// Generate workout using the AI model with structured output
	output, _, err := genkit.GenerateData[WorkoutOutput](ctx, g,
		ai.WithPrompt(userInfo),
		ai.WithSystem(workoutGenerationPrompt(userInfo)),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to generate workout: %w", err)
	}

	log.Printf("Successfully generated workout with %d exercises", len(output.Exercises))

	return output, nil
}

// workoutGenerationPrompt generates the system prompt for workout generation
func workoutGenerationPrompt(userInfo string) string {
	return fmt.Sprintf(`Generate a workout matching the user's requirements. Return valid JSON using the schema below.

%s

## Output Schema

{
  "exercises": [{
    "name": string,
    "sets": [{
      "reps": number,
      "setType": "warmup" | "working",
      "weight"?: number
    }]
  }],
  "notes"?: string,
  "workoutFocus"?: string
}

## Exercise Selection

**Workout Focus**: Only include exercises targeting the specified muscle group(s). Chest = only chest exercises. Legs = only leg exercises. No exceptions.

**Equipment Constraints**: Only use available equipment. Small space = no barbell/machines. No bench = floor press. No pull-up bar = rows/pulldowns. Cables only if available.

**Structure**: Compounds first, then accessories. Include 1-3 warmup sets for primary lifts. Use real exercises only.

## Programming

**Goal-Based Sets/Reps**:
- Strength: 1-6 reps, 120-180s rest
- Hypertrophy: 8-12 reps, 60-90s rest
- Endurance: 12-20+ reps, 30-60s rest
- Power: 1-6 reps, 120-180s rest

**Time**: Calculate total time (sets + rest). Stay within 110%% of duration.

**Safety**: For injuries, choose pain-free alternatives. Add brief note. No medical advice.
`, userInfo)
}

func main() {
	ctx := context.Background()

	// Load environment variables
	apiKey := os.Getenv("GOOGLE_API_KEY")
	if apiKey == "" {
		log.Fatal("GOOGLE_API_KEY environment variable is not set")
	}

	// Initialize Genkit with the Google AI plugin
	g := genkit.Init(ctx,
		genkit.WithPlugins(&googlegenai.GoogleAI{}),
		genkit.WithDefaultModel("googleai/gemini-2.0-flash"),
	)

	log.Println("Genkit initialized successfully")
	log.Printf("Default model: %s", "googleai/gemini-2.0-flash")

	// Define the generateWorkout tool
	genkit.DefineTool(
		g, "generateWorkout",
		"Creates and displays a personalized workout plan. Call this when you have: fitness level, goal, equipment, session duration, workout focus, space/location, and injury status. This displays the workout to the user.",
		func(ctx *ai.ToolContext, input WorkoutToolInput) (*WorkoutOutput, error) {
			if err := validateWorkoutInput(input); err != nil {
				return nil, err
			}

			return generateWorkoutWithAI(ctx, g, input)
		},
	)

	log.Println("generateWorkout tool defined successfully")

	// extractToolOutput extracts the structured output from tool responses in the message history
	extractToolOutput := func(history []*ai.Message, toolName string) interface{} {
		var lastOutput interface{}
		for _, msg := range history {
			if msg.Role == ai.RoleTool {
				for _, part := range msg.Content {
					if part.IsToolResponse() {
						toolResp := part.ToolResponse
						if toolResp != nil && toolResp.Name == toolName {
							lastOutput = toolResp.Output
							log.Printf("Found tool output for %s", toolName)
						}
					}
				}
			}
		}
		return lastOutput
	}

	// Define the chat flow with conversation history and system prompt
	chatFlow := genkit.DefineFlow(g, "chatFlow", func(ctx context.Context, input *ChatInput) (*ChatResponse, error) {
		// Validate input
		if input == nil {
			return nil, fmt.Errorf("input cannot be nil")
		}
		if input.Message == "" {
			return nil, fmt.Errorf("message cannot be empty")
		}

		// Build messages array with conversation history
		var messages []*ai.Message

		// Add conversation history
		for _, msg := range input.ConversationHistory {
			var role ai.Role
			if msg.Role == "user" {
				role = ai.RoleUser
			} else if msg.Role == "model" {
				role = ai.RoleModel
			} else {
				// Skip unknown roles
				continue
			}
			messages = append(messages, ai.NewUserMessage(ai.NewTextPart(msg.Content)))
			messages[len(messages)-1].Role = role
		}

		// Add current user message
		messages = append(messages, ai.NewUserMessage(ai.NewTextPart(input.Message)))

		// Generate response using Gemini 2.0 Flash with workout tool and streaming
		resp, err := genkit.Generate(ctx, g,
			ai.WithSystem(CHAT_AGENT_PROMPT),
			ai.WithMessages(messages...),
			ai.WithModelName("googleai/gemini-2.0-flash"),
			ai.WithTools(genkit.LookupTool(g, "generateWorkout")),
			ai.WithMaxTurns(10),
			ai.WithStreaming(func(ctx context.Context, chunk *ai.ModelResponseChunk) error {
				if text := chunk.Text(); text != "" {
					log.Printf("Streaming chunk: %s", text)
				}
				return nil
			}),
		)
		if err != nil {
			return nil, fmt.Errorf("failed to generate response: %w", err)
		}

		// Detect tool usage and populate hasToolOutput/toolName
		var hasToolOutput bool
		var toolName string
		var toolCallCount int

		// Check the message history for tool responses
		history := resp.History()
		for _, msg := range history {
			if msg.Role == ai.RoleTool {
				hasToolOutput = true
				toolCallCount++
				// Extract tool name from tool response
				for _, part := range msg.Content {
					if part.IsToolResponse() {
						toolResp := part.ToolResponse
						if toolResp != nil && toolResp.Name != "" {
							if toolName == "" {
								toolName = toolResp.Name
							}
							log.Printf("Tool called: %s (iteration %d)", toolResp.Name, toolCallCount)
						}
					}
				}
			}
		}

		if toolCallCount >= 10 {
			log.Printf("Warning: Maximum tool-calling iterations (10) reached for this request")
		}

		// Extract structured tool output if a tool was called
		var toolOutputData interface{}
		if hasToolOutput && toolName == "generateWorkout" {
			toolOutputData = extractToolOutput(history, toolName)
		}

		responseText := resp.Text()

		// Embed JSON in text for backward compatibility
		if toolOutputData != nil {
			workoutJSON, err := json.Marshal(toolOutputData)
			if err != nil {
				log.Printf("Warning: Failed to marshal workout data: %v", err)
			} else {
				// Append JSON to response text so existing frontend parsing works
				responseText = responseText + "\n\n" + string(workoutJSON)
				log.Printf("Appended workout JSON to response text (%d bytes)", len(workoutJSON))
			}
		}

		log.Printf("Chat response generated (hasToolOutput=%v, toolName=%s, hasToolData=%v)",
			hasToolOutput, toolName, toolOutputData != nil)

		return &ChatResponse{
			Text:           responseText,
			HasToolOutput:  hasToolOutput,
			ToolName:       toolName,
			ToolOutputData: toolOutputData,
		}, nil
	})

	log.Println("chatFlow defined successfully")

	// Create rate limiter: 10 requests per minute per client
	rateLimiter := NewRateLimiter(10, time.Minute)
	log.Println("Rate limiter initialized: 10 requests per minute per client")

	// Set up HTTP server
	mux := http.NewServeMux()

	// Register the chatFlow endpoint with rate limiting middleware
	mux.HandleFunc("POST /chatFlow", rateLimitMiddleware(rateLimiter, genkit.Handler(chatFlow)))

	// Health check endpoint
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok","service":"genkit-chat-server"}`)
	})

	log.Println("Starting server on http://localhost:3400")
	log.Println("Health check available at: GET http://localhost:3400/health")
	log.Println("Chat flow available at: POST http://localhost:3400/chatFlow")

	if err := server.Start(ctx, "127.0.0.1:3400", mux); err != nil {
		log.Fatal(err)
	}

	// Keep g in scope to avoid unused variable error
	_ = g
}
