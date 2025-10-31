# Architecture Overview

Technical design documentation for the DSPy Test Project, focusing on the Coach Nova production application.

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│                   (Command Line)                         │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────┐
│                 Application Layer                        │
│                    (main.py)                            │
│  - Conversation management                              │
│  - Module orchestration                                 │
│  - Validation & error handling                          │
└──────────┬──────────────────────┬──────────────────────┘
           │                      │
           ↓                      ↓
┌──────────────────┐    ┌──────────────────────┐
│   CoachAgent     │    │   State Management   │
│   (Conversational)│   │   (History tracking) │
└────────┬─────────┘    └──────────────────────┘
         │
         ↓
    [Extract?]
         │
         ↓
┌──────────────────┐
│  InfoExtractor   │
│  (Structured)    │
└────────┬─────────┘
         │
         ↓
    [Complete?]
         │
         ↓
┌──────────────────┐
│WorkoutGenerator  │
│  (Type-safe)     │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│   Pydantic       │
│   Validation     │
└────────┬─────────┘
         │
         ↓
    JSON Output
```

## Core Components

### 1. Application Layer (`main.py`)

**Responsibilities:**
- User input/output handling
- Conversation flow orchestration
- Module lifecycle management
- Error handling and recovery
- Session state management

**Key Functions:**

```python
def main():
    """Main application loop."""
    # 1. Initialize modules
    coach = CoachAgent()
    extractor = InfoExtractor()
    generator = WorkoutGenerator()

    # 2. Conversation loop
    while True:
        # Get user input
        user_msg = input("You: ")

        # Generate coach response
        result = coach(conversation_history, user_msg)

        # Extract if ready
        if result.should_extract == "true":
            extracted = extractor(conversation_history)

            # Generate if valid
            if is_valid(extracted):
                workout = generator(**extracted)
                display(workout)
```

**Design Patterns:**
- **State Machine:** Conversation → Extraction → Generation
- **Pipeline:** Linear flow with validation gates
- **Error Recovery:** Try-except with user-friendly messages

### 2. Module Layer (`modules.py`)

**Architecture:**

```
┌─────────────────────────────────────────────────┐
│              Module Hierarchy                    │
├─────────────────────────────────────────────────┤
│                                                  │
│  dspy.Module (Base)                             │
│      │                                           │
│      ├─ CoachAgent                              │
│      │   └─ dspy.ChainOfThought(ChatAgent)     │
│      │                                           │
│      ├─ InfoExtractor                           │
│      │   └─ dspy.ChainOfThought(ExtractUserInfo)│
│      │                                           │
│      └─ WorkoutGenerator                        │
│          └─ dspy.ChainOfThought(GenerateWorkout)│
│              └─ Pydantic Output                 │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Module Details:**

#### CoachAgent
```python
class CoachAgent(dspy.Module):
    """Conversational layer.

    Input:  conversation_history (str), user_message (str)
    Output: response (str), should_extract (str)

    Behavior:
    - Gathers essential workout information
    - Asks 1-2 targeted questions
    - Decides when to extract
    """
```

#### InfoExtractor
```python
class InfoExtractor(dspy.Module):
    """Structured data extraction.

    Input:  conversation_history (str)
    Output: 8 structured fields (fitness_level, goal, etc.)

    Optimization:
    - MIPROv2 optimized: 62.86% → 80.00%
    - Uses 2 few-shot examples
    - Custom instructions
    """
```

#### WorkoutGenerator
```python
class WorkoutGenerator(dspy.Module):
    """Type-safe workout generation.

    Input:  8 workout parameters
    Output: Pydantic Workout model

    Features:
    - Type-safe with Pydantic validation
    - Realistic exercise selection
    - Progressive set/rep ranges
    - 92.5% quality score (baseline)
    """
```

### 3. Type System (`modules.py`)

**Pydantic Models:**

```
Workout
├── exercises: List[Exercise]
├── notes: Optional[str]
└── workoutFocus: Optional[str]

Exercise
├── name: str
└── sets: List[WorkoutSet]

WorkoutSet
├── reps: int
├── setType: Literal["warmup", "working"]
└── weight: Optional[float]
```

**Benefits:**
- Runtime validation
- Type safety
- Auto-generated documentation
- JSON serialization
- IDE autocomplete

### 4. Optimization Layer (`optimize.py`)

**MIPROv2 Architecture:**

```
┌──────────────────────────────────────┐
│         MIPROv2 Optimizer            │
├──────────────────────────────────────┤
│                                       │
│  Phase 1: Bootstrap                  │
│  - Generate demo examples            │
│  - Extract successful traces         │
│  - Create few-shot candidates        │
│                                       │
│  Phase 2: Instruction Proposal       │
│  - Generate instruction variants     │
│  - Evaluate on training set          │
│  - Select best candidates            │
│                                       │
│  Phase 3: Bayesian Optimization      │
│  - Combine instructions + demos      │
│  - Iteratively improve               │
│  - Track performance metrics         │
│                                       │
│  Output: Compiled Module JSON        │
│  - Optimized instructions            │
│  - Selected few-shot examples        │
│  - Configuration parameters          │
│                                       │
└──────────────────────────────────────┘
```

**Optimization Flow:**

```python
# 1. Initialize
optimizer = MIPROv2(
    metric=my_metric,
    prompt_model=llm,
    task_model=llm,
    num_candidates=10,
    init_temperature=1.0
)

# 2. Compile
optimized_module = optimizer.compile(
    student=module,
    trainset=examples,
    num_trials=20,
    max_bootstrapped_demos=2,
    max_labeled_demos=2
)

# 3. Save
optimized_module.save("optimized/module.json")
```

### 5. Evaluation Layer (`metrics.py`)

**Metric Architecture:**

```python
def metric(example: dspy.Example,
           pred: dspy.Prediction,
           trace: Optional[dict] = None) -> float:
    """
    Args:
        example: Ground truth with expected outputs
        pred: Model prediction to evaluate
        trace: Optional execution trace

    Returns:
        Score between 0.0 (worst) and 1.0 (best)
    """
```

**InfoExtractor Metric:**
- Field-level accuracy
- Exact match after normalization
- Equal weight per field
- Score: sum(correct_fields) / total_fields

**WorkoutGenerator Metric:**
- JSON structure validity (30%)
- Exercise count appropriateness (20%)
- Exercise name validity (20%)
- Set/rep ranges (15%)
- Weight progression (15%)

### 6. Training Data Layer (`training_data.py`)

**Data Structure:**

```python
EXTRACTION_EXAMPLES = [
    dspy.Example(
        # Input
        conversation_history="...",

        # Expected outputs
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="push",
        equipment="dumbbells",
        duration="30",
        space="home",
        injuries="null",
        primary_lift_pr="null"
    ).with_inputs("conversation_history"),
    # 7 more examples...
]

WORKOUT_EXAMPLES = [
    dspy.Example(
        # Inputs
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="push",
        equipment="dumbbells",
        duration="30",
        space="home",
        injuries="none",
        primary_lift_pr="none",

        # Expected output (Pydantic model)
        workout=Workout(
            exercises=[...],
            notes="...",
            workoutFocus="..."
        )
    ).with_inputs(...),
    # 3 more examples...
]
```

**Design Considerations:**
- Small but high-quality dataset (8+4 examples)
- Diverse coverage of parameter combinations
- Realistic conversations and workouts
- Clear expected outputs

## Data Flow

### Conversation Flow

```
User Input
    │
    ↓
┌─────────────────┐
│  main.py        │
│  - Validate     │
│  - Add history  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  CoachAgent     │
│  - Analyze      │
│  - Respond      │
│  - Decide       │
└────────┬────────┘
         │
         ↓
    should_extract?
         │
    ┌────┴────┐
    No        Yes
    │          │
    ↓          ↓
Continue   ┌─────────────────┐
  Loop     │  InfoExtractor  │
           │  - Parse        │
           │  - Structure    │
           └────────┬────────┘
                    │
                    ↓
               all_fields?
                    │
               ┌────┴────┐
               No        Yes
               │          │
               ↓          ↓
           Continue   ┌─────────────────┐
             Loop     │ WorkoutGenerator│
                      │  - Generate     │
                      │  - Validate     │
                      └────────┬────────┘
                               │
                               ↓
                          Display Result
```

### Optimization Flow

```
Training Data + Module
        │
        ↓
┌─────────────────┐
│  Bootstrap      │
│  - Run examples │
│  - Extract      │
│  - Create demos │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Propose        │
│  - Generate     │
│  - Evaluate     │
│  - Select       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Optimize       │
│  - Bayesian     │
│  - Iterate      │
│  - Converge     │
└────────┬────────┘
         │
         ↓
    Compiled JSON
```

## Design Decisions

### Why Three Modules?

**Separation of Concerns:**
1. **CoachAgent:** Handles conversation dynamics
2. **InfoExtractor:** Focuses on data extraction
3. **WorkoutGenerator:** Specializes in generation

**Benefits:**
- Independent optimization
- Easier testing and debugging
- Modular improvements
- Clear responsibilities

### Why ChainOfThought?

**Advantages:**
- Improved accuracy through reasoning
- Better handling of edge cases
- Debuggable reasoning traces
- Works well with optimization

**Tradeoffs:**
- Slightly slower than dspy.Predict
- Uses more tokens
- Overkill for simple tasks

### Why Pydantic for Outputs?

**Type Safety:**
- Runtime validation
- Catch errors early
- Clear schema definition

**Developer Experience:**
- IDE autocomplete
- Generated documentation
- Easy serialization

**DSPy Integration:**
- Native support in dspy.OutputField
- Automatic JSON parsing
- Validation on generation

### Why MIPROv2?

**Advantages over BootstrapFewShot:**
- Better with small datasets
- Instruction optimization
- Systematic exploration
- Bayesian optimization

**Tradeoffs:**
- More API calls (30-50 vs 5-10)
- Longer runtime (15-25 min vs 5-10 min)
- More complex to configure
- Free tier quota issues

## Performance Characteristics

### Latency

| Operation | Time | API Calls |
|-----------|------|-----------|
| Coach response | 1-3s | 1 |
| Info extraction | 1-3s | 1 |
| Workout generation | 2-5s | 1 |
| **Full session** | **10-30s** | **3-10** |

### Optimization

| Operation | Time | API Calls |
|-----------|------|-----------|
| InfoExtractor optimization | 10-15 min | 20-30 |
| WorkoutGenerator optimization | 10-15 min | 20-30 |
| **Both modules** | **15-25 min** | **30-50** |

### Accuracy

| Module | Baseline | Optimized | Improvement |
|--------|----------|-----------|-------------|
| InfoExtractor | 62.86% | 80.00% | **+17.14%** |
| WorkoutGenerator | 92.50% | 92.50% | Already optimal |

## Scalability Considerations

### Current Limitations

1. **Sequential processing** - One user at a time
2. **No caching** - Every call hits LLM
3. **In-memory state** - No persistence
4. **Single-threaded** - No concurrency

### Production Enhancements

**For API deployment:**

```python
from fastapi import FastAPI
from functools import lru_cache

app = FastAPI()

# 1. Load modules once
@lru_cache(maxsize=1)
def get_modules():
    coach = CoachAgent()
    extractor = InfoExtractor()
    extractor.load("optimized/extractor.json")
    generator = WorkoutGenerator()
    return coach, extractor, generator

# 2. Add caching
from redis import Redis
cache = Redis()

@app.post("/chat")
async def chat(session_id: str, message: str):
    # Get cached history
    history = cache.get(f"session:{session_id}")

    # Process
    coach, _, _ = get_modules()
    result = coach(conversation_history=history, user_message=message)

    # Update cache
    cache.set(f"session:{session_id}", updated_history)

    return {"response": result.response}
```

**For high throughput:**

```python
# 3. Batch processing
from asyncio import gather

async def process_batch(sessions):
    coach, extractor, generator = get_modules()
    tasks = [process_session(s, coach, extractor, generator)
             for s in sessions]
    return await gather(*tasks)

# 4. Rate limiting
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@app.post("/chat")
@limiter.limit("10/minute")
async def chat(...):
    ...
```

**For cost optimization:**

```python
# 5. Smaller models for simple tasks
coach = CoachAgent()
# Use flash for conversation
dspy.configure(lm=dspy.LM("gemini/gemini-2.0-flash-exp"))
coach_result = coach(...)

# Use pro for generation
dspy.configure(lm=dspy.LM("gemini/gemini-2.0-pro"))
workout = generator(...)
```

## Security Considerations

### Input Validation

```python
def validate_user_input(msg: str) -> bool:
    """Validate user input before processing."""
    if len(msg) > 1000:
        return False  # Too long
    if contains_injection_attempt(msg):
        return False  # Potential prompt injection
    return True
```

### Output Sanitization

```python
def sanitize_workout(workout: Workout) -> Workout:
    """Sanitize generated workout."""
    # Validate exercise names against whitelist
    valid_exercises = get_exercise_whitelist()
    for exercise in workout.exercises:
        if exercise.name not in valid_exercises:
            raise ValueError(f"Invalid exercise: {exercise.name}")

    # Validate weight ranges
    for exercise in workout.exercises:
        for set in exercise.sets:
            if set.weight and (set.weight < 0 or set.weight > 1000):
                raise ValueError(f"Invalid weight: {set.weight}")

    return workout
```

### API Key Management

```python
import os
from dotenv import load_dotenv

# Never commit .env files
load_dotenv()
api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
if not api_key:
    raise ValueError("API key not found")

# Use environment-specific keys
env = os.getenv("ENV", "development")
api_key = os.getenv(f"{env.upper()}_API_KEY")
```

## Testing Strategy

### Unit Tests
- Individual module behavior
- Metric calculations
- Data validation

### Integration Tests
- Full conversation flows
- Module interactions
- Error handling

### Optimization Tests
- Training data quality
- Metric accuracy
- Compiled module validity

### Performance Tests
- Latency measurements
- API call counts
- Resource usage

## Future Architecture Improvements

### Short-term
1. Add response caching
2. Implement session persistence
3. Add structured logging
4. Create API wrapper

### Medium-term
1. Multi-user support
2. Conversation branching
3. Preference learning
4. A/B testing framework

### Long-term
1. Multi-modal support (images, voice)
2. Personalization engine
3. Federated learning
4. Real-time adaptation

## References

- **DSPy Documentation:** [docs/dspy-docs.md](./docs/dspy-docs.md)
- **MIPROv2 Details:** [docs/dspy-mipro2-docs.md](./docs/dspy-mipro2-docs.md)
- **Implementation Plan:** [tasks/full-implementation-plan.md](./tasks/full-implementation-plan.md)
- **Optimization Status:** [tasks/optimization-status.md](./tasks/optimization-status.md)

---

**Architecture version:** 1.0
**Last updated:** October 2025
**Status:** Production-ready for single-user scenarios
