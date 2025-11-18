# Task List: Genkit-Based Chat Server (Proof of Concept)

Generated from: `0001-prd-genkit-chat-server.md`

## Relevant Files

- `genkit-server/main.go` - Main entry point for the Genkit Go server (✅ Complete)
- `genkit-server/go.mod` - Go module dependencies (✅ Complete)
- `genkit-server/go.sum` - Go dependency checksums (✅ Complete)
- `genkit-server/.env.local` - Environment configuration (GOOGLE_GENERATIVE_AI_API_KEY) (✅ Complete)
- `genkit-server/README.md` - Documentation for running and testing the Genkit server (✅ Complete)
- `backend/src/routes/playground.ts` - Reference implementation of v2 endpoint (existing)
- `backend/src/tools.ts` - Reference tool implementations (existing)
- `backend/src/prompts.ts` - System prompts to replicate (existing)
- `docs/genkit-basic-example.md` - Basic Genkit example reference (existing)

### Notes

- The Genkit server will run on port 3400 (separate from the existing backend on port 3000)
- No frontend integration is required for this POC
- Testing will be done via HTTP clients (curl, Postman) or Genkit Developer UI
- Focus on feature parity with the `/api/playground/v2` endpoint

## Tasks

- [x] 1.0 Set up Go project structure and Genkit dependencies
  - [x] 1.1 Create genkit-server directory and initialize Go module with `go mod init`
  - [x] 1.2 Install Genkit Go SDK dependencies: `github.com/firebase/genkit/go/genkit`, `github.com/firebase/genkit/go/ai`, `github.com/firebase/genkit/go/plugins/googlegenai`
  - [x] 1.3 Create `.env.local` file with `GOOGLE_GENERATIVE_AI_API_KEY` (use same key as backend)
  - [x] 1.4 Set up basic server structure in `main.go` with Genkit initialization and HTTP server on port 3400

- [x] 2.0 Implement the generateWorkout tool with proper schema and validation
  - [x] 2.1 Define Go structs for workout tool input schema matching the PRD requirements (fitnessLevel, fitnessGoal, equipment, sessionDuration, workoutFocus, spaceConstraints, injuries)
  - [x] 2.2 Define Go structs for workout output schema (WorkoutOutput with exercises, notes, workoutFocus)
  - [x] 2.3 Implement the generateWorkout tool using `genkit.DefineTool` with proper JSON schema tags
  - [x] 2.4 Add input validation logic (check for required fields, reasonable values)
  - [x] 2.5 Implement workout generation logic using AI model (similar to the approach in `backend/src/tools.ts` lines 72-106)
  - [x] 2.6 Port the WORKOUT_GENERATION_PROMPT from `backend/src/prompts.ts` to Go

- [x] 3.0 Implement the chat flow with conversation history and system prompt
  - [x] 3.1 Define ChatInput struct with message string and conversationHistory array (matching request schema from PRD)
  - [x] 3.2 Define ChatResponse struct with text, hasToolOutput, and toolName fields (matching response schema from PRD)
  - [x] 3.3 Define Message struct for conversation history with role and content fields
  - [x] 3.4 Port the CHAT_AGENT_PROMPT from `backend/src/prompts.ts` (lines 3-80) to Go as a string constant
  - [x] 3.5 Implement the chatFlow using `genkit.DefineFlow` with ChatInput and ChatResponse types
  - [x] 3.6 Add conversation history parsing logic to build the full prompt with history
  - [x] 3.7 Configure the flow to use Gemini 2.0 Flash model (`googleai/gemini-2.0-flash`)
  - [x] 3.8 Register the generateWorkout tool with the chat flow using `ai.WithTools()`
  - [x] 3.9 Add logic to detect tool usage in the response and populate hasToolOutput/toolName fields

- [x] 4.0 Implement rate limiting (10 requests per minute per client)
  - [x] 4.1 Research rate limiting approaches for Genkit Go (check if Genkit has built-in support or if custom middleware is needed)
  - [x] 4.2 Implement client identification logic to extract IP from headers (x-forwarded-for, x-real-ip, or connection IP as fallback)
  - [x] 4.3 Create a rate limiter data structure to track request timestamps per client (using a map or third-party library like `golang.org/x/time/rate`)
  - [x] 4.4 Implement rate limiting logic with 60-second sliding window and 10 request limit
  - [x] 4.5 Wrap the chatFlow HTTP handler with rate limiting middleware
  - [x] 4.6 Return HTTP 429 (Too Many Requests) status with appropriate error message when limit is exceeded

- [x] 5.0 Implement step/iteration limiting (max 10 tool-calling iterations)
  - [x] 5.1 Research Genkit Go's documentation to find if there's a built-in `maxTurns` or similar parameter in `genkit.Generate()`
  - [x] 5.2 If no built-in support: implement manual iteration counting using `ai.WithReturnToolRequests(true)` to handle tool calls explicitly
  - [x] 5.3 Add a loop counter in the flow logic to track the number of tool-calling iterations
  - [x] 5.4 Break the tool-calling loop after 10 iterations and return the current AI response
  - [x] 5.5 Add logging to track when step limit is reached for debugging purposes

- [x] 6.0 Add streaming response support
  - [x] 6.1 Verify that `genkit.Handler()` automatically supports streaming (according to the example in `docs/genkit-basic-example.md`)
  - [x] 6.2 Add streaming callback using `ai.WithStreaming()` to log chunks during generation (optional for debugging)
  - [x] 6.3 Test the `/chatFlow` endpoint with a streaming HTTP client to verify progressive response delivery
  - [x] 6.4 Verify that tool calls and tool results are properly included in the streamed response

- [x] 7.0 Testing, documentation, and POC evaluation
  - [x] 7.1 Test basic chat functionality: send a simple fitness question and verify AI response
  - [x] 7.2 Test workout generation: send a prompt requesting a workout plan and verify the generateWorkout tool is called
  - [x] 7.3 Test conversation history: send multiple messages and verify context is maintained across turns
  - [x] 7.4 Test rate limiting: write a script to send >10 requests in 60 seconds and verify HTTP 429 is returned
  - [x] 7.5 Test step limiting: craft a scenario that triggers multiple tool calls and verify it stops at 10 iterations
  - [x] 7.6 Test streaming: verify partial responses are delivered progressively using curl or a streaming client
  - [x] 7.7 Test error handling: send invalid inputs and verify appropriate error responses
  - [x] 7.8 Create README.md with setup instructions (Go installation, dependency installation, environment setup)
  - [x] 7.9 Add testing commands to README.md (example curl commands, how to use Genkit Dev UI)
  - [x] 7.10 Document POC findings: developer experience, feature completeness comparison with v2 endpoint, performance observations, Genkit limitations discovered, and migration feasibility recommendation
