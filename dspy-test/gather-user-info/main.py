import os
import dspy

api_key = os.getenv("GOOGLE_API_KEY")
dspy.configure(lm=dspy.LM("gemini/gemini-2.5-flash", api_key=api_key))


class GatherUserInfo(dspy.Signature):
    """Ask user for missing workout planning information."""

    user_message = dspy.InputField(desc="What the user has told us so far")
    known_info = dspy.InputField(
        desc="Info we already have: fitness_level, goal, focus, equipment, injuries"
    )

    response = dspy.OutputField(
        desc="Your response asking for missing information or confirming we have everything"
    )
    is_complete = dspy.OutputField(
        desc="true if we have all info, false if still gathering"
    )


think = dspy.ChainOfThought(GatherUserInfo)
history = dspy.History(messages=[])

while True:
    question = input("Type your question, end conversation by typing 'exit': ")
    if question == "exit":
        break
    outputs = think(user_message=question, known_info=history)
    print(f"\n{outputs}")
    history.messages.append({"question": question, **outputs})

dspy.inspect_history()
