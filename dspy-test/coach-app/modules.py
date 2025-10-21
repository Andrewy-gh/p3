"""
DSPy Modules and Signatures for Fitness Coach Application

This module contains:
- ChatAgent: Conversational layer for coaching interaction
- InfoExtractor: Extracts structured workout requirements from conversation
- WorkoutGenerator: Creates structured workout plans
"""

import dspy


# ============================================================================
# SIGNATURES
# ============================================================================

class ChatAgent(dspy.Signature):
    """Coach Nova: encouraging fitness coach, stays on-topic"""
    conversation_history = dspy.InputField(desc="All prior messages")
    user_message = dspy.InputField(desc="Current user input")

    response = dspy.OutputField(desc="Coaching response, 1-3 questions max, deflect off-topic")
    should_extract = dspy.OutputField(desc="true if have enough info to extract")


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


class GenerateWorkout(dspy.Signature):
    """Generate workout matching requirements. JSON output."""
    fitness_level = dspy.InputField()
    goal = dspy.InputField()
    focus = dspy.InputField()
    equipment = dspy.InputField()
    duration = dspy.InputField()
    space = dspy.InputField()
    injuries = dspy.InputField()

    workout_json = dspy.OutputField(desc="JSON: {exercises: [{name, sets: [{reps, setType, weight?}]}], notes?, workoutFocus?}")


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
