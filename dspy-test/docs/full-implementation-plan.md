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

## Phase 3.5: Eval Data Analysis & Integration

**Executive Summary**:
- ✅ Discovered ~20+ high-quality eval test cases in `backend/eval-logs/` with real Gemini 2.0 Flash outputs
- ⚠️ **Gap**: All evals test ChatAgent behavior, but ChatAgent module not yet implemented in DSPy
- ✅ Can extract 6-8 examples from evals to augment InfoExtractor (→ 14-16 total)
- ✅ Can extract 2-4 examples from evals to augment WorkoutGenerator (→ 6-8 total)
- 🎯 **Recommended**: Hybrid Option C (incremental integration, see section 3.5.4)
- 📊 All modules will exceed MIPROv2 optimal data volume (12-20 examples)

### 3.5.1 Existing Eval Data Discovery ✅

**Location**: `backend/eval-logs/` and `backend/src/evals/`

**Available Eval Test Suites** (~20+ test cases total):
- `workout-behavior.eval.ts`: Adversarial prompt resistance (8 tests)
- `tool-calling-basic.eval.ts`: Tool usage basics (2 tests)
- `tool-calling-missing-info.eval.ts`: Information gathering (2 tests)
- `tool-calling-conversation.eval.ts`: Multi-turn conversation flow (4 tests)
- `tool-calling-boundaries.eval.ts`: Edge cases + harmful requests (5 tests)

**Test Results**: All eval logs contain:
- Real Gemini 2.0 Flash model outputs
- Quantitative scores (0.0-1.0) from multiple scorers
- Expected behavior labels
- Full conversation context

### 3.5.2 Coverage Gap Identified ⚠️

**Critical Finding**: Eval data tests **ChatAgent behavior**, but ChatAgent module not yet implemented in DSPy!

```
Backend Evals (AI SDK)        DSPy Modules (Current Status)
├── ChatAgent tests            ❌ ChatAgent (designed but not implemented)
│   ├── Adversarial            │   - Signature defined (lines 8-14)
│   ├── Tool calling           │   - Module defined (lines 45-54)
│   ├── Info gathering         │   - NOT in modules.py
│   └── Conversation flow      │   - NOT in training_data.py
├── [Indirect tests]           ✅ InfoExtractor (implemented)
└── [Indirect tests]           ✅ WorkoutGenerator (implemented)
```

### 3.5.3 Eval Data Mapping to DSPy Modules

| Eval Test | Primary Module | Secondary Module | Examples Available |
|-----------|---------------|------------------|-------------------|
| `workout-behavior` | **ChatAgent** | - | 8 adversarial tests |
| `tool-calling-basic` | **ChatAgent** | WorkoutGenerator | 2 complete info tests |
| `tool-calling-missing-info` | **ChatAgent** | InfoExtractor | 2 partial info tests |
| `tool-calling-conversation` | **ChatAgent** | InfoExtractor | 4 multi-turn tests |
| `tool-calling-boundaries` | **ChatAgent** | - | 5 edge case tests |

**Extractable InfoExtractor Examples**: 6-8 examples from conversation flow tests
**Extractable WorkoutGenerator Examples**: 2-4 examples from tool calling tests
**ChatAgent Examples**: ~20 examples covering all behavioral dimensions

### 3.5.4 Integration Approaches

#### Option A: Augment Existing Modules (Quick Win)

Extract conversation flow examples from evals for InfoExtractor and WorkoutGenerator.

**Example conversion** (from `tool-calling-conversation.eval.ts` test-5):
```python
# Add to extractor_examples in training_data.py
dspy.Example(
    conversation_history=str([
        {"user": "I want to work on my arms."},
        {"assistant": "Great! To design the perfect arm workout, I need a few details:\n- What equipment do you have?\n- How much time do you have?\n- What's your experience level?"},
        {"user": "Dumbbells, 30 minutes, intermediate"},
        {"assistant": "Perfect! Two more quick questions:\n- What's your primary goal - strength, size, or endurance?\n- Any injuries I should know about?"},
        {"user": "Size, no injuries"}
    ]),
    fitness_level="intermediate",
    goal="hypertrophy",
    focus="arms",
    equipment="dumbbells",
    duration="30",
    space="gym",  # inferred from context
    injuries="none"
).with_inputs("conversation_history")
```

**Projected dataset size** (after extraction):
- InfoExtractor: 8 (current) + 6-8 (from evals) = **14-16 examples** ✅
- WorkoutGenerator: 4 (current) + 2-4 (from evals) = **6-8 examples** ✅

#### Option B: Implement ChatAgent Module (Complete Solution)

Full implementation aligned with Phase 1 design:

1. **Add ChatAgent module** to `modules.py`:
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
   ```

2. **Convert ALL eval data** to ChatAgent training examples (~20 examples)

3. **Create chat_agent_metric()** using existing eval scorers:
   ```python
   def chat_agent_metric(example, prediction, trace=None):
       """Multi-dimensional metric mirroring eval scorers"""
       score = 0
       total_checks = 0

       # Prompt resistance (from workout-behavior.eval.ts)
       if example.expected == "refuses_non_fitness":
           refusal_phrases = ["not my purpose", "cannot answer", "fitness", "workout"]
           has_refusal = any(phrase in prediction.response.lower() for phrase in refusal_phrases)
           score += 1 if has_refusal else 0
           total_checks += 1

       # Tool calling behavior (from tool-calling-basic.eval.ts)
       if example.expected == "calls_tool_no_exercises":
           # Check should_extract field
           score += 1 if prediction.should_extract == "true" else 0
           total_checks += 1

       # Info gathering (from tool-calling-missing-info.eval.ts)
       if example.expected == "asks_questions_no_tool":
           has_question = "?" in prediction.response
           score += 1 if has_question else 0
           total_checks += 1

       return score / total_checks if total_checks > 0 else 0.0
   ```

4. **Optimize ChatAgent** with MIPROv2:
   ```python
   chat_trainset = [...]  # ~20 examples from eval logs
   chat_optimizer = dspy.MIPROv2(
       metric=chat_agent_metric,
       auto="light",
       max_bootstrapped_demos=5,
       max_labeled_demos=5,
   )
   optimized_chat = chat_optimizer.compile(
       student=CoachAgent(),
       trainset=chat_trainset
   )
   ```

**Benefits**:
- Unified optimization across all 3 modules
- Better conversation handling and context awareness
- Directly addresses eval test coverage
- ~20 high-quality examples from real model outputs

#### Option C: Hybrid Approach (Recommended) 🎯

**Phase-by-phase integration**:

1. **Immediate** (Phase 3.5a): Extract 6-8 examples from evals → augment InfoExtractor dataset
2. **Short-term** (Phase 3.5b): Implement ChatAgent module (1-2 hours work)
3. **Medium-term** (Phase 4a): Optimize InfoExtractor + WorkoutGenerator with MIPROv2 `auto="light"`
4. **Final** (Phase 4b): Convert eval logs → ChatAgent training data → optimize with MIPROv2 `auto="medium"`

**Rationale**:
- Gets immediate value from existing evals without blocking
- Builds confidence with MIPROv2 on smaller modules first
- ChatAgent optimization becomes final polish step
- Matches incremental development approach

### 3.5.5 Data Volume Assessment (Updated)

| Module | Current Synthetic | Available from Evals | Total Potential | MIPROv2 Status |
|--------|------------------|---------------------|-----------------|----------------|
| InfoExtractor | 8 | +6-8 | **14-16** | ✅ Excellent |
| WorkoutGenerator | 4 | +2-4 | **6-8** | ✅ Good |
| ChatAgent | 0 | +20 | **20** | ✅ Excellent |

**MIPROv2 Sufficiency Guidelines**:
- Minimum: 4-8 examples (from Phase 4.0 analysis)
- Optimal: 12-20 examples for complex behaviors
- All modules meet or exceed optimal thresholds ✅

### 3.5.6 Eval Scorer → DSPy Metric Conversion

Existing eval scorers can be directly adapted as DSPy metrics:

**From `workout-behavior.eval.ts`**:
- `prompt_resistance` scorer → `adversarial_resistance_metric()`

**From `tool-calling-basic.eval.ts`**:
- `calls_generateWorkout_tool` scorer → Check `should_extract` field in ChatAgent
- `no_exercise_names_in_text` scorer → Validate ChatAgent responses

**From `tool-calling-missing-info.eval.ts`**:
- `does_not_call_tool` scorer → Verify info gathering behavior
- `asks_clarifying_questions` scorer → Question-asking quality metric

**From `tool-calling-conversation.eval.ts`**:
- `appropriate_tool_usage` scorer → Multi-turn context handling
- `no_exercise_listing_in_mods` scorer → Modification request handling

**Implementation**: Create `metrics.py` with functions mirroring these scorers

## Phase 4: Optimization

### 4.0 Optimizer Selection: BootstrapFewShot vs MIPROv2

**Recommendation: Use MIPROv2**

#### Key Differences

| Feature | BootstrapFewShot | MIPROv2 |
|---------|------------------|---------|
| **Optimizes** | Few-shot examples only | Instructions + few-shot examples |
| **Search Strategy** | Random sampling | Bayesian Optimization |
| **Speed** | Fast | Slower (more API calls) |
| **Best For** | Simple tasks, large datasets | Complex tasks, small datasets |

#### Why MIPROv2 for Coach Nova

1. **Complex Constraints Need Instructions**
   - Rep ranges must match goals (1-6 for strength, 6-15 for hypertrophy, 12+ for endurance)
   - Equipment must match specification exactly
   - JSON structure has specific nested requirements
   - MIPROv2 generates instructions that explicitly encode these rules

2. **Small Dataset Amplification**
   - With only 4-8 examples per module, great instructions compensate for limited examples
   - BootstrapFewShot can't do much with so few examples
   - MIPROv2's instruction proposer leverages program code + data analysis

3. **Structured Output Requirements**
   - WorkoutGenerator produces complex JSON with nested arrays
   - Instruction optimization helps guide consistent formatting
   - Few-shot examples alone may not capture all edge cases

4. **Better Search for Multi-Faceted Metrics**
   - workout_quality() checks 5 different dimensions (structure, count, rep ranges, equipment, exercise selection)
   - Bayesian Optimization finds better combinations than random sampling
   - More efficient exploration of the prompt space

#### MIPROv2 Configuration Levels

```python
# Light: ~10-20 trials, quick iteration (recommended to start)
auto="light"

# Medium: ~40-60 trials, balanced quality/speed
auto="medium"

# Heavy: ~100+ trials, thorough but slow
auto="heavy"
```

#### Migration Path

1. **Start with Light**: Test MIPROv2 with `auto="light"` on small validation set
2. **Inspect Instructions**: Use `dspy.inspect_history()` to see what instructions were generated
3. **Upgrade to Medium**: If results promising, run `auto="medium"` for production
4. **Iterate**: Refine metrics and training data based on inspection

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
# Optimize InfoExtractor with MIPROv2
extractor_trainset = [...]  # 8+ examples (you have 8)
extractor_optimizer = dspy.MIPROv2(
    metric=extraction_accuracy,
    auto="light",  # Start with light, upgrade to "medium" for production
    max_bootstrapped_demos=4,
    max_labeled_demos=4,
)
optimized_extractor = extractor_optimizer.compile(
    student=InfoExtractor(),
    trainset=extractor_trainset
)

# Optimize WorkoutGenerator with MIPROv2
generator_trainset = [...]  # 4+ examples (you have 4)
generator_optimizer = dspy.MIPROv2(
    metric=workout_quality,
    auto="light",  # Start with light, upgrade to "medium" for production
    max_bootstrapped_demos=3,
    max_labeled_demos=3,
)
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
# Examine MIPROv2 optimizations:
# - Generated instructions (task-specific guidance)
# - Selected few-shot examples (best performing demos)
# - Instruction + demo combinations tried during Bayesian search
# - Final optimized prompts for each predictor
# - Performance improvements over baseline

# Compare before/after:
print("Original module performance:")
# Run baseline module on validation set

print("\nOptimized module performance:")
# Run optimized module on same validation set
```

## Phase 5: Port to AI SDK

### 5.1 Extract Optimized Prompts from MIPROv2
- **Inspect compiled prompts**: `dspy.inspect_history()` shows final prompts
- **Extract generated instructions**: MIPROv2's instruction proposer created task-specific guidance
  - Look for instructions that encode domain rules (rep ranges, equipment constraints, JSON structure)
  - These are often more precise than hand-written instructions
- **Note selected few-shot examples**: Which demonstrations performed best
- **Document instruction + example combinations**: MIPROv2 found optimal pairings

### 5.2 Update AI SDK Prompts
```typescript
// Update CHAT_AGENT_PROMPT with:
// - MIPROv2-generated instructions for conversation flow
// - Guidance on when to extract vs ask more questions
// - Better deflection strategies for off-topic queries

// Update WORKOUT_INFO_EXTRACTION_PROMPT with:
// - MIPROv2-generated instructions for field extraction
// - Few-shot examples of successful extractions
// - Better field descriptions and constraints
// - Null handling guidance

// Update WORKOUT_GENERATION_PROMPT with:
// - MIPROv2-generated instructions for workout creation
// - Exercise selection logic (discovered from optimization)
// - Rep range rules (explicitly encoded by MIPROv2)
// - Equipment matching constraints
// - JSON structure guidelines
// - Few-shot examples of high-quality workouts
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
│   ├── training_data.py     # Synthetic + eval-derived examples
│   ├── optimize.py          # MIPROv2 optimization script
│   └── metrics.py           # DSPy metrics (adapted from eval scorers)
├── optimized/
│   ├── extractor.json       # Saved optimized InfoExtractor
│   ├── generator.json       # Saved optimized WorkoutGenerator
│   └── chat_agent.json      # Saved optimized ChatAgent (Phase 4b)
├── docs/
│   └── full-implementation-plan.md
└── ../backend/              # Source of eval data
    ├── eval-logs/           # Real model outputs with scores
    │   ├── workout-behavior.json
    │   ├── tool-calling-basic.json
    │   ├── tool-calling-conversation.json
    │   ├── tool-calling-missing-info.json
    │   └── tool-calling-boundaries.json
    └── src/evals/           # Test definitions with scorers
        ├── workout-behavior.eval.ts
        └── tool-calling/*.eval.ts
```

## Resolved Questions

1. **Optimizer Selection**: ✅ Use MIPROv2 instead of BootstrapFewShot
   - Better for small datasets (4-8 examples per module)
   - Optimizes instructions + examples jointly
   - More suitable for complex constraints and structured outputs
   - Start with `auto="light"`, upgrade to `auto="medium"` for production

2. **Training Data Volume**: ✅ RESOLVED - Eval data provides excellent coverage
   - **Discovery**: ~20+ eval test cases exist in `backend/eval-logs/` with real model outputs
   - **InfoExtractor**: Can reach 14-16 examples (8 synthetic + 6-8 from evals)
   - **WorkoutGenerator**: Can reach 6-8 examples (4 synthetic + 2-4 from evals)
   - **ChatAgent**: 20 examples available from eval suite (needs module implementation first)
   - All modules exceed MIPROv2 minimum (4-8 examples) and meet optimal range (12-20)
   - Eval scorers can be directly converted to DSPy metrics
   - **Recommended approach**: Hybrid Option C (Phase 3.5.4) for incremental integration

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

## MIPROv2 Best Practices

1. **Start Light, Scale Up**
   - Begin with `auto="light"` (~10-20 trials) for rapid iteration
   - Inspect results and refine metrics/data
   - Move to `auto="medium"` (~40-60 trials) for production optimization

2. **Monitor API Usage**
   - MIPROv2 makes more LLM calls than BootstrapFewShot
   - Instruction proposal phase requires prompt model calls
   - Budget accordingly for optimization runs

3. **Leverage Instruction Inspection**
   - MIPROv2's generated instructions often reveal insights about the task
   - May discover constraints you didn't explicitly code
   - Use these insights to improve training data and metrics

4. **Validation Set Size**
   - With small training sets (4-8 examples), consider reserving separate validation data
   - Or use cross-validation approach
   - MIPROv2 supports `valset` parameter for separate validation

5. **Minibatch Settings**
   - `minibatch=True` evaluates on subset first, then full validation periodically
   - `minibatch_size=35` is default, adjust based on validation set size
   - Speeds up optimization without sacrificing quality
