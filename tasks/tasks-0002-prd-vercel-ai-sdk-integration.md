# Task List: Vercel AI SDK Integration Research & Implementation

Generated from: `0002-prd-vercel-ai-sdk-integration.md`

## Relevant Files

- `genkit-server/main.go` - Go backend server handling Genkit flows; needs new SSE streaming endpoint
- `frontend/src/routes/genkit-chat.tsx` - Existing chat route with manual state management (preserve unchanged)
- `frontend/src/routes/genkit-chat-stream.tsx` - New streaming route to be created with useChat hook
- `frontend/src/lib/genkit-api.ts` - API client utilities; existing types may be reused
- `frontend/src/components/workout-message.tsx` - Workout rendering component to be reused in new route
- `frontend/src/components/ai-elements/conversation.tsx` - Conversation UI component (reuse)
- `frontend/src/components/ai-elements/message.tsx` - Message UI component (reuse)
- `frontend/src/components/ai-elements/tool.tsx` - Tool UI component (reuse)
- `frontend/src/components/ai-elements/prompt-input.tsx` - Prompt input component (reuse)
- `frontend/src/components/ai-elements/actions.tsx` - Actions component (reuse)
- `frontend/src/components/ai-elements/loader.tsx` - Loader component (reuse)
- `genkit-server/main_test.go` - Backend tests for SSE streaming endpoint
- `frontend/src/routes/genkit-chat-stream.test.tsx` - Frontend tests for new streaming route

### Notes

- The PRD emphasizes a **research-first approach** with a mandatory POC phase before full implementation
- Backend tests in Go should use `httptest` package for SSE endpoint testing
- Frontend tests should use Vitest with mock EventSource for testing the useChat hook integration
- The original `genkit-chat.tsx` route MUST remain unchanged for side-by-side comparison
- Use `bun add ai` to install Vercel AI SDK
- Run backend: `cd genkit-server && source setenv.sh && go run .`
- Run frontend: `cd frontend && bunx --bun vite`

## Tasks

- [ ] 1.0 Research & POC: Vercel AI SDK Integration
  - [ ] 1.1 Study Vercel AI SDK documentation (useChat hook, streaming protocol, event types)
  - [ ] 1.2 Study Genkit Go streaming API (`ai.WithStreaming()` callback pattern)
  - [ ] 1.3 Review AI SDK stream protocol specification (https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol)
  - [ ] 1.4 Create minimal POC SSE endpoint in `genkit-server/main.go` (simple text streaming only)
  - [ ] 1.5 Create minimal POC frontend route `genkit-chat-stream-poc.tsx` with useChat hook
  - [ ] 1.6 Test basic text streaming in POC (simple "hello world" responses)
  - [ ] 1.7 Test tool calling integration in POC (generateWorkout with streaming)
  - [ ] 1.8 Document POC findings: complexity level, code changes required, gotchas discovered
  - [ ] 1.9 Evaluate AI SDK integration vs custom lightweight SSE solution
  - [ ] 1.10 Make go/no-go decision and get stakeholder approval to proceed to implementation

- [ ] 2.0 Backend: SSE Streaming Endpoint Implementation
  - [ ] 2.1 Create new endpoint handler `chatFlowStreamHandler` in `genkit-server/main.go`
  - [ ] 2.2 Register new route `POST /chatFlow/stream` with rate limiting middleware
  - [ ] 2.3 Implement required SSE headers (`Content-Type: text/event-stream`, `x-vercel-ai-ui-message-stream: v1`, `Cache-Control`, `Connection`)
  - [ ] 2.4 Implement http.Flusher for real-time streaming
  - [ ] 2.5 Create event mapping function to convert Genkit chunks to AI SDK event format (`text-delta`, `tool-input-start`, etc.)
  - [ ] 2.6 Implement streaming callback with `ai.WithStreaming()` that emits AI SDK-compatible events
  - [ ] 2.7 Handle tool calling events: `tool-input-start`, `tool-input-delta`, `tool-input-available`, `tool-output-available`
  - [ ] 2.8 Implement retry logic wrapper (max 1-2 attempts) with automatic fallback
  - [ ] 2.9 Implement error event emission in SSE format when retries exhausted
  - [ ] 2.10 Add `data: [DONE]` message at stream completion
  - [ ] 2.11 Add inline comments explaining SSE concepts for developers new to the protocol
  - [ ] 2.12 Verify original `/chatFlow` endpoint remains unchanged and functional
  - [ ] 2.13 Write backend tests using `httptest` package to verify SSE event format and sequence

- [ ] 3.0 Frontend: useChat Hook Integration
  - [ ] 3.1 Install Vercel AI SDK: `cd frontend && bun add ai`
  - [ ] 3.2 Create new file `frontend/src/routes/genkit-chat-stream.tsx` (do NOT modify genkit-chat.tsx)
  - [ ] 3.3 Set up route configuration with TanStack Router's `createFileRoute`
  - [ ] 3.4 Implement `useChat` hook with API endpoint `/genkit-api/chatFlow/stream`
  - [ ] 3.5 Implement message rendering using existing Message/MessageContent components
  - [ ] 3.6 Implement progressive text rendering as tokens stream in (verify real-time updates)
  - [ ] 3.7 Implement tool invocation rendering using `msg.toolInvocations` array
  - [ ] 3.8 Integrate WorkoutComponent for `generateWorkout` tool outputs
  - [ ] 3.9 Add Resume button UI for stream failures (use `reload()` function from useChat)
  - [ ] 3.10 Implement error handling UI with user-friendly error messages
  - [ ] 3.11 Preserve Actions component (Retry/Copy) for assistant messages
  - [ ] 3.12 Add Loader component for loading states (use `isLoading` from useChat)
  - [ ] 3.13 Verify original `genkit-chat.tsx` remains unchanged
  - [ ] 3.14 Write frontend tests using Vitest with mock EventSource

- [ ] 4.0 Testing & Validation
  - [ ] 4.1 Create backend test suite: test SSE event format and order
  - [ ] 4.2 Create backend test suite: test retry logic with simulated failures
  - [ ] 4.3 Create backend test suite: test tool calling events (generateWorkout)
  - [ ] 4.4 Create backend test suite: verify original `/chatFlow` endpoint still works
  - [ ] 4.5 Create frontend test suite: test useChat hook integration
  - [ ] 4.6 Create frontend test suite: test tool rendering and WorkoutComponent display
  - [ ] 4.7 Create frontend test suite: test error handling and Resume button
  - [ ] 4.8 Manual side-by-side testing: same prompts in both `/genkit-chat` and `/genkit-chat-stream`
  - [ ] 4.9 Performance validation: measure time-to-first-token for text responses (target: < 1-3s)
  - [ ] 4.10 Performance validation: measure time-to-first-token for tool responses (target: < 3-5s)
  - [ ] 4.11 Test conversation history support in streaming route
  - [ ] 4.12 Test long conversations with multiple tool calls
  - [ ] 4.13 Verify streaming works correctly on local dev environment
  - [ ] 4.14 Verify original route continues to work unchanged

- [ ] 5.0 Documentation & Comparison
  - [ ] 5.1 Update README.md with architecture diagram showing both routes
  - [ ] 5.2 Document SSE implementation approach and design decisions
  - [ ] 5.3 Document retry and error handling behavior
  - [ ] 5.4 Document AI SDK event mapping (Genkit chunks → AI SDK events)
  - [ ] 5.5 Create developer guide for understanding the SSE code
  - [ ] 5.6 Add SSE learning resources links (MDN, AI SDK docs, Go SSE examples)
  - [ ] 5.7 Create comparison guide: old route vs new route (feature parity, code reduction, UX differences)
  - [ ] 5.8 Document migration path if/when ready to deprecate old route
  - [ ] 5.9 Document gotchas and learnings from implementation
  - [ ] 5.10 Measure and document code reduction percentage (target: 50%+ reduction in state management)
