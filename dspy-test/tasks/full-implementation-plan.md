# Full DSPy Implementation Plan

> **🚀 QUICK START FOR NEXT SESSION:** Skip to [Handoff Summary](#-handoff-summary-for-next-session) for immediate context and next actions.

## ⚡ TL;DR - READY TO RESUME (2025-10-23)

**Status:** Phase 4 is 95% complete. Code fully migrated to MIPROv2, blocked by API quota.

**Next Action:** Choose one path and run:
1. **Wait 24hrs** → `cd dspy-test/coach-app && uv run optimize.py 3` (Free)
2. **Upgrade API** → Visit https://ai.google.dev/pricing then run above (~$0.50)
3. **Different Model** → Update optimize.py lines 39 & 90, then run
4. **Skip Optimization** → Manually port prompts to AI SDK (Phase 5)

**What's Done:** ✅ MIPROv2 migration ✅ Bootstrap phase working ✅ Command-line support ✅ Bug fixes

**Blocker:** Gemini API daily quota (50/day) exhausted. See [Current Status](#-current-status--next-steps) for details.

---

## 🎯 IMPLEMENTATION STATUS SUMMARY

**Last Updated:** 2025-10-23

---

## 📍 CURRENT STATUS & NEXT STEPS

### Where We Are Now:
- ✅ Phase 1 & 2: **COMPLETE** - All modules working, app tested successfully
- ✅ Phase 3: **80% COMPLETE** - Training data ready (12 synthetic examples + 4 real conversation logs)
- ⚠️ Phase 4: **95% COMPLETE** - Code migrated to MIPROv2, optimization blocked by API quota limit

### 🎯 IMMEDIATE NEXT STEP: Complete MIPROv2 Optimization Run

**Current Status (2025-10-23):** Code fully migrated to MIPROv2, but optimization blocked by Gemini API daily quota limit (50 requests/day exhausted).

**What Was Completed:**
- ✅ Migrated `optimize.py` from BootstrapFewShot to MIPROv2
- ✅ Added `auto="light"` parameter (~10-20 trials)
- ✅ Fixed missing `primary_lift_pr` parameter in evaluation function
- ✅ Reduced demo counts (2 vs 4/3) to minimize API calls
- ✅ Added command-line argument support: `uv run optimize.py 3`
- ✅ Confirmed MIPROv2 bootstrap phase works (6 demo sets created)
- ⚠️ Blocked at instruction proposal phase (step 2 of 3)

**Current Blocker:** Gemini API daily quota (50 requests/day) exhausted. MIPROv2 requires ~30-50 API calls.

**Choose ONE Action Path to Proceed:**

**Path 1: Wait for Quota Reset** (Free, Recommended for Learning Projects)
```bash
# Wait 24 hours, then run:
cd dspy-test/coach-app
uv run optimize.py 3
```
- **Pros:** No cost, code is ready
- **Cons:** 24-hour wait, may hit limit again if optimization incomplete
- **ETA:** ~30-40 minutes after quota resets

**Path 2: Upgrade API Plan** (Best for Active Development)
1. Visit https://ai.google.dev/pricing
2. Upgrade to paid tier (1000 RPM, higher daily limits)
3. Run: `cd dspy-test/coach-app && uv run optimize.py 3`
- **Pros:** Immediate, reliable, better for iteration
- **Cons:** ~$0.50-2.00 cost for full optimization
- **ETA:** ~15-20 minutes

**Path 3: Use Alternative Model** (If You Have Other API Keys)
1. Update `optimize.py` model configuration:
   ```python
   # For OpenAI
   dspy.configure(lm=dspy.LM("gpt-3.5-turbo", api_key=openai_key))
   ```
2. Run: `cd dspy-test/coach-app && uv run optimize.py 3`
- **Pros:** Separate quota, can proceed today
- **Cons:** Requires different API key, results may vary slightly
- **ETA:** ~20-30 minutes

**Path 4: Skip to Manual Prompt Engineering** (Fallback)
Skip MIPROv2 optimization and proceed to Phase 5:
1. Use existing module signatures as prompts
2. Add few-shot examples from `training_data.py` manually
3. Port directly to AI SDK in `backend/src/prompts.ts`
- **Pros:** No API costs, immediate progress
- **Cons:** Miss out on systematic optimization benefits
- **ETA:** ~1-2 hours manual work

**After Optimization Completes:**
1. Check `dspy-test/coach-app/optimized/extractor.json` and `generator.json`
2. Review `dspy.inspect_history()` output to see generated instructions
3. Compare baseline vs optimized performance scores
4. Proceed to Phase 5 (port optimized prompts to AI SDK)

### Why MIPROv2 Over BootstrapFewShot?
- Small datasets (8 extractor, 4 generator examples) benefit from instruction optimization
- MIPROv2 optimizes both instructions AND few-shot examples jointly
- Better for complex structured outputs (Pydantic models with nested fields)
- See Phase 4.0 section for detailed comparison

### Alternative Path (Optional):
If you want more training data first, implement **Phase 3.5** to extract examples from `backend/eval-logs/` which could add:
- 6-8 more InfoExtractor examples (→ 14-16 total)
- 2-4 more WorkoutGenerator examples (→ 6-8 total)

---

### Quick Status Overview
| Phase | Status | Progress | Notes |
|-------|--------|----------|-------|
| **Phase 1: Module Setup** | ✅ **COMPLETED** | 100% | All modules, signatures, and Pydantic models implemented |
| **Phase 2: Application Loop** | ✅ **COMPLETED** | 100% | main.py working and tested |
| **Phase 3: Training Data** | ⚠️ **MOSTLY DONE** | 80% | Synthetic examples done (8 extractor, 4 generator), 4 real conversation logs saved, eval data integration pending |
| **Phase 4: Optimization** | ⚠️ **95% COMPLETE** | 95% | ✅ Migrated to MIPROv2, ✅ Bootstrap phase works, ⚠️ Blocked by API quota (50/day limit) |
| **Phase 5: Port to AI SDK** | ❌ **NOT STARTED** | 0% | Waiting for optimization completion |

### Key Files Status
- ✅ `modules.py` - All 3 modules implemented with Pydantic models
- ✅ `main.py` - Application loop working
- ✅ `training_data.py` - 8 extractor + 4 generator examples
- ✅ `metrics.py` - All metrics defined
- ✅ `optimize.py` - **NOW USES MIPROv2** (migrated from BootstrapFewShot on 2025-10-23)
- ⚠️ `optimized/` - No optimized models saved yet (blocked by API quota)

### What to Do Next:
**➡️ Primary Task:** Complete MIPROv2 optimization run (blocked by API quota)
- Choose Path 1-4 from "📍 CURRENT STATUS & NEXT STEPS" section above
- **Simplest:** Wait 24 hours for quota reset, then run `uv run optimize.py 3`
- **Fastest:** Upgrade API plan or use alternative model

### Critical Notes (2025-10-23 Update)
✅ **Optimizer Updated:** Code successfully migrated to MIPROv2 with `auto="light"` parameter
✅ **Bootstrap Phase Verified:** MIPROv2 successfully created 6 demo sets and extracted traces
⚠️ **API Quota Blocker:** Gemini free tier (50 requests/day) exhausted during instruction proposal phase
💡 **Ready to Resume:** Once quota available, run `cd dspy-test/coach-app && uv run optimize.py 3`

---

## Design Decisions & Rationale

### Signature Detail Level
- **Approach**: Moderately detailed signatures (not vague, not overly prescriptive)
- **Rationale**: Provides clear constraints for the model while leaving room for MIPROv2 optimizer to refine instructions
- **Implementation**:
  - Include explicit essential fields list in ChatAgent docstring
  - Use Pydantic models for structural type constraints
  - Let optimizer discover best phrasing and few-shot examples

### Type Safety with Pydantic
- **Decision**: Use Pydantic models for structured outputs
- **Benefits**:
  - Type validation (weight as number, not string)
  - Clear schema enforcement
  - Better error messages
  - Compatible with DSPy optimizers
- **Complexity**: Minimal (~10-15 lines of model definitions)

### Baseline Fitness Assessment (Option A)
- **Approach**: Simple but personalized
- **Process**:
  1. Ask self-reported level (beginner/intermediate/advanced)
  2. Ask for ONE primary lift PR (e.g., bench press)
  3. Use that to calibrate all other exercise weights
- **Rationale**: Personable without being tedious, avoids asking PRs for every exercise

### Essential Information Fields (Validated)
Based on industry research, these 7 fields are essential for workout programming:
1. **Fitness goal**: Determines rep ranges and rest periods
2. **Equipment**: Determines exercise selection
3. **Duration**: Time constraint for programming
4. **Focus**: Muscle group targeting
5. **Experience level**: Exercise difficulty and progression
6. **Space**: Exercise feasibility
7. **Injuries**: Safety constraints

Optional fields (ask only if time allows or user mentions):
- Training frequency (days/week)
- Training history (years)
- Recovery factors (sleep, stress) - only if user mentions issues

## Implementation Priority (Before Optimization)

### High Priority (Do Now - 1-2 hours) - ✅ ALL COMPLETED
1. ✅ Add Pydantic models for type safety (20 minutes)
2. ✅ Refine ChatAgent signature with essential fields list (10 minutes)
3. ✅ Add `primary_lift_pr` field to ExtractUserInfo (5 minutes)
4. ✅ Update WorkoutGenerator to use Pydantic Workout model (15 minutes)
5. ✅ Test app with refined signatures (30 minutes)

### Medium Priority (Before MIPROv2)
1. Create 2-3 example conversations showing ideal short interactions
2. Collect real conversation logs (5-10 test runs)
3. Define metrics for "good" workout generation

### Low Priority (Let Optimizer Handle)
1. Fine-tuning exact question phrasing
2. Adjusting instruction order
3. Few-shot example selection

## Phase 1: Module Setup - ✅ COMPLETED

### 1.1 Pydantic Models (Type Safety) - ✅ COMPLETED (modules.py lines 20-41)
```python
from pydantic import BaseModel, Field
from typing import Optional, List, Literal

class WorkoutSet(BaseModel):
    """Individual set within an exercise"""
    reps: int = Field(description="Number of repetitions")
    setType: Literal["warmup", "working"] = Field(description="Set type")
    weight: Optional[float] = Field(
        None,
        description="Weight in lbs/kg. Omit ONLY for bodyweight exercises"
    )

class Exercise(BaseModel):
    """Single exercise with multiple sets"""
    name: str = Field(description="Exercise name (real, established exercises only)")
    sets: List[WorkoutSet] = Field(description="List of sets for this exercise")

class Workout(BaseModel):
    """Complete workout plan"""
    exercises: List[Exercise] = Field(description="List of exercises in workout")
    notes: Optional[str] = Field(None, description="Additional guidance or safety notes")
    workoutFocus: Optional[str] = Field(None, description="Workout focus area")
```

### 1.2 Signatures - ✅ COMPLETED (modules.py lines 47-98)
```python
# ChatAgent - conversational layer
class ChatAgent(dspy.Signature):
    """Coach Nova: efficient fitness coach that quickly gathers essential workout info.

    ESSENTIAL INFO (prioritize these):
    - Fitness goal (strength/hypertrophy/endurance/power/general)
    - Equipment (bodyweight/dumbbells/barbell/machines/cables/bands)
    - Duration (minutes per session)
    - Focus (push/pull/legs/chest/back/arms/shoulders/full_body)
    - Experience level (beginner/intermediate/advanced)
    - Space (home/gym/hotel/outdoor)
    - Injuries (any current pain/limitations)

    OPTIONAL INFO (only ask if user mentions or time allows):
    - Diet, nutrition, sleep, recovery details
    - Training frequency or history

    Ask 1-2 targeted questions max. Set should_extract=true once you have all essential fields.
    """
    conversation_history = dspy.InputField(desc="All prior messages")
    user_message = dspy.InputField(desc="Current user input")

    response = dspy.OutputField(desc="Coaching response, max 2 questions, focus on essential info")
    should_extract = dspy.OutputField(desc="true if all essential fields gathered")

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
    primary_lift_pr = dspy.OutputField(desc="User's PR for main lift (e.g. '205lb bench') or null. Use to calibrate weights.")

# WorkoutGenerator - create structured plan
class GenerateWorkout(dspy.Signature):
    """Generate workout matching requirements. Uses Pydantic model for type-safe output."""
    fitness_level = dspy.InputField()
    goal = dspy.InputField()
    focus = dspy.InputField()
    equipment = dspy.InputField()
    duration = dspy.InputField()
    space = dspy.InputField()
    injuries = dspy.InputField()
    primary_lift_pr = dspy.InputField()

    workout: Workout = dspy.OutputField(desc="Complete workout plan with type-safe structure")
```

### 1.3 Modules - ✅ COMPLETED (modules.py lines 104-137)
```python
class CoachAgent(dspy.Module):
    """Interactive coach that converses with users to gather workout requirements"""
    def __init__(self):
        super().__init__()
        self.chat = dspy.ChainOfThought(ChatAgent)

    def forward(self, conversation_history, user_message):
        return self.chat(
            conversation_history=conversation_history,
            user_message=user_message
        )

class InfoExtractor(dspy.Module):
    """Extracts structured workout parameters from conversation history"""
    def __init__(self):
        super().__init__()
        self.extract = dspy.ChainOfThought(ExtractUserInfo)

    def forward(self, conversation_history):
        return self.extract(conversation_history=conversation_history)

class WorkoutGenerator(dspy.Module):
    """Generates structured workout plan using Pydantic model for type safety"""
    def __init__(self):
        super().__init__()
        self.generate = dspy.ChainOfThought(GenerateWorkout)

    def forward(self, **user_requirements):
        return self.generate(**user_requirements)
```

### 1.4 Weight Calculation Strategy - ✅ DOCUMENTED
Based on primary_lift_pr field (Option A approach):

**If user provides PR (e.g., "205lb bench"):**
- Use as reference point for that user's strength level
- Calculate working weights as percentages of PR:
  - Warmup sets: 40-60% of PR
  - Working sets (strength): 80-90% of PR
  - Working sets (hypertrophy): 65-80% of PR
  - Working sets (endurance): 50-65% of PR

**If no PR provided:**
- Use fitness level defaults:
  - Beginner: "light" weights, focus on form
  - Intermediate: "moderate" weights
  - Advanced: "moderate-heavy" weights
- Or use strength standards database (strengthlevel.com data)

**Implementation Note:**
The WorkoutGenerator signature should receive `primary_lift_pr` and use it to calibrate weights for similar exercises (e.g., if bench PR given, can estimate incline press, overhead press, etc. using standard ratios).
```

## Phase 2: Application Loop - ✅ COMPLETED (main.py)

```python
# main.py or coach_app.py
import os
import dspy
from modules import CoachAgent, InfoExtractor, WorkoutGenerator

# Configure DSPy with Gemini model
api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
if not api_key:
    print("Error: GOOGLE_GENERATIVE_AI_API_KEY environment variable not set")
    exit(1)

dspy.configure(lm=dspy.LM("gemini/gemini-2.0-flash-exp", api_key=api_key))

# Initialize modules
coach = CoachAgent()
extractor = InfoExtractor()
generator = WorkoutGenerator()

# Conversation history
history = []

print("=" * 60)
print("Welcome to Coach Nova - Your AI Fitness Coach!")
print("=" * 60)
print("Type 'exit' to quit at any time.\n")

while True:
    # Get user input
    try:
        user_msg = input("You: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\n\nGoodbye! Stay fit!")
        break

    if not user_msg:
        continue

    if user_msg.lower() == "exit":
        print("\nGoodbye! Stay fit!")
        break

    # Get coach response
    try:
        result = coach(
            conversation_history=str(history),
            user_message=user_msg
        )

        print(f"\nCoach Nova: {result.response}\n")
        history.append({"user": user_msg, "coach": result.response})

        # Check if ready to generate workout
        if result.should_extract.lower() == "true":
            print("\n[Analyzing your requirements...]\n")

            # Extract structured information
            extracted = extractor(conversation_history=str(history))

            # Check if all required fields are present
            required_fields = {
                "goal": extracted.goal,
                "equipment": extracted.equipment,
                "duration": extracted.duration,
                "focus": extracted.focus
            }

            missing_fields = [k for k, v in required_fields.items() if not v or v == "null"]

            if not missing_fields:
                print("[Generating your personalized workout...]\n")

                # Generate workout with Pydantic output
                workout = generator(
                    fitness_level=extracted.fitness_level if extracted.fitness_level != "null" else "intermediate",
                    goal=extracted.goal,
                    focus=extracted.focus,
                    equipment=extracted.equipment,
                    duration=extracted.duration,
                    space=extracted.space if extracted.space != "null" else "gym",
                    injuries=extracted.injuries if extracted.injuries != "null" else "none",
                    primary_lift_pr=extracted.primary_lift_pr if extracted.primary_lift_pr != "null" else "none"
                )

                # Workout is now a Pydantic Workout object, can access fields directly
                print("=" * 60)
                print("YOUR PERSONALIZED WORKOUT")
                print("=" * 60)
                print(f"\nFocus: {workout.workout.workoutFocus}\n")

                for exercise in workout.workout.exercises:
                    print(f"{exercise.name}:")
                    for i, set_obj in enumerate(exercise.sets, 1):
                        weight_str = f" @ {set_obj.weight}lbs" if set_obj.weight else ""
                        print(f"  Set {i}: {set_obj.reps} reps ({set_obj.setType}){weight_str}")
                    print()

                if workout.workout.notes:
                    print(f"Notes: {workout.workout.notes}")
                print("=" * 60)

                # Ask if user wants to continue
                cont = input("\nWould you like to create another workout? (yes/no): ").strip().lower()
                if cont not in ["yes", "y"]:
                    print("\nGoodbye! Stay fit!")
                    break
                else:
                    # Reset history for new workout
                    history = []
                    print("\n" + "=" * 60)
                    print("Let's create a new workout!")
                    print("=" * 60 + "\n")
            else:
                # Not enough information yet, continue conversation
                print(f"[Still gathering info - missing: {', '.join(missing_fields)}]\n")

    except Exception as e:
        print(f"\nError: {e}")
        print("Let's try again.\n")

# Show DSPy interaction history for debugging/learning
print("\n" + "=" * 60)
print("Session Complete - Inspecting DSPy History")
print("=" * 60)
dspy.inspect_history(n=3)
```

## Phase 3: Training Data Creation - ⚠️ PARTIALLY COMPLETED

### 3.0 Test Refined Implementation First - ✅ COMPLETED
**Before creating training data, test the refined signatures:**
1. Implement Pydantic models in `modules.py`
2. Update signatures with moderately detailed docstrings
3. Add `primary_lift_pr` field to ExtractUserInfo
4. Run the app 3-5 times with different scenarios
5. Observe conversation length and quality improvements
6. Document what works well and what doesn't

**Expected improvements:**
- Shorter conversations (target: 5-10 exchanges vs. 18 in original)
- More focused questions (avoiding diet/sleep tangents)
- Type-safe workout outputs (numbers instead of strings)

**Save test logs** to inform training data creation.

### 3.1 Synthetic Examples (start with 20-30) - ✅ COMPLETED

**Status:**
- ✅ 8 InfoExtractor examples created (training_data.py lines 17-203)
- ✅ 4 WorkoutGenerator examples created (training_data.py lines 210-401)
- ❌ ChatAgent examples not created (ChatAgent module not yet used in optimization)

**ChatAgent examples:**
- User gives complete info upfront → confirm and extract
- User gives partial → ask specific missing fields
- User asks off-topic → deflect politely
- User modifies workout → extract modification intent

**InfoExtractor examples:**
- "Build muscle, dumbbells, 45 min" → goal=hypertrophy, equipment=dumbbells, duration=45
- "Beginner, home, no equipment" → level=beginner, space=home, equipment=bodyweight
- "Chest day at gym, 60 minutes, advanced" → focus=chest, space=gym, duration=60, level=advanced
- "Intermediate, bench PR is 205lbs" → level=intermediate, primary_lift_pr="205lb bench"

**WorkoutGenerator examples:**
- Strength + barbell + 60min → 3-5 exercises, 1-6 reps, warmup sets
- Hypertrophy + dumbbells + 45min → 4-6 exercises, 8-12 reps
- Endurance + bodyweight + 30min → 5-7 exercises, 12-20 reps

### 3.2 Real Data (after interactive testing) - ✅ COMPLETED
- ✅ Run DSPy app yourself, create various scenarios (User confirmed testing done)
- ✅ Save successful conversations as examples (4 logs saved in `logs/`)
  - **01.md** (10/21): Pre-Pydantic - Long conversation (18+ exchanges), tangential questions, string weights - NEGATIVE EXAMPLE
  - **02.md** (10/23): Transition period - Good flow (4 exchanges) but workout_json error
  - **03.md** (10/23): Transition period - Good flow (4 exchanges) but workout_json error
  - **04.md** (10/23): ✅ SUCCESS - Efficient conversation (5 exchanges), proper Pydantic output with numeric weights - POSITIVE EXAMPLE
- ⚠️ Label extractions manually (Can be done by extracting from logs)

**Key Insights from Logs:**
1. **Conversation Length Improved**: 18+ exchanges (01.md) → 5 exchanges (04.md) ✅
2. **Focused Questions**: Refined signature successfully eliminated diet/sleep/coffee tangents ✅
3. **Type Safety Works**: Pydantic models correctly enforce numeric weights (10.0lbs) vs strings ("moderate-heavy") ✅
4. **Primary Lift PR**: Not used in any conversations yet (always "null" in logs) - feature designed but not tested
5. **Log 04.md** is excellent training data - shows ideal efficient conversation flow
6. **Bug Fixed**: Logs 02 & 03 had `workout_json` attribute error (transition bug), fixed by 04 to use Pydantic `workout.workout`

## Phase 3.5: Eval Data Analysis & Integration - ❌ NOT STARTED

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

### 3.5.7 Next Steps (Action Items)

Based on **Option C: Hybrid Approach** (recommended):

**Immediate Actions** (Phase 3.5a - can start now):
1. ✏️ Extract 4-6 conversation examples from `tool-calling-conversation.json`
2. ✏️ Add to `extractor_examples` in `training_data.py`
3. ✏️ Extract 2-3 complete workout requests from `tool-calling-basic.json`
4. ✏️ Add to `generator_examples` in `training_data.py`
5. ✅ Run `training_data.py` to verify examples load correctly

**Short-term** (Phase 3.5b - 1-2 hours):
1. ✏️ Implement `CoachAgent` class in `modules.py` (copy from lines 45-54 of this plan)
2. ✏️ Create `chat_agent_examples` list in `training_data.py`
3. ✏️ Convert 5-10 eval tests to ChatAgent training examples
4. ✏️ Create `chat_agent_metric()` in `metrics.py`

**Medium-term** (Phase 4a - optimization):
1. ✏️ Run MIPROv2 on InfoExtractor with augmented dataset (14-16 examples)
2. ✏️ Run MIPROv2 on WorkoutGenerator with augmented dataset (6-8 examples)
3. ✏️ Inspect results with `dspy.inspect_history()`
4. ✏️ Save optimized modules

**Final** (Phase 4b - ChatAgent optimization):
1. ✏️ Convert remaining eval tests to ChatAgent examples (~20 total)
2. ✏️ Run MIPROv2 on ChatAgent with `auto="medium"`
3. ✏️ Compare optimized vs baseline performance
4. ✏️ Port optimized prompts back to AI SDK (Phase 5)

## Phase 4: Optimization - ⚠️ 95% COMPLETE (Blocked by API Quota)

**Status (Updated 2025-10-23):**
- ✅ Metrics defined (metrics.py)
- ✅ Optimization script created and **migrated to MIPROv2** (optimize.py)
- ✅ Command-line argument support added
- ✅ Fixed `primary_lift_pr` parameter in evaluation function
- ✅ Bootstrap phase verified working (6 demo sets created successfully)
- ⚠️ Optimization run blocked by Gemini API daily quota (50 requests/day exhausted)
- ❌ Full optimization not yet complete (stopped at instruction proposal phase)
- ❌ Results not yet evaluated

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

### 4.1 Define Metrics - ✅ COMPLETED (metrics.py)
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

### 4.2 Run Optimization - ✅ CODE READY, ⚠️ BLOCKED BY API QUOTA

**Implementation Status:** `optimize.py` successfully migrated to MIPROv2 on 2025-10-23

```python
# ✅ IMPLEMENTED in optimize.py (lines 51-58 for InfoExtractor)
extractor_optimizer = dspy.MIPROv2(
    metric=extraction_accuracy,
    auto="light",              # ~10-20 trials for fast iteration
    max_bootstrapped_demos=2,  # Reduced from 4 to minimize API calls
    max_labeled_demos=2,
)
optimized_extractor = extractor_optimizer.compile(
    student=InfoExtractor(),
    trainset=get_extractor_trainset()  # 8 examples
)

# ✅ IMPLEMENTED in optimize.py (lines 105-112 for WorkoutGenerator)
generator_optimizer = dspy.MIPROv2(
    metric=workout_quality,
    auto="light",              # ~10-20 trials for fast iteration
    max_bootstrapped_demos=2,  # Reduced from 3 to minimize API calls
    max_labeled_demos=2,
)
optimized_generator = generator_optimizer.compile(
    student=WorkoutGenerator(),
    trainset=get_generator_trainset()  # 4 examples
)

# ✅ IMPLEMENTED: Save optimized modules
optimized_extractor.save('../optimized/extractor.json')
optimized_generator.save('../optimized/generator.json')
```

**To Run:**
```bash
cd dspy-test/coach-app
uv run optimize.py 3  # Option 3 = optimize both modules
```

**Current Blocker:** Gemini API daily quota (50/day) exhausted. See handoff summary for resolution paths.

### 4.3 Inspect Results - ⚠️ EVALUATION FUNCTIONS READY, WAITING FOR OPTIMIZATION COMPLETION
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

## Phase 5: Port to AI SDK - ❌ NOT STARTED

### 5.1 Extract Optimized Prompts from MIPROv2 - ❌ NOT STARTED
- **Inspect compiled prompts**: `dspy.inspect_history()` shows final prompts
- **Extract generated instructions**: MIPROv2's instruction proposer created task-specific guidance
  - Look for instructions that encode domain rules (rep ranges, equipment constraints, JSON structure)
  - These are often more precise than hand-written instructions
- **Note selected few-shot examples**: Which demonstrations performed best
- **Document instruction + example combinations**: MIPROv2 found optimal pairings

### 5.2 Update AI SDK Prompts - ❌ NOT STARTED
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

### 5.3 Test & Compare - ❌ NOT STARTED
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

## Design Decisions Summary (Based on User Feedback - 2025-10-22)

### Issue 1: Long Conversations & Tangential Questions
**Problem:** Original implementation took 18 exchanges with diet/sleep tangents before generating workout.

**Solution:**
- Updated ChatAgent signature with explicit essential fields list (7 fields)
- Added guidance to avoid optional topics (diet, sleep, recovery) unless user mentions
- Reduced max questions from 3 to 1-2 per turn
- Target: 5-10 exchanges vs. 18

**Implementation:**
```python
class ChatAgent(dspy.Signature):
    """...
    ESSENTIAL INFO (prioritize these): [7 fields listed]
    OPTIONAL INFO (only ask if user mentions): [diet, sleep, etc.]
    Ask 1-2 targeted questions max.
    """
```

### Issue 2: Weight Type Mismatch
**Problem:** Workout output had `"weight": "moderate-heavy"` (string) instead of number.

**Solution:**
- Implemented Pydantic models for type-safe structured outputs
- `weight: Optional[float]` enforces number type
- Clear description: "Omit ONLY for bodyweight exercises"

**Implementation:**
```python
class WorkoutSet(BaseModel):
    weight: Optional[float] = Field(None, description="Weight in lbs/kg. Omit ONLY for bodyweight exercises")

class GenerateWorkout(dspy.Signature):
    workout: Workout  # Pydantic model, not JSON string
```

### Issue 3: Baseline Fitness Assessment (Option A)
**Decision:** Simple but personalized approach.

**Implementation:**
- Ask self-reported level (beginner/intermediate/advanced)
- Ask for ONE primary lift PR (e.g., "205lb bench")
- Use PR to calibrate all other exercise weights
- Avoid asking PRs for every exercise (tedious)

**Added field:**
```python
primary_lift_pr = dspy.OutputField(desc="User's PR for main lift (e.g. '205lb bench') or null. Use to calibrate weights.")
```

### Issue 4: Essential Information Validation
**Research findings:** Industry best practices confirm 7 essential fields for workout programming.

**Decision:** Keep current essential fields list (validated against fitness coaching research):
1. Fitness goal
2. Equipment
3. Duration
4. Focus
5. Experience level
6. Space
7. Injuries

**Optional fields** (only if user mentions): training frequency, diet, sleep, stress

### Implementation Timeline
**Before optimization:**
1. ✅ Add Pydantic models (20 min)
2. ✅ Refine ChatAgent signature (10 min)
3. ✅ Add primary_lift_pr field (5 min)
4. ✅ Test app 3-5 times (30 min)

**After validation:**
5. Run MIPROv2 optimizer on refined modules

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

3. **~~JSON validation~~**: ✅ RESOLVED - Using Pydantic models for type-safe output
   - WorkoutGenerator now outputs `Workout` Pydantic model instead of JSON string
   - Type validation handled automatically by Pydantic

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

---

## 📋 HANDOFF SUMMARY FOR NEXT SESSION

**Last Updated:** 2025-10-23

### Context:
Building a DSPy-based fitness coach (Coach Nova) to optimize prompts before porting back to AI SDK.

### What's Been Accomplished:
✅ **Phases 1-2 Complete** - All modules working, Pydantic models implemented, app tested
✅ **Phase 3 (80% done)** - Training data created: 8 InfoExtractor + 4 WorkoutGenerator synthetic examples, plus 4 real conversation logs
✅ **Phase 4 (95% done)** - Code migrated to MIPROv2, bootstrap phase verified working
✅ **Validation Success** - Logs show 72% reduction in conversation length (18→5 exchanges), no more tangential questions, proper type-safe outputs

### Current State:
- All code in `dspy-test/coach-app/`: `modules.py`, `main.py`, `training_data.py`, `metrics.py`, `optimize.py`
- ✅ `optimize.py` **UPDATED** to use MIPROv2 (completed 2025-10-23)
- ✅ Command-line support added: `uv run optimize.py 3`
- ✅ Fixed `primary_lift_pr` parameter in evaluation function
- ⚠️ Optimization blocked by API quota limit

### The Blocker:
**Gemini API Daily Quota Exhausted** - The free tier allows 50 requests/day, which was consumed during multiple optimization attempts. MIPROv2 requires ~30-50 API calls (bootstrap + instruction proposal + Bayesian optimization).

**Progress Made Before Block:**
- ✅ Step 1/3: Bootstrap phase completed (6 demo sets created)
- ⚠️ Step 2/3: Instruction proposal phase started but hit quota
- ❌ Step 3/3: Bayesian optimization not reached

### Next Action (Choose ONE Path):

**🟢 Path 1: Wait & Resume** (Recommended for Free Tier)
```bash
# Wait 24 hours for quota reset, then:
cd dspy-test/coach-app
uv run optimize.py 3
```
**When:** After quota resets (check https://ai.dev/usage?tab=rate-limit)
**Time:** ~30-40 minutes to complete
**Cost:** Free

**🟡 Path 2: Upgrade & Complete** (Best for Active Development)
1. Visit https://ai.google.dev/pricing and upgrade to paid tier
2. Run: `cd dspy-test/coach-app && uv run optimize.py 3`
**When:** Immediately
**Time:** ~15-20 minutes
**Cost:** ~$0.50-2.00 for optimization

**🟠 Path 3: Switch Model Provider**
1. Get OpenAI/Claude/other API key
2. Update `optimize.py` line 39 & 90:
   ```python
   dspy.configure(lm=dspy.LM("gpt-3.5-turbo", api_key=openai_key))
   ```
3. Run: `cd dspy-test/coach-app && uv run optimize.py 3`
**When:** If you have alternative API access
**Time:** ~20-30 minutes
**Cost:** Depends on provider

**⚪ Path 4: Manual Prompt Engineering** (Fallback)
Skip optimization, port existing prompts manually to AI SDK
1. Use signatures from `modules.py` as base prompts
2. Add few-shot examples from `training_data.py`
3. Update `backend/src/prompts.ts` directly
**When:** If optimization not feasible
**Time:** ~1-2 hours
**Trade-off:** Less systematic, but makes progress

### Key Files Reference:
- **Plan:** `dspy-test/docs/full-implementation-plan.md` (this file)
- **Status:** `dspy-test/docs/optimization-status.md` (detailed troubleshooting & session log)
- **Modules:** `dspy-test/coach-app/modules.py` (CoachAgent, InfoExtractor, WorkoutGenerator)
- **Training Data:** `dspy-test/coach-app/training_data.py` (12 examples total)
- **Metrics:** `dspy-test/coach-app/metrics.py` (extraction_accuracy, workout_quality)
- **Optimizer:** `dspy-test/coach-app/optimize.py` ✅ **USES MIPROv2** (updated 2025-10-23)
- **Logs:** `dspy-test/coach-app/logs/04.md` (excellent positive example)

### Success Criteria (After Optimization Completes):
- ✅ Optimized modules saved to `optimized/extractor.json` and `optimized/generator.json`
- ✅ Performance improvement visible in evaluation metrics
- ✅ Generated instructions provide clear task guidance (inspect with `dspy.inspect_history()`)
- ✅ Compare baseline vs optimized scores
- ➡️ Proceed to Phase 5: Port to AI SDK

### If You Get Stuck:
- See `dspy-test/docs/optimization-status.md` for detailed troubleshooting
- See Phase 4.0 below for MIPROv2 configuration details
- See Phase 4.2 below for optimizer code examples
- MIPROv2 documentation: https://dspy-docs.vercel.app/docs/building-blocks/optimizers#miprov2
- API quota tracking: https://ai.dev/usage?tab=rate-limit

### 🚀 Quick Resume Command:
```bash
# After quota resets or with alternative API:
cd dspy-test/coach-app
uv run optimize.py 3
# Let it run for ~15-20 minutes
# Check optimized/*.json files when done
```
