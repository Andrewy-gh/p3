package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

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

// validateWorkoutInput validates the workout tool input (Task 2.4)
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

// generateWorkoutWithAI generates a workout plan using the AI model (Task 2.5)
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
	apiKey := os.Getenv("GOOGLE_GENERATIVE_AI_API_KEY")
	if apiKey == "" {
		log.Fatal("GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set")
	}

	// Initialize Genkit with the Google AI plugin
	g := genkit.Init(ctx,
		genkit.WithPlugins(&googlegenai.GoogleAI{}),
		genkit.WithDefaultModel("googleai/gemini-2.0-flash"),
	)

	log.Println("Genkit initialized successfully")
	log.Printf("Default model: %s", "googleai/gemini-2.0-flash")

	// Define the generateWorkout tool (Task 2.0)
	genkit.DefineTool(
		g, "generateWorkout",
		"Creates and displays a personalized workout plan. Call this when you have: fitness level, goal, equipment, session duration, workout focus, space/location, and injury status. This displays the workout to the user.",
		func(ctx *ai.ToolContext, input WorkoutToolInput) (*WorkoutOutput, error) {
			// Task 2.4: Input validation
			if err := validateWorkoutInput(input); err != nil {
				return nil, err
			}

			// Task 2.5: Generate workout using AI model
			return generateWorkoutWithAI(ctx, g, input)
		},
	)

	log.Println("generateWorkout tool defined successfully")

	// TODO: Define chatFlow with conversation history (Task 3.0)

	// Set up HTTP server
	mux := http.NewServeMux()

	// Health check endpoint
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok","service":"genkit-chat-server"}`)
	})

	// TODO: Add chatFlow endpoint (Task 3.0)
	// mux.HandleFunc("POST /chatFlow", genkit.Handler(chatFlow))

	log.Println("Starting server on http://localhost:3400")
	log.Println("Health check available at: GET http://localhost:3400/health")
	log.Println("Chat flow will be available at: POST http://localhost:3400/chatFlow")

	if err := server.Start(ctx, "127.0.0.1:3400", mux); err != nil {
		log.Fatal(err)
	}

	// Keep g in scope to avoid unused variable error
	_ = g
}
