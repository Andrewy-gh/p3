"""
Training Data for DSPy Optimization

This module contains synthetic training examples for:
- InfoExtractor: Extracting structured info from conversations
- WorkoutGenerator: Generating appropriate workout plans
"""

import dspy


# ============================================================================
# INFO EXTRACTOR TRAINING DATA
# ============================================================================

extractor_examples = [
    # Example 1: Complete info upfront
    dspy.Example(
        conversation_history=str([
            {"user": "I want to build muscle with dumbbells, 45 minutes",
             "coach": "Great goal! Are you a beginner, intermediate, or advanced?"}
        ]),
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="full_body",
        equipment="dumbbells",
        duration="45",
        space="gym",
        injuries="none"
    ).with_inputs("conversation_history"),

    # Example 2: Beginner, home workout
    dspy.Example(
        conversation_history=str([
            {"user": "I'm a beginner and want to workout at home with no equipment",
             "coach": "Perfect! How much time do you have?"},
            {"user": "About 30 minutes",
             "coach": "What's your main goal - general fitness, endurance, or building strength?"},
            {"user": "General fitness",
             "coach": "Great! Any injuries or areas to avoid?"},
            {"user": "No injuries",
             "coach": "Perfect, let me create your workout!"}
        ]),
        fitness_level="beginner",
        goal="general",
        focus="full_body",
        equipment="bodyweight",
        duration="30",
        space="home",
        injuries="none"
    ).with_inputs("conversation_history"),

    # Example 3: Chest day at gym
    dspy.Example(
        conversation_history=str([
            {"user": "Chest day at the gym, 60 minutes, I'm advanced",
             "coach": "Awesome! What equipment do you have access to?"},
            {"user": "Full gym - barbells, dumbbells, machines",
             "coach": "What's your primary goal?"},
            {"user": "Building strength",
             "coach": "Any shoulder or chest injuries?"},
            {"user": "No",
             "coach": "Perfect! Let me design your workout."}
        ]),
        fitness_level="advanced",
        goal="strength",
        focus="chest",
        equipment="barbell",
        duration="60",
        space="gym",
        injuries="none"
    ).with_inputs("conversation_history"),

    # Example 4: Pull day with focus
    dspy.Example(
        conversation_history=str([
            {"user": "I want to work on my back muscles",
             "coach": "Great! What's your fitness level?"},
            {"user": "Intermediate",
             "coach": "How much time do you have?"},
            {"user": "45 minutes",
             "coach": "What equipment do you have?"},
            {"user": "Dumbbells and cables",
             "coach": "Are you training for strength or size?"},
            {"user": "Size - hypertrophy",
             "coach": "Any back or shoulder issues?"},
            {"user": "None",
             "coach": "Perfect info! Creating your back workout."}
        ]),
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="back",
        equipment="cables",
        duration="45",
        space="gym",
        injuries="none"
    ).with_inputs("conversation_history"),

    # Example 5: Leg day with injury
    dspy.Example(
        conversation_history=str([
            {"user": "Leg workout, I'm advanced",
             "coach": "Great! How long?"},
            {"user": "90 minutes",
             "coach": "What equipment?"},
            {"user": "Barbell and machines",
             "coach": "Training goal?"},
            {"user": "Strength and power",
             "coach": "Any knee or hip issues?"},
            {"user": "Minor knee pain on deep squats",
             "coach": "Got it, I'll adjust accordingly!"}
        ]),
        fitness_level="advanced",
        goal="power",
        focus="legs",
        equipment="barbell",
        duration="90",
        space="gym",
        injuries="minor knee pain on deep squats"
    ).with_inputs("conversation_history"),

    # Example 6: Quick hotel workout
    dspy.Example(
        conversation_history=str([
            {"user": "I'm traveling and only have 20 minutes in my hotel room",
             "coach": "No problem! What's your goal?"},
            {"user": "Just stay active, general fitness",
             "coach": "Bodyweight only?"},
            {"user": "Yes",
             "coach": "Fitness level?"},
            {"user": "Intermediate",
             "coach": "Full body focus?"},
            {"user": "Yes",
             "coach": "Creating your hotel workout!"}
        ]),
        fitness_level="intermediate",
        goal="general",
        focus="full_body",
        equipment="bodyweight",
        duration="20",
        space="hotel",
        injuries="none"
    ).with_inputs("conversation_history"),

    # Example 7: Endurance focus
    dspy.Example(
        conversation_history=str([
            {"user": "I want to improve my muscular endurance",
             "coach": "Excellent! Where are you training?"},
            {"user": "At the gym",
             "coach": "How much time?"},
            {"user": "40 minutes",
             "coach": "What would you like to focus on today?"},
            {"user": "Upper body - push movements",
             "coach": "What equipment?"},
            {"user": "Dumbbells and bands",
             "coach": "Experience level?"},
            {"user": "Beginner",
             "coach": "Perfect! Building your endurance workout."}
        ]),
        fitness_level="beginner",
        goal="endurance",
        focus="push",
        equipment="dumbbells",
        duration="40",
        space="gym",
        injuries="none"
    ).with_inputs("conversation_history"),

    # Example 8: Arms specialization
    dspy.Example(
        conversation_history=str([
            {"user": "Arm day! Biceps and triceps",
             "coach": "Nice! How long?"},
            {"user": "50 minutes",
             "coach": "Equipment available?"},
            {"user": "Dumbbells and cables",
             "coach": "Building size or strength?"},
            {"user": "Size",
             "coach": "Experience?"},
            {"user": "Intermediate",
             "coach": "Any elbow issues?"},
            {"user": "No",
             "coach": "Let's build those arms!"}
        ]),
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="arms",
        equipment="dumbbells",
        duration="50",
        space="gym",
        injuries="none"
    ).with_inputs("conversation_history"),
]


# ============================================================================
# WORKOUT GENERATOR TRAINING DATA
# ============================================================================

generator_examples = [
    # Example 1: Strength barbell workout
    dspy.Example(
        fitness_level="advanced",
        goal="strength",
        focus="chest",
        equipment="barbell",
        duration="60",
        space="gym",
        injuries="none",
        workout_json="""{
  "workoutFocus": "Chest Strength",
  "exercises": [
    {
      "name": "Barbell Bench Press",
      "sets": [
        {"setType": "warmup", "reps": 8, "weight": "40%"},
        {"setType": "warmup", "reps": 5, "weight": "60%"},
        {"setType": "working", "reps": 5, "weight": "85%"},
        {"setType": "working", "reps": 3, "weight": "90%"},
        {"setType": "working", "reps": 1, "weight": "95%"}
      ]
    },
    {
      "name": "Incline Barbell Press",
      "sets": [
        {"setType": "working", "reps": 5, "weight": "80%"},
        {"setType": "working", "reps": 5, "weight": "80%"},
        {"setType": "working", "reps": 5, "weight": "80%"}
      ]
    },
    {
      "name": "Barbell Floor Press",
      "sets": [
        {"setType": "working", "reps": 6, "weight": "75%"},
        {"setType": "working", "reps": 6, "weight": "75%"}
      ]
    }
  ],
  "notes": "Focus on bar speed and proper form. Rest 3-5 minutes between heavy sets."
}"""
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries"),

    # Example 2: Hypertrophy dumbbell workout
    dspy.Example(
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="full_body",
        equipment="dumbbells",
        duration="45",
        space="gym",
        injuries="none",
        workout_json="""{
  "workoutFocus": "Full Body Hypertrophy",
  "exercises": [
    {
      "name": "Dumbbell Goblet Squat",
      "sets": [
        {"setType": "warmup", "reps": 12},
        {"setType": "working", "reps": 10},
        {"setType": "working", "reps": 10},
        {"setType": "working", "reps": 10}
      ]
    },
    {
      "name": "Dumbbell Romanian Deadlift",
      "sets": [
        {"setType": "working", "reps": 12},
        {"setType": "working", "reps": 12},
        {"setType": "working", "reps": 12}
      ]
    },
    {
      "name": "Dumbbell Bench Press",
      "sets": [
        {"setType": "working", "reps": 10},
        {"setType": "working", "reps": 10},
        {"setType": "working", "reps": 10}
      ]
    },
    {
      "name": "Dumbbell Row",
      "sets": [
        {"setType": "working", "reps": 12},
        {"setType": "working", "reps": 12}
      ]
    },
    {
      "name": "Dumbbell Shoulder Press",
      "sets": [
        {"setType": "working", "reps": 10},
        {"setType": "working", "reps": 10}
      ]
    }
  ],
  "notes": "Rest 60-90 seconds between sets. Focus on controlled tempo and muscle contraction."
}"""
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries"),

    # Example 3: Bodyweight endurance
    dspy.Example(
        fitness_level="beginner",
        goal="endurance",
        focus="full_body",
        equipment="bodyweight",
        duration="30",
        space="home",
        injuries="none",
        workout_json="""{
  "workoutFocus": "Bodyweight Endurance Circuit",
  "exercises": [
    {
      "name": "Jumping Jacks",
      "sets": [
        {"setType": "working", "reps": 30}
      ]
    },
    {
      "name": "Push-ups",
      "sets": [
        {"setType": "working", "reps": 15}
      ]
    },
    {
      "name": "Bodyweight Squats",
      "sets": [
        {"setType": "working", "reps": 20}
      ]
    },
    {
      "name": "Plank Hold",
      "sets": [
        {"setType": "working", "reps": 30}
      ]
    },
    {
      "name": "Mountain Climbers",
      "sets": [
        {"setType": "working", "reps": 20}
      ]
    },
    {
      "name": "Lunges",
      "sets": [
        {"setType": "working", "reps": 16}
      ]
    }
  ],
  "notes": "Complete 3-4 rounds of this circuit with minimal rest between exercises. Rest 90 seconds between rounds."
}"""
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries"),

    # Example 4: Back hypertrophy with cables
    dspy.Example(
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="back",
        equipment="cables",
        duration="45",
        space="gym",
        injuries="none",
        workout_json="""{
  "workoutFocus": "Back Hypertrophy",
  "exercises": [
    {
      "name": "Cable Lat Pulldown",
      "sets": [
        {"setType": "warmup", "reps": 12, "weight": "light"},
        {"setType": "working", "reps": 10},
        {"setType": "working", "reps": 10},
        {"setType": "working", "reps": 10}
      ]
    },
    {
      "name": "Cable Seated Row",
      "sets": [
        {"setType": "working", "reps": 12},
        {"setType": "working", "reps": 12},
        {"setType": "working", "reps": 12}
      ]
    },
    {
      "name": "Cable Straight Arm Pulldown",
      "sets": [
        {"setType": "working", "reps": 15},
        {"setType": "working", "reps": 15}
      ]
    },
    {
      "name": "Cable Face Pull",
      "sets": [
        {"setType": "working", "reps": 15},
        {"setType": "working", "reps": 15}
      ]
    }
  ],
  "notes": "Focus on full range of motion and squeezing shoulder blades together. Rest 60-75 seconds between sets."
}"""
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries"),
]


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_extractor_trainset():
    """Returns the training set for InfoExtractor optimization"""
    return extractor_examples


def get_generator_trainset():
    """Returns the training set for WorkoutGenerator optimization"""
    return generator_examples


def print_dataset_stats():
    """Print statistics about the training datasets"""
    print(f"InfoExtractor examples: {len(extractor_examples)}")
    print(f"WorkoutGenerator examples: {len(generator_examples)}")


if __name__ == "__main__":
    print_dataset_stats()
    print("\nSample extractor example:")
    print(extractor_examples[0])
    print("\nSample generator example:")
    print(generator_examples[0])
