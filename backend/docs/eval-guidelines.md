Here’s an updated, trimmed eval plan that aligns with the stated preferences: keep structural checks, core safety/feasibility, goal alignment, missing-info gating, injuries, and adversarial/schema‑stress; skip date logic, persona-heavy judging, supersets, progression-over-time, multilingual, and broader tooling/dataset work. Each item includes what to test and how to implement with lightweight checks in a Node test harness using zod/AJV only at the final response stage, as requested.

## Structured output
- JSON schema validation (final response only): Validate strictly against the workout schema with “no extra fields,” correct enums, and optional weight behavior; run only when the tool (workout generation) is invoked, using zod or AJV against the parsed JSON inside <workout> tags.[1][3][6]
- Tag and format enforcement (final response only): Assert exactly two blocks appear in order—<summary>…</summary> and <workout>…</workout>—and nothing outside; forbid code fences and stray text; fail on empty summary or missing tags.[3][1]
- Escaping and serialization fuzz: Feed conversations that produce special characters in exercise names/notes (quotes, commas, unicode, emoji) to ensure valid JSON with no trailing commas and proper escaping; include long strings and nested arrays stress cases.[5][6]

## Safety and feasibility
- Equipment feasibility checks: Validate that every prescribed exercise is feasible with declared equipment/location; include scenarios like “dumbbells only,” “bodyweight at home,” “barbell + rack, no bench,” and “machines only;” fail on mismatches (e.g., cable-only movements with no cables).[2][3]
  - Also test these additional scenarios:
    - Space constraints: hotel room/bodyweight sessions should avoid barbell or large-machine prescriptions.[2][3]
    - Bench dependency: if no bench is available, disallow flat/incline DB bench; prefer floor press/regressions.[3][2]
    - Pull-up bar availability: only program pull-ups if a bar or rings is declared; otherwise swap to rows/lat pulldown (if cables exist).[2][3]
- Warmup/working set logic: When loads are used, require 1–3 warmup sets before working sets; flag warmups on pure bodyweight unless justified (e.g., “grease-the-groove” or skill progressions); verify setType ordering and that warmups don’t exceed working volume.[1][3]
- Goal-aligned set/rep ranges: Assert distributions match goal archetypes—strength biased to lower reps, hypertrophy 8–12 dominant, endurance 12–20+, power low reps; allow minor flexibility but fail if the majority is off-goal.[6][5]
- Time-cap fit: Estimate session time with simple rules-of-thumb—e.g., 30–45s per working set for hypertrophy, 60–90s for strength/power, plus rest windows per goal; sum across sets and reject plans exceeding declared minutes by >10% slack.[5][6][1]
- Injury/pain handling: If pain/red flags are present, assert substitutions to pain-free alternatives and presence of a brief safety reminder in notes; fail if the same aggravating movement remains or if medical advice is given.[6][1][5]

## Behavior and instruction following
- Missing-info gate: When one or more essential inputs (goal, equipment, session duration, days/week or focus, pain/injury) are missing, require a concise follow-up question block instead of generating a full workout; verify the follow-up asks only for missing fields and stays brief.[1][3][6]
- History grounding (clarified and kept): For multi-turn inputs, assert that the reply integrates constraints from the <history> section in addition to <question>—e.g., if history says “pull day” and latest question adds “40 min,” the output includes workoutFocus: "pull" and respects 40 minutes even if the latest question is terse; test with histories that establish goal/equipment/focus and a latest question that modifies only one parameter.[3][1]

## Training logic and progression
- Compound-first ordering (flexible enforcement): Prefer compounds/skill lifts before accessories; implement as a soft check—score passes if ≥70% of sessions place major compounds first; do not hard-fail specialty cases (e.g., pre-exhaust by design).[6][2]

## Robustness edge cases
- Adversarial prompt compliance: Seed prompts trying to force YAML, extra fields, or free-form commentary; require the model to return only <summary> and <workout> with schema-conformant JSON; fail any extraneous sections or added keys.[5][1][3]
- Serialization stress with uncommon names: Include long or uncommon exercise names from open datasets (e.g., Jefferson deadlift, Z-press, Cossack squat), special characters, and parentheses; ensure serialization and feasibility logic still pass.[2][6]

## Scoring and automation
- Rule-based metrics (how-to):
  - % valid JSON: count outputs that parse and pass schema validation; numerator/denominator across eval runs.[1][6]
  - % tag compliance: fraction with exactly two blocks in correct order and nothing outside.[3][1]
  - Equipment feasibility score: per-sample ratio of feasible exercises to total; aggregate mean and pass rate thresholds (e.g., ≥0.95 mean, ≥0.9 pass rate).[2][3]
  - Goal alignment score: share of sets within target rep bands per goal, with a pass threshold (e.g., ≥70% of working sets in-range).[5][6]
  - Time-feasibility pass rate: fraction of plans within declared minutes with 10% slack.[1][5]
- Light LLM-judge usage (optional): If desired later, add a small rubric grader for “concise and directive” in the summary/notes; currently optional per preference.[6][1]

## Minimal implementation notes
- Parsing and validation:
  - Extract the <summary> and <workout> sections with a strict regex; enforce no text outside tags and correct order; short-circuit failures early.[3][1]
  - Validate the JSON with zod/AJV only when calling the workout generation tool; set additionalProperties: false and compile validators once per test run for speed.[6][3]
- Feasibility checker:
  - Maintain a small curated exercise-to-equipment map seeded from a public exercise list; categorize by minimal equipment requirement (bodyweight, dumbbells, barbell+rack, machine, cables, bands, bench needed, pull-up bar) and space needs; keep in-memory JSON for quick checks.[2][3]
- Time estimator:
  - Define per-goal defaults: strength working set ≈ 60–90s + 120–180s rest; hypertrophy ≈ 30–45s + 60–90s rest; endurance ≈ 20–30s + 30–60s rest; power ≈ 10–20s + 120–180s rest; warmups at half the working-set time; provide 10% schedule slack before failing.[5][1][6]
- History grounding:
  - Build fixtures with history declaring goal/equipment/focus and a latest question altering one variable; add an oracle that extracts expected focus/equipment from history and checks they appear in the output’s workoutFocus and exercise choices.[1][3]

If helpful, a starter checklist for the CI test per sample:
- Extract and verify tags.[3][1]
- Parse and validate schema (final response only).[6]
- Check equipment feasibility per exercise.[2]
- Verify warmup/working ordering and counts.[1]
- Compute goal rep-distribution score and pass threshold.[6]
- Estimate total session time vs. declared cap.[5]
- If injuries present, assert substitutions and safety note.[6]
- If required inputs missing, assert follow-up gating behavior.[3]

This set honors the “final response only” validation timing, removes date logic and lower-priority persona/superset/progression evals, keeps the core safety/feasibility/goal checks, and adds clarifications on history grounding and equipment edge scenarios with concrete pass criteria.[5][1][2][3][6]

[1](https://www.json-validate.com/blog/json-schema-validation)
[2](https://github.com/wrkout/exercises.json)
[3](https://json-schema.org/learn)
[4](https://www.devzery.com/post/json-schema-tests-best-practices-implementation-and-tools)
[5](https://jsonconsole.com/blog/json-schema-validation-advanced-patterns-best-practices-enterprise-applications)
[6](https://www.jsonlint.pro/articles/json-schema-validation)
[7](https://www.reddit.com/r/datasets/comments/12u6gw1/open_public_domain_exercise_dataset_in_json/)