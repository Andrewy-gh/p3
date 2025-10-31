### Optimize DSPy Prompts with MIPROv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Sets up and initializes the `MIPROv2` optimizer for jointly optimizing the prompts within the `Hop` program. It specifies the metric, optimization level, number of threads, and the models to be used for optimization.

```Python
models = dict(prompt_model=gpt4o, teacher_settings=dict(lm=gpt4o))
tp = dspy.MIPROv2(metric=top5_recall, auto="medium", num_threads=16, **models)

kwargs = dict(minibatch_size=40, minibatch_full_eval_steps=4)
```

--------------------------------

### Optimize Program with MIPROv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Optimizes the DSPy program using the MIPROv2 optimizer. This process automatically tunes the language model's prompt and few-shot examples to maximize correctness on the training dataset.

```python
mipro_optimizer = dspy.MIPROv2(
    metric=extraction_correctness_metric,
    auto="medium",
)
optimized_people_extractor = mipro_optimizer.compile(
    people_extractor,
    trainset=train_set,
    max_bootstrapped_demos=4,
    minibatch=False
)
```

--------------------------------

### Optimize Math Program with MIPROv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/MIPROv2.md

Demonstrates how to use MIPROv2 to optimize a math program. It initializes a language model, configures DSPy, sets up the MIPROv2 optimizer with a metric and optimization level, compiles a ChainOfThought program using a dataset, and saves the optimized program.

```python
import dspy
from dspy.datasets.gsm8k import GSM8K, gsm8k_metric

# Import the optimizer
from dspy.teleprompt import MIPROv2

# Initialize the LM
lm = dspy.LM('openai/gpt-4o-mini', api_key='YOUR_OPENAI_API_KEY')
dspy.configure(lm=lm)

# Initialize optimizer
teleprompter = MIPROv2(
    metric=gsm8k_metric,
    auto="medium", # Can choose between light, medium, and heavy optimization runs
)

# Optimize program
print(f"Optimizing program with MIPROv2...")
gsm8k = GSM8K()
optimized_program = teleprompter.compile(
    dspy.ChainOfThought("question -> answer"),
    trainset=gsm8k.train,
)

# Save optimize program for future use
optimized_program.save(f"optimized.json")
```

--------------------------------

### MIPROv2 Optimizer Stages

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/optimization/optimizers.md

Illustrates the three main stages of the dspy.MIPROv2 optimizer: bootstrapping, grounded proposal, and discrete search. This outlines how MIPROv2 refines prompts and traces for better program performance.

```python
# Stage 1: Bootstrapping
# Collect traces by running the program multiple times, filter for high-scoring trajectories.

# Stage 2: Grounded Proposal
# Preview program code, data, and traces to draft potential instructions for prompts.

# Stage 3: Discrete Search
# Sample training data, propose instruction/trace combinations, evaluate candidates, update surrogate model.

```

--------------------------------

### Optimize Agent Prompts with MIPROv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Utilizes DSPy's MIPROv2 for prompt optimization, specifying GPT-4o as the teacher and prompt model, and setting parameters for training. This process aims to maximize the recall of the agent.

```Python
kwargs = dict(teacher_settings=dict(lm=gpt4o), prompt_model=gpt4o, max_errors=999)

tp = dspy.MIPROv2(metric=top5_recall, auto="medium", num_threads=16, **kwargs)
optimized_react = tp.compile(react, trainset=trainset, max_bootstrapped_demos=3, max_labeled_demos=0)
```

--------------------------------
