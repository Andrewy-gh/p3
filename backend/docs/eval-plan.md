# Evaluation Plan for /v2 Endpoint

This document outlines the comprehensive evaluation strategy for the workout generation `/v2` endpoint based on the eval guidelines and evalite framework.

## Overview

The `/v2` endpoint (`src/routes/playground.ts:53-77`) generates personalized workout plans using the `generateWorkout` tool with a 10-step limit (`stepCountIs(10)`). These evaluations focus on deterministic validation of output quality, safety, and adherence to specifications.

## Evaluation Categories

### 1. Structured Output Validation

**Purpose**: Ensure all responses conform to the exact JSON schema and format requirements.

**Test Cases**:
- **JSON Schema Validation**: Validate strict conformance to `WorkoutCreateWorkoutRequestSchema` with no extra fields, correct enums (`warmup`/`working`), and proper optional weight behavior
- **Tag Format Enforcement**: Assert exactly two blocks in order: `<summary>...</summary>` and `<workout>...</workout>` with no external content
- **Serialization Stress Testing**: Test with special characters in exercise names (quotes, commas, unicode, emoji) to ensure valid JSON serialization
- **No Code Fences**: Ensure responses don't contain markdown code blocks or YAML formatting

**Scoring Criteria**:
- % valid JSON: count outputs that parse and pass schema validation
- % tag compliance: fraction with exactly two blocks in correct order
- Pass threshold: ≥95% for both metrics

### 2. Safety and Feasibility

**Purpose**: Validate that generated workouts are safe, feasible, and appropriate for the user's constraints.

**Test Cases**:
- **Equipment Feasibility Checks**:
  - "dumbbells only" → no barbell/machine exercises
  - "bodyweight at home" → no equipment-dependent movements
  - "barbell + rack, no bench" → floor press instead of bench press
  - "machines only" → no free weight exercises
- **Space Constraint Validation**:
  - Hotel room sessions → no barbell/large machine prescriptions
  - Small space → bodyweight or compact equipment only
- **Pull-up Bar Dependency**: Only program pull-ups if bar/rings declared; otherwise substitute rows/lat pulldowns
- **Warmup/Working Set Logic**: 
  - Require 1-3 warmup sets before working sets when loads are used
  - Verify `setType` ordering (warmups before working)
  - Ensure warmups don't exceed working volume
- **Goal-Aligned Set/Rep Ranges**:
  - Strength: majority in 1-6 rep range
  - Hypertrophy: majority in 8-12 rep range  
  - Endurance: majority in 12-20+ rep range
  - Power: majority in 1-6 rep range
- **Time Feasibility**: 
  - Estimate session time using goal-appropriate rest periods
  - Strength/Power: 60-90s working + 120-180s rest
  - Hypertrophy: 30-45s working + 60-90s rest
  - Endurance: 20-30s working + 30-60s rest
  - Fail if >10% over declared time limit
- **Injury/Pain Handling**: 
  - Assert substitutions to pain-free alternatives
  - Include brief safety reminder in notes
  - No medical advice provided

**Scoring Criteria**:
- Equipment feasibility score: ratio of feasible exercises to total (≥95% mean, ≥90% pass rate)
- Goal alignment score: share of sets within target rep bands (≥70% in-range)
- Time feasibility pass rate: fraction within declared minutes + 10% slack

### 3. Behavior and Instruction Following

**Purpose**: Ensure the system follows instructions correctly and handles missing information appropriately.

**Test Cases**:
- **Missing Info Gating**: 
  - When essential inputs missing (goal, equipment, duration, focus, injuries), require concise follow-up questions
  - No workout generation until all required fields provided
  - Follow-up asks only for missing fields, stays brief
- **History Integration**: 
  - Multi-turn conversations where history establishes constraints
  - Latest question modifies single parameter
  - Output respects both history and latest input
  - Example: History says "pull day", latest adds "40 min" → output includes `workoutFocus: "pull"` and respects 40-minute limit

**Scoring Criteria**:
- Missing info gate compliance: 100% when required fields absent
- History integration accuracy: constraints from both sources reflected in output

### 4. Training Logic and Progression

**Purpose**: Validate sound training principles and exercise ordering.

**Test Cases**:
- **Compound-First Ordering**: 
  - Prefer compounds/skill movements before accessories
  - Soft check: ≥70% of sessions place major compounds first
  - Allow specialty cases (e.g., pre-exhaust protocols)

**Scoring Criteria**:
- Exercise ordering compliance: ≥70% compound-first adherence

### 5. Robustness and Edge Cases

**Purpose**: Test system resilience against adversarial inputs and edge cases.

**Test Cases**:
- **Adversarial Prompt Compliance**:
  - Prompts trying to force YAML output
  - Attempts to add extra JSON fields
  - Requests for free-form commentary
  - System must return only `<summary>` and `<workout>` tags
- **Exercise Name Stress Testing**:
  - Uncommon exercise names (Jefferson deadlift, Z-press, Cossack squat)
  - Special characters and parentheses
  - Long exercise names
  - Unicode and emoji in exercise descriptions

**Scoring Criteria**:
- Adversarial resistance: 100% compliance with format requirements
- Name handling: valid JSON serialization regardless of exercise name complexity

## Implementation Framework

### Technology Stack
- **Framework**: Evalite with custom scorers
- **Validation**: Zod schema validation (final response only)
- **HTTP Client**: Direct requests to `/v2` endpoint
- **Test Runner**: Node.js with rule-based metrics

### Data Requirements
- **Exercise Database**: Curated exercise-to-equipment mapping from public datasets
- **Equipment Categories**: bodyweight, dumbbells, barbell+rack, machines, cables, bands, bench, pull-up bar
- **Space Classifications**: home, gym, hotel room, outdoor
- **Time Estimation Rules**: Per-goal defaults for set duration and rest periods

### Test Data Structure
```typescript
interface EvalCase {
  input: {
    messages: UIMessage[];
    expectedMissingInfo?: string[];
  };
  expected: {
    hasValidStructure: boolean;
    equipmentFeasible: boolean;
    goalAligned: boolean;
    timeFeasible: boolean;
    hasInjurySubstitutions?: boolean;
    workoutFocus?: string;
  };
}
```

### Automated Scoring Pipeline

For each test case:
1. Extract and verify tag format
2. Parse and validate JSON schema (final response only)
3. Check equipment feasibility per exercise
4. Verify warmup/working set ordering and counts
5. Compute goal rep-distribution score
6. Estimate total session time vs declared cap
7. If injuries present, assert substitutions and safety notes
8. If required inputs missing, assert follow-up gating behavior

### Pass Criteria Summary
- **JSON Validation**: ≥95% valid schema compliance
- **Format Compliance**: 100% correct tag structure
- **Equipment Feasibility**: ≥95% mean feasibility score
- **Goal Alignment**: ≥70% of working sets in target ranges
- **Time Feasibility**: ≥90% of plans within time + 10% slack
- **Safety Handling**: 100% when injuries/pain mentioned
- **Missing Info Gating**: 100% when required fields absent

## Test Execution

### Commands
- **Development**: `bun run eval:dev` (runs evalite watcher)
- **Script Runner**: `bun run script` (runs evaluation scripts)

### File Structure
```
docs/evalite/
├── workout-structured-output.eval.ts
├── workout-safety-feasibility.eval.ts
├── workout-behavior.eval.ts
├── workout-robustness.eval.ts
└── workout-integration.eval.ts
```

## Implementation Checklist

### Setup and Infrastructure
- [X] Install evalite dependencies
- [ ] Create base test configuration
- [ ] Set up exercise-to-equipment mapping database
- [ ] Create time estimation utility functions
- [ ] Set up HTTP client for `/v2` endpoint testing

### Structured Output Validation Tests
- [ ] Create `workout-structured-output.eval.ts`
- [ ] Implement JSON schema validation scorer
- [ ] Implement tag format validation scorer
- [ ] Add serialization stress test cases with special characters
- [ ] Add test cases for code fence prevention

### Safety and Feasibility Tests
- [ ] Create `workout-safety-feasibility.eval.ts`
- [ ] Implement equipment feasibility checker
- [ ] Add equipment mismatch test cases (dumbbells only, bodyweight, etc.)
- [ ] Implement space constraint validation
- [ ] Add warmup/working set logic validation
- [ ] Implement goal-aligned rep range scoring
- [ ] Add time feasibility estimation and validation
- [ ] Implement injury handling validation

### Behavior and Instruction Following Tests
- [ ] Create `workout-behavior.eval.ts`
- [ ] Implement missing info gating tests
- [ ] Add multi-turn conversation history integration tests
- [ ] Create test cases for partial information scenarios
- [ ] Implement follow-up question validation

### Training Logic Tests
- [ ] Add compound-first ordering validation to safety tests
- [ ] Create test cases for exercise ordering compliance
- [ ] Implement progression logic validation

### Robustness and Edge Case Tests
- [ ] Create `workout-robustness.eval.ts`
- [ ] Add adversarial prompt test cases (YAML, extra fields, commentary)
- [ ] Implement exercise name stress testing
- [ ] Add unicode and special character handling tests
- [ ] Create long exercise name test cases

### Integration and Validation
- [ ] Create `workout-integration.eval.ts` for end-to-end scenarios
- [ ] Test complete user journey scenarios
- [ ] Validate scoring thresholds and pass criteria
- [ ] Create baseline performance measurements
- [ ] Set up automated regression detection

### Documentation and Maintenance
- [ ] Document test execution procedures
- [ ] Create troubleshooting guide for failed tests
- [ ] Set up continuous integration for eval runs
- [ ] Create performance monitoring dashboard

## Success Metrics

The evaluation suite will provide:
- **Overall Pass Rate**: Percentage of test cases meeting all criteria
- **Category Breakdown**: Success rates per evaluation category
- **Failure Analysis**: Detailed reports on specific failure modes
- **Regression Detection**: Comparison against baseline performance

This evaluation framework ensures the `/v2` endpoint consistently generates safe, feasible, and properly formatted workout plans that meet user requirements while maintaining system robustness.