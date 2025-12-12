# Research Findings: Vercel AI SDK & Genkit Go Streaming

**Date:** 2025-12-11
**Tasks:** 1.1 - 1.2 from PRD 0002 (Vercel AI SDK Integration)
**Status:** Completed

---

## Task 1.1: Vercel AI SDK Documentation Study

### useChat Hook Overview

The `useChat` hook is the primary interface for building chat applications with the Vercel AI SDK. It handles message state management, streaming, and API communication automatically.

#### Parameters Accepted

```typescript
useChat({
  transport?: DefaultChatTransport,  // API endpoint configuration
  api?: string,                      // API endpoint (default: '/api/chat')
  headers?: Record<string, string>,  // Custom HTTP headers (static or function)
  body?: object,                     // Additional request data
  credentials?: RequestCredentials,  // Auth settings ('same-origin', 'include')
  id?: string,                       // Chat session identifier
  messages?: UIMessage[],            // Initial conversation messages
  experimental_throttle?: number,    // UI update throttle (ms, React only)

  // Callbacks
  onFinish?: (options: OnFinishOptions) => void,
  onError?: (error: Error) => void,
  onData?: (dataPart: DataUIPart) => void,
  onToolCall?: ({toolCall: ToolCall}) => void | Promise<void>
})
```

#### Return Values

**State Properties:**
- `messages`: Array of chat messages with `id`, `role`, and `parts` properties
- `status`: One of `'submitted'`, `'streaming'`, `'ready'`, or `'error'`
- `error`: Error object when failures occur

**Methods:**
- `sendMessage(message, options?)`: Submits user messages
- `stop()`: Aborts in-progress responses
- `reload()`: Retries after errors
- `regenerate(options?)`: Resends last message for new response
- `setMessages(messages)`: Directly modifies message array
- `addToolOutput(options)`: Add tool output to conversation
- `clearError()`: Clears error state

#### Message Structure

Messages contain:
- `id`: Unique identifier
- `role`: `'user'` | `'assistant'`
- `parts`: Array containing:
  - Text parts
  - File parts
  - Tool invocation parts
  - Reasoning parts
- Optional metadata (timestamps, token usage)

#### Streaming Handling

- Automatic real-time message streaming
- Status transitions: `'submitted'` → `'streaming'` → `'ready'`
- UI updates incrementally as chunks arrive
- Can interrupt with `stop()` function

#### Error Handling

- Errors captured in `error` state
- `onError` callback for fetch failures
- `onFinish` callback with abort/disconnect flags
- Server-side `getErrorMessage()` controls client error exposure

---

## AI SDK Stream Protocol Specification

### Required Headers

**Critical:** Backend must set these headers for SSE streaming:
```http
Content-Type: text/event-stream
x-vercel-ai-ui-message-stream: v1
Cache-Control: no-cache
Connection: keep-alive
```

### SSE Format

Events use Server-Sent Events format:
```
data: {JSON object}
```

### Event Types

#### Text Events
- `text-start`: Initiates a text block with unique ID
  ```json
  {"type": "text-start", "id": "text_123"}
  ```
- `text-delta`: Contains incremental text content
  ```json
  {"type": "text-delta", "id": "text_123", "delta": "Hello"}
  ```
- `text-end`: Marks text block completion
  ```json
  {"type": "text-end", "id": "text_123"}
  ```

#### Tool Events
- `tool-input-start`: Begins tool input streaming
  ```json
  {"type": "tool-input-start", "toolCallId": "call_abc", "toolName": "generateWorkout"}
  ```
- `tool-input-delta`: Incremental tool input chunks
  ```json
  {"type": "tool-input-delta", "toolCallId": "call_abc", "delta": "{\"fitness"}
  ```
- `tool-input-available`: Signals input ready for execution
  ```json
  {"type": "tool-input-available", "toolCallId": "call_abc", "toolName": "generateWorkout", "input": {...}}
  ```
- `tool-output-available`: Contains tool execution results
  ```json
  {"type": "tool-output-available", "toolCallId": "call_abc", "output": {...}}
  ```

#### Message Events
- `message-start`: Opens new message with metadata
- `start-step`: Indicates step beginning
- `finish-step`: Marks step completion
- `finish`: Signals message conclusion

#### Error Events
- `error`: Appends error information
  ```json
  {"type": "error", "error": "Error message"}
  ```

#### Custom Events
- `data-*`: Custom data types with specific handling
- `source-url`, `source-document`, `file`: Reference external content

#### Reasoning Events
- `reasoning-start`: Begins reasoning block
- `reasoning-delta`: Streams reasoning content incrementally
- `reasoning-end`: Concludes reasoning block

### Event Sequence

Typical streaming flow:
```
message-start
  → text-start
  → text-delta (multiple)
  → text-end
  → tool-input-start
  → tool-input-delta (multiple)
  → tool-input-available
  → tool-output-available
  → finish-step (for multi-step calls)
  → finish
  → data: [DONE]
```

### Stream Termination

All streams must conclude with:
```
data: [DONE]
```

---

## Task 1.2: Genkit Go Streaming API Study

### ai.WithStreaming() Callback Pattern

Genkit Go provides streaming through an option-based API using the `ai.WithStreaming()` function.

#### Function Signature

```go
ai.WithStreaming(callback func(ctx context.Context, chunk *ai.ModelResponseChunk) error)
```

#### Callback Parameters

- `ctx context.Context`: Request context for cancellation/timeouts
- `chunk *ai.ModelResponseChunk`: Individual chunk from the model

#### Chunk Interface

```go
// Access chunk text
text := chunk.Text()

// Returns empty string if chunk contains no text (e.g., metadata chunks)
if text != "" {
    // Process text chunk
}
```

#### Usage Example

```go
resp, err := genkit.Generate(ctx, g,
    ai.WithPrompt("Tell me a story about a boy and his dog."),
    ai.WithStreaming(func(ctx context.Context, chunk *ai.ModelResponseChunk) error {
        if text := chunk.Text(); text != "" {
            log.Printf("Streaming chunk: %s", text)
            // Send chunk to client here
        }
        return nil
    }),
)
if err != nil {
    log.Fatal(err)
}

// Full response still available after streaming
finalText := resp.Text()
```

#### Error Handling

- Return `error` from callback to abort streaming
- Check for `nil` or empty text in chunks
- Full response object contains complete output after streaming

#### Integration with Tool Calling

- Callback receives ALL chunks, including tool invocations
- Tool call chunks can be identified and processed
- Works seamlessly with `ai.WithTools()` option

#### Current Implementation (genkit-server/main.go)

Lines 439-444 show existing streaming usage:
```go
ai.WithStreaming(func(ctx context.Context, chunk *ai.ModelResponseChunk) error {
    if text := chunk.Text(); text != "" {
        log.Printf("Streaming chunk: %s", text)
    }
    return nil
}),
```

**Current State:**
- ✅ Streaming enabled internally
- ❌ Not exposed to HTTP clients via SSE
- ❌ No event mapping to AI SDK format

---

## Key Integration Points

### Backend Requirements

1. **Create SSE endpoint** in `genkit-server/main.go`
2. **Set required headers**: `Content-Type: text/event-stream`, `x-vercel-ai-ui-message-stream: v1`
3. **Map Genkit chunks** to AI SDK event format
4. **Implement http.Flusher** for real-time streaming
5. **Handle tool calling events** separately from text events
6. **Send termination signal**: `data: [DONE]`

### Frontend Requirements

1. **Use useChat hook** with `/chatFlow/stream` endpoint
2. **Render messages** from `messages` array
3. **Handle tool invocations** via `msg.toolInvocations`
4. **Display errors** using `error` state
5. **Show loading state** using `isLoading` or `status`
6. **Implement retry** using `reload()` function

### Event Mapping Strategy

| Genkit Chunk Type | AI SDK Event Type |
|-------------------|-------------------|
| Text chunk | `text-delta` |
| Tool call start | `tool-input-start` |
| Tool input streaming | `tool-input-delta` |
| Tool input complete | `tool-input-available` |
| Tool output ready | `tool-output-available` |
| Generation complete | `finish` + `data: [DONE]` |

---

## Next Steps (Tasks 1.3+)

1. **Review AI SDK stream protocol spec** in depth (Task 1.3)
2. **Create POC SSE endpoint** with simple text streaming (Task 1.4)
3. **Create POC frontend** with useChat hook (Task 1.5)
4. **Test basic streaming** (Task 1.6)
5. **Test tool calling** with streaming (Task 1.7)
6. **Document findings** and evaluate approach (Task 1.8)
7. **Make go/no-go decision** (Task 1.9)

---

## Questions to Resolve

1. How to handle conversation history in streaming endpoint?
2. How to map Genkit's tool call format to AI SDK's format?
3. What retry strategy to implement for failed generations?
4. How to handle partial tool inputs during streaming?
5. Should we buffer chunks or stream immediately?

---

## References

- [AI SDK useChat Documentation](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot)
- [AI SDK Stream Protocol](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol)
- [AI SDK useChat Reference](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat)
- [Genkit Go Models Documentation](https://firebase.google.com/docs/genkit/go/models)
- Existing implementation: `genkit-server/main.go:439-444`
