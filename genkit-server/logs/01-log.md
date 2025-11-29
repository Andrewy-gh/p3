Server output:
```bash
2025/11/26 15:46:58 Streaming chunk: I'
2025/11/26 15:46:58 Streaming chunk: m Coach Nova, here to help you achieve your fitness goals! Let's get started
2025/11/26 15:46:58 Streaming chunk: .
2025/11/26 15:46:58 Chat response generated (hasToolOutput=false, toolName=)
2025/11/26 15:47:11 Streaming chunk: Awesome
2025/11/26 15:47:11 Streaming chunk: ! To build the perfect workout, I need a little more information. Tell me:

*
2025/11/26 15:47:11 Streaming chunk:    What's your fitness level (beginner, intermediate, or advanced)?
2025/11/26 15:47:11 Streaming chunk: *   What equipment do you have available?
*   How much time do you have for your workout session?
2025/11/26 15:47:11 Chat response generated (hasToolOutput=false, toolName=)
2025/11/26 15:47:50 Streaming chunk: Great! And what
2025/11/26 15:47:50 Streaming chunk: 's your primary fitness goal (strength, hypertrophy/muscle building, endurance, power
2025/11/26 15:47:50 Streaming chunk: , or general fitness)? Also, is there a specific area you'd like to
2025/11/26 15:47:51 Streaming chunk:  focus on (push, pull, legs, chest, back, arms, shoulders, or full body)?
2025/11/26 15:47:51 Chat response generated (hasToolOutput=false, toolName=)
2025/11/26 15:48:10 Streaming chunk: Got
2025/11/26 15:48:10 Streaming chunk:  it. Any injuries or pain I should know about before generating your workout?
2025/11/26 15:48:10 Chat response generated (hasToolOutput=false, toolName=)
2025/11/26 15:48:20 Streaming chunk: Perfect
2025/11/26 15:48:20 Streaming chunk: ! I'm generating your workout now.
2025/11/26 15:48:24 Successfully generated workout with 5 exercises
2025/11/26 15:48:24 Streaming chunk: Here
2025/11/26 15:48:25 Streaming chunk:  is your workout plan! Let me know how it goes!
2025/11/26 15:48:25 Tool called: generateWorkout (iteration 1)
2025/11/26 15:48:25 Chat response generated (hasToolOutput=true, toolName=generateWorkout)
```

Chat ui log:
```bash
User: Hello, What is your name?

Assistant: I'm Coach Nova, here to help you achieve your fitness goals! Let's get started.

User: Yes let's get started.

Assistant: Awesome! To build the perfect workout, I need a little more information. Tell me:

    What's your fitness level (beginner, intermediate, or advanced)?
    What equipment do you have available?
    How much time do you have for your workout session?

User: Intermediate, I have access to machines, dumbbells, benchs, and racks. I have an hour today.

Assistant: Great! And what's your primary fitness goal (strength, hypertrophy/muscle building, endurance, power, or general fitness)? Also, is there a specific area you'd like to focus on (push, pull, legs, chest, back, arms, shoulders, or full body)?

User: Strength, and I want to focus on legs.

Assistant: Got it. Any injuries or pain I should know about before generating your workout?

User: No injuries.

Assistant: Here is your workout plan! Let me know how it goes!
```