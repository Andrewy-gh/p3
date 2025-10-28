"""
Optimization Script for Coach Nova Modules

This script uses DSPy's MIPROv2 optimizer to improve:
- InfoExtractor: Better extraction of structured requirements
- WorkoutGenerator: Better quality workout plans

MIPROv2 is chosen over BootstrapFewShot because it:
- Optimizes both instructions AND few-shot examples jointly
- Better for small datasets (8 extractor, 4 generator examples)
- Uses Bayesian Optimization for better prompt search
- Generates task-specific instructions that encode domain rules

The optimized modules are saved to the optimized/ directory.
"""

import os
import sys
import time
import dspy
from modules import InfoExtractor, WorkoutGenerator
from training_data import get_extractor_trainset, get_generator_trainset
from metrics import extraction_accuracy, workout_quality


class RateLimitedLM(dspy.LM):
    """
    Wrapper around dspy.LM that enforces rate limiting.

    Gemini free tier limits:
    - 10 requests per minute
    - 50 requests per day

    This wrapper adds a delay between calls to stay under the per-minute limit.
    """
    def __init__(self, *args, requests_per_min=9, **kwargs):
        super().__init__(*args, **kwargs)
        self.requests_per_min = requests_per_min
        self.min_delay = 60.0 / requests_per_min  # seconds between requests
        self.last_request_time = 0

    def __call__(self, *args, **kwargs):
        # Calculate time since last request
        now = time.time()
        time_since_last = now - self.last_request_time

        # If we're calling too fast, wait
        if time_since_last < self.min_delay:
            wait_time = self.min_delay - time_since_last
            print(f"  [Rate limit] Waiting {wait_time:.1f}s before next request...")
            time.sleep(wait_time)

        # Update timestamp
        self.last_request_time = time.time()

        # Make the actual call
        return super().__call__(*args, **kwargs)


def optimize_info_extractor(api_key):
    """
    Optimize the InfoExtractor module using MIPROv2.

    Args:
        api_key: Google Generative AI API key

    Returns:
        Optimized InfoExtractor module
    """
    print("=" * 60)
    print("OPTIMIZING INFO EXTRACTOR")
    print("=" * 60)

    # Configure DSPy with rate limiting to respect Gemini free tier limits
    # Free tier: 10 requests/minute, so we set to 9 req/min with safety margin
    print("\n⚠️  Rate limiting enabled: 9 requests/minute (Gemini free tier: 10/min)")
    print("    This will add delays between API calls to avoid quota errors.")
    lm = RateLimitedLM(
        "gemini/gemini-2.0-flash-exp",
        api_key=api_key,
        requests_per_min=9  # Just under the 10/min limit
    )
    dspy.configure(lm=lm)

    # Get training data
    trainset = get_extractor_trainset()
    print(f"\nTraining set size: {len(trainset)} examples")

    # Create optimizer
    print("\nInitializing MIPROv2 optimizer...")
    print("  - auto='light': ~10-20 trials for fast iteration")
    print("  - Optimizes instructions + few-shot examples jointly")
    print("  - Reduced demo counts (2 vs 4/3) to minimize API calls")
    optimizer = dspy.MIPROv2(
        metric=extraction_accuracy,
        auto="light",              # Light mode: ~10-20 trials, auto-configures minibatch settings
        max_bootstrapped_demos=2,  # Reduced from 4 to minimize API calls
        max_labeled_demos=2,       # Reduced from 4 to minimize API calls
    )

    # Compile (optimize) the module
    print("Compiling optimized module (this may take a few minutes)...")
    student = InfoExtractor()
    optimized_extractor = optimizer.compile(
        student=student,
        trainset=trainset
    )

    print("\n✓ Optimization complete!")

    # Save optimized module
    save_path = os.path.join("../optimized", "extractor.json")
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    optimized_extractor.save(save_path)
    print(f"✓ Saved to: {save_path}")

    return optimized_extractor


def optimize_workout_generator(api_key):
    """
    Optimize the WorkoutGenerator module using MIPROv2.

    Args:
        api_key: Google Generative AI API key

    Returns:
        Optimized WorkoutGenerator module
    """
    print("\n" + "=" * 60)
    print("OPTIMIZING WORKOUT GENERATOR")
    print("=" * 60)

    # Configure DSPy with rate limiting to respect Gemini free tier limits
    # Free tier: 10 requests/minute, so we set to 9 req/min with safety margin
    print("\n⚠️  Rate limiting enabled: 9 requests/minute (Gemini free tier: 10/min)")
    print("    This will add delays between API calls to avoid quota errors.")
    lm = RateLimitedLM(
        "gemini/gemini-2.0-flash-exp",
        api_key=api_key,
        requests_per_min=9  # Just under the 10/min limit
    )
    dspy.configure(lm=lm)

    # Get training data
    trainset = get_generator_trainset()
    print(f"\nTraining set size: {len(trainset)} examples")

    # Create optimizer
    print("\nInitializing MIPROv2 optimizer...")
    print("  - auto='light': ~10-20 trials for fast iteration")
    print("  - Optimizes instructions + few-shot examples jointly")
    print("  - Reduced demo counts (2 vs 4/3) to minimize API calls")
    optimizer = dspy.MIPROv2(
        metric=workout_quality,
        auto="light",              # Light mode: ~10-20 trials, auto-configures minibatch settings
        max_bootstrapped_demos=2,  # Reduced from 3 to minimize API calls
        max_labeled_demos=2,       # Reduced from 3 to minimize API calls
    )

    # Compile (optimize) the module
    print("Compiling optimized module (this may take a few minutes)...")
    student = WorkoutGenerator()
    optimized_generator = optimizer.compile(
        student=student,
        trainset=trainset
    )

    print("\n✓ Optimization complete!")

    # Save optimized module
    save_path = os.path.join("../optimized", "generator.json")
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    optimized_generator.save(save_path)
    print(f"✓ Saved to: {save_path}")

    return optimized_generator


def evaluate_improvements(original_module, optimized_module, trainset, metric, module_name):
    """
    Compare original vs optimized module performance.

    Args:
        original_module: Unoptimized module
        optimized_module: Optimized module
        trainset: Training examples to evaluate on
        metric: Metric function to use
        module_name: Name for display
    """
    print(f"\n{'=' * 60}")
    print(f"EVALUATING {module_name.upper()}")
    print("=" * 60)

    original_scores = []
    optimized_scores = []

    print(f"\nEvaluating on {len(trainset)} examples...")

    for i, example in enumerate(trainset[:5], 1):  # Evaluate on first 5 examples
        print(f"\nExample {i}/{min(5, len(trainset))}")

        # Test original
        if module_name == "InfoExtractor":
            orig_pred = original_module(conversation_history=example.conversation_history)
        else:  # WorkoutGenerator
            orig_pred = original_module(
                fitness_level=example.fitness_level,
                goal=example.goal,
                focus=example.focus,
                equipment=example.equipment,
                duration=example.duration,
                space=example.space,
                injuries=example.injuries,
                primary_lift_pr=example.primary_lift_pr
            )

        orig_score = metric(example, orig_pred)
        original_scores.append(orig_score)

        # Test optimized
        if module_name == "InfoExtractor":
            opt_pred = optimized_module(conversation_history=example.conversation_history)
        else:  # WorkoutGenerator
            opt_pred = optimized_module(
                fitness_level=example.fitness_level,
                goal=example.goal,
                focus=example.focus,
                equipment=example.equipment,
                duration=example.duration,
                space=example.space,
                injuries=example.injuries,
                primary_lift_pr=example.primary_lift_pr
            )

        opt_score = metric(example, opt_pred)
        optimized_scores.append(opt_score)

        print(f"  Original:  {orig_score:.2%}")
        print(f"  Optimized: {opt_score:.2%}")
        print(f"  Δ Change:  {(opt_score - orig_score):.2%}")

    # Print summary
    avg_original = sum(original_scores) / len(original_scores)
    avg_optimized = sum(optimized_scores) / len(optimized_scores)
    improvement = avg_optimized - avg_original

    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print("=" * 60)
    print(f"Average Original Score:  {avg_original:.2%}")
    print(f"Average Optimized Score: {avg_optimized:.2%}")
    print(f"Average Improvement:     {improvement:+.2%}")


def main():
    """Main optimization workflow"""
    print("\n" + "=" * 60)
    print("COACH NOVA - MODULE OPTIMIZATION")
    print("=" * 60)

    # Get API key
    api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
    if not api_key:
        print("\nError: GOOGLE_GENERATIVE_AI_API_KEY environment variable not set")
        return

    # Check for command-line argument
    if len(sys.argv) > 1:
        choice = sys.argv[1]
    else:
        # Ask user what to optimize
        print("\nWhat would you like to optimize?")
        print("1. InfoExtractor only")
        print("2. WorkoutGenerator only")
        print("3. Both modules")
        print("4. Evaluate existing optimized modules")
        choice = input("\nEnter choice (1-4): ").strip()

    if choice == "1":
        optimized_extractor = optimize_info_extractor(api_key)

        # Evaluate
        print("\nEvaluating improvements...")
        evaluate_improvements(
            InfoExtractor(),
            optimized_extractor,
            get_extractor_trainset(),
            extraction_accuracy,
            "InfoExtractor"
        )

    elif choice == "2":
        optimized_generator = optimize_workout_generator(api_key)

        # Evaluate
        print("\nEvaluating improvements...")
        evaluate_improvements(
            WorkoutGenerator(),
            optimized_generator,
            get_generator_trainset(),
            workout_quality,
            "WorkoutGenerator"
        )

    elif choice == "3":
        # Optimize both
        optimized_extractor = optimize_info_extractor(api_key)
        optimized_generator = optimize_workout_generator(api_key)

        # Evaluate both
        print("\n" + "=" * 60)
        print("EVALUATION PHASE")
        print("=" * 60)

        evaluate_improvements(
            InfoExtractor(),
            optimized_extractor,
            get_extractor_trainset(),
            extraction_accuracy,
            "InfoExtractor"
        )

        evaluate_improvements(
            WorkoutGenerator(),
            optimized_generator,
            get_generator_trainset(),
            workout_quality,
            "WorkoutGenerator"
        )

    elif choice == "4":
        # Load and evaluate existing modules
        print("\nLoading optimized modules...")
        try:
            optimized_extractor = InfoExtractor()
            optimized_extractor.load("../optimized/extractor.json")

            optimized_generator = WorkoutGenerator()
            optimized_generator.load("../optimized/generator.json")

            # Configure DSPy with rate limiting
            lm = RateLimitedLM(
                "gemini/gemini-2.0-flash-exp",
                api_key=api_key,
                requests_per_min=9
            )
            dspy.configure(lm=lm)

            evaluate_improvements(
                InfoExtractor(),
                optimized_extractor,
                get_extractor_trainset(),
                extraction_accuracy,
                "InfoExtractor"
            )

            evaluate_improvements(
                WorkoutGenerator(),
                optimized_generator,
                get_generator_trainset(),
                workout_quality,
                "WorkoutGenerator"
            )

        except FileNotFoundError:
            print("\nError: Optimized modules not found. Please run optimization first.")

    else:
        print("Invalid choice. Exiting.")
        return

    # Inspect optimization history
    print("\n" + "=" * 60)
    print("OPTIMIZATION HISTORY (Last 5 interactions)")
    print("=" * 60)
    dspy.inspect_history(n=5)

    print("\n✓ Optimization complete! Check the optimized/ directory for saved modules.")


if __name__ == "__main__":
    main()
