"""
Coach Nova - Interactive Fitness Coach Application

This is the main application loop that orchestrates the coaching conversation,
information extraction, and workout generation using DSPy modules.
"""

import os
import dspy
from modules import CoachAgent, InfoExtractor, WorkoutGenerator


def main():
    """Main application loop for Coach Nova fitness coach"""

    # Configure DSPy with Gemini model
    api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
    if not api_key:
        print("Error: GOOGLE_GENERATIVE_AI_API_KEY environment variable not set")
        return

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

                    # Display workout (Pydantic object formatting)
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


if __name__ == "__main__":
    main()
