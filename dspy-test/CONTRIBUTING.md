# Contributing to DSPy Test Project

Thank you for your interest in improving this project! This guide will help you extend, modify, and contribute to the codebase.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Adding Features](#adding-features)
- [Optimization Workflow](#optimization-workflow)
- [Testing](#testing)
- [Documentation](#documentation)
- [Common Tasks](#common-tasks)

## Development Setup

### Prerequisites

- Python 3.13+
- [UV package manager](https://docs.astral.sh/uv/)
- API key for LLM provider (Gemini, OpenAI, or Claude)
- Git (for version control)

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd dspy-test

# Install dependencies
uv sync

# Set up environment
cp .env.example .env
# Add your API key to .env

# Verify installation
cd quick-start-app
uv run main.py
```

### Development Environment

```bash
# Activate virtual environment (optional, uv handles this)
source .venv/bin/activate  # Unix
.venv\Scripts\activate     # Windows

# Install additional dev tools if needed
uv add --dev pytest black ruff mypy
```

## Project Architecture

### Directory Structure

```
dspy-test/
├── quick-start-app/       # Learning examples
│   ├── main.py           # Simple conversational agent
│   └── log-*.md          # Example outputs
│
├── coach-app/            # Production application
│   ├── main.py          # Application orchestration
│   ├── modules.py       # DSPy modules and signatures
│   ├── training_data.py # Training examples
│   ├── metrics.py       # Evaluation metrics
│   └── optimize.py      # MIPROv2 optimization
│
├── optimized/            # Compiled optimized modules
│   ├── extractor.json
│   └── generator.json
│
├── docs/                 # Reference documentation
└── tasks/                # Project planning
```

### Key Files

| File | Purpose | Modify for... |
|------|---------|---------------|
| `coach-app/modules.py` | Module definitions | Adding modules, changing signatures |
| `coach-app/main.py` | App orchestration | Changing flow, adding features |
| `coach-app/training_data.py` | Training examples | Improving optimization |
| `coach-app/metrics.py` | Evaluation metrics | Custom quality measures |
| `coach-app/optimize.py` | Optimization script | Tuning optimization |

## Adding Features

### Adding a New Module

1. **Define the signature** in `coach-app/modules.py`:

```python
class MyNewTask(dspy.Signature):
    """Clear description of what this module does."""

    input_field = dspy.InputField(desc="Description of input")
    output_field = dspy.OutputField(desc="Description of output")
```

2. **Create the module**:

```python
class MyNewModule(dspy.Module):
    """Module for my new task."""

    def __init__(self):
        super().__init__()
        self.predictor = dspy.ChainOfThought(MyNewTask)

    def forward(self, input_field):
        return self.predictor(input_field=input_field)
```

3. **Add training examples** in `coach-app/training_data.py`:

```python
MY_NEW_EXAMPLES = [
    dspy.Example(
        input_field="example input",
        output_field="expected output"
    ).with_inputs("input_field")
    # Add 5-10 examples
]
```

4. **Create evaluation metric** in `coach-app/metrics.py`:

```python
def my_new_metric(example, pred, trace=None):
    """Evaluate my new module's performance."""
    # Return 0.0 to 1.0 based on quality
    if pred.output_field == example.output_field:
        return 1.0
    return 0.0
```

5. **Integrate in main.py**:

```python
from modules import MyNewModule

my_module = MyNewModule()
result = my_module(input_field=user_data)
```

### Adding a New Field to InfoExtractor

1. **Update signature** (`modules.py:72-83`):

```python
class ExtractUserInfo(dspy.Signature):
    # ... existing fields ...
    new_field = dspy.OutputField(desc="Description of new field or null")
```

2. **Update CoachAgent prompt** (`modules.py:47-64`) to ask for new field:

```python
class ChatAgent(dspy.Signature):
    """...existing prompt...

    ESSENTIAL INFO (prioritize these):
    ...existing fields...
    - New field (description)
    """
```

3. **Add to training examples** (`training_data.py`):

```python
dspy.Example(
    conversation_history="...",
    # ... existing fields ...
    new_field="example value"  # Add to all examples
).with_inputs("conversation_history")
```

4. **Update metric** (`metrics.py`):

```python
def extraction_metric(example, pred, trace=None):
    fields = [
        "fitness_level", "goal", "focus", "equipment",
        "duration", "space", "injuries", "primary_lift_pr",
        "new_field"  # Add here
    ]
    # ... rest of metric
```

5. **Re-run optimization**:

```bash
cd coach-app
uv run optimize.py 1  # Just InfoExtractor
```

### Adding a New Exercise Type

1. **Update Pydantic models** if needed (`modules.py:20-40`)

2. **Add training examples** (`training_data.py`):

```python
WORKOUT_EXAMPLES.append(
    dspy.Example(
        fitness_level="intermediate",
        goal="strength",
        focus="new_exercise_type",
        equipment="barbell",
        duration="45",
        space="gym",
        injuries="none",
        primary_lift_pr="315lb squat",
        workout=Workout(
            exercises=[
                Exercise(
                    name="New Exercise",
                    sets=[
                        WorkoutSet(reps=5, setType="warmup", weight=135),
                        WorkoutSet(reps=5, setType="working", weight=225),
                    ]
                )
            ],
            notes="Safety notes for new exercise",
            workoutFocus="New Exercise Type"
        )
    ).with_inputs(
        "fitness_level", "goal", "focus", "equipment",
        "duration", "space", "injuries", "primary_lift_pr"
    )
)
```

3. **Update validation** in `metrics.py` if needed

4. **Re-run optimization**:

```bash
cd coach-app
uv run optimize.py 2  # Just WorkoutGenerator
```

## Optimization Workflow

### Standard Optimization Process

```bash
# 1. Update training data
code coach-app/training_data.py
# Add 5-10 high-quality examples

# 2. Update metrics if needed
code coach-app/metrics.py
# Adjust evaluation criteria

# 3. Run optimization
cd coach-app
uv run optimize.py 3  # Both modules

# 4. Review results
ls -la ../optimized/
cat ../optimized/extractor.json

# 5. Test optimized modules
uv run main.py
# Run several test conversations

# 6. Compare performance
uv run python -c "
from modules import InfoExtractor
from training_data import EXTRACTION_EXAMPLES
from metrics import extraction_metric
import dspy

# Test baseline vs optimized
# ... evaluation code
"
```

### Optimization Configuration

Edit `coach-app/optimize.py` to tune optimization:

```python
# Line ~45: MIPROv2 configuration
optimizer = MIPROv2(
    metric=extraction_metric,
    prompt_model=dspy.settings.lm,
    task_model=dspy.settings.lm,
    num_candidates=10,        # ← More = better but slower
    init_temperature=1.0       # ← Higher = more exploration
)

# Line ~55: Compile settings
optimized = optimizer.compile(
    module,
    trainset=examples,
    num_trials=20,            # ← More = better but slower
    max_bootstrapped_demos=2,  # ← Generated examples
    max_labeled_demos=2,       # ← Training examples
    requires_permission_to_run=False
)
```

**Performance vs Cost Tradeoff:**

| Setting | Fast | Balanced | Thorough |
|---------|------|----------|----------|
| `num_candidates` | 5 | 10 | 20 |
| `num_trials` | 10 | 20 | 30 |
| `max_bootstrapped_demos` | 1 | 2 | 3 |
| `max_labeled_demos` | 1 | 2 | 3 |
| **Time** | 5-10 min | 15-25 min | 30-45 min |
| **API calls** | ~20 | ~40 | ~80 |

### Using Different LLM Providers

Edit `optimize.py` line ~39:

```python
# OpenAI
dspy.configure(
    lm=dspy.LM("gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
)

# Anthropic Claude
dspy.configure(
    lm=dspy.LM("claude-3-haiku-20240307", api_key=os.getenv("ANTHROPIC_API_KEY"))
)

# Google Gemini (default)
dspy.configure(
    lm=dspy.LM("gemini/gemini-2.0-flash-exp",
               api_key=os.getenv("GOOGLE_GENERATIVE_AI_API_KEY"))
)
```

## Testing

### Manual Testing

```bash
# Test quick start
cd quick-start-app
uv run main.py
# Have a conversation, verify it works

# Test coach app
cd ../coach-app
uv run main.py
# Get a full workout, verify quality
```

### Automated Testing

Create `coach-app/test_modules.py`:

```python
import dspy
import os
from modules import InfoExtractor, WorkoutGenerator
from training_data import EXTRACTION_EXAMPLES, WORKOUT_EXAMPLES
from metrics import extraction_metric, workout_metric

# Configure DSPy
dspy.configure(
    lm=dspy.LM(
        "gemini/gemini-2.0-flash-exp",
        api_key=os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
    )
)

def test_extractor():
    """Test InfoExtractor on training data."""
    extractor = InfoExtractor()
    # Load optimized version if available
    try:
        extractor.load("../optimized/extractor.json")
    except:
        pass

    scores = []
    for example in EXTRACTION_EXAMPLES:
        pred = extractor(conversation_history=example.conversation_history)
        score = extraction_metric(example, pred)
        scores.append(score)
        print(f"Example {len(scores)}: {score:.2%}")

    avg = sum(scores) / len(scores)
    print(f"\nAverage: {avg:.2%}")
    assert avg >= 0.7, f"Extraction accuracy too low: {avg:.2%}"

def test_generator():
    """Test WorkoutGenerator on training data."""
    generator = WorkoutGenerator()
    try:
        generator.load("../optimized/generator.json")
    except:
        pass

    scores = []
    for example in WORKOUT_EXAMPLES:
        pred = generator(
            fitness_level=example.fitness_level,
            goal=example.goal,
            focus=example.focus,
            equipment=example.equipment,
            duration=example.duration,
            space=example.space,
            injuries=example.injuries,
            primary_lift_pr=example.primary_lift_pr
        )
        score = workout_metric(example, pred)
        scores.append(score)
        print(f"Example {len(scores)}: {score:.2%}")

    avg = sum(scores) / len(scores)
    print(f"\nAverage: {avg:.2%}")
    assert avg >= 0.8, f"Workout quality too low: {avg:.2%}"

if __name__ == "__main__":
    print("Testing InfoExtractor...")
    test_extractor()
    print("\nTesting WorkoutGenerator...")
    test_generator()
    print("\n✅ All tests passed!")
```

Run tests:
```bash
cd coach-app
uv run test_modules.py
```

### Integration Testing

Test the full application flow:

```bash
# Create test script
cat > coach-app/test_integration.py << 'EOF'
import dspy
import os
from modules import CoachAgent, InfoExtractor, WorkoutGenerator

dspy.configure(
    lm=dspy.LM("gemini/gemini-2.0-flash-exp",
               api_key=os.getenv("GOOGLE_GENERATIVE_AI_API_KEY"))
)

# Simulate conversation
coach = CoachAgent()
extractor = InfoExtractor()
generator = WorkoutGenerator()

history = []

# User message 1
msg1 = "I want to build muscle with dumbbells at home"
result1 = coach(conversation_history=str(history), user_message=msg1)
history.append({"user": msg1, "coach": result1.response})
print(f"Coach: {result1.response}\n")

# User message 2
msg2 = "30 minutes, push day, intermediate level, no injuries"
result2 = coach(conversation_history=str(history), user_message=msg2)
history.append({"user": msg2, "coach": result2.response})
print(f"Coach: {result2.response}\n")

# Extract and generate
if result2.should_extract.lower() == "true":
    extracted = extractor(conversation_history=str(history))
    print(f"Extracted: {extracted}\n")

    workout = generator(
        fitness_level=extracted.fitness_level or "intermediate",
        goal=extracted.goal,
        focus=extracted.focus,
        equipment=extracted.equipment,
        duration=extracted.duration,
        space=extracted.space or "home",
        injuries=extracted.injuries or "none",
        primary_lift_pr=extracted.primary_lift_pr or "none"
    )

    print(f"Workout: {workout.workout.exercises[0].name}")
    print("✅ Integration test passed!")
else:
    print("❌ Should have extracted but didn't")
EOF

uv run test_integration.py
```

## Documentation

### Updating Documentation

When you add features, update relevant docs:

1. **Code changes** → Update module docstrings
2. **New modules** → Add section to `coach-app/README.md`
3. **New features** → Update main `README.md`
4. **Optimization changes** → Update `tasks/optimization-status.md`
5. **Architecture changes** → Update all affected READMEs

### Documentation Standards

**Module docstrings:**
```python
class MyModule(dspy.Module):
    """One-line summary.

    Longer description of what this module does,
    when to use it, and key behaviors.

    Example:
        >>> module = MyModule()
        >>> result = module(input="test")
    """
```

**Function docstrings:**
```python
def my_metric(example, pred, trace=None):
    """Calculate quality score for predictions.

    Args:
        example: Ground truth example with expected outputs
        pred: Model prediction to evaluate
        trace: Optional trace for debugging

    Returns:
        Float between 0.0 and 1.0 representing quality
    """
```

### Generating Docs from Code

Use `dspy.inspect_history()` to document optimization:

```python
# After optimization
dspy.inspect_history(n=5)
# Copy relevant instructions to docs/
```

## Common Tasks

### Changing LLM Model

```python
# In any .py file, update the configure line:
dspy.configure(lm=dspy.LM("model-name", api_key=api_key))

# Examples:
# Gemini Flash: "gemini/gemini-2.0-flash-exp"
# Gemini Pro: "gemini/gemini-2.0-pro"
# GPT-4: "gpt-4o"
# Claude: "claude-3-5-sonnet-20241022"
```

### Adding More Training Data

```python
# In training_data.py, append to existing lists:

EXTRACTION_EXAMPLES.extend([
    dspy.Example(
        conversation_history="[new conversation]",
        fitness_level="intermediate",
        # ... all fields
    ).with_inputs("conversation_history"),
    # Add 5-10 more examples
])

# Re-run optimization to incorporate new data
```

### Debugging Optimization Failures

```bash
# 1. Check API quota
# Visit: https://ai.dev/usage?tab=rate-limit

# 2. Reduce optimization parameters
# Edit optimize.py:
num_candidates = 5      # Was 10
num_trials = 10         # Was 20

# 3. Test on single module first
uv run optimize.py 1    # Just InfoExtractor

# 4. Review detailed history
uv run python -c "import dspy; dspy.inspect_history(n=10)"

# 5. Check training data quality
uv run python -c "
from training_data import EXTRACTION_EXAMPLES
print(f'Examples: {len(EXTRACTION_EXAMPLES)}')
print(EXTRACTION_EXAMPLES[0])
"
```

### Exporting Optimized Prompts

```python
import json

# Load optimized module
with open("optimized/extractor.json", "r") as f:
    data = json.load(f)

# Extract instructions
instructions = data.get("instructions", "")
print(instructions)

# Extract demos
demos = data.get("demos", [])
for i, demo in enumerate(demos):
    print(f"\nExample {i+1}:")
    print(demo)
```

### Performance Monitoring

```python
# Add to main.py to track metrics
import json
import time
from datetime import datetime

class MetricsTracker:
    def __init__(self):
        self.metrics = []

    def log(self, event, duration, success):
        self.metrics.append({
            "timestamp": datetime.now().isoformat(),
            "event": event,
            "duration": duration,
            "success": success
        })

    def save(self):
        with open("logs/metrics.jsonl", "a") as f:
            for m in self.metrics:
                f.write(json.dumps(m) + "\n")

# Usage
tracker = MetricsTracker()
start = time.time()
try:
    result = extractor(conversation_history=history)
    tracker.log("extraction", time.time() - start, True)
except Exception as e:
    tracker.log("extraction", time.time() - start, False)
tracker.save()
```

## Code Style

### Python Style Guide

- Follow PEP 8
- Use type hints where possible
- Keep functions focused and small
- Add docstrings to all public functions
- Use meaningful variable names

### DSPy Best Practices

1. **Signatures:** Clear, concise descriptions
2. **Modules:** Single responsibility
3. **Metrics:** Return 0.0-1.0 range
4. **Training data:** High quality over quantity
5. **Error handling:** Catch and log failures

### Example Code Style

```python
from typing import Optional
import dspy
from pydantic import BaseModel

class MyOutput(BaseModel):
    """Type-safe output model."""
    field: str
    score: float

class MySignature(dspy.Signature):
    """Clear one-line description of task.

    Longer explanation if needed, including:
    - Key behaviors
    - Important constraints
    - Expected patterns
    """
    input_field: str = dspy.InputField(desc="What this field contains")
    output_field: str = dspy.OutputField(desc="Expected output format")

class MyModule(dspy.Module):
    """Module for specific task."""

    def __init__(self, config: Optional[dict] = None):
        super().__init__()
        self.config = config or {}
        self.predictor = dspy.ChainOfThought(MySignature)

    def forward(self, input_field: str) -> dspy.Prediction:
        """Process input and return prediction.

        Args:
            input_field: Description of input

        Returns:
            Prediction with output_field populated
        """
        try:
            result = self.predictor(input_field=input_field)
            return result
        except Exception as e:
            # Log error and return fallback
            print(f"Error in MyModule: {e}")
            return dspy.Prediction(output_field="fallback value")
```

## Getting Help

- **DSPy Issues:** [GitHub Issues](https://github.com/stanfordnlp/dspy/issues)
- **Documentation:** [docs/dspy-docs.md](./docs/dspy-docs.md)
- **Project Issues:** Create an issue in this repository
- **Optimization:** [tasks/NEXT-SESSION-README.md](./tasks/NEXT-SESSION-README.md)

## License

See project LICENSE file for details.

---

**Happy contributing!** Your improvements help everyone learn DSPy better.
