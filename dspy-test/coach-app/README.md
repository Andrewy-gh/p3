# Coach Nova - AI Fitness Coach

A production-ready DSPy application that demonstrates modular architecture, type-safe outputs, and automated prompt optimization. Coach Nova guides users through conversations to create personalized workout plans.

## Features

- **Conversational AI** - Natural coaching dialogue with efficient information gathering
- **Structured Extraction** - Parses free-form chat into structured workout parameters
- **Type-Safe Generation** - Pydantic-validated workout plans with exercises, sets, and reps
- **Optimized Prompts** - MIPROv2-optimized modules achieving 80%+ accuracy
- **Production Ready** - Error handling, validation, and session management

## Architecture

### Three-Module System

```
User Input
    ↓
┌─────────────────┐
│  CoachAgent     │  Conversational layer
│  (ChainOfThought) │  - Gathers requirements
└────────┬────────┘  - Decides when to extract
         ↓
    [Extract?]
         ↓
┌─────────────────┐
│ InfoExtractor   │  Structured data extraction
│ (ChainOfThought) │  - Parses conversation
└────────┬────────┘  - Validates fields
         ↓
    [Valid?]
         ↓
┌─────────────────┐
│WorkoutGenerator │  Workout plan generation
│ (ChainOfThought + Pydantic)
└────────┬────────┘
         ↓
    JSON Output
```

### Module Details

#### 1. CoachAgent (`modules.py:104-115`)

**Purpose:** Efficient conversational coach that gathers essential workout info

**Signature:**
```python
class ChatAgent(dspy.Signature):
    conversation_history = dspy.InputField(desc="All prior messages")
    user_message = dspy.InputField(desc="Current user input")

    response = dspy.OutputField(desc="Coaching response")
    should_extract = dspy.OutputField(desc="true if all essential fields gathered")
```

**Essential Fields:**
- Goal (strength/hypertrophy/endurance/power)
- Equipment (bodyweight/dumbbells/barbell/machines)
- Duration (minutes per session)
- Focus (push/pull/legs/full_body)
- Experience level (beginner/intermediate/advanced)
- Space (home/gym/hotel/outdoor)
- Injuries (any limitations)

**Key Behavior:**
- Asks 1-2 targeted questions max
- Prioritizes essential fields
- Sets `should_extract=true` when ready
- Avoids unnecessary questions about diet, nutrition, etc.

#### 2. InfoExtractor (`modules.py:118-126`)

**Purpose:** Extract structured workout parameters from conversation

**Accuracy:** 80% (baseline: 62.86%, +17.14% improvement)

**Signature:**
```python
class ExtractUserInfo(dspy.Signature):
    conversation_history = dspy.InputField(desc="Complete chat history")

    fitness_level = dspy.OutputField(desc="beginner|intermediate|advanced or null")
    goal = dspy.OutputField(desc="strength|hypertrophy|endurance|power|general or null")
    focus = dspy.OutputField(desc="push|pull|legs|chest|back|arms|shoulders|full_body or null")
    equipment = dspy.OutputField(desc="bodyweight|dumbbells|barbell|machines|cables|bands or null")
    duration = dspy.OutputField(desc="session minutes as number or null")
    space = dspy.OutputField(desc="home|gym|hotel|outdoor or null")
    injuries = dspy.OutputField(desc="any limitations/pain or null")
    primary_lift_pr = dspy.OutputField(desc="User's PR for main lift or null")
```

**Optimization:** Uses MIPROv2-optimized instructions + 2 few-shot examples

#### 3. WorkoutGenerator (`modules.py:129-137`)

**Purpose:** Generate type-safe, validated workout plans

**Quality:** 92.5% (already optimal, no improvement from optimization)

**Pydantic Models:**
```python
class WorkoutSet(BaseModel):
    reps: int
    setType: Literal["warmup", "working"]
    weight: Optional[float]

class Exercise(BaseModel):
    name: str
    sets: List[WorkoutSet]

class Workout(BaseModel):
    exercises: List[Exercise]
    notes: Optional[str]
    workoutFocus: Optional[str]
```

**Key Features:**
- Type-safe output (Pydantic validation)
- Real, established exercises only
- Appropriate weight/rep ranges
- Progressive warmup sets
- Safety notes for injuries

## Running the App

### Basic Usage

```bash
cd dspy-test/coach-app
uv run main.py
```

### Example Session

```
============================================================
Welcome to Coach Nova - Your AI Fitness Coach!
============================================================
Type 'exit' to quit at any time.

You: I want to build muscle with dumbbells at home

Coach Nova: Great! Building muscle with dumbbells is very effective.
To create your workout, I need to know:
- How much time do you have per session?
- What area do you want to focus on today (push/pull/legs)?
- What's your experience level?

You: 30 minutes, push day, intermediate

Coach Nova: Perfect! Any injuries or limitations I should know about?

You: No injuries

[Analyzing your requirements...]
[Generating your personalized workout...]

============================================================
YOUR PERSONALIZED WORKOUT
============================================================

Focus: Push (Chest, Shoulders, Triceps)

Dumbbell Bench Press:
  Set 1: 8 reps (warmup) @ 25lbs
  Set 2: 8 reps (working) @ 40lbs
  Set 3: 8 reps (working) @ 40lbs
  Set 4: 6 reps (working) @ 45lbs

Dumbbell Shoulder Press:
  Set 1: 10 reps (warmup) @ 15lbs
  Set 2: 8 reps (working) @ 25lbs
  Set 3: 8 reps (working) @ 25lbs
  Set 4: 8 reps (working) @ 25lbs

Dumbbell Tricep Extension:
  Set 1: 12 reps (warmup) @ 10lbs
  Set 2: 10 reps (working) @ 20lbs
  Set 3: 10 reps (working) @ 20lbs

Notes: Progressive overload focus. Increase weight when you can complete all sets with good form.
============================================================

Would you like to create another workout? (yes/no): no

Goodbye! Stay fit!
```

## Files Overview

### Core Files

| File | Lines | Purpose |
|------|-------|---------|
| `main.py` | 139 | Application loop and orchestration |
| `modules.py` | 138 | DSPy modules, signatures, and Pydantic models |
| `training_data.py` | 401 | Training examples for optimization (8+4) |
| `metrics.py` | 10,517 | Evaluation metrics for InfoExtractor and WorkoutGenerator |
| `optimize.py` | 12,946 | MIPROv2 optimization script |

### Supporting Files

| Directory | Purpose |
|-----------|---------|
| `logs/` | Conversation logs from coaching sessions |
| `__pycache__/` | Python bytecode cache |

## Optimization

### Running Optimization

```bash
# Optimize both modules
uv run optimize.py 3

# Optimize InfoExtractor only (faster, 5-10 min)
uv run optimize.py 1

# Optimize WorkoutGenerator only (faster, 5-10 min)
uv run optimize.py 2
```

### What Gets Optimized?

1. **Instructions** - Task-specific guidance added to signatures
2. **Few-shot examples** - Best demonstrations selected from training data
3. **Module structure** - Internal parameters tuned

### Optimization Results

**InfoExtractor:**
- Baseline: 62.86%
- Optimized: 80.00%
- Improvement: +17.14%
- Output: `../optimized/extractor.json`

**WorkoutGenerator:**
- Baseline: 92.50%
- Optimized: 92.50%
- Improvement: 0% (already optimal)
- Output: `../optimized/generator.json`

### Using Optimized Modules

#### Option 1: Load from JSON

```python
import dspy
from modules import InfoExtractor

extractor = InfoExtractor()
extractor.load("../optimized/extractor.json")

result = extractor(conversation_history=history)
```

#### Option 2: Compile During Runtime

```python
import dspy
from dspy.teleprompt import MIPROv2
from modules import InfoExtractor
from training_data import EXTRACTION_EXAMPLES
from metrics import extraction_metric

# Configure optimizer
optimizer = MIPROv2(
    metric=extraction_metric,
    prompt_model=dspy.settings.lm,
    task_model=dspy.settings.lm,
    num_candidates=10,
    init_temperature=1.0
)

# Optimize
optimized = optimizer.compile(
    InfoExtractor(),
    trainset=EXTRACTION_EXAMPLES,
    num_trials=20,
    max_bootstrapped_demos=2,
    max_labeled_demos=2
)

# Save for future use
optimized.save("../optimized/extractor.json")
```

### Optimization Configuration

**In `optimize.py`:**

```python
# MIPROv2 settings
num_candidates = 10        # Instruction variations to try
init_temperature = 1.0     # Sampling temperature
num_trials = 20            # Optimization iterations
max_bootstrapped_demos = 2 # Generated examples
max_labeled_demos = 2      # Training examples
```

**Resource Usage:**
- API Calls: ~30-50 per module
- Time: 15-25 minutes total (both modules)
- Free Tier Limit: 50 requests/day (may need multiple days)

See [../tasks/NEXT-SESSION-README.md](../tasks/NEXT-SESSION-README.md) for troubleshooting.

## Training Data

### Structure

`training_data.py` contains:
- 8 InfoExtractor examples
- 4 WorkoutGenerator examples

### Example Format

**InfoExtractor Example:**
```python
dspy.Example(
    conversation_history="[user: I want to build muscle...][coach: Great! What equipment...]",
    fitness_level="intermediate",
    goal="hypertrophy",
    focus="push",
    equipment="dumbbells",
    duration="30",
    space="home",
    injuries="null",
    primary_lift_pr="null"
).with_inputs("conversation_history")
```

**WorkoutGenerator Example:**
```python
dspy.Example(
    fitness_level="intermediate",
    goal="hypertrophy",
    focus="push",
    equipment="dumbbells",
    duration="30",
    space="home",
    injuries="none",
    primary_lift_pr="none",
    workout=Workout(...)  # Pydantic model
).with_inputs("fitness_level", "goal", "focus", ...)
```

### Adding Training Examples

1. Run conversations with `main.py`
2. Extract good examples from `logs/`
3. Add to `training_data.py` following existing format
4. Re-run optimization with larger dataset

## Metrics

### InfoExtractor Metric (`metrics.py`)

Evaluates field extraction accuracy:

```python
def extraction_metric(example, pred, trace=None):
    """Returns % of correctly extracted fields (0.0-1.0)"""
    score = 0.0
    fields = ["fitness_level", "goal", "focus", "equipment",
              "duration", "space", "injuries", "primary_lift_pr"]

    for field in fields:
        if normalize(getattr(pred, field)) == normalize(getattr(example, field)):
            score += 1.0

    return score / len(fields)
```

### WorkoutGenerator Metric (`metrics.py`)

Evaluates workout quality:

```python
def workout_metric(example, pred, trace=None):
    """Returns quality score (0.0-1.0)"""
    score = 0.0

    # Valid JSON structure (Pydantic validated)
    if pred.workout and pred.workout.exercises:
        score += 0.3

    # Appropriate number of exercises
    if 3 <= len(pred.workout.exercises) <= 6:
        score += 0.2

    # Valid exercise names (real exercises)
    # Valid set/rep ranges
    # ... more checks

    return score
```

## Error Handling

### Common Issues

**1. API Quota Exhausted**
```
Error: 429 Resource Exhausted
```

**Fix:**
- Wait 24 hours for free tier reset
- Upgrade to paid API tier
- Switch LLM provider

**2. Missing Fields**
```
[Still gathering info - missing: goal, equipment]
```

**Fix:** Continue conversation until all essential fields are provided.

**3. Invalid Workout Generation**

**Fix:**
- Check Pydantic validation errors
- Review `primary_lift_pr` if weights seem wrong
- Ensure valid `focus` field

### Logging

Enable detailed logging in `main.py`:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

View DSPy history:
```python
dspy.inspect_history(n=3)  # Last 3 interactions
```

## Development

### Adding New Features

#### New Extraction Field

1. Update `ExtractUserInfo` signature in `modules.py`
2. Update CoachAgent prompt to ask for new field
3. Add field to training examples in `training_data.py`
4. Update `extraction_metric` in `metrics.py`
5. Re-run optimization

#### New Workout Type

1. Update `GenerateWorkout` signature if needed
2. Add training examples in `training_data.py`
3. Update `workout_metric` for new validation rules
4. Re-run optimization

### Testing

```bash
# Run a full session
uv run main.py

# Test specific module
uv run python -c "
from modules import InfoExtractor
import dspy
import os

dspy.configure(lm=dspy.LM('gemini/gemini-2.0-flash-exp',
                          api_key=os.getenv('GOOGLE_GENERATIVE_AI_API_KEY')))

extractor = InfoExtractor()
result = extractor(conversation_history='[user: push day with dumbbells]')
print(result)
"

# Run evaluation
uv run python -c "
from modules import InfoExtractor
from training_data import EXTRACTION_EXAMPLES
from metrics import extraction_metric
import dspy

# Evaluate on training set
scores = [extraction_metric(ex, InfoExtractor()(conversation_history=ex.conversation_history))
          for ex in EXTRACTION_EXAMPLES]
print(f'Average: {sum(scores)/len(scores):.2%}')
"
```

### Performance Monitoring

Track metrics over time:

```python
import json
from datetime import datetime

results = {
    "timestamp": datetime.now().isoformat(),
    "extractor_accuracy": 0.80,
    "generator_quality": 0.925,
    "avg_response_time": 2.3,
    "user_satisfaction": 4.5
}

with open("logs/metrics.jsonl", "a") as f:
    f.write(json.dumps(results) + "\n")
```

## Production Deployment

### Porting to AI SDK

The optimized prompts can be ported to other frameworks (AI SDK, LangChain, etc.):

1. Extract instructions from `../optimized/extractor.json`
2. Port to your framework's prompt format
3. Include few-shot examples from JSON
4. Test and validate

**Example for AI SDK** (`backend/src/prompts.ts`):

```typescript
export const extractorPrompt = `
You are extracting structured workout info from conversations.

INSTRUCTIONS:
${optimizedInstructions}  // From extractor.json

EXAMPLES:
${fewShotExamples}  // From extractor.json

TASK:
Given this conversation: {conversation_history}

Extract the following fields...
`;
```

### API Wrapper

```python
from fastapi import FastAPI
from modules import CoachAgent, InfoExtractor, WorkoutGenerator
import dspy

app = FastAPI()

# Load optimized modules once at startup
coach = CoachAgent()
extractor = InfoExtractor()
extractor.load("optimized/extractor.json")
generator = WorkoutGenerator()
generator.load("optimized/generator.json")

@app.post("/chat")
def chat(history: str, message: str):
    result = coach(conversation_history=history, user_message=message)
    return {"response": result.response, "should_extract": result.should_extract}

@app.post("/extract")
def extract(history: str):
    result = extractor(conversation_history=history)
    return result.to_dict()

@app.post("/generate")
def generate(params: dict):
    result = generator(**params)
    return {"workout": result.workout.dict()}
```

## Resources

### Documentation
- [DSPy Docs](https://dspy-docs.vercel.app/)
- [MIPROv2 Paper](https://arxiv.org/abs/2406.11695)
- [Pydantic Docs](https://docs.pydantic.dev/)

### Project Files
- [Main README](../README.md)
- [Quick Start Example](../quick-start-app/README.md)
- [Optimization Guide](../tasks/NEXT-SESSION-README.md)
- [DSPy Reference](../docs/dspy-docs.md)

### External Links
- [Gemini API](https://ai.google.dev/)
- [DSPy GitHub](https://github.com/stanfordnlp/dspy)
- [UV Package Manager](https://docs.astral.sh/uv/)

---

**Built with DSPy** - Achieving 80% extraction accuracy through automated optimization.
