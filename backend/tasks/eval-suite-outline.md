# Eval Suite Outline - Quick Reference

**Full Design:** See [eval-suite-design.md](./eval-suite-design.md)
**Status:** 63 total tests (8 existing + 55 new)
**Updated:** 2025-10-08

---

## Quick Navigation

### Implementation Priority

1. **START HERE:** [Tool Calling Discipline](#1-tool-calling-discipline) (12 tests) ⭐
2. [Information Gathering](#2-information-gathering) (7 tests)
3. [Workout Focus Adherence](#3-workout-focus-adherence) (6 tests)
4. [Equipment Constraints](#4-equipment-constraints) (6 tests)
5. [Time & Programming](#5-time-and-programming) (8 tests)
6. [Safety & Injuries](#6-safety-and-injuries) (5 tests)
7. [Output Quality](#7-output-quality) (6 tests)
8. [Edge Cases & Conversation](#8-edge-cases-and-conversation) (5 tests)

---

## 1. Tool Calling Discipline

**File:** `tool-calling-discipline.eval.ts` (12 tests)
**Details:** [Lines 40-336](./eval-suite-design.md#L40-L336)
**Status:** ⭐ CRITICAL - Implement first

### Test Breakdown

| Tests | Focus | Lines |
|-------|-------|-------|
| #1-2 | Basic tool calling & exercise prohibition | L53-54 |
| #3-4 | Missing/partial info handling | L55-56 |
| #5-8 | Conversation flow & modifications | L57-60 |
| #9-10 | **Tool call reliability** (hiccup/error detection) | L61-62 |
| #11 | **Made-up exercises** (from chat logs) | L63 |
| #12 | **Harmful requests** (from chat logs) | L64 |

### Key Implementation Details

- **Task function:** Lines 91-114
- **Binary scorers:** Lines 117-234
- **LLM judges:** Lines 235-332
- **Known issue:** Tool hesitation/errors (Line 47)

### Critical Rules Being Tested

> "CRITICAL: Never describe, list, or mention specific exercises in your text response."

**Source:** `CHAT_AGENT_PROMPT` in `backend/src/prompts.ts:28`

---

## 2. Information Gathering

**File:** `information-gathering.eval.ts` (7 tests)
**Details:** [Lines 339-409](./eval-suite-design.md#L339-L409)

### Required Parameters (7 total)

1. `fitnessLevel` (beginner/intermediate/advanced)
2. `fitnessGoal` (strength/hypertrophy/endurance/power)
3. `equipment` (bodyweight/dumbbells/barbell/etc.)
4. `sessionDuration` (minutes)
5. `workoutFocus` (push/pull/legs/full body/specific)
6. `spaceConstraints` (home/gym/hotel/outdoor)
7. `injuries` (optional but should ask)

**Source:** `generateWorkout` tool in `backend/src/tools.ts:42-71`

### Test Cases

| Test | Missing Param(s) | Lines |
|------|-----------------|-------|
| #1 | fitnessGoal only | L356 |
| #2 | equipment only | L357 |
| #3 | sessionDuration only | L358 |
| #4 | workoutFocus only | L359 |
| #5 | fitnessLevel only | L360 |
| #6 | Multiple (3+) | L361 |
| #7 | Has 4/7 params | L362 |

### Scorers

- **Binary:** `asks_for_missing_info` (Lines 367-377)
- **LLM Judge:** `llm_judge_question_quality` (Lines 380-408)

---

## 3. Workout Focus Adherence

**File:** `workout-focus-adherence.eval.ts` (6 tests)
**Details:** [Lines 473-531](./eval-suite-design.md#L473-L531)

### Critical Rule

> "Chest = only chest exercises. Legs = only leg exercises. No exceptions."

**Source:** `WORKOUT_GENERATION_PROMPT` in `backend/src/prompts.ts:79`

### Test Cases

| Test | Focus | Valid | Invalid | Lines |
|------|-------|-------|---------|-------|
| #1 | Chest | Bench, push-ups, flyes | Rows, squats, curls | L484 |
| #2 | Pull | Rows, pull-ups, curls | Bench, squats | L485 |
| #3 | Legs | Squats, lunges, leg press | Bench, rows | L486 |
| #4 | Push | Bench, OHP, dips | Rows, curls | L487 |
| #5 | Full body | Balanced | Only one group | L488 |
| #6 | Arms | Curls, extensions | Squats, chest | L489 |

### Scorer

- **LLM Judge:** `llm_judge_focus_strictness` (Lines 494-530)

---

## 4. Equipment Constraints

**File:** `equipment-constraints.eval.ts` (6 tests)
**Details:** [Lines 413-469](./eval-suite-design.md#L413-L469)

### Test Cases

| Test | Constraint | Invalid | Valid | Lines |
|------|-----------|---------|-------|-------|
| #1 | Bodyweight only | Barbell/dumbbell | Push-ups, BW squats | L424 |
| #2 | Dumbbells only | Barbell, cables | DB press, DB flyes | L425 |
| #3 | No bench | Bench press | Floor press, push-ups | L426 |
| #4 | No pull-up bar | Pull-ups | DB rows, inverted rows | L427 |
| #5 | Hotel room | Barbell, machines | Bodyweight, bands | L428 |
| #6 | Full gym | None | Wide variety | L429 |

### Scorer

- **LLM Judge:** `llm_judge_equipment_adherence` (Lines 434-468)

---

## 5. Time & Programming

**File:** `time-and-programming.eval.ts` (8 tests)
**Details:** [Lines 535-658](./eval-suite-design.md#L535-L658)

### Programming Guidelines

| Goal | Reps | Rest | Source |
|------|------|------|--------|
| Strength | 1-6 | 120-180s | prompts.ts:88 |
| Hypertrophy | 8-12 | 60-90s | prompts.ts:89 |
| Endurance | 12-20+ | 30-60s | prompts.ts:90 |
| Power | 1-6 | 120-180s | prompts.ts:91 |

### Test Cases

| Test | Focus | Criteria | Lines |
|------|-------|----------|-------|
| #1 | 20-min session | 3-4 exercises max | L549 |
| #2 | 45-min session | 5-7 exercises | L550 |
| #3 | 90-min session | 8-12 exercises | L551 |
| #4-6 | Rep ranges | Match goal | L552-554 |
| #7 | Warmup sets | 1-3 on compounds | L555 |
| #8 | Rep consistency | All sets match goal | L556 |

### Scorers

- **Binary:** `warmup_sets_included` (Lines 562-579)
- **LLM Judges:** `time_realism`, `rep_range_match` (Lines 582-657)

---

## 6. Safety & Injuries

**File:** `safety-and-injuries.eval.ts` (5 tests)
**Details:** [Lines 662-764](./eval-suite-design.md#L662-L764)

### Test Cases

| Test | Injury | Contraindicated | Alternatives | Lines |
|------|--------|----------------|--------------|-------|
| #1 | Shoulder pain | OHP, bench | Landmine, floor press | L673 |
| #2 | Knee issues | Squat, lunges | Leg press, step-ups | L674 |
| #3 | Lower back | Deadlifts | Hip thrusts | L675 |
| #4 | No injuries | None | Normal selection | L676 |
| #5 | Multiple | Overhead + squats | Full accommodation | L677 |

### Scorers

- **LLM Judge:** `avoids_contraindicated_movements` (Lines 682-715)
- **LLM Judge:** `safety_notes_appropriate` (Lines 718-763)

---

## 7. Output Quality

**File:** `output-quality.eval.ts` (6 tests)
**Details:** [Lines 768-896](./eval-suite-design.md#L768-L896)

### Test Cases

| Test | Validation | Lines |
|------|-----------|-------|
| #1 | Valid JSON | All required fields | L778 |
| #2 | setType | Only "warmup"/"working" | L779 |
| #3 | Real exercises | No "Super Mega Blast" | L780 |
| #4 | Exercise order | Compounds first | L781 |
| #5 | Notes quality | Helpful guidance | L782 |
| #6 | workoutFocus | Matches request | L783 |

### Scorers

- **Binary:** `valid_json_schema` (Lines 789-811)
- **LLM Judges:** `real_exercises_only`, `exercise_ordering_logic` (Lines 814-895)

---

## 8. Edge Cases & Conversation

**File:** `edge-cases-conversation.eval.ts` (5 tests)
**Details:** [Lines 900-981](./eval-suite-design.md#L900-L981)

### Test Cases

| Test | Scenario | Expected | Lines |
|------|----------|----------|-------|
| #1 | Conflicting requirements | Asks clarification | L910 |
| #2 | Unrealistic (5min full body) | Explains constraints | L911 |
| #3 | Vague ("make me strong") | Asks questions | L912 |
| #4 | Swap exercise | No listing | L913 |
| #5 | Shorter workout | Suggests removal | L914 |

### Scorers

- **LLM Judge:** `llm_judge_conflict_handling` (Lines 920-945)
- **LLM Judge:** `llm_judge_character_consistency` (Lines 948-980)

---

## Known Issues (Reference)

**Details:** [Lines 1053-1082](./eval-suite-design.md#L1053-L1082)

### 1. Tool Call Hesitation
- **Tests:** #9-10 in Tool Calling Discipline
- **Symptom:** "hiccup/error" messages before tool call
- **Impact:** Requires retry prompt

### 2. Imaginary Exercise Handling
- **Test:** #11 in Tool Calling Discipline
- **Source:** `backend/docs/chats/imaginary-workouts.md`
- **Status:** ✅ Working correctly (regression test)

### 3. Harmful Request Boundaries
- **Test:** #12 in Tool Calling Discipline
- **Source:** `backend/docs/chats/imaginary-workouts.md`
- **Status:** ✅ Working correctly (regression test)

---

## Chat Log References

**Location:** `backend/docs/chats/`

| File | Purpose | Notes |
|------|---------|-------|
| `1008-01-chat.md` | Golden dataset | Perfect info gathering example |
| `imaginary-workouts.md` | Edge cases | Fake exercises, harmful requests |
| `rock-workout.md` | UI issue | Exercise names in output (may be frontend) |

**Details:** [Lines 1079-1082](./eval-suite-design.md#L1079-L1082)

---

## Implementation Checklist

**Details:** [Lines 985-1001](./eval-suite-design.md#L985-L1001)

### Phase 1: Critical Behaviors (START HERE)
- [ ] `tool-calling-discipline.eval.ts` (12 tests) ⭐
- [ ] `information-gathering.eval.ts` (7 tests)
- [ ] `workout-focus-adherence.eval.ts` (6 tests)

### Phase 2: Constraint Validation
- [ ] `equipment-constraints.eval.ts` (6 tests)
- [ ] `time-and-programming.eval.ts` (8 tests)
- [ ] `safety-and-injuries.eval.ts` (5 tests)

### Phase 3: Quality & Edge Cases
- [ ] `output-quality.eval.ts` (6 tests)
- [ ] `edge-cases-conversation.eval.ts` (5 tests)

---

## Running Evals

**Details:** [Lines 1005-1016](./eval-suite-design.md#L1005-L1016)

```bash
# Run all evals in watch mode
cd backend && bun run eval:dev

# Run specific eval file
cd backend && bun run evalite src/evals/tool-calling-discipline.eval.ts

# Run all evals once
cd backend && bun run evalite src/evals/**/*.eval.ts
```

---

## Scorer Types Reference

**Details:** [Lines 1020-1040](./eval-suite-design.md#L1020-L1040)

### Binary Scorers (Fast)
- Tool called: yes/no
- Contains exercise names: yes/no
- Valid JSON schema: yes/no
- Best for: Clear pass/fail criteria

### Regex Scorers (Fast)
- Detect exercise names in text
- Find question marks
- Match specific phrases
- Best for: Text pattern detection

### LLM-as-Judge Scorers (Nuanced)
- Question quality (1-5)
- Equipment adherence (1-5)
- Focus strictness (1-5)
- Best for: Subjective quality evaluation
- **Important:** Always normalize to 0-1 (divide by 5)

---

## Key Source Files

| File | Content | Used For |
|------|---------|----------|
| `backend/src/prompts.ts` | System prompts | Agent behavior rules |
| `backend/src/tools.ts` | Tool definitions | Parameter validation |
| `backend/src/evals/workout-behavior.eval.ts` | Existing evals | Pattern reference (8 tests) |

---

**End of Outline**
