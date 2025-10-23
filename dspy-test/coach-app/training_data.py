"""
Training Data for DSPy Optimization

This module contains synthetic training examples for:
- InfoExtractor: Extracting structured info from conversations
- WorkoutGenerator: Generating appropriate workout plans
"""

import dspy
from modules import Workout, Exercise, WorkoutSet


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
        injuries="none",
        primary_lift_pr="null"
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
        injuries="none",
        primary_lift_pr="null"
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
        injuries="none",
        primary_lift_pr="null"
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
        injuries="none",
        primary_lift_pr="null"
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
        injuries="minor knee pain on deep squats",
        primary_lift_pr="null"
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
        injuries="none",
        primary_lift_pr="null"
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
        injuries="none",
        primary_lift_pr="null"
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
        injuries="none",
        primary_lift_pr="null"
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
        primary_lift_pr="null",
        workout=Workout(
            workoutFocus="Chest Strength",
            exercises=[
                Exercise(
                    name="Barbell Bench Press",
                    sets=[
                        WorkoutSet(setType="warmup", reps=8, weight=95.0),
                        WorkoutSet(setType="warmup", reps=5, weight=135.0),
                        WorkoutSet(setType="working", reps=5, weight=185.0),
                        WorkoutSet(setType="working", reps=3, weight=205.0),
                        WorkoutSet(setType="working", reps=1, weight=225.0)
                    ]
                ),
                Exercise(
                    name="Incline Barbell Press",
                    sets=[
                        WorkoutSet(setType="working", reps=5, weight=155.0),
                        WorkoutSet(setType="working", reps=5, weight=155.0),
                        WorkoutSet(setType="working", reps=5, weight=155.0)
                    ]
                ),
                Exercise(
                    name="Barbell Floor Press",
                    sets=[
                        WorkoutSet(setType="working", reps=6, weight=145.0),
                        WorkoutSet(setType="working", reps=6, weight=145.0)
                    ]
                )
            ],
            notes="Focus on bar speed and proper form. Rest 3-5 minutes between heavy sets."
        )
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries", "primary_lift_pr"),

    # Example 2: Hypertrophy dumbbell workout
    dspy.Example(
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="full_body",
        equipment="dumbbells",
        duration="45",
        space="gym",
        injuries="none",
        primary_lift_pr="null",
        workout=Workout(
            workoutFocus="Full Body Hypertrophy",
            exercises=[
                Exercise(
                    name="Dumbbell Goblet Squat",
                    sets=[
                        WorkoutSet(setType="warmup", reps=12, weight=25.0),
                        WorkoutSet(setType="working", reps=10, weight=50.0),
                        WorkoutSet(setType="working", reps=10, weight=50.0),
                        WorkoutSet(setType="working", reps=10, weight=50.0)
                    ]
                ),
                Exercise(
                    name="Dumbbell Romanian Deadlift",
                    sets=[
                        WorkoutSet(setType="working", reps=12, weight=35.0),
                        WorkoutSet(setType="working", reps=12, weight=35.0),
                        WorkoutSet(setType="working", reps=12, weight=35.0)
                    ]
                ),
                Exercise(
                    name="Dumbbell Bench Press",
                    sets=[
                        WorkoutSet(setType="working", reps=10, weight=45.0),
                        WorkoutSet(setType="working", reps=10, weight=45.0),
                        WorkoutSet(setType="working", reps=10, weight=45.0)
                    ]
                ),
                Exercise(
                    name="Dumbbell Row",
                    sets=[
                        WorkoutSet(setType="working", reps=12, weight=40.0),
                        WorkoutSet(setType="working", reps=12, weight=40.0)
                    ]
                ),
                Exercise(
                    name="Dumbbell Shoulder Press",
                    sets=[
                        WorkoutSet(setType="working", reps=10, weight=30.0),
                        WorkoutSet(setType="working", reps=10, weight=30.0)
                    ]
                )
            ],
            notes="Rest 60-90 seconds between sets. Focus on controlled tempo and muscle contraction."
        )
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries", "primary_lift_pr"),

    # Example 3: Bodyweight endurance
    dspy.Example(
        fitness_level="beginner",
        goal="endurance",
        focus="full_body",
        equipment="bodyweight",
        duration="30",
        space="home",
        injuries="none",
        primary_lift_pr="null",
        workout=Workout(
            workoutFocus="Bodyweight Endurance Circuit",
            exercises=[
                Exercise(
                    name="Jumping Jacks",
                    sets=[WorkoutSet(setType="working", reps=30)]
                ),
                Exercise(
                    name="Push-ups",
                    sets=[WorkoutSet(setType="working", reps=15)]
                ),
                Exercise(
                    name="Bodyweight Squats",
                    sets=[WorkoutSet(setType="working", reps=20)]
                ),
                Exercise(
                    name="Plank Hold",
                    sets=[WorkoutSet(setType="working", reps=30)]
                ),
                Exercise(
                    name="Mountain Climbers",
                    sets=[WorkoutSet(setType="working", reps=20)]
                ),
                Exercise(
                    name="Lunges",
                    sets=[WorkoutSet(setType="working", reps=16)]
                )
            ],
            notes="Complete 3-4 rounds of this circuit with minimal rest between exercises. Rest 90 seconds between rounds."
        )
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries", "primary_lift_pr"),

    # Example 4: Back hypertrophy with cables
    dspy.Example(
        fitness_level="intermediate",
        goal="hypertrophy",
        focus="back",
        equipment="cables",
        duration="45",
        space="gym",
        injuries="none",
        primary_lift_pr="null",
        workout=Workout(
            workoutFocus="Back Hypertrophy",
            exercises=[
                Exercise(
                    name="Cable Lat Pulldown",
                    sets=[
                        WorkoutSet(setType="warmup", reps=12, weight=60.0),
                        WorkoutSet(setType="working", reps=10, weight=100.0),
                        WorkoutSet(setType="working", reps=10, weight=100.0),
                        WorkoutSet(setType="working", reps=10, weight=100.0)
                    ]
                ),
                Exercise(
                    name="Cable Seated Row",
                    sets=[
                        WorkoutSet(setType="working", reps=12, weight=90.0),
                        WorkoutSet(setType="working", reps=12, weight=90.0),
                        WorkoutSet(setType="working", reps=12, weight=90.0)
                    ]
                ),
                Exercise(
                    name="Cable Straight Arm Pulldown",
                    sets=[
                        WorkoutSet(setType="working", reps=15, weight=40.0),
                        WorkoutSet(setType="working", reps=15, weight=40.0)
                    ]
                ),
                Exercise(
                    name="Cable Face Pull",
                    sets=[
                        WorkoutSet(setType="working", reps=15, weight=50.0),
                        WorkoutSet(setType="working", reps=15, weight=50.0)
                    ]
                )
            ],
            notes="Focus on full range of motion and squeezing shoulder blades together. Rest 60-75 seconds between sets."
        )
    ).with_inputs("fitness_level", "goal", "focus", "equipment", "duration", "space", "injuries", "primary_lift_pr"),
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
