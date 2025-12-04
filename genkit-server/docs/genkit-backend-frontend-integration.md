# Genkit Backend-Frontend Integration Guide

## Overview

This document provides a comprehensive, beginner-friendly guide to understanding how the Genkit-powered fitness coaching chat interface works. It covers the complete data flow from user input in the React frontend through the TypeScript API layer to the Go-based Genkit server and back.

**Tech Stack:**
- **Frontend**: React 19 + TanStack Router + Vite
- **API Layer**: TypeScript with type-safe interfaces
- **Backend**: Go + Firebase Genkit SDK + Google Gemini 2.0 Flash
- **Communication**: REST API with JSON payloads

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Frontend (React)                                         │  │
│  │  Location: frontend/src/routes/genkit-chat.tsx           │  │
│  │  Port: Vite dev server (default: 5173)                   │  │
│  └─────────────────┬─────────────────────────────────────────┘  │
└────────────────────┼────────────────────────────────────────────┘
                     │
                     │ 1. User types message
                     │ 2. fetch('/genkit-api/chatFlow')
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VITE DEV SERVER PROXY                        │
│  Location: frontend/vite.config.ts                             │
│  Rule: /genkit-api/* → http://localhost:3400/*                 │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ 3. Proxied request
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GENKIT SERVER (Go)                            │
│  Location: genkit-server/main.go                               │
│  Port: 3400                                                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 1. Rate Limiting (10 req/min)                            │  │
│  │ 2. Genkit Flow Handler                                   │  │
│  │ 3. Conversation History Management                       │  │
│  │ 4. AI Model Call (Gemini 2.0 Flash)                      │  │
│  │ 5. Tool Execution (generateWorkout)                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ 4. Response with text + tool output
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                  │
│  Location: frontend/src/lib/genkit-api.ts                     │
│  - Type-safe request/response handling                         │
│  - Error handling & retry logic                                │
│  - Workout data parsing                                         │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ 5. Parsed response
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND UI UPDATES                           │
│  - Append AI message to conversation                           │
│  - Render WorkoutComponent if tool was called                  │
│  - Update conversation history for next request                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 1: Frontend Component (genkit-chat.tsx)

### Location
`frontend/src/routes/genkit-chat.tsx`

### Purpose
Provides a conversational UI for users to interact with Coach Nova, an AI fitness coach. Users can ask questions, get workout plans, and see structured workout data rendered as interactive components.

### Key State Management

The component manages four critical pieces of state:

```typescript
const [input, setInput] = useState('');                    // Current input text
const [messages, setMessages] = useState<UIMessage[]>([]); // UI messages for display
const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]); // API history
const [status, setStatus] = useState<ChatStatus>('ready'); // UI state
```

**Why two message arrays?**
- `messages`: UI-friendly format with metadata (id, timestamp, workoutData) for rendering
- `conversationHistory`: API-compatible format (just role + content) for sending to backend

### Data Flow: User Sends Message

Let's walk through what happens when a user types "I want a chest workout" and hits enter:

#### Step 1: Form Submission (Lines 139-149)
```typescript
const handleSubmit = (message: PromptInputMessage) => {
  handleSendMessage(input);  // Calls main handler
  setInput('');              // Clear input field
}
```

#### Step 2: Add User Message to UI (Lines 77-84)
```typescript
const userMessage: UIMessage = {
  id: `user-${Date.now()}`,
  role: 'user',
  content: messageText,  // "I want a chest workout"
  timestamp: Date.now(),
};
setMessages((prev) => [...prev, userMessage]);
```

**Result**: Message appears immediately in the UI while we wait for the API response.

#### Step 3: Call Backend API (Line 88)
```typescript
const response = await sendChatMessage(messageText, conversationHistory);
```

This calls the API layer (covered in Part 2).

#### Step 4: Handle Response (Lines 90-109)

**If the AI called a tool** (e.g., `generateWorkout`):
```typescript
if (response.hasToolOutput && response.toolName === 'generateWorkout') {
  workoutData = parseWorkoutFromResponse(response.text, response.toolOutputData);
}
```

**Add assistant message with workout data**:
```typescript
const assistantMessage: UIMessage = {
  id: `assistant-${Date.now()}`,
  role: 'assistant',
  content: response.text,           // "Here's your chest workout..."
  hasToolOutput: true,
  toolName: 'generateWorkout',
  workoutData: workoutData,         // Structured workout data
  timestamp: Date.now(),
};
setMessages((prev) => [...prev, assistantMessage]);
```

#### Step 5: Update Conversation History (Lines 112-116)
```typescript
setConversationHistory((prev) => [
  ...prev,
  { role: 'user', content: messageText },
  { role: 'model', content: response.text },
]);
```

**Why?** The next message the user sends needs context. The backend uses this history to maintain conversation context.

### Rendering Messages (Lines 201-249)

The component maps over `messages` and renders each one:

```typescript
{messages.map((message, index) => (
  <Fragment key={message.id}>
    {/* 1. Display the text message */}
    <Message from={message.role}>
      <MessageContent>
        <Response>{message.content}</Response>
      </MessageContent>
    </Message>

    {/* 2. If workout tool was called, show structured workout */}
    {message.role === 'assistant' &&
     message.hasToolOutput &&
     message.toolName === 'generateWorkout' &&
     message.workoutData && (
      <Tool defaultOpen={true}>
        <ToolHeader type="tool-generateWorkout" state="output-available" />
        <ToolContent>
          <ToolOutput output={<WorkoutComponent content={JSON.stringify(message.workoutData)} />} />
        </ToolContent>
      </Tool>
    )}

    {/* 3. Show actions (Retry/Copy) for last assistant message */}
    {message.role === 'assistant' && index === messages.length - 1 && (
      <Actions>
        <Action onClick={handleRegenerate} label="Retry">...</Action>
        <Action onClick={() => navigator.clipboard.writeText(message.content)} label="Copy">...</Action>
      </Actions>
    )}
  </Fragment>
))}
```

**Key Design Decision**: Workout data is rendered as a separate `<Tool>` component below the text message. This creates a clean separation between the AI's conversational response and the structured workout plan.

### Regenerate Functionality (Lines 154-194)

When a user clicks "Retry", the system:
1. Finds the last user message
2. Removes all messages after it (including the AI's response)
3. Rebuilds conversation history up to that point
4. Resends the user message

This allows users to get a different AI response without retyping their message.

---

## Part 2: API Layer (genkit-api.ts)

### Location
`frontend/src/lib/genkit-api.ts`

### Purpose
Provides type-safe communication between the React frontend and the Go backend. Handles request formatting, error handling, and response parsing.

### Type System

The API layer defines a strict contract:

```typescript
// REQUEST: What we send to the backend
export interface GenkitChatRequest {
  data: {
    message: string;
    conversationHistory?: ConversationMessage[];
  };
}

// RESPONSE: What we get back
export interface ChatResponse {
  text: string;              // AI's response text
  hasToolOutput: boolean;    // Did AI call a tool?
  toolName?: string;         // Which tool? (e.g., "generateWorkout")
  toolOutputData?: WorkoutOutput | unknown;  // Structured data from tool
}
```

### The sendChatMessage Function (Lines 133-192)

This is the core function that communicates with the backend:

```typescript
export async function sendChatMessage(
  message: string,
  conversationHistory?: ConversationMessage[]
): Promise<ChatResponse>
```

#### Step 1: Build Request Payload (Lines 138-145)
```typescript
const requestBody: GenkitChatRequest = {
  data: {
    message,
    // Only include history if it exists and isn't empty
    ...(conversationHistory && conversationHistory.length > 0
      ? { conversationHistory }
      : {}),
  },
};
```

**Example payload**:
```json
{
  "data": {
    "message": "I want a chest workout",
    "conversationHistory": [
      { "role": "user", "content": "Hi" },
      { "role": "model", "content": "Hello! I'm Coach Nova..." }
    ]
  }
}
```

#### Step 2: Send HTTP Request (Lines 147-153)
```typescript
const response = await fetch('/genkit-api/chatFlow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(requestBody),
});
```

**URL Transformation**:
- Frontend makes request to: `/genkit-api/chatFlow`
- Vite proxy rewrites to: `http://localhost:3400/chatFlow`
- Backend receives: `POST /chatFlow`

#### Step 3: Error Handling (Lines 155-176)

**Rate Limiting (429)**:
```typescript
if (response.status === 429) {
  throw new GenkitApiError(
    "You're sending requests too quickly. Please wait a moment and try again.",
    429
  );
}
```

**Other HTTP Errors**:
```typescript
let errorMessage = `Request failed with status ${response.status}`;
try {
  const errorData = await response.json() as GenkitError;
  if (errorData.error) {
    errorMessage = errorData.error;  // Use server's error message
  }
} catch {
  // JSON parsing failed, use generic message
}
throw new GenkitApiError(errorMessage, response.status);
```

#### Step 4: Parse Success Response (Lines 178-179)
```typescript
const data = await response.json() as GenkitFlowResponse<ChatResponse>;
return data.result;
```

**Why `data.result`?** Genkit flows wrap all responses in a standard format:
```json
{
  "result": {
    "text": "...",
    "hasToolOutput": true,
    "toolName": "generateWorkout",
    "toolOutputData": { ... }
  }
}
```

### Workout Data Parsing (Lines 203-238)

The `parseWorkoutFromResponse` function handles two scenarios:

#### Priority 1: Structured Tool Output (Lines 208-221)
```typescript
if (toolOutputData && typeof toolOutputData === 'object') {
  const workout = toolOutputData as WorkoutOutput;
  if (workout.exercises && Array.isArray(workout.exercises)) {
    return workout;  // ✓ Clean, structured data
  }
}
```

#### Priority 2: Fallback to Text Parsing (Lines 224-237)
```typescript
// Try to find JSON embedded in the response text
const jsonMatch = responseText.match(/\{[\s\S]*"exercises"[\s\S]*\}/);
if (jsonMatch) {
  const parsed = JSON.parse(jsonMatch[0]) as WorkoutOutput;
  if (parsed.exercises && Array.isArray(parsed.exercises)) {
    return parsed;  // ✓ Extracted from text
  }
}
```

**Why two approaches?** Backward compatibility. Older versions embedded JSON in the text. Modern versions use `toolOutputData`.

---

## Part 3: Backend Server (main.go)

### Location
`genkit-server/main.go`

### Purpose
Go-based HTTP server that uses Firebase Genkit SDK to provide AI-powered fitness coaching with tool-calling capabilities.

### Server Initialization (Lines 349-365)

```go
func main() {
    ctx := context.Background()

    // 1. Load API key from environment
    apiKey := os.Getenv("GOOGLE_API_KEY")
    if apiKey == "" {
        log.Fatal("GOOGLE_API_KEY environment variable is not set")
    }

    // 2. Initialize Genkit with Google AI plugin
    g := genkit.Init(ctx,
        genkit.WithPlugins(&googlegenai.GoogleAI{}),
        genkit.WithDefaultModel("googleai/gemini-2.0-flash"),
    )
}
```

**Key Setup**:
- Environment variable: `GOOGLE_API_KEY` must be set
- AI Provider: Google Generative AI (Gemini)
- Default Model: `gemini-2.0-flash` (fast, cost-effective)

### Tool Definition: generateWorkout (Lines 367-379)

Genkit tools are functions the AI can call to perform actions:

```go
genkit.DefineTool(
    g, "generateWorkout",
    "Creates and displays a personalized workout plan. Call this when you have: fitness level, goal, equipment, session duration, workout focus, space/location, and injury status.",
    func(ctx *ai.ToolContext, input WorkoutToolInput) (*WorkoutOutput, error) {
        // 1. Validate required fields
        if err := validateWorkoutInput(input); err != nil {
            return nil, err
        }

        // 2. Generate workout using AI
        return generateWorkoutWithAI(ctx, g, input)
    },
)
```

**Tool Description**: The AI reads this description to understand when and how to call the tool. Clear descriptions improve tool-calling accuracy.

**Input Validation** (Lines 244-265):
```go
func validateWorkoutInput(input WorkoutToolInput) error {
    if input.FitnessLevel == "" {
        return fmt.Errorf("fitnessLevel is required")
    }
    if input.SessionDuration <= 0 || input.SessionDuration > 300 {
        return fmt.Errorf("sessionDuration must be between 1 and 300 minutes")
    }
    // ... more validation
    return nil
}
```

**Workout Generation** (Lines 267-304):

The tool generates a workout using AI with structured output:

```go
func generateWorkoutWithAI(ctx context.Context, g *genkit.Genkit, input WorkoutToolInput) (*WorkoutOutput, error) {
    // Build user profile string
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

    // Generate structured data
    output, _, err := genkit.GenerateData[WorkoutOutput](ctx, g,
        ai.WithPrompt(userInfo),
        ai.WithSystem(workoutGenerationPrompt(userInfo)),
    )

    return output, nil
}
```

**Key Feature**: `GenerateData[WorkoutOutput]` returns strongly-typed Go structs, not raw JSON. Genkit handles schema validation automatically.

### Chat Flow Definition (Lines 401-509)

The `chatFlow` is the main endpoint that handles conversational AI:

```go
chatFlow := genkit.DefineFlow(g, "chatFlow", func(ctx context.Context, input *ChatInput) (*ChatResponse, error) {
    // ... (implementation explained below)
})
```

#### Step 1: Input Validation (Lines 403-409)
```go
if input == nil {
    return nil, fmt.Errorf("input cannot be nil")
}
if input.Message == "" {
    return nil, fmt.Errorf("message cannot be empty")
}
```

#### Step 2: Build Message History (Lines 411-430)
```go
var messages []*ai.Message

// Add conversation history
for _, msg := range input.ConversationHistory {
    var role ai.Role
    if msg.Role == "user" {
        role = ai.RoleUser
    } else if msg.Role == "model" {
        role = ai.RoleModel
    } else {
        continue  // Skip unknown roles
    }
    messages = append(messages, ai.NewUserMessage(ai.NewTextPart(msg.Content)))
    messages[len(messages)-1].Role = role
}

// Add current user message
messages = append(messages, ai.NewUserMessage(ai.NewTextPart(input.Message)))
```

**Message Structure**: Genkit requires messages in a specific format:
- Each message has a `Role` (user, model, or tool)
- Each message contains `Content` parts (text, images, etc.)

#### Step 3: Generate AI Response (Lines 432-445)
```go
resp, err := genkit.Generate(ctx, g,
    ai.WithSystem(CHAT_AGENT_PROMPT),              // System instructions
    ai.WithMessages(messages...),                   // Conversation history
    ai.WithModelName("googleai/gemini-2.0-flash"), // AI model
    ai.WithTools(genkit.LookupTool(g, "generateWorkout")),  // Available tools
    ai.WithMaxTurns(10),                            // Max tool-calling iterations
    ai.WithStreaming(func(ctx context.Context, chunk *ai.ModelResponseChunk) error {
        if text := chunk.Text(); text != "" {
            log.Printf("Streaming chunk: %s", text)
        }
        return nil
    }),
)
```

**Key Parameters**:
- `WithSystem`: Sets the system prompt (Coach Nova's personality and instructions)
- `WithMessages`: Provides conversation context
- `WithTools`: Makes the `generateWorkout` tool available to the AI
- `WithMaxTurns`: Limits tool-calling loops (prevents infinite recursion)
- `WithStreaming`: Logs chunks as they arrive (could be used for real-time streaming to frontend)

#### Step 4: Detect Tool Usage (Lines 450-478)
```go
var hasToolOutput bool
var toolName string
var toolCallCount int

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
                }
            }
        }
    }
}
```

**How it works**:
- After generation, `resp.History()` contains the full multi-turn conversation
- If the AI called a tool, there will be messages with `Role = ai.RoleTool`
- We extract the tool name and output for the frontend

#### Step 5: Extract Structured Tool Output (Lines 480-484)
```go
var toolOutputData interface{}
if hasToolOutput && toolName == "generateWorkout" {
    toolOutputData = extractToolOutput(history, toolName)
}
```

The `extractToolOutput` helper (Lines 383-399) finds the most recent tool response:
```go
func extractToolOutput(history []*ai.Message, toolName string) interface{} {
    var lastOutput interface{}
    for _, msg := range history {
        if msg.Role == ai.RoleTool {
            for _, part := range msg.Content {
                if part.IsToolResponse() {
                    toolResp := part.ToolResponse
                    if toolResp != nil && toolResp.Name == toolName {
                        lastOutput = toolResp.Output
                    }
                }
            }
        }
    }
    return lastOutput
}
```

#### Step 6: Build Response (Lines 486-508)
```go
responseText := resp.Text()

return &ChatResponse{
    Text:           responseText,      // AI's conversational response
    HasToolOutput:  hasToolOutput,     // true if tool was called
    ToolName:       toolName,          // "generateWorkout"
    ToolOutputData: toolOutputData,    // Structured workout data
}, nil
```

**Important**: The `toolOutputData` is sent separately from `Text`. The frontend renders them separately to avoid duplication.

### Rate Limiting (Lines 72-162)

The server implements a sliding window rate limiter:

```go
type RateLimiter struct {
    mu      sync.Mutex
    clients map[string][]time.Time  // Track request timestamps per client IP
    limit   int                      // Max requests per window
    window  time.Duration            // Time window
}
```

**Usage** (Line 514):
```go
rateLimiter := NewRateLimiter(10, time.Minute)  // 10 requests per minute per IP
```

**Middleware** (Lines 148-162):
```go
func rateLimitMiddleware(limiter *RateLimiter, next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        clientIP := getClientIP(r)

        if !limiter.Allow(clientIP) {
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusTooManyRequests)
            fmt.Fprintf(w, `{"error":"Rate limit exceeded. Maximum %d requests per minute allowed."}`, limiter.limit)
            return
        }

        next(w, r)  // Allow request
    }
}
```

**Client IP Detection** (Lines 124-145):
Checks multiple headers to handle proxies:
1. `X-Forwarded-For` (from load balancers)
2. `X-Real-IP` (from reverse proxies)
3. `RemoteAddr` (direct connection)

### HTTP Server Setup (Lines 517-535)
```go
mux := http.NewServeMux()

// Register chatFlow with rate limiting
mux.HandleFunc("POST /chatFlow", rateLimitMiddleware(rateLimiter, genkit.Handler(chatFlow)))

// Health check endpoint
mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, `{"status":"ok","service":"genkit-chat-server"}`)
})

// Start server on port 3400
if err := server.Start(ctx, "127.0.0.1:3400", mux); err != nil {
    log.Fatal(err)
}
```

**Endpoints**:
- `POST /chatFlow`: Main chat endpoint (rate-limited)
- `GET /health`: Health check (not rate-limited)

---

## Part 4: Request/Response Flow Example

Let's trace a complete request through the system:

### Scenario
User sends: "Create a beginner chest workout, 30 minutes, dumbbells only, at home"

### Frontend → API Layer

**Request initiated** (genkit-chat.tsx:88):
```typescript
const response = await sendChatMessage(
  "Create a beginner chest workout, 30 minutes, dumbbells only, at home",
  [] // Empty history (first message)
);
```

**Request formatted** (genkit-api.ts:138-145):
```json
{
  "data": {
    "message": "Create a beginner chest workout, 30 minutes, dumbbells only, at home"
  }
}
```

**HTTP request sent** (genkit-api.ts:147):
```
POST /genkit-api/chatFlow
Content-Type: application/json

{"data":{"message":"Create a beginner chest workout, 30 minutes, dumbbells only, at home"}}
```

### Vite Proxy → Backend

**Proxy rewrite** (vite.config.ts:34-38):
```
/genkit-api/chatFlow → http://localhost:3400/chatFlow
```

**Backend receives** (main.go:521):
```
POST /chatFlow
```

### Backend Processing

**1. Rate limit check** (main.go:148-162):
- Extract client IP: `127.0.0.1`
- Check request count: 1/10 ✓ Allowed

**2. Parse request** (main.go:403-409):
- Validate input: ✓ Message not empty
- Extract: `input.Message = "Create a beginner..."`
- Extract: `input.ConversationHistory = []` (empty)

**3. Build messages** (main.go:411-430):
```go
messages = [
  {Role: "user", Content: [TextPart("Create a beginner chest workout, 30 minutes, dumbbells only, at home")]}
]
```

**4. Call Gemini AI** (main.go:432-445):
```
System: "You are Coach Nova..." (CHAT_AGENT_PROMPT)
Model: gemini-2.0-flash
Tools: [generateWorkout]
Messages: ["Create a beginner chest workout..."]
```

**5. AI processes request**:

The AI analyzes the user's message and determines:
- Fitness level: beginner ✓
- Equipment: dumbbells ✓
- Duration: 30 minutes ✓
- Space: home ✓
- **Missing**: fitnessGoal, workoutFocus, injuries

**AI decides**: Need more information, don't call tool yet

**AI generates response**:
```
"Great! I can help you with that. Quick questions:
- What's your main goal: general fitness, strength, or muscle building?
- Any injuries or areas to avoid?"
```

**6. Extract response** (main.go:486-508):
```go
ChatResponse{
  Text: "Great! I can help you with that...",
  HasToolOutput: false,  // AI didn't call tool
  ToolName: "",
  ToolOutputData: nil,
}
```

### Backend → Frontend

**Genkit wraps response**:
```json
{
  "result": {
    "text": "Great! I can help you with that. Quick questions:\n- What's your main goal: general fitness, strength, or muscle building?\n- Any injuries or areas to avoid?",
    "hasToolOutput": false,
    "toolName": "",
    "toolOutputData": null
  }
}
```

**API layer receives** (genkit-api.ts:178-179):
```typescript
const data = await response.json();  // Parse wrapper
return data.result;                   // Extract actual response
```

**Frontend receives**:
```typescript
{
  text: "Great! I can help you with that...",
  hasToolOutput: false,
  toolName: undefined,
  toolOutputData: undefined
}
```

### Frontend Rendering

**Update UI** (genkit-chat.tsx:100-109):
```typescript
const assistantMessage: UIMessage = {
  id: "assistant-1701234567890",
  role: "assistant",
  content: "Great! I can help you with that...",
  hasToolOutput: false,  // No workout to render
  timestamp: 1701234567890,
};
setMessages([userMessage, assistantMessage]);
```

**Render** (genkit-chat.tsx:201-207):
```jsx
<Message from="assistant">
  <MessageContent>
    <Response>Great! I can help you with that...</Response>
  </MessageContent>
</Message>
// No <Tool> component since hasToolOutput = false
```

### Follow-up Request (User provides missing info)

**User sends**: "Muscle building, no injuries"

**Conversation history now includes**:
```typescript
conversationHistory = [
  { role: 'user', content: 'Create a beginner chest workout, 30 minutes, dumbbells only, at home' },
  { role: 'model', content: 'Great! I can help you with that...' },
]
```

**Backend receives**:
```json
{
  "data": {
    "message": "Muscle building, no injuries",
    "conversationHistory": [
      { "role": "user", "content": "Create a beginner chest workout..." },
      { "role": "model", "content": "Great! I can help you with that..." }
    ]
  }
}
```

**AI analyzes full context**:
- Previous message: "Create a beginner chest workout, 30 minutes, dumbbells only, at home"
- Current message: "Muscle building, no injuries"
- Extracted info:
  - Fitness level: beginner ✓
  - Equipment: dumbbells ✓
  - Duration: 30 ✓
  - Space: home ✓
  - Goal: hypertrophy (muscle building) ✓
  - Focus: chest ✓
  - Injuries: none ✓

**AI calls tool**:
```go
generateWorkout({
  FitnessLevel: "beginner",
  FitnessGoal: "hypertrophy",
  Equipment: "dumbbells",
  SessionDuration: 30,
  WorkoutFocus: "chest",
  SpaceConstraints: "home",
  Injuries: "",
})
```

**Tool generates workout** (main.go:267-304):
```json
{
  "exercises": [
    {
      "name": "Dumbbell Bench Press",
      "sets": [
        { "reps": 10, "setType": "warmup", "weight": 15 },
        { "reps": 10, "setType": "working", "weight": 25 },
        { "reps": 10, "setType": "working", "weight": 25 },
        { "reps": 8, "setType": "working", "weight": 30 }
      ]
    },
    {
      "name": "Dumbbell Flyes",
      "sets": [
        { "reps": 12, "setType": "working", "weight": 15 },
        { "reps": 12, "setType": "working", "weight": 15 },
        { "reps": 12, "setType": "working", "weight": 15 }
      ]
    },
    {
      "name": "Push-ups",
      "sets": [
        { "reps": 15, "setType": "working" },
        { "reps": 12, "setType": "working" },
        { "reps": 10, "setType": "working" }
      ]
    }
  ],
  "notes": "Rest 60-90 seconds between sets. Focus on controlled movement and full range of motion.",
  "workoutFocus": "chest"
}
```

**AI generates conversational response**:
```
"Perfect! I've created your beginner chest workout. It includes compound and isolation exercises to build your chest effectively."
```

**Backend response**:
```json
{
  "result": {
    "text": "Perfect! I've created your beginner chest workout...",
    "hasToolOutput": true,
    "toolName": "generateWorkout",
    "toolOutputData": {
      "exercises": [...],
      "notes": "Rest 60-90 seconds...",
      "workoutFocus": "chest"
    }
  }
}
```

**Frontend renders**:
1. Text message: "Perfect! I've created your beginner chest workout..."
2. Tool component with `WorkoutComponent` showing the structured workout table

---

## Part 5: Key Design Decisions

### 1. Why Separate `messages` and `conversationHistory`?

**Problem**: The UI needs metadata (id, timestamp, workoutData) that the API doesn't care about.

**Solution**: Maintain two separate arrays:
- `messages`: UI state with full metadata
- `conversationHistory`: API payload with minimal data (role + content)

**Alternative considered**: Use a single array and transform it before sending.
**Why rejected**: Transforming on every request is error-prone. Separate arrays make the data flow clearer.

### 2. Why Parse Workout Data Twice?

The `parseWorkoutFromResponse` function tries two approaches:
1. Structured `toolOutputData`
2. Regex extraction from text

**Reason**: Backward compatibility. Early versions embedded JSON in response text. Modern versions use `toolOutputData`. Supporting both ensures smooth migrations.

### 3. Why Rate Limiting Per IP?

**Problem**: Gemini API has quota limits. Unlimited requests could exhaust the quota.

**Solution**: Limit each IP to 10 requests/minute.

**Alternative considered**: Per-user rate limiting (requires authentication).
**Why rejected**: This is a demo app without user accounts. IP-based limiting is simpler.

### 4. Why Not Stream Responses?

The backend has streaming enabled (main.go:439-443), but the frontend doesn't consume the stream.

**Reason**: Simplicity. The frontend waits for the complete response. Streaming would require:
- Server-Sent Events (SSE) or WebSocket connection
- Incremental UI updates
- Handling partial JSON in `toolOutputData`

**Future improvement**: Add streaming for better UX on long responses.

### 5. Why Genkit Instead of Direct Gemini API?

**Advantages of Genkit**:
- Built-in tool-calling orchestration (handles multi-turn tool loops)
- Structured output with Go types (no manual JSON parsing)
- Standardized flow abstraction (easy to swap AI providers)
- Automatic schema validation

**Disadvantages**:
- Extra dependency
- Less control over raw API parameters

**Decision**: Genkit's tool-calling and structured output features save significant development time.

---

## Part 6: Common Troubleshooting

### Frontend Issues

**Problem**: Messages not appearing
- **Check**: Browser console for API errors
- **Fix**: Ensure backend is running on port 3400

**Problem**: Workout component not rendering
- **Check**: `response.hasToolOutput` is true
- **Check**: `response.toolOutputData` has valid structure
- **Fix**: Verify backend is returning `toolOutputData` (not just text)

**Problem**: "Rate limit exceeded" error
- **Cause**: Too many requests from the same IP
- **Fix**: Wait 1 minute or restart the backend server (clears rate limiter state)

### Backend Issues

**Problem**: "GOOGLE_API_KEY environment variable is not set"
- **Fix**: Create `genkit-server/.env.local` with `GOOGLE_API_KEY=your_key`
- **Fix**: Source the environment: `source genkit-server/setenv.sh`

**Problem**: Tool not being called
- **Check**: Genkit logs for "Tool called: generateWorkout"
- **Cause**: AI doesn't have all required info
- **Fix**: Verify the system prompt clearly explains when to call the tool

**Problem**: "Maximum tool-calling iterations (10) reached"
- **Cause**: Tool validation keeps failing, AI keeps retrying
- **Fix**: Check `validateWorkoutInput` - is it too strict?
- **Fix**: Improve AI's extraction logic in `CHAT_AGENT_PROMPT`

### API Layer Issues

**Problem**: JSON parsing errors
- **Cause**: Backend returned non-JSON response (e.g., HTML error page)
- **Fix**: Check backend logs for stack traces

**Problem**: `data.result is undefined`
- **Cause**: Backend didn't wrap response in Genkit format
- **Fix**: Verify `chatFlow` is returning `ChatResponse` correctly

---

## Part 7: Extending the System

### Adding a New Tool

**1. Define TypeScript interface** (genkit-api.ts):
```typescript
export interface NutritionPlanInput {
  calories: number;
  dietType: string;
  mealCount: number;
}

export interface NutritionPlanOutput {
  meals: Array<{
    name: string;
    calories: number;
    macros: { protein: number; carbs: number; fat: number };
  }>;
}
```

**2. Define Go structs** (main.go):
```go
type NutritionPlanInput struct {
    Calories  int    `json:"calories"`
    DietType  string `json:"dietType"`
    MealCount int    `json:"mealCount"`
}

type NutritionPlanOutput struct {
    Meals []Meal `json:"meals"`
}

type Meal struct {
    Name     string `json:"name"`
    Calories int    `json:"calories"`
    Macros   Macros `json:"macros"`
}

type Macros struct {
    Protein int `json:"protein"`
    Carbs   int `json:"carbs"`
    Fat     int `json:"fat"`
}
```

**3. Register tool** (main.go):
```go
genkit.DefineTool(
    g, "generateNutritionPlan",
    "Creates a personalized nutrition plan based on calorie and diet preferences.",
    func(ctx *ai.ToolContext, input NutritionPlanInput) (*NutritionPlanOutput, error) {
        // Validation
        if input.Calories < 1000 || input.Calories > 5000 {
            return nil, fmt.Errorf("calories must be between 1000 and 5000")
        }

        // Generate using AI
        output, _, err := genkit.GenerateData[NutritionPlanOutput](ctx, g,
            ai.WithPrompt(fmt.Sprintf("Generate %d meals for %d calories, %s diet",
                input.MealCount, input.Calories, input.DietType)),
        )
        return output, err
    },
)
```

**4. Add tool to chat flow** (main.go:437):
```go
ai.WithTools(
    genkit.LookupTool(g, "generateWorkout"),
    genkit.LookupTool(g, "generateNutritionPlan"),  // Add here
)
```

**5. Update system prompt** (main.go:165):
```go
const CHAT_AGENT_PROMPT = `
You are Coach Nova, an AI fitness and nutrition coach...

Available tools:
- generateWorkout: Call when you have complete workout requirements
- generateNutritionPlan: Call when you have diet preferences and calorie target
...
`
```

**6. Handle in frontend** (genkit-chat.tsx:210-229):
```typescript
{message.hasToolOutput && message.toolName === 'generateNutritionPlan' && message.nutritionData && (
  <Tool defaultOpen={true}>
    <ToolHeader type="tool-generateNutritionPlan" state="output-available" />
    <ToolContent>
      <ToolOutput output={<NutritionPlanComponent data={message.nutritionData} />} />
    </ToolContent>
  </Tool>
)}
```

### Adding Conversation Memory

Current implementation: History is client-side only (lost on page refresh).

**Improvement**: Store conversations in a database.

**Backend changes**:
```go
// Add session ID to requests
type ChatInput struct {
    Message             string    `json:"message"`
    SessionID           string    `json:"sessionId"`  // NEW
    ConversationHistory []Message `json:"conversationHistory,omitempty"`
}

// Load history from database
func loadHistory(sessionID string) ([]Message, error) {
    // Query database for messages with sessionID
    return db.GetMessages(sessionID)
}

// Save message to database
func saveMessage(sessionID string, role string, content string) error {
    return db.InsertMessage(sessionID, role, content)
}
```

**Frontend changes**:
```typescript
// Generate session ID on mount
const [sessionId] = useState(() => `session-${Date.now()}`);

// Include in requests
const requestBody: GenkitChatRequest = {
  data: {
    message,
    sessionId,  // NEW
    conversationHistory,
  },
};
```

---

## Part 8: File Reference Summary

| File | Purpose | Key Exports/Endpoints |
|------|---------|----------------------|
| `frontend/src/routes/genkit-chat.tsx` | React UI component | Route component with chat interface |
| `frontend/src/lib/genkit-api.ts` | API client & types | `sendChatMessage()`, type definitions |
| `frontend/vite.config.ts` | Dev server config | Proxy: `/genkit-api/*` → `localhost:3400` |
| `genkit-server/main.go` | Go backend server | `POST /chatFlow`, `GET /health` |
| `genkit-server/.env.local` | Environment vars | `GOOGLE_API_KEY` |

---

## Conclusion

This integration demonstrates a modern AI application architecture:

1. **Type Safety**: TypeScript on frontend, Go structs on backend, strict contracts at boundaries
2. **Separation of Concerns**: UI state, API client, and backend are cleanly separated
3. **Tool Calling**: AI can execute functions to provide structured outputs (workouts)
4. **Conversation Context**: Multi-turn dialogues with history management
5. **Error Handling**: Graceful degradation with user-friendly error messages
6. **Rate Limiting**: Protects API quota with per-IP request limits

The system is designed for extensibility—new tools, models, or features can be added without major refactoring.
