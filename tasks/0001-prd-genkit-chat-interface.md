# PRD: Genkit Chat Interface with AI Elements

## Introduction/Overview

This feature creates a new frontend route that demonstrates the integration between Vercel AI SDK AI Elements and a Go-based Genkit backend server. The goal is to evaluate whether Genkit (Go) can serve as a viable replacement for the existing AI SDK (TypeScript) backend in a production environment.

The feature will replicate the functionality of the existing `/element-playground` route, but instead of calling the TypeScript backend endpoint (`/api/playground/v2`), it will communicate with the Genkit server's `/chatFlow` endpoint running on port 3400. This provides a side-by-side comparison of both implementations to assess API compatibility, feature parity, and performance.

## Goals

1. **Create a functional chat interface** using Vercel AI SDK AI Elements components that communicates with the Go-based Genkit server
2. **Demonstrate tool calling capabilities** by properly displaying the `generateWorkout` tool execution and results
3. **Validate API compatibility** between AI SDK's frontend hooks and Genkit's backend responses
4. **Provide a comparison baseline** for evaluating Genkit as a production backend replacement
5. **Maintain feature parity** with the existing TypeScript playground implementation (conversation history, streaming, tool calling)

## User Stories

1. **As a developer**, I want to interact with a Genkit-powered chat interface so that I can test if the Go backend provides the same user experience as the TypeScript backend.

2. **As a developer**, I want to see tool calls (generateWorkout) properly rendered so that I can verify that Genkit's tool execution integrates seamlessly with AI Elements components.

3. **As a product evaluator**, I want to compare side-by-side the TypeScript and Go implementations so that I can make an informed decision about migrating to Genkit for production.

4. **As a user**, I want to have a conversation with an AI fitness coach that generates personalized workouts so that I can experience the full capabilities of the system.

5. **As a developer**, I want to see clear error messages and loading states so that I can understand what's happening during the chat interaction.

## Functional Requirements

### Frontend Route

1. The system must create a new route file at `frontend/src/routes/genkit-chat.tsx` using TanStack Router's `createFileRoute`
2. The route must be accessible via the URL path `/genkit-chat` in the application
3. The route must use TypeScript with proper type definitions

### Chat Interface Components

4. The system must use the following AI Elements components from `frontend/src/components/ai-elements/`:
   - `Conversation`, `ConversationContent`, `ConversationScrollButton` for the chat container
   - `Message`, `MessageContent` for individual messages
   - `PromptInput`, `PromptInputBody`, `PromptInputTextarea`, `PromptInputSubmit`, `PromptInputToolbar` for user input
   - `Response` for rendering markdown-formatted text responses
   - `Tool`, `ToolHeader`, `ToolContent`, `ToolOutput` for displaying tool executions
   - `Loader` for showing loading states
   - `Actions`, `Action` for message actions (copy, regenerate)

5. The system must display messages in a scrollable conversation view with automatic scroll-to-bottom functionality

### Backend Integration

6. The system must call the Genkit server endpoint at `http://localhost:3400/chatFlow` (or via a proxy at `/genkit-api/chatFlow`)
7. The system must send requests in the format expected by the Genkit server:
   ```typescript
   {
     message: string,
     conversationHistory: Array<{ role: string, content: string }>
   }
   ```
8. The system must handle responses from the Genkit server in the format:
   ```typescript
   {
     text: string,
     hasToolOutput: boolean,
     toolName?: string
   }
   ```
9. The system must maintain conversation history across multiple messages in the format required by Genkit

### Tool Calling Display

10. The system must detect when the `generateWorkout` tool has been called (based on `hasToolOutput` and `toolName` in the response)
11. The system must render the workout tool output using the existing `WorkoutComponent` from `frontend/src/components/workout-message.tsx`
12. The system must display tool execution states (loading, success, error) using the `Tool` AI Elements component
13. The system must show the tool input parameters (fitness level, goals, equipment, duration) in the tool header or metadata section

### User Interaction

14. The system must allow users to type messages in a textarea input field
15. The system must submit messages when the user presses Enter or clicks the submit button
16. The system must clear the input field after successful message submission
17. The system must disable the submit button when the input is empty or while a request is in progress
18. The system must provide a "Copy" action button on assistant messages to copy text to clipboard
19. The system must provide a "Regenerate" action button on the last assistant message to retry the response

### State Management

20. The system must manage the following UI states:
    - Input text state
    - Message history state
    - Loading/streaming status (`ready`, `submitted`, `streaming`, `error`)
    - Conversation history for Genkit API

21. The system must show a loading indicator when waiting for the AI response

### Error Handling

22. The system must display user-friendly error messages when the Genkit server is unavailable or returns an error
23. The system must handle network timeouts gracefully
24. The system must log errors to the console for debugging purposes

### Styling and Layout

25. The system must use a responsive layout that works on mobile and desktop screens
26. The system must use Tailwind CSS classes consistent with the existing application design
27. The system must maintain a max-width container (e.g., `max-w-4xl`) centered on the page
28. The system must use the application's existing color scheme and typography

## Non-Goals (Out of Scope)

1. **File attachments**: This feature will not support file uploads or attachments (AI Elements supports this, but the Genkit backend does not currently handle files)
2. **Model selector**: This feature will not include a model picker UI (Genkit server uses a fixed model)
3. **Web search integration**: This feature will not include web search or source citations
4. **Message branching**: This feature will not support multiple versions of messages or branching conversations
5. **Reasoning display**: This feature will not display extended thinking or reasoning tokens
6. **Authentication**: This feature will not include user authentication or session management
7. **Persistence**: This feature will not save conversation history to a database (conversations are ephemeral)
8. **Rate limiting UI**: This feature will not display rate limit status or warnings to the user (rate limiting is handled server-side)
9. **Backend modifications**: This feature will not modify the Genkit server code unless absolutely necessary for API compatibility
10. **Voice input**: This feature will not include microphone or voice input capabilities

## Design Considerations

### UI/UX Guidelines

- Follow the design patterns established in `/element-playground` route for consistency
- Use the same `WorkoutComponent` for rendering workout plans to maintain visual consistency
- Ensure the chat interface feels responsive and provides immediate feedback for user actions
- Display clear loading states so users know the AI is processing their request

### Component Reuse

- Reuse the existing `WorkoutComponent` from `frontend/src/components/workout-message.tsx`
- Reuse AI Elements components exactly as shown in the chatbot example documentation
- Follow the patterns demonstrated in `frontend/docs/ai-sdk-elements-examples-chatbot.md`

### Accessibility

- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements
- Provide `aria-label` attributes for icon-only buttons

## Technical Considerations

### API Compatibility Challenge

The main technical challenge is that the Genkit server returns a different response format than the AI SDK's `streamText` function:

- **AI SDK format** (used by `/api/playground/v2`): Returns a `UIMessageStream` with structured parts (text, tool calls, etc.)
- **Genkit format** (used by `/chatFlow`): Returns a simple JSON object with `{ text, hasToolOutput, toolName }`

**Solution Approach:**
- Create an adapter/middleware layer in the frontend that transforms Genkit responses into a format compatible with the `useChat` hook or create a custom hook
- Alternatively, use a lower-level approach with `useState` and `fetch` to manage the chat state manually
- Parse the tool output from the response and manually construct the UI parts

### Proxy Configuration

- The frontend Vite dev server currently proxies `/api` to `http://localhost:3000` (TypeScript backend)
- Need to add a proxy rule for `/genkit-api` to `http://localhost:3400` (Genkit server) in `vite.config.ts`
- Or make direct fetch calls to `http://localhost:3400` (may require CORS configuration on the Go server)

### Conversation History Management

- The Genkit server expects conversation history in a specific format: `Array<{ role: string, content: string }>`
- Need to maintain this history on the frontend and send it with each request
- Ensure tool call results are included in the conversation history if needed

### TypeScript Types

- Create TypeScript interfaces for the Genkit API request/response formats
- Reuse the `WorkoutOutput` type from `@backend/tools` or create a compatible type
- Ensure type safety between the frontend and Genkit backend

### Testing Considerations

- The Genkit server must be running on port 3400 for this feature to work
- Ensure the `GOOGLE_API_KEY` environment variable is set in the Genkit server
- The feature should gracefully handle the case where the Genkit server is not running

### Dependencies

- This feature depends on the existing Genkit server implementation in `genkit-server/main.go`
- This feature requires the AI Elements components already installed in the frontend
- This feature uses the existing `WorkoutComponent` and should not break if it's modified

## Success Metrics

1. **Functional parity**: The Genkit-powered chat interface provides the same core functionality as the TypeScript playground (messaging, tool calling, conversation flow)
2. **Tool execution visibility**: The `generateWorkout` tool executes successfully and displays results in a user-friendly format 100% of the time when called
3. **Response time**: The Genkit backend responds within an acceptable time frame (similar to or better than the TypeScript backend)
4. **Error rate**: Less than 5% of requests result in errors under normal operating conditions
5. **Developer evaluation**: The implementation provides sufficient evidence to make a go/no-go decision on migrating to Genkit for production

## Open Questions

1. **Streaming support**: Does the current Genkit implementation support streaming responses? If so, how should we integrate this with the frontend?
   - Current Genkit implementation has streaming callback but doesn't expose it via the HTTP endpoint

2. **Tool output format**: Does the Genkit server include the full workout tool output in the `text` response, or do we need to modify the backend to return structured tool data?
   - Need to verify the actual response format from Genkit when tools are called

3. **Error handling**: What specific error codes/messages does the Genkit server return, and how should we map them to user-friendly messages?

4. **CORS configuration**: Does the Genkit server need CORS headers configured for direct frontend calls, or should we rely on proxy configuration?

5. **Rate limiting feedback**: Should we display rate limit information to users, or is silent server-side enforcement sufficient for this prototype?

6. **Multi-turn tool calling**: How does Genkit handle scenarios where the AI needs to call multiple tools in sequence? Does this work automatically with `maxTurns: 10`?

7. **Route naming**: Should the route be named `/genkit-chat`, `/genkit-playground`, or something else for clarity?
   - Recommendation: `/genkit-playground` to match the existing `/playground` and `/element-playground` naming convention
