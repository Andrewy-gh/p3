Frontend ui logs:

User: Let's do a muscle building leg day!

Agent: Okay, I can help with that! To create the perfect muscle-building leg workout, I need a little more information:

    What's your fitness level (beginner, intermediate, or advanced)?
    What equipment do you have available (bodyweight, dumbbells, barbell, machines, etc.)?
    How much time do you have for the workout?
    Do you have any injuries or limitations I should know about?

User: Advanced. Barbell and machines. I have an hour and a half. No injuries.

Agent:

Here's your muscle-building leg day workout!
Result
🏋️ Your Workout Plan
Focus:legs
1. Barbell Squats
Working Sets
8 reps@ 225 lbs
8 reps@ 225 lbs
8 reps@ 225 lbs
2. Leg Press
Working Sets
10 reps@ 360 lbs
10 reps@ 360 lbs
10 reps@ 360 lbs
3. Leg Extensions
Working Sets
12 reps@ 90 lbs
12 reps@ 90 lbs
12 reps@ 90 lbs
4. Hamstring Curls
Working Sets
12 reps@ 60 lbs
12 reps@ 60 lbs
12 reps@ 60 lbs
5. Standing Calf Raises
Working Sets
15 reps@ 180 lbs
15 reps@ 180 lbs
15 reps@ 180 lbs
Coach Notes

Focus on controlled movements and proper form. Adjust weights as needed to maintain rep ranges. Rest 60-90 seconds between sets.
Total Exercises: 5Total Sets: 15

Server logs:
```bash
$ go run main.go
2025/11/30 00:04:19 Genkit initialized successfully
2025/11/30 00:04:19 Default model: googleai/gemini-2.0-flash
2025/11/30 00:04:19 generateWorkout tool defined successfully
2025/11/30 00:04:19 chatFlow defined successfully
2025/11/30 00:04:19 Rate limiter initialized: 10 requests per minute per client        
2025/11/30 00:04:19 Starting server on http://localhost:3400
2025/11/30 00:04:19 Health check available at: GET http://localhost:3400/health        
2025/11/30 00:04:19 Chat flow available at: POST http://localhost:3400/chatFlow        
2025/11/30 00:05:23 Streaming chunk: Okay, I can
2025/11/30 00:05:23 Streaming chunk:  help with that! To create the perfect muscle-building leg workout, I need a
2025/11/30 00:05:24 Streaming chunk:  little more information:

*   What's your fitness level (beginner, intermediate,
2025/11/30 00:05:24 Streaming chunk:  or advanced)?
*   What equipment do you have available (bodyweight, dumbbells, barbell, machines, etc.)?
*   How much time do you have
2025/11/30 00:05:24 Streaming chunk:  for the workout?
*   Do you have any injuries or limitations I should know about?
2025/11/30 00:05:24 Chat response generated (hasToolOutput=false, toolName=, hasToolData=false)
2025/11/30 00:05:48 Streaming chunk: Awesome
2025/11/30 00:05:48 Streaming chunk: , got it. I'm generating your workout now!
2025/11/30 00:05:52 Successfully generated workout with 5 exercises
2025/11/30 00:05:53 Streaming chunk: Here
2025/11/30 00:05:53 Streaming chunk: 's your muscle-building leg day workout!
2025/11/30 00:05:53 Tool called: generateWorkout (iteration 1)     
2025/11/30 00:05:53 Found tool output for generateWorkout
2025/11/30 00:05:53 Tool output data available (1019 bytes) - using structured output
2025/11/30 00:05:53 Chat response generated (hasToolOutput=true, toolName=generateWorkout, hasToolData=true)
```