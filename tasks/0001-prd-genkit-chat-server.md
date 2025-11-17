# PRD: Genkit-Based Chat Server (Proof of Concept)

## Introduction/Overview

This feature creates a standalone Go-based chat server using the Genkit AI framework that replicates the functionality of the existing `/api/playground/v2` endpoint in the current Hono backend. The primary goal is to evaluate Genkit as a viable alternative framework for building AI-powered chat applications.

The current implementation uses the Vercel AI SDK with a Hono backend (TypeScript/Bun runtime), while this proof of concept will use Genkit's Go SDK to implement the same functionality as a standalone service. This will allow us to assess Genkit's capabilities, developer experience, and suitability for potential future migration.

## Goals

1. **Demonstrate Feature Parity**: Successfully replicate all core features of the `/api/playground/v2` endpoint using Genkit Go SDK
2. **Evaluate Genkit Viability**: Assess whether Genkit can serve as a production-ready alternative to the current AI SDK implementation
3. **Validate Architecture**: Prove that a standalone Genkit service can integrate seamlessly with the existing application
4. **Document Findings**: Gather insights about Genkit's strengths, limitations, and developer experience for future decision-making

## User Stories

1. **As a developer**, I want to send chat messages to the Genkit server and receive AI-generated responses, so that I can test the basic chat functionality.

2. **As a developer**, I want the AI to use the workout generation tool when requested, so that I can verify tool-calling works correctly in Genkit.

3. **As a developer**, I want the server to maintain conversation history across multiple messages, so that the AI can provide contextual responses.

4. **As a developer**, I want to receive streaming responses from the AI, so that I can display partial results to users in real-time.

5. **As a developer**, I want the server to enforce rate limiting, so that I can prevent API quota exhaustion.

6. **As a developer**, I want to limit the number of tool-calling iterations, so that I can prevent runaway costs and ensure predictable behavior.

7. **As a developer**, I want to view traces and observability data (optional), so that I can debug issues and monitor performance.

## Functional Requirements

### Core Chat Functionality

1. The system must accept HTTP POST requests containing a chat message and optional conversation history.
2. The system must use the Google Gemini 2.0 Flash model (via Genkit's Google AI plugin) for generating responses.
3. The system must apply the fitness assistant system prompt (CHAT_AGENT_PROMPT) to guide AI behavior.
4. The system must return AI-generated responses to the client.
5. The system must support multi-turn conversations by accepting and processing conversation history.

### Tool Calling

6. The system must provide a `generateWorkout` tool that the AI can invoke when users request workout plans.
7. The `generateWorkout` tool must accept parameters for:
   - Number of exercises (integer)
   - Workout type (string, e.g., "strength", "cardio", "flexibility")
8. The `generateWorkout` tool must return structured workout data including:
   - Workout title
   - Description
   - List of exercises with sets, reps, rest times, and notes
   - Estimated duration
9. The system must automatically handle the tool-calling loop (AI requests tool → server executes tool → AI incorporates result).

### Iteration/Step Limiting

10. The system must limit the maximum number of tool-calling iterations to 10 steps.
11. **Note**: The current implementation uses AI SDK's `stopWhen: [stepCountIs(10)]`. The Genkit Go equivalent may be:
    - The `maxTurns` parameter (if available in Go SDK - requires verification)
    - Manual implementation of iteration counting in the tool-calling loop
    - Alternative Genkit-specific mechanism (requires documentation lookup)
12. If the limit is reached, the system must return the AI's current response even if incomplete.

### Rate Limiting

13. The system must implement rate limiting with the following constraints:
    - Maximum 10 requests per minute per client
    - 60-second time window
    - Client identification via IP address (x-forwarded-for, x-real-ip headers, or default)
14. The system must return appropriate HTTP 429 (Too Many Requests) responses when rate limits are exceeded.

### Streaming Responses

15. The system must support streaming AI responses to the client in real-time.
16. The system must use Genkit's streaming API to progressively send response chunks.
17. The stream must include both text content and tool call information when tools are invoked.

### Server Configuration

18. The system must run as a standalone HTTP server on port 3400.
19. The system must expose a POST endpoint `/chatFlow` for handling chat requests.
20. The system must load the Google Generative AI API key from environment variables.
21. The system must initialize Genkit with the Google AI plugin.

### Conversation History

22. The system must accept conversation history as part of the request payload.
23. The conversation history must include:
    - Message role (user/model/tool)
    - Message content
24. The system must use conversation history to provide contextual AI responses.

## Non-Goals (Out of Scope)

1. **Frontend Integration**: This POC will not include frontend UI modifications. Testing will be done via HTTP clients (curl, Postman, etc.) or the Genkit Developer UI.

2. **Authentication/Authorization**: No user authentication or authorization mechanisms will be implemented in this POC.

3. **Database Persistence**: Conversation history will not be persisted to a database. Clients must manage and send full history with each request.

4. **Production Deployment**: No deployment to production environments. This is a local development POC only.

5. **Migration of Other Endpoints**: Only the `/v2` endpoint functionality will be replicated. The `/playground` (v1) endpoint and other routes remain unchanged.

6. **Complex Observability Setup**: While Genkit's built-in tracing is acceptable (nice-to-have), integration with external observability platforms (DataDog, New Relic, etc.) is out of scope.

7. **Error Recovery Strategies**: Advanced error handling, retry logic, and fallback mechanisms are out of scope for this POC.

8. **Custom Tool Development**: Only the existing `generateWorkout` tool will be implemented. No new tools will be created.

## Design Considerations

### Technology Stack

- **Language**: Go
- **Framework**: Genkit Go SDK
- **AI Provider**: Google Generative AI (Gemini 2.0 Flash)
- **HTTP Server**: Genkit's built-in HTTP handler (via `genkit.Handler()`)
- **Server Port**: 3400 (to avoid conflicts with existing backend on port 3000)

### API Request/Response Schema

**Request Format** (based on Genkit flow input):
```json
{
  "message": "I want a strength workout",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "model",
      "content": "Hi! How can I help with your fitness goals?"
    }
  ]
}
```

**Response Format** (Genkit flow output):
```json
{
  "text": "AI response text",
  "hasToolOutput": true,
  "toolName": "generateWorkout"
}
```

### Rate Limiting Implementation

Since Genkit Go may not have built-in rate limiting middleware, consider:
- Implementing a custom rate limiter using a map of client IPs to request timestamps
- Using a third-party Go rate limiting library (e.g., `golang.org/x/time/rate`)
- Wrapping the Genkit handler with custom middleware

### Step Limiting Strategy

**Research Required**: The equivalent of `stopWhen: [stepCountIs(10)]` in Genkit Go:
1. Check if Genkit Go supports `maxTurns` or similar parameter in `genkit.Generate()`
2. If not available, implement manual iteration counting by:
   - Using `ai.WithReturnToolRequests(true)` to handle tool calls explicitly
   - Maintaining a counter in the flow logic
   - Breaking the loop after 10 iterations

## Technical Considerations

### Dependencies

- `github.com/firebase/genkit/go/genkit` - Core Genkit library
- `github.com/firebase/genkit/go/ai` - AI abstractions
- `github.com/firebase/genkit/go/plugins/googlegenai` - Google AI plugin
- Rate limiting library (TBD based on implementation approach)

### Environment Variables

- `GOOGLE_GENERATIVE_AI_API_KEY` - Google AI API key (same as current backend)

### Tool Schema

The `generateWorkout` tool should follow the Genkit tool definition pattern:
```go
type WorkoutInput struct {
    NumExercises int    `json:"numExercises" jsonschema:"description=Number of exercises (default: 5)"`
    WorkoutType  string `json:"workoutType,omitempty" jsonschema:"description=Type of workout (strength, cardio, flexibility, full-body)"`
}

type WorkoutOutput struct {
    Title       string            `json:"title"`
    Description string            `json:"description"`
    Exercises   []WorkoutExercise `json:"exercises"`
    Duration    int               `json:"duration"` // in minutes
}

type WorkoutExercise struct {
    Name        string `json:"name"`
    Sets        int    `json:"sets"`
    Reps        int    `json:"reps"`
    RestSeconds int    `json:"restSeconds"`
    Notes       string `json:"notes,omitempty"`
}
```

### Observability (Nice-to-Have)

If Genkit's built-in tracing is simple to enable:
- Enable trace collection for debugging
- Use Genkit Developer UI to view traces
- Log trace IDs for debugging purposes

**Do not** pursue this if it adds significant complexity.

## Success Metrics

### Functional Success Criteria

1. ✅ Chat messages receive appropriate AI-generated responses
2. ✅ The AI correctly invokes the `generateWorkout` tool when requested
3. ✅ Conversation history is maintained across multiple messages
4. ✅ Streaming responses work and deliver content progressively
5. ✅ Rate limiting prevents more than 10 requests per minute per client
6. ✅ Tool-calling iterations are limited to 10 steps maximum
7. ✅ The server runs stably on port 3400 without crashes

### Evaluation Success Criteria

1. **Developer Experience**: Is Genkit's Go API intuitive and well-documented?
2. **Feature Completeness**: Can Genkit replicate all v2 endpoint features?
3. **Performance**: Does the Genkit server perform comparably to the current implementation?
4. **Limitations**: What features or capabilities are missing or difficult to implement?
5. **Migration Feasibility**: Would migrating the entire backend to Genkit be practical?

## Open Questions

1. **Step Limiting Implementation**: What is the Go equivalent of `stopWhen: [stepCountIs(10)]` in Genkit?
   - Is there a `maxTurns` parameter in `genkit.Generate()`?
   - If not, what's the recommended approach for limiting tool-calling iterations?

2. **Rate Limiting**: Does Genkit provide built-in rate limiting middleware, or should this be implemented separately?

3. **Streaming with Tool Calls**: How does Genkit handle streaming when tools are invoked? Are tool requests/responses included in the stream?

4. **Error Handling**: What happens when:
   - The AI fails to generate a valid response?
   - A tool execution fails?
   - The rate limit is exceeded?
   - The step limit is reached?

5. **Integration Testing**: What's the best way to test the Genkit server?
   - Use the Genkit Developer UI?
   - Write integration tests using `genkit flow:run`?
   - Use HTTP client tools (curl, Postman)?

6. **Conversation History Format**: Does Genkit require a specific format for conversation history, or can it accept the current format from the AI SDK?

## Implementation Notes

### Reference Files

- **Current Implementation**: `backend/src/routes/playground.ts` (lines 54-88 for v2 endpoint)
- **Genkit Example**: `docs/genkit-basic-example.md` (Go server with flows and tools)
- **Tool Definitions**: `backend/src/tools.ts` (workout tools implementation)
- **System Prompts**: `backend/src/prompts.ts` (CHAT_AGENT_PROMPT)

### Recommended Approach

1. Start by creating a minimal Genkit Go server with a basic chat flow
2. Add the `generateWorkout` tool and verify tool-calling works
3. Implement conversation history support
4. Add streaming functionality
5. Implement rate limiting
6. Add step/iteration limiting
7. Test all features thoroughly
8. Document findings and recommendations

### Testing Strategy

- **Manual Testing**: Use Genkit Developer UI to test flows interactively
- **HTTP Testing**: Use curl or Postman to test the `/chatFlow` endpoint
- **Rate Limit Testing**: Script multiple requests to verify rate limiting
- **Tool Testing**: Send prompts that should trigger workout generation
- **Streaming Testing**: Verify partial responses are received progressively

## Next Steps

After the POC is complete, create a summary document that includes:

1. Implementation experience (what was easy, what was difficult)
2. Genkit capabilities vs. limitations
3. Feature parity comparison with current v2 endpoint
4. Performance observations
5. Recommendation: Should we consider Genkit for production use?
