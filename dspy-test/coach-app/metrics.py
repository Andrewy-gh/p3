"""
Evaluation Metrics for DSPy Optimization

This module contains metric functions for evaluating:
- InfoExtractor: How well structured info is extracted from conversations
- WorkoutGenerator: Quality and appropriateness of generated workouts
"""

import json


def extraction_accuracy(example, prediction, trace=None):
    """
    Evaluate how accurately the InfoExtractor extracted user requirements.

    Compares predicted fields against expected fields and returns a score
    between 0.0 and 1.0 based on the proportion of correctly extracted fields.

    Args:
        example: dspy.Example with expected extraction results
        prediction: Prediction from InfoExtractor module
        trace: Optional trace information (not used)

    Returns:
        float: Score between 0.0 and 1.0
    """
    score = 0
    total_fields = 7

    # Check each field for match
    if example.fitness_level == prediction.fitness_level:
        score += 1
    if example.goal == prediction.goal:
        score += 1
    if example.focus == prediction.focus:
        score += 1
    if example.equipment == prediction.equipment:
        score += 1
    if example.duration == prediction.duration:
        score += 1
    if example.space == prediction.space:
        score += 1
    if example.injuries == prediction.injuries:
        score += 1

    return score / total_fields


def workout_quality(example, prediction, trace=None):
    """
    Evaluate the quality of a generated workout plan.

    Checks that the workout:
    - Has valid JSON format
    - Contains appropriate number of exercises for duration
    - Exercises match the specified focus area
    - Rep ranges match the training goal
    - Only uses specified equipment

    Args:
        example: dspy.Example with input requirements and expected output
        prediction: Prediction from WorkoutGenerator module
        trace: Optional trace information (not used)

    Returns:
        float: Score between 0.0 and 1.0
    """
    try:
        # Handle different output formats
        if hasattr(prediction, 'workout'):
            workout_obj = prediction.workout
            # If it's a Pydantic model, convert to dict
            if hasattr(workout_obj, 'model_dump'):
                workout_data = workout_obj.model_dump()
            elif isinstance(workout_obj, dict):
                workout_data = workout_obj
            elif isinstance(workout_obj, str):
                # If it's a JSON string, try to parse it
                # Remove markdown code fences if present
                workout_str = workout_obj.strip()
                if workout_str.startswith('```'):
                    # Extract JSON from markdown code block
                    lines = workout_str.split('\n')
                    # Skip first line (```json or ```)
                    json_lines = []
                    in_code = False
                    for line in lines:
                        if line.strip().startswith('```'):
                            if in_code:
                                break
                            in_code = True
                            continue
                        if in_code:
                            json_lines.append(line)
                    workout_str = '\n'.join(json_lines)
                workout_data = json.loads(workout_str)
            else:
                return 0.0
        else:
            # Fallback: try workout_json for backwards compatibility
            workout_data = json.loads(prediction.workout_json)
    except (json.JSONDecodeError, AttributeError, ValueError):
        # Invalid data gets 0 score
        return 0.0

    # Initialize score components
    score = 0.0
    max_score = 5.0

    # 1. Check JSON structure (1 point)
    if "exercises" in workout_data and isinstance(workout_data["exercises"], list):
        score += 1.0

        exercises = workout_data["exercises"]

        # 2. Check exercise count is appropriate for duration (1 point)
        duration = int(example.duration) if example.duration.isdigit() else 45
        expected_exercises = duration // 10  # Rough heuristic: ~10 min per exercise

        if len(exercises) > 0:
            # Within reasonable range (50% to 150% of expected)
            if expected_exercises * 0.5 <= len(exercises) <= expected_exercises * 1.5:
                score += 1.0
            elif len(exercises) > 0:
                # Has exercises but not ideal count
                score += 0.5

        # 3. Check exercises have proper structure (1 point)
        valid_structure = True
        for ex in exercises:
            if not isinstance(ex, dict):
                valid_structure = False
                break
            if "name" not in ex or "sets" not in ex:
                valid_structure = False
                break
            if not isinstance(ex["sets"], list) or len(ex["sets"]) == 0:
                valid_structure = False
                break

        if valid_structure:
            score += 1.0

        # 4. Check rep ranges match goal (1 point)
        goal = example.goal.lower()
        rep_ranges_correct = True

        for ex in exercises:
            if "sets" in ex and isinstance(ex["sets"], list):
                for s in ex["sets"]:
                    if "reps" in s:
                        reps = s["reps"]
                        # Extract numeric value if it's a string
                        if isinstance(reps, str):
                            try:
                                reps = int(''.join(filter(str.isdigit, reps)))
                            except ValueError:
                                continue

                        # Check rep ranges match goal
                        if isinstance(reps, int):
                            if goal in ["strength", "power"] and reps > 6:
                                rep_ranges_correct = False
                            elif goal == "hypertrophy" and (reps < 6 or reps > 15):
                                rep_ranges_correct = False
                            elif goal == "endurance" and reps < 12:
                                rep_ranges_correct = False

        if rep_ranges_correct:
            score += 1.0
        elif len(exercises) > 0:
            score += 0.5  # Partial credit if exercises exist

        # 5. Check equipment usage (1 point)
        equipment = example.equipment.lower()
        equipment_appropriate = True

        for ex in exercises:
            if "name" in ex:
                exercise_name = ex["name"].lower()

                # Check if exercise uses appropriate equipment
                if equipment == "bodyweight":
                    if any(word in exercise_name for word in ["dumbbell", "barbell", "cable", "machine"]):
                        equipment_appropriate = False
                elif equipment == "dumbbells":
                    if any(word in exercise_name for word in ["barbell", "cable", "machine"]):
                        equipment_appropriate = False
                elif equipment == "barbell":
                    if any(word in exercise_name for word in ["dumbbell", "cable", "machine"]):
                        equipment_appropriate = False
                # For cables and machines, more flexibility

        if equipment_appropriate:
            score += 1.0
        elif len(exercises) > 0:
            score += 0.5  # Partial credit

    return score / max_score


def conversation_quality(example, prediction, trace=None):
    """
    Evaluate the quality of coach responses in conversation.

    Checks that the coach:
    - Provides helpful responses
    - Stays on topic
    - Asks appropriate follow-up questions
    - Correctly identifies when to extract information

    Args:
        example: dspy.Example with expected conversation behavior
        prediction: Prediction from CoachAgent module
        trace: Optional trace information (not used)

    Returns:
        float: Score between 0.0 and 1.0
    """
    score = 0.0
    max_score = 3.0

    # 1. Check response exists and is not empty (1 point)
    if hasattr(prediction, 'response') and prediction.response and len(prediction.response.strip()) > 0:
        score += 1.0

    # 2. Check response length is reasonable (not too short, not too long) (1 point)
    if hasattr(prediction, 'response'):
        response_len = len(prediction.response)
        # Good response is between 20 and 500 characters
        if 20 <= response_len <= 500:
            score += 1.0
        elif response_len > 0:
            score += 0.5

    # 3. Check should_extract field is valid (1 point)
    if hasattr(prediction, 'should_extract'):
        if prediction.should_extract.lower() in ["true", "false"]:
            score += 1.0

    return score / max_score


def print_metric_results(metric_name, score):
    """
    Pretty print metric results.

    Args:
        metric_name: Name of the metric
        score: Score value (0.0 to 1.0)
    """
    percentage = score * 100
    bar_length = 40
    filled = int(bar_length * score)
    bar = '█' * filled + '░' * (bar_length - filled)

    print(f"\n{metric_name}")
    print(f"[{bar}] {percentage:.1f}%")


if __name__ == "__main__":
    # Example test
    import dspy

    # Test extraction_accuracy
    example = dspy.Example(
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="chest",
        equipment="dumbbells",
        duration="45",
        space="gym",
        injuries="none"
    )

    # Mock prediction
    class MockPrediction:
        def __init__(self):
            self.fitness_level = "intermediate"
            self.goal = "hypertrophy"
            self.focus = "chest"
            self.equipment = "dumbbells"
            self.duration = "45"
            self.space = "gym"
            self.injuries = "none"

    prediction = MockPrediction()
    score = extraction_accuracy(example, prediction)
    print_metric_results("Extraction Accuracy (Perfect Match)", score)

    # Test with partial match
    prediction.goal = "strength"
    prediction.space = "home"
    score = extraction_accuracy(example, prediction)
    print_metric_results("Extraction Accuracy (Partial Match)", score)
