# PRD: Vercel AI SDK Integration Research & Implementation

## Introduction/Overview

The current genkit-chat interface (frontend/src/routes/genkit-chat.tsx) uses manual state management with React useState hooks to handle chat messages, conversation history, loading states, and errors. This implementation requires significant boilerplate code and doesn't support real-time streaming of AI responses to the UI.

This PRD outlines a research-first approach to integrate Vercel's AI SDK into the frontend, with the goals of:
1. **Cleaner code**: Replace manual state management with AI SDK's useChat hook
2. **Real-time streaming**: Display AI responses token-by-token as they generate
3. **Better developer experience**: Leverage AI SDK's ecosystem and patterns

**Key Challenge**: The Genkit Go backend currently returns complete JSON responses in a proprietary format, while Vercel AI SDK expects Server-Sent Events (SSE) with a specific streaming protocol. This creates a compatibility gap that must be addressed.

**Problem Solved**: Eliminates complex manual state management, enables progressive UI updates during generation, and provides a more maintainable codebase using industry-standard patterns.

## Goals

1. **Research Feasibility**: Conduct a proof-of-concept (POC) to evaluate the technical feasibility and complexity of integrating Vercel AI SDK with the existing Genkit Go backend
2. **Minimal Backend Complexity**: Any backend changes must be simple, understandable, and maintainable (developer is new to SSE)
3. **Enable Real-Time Streaming**: Transform the current "complete response" model into progressive token-by-token streaming visible in the UI
4. **Simplify Frontend Code**: Reduce state management boilerplate by 50%+ through AI SDK's useChat hook
5. **Maintain Feature Parity**: Preserve all existing functionality including tool output rendering (WorkoutComponent), conversation history, and error handling
6. **Side-by-Side Comparison**: Create new route and endpoint alongside existing implementation for easy comparison

## User Stories

1. **As a developer**, I want to use `useChat` hook instead of manual state management, so that I can reduce boilerplate code and focus on features rather than state synchronization.

2. **As a user**, I want to see AI responses appear progressively word-by-word, so that I get immediate feedback and understand the AI is processing my request.

3. **As a developer**, I want a simple SSE implementation in the backend, so that I can understand, debug, and maintain the streaming code without being an SSE expert.

4. **As a developer**, I want to preserve the existing tool calling functionality (generateWorkout), so that users continue to see formatted workout plans after integration.

5. **As a developer**, I want to compare the old and new implementations side-by-side, so that I can validate the new approach works correctly before migration.

6. **As a developer**, I want clear documentation of the integration approach, so that I can explain the architecture to team members and make informed decisions about tradeoffs.

## Functional Requirements

### Phase 1: Research & POC (Mandatory First Step)

1. **FR-1.1**: Create a minimal proof-of-concept that demonstrates Genkit Go → SSE → Vercel AI SDK integration
2. **FR-1.2**: Document the complexity level, code changes required, and potential gotchas discovered during POC
3. **FR-1.3**: Evaluate the primary approach (AI SDK integration) and compare with alternative (custom lightweight SSE solution)
4. **FR-1.4**: Provide a recommendation report with effort estimate and risk assessment
5. **FR-1.5**: If POC reveals blockers or excessive complexity with AI SDK, pivot to custom lightweight streaming solution

### Phase 2: Implementation (Only proceed if POC shows feasibility)

#### Backend Requirements

6. **FR-2.1**: Backend must create a NEW endpoint for SSE streaming at `/genkit-api/chatFlow/stream` while preserving the original `/genkit-api/chatFlow` endpoint unchanged
7. **FR-2.2**: Backend must stream responses using Server-Sent Events (SSE) format compatible with Vercel AI SDK
8. **FR-2.3**: Backend must include required header: `x-vercel-ai-ui-message-stream: v1`
9. **FR-2.4**: Backend must emit structured events in AI SDK format:
   - `text-delta` for incremental text chunks
   - `tool-input-start`, `tool-input-delta`, `tool-input-available` for tool calls
   - `tool-output-available` for tool results
   - `finish` for stream completion
   - `data: [DONE]` as final message
10. **FR-2.5**: Backend must preserve Genkit's tool calling functionality (generateWorkout) and map it to AI SDK's tool event format
11. **FR-2.6**: Backend must maintain conversation history support
12. **FR-2.7**: Backend must handle stream failures with automatic retry logic (max 1-2 retries) to provide smooth UX without user awareness
13. **FR-2.8**: Backend must emit structured error events in SSE stream when retries are exhausted
14. **FR-2.9**: Code must include inline comments explaining SSE concepts for developers unfamiliar with the protocol

#### Frontend Requirements

15. **FR-2.10**: Create NEW route at `frontend/src/routes/genkit-chat-stream.tsx` (do NOT modify existing genkit-chat.tsx)
16. **FR-2.11**: New route must use Vercel AI SDK's `useChat` hook for state management
17. **FR-2.12**: Install AI SDK using: `bun add ai`
18. **FR-2.13**: Configure useChat to point to the new streaming endpoint (`/genkit-api/chatFlow/stream`)
19. **FR-2.14**: Implement progressive rendering of AI responses as tokens stream in
20. **FR-2.15**: Add "Resume" button UI when stream fails after retry exhaustion, allowing user to manually retry
21. **FR-2.16**: Preserve existing UI components in the new route:
    - Message/MessageContent for chat messages
    - Tool/ToolOutput for workout display
    - WorkoutComponent for rendering workout data
    - Actions (Retry/Copy) for message actions
    - Loader for loading states
22. **FR-2.17**: Handle tool outputs from the SSE stream and render WorkoutComponent when `tool-output-available` event is received
23. **FR-2.18**: Maintain error handling UI with user-friendly messages
24. **FR-2.19**: Original `genkit-chat.tsx` route must remain unchanged and functional for comparison
25. **FR-2.20**: Implement automated tests for the new streaming route

#### Testing & Validation

26. **FR-2.21**: Create automated test suite covering:
    - Simple text responses
    - Tool calling (generateWorkout)
    - Stream failure and retry scenarios
    - Error handling
    - Long conversations with history
27. **FR-2.22**: Verify streaming performance meets baseline:
    - Text responses: Time-to-first-token < 1-3 seconds
    - Tool responses: Time-to-first-token < 3-5 seconds
28. **FR-2.23**: Perform side-by-side comparison testing:
    - Same prompts in both `/genkit-chat` and `/genkit-chat-stream`
    - Compare response quality, latency, and user experience
29. **FR-2.24**: Validate that original route continues to work unchanged

## Non-Goals (Out of Scope)

1. **Migration to Genkit JS**: This PRD focuses on keeping the Genkit Go backend; switching to Genkit JS is out of scope
2. **Advanced AI SDK Features**: Features like file attachments, multi-modal inputs, or custom data parts are not included in this initial integration
3. **Backend Performance Optimization**: No changes to Genkit's model calling, rate limiting, or caching logic
4. **UI Redesign**: Visual appearance should remain the same; this is purely a technical refactor
5. **Mobile App Support**: Integration is scoped to the web frontend only
6. **Removing Old Implementation**: After validation, the old route (`genkit-chat.tsx`) should remain as a fallback/reference
7. **Authentication/Authorization Changes**: Current auth/security model remains unchanged
8. **Conversation Persistence**: Cross-page-refresh persistence is out of scope (may be added in future iteration if easy)
9. **Production Deployment Configuration**: While Fly.io deployment is planned, specific infrastructure setup is not part of this PRD

## Design Considerations

### Primary Approach: AI SDK Integration with SSE Adapter

**Approach**: Create new SSE endpoint in Genkit Go that outputs AI SDK-compatible event stream, with new frontend route consuming it.

**Pros**:
- Leverages battle-tested AI SDK for frontend state management
- Automatic handling of complex scenarios (reconnection, error recovery, tool calling)
- Rich ecosystem and community support
- Future-proof: can adopt new AI SDK features as they release
- Well-documented patterns and examples
- Side-by-side comparison validates new approach

**Cons**:
- Must implement full AI SDK streaming protocol (20+ event types)
- Backend complexity higher due to event mapping
- Requires understanding of AI SDK's specific format

**Implementation Sketch**:

**Backend** (genkit-server/main.go):
```go
// New streaming endpoint alongside existing chatFlow
mux.HandleFunc("POST /chatFlow/stream", rateLimitMiddleware(rateLimiter, chatFlowStreamHandler))
mux.HandleFunc("POST /chatFlow", rateLimitMiddleware(rateLimiter, genkit.Handler(chatFlow))) // Original unchanged

func chatFlowStreamHandler(w http.ResponseWriter, r *http.Request) {
    // AI SDK required headers
    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("x-vercel-ai-ui-message-stream", "v1")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")

    flusher, ok := w.(http.Flusher)
    if !ok {
        http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
        return
    }

    // Retry logic (max 2 attempts)
    maxRetries := 2
    for attempt := 0; attempt < maxRetries; attempt++ {
        err := streamWithAISDKProtocol(w, flusher, r)
        if err == nil {
            return // Success
        }
        log.Printf("Stream attempt %d failed: %v", attempt+1, err)
    }

    // Emit error event in AI SDK format
    emitAISDKError(w, flusher, "Stream failed after retries")
}

func streamWithAISDKProtocol(w http.ResponseWriter, flusher http.Flusher, r *http.Request) error {
    // Use Genkit's streaming to emit AI SDK events
    resp, err := genkit.Generate(ctx, g,
        ai.WithStreaming(func(ctx context.Context, chunk *ai.ModelResponseChunk) error {
            // Map to AI SDK format: text-delta, tool-input-*, etc.
            event := mapToAISDKEvent(chunk)
            fmt.Fprintf(w, "data: %s\n\n", event)
            flusher.Flush()
            return nil
        }),
    )

    if err != nil {
        return err
    }

    // AI SDK completion
    fmt.Fprintf(w, "data: [DONE]\n\n")
    flusher.Flush()
    return nil
}
```

**Frontend** (frontend/src/routes/genkit-chat-stream.tsx):
```tsx
import { createFileRoute } from '@tanstack/react-router';
import { useChat } from 'ai';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import { Tool, ToolContent, ToolHeader, ToolOutput } from '@/components/ai-elements/tool';
import { WorkoutComponent } from '@/components/workout-message';
import { Actions, Action } from '@/components/ai-elements/actions';
import { CopyIcon, RefreshCcwIcon } from 'lucide-react';
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input';

export const Route = createFileRoute('/genkit-chat-stream')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat({
    api: '/genkit-api/chatFlow/stream',
  });

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((msg) => (
              <Message key={msg.id} from={msg.role}>
                <MessageContent>
                  <Response>{msg.content}</Response>
                </MessageContent>

                {/* Handle tool invocations for workout generation */}
                {msg.toolInvocations?.map((tool) =>
                  tool.toolName === 'generateWorkout' ? (
                    <Tool key={tool.toolCallId} defaultOpen={true}>
                      <ToolHeader
                        type="tool-generateWorkout"
                        state="output-available"
                      />
                      <ToolContent>
                        <ToolOutput
                          output={
                            <WorkoutComponent
                              content={JSON.stringify(tool.result)}
                            />
                          }
                        />
                      </ToolContent>
                    </Tool>
                  ) : null
                )}

                {/* Show actions for the last assistant message */}
                {msg.role === 'assistant' &&
                  msg.id === messages[messages.length - 1]?.id && (
                    <Actions className="mt-2">
                      <Action onClick={reload} label="Retry">
                        <RefreshCcwIcon className="size-3" />
                      </Action>
                      <Action
                        onClick={() => navigator.clipboard.writeText(msg.content)}
                        label="Copy"
                      >
                        <CopyIcon className="size-3" />
                      </Action>
                    </Actions>
                  )}
              </Message>
            ))}

            {/* Show Resume button on stream failure */}
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <p className="font-medium">Stream interrupted</p>
                <p className="text-sm">{error.message}</p>
                <button
                  onClick={reload}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
                >
                  Resume
                </button>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputBody>
            <PromptInputTextarea
              onChange={handleInputChange}
              value={input}
              placeholder="Ask me about workouts..."
            />
          </PromptInputBody>
          <PromptInputSubmit
            disabled={!input.trim() || isLoading}
            status={isLoading ? 'submitted' : 'ready'}
          />
        </PromptInput>
      </div>
    </div>
  );
}
```

### Alternative Approach: Custom Lightweight SSE Solution

**Approach**: Build minimal SSE implementation with custom React hook, avoiding full AI SDK protocol.

**Pros**:
- Simpler backend (5-10 event types vs 20+)
- Full control over event format and behavior
- Easier to understand and debug
- No external dependencies (uses browser's EventSource API)
- Faster POC/iteration cycle

**Cons**:
- Must implement state management manually
- No ecosystem support or community patterns
- Need to handle edge cases yourself (reconnection, error recovery, etc.)
- Potential bugs in custom implementation

**When to Use This**: If POC reveals AI SDK protocol is too complex or has unforeseen compatibility issues.

**Implementation Sketch**:
```go
// Simplified SSE with 3 event types
type StreamEvent struct {
    Type string      `json:"type"` // "text", "tool", "done"
    Data interface{} `json:"data"`
}

func customStreamHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/event-stream")
    // ... basic SSE setup

    genkit.Generate(ctx, g,
        ai.WithStreaming(func(ctx context.Context, chunk *ai.ModelResponseChunk) error {
            event := StreamEvent{Type: "text", Data: chunk.Text()}
            fmt.Fprintf(w, "data: %s\n\n", json.Marshal(event))
            flusher.Flush()
            return nil
        }),
    )
}
```

```tsx
// Custom hook in genkit-chat-stream.tsx (~100 lines)
function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (text: string) => {
    const eventSource = new EventSource('/genkit-api/chatFlow/stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'text') {
        // Append text to current message
      } else if (data.type === 'tool') {
        // Handle tool output
      } else if (data.type === 'done') {
        eventSource.close();
      }
    };
  };

  return { messages, sendMessage, isStreaming };
}
```

**Recommendation**: Start with **AI SDK integration** (primary approach) in POC. If it proves too complex, pivot to custom solution.

## Technical Considerations

### Backend (Genkit Go)

1. **Streaming Implementation**: Genkit Go already supports streaming via the `ai.WithStreaming()` callback. The challenge is transforming this into SSE format.
2. **Event Mapping**: Each Genkit streaming chunk must be mapped to appropriate AI SDK event types (`text-delta`, `tool-input-start`, etc.)
3. **Tool Output Serialization**: The `WorkoutOutput` struct must be serialized into the `tool-output-available` event payload
4. **Retry Strategy**: Implement silent retry (1-2 attempts) before surfacing errors to user
5. **Connection Management**: SSE requires keeping HTTP connections open; ensure proper timeout and cleanup
6. **Fly.io Considerations**: Verify Fly.io supports long-lived SSE connections (it should, but worth confirming in POC)

### Frontend (React + AI SDK)

1. **Package Installation**: Use `bun add ai` to install Vercel AI SDK
2. **New Route Creation**: Create `genkit-chat-stream.tsx` alongside existing route for comparison
3. **Type Compatibility**: Ensure AI SDK's message types are compatible with existing UI components
4. **Conversation History**: AI SDK manages history internally; verify it aligns with backend's history format
5. **Custom Tool Rendering**: AI SDK's `toolInvocations` array must integrate with the existing WorkoutComponent
6. **Error Recovery**: Implement Resume button using AI SDK's `reload()` function

### SSE Protocol Primer

For developers new to SSE, key concepts to understand:
- **Server-Sent Events**: One-way streaming protocol where server pushes updates to client over HTTP
- **Event Format**: Each event is `data: {json}\n\n` (note the double newline)
- **Headers**: Must set `Content-Type: text/event-stream` and `Connection: keep-alive`
- **Client Reconnection**: Browsers auto-reconnect if stream drops; use `id:` field for resumption
- **EventSource API**: Browser-native API for consuming SSE (AI SDK wraps this)

**Learning Resources**:
- MDN SSE Guide: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- AI SDK Stream Protocol: https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol
- Go SSE Example: https://thoughtbot.com/blog/writing-a-server-sent-events-server-in-go

### Automated Testing Strategy

1. **Backend SSE Tests**:
   - Use Go's `httptest` package to test SSE endpoint
   - Verify event format and order
   - Test retry logic with simulated failures
   - Ensure original endpoint remains functional

2. **Frontend Integration Tests**:
   - Use Vitest with mock EventSource for genkit-chat-stream.tsx
   - Test `useChat` hook integration
   - Verify tool rendering and error handling
   - Validate original route still works

3. **E2E Tests** (Optional):
   - Use Playwright to test full streaming flow
   - Verify progressive UI updates
   - Compare behavior between old and new routes

## Success Metrics

1. **Code Reduction**: Reduce frontend state management code by at least 50% in the new route (measured by lines of code comparing genkit-chat-stream.tsx vs genkit-chat.tsx)
2. **Streaming Performance**:
   - Time-to-first-token for text: < 1-3 seconds (match current baseline)
   - Time-to-first-token for tools: < 3-5 seconds (match current baseline)
3. **Feature Parity**: 100% of current features (text chat, tool calling, error handling) work in new streaming route
4. **Code Comprehension**: A developer unfamiliar with SSE can read the backend code and understand it within 30 minutes (validated through code review)
5. **POC Success Criteria**:
   - POC demonstrates end-to-end streaming within 1 day of development
   - No major blockers or architectural issues discovered
   - Code complexity is acceptable (subjective but should feel "reasonable")
6. **Test Coverage**: Automated tests cover critical paths (streaming, tool calls, errors) for new route
7. **Backward Compatibility**: Original `/genkit-chat` route remains fully functional

## Resolved Questions

1. **Endpoint Strategy**: ✅ Create new endpoint `/genkit-api/chatFlow/stream` and keep original `/genkit-api/chatFlow` as fallback for POC comparison

2. **Frontend Strategy**: ✅ Create new route `/genkit-chat-stream` and keep original `/genkit-chat` unchanged for side-by-side comparison

3. **Testing Strategy**: ✅ Use automated tests with mocked EventSource and Go's httptest package

4. **Error Handling**: ✅ Implement automatic retry (1-2 max attempts) for silent recovery. If all retries fail, show "Resume" button to user

5. **Performance Baseline**: ✅ Current performance:
   - Text responses: 1-3 seconds
   - Tool responses: 3-5 seconds

6. **Deployment Concerns**: ✅ Currently local dev environment. Production will deploy to Fly.io. POC should verify SSE works with Fly.io (expected to work fine)

7. **Conversation Persistence**: ✅ Not currently implemented. Out of scope for this PRD (may revisit in future iteration)

8. **Approach Selection**: ✅ AI SDK integration (primary), custom lightweight SSE (alternative if POC shows complexity issues)

9. **Package Manager**: ✅ Use `bun` commands (e.g., `bun add ai`) instead of npm

---

## Implementation Phases

### Phase 1: Research & POC (1-2 days)
- Build minimal POC for AI SDK integration with SSE
- Create basic `/genkit-api/chatFlow/stream` endpoint
- Create basic `/genkit-chat-stream` route with useChat
- Test basic streaming with simple text responses
- Test tool calling integration
- Verify side-by-side comparison between old and new routes
- Test on local dev environment
- If POC reveals excessive complexity, build alternative custom SSE solution POC
- Document findings, complexity, and tradeoffs
- Get stakeholder approval on chosen approach

### Phase 2: Backend Implementation (2-3 days)
- Create production-ready `/genkit-api/chatFlow/stream` endpoint
- Implement SSE response with AI SDK-compatible event format
- Map Genkit streaming callbacks to AI SDK events
- Implement retry logic (1-2 attempts)
- Add comprehensive inline comments explaining SSE
- Write automated tests for SSE endpoint
- Verify original `/genkit-api/chatFlow` endpoint unchanged

### Phase 3: Frontend Implementation (2-3 days)
- Install AI SDK: `bun add ai`
- Create production-ready `frontend/src/routes/genkit-chat-stream.tsx`
- Implement useChat hook integration
- Configure endpoint to `/genkit-api/chatFlow/stream`
- Implement tool output rendering with `toolInvocations`
- Add Resume button for error recovery
- Preserve existing UI components
- Write automated tests for new route
- Verify original `genkit-chat.tsx` remains unchanged

### Phase 4: Testing & Validation (1-2 days)
- Run automated test suite for both routes
- Manual side-by-side testing of same prompts
- Performance comparison with baseline
- Test retry and resume functionality
- Verify original route still works correctly
- Code review for clarity/maintainability

### Phase 5: Documentation (1 day)
- Update README with architecture diagram showing both routes
- Add developer guide for SSE implementation
- Document retry and error handling behavior
- Add inline code comments
- Create comparison guide (old vs new route)
- Document migration path if/when ready to deprecate old route
- Document any gotchas or learnings

**Total Estimate**: 7-11 days depending on POC findings and issues encountered

---

## References

- Vercel AI SDK Documentation: https://ai-sdk.dev/docs/introduction
- AI SDK useChat Hook: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat
- AI SDK Stream Protocol: https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol
- Genkit Go Documentation: (via MCP server)
- Go SSE Tutorial: https://thoughtbot.com/blog/writing-a-server-sent-events-server-in-go
- MDN Server-Sent Events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- Current Implementation:
  - Original Frontend Route: `frontend/src/routes/genkit-chat.tsx`
  - New Frontend Route: `frontend/src/routes/genkit-chat-stream.tsx` (to be created)
  - API Client: `frontend/src/lib/genkit-api.ts`
  - Backend: `genkit-server/main.go`
