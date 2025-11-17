package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/firebase/genkit/go/genkit"
	"github.com/firebase/genkit/go/plugins/googlegenai"
	"github.com/firebase/genkit/go/plugins/server"
)

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

	// TODO: Define tools and flows in subsequent tasks
	// - generateWorkout tool (Task 2.0)
	// - chatFlow with conversation history (Task 3.0)

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
