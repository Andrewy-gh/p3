  Summary of Changes

  Backend (genkit-server/main.go)

  1. ✅ Added toolOutputData field to ChatResponse struct
  2. ✅ Added extractToolOutput() function to extract tool outputs from response history
  3. ✅ Modified chatFlow to extract workout data and send it in TWO ways:
    - Embedded in response text (for backward compatibility)
    - In the toolOutputData field (clean structured data)
  4. ✅ Added encoding/json import

  Frontend

  1. ✅ Updated ChatResponse interface in genkit-api.ts with toolOutputData field
  2. ✅ Enhanced parseWorkoutFromResponse() to prioritize structured data with text parsing as fallback
  3. ✅ Updated genkit-chat.tsx to pass toolOutputData to the parser
  4. ✅ Added debug console logs as requested

  Testing Instructions

  1. Start the Servers

  Terminal 1 - Backend:
  cd genkit-server
  source setenv.sh
  go run main.go

  Terminal 2 - Frontend:
  cd frontend
  bunx --bun vite

  2. Test Workout Generation

  1. Navigate to http://localhost:5173/genkit-chat
  2. Start a conversation and provide workout parameters:
    - Example: "I want a 60-minute upper body workout for strength training. I'm intermediate level with access to barbells and dumbbells at the gym. No injuries."
  3. Expected Result: The WorkoutComponent should display with:
    - Workout focus badge
    - List of exercises with names
    - Sets (warmup and working)
    - Reps and weights
    - Coach notes

  3. Verify in Backend Logs

  Look for these log entries:
  - ✅ Tool called: generateWorkout (iteration 1)
  - ✅ Found tool output for generateWorkout
  - ✅ Appended workout JSON to response text (XXX bytes)
  - ✅ Chat response generated (hasToolOutput=true, toolName=generateWorkout, hasToolData=true)

  4. Verify in Frontend Console (F12)

  Look for ONE of these messages:
  - ✅ ✓ Using structured tool output data (preferred - using new field)
  - ✅ ✓ Parsed workout from response text (fallback - using embedded JSON)

  5. Inspect Network Response

  In DevTools → Network → Find the chatFlow request → Response should show:
  {
    "result": {
      "text": "Here is your workout plan!\n\n{...JSON...}",
      "hasToolOutput": true,
      "toolName": "generateWorkout",
      "toolOutputData": {
        "exercises": [...],
        "notes": "...",
        "workoutFocus": "..."
      }
    }
  }

  The structured workout data should now display beautifully in your WorkoutComponent! 🎉

