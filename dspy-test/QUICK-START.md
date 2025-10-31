# Quick Start Guide

Get up and running with DSPy in 5 minutes.

## Prerequisites

- Python 3.13+
- [UV package manager](https://docs.astral.sh/uv/)
- API key from [Google AI Studio](https://ai.google.dev/)

## Installation

```bash
# Clone or navigate to project
cd dspy-test

# Install dependencies (takes ~30 seconds)
uv sync

# Set up environment
cp .env .env.backup  # Backup if exists
echo 'GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here' > .env
```

Replace `your_api_key_here` with your actual API key.

## Run Your First Example

```bash
cd quick-start-app
uv run main.py
```

Try this conversation:
```
You: I want to build muscle
Bot: [Asks about equipment, time, etc.]

You: Dumbbells at home, 30 minutes
Bot: [Asks about experience and focus]

You: Intermediate, push day
Bot: [Confirms it has all info]

You: exit
```

You just:
- Used DSPy signatures to define AI behavior
- Leveraged Chain of Thought reasoning
- Tracked conversation history
- All without writing prompts manually!

## Run Production App

```bash
cd ../coach-app
uv run main.py
```

Have a conversation and get a full workout plan:
```
You: I want a push workout with dumbbells, 30 minutes, intermediate level

Coach Nova: [Efficiently gathers any missing info]

[Generates complete workout with exercises, sets, reps, and weights]
```

## What Just Happened?

### Quick Start App
- **Signature** defined inputs/outputs
- **ChainOfThought** added reasoning
- **History** tracked conversation
- DSPy handled all prompting automatically

### Coach App
- **Three modules** (Coach, Extractor, Generator)
- **Pydantic models** ensured type safety
- **MIPROv2 optimization** improved accuracy to 80%
- Production-ready error handling

## Next Steps

### Learn the Basics
```bash
# Read quick start explanation
cat quick-start-app/README.md

# Understand the code
code quick-start-app/main.py
```

### Explore Production App
```bash
# Read coach app guide
cat coach-app/README.md

# Study modular architecture
code coach-app/modules.py
```

### Try Optimization
```bash
# Run MIPROv2 optimizer (15-25 minutes)
cd coach-app
uv run optimize.py 3

# View results
ls -la ../optimized/
```

### Read Documentation
```bash
# Project overview
cat README.md

# DSPy reference
cat docs/dspy-docs.md

# Optimization guide
cat tasks/NEXT-SESSION-README.md
```

## Common Commands

```bash
# Install dependencies
uv sync

# Run quick start
cd quick-start-app && uv run main.py

# Run coach app
cd coach-app && uv run main.py

# Run optimization
cd coach-app && uv run optimize.py 3

# View DSPy history (debugging)
uv run python -c "import dspy; dspy.inspect_history()"
```

## Troubleshooting

### "No module named 'dspy'"

```bash
cd dspy-test
uv sync
```

### "API key not set"

```bash
# Check .env file exists
cat .env

# Should contain:
# GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### "429 Resource Exhausted"

You hit the API quota (50/day free tier).

**Solutions:**
- Wait 24 hours
- Upgrade to paid tier
- Switch to different LLM provider

### Typo in quick-start-app/main.py

Line 6 has `GOOGLE_GENERATIVE_AI_API_KEYKEY` (double KEY).

**Fix:**
```python
api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
```

## Architecture at a Glance

```
┌─────────────────────┐
│   quick-start-app   │  Learn DSPy basics
│  - Basic signature │  5 minutes
│  - ChainOfThought  │
│  - History         │
└─────────────────────┘

┌─────────────────────┐
│     coach-app       │  Production patterns
│  - Modular design  │  10 minutes to run
│  - Pydantic models │  15-25 min to optimize
│  - MIPROv2 optim   │
└─────────────────────┘

┌─────────────────────┐
│     optimized/      │  Compiled modules
│  - extractor.json  │  Load and use
│  - generator.json  │  in production
└─────────────────────┘
```

## Project Structure

```
dspy-test/
├── README.md              ← Start here for overview
├── QUICK-START.md         ← You are here
├── quick-start-app/       ← Run this first
│   └── main.py
├── coach-app/             ← Then try this
│   ├── main.py
│   ├── modules.py
│   └── optimize.py
├── optimized/             ← Optimization outputs
├── docs/                  ← Deep dive docs
└── tasks/                 ← Project planning
```

## Key Concepts

### DSPy Signature
Defines what your AI does (inputs → outputs):
```python
class MyTask(dspy.Signature):
    input_field = dspy.InputField(desc="What goes in")
    output_field = dspy.OutputField(desc="What comes out")
```

### DSPy Module
Adds capabilities (reasoning, planning, etc.):
```python
predictor = dspy.ChainOfThought(MyTask)
result = predictor(input_field="some data")
```

### DSPy Optimizer
Automatically improves prompts:
```python
optimizer = MIPROv2(metric=my_metric)
optimized = optimizer.compile(module, trainset=examples)
```

## Learning Path

1. **Run quick-start** (5 min) → Understand basics
2. **Run coach-app** (10 min) → See production patterns
3. **Read READMEs** (30 min) → Learn architecture
4. **Run optimization** (25 min) → See automated improvement
5. **Study code** (1-2 hours) → Deep understanding
6. **Build your own** → Apply to your use case

## Resources

- **Project Docs:** [README.md](./README.md)
- **Quick Start:** [quick-start-app/README.md](./quick-start-app/README.md)
- **Coach App:** [coach-app/README.md](./coach-app/README.md)
- **DSPy Docs:** [docs/dspy-docs.md](./docs/dspy-docs.md)
- **Optimization:** [tasks/NEXT-SESSION-README.md](./tasks/NEXT-SESSION-README.md)

## Getting Help

1. Check relevant README
2. Read error message carefully
3. Search [DSPy docs](./docs/dspy-docs.md)
4. Check [DSPy GitHub issues](https://github.com/stanfordnlp/dspy/issues)
5. Review [tasks/NEXT-SESSION-README.md](./tasks/NEXT-SESSION-README.md) for optimization issues

## What Makes This Different?

**Traditional Prompting:**
```python
prompt = """
You are a fitness coach. Extract these fields:
- goal
- equipment
...
"""

response = llm.generate(prompt + user_message)
# Manual parsing, no optimization, brittle
```

**DSPy Approach:**
```python
class ExtractInfo(dspy.Signature):
    conversation = dspy.InputField()
    goal = dspy.OutputField()
    equipment = dspy.OutputField()

extractor = dspy.ChainOfThought(ExtractInfo)
result = extractor(conversation=history)
# Structured output, automatic optimization, robust
```

**Benefits:**
- No manual prompt writing
- Automatic optimization (62% → 80%)
- Type-safe outputs (Pydantic)
- Easy to iterate and improve
- Production-ready error handling

---

**You're ready!** Run the examples and explore the docs. Happy coding! 🚀
