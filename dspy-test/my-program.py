import dspy
import os

# Configure DSPy with tracking enabled
api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEYKEY")
dspy.settings.configure(
    lm=dspy.LM("gemini/gemini-2.5-flash", api_key=api_key, cache=False),
    track_usage=True,
)


# Define a simple program that makes multiple LM calls
class MyProgram(dspy.Module):
    def __init__(self):
        self.predict1 = dspy.ChainOfThought("question -> answer")
        self.predict2 = dspy.ChainOfThought("question, answer -> score")

    def __call__(self, question: str) -> str:
        answer = self.predict1(question=question)
        score = self.predict2(question=question, answer=answer)
        return score


# Run the program and check usage
program = MyProgram()
output = program(question="What is the capital of France?")
print(output.get_lm_usage())
