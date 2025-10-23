"""
DSPy Modules and Signatures for Fitness Coach Application

This module contains:
- Pydantic Models: Type-safe structured output models
- ChatAgent: Conversational layer for coaching interaction
- InfoExtractor: Extracts structured workout requirements from conversation
- WorkoutGenerator: Creates structured workout plans
"""

import dspy
from pydantic import BaseModel, Field
from typing import Optional, List, Literal


# ============================================================================
# PYDANTIC MODELS (Type Safety)
# ============================================================================

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


# ============================================================================
# SIGNATURES
# ============================================================================

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


# ============================================================================
# MODULES
# ============================================================================

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
    """Generates structured workout plan in JSON format"""

    def __init__(self):
        super().__init__()
        self.generate = dspy.ChainOfThought(GenerateWorkout)

    def forward(self, **user_requirements):
        return self.generate(**user_requirements)
