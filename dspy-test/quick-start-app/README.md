# Quick Start App - DSPy Learning Example

A minimal conversational agent that demonstrates DSPy fundamentals. Perfect for learning how DSPy works before diving into more complex applications.

## What This App Does

Creates a simple coaching chatbot that gathers workout planning information through conversation. The bot:
- Asks for missing information
- Tracks conversation history
- Determines when all required info is collected
- Uses Chain of Thought reasoning

## Code Walkthrough

### The Signature

```python
class GatherUserInfo(dspy.Signature):
    """Ask user for missing workout planning information."""

    user_message = dspy.InputField(desc="What the user has told us so far")
    known_info = dspy.InputField(
        desc="Info we already have: fitness_level, goal, focus, equipment, injuries"
    )

    response = dspy.OutputField(
        desc="Your response asking for missing information or confirming we have everything"
    )
    is_complete = dspy.OutputField(
        desc="true if we have all info, false if still gathering"
    )
```

**Key Concepts:**
- `dspy.Signature` - Defines the task as input/output fields
- `InputField` - Data provided to the LLM
- `OutputField` - Data expected from the LLM
- `desc` - Guides the LLM on how to use each field

### The Module

```python
think = dspy.ChainOfThought(GatherUserInfo)
```

**What is ChainOfThought?**
- Wraps the signature with reasoning capabilities
- LLM thinks through the problem before answering
- Improves accuracy for complex tasks
- Adds a `rationale` field automatically

### The Conversation Loop

```python
history = dspy.History(messages=[])

while True:
    question = input("Type your question, end conversation by typing 'exit': ")
    if question == "exit":
        break

    outputs = think(user_message=question, known_info=history)
    print(f"\n{outputs}")
    history.messages.append({"question": question, **outputs})
```

**Key Concepts:**
- `dspy.History` - Tracks conversation state
- Loop continues until user types "exit"
- Each response is added to history
- History is passed as `known_info` to maintain context

### Debugging

```python
dspy.inspect_history()
```

Shows all LLM interactions including:
- Prompts sent to the LLM
- LLM responses
- Token usage
- Timing information

## Running the App

```bash
# From the dspy-test/quick-start-app directory
uv run main.py
```

**Note:** There's a typo in line 6 - `GOOGLE_GENERATIVE_AI_API_KEYKEY` should be `GOOGLE_GENERATIVE_AI_API_KEY`. The app will still work if your `.env` file in the parent directory is set up correctly.

## Example Interaction

```
Type your question, end conversation by typing 'exit': I want to build muscle

Prediction(
    rationale='The user wants to build muscle. I need to gather more info...',
    response='Great goal! To create a workout plan, I need to know: What equipment do you have access to? How much time per session? Any injuries?',
    is_complete='false'
)

Type your question, end conversation by typing 'exit': I have dumbbells at home, 30 minutes, no injuries

Prediction(
    rationale='User provided equipment, duration, and injuries. Still need fitness level and focus area...',
    response='Perfect! What\'s your experience level (beginner/intermediate/advanced) and what do you want to focus on today (push/pull/legs)?',
    is_complete='false'
)

Type your question, end conversation by typing 'exit': Intermediate, push day

Prediction(
    rationale='We now have all required information: muscle building, dumbbells, 30min, no injuries, intermediate, push day.',
    response='Excellent! I have all the information needed to create your push day workout.',
    is_complete='true'
)

Type your question, end conversation by typing 'exit': exit
```

## What to Notice

### 1. Chain of Thought Reasoning

Each response includes a `rationale` field showing how the LLM thought through the problem:

```
rationale='The user wants to build muscle. I need to gather more info...'
```

### 2. Output Structure

DSPy automatically structures the output as a `Prediction` object with all output fields.

### 3. History Context

The `known_info` parameter receives the growing history, allowing the bot to remember previous messages.

### 4. is_complete Field

The LLM determines when it has enough information to proceed.

## Logs

Check `log-1.md` and `log-2.md` for example conversation logs from previous runs.

## Common Issues

### API Key Error

If you see:
```
Error: GOOGLE_GENERATIVE_AI_API_KEY environment variable not set
```

**Fix:**
1. Create `.env` file in `dspy-test/` directory
2. Add: `GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here`

### Typo in Code

Line 6 has `GOOGLE_GENERATIVE_AI_API_KEYKEY` (double KEY).

**Fix:**
```python
api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")  # Remove duplicate KEY
```

### Module Not Found

If you see `ModuleNotFoundError: No module named 'dspy'`:

**Fix:**
```bash
cd dspy-test
uv sync
```

## Next Steps

After understanding this example:

1. **Read the code** - Study each line and understand what it does
2. **Modify the signature** - Try adding/removing fields
3. **Change the model** - Test different LLMs (line 7)
4. **Experiment with modules** - Try `dspy.Predict` instead of `ChainOfThought`
5. **Move to Coach App** - See a production-ready implementation

## Key Takeaways

1. **Signatures are central** - They define what your LLM does
2. **Modules add capabilities** - ChainOfThought adds reasoning
3. **History is simple** - Just a dict that you pass around
4. **DSPy handles prompting** - No manual prompt engineering needed
5. **inspect_history() is powerful** - Essential for debugging

## Related Files

- [../coach-app/main.py](../coach-app/main.py) - Production version
- [../coach-app/modules.py](../coach-app/modules.py) - Modular architecture
- [../docs/dspy-docs.md](../docs/dspy-docs.md) - Full DSPy reference

---

**Up next:** Check out the [Coach App](../coach-app/README.md) to see how these concepts scale to production.
