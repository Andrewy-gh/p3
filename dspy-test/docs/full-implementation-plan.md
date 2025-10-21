# Full DSPy Implementation Plan

## Phase 1: Module Setup

### 1.1 Signatures
```python
# ChatAgent - conversational layer
class ChatAgent(dspy.Signature):
    """Coach Nova: encouraging fitness coach, stays on-topic"""
    conversation_history = dspy.InputField(desc="All prior messages")
    user_message = dspy.InputField(desc="Current user input")

    response = dspy.OutputField(desc="Coaching response, 1-3 questions max, deflect off-topic")
    should_extract = dspy.OutputField(desc="true if have enough info to extract")

# InfoExtractor - structure conversation into fields
class ExtractUserInfo(dspy.Signature):
    """Extract structured workout requirements from conversation"""
    conversation_history = dspy.InputField(desc="Complete chat history")

    fitness_level = dspy.OutputField(desc="beginner|intermediate|advanced or null")
    goal = dspy.OutputField(desc="strength|hypertrophy|endurance|power|general or null")
    focus = dspy.OutputField(desc="push|pull|legs|chest|back|arms|shoulders|full_body or null")
    equipment = dspy.OutputField(desc="bodyweight|dumbbells|barbell|machines|cables|bands or null")
    duration = dspy.OutputField(desc="session minutes as number or null")
    space = dspy.OutputField(desc="home|gym|hotel|outdoor or null")
    injuries = dspy.OutputField(desc="any limitations/pain or null")

# WorkoutGenerator - create structured plan
class GenerateWorkout(dspy.Signature):
    """Generate workout matching requirements. JSON output."""
    fitness_level = dspy.InputField()
    goal = dspy.InputField()
    focus = dspy.InputField()
    equipment = dspy.InputField()
    duration = dspy.InputField()
    space = dspy.InputField()
    injuries = dspy.InputField()

    workout_json = dspy.OutputField(desc="JSON: {exercises: [{name, sets: [{reps, setType, weight?}]}], notes?, workoutFocus?}")
```

### 1.2 Modules
```python
class CoachAgent(dspy.Module):
    def __init__(self):
        super().__init__()
        self.chat = dspy.ChainOfThought(ChatAgent)

    def forward(self, conversation_history, user_message):
        return self.chat(
            conversation_history=conversation_history,
            user_message=user_message
        )

class InfoExtractor(dspy.Module):
    def __init__(self):
        super().__init__()
        self.extract = dspy.ChainOfThought(ExtractUserInfo)

    def forward(self, conversation_history):
        return self.extract(conversation_history=conversation_history)

class WorkoutGenerator(dspy.Module):
    def __init__(self):
        super().__init__()
        self.generate = dspy.ChainOfThought(GenerateWorkout)

    def forward(self, **user_requirements):
        return self.generate(**user_requirements)
```

## Phase 2: Application Loop

```python
# main.py or coach_app.py
import dspy

dspy.configure(lm=dspy.LM("gemini/gemini-2.0-flash", api_key=api_key))

coach = CoachAgent()
extractor = InfoExtractor()
generator = WorkoutGenerator()

history = []

while True:
    user_msg = input("You: ")
    if user_msg == "exit":
        break

    # Get coach response
    result = coach(
        conversation_history=str(history),
        user_message=user_msg
    )

    print(f"Coach Nova: {result.response}")
    history.append({"user": user_msg, "coach": result.response})

    # Check if ready to generate
    if result.should_extract == "true":
        extracted = extractor(conversation_history=str(history))

        # Check all required fields present
        if all([extracted.goal, extracted.equipment, extracted.duration, extracted.focus]):
            workout = generator(
                fitness_level=extracted.fitness_level or "intermediate",
                goal=extracted.goal,
                focus=extracted.focus,
                equipment=extracted.equipment,
                duration=extracted.duration,
                space=extracted.space or "gym",
                injuries=extracted.injuries or "none"
            )
            print(f"\nWorkout:\n{workout.workout_json}")
            break

dspy.inspect_history()
```

## Phase 3: Training Data Creation

### 3.1 Synthetic Examples (start with 20-30)

**ChatAgent examples:**
- User gives complete info upfront → confirm and extract
- User gives partial → ask specific missing fields
- User asks off-topic → deflect politely
- User modifies workout → extract modification intent

**InfoExtractor examples:**
- "Build muscle, dumbbells, 45 min" → goal=hypertrophy, equipment=dumbbells, duration=45
- "Beginner, home, no equipment" → level=beginner, space=home, equipment=bodyweight
- "Chest day at gym, 60 minutes, advanced" → focus=chest, space=gym, duration=60, level=advanced

**WorkoutGenerator examples:**
- Strength + barbell + 60min → 3-5 exercises, 1-6 reps, warmup sets
- Hypertrophy + dumbbells + 45min → 4-6 exercises, 8-12 reps
- Endurance + bodyweight + 30min → 5-7 exercises, 12-20 reps

### 3.2 Real Data (after interactive testing)
- Run DSPy app yourself, create various scenarios
- Save successful conversations as examples
- Label extractions manually

## Phase 4: Optimization

### 4.1 Define Metrics
```python
def extraction_accuracy(example, prediction, trace=None):
    """Check if extracted fields match expected"""
    score = 0
    if example.goal == prediction.goal: score += 1
    if example.equipment == prediction.equipment: score += 1
    # ... check all fields
    return score / 7  # 7 fields total

def workout_quality(example, prediction, trace=None):
    """Check workout meets requirements"""
    # Parse JSON, verify:
    # - Exercise count appropriate for duration
    # - Exercises match focus area
    # - Rep ranges match goal
    # - Only uses specified equipment
    return quality_score  # 0.0 to 1.0
```

### 4.2 Run Optimization
```python
# Optimize InfoExtractor
extractor_trainset = [...]  # 20-30 examples
extractor_optimizer = dspy.BootstrapFewShot(metric=extraction_accuracy)
optimized_extractor = extractor_optimizer.compile(
    student=InfoExtractor(),
    trainset=extractor_trainset
)

# Optimize WorkoutGenerator
generator_trainset = [...]  # 20-30 examples
generator_optimizer = dspy.BootstrapFewShot(metric=workout_quality)
optimized_generator = generator_optimizer.compile(
    student=WorkoutGenerator(),
    trainset=generator_trainset
)

# Save optimized modules
optimized_extractor.save('optimized_extractor.json')
optimized_generator.save('optimized_generator.json')
```

### 4.3 Inspect Results
```python
dspy.inspect_history(n=5)
# Examine:
# - What few-shot examples were selected
# - How prompts were refined
# - What instructions were added
```

## Phase 5: Port to AI SDK

### 5.1 Extract Optimized Prompts
- Inspect DSPy's compiled prompts (in history)
- Note few-shot examples it selected
- Note refined instructions/constraints

### 5.2 Update AI SDK Prompts
```typescript
// Update CHAT_AGENT_PROMPT with:
// - Refined instructions from ChatAgent
// - Few-shot examples from InfoExtractor
// - Better field descriptions

// Update WORKOUT_GENERATION_PROMPT with:
// - Refined constraints from WorkoutGenerator
// - Better exercise selection logic
// - Improved programming guidelines
```

### 5.3 Test & Compare
- Run same test cases through both systems
- Compare output quality
- Measure improvement

## File Structure

```
dspy-test/
├── coach-app/
│   ├── main.py              # Full application loop
│   ├── modules.py           # All 3 modules + signatures
│   ├── training_data.py     # Example datasets
│   ├── optimize.py          # Optimization script
│   └── metrics.py           # Evaluation functions
├── optimized/
│   ├── extractor.json       # Saved optimized module
│   └── generator.json       # Saved optimized module
└── docs/
    └── full-implementation-plan.md
```

## Unresolved Questions

1. **Modification handling**: When user says "swap exercise X for Y", should:
   - InfoExtractor detect this as modification intent?
   - Add `modification_request` OutputField to ExtractUserInfo?
   - Create separate ModifyWorkout signature?

2. **Conversation history format**: String concat vs structured?
   ```python
   # Option A: String
   "User: build muscle\nCoach: Great! What equipment?\nUser: dumbbells"

   # Option B: Structured
   [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
   ```

3. **JSON validation**: WorkoutGenerator outputs JSON string. Should:
   - Add validation in metric function?
   - Use TypedPredictor for structured output?
   - Let DSPy learn JSON format from examples?

4. **Gemini 2.0 Flash support**: Is this model already supported in DSPy or need custom LM class?

5. **Training data volume**: Start with 20 examples or need 50+ for good optimization?
