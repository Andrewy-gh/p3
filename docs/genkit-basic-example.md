```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/firebase/genkit/go/ai"
	"github.com/firebase/genkit/go/genkit"
	"github.com/firebase/genkit/go/plugins/googlegenai"
	"github.com/firebase/genkit/go/plugins/server"
)

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

// WorkoutExercise represents a single exercise in a workout plan
type WorkoutExercise struct {
	Name        string `json:"name" jsonschema:"description=Name of the exercise"`
	Sets        int    `json:"sets" jsonschema:"description=Number of sets to perform"`
	Reps        int    `json:"reps" jsonschema:"description=Number of repetitions per set"`
	RestSeconds int    `json:"restSeconds" jsonschema:"description=Rest time between sets in seconds"`
	Notes       string `json:"notes,omitempty" jsonschema:"description=Optional notes or tips for the exercise"`
}

// WorkoutOutput represents a complete workout plan
type WorkoutOutput struct {
	Title       string            `json:"title" jsonschema:"description=Title of the workout plan"`
	Description string            `json:"description" jsonschema:"description=Brief description of the workout"`
	Exercises   []WorkoutExercise `json:"exercises" jsonschema:"description=List of exercises in the workout"`
	Duration    int               `json:"duration" jsonschema:"description=Estimated duration in minutes"`
}

// ChatResponse represents the response from the chat flow with metadata
type ChatResponse struct {
	Text          string `json:"text" jsonschema:"description=The AI-generated response text"`
	HasToolOutput bool   `json:"hasToolOutput" jsonschema:"description=Flag indicating if a tool was called"`
	ToolName      string `json:"toolName,omitempty" jsonschema:"description=Name of the tool that was called (optional)"`
}

// getWorkoutTypeTitle returns a formatted title for the workout type
func getWorkoutTypeTitle(workoutType string) string {
	if workoutType == "" {
		return "General Fitness"
	}
	// Capitalize first letter
	return strings.ToUpper(workoutType[:1]) + workoutType[1:]
}

// generateExercises creates a list of exercises based on workout type
func generateExercises(count int, workoutType string) []WorkoutExercise {
	// Exercise database organized by type
	strengthExercises := []WorkoutExercise{
		{Name: "Push-ups", Sets: 3, Reps: 12, RestSeconds: 60, Notes: "Keep your core tight and back straight"},
		{Name: "Squats", Sets: 3, Reps: 15, RestSeconds: 60, Notes: "Keep your knees behind your toes"},
		{Name: "Dumbbell Rows", Sets: 3, Reps: 10, RestSeconds: 60, Notes: "Pull with your back, not your arms"},
		{Name: "Lunges", Sets: 3, Reps: 12, RestSeconds: 60, Notes: "Alternate legs, keep your torso upright"},
		{Name: "Plank", Sets: 3, Reps: 1, RestSeconds: 45, Notes: "Hold for 30-60 seconds"},
		{Name: "Shoulder Press", Sets: 3, Reps: 10, RestSeconds: 60, Notes: "Press straight overhead"},
		{Name: "Deadlifts", Sets: 3, Reps: 8, RestSeconds: 90, Notes: "Keep your back straight, hinge at hips"},
	}

	cardioExercises := []WorkoutExercise{
		{Name: "Jumping Jacks", Sets: 3, Reps: 30, RestSeconds: 30, Notes: "Full range of motion"},
		{Name: "High Knees", Sets: 3, Reps: 40, RestSeconds: 30, Notes: "Drive knees up to waist level"},
		{Name: "Burpees", Sets: 3, Reps: 10, RestSeconds: 45, Notes: "Full push-up at bottom"},
		{Name: "Mountain Climbers", Sets: 3, Reps: 20, RestSeconds: 30, Notes: "Keep hips level"},
		{Name: "Jump Rope", Sets: 3, Reps: 50, RestSeconds: 30, Notes: "Stay on the balls of your feet"},
		{Name: "Running in Place", Sets: 3, Reps: 60, RestSeconds: 30, Notes: "Maintain a steady pace"},
	}

	flexibilityExercises := []WorkoutExercise{
		{Name: "Hamstring Stretch", Sets: 2, Reps: 1, RestSeconds: 15, Notes: "Hold for 30 seconds each leg"},
		{Name: "Quad Stretch", Sets: 2, Reps: 1, RestSeconds: 15, Notes: "Hold for 30 seconds each leg"},
		{Name: "Shoulder Stretch", Sets: 2, Reps: 1, RestSeconds: 15, Notes: "Hold for 20 seconds each arm"},
		{Name: "Cat-Cow Stretch", Sets: 2, Reps: 10, RestSeconds: 20, Notes: "Slow and controlled movements"},
		{Name: "Child's Pose", Sets: 2, Reps: 1, RestSeconds: 15, Notes: "Hold for 45 seconds"},
	}

	// Select exercise pool based on workout type
	var exercisePool []WorkoutExercise
	switch strings.ToLower(workoutType) {
	case "strength":
		exercisePool = strengthExercises
	case "cardio":
		exercisePool = cardioExercises
	case "flexibility":
		exercisePool = flexibilityExercises
	case "full-body", "":
		// Mix of all types
		exercisePool = append(strengthExercises[:3], cardioExercises[:2]...)
		exercisePool = append(exercisePool, flexibilityExercises[:1]...)
	default:
		// Default to strength exercises
		exercisePool = strengthExercises
	}

	// Return requested number of exercises (or all if count is larger than pool)
	if count > len(exercisePool) {
		count = len(exercisePool)
	}
	return exercisePool[:count]
}

func main() {
	ctx := context.Background()

	// Initialize Genkit with the Google AI plugin
	g := genkit.Init(ctx,
		genkit.WithPlugins(&googlegenai.GoogleAI{}),
		genkit.WithDefaultModel("googleai/gemini-2.5-flash"),
	)

	log.Println("Genkit initialized successfully")
	log.Printf("Default model: %s", "googleai/gemini-2.5-flash")

	// Define the workout generator tool
	workoutGeneratorTool := genkit.DefineTool(
		g, "generateWorkout", "Generates a personalized workout plan based on user preferences",
		func(ctx *ai.ToolContext, input struct {
			NumExercises int    `json:"numExercises" jsonschema:"description=Number of exercises in the workout (default: 5)"`
			WorkoutType  string `json:"workoutType,omitempty" jsonschema:"description=Optional type of workout (e.g., strength, cardio, flexibility, full-body)"`
		}) (*WorkoutOutput, error) {
			log.Printf("Generating workout with %d exercises, type: %s", input.NumExercises, input.WorkoutType)

			// Validate input: Check for reasonable upper limit
			if input.NumExercises > 20 {
				log.Printf("Error: NumExercises %d exceeds maximum of 20", input.NumExercises)
				return nil, fmt.Errorf("number of exercises cannot exceed 20 (requested: %d)", input.NumExercises)
			}

			// Validate input: Check for negative values
			if input.NumExercises < 0 {
				log.Printf("Error: NumExercises %d is negative", input.NumExercises)
				return nil, fmt.Errorf("number of exercises cannot be negative (requested: %d)", input.NumExercises)
			}

			// Set default number of exercises
			numExercises := input.NumExercises
			if numExercises == 0 {
				numExercises = 5
				log.Printf("Using default value of %d exercises", numExercises)
			}

			// Validate workout type if provided
			validTypes := map[string]bool{
				"strength":    true,
				"cardio":      true,
				"flexibility": true,
				"full-body":   true,
				"":            true, // Empty is valid (defaults to full-body)
			}

			workoutType := strings.ToLower(strings.TrimSpace(input.WorkoutType))
			if !validTypes[workoutType] {
				log.Printf("Warning: Unknown workout type '%s', defaulting to full-body", input.WorkoutType)
				workoutType = "full-body"
			}

			// Generate exercises
			exercises := generateExercises(numExercises, workoutType)
			if len(exercises) == 0 {
				log.Printf("Error: Failed to generate exercises")
				return nil, fmt.Errorf("failed to generate exercises for workout type: %s", workoutType)
			}

			// Generate a workout plan
			workout := &WorkoutOutput{
				Title:       fmt.Sprintf("%s Workout Plan", getWorkoutTypeTitle(workoutType)),
				Description: fmt.Sprintf("A personalized %s workout with %d exercises", workoutType, len(exercises)),
				Duration:    len(exercises) * 8, // Estimate 8 minutes per exercise
				Exercises:   exercises,
			}

			log.Printf("Successfully generated workout with %d exercises", len(exercises))
			return workout, nil
		})

	log.Printf("Workout generator tool defined: %s", workoutGeneratorTool.Name())

	// Define the chat flow with multi-turn conversation support
	chatFlow := genkit.DefineFlow(g, "chatFlow", func(ctx context.Context, input *ChatInput) (*ChatResponse, error) {
		// Validate input
		if input == nil {
			log.Printf("Error: Received nil input")
			return nil, fmt.Errorf("input cannot be nil")
		}

		if strings.TrimSpace(input.Message) == "" {
			log.Printf("Error: Received empty message")
			return nil, fmt.Errorf("message cannot be empty")
		}

		// Build the prompt with conversation history
		var promptBuilder strings.Builder

		// System prompt to guide the AI as a workout assistant
		promptBuilder.WriteString("You are a helpful AI workout assistant. Help users with fitness questions and generate personalized workout plans when requested.\n\n")

		// Add conversation history if present
		if len(input.ConversationHistory) > 0 {
			promptBuilder.WriteString("Conversation history:\n")
			for _, msg := range input.ConversationHistory {
				promptBuilder.WriteString(fmt.Sprintf("%s: %s\n", msg.Role, msg.Content))
			}
			promptBuilder.WriteString("\n")
		}

		// Add current user message
		promptBuilder.WriteString(fmt.Sprintf("User: %s\n", input.Message))
		promptBuilder.WriteString("Assistant:")

		prompt := promptBuilder.String()

		// Generate response using the AI model with workout generator tool
		log.Printf("Generating response for message: %s", input.Message)
		resp, err := genkit.Generate(ctx, g,
			ai.WithPrompt(prompt),
			ai.WithTools(workoutGeneratorTool),
			ai.WithStreaming(func(ctx context.Context, chunk *ai.ModelResponseChunk) error {
				// Log streaming chunks for debugging
				text := chunk.Text()
				if text != "" {
					log.Printf("Received chunk: %s", text)
				}
				return nil
			}),
		)
		if err != nil {
			log.Printf("Error: Failed to generate response: %v", err)
			return nil, fmt.Errorf("failed to generate response: %w", err)
		}

		// Validate response
		responseText := resp.Text()
		if responseText == "" {
			log.Printf("Warning: Generated response is empty")
			return &ChatResponse{
				Text:          "I apologize, but I couldn't generate a proper response. Please try again.",
				HasToolOutput: false,
				ToolName:      "",
			}, nil
		}

		// Detect if tools were called by checking the message history
		// When Genkit automatically executes tools (default behavior), they appear in the history
		var hasToolOutput bool
		var toolName string
		var toolCallCount int
		var allToolNames []string

		// Check the conversation history for tool responses
		history := resp.History()
		for _, msg := range history {
			if msg.Role == ai.RoleTool {
				// Found a tool response in the history
				hasToolOutput = true
				// Extract tool name from the tool response parts
				for _, part := range msg.Content {
					if part.IsToolResponse() {
						toolResp := part.ToolResponse
						if toolResp != nil && toolResp.Name != "" {
							toolCallCount++
							allToolNames = append(allToolNames, toolResp.Name)
							// Use the first tool for metadata
							if toolName == "" {
								toolName = toolResp.Name
								log.Printf("Tool called: %s", toolName)
							}
						}
					}
				}
			}
		}

		// Log warning if multiple tools were called
		if toolCallCount > 1 {
			log.Printf("Warning: Multiple tools called (%d total): %v. Using first tool '%s' for metadata.",
				toolCallCount, allToolNames, toolName)
		}

		if !hasToolOutput {
			log.Printf("No tool called, conversational response")
		}

		log.Printf("Successfully generated response (length: %d chars, tool used: %v)", len(responseText), hasToolOutput)
		return &ChatResponse{
			Text:          responseText,
			HasToolOutput: hasToolOutput,
			ToolName:      toolName,
		}, nil
	})

	log.Println("Chat flow defined successfully")

	// Set up HTTP server to serve the flow
	// Note: genkit.Handler automatically supports both streaming and non-streaming requests.
	// Clients can use streamFlow() for streaming responses or runFlow() for complete responses.
	mux := http.NewServeMux()
	mux.HandleFunc("POST /chatFlow", genkit.Handler(chatFlow))

	log.Println("Starting server on http://localhost:3400")
	log.Println("Chat flow available at: POST http://localhost:3400/chatFlow")
	log.Fatal(server.Start(ctx, "127.0.0.1:3400", mux))
}
```