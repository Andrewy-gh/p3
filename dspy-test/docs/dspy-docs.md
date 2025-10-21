
### Install dspy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Installs the dspy library using pip. This is the primary method for getting started with dspy.

```shell
pip install dspy
```

--------------------------------

### Install dspy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Installs the dspy library using pip. This is the primary method for getting started with dspy.

```bash
pip install dspy
```

--------------------------------

### Install DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet shows how to install the DSPy framework using pip. It's a straightforward command to get started with the library.

```shell
pip install dspy
```

--------------------------------

### Install DSPy and Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

Installs the latest version of DSPy along with necessary libraries like func_timeout and datasets for advanced tool use examples.

```shell
pip install -U dspy
pip install func_timeout datasets
```

--------------------------------

### Set Up Environment with uv

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

Sets up the DSPy development environment using uv, a fast Python package and project manager. This command installs all necessary development dependencies.

```shell
uv sync --extra dev
```

--------------------------------

### Demosy Signature with Examples

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to include few-shot examples within a signature to guide the language model. Providing examples significantly improves the accuracy and relevance of the model's output for specific tasks.

```Python
import dspy

signature = dspy.Signature(
    "Summarize the following text: \nText: {text}\nSummary:",
    "Summarize the provided text concisely.",
    "text": "The quick brown fox jumps over the lazy dog.",
    "summary": "A fox jumps over a dog."
)
```

--------------------------------

### Install Arbor RL Server

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Installs the Arbor RL server using pip. This is a prerequisite for running the tutorial's examples.

```bash
> pip install -U arbor-ai

```

--------------------------------

### Install Pre-commit Hooks

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

Installs the pre-commit hooks to ensure code quality and formatting according to the Google Python Style Guide. This should be done once after cloning the repository.

```shell
pre-commit install
```

--------------------------------

### Install DSPy and Datasets

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Installs the latest version of DSPy and the datasets library, which are necessary for running the agent tutorial.

```bash
pip install -U dspy
pip install datasets
```

--------------------------------

### DSPy: Basic Usage Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental usage of the DSPy framework. It shows how to import the library, define a simple prompt, and execute it using an LLM. This is a starting point for understanding DSPy's core functionality.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
# Ensure you have set your OPENAI_API_KEY environment variable
# dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Define a simple prompt
class BasicQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.ChainOfThought(dspy.Answer)

    def forward(self, question):
        return self.predict(question=question)

# Instantiate the module
qa_program = BasicQA()

# Ask a question
question = "What is the capital of France?"
result = qa_program(question=question)

# Print the answer
print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### Install DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet shows how to install the DSPy library using pip. It's the first step to start using DSPy for your LLM projects.

```shell
pip install dspy
```

--------------------------------

### Basic DSPy Initialization and Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental setup of a DSPy program, including initializing the language model and defining a basic signature for a task. This is the starting point for most DSPy applications.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class BasicSignature(dspy.Signature):
    """A simple signature for demonstration."""
    input_text: str
    output_text: str

print(dspy.ChainOfThought(BasicSignature).signature)

```

--------------------------------

### Basic DSPy Program Setup

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

This snippet shows the basic setup for a DSPy program, configuring the language model and defining a simple ChainOfThought program.

```python
import dspy

dspy.settings.configure(lm=dspy.LM("openai/gpt-4o-mini"))
dspy_program = dspy.ChainOfThought("question -> answer")
```

--------------------------------

### Python Example: Basic Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates a fundamental aspect of the dspy project, likely involving core functionalities or setup. It is written in Python and may serve as a starting point for users.

```python
import dspy

# Example usage of a dspy module or function
# (Specific functionality depends on the actual code content)
```

--------------------------------

### Generate code example for a specific use case

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This function generates a code example for a specific use case using the DocumentationLearningAgent. It formats library information, including core concepts, common patterns, key methods, installation instructions, and example code snippets, and then uses this information to generate the code example. It returns the generated code, explanation, best practices, and required imports.

```python
def generate_example(self, library_info: Dict, use_case: str, requirements: str = "") -> Dict:
    """Generate a code example for a specific use case."""
    
    # Format library information for the generator
    info_text = f"""
        Library: {library_info['library']}
        Core Concepts: {', '.join(library_info['core_concepts'])}
        Common Patterns: {', '.join(library_info['patterns'])}
        Key Methods: {', '.join(library_info['methods'])}
        Installation: {library_info['installation']}
        Example Code Snippets: {'; '.join(library_info['examples'][:3])}  # First 3 examples
        """
    
    code_result = self.generate_code(
        library_info=info_text,
        use_case=use_case,
        requirements=requirements
    )
    
    return {
        "code": code_result.code_example,
        "explanation": code_result.explanation,
        "best_practices": code_result.best_practices,
        "imports": code_result.imports_needed
    }
```

--------------------------------

### View a HoVer Dataset Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Prints a sample example from the training set, displaying the claim and the list of supporting page titles.

```Python
example = trainset[0]

print("Claim:", example.claim)
print("Pages that must be retrieved:", example.titles)
```

--------------------------------

### Load and Prepare CoNLL Dataset for DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Loads the CoNLL-2003 dataset and prepares subsets for training and testing. It calls `load_conll_dataset` to get the data and then `prepare_dataset` to format it into DSPy `Example` objects, creating a training set of 50 examples and a test set of 200 examples.

```Python
# Load the dataset
dataset = load_conll_dataset()

# Prepare the training and test sets
train_set = prepare_dataset(dataset["train"], 0, 50)
test_set = prepare_dataset(dataset["test"], 0, 200)
```

--------------------------------

### Install Dependencies and Download Data

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Installs necessary Python packages like DSPy and AlfWorld, and downloads the AlfWorld dataset. It also includes commands to set up MLflow for tracing.

```shell
> pip install -U alfworld==0.3.5 multiprocess
> alfworld-download
```

```bash
%pip install mlflow>=2.20
mlflow ui --port 5000
```

--------------------------------

### DSPy Signatures with Examples

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet shows how to define DSPy signatures with few-shot examples. These examples help guide the language model during inference and can be used by optimizers.

```Python
import dspy

class SignatureWithExamples(dspy.Signature):
    """A signature with a few-shot example."""
    input_text: str
    output_text: str

    # Define few-shot examples
    examples = [
        dspy.Example(
            input_text="Hello",
            output_text="Hi there!"
        ),
        dspy.Example(
            input_text="How are you?",
            output_text="I'm doing well, thank you!"
        )
    ]

# Instantiate a module using this signature
# module_with_examples = dspy.SimpleLM(SignatureWithExamples)
# result = module_with_examples(input_text="Good morning")
```

--------------------------------

### Demosy Signature with Multiple Examples

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates using multiple few-shot examples in a signature for enhanced task guidance. Multiple examples help the model generalize better and understand nuanced requirements.

```Python
import dspy

signature = dspy.Signature(
    "Classify the sentiment of the following review: \nReview: {review}\nSentiment:",
    "Classify the sentiment as positive, negative, or neutral.",
    "review": "I loved this movie, it was fantastic!",
    "sentiment": "positive",
    "review": "The service was terrible, I would not recommend.",
    "sentiment": "negative"
)
```

--------------------------------

### Verify dspy Installation with Pytest

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

After setting up the environment and installing dspy, this command runs the unit tests located in the 'tests/predict' directory to verify that the installation was successful and that dspy is functioning correctly.

```shell
pytest tests/predict
```

--------------------------------

### Install DSPy Arbor RL

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_multihop/index.ipynb

Installs the DSPy Arbor RL library, which is required for the experimental online RL features. This command-line instruction is the first step in setting up the environment for the tutorial.

```bash
pip install -U arbor-ai
```

--------------------------------

### Install DSPy and Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

Installs the necessary libraries for the project, including dspy, requests, beautifulsoup4, and html2text, using pip.

```bash
pip install dspy requests beautifulsoup4 html2text
```

--------------------------------

### Create and Print DSPy Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/examples.md

Demonstrates the creation of a DSPy `Example` object with 'question' and 'answer' fields and prints the object and its individual fields. This is a basic step for data representation in DSPy.

```Python
qa_pair = dspy.Example(question="This is a question?", answer="This is an answer.")

print(qa_pair)
print(qa_pair.question)
print(qa_pair.answer)
```

--------------------------------

### Learn from URLs and analyze documentation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This code snippet shows how to learn from a list of documentation URLs, combine the content, and analyze it to extract core concepts, common patterns, key methods, installation information, and code examples. It handles cases where documentation fetching fails and returns a dictionary containing the extracted information.

```python
for doc in docs if doc['success']
        ])
        
        if not combined_content:
            raise ValueError("No documentation could be fetched successfully")
        
        # Analyze combined documentation
        analysis = self.analyze_docs(
            library_name=library_name,
            documentation_content=combined_content
        )
        
        return {
            "library": library_name,
            "source_urls": [doc['url'] for doc in docs if doc['success']],
            "core_concepts": analysis.core_concepts,
            "patterns": analysis.common_patterns,
            "methods": analysis.key_methods,
            "installation": analysis.installation_info,
            "examples": analysis.code_examples,
            "fetched_docs": docs
        }
```

--------------------------------

### Install Datasets Package

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/index.md

Installs or updates the HuggingFace datasets library, which is used in the following examples for data loading and manipulation.

```bash
> pip install -U datasets
```

--------------------------------

### Install FastAPI and Set API Key

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Commands to install necessary libraries (FastAPI, uvicorn) and set the OpenAI API key as an environment variable for deployment.

```bash
> pip install fastapi uvicorn
> export OPENAI_API_KEY="your-openai-api-key"
```

--------------------------------

### Install DSPy and Audio Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Installs the latest DSPy version and essential libraries for handling audio data, including datasets, soundfile, and specific PyTorch versions with CUDA support.

```shell
pip install -U dspy
pip install datasets soundfile torch==2.0.1+cu118 torchaudio==2.0.2+cu118
```

--------------------------------

### Generate Library Code Examples with Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This Python function generates code examples for a given library by defining common use cases (basic setup, common operations, advanced usage). It utilizes an agent to produce code snippets, necessary imports, explanations, and best practices for each use case, demonstrating library functionality.

```python
def generate_examples_for_library(library_info: Dict, library_name: str):
    """Generate code examples for any library based on its documentation."""
    
    # Define generic use cases that can apply to most libraries
    use_cases = [
        {
            "name": "Basic Setup and Hello World",
            "description": f"Create a minimal working example with {library_name}",
            "requirements": "Include installation, imports, and basic usage"
        },
        {
            "name": "Common Operations",
            "description": f"Demonstrate the most common {library_name} operations",
            "requirements": "Show typical workflow and best practices"
        },
        {
            "name": "Advanced Usage",
            "description": f"Create a more complex example showcasing {library_name} capabilities",
            "requirements": "Include error handling and optimization"
        }
    ]
    
    generated_examples = []
    
    print(f"\n🔧 Generating examples for {library_name}...")
    
    for use_case in use_cases:
        print(f"\n📝 {use_case['name']}")
        print(f"Description: {use_case['description']}")
        
        example = agent.generate_example(
            library_info=library_info,
            use_case=use_case['description'],
            requirements=use_case['requirements']
        )
        
        print("\n💻 Generated Code:")
        print("```python")
        print(example['code'])
        print("```")
        
        print("\n📦 Required Imports:")
        for imp in example['imports']:
            print(f"  • {imp}")
        
        print("\n📝 Explanation:")
        print(example['explanation'])
        
        print("\n✅ Best Practices:")
        for practice in example['best_practices']:
            print(f"  • {practice}")
        
        generated_examples.append({
            "use_case": use_case['name'],
            "code": example['code'],
            "imports": example['imports'],
            "explanation": example['explanation'],
            "best_practices": example['best_practices']
        })
        
        print("-" * 80)
    
    return generated_examples

# Generate examples for both libraries
print("🎯 Generating FastAPI Examples:")
fastapi_examples = generate_examples_for_library(fastapi_info, "FastAPI")

print("\n\n🎯 Generating Streamlit Examples:")
streamlit_examples = generate_examples_for_library(streamlit_info, "Streamlit")
```

--------------------------------

### Create and Access DSPy Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/evaluation/data.md

Demonstrates how to create a DSPy `Example` object with question and answer fields, and how to access these fields using dot notation. It also shows the string representation of the Example object.

```python
qa_pair = dspy.Example(question="This is a question?", answer="This is an answer.")

print(qa_pair)
print(qa_pair.question)
print(qa_pair.answer)
```

--------------------------------

### Install MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Installs the MLflow library, which is required for packaging and deploying DSPy programs. Ensure you have version 2.18.0 or higher.

```bash
> pip install mlflow>=2.18.0
```

--------------------------------

### dspy.TwoStepAdapter: format_demos Method

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/adapters/TwoStepAdapter.md

Formats a list of demonstration examples to be used as context or few-shot examples for the language model.

```python
def format_demos(self, demos: list, **kwargs) -> str:
    """Formats demonstration examples."""
    pass
```

--------------------------------

### Start MLflow Tracking Server

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/optimizer_tracking/index.md

Starts a local MLflow tracking server at http://127.0.0.1:5000/, recommended to use a SQL store for tracing.

```bash
# It is highly recommended to use SQL store when using MLflow tracing
mlflow server --backend-store-uri sqlite:///mydb.sqlite
```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Starts the MLflow User Interface on port 5000. This allows for visualization of experiments and traces.

```bash
mlflow ui --port 5000
```

--------------------------------

### DSPy Project Introduction and Navigation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/overrides/home.html

This snippet provides introductory content for the DSPy project, including its core philosophy of programming language models, a link to get started, and visual elements like the DSPy logo. It also highlights key features such as systematic optimization, modular approach, and cross-LM compatibility.

```Markdown
![DSPy Logo]({{ 'static/img/dspy_logo.png' | url }})

Programming—not prompting—Language Models

[Get Started with DSPy]({{ 'quick-start/getting-started-1' | url }})

The Way of DSPy
---------------

![Systematic Optimization]({{ 'static/img/optimize.png' | url }})

### Systematic Optimization

Choose from a range of optimizers to enhance your program. Whether it's generating refined instructions, or fine-tuning weights, DSPy's optimizers are engineered to maximize efficiency and effectiveness.

![Modular Approach]({{ 'static/img/modular.png' | url }})

### Modular Approach

With DSPy, you can build your system using predefined modules, replacing intricate prompting techniques with straightforward, effective solutions.

![Cross-LM Compatibility]({{ 'static/img/universal_compatibility.png' | url }})

### Cross-LM Compatibility

Whether you're working with powerhouse models like GPT-3.5 or GPT-4, or local models such as T5-base or Llama2-13b, DSPy seamlessly integrates and enhances their performance in your system.
```

--------------------------------

### Iterate and Display DSPy Examples

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This code iterates through a list of DSPy examples, printing detailed information for each, including use case, generated code, required imports, explanation, and best practices. It prompts the user to continue to the next example.

```python
for i, example in enumerate(result['examples'], 1):
                    print(f"\n{'─'*50}")
                    print(f"📝 Example {i}: {example['use_case']}")
                    print(f"{'-'*50}")
                    
                    print("\n💻 Generated Code:")
                    print("```python")
                    print(example['code'])
                    print("```")
                    
                    print(f"\n📦 Required Imports:")
                    for imp in example['imports']:
                        print(f"  • {imp}")
                    
                    print(f"\n📝 Explanation:")
                    print(example['explanation'])
                    
                    print(f"\n✅ Best Practices:")
                    for practice in example['best_practices']:
                        print(f"  • {practice}")
                    
                    # Ask if user wants to see the next example
                    if i < len(result['examples']):
                        continue_viewing = input(f"\nContinue to next example? (y/n): ").strip().lower()
                        if continue_viewing not in ['y', 'yes']:
                            break
```

--------------------------------

### Load and Prepare HoVer Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Loads the HoVer dataset from Hugging Face, filters for examples with 3 hops, and prepares them as DSPy examples with input keys. It also shuffles and splits the data into training, development, and testing sets.

```python
import random
from dspy.datasets import DataLoader

kwargs = dict(fields=("claim", "supporting_facts", "hpqa_id", "num_hops"), input_keys=("claim",))
hover = DataLoader().from_huggingface(dataset_name="hover-nlp/hover", split="train", trust_remote_code=True, **kwargs)

hpqa_ids = set()
hover = [
    dspy.Example(claim=x.claim, titles=list(set([y["key"] for y in x.supporting_facts]))).with_inputs("claim")
    for x in hover
    if x["num_hops"] == 3 and x["hpqa_id"] not in hpqa_ids and not hpqa_ids.add(x["hpqa_id"])
]

random.Random(0).shuffle(hover)
trainset, devset, testset = hover[:100], hover[100:200], hover[650:]
```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Starts the MLflow tracking server locally, typically accessible at http://127.0.0.1:5000/. This server is used to store and manage your DSPy program information.

```bash
> mlflow ui
```

--------------------------------

### Learn library from URLs using DocumentationLearningAgent

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This function demonstrates how to learn about a library from its documentation URLs using the DocumentationLearningAgent. It fetches the documentation, analyzes it, and extracts key information such as core concepts, common patterns, key methods, installation instructions, and code examples. It requires a list of documentation URLs and the library name as input.

```python
def learn_library_from_urls(library_name: str, documentation_urls: list[str]) -> Dict:
    """Learn about any library from its documentation URLs."""
    
    try:
        library_info = agent.learn_from_urls(library_name, documentation_urls)
        
        print(f"\n🔍 Library Analysis Results for {library_name}:")
        print(f"Sources: {len(library_info['source_urls'])} successful fetches")
        print(f"Core Concepts: {library_info['core_concepts']}")
        print(f"Common Patterns: {library_info['patterns']}")
        print(f"Key Methods: {library_info['methods']}")
        print(f"Installation: {library_info['installation']}")
        print(f"Found {len(library_info['examples'])} code examples")
        
        return library_info
        
    except Exception as e:
        print(f"❌ Error learning library: {e}")
        raise

# Example 1: Learn FastAPI from official documentation
fastapi_urls = [
    "https://fastapi.tiangolo.com/",
    "https://fastapi.tiangolo.com/tutorial/first-steps/",
    "https://fastapi.tiangolo.com/tutorial/path-params/",
    "https://fastapi.tiangolo.com/tutorial/query-params/"
]

print("🚀 Learning FastAPI from official documentation...")
fastapi_info = learn_library_from_urls("FastAPI", fastapi_urls)

# Example 2: Learn a different library (you can replace with any library)
streamlit_urls = [
    "https://docs.streamlit.io/",
    "https://docs.streamlit.io/get-started",
    "https://docs.streamlit.io/develop/api-reference"
]

print("\n\n📊 Learning Streamlit from official documentation...")
streamlit_info = learn_library_from_urls("Streamlit", streamlit_urls)
```

--------------------------------

### Install DSPy using pip

Source: https://github.com/stanfordnlp/dspy/blob/main/README.md

This command installs the DSPy library from the Python Package Index (PyPI). It's the standard way to get the latest stable release of DSPy for your Python projects.

```bash
pip install dspy
```

--------------------------------

### Install MATH Dataset Dependency

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Installs the necessary Python package for the MATH dataset from its GitHub repository. This is required to load and use the dataset for training and evaluation.

```bash
%pip install git+https://github.com/hendrycks/math.git
```

--------------------------------

### Install MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/optimizer_tracking/index.md

Installs MLflow version 2.21.1 or later using pip.

```bash
pip install mlflow>=2.21.1
```

--------------------------------

### Install MLflow for DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Installs the MLflow library, which is recommended for tracing and experiment tracking with DSPy. Ensure you have a version greater than or equal to 2.20.

```bash
%pip install mlflow>=2.20
```

--------------------------------

### Install MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Installs the MLflow library, a tool for LLMOps that integrates with DSPy for explainability and experiment tracking.

```bash
%pip install mlflow>=2.20
```

--------------------------------

### View an AlfWorld Task Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Demonstrates how to initialize and view a single task from the AlfWorld dataset within a DSPy environment session.

```python
example = trainset[0]

with alfworld.POOL.session() as env:
    task, info = env.init(**example.inputs())

print(task)
```

--------------------------------

### Install Retrieval Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Installs necessary libraries for retrieval, including bm25s for BM25 indexing and PyStemmer for text stemming.

```shell
> pip install -U bm25s PyStemmer "jax[cpu]"
```

--------------------------------

### Install DSPy and Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Installs the DSPy library along with 'rich' for rich text formatting and 'typer' for command-line interface creation. This is a prerequisite for running the game.

```bash
pip install dspy rich typer
```

--------------------------------

### DSPy Basic Usage and Initialization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental usage of the dspy library, including initialization and basic interaction patterns. This is often the starting point for new users.

```Python
import dspy

# Initialize dspy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')
dspy.settings.configure(lm=llm)

# Define a simple DSPy signature
class BasicSignature(dspy.Signature):
    """A simple signature for demonstration."""
    input_text: str
    output_text: str

# Instantiate a DSPy module using the signature
class BasicModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.basic_signature = BasicSignature()

    def forward(self, input_text):
        return self.basic_signature(input_text=input_text)

# Create an instance of the module
module = BasicModule()

# Run the module with input
result = module(input_text='Hello, dspy!')

# Print the output
print(result.output_text)
```

--------------------------------

### Python dspy Question Answering Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Provides a Python example of implementing question answering with dspy. This snippet likely shows how to set up a QA module and query it with a context and a question.

```Python
import dspy

# Define a dspy signature for question answering
# Example: class QA(dspy.Signature):
#     "Answer the question based on the provided context."
#     context: str
#     question: str
#     answer: str

# Initialize the dspy pipeline (replace with actual model setup)
# dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Example usage (assuming 'context_text' and 'user_question' are defined)
# qa_result = dspy.Predict(QA)(context=context_text, question=user_question)
# print(qa_result.answer)
```

--------------------------------

### DSPy: Few-Shot Learning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates how to implement few-shot learning in dspy. It shows how to provide example input-output pairs to guide the language model's responses.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
# llm = dspy.OpenAI(model="gpt-3.5-turbo")
# dspy.settings.configure(lm=llm)

# Define a signature
class FewShotSignature(dspy.Signature):
    """Classify the sentiment of a sentence."""
    sentence: str
    sentiment: str

# Create a module with few-shot examples
class FewShotModule(dspy.Module):
    def __init__(self, lm):
        super().__init__()
        self.few_shot_predictor = dspy.Predict(FewShotSignature)
        
        # Provide few-shot examples
        self.few_shot_predictor.demos = [
            dspy.Example(
                sentence="I love this product!",
                sentiment="positive"
            ).with_signature(FewShotSignature),
            dspy.Example(
                sentence="This is terrible.",
                sentiment="negative"
            ).with_signature(FewShotSignature),
            dspy.Example(
                sentence="It's okay, not great.",
                sentiment="neutral"
            ).with_signature(FewShotSignature)
        ]

    def forward(self, sentence):
        return self.few_shot_predictor(sentence=sentence)

# Instantiate the module and run it
# module = FewShotModule(llm=llm)
# result = module(sentence="The weather is beautiful today.")
# print(result.sentiment)
```

--------------------------------

### Python DSPy Installation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet shows how to install the dspy library using pip. It's a straightforward installation process that makes the dspy framework available for use in your Python projects.

```python
pip install dspy
```

--------------------------------

### Generate Code from Documentation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/real_world_examples/index.md

Build a system that automatically fetches documentation from URLs and generates working code examples for any library using DSPy's intelligent analysis. This involves web scraping, documentation parsing, and automated learning for code generation.

```Python
# Example usage for automated code generation (conceptual)
# Assumes DSPy is configured for web scraping and code generation

# from dspy import Signature, Module, Predictor
# import requests

# class CodeGenerator(Signature):
#     """Generate code examples from documentation."""
#     documentation_url: str
#     generated_code: str

# class AutoCodeGenerator(Module):
#     def __init__(self):
#         super().__init__()
#         self.generate = Predictor(CodeGenerator)

#     def forward(self, url):
#         # Fetch documentation content from URL
#         try:
#             response = requests.get(url)
#             response.raise_for_status() # Raise an exception for bad status codes
#             documentation_text = response.text
#         except requests.RequestException as e:
#             return f"Error fetching URL: {e}"

#         # Use DSPy to generate code from documentation
#         code_result = self.generate(documentation_url=url, documentation_text=documentation_text)
#         return code_result

# # Placeholder for running the code generation system
# def generate_code_from_url(doc_url):
#     generator = AutoCodeGenerator()
#     # Compile the generator
#     compiled_generator = dspy.settings.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))(generator)
#     result = compiled_generator(doc_url)
#     print(f"Generated code for {doc_url}:\n{result.generated_code}")

# print("Tutorial: Automated Code Generation from Documentation")
# print("Key Concepts: Web scraping, documentation parsing, automated learning, code generation")

```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Starts the MLflow UI in a separate terminal to visualize traces and experiment progress.

```bash
mlflow ui --port 5000
```

--------------------------------

### Instantiate BootstrapFewShotWithRandomSearch Optimizer

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/optimization/optimizers.md

Demonstrates how to import and set up the BootstrapFewShotWithRandomSearch optimizer from the dspy.teleprompt module. This optimizer is recommended for tasks with 50 or more examples and aims to bootstrap 8-shot examples.

```python
from dspy.teleprompt import BootstrapFewShotWithRandomSearch

# Set up the optimizer: we want to "bootstrap" (i.e., self-generate) 8-shot examples of your program's steps.
```

--------------------------------

### Load and Prepare PUPA Datasets

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Loads the PUPA dataset from Hugging Face and prepares it for training, development, and testing. It creates DSPy Examples from the dataset, specifying `user_query` as an input field.

```python
from datasets import load_dataset

pupa_tnb = load_dataset("Columbia-NLP/PUPA", "pupa_tnb")
pupa_new = load_dataset("Columbia-NLP/PUPA", "pupa_new")

examples = [
    dspy.Example(
        {"target_response": x["target_response"], "user_query": x["user_query"], "pii_str": x["pii_units"]}
    ).with_inputs("user_query")
    for x in pupa_new["train"]
]

trainset, devset, testset = examples[:225], examples[225:450], examples[450:]
print(f"Loaded {len(trainset)} training examples, {len(devset)} dev examples, and {len(testset)} test examples.")

```

--------------------------------

### Install dspy with Conda and Pip

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

This snippet demonstrates the commands to create a new conda environment named 'dspy-dev' with Python 3.11, activate it, and then install dspy with its development dependencies using pip.

```shell
conda create -n dspy-dev python=3.11
conda activate dspy-dev
pip install -e ".[dev]"
```

--------------------------------

### View Dataset Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Prints a sample claim and its associated supporting Wikipedia page titles from the training set.

```python
example = trainset[0]

print("Claim:", example.claim)
print("Pages that must be retrieved:", example.titles)
```

--------------------------------

### Install sglang for Inference

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Installs the sglang package with all dependencies for running local inference servers, including specific links for flashinfer-python based on CUDA version and PyTorch version.

```Shell
> pip install --upgrade pip
> pip install uv
> uv pip install "sglang[all]>=0.4.4.post3" --find-links https://flashinfer.ai/whl/cu124/torch2.5/flashinfer-python
```

--------------------------------

### Load and Inspect MATH Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Loads the 'algebra' subset of the MATH dataset and prints the number of training and development examples. It then inspects the first training example, printing its question and answer.

```python
from dspy.datasets import MATH

dataset = MATH(subset='algebra')
print(len(dataset.train), len(dataset.dev))

example = dataset.train[0]
print("Question:", example.question)
print("Answer:", example.answer)
```

--------------------------------

### DSPy Status Streaming Example with Custom Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This Python example demonstrates setting up DSPy for status streaming. It configures an LM, defines a custom module `MyModule` with a tool and a chain-of-thought predictor, and uses a `MyStatusMessageProvider`. It then streams the output of the module, printing both status messages and prediction chunks.

```python
import asyncio

import dspy

lm = dspy.LM("openai/gpt-4o-mini", cache=False)
dspy.settings.configure(lm=lm)


class MyModule(dspy.Module):
    def __init__(self):
        super().__init__()

        self.tool = dspy.Tool(lambda x: 2 * x, name="double_the_number")
        self.predict = dspy.ChainOfThought("num1, num2->sum")

    def forward(self, num, **kwargs):
        num2 = self.tool(x=num)
        return self.predict(num1=num, num2=num2)


class MyStatusMessageProvider(dspy.streaming.StatusMessageProvider):
    def tool_start_status_message(self, instance, inputs):
        return f"Calling Tool {instance.name} with inputs {inputs}..."

    def tool_end_status_message(self, outputs):
        return f"Tool finished with output: {outputs}!"


predict = MyModule()
stream_listeners = [
    # dspy.ChainOfThought has a built-in output field called "reasoning".
    dspy.streaming.StreamListener(signature_field_name="reasoning"),
]
stream_predict = dspy.streamify(
    predict,
    stream_listeners=stream_listeners,
    status_message_provider=MyStatusMessageProvider(),
)


async def read_output_stream():
    output = stream_predict(num=3)

    return_value = None
    async for chunk in output:
        if isinstance(chunk, dspy.streaming.StreamResponse):
            print(chunk)
        elif isinstance(chunk, dspy.Prediction):
            return_value = chunk
        elif isinstance(chunk, dspy.streaming.StatusMessage):
            print(chunk)
    return return_value


program_output = asyncio.run(read_output_stream())
print("Final output: ", program_output)
```

--------------------------------

### Load and Prepare Banking77 Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Loads the Banking77 dataset from Hugging Face, extracts class names, and prepares the first 1000 examples as DSPy Examples, assigning inputs and shuffling the data.

```Python
import dspy
import random
from dspy.datasets import DataLoader
from datasets import load_dataset

# Load the Banking77 dataset.
CLASSES = load_dataset("PolyAI/banking77", split="train", trust_remote_code=True).features['label'].names
kwargs = dict(fields=("text", "label"), input_keys=("text",), split="train", trust_remote_code=True)

# Load the first 2000 examples from the dataset, and assign a hint to each *training* example.
raw_data = [
    dspy.Example(x, label=CLASSES[x.label]).with_inputs("text")
    for x in DataLoader().from_huggingface(dataset_name="PolyAI/banking77", **kwargs)[:1000]
]

random.Random(0).shuffle(raw_data)
```

--------------------------------

### DSPy: Basic Usage and Initialization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental steps of using the dspy framework, including importing the library, initializing a language model, and defining a simple prompt.

```Python
import dspy

# Initialize a language model (e.g., OpenAI)
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a simple prompt
class BasicQA(dspy.Signature):
    """Answer the question.

    question: The question to answer.
    answer: The answer to the question.
    """
    question = dspy.InputField()
    answer = dspy.OutputField()

# Instantiate the module
qa_module = dspy.Chain(BasicQA)

# Run the module
question = "What is the capital of France?"
result = qa_module(question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### Install dspy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/image_generation_prompting/index.ipynb

Installs the dspy library and its latest version. This is a prerequisite for using dspy functionalities.

```bash
pip install -U dspy
```

--------------------------------

### Install FAISS for Retriever

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

This comment indicates the necessary package installation for using FAISS (Facebook AI Similarity Search) with DSPy retrievers. It provides instructions for installing either the CPU or GPU version of FAISS.

```Python
# %pip install -U faiss-cpu  # or faiss-gpu if you have a GPU
```

--------------------------------

### DSPy: Basic Usage and Initialization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental steps of initializing and using the dspy framework. This includes setting up the language model and basic interaction patterns.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class BasicQA(dspy.Signature):
    """Answer questions based on the provided context."""

    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

qa = dspy.ChainOfThought(BasicQA)

# Example usage:
# print(qa(context="The capital of France is Paris.", question="What is the capital of France?").answer)
```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Starts the MLflow user interface in a separate terminal. This allows you to visualize traces and experiment progress. It's typically run on port 5000.

```bash
mlflow ui --port 5000
```

--------------------------------

### Install DSPy and Datasets

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Installs the latest version of DSPy and the Hugging Face datasets library, which are necessary for loading and processing the CoNLL-2003 dataset.

```Python
# Install the latest version of DSPy
%pip install -U dspy
# Install the Hugging Face datasets library to load the CoNLL-2003 dataset
%pip install datasets
```

--------------------------------

### DSPy: Basic Usage and Initialization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental steps of initializing and using the dspy library. This includes setting up the language model and defining a simple signature for a task.

```Python
import dspy

# Initialize dspy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a simple task
class BasicSignature(dspy.Signature):
    """Basic signature for demonstration."""
    input_text: str
    output_text: str

# Create a module using the signature
basic_module = dspy.Chain(BasicSignature)

# Call the module with input
result = basic_module(input_text='Hello, dspy!')

print(result.output_text)
```

--------------------------------

### Initialize and Run Agent

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Initializes an agent with a specific language model (gpt4o) and sets it to verbose mode. It then executes the agent with example inputs.

```Python
agent_4o = Agent()
agent_4o.set_lm(gpt4o)
agent_4o.verbose = True

agent_4o(**example.inputs())
```

--------------------------------

### Create DSPy Examples and Set Inputs

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

Converts a list of dictionaries into a list of dspy.Example objects, specifying 'question' as the input field. It then selects and displays a specific example from the processed data.

```Python
data = [dspy.Example(**d).with_inputs('question') for d in data]

# Let's pick an `example` here from the data.
example = data[2]
example
```

--------------------------------

### Example API Response

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

An example JSON response from the FastAPI endpoint after processing a request.

```json
{
  "status": "success",
  "data": {
    "reasoning": "The capital of France is a well-known fact, commonly taught in geography classes and referenced in various contexts. Paris is recognized globally as the capital city, serving as the political, cultural, and economic center of the country.",
    "answer": "The capital of France is Paris."
  }
}
```

--------------------------------

### DSPy Optimizers

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the use of dspy optimizers, specifically the BootstrapFewShot. Optimizers are used to automatically tune prompts and examples for better performance. This example shows how to bootstrap few-shot examples for a signature.

```Python
import dspy

# Assume llm is already initialized
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for sentiment analysis
class SentimentAnalysis(dspy.Signature):
    """Analyze the sentiment of the given text."""
    text = dspy.InputField()
    sentiment = dspy.OutputField(desc="positive, negative, or neutral")

# Create a dspy program
sentiment_program = dspy.Program(SentimentAnalysis)

# Compile the program with an optimizer
# This will automatically find good few-shot examples from a dataset
compiled_sentiment = sentiment_program.compile(
    optimizer=dspy.BootstrapFewShot(metric=dspy.Accuracy, max_bootstrapped_demos=4),
    trainset=[ # Example training data
        {'text': 'I love this product!', 'sentiment': 'positive'},
        {'text': 'This is terrible.', 'sentiment': 'negative'},
        {'text': 'It is okay.', 'sentiment': 'neutral'}
    ],
    n_trials=1 # Number of optimization trials
)

# Example usage
input_text = "DSPy makes working with LLMs much easier."

result = compiled_sentiment(text=input_text)
print(result.sentiment)
```

--------------------------------

### Specify Input Keys for DSPy Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/examples.md

Shows how to use the `with_inputs()` method on a DSPy `Example` object to designate specific fields as inputs. This helps in differentiating between input data and labels or metadata.

```Python
# Single Input.
print(qa_pair.with_inputs("question"))

# Multiple Inputs; be careful about marking your labels as inputs unless you mean it.
print(qa_pair.with_inputs("question", "answer"))
```

--------------------------------

### DSPy Agent ReAct Example with Flight Booking

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

This snippet illustrates a more complex scenario where a DSPy ReAct agent handles a user request to book a flight, involving multiple tool calls like picking a flight and getting user info.

```python
class FlightBooking(dspy.Module):
    def __init__(self):
        super().__init__()
        self.pick_flight = dspy.ChainOfThought(pick_flight)
        self.get_user_info = dspy.ChainOfThought(get_user_info)
        self.book_flight = dspy.ChainOfThought(book_flight)

    def forward(self, flight_id, date_time, origin, destination):
        flight_info = self.pick_flight(flight_id=flight_id, date_time=date_time, origin=origin, destination=destination)
        user_info = self.get_user_info(name="Adam")
        confirmation = self.book_flight(flight_info=flight_info, user_info=user_info)
        return confirmation

# Instantiate the agent with the flight booking module
agent = dspy.ReAct(FlightBooking())

# Define the user request for flight booking
user_request = "I want to book a flight from SFO to JFK on September 1st, 2025 at 1 AM."

# Invoke the agent
result = agent(user_request=user_request)

print(result)
```

--------------------------------

### Install MLflow for DSPy Tracing

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

Installs the MLflow library, which is recommended for visualizing prompts and optimization progress when using DSPy. This enables better understanding of the underlying model behavior.

```bash
%pip install mlflow>=2.20
```

--------------------------------

### Start MLflow Server

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/observability/index.md

Starts the MLflow server, recommending the use of a SQL backend store for better performance and reliability, especially when using MLflow tracing. The server will be hosted at port 5000 by default.

```bash
# It is highly recommended to use SQL store when using MLflow tracing
mlflow server --backend-store-uri sqlite:///mydb.sqlite
```

--------------------------------

### LibraryAnalyzer DSPy Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

Defines a DSPy signature for analyzing library documentation. It takes the library name and combined documentation content as input and outputs core concepts, common patterns, key methods, installation info, and code examples.

```python
class LibraryAnalyzer(dspy.Signature):
    """Analyze library documentation to understand core concepts and patterns."""
    library_name: str = dspy.InputField(desc="Name of the library to analyze")
    documentation_content: str = dspy.InputField(desc="Combined documentation content")
    
    core_concepts: list[str] = dspy.OutputField(desc="Main concepts and components")
    common_patterns: list[str] = dspy.OutputField(desc="Common usage patterns")
    key_methods: list[str] = dspy.OutputField(desc="Important methods and functions")
    installation_info: str = dspy.OutputField(desc="Installation and setup information")
    code_examples: list[str] = dspy.OutputField(desc="Example code snippets found")
```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

Starts the MLflow user interface in a separate terminal. This allows users to view traces and experiment tracking data generated by DSPy integrations.

```bash
mlflow ui --port 5000
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the core functionality of DSPy, likely involving setting up the environment and initializing key components. It might include imports and basic configuration.

```Python
import dspy

# Initialize DSPy
dspy.settings.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Example usage (placeholder)
# program = dspy.Program(...)
# result = program(input='...')
# print(result)
```

--------------------------------

### Install DSPy and Mem0

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mem0_react_agent/index.md

Installs the necessary libraries, dspy and mem0ai, using pip. This is a prerequisite for using the memory-enabled agent functionalities.

```bash
pip install dspy mem0ai
```

--------------------------------

### Create DSPy Examples from DataFrame

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/loading-custom-data.md

This Python code iterates through the rows of a Pandas DataFrame, creating DSPy `Example` objects for each row. It maps DataFrame columns ('context', 'question', 'answer') to the `Example` fields and sets 'context' and 'question' as input keys. The first three created examples are then printed.

```python
import dspy

dataset = []

for context, question, answer in df.values:
    dataset.append(dspy.Example(context=context, question=question, answer=answer).with_inputs("context", "question"))

print(dataset[:3])
```

--------------------------------

### Install MLflow for Tracing

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Installs the MLflow package, an LLMOps tool that integrates with DSPy for experiment tracking and visualization of prompts and optimization progress.

```Bash
%pip install mlflow>=2.20
```

--------------------------------

### Python DSPy Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates a basic example of using the dspy framework in Python. It showcases the core functionalities and structure of the library.

```Python
import dspy

# Initialize dspy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a simple signature
class BasicSignature(dspy.Signature):
    """Answer the question."""
    question: str
    answer: str

# Create a module using the signature
basic_module = dspy.Module(BasicSignature)

# Call the module with input
question = "What is the capital of France?"
result = basic_module(question=question)

# Print the answer
print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### DSPy Retrieval Augmented Generation (RAG)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example illustrates a basic Retrieval Augmented Generation (RAG) setup in DSPy. RAG combines a retriever (to fetch relevant documents) with a generator (to synthesize an answer based on the retrieved context).

```Python
import dspy

# Initialize DSPy with a language model and a retriever
llm = dspy.OpenAI(model='gpt-3.5-turbo')
# Assuming you have a retriever configured, e.g., dspy.VectorDBRetriever
# retriever = dspy.VectorDBRetriever(index=...) 
# dspy.settings.configure(retriever=retriever)

# Define a signature for RAG
class RAGSignature(dspy.Signature):
    """Answer the question based on the provided context."""
    context = dspy.InputField(desc="relevant documents")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Create a RAG module
class RAGModule(dspy.Module):
    def __init__(self, retriever):
        super().__init__()
        self.retriever = retriever
        self.predict_rag = dspy.Predict(RAGSignature)

    def forward(self, question):
        # Retrieve relevant documents
        retrieved_docs = self.retriever(question)
        context = "\n".join([doc.page_content for doc in retrieved_docs])
        
        # Generate answer based on context
        return self.predict_rag(context=context, question=question)

# Example usage (requires a configured retriever)
# rag_module = RAGModule(retriever=retriever)
# result = rag_module(question='What are the benefits of RAG?')
# print(result.answer)
```

--------------------------------

### Install DSPy and Pydantic

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

Installs the necessary DSPy library and Pydantic for data structuring. This is a prerequisite for building AI agents with DSPy.

```bash
!pip install -qU dspy pydantic
```

--------------------------------

### Consume Streamed Output Asynchronously

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This Python code shows how to consume the streamed output from a DSPy program. It uses an asynchronous function to iterate over the output stream generated by `stream_predict` and prints each chunk. The example requires an active asyncio event loop.

```Python
import asyncio

async def read_output_stream():
    output_stream = stream_predict(question="Why did a chicken cross the kitchen?")

    async for chunk in output_stream:
        print(chunk)

asyncio.run(read_output_stream())
```

--------------------------------

### Install FAL Client and Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/image_generation_prompting/index.ipynb

Installs the FAL client library, Pillow for image handling, and dotenv for environment variable management. These are required for interacting with FAL services and handling image data.

```bash
pip install fal-client pillow dotenv
```

--------------------------------

### Install MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

Installs the MLflow library with a version greater than or equal to 2.20.

```bash
%pip install mlflow>=2.20
```

--------------------------------

### DSPy Basic Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental usage of the dspy framework, including importing the library and initializing a language model. This is a starting point for understanding dspy's core components.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')
print(llm('Hello, world!'))
```

--------------------------------

### DSPy: Stream Multiple Fields with StreamListeners

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This Python code demonstrates how to stream outputs from multiple fields of a DSPy module. It involves creating a separate `StreamListener` for each desired output field and configuring them within the `streamify` function. The example uses an asynchronous function to process the streamed output.

```Python
import asyncio

import dspy

lm = dspy.LM("openai/gpt-4o-mini", cache=False)
dspy.settings.configure(lm=lm)


class MyModule(dspy.Module):
    def __init__(self):
        super().__init__()

        self.predict1 = dspy.Predict("question->answer")
        self.predict2 = dspy.Predict("answer->simplified_answer")

    def forward(self, question: str, **kwargs):
        answer = self.predict1(question=question)
        simplified_answer = self.predict2(answer=answer)
        return simplified_answer


predict = MyModule()
stream_listeners = [
    dspy.streaming.StreamListener(signature_field_name="answer"),
    dspy.streaming.StreamListener(signature_field_name="simplified_answer"),
]
stream_predict = dspy.streamify(
    predict,
    stream_listeners=stream_listeners,
)

async def read_output_stream():
    output = stream_predict(question="why did a chicken cross the kitchen?")

    return_value = None
    async for chunk in output:
        if isinstance(chunk, dspy.streaming.StreamResponse):
            print(chunk)
        elif isinstance(chunk, dspy.Prediction):
            return_value = chunk
    return return_value

program_output = asyncio.run(read_output_stream())
print("Final output: ", program_output)
```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

Starts the MLflow user interface on port 5000 in a separate terminal.

```bash
mlflow ui --port 5000
```

--------------------------------

### Iterate Over DSPy Example Items

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/examples.md

Shows how to iterate over the key-value pairs of a DSPy `Example` object using the `items()` method, similar to how one would iterate over a Python dictionary.

```Python
for k, v in article_summary.items():
    print(f"{k} = {v}")
```

--------------------------------

### Install DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/custom_module/index.ipynb

Installs the DSPy library using pip. This is a prerequisite for using DSPy functionalities.

```shell
!pip install dspy
```

--------------------------------

### Install MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Installs the MLflow library with a version greater than or equal to 2.20. This is a prerequisite for using MLflow's features with DSPy.

```bash
%pip install mlflow>=2.20
```

--------------------------------

### DSPy Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This code demonstrates how to use a DSPy optimizer, specifically the BootstrapFewShot, to improve the performance of a module by learning from examples.

```python
import dspy

# Assuming 'qa_module' is a pre-defined DSPy module
# and 'train_data' is a list of (input, output) tuples

# Initialize the optimizer
optimizer = dspy.BootstrapFewShot(metric=dspy.ExactMatch())

# Optimize the module
# optimized_qa_module = optimizer.optimize(qa_module, train_data=train_data)

# Now 'optimized_qa_module' can be used for inference
```

--------------------------------

### Load and Prepare HoVer Dataset with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Loads the HoVer dataset from Hugging Face, filters for 3-hop examples, shuffles, and splits it into training, development, and testing sets. It also formats the data into DSPy Examples with 'claim' and 'titles' as inputs.

```Python
import random
from dspy.datasets import DataLoader

kwargs = dict(fields=("claim", "supporting_facts", "hpqa_id", "num_hops"), input_keys=("claim",))
hover = DataLoader().from_huggingface(dataset_name="hover-nlp/hover", split="train", trust_remote_code=True, **kwargs)

hpqa_ids = set()
hover = [
    dspy.Example(claim=x.claim, titles=list(set([y["key"] for y in x.supporting_facts]))).with_inputs("claim")
    for x in hover
    if x["num_hops"] == 3 and x["hpqa_id"] not in hpqa_ids and not hpqa_ids.add(x["hpqa_id"])
]

random.Random(0).shuffle(hover)
trainset, devset, testset = hover[:200], hover[200:500], hover[650:]
```

--------------------------------

### Learn Python Library from URLs and Generate Examples

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This Python function, `learn_any_library`, facilitates learning about a specified Python library. It takes the library's name, a list of documentation URLs, and optional use cases. It processes the documentation to understand the library's core concepts and patterns, then generates code examples for each provided use case, including imports, explanations, and best practices. Error handling is included for robustness.

```Python
def learn_any_library(library_name: str, documentation_urls: list[str], use_cases: list[str] = None):
    """Learn any library from its documentation and generate examples."""
    
    if use_cases is None:
        use_cases = [
            "Basic setup and hello world example",
            "Common operations and workflows",
            "Advanced usage with best practices"
        ]
    
    print(f"🚀 Starting automated learning for {library_name}...")
    print(f"Documentation sources: {len(documentation_urls)} URLs")
    
    try:
        # Step 1: Learn from documentation
        library_info = agent.learn_from_urls(library_name, documentation_urls)
        
        # Step 2: Generate examples for each use case
        all_examples = []
        
        for i, use_case in enumerate(use_cases, 1):
            print(f"\n📝 Generating example {i}/{len(use_cases)}: {use_case}")
            
            example = agent.generate_example(
                library_info=library_info,
                use_case=use_case,
                requirements="Include error handling, comments, and follow best practices"
            )
            
            all_examples.append({
                "use_case": use_case,
                "code": example['code'],
                "imports": example['imports'],
                "explanation": example['explanation'],
                "best_practices": example['best_practices']
            })
        
        return {
            "library_info": library_info,
            "examples": all_examples
        }
    
    except Exception as e:
        print(f"❌ Error learning {library_name}: {e}")
        return None
```

--------------------------------

### Install Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/yahoo_finance_react/index.md

Installs the necessary Python packages for DSPy, LangChain, and Yahoo Finance integration.

```bash
pip install dspy langchain langchain-community yfinance
```

--------------------------------

### DSPy: Reuse StreamListener for Repeated Module Calls (dspy.ReAct)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This Python example shows how to configure a `StreamListener` to be reusable across multiple calls to a DSPy module, specifically demonstrated with `dspy.ReAct`. By setting `allow_reuse=True`, the listener can capture streaming data from each iteration, preventing performance issues and ensuring all data is captured.

```Python
import asyncio

import dspy

lm = dspy.LM("openai/gpt-4o-mini", cache=False)
dspy.settings.configure(lm=lm)


def fetch_user_info(user_name: str):
    """Get user information like name, birthday, etc."""
    return {
        "name": user_name,
        "birthday": "2009-05-16",
    }


def get_sports_news(year: int):
    """Get sports news for a given year."""
    if year == 2009:
        return "Usane Bolt broke the world record in the 100m race."
    return None


react = dspy.ReAct("question->answer", tools=[fetch_user_info, get_sports_news])

stream_listeners = [
    # dspy.ReAct has a built-in output field called "next_thought".
    dspy.streaming.StreamListener(signature_field_name="next_thought", allow_reuse=True),
]
stream_react = dspy.streamify(react, stream_listeners=stream_listeners)


async def read_output_stream():
    output = stream_react(question="What sports news happened in the year Adam was born?")
    return_value = None
    async for chunk in output:
        if isinstance(chunk, dspy.streaming.StreamResponse):
            print(chunk)
        elif isinstance(chunk, dspy.Prediction):
            return_value = chunk
    return return_value


print(asyncio.run(read_output_stream()))
```

--------------------------------

### Install DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet shows how to install the DSPy library using pip. DSPy is a Python framework for programming LLMs.

```shell
pip install dspy
```

--------------------------------

### DSPy: Optimizers (BootstrapFewShot)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to use DSPy's optimizers, specifically `BootstrapFewShot`, to automatically tune prompts and signatures. Optimizers help improve LLM performance by learning from a small set of examples.

```Python
import dspy

# Assume a signature and a module are defined, e.g.:
# class MySignature(dspy.Signature):
#     input_text = dspy.InputField()
#     output_text = dspy.OutputField()
#
# class MyModule(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.predict = dspy.Predict(MySignature)
#
#     def forward(self, input_text):
#         return self.predict(input_text=input_text)

# Configure the LM and load a dataset (example)
# dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))
# train_data = [
#     {'input_text': 'positive example', 'output_text': 'positive'},
#     {'input_text': 'negative example', 'output_text': 'negative'}
# ]

# Instantiate the module
# my_module = MyModule()

# Initialize the optimizer
# optimizer = dspy.BootstrapFewShot(metric=dspy.AccuracyMetric(MySignature))

# Optimize the module
# optimized_module = optimizer.optimize(my_module, train_data=train_data)

# Now use the optimized module
# result = optimized_module(input_text='another example')
# print(result.output_text)
```

--------------------------------

### Basic dspy Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental steps of using dspy, including importing the library, defining a signature, and compiling a module. This is a starting point for understanding dspy's core functionality.

```Python
import dspy

# Define a signature for a question-answering task
class BasicQA(dspy.Signature):
    """Answer questions based on the context."""
    context = dspy.InputField(prefix="context: ")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Compile a simple module using the signature
qa_module = dspy.Chain(BasicQA)

# Example usage (assuming a language model is configured)
# result = qa_module(context="...", question="...")
# print(result.answer)
```

--------------------------------

### Install BM25s and Dependencies

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_multihop/index.ipynb

Installs the BM25s library for efficient information retrieval, along with PyStemmer for text stemming and JAX with CPU support. These are necessary for indexing and searching the retrieval corpus.

```shell
pip install -U bm25s PyStemmer "jax[cpu]"
```

--------------------------------

### Install DSPy Package

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/email_extraction/index.md

Installs the DSPy library, a foundational tool for developing language model applications. This is typically run before using any DSPy functionalities.

```bash
pip install dspy
```

--------------------------------

### DSPy StreamListener with Duplicate Field Names

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This Python code snippet shows how to configure `dspy.streaming.StreamListener` to handle duplicate field names from different modules. It defines a custom module with two predictors and sets up stream listeners, specifying `predict` and `predict_name` for each to differentiate them during the streaming process. The example then demonstrates how to stream output and process the chunks.

```python
import asyncio

import dspy

lm = dspy.LM("openai/gpt-4o-mini", cache=False)
dspy.settings.configure(lm=lm)


class MyModule(dspy.Module):
    def __init__(self):
        super().__init__()

        self.predict1 = dspy.Predict("question->answer")
        self.predict2 = dspy.Predict("question, answer->answer, score")

    def forward(self, question: str, **kwargs):
        answer = self.predict1(question=question)
        simplified_answer = self.predict2(answer=answer)
        return simplified_answer


predict = MyModule()
stream_listeners = [
    dspy.streaming.StreamListener(
        signature_field_name="answer",
        predict=predict.predict1,
        predict_name="predict1"
    ),
    dspy.streaming.StreamListener(
        signature_field_name="answer",
        predict=predict.predict2,
        predict_name="predict2"
    ),
]
stream_predict = dspy.streamify(
    predict,
    stream_listeners=stream_listeners,
)


async def read_output_stream():
    output = stream_predict(question="why did a chicken cross the kitchen?")

    return_value = None
    async for chunk in output:
        if isinstance(chunk, dspy.streaming.StreamResponse):
            print(chunk)
        elif isinstance(chunk, dspy.Prediction):
            return_value = chunk
    return return_value


program_output = asyncio.run(read_output_stream())
print("Final output: ", program_output)
```

--------------------------------

### Generate llms.txt Documentation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/real_world_examples/index.md

Learn to create AI-powered documentation generators that analyze codebases and produce structured, LLM-friendly documentation following the llms.txt standard. This involves repository analysis and meta-programming.

```Python
# Example usage for llms.txt generation (conceptual)
# Assumes a DSPy pipeline is set up for documentation generation

# from dspy import Signature, Module, Predictor
# from dspy.utils import Module

# class DocGenerator(Signature):
#     """Analyze code and generate documentation."""
#     code_snippet: str
#     documentation: str

# class CodeAnalyzer(Module):
#     def __init__(self):
#         super().__init__()
#         self.generate_documentation = Predictor(DocGenerator)

#     def forward(self, code):
#         return self.generate_documentation(code_snippet=code)

# # Placeholder for actual code analysis and generation logic
# def generate_llms_txt(codebase_path):
#     # Logic to read codebase, analyze files, and use DSPy module
#     print(f"Analyzing codebase at: {codebase_path}")
#     # ... DSPy processing ...
#     return "Generated llms.txt content"

# print("Tutorial: Generating llms.txt documentation")
# print("Key Concepts: Repository analysis, meta-programming, documentation generation")

```

--------------------------------

### DSPy Documentation Fetching and Processing Setup

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

Imports essential Python libraries for web scraping, HTML parsing, and data manipulation, including dspy, requests, BeautifulSoup, html2text, typing, json, urljoin, urlparse, and time. This sets up the foundation for fetching and processing documentation from the web.

```python
import dspy
import requests
from bs4 import BeautifulSoup
import html2text
from typing import List, Dict, Any
import json
from urllib.parse import urljoin, urlparse
import time
```

--------------------------------

### Install MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Installs the MLflow library, a tool for LLMOps that integrates with DSPy for experiment tracking and visualization of prompts and optimization progress.

```Bash
%pip install mlflow>=2.20
```

--------------------------------

### DSPy Evaluation Setup

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Shows the basic setup for DSPy evaluation using the `Evaluate` class. It outlines how to pass a development dataset, a metric, and configuration parameters like `num_threads` and display options.

```python
from dspy.evaluate import Evaluate

# Assuming devset, your_defined_metric, NUM_THREADS, and num_rows_to_display are defined elsewhere
# evaluate_program = Evaluate(devset=devset, metric=your_defined_metric, num_threads=NUM_THREADS, display_progress=True, display_table=num_rows_to_display)

# evaluate_program(your_dspy_program)
```

--------------------------------

### Display Example Task Input and Gold Answer - Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates how to display an example input message and its corresponding gold answer from the initialized dataset. It iterates through the key-value pairs of the JSON-formatted answer.

```python
print("Input Message:")
print(train_set[0]['message'])

print("\n\nGold Answer:")
for k, v in json.loads(train_set[0]['answer']).items():
    print(f"{k}: {v}")
```

--------------------------------

### Deployment of DSPy Applications

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial provides guidance on deploying DSPy applications. It covers strategies and best practices for making your AI applications accessible and operational in production environments.

```Python
import dspy

# Example conceptual code for deploying a DSPy application
# This is a placeholder and would be replaced by actual deployment scripts or configurations.

# Assume 'MyDSPyApp' is a defined DSPy module
# class MyDSPyApp(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.generate = dspy.Predict('prompt -> response')
#
#     def forward(self, prompt):
#         return self.generate(prompt=prompt)

# Deployment typically involves wrapping the DSPy module in a web framework (like Flask or FastAPI)
# For example, using FastAPI:

# from fastapi import FastAPI
# app = FastAPI()
# dspy_app_instance = MyDSPyApp()

# @app.post('/predict')
# async def predict(prompt: str):
#     response = dspy_app_instance(prompt=prompt)
#     return {'response': response}

# To run this, you would typically use an ASGI server like uvicorn:
# uvicorn main:app --reload

print('Deployment guide focuses on packaging and serving the DSPy application.')
```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/custom_module/index.ipynb

Starts the MLflow UI in a separate terminal on port 5000, using a local SQLite database for backend storage.

```shell
mlflow ui --port 5000 --backend-store-uri sqlite:///mlruns.db
```

--------------------------------

### Exclude Fields from DSPy Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/examples.md

Demonstrates the use of the `without()` method to create a new `Example` object excluding specified fields. This is helpful for cleaning or preparing data subsets.

```Python
article_summary = dspy.Example(context="This is an article.", question="This is a question?", answer="This is an answer.", rationale= "This is a rationale.").with_inputs("context", "question")

print("Example object without answer & rationale keys:", article_summary.without("answer", "rationale"))
```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Starts the MLflow user interface in a separate terminal, typically on port 5000, to monitor experiments and traces.

```Bash
mlflow ui --port 5000
```

--------------------------------

### Basic DSPy Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental usage of the dspy library, including initializing a language model and executing a simple prompt. This snippet serves as a starting point for understanding dspy's core functionalities.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Example usage (replace with actual dspy program)
# result = llm("Hello, world!")
# print(result)
```

--------------------------------

### DSPy Game Framework Setup

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Initializes the core game framework by importing necessary libraries from DSPy, typing, dataclasses, enums, random, rich, and typer. This sets up the foundation for building the game logic.

```python
import dspy
import json
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from enum import Enum
import random
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
import typer
```

--------------------------------

### DSPy Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to use DSPy's optimizer to tune a program for better performance. This example uses the BootstrapFewShot optimizer.

```Python
optimizer = dspy.BootstrapFewShot(metric=dspy.ExactMatch())

# Assuming 'program' is a compiled DSPy program
compiled_program = optimizer.compile(program, trainset=trainset, valset=valset)

```

--------------------------------

### DSPy: Program Optimization Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example demonstrates how to optimize a DSPy program. Optimization in DSPy typically involves tuning prompts and parameters to improve performance.

```Python
import dspy

# Assume a language model is configured
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a simple signature
class SimpleTask(dspy.Signature):
    """Perform a simple task."""
    input_text = dspy.InputField()
    output_text = dspy.OutputField()

# Create a basic program
# basic_program = dspy.Program.from_signature(SimpleTask)

# To optimize, you would typically use DSPy's optimizer
# For example, using the Bayesian Optimization approach:
# optimizer = dspy.BayesOpt(n_trials=50)
# optimized_program = optimizer.optimize(basic_program, trainset=your_training_data, metric=your_metric)

# This snippet is conceptual, as optimization requires training data and metrics.
# The actual optimization process involves running the optimizer.
# print("Optimization process would be initiated here.")
```

--------------------------------

### Install DSPy from GitHub main branch

Source: https://github.com/stanfordnlp/dspy/blob/main/README.md

This command installs the very latest version of DSPy directly from its main branch on GitHub. This is useful for developers who want to use the newest features or contribute to the project.

```bash
pip install git+https://github.com/stanfordnlp/dspy.git
```

--------------------------------

### Sample Unlabeled Data for Finetuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Samples 500 unlabeled queries from the Banking77 dataset to be used for bootstrapped finetuning, creating DSPy Examples with only the text input.

```Python
unlabeled_trainset = [dspy.Example(text=x.text).with_inputs("text") for x in raw_data[:500]]

unlabeled_trainset[0]
```

--------------------------------

### Install MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/observability/index.md

Installs or upgrades the MLflow library to version 2.18.0 or higher, which is required for using MLflow's tracing capabilities with DSPy.

```bash
pip install -U mlflow>=2.18.0
```

--------------------------------

### DSPy Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows a simple example of using a DSPy optimizer to tune a module's prompts. Optimizers automatically search for better prompts to improve performance.

```python
import dspy

# Assume 'MyModule' is a defined dspy.Module
# class MyModule(dspy.Module):
#     ...

# Initialize DSPy with a language model
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# Instantiate the module
# module = MyModule()

# Define a dataset for tuning (example)
# train_data = [
#     dspy.Example({'input': '...', 'output': '...'})
# ]

# Use an optimizer (e.g., BootstrapFewShot)
# optimizer = dspy.BootstrapFewShot(metric=dspy.ExactMatch())
# optimized_module = optimizer.optimize(module, train_data)

# The optimized_module now has tuned prompts.

```

--------------------------------

### DSPy: Program Optimization (BootstrapFewShot)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to use the BootstrapFewShot optimizer in dspy to automatically generate few-shot examples for a given signature and dataset.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
# llm = dspy.OpenAI(model="gpt-3.5-turbo")
# dspy.settings.configure(lm=llm)

# Define a signature
class SentimentSignature(dspy.Signature):
    """Classify the sentiment of a sentence."""
    sentence: str
    sentiment: str

# Create a module
class SentimentModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.sentiment_predictor = dspy.Predict(SentimentSignature)

    def forward(self, sentence):
        return self.sentiment_predictor(sentence=sentence)

# Sample training data
train_data = [
    dspy.Example(sentence="I love this product!", sentiment="positive"),
    dspy.Example(sentence="This is terrible.", sentiment="negative"),
    dspy.Example(sentence="It's okay, not great.", sentiment="neutral")
]

# Instantiate the module
# module = SentimentModule()

# Optimize the module using BootstrapFewShot
# optimizer = dspy.BootstrapFewShot(metric=dspy.Accuracy())
# optimized_module = optimizer.optimize(module, train_data=train_data, n=3)

# Now use the optimized_module for predictions
# result = optimized_module(sentence="The weather is beautiful today.")
# print(result.sentiment)
```

--------------------------------

### DSPy ReAct Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Provides an example of DSPy's ReAct (Reasoning and Acting) module. It shows how to initialize ReAct with a signature and call it with a question to generate an answer by interleaving reasoning and actions.

```python
react_module = dspy.ReAct(BasicQA)

question = 'Sarah has 5 apples. She buys 7 more apples from the store. How many apples does Sarah have now?'
result = react_module(question=question)

print(f"Question: {question}")
print(f"Final Predicted Answer (after ReAct process): {result.answer}")
```

--------------------------------

### Append Few-shot Example with Conversation History

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/conversation_history/index.md

This code demonstrates how to append a few-shot example to a DSPy predictor. The example includes a question, a history object containing previous messages, and the expected answer. This is crucial for training models on conversational data.

```Python
predict.demos.append(
    dspy.Example(
        question="What is the capital of France?",
        history=dspy.History(
            messages=[{"question": "What is the capital of Germany?", "answer": "The capital of Germany is Berlin."}]
        ),
        answer="The capital of France is Paris.",
    )
)
```

--------------------------------

### Use GRPO'ed DSPy Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_multihop/index.ipynb

Shows how to execute an optimized DSPy program after it has been compiled using a teleprompter like GRPO. It takes a single example from the development set and runs the optimized program with the example's inputs.

```python
example = devset[0]
optimized_program(**example.inputs())
```

--------------------------------

### Install MLflow for DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/custom_module/index.ipynb

Installs the MLflow library with a minimum version of 3.0.0, required for MLflow DSPy integration.

```shell
%pip install mlflow>=3.0.0
```

--------------------------------

### Prepare DSPy Examples with Function Tools

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

Processes raw data to create DSPy examples, extracting function code, cleaning it, and associating functions with their metadata. It also defines a 'finish' function and prepares training, development, and test sets.

```python
import re
import inspect

def finish(answer: str):
    """Conclude the trajectory and return the final answer."""
    return answer

examples = []
fns2code = {}

for datapoint in data:
    func_dict = {}
    for func_code in datapoint["functions"]:
        cleaned_code = func_code.rsplit("\n\n# Example usage", 1)[0]
        fn_name = re.search(r"^\s*def\s+([a-zA-Z0-9_]+)\s*(", cleaned_code)
        fn_name = fn_name.group(1) if fn_name else None

        if not fn_name:
            continue

        local_vars = {}
        exec(cleaned_code, {}, local_vars)
        fn_obj = local_vars.get(fn_name)

        if callable(fn_obj):
            func_dict[fn_name] = fn_obj
            assert fn_obj not in fns2code, f"Duplicate function found: {fn_name}"
            fns2code[fn_obj] = (fn_name, cleaned_code)

    func_dict["finish"] = finish

    example = dspy.Example(question=datapoint["question"], answer=datapoint["answer"], functions=func_dict)
    examples.append(example.with_inputs("question", "functions"))

trainset, devset, testset = examples[:100], examples[100:400], examples[400:]
```

--------------------------------

### Evaluate Program and Inspect History

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

This snippet shows how to run a DSPy program, calculate the audio similarity for a specific example, and inspect the execution history to understand the generated instructions.

```Python
import dspy

# Assuming EmotionStylePrompter, testset, and audio_similarity_metric are defined
# program = EmotionStylePrompter()
# pred = program(raw_line=testset[1].raw_line, target_style=testset[1].target_style)

# print(audio_similarity_metric(testset[1], pred)) # Example output: 0.5725605487823486
# dspy.inspect_history(n=1)

```

--------------------------------

### Start MLflow UI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Starts the MLflow user interface in a separate terminal, typically on port 5000, allowing users to monitor experiments and traces.

```Bash
mlflow ui --port 5000
```

--------------------------------

### Install DSPy with MCP support

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

Installs the DSPy library with the necessary dependencies for Model Context Protocol (MCP) integration. This command ensures you have the required packages to use MCP tools within your DSPy projects.

```Shell
pip install -U "dspy[mcp]"
```

--------------------------------

### Print an Example AIME Problem, Solution, and Answer

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

Demonstrates how to access and print the 'problem', 'solution', and 'answer' fields from the first example in the training set. This is useful for understanding the structure of the dataset and the type of problems included.

```python
print("Problem:")
print(train_set[0]['problem'])
print("\n\nSolution:")
print(train_set[0]['solution'])
print("\n\nAnswer:")
print(train_set[0]['answer'])
```

--------------------------------

### Run DSPy Interactive Learning Session

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This snippet executes the main interactive learning session for DSPy. It handles the learning of multiple libraries, displays examples with code and explanations, and allows saving results to a file.

```python
if __name__ == "__main__":
    # Run interactive session
    learned_libraries = interactive_learning_session()
```

--------------------------------

### Build AI Agents with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial guides you through building AI agents using the DSPy framework. It demonstrates practical use cases for creating intelligent agents, likely involving conversational AI or task automation.

```Python
import dspy

# Example of building an AI agent with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class CustomerServiceAgent(dspy.Module):
    def __init__(self):
        super().__init__()
        # Define your language model and modules here
        self.retrieve = dspy.Retrieve(k=3)
        self.generate_answer = dspy.ChainOfThought(dspy.Answer)

    def forward(self, question):
        context = self.retrieve(question)
        prediction = self.generate_answer(context=context, question=question)
        return prediction

# Initialize the agent and run it (example)
# agent = CustomerServiceAgent()
# response = agent('What is the return policy?')
# print(response)
```

--------------------------------

### Basic dspy usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates a basic usage of dspy, including importing the library, setting up an LM, and defining a simple module.

```python
import dspy

# Set up your language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a simple module
class BasicQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict("question -> answer")

    def forward(self, question):
        return self.predict(question=question)

# Instantiate and use the module
basic_qa = BasicQA()
answer = basic_qa(question='What is the capital of France?')
print(answer.answer)
```

--------------------------------

### Format Messages with ChatAdapter

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/adapters.md

This example demonstrates how to manually use the ChatAdapter to format a DSPy signature, demos, and inputs into messages suitable for an LM. It prints the formatted messages, showing the system, user, and assistant roles with specific content formatting.

```Python
# Simplified flow example
signature = dspy.Signature("question -> answer")
inputs = {"question": "What is 2+2?"}
demos = [{"question": "What is 1+1?", "answer": "2"}]

adapter = dspy.ChatAdapter()
print(adapter.format(signature, demos, inputs))
```

--------------------------------

### Basic DSPy Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

A simple example of a DSPy program that defines a signature and a module. This demonstrates the fundamental structure of a DSPy application.

```python
import dspy

# Define a signature for a question answering task
class BasicQA(dspy.Signature):
    """Answer the question in a comprehensive and concise manner."""
    question = dspy.InputField()
    answer = dspy.OutputField()

# Create a module using the signature
qa_module = dspy.Module(BasicQA())

# Example usage (assuming a DSPy predictor is configured)
# result = qa_module(question='What is DSPy?')
# print(result.answer)
```

--------------------------------

### dspy Pipeline Composition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example demonstrates how to compose multiple dspy modules into a pipeline. Pipelines allow for the creation of complex, multi-step LLM workflows.

```Python
import dspy

class ModuleA(dspy.Module):
    def forward(self, x):
        return x + 1

class ModuleB(dspy.Module):
    def forward(self, x):
        return x * 2

class MyPipeline(dspy.Module):
    def __init__(self):
        super().__init__()
        self.module_a = ModuleA()
        self.module_b = ModuleB()

    def forward(self, x):
        a_out = self.module_a(x)
        b_out = self.module_b(a_out)
        return b_out

# Instantiate and run the pipeline
pipeline = MyPipeline()
result = pipeline(5)
print(result)  # Output: 12
```

--------------------------------

### Basic DSPy Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates a fundamental DSPy program. It initializes the DSPy environment, defines a simple language model, and executes a basic query.

```Python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a simple program
class BasicQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict("question -> answer")

    def forward(self, question):
        return self.predict(question=question)

# Instantiate and run the program
basic_qa = BasicQA()
response = basic_qa(question='What is the capital of France?')
print(response.answer)
```

--------------------------------

### Install Fine-tuning Packages

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Installs necessary packages for fine-tuning, including torch, transformers, accelerate, trl, and peft. It specifies a particular version for the transformers package to address a known issue.

```Shell
> uv pip install -U torch transformers==4.48.3 accelerate trl peft
```

--------------------------------

### dspy Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to use dspy's optimizer to automatically tune a module. Optimizers explore different prompts and parameters to improve performance.

```python
from dspy.teleprompt import BootstrapFewShot

optimizer = BootstrapFewShot(metric=dspy.evaluate.answer)
optimized_program = optimizer.compile(BasicQAModule(), trainset=trainset, valset=valset)

# Use optimized_program for predictions
```

--------------------------------

### DSPy: Basic Python Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates a basic usage of the DSPy framework in Python. It shows how to define a simple language model interaction.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class BasicQA(dspy.Signature):
    """Answer questions based on the context."""

    context = dspy.InputField(desc="may contain answer")
    question = dspy.InputField()
    answer = dspy.OutputField()

question_answer = dspy.ChainOfThought(BasicQA)

# Example usage:
# result = question_answer(context="The capital of France is Paris.", question="What is the capital of France?")
# print(result.answer)
```

--------------------------------

### Using the GRPO-Compiled dspy Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Demonstrates how to use the compiled dspy program by taking an example from the development set and executing the program with its inputs. This shows the inference usage of the optimized model.

```python
example = devset[0]
optimized_papillon(**example.inputs())
```

--------------------------------

### Build DSPy Docs Locally

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/README.md

Steps to build and serve the DSPy documentation locally. Requires navigating to the docs directory, installing Python dependencies, running generation scripts, and then using mkdocs commands.

```bash
cd docs
pip install -r requirements.txt
python scripts/generate_api_docs.py
python scripts/generate_api_summary.py
mkdocs build
mkdocs serve
```

--------------------------------

### CodeGenerator DSPy Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

Defines a DSPy signature for generating code examples. It takes library information, a use case, and requirements as input, and outputs a code example, explanation, best practices, and necessary imports.

```python
class CodeGenerator(dspy.Signature):
    """Generate code examples for specific use cases using the target library."""
    library_info: str = dspy.InputField(desc="Library concepts and patterns")
    use_case: str = dspy.InputField(desc="Specific use case to implement")
    requirements: str = dspy.InputField(desc="Additional requirements or constraints")
    
    code_example: str = dspy.OutputField(desc="Complete, working code example")
    explanation: str = dspy.OutputField(desc="Step-by-step explanation of the code")
    best_practices: list[str] = dspy.OutputField(desc="Best practices and tips")
    imports_needed: list[str] = dspy.OutputField(desc="Required imports and dependencies")
```

--------------------------------

### Configure DSPy Language Models

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Configures the language models to be used with DSPy. This example sets up 'gpt-4o-mini' and 'gpt-4o' from OpenAI, specifying max_tokens, and then configures 'gpt-4o-mini' as the default LM.

```python
import dspy

gpt4o_mini = dspy.LM('openai/gpt-4o-mini', max_tokens=2000)
gpt4o = dspy.LM('openai/gpt-4o', max_tokens=2000)
dspy.configure(lm=gpt4o_mini)  # we'll use gpt-4o-mini as the default LM, unless otherwise specified
```

--------------------------------

### Run FastAPI Server

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Command to run the FastAPI application using uvicorn, enabling hot-reloading for development.

```bash
> uvicorn fastapi_dspy:app --reload
```

--------------------------------

### Basic dspy Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental structure of a dspy program, including defining a signature, a module, and compiling it. This is the starting point for most dspy applications.

```Python
import dspy

# Define a signature for a question-answering task
class BasicQA(dspy.Signature):
    """Answer the question in three sentences.
    Question: The user's question.
    Answer: The answer to the question.
    """
    question = dspy.InputField()
    answer = dspy.OutputField()

# Define a module that uses the signature
class BasicQAModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict(BasicQA)

    def forward(self, question):
        return self.predict(question=question)

# Initialize the dspy language model (e.g., using OpenAI)
dspy.llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Instantiate the module
basic_qa = BasicQAModule()

# Compile the module (this optimizes the LM calls)
compiled_basic_qa = basic_qa.compile()

# Use the compiled module to answer a question
question = "What is the capital of France?"
result = compiled_basic_qa(question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### DSPy Session Summary

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This code generates a final summary of the DSPy learning session, indicating the total number of libraries learned and the number of examples generated for each.

```python
# Final summary
    if learned_libraries:
        print(f"\n🎉 Session Summary:")
        print(f"Successfully learned {len(learned_libraries)} libraries:")
        for lib_name, info in learned_libraries.items():
            print(f"  • {lib_name}: {len(info['examples'])} examples generated")
    
    return learned_libraries
```

--------------------------------

### DSPy Compilation Example (Conceptual)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/faqs.md

Illustrates the conceptual process and resource usage of compiling a DSPy program using an optimizer like BootstrapFewShotWithRandomSearch.

```Python
# Example conceptual usage (actual implementation details may vary)
# optimizer = dspy.BootstrapFewShotWithRandomSearch(metric=my_custom_metric)
# compiled_program = optimizer.compile(MyProgram, trainset=my_trainset)

# Compilation metrics for gpt-3.5-turbo-1106:
# Time: ~6 minutes
# API Calls: 3200
# Input Tokens: 2.7 million
# Output Tokens: 156,000
# Cost: $3 USD
```

--------------------------------

### DSPy Optimizer: LabeledFewShot

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Demonstrates using the LabeledFewShot optimizer from DSPy. It shows how to instantiate the optimizer with a specified number of examples (`k`) and then compile a student program using a training set.

```python
from dspy.teleprompt import LabeledFewShot

# Assuming your_dspy_program and trainset are defined elsewhere
# labeled_fewshot_optimizer = LabeledFewShot(k=8)
# your_dspy_program_compiled = labeled_fewshot_optimizer.compile(student = your_dspy_program, trainset=trainset)
```

--------------------------------

### DSPy Basic Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental usage of the DSPy framework. It shows how to import the library, define a simple language model, and use it to generate text. This is a starting point for understanding how DSPy interacts with LLMs.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Define a simple DSPy program
class BasicProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict("input -> output")

    def forward(self, input):
        return self.predict(input=input)

# Instantiate and run the program
program = BasicProgram()
result = program(input='What is the capital of France?')

print(result.output)
```

--------------------------------

### dspy.Example Class Methods

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/primitives/Example.md

This snippet details the various methods available for the dspy.Example class. It includes functionalities for copying, retrieving specific data, accessing inputs, keys, values, and converting the example to a dictionary. These methods are crucial for managing and utilizing example data within the dspy framework.

```Python
::: dspy.Example
    handler: python
    options:
        members:
            - copy
            - get
            - inputs
            - items
            - keys
            - labels
            - toDict
            - values
            - with_inputs
            - without
        show_source: true
        show_root_heading: true
        heading_level: 2
        docstring_style: google
        show_root_full_path: true
        show_object_full_path: false
        separate_signature: false
        inherited_members: true
:::
```

--------------------------------

### DSPy ChainOfThought Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/overview.md

Demonstrates the use of the `dspy.ChainOfThought` module as a starting point for DSPy programs. This module encourages step-by-step thinking for the language model.

```python
import dspy

# Example of using ChainOfThought (conceptual)
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# class MyModule(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.cot = dspy.ChainOfThought()

#     def forward(self, question):
#         return self.cot(question)

# Example usage:
# result = MyModule()("What is the capital of France?")
# print(result.rationale)
# print(result.answer)
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the basic usage of the dspy library, including initializing an LLM, defining a signature, and compiling a program. This is the foundational step for building dspy applications.

```Python
import dspy

# Initialize an LLM (e.g., OpenAI's GPT-3.5 Turbo)
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a simple question-answering task
class BasicQA(dspy.Signature):
    """Answer the question based on the provided context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Create a simple dspy program
class SimpleQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict(BasicQA)

    def forward(self, context, question):
        return self.predict(context=context, question=question)

# Instantiate and run the program
qa_program = SimpleQA()
context = "DSPy is a framework for developing LLM applications."
question = "What is DSPy?"
result = qa_program(context=context, question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### Specify Input Keys for DSPy Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/evaluation/data.md

Shows how to use the `with_inputs()` method to designate specific fields as inputs for a DSPy `Example`. It also demonstrates how to retrieve only the input fields or non-input fields using `inputs()` and `labels()` methods.

```python
# Single Input.
print(qa_pair.with_inputs("question"))

# Multiple Inputs; be careful about marking your labels as inputs unless you mean it.
print(qa_pair.with_inputs("question", "answer"))
```

```python
article_summary = dspy.Example(article= "This is an article.", summary= "This is a summary.").with_inputs("article")

input_key_only = article_summary.inputs()
non_input_key_only = article_summary.labels()

print("Example object with Input fields only:", input_key_only)
print("Example object with Non-Input fields only:", non_input_key_only)
```

--------------------------------

### Launch Finetuned LM

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

This command launches the finetuned language model, making it ready for use or further evaluation. It's a necessary step after compiling or loading a finetuned model.

```Python
classify_ft.get_lm().launch()
```

--------------------------------

### DocumentationLearningAgent Class

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

A DSPy module that acts as an agent to learn from documentation URLs and generate code examples. It orchestrates a `DocumentationFetcher`, `LibraryAnalyzer`, `CodeGenerator`, and a code refinement step.

```python
class DocumentationLearningAgent(dspy.Module):
    """Agent that learns from documentation URLs and generates code examples."""
    
    def __init__(self):
        super().__init__()
        self.fetcher = DocumentationFetcher()
        self.analyze_docs = dspy.ChainOfThought(LibraryAnalyzer)
        self.generate_code = dspy.ChainOfThought(CodeGenerator)
        self.refine_code = dspy.ChainOfThought(
            "code, feedback -> improved_code: str, changes_made: list[str]"
        )
    
    def learn_from_urls(self, library_name: str, doc_urls: list[str]) -> Dict:
        """Learn about a library from its documentation URLs."""
        
        print(f"📚 Learning about {library_name} from {len(doc_urls)} URLs...")
        
        # Fetch all documentation
        docs = self.fetcher.fetch_documentation(doc_urls)
        
        # Combine successful fetches
        combined_content = "\n\n---\n\n".join([
            f"URL: {doc['url']}\nTitle: {doc['title']}\n\n{doc['content']}"

```

--------------------------------

### Launch MCP Server (Shell)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

This shell command demonstrates how to launch the MCP server script from the command line, specifying the path to the working directory.

```Shell
python path_to_your_working_directory/mcp_server.py
```

--------------------------------

### DSPy Metric Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to define and use a metric in DSPy for evaluating the performance of LM modules. Metrics are crucial for optimization.

```python
import dspy

# Define a custom metric (e.g., Exact Match)
class ExactMatch(dspy.Metric):
    def __init__(self):
        super().__init__()

    def __call__(self, prediction, ground_truth, **kwargs):
        return prediction.output == ground_truth.output

# Example usage within an optimizer:
# optimizer = dspy.BootstrapFewShot(metric=ExactMatch())

```

--------------------------------

### Optimize DSPy Prompts with MIPROv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Sets up and initializes the `MIPROv2` optimizer for jointly optimizing the prompts within the `Hop` program. It specifies the metric, optimization level, number of threads, and the models to be used for optimization.

```Python
models = dict(prompt_model=gpt4o, teacher_settings=dict(lm=gpt4o))
tp = dspy.MIPROv2(metric=top5_recall, auto="medium", num_threads=16, **models)

kwargs = dict(minibatch_size=40, minibatch_full_eval_steps=4)
```

--------------------------------

### dspy Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet illustrates the use of dspy's optimization capabilities. Optimizers automatically tune prompts and parameters to improve LLM performance.

```Python
import dspy

# Assume 'program' is a dspy.Program instance
optimizer = dspy.BayesSignatureOptimizer(program, n_trials=10)
optimizer.optimize()

# The optimized program is now available
```

--------------------------------

### Initialize DSPy LM and Configure Settings

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/image_generation_prompting/index.ipynb

Sets up the DSPy language model (LM) using a specified model ('gpt-4o-mini') and temperature, then configures DSPy to use this LM for its operations. This is a foundational step for using DSPy.

```python
from IPython.display import display

lm = dspy.LM(model="gpt-4o-mini", temperature=0.5)
dspy.settings.configure(lm=lm)
```

--------------------------------

### DSPy ReAct Agent Basic Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/tools.md

Demonstrates how to define tools (get_weather, search_web) and use the dspy.ReAct agent to automatically reason and call these tools to answer a question. The agent handles the iterative process and provides the final answer and trajectory.

```python
import dspy

# Define your tools as functions
def get_weather(city: str) -> str:
    """Get the current weather for a city."""
    # In a real implementation, this would call a weather API
    return f"The weather in {city} is sunny and 75°F"

def search_web(query: str) -> str:
    """Search the web for information."""
    # In a real implementation, this would call a search API
    return f"Search results for '{query}': [relevant information...]"

# Create a ReAct agent
react_agent = dspy.ReAct(
    signature="question -> answer",
    tools=[get_weather, search_web],
    max_iters=5
)

# Use the agent
result = react_agent(question="What's the weather like in Tokyo?")
print(result.answer)
print("Tool calls made:", result.trajectory)
```

--------------------------------

### Load and Print HotPotQA Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/built-in-datasets.md

Demonstrates how to load the HotPotQA dataset from the dspy.datasets module and print the initial training examples. This shows the raw structure of the dataset before input keys are set.

```python
from dspy.datasets import HotPotQA

dataset = HotPotQA(train_seed=1, train_size=5, eval_seed=2023, dev_size=50, test_size=0)

print(dataset.train)
```

--------------------------------

### FastAPI Authentication API Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

Generates a FastAPI application with JWT-based authentication. It includes endpoints for login and a protected route, demonstrating token verification and secure access.

```Python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import uvicorn
from typing import Dict
import jwt
from datetime import datetime, timedelta

app = FastAPI(title="Authenticated API", version="1.0.0")
security = HTTPBearer()

# Secret key for JWT (use environment variable in production)
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/login")
async def login(username: str, password: str) -> dict[str, str]:
    # In production, verify against database
    if username == "admin" and password == "secret":
        token_data = {"sub": username, "exp": datetime.utcnow() + timedelta(hours=24)}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/protected")
async def protected_route(current_user: str = Depends(verify_token)) -> dict[str, str]:
    return {"message": f"Hello {current_user}! This is a protected route."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

```

--------------------------------

### Access Input and Non-Input Fields

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/examples.md

Illustrates how to use the `inputs()` and `labels()` methods to create new `Example` objects containing only the specified input fields or non-input fields, respectively. This is useful for isolating specific parts of the data.

```Python
article_summary = dspy.Example(article= "This is an article.", summary= "This is a summary.").with_inputs("article")

input_key_only = article_summary.inputs()
non_input_key_only = article_summary.labels()

print("Example object with Input fields only:", input_key_only)
print("Example object with Non-Input fields only:", non_input_key_only)
```

--------------------------------

### DSPy Program Execution

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to execute a DSPy program with a specific LLM. This example uses the OpenAI API.

```Python
import dspy

# Configure the LLM (e.g., OpenAI)
openai_api_key = "YOUR_OPENAI_API_KEY"
llm = dspy.OpenAI(model='gpt-3.5-turbo', api_key=openai_api_key)
dspy.settings.configure(lm=llm)

# Define a simple program
class SimpleProgram(dspy.Program):
    def __init__(self):
        super().__init__()
        self.qa = SimpleQA() # Assuming SimpleQA is defined as above

    def forward(self, context, question):
        return self.qa(context=context, question=question)

# Example usage
context = "DSPy is a framework for programming LLMs."
question = "What is DSPy?"

program = SimpleProgram()
result = program(context=context, question=question)

print(result.answer)
```

--------------------------------

### DSPy Metric Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates the use of a metric in DSPy, such as ExactMatch, to evaluate the quality of module outputs. Metrics are crucial for optimizers.

```python
import dspy

# Define a metric (e.g., ExactMatch)
exact_match_metric = dspy.ExactMatch()

# Example usage with predicted and ground truth answers
# predicted_answer = "DSPy is a framework."
# ground_truth_answer = "DSPy is a Python framework for programming LLMs."

# score = exact_match_metric(predicted_answer, ground_truth_answer)
# print(f"Exact Match Score: {score}")
```

--------------------------------

### DSPy Module Composition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to compose multiple DSPy modules to create more complex pipelines. This example shows chaining two modules for a more sophisticated task.

```Python
import dspy

# Assume BasicQA signature is defined as above

# Define another signature for summarization
class Summarize(dspy.Signature):
    """Summarize the given text."""
    text = dspy.InputField(desc="text to summarize")
    summary = dspy.OutputField()

# Create a pipeline by composing modules
class ComplexPipeline(dspy.Module):
    def __init__(self):
        super().__init__()
        self.qa = dspy.Program(BasicQA)
        self.summarize = dspy.Program(Summarize)

    def forward(self, context, question):
        answer = self.qa(context=context, question=question).answer
        summary = self.summarize(text=answer).summary
        return dspy.Prediction(final_summary=summary)

# Initialize LLM and compile the pipeline
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# compiled_pipeline = dspy.compile(ComplexPipeline())

# Example usage (requires context and question)
# result = compiled_pipeline(context="DSPy simplifies LLM development.", question="What does DSPy do?")
# print(result.final_summary)
```

--------------------------------

### Math Reasoning with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial focuses on enhancing mathematical reasoning capabilities using DSPy. It likely involves structuring problems and guiding the model through step-by-step solutions.

```Python
import dspy

# Example of math reasoning with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class MathReasoner(dspy.Module):
    def __init__(self):
        super().__init__()
        self.solve = dspy.ChainOfThought(dspy.Program)

    def forward(self, math_problem):
        solution = self.solve(problem=math_problem)
        return solution

# Usage example (placeholder)
# reasoner = MathReasoner()
# problem = 'What is 2 + 2 * 3?'
# result = reasoner(problem)
# print(f'Solution: {result}')
```

--------------------------------

### Async Tool Execution with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/async/index.md

Shows how to integrate and execute asynchronous functions as DSPy tools using `acall()`. This is beneficial for I/O-bound operations or external service integrations.

```Python
import asyncio
import dspy
import os

os.environ["OPENAI_API_KEY"] = "your_api_key"

async def foo(x):
    # Simulate an async operation
    await asyncio.sleep(0.1)
    print(f"I get: {x}")

# Create a tool from the async function
tool = dspy.Tool(foo)

async def main():
    # Execute the tool asynchronously
    await tool.acall(x=2)

asyncio.run(main())
```

--------------------------------

### Setup LM with OpenAI API Key - Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet sets up the dspy language model using an OpenAI API key. It prompts the user for their API key and configures dspy to use the specified language model.

```python
api_key = input("Enter your OpenAI API key: ")
import dspy
lm = dspy.LM("openai/gpt-4.1-nano", temperature=1, api_key=api_key)
dspy.configure(lm=lm)
```

--------------------------------

### Save and Load DSPy Optimized Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Demonstrates how to save an optimized DSPy program to a local file and then load it back for later use. It also shows how to instantiate and load a program with specific tools and configurations.

```Python
optimized_react.save("optimized_react.json")

loaded_react = dspy.ReAct("claim -> titles: list[str]", tools=[search_wikipedia, lookup_wikipedia], max_iters=20)
loaded_react.load("optimized_react.json")

loaded_react(claim="The author of the 1960s unproduced script written for The Beatles, Up Against It, and Bernard-Marie Koltès are both playwrights.").titles
```

--------------------------------

### DSPy GEPA Alternating Half Component Selector Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/GEPA_Advanced.md

An example Python function demonstrating a custom component selector for DSPy's GEPA. This selector alternates between optimizing the first and second halves of the components based on the current iteration number, providing a simple strategy for exploration.

```python
def alternating_half_selector(state, trajectories, subsample_scores, candidate_idx, candidate):
    """Optimize half the components on even iterations, half on odd iterations."""
    components = list(candidate.keys())

    if len(components) <= 1:
        return components

    mid_point = len(components) // 2

    if state.i % 2 == 0:
        return components[:mid_point]
    else:
        return components[mid_point:]
```

--------------------------------

### DSPy: Program Optimization (Signature)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to optimize a dspy program by automatically generating or refining its signature using the Signature optimizer.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
# llm = dspy.OpenAI(model="gpt-3.5-turbo")
# dspy.settings.configure(lm=llm)

# Define an initial signature
class InitialSignature(dspy.Signature):
    """Extract keywords from a text."""
    text: str
    keywords: str

# Create a module with the initial signature
class KeywordModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.keyword_extractor = dspy.Predict(InitialSignature)

    def forward(self, text):
        return self.keyword_extractor(text=text)

# Sample training data
train_data = [
    dspy.Example(text="DSPy is a framework for programming language models.", keywords="DSPy, framework, programming, language models")
]

# Instantiate the module
# module = KeywordModule()

# Optimize the signature using the Signature optimizer
# optimizer = dspy.SignatureOptimizer()
# optimized_module = optimizer.optimize(module, train_data=train_data, n=1)

# Now use the optimized_module for predictions
# result = optimized_module(text="Large language models are powerful AI tools.")
# print(result.keywords)
```

--------------------------------

### Define Signature for Documentation Query Generation - Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/GEPA_Advanced.md

This Python code defines a dspy Signature named 'GenerateDocumentationQuery'. It's designed to analyze examples with feedback, identify common issue patterns, and generate targeted database queries for retrieving relevant documentation. It takes the current instruction and examples with feedback as input, and outputs identified failure patterns and retrieval queries.

```python
import dspy
from gepa.core.adapter import ProposalFn
from dspy.teleprompt.gepa.gepa_utils import ReflectiveExample

class GenerateDocumentationQuery(dspy.Signature):
    """Analyze examples with feedback to identify common issue patterns and generate targeted database queries for retrieving relevant documentation.

    Your goal is to search a document database for guidelines that address the problematic patterns found in the examples. Look for recurring issues, error types, or failure modes in the feedback, then craft specific search queries that will find documentation to help resolve these patterns."""

    current_instruction = dspy.InputField(desc="The current instruction that needs improvement")
    examples_with_feedback = dspy.InputField(desc="Examples with their feedback showing what issues occurred and any recurring patterns")

    failure_patterns: str = dspy.OutputField(desc="Summarize the common failure patterns identified in the examples")

    retrieval_queries: list[str] = dspy.OutputField(desc="Specific search queries to find relevant documentation in the database that addresses the common issue patterns identified in the problematic examples")
```

--------------------------------

### Start MLflow Run and Log DSPy Model

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

This snippet demonstrates how to initiate an MLflow run with a specific name and log a DSPy model. The model is saved to a specified artifact path within the MLflow run. Dependencies include the 'mlflow' library.

```Python
import mlflow

with mlflow.start_run(run_name="optimized_rag"):
    model_info = mlflow.dspy.log_model(
        optimized_react,
        artifact_path="model"
    )
```

--------------------------------

### Build Memory-Enabled ReAct Agents with Mem0

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/real_world_examples/index.md

Create conversational agents with persistent memory using DSPy ReAct and Mem0 integration for context-aware interactions across sessions. This focuses on memory systems, conversational AI, and agent persistence.

```Python
# Example usage for Mem0 integration (conceptual)
# Assumes DSPy ReAct agent and Mem0 are configured

# import dspy
# from dspy.ுங்கள் import Module
# from mem0 import Mem0

# # Initialize Mem0 memory
# memory = Mem0()

# # Define a DSPy ReAct agent that uses memory
# class ConversationalAgent(dspy.Module):
#     def __init__(self, memory_backend):
#         super().__init__()
#         self.memory = memory_backend
#         # Define ReAct signature and optimizer
#         self.react = dspy.ReAct(my_signature)

#     def forward(self, user_input):
#         # Retrieve relevant context from memory
#         context = self.memory.retrieve(user_input)
#         # Combine user input with context for the ReAct module
#         prompt = f"Context: {context}\nUser: {user_input}"
#         # Use the ReAct module to generate a response
#         response = self.react(prompt)
#         # Store the interaction in memory
#         self.memory.add(user_input, response.output)
#         return response

# # Placeholder for agent interaction
# def run_agent_with_memory(user_query):
#     agent = ConversationalAgent(memory_backend=memory)
#     # Compile the agent (e.g., with a specific optimizer)
#     compiled_agent = dspy.settings.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))(agent)
#     response = compiled_agent(user_query)
#     print(f"Agent response: {response.output}")

# print("Tutorial: Memory-Enabled ReAct Agents with Mem0")
# print("Key Concepts: Memory systems, conversational AI, agent persistence")

```

--------------------------------

### DSPy ProgramOfThought Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Demonstrates DSPy's ProgramOfThought module, which allows for more complex reasoning. It shows how to initialize ProgramOfThought with a signature and call it with a question, printing the final predicted answer.

```python
pot = dspy.ProgramOfThought(BasicQA)

question = 'Sarah has 5 apples. She buys 7 more apples from the store. How many apples does Sarah have now?'
result = pot(question=question)

print(f"Question: {question}")
print(f"Final Predicted Answer (after ProgramOfThought process): {result.answer}")
```

--------------------------------

### DSPy: Program Optimization (ProgramHarness)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to use ProgramHarness to evaluate and optimize dspy programs. It allows for systematic testing and improvement of program performance.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
# llm = dspy.OpenAI(model="gpt-3.5-turbo")
# dspy.settings.configure(lm=llm)

# Define a signature
class QuestionAnsweringSignature(dspy.Signature):
    """Answer a question based on the provided context."""
    context: str
    question: str
    answer: str

# Create a module
class QA_Module(dspy.Module):
    def __init__(self):
        super().__init__()
        self.qa_predictor = dspy.Predict(QuestionAnsweringSignature)

    def forward(self, context, question):
        return self.qa_predictor(context=context, question=question)

# Sample training data
train_data = [
    dspy.Example(
        context="The Eiffel Tower is located in Paris, France.",
        question="Where is the Eiffel Tower located?",
        answer="Paris, France"
    )
]

# Instantiate the module
# module = QA_Module()

# Use ProgramHarness to evaluate and potentially optimize
# harness = dspy.ProgramHarness(metric=dspy.Accuracy())
# evaluation_results = harness.evaluate(module, train_data, n=1)

# print(evaluation_results)

# You can also use optimizers with ProgramHarness
# optimizer = dspy.BootstrapFewShot(metric=dspy.Accuracy())
# optimized_module = harness.optimize(optimizer, module, train_data, n=1)
# print("Optimized module predictions:")
# result = optimized_module(context="The Colosseum is in Rome.", question="Where is the Colosseum?")
# print(result.answer)
```

--------------------------------

### Clone DSPy Repository

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

Clones the DSPy repository from a specified URL to your local machine. Replace '{url-to-your-fork}' with the actual URL of your forked repository.

```shell
git clone {url-to-your-fork}
cd dspy
```

--------------------------------

### Configure Local LM via SGLang Server

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/language_models.md

Sets up a local language model served through SGLang. This requires installing SGLang and launching its server, then connecting DSPy to the OpenAI-compatible endpoint.

```bash
> pip install "sglang[all]"
> pip install flashinfer -i https://flashinfer.ai/whl/cu121/torch2.4/ 

> CUDA_VISIBLE_DEVICES=0 python -m sglang.launch_server --port 7501 --model-path meta-llama/Meta-Llama-3-8B-Instruct
```

```python
lm = dspy.LM("openai/meta-llama/Meta-Llama-3-8B-Instruct",
 api_base="http://localhost:7501/v1",  # ensure this points to your port
 api_key="", model_type='chat')
dspy.configure(lm=lm)
```

--------------------------------

### dspy.BootstrapFinetune Get Params Method

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/BootstrapFinetune.md

The `get_params` method retrieves the parameters of a language model or a DSPy program. This is useful for inspecting the state of the model or understanding its learned weights.

```python
dspy.BootstrapFinetune.get_params(program, ...)
```

--------------------------------

### MLflow DSPy Integration Setup

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/custom_module/index.ipynb

Sets up the MLflow tracking URI to 'http://localhost:5000' and defines the MLflow experiment name as 'DSPy'. This connects the notebook to the running MLflow UI.

```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
```

--------------------------------

### Display AIME Dataset Split Sizes

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

This code snippet initializes the AIME dataset using the `init_dataset` function and then prints the number of examples in the training, validation, and test sets. It helps verify the dataset splitting process.

```python
train_set, val_set, test_set = init_dataset()

len(train_set), len(val_set), len(test_set)
```

--------------------------------

### DSPy Dataset Shuffle and Sample Method

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/built-in-datasets.md

The '_shuffle_and_sample' method in DSPy's Dataset class handles the core logic for shuffling data (if enabled) and selecting a specified number of samples. It also converts each raw data example into a DSPy Example object, adding a unique ID and split information.

```Python
import random
import uuid

from dspy import Example

class Dataset:
    def __init__(self, train_data, test_data, dev_data, train_size, do_shuffle=True, train_seed=0):
        self._train = train_data
        self._test = test_data
        self._dev = dev_data
        self.train_size = train_size
        self.do_shuffle = do_shuffle
        self.train_seed = train_seed

    @property
    def train(self):
        if not hasattr(self, '_train_'):
            self._train_ = self._shuffle_and_sample('train', self._train, self.train_size, self.train_seed)

        return self._train_

    def _shuffle_and_sample(self, split, data, size, seed=0):
        data = list(data)
        base_rng = random.Random(seed)

        if self.do_shuffle:
            base_rng.shuffle(data)

        data = data[:size]
        output = []

        for example in data:
            output.append(Example(**example, dspy_uuid=str(uuid.uuid4()), dspy_split=split))
        
        return output

# Example Usage (assuming you have train_data, test_data, dev_data defined)
# dataset = Dataset(train_data=..., test_data=..., dev_data=..., train_size=100)
# processed_data = dataset._shuffle_and_sample('train', dataset._train, dataset.train_size)

```

--------------------------------

### DSPy: Using Optimizers for Prompt Tuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example demonstrates the use of DSPy's optimizers to automatically tune prompts for improved performance. Optimizers like `BootstrapFewShot` or `CO` can be used to find better prompts and module configurations, reducing the manual effort in prompt engineering.

```Python
import dspy

# Assuming 'gpt3' is a configured DSPy language model
# dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

class SimpleModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.signature = dspy.Signature('question -> answer')

    def forward(self, question):
        return dspy.Predict(self.signature)(question=question)

# Initialize the module
module = SimpleModule()

# Use an optimizer to tune the module
# optimizer = dspy.BootstrapFewShot(metric=dspy.AnswerAccuracy())
# optimized_module = optimizer.optimize(module, trainset=[...])

# For demonstration, we'll just show the module initialization
# In a real scenario, you would call optimizer.optimize()
print("Module initialized. Ready for optimization.")

```

--------------------------------

### DSPy: Using a Teleport Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example showcases the use of a 'Teleport' module within DSPy, which is designed for efficient data transfer or state management in LLM pipelines.

```Python
import dspy

# Assuming 'teleport' is a custom DSPy module or a standard one
# The exact implementation would depend on the DSPy version and available modules.
# This is a conceptual representation.

# Example of how a teleport module might be integrated:
# class MyModuleWithTeleport(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.teleport = dspy.Teleport() # Or a specific teleport implementation
#         self.predict = dspy.Predict(MySignature)

#     def forward(self, input_data):
#         # Use teleport to manage state or data flow
#         teleported_data = self.teleport(input_data)
#         output = self.predict(teleported_data)
#         return output

# This snippet is illustrative as the exact 'teleport' usage requires specific context
# within the DSPy framework's module system.
```

--------------------------------

### dspy Evaluation Output Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

This section displays a typical output from the `dspy.evaluate.evaluate` function. It shows a pandas DataFrame summarizing the results for multiple problem instances, including the problem statement, example answer, generated reasoning, predicted answer, and a metric indicating correctness. This output helps in analyzing the performance of the optimized model.

```text
Output:
Average Metric: 85.00 / 150 (56.7%): 100%|██████████████████████████████████████████████████████████████████████████████████████████████████| 150/150 [00:00<00:00, 476.89it/s]

```

```text
Output:
2025/08/12 23:53:14 INFO dspy.evaluate.evaluate: Average Metric: 85 / 150 (56.7%)

```

```text
Result:
                                                                   problem  \
0    Find the sum of all integer bases $b>9$ for which $17_b$ is a divi...   
1    On $\triangle ABC$ points $A, D, E$, and $B$ lie in that order on ...   
2    The 9 members of a baseball team went to an ice-cream parlor after...   
3    Find the number of ordered pairs $(x,y)$, where both $x$ and $y$ a...   
4    There are $8!= 40320$ eight-digit positive integers that use each ...   
..                                                                     ...   
145  Let $S$ be the set of vertices of a regular $24$-gon. Find the num...   
146  Let $A_1 A_2 A_3 \ldots A_{11}$ be an $11$-sided non-convex simple...   
147  Let $x_1, x_2, x_3, \ldots$ be a sequence of rational numbers defi...   
148  Let $\triangle ABC$ be a right triangle with $\angle A = 90^\circ$...   
149  There are exactly three positive real numbers $k$ such that the fu...   

     example_answer  \
0                70   
1               588   
2                16   
3               117   
4               279   
..              ...   
145             113   
146              19   
147             248   
148             104   
149             240   

                                                                 reasoning  \
0    - Interpret the numbers in base \( b \): \[ 17_b = 1 \cdot b + 7 =...   
1    1. Set up coordinate system: - Place \( A \) at the origin \((0,0)...   
2    - We have 9 players and 3 flavors: Chocolate (C), Vanilla (V), Str...   
3    We need to find all integer pairs \((x,y)\) with \(x,y \in [-100, ...   
4    - We consider all 8-digit numbers using each of the digits 1 throu...   
..                                                                     ...   
145  - The problem is to find the number of ways to pair up the 24 vert...   
146  We are given a simple polygon \(A_1 A_2 \dots A_{11}\) with vertic...   
147  Given the recurrence: \[ x_1 = \frac{25}{11}, \quad x_{k+1} = \fra...   
148  - Given the right triangle \( \triangle ABC \) with right angle at...   
149  We are given \[ f(x) = \frac{(x-18)(x-72)(x-98)(x-k)}{x}, \quad x>...   

    pred_answer  metric  
0            70  ✔️ [1]  
1           588  ✔️ [1]  
2            16  ✔️ [1]  
3           117  ✔️ [1]  
4           567          
..          ...     ...  
145          11          
146          19  ✔️ [1]  
147         728          
148         104  ✔️ [1]  
149         252          

[150 rows x 5 columns]

```

```text
Result:
EvaluationResult(score=56.67, results=<list of 150 results>)
```

--------------------------------

### Define and Run ChainOfThought Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Defines a simple DSPy ChainOfThought module that maps a 'question' to an 'answer'. It then executes this module with a sample question from the dataset.

```python
module = dspy.ChainOfThought("question -> answer")
module(question=example.question)
```

--------------------------------

### DSPy Pipeline Definition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example illustrates how to construct a data processing pipeline using DSPy. It shows the composition of multiple transformations to create a more complex workflow, emphasizing modularity and reusability.

```Python
import dspy

@dspy.transform
def to_uppercase(strings: list[str]) -> list[str]:
    return [s.upper() for s in strings]

@dspy.transform
def add_prefix(strings: list[str], prefix: str) -> list[str]:
    return [f"{prefix}{s}" for s in strings]

# Define a pipeline
my_pipeline = dspy.Pipeline(to_uppercase, add_prefix, prefix="DSPY_")

# Example usage
input_data = ["data", "science", "framework"]
output_data = my_pipeline(input_data)
print(output_data)

```

--------------------------------

### Text Classification Systems with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Build robust text classification systems using DSPy's modular approach. This example focuses on topic classification.

```Python
import dspy

# Example for Text Classification
class TopicClassifier(dspy.Module):
    def __init__(self, classes=['Technology', 'Sports', 'Politics']):
        super().__init__()
        self.classes = classes
        # Using a ChainOfThought for classification, specifying the output format
        self.classify = dspy.ChainOfThought(dspy.Predict(
            "Classify the following text into one of these categories: {classes}. Text: {text}",
            classes=self.classes
        ))

    def forward(self, text):
        classification = self.classify(text=text, classes=self.classes)
        return classification

# Setup and usage:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)
# classifier = TopicClassifier()
# text_to_classify = "The latest iPhone model features a new A17 Bionic chip."
# print(classifier(text_to_classify))
```

--------------------------------

### Prepare HotPotQA Dataset with Input Keys

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/built-in-datasets.md

Shows how to prepare the loaded HotPotQA dataset by setting the 'question' as the input key for each example in both the training and development sets. This step is necessary for DSPy to correctly process the data within a pipeline.

```python
trainset = [x.with_inputs('question') for x in dataset.train]
devset = [x.with_inputs('question') for x in dataset.dev]

print(trainset)
```

--------------------------------

### DSPy Optimizer (BootstrapFewShot)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates using a DSPy optimizer to improve a program's performance through few-shot learning. BootstrapFewShot automatically generates few-shot examples.

```Python
import dspy

# Assuming llm is configured as shown previously

# Define a program that can be optimized
class OptimizableProgram(dspy.Program):
    def __init__(self):
        super().__init__()
        self.qa = SimpleQA() # Assuming SimpleQA is defined

    def forward(self, context, question):
        return self.qa(context=context, question=question)

# Create an optimizer
optimizer = dspy.BootstrapFewShot(metric=dspy.ExactMatch())

# Optimize the program
optimized_program = optimizer.optimize(OptimizableProgram(), n=5, trainset=[...]) # trainset should be a list of (context, question, answer) tuples

# Use the optimized program
# result = optimized_program(context=context, question=question)
# print(result.answer)
```

--------------------------------

### Prepare DSPy Dataset Examples

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Prepares a specified slice of a dataset split for use with DSPy. It transforms each selected row into a `dspy.Example` object, including the tokens and the extracted people entities as the expected output, and marks 'tokens' as the input field.

```Python
import dspy

def prepare_dataset(data_split, start: int, end: int) -> list[dspy.Example]:
    """
    Prepares a sliced dataset split for use with DSPy.
    
    Args:
        data_split: The dataset split (e.g., train or test).
        start (int): Starting index of the slice.
        end (int): Ending index of the slice.
    
    Returns:
        list[dspy.Example]: List of DSPy Examples with tokens and expected labels.
    """
    return [
        dspy.Example(
            tokens=row["tokens"],
            expected_extracted_people=extract_people_entities(row)
        ).with_inputs("tokens")
        for row in data_split.select(range(start, end))
    ]
```

--------------------------------

### Stage and Commit Code

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

Stages all changes and commits them with a message. The pre-commit hook will automatically run to check and fix common issues.

```shell
git add .
git commit -m "your commit message"
```

--------------------------------

### CodeAct Limitation: Dependent Functions

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/modules/CodeAct.md

Explains that all dependent functions must be passed to dspy.CodeAct. The 'NG' example shows a case where dependent functions ('Profile', 'secret_function') are not passed, while the 'OK' example demonstrates the correct approach by passing all necessary functions.

```python
# ❌ NG
from pydantic import BaseModel

class Profile(BaseModel):
    name: str
    age: int
    
def age(profile: Profile):
    return 

def parent_function():
    print("Hi!")

def child_function():
    parent_function()

dspy.CodeAct("question -> answer", tools=[age, child_function])
```

```python
# ✅ OK

def parent_function():
    print("Hi!")

def child_function():
    parent_function()

dspy.CodeAct("question -> answer", tools=[parent_function, child_function])
```

--------------------------------

### Basic dspy Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the fundamental structure of a dspy program, including defining a signature and a module. This serves as a starting point for building more complex language model applications.

```Python
import dspy

# Define a signature for your program
class BasicSignature(dspy.Signature):
    """A simple signature for demonstration."""
    input_text: str
    output_text: str

# Create a dspy module using the signature
class BasicModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.basic_signature = dspy.ChainOfThought(BasicSignature)

    def forward(self, input_text):
        prediction = self.basic_signature(input_text=input_text)
        return prediction

# Example usage (assuming a language model is configured)
# predictor = BasicModule()
# result = predictor(input_text="Hello, world!")
# print(result.output_text)
```

--------------------------------

### DSPy Basic Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental usage of the DSPy framework. It shows how to define a simple language model pipeline, compile it, and execute it to get a response. DSPy aims to automate prompt optimization and module selection.

```Python
import dspy

# Configure the language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a simple DSPy program
class BasicQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.qa = dspy.ChainOfThought(dspy.Answer)

    def forward(self, question):
        return self.qa(question=question)

# Instantiate the program
basic_qa = BasicQA()

# Compile the program (optimizes prompts and modules)
compiled_basic_qa = basic_qa.compile(llm=llm)

# Execute the compiled program
question = "What is the capital of France?"
result = compiled_basic_qa(question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### DSPy: Optimizing LLM Calls with Signatures

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how DSPy's signature-based approach can be used to structure and optimize interactions with LLMs. This example focuses on creating a more complex chain for a specific task, highlighting the library's flexibility.

```Python
import dspy

# Assume llm is already configured
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

class SummarizeAndExtract(dspy.Module):
    def __init__(self, dspy_llm):
        super().__init__()
        self.summarize = dspy.Chain(dspy.Signature(
            """Summarize the following text.""",
            text=dspy.InputField(),
            summary=dspy.OutputField()
        ))
        self.extract_keywords = dspy.Chain(dspy.Signature(
            """Extract keywords from the following text.""",
            text=dspy.InputField(),
            keywords=dspy.OutputField()
        ))

    def forward(self, text):
        summary = self.summarize(text=text).summary
        keywords = self.extract_keywords(text=text).keywords
        return dspy.Prediction(summary=summary, keywords=keywords)

# Example usage
long_text = "DSPy is a Python framework designed to help developers program large language models (LLMs). It aims to simplify the process of building, optimizing, and deploying LLM-powered applications by providing a structured approach to prompt engineering and model interaction."

# Instantiate the module
processor = SummarizeAndExtract(dspy_llm=dspy.settings.lm)

# Get prediction
result = processor(text=long_text)

print(f"Summary: {result.summary}")
print(f"Keywords: {result.keywords}")
```

--------------------------------

### DSPy Manual Tool Handling Setup

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/tools.md

Shows how to manually handle tool calls in DSPy. It defines a custom signature for tool handling, creates tool functions (weather, calculator), wraps them with dspy.Tool, and demonstrates making a prediction and executing the tool calls based on the model's response.

```python
import dspy

class ToolSignature(dspy.Signature):
    """Signature for manual tool handling."""
    question: str = dspy.InputField()
    tools: list[dspy.Tool] = dspy.InputField()
    outputs: dspy.ToolCalls = dspy.OutputField()

def weather(city: str) -> str:
    """Get weather information for a city."""
    return f"The weather in {city} is sunny"

def calculator(expression: str) -> str:
    """Evaluate a mathematical expression."""
    try:
        result = eval(expression)  # Note: Use safely in production
        return f"The result is {result}"
    except:
        return "Invalid expression"

# Create tool instances
tools = {
    "weather": dspy.Tool(weather),
    "calculator": dspy.Tool(calculator)
}

# Create predictor
predictor = dspy.Predict(ToolSignature)

# Make a prediction
response = predictor(
    question="What's the weather in New York?",
    tools=list(tools.values())
)

# Execute the tool calls
for call in response.outputs.tool_calls:
    if call.name in tools:
        result = tools[call.name](**call.args)
        print(f"Tool: {call.name}")
        print(f"Args: {call.args}")
        print(f"Result: {result}")
```

--------------------------------

### Run Financial Analysis Demo

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/yahoo_finance_react/index.md

A Python function to demonstrate the financial analysis agent. It initializes the agent and runs it with several example financial queries, printing the analysis results.

```python
def run_financial_demo():
    """Demo of the financial analysis agent."""
    
    # Initialize agent
    agent = FinancialAnalysisAgent()
    
    # Example queries
    queries = [
        "What's the latest news about Apple (AAPL) and how might it affect the stock price?",
        "Compare AAPL, GOOGL, and MSFT performance",
        "Find recent Tesla news and analyze sentiment"
    ]
    
    for query in queries:
        print(f"Query: {query}")
        response = agent(financial_query=query)
        print(f"Analysis: {response.analysis_response}")
        print("-" * 50)

# Run the demo
if __name__ == "__main__":
    run_financial_demo()
```

--------------------------------

### Get User Information

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

Fetches user profile information from the database using their name.

```APIDOC
## POST /get_user_info

### Description
Fetch the user profile from database with given name.

### Method
POST

### Endpoint
/get_user_info

### Parameters
#### Request Body
- **name** (string) - Required - The name of the user to retrieve.

### Request Example
```json
{
  "name": "Adam"
}
```

### Response
#### Success Response (200)
- **user_profile** (object) - The user's profile information.
  - **user_id** (string) - Unique identifier for the user.
  - **name** (string) - User's full name.
  - **email** (string) - User's email address.

#### Response Example
```json
{
  "user_profile": {
    "user_id": "user001",
    "name": "Adam",
    "email": "adam@example.com"
  }
}
```
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the basic usage of the DSPy library, including initializing a language model, defining a signature, and compiling a program. This is fundamental for any DSPy application.

```Python
import dspy

# Initialize a language model (e.g., OpenAI)
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a simple question-answering task
class BasicQA(dspy.Signature):
    """Answer the question based on the context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Compile a simple program using the signature
qa_program = dspy.Program(BasicQA)

# Example usage (requires actual context and question)
# result = qa_program(context="DSPy is a framework for LLM applications.", question="What is DSPy?")
# print(result.answer)
```

--------------------------------

### DSPy Optimizers

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to use DSPy's built-in optimizers to improve program performance. This example uses the BootstrapFewShot optimizer.

```Python
import dspy

# Assume BasicQA signature and a dataset are defined

# Initialize LLM
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a simple program
# class SimpleProgram(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.predict = dspy.Predict(BasicQA)
#
#     def forward(self, context, question):
#         return self.predict(context=context, question=question)

# Compile the program with an optimizer
# compiled_program = dspy.compile(SimpleProgram(), optimizer=dspy.BootstrapFewShot())

# Example usage (requires a dataset for optimization)
# compiled_program.compile(dataset=your_training_data, train1=True, eval_kwargs={'num_threads': 1, 'display_progress': True})
# print(compiled_program.program.signatures[0].instructions)
```

--------------------------------

### Run MCP Agent

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

Executes the main loop of the MCP agent when the script is run directly. This starts the agent's operation.

```Python
if __name__ == "__main__":
    mcp.run()
```

--------------------------------

### Get User Info API

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

Fetches a user's profile information from the database using their name.

```APIDOC
## GET /get_user_info

### Description
Fetch the user profile from database with given name.

### Method
GET

### Endpoint
/get_user_info

### Parameters
#### Query Parameters
- **name** (string) - Required - The name of the user to retrieve information for.

### Request Example
```json
{
  "name": "Adam"
}
```

### Response
#### Success Response (200)
- **user_profile** (object) - The user's profile information.
  - **user_id** (string) - Unique identifier for the user.
  - **name** (string) - The user's full name.
  - **email** (string) - The user's email address.

#### Response Example
```json
{
  "user_profile": {
    "user_id": "user123",
    "name": "Adam",
    "email": "adam@example.com"
  }
}
```
```

--------------------------------

### DSPy Signatures and Modules

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example showcases how to define custom signatures and chain them together using dspy modules. It illustrates creating more complex pipelines by composing simpler language model interactions.

```Python
import dspy

# Assume llm is already initialized as in the previous example
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for extracting keywords
class KeywordExtractor(dspy.Signature):
    """Extract keywords from the given text."""
    text = dspy.InputField()
    keywords = dspy.OutputField()

# Define a signature for summarizing text
class Summarizer(dspy.Signature):
    """Summarize the provided text."""
    text = dspy.InputField()
    summary = dspy.OutputField()

# Create a dspy module that chains keyword extraction and summarization
class KeywordSummarizer(dspy.Module):
    def __init__(self, llm):
        super().__init__()
        self.extract_keywords = dspy.Program(KeywordExtractor)
        self.summarize = dspy.Program(Summarizer)

    def forward(self, text):
        keywords_result = self.extract_keywords(text=text)
        combined_text = text + "\nKeywords: " + keywords_result.keywords
        summary_result = self.summarize(text=combined_text)
        return summary_result

# Instantiate and compile the module
keyword_summarizer_program = KeywordSummarizer(llm=llm)
compiled_keyword_summarizer = keyword_summarizer_program.compile(llm=llm)

# Example usage
input_text = "DSPy is a Python framework that helps developers program large language models. It simplifies prompt engineering and model deployment."

result = compiled_keyword_summarizer(text=input_text)
print(result.summary)
```

--------------------------------

### Configure DSPy with Local and External LMs

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Initializes the Arbor server and configures DSPy to use a local LM (Qwen/Qwen2.5-7B-Instruct) via Arbor and an external OpenAI LM (gpt-4.1-mini). It sets up the API base for the Arbor provider.

```python
import dspy
from dspy.clients.lm_local_arbor import ArborProvider

import arbor
arbor_server_info = arbor.init() # Initialize the Arbor server in the background

port = 7453
local_lm_name = "Qwen/Qwen2.5-7B-Instruct"
local_lm = dspy.LM(
    model=f"openai/arbor:{local_lm_name}",
    provider=ArborProvider(),
    temperature=0.7,
    api_base=arbor_server_info["api_base"],
)

dspy.configure(lm=local_lm)

openai_lm = dspy.LM(model="openai/gpt-4.1-mini")

```

--------------------------------

### DSPy with FastAPI for RAG

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/community/use-cases.md

This repository demonstrates how to integrate DSPy with FastAPI and Ollama to build a Retrieval-Augmented Generation (RAG) system. It provides a practical example of creating a RAG pipeline with these technologies.

```python
from fastapi import FastAPI
import dspy

# Initialize DSPy with a language model (e.g., Ollama)
# Ensure Ollama is running and the model is available
# llm = dspy.Ollama(model='llama2')

# Define a DSPy program for RAG
class RAG(dspy.Module):
    def __init__(self, retriever):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=3)
        self.generate_answer = dspy.ChainOfThought(dspy.Signature(
            "answer questions based on retrieved context",
            "context: str, question: str -> answer: str"
        ))

    def forward(self, question):
        context = self.retrieve(query=question)
        return self.generate_answer(context=context.passages, question=question)

# Initialize FastAPI app
# app = FastAPI()

# Example of how you might integrate DSPy with FastAPI
# @app.post('/generate')
# async def generate_response(query: str):
#     # Assuming retriever is initialized elsewhere
#     # rag_program = RAG(retriever=your_retriever)
#     # result = rag_program(question=query)
#     # return {"answer": result.answer}
#     pass

```

--------------------------------

### Get User Info API

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

Fetches user profile information from the database using the user's name.

```APIDOC
## GET /get_user_info

### Description
Fetch the user profile from database with given name.

### Method
GET

### Endpoint
/get_user_info

### Parameters
#### Query Parameters
- **name** (string) - Required - The name of the user to retrieve information for.

### Request Example
```json
{
  "name": "Adam"
}
```

### Response
#### Success Response (200)
- **user_profile** (object) - The user's profile information.
  - **user_id** (string) - The unique identifier for the user.
  - **name** (string) - The name of the user.
  - **email** (string) - The email address of the user.

#### Response Example
```json
{
  "user_profile": {
    "user_id": "USER456",
    "name": "Adam",
    "email": "adam@example.com"
  }
}
```
```

--------------------------------

### Build AI Agents with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Learn to create intelligent agents for customer service scenarios using DSPy. This tutorial covers understanding context, maintaining conversation state, and providing helpful responses.

```Python
import dspy

# Example of a simple agent
class CustomerServiceAgent(dspy.Module):
    def __init__(self):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=3)
        self.generate_response = dspy.ChainOfThought(dspy.Answer)

    def forward(self, question):
        context = self.retrieve(question)
        response = self.generate_response(context=context, question=question)
        return response

# To use this agent, you would typically set up a DSPy pipeline
# For example:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)
# agent = CustomerServiceAgent()
# print(agent('How can I reset my password?'))
```

--------------------------------

### KNNFewShot Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Shows how to use the KNNFewShot optimizer for few-shot learning. It requires a SentenceTransformer model for vectorization and compiles a DSPy program.

```python
from sentence_transformers import SentenceTransformer
from dspy import Embedder
from dspy.teleprompt import KNNFewShot
from dspy import ChainOfThought

knn_optimizer = KNNFewShot(k=3, trainset=trainset, vectorizer=Embedder(SentenceTransformer("all-MiniLM-L6-v2").encode))

qa_compiled = knn_optimizer.compile(student=ChainOfThought("question -> answer"))
```

--------------------------------

### Define Signature for RAG-Enhanced Instruction Generation - Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/GEPA_Advanced.md

This Python code defines a dspy Signature named 'GenerateRAGEnhancedInstruction'. This signature is responsible for generating improved instructions by combining retrieved documentation with an analysis of provided examples. It takes the current instruction, relevant documentation, and examples with feedback as input, and outputs an improved instruction.

```python
class GenerateRAGEnhancedInstruction(dspy.Signature):
    """Generate improved instructions using retrieved documentation and examples analysis."""

    current_instruction = dspy.InputField(desc="The current instruction that needs improvement")
    relevant_documentation = dspy.InputField(desc="Retrieved guidelines and best practices from specialized documentation")
    examples_with_feedback = dspy.InputField(desc="Examples showing what issues occurred with the current instruction")

    improved_instruction: str = dspy.OutputField(desc="Enhanced instruction that incorporates retrieved guidelines and addresses the issues shown in the examples")
```

--------------------------------

### Optimize DSPy Program with BootstrapFewShotWithRandomSearch

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Optimizes the `spoken_qa` program using the `BootstrapFewShotWithRandomSearch` optimizer, configuring it with a maximum of 2 bootstrapped and labeled demonstrations for improved performance.

```python
optimizer = dspy.BootstrapFewShotWithRandomSearch(metric = dspy.evaluate.answer_exact_match, max_bootstrapped_demos=2, max_labeled_demos=2, num_candidate_programs=5)

optimized_program = optimizer.compile(spoken_qa, trainset = trainset)

evaluate_program(optimized_program)
```

--------------------------------

### BestofN Module Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Illustrates the use of the `BestOfN` module, which runs a given module multiple times and selects the best output based on a reward function or threshold.

```python
import dspy

qa = dspy.ChainOfThought("question -> answer")
def one_word_answer(args, pred):
    return 1.0 if len(pred.answer) == 1 else 0.0
best_of_3 = dspy.BestOfN(module=qa, N=3, reward_fn=one_word_answer, threshold=1.0)
best_of_3(question="What is the capital of Belgium?").answer
# Brussels
```

--------------------------------

### DSPy Optimizers (BootstrapFewShot)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the use of DSPy optimizers, specifically BootstrapFewShot, to automatically generate and select few-shot examples for a given signature. This process helps in improving the performance of language models without manual prompt engineering.

```Python
import dspy

# Assume BasicQA signature is defined as above

# Initialize a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Create a DSPy program
qa_program = dspy.Chain(BasicQA)

# Compile the program using BootstrapFewShot optimizer
# This will automatically find good few-shot examples from a dataset
compiled_qa_program = qa_program.compile(
    llm=llm,
    teacher=dspy.BootstrapFewShot(                                
        metric=dspy.AnswerAccuracy(),  # Use AnswerAccuracy metric
        max_bootstrapped_demos=4       # Max number of demos to bootstrap
    )
)

# Execute the compiled program
question = "Who wrote Hamlet?"
result = compiled_qa_program(question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### Run Pre-commit Hooks Manually

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

Allows manual execution of pre-commit hooks. It can check only staged files or specific files for linting and formatting issues.

```shell
pre-commit run
pre-commit run --files path/to/file1.py path/to/file2.py
```

--------------------------------

### Finetuning Agents with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial focuses on finetuning AI agents built with DSPy. It covers adapting agent behavior and performance through targeted training on specific datasets.

```Python
import dspy

# Example of finetuning an agent with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.

# Assume 'agent_train_data' is available

# Define an agent module
class FinetunableAgent(dspy.Module):
    def __init__(self):
        super().__init__()
        self.act = dspy.Predict('input -> output')

    def forward(self, input):
        return self.act(input=input)

# Example of finetuning the agent (conceptual)
# agent = FinetunableAgent()
# optimizer = dspy.Optimizer(model=agent, train_data=agent_train_data)
# optimized_agent = optimizer.optimize()
# print('Agent finetuning complete.')
```

--------------------------------

### BootstrapFewShotWithOptuna Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Illustrates the usage of BootstrapFewShotWithOptuna for optimizing DSPy programs. This optimizer leverages Optuna for hyperparameter tuning and requires a metric, training set, and validation set.

```python
from dspy.teleprompt import BootstrapFewShotWithOptuna

fewshot_optuna_optimizer = BootstrapFewShotWithOptuna(metric=your_defined_metric, max_bootstrapped_demos=2, num_candidate_programs=8, num_threads=NUM_THREADS)

your_dspy_program_compiled = fewshot_optuna_optimizer.compile(student=your_dspy_program, trainset=trainset, valset=devset)
```

--------------------------------

### Async Predict with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/async/index.md

Demonstrates how to use the `acall()` method with `dspy.Predict` for asynchronous execution. This is useful for making non-blocking calls to language models.

```Python
import dspy
import asyncio
import os

os.environ["OPENAI_API_KEY"] = "your_api_key"

dspy.configure(lm=dspy.LM("openai/gpt-4o-mini"))
predict = dspy.Predict("question->answer")

async def main():
    # Use acall() for async execution
    output = await predict.acall(question="why did a chicken cross the kitchen?")
    print(output)


asyncio.run(main())
```

--------------------------------

### dspy Optimizer Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example demonstrates how to use a dspy optimizer to tune the parameters of a program. Optimizers are crucial for improving the performance and accuracy of LM applications.

```Python
from dspy.teleprompt import BootstrapFewShot

# Assuming 'my_program' is an instance of MyProgram
optimizer = BootstrapFewShot(metric=..., max_bootstrapped_demos=...)
optimized_program = optimizer.compile(my_program, trainset=...)
```

--------------------------------

### SIMBA Optimizer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Demonstrates the SIMBA (Stochastic Introspective Mini-Batch Ascent) optimizer for prompt optimization. It takes a DSPy program, training data, and configuration parameters like max_steps and max_demos.

```python
from dspy.teleprompt import SIMBA

simba = SIMBA(metric=your_defined_metric, max_steps=12, max_demos=10)

optimized_program = simba.compile(student=your_dspy_program, trainset=trainset)
```

--------------------------------

### Build Docker Image for MLflow Model

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Builds a Docker image for a logged MLflow model, preparing it for containerized deployment. Replace `{run_id}` with the actual run ID.

```bash
> mlflow models build-docker -m "runs:/{run_id}/model" -n "dspy-program"
```

--------------------------------

### Ensemble Compilation with BootstrapFewShotWithRandomSearch

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

This example shows how to use BootstrapFewShotWithRandomSearch to compile programs and then combine them using an Ensemble teleprompter with a majority voting reduction function.

```python
from dspy.teleprompt import BootstrapFewShotWithRandomSearch
from dspy.teleprompt.ensemble import Ensemble

fewshot_optimizer = BootstrapFewShotWithRandomSearch(metric=your_defined_metric, max_bootstrapped_demos=2, num_candidate_programs=8, num_threads=NUM_THREADS)
your_dspy_program_compiled = fewshot_optimizer.compile(student = your_dspy_program, trainset=trainset, valset=devset)

ensemble_optimizer = Ensemble(reduce_fn=dspy.majority)
programs = [x[-1] for x in your_dspy_program_compiled.candidate_programs]
your_dspy_program_compiled_ensemble = ensemble_optimizer.compile(programs[:3])
```

--------------------------------

### macOS Dependencies for Site Building

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/README.md

Optional dependencies for macOS users to ensure smooth documentation site building. Includes installing cairo and related libraries via Homebrew and setting an environment variable.

```bash
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

--------------------------------

### MCP Server Setup with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

Sets up a basic MCP server using FastAPI for an airline agent. It includes importing necessary libraries like `FastMCP` and `BaseModel` from `mcp.server.fastmcp` and `pydantic`, respectively. This server will manage user, flight, and ticket databases and provide tools for flight operations.

```Python
import random
import string

from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel

```

--------------------------------

### Python dspy Text Generation Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to use dspy in Python to generate text. This snippet likely involves setting up a dspy pipeline and calling a language model to produce output based on a prompt.

```Python
import dspy

# Assuming a dspy.Module is defined elsewhere
# Example: class MyGenerator(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.predict = dspy.Predict("input -> output")

# Initialize the dspy pipeline (replace with actual model setup)
# Example: dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Instantiate the generator
# generator = MyGenerator()

# Example usage (assuming 'prompt' is defined)
# result = generator(input=prompt)
# print(result.output)
```

--------------------------------

### Initialize Language Models and DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Configures the language models to be used, specifically 'gpt-4o-mini' for the agent and 'gpt-4o' for optimization. It also enables experimental features in DSPy.

```python
import dspy

gpt4o_mini = dspy.LM('gpt-4o-mini-2024-07-18')
gpt4o = dspy.LM('openai/gpt-4o')
dspy.configure(experimental=True)
```

--------------------------------

### DSPy Optimizer (BootstrapFewShot)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates using a DSPy optimizer, specifically BootstrapFewShot. Optimizers automatically tune prompts and examples to improve model performance on specific tasks.

```Python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for sentiment analysis
class SentimentAnalysis(dspy.Signature):
    """Classify the sentiment of the text as positive, negative, or neutral."""
    text = dspy.InputField()
    sentiment = dspy.OutputField(values=['positive', 'negative', 'neutral'])

# Create a module using the signature
class SentimentModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict_sentiment = dspy.Predict(SentimentAnalysis)

    def forward(self, text):
        return self.predict_sentiment(text=text)

# Create a dataset for training (example)
data = [
    {'text': 'DSPy is amazing!', 'sentiment': 'positive'},
    {'text': 'This is a terrible experience.', 'sentiment': 'negative'},
    {'text': 'The weather is okay.', 'sentiment': 'neutral'}
]

trainset = [dspy.Example(text=x['text'], sentiment=x['sentiment']) for x in data]

# Instantiate the module
module = SentimentModule()

# Optimize the module using BootstrapFewShot
optimizer = dspy.BootstrapFewShot(metric=dspy.Accuracy(), max_bootstrapped_demos=2)
optimized_module = optimizer.optimize(module, trainset=trainset)

# Use the optimized module
# result = optimized_module(text='DSPy makes LLM programming much easier!')
# print(result.sentiment)
```

--------------------------------

### dspy.teleprompt.gepa.gepa.GEPAFeedbackMetric

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/overview.md

Defines the feedback metric used by GEPA, which can accept textual feedback in addition to scalar scores to guide the optimization.

```APIDOC
## dspy.teleprompt.gepa.gepa.GEPAFeedbackMetric

### Description
This class defines the signature for a feedback metric that GEPA can use. It allows users to provide textual feedback alongside scalar scores to refine the optimization process.

### Method
- **__call__**: The primary method to be called for feedback. It takes the feedback and potentially other arguments to guide the optimization.

### Options
- **show_source**: Whether to show the source code of the members.
- **show_root_heading**: Whether to show the root heading for the class.
- **heading_level**: The heading level to use for the documentation.
- **docstring_style**: The style of docstrings to use (e.g., 'google').
- **show_root_full_path**: Whether to show the full path for the root object.
- **show_object_full_path**: Whether to show the full path for individual objects.
- **separate_signature**: Whether to separate the signature from the docstring.
- **inherited_members**: Whether to include inherited members.
```

--------------------------------

### Initialize and Prepare Dataset - Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This function initializes a dataset by loading it from a URL, parsing it as JSON, and converting it into dspy.Example objects. It then shuffles and splits the dataset into training, validation, and testing sets.

```python
import requests
import dspy
import json
import random

def init_dataset():
    # Load from the url
    url = "https://raw.githubusercontent.com/meta-llama/llama-prompt-ops/refs/heads/main/use-cases/facility-support-analyzer/dataset.json"
    dataset = json.loads(requests.get(url).text)
    dspy_dataset = [
        dspy.Example({
            "message": d['fields']['input'],
            "answer": d['answer'],
        }).with_inputs("message")
        for d in dataset
    ]
    random.Random(0).shuffle(dspy_dataset)
    train_set = dspy_dataset[:int(len(dspy_dataset) * 0.33)]
    val_set = dspy_dataset[int(len(dspy_dataset) * 0.33):int(len(dspy_dataset) * 0.66)]
    test_set = dspy_dataset[int(len(dspy_dataset) * 0.66):]

    return train_set, val_set, test_set
```

--------------------------------

### DSPy Metric for Evaluation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to define a custom metric for evaluating DSPy programs. This example uses ExactMatch for simple string comparison.

```Python
class ExactMatch(dspy.Metric):
    def __init__(self):
        super().__init__()

    def __call__(self, prediction, ground_truth, **kwargs):
        return prediction.answer.lower() == ground_truth.answer.lower()

```

--------------------------------

### dspy.Predict reset Method

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/modules/Predict.md

Resets the internal state of the predictor, clearing any history or cached information. Useful for starting fresh.

```python
predictor = dspy.Predict(
    ...
)

predictor.reset()
```

--------------------------------

### Evaluate Agent Performance

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Evaluates the performance of the agent (gpt4o) after setting verbose mode to false. This is typically done after initial setup or modifications.

```Python
agent_4o.verbose = False
evaluate(agent_4o)
```

--------------------------------

### Load and Prepare PUPA Dataset for DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_papillon/index.ipynb

Loads the PUPA dataset from Hugging Face Hub and prepares it for DSPy training. It selects specific splits ('pupa_tnb', 'pupa_new') and creates DSPy Examples, splitting the data into training, development, and testing sets.

```python
from datasets import load_dataset

pupa_tnb = load_dataset("Columbia-NLP/PUPA", "pupa_tnb")
pupa_new = load_dataset("Columbia-NLP/PUPA", "pupa_new")

examples = [
    dspy.Example(
        {"target_response": x["target_response"], "user_query": x["user_query"], "pii_str": x["pii_units"]}
    ).with_inputs("user_query")
    for x in pupa_new["train"]
]

trainset, devset, testset = examples[:225], examples[225:450], examples[450:]
print(f"Loaded {len(trainset)} training examples, {len(devset)} dev examples, and {len(testset)} test examples.")
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental usage of the dspy framework, including initializing a language model, defining a signature, and compiling a program. It highlights the core components and workflow for building dspy applications.

```Python
import dspy

# Initialize a language model (e.g., OpenAI's GPT-3.5 Turbo)
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a task (e.g., question answering)
class BasicQA(dspy.Signature):
    """Answer the question based on the provided context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Create a dspy program using the signature
qa_program = dspy.Program(BasicQA)

# Compile the program with the language model
compiled_qa = qa_program.compile(llm=llm)

# Example usage
context = "dspy is a Python library for programming LLMs."
question = "What is dspy?"

result = compiled_qa(context=context, question=question)
print(result.answer)
```

--------------------------------

### dspy Logging Output

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

Shows example log messages from the dspy library, indicating progress in evaluation and optimization of prompts. It includes timestamps, log levels, and specific details about metric averages and teleprompting iterations.

```log
2025/08/12 22:18:35 INFO dspy.evaluate.evaluate: Average Metric: 2.0 / 3 (66.7%)
2025/08/12 22:18:35 INFO dspy.teleprompt.gepa.gepa: Iteration 4: New subsample score is not better, skipping
2025/08/12 22:18:35 INFO dspy.teleprompt.gepa.gepa: Iteration 5: Selected program 1 score: 0.4222222222222222
Average Metric: 0.00 / 3 (0.0%): 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████| 3/3 [00:27<00:00,  9.33s/it]
2025/08/12 22:19:03 INFO dspy.evaluate.evaluate: Average Metric: 0.0 / 3 (0.0%)

2025/08/12 22:20:52 INFO dspy.teleprompt.gepa.gepa: Iteration 5: Proposed new text for predict: You will be given one math problem as plain text under a key like “problem.” Your job is to solve it correctly and return:

- reasoning: a concise, logically ordered solution that uses identities/structure to avoid brute force, ends with a quick verification.
- answer: the final requested number/expression only (no extra words).

Formatting:
- Use exactly two top-level fields named “reasoning” and “answer.”
- Keep reasoning succinct but complete. Bullet points are fine.
- The answer field must contain only the final value requested (e.g., 227, 585, 601).

General problem-solving guidance:
- Parse the problem type (e.g., base representation, intersecting families of subsets, avoiding arithmetic progressions, symmetric sums with constraints, ordered tuples counting).
- Always enforce domain constraints (e.g., base-b digits in 0..b−1; no leading zero for base-10 “three-digit”; ordered vs unordered families; strict increase conditions in sequences).
- Use algebraic identities and modular arithmetic to reduce the search space; prefer structural arguments over naive enumeration.
- For “greatest/least” questions, derive tight bounds and give a construction that attains them.

Domain-specific strategies and pitfalls (learned from typical contest problems and prior feedback):

1) Base-conversion/digit rearrangement:
- Translate positional notation correctly: in base b, (a b c)_b = a·b^2 + b·b + c; in base 10: abc = 100a + 10b + c.
- Enforce digit ranges strictly (e.g., in base 9, digits ∈ {0,…,8}; if also a is a base-10 leading digit, then a ∈ {1,…,8}).
- Set up equality and simplify. Use modular constraints to prune:
  • Mod 9 often collapses coefficients; e.g., 99a = 71b + 8c ⇒ mod 9 gives b + c ≡ 0 (mod 9).
  • Mod 8: 99 ≡ 3, 71 ≡ 7 ⇒ 3a ≡ 7b (mod 8) ⇒ b ≡ −3a (mod 8).
- Solve within digit bounds and verify numerically.

2) Palindromes across bases:
- Bound the base length by magnitude (e.g., n < 1000 ⇒ octal has 3–4 digits).
- Characterize palindromes:
  • 3-digit octal: (A B A)_8 = 65A + 8B.
  • 4-digit octal: (A B B A)_8 = 513A + 72B (with A ≥ 1).
- Enumerate small parameter ranges and test the other-base palindrome constraint. For “greatest”, check candidates in descending order with justification.

3) Symmetric sums with a + b + c fixed (ordered triples of nonnegative integers):
- Use identities to compress expressions:
... [Output truncated]
```

--------------------------------

### Log DSPy Evaluation with MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

This snippet shows how to start an MLflow run, evaluate a DSPy module using dspy.Evaluate, and log the aggregated correctness score and detailed evaluation results as a table. It utilizes MLflow's `start_run`, `log_metric`, and `log_table` functions.

```Python
with mlflow.start_run(run_name="math_evaluation"):
    kwargs = dict(num_threads=THREADS, display_progress=True)
    evaluate = dspy.Evaluate(devset=dataset.dev, metric=dataset.metric, **kwargs)

    # Evaluate the program as usual
    result = evaluate(module)

    # Log the aggregated score
    mlflow.log_metric("correctness", result.score)
    # Log the detailed evaluation results as a table
    mlflow.log_table(
        {
            "Question": [example.question for example in dataset.dev],
            "Gold Answer": [example.answer for example in dataset.dev],
            "Predicted Answer": [output[1] for output in result.results],
            "Correctness": [output[2] for output in result.results],
        },
        artifact_file="eval_results.json",
    )
```

--------------------------------

### GRPO Compiler Initialization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Initializes the GRPO compiler with specified parameters for metric computation, task handling, sampling, and training steps. It also configures GPU allocation for inference and training.

```python
compiler = GRPO(
    metric=compute_overall_score,
    multitask=True,
    num_dspy_examples_per_grpo_step=4,
    num_samples_per_input=8,
    exclude_demos=True,
    num_train_steps=500,
    num_threads=24,
    use_train_as_val=False,
    num_steps_for_val=10,
    train_kwargs=train_kwargs,
    report_train_scores=False,
    gpu_config=MultiGPUConfig(num_inference_gpus=2, num_training_gpus=2),
)
```

--------------------------------

### Game Interface: Main Menu

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Presents the main menu options to the player, including starting a new game, loading, viewing instructions, or exiting. It clears the console and displays the header before showing the menu.

```Python
def main_menu():
    """Display main menu and handle selection."""
    console.clear()
    display_game_header()
    
    menu_options = [
        "1. New Game",
        "2. Load Game", 
        "3. How to Play",
        "4. Exit"
    ]
    
    menu_text = "\n".join(menu_options)
    console.print(Panel(menu_text, title="Main Menu", style="bright_blue"))
    
    choice = typer.prompt("Select an option")
    return choice
```

--------------------------------

### DSPy for Text2SQL Optimization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/community/use-cases.md

This repository demonstrates how to optimize Language Models (LMs) for Text-to-SQL tasks using the DSPy framework. It provides a practical example of applying DSPy's capabilities to a specific database querying problem.

```python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a DSPy program for Text-to-SQL
class Text2SQL(dspy.Module):
    def __init__(self):
        super().__init__()
        self.generate_sql = dspy.ChainOfThought(dspy.Signature(
            "convert natural language question to SQL query",
            "question: str, table_names: str, table_definitions: str -> sql: str"
        ))

    def forward(self, question, table_names, table_definitions):
        return self.generate_sql(question=question, table_names=table_names, table_definitions=table_definitions)

# Example usage (assuming you have table_names and table_definitions)
# program = Text2SQL()
# result = program(question="What is the average age of users?", table_names="users", table_definitions="users(id INT, name VARCHAR, age INT)")
# print(result.sql)
```

--------------------------------

### DSPy ChainOfThought Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Illustrates the use of DSPy's ChainOfThought module with a predefined signature. It shows how to call the predictor with a question to generate an answer through a chain of thought process.

```python
generate_answer = dspy.ChainOfThought(BasicQA)

# Call the predictor on a particular input alongside a hint.
question='What is the color of the sky?'
pred = generate_answer(question=question)
```

--------------------------------

### DSPy: Basic Data Handling and Model Interaction

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates fundamental DSPy operations, including loading data, defining prompts, and making calls to language models. This snippet is essential for understanding the basic workflow of the DSPy library.

```Python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')
dspy.settings.configure(lm=llm)

# Define a simple prompt
class BasicQA(dspy.Signature):
    """Answer the question based on the context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Create a module using the signature
qa_module = dspy.Chain(BasicQA)

# Example usage
context = "DSPy is a framework for programming LLMs."
question = "What is DSPy?"

# Make a prediction
prediction = qa_module(context=context, question=question)

print(f"Question: {question}")
print(f"Answer: {prediction.answer}")
```

--------------------------------

### Get User Information Tool

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

Fetches a user's profile from the user database using their name. Returns the user profile if found, otherwise None.

```Python
@mcp.tool()
def get_user_info(name: str):
    """Fetch the user profile from database with given name."""
    return user_database.get(name)
```

--------------------------------

### Instantiate and Run Custom RAG Module (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/custom_module/index.ipynb

Shows how to instantiate a custom DSPy module (`RAG`) and execute it with a specific question. It includes essential setup steps like configuring the language model API key and DSPy's language model, and emphasizes invoking the module instance directly.

```python
import os

os.environ["OPENAI_API_KEY"] = "{your_openai_api_key}"

dspy.configure(lm=dspy.LM("openai/gpt-4o-mini"))
rag = RAG()
print(rag(question="Is Lebron James the basketball GOAT?"))
```

--------------------------------

### Evaluate Optimized Program and Inspect History

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

This snippet shows how to run the optimized DSPy program, evaluate its performance using the audio similarity metric, and inspect the history to see the improvements in generated instructions.

```Python
import dspy

# Assuming optimized_program and testset are defined
# pred = optimized_program(raw_line=testset[1].raw_line, target_style=testset[1].target_style)

# print(audio_similarity_metric(testset[1], pred)) # Example output: 0.6691027879714966
# dspy.inspect_history(n=1)

```

--------------------------------

### Load and Prepare Spoken-SQuAD Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Loads the Spoken-SQuAD dataset from HuggingFace, shuffles it, and splits it into training and testing sets. It also preprocesses the audio data into `dspy.Audio` objects.

```python
import random
import dspy
from dspy.datasets import DataLoader

kwargs = dict(fields=("context", "instruction", "answer"), input_keys=("context", "instruction"))
spoken_squad = DataLoader().from_huggingface(dataset_name="AudioLLMs/spoken_squad_test", split="train", trust_remote_code=True, **kwargs)

random.Random(42).shuffle(spoken_squad)
spoken_squad = spoken_squad[:100]

split_idx = len(spoken_squad) // 2
trainset_raw, testset_raw = spoken_squad[:split_idx], spoken_squad[split_idx:]

def preprocess(x):
    audio = dspy.Audio.from_array(x.context["array"], x.context["sampling_rate"])
    return dspy.Example(
        passage_audio=audio,
        question=x.instruction,
        answer=x.answer
    ).with_inputs("passage_audio", "question")

trainset = [preprocess(x) for x in trainset_raw]
testset = [preprocess(x) for x in testset_raw]

len(trainset), len(testset)
```

--------------------------------

### Game Interface: Display Actions

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Presents the player with a list of available actions, numbered for easy selection. This is crucial for guiding player interaction within the game.

```Python
def display_actions(actions: list[str]):
    """Display available actions."""
    action_text = "\n".join([f"{i+1}. {action}" for i, action in enumerate(actions)])
    console.print(Panel(action_text, title="Available Actions", style="yellow"))
```

--------------------------------

### Log DSPy Program with MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Logs a DSPy program to an MLflow tracking server. This involves setting the tracking URI, defining a DSPy program (potentially within a custom Module class as per MLflow version requirements), and using `mlflow.dspy.log_model()` to save the program, its dependencies, and input examples.

```python
import dspy
import mlflow

mlflow.set_tracking_uri("http://127.0.0.1:5000/")
mlflow.set_experiment("deploy_dspy_program")

lm = dspy.LM("openai/gpt-4o-mini")
dspy.settings.configure(lm=lm)

class MyProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.cot = dspy.ChainOfThought("question -> answer")

    def forward(self, messages):
        return self.cot(question=messages[0]["content"])

dspy_program = MyProgram()

with mlflow.start_run():
    mlflow.dspy.log_model(
        dspy_program,
        "dspy_program",
        input_example={"messages": [{"role": "user", "content": "What is LLM agent?"}]},
        task="llm/v1/chat",
    )
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates the basic usage of the dspy library, including importing modules, defining signatures, and compiling programs. It highlights the core components for building LLM applications.

```Python
import dspy

# Define a signature for a question-answering task
class BasicQA(dspy.Signature):
    """Answer questions based on context."""
    context: str = """
    The context in which to search for the answer.
    """
    question: str = """
    The question to answer.
    """
    answer: str = """
    The answer to the question.
    """

# Instantiate a language model (e.g., OpenAI)
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Create a simple QA program
qa_program = dspy.Program(BasicQA(), llm=llm)

# Compile the program (this might involve optimization steps)
compiled_qa = qa_program.compile()

# Example usage
context = "DSPy is a framework for developing and deploying LLM applications."
question = "What is DSPy?"

# Run the compiled program
result = compiled_qa(context=context, question=question)

print(result.answer)
```

--------------------------------

### dspy.Predict reset_copy Method

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/modules/Predict.md

Creates a new copy of the predictor and resets its state. This is a convenient way to get a clean instance without modifying the original.

```python
predictor = dspy.Predict(
    ...
)

new_predictor = predictor.reset_copy()
```

--------------------------------

### Load AlfWorld Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Loads a subset of the AlfWorld dataset for training and development. It specifies the number of training and development tasks to be used for the tutorial.

```python
from dspy.datasets.alfworld import AlfWorld

alfworld = AlfWorld()
trainset, devset = alfworld.trainset[:200], alfworld.devset[-200:]
len(trainset), len(devset)
```

--------------------------------

### Build an AI Text-Based Game

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/real_world_examples/index.md

Create an interactive text-based adventure game with dynamic storytelling, AI-powered NPCs, and adaptive gameplay using DSPy's modular programming approach. This involves interactive storytelling, game state management, and AI-driven narratives.

```Python
# Example usage for building an AI text-based game (conceptual)
# Assumes DSPy is configured for game logic and narrative generation

# from dspy import Signature, Module, Predictor

# class GameNarrator(Signature):
#     """Generate game narrative and NPC responses."""
#     game_state: str
#     player_action: str
#     narrative: str
#     npc_response: str

# class TextAdventureGame(Module):
#     def __init__(self):
#         super().__init__()
#         self.narrator = Predictor(GameNarrator)
#         self.game_state = {"location": "forest", "inventory": []}

#     def forward(self, player_action):
#         # Update game state based on player action (simplified)
#         if player_action == "go north":
#             self.game_state["location"] = "cave"
#         # ... other state updates ...

#         # Generate narrative and NPC response using DSPy
#         state_str = str(self.game_state)
#         result = self.narrator(game_state=state_str, player_action=player_action)

#         # Update game state based on narrative/NPC response if needed
#         # ...

#         return result

# # Placeholder for running the game
# def play_game():
#     game = TextAdventureGame()
#     # Compile the game module
#     compiled_game = dspy.settings.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))(game)

#     print("Welcome to the AI Text Adventure!")
#     while True:
#         action = input("Enter your action: ")
#         if action.lower() == 'quit':
#             break
#         response = compiled_game(action)
#         print(f"Narrative: {response.narrative}")
#         print(f"NPC: {response.npc_response}")

# print("Tutorial: Building a Creative Text-Based AI Game")
# print("Key Concepts: Interactive storytelling, game state management, character progression, AI-driven narratives")

```

--------------------------------

### Python Example: Advanced Features

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This code snippet showcases more advanced or specific features of the dspy project. It could involve complex algorithms, custom configurations, or specialized use cases, all in Python.

```python
# Placeholder for advanced dspy features
# This could include examples of custom modules, optimization techniques, or specific API calls
# Example: dspy.settings.configure(lm=dspy.OpenAI(model="gpt-3.5-turbo"))
# program = dspy.Program.from_code("my_program.py")
```

--------------------------------

### DSPy: Signature Definition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example illustrates how to define a 'signature' in DSPy, which specifies the input and output fields for a language model call. Signatures are crucial for structuring prompts and ensuring consistent output formats.

```Python
import dspy

# Define a signature for a question-answering task
class QuestionAnswering(dspy.Signature):
    """Answer questions based on the provided context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField(desc="often is a string value")

# Example usage within a module
class MyQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict_answer = dspy.Predict(QuestionAnswering)

    def forward(self, context, question):
        return self.predict_answer(context=context, question=question)

# Instantiate and use the module (assuming a configured LM)
# qa_module = MyQA()
# context = "The Eiffel Tower is located in Paris, France."
# question = "Where is the Eiffel Tower?"
# result = qa_module(context=context, question=question)
# print(result.answer)
```

--------------------------------

### Classify Text

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

This is a basic example of using a finetuned classification function ('classify_ft') to predict a label for a given text input. It's the initial step in validating the finetuned model.

```Python
classify_ft(text="I didn't receive my money earlier and it says the transaction is still in progress. Can you fix it?")
```

--------------------------------

### DSPy Framework Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the basic usage of the dspy framework, showcasing how to initialize and interact with its core components. It highlights the flexibility of dspy in handling different language models and tasks.

```Python
import dspy

# Initialize dspy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a DSPy program
class BasicQA(dspy.Module):
    def __init__(self, dsp):
        super().__init__(dsp)
        self.predict = dspy.Predict("question -> answer")

    def forward(self, question):
        return self.predict(question=question)

# Instantiate the program
qa_program = BasicQA(llm)

# Run the program
question = "What is the capital of France?"
answer = qa_program(question=question).answer

print(f"Question: {question}")
print(f"Answer: {answer}")
```

--------------------------------

### Refine Module Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Demonstrates the `Refine` module, which iteratively improves a module's output by running it multiple times, providing feedback, and selecting the best result based on a reward function or threshold.

```python
import dspy

qa = dspy.ChainOfThought("question -> answer")
def one_word_answer(args, pred):
    return 1.0 if len(pred.answer) == 1 else 0.0
best_of_3 = dspy.Refine(module=qa, N=3, reward_fn=one_word_answer, threshold=1.0)
best_of_3(question="What is the capital of Belgium?").answer
# Brussels
```

--------------------------------

### DSPy RepositoryAnalyzer Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/llms_txt_generation/index.md

Implements a DSPy module that orchestrates the process of generating `llms.txt`. It utilizes `ChainOfThought` modules for analyzing repository details, code structure, generating usage examples, and finally producing the `llms.txt` content.

```python
class RepositoryAnalyzer(dspy.Module):
    def __init__(self):
        super().__init__()
        self.analyze_repo = dspy.ChainOfThought(AnalyzeRepository)
        self.analyze_structure = dspy.ChainOfThought(AnalyzeCodeStructure)
        self.generate_examples = dspy.ChainOfThought("repo_info -> usage_examples")
        self.generate_llms_txt = dspy.ChainOfThought(GenerateLLMsTxt)
    
    def forward(self, repo_url, file_tree, readme_content, package_files):
        # Analyze repository purpose and concepts
        repo_analysis = self.analyze_repo(
            repo_url=repo_url,
            file_tree=file_tree,
            readme_content=readme_content
        )
        
        # Analyze code structure
        structure_analysis = self.analyze_structure(
            file_tree=file_tree,
            package_files=package_files
        )
        
        # Generate usage examples
        usage_examples = self.generate_examples(
            repo_info=f"Purpose: {repo_analysis.project_purpose}\nConcepts: {repo_analysis.key_concepts}"
        )
        
        # Generate final llms.txt
        llms_txt = self.generate_llms_txt(
            project_purpose=repo_analysis.project_purpose,
            key_concepts=repo_analysis.key_concepts,
            architecture_overview=repo_analysis.architecture_overview,
            important_directories=structure_analysis.important_directories,
            entry_points=structure_analysis.entry_points,
            development_info=structure_analysis.development_info,
            usage_examples=usage_examples.usage_examples
        )
        
        return dspy.Prediction(
            llms_txt_content=llms_txt.llms_txt_content,
            analysis=repo_analysis,
            structure=structure_analysis
        )
```

--------------------------------

### Summarize Document with Chain of Thought

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/signatures.md

This example demonstrates how to use DSPy's ChainOfThought module to summarize a given document. It shows how to access both the generated summary and the intermediate reasoning steps.

```python
import dspy

document = """The 21-year-old made seven appearances for the Hammers and netted his only goal for them in a Europa League qualification round match against Andorran side FC Lustrains last season. Lee had two loan spells in League One last term, with Blackpool and then Colchester United. He scored twice for the U's but was unable to save them from relegation. The length of Lee's contract with the promoted Tykes has not been revealed. Find all the latest football transfers on our dedicated page."""

summarize = dspy.ChainOfThought('document -> summary')
response = summarize(document=document)

print(response.summary)

print("Reasoning:", response.reasoning)
```

--------------------------------

### Fine-tune Agent using BootstrapFinetune

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Applies the BootstrapFinetune optimizer to fine-tune the student agent (gpt4o-mini) using the optimized agent (gpt4o) as a teacher. It requires the metric, number of threads, student program, teacher program, and training dataset.

```Python
optimizer = dspy.BootstrapFinetune(metric=metric, num_threads=16)
finetuned_4o_mini = optimizer.compile(student_4o_mini, teacher=optimized_4o, trainset=trainset)
```

--------------------------------

### CodeAct Limitation: External Libraries

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/modules/CodeAct.md

Highlights a limitation of dspy.CodeAct: it cannot use external libraries. The example shows an 'NG' case attempting to use 'numpy' within a tool function.

```python
# ❌ NG
import numpy as np

def exp(i: int):
    return np.exp(i)

dspy.CodeAct("question -> answer", tools=[exp])
```

--------------------------------

### CodeAct Limitation: Callable Objects

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/modules/CodeAct.md

Illustrates a limitation of dspy.CodeAct where it does not accept callable objects (classes with __call__) as tools. The example shows an 'NG' case using a class 'Add'.

```python
# ❌ NG
class Add():
    def __call__(self, a: int, b: int):
        return a + b

dspy.CodeAct("question -> answer", tools=[Add()])
```

--------------------------------

### Load and Prepare HoVer Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_multihop/index.ipynb

Loads the HoVer multi-hop dataset from Hugging Face and processes it to create a training set suitable for DSPy. It filters examples to include only those with 3 hops, ensures unique `hpqa_id`s, shuffles the data, and splits it into training, development, and test sets.

```python
import random
from dspy.datasets import DataLoader

kwargs = dict(fields=("claim", "supporting_facts", "hpqa_id", "num_hops"), input_keys=("claim",))
hover = DataLoader().from_huggingface(dataset_name="hover-nlp/hover", split="train", trust_remote_code=True, **kwargs)

hpqa_ids = set()
hover = [
    dspy.Example(claim=x.claim, titles=list(set([y["key"] for y in x.supporting_facts]))).with_inputs("claim")
    for x in hover
    if x["num_hops"] == 3 and x["hpqa_id"] not in hpqa_ids and not hpqa_ids.add(x["hpqa_id"])
]

random.Random(0).shuffle(hover)
trainset, devset, testset = hover[:600], hover[600:900], hover[900:]
len(trainset), len(devset), len(testset)
```

--------------------------------

### dspy Module with Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to create a dspy module, which encapsulates a signature and can be used within a larger dspy pipeline. Modules allow for reusable LLM components.

```Python
import dspy

class MyModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.signature = dspy.Signature(
            "Input: {input_text}\nOutput: {output_text}",
            "This is a simple module."
        )

    def forward(self, input_text):
        prediction = dspy.Predict(self.signature)(input_text=input_text)
        return prediction.output_text
```

--------------------------------

### Analyze Financial Data with Yahoo Finance

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/real_world_examples/index.md

Develop financial analysis agents that fetch real-time market data, analyze news sentiment, and provide investment insights using LangChain tool integration. This involves tool integration and real-time financial data analysis.

```Python
# Example usage for financial analysis with Yahoo Finance (conceptual)
# Assumes LangChain and DSPy are set up with Yahoo Finance tool

# from dspy import Signature, Module, Predictor
# from langchain_community.utilities import YahooFinanceAPI

# class FinancialAnalyzer(Signature):
#     """Analyze stock data and news sentiment."""
#     ticker: str
#     analysis: str

# class FinanceAgent(Module):
#     def __init__(self):
#         super().__init__()
#         self.yahoo_finance = YahooFinanceAPI()
#         self.analyze = Predictor(FinancialAnalyzer)

#     def forward(self, ticker_symbol):
#         # Fetch stock data using LangChain tool
#         stock_info = self.yahoo_finance.get_stock_info(ticker_symbol)
#         # Fetch news (simplified, actual implementation might use another tool)
#         news = self.yahoo_finance.get_stock_news(ticker_symbol)
#         # Combine data for analysis
#         combined_data = f"Stock Info: {stock_info}\nNews: {news}"
#         # Use DSPy to analyze the data
#         analysis_result = self.analyze(ticker=ticker_symbol, analysis=combined_data)
#         return analysis_result

# # Placeholder for running the financial agent
# def get_financial_insights(ticker):
#     agent = FinanceAgent()
#     # Compile the agent
#     compiled_agent = dspy.settings.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))(agent)
#     result = compiled_agent(ticker)
#     print(f"Financial analysis for {ticker}: {result.analysis}")

# print("Tutorial: Financial Analysis with Yahoo Finance")
# print("Key Concepts: Tool integration, financial data, real-time analysis")

```

--------------------------------

### Compose DSPy Modules into a Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/modules.md

Demonstrates how to define a custom DSPy module by composing existing modules and chaining them in a control flow. This example shows a multi-hop search program.

```Python
class Hop(dspy.Module):
    def __init__(self, num_docs=10, num_hops=4):
        self.num_docs, self.num_hops = num_docs, num_hops
        self.generate_query = dspy.ChainOfThought('claim, notes -> query')
        self.append_notes = dspy.ChainOfThought('claim, notes, context -> new_notes: list[str], titles: list[str]')

    def forward(self, claim: str) -> list[str]:
        notes = []
        titles = []

        for _ in range(self.num_hops):
            query = self.generate_query(claim=claim, notes=notes).query
            context = search(query, k=self.num_docs)
            prediction = self.append_notes(claim=claim, notes=notes, context=context)
            notes.extend(prediction.new_notes)
            titles.extend(prediction.titles)
        
        return dspy.Prediction(notes=notes, titles=list(set(titles)))
```

--------------------------------

### DSPy Optimizer: BootstrapFewShot

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Illustrates the use of the BootstrapFewShot optimizer in DSPy. This example shows how to configure the optimizer with various parameters like metric, max bootstrapped demos, and max labeled demos, then compile a program.

```python
from dspy.teleprompt import BootstrapFewShot

# Assuming your_defined_metric, your_dspy_program, and trainset are defined elsewhere
# fewshot_optimizer = BootstrapFewShot(metric=your_defined_metric, max_bootstrapped_demos=4, max_labeled_demos=16, max_rounds=1, max_errors=10)

# your_dspy_program_compiled = fewshot_optimizer.compile(student = your_dspy_program, trainset=trainset)
```

--------------------------------

### DSPy Optimizer Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to use DSPy's optimization capabilities to automatically tune the prompts and parameters of your LLM programs. Optimizers like 'BootstrapFewShot' can significantly improve performance without manual prompt engineering.

```Python
import dspy

# Assume QAProgram is defined as above

# Configure the language model
dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Create a dataset for training/optimization
# In a real scenario, this would be a list of dictionaries
training_data = [
    {'question': 'What is the largest planet?', 'answer': 'Jupiter'},
    {'question': 'What is the speed of light?', 'answer': 'Approximately 299,792 kilometers per second'}
]

# Instantiate the program
program = QAProgram()

# Use an optimizer to tune the program
optimizer = dspy.BootstrapFewShot(metric=dspy.AnswerExactMatch(), max_bootstrapped_demos=2)
optimized_program = optimizer.compile(program, trainset=training_data)

# Run the optimized program
result = optimized_program(question='What is the capital of Japan?')
print(result.answer)
```

--------------------------------

### DSPy CodeAct Example with Custom Tool

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Demonstrates the DSPy CodeAct module, which allows integrating Python functions as tools. It shows how to define a factorial function and use it with CodeAct to compute the factorial of a number.

```python
from dspy import CodeAct

def factorial(n):
    """Calculate factorial of n"""
    if n == 1:
        return 1
    return n * factorial(n-1)

act = CodeAct("n->factorial", tools=[factorial])
result = act(n=5)
result # Returns 120
```

--------------------------------

### Multi-modal Image Classification with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/signatures.md

This example shows how to perform multi-modal classification by using DSPy's support for image inputs. It defines a signature for dog breed classification and processes an image from a URL.

```python
import dspy

class DogPictureSignature(dspy.Signature):
    """Output the dog breed of the dog in the image."""
    image_1: dspy.Image = dspy.InputField(desc="An image of a dog")
    answer: str = dspy.OutputField(desc="The dog breed of the dog in the image")

image_url = "https://picsum.photos/id/237/200/300"
classify = dspy.Predict(DogPictureSignature)
response = classify(image_1=dspy.Image.from_url(image_url))

print(response)
```

--------------------------------

### DSPy Optimizer for Signature Tuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates how to use a DSPy optimizer to tune a module's signature based on a dataset. Optimizers help improve the LLM's performance by learning from examples.

```Python
import dspy

# Assume 'trainset' is a list of dictionaries, e.g., [{'question': '...', 'answer': '...'}]
# Assume 'devset' is a list of dictionaries for validation

# Define a module with a signature
class TunableQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict("question", "answer")

    def forward(self, question):
        return self.predict(question=question)

# Instantiate the module
tunable_qa = TunableQA()

# Initialize an optimizer (e.g., BootstrapFewShot)
optimizer = dspy.BootstrapFewShot(metric=dspy.ExactMatch())

# Optimize the module using the training data
# Note: This is a simplified example; actual optimization requires more setup
# optimized_qa = optimizer.compile(tunable_qa, trainset=trainset, devset=devset)

# Example of how you might use the optimized module (conceptual)
# print(optimized_qa(question="What is the speed of light?").answer)
```

--------------------------------

### DSPy ReAct Agent Parameters

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/tools.md

Illustrates the key parameters for initializing a dspy.ReAct agent, including the signature for input/output, the list of available tools, and the maximum number of iterations for tool calls.

```python
react_agent = dspy.ReAct(
    signature="question -> answer",  # Input/output specification
    tools=[tool1, tool2, tool3],     # List of available tools
    max_iters=10                     # Maximum number of tool call iterations
)
```

--------------------------------

### dspy Optimizers for Fine-tuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Introduces dspy optimizers, which are used to fine-tune language models based on a dataset of examples. This process improves the model's performance on specific tasks.

```Python
import dspy

# Assume BasicQA signature and BasicQAModule are defined as before

# Example dataset (list of dictionaries)
data = [
    {'question': 'What is the capital of Germany?', 'answer': 'The capital of Germany is Berlin.'},
    {'question': 'What is the largest planet in our solar system?', 'answer': 'The largest planet in our solar system is Jupiter.'},
    {'question': 'Who wrote Hamlet?', 'answer': 'Hamlet was written by William Shakespeare.'}
]

# Initialize the dspy language model
dspy.llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Instantiate the module
module = BasicQAModule()

# Compile the module with an optimizer (e.g., BootstrapFewShot)
# This will fine-tune the module using the provided data
compiled_module = module.compile(optimizer=dspy.BootstrapFewShot(max_bootstrapped_demos=4, max_labeled_demos=4))

# Now, the compiled_module is fine-tuned and can be used for predictions
# question = "What is the highest mountain in the world?"
# result = compiled_module(question=question)
# print(result.answer)

```

--------------------------------

### Configure Local LM via Ollama

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/language_models.md

Connects DSPy to a local language model managed by Ollama. This involves installing Ollama, running a model, and then configuring DSPy to use the local Ollama endpoint.

```bash
> curl -fsSL https://ollama.ai/install.sh | sh
> ollama run llama3.2:1b
```

```python
import dspy
lm = dspy.LM('ollama_chat/llama3.2', api_base='http://localhost:11434', api_key='')
dspy.configure(lm=lm)
```

--------------------------------

### Evaluate DSPy Program with Exact Match

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Sets up an evaluation pipeline using the Exact Match metric to assess the performance of the `spoken_qa` program on the test dataset.

```python
evaluate_program = dspy.Evaluate(devset=testset, metric=dspy.evaluate.answer_exact_match,display_progress=True, num_threads = 10, display_table=True)

evaluate_program(spoken_qa)
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

### Custom Async DSPy Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/async/index.md

Illustrates the creation of a custom DSPy module that supports asynchronous operations by implementing the `aforward()` method. This allows for chaining multiple async DSPy calls.

```Python
import dspy
import asyncio
import os

os.environ["OPENAI_API_KEY"] = "your_api_key"
dspy.configure(lm=dspy.LM("openai/gpt-4o-mini"))

class MyModule(dspy.Module):
    def __init__(self):
        self.predict1 = dspy.ChainOfThought("question->answer")
        self.predict2 = dspy.ChainOfThought("answer->simplified_answer")

    async def aforward(self, question, **kwargs):
        # Execute predictions sequentially but asynchronously
        answer = await self.predict1.acall(question=question)
        return await self.predict2.acall(answer=answer)


async def main():
    mod = MyModule()
    result = await mod.acall(question="Why did a chicken cross the kitchen?")
    print(result)


asyncio.run(main())
```

--------------------------------

### DSPy ReAct Agent Structure

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

This section details the structure of the output from a DSPy ReAct agent, including the fields available and their purpose. It also provides an example of how to inspect the agent's history.

```APIDOC
## DSPy ReAct Agent Output Structure

### Description
The result of a DSPy ReAct agent includes `process_result` (user-required output), `reasoning` (explanation for the answer), and `trajectory` (step-by-step details).

### Trajectory Details
The `trajectory` field contains:
- Reasoning (thought) at each step.
- Tools picked by the Language Model (LM) at each step.
- Arguments for tool calling, determined by the LM at each step.
- Tool execution results at each step.

### Inspecting History
Use `dspy.inspect_history(n=10)` to view the internal steps of the agent's execution.

### Example System Message Structure
```
System message:

Your input fields are:
1. `user_request` (str)
2. `trajectory` (str)
Your output fields are:
1. `next_thought` (str)
2. `next_tool_name` (Literal['fetch_flight_info', 'fetch_itinerary', 'pick_flight', 'book_flight', 'cancel_itinerary', 'get_user_info', 'file_ticket', 'finish'])
3. `next_tool_args` (dict[str, Any])
```

### Agent Goal
To act as an airline customer service agent, using provided tools to fulfill user requests by interleaving `next_thought`, `next_tool_name`, and `next_tool_args`.

### Available Tools
- **fetch_flight_info**: Fetches flight information. 
  - Arguments: `date` (object), `origin` (string), `destination` (string).
- **fetch_itinerary**: Fetches booked itinerary. 
  - Arguments: `confirmation_number` (string).
- **pick_flight**: Picks the best flight. 
  - Arguments: `flights` (array of flight objects).
- **book_flight**: Books a flight.
- **cancel_itinerary**: Cancels an itinerary.
- **get_user_info**: Retrieves user information.
- **file_ticket**: Files a ticket.
- **finish**: Completes the task.
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental usage of the dspy library, showcasing how to initialize a DSPy pipeline and execute a basic language model task. It highlights the core components and workflow for interacting with LLMs through the dspy framework.

```Python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')
dspy.settings.configure(lm=llm)

# Define a simple DSPy program
class BasicQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.ChainOfThought(lambda question: f"Answer the following question: {question}")

    def forward(self, question):
        return self.predict(question=question)

# Instantiate and run the program
qa_program = BasicQA()
answer = qa_program('What is the capital of France?')

print(answer)
```

--------------------------------

### Log DSPy Model with MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

This snippet shows how to log a DSPy optimized model using MLflow for better reproducibility and collaboration. It starts an MLflow run, logs the `optimized_rag` model with a specified artifact path, and then demonstrates loading the model back from its MLflow URI.

```Python
import mlflow

# Start an MLflow Run and save the program
with mlflow.start_run(run_name="optimized_rag"):
    model_info = mlflow.dspy.log_model(
        optimized_rag,
        artifact_path="model", # Any name to save the program in MLflow
    )

# Load the program back from MLflow
loaded = mlflow.dspy.load_model(model_info.model_uri)
```

--------------------------------

### Optimize PAPILLON with DSPy GRPO

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Illustrates the setup for optimizing the PAPILLON pipeline using DSPy's `GRPO` optimizer. This involves configuring the PAPILLON pipeline with both an untrusted and a local language model, and importing necessary optimization classes.

```python
from dspy.teleprompt.grpo import GRPO
from dspy.clients.utils_finetune import MultiGPUConfig

papillon = PAPILLON(untrusted_model=openai_lm)
papillon.set_lm(local_lm)
```

--------------------------------

### Configure LM and Define ProgramOfThought Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/program_of_thought/index.ipynb

Sets up a specific language model (Llama-3-70b-Instruct) for DSPy and defines a basic signature for a question-answering task. It then instantiates and invokes the ProgramOfThought module with a sample problem.

```Python
llama31_70b = dspy.LM("openai/meta-llama/Meta-Llama-3-70b-Instruct", api_base="API_BASE", api_key="None")

dspy.settings.configure(lm=llama31_70b)

class BasicGenerateAnswer(dspy.Signature):
    question = dspy.InputField()
    answer = dspy.OutputField()

pot = dspy.ProgramOfThought(BasicGenerateAnswer)
problem = "2*5 + 4"
pot(question=problem).answer
```

--------------------------------

### dspy Module with Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to create a dspy Module, which encapsulates a signature and can be used within a larger dspy pipeline. Modules allow for reusable components in LM programming.

```Python
class BasicModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.signature = BasicSignature

    def forward(self, input_field):
        return self.signature(input_field=input_field)
```

--------------------------------

### DSPy Signatures and Fields

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example highlights how to define custom signatures and input/output fields within dspy. Signatures define the structure of prompts and expected outputs, while fields specify data types and prefixes.

```Python
import dspy

# Define a signature with multiple input fields and a specific output field
class QuestionAnswering(dspy.Signature):
    """Answer the question based on the context."""
    context = dspy.InputField(desc="The context to answer the question from.")
    question = dspy.InputField(desc="The question to answer.")
    answer = dspy.OutputField(prefix="Answer: ", desc="The answer to the question.")

# Example usage (assuming a context and question are provided)
# qa_signature = QuestionAnswering()
# print(qa_signature)

```

--------------------------------

### Execute DSPy Agent and Print Prediction

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/observability/index.md

Executes the previously defined DSPy ReAct agent with a specific question and prints the predicted answer. This snippet demonstrates how to get a prediction from the agent.

```python
prediction = agent(question="Which baseball team does Shohei Ohtani play for in June 2025?")
print(prediction.answer)
```

--------------------------------

### Bootstrap Finetuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

This snippet demonstrates bootstrapped finetuning using DSPy. It initializes a BootstrapFinetune optimizer with a specified number of threads and a metric, then compiles a student model using a teacher model and a training dataset.

```Python
optimizer = dspy.BootstrapFinetune(num_threads=16, metric=metric)
classify_ft = optimizer.compile(student_classify, teacher=teacher_classify, trainset=raw_data[:500])
```

--------------------------------

### Inspect Optimized Program Prompt

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Inspects the history of interactions to view the augmented prompt used by the optimized program, including how few-shot examples were added. This helps analyze the model's behavior and prompt structure.

```python
dspy.inspect_history(n=1)
```

--------------------------------

### Define Simple Answer Validation Metric

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/evaluation/metrics.md

A basic DSPy metric function that compares the predicted answer to the example's answer, ignoring case. It returns a boolean indicating if the answers match.

```Python
def validate_answer(example, pred, trace=None):
    return example.answer.lower() == pred.answer.lower()
```

--------------------------------

### Bootstrap a Compiled Program using BootstrapFewShot

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

This example shows how to compile an already compiled dspy program, effectively bootstrapping a bootstrapped program. It uses the same teleprompter instance to compile the program again, referencing the previously compiled version.

```python
your_dspy_program_compiledx2 = teleprompter.compile(
    your_dspy_program,
    teacher=your_dspy_program_compiled,
    trainset=trainset,
)
```

--------------------------------

### Ensuring Factual Correctness with Refine

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/output_refinement/best-of-n-and-refine.md

Applies the Refine module to ensure factual correctness of answers. It uses a `FactualityJudge` signature and a `factuality_reward` function to guide the refinement process.

```python
import dspy

class FactualityJudge(dspy.Signature):
    """Determine if a statement is factually accurate."""
    statement: str = dspy.InputField()
    is_factual: bool = dspy.OutputField()

factuality_judge = dspy.ChainOfThought(FactualityJudge)

def factuality_reward(args, pred: dspy.Prediction) -> float:
    statement = pred.answer    
    result = factuality_judge(statement)    
    return 1.0 if result.is_factual else 0.0

refined_qa = dspy.Refine(
    module=dspy.ChainOfThought("question -> answer"),
    N=3,
    reward_fn=factuality_reward,
    threshold=1.0
)

result = refined_qa(question="Tell me about Belgium's capital city.")
print(result.answer)
```

--------------------------------

### DSPy for Indic Languages (NLI)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/community/use-cases.md

This repository focuses on using DSPy for Natural Language Inference (NLI) tasks across Indic languages. It provides code examples for cross-lingual NLI, demonstrating DSPy's versatility.

```python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a DSPy program for Indic Cross-lingual NLI
class IndicXNLI(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict_nli = dspy.Predict(dspy.Signature(
            "determine the relationship between two sentences in Indic languages",
            "premise: str, hypothesis: str, language: str -> entailment: str"
        ))

    def forward(self, premise, hypothesis, language):
        return self.predict_nli(premise=premise, hypothesis=hypothesis, language=language)

# Example usage (assuming premise, hypothesis, and language are defined)
# nli_model = IndicXNLI()
# result = nli_model(premise="ഇത് ഒരു പൂച്ചയാണ്.", hypothesis="ഇതൊരു മൃഗമാണ്.", language="malayalam")
# print(result.entailment)
```

--------------------------------

### Evaluate Finetuned Classifier

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

This code evaluates the performance of a finetuned classifier ('classify_ft') using a predefined evaluation setup. It's a standard step after finetuning to measure the model's effectiveness.

```Python
evaluate(classify_ft)
```

--------------------------------

### DSPy: Chain of Thought Prompting

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example illustrates how to implement Chain of Thought (CoT) prompting within the dspy framework. It shows how to structure a module to generate intermediate reasoning steps before arriving at a final answer.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
# llm = dspy.OpenAI(model="gpt-3.5-turbo")
# dspy.settings.configure(lm=llm)

# Define a signature for Chain of Thought
class CoTSignature(dspy.Signature):
    """Answer a question with a step-by-step thinking process."""
    question: str
    reasoning: str
    answer: str

# Create a module for Chain of Thought
class CoTModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.cot_predictor = dspy.Predict(CoTSignature)

    def forward(self, question):
        prediction = self.cot_predictor(question=question)
        return prediction

# Instantiate the module and run it
# module = CoTModule()
# result = module(question="If John has 5 apples and gives 2 to Mary, how many does he have left?")
# print(f"Reasoning: {result.reasoning}")
# print(f"Answer: {result.answer}")
```

--------------------------------

### Load Banking77 Dataset for Classification

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/index.md

Loads the Banking77 dataset for classification tasks, extracting class names and setting up keyword arguments for data loading. It prepares the first 2000 training examples with specified fields and input keys.

```python
import random
from typing import Literal

from datasets import load_dataset

import dspy
from dspy.datasets import DataLoader

# Load the Banking77 dataset.
CLASSES = load_dataset("PolyAI/banking77", split="train", trust_remote_code=True).features["label"].names
kwargs = {"fields": ("text", "label"), "input_keys": ("text",), "split": "train", "trust_remote_code": True}

# Load the first 2000 examples from the dataset, and assign a hint to each *training* example.
trainset = [
```

--------------------------------

### Check Citation Faithfulness with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/signatures.md

This example demonstrates how to verify if a given text is faithful to a provided context using a custom DSPy Signature. It includes checking for factual consistency and extracting supporting evidence.

```python
import dspy

class CheckCitationFaithfulness(dspy.Signature):
    """Verify that the text is based on the provided context."""

    context: str = dspy.InputField(desc="facts here are assumed to be true")
    text: str = dspy.InputField()
    faithfulness: bool = dspy.OutputField()
    evidence: dict[str, list[str]] = dspy.OutputField(desc="Supporting evidence for claims")

context = "The 21-year-old made seven appearances for the Hammers and netted his only goal for them in a Europa League qualification round match against Andorran side FC Lustrains last season. Lee had two loan spells in League One last term, with Blackpool and then Colchester United. He scored twice for the U's but was unable to save them from relegation. The length of Lee's contract with the promoted Tykes has not been revealed. Find all the latest football transfers on our dedicated page."

text = "Lee scored 3 goals for Colchester United."

faithfulness = dspy.ChainOfThought(CheckCitationFaithfulness)
response = faithfulness(context=context, text=text)

print(response)
```

--------------------------------

### Configure DSPy LM and Load Data

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

Configures the DSPy language model to use GPT-4o and loads a dataset named 'ToolHop.json' for use in the agent.

```python
import dspy
import ujson
import random

gpt4o = dspy.LM("openai/gpt-4o", temperature=0.7)
dspy.configure(lm=gpt4o)

from dspy.utils import download

download("https://huggingface.co/datasets/bytedance-research/ToolHop/resolve/main/data/ToolHop.json")

data = ujson.load(open("ToolHop.json"))
random.Random(0).shuffle(data)
```

--------------------------------

### Saving and Loading DSPy Models

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial explains how to save and load DSPy models and configurations. It covers the process of persisting trained models and restoring them for later use.

```Python
import dspy
import os

# Example of saving and loading DSPy models
# This is a placeholder and would be replaced by actual code from the tutorial.

# Assume 'my_model' is a trained DSPy module
# class MyModel(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.predict = dspy.Predict('input -> output')
#
# my_model = MyModel()
# # Train or configure my_model here...

# Define a directory to save the model
save_directory = "./dspy_model"

# Save the model
# my_model.save(save_directory)
# print(f"Model saved to {save_directory}")

# Load the model
# loaded_model = dspy.load_module(save_directory)
# print("Model loaded successfully.")

# Clean up the saved directory (optional)
# import shutil
# shutil.rmtree(save_directory)

```

--------------------------------

### Python Example: Model Interaction

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet illustrates how dspy interacts with underlying models, which could be language models or other machine learning models. It's written in Python and shows the integration process.

```python
# Placeholder for model interaction code
# This might show how to initialize a model, pass input, and receive output
# Example: model = dspy.OpenAI(model="text-davinci-003")
# result = model("What is dspy?")
```

--------------------------------

### Python DSPy Library Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates basic usage of the dspy library in Python. It shows how to import the library, define a signature for a language model task, and compile a module. The example highlights the core components of dspy, including signatures, modules, and the compilation process for optimizing language model interactions.

```Python
import dspy

# Define a signature for a question-answering task
class BasicQA(dspy.Signature):
    """Answer questions based on the provided context."""
    context = dspy.InputField(prefix="Context: ")
    question = dspy.InputField(prefix="Question: ")
    answer = dspy.OutputField(prefix="Answer: ")

# Create a simple module using the signature
class BasicQAModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict(BasicQA)

    def forward(self, context, question):
        return self.predict(context=context, question=question)

# Instantiate the module
qa_module = BasicQAModule()

# Compile the module for optimization (e.g., using a specific optimizer)
# For demonstration, we'll just show the compilation step
compiled_qa = dspy.compile(qa_module, optimizer=dspy.RandomOptimizer)

# Example usage (after compilation and potential tuning)
# context = "DSPy is a framework for programming with language models."
# question = "What is DSPy?"
# result = compiled_qa(context=context, question=question)
# print(result.answer)
```

--------------------------------

### Track DSPy Evaluation Results with MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Logs DSPy evaluation results to an MLflow experiment. It starts an MLflow run, evaluates the program, logs the aggregated score, and saves detailed evaluation results as a table.

```Python
import mlflow

with mlflow.start_run(run_name="hop_evaluation"):
    evaluate = dspy.Evaluate(
        devset=devset,
        metric=top5_recall,
        num_threads=16,
        display_progress=True,
    )

    # Evaluate the program as usual
    result = evaluate(Hop())

    # Log the aggregated score
    mlflow.log_metric("top5_recall", result.score)
    # Log the detailed evaluation results as a table
    mlflow.log_table(
        {
            "Claim": [example.claim for example in eval_set],
            "Expected Titles": [example.titles for example in eval_set],
            "Predicted Titles": [output[1] for output in result.results],
            "Top 5 Recall": [output[2] for output in result.results],
        },
        artifact_file="eval_results.json",
    )
```

--------------------------------

### Run Unit Tests with uv

Source: https://github.com/stanfordnlp/dspy/blob/main/CONTRIBUTING.md

Executes unit tests for the DSPy predict module using uv to ensure the development environment is set up correctly. The 'uv run' prefix is required for all Python commands.

```shell
uv run pytest tests/predict
```

--------------------------------

### dspy Evaluation Output Interpretation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

These examples show the typical output format after evaluating a program with dspy. It includes the average metric score as a percentage and a progress bar, followed by a more detailed log message.

```text
Average Metric: 59.17 / 68 (87.0%): 100%|█████████████████████████████████████████████████████████████████████████████████████████████████| 68/68 [00:06<00:00, 11.02it/s]
```

```text
2025/08/12 20:57:09 INFO dspy.evaluate.evaluate: Average Metric: 59.166666666666664 / 68 (87.0%)
```

--------------------------------

### DSPy Chain of Thought

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to implement a Chain of Thought (CoT) pattern in DSPy, enabling the LLM to break down complex questions into intermediate reasoning steps.

```python
import dspy

# Define a signature for Chain of Thought QA
class CoTQA(dspy.Signature):
    """Answer the question by thinking step-by-step."""
    question = dspy.InputField()
    reasoning = dspy.OutputField(desc="Step-by-step reasoning")
    answer = dspy.OutputField()

# Create a module using the CoT signature
cot_module = dspy.Module(CoTQA())

# Example usage (assuming a DSPy predictor is configured)
# result = cot_module(question='What is the capital of France?')
# print(f"Reasoning: {result.reasoning}")
# print(f"Answer: {result.answer}")
```

--------------------------------

### Compile DSPy Program with GSM8K Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/saving/index.md

This snippet demonstrates how to configure the language model, load the GSM8K dataset, define a DSPy program using ChainOfThought, and compile it using BootstrapFewShot optimization with specified metrics and dataset.

```python
import dspy
from dspy.datasets.gsm8k import GSM8K, gsm8k_metric

dspy.settings.configure(lm=dspy.LM("openai/gpt-4o-mini"))

gsm8k = GSM8K()
gsm8k_trainset = gsm8k.train[:10]
dspy_program = dspy.ChainOfThought("question -> answer")

optimizer = dspy.BootstrapFewShot(metric=gsm8k_metric, max_bootstrapped_demos=4, max_labeled_demos=4, max_rounds=5)
compiled_dspy_program = optimizer.compile(dspy_program, trainset=gsm8k_trainset)
```

--------------------------------

### Custom DSPy Metric: Function as Metric

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Shows how to define a custom metric for DSPy by creating a Python function. This example includes a helper function `parse_integer_answer` and a `gsm8k_metric` that compares parsed integer answers.

```python
def parse_integer_answer(answer, only_first_line=True):
    try:
        if only_first_line:
            answer = answer.strip().split('\n')[0]

        # find the last token that has a number in it
        answer = [token for token in answer.split() if any(c.isdigit() for c in token)][-1]
        answer = answer.split('.')[0]
        answer = ''.join([c for c in answer if c.isdigit()])
        answer = int(answer)

    except (ValueError, IndexError):
        # print(answer)
        answer = 0

    return answer

# Metric Function
def gsm8k_metric(gold, pred, trace=None) -> int:
    return int(parse_integer_answer(str(gold.answer))) == int(parse_integer_answer(str(pred.answer)))
```

--------------------------------

### Modify Itinerary with ReAct Agent

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

This example demonstrates how to use the ReAct agent to modify a flight itinerary. It includes fetching the existing itinerary and handling cases where modification is not possible by filing a support ticket.

```python
confirmation_number = "7zokt5v5"

result = agent(user_request=f"i want to take DA125 instead on 09/01, please help me modify my itinerary {confirmation_number}")
print(result)
```

--------------------------------

### Synchronous Streaming with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This Python code configures a DSPy language model and uses the streamify function to create a synchronous streaming predictor. It then calls the predictor with a question and iterates through the streamed responses and the final prediction, printing them to the console.

```python
import os

import dspy

os.environ["OPENAI_API_API_KEY"] = "your_api_key"

dspy.configure(lm=dspy.LM("openai/gpt-4o-mini"))

predict = dspy.Predict("question->answer")

# Enable streaming for the 'answer' field
stream_predict = dspy.streamify(
    predict,
    stream_listeners=[dspy.streaming.StreamListener(signature_field_name="answer")],
    async_streaming=False,
)

output = stream_predict(question="why did a chicken cross the kitchen?")

program_output = None
for chunk in output:
    if isinstance(chunk, dspy.streaming.StreamResponse):
        print(chunk)
    elif isinstance(chunk, dspy.Prediction):
        program_output = chunk
print(f"Program output: {program_output}")
```

--------------------------------

### DSPy Modules and Chain-of-Thought

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example showcases the use of DSPy Modules to chain together different language model operations. It specifically demonstrates the 'ChainOfThought' module, which encourages the LLM to generate intermediate reasoning steps.

```Python
import dspy

# Assuming BasicQA signature is defined as above

class CoTModule(dspy.Module):
    def __init__(self, dsp): # dsp is a configured language model
        super().__init__()
        self.predict = dspy.ChainOfThought(BasicQA)

    def forward(self, context, question):
        # The ChainOfThought module will generate reasoning steps before the final answer
        return self.predict(context=context, question=question)

# Example usage:
# lm = dspy.OpenAI(model='gpt-3.5-turbo') # Or any other configured LM
# dspy.settings.configure(lm=lm)
#
# cot_module = CoTModule(lm)
# result = cot_module(context="The capital of France is Paris.", question="What is the capital of France?")
# print(result.answer)
# print(result.rationale) # ChainOfThought often exposes rationale

```

--------------------------------

### DSPy Cache Usage Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/cache/index.md

Demonstrates how to use DSPy's caching by making two identical predict calls and observing the difference in execution time and LM usage. It configures the LM, enables usage tracking, and prints the time elapsed and usage metrics for each call.

```python
import dspy
import os
import time

os.environ["OPENAI_API_KEY"] = "{your_openai_key}"

dspy.settings.configure(lm=dspy.LM("openai/gpt-4o-mini"), track_usage=True)

predict = dspy.Predict("question->answer")

start = time.time()
result1 = predict(question="Who is the GOAT of basketball?")
print(f"Time elapse: {time.time() - start: 2f}\n\nTotal usage: {result1.get_lm_usage()}")

start = time.time()
result2 = predict(question="Who is the GOAT of basketball?")
print(f"Time elapse: {time.time() - start: 2f}\n\nTotal usage: {result2.get_lm_usage()}")
```

--------------------------------

### DSPy Program with Input and Output

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to create a DSPy program that takes specific inputs, processes them using a language model, and produces a structured output based on a defined signature. This illustrates a common pattern for task execution.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class Summarize(dspy.Signature):
    """Summarize the following text."""
    text: str
    summary: str

class SummarizeProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.summarize = dspy.ChainOfThought(Summarize)

    def forward(self, text):
        return self.summarize(text=text)

program = SummarizeProgram()

result = program(text='This is a long piece of text that needs to be summarized.')
print(result.summary)

```

--------------------------------

### DSPy Optimizers and Tuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example illustrates how dspy's optimization capabilities can be used to tune language model behavior. Optimizers like BootstrapFewShot adjust prompts and parameters to improve performance on specific tasks.

```Python

```

--------------------------------

### Configure MLflow for DSPy Tracing

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Sets up MLflow to connect to a local tracking server and enables automatic logging for DSPy experiments, allowing visualization of prompts and optimization progress.

```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
mlflow.dspy.autolog()
```

--------------------------------

### Generate Search Query (Simple Format)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/7-assertions.md

Provides an example of generating a simple search query to answer a complex question. It follows a specific format including Context, Question, Reasoning, and the final Query. This is useful for understanding how dspy structures query generation.

```Python
Context:
[1] «Kerry Condon | Kerry Condon (born 4 January 1983) is [...]»
[2] «Corona Riccardo | Corona Riccardo (c. 1878October 15, 1917) was [...]»

Question: Who acted in the shot film The Shore and is also the youngest actress ever to play Ophelia in a Royal Shakespeare Company production of "Hamlet." ?

Reasoning: Let's think step by step in order to find the answer to this question. First, we need to identify the actress who played Ophelia in a Royal Shakespeare Company production of "Hamlet." Then, we need to find out if this actress also acted in the short film "The Shore."

Query: "actress who played Ophelia in Royal Shakespeare Company production of Hamlet" + "actress in short film The Shore"
```

--------------------------------

### Generate Search Query (with Past Query and Instructions)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/7-assertions.md

Illustrates generating a search query when previous attempts have failed or specific instructions need to be followed. This example includes a 'Past Query' and 'Instructions' field, demonstrating dspy's ability to refine queries based on feedback and constraints, such as query length.

```Python
Context:
[1] «Kerry Condon | Kerry Condon (born 4 January 1983) is an Irish television and film actress, best known for her role as Octavia of the Julii in the HBO/BBC series "Rome," as Stacey Ehrmantraut in AMC's "Better Call Saul" and as the voice of F.R.I.D.A.Y. in various films in the Marvel Cinematic Universe. She is also the youngest actress ever to play Ophelia in a Royal Shakespeare Company production of "Hamlet."»
[2] «Corona Riccardo | Corona Riccardo (c. 1878October 15, 1917) was an Italian born American actress who had a brief Broadway stage career before leaving to become a wife and mother. Born in Naples she came to acting in 1894 playing a Mexican girl in a play at the Empire Theatre. Wilson Barrett engaged her for a role in his play "The Sign of the Cross" which he took on tour of the United States. Riccardo played the role of Ancaria and later played Berenice in the same play. Robert B. Mantell in 1898 who struck by her beauty also cast her in two Shakespeare plays, "Romeo and Juliet" and "Othello". Author Lewis Strang writing in 1899 said Riccardo was the most promising actress in America at the time. Towards the end of 1898 Mantell chose her for another Shakespeare part, Ophelia im Hamlet. Afterwards she was due to join Augustin Daly's Theatre Company but Daly died in 1899. In 1899 she gained her biggest fame by playing Iras in the first stage production of Ben-Hur.»

Question: Who acted in the shot film The Shore and is also the youngest actress ever to play Ophelia in a Royal Shakespeare Company production of "Hamlet." ?

Past Query: "actress who played Ophelia in Royal Shakespeare Company production of Hamlet" + "actress in short film The Shore"

Instructions: Query should be short and less than 100 characters

Query: "actress Ophelia RSC Hamlet" + "actress The Shore"
```

--------------------------------

### Multi-stage RAG Application with DSPy (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/custom_module/index.ipynb

Implements a Retrieval-Augmented Generation (RAG) application with multiple stages: query generation, context retrieval, and answer generation. This example showcases subclassing `dspy.Module` and `dspy.Signature` to create a structured RAG pipeline.

```python
import dspy

class QueryGenerator(dspy.Signature):
    """Generate a query based on question to fetch relevant context"""
    question: str = dspy.InputField()
    query: str = dspy.OutputField()

def search_wikipedia(query: str) -> list[str]:
    """Query ColBERT endpoint, which is a knowledge source based on wikipedia data"""
    results = dspy.ColBERTv2(url='http://20.102.90.50:2017/wiki17_abstracts')(query, k=1)
    return [x["text"] for x in results]

class RAG(dspy.Module):
    def __init__(self):
        self.query_generator = dspy.Predict(QueryGenerator)
        self.answer_generator = dspy.ChainOfThought("question,context->answer")

    def forward(self, question, **kwargs):
        query = self.query_generator(question=question).query
        context = search_wikipedia(query)[0]
        return self.answer_generator(question=question, context=context).answer
```

--------------------------------

### Overview of Reflective Prompt Evolution with dspy.GEPA

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial provides an overview of dspy.GEPA, a method for reflective prompt evolution. It explains the concept and its application in improving AI program prompts.

```Python
import dspy

# Conceptual example of using dspy.GEPA for prompt evolution
# This is a placeholder and would be replaced by actual code from the tutorial.

# Assume 'initial_prompt' and 'evaluation_metric' are defined

# class GepaPromptOptimizer(dspy.Module):
#     def __init__(self, prompt_template):
#         super().__init__()
#         self.prompt_optimizer = dspy.GEPA(prompt_template=prompt_template)
#
#     def forward(self, input_data, metric):
#         optimized_prompt = self.prompt_optimizer(input=input_data, metric=metric)
#         return optimized_prompt

# Usage example (placeholder)
# prompt_template = "Generate a response based on: {context}"
# optimizer = GepaPromptOptimizer(prompt_template=prompt_template)
# best_prompt = optimizer('User query', 'accuracy')
# print(f'Optimized prompt: {best_prompt}')
```

--------------------------------

### Connect Notebook to MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Connects the current notebook environment to the MLflow tracking server. It sets the tracking URI to a local instance running on port 5000 and names the experiment 'DSPy'.

```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
```

--------------------------------

### Python Example: Data Handling and Processing

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This code snippet focuses on how dspy handles and processes data. It might involve data loading, transformation, or specific data structures used within the project. The language is Python.

```python
# Placeholder for data processing code
# This would typically involve functions for loading, cleaning, or manipulating data
# Example: data = dspy.load_data("path/to/data")
# processed_data = dspy.process(data)
```

--------------------------------

### DSPy Program Streaming with FastAPI

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Demonstrates how to enable streaming responses from a DSPy program using `dspy.streamify` within a FastAPI application. This allows for real-time output of intermediate results.

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
import ujson

import dspy
import litellm # Assuming litellm is used for model responses

app = FastAPI(
    title="DSPy Program API",
    description="A simple API serving a DSPy Chain of Thought program",
    version="1.0.0"
)

# Define request model for better documentation and validation
class Question(BaseModel):
    text: str

# Configure your language model and 'asyncify' your DSPy program.
lm = dspy.LM("openai/gpt-4o-mini")
dspy.settings.configure(lm=lm, async_max_workers=4) # default is 8
dspy_program = dspy.ChainOfThought("question -> answer")
dspy_program = dspy.asyncify(dspy.ChainOfThought("question -> answer"))
streaming_dspy_program = dspy.streamify(dspy_program)

@app.post("/predict/stream")
async def stream(question: Question):
    async def generate():
        async for value in streaming_dspy_program(question=question.text):
            if isinstance(value, dspy.Prediction):
                data = {"prediction": value.labels().toDict()}
            elif isinstance(value, litellm.ModelResponse):
                data = {"chunk": value.json()}
            yield f"data: {ujson.dumps(data)}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

# Helper function for streaming
from dspy.utils.streaming import streaming_response

@app.post("/predict/stream")
async def stream_helper(question: Question):
    stream = streaming_dspy_program(question=question.text)
    return StreamingResponse(streaming_response(stream), media_type="text/event-stream")
```

--------------------------------

### DSPy Optimizers

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example shows how to use DSPy's built-in optimizers to improve model performance. Optimizers automatically tune the prompts and parameters of DSPy modules to achieve better results on specific tasks.

```Python
import dspy

# Assume 'SimpleProgram' is defined
# class SimpleProgram(dspy.Module): ...

# Configure DSPy with a language model
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# Instantiate the program
# program = SimpleProgram()

# Use an optimizer (e.g., BootstrapFewShot)
# optimizer = dspy.BootstrapFewShot(metric=dspy.evaluate.answer.exact_match)
# optimized_program = optimizer.optimize(program, n=10, trainset=[...])

# print("Optimized program output:", optimized_program(input="Test input"))
```

--------------------------------

### DSPy: Defining Signatures for LM Interactions

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example illustrates how to define signatures for language model interactions within DSPy. Signatures specify the input and output fields for an LM call, enabling DSPy to automatically handle prompt formatting and output parsing. This promotes consistency and reduces boilerplate code.

```Python
import dspy

class SignatureExample(dspy.Module):
    def __init__(self):
        super().__init__()
        self.signature = dspy.Signature('question -> answer')

    def forward(self, question):
        # The LM call is implicitly handled by DSPy based on the signature
        return dspy.Predict(self.signature)(question=question)

```

--------------------------------

### DSPy Program Creation

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to create a DSPy program by combining signatures and language models. Programs define the sequence of operations and LLM calls required to accomplish a complex task.

```Python
class BasicQA(dspy.Module):
    def __init__(self, llm):
        super().__init__()
        self.qa = dspy.ChainOfThought(dspy.Signature(
            "Question: {question} \nContext: {context}",
            "Answer: {answer}"
        ))

    def forward(self, question, context):
        return self.qa(question=question, context=context)
```

--------------------------------

### DSPy Signature for Question Answering

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet defines a DSPy signature for a question-answering task. Signatures specify the input and output fields for a module, guiding the LLM's response.

```Python
import dspy

# Define a signature for question answering
class QASignature(dspy.Signature):
    """Answer the user's question."""
    question = dspy.InputField()
    answer = dspy.OutputField()

# Example usage within a module
class QAModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict(QASignature)

    def forward(self, question):
        return self.predict(question=question)

# Instantiate and use the module
qa_module = QAModule()
result = qa_module(question="What is the largest planet in our solar system?")
print(result.answer)
```

--------------------------------

### Extract Information from Emails

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/real_world_examples/index.md

Build intelligent email processing systems that classify messages, extract entities, and identify action items using DSPy's structured prediction capabilities. This involves information extraction, classification, and text processing.

```Python
# Example usage for email information extraction (conceptual)
# Assumes a DSPy pipeline is set up for email processing

# from dspy import Signature, Module, Predictor

# class EmailClassifier(Signature):
#     """Classify email and extract key information."""
#     email_text: str
#     category: str
#     action_items: list[str]
#     entities: dict

# class EmailProcessor(Module):
#     def __init__(self):
#         super().__init__()
#         self.process_email = Predictor(EmailClassifier)

#     def forward(self, email_content):
#         return self.process_email(email_text=email_content)

# # Placeholder for actual email processing logic
# def process_email_content(email_body):
#     # Logic to feed email content to DSPy module
#     print("Processing email content...")
#     # ... DSPy processing ...
#     return {"category": "Inquiry", "action_items": ["Follow up"], "entities": {"sender": "test@example.com"}}

# print("Tutorial: Email Information Extraction")
# print("Key Concepts: Information extraction, classification, text processing")

```

--------------------------------

### DSPy Optimization Checkpointing

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/roadmap.md

Some DSPy optimizers support checkpointing, allowing users to resume optimization from a previous state. For example, if optimization is stopped after 10 iterations, it can be continued from those 10 iterations by increasing the iteration count.

```python
# Example: Optimizing with BootstrapFewShotWithRandomSearch for 15 iterations
# The first 10 iterations will be loaded from cache if previously run.
optimizer = BootstrapFewShotWithRandomSearch(n_iterations=15)
```

--------------------------------

### DSPy Signatures and Fields

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet illustrates how to define custom signatures and input/output fields within DSPy. It shows how to add descriptions to fields to guide the language model and how to use different field types.

```Python
import dspy

# Define a signature with more complex fields and descriptions
class DetailedSignature(dspy.Signature):
    """Extract key information from a document."""
    document = dspy.InputField(desc="The full text of the document.")
    entity_type = dspy.InputField(desc="The type of entity to extract (e.g., PERSON, ORGANIZATION, DATE).")
    extracted_entities = dspy.OutputField(desc="A list of extracted entities of the specified type.", prefix="Entities:")
    confidence_score = dspy.OutputField(desc="The confidence score for the extraction (0.0 to 1.0).", prefix="Confidence:")

# Example usage of the signature
# This would typically be part of a larger DSPy program

# Assuming 'document_text' and 'entity_to_find' are defined elsewhere
# result = dspy.Chain(DetailedSignature)(document=document_text, entity_type=entity_to_find)
# print(result.extracted_entities)
# print(result.confidence_score)

```

--------------------------------

### Building RAG as Agent with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial focuses on building a Retrieval-Augmented Generation (RAG) system specifically designed as an AI agent. It explores how to combine RAG capabilities with agentic behavior for more sophisticated interactions.

```Python
import dspy

# Example of building a RAG agent with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class RAGAgent(dspy.Module):
    def __init__(self):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=5)
        self.generate_response = dspy.ChainOfThought(dspy.GenerateAnswer)

    def forward(self, user_query):
        retrieved_docs = self.retrieve(user_query)
        response = self.generate_response(context=retrieved_docs, question=user_query)
        return response

# Usage example (placeholder)
# agent = RAGAgent()
# result = agent('How can I deploy my DSPy application?')
# print(result)
```

--------------------------------

### Python Word Limit Proposer using dspy.Signature and ChainOfThought

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/GEPA_Advanced.md

This example implements a `WordLimitProposer` that inherits from `ProposalFn`. It utilizes a `dspy.Signature` (`GenerateWordLimitedInstruction`) and a `dspy.ChainOfThought` module to improve instructions based on feedback, enforcing a maximum word count.

```python
import dspy
from gepa.core.adapter import ProposalFn
from dspy.teleprompt.gepa.gepa_utils import ReflectiveExample

class GenerateWordLimitedInstruction(dspy.Signature):
    """Given a current instruction and feedback examples, generate an improved instruction with word limit constraints."""

    current_instruction = dspy.InputField(desc="The current instruction that needs improvement")
    feedback_summary = dspy.InputField(desc="Feedback from examples that might include both positive and negative cases")
    max_words = dspy.InputField(desc="Maximum number of words allowed in the new instruction")

    improved_instruction = dspy.OutputField(desc="A new instruction that fixes the issues while staying under the max_words limit")

class WordLimitProposer(ProposalFn):
    def __init__(self, max_words: int = 1000):
        self.max_words = max_words
        self.instruction_improver = dspy.ChainOfThought(GenerateWordLimitedInstruction)

    def __call__(self, candidate: dict[str, str], reflective_dataset: dict[str, list[ReflectiveExample]], components_to_update: list[str]) -> dict[str, str]:
        updated_components = {}

        for component_name in components_to_update:
            if component_name not in candidate or component_name not in reflective_dataset:
                continue

            current_instruction = candidate[component_name]
            component_examples = reflective_dataset[component_name]

            # Create feedback summary
            feedback_text = "\n".join([
                f"Example {i+1}: {ex.get('Feedback', 'No feedback')}"
                for i, ex in enumerate(component_examples)
            ])

            # Use the module to improve the instruction
            result = self.instruction_improver(
                current_instruction=current_instruction,
                feedback_summary=feedback_text,
                max_words=self.max_words
            )

            updated_components[component_name] = result.improved_instruction

        return updated_components

# Usage
gepa = dspy.GEPA(
    metric=my_metric,
    reflection_lm=dspy.LM(model="gpt-5", temperature=1.0, max_tokens=32000, api_key=api_key),
    instruction_proposer=WordLimitProposer(max_words=700),
    auto="medium"
)
```

--------------------------------

### Classify Emotion using DSPy Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/signatures.md

This example defines a DSPy Signature for emotion classification and uses the Predict module to classify the sentiment of a given sentence. It highlights how to use Literal types for predefined output categories.

```python
from typing import Literal
import dspy

class Emotion(dspy.Signature):
    """Classify emotion."""
    
    sentence: str = dspy.InputField()
    sentiment: Literal['sadness', 'joy', 'love', 'anger', 'fear', 'surprise'] = dspy.OutputField()

sentence = "i started feeling a little vulnerable when the giant spotlight started blinding me"  # from dair-ai/emotion

classify = dspy.Predict(Emotion)
response = classify(sentence=sentence)

print(response)
```

--------------------------------

### Save Entire DSPy Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/saving/index.md

This code demonstrates saving the complete DSPy program, including its architecture and state, to a specified directory. This feature requires `dspy>=2.6.0` and utilizes `cloudpickle` for serialization. Saving to a directory allows for metadata like dependency versions to be stored alongside the program.

```python
compiled_dspy_program.save("./dspy_program/", save_program=True)
```

--------------------------------

### StatusMessageProvider Methods

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/utils/StatusMessageProvider.md

Provides methods to generate status messages for the start and end of language model (LM) calls, module execution, and tool usage. These are essential for tracking the progress and status of operations within the dspy framework.

```python
class StatusMessageProvider:
    def lm_end_status_message(self, *args, **kwargs) -> str:
        """Returns the status message for the end of an LM call."""
        ...

    def lm_start_status_message(self, *args, **kwargs) -> str:
        """Returns the status message for the start of an LM call."""
        ...

    def module_end_status_message(self, *args, **kwargs) -> str:
        """Returns the status message for the end of a module execution."""
        ...

    def module_start_status_message(self, *args, **kwargs) -> str:
        """Returns the status message for the start of a module execution."""
        ...

    def tool_end_status_message(self, *args, **kwargs) -> str:
        """Returns the status message for the end of a tool call."""
        ...

    def tool_start_status_message(self, *args, **kwargs) -> str:
        """Returns the status message for the start of a tool call."""
        ...
```

--------------------------------

### Launch Bootstrapped Finetuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Initializes the BootstrapFinetune optimizer and compiles the student classifier using the teacher classifier and an unlabeled training set. This process generates a fine-tuned student model.

```Python
dspy.settings.experimental = True  # fine-tuning is an experimental feature, so we set a flag to enable it

optimizer = dspy.BootstrapFinetune(num_threads=16)  # if you *do* have labels, pass metric=your_metric here!
classify_ft = optimizer.compile(student_classify, teacher=teacher_classify, trainset=unlabeled_trainset)
```

--------------------------------

### Evaluate Prediction using SemanticF1 Metric

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

Instantiates the SemanticF1 metric, generates a prediction using a 'cot' module with a given example, computes the score using the metric, and prints the question, gold response, predicted response, and the calculated score.

```Python
from dspy.evaluate import SemanticF1

# Instantiate the metric.
metric = SemanticF1(decompositional=True)

# Produce a prediction from our `cot` module, using the `example` above as input.
pred = cot(**example.inputs())

# Compute the metric score for the prediction.
score = metric(example, pred)

print(f"Question: \t {example.question}\n")
print(f"Gold Response: \t {example.response}\n")
print(f"Predicted Response: \t {pred.response}\n")
print(f"Semantic F1 Score: {score:.2f}")
```

--------------------------------

### DSPy Chain of Thought Prompting

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example demonstrates the use of DSPy's Chain of Thought (CoT) prompting strategy. CoT encourages the LLM to generate intermediate reasoning steps before arriving at a final answer, which often improves accuracy for complex tasks. DSPy automates the creation and optimization of these CoT prompts.

```Python
import dspy

# Configure the language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a module using ChainOfThought
class CoTQA(dspy.Module):
    def __init__(self):
        super().__init__()
        # ChainOfThought automatically adds reasoning steps
        self.qa = dspy.ChainOfThought(dspy.Answer)

    def forward(self, question):
        return self.qa(question=question)

# Instantiate and compile the module
cot_qa = CoTQA()
cot_qa = cot_qa.compile(llm=llm)

# Execute the module
question = "If John has 5 apples and gives 2 to Mary, how many does he have left?"
result = cot_qa(question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### DSPy Parallel Execution Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/cheatsheet.md

Illustrates how to use DSPy's Parallel module to execute multiple DSPy Predict calls concurrently. It sets up a Parallel instance with a specified number of threads and runs two prediction tasks.

```python
import dspy

parallel = dspy.Parallel(num_threads=2)
predict = dspy.Predict("question -> answer")
result = parallel(
    [
        (predict, dspy.Example(question="1+1").with_inputs("question")),
        (predict, dspy.Example(question="2+2").with_inputs("question"))
    ]
)
result
```

--------------------------------

### Integrate Custom Cache with DSPy in Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/cache/index.md

Instantiate and assign a custom cache class to `dspy.cache` to enable its use within the DSPy framework. This example shows how to configure the custom cache with disk and memory caching enabled.

```python
dspy.cache = CustomCache(enable_disk_cache=True, enable_memory_cache=True, disk_cache_dir=dspy.clients.DISK_CACHE_DIR)
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the core functionality of DSPy, including defining signatures, compiling programs, and executing them. It highlights how to integrate language models and optimize prompts for better performance.

```Python
import dspy

# Define a signature for a question-answering task
class BasicQA(dspy.Signature):
    """Answer the question in three sentences.
    The answer should be concise and factual.
    """
    question = dspy.InputField()
    answer = dspy.OutputField(desc="the answer to the question")

# Initialize a language model (e.g., OpenAI's GPT-3.5 Turbo)
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Create a DSPy program using the signature
qa_program = dspy.Chain(BasicQA)

# Compile the program with a specific optimizer (e.g., BootstrapFewShot)
compiled_qa_program = qa_program.compile(llm=llm, teacher=dspy.BootstrapFewShot())

# Execute the compiled program with a question
question = "What is the capital of France?"
result = compiled_qa_program(question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")
```

--------------------------------

### Design a Well-Documented Tool Function (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/tools.md

Provides an example of a Python function designed for use with DSPy tools, emphasizing clear docstrings for arguments and return values, and type hints for parameters and return types. This promotes better tool integration and understanding.

```python
def good_tool(city: str, units: str = "celsius") -> str:
    """
    Get weather information for a specific city.
    
    Args:
        city: The name of the city to get weather for
        units: Temperature units, either 'celsius' or 'fahrenheit'
    
    Returns:
        A string describing the current weather conditions
    """
    # Implementation with proper error handling
    if not city.strip():
        return "Error: City name cannot be empty"
    
    # Weather logic here...
    return f"Weather in {city}: 25°{units[0].upper()}, sunny"
```

--------------------------------

### Using Other LM Providers with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/index.md

Demonstrates how to use other language model providers supported by LiteLLM within DSPy. Users need to follow the specific provider's instructions for API key setup and then specify the `{provider_name}/{model_name}` format when initializing the DSPy LM.

```python
# Example for Anyscale
# Set environment variable: export ANYSCALE_API_KEY='YourApiKey'
lm = dspy.LM("anyscale/mistralai/Mistral-7B-Instruct-v0.1")
dspy.configure(lm=lm)

# Example for Together AI
# Set environment variable: export TOGETHERAI_API_KEY='YourApiKey'
lm = dspy.LM("together_ai/togethercomputer/llama-2-70b-chat")
dspy.configure(lm=lm)
```

--------------------------------

### dspy Metric Definition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet shows how to define a custom metric for evaluating dspy program performance. Metrics are essential for measuring the quality of LM outputs and guiding optimization.

```Python
from dspy.evaluate import Evaluate

def my_metric(gold, pred, trace=None):
    # Custom evaluation logic here
    return 1.0 if gold.output_field == pred.output_field else 0.0

# Assuming 'my_program' is an instance of MyProgram
# Assuming 'test_data' is a list of examples
evaluator = Evaluate(metric=my_metric, dev_data=test_data)
results = evaluator.evaluate(my_program)
```

--------------------------------

### DSPy Chain of Thought Prompting

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example demonstrates the use of DSPy's Chain of Thought (CoT) prompting strategy. CoT encourages the language model to generate intermediate reasoning steps before providing a final answer, leading to more accurate and explainable results.

```Python
import dspy

# Assume llm is already initialized
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a module using ChainOfThought
class ComplexReasoning(dspy.Module):
    def __init__(self):
        super().__init__()
        # Use ChainOfThought for a task requiring reasoning
        self.reason_and_answer = dspy.ChainOfThought(dspy.Answer)

    def forward(self, question, context):
        return self.reason_and_answer(question=question, context=context)

# Example usage
question_complex = "If a train leaves station A at 2 PM traveling at 60 mph, and station B is 180 miles away, what time does it arrive at station B?"
context_complex = "The train travels at a constant speed."

reasoning_module = ComplexReasoning()
result_complex = reasoning_module(question=question_complex, context=context_complex)

print(f"Question: {question_complex}")
print(f"Reasoning: {result_complex.rationale}")
print(f"Answer: {result_complex.answer}")
```

--------------------------------

### Download and Load RAG-QA Arena Tech Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

Downloads the RAG-QA Arena 'Tech' dataset from Hugging Face and loads it into a list of dictionaries using ujson. This dataset contains question-answer pairs for evaluating language models.

```Python
import ujson
from dspy.utils import download

# Download question--answer pairs from the RAG-QA Arena "Tech" dataset.
download("https://huggingface.co/dspy/cache/resolve/main/ragqa_arena_tech_examples.jsonl")

with open("ragqa_arena_tech_examples.jsonl") as f:
    data = [ujson.loads(line) for line in f]
```

--------------------------------

### DSPy Math Reasoning Optimization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/optimize_ai_program/index.md

Optimize DSPy programs for mathematical reasoning tasks. This tutorial demonstrates how optimizers can dramatically improve performance on complex math problems by finding better prompting strategies and few-shot examples.

```Python
import dspy

# Example usage (conceptual, actual code would be in the notebook)
# optimizer.optimize(your_math_program)
```

--------------------------------

### Get GitHub Repository File Tree

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/llms_txt_generation/index.md

Fetches the file structure of a GitHub repository using the GitHub API. It requires a GitHub access token and extracts file paths recursively. Dependencies include the 'requests' and 'os' libraries.

```python
import requests
import os
from pathlib import Path

os.environ["GITHUB_ACCESS_TOKEN"] = "<your_access_token>"

def get_github_file_tree(repo_url):
    """Get repository file structure from GitHub API."""
    # Extract owner/repo from URL
    parts = repo_url.rstrip('/').split('/')
    owner, repo = parts[-2], parts[-1]
    
    api_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/main?recursive=1"
    response = requests.get(api_url, headers={
        "Authorization": f"Bearer {os.environ.get('GITHUB_ACCESS_TOKEN')}"
    })
    
    if response.status_code == 200:
        tree_data = response.json()
        file_paths = [item['path'] for item in tree_data['tree'] if item['type'] == 'blob']
        return '\n'.join(sorted(file_paths))
    else:
        raise Exception(f"Failed to fetch repository tree: {response.status_code}")
```

--------------------------------

### Evaluate GPT-4o-mini Agent

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Initializes and evaluates the performance of the GPT-4o-mini agent on the defined task and dataset.

```Python
agent_4o_mini = Agent()
agent_4o_mini.set_lm(gpt4o_mini)

evaluate(agent_4o_mini)
```

--------------------------------

### DSPy Signature with Input/Output Fields

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example showcases how to define a DSPy signature with explicit input and output fields. Signatures define the expected input and output of a language model call, aiding in structured data handling.

```Python
import dspy

# Define a signature for question answering
class QuestionAnswering(dspy.Signature):
    """Answer the user's question."""
    question = dspy.InputField()
    answer = dspy.OutputField()

# Use the signature in a module
class QAModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict_qa = dspy.Predict(QuestionAnswering)

    def forward(self, question):
        return self.predict_qa(question=question)

# Example usage
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# qa_module = QAModule()
# result = qa_module(question='What is the largest planet in our solar system?')
# print(result.answer)
```

--------------------------------

### DSPy Chain of Thought Prompting

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example demonstrates how to implement Chain of Thought (CoT) prompting within DSPy. CoT encourages the language model to generate intermediate reasoning steps before arriving at a final answer, improving accuracy for complex problems.

```Python
import dspy

# Define a signature that includes a reasoning step
class CoTQuestionAnswering(dspy.Signature):
    """Answer a question with a step-by-step thinking process."""
    question = dspy.InputField()
    reasoning = dspy.OutputField(desc="Step-by-step thinking process.")
    answer = dspy.OutputField()

# Create a DSPy program using the CoT signature
class CoTQA(dspy.Module):
    def __init__(self, dsp):
        super().__init__(dsp)
        self.predict_with_reasoning = dspy.Predict(CoTQuestionAnswering)

    def forward(self, question):
        return self.predict_with_reasoning(question=question)

# Example usage (assuming llm is initialized)
# cot_qa = CoTQA(llm)
# result = cot_qa(question="If John has 5 apples and gives 2 to Mary, how many does he have left?")
# print(f"Reasoning: {result.reasoning}")
# print(f"Answer: {result.answer}")
```

--------------------------------

### dspy Program Compilation with GRPO

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Compiles a dspy student program using the initialized GRPO compiler with provided training and validation datasets. The result is an optimized program ready for use.

```python
optimized_papillon = compiler.compile(
    student=papillon,
    trainset=trainset,
    valset=devset,
)
```

--------------------------------

### Basic Refine Usage for One-Word Answers

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/output_refinement/best-of-n-and-refine.md

Shows the basic usage of the Refine module, which enhances BestOfN by adding an automatic feedback loop. It aims to get a one-word answer using a custom reward function.

```python
import dspy

def one_word_answer(args, pred: dspy.Prediction) -> float:
    return 1.0 if len(pred.answer.split()) == 1 else 0.0

refine = dspy.Refine(
    module=dspy.ChainOfThought("question -> answer"), 
    N=3, 
    reward_fn=one_word_answer, 
    threshold=1.0
)

result = refine(question="What is the capital of Belgium?")
print(result.answer)
```

--------------------------------

### DSPy Signature Definition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This example illustrates how to define a 'signature' in DSPy, which specifies the input and output fields for a language model call. Signatures are crucial for structuring interactions with LLMs and ensuring consistent data flow within DSPy programs.

```Python
import dspy

# Define a signature for a question-answering task
class QuestionAnswer(dspy.Signature):
    """Answer the user's question."""
    question: str
    answer: str

# Use the signature in a DSPy program
class QAProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.qa = dspy.Predict(QuestionAnswer)

    def forward(self, question):
        return self.qa(question=question)

# Example usage
program = QAProgram()
result = program(question='Who wrote Hamlet?')
print(result.answer)
```

--------------------------------

### Get Specific GitHub File Content

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/llms_txt_generation/index.md

Retrieves the content of a specific file from a GitHub repository via the API. It decodes the content from base64 and requires a GitHub access token. Dependencies include 'requests' and 'base64'.

```python
import requests
import os
from pathlib import Path

os.environ["GITHUB_ACCESS_TOKEN"] = "<your_access_token>"

def get_github_file_content(repo_url, file_path):
    """Get specific file content from GitHub."""
    parts = repo_url.rstrip('/').split('/')
    owner, repo = parts[-2], parts[-1]
    
    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"
    response = requests.get(api_url, headers={
        "Authorization": f"Bearer {os.environ.get('GITHUB_ACCESS_TOKEN')}"
    })
    
    if response.status_code == 200:
        import base64
        content = base64.b64decode(response.json()['content']).decode('utf-8')
        return content
    else:
        return f"Could not fetch {file_path}"
```

--------------------------------

### Evaluate DSPy Hop Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Initializes and runs the DSPy evaluation using the defined `devset` and `top5_recall` metric. It prints progress and displays the top 5 results.

```Python
evaluate = dspy.Evaluate(devset=devset, metric=top5_recall, num_threads=16, display_progress=True, display_table=5)

evaluate(Hop())
```

--------------------------------

### Optimize DSPy Agent with SIMBA

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

This code snippet shows how to optimize a DSPy agent using the SIMBA optimizer. It initializes SIMBA with a metric, step limits, and demo limits, then compiles the agent using a training set and a specified seed.

```python
simba = dspy.SIMBA(metric=metric, max_steps=12, max_demos=10)
optimized_agent = simba.compile(agent, trainset=trainset, seed=6793115)
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

### DSPy Signature for Sentiment Classification

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/signatures.md

Demonstrates a DSPy Predict module for sentiment classification. The signature takes a 'sentence' string as input and outputs a 'sentiment' boolean. The example shows how to instantiate this signature and use it to classify the sentiment of a given sentence.

```python
sentence = "it's a charming and often affecting journey."  # example from the SST-2 dataset.

classify = dspy.Predict('sentence -> sentiment: bool')  # we'll see an example with Literal[] later
classify(sentence=sentence).sentiment
```

--------------------------------

### Connect to Local LMs via Ollama with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/index.md

Connects DSPy to local language models served by Ollama. This involves installing Ollama, running an LM server, and then configuring DSPy with the local endpoint and model name. An empty api_key is used for local Ollama connections.

```bash
> curl -fsSL https://ollama.ai/install.sh | sh
> ollama run llama3.2:1b
```

```python
import dspy
lm = dspy.LM("ollama_chat/llama3.2:1b", api_base="http://localhost:11434", api_key="")
dspy.configure(lm=lm)
```

--------------------------------

### Inspect LM History and Usage Metadata

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/language_models.md

Provides examples for inspecting the interaction history of an LM object. This includes checking the number of calls made and accessing the detailed metadata for the last interaction, such as prompts, responses, and token usage.

```python
len(lm.history)  # e.g., 3 calls to the LM

lm.history[-1].keys()  # access the last call to the LM, with all metadata
```

--------------------------------

### Game Interface: Get Player Choice

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Prompts the player to make a choice and validates the input to ensure it's within the acceptable range of options. Handles potential errors like non-numeric input.

```Python
def get_player_choice(max_choices: int) -> int:
    """Get player's choice with input validation."""
    while True:
        try:
            choice = typer.prompt("Choose an action (number)")
            choice_num = int(choice)
            if 1 <= choice_num <= max_choices:
                return choice_num - 1
            else:
                console.print(f"[red]Please enter a number between 1 and {max_choices}[/red]")
        except ValueError:
            console.print("[red]Please enter a valid number[/red]")
```

--------------------------------

### DSPy Chain of Thought (CoT) Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates how to implement Chain of Thought (CoT) reasoning in DSPy. CoT prompts the language model to generate intermediate reasoning steps before providing a final answer, improving accuracy on complex tasks.

```Python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for CoT question answering
class CoTQuestionAnswering(dspy.Signature):
    """Answer the user's question by thinking step-by-step."""
    question = dspy.InputField()
    reasoning = dspy.OutputField(desc="step-by-step thinking process")
    answer = dspy.OutputField()

# Use the signature with Chain of Thought
class CoTQAModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict_cot = dspy.ChainOfThought(CoTQuestionAnswering)

    def forward(self, question):
        return self.predict_cot(question=question)

# Example usage
# cot_qa_module = CoTQAModule()
# result = cot_qa_module(question='If John has 5 apples and gives 2 to Mary, how many does he have left?')
# print(f"Reasoning: {result.reasoning}")
# print(f"Answer: {result.answer}")
```

--------------------------------

### Python dspy Data Classification Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates using dspy for data classification tasks in Python. This snippet would typically involve defining a dspy signature for classification and then applying it to input data.

```Python
import dspy

# Define a dspy signature for classification
# Example: class Classify(dspy.Signature):
#     "Classify the input text into one of the predefined categories."
#     input_text: str
#     categories: list[str]
#     classification: str

# Initialize the dspy pipeline (replace with actual model setup)
# dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Example usage (assuming 'text_to_classify' and 'available_categories' are defined)
# classification_result = dspy.Predict(Classify)(input_text=text_to_classify, categories=available_categories)
# print(classification_result.classification)
```

--------------------------------

### Implement Custom Cache Key Logic in Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/cache/index.md

Example of a custom cache implementation where the cache key is generated solely from the 'messages' content of the request, ignoring other parameters. This demonstrates how to customize cache behavior for specific use cases.

```python
class CustomCache(dspy.clients.Cache):

    def cache_key(self, request: dict[str, Any], ignored_args_for_cache_key: Optional[list[str]] = None) -> str:
        messages = request.get("messages", [])
        return sha256(ujson.dumps(messages, sort_keys=True).encode()).hexdigest()
```

--------------------------------

### Prepare Student Agent for Fine-tuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Creates a deep copy of the optimized agent to serve as the student model for fine-tuning. It then sets the language model for the student to gpt4o-mini.

```Python
student_4o_mini = optimized_4o.deepcopy()
student_4o_mini.set_lm(gpt4o_mini)
# student_4o_mini.react.demos = []  # you can optionally reset the demos
```

--------------------------------

### Configure Gemini LM with API Key

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/language_models.md

Sets up a Gemini language model from AI Studio using an API key. Authentication can be done via the GEMINI_API_KEY environment variable or by passing the key directly.

```python
import dspy
lm = dspy.LM('gemini/gemini-2.5-pro-preview-03-25', api_key='GEMINI_API_KEY')
dspy.configure(lm=lm)
```

--------------------------------

### Launch Local Finetuned Model

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Launches the fine-tuned language model for the compiled classifier. This step is necessary when working with local models.

```Python
classify_ft.get_lm().launch()
```

--------------------------------

### Implement RAG Instruction Improver Module - Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/GEPA_Advanced.md

This Python code defines the 'RAGInstructionImprover' module in dspy. It orchestrates the process of improving instructions by first generating queries based on examples, then retrieving relevant documentation using a provided retrieval model, and finally generating an improved instruction. It uses the 'GenerateDocumentationQuery' and 'GenerateRAGEnhancedInstruction' signatures.

```python
class RAGInstructionImprover(dspy.Module):
    """Module that uses RAG to improve instructions with specialized documentation."""

    def __init__(self, retrieval_model):
        super().__init__()
        self.retrieve = retrieval_model  # Could be dspy.Retrieve or custom retriever
        self.query_generator = dspy.ChainOfThought(GenerateDocumentationQuery)
        self.generate_answer = dspy.ChainOfThought(GenerateRAGEnhancedInstruction)

    def forward(self, current_instruction: str, component_examples: list):
        """Improve instruction using retrieved documentation."""

        # Let LM analyze examples and generate targeted retrieval queries
        query_result = self.query_generator(
            current_instruction=current_instruction,
            examples_with_feedback=component_examples
        )

        results = self.retrieve.query(
            query_texts=query_result.retrieval_queries,
            n_results=3
        )

        relevant_docs_parts = []
        for i, (query, query_docs) in enumerate(zip(query_result.retrieval_queries, results['documents'])):
            if query_docs:
                docs_formatted = "\n".join([f"  - {doc}" for doc in query_docs])
                relevant_docs_parts.append(
                    f"**Search Query #{i+1}**: {query}\n"
                    f"**Retrieved Guidelines**:\n{docs_formatted}"
                )

        relevant_docs = "\n\n" + "="*60 + "\n\n".join(relevant_docs_parts) + "\n" + "="*60

        # Generate improved instruction with retrieved context
        result = self.generate_answer(
            current_instruction=current_instruction,
            relevant_documentation=relevant_docs,
            examples_with_feedback=component_examples
        )

        return result
```

--------------------------------

### Compile DSPy with Assertions using BootstrapFewShotWithRandomSearch

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/7-assertions.md

This snippet demonstrates how to compile a DSPy student model using assertions with the BootstrapFewShotWithRandomSearch teleprompter. It shows the setup of the teleprompter with a validation metric and then compiles the model for both 'Compilation with Assertions' and 'Compilation + Inference with Assertions' scenarios.

```python
teleprompter = BootstrapFewShotWithRandomSearch(
    metric=validate_context_and_answer_and_hops,
    max_bootstrapped_demos=max_bootstrapped_demos,
    num_candidate_programs=6,
)

#Compilation with Assertions
compiled_with_assertions_baleen = teleprompter.compile(student = baleen, teacher = baleen_with_assertions, trainset = trainset, valset = devset)

#Compilation + Inference with Assertions
compiled_baleen_with_assertions = teleprompter.compile(student=baleen_with_assertions, teacher = baleen_with_assertions, trainset=trainset, valset=devset)
```

--------------------------------

### Define Validation Functions for DSPy Assertions in Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/7-assertions.md

This Python code provides example validation functions for DSPy Assertions. It includes a simple check for query length and a more complex function to ensure generated queries are distinct from previous ones.

```Python
#simplistic boolean check for query length
len(query) <= 100

#Python function for validating distinct queries
def validate_query_distinction_local(previous_queries, query):
    """check if query is distinct from previous queries"""
    if previous_queries == []:
        return True
    if dspy.evaluate.answer_exact_match_str(query, previous_queries, frac=0.8):
        return False
    return True
```

--------------------------------

### Classification Finetuning with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial covers finetuning classification models within the DSPy framework. It explains how to adapt pre-trained models or train new ones for specific classification tasks.

```Python
import dspy

# Example of classification finetuning with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
# Assume 'train_data' and 'validation_data' are available datasets

# Configure DSPy for finetuning
# dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

# Define a classification module
class FinetunableClassifier(dspy.Module):
    def __init__(self):
        super().__init__()
        self.classify = dspy.Classifier(labels=['A', 'B', 'C'])

    def forward(self, text):
        return self.classify(text=text)

# Example of finetuning (conceptual)
# classifier = FinetunableClassifier()
# optimizer = dspy.Optimizer(model=classifier, train_data=train_data, val_data=validation_data)
# optimized_classifier = optimizer.optimize()
# print('Finetuning complete.')
```

--------------------------------

### Connect to Local LMs via SGLang with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/index.md

Connects DSPy to local language models served by SGLang. This requires installing SGLang and launching its server, then configuring DSPy to use the SGLang server as an OpenAI-compatible endpoint. The `model_type` is set to `chat` for conversational models.

```bash
> pip install "sglang[all]"
> pip install flashinfer -i https://flashinfer.ai/whl/cu121/torch2.4/ 

> CUDA_VISIBLE_DEVICES=0 python -m sglang.launch_server --port 7501 --model-path meta-llama/Llama-3.1-8B-Instruct
```

```python
lm = dspy.LM("openai/meta-llama/Llama-3.1-8B-Instruct",
               api_base="http://localhost:7501/v1",  # ensure this points to your port
               api_key="local", model_type="chat")
dspy.configure(lm=lm)
```

--------------------------------

### Implement Custom Status Message Provider in DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This Python code defines a custom status message provider by subclassing `dspy.streaming.StatusMessageProvider`. It overrides `tool_start_status_message` and `tool_end_status_message` to return specific status messages for tool calls, including the tool's name and inputs/outputs.

```python
class MyStatusMessageProvider(dspy.streaming.StatusMessageProvider):
    def tool_start_status_message(self, instance, inputs):
        return f"Calling Tool {instance.name} with inputs {inputs}..."

    def tool_end_status_message(self, outputs):
        return f"Tool finished with output: {outputs}!"
```

--------------------------------

### Memory Tools for Mem0 Integration

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mem0_react_agent/index.md

Defines a `MemoryTools` class to encapsulate operations for interacting with the Mem0 memory system. It includes methods for storing, searching, retrieving all, updating, and deleting memories, along with a utility function to get the current time.

```python
import datetime

class MemoryTools:
    """Tools for interacting with the Mem0 memory system."""

    def __init__(self, memory: Memory):
        self.memory = memory

    def store_memory(self, content: str, user_id: str = "default_user") -> str:
        """Store information in memory."""
        try:
            self.memory.add(content, user_id=user_id)
            return f"Stored memory: {content}"
        except Exception as e:
            return f"Error storing memory: {str(e)}"

    def search_memories(self, query: str, user_id: str = "default_user", limit: int = 5) -> str:
        """Search for relevant memories."""
        try:
            results = self.memory.search(query, user_id=user_id, limit=limit)
            if not results:
                return "No relevant memories found."

            memory_text = "Relevant memories found:\n"
            for i, result in enumerate(results["results"]):
                memory_text += f"{i}. {result['memory']}\n"
            return memory_text
        except Exception as e:
            return f"Error searching memories: {str(e)}"

    def get_all_memories(self, user_id: str = "default_user") -> str:
        """Get all memories for a user."""
        try:
            results = self.memory.get_all(user_id=user_id)
            if not results:
                return "No memories found for this user."

            memory_text = "All memories for user:\n"
            for i, result in enumerate(results["results"]):
                memory_text += f"{i}. {result['memory']}\n"
            return memory_text
        except Exception as e:
            return f"Error retrieving memories: {str(e)}"

    def update_memory(self, memory_id: str, new_content: str) -> str:
        """Update an existing memory."""
        try:
            self.memory.update(memory_id, new_content)
            return f"Updated memory with new content: {new_content}"
        except Exception as e:
            return f"Error updating memory: {str(e)}"

    def delete_memory(self, memory_id: str) -> str:
        """Delete a specific memory."""
        try:
            self.memory.delete(memory_id)
            return "Memory deleted successfully."
        except Exception as e:
            return f"Error deleting memory: {str(e)}"

def get_current_time() -> str:
    """Get the current date and time."""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
```

--------------------------------

### dspy.Tool Methods Overview (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/primitives/Tool.md

Provides an overview of the key methods available for the dspy.Tool class. These methods facilitate tool execution, asynchronous calls, description retrieval, and integration with different LLM response formats and external libraries.

```python
class Tool:
    def __call__(self, *args, **kwargs):
        """Call the tool.

        Returns:
            The result of the tool call.
        """
        pass

    async def acall(self, *args, **kwargs):
        """Asynchronously call the tool.

        Returns:
            A coroutine that resolves to the result of the tool call.
        """
        pass

    @property
    def description(self) -> str:
        """Get the description of the tool.

        Returns:
            A string describing the tool's purpose and functionality.
        """
        pass

    @classmethod
    def from_langchain(cls, lc_tool):
        """Create a dspy.Tool from a LangChain tool.

        Args:
            lc_tool: The LangChain tool object.

        Returns:
            A dspy.Tool instance.
        """
        pass

    @classmethod
    def from_mcp_tool(cls, mcp_tool):
        """Create a dspy.Tool from an MCP tool.

        Args:
            mcp_tool: The MCP tool object.

        Returns:
            A dspy.Tool instance.
        """
        pass

    def format(self, *args, **kwargs) -> str:
        """Format the tool call for the language model.

        Args:
            *args: Positional arguments for the tool call.
            **kwargs: Keyword arguments for the tool call.

        Returns:
            A string representing the formatted tool call.
        """
        pass

    def format_as_litellm_function_call(self, *args, **kwargs) -> dict:
        """Format the tool call as a LiteLLM function call.

        Args:
            *args: Positional arguments for the tool call.
            **kwargs: Keyword arguments for the tool call.

        Returns:
            A dictionary representing the LiteLLM function call.
        """
        pass

    def is_streamable(self) -> bool:
        """Check if the tool supports streaming.

        Returns:
            True if the tool is streamable, False otherwise.
        """
        pass

    def parse_lm_response(self, response: str) -> Any:
        """Parse the language model's response to extract tool arguments.

        Args:
            response: The raw response string from the language model.

        Returns:
            The parsed tool arguments.
        """
        pass

    def parse_stream_chunk(self, chunk: str) -> Any:
        """Parse a chunk of a streaming response.

        Args:
            chunk: A chunk of the streaming response.

        Returns:
            The parsed chunk data.
        """
        pass

    def serialize_model(self, model: Any) -> str:
        """Serialize a model object into a string representation.

        Args:
            model: The model object to serialize.

        Returns:
            A string representation of the model.
        """
        pass

    @staticmethod
    def extract_custom_type_from_annotation(annotation: Any) -> Optional[Type]:
        """Extract a custom type from a type annotation.

        Args:
            annotation: The type annotation to inspect.

        Returns:
            The extracted custom type, or None if no custom type is found.
        """
        pass
```

--------------------------------

### DSPy: Using Modules and Composing Chains

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to create reusable dspy Modules and compose them into more complex chains, enabling modular LLM application development.

```Python
import dspy

# Assume llm is already initialized
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

class KeywordExtractor(dspy.Module):
    def __init__(self):
        super().__init__()
        self.extract = dspy.Chain(dspy.Signature(
            "Extract keywords from the text.\ntext: The input text.\nkeywords: comma-separated keywords.",
            "text",
            "keywords"
        ))

    def forward(self, text):
        return self.extract(text=text)

class Summarizer(dspy.Module):
    def __init__(self):
        super().__init__()
        self.summarize = dspy.Chain(dspy.Signature(
            "Summarize the text.\ntext: The input text.\nsummary: A concise summary.",
            "text",
            "summary"
        ))

    def forward(self, text):
        return self.summarize(text=text)

class CombinedPipeline(dspy.Module):
    def __init__(self):
        super().__init__()
        self.extractor = KeywordExtractor()
        self.summarizer = Summarizer()

    def forward(self, text):
        keywords_result = self.extractor(text=text)
        summary_result = self.summarizer(text=text)
        return dspy.Prediction(keywords=keywords_result.keywords, summary=summary_result.summary)

# Instantiate the pipeline
pipeline = CombinedPipeline()

# Run the pipeline
input_text = "DSPy is a framework for programming large language models. It helps you create, tune, and deploy LLM applications."
result = pipeline(text=input_text)

print(f"Input Text: {input_text}")
print(f"Keywords: {result.keywords}")
print(f"Summary: {result.summary}")
```

--------------------------------

### DSPy ChainOfThought for RAG with Wikipedia Search

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/index.md

This example shows how to implement Retrieval-Augmented Generation (RAG) using `dspy.ChainOfThought`. It includes a helper function `search_wikipedia` that uses `dspy.ColBERTv2` to retrieve context, which is then passed along with a question to the RAG module. The signature defines a context-question-to-response transformation.

```python
import dspy

def search_wikipedia(query: str) -> list[str]:
    results = dspy.ColBERTv2(url="http://20.102.90.50:2017/wiki17_abstracts")(query, k=3)
    return [x["text"] for x in results]

rag = dspy.ChainOfThought("context, question -> response")

question = "What\'s the name of the castle that David Gregory inherited?"
rag(context=search_wikipedia(question), question=question)
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

### Python: Initialize and Run DSPy Agent with MCP Tools

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

This Python code snippet initializes an asynchronous connection to an MCP server, lists available tools, converts them to DSPy tools, and creates a `dspy.ReAct` agent. It then calls the agent asynchronously with a user request to book a flight.

```Python
import dspy
from dspy.tools.mcp import stdio_client, ClientSession
import asyncio

# Create server parameters for stdio connection
server_params = StdioServerParameters(
    command="python",  # Executable
    args=["script_tmp/mcp_server.py"],  # Optional command line arguments
    env=None,  # Optional environment variables
)

async def run(user_request):
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Initialize the connection
            await session.initialize()
            # List available tools
            tools = await session.list_tools()

            # Convert MCP tools to DSPy tools
            dspy_tools = []
            for tool in tools.tools:
                dspy_tools.append(dspy.Tool.from_mcp_tool(session, tool))

            # Create the agent
            react = dspy.ReAct(DSPyAirlineCustomerService, tools=dspy_tools)

            result = await react.acall(user_request=user_request)
            print(result)

if __name__ == "__main__":
    asyncio.run(run("please help me book a flight from SFO to JFK on 09/01/2025, my name is Adam"))
```

--------------------------------

### Game Interface: Show Help

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Provides detailed instructions on how to play the game, including controls, gameplay mechanics, and tips for success. It uses formatted text and waits for user confirmation to proceed.

```Python
def show_help():
    """Display help information."""
    help_text = """
[bold]How to Play:[/bold]

• This is a text-based adventure game powered by AI
• Make choices by selecting numbered options
• Talk to NPCs to learn about the world and get quests
• Explore different locations to find items and adventures
• Your choices affect the story and character development
• Use 'inventory' to check your items
• Use 'status' to see your character info
• Type 'save' to save your progress
• Type 'quit' to return to main menu

[bold]Tips:[/bold]
• Different skills affect your success in various actions
• NPCs remember your previous interactions
• Explore thoroughly - there are hidden secrets!
• Your reputation affects how NPCs treat you
    """
    console.print(Panel(help_text.strip(), title="Game Help", style="blue"))
    typer.prompt("Press Enter to continue")
```

--------------------------------

### Enable Output Token Streaming in DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This snippet demonstrates how to enable token streaming for a DSPy Predict module. It wraps a 'question->answer' prediction with `dspy.streamify` and configures a `StreamListener` to capture the 'answer' field. It requires setting an OpenAI API key and configuring the language model.

```Python
import os

import dspy

os.environ["OPENAI_API_KEY"] = "your_api_key"

dspy.configure(lm=dspy.LM("openai/gpt-4o-mini"))

predict = dspy.Predict("question->answer")

# Enable streaming for the 'answer' field
stream_predict = dspy.streamify(
    predict,
    stream_listeners=[dspy.streaming.StreamListener(signature_field_name="answer")],
)
```

--------------------------------

### DSPy: Programmatic Prompt Optimization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to programmatically optimize prompts using dspy's optimization capabilities. This involves defining metrics and using the `dspy.Optimizer` to find better prompts.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class OptimizedQA(dspy.Signature):
    """Answer questions based on the provided context."""

    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Define a metric for evaluation
def accuracy(example, pred, trace=None):
    return example.answer == pred.answer

# Create a program with the signature
program = dspy.Program(OptimizedQA)

# Optimize the program
optimizer = dspy.Optimizer(program, metric=accuracy, n=5)
optimized_program = optimizer.optimize()

# Example usage with optimized program:
# print(optimized_program(context="The capital of Spain is Madrid.", question="What is the capital of Spain?").answer)
```

--------------------------------

### DSPy: Stream Final Prediction from Cache

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

When a cached result is available, DSPy's streaming will skip individual token generation and directly yield the final Prediction object. This optimizes performance by avoiding unnecessary processing for already computed outputs.

```Python
Prediction(
    answer='To get to the other side of the dinner plate!'
)
```

--------------------------------

### Configure DSPy Language Models

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Configures the DSPy environment with two language models: a small Llama-3.2-3B-Instruct model for general use and GPT-4o as a teacher model. The main LM is set to the Llama model.

```python
import dspy

llama3b = dspy.LM('<provider>/Llama-3.2-3B-Instruct', temperature=0.7)
gpt4o = dspy.LM('openai/gpt-4o', temperature=0.7)

dspy.configure(lm=llama3b)
```

--------------------------------

### Default GEPA Instruction Proposer Example

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/GEPA_Advanced.md

This Python snippet demonstrates how to use the default instruction proposer in dspy.GEPA. The default proposer is used automatically when no custom `instruction_proposer` is specified. It leverages a reflection LM to refine instructions based on current performance.

```python
import dspy

# Assume my_metric and examples are defined elsewhere
# Assume api_key is set or available in the environment

gepa = dspy.GEPA(
    metric=my_metric,
    reflection_lm=dspy.LM(model="gpt-5", temperature=1.0, max_tokens=32000, api_key=api_key),
    auto="medium"
)

# Assume 'student' is your DSPy program
optimized_program = gepa.compile(student, trainset=examples)
```

--------------------------------

### Configure DSPy LM

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

Sets up the language model for DSPy, specifying the model to be used (e.g., 'openai/gpt-4o-mini'). This is a prerequisite for using DSPy's features.

```python
lm = dspy.LM(model='openai/gpt-4o-mini')
dspy.configure(lm=lm)
```

--------------------------------

### Interactive Python Library Learning Session

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This Python function, `interactive_learning_session`, provides a command-line interface for users to learn about Python libraries interactively. It prompts the user for a library name, documentation URLs, and optional custom use cases. It then calls `learn_any_library` to process the information and displays a summary of the learning results. The session continues until the user chooses to quit.

```Python
def interactive_learning_session():
    """Interactive session for learning libraries with user input."""
    
    print("🎯 Welcome to the Interactive Library Learning System!")
    print("This system will help you learn any Python library from its documentation.\n")
    
    learned_libraries = {}
    
    while True:
        print("\n" + "="*60)
        print("🚀 LIBRARY LEARNING SESSION")
        print("="*60)
        
        # Get library name from user
        library_name = input("\n📚 Enter the library name you want to learn (or 'quit' to exit): ").strip()
        
        if library_name.lower() in ['quit', 'exit', 'q']:
            print("\n👋 Thanks for using the Interactive Library Learning System!")
            break
        
        if not library_name:
            print("❌ Please enter a valid library name.")
            continue
        
        # Get documentation URLs
        print(f"\n🔗 Enter documentation URLs for {library_name} (one per line, empty line to finish):")
        urls = []
        while True:
            url = input("  URL: ").strip()
            if not url:
                break
            if not url.startswith(('http://', 'https://')):
                print("    ⚠️  Please enter a valid URL starting with http:// or https://")
                continue
            urls.append(url)
        
        if not urls:
            print("❌ No valid URLs provided. Skipping this library.")
            continue
        
        # Get custom use cases from user
        print(f"\n🎯 Define use cases for {library_name} (optional, press Enter for defaults):")
        print("   Default use cases will be: Basic setup, Common operations, Advanced usage")
        
        user_wants_custom = input("   Do you want to define custom use cases? (y/n): ").strip().lower()
        
        use_cases = None
        if user_wants_custom in ['y', 'yes']:
            print("   Enter your use cases (one per line, empty line to finish):")
            use_cases = []
            while True:
                use_case = input("     Use case: ").strip()
                if not use_case:
                    break
                use_cases.append(use_case)
            
            if not use_cases:
                print("   No custom use cases provided, using defaults.")
                use_cases = None
        
        # Learn the library
        print(f"\n🚀 Starting learning process for {library_name}...")
        result = learn_any_library(library_name, urls, use_cases)
        
        if result:
            learned_libraries[library_name] = result
            print(f"\n✅ Successfully learned {library_name}!")
            
            # Show summary
            print(f"\n📊 Learning Summary for {library_name}:")
            print(f"   • Core concepts: {len(result['library_info']['core_concepts'])} identified")
            print(f"   • Common patterns: {len(result['library_info']['patterns'])} found")
            print(f"   • Examples generated: {len(result['examples'])}")
            
            # Ask if user wants to see examples
            show_examples = input(f"\n👀 Do you want to see the generated examples for {library_name}? (y/n): ").strip().lower()
            
            if show_examples in ['y', 'yes']:
                # (Code to display examples would go here, but is truncated in the input)
```

--------------------------------

### Handle Different Stream Chunk Types in DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/streaming/index.md

This snippet illustrates how to process different types of chunks received from a DSPy streaming output. It checks if a chunk is a `dspy.streaming.StreamResponse` (for tokens) or a `dspy.Prediction` (for the final output) and handles them accordingly. This requires an asyncio event loop.

```Python
import asyncio

async def read_output_stream():
  output_stream = stream_predict(question="Why did a chicken cross the kitchen?")

  async for chunk in output_stream:
    return_value = None
    if isinstance(chunk, dspy.streaming.StreamResponse):
      print(f"Output token of field {chunk.signature_field_name}: {chunk.chunk}")
    elif isinstance(chunk, dspy.Prediction):
      return_value = chunk


program_output = asyncio.run(read_output_stream())
print("Final output: ", program_output)
```

--------------------------------

### Define Evaluation Metric for DSPy Outputs (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Defines functions to score urgency, sentiment, and categories individually, and an aggregate metric function. It takes the example, prediction, and optional trace, returning a float score. Requires 'json' library for parsing.

```python
import json

def score_urgency(gold_urgency, pred_urgency):
    """
    Compute score for the urgency module.
    """
    score = 1.0 if gold_urgency == pred_urgency else 0.0
    return score

def score_sentiment(gold_sentiment, pred_sentiment):
    """
    Compute score for the sentiment module.
    """
    score = 1.0 if gold_sentiment == pred_sentiment else 0.0
    return score

def score_categories(gold_categories, pred_categories):
    """
    Compute score for the categories module.
    Uses the same match/mismatch logic as category accuracy in the score.
    """
    correct = 0
    for k, v in gold_categories.items():
        if v and k in pred_categories:
            correct += 1
        elif not v and k not in pred_categories:
            correct += 1
    score = correct / len(gold_categories)
    return score

def metric(example, pred, trace=None, pred_name=None, pred_trace=None):
    """
    Computes a score based on agreement between prediction and gold standard for categories, sentiment, and urgency.
    Returns the score (float).
    """
    # Parse gold standard from example
    gold = json.loads(example['answer'])

    # Compute scores for all modules
    score_urgency_val = score_urgency(gold['urgency'], pred.urgency)
    score_sentiment_val = score_sentiment(gold['sentiment'], pred.sentiment)
    score_categories_val = score_categories(gold['categories'], pred.categories)

    # Overall score: average of the three accuracies
    total = (score_urgency_val + score_sentiment_val + score_categories_val) / 3

    return total
```

--------------------------------

### DSPy Predict for Information Extraction

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/index.md

This example illustrates information extraction using `dspy.Predict`. A custom signature `ExtractInfo` is defined to extract a title, headings, and a list of entities (with metadata) from provided text. The module is then used to process sample text, printing the extracted fields.

```python
import dspy

class ExtractInfo(dspy.Signature):
    """Extract structured information from text."""
    
    text: str = dspy.InputField()
    title: str = dspy.OutputField()
    headings: list[str] = dspy.OutputField()
    entities: list[dict[str, str]] = dspy.OutputField(desc="a list of entities and their metadata")

module = dspy.Predict(ExtractInfo)

text = "Apple Inc. announced its latest iPhone 14 today."
text += "\nThe CEO, Tim Cook, highlighted its new features in a press release."
response = module(text=text)

print(response.title)
print(response.headings)
print(response.entities)
```

--------------------------------

### Accessing Undefined Test Split in DSPy Dataset

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/deep-dive/data-handling/loading-custom-data.md

This example shows the `AttributeError` that occurs when trying to access the test split of a DSPy `Dataset` object if the `_test` attribute has not been populated. It illustrates the importance of ensuring all data splits are defined to avoid runtime errors.

```python
dataset.test[:5]
```

--------------------------------

### DSPy with Multiple Signatures and Modules

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to combine multiple signatures and modules within a dspy program. This allows for more complex workflows, such as multi-step reasoning or data processing before generating a final output.

```Python
import dspy

# Assume llm is already initialized (e.g., dspy.OpenAI(model='gpt-3.5-turbo'))
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for extracting keywords
class KeywordExtractor(dspy.Signature):
    """Extract keywords from the given text."""
    text = dspy.InputField(desc="the input text")
    keywords = dspy.OutputField(desc="comma-separated keywords")

# Define a signature for summarizing text
class Summarizer(dspy.Signature):
    """Summarize the provided text."""
    text = dspy.InputField(desc="the input text")
    summary = dspy.OutputField(desc="a concise summary")

# Create a dspy program that uses both signatures
class TextProcessor(dspy.Module):
    def __init__(self):
        super().__init__()
        self.extract_keywords = dspy.Predict(KeywordExtractor)
        self.summarize = dspy.Predict(Summarizer)

    def forward(self, text):
        keywords_result = self.extract_keywords(text=text)
        combined_text = text + "\nKeywords: " + keywords_result.keywords
        summary_result = self.summarize(text=combined_text)
        return summary_result

# Instantiate and run the program
processor = TextProcessor()
input_text = "DSPy is a Python framework for developing LLM applications. It helps in structuring prompts and optimizing LLM outputs."

result = processor(text=input_text)

print(f"Input Text: {input_text}")
print(f"Summary: {result.summary}")
```

--------------------------------

### Initialize FastMCP Server

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

Creates an instance of FastMCP to build an airline agent. This utility helps in quickly setting up the agent's core functionality.

```Python
mcp = FastMCP("Airline Agent")
```

--------------------------------

### DSPy Memory Agent Demo Execution

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mem0_react_agent/index.md

Provides a Python function `run_memory_agent_demo` to demonstrate the memory-enhanced ReAct agent. It configures the DSPy language model, initializes the memory system, creates an instance of `MemoryReActAgent`, and runs a series of sample conversations to showcase the agent's ability to store, retrieve, and utilize memory.

```Python
import time
def run_memory_agent_demo():
    """Demonstration of memory-enhanced ReAct agent."""

    # Configure DSPy
    lm = dspy.LM(model='openai/gpt-4o-mini')
    dspy.configure(lm=lm)

    # Initialize memory system
    memory = Memory.from_config(config)

    # Create our agent
    agent = MemoryReActAgent(memory)

    # Sample conversation demonstrating memory capabilities
    print("🧠 Memory-Enhanced ReAct Agent Demo")
    print("=" * 50)

    conversations = [
        "Hi, I'm Alice and I love Italian food, especially pasta carbonara.",
        "I'm Alice. I prefer to exercise in the morning around 7 AM.",
        "I'm Alice. What do you remember about my food preferences?",
        "I'm Alice. Set a reminder for me to go grocery shopping tomorrow.",
        "I'm Alice. What are my exercise preferences?",
        "I'm Alice. I also enjoy hiking on weekends.",
        "I'm Alice. What do you know about me so far?"
    ]

    for i, user_input in enumerate(conversations, 1):
        print(f"\n📝 User: {user_input}")

        try:
            response = agent(user_input=user_input)
            print(f"🤖 Agent: {response.response}")
            time.sleep(1)

        except Exception as e:
            print(f"❌ Error: {e}")

# Run the demonstration
if __name__ == "__main__":
    run_memory_agent_demo()
```

--------------------------------

### DSPy Agent with ColBERT Retrieval and MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/observability/index.md

Sets up a DSPy ReAct agent using ColBERT for retrieval and configures MLflow for experiment tracking. The agent answers questions based on retrieved information.

```Python
import dspy

lm = dspy.LM("openai/gpt-4o-mini")
colbert = dspy.ColBERTv2(url="http://20.102.90.50:2017/wiki17_abstracts")
dspy.configure(lm=lm)


def retrieve(query: str):
    """Retrieve top 3 relevant information from ColBert"""
    results = colbert(query, k=3)
    return [x["text"] for x in results]


agent = dspy.ReAct("question -> answer", tools=[retrieve], max_iters=3)
print(agent(question="Which baseball team does Shohei Ohtani play for?"))
```

--------------------------------

### Financial Analysis ReAct Agent

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/yahoo_finance_react/index.md

Defines a DSPy ReAct agent for financial analysis. It integrates the converted Yahoo Finance news tool with custom functions for getting stock prices and comparing stocks, enabling it to respond to financial queries.

```python
class FinancialAnalysisAgent(dspy.Module):
    """ReAct agent for financial analysis using Yahoo Finance data."""
    
    def __init__(self):
        super().__init__()
        
        # Combine all tools
        self.tools = [
            finance_news_tool,  # LangChain Yahoo Finance News
            get_stock_price,
            compare_stocks
        ]
        
        # Initialize ReAct
        self.react = dspy.ReAct(
            signature="financial_query -> analysis_response",
            tools=self.tools,
            max_iters=6
        )
    
    def forward(self, financial_query: str):
        return self.react(financial_query=financial_query)
```

--------------------------------

### Audio Processing Applications with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Explore audio processing with DSPy. Learn to build systems that understand, process, and generate audio content.

```Python
import dspy

# Conceptual example for Audio Processing
# This would typically involve integrating with audio libraries or APIs
class AudioSummarizer(dspy.Module):
    def __init__(self):
        super().__init__()
        # Assume a function `transcribe_audio` exists to convert audio to text
        # Assume a function `summarize_text` exists to summarize text
        self.transcribe = dspy.ChainOfThought(dspy.Predict("Transcribe the following audio content: {audio_data}"))
        self.summarize = dspy.ChainOfThought(dspy.Summarize)

    def forward(self, audio_data):
        # Step 1: Transcribe audio to text
        transcription = self.transcribe(audio_data=audio_data)
        transcribed_text = transcription.text

        # Step 2: Summarize the transcribed text
        summary = self.summarize(document=transcribed_text)
        return summary

# Setup and usage:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# audio_processor = AudioSummarizer()
# # Assume audio_data is loaded from a file or stream
# # For example: audio_data = load_audio('meeting.wav')
# # For demonstration, we use placeholder text:
# simulated_audio_data = "[Audio data representing a meeting]"
# summary = audio_processor(simulated_audio_data)
# print(summary)
```

--------------------------------

### Get Stock Price Tool

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/yahoo_finance_react/index.md

A Python function to retrieve the current stock price and basic information for a given ticker symbol using the yfinance library. It returns a JSON string with the ticker, price, change percentage, and company name.

```python
def get_stock_price(ticker: str) -> str:
    """Get current stock price and basic info."""
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        hist = stock.history(period="1d")
        
        if hist.empty:
            return f"Could not retrieve data for {ticker}"
        
        current_price = hist['Close'].iloc[-1]
        prev_close = info.get('previousClose', current_price)
        change_pct = ((current_price - prev_close) / prev_close * 100) if prev_close else 0
        
        result = {
            "ticker": ticker,
            "price": round(current_price, 2),
            "change_percent": round(change_pct, 2),
            "company": info.get('longName', ticker)
        }
        
        return json.dumps(result)
    except Exception as e:
        return f"Error: {str(e)}"
```

--------------------------------

### DSPy Optimizers (BootstrapFewShot)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Shows how to use dspy's optimization capabilities, specifically the BootstrapFewShot optimizer, to improve few-shot learning performance by automatically generating demonstrations.

```Python
import dspy

# Assume llm is configured
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# Define a signature and module (e.g., sentiment analysis)
class SentimentSignature(dspy.Signature):
    """Classify the sentiment of the text."""
    text: str
    sentiment: str

class SentimentModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict(SentimentSignature)

    def forward(self, text):
        return self.predict(text=text)

# Create a dataset of examples
# train_data = [
#     {'text': 'I love this product!', 'sentiment': 'positive'},
#     {'text': 'This is terrible.', 'sentiment': 'negative'},
#     {'text': 'It is okay.', 'sentiment': 'neutral'}
# ]

# Create a dataset object
# dataset = [dspy.Example(**data) for data in train_data]

# Instantiate the module
# module = SentimentModule()

# Initialize the optimizer
# optimizer = dspy.BootstrapFewShot(metric=dspy.Accuracy(), max_bootstrapped_demos=2)

# Optimize the module
# optimized_module = optimizer.optimize(module, train_data=dataset)

# Now use the optimized_module for predictions
# result = optimized_module(text='DSPy is amazing!')
# print(result.sentiment)
```

--------------------------------

### Load and Preprocess CREMA-D Dataset with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Loads the CREMA-D dataset from HuggingFace, preprocesses audio clips to extract relevant features like raw text, target emotion style, and audio data. It also shuffles and splits the data into training and testing sets, ensuring a balanced distribution of emotions.

```Python
from collections import defaultdict

label_map = ['neutral', 'happy', 'sad', 'anger', 'fear', 'disgust']

kwargs = dict(fields=("sentence", "label", "audio"), input_keys=("sentence", "label"))
crema_d = DataLoader().from_huggingface(dataset_name="myleslinder/crema-d", split="train", trust_remote_code=True, **kwargs)

def preprocess(x):
    return dspy.Example(
        raw_line=x.sentence,
        target_style=label_map[x.label],
        reference_audio=dspy.Audio.from_array(x.audio["array"], x.audio["sampling_rate"])
    ).with_inputs("raw_line", "target_style")

random.Random(42).shuffle(crema_d)
crema_d = crema_d[:100]

random.seed(42)
label_to_indices = defaultdict(list)
for idx, x in enumerate(crema_d):
    label_to_indices[x.label].append(idx)

per_label = 100 // len(label_map)
train_indices, test_indices = [], []
for indices in label_to_indices.values():
    selected = random.sample(indices, min(per_label, len(indices)))
    split = len(selected) // 2
    train_indices.extend(selected[:split])
    test_indices.extend(selected[split:])

trainset = [preprocess(crema_d[idx]) for idx in train_indices]
testset = [preprocess(crema_d[idx]) for idx in test_indices]
```

--------------------------------

### DSPy GEPA Custom Component Selector Protocol

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/GEPA_Advanced.md

Defines the interface for custom component selectors in DSPy's GEPA. These selectors are callable classes or functions that receive the optimization state and return a list of component names to optimize. They are crucial for guiding the optimization process.

```python
from dspy.teleprompt.gepa.gepa_utils import GEPAState, Trajectory

class CustomComponentSelector:
    def __call__(
        self,
        state: GEPAState,
        trajectories: list[Trajectory],
        subsample_scores: list[float],
        candidate_idx: int,
        candidate: dict[str, str],
    ) -> list[str]:
        # Your custom component selection logic here
        return selected_components

def custom_component_selector(state, trajectories, subsample_scores, candidate_idx, candidate):
    # Your custom component selection logic here
    return selected_components
```

--------------------------------

### DSPy Optimizer Usage

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Explains how to use DSPy optimizers to automatically tune prompts and model parameters for improved performance. Optimizers leverage metrics to find the best configurations.

```Python
from dspy.teleprompt import BootstrapFewShot

# Assuming 'program' is a dspy.Module and 'trainset' is a dataset
# optimizer = BootstrapFewShot(metric=Accuracy(), max_bootstrapped_demos=4)
# compiled_program = optimizer.compile(program, trainset=trainset)
```

--------------------------------

### Build AI Applications by Customizing DSPy Modules

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

Learn how to build AI applications by customizing DSPy modules. This tutorial focuses on extending DSPy's capabilities by creating or modifying core components for specific application needs.

```Python
import dspy

# Example of customizing a DSPy module
# This is a placeholder and would be replaced by actual code from the tutorial.
class CustomDSPyModule(dspy.Module):
    def __init__(self):
        super().__init__()
        # Define custom layers or logic
        self.custom_layer = dspy.ProgramEnhancer(dspy.Program)

    def forward(self, input_data):
        # Apply custom logic
        processed_data = self.custom_layer(input_data)
        return processed_data

# Usage example (placeholder)
# custom_module = CustomDSPyModule()
# result = custom_module('sample input')
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the core functionality of DSPy, a framework for programming language models. It showcases how to define, tune, and deploy LM applications.

```Python
import dspy

# Define a DSPy signature
class Summarize(dspy.Signature):
    """Summarize the following text."""
    article = dspy.InputField(prefix="article:")
    summary = dspy.OutputField()

# Initialize a DSPy module
class BasicSummarizer(dspy.Module):
    def __init__(self):
        super().__init__()
        self.summarize = dspy.ChainOfThought(Summarize)

    def forward(self, article):
        return self.summarize(article=article)

# Example usage
if __name__ == "__main__":
    # Configure the language model (e.g., OpenAI)
    # dspy.configure(lm=dspy.OpenAI(model='gpt-3.5-turbo'))

    # Create an instance of the summarizer
    summarizer = BasicSummarizer()

    # Example article
    article_text = """
    The Orbiter Discovery is scheduled to launch on Tuesday, November 2nd, at 3:29 PM EST from Kennedy Space Center in Florida.
    The mission, STS-133, will deliver critical supplies and hardware to the International Space Station (ISS).
    This will be Discovery's final mission before it is retired.
    """

    # Get the summary
    # prediction = summarizer(article=article_text)
    # print(f"Summary: {prediction.summary}")

    # Note: To run this example, you need to configure a language model
    # and uncomment the relevant lines above.
    print("DSPy core functionality example. Configure an LM to run.")
```

--------------------------------

### Run Docker Container

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Runs the previously built Docker container, exposing the model service on a specified port.

```bash
> docker run -p 6000:8080 dspy-program
```

--------------------------------

### Custom Metric Function with Feedback for GEPA

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

This Python function, `metric_with_feedback`, serves as a custom evaluation metric for dspy.GEPA. It calculates a score based on the correctness of a prediction against an example's answer and generates detailed feedback text. This feedback can include explanations for incorrect answers, the correct solution, and guidance for improvement, which GEPA uses for optimization. It handles potential `ValueError` during answer parsing.

```python
def metric_with_feedback(example, prediction, trace=None, pred_name=None, pred_trace=None):
    correct_answer = int(example['answer'])
    written_solution = example.get('solution', '')
    try:
        llm_answer = int(prediction.answer)
    except ValueError as e:
        feedback_text = f"The final answer must be a valid integer and nothing else. You responded with '{prediction.answer}', which couldn't be parsed as a python integer. Please ensure your answer is a valid integer without any additional text or formatting."
        feedback_text += f" The correct answer is '{correct_answer}'."
        if written_solution:
            feedback_text += f" Here's the full step-by-step solution:\n{written_solution}\n\nThink about what takeaways you can learn from this solution to improve your future answers and approach to similar problems and ensure your final answer is a valid integer."
        return dspy.Prediction(score=0, feedback=feedback_text)

    score = int(correct_answer == llm_answer)

    feedback_text = ""
    if score == 1:
        feedback_text = f"Your answer is correct. The correct answer is '{correct_answer}'."
    else:
        feedback_text = f"Your answer is incorrect. The correct answer is '{correct_answer}'."
    
    if written_solution:
        feedback_text += f" Here's the full step-by-step solution:\n{written_solution}\n\nThink about what takeaways you can learn from this solution to improve your future answers and approach to similar problems."

    return dspy.Prediction(score=score, feedback=feedback_text)
```

--------------------------------

### Load DSPy Program State from JSON

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/saving/index.md

This code demonstrates loading the state of a DSPy program from a previously saved JSON file. It requires recreating the program's architecture first, then using the `load` method. Assertions are included to verify that the loaded program's demos and signature match the original.

```python
loaded_dspy_program = dspy.ChainOfThought("question -> answer") # Recreate the same program. 
loaded_dspy_program.load("./dspy_program/program.json")

assert len(compiled_dspy_program.demos) == len(loaded_dspy_program.demos)
for original_demo, loaded_demo in zip(compiled_dspy_program.demos, loaded_dspy_program.demos):
    # Loaded demo is a dict, while the original demo is a dspy.Example. 
    assert original_demo.toDict() == loaded_demo
assert str(compiled_dspy_program.signature) == str(loaded_dspy_program.signature)
```

--------------------------------

### DSPy Signature for Toxicity Prediction

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/signatures.md

Defines a DSPy Predict module with a signature for toxicity classification. The signature specifies a 'comment' as input and a 'toxic' boolean as output. It includes instructions to mark comments as 'toxic' if they contain insults, harassment, or sarcastic derogatory remarks. The example demonstrates how to use this signature to predict toxicity for a given comment.

```python
toxicity = dspy.Predict(
    dspy.Signature(
        "comment -> toxic: bool",
        instructions="Mark as 'toxic' if the comment includes insults, harassment, or sarcastic derogatory remarks.",
    )
)
comment = "you are beautiful."
toxicity(comment=comment).toxic
```

--------------------------------

### Iterative Image Prompt Revision Loop

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/image_generation_prompting/index.ipynb

Defines a DSPy Predict module `check_and_revise_prompt` to evaluate an image against a desired prompt and suggest revisions. It then enters a loop to repeatedly generate an image, get feedback, and revise the prompt until the image strictly matches the desired prompt or a maximum number of iterations is reached.

```python
check_and_revise_prompt = dspy.Predict("desired_prompt: str, current_image: dspy.Image, current_prompt:str -> feedback:str, image_strictly_matches_desired_prompt: bool, revised_prompt: str")

initial_prompt = "A scene that's both peaceful and tense"
current_prompt = initial_prompt

max_iter = 5
for i in range(max_iter):
    print(f"Iteration {i+1} of {max_iter}")
    current_image = generate_image(current_prompt)
    result = check_and_revise_prompt(desired_prompt=initial_prompt, current_image=current_image, current_prompt=current_prompt)
    display_image(current_image)
    if result.image_strictly_matches_desired_prompt:
        break
    else:
        current_prompt = result.revised_prompt
        print(f"Feedback: {result.feedback}")
        print(f"Revised prompt: {result.revised_prompt}")

print(f"Final prompt: {current_prompt}")
```

--------------------------------

### dspy Exact Match Evaluation Metric

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

This Python function defines an evaluation metric for dspy programs. It checks for an exact match between the predicted answer and the correct answer from an example. The metric converts both the predicted and correct answers to integers for comparison, returning 1 for a correct match and 0 otherwise. It handles potential `ValueError` if the predicted answer cannot be converted to an integer.

```python
def metric(example, prediction, trace=None, pred_name=None, pred_trace=None):
    correct_answer = int(example['answer'])
    try:
        llm_answer = int(prediction.answer)
    except ValueError as e:
        return 0
    return int(correct_answer == llm_answer)
```

--------------------------------

### Configure Student and Teacher LMs for Finetuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Sets up a local Llama-3.2-1B-Instruct model as the student LM and GPT-4o-mini as the teacher LM for bootstrapped finetuning. It specifies the model names and maximum token limits for each.

```Python
from dspy.clients.lm_local import LocalProvider

student_lm_name = "meta-llama/Llama-3.2-1B-Instruct"
student_lm = dspy.LM(model=f"openai/local:{student_lm_name}", provider=LocalProvider(), max_tokens=2000)
teacher_lm = dspy.LM('openai/gpt-4o-mini', max_tokens=3000)
```

--------------------------------

### Load Entire DSPy Program

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/saving/index.md

This snippet shows how to load a previously saved DSPy program using the `dspy.load` method, specifying the directory where the program was saved. This method loads both the architecture and state, eliminating the need to recreate the program manually. Assertions verify the loaded program's demos and signature.

```python
loaded_dspy_program = dspy.load("./dspy_program/")

assert len(compiled_dspy_program.demos) == len(loaded_dspy_program.demos)
for original_demo, loaded_demo in zip(compiled_dspy_program.demos, loaded_dspy_program.demos):
    # Loaded demo is a dict, while the original demo is a dspy.Example. 
    assert original_demo.toDict() == loaded_demo
assert str(compiled_dspy_program.signature) == str(loaded_dspy_program.signature)
```

--------------------------------

### Untitled

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

No description

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the core functionality of DSPy, including defining signatures, compiling programs, and executing them with different language models. It highlights how to chain multiple modules and optimize them for performance.

```Python
import dspy

# Define a signature for a simple question-answering task
class BasicQA(dspy.Signature):
    """Answer the question based on the context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Define a simple program using the signature
class BasicQAProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Chain(BasicQA)

    def forward(self, context, question):
        return self.predict(context=context, question=question)

# Initialize a language model (e.g., OpenAI)
dspy.llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Instantiate the program
program = BasicQAProgram()

# Example usage
context = "DSPy is a framework for programming with LLMs. It helps you build complex LLM applications."
question = "What is DSPy?"

# Compile the program for optimization (optional but recommended)
compiled_program = dspy.predict.compile(program, trace=True)

# Execute the compiled program
result = compiled_program(context=context, question=question)

print(f"Question: {question}")
print(f"Answer: {result.answer}")

```

--------------------------------

### DSPy: Optimizing with Signatures and Metrics

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Explains how dspy's optimization capabilities work, using signatures to define tasks and metrics to evaluate performance. This allows for automated tuning of language model behavior.

```Python
import dspy

# Assume llm is initialized and a signature is defined
# class MyModuleForOptimization(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.predict = dspy.Chain(MySignature)
#
#     def forward(self, input_text):
#         return self.predict(input_text=input_text)
#
# # Define a metric
# def my_metric(gold, pred, trace=None):
#     return len(pred.output_text) == len(gold.output_text)
#
# # Optimize the module
# optimizer = dspy.Optimizer(dspy.Singular('my_signature'))
# optimizer.optimize(MyModuleForOptimization, trainset=my_training_data, metric=my_metric)

```

--------------------------------

### Add Instructions to DSPy Predict

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Replaces a basic DSPy Predict signature with one that includes detailed instructions for the agent. This helps the model understand the task fundamentals.

```Python
INSTRUCTIONS = """
Interact with a simulated household to achieve a high-level goal. Make sure to plan, track subgoals,
determine likely locations for common household items (e.g. desklamps will likely be on desks, shelfs, or dressers),
and explore systematically (e.g. check all desks one by one for desklamp).
""".strip()

self.react = dspy.Predict(dspy.Signature("task, trajectory, possible_actions: list[str] -> action", INSTRUCTIONS))
```

--------------------------------

### GEPA for PAPILLON with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial shows how to use dspy.GEPA in the context of the PAPILLON project. It likely involves prompt evolution for specific NLP tasks related to PAPILLON.

```Python
import dspy

# Conceptual example of using dspy.GEPA for PAPILLON tasks
# This is a placeholder and would be replaced by actual code from the tutorial.

# Assume 'papillon_task_template' and 'performance_metric' are defined

# class PapillonGepaOptimizer(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.gepa = dspy.GEPA(prompt_template='Process PAPILLON data: {data}')
#
#     def forward(self, data, metric):
#         optimized_papillon_prompt = self.gepa(input=data, metric=metric)
#         return optimized_papillon_prompt

# Usage example (placeholder)
# optimizer = PapillonGepaOptimizer()
# papillon_data = 'Sample PAPILLON input data'
# metric = 'accuracy'
# best_prompt = optimizer(papillon_data, metric)
# print(f'Optimized prompt for PAPILLON: {best_prompt}')
```

--------------------------------

### Build ReAct Agent-based RAG Systems with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Enhance RAG systems with `ReAct` agent-based approaches using DSPy. This enables systems to reason about information retrieval, making them more intelligent and adaptive.

```Python
import dspy

# Example ReAct agent for RAG
class ReActRAG(dspy.Module):
    def __init__(self, max_steps=5):
        super().__init__()
        self.agent = dspy.ReAct(dspy.Answer)
        self.retrieve = dspy.Retrieve(k=3)
        self.max_steps = max_steps

    def forward(self, question):
        # The ReAct agent will internally decide when to use the retrieve tool
        prediction = self.agent(question=question, tool_code=self.retrieve)
        return prediction

# Setup and usage:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)
# react_rag_agent = ReActRAG()
# question = "What is the capital of France and what is its population?"
# print(react_rag_agent(question))
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

### DSPy Core Concepts

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet introduces the fundamental building blocks of DSPy, including Signatures, Modules, and Optimizers. It demonstrates how to define a signature for a task and how to use modules to compose complex behaviors.

```Python
import dspy

# Define a signature for a question answering task
class BasicQA(dspy.Signature):
    """Answer the question in a comprehensive and informative way."""
    context: str = "" # The context in which to search for the answer.
    question: str = "" # The question to answer.
    answer: str = "" # The answer to the question.

# Instantiate a module with the signature
qa_module = dspy.ChainOfThought(BasicQA)

# Example usage (assuming a dspy.LM is configured)
# result = qa_module(context="The capital of France is Paris.", question="What is the capital of France?")
# print(result.answer)
```

--------------------------------

### Image Generation Prompt Iteration with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial covers iterating on prompts for image generation using DSPy. It focuses on refining prompts to achieve desired image outputs from generative models.

```Python
import dspy

# Example of image generation prompt iteration with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class ImageGenerator(dspy.Module):
    def __init__(self):
        super().__init__()
        self.generate_image = dspy.GenerateImage()

    def forward(self, prompt):
        image_url = self.generate_image(prompt=prompt)
        return image_url

# Usage example (placeholder)
# generator = ImageGenerator()
# prompt = 'A futuristic cityscape at sunset, digital art'
# image = generator(prompt)
# print(f'Generated image: {image}')
```

--------------------------------

### Configure Audio-Capable Language Model

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Configures the DSPy language model to use an audio-preview model, enabling it to process audio inputs directly.

```python
dspy.settings.configure(lm=dspy.LM(model='gpt-4o-mini-audio-preview-2024-12-17'))
```

--------------------------------

### Multi-Hop RAG with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial explores implementing Multi-Hop Retrieval-Augmented Generation (RAG) with DSPy. It covers scenarios where multiple retrieval steps are needed to gather information before generating a final answer.

```Python
import dspy

# Example of Multi-Hop RAG with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class MultiHopRAG(dspy.Module):
    def __init__(self):
        super().__init__()
        self.retrieve = dspy.MultiHopRetrieve(k=3)
        self.generate_answer = dspy.ChainOfThought(dspy.Answer)

    def forward(self, question):
        context = self.retrieve(question)
        answer = self.generate_answer(context=context, question=question)
        return answer

# Usage example (placeholder)
# multi_hop_rag = MultiHopRAG()
# response = multi_hop_rag('What is the history of AI?')
# print(response)
```

--------------------------------

### DSPy: Optimizing with Signatures

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This code demonstrates how to define and use DSPy Signatures for optimizing LLM prompts and outputs. Signatures structure the input and output fields for a given task.

```Python
import dspy

# Define a signature for a summarization task
class Summarize(dspy.Signature):
    """Summarize the following text."""

    text = dspy.InputField(desc="The text to summarize")
    summary = dspy.OutputField(desc="A concise summary of the text")

# Instantiate a language model
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Create a DSPy program using the signature
# summarize_program = dspy.Program.from_signature(Summarize)

# Example usage:
# input_text = "DSPy is a framework for programming large language models..."
# result = summarize_program(text=input_text)
# print(result.summary)
```

--------------------------------

### GameAI Module Initialization

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Initializes the main AI module for game logic, setting up chains of thought for story generation, dialogue, and action resolution using dspy.

```python
class GameAI(dspy.Module):
    """Main AI module for game logic and narrative."""
    
    def __init__(self):
        super().__init__()
        self.story_gen = dspy.ChainOfThought(StoryGenerator)
        self.dialogue_gen = dspy.ChainOfThought(DialogueGenerator)
        self.action_resolver = dspy.ChainOfThought(ActionResolver)
```

--------------------------------

### GEPA for AIME with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial demonstrates the application of dspy.GEPA for the AIME (American Invitational Mathematics Examination) context. It focuses on evolving prompts for mathematical reasoning tasks.

```Python
import dspy

# Conceptual example of using dspy.GEPA for AIME math problems
# This is a placeholder and would be replaced by actual code from the tutorial.

# Assume 'math_problem_template' and 'solution_quality_metric' are defined

# class AimeGepaOptimizer(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.gepa = dspy.GEPA(prompt_template='Solve the following math problem: {problem}')
#
#     def forward(self, problem, metric):
#         optimized_solution_prompt = self.gepa(input=problem, metric=metric)
#         return optimized_solution_prompt

# Usage example (placeholder)
# optimizer = AimeGepaOptimizer()
# problem = 'Find the value of x if 2x + 5 = 15.'
# metric = 'correctness'
# best_prompt = optimizer(problem, metric)
# print(f'Optimized prompt for AIME: {best_prompt}')
```

--------------------------------

### Load and Evaluate Data

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

This snippet demonstrates how to load a subset of data for development and inspect the first element. This is typically done before evaluation to understand the data format.

```Python
devset = raw_data[500:600]
devset[0]
```

--------------------------------

### Load Finetuned Agent from Local File

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

This code snippet shows how to load a previously saved agent program from a local pickle file. It instantiates an Agent and then loads the saved model state.

```Python
loaded = Agent()
loaded.load('finetuned_4o_mini_001.pkl')
```

--------------------------------

### Build AI Applications by Customizing DSPy Modules

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Discover how to create custom DSPy modules for reusable and composable components. This tutorial focuses on the patterns for building tailored modules for various AI applications.

```Python
import dspy

# Example of a custom module
class SummarizeAndExtract(dspy.Module):
    def __init__(self):
        super().__init__()
        self.summarizer = dspy.ChainOfThought(dspy.Summarize)
        self.extractor = dspy.ChainOfThought(dspy.Extract);

    def forward(self, document):
        summary = self.summarizer(document=document)
        entities = self.extractor(document=document)
        return summary, entities

# Usage example:
# custom_module = SummarizeAndExtract()
# text = "DSPy is a framework for developing and deploying large language model applications. It allows developers to customize and optimize prompts, manage context, and integrate with various language models."
# summary, entities = custom_module(text)
# print(f"Summary: {summary}")
# print(f"Entities: {entities}")
```

--------------------------------

### Compile and Save Program with dspy.SIMBA

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/SIMBA.md

Demonstrates how to initialize the SIMBA optimizer, compile a program using a training set, and save the optimized program for later use. This involves creating an instance of SIMBA, calling its compile method, and then saving the result.

```python
optimizer = dspy.SIMBA(metric=your_metric)
optimized_program = optimizer.compile(your_program, trainset=your_trainset)

# Save optimize program for future use
optimized_program.save(f"optimized.json")
```

--------------------------------

### Optimize Classification Model Weights with BootstrapFinetune

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/optimization/optimizers.md

Demonstrates optimizing weights for a classification DSPy module using BootstrapFinetune. This includes loading the Banking77 dataset, defining a classification signature, and compiling the model with a custom accuracy metric. Requires the datasets library.

```python
import random
from typing import Literal

from datasets import load_dataset

import dspy
from dspy.datasets import DataLoader

# Load the Banking77 dataset.
CLASSES = load_dataset("PolyAI/banking77", split="train", trust_remote_code=True).features["label"].names
kwargs = {"fields": ("text", "label"), "input_keys": ("text",), "split": "train", "trust_remote_code": True}

# Load the first 2000 examples from the dataset, and assign a hint to each *training* example.
trainset = [
    dspy.Example(x, hint=CLASSES[x.label], label=CLASSES[x.label]).with_inputs("text", "hint")
    for x in DataLoader().from_huggingface(dataset_name="PolyAI/banking77", **kwargs)[:2000]
]
random.Random(0).shuffle(trainset)

import dspy
lm=dspy.LM('openai/gpt-4o-mini-2024-07-18')

# Define the DSPy module for classification. It will use the hint at training time, if available.
signature = dspy.Signature("text, hint -> label").with_updated_fields('label', type_=Literal[tuple(CLASSES)])
classify = dspy.ChainOfThought(signature)
classify.set_lm(lm)

# Optimize via BootstrapFinetune.
optimizer = dspy.BootstrapFinetune(metric=(lambda x, y, trace=None: x.label == y.label), num_threads=24)
optimized = optimizer.compile(classify, trainset=trainset)

optimized(text="What does a pending cash withdrawal mean?")
```

--------------------------------

### Optimize DSPy Program with MIPROv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Optimizes the `spoken_qa` program using the `MIPROv2` optimizer with 'light' auto-configuration and a specified prompt model. The data-aware proposer is disabled due to limitations with audio data processing.

```python
prompt_lm = dspy.LM(model='gpt-4o-mini') #NOTE - this is the LLM guiding the MIPROv2 instruction candidate proposal
optimizer = dspy.MIPROv2(metric=dspy.evaluate.answer_exact_match, auto="light", prompt_model = prompt_lm)

#NOTE - MIPROv2's dataset summarizer cannot process the audio files in the dataset, so we turn off the data_aware_proposer 
optimized_program = optimizer.compile(spoken_qa, trainset=trainset, max_bootstrapped_demos=2, max_labeled_demos=2, data_aware_proposer=False)

evaluate_program(optimized_program)
```

--------------------------------

### DSPy: Signature with Multiple Inputs and Outputs

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to define a dspy Signature with multiple input fields and multiple output fields, showcasing more complex prompt structures.

```Python
import dspy

# Assume llm is already initialized
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

class MultiInputOutput(dspy.Signature):
    """Process the given text and extract information.

    text: The input text to process.
    keywords: A list of relevant keywords.
    summary: A concise summary of the text.
    """
    text = dspy.InputField()
    keywords = dspy.OutputField(desc="comma-separated keywords")
    summary = dspy.OutputField()

# Instantiate the module
multi_module = dspy.Chain(MultiInputOutput)

# Run the module
input_text = "DSPy is a framework for programming large language models. It helps you create, tune, and deploy LLM applications."
result = multi_module(text=input_text)

print(f"Input Text: {input_text}")
print(f"Keywords: {result.keywords}")
print(f"Summary: {result.summary}")
```

--------------------------------

### Configure Mem0 and DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mem0_react_agent/index.md

Sets up the environment by configuring the OpenAI API key and initializing the Mem0 memory system with specified LLM and embedder configurations. This code snippet is essential for connecting DSPy agents to the Mem0 memory backend.

```python
import dspy
from mem0 import Memory
import os
from typing import List, Dict, Any, Optional
from datetime import datetime

# Configure environment
os.environ["OPENAI_API_KEY"] = "your-openai-api-key"

# Initialize Mem0 memory system
config = {
    "llm": {
        "provider": "openai",
        "config": {
            "model": "gpt-4o-mini",
            "temperature": 0.1
        }
    },
    "embedder": {
        "provider": "openai",
        "config": {
            "model": "text-embedding-3-small"
        }
    }
}
```

--------------------------------

### Classification with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial focuses on implementing classification tasks using DSPy. It explains how to set up and train models for categorizing text or data into predefined classes.

```Python
import dspy

# Example of classification with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class TextClassifier(dspy.Module):
    def __init__(self):
        super().__init__()
        self.classify = dspy.Classifier(labels=['positive', 'negative', 'neutral'])

    def forward(self, text):
        prediction = self.classify(text=text)
        return prediction

# Usage example (placeholder)
# classifier = TextClassifier()
# result = classifier('DSPy is a powerful framework.')
# print(result)
```

--------------------------------

### DSPy Signatures and Modules

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to define custom signatures and modules in dspy for more complex LLM interactions. Signatures define the input/output schema, while modules encapsulate logic.

```Python
import dspy

# Define a signature for question answering
class QuestionAnsweringSignature(dspy.Signature):
    """Answer the user's question based on the context."""
    context: str
    question: str
    answer: str

# Define a module that uses the QuestionAnsweringSignature
class QuestionAnsweringModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.predict = dspy.Predict(QuestionAnsweringSignature)

    def forward(self, context, question):
        return self.predict(context=context, question=question)

# Example usage (assuming a configured LLM)
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# qa_module = QuestionAnsweringModule()
# context = "DSPy is a framework for developing LLM applications."
# question = "What is DSPy?"
# result = qa_module(context=context, question=question)
# print(result.answer)
```

--------------------------------

### Gather and Convert MCP Tools to DSPy Tools (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

This Python code sets up an MCP client to connect to a server, lists available tools, and converts them into DSPy's `dspy.Tool` format for use in DSPy agents.

```Python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# Create server parameters for stdio connection
server_params = StdioServerParameters(
    command="python",  # Executable
    args=["path_to_your_working_directory/mcp_server.py"],
    env=None,
)

async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Initialize the connection
            await session.initialize()
            # List available tools
            tools = await session.list_tools()

            # Convert MCP tools to DSPy tools
            dspy_tools = []
            for tool in tools.tools:
                dspy_tools.append(dspy.Tool.from_mcp_tool(session, tool))

            print(len(dspy_tools))
            print(dspy_tools[0].args)

if __name__ == "__main__":
    import asyncio

    asyncio.run(run())
```

--------------------------------

### DSPy: Custom Signatures and Fields

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Explains how to define custom signatures and input/output fields in dspy. This allows for tailored prompts and structured data handling for specific LLM tasks.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class CustomSignature(dspy.Signature):
    """A custom signature for a specific task."""

    user_query = dspy.InputField(desc="The user's request")
    system_prompt = dspy.InputField(desc="Instructions for the LLM")
    generated_response = dspy.OutputField(desc="The LLM's output")

custom_program = dspy.Program(CustomSignature)

# Example usage:
# response = custom_program(
#     user_query="Tell me a short story.",
#     system_prompt="Be creative and concise."
# )
# print(response.generated_response)
```

--------------------------------

### Define Signatures for Multi-Hop Search

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/program_of_thought/index.ipynb

Defines the dspy Signatures for generating search queries and answering questions, including input fields and output fields with descriptions.

```Python
class GenerateAnswer(dspy.Signature):
    """Answer questions with short factoid answers."""

    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField(desc="often between 1 and 5 words")


class GenerateSearchQuery(dspy.Signature):
    """Write a simple search query that will help answer the non-numerical components of a complex question."""

    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    query = dspy.OutputField()
```

--------------------------------

### Configure DSPy and Generate llms.txt

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/llms_txt_generation/index.md

Sets up DSPy with a specified language model and API key, then uses gathered repository information to generate an 'llms.txt' file summarizing the project. The output is saved to a local file.

```python
import dspy
import os

# Assuming gather_repository_info and its dependencies are defined elsewhere
def get_github_file_tree(repo_url):
    # Placeholder for actual implementation
    return "File tree content"
def get_github_file_content(repo_url, file_path):
    # Placeholder for actual implementation
    return f"Content of {file_path}"
def gather_repository_info(repo_url):
    # Placeholder for actual implementation
    return "File tree", "Readme content", "Package files content"

class RepositoryAnalyzer:
    def __call__(self, repo_url, file_tree, readme_content, package_files):
        # Placeholder for actual analysis logic
        llms_txt_content = f"# DSPy: Programming Language Models\n\n## Project Overview\nDSPy is a framework for programming—rather than prompting—language models...\n\n## Key Concepts\n- **Modules**: Building blocks for LM programs\n- **Signatures**: Input/output specifications  \n- **Teleprompters**: Optimization algorithms\n- **Predictors**: Core reasoning components\n\n## Architecture\n- `/dspy/`: Main package directory\n  - `/adapters/`: Input/output format handlers\n  - `/clients/`: LM client interfaces\n  - `/predict/`: Core prediction modules\n  - `/teleprompt/`: Optimization algorithms"
        return type('obj', (object,), {'llms_txt_content': llms_txt_content})() 

def generate_llms_txt_for_dspy():
    # Configure DSPy (use your preferred LM)
    lm = dspy.LM(model="gpt-4o-mini")
    dspy.configure(lm=lm)
    os.environ["OPENAI_API_KEY"] = "<YOUR OPENAI KEY>"
    
    # Initialize our analyzer
    analyzer = RepositoryAnalyzer()
    
    # Gather DSPy repository information
    repo_url = "https://github.com/stanfordnlp/dspy"
    file_tree, readme_content, package_files = gather_repository_info(repo_url)
    
    # Generate llms.txt
    result = analyzer(
        repo_url=repo_url,
        file_tree=file_tree,
        readme_content=readme_content,
        package_files=package_files
    )
    
    return result

# Run the generation
if __name__ == "__main__":
    result = generate_llms_txt_for_dspy()
    
    # Save the generated llms.txt
    with open("llms.txt", "w") as f:
        f.write(result.llms_txt_content)
    
    print("Generated llms.txt file!")
    
    print("\nPreview:")
    print(result.llms_txt_content[:500] + "...")
```

--------------------------------

### DSPy Program with Signature Tuning

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates the process of tuning a DSPy signature using a dataset. Tuning aims to improve the language model's performance on a specific task by adjusting its internal prompts and parameters.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class TuneSignature(dspy.Signature):
    """A signature to be tuned."""
    input: str
    output: str

class TuneProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.chain = dspy.ChainOfThought(TuneSignature)

    def forward(self, input_data):
        return self.chain(input=input_data)

program = TuneProgram()

# Example training data (in a real scenario, this would be a dataset)
training_data = [
    {'input': 'Input 1', 'output': 'Expected Output 1'},
    {'input': 'Input 2', 'output': 'Expected Output 2'}
]

# Configure the optimizer and tune the program
optimizer = dspy.Adam(program=program, lr=0.01)
dspy.settings.configure(optimizer=optimizer)

# Simulate the tuning process
for example in training_data:
    prediction = program(input_data=example['input'])
    # In a real tuning loop, you would calculate a metric and call optimizer.update()
    # For demonstration, we'll just show the structure.
    print(f"Tuning with input: {example['input']}, Predicted: {prediction.output}")

# After tuning, you would typically save the program or use it directly

```

--------------------------------

### Initialize DataLoader

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/evaluation/data.md

Demonstrates the initialization of the `DataLoader` object from the `dspy.datasets` module, which is used for loading datasets in various formats.

```python
from dspy.datasets import DataLoader

dl = DataLoader()
```

--------------------------------

### Gather DSPy Repository Information

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/llms_txt_generation/index.md

Aggregates repository information including the file tree, README content, and key package files (pyproject.toml, setup.py, requirements.txt, package.json). It utilizes helper functions to fetch data from GitHub.

```python
import requests
import os
from pathlib import Path

os.environ["GITHUB_ACCESS_TOKEN"] = "<your_access_token>"

def get_github_file_tree(repo_url):
    """Get repository file structure from GitHub API."""
    # Extract owner/repo from URL
    parts = repo_url.rstrip('/').split('/')
    owner, repo = parts[-2], parts[-1]
    
    api_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/main?recursive=1"
    response = requests.get(api_url, headers={
        "Authorization": f"Bearer {os.environ.get('GITHUB_ACCESS_TOKEN')}"
    })
    
    if response.status_code == 200:
        tree_data = response.json()
        file_paths = [item['path'] for item in tree_data['tree'] if item['type'] == 'blob']
        return '\n'.join(sorted(file_paths))
    else:
        raise Exception(f"Failed to fetch repository tree: {response.status_code}")

def get_github_file_content(repo_url, file_path):
    """Get specific file content from GitHub."""
    parts = repo_url.rstrip('/').split('/')
    owner, repo = parts[-2], parts[-1]
    
    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"
    response = requests.get(api_url, headers={
        "Authorization": f"Bearer {os.environ.get('GITHUB_ACCESS_TOKEN')}"
    })
    
    if response.status_code == 200:
        import base64
        content = base64.b64decode(response.json()['content']).decode('utf-8')
        return content
    else:
        return f"Could not fetch {file_path}"

def gather_repository_info(repo_url):
    """Gather all necessary repository information."""
    file_tree = get_github_file_tree(repo_url)
    readme_content = get_github_file_content(repo_url, "README.md")
    
    # Get key package files
    package_files = []
    for file_path in ["pyproject.toml", "setup.py", "requirements.txt", "package.json"]:
        try:
            content = get_github_file_content(repo_url, file_path)
            if "Could not fetch" not in content:
                package_files.append(f"=== {file_path} ===\n{content}")
        except:
            continue
    
    package_files_content = "\n\n".join(package_files)
    
    return file_tree, readme_content, package_files_content
```

--------------------------------

### Optimize DSPy Module with MIPROv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

This code demonstrates optimizing a DSPy module using the MIPROv2 optimizer. It configures the optimizer with a specific metric, teacher model (GPT-4o), prompt model (GPT-4o-mini), and sets parameters for bootstrapped and labeled demonstrations. The `compile` method is used to train the module on a given dataset.

```Python
kwargs = dict(num_threads=THREADS, teacher_settings=dict(lm=gpt4o), prompt_model=gpt4o_mini)
optimizer = dspy.MIPROv2(metric=dataset.metric, auto="medium", **kwargs)

kwargs = dict(max_bootstrapped_demos=4, max_labeled_demos=4)
optimized_module = optimizer.compile(module, trainset=dataset.train, **kwargs)
```

--------------------------------

### DSPy Module Composition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates how to compose multiple DSPy modules together to create more complex applications. It shows how one module's output can serve as the input for another, enabling the construction of sophisticated LLM pipelines.

```Python
import dspy

# Assume BasicProgram and QAProgram are defined as above

class ComposedProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.basic_prog = BasicProgram()
        self.qa_prog = QAProgram()

    def forward(self, input_question):
        # Use the output of BasicProgram as input for QAProgram
        intermediate_output = self.basic_prog(input=input_question)
        final_answer = self.qa_prog(question=intermediate_output.output)
        return final_answer

# Example usage
composed = ComposedProgram()
result = composed(input_question='Tell me about the Eiffel Tower and who built it.')
print(result.answer)
```

--------------------------------

### Test FastAPI Endpoint with Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Python script using the `requests` library to send a POST request to the running FastAPI server and print the JSON response.

```python
import requests

response = requests.post(
    "http://127.0.0.1:8000/predict",
    json={"text": "What is the capital of France?"}
)
print(response.json())
```

--------------------------------

### Program of Thought (PoT) Systems with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Learn to build systems that generate and execute code to solve complex problems. Combines language models with programmatic reasoning.

```Python
import dspy

# Example for Program of Thought (PoT)
# This often involves generating code snippets and executing them
class POTSolver(dspy.Module):
    def __init__(self):
        super().__init__()
        # Predict a Python function to solve the problem
        self.generate_code = dspy.ChainOfThought(dspy.Predict(
            "Write a Python function to solve the following problem: {problem}"
        ))
        self.execute_code = dspy.ProgramOfThought(dspy.Answer)

    def forward(self, problem):
        # Generate the Python code as a string
        code_prediction = self.generate_code(problem=problem)
        generated_code = code_prediction.text

        # Execute the generated code (use with caution!)
        # The ProgramOfThought module handles execution and capturing output
        result = self.execute_code(code=generated_code, problem=problem)
        return result

# Setup and usage:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)
# pot_solver = POTSolver()
# problem_description = "Calculate the factorial of 5."
# print(pot_solver(problem_description))
```

--------------------------------

### Define DSPy ReAct Agent with ColBERTv2

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/observability/index.md

Sets up a DSPy ReAct agent using OpenAI's GPT-4o-mini and ColBERTv2 for retrieval. It defines a `retrieve` function to fetch relevant information and configures the agent to use this tool.

```python
import dspy
import os

os.environ["OPENAI_API_KEY"] = "{your_openai_api_key}"

lm = dspy.LM("openai/gpt-4o-mini")
colbert = dspy.ColBERTv2(url="http://20.102.90.50:2017/wiki17_abstracts")
dspy.configure(lm=lm)


def retrieve(query: str):
    """Retrieve top 3 relevant information from ColBert"""
    results = colbert(query, k=3)
    return [x["text"] for x in results]


agent = dspy.ReAct("question -> answer", tools=[retrieve], max_iters=3)
```

--------------------------------

### dspy Program Execution

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to execute a dspy program with a specific language model. This involves setting up the language model and calling the program.

```python
turbo = dspy.OpenAI(model='gpt-3.5-turbo')
dspy.settings.configure(lm=turbo)

qa_program = BasicQAModule()

context = "DSPy is a framework for programming large language models. It helps you create, tune, and deploy complex LLM applications."
question = "What is DSPy?"

result = qa_program(context=context, question=question)
print(result.answer)
```

--------------------------------

### Instantiate and Use RAG Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rag/index.ipynb

This snippet demonstrates how to instantiate the previously defined RAG module and use it to answer a question. It creates an instance of the RAG class and then calls it with a specific question about Linux memory management.

```Python
rag = RAG()
rag(question="what are high memory and low memory on linux?")
```

--------------------------------

### Advanced Tool Use with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial delves into advanced techniques for using tools within DSPy applications. It covers scenarios where AI agents need to interact with external tools or APIs.

```Python
import dspy

# Example of advanced tool use with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.

# Define a tool (e.g., a calculator)
def calculator_tool(expression):
    try:
        return eval(expression)
    except:
        return 'Error evaluating expression'

class ToolUserAgent(dspy.Module):
    def __init__(self):
        super().__init__()
        # Register the tool with DSPy
        self.calculator = dspy.Tool(calculator_tool, name='calculator', description='Evaluates mathematical expressions.')
        self.generate_plan = dspy.ChainOfThought(dspy.Plan)

    def forward(self, query):
        # The agent decides which tool to use based on the query
        plan = self.generate_plan(query=query, tools=[self.calculator])
        # Execute the tool if selected
        if 'calculator' in plan.tool_calls:
            result = self.calculator(expression=plan.tool_args['calculator']['expression'])
            return result
        return 'No tool used or tool execution failed.'

# Usage example (placeholder)
# agent = ToolUserAgent()
# response = agent('What is 5 + 7?')
# print(response)
```

--------------------------------

### DSPy: Using Different Language Models

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to configure and use different language models with dspy, such as OpenAI and Cohere. This allows flexibility in choosing the best model for a specific task.

```Python
import dspy

# Using OpenAIllm_openai = dspy.OpenAI(model='gpt-3.5-turbo')
dspy.settings.configure(lm=llm_openai)

# Using Cohere (requires COHERE_API_KEY environment variable)
# llm_cohere = dspy.Cohere(model='command')
# dspy.settings.configure(lm=llm_cohere)

# Example usage (assuming a signature 'MySignature' is defined):
# class MySignature(dspy.Signature):
#     input_text = dspy.InputField()
#     output_text = dspy.OutputField()
#
# my_program = dspy.Program(MySignature)
# print(my_program(input_text='Hello').output_text)
```

--------------------------------

### Image Generation Prompt Iteration with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Use DSPy to iteratively improve image generation prompts. Create better visual content through systematic optimization.

```Python
import dspy

# Example for Image Generation Prompt Iteration
# This requires an image generation model or API integration
class PromptOptimizer(dspy.Module):
    def __init__(self, max_iterations=5):
        super().__init__()
        self.optimizer = dspy.ChainOfThought(dspy.Predict(
            "Given the initial prompt and feedback, refine the prompt to improve the image generation. Initial Prompt: {prompt}\nFeedback: {feedback}\nRefined Prompt:"
        ))
        self.max_iterations = max_iterations

    def forward(self, initial_prompt, feedback):
        current_prompt = initial_prompt
        for _ in range(self.max_iterations):
            # In a real scenario, you'd call an image generation API here
            # and get feedback based on the generated image.
            # For this example, we simulate the feedback loop.
            refined_prompt_pred = self.optimizer(prompt=current_prompt, feedback=feedback)
            current_prompt = refined_prompt_pred.text
            # Simulate getting new feedback based on the refined prompt
            feedback = f"The image generated from '{current_prompt}' is good, but could be more vibrant."

        return current_prompt

# Setup and usage:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# optimizer = PromptOptimizer()
# initial_prompt = "A cat sitting on a mat."
# initial_feedback = "The cat looks a bit blurry."
# final_prompt = optimizer(initial_prompt, initial_feedback)
# print(f"Optimized prompt: {final_prompt}")
```

--------------------------------

### Import Necessary Libraries

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/image_generation_prompting/index.ipynb

Imports core DSPy library, Pillow for image manipulation, BytesIO for in-memory data streams, requests for HTTP operations, fal_client for FAL integration, and dotenv for loading environment variables.

```python
import dspy

from PIL import Image
from io import BytesIO
import requests
import fal_client

from dotenv import load_dotenv
load_dotenv()
```

--------------------------------

### DSPy: Basic Module Definition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental structure of a DSPy module. It shows how to define a module with input and output fields, and how to implement the module's logic using the `__call__` method. This is the building block for creating more complex LM pipelines.

```Python
import dspy

class BasicModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.question = dspy.InputField(prefix="Question: ")
        self.answer = dspy.OutputField(prefix="Answer: ")

    def __call__(self, question):
        # LM call or other logic would go here
        return dspy.Example(question=question, answer="This is a placeholder answer.")

```

--------------------------------

### DSPy Program with Custom Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to create a custom DSPy module by inheriting from `dspy.Module`. This allows for more complex logic and composition of different DSPy components.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class SimpleSignature(dspy.Signature):
    """A simple signature."""
    input: str
    output: str

class CustomModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.simple_chain = dspy.ChainOfThought(SimpleSignature)

    def forward(self, input_data):
        processed_output = self.simple_chain(input=input_data).output
        return dspy.Prediction(final_output=processed_output)

module = CustomModule()

result = module(input_data='This is some input data.')
print(result.final_output)

```

--------------------------------

### DSPy: Basic LM Programming

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental usage of the dspy framework for interacting with language models. It showcases how to define a simple language model call and retrieve its output.

```Python
import dspy

# Configure the language model (e.g., OpenAI)
# llm = dspy.OpenAI(model="gpt-3.5-turbo")
# dspy.settings.configure(lm=llm)

# Define a simple signature
class BasicSignature(dspy.Signature):
    """Answer a question."""
    question: str
    answer: str

# Create a module using the signature
class BasicModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.basic_predictor = dspy.Predict(BasicSignature)

    def forward(self, question):
        return self.basic_predictor(question=question)

# Instantiate the module and run it
# module = BasicModule()
# result = module(question="What is the capital of France?")
# print(result.answer)
```

--------------------------------

### Set up DSPy Evaluation Metric

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

Defines a simple metric function to evaluate agent success based on the output. This metric is then used to initialize the DSPy Evaluate class.

```Python
metric = lambda x, y, trace=None: y.success
evaluate = dspy.Evaluate(devset=devset, metric=metric, display_progress=True, num_threads=16)
```

--------------------------------

### DSPy Optimization with `ChainOfThought`

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to use dspy's `ChainOfThought` module for enabling multi-step reasoning. This is crucial for tasks that require intermediate steps or logical deduction to arrive at the final answer.

```Python
import dspy

# Assume llm is already initialized (e.g., dspy.OpenAI(model='gpt-3.5-turbo'))
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a question that requires reasoning
class ReasoningQA(dspy.Signature):
    """Answer the question based on the provided context, showing your reasoning."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    reasoning = dspy.OutputField(desc="step-by-step reasoning")
    answer = dspy.OutputField(desc="the final answer")

# Create a dspy program using ChainOfThought
class ReasoningProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        # Use ChainOfThought to guide the prediction
        self.predict_with_reasoning = dspy.ChainOfThought(ReasoningQA)

    def forward(self, context, question):
        return self.predict_with_reasoning(context=context, question=question)

# Instantiate and run the program
reasoning_program = ReasoningProgram()
context = "The Eiffel Tower is in Paris, France. Paris is the capital of France. France is in Europe."
question = "Where is the Eiffel Tower located?"

result = reasoning_program(context=context, question=question)

print(f"Question: {question}")
print(f"Reasoning: {result.reasoning}")
print(f"Answer: {result.answer}")
```

--------------------------------

### Evaluate DSPy Agent

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

This code snippet demonstrates how to evaluate a DSPy agent. It initializes an agent and then uses the `evaluate` function to assess its performance on a development set.

```python
agent = Agent()
evaluate(agent)
```

--------------------------------

### Create a dspy Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to create a dspy Module, which is a reusable component for building complex language model pipelines. Modules can contain multiple signatures and other modules.

```python
import dspy

# Define a Signature
class GenerateAnswer(dspy.Signature):
    """Generate a concise answer to the question."""
    question = dspy.InputField()
    answer = dspy.OutputField()

# Define a Module that uses the Signature
class MyModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.generate_answer = dspy.Predict(GenerateAnswer)

    def forward(self, question):
        return self.generate_answer(question=question)

# Example usage (assuming you have an LM configured)
# module = MyModule()
# result = module(question='What is dspy?')
# print(result.answer)
```

--------------------------------

### Evaluate DSPy Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/math/index.ipynb

Sets up and runs an evaluation for the defined DSPy module using the development set of the MATH dataset. It utilizes a specified metric and configures evaluation parameters like the number of threads and progress display.

```python
THREADS = 24
kwargs = dict(num_threads=THREADS, display_progress=True, display_table=5)
evaluate = dspy.Evaluate(devset=dataset.dev, metric=dataset.metric, **kwargs)

evaluate(module)
```

--------------------------------

### Print Generated Prompt Signature Instructions

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

This snippet shows how to access and print the instructions associated with a program's signature. It is useful for understanding the underlying prompt that dspy generates for a given task.

```python
print(optimized_program.predict.signature.instructions)
```

--------------------------------

### Retrieval-Augmented Generation (RAG) with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Master RAG systems by combining retrieval mechanisms with language models. Learn how DSPy facilitates building systems that answer questions using external knowledge sources.

```Python
import dspy

# Example RAG pipeline
class RAG(dspy.Module):
    def __init__(self, max_tokens=256, num_passages=3):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=num_passages)
        self.generate_answer = dspy.GenerateAnswer(max_tokens=max_tokens)

    def forward(self, question):
        context = self.retrieve(question)
        answer = self.generate_answer(context=context, question=question)
        return answer

# Setup and usage:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)
# rag_pipeline = RAG()
# question = "What are the benefits of using DSPy?"
# print(rag_pipeline(question))
```

--------------------------------

### Configure dspy with OpenAI LM

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_aime/index.ipynb

Sets up the dspy library by taking an OpenAI API key as input and configuring the language model to use. This is a prerequisite for running dspy programs that rely on OpenAI's models.

```python
api_key = input("Enter your OpenAI API key: ")
import dspy
lm = dspy.LM("openai/gpt-4.1-mini", temperature=1, api_key=api_key, max_tokens=32000)
dspy.configure(lm=lm)
```

--------------------------------

### Continue Learning DSPy Libraries

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

This snippet allows the user to decide whether to continue the learning session by exploring another DSPy library. It displays the libraries learned so far and prompts for user input.

```python
# Ask if user wants to learn another library
        print(f"\n📚 Libraries learned so far: {list(learned_libraries.keys())}")
        continue_learning = input("\n🔄 Do you want to learn another library? (y/n): ").strip().lower()
        
        if continue_learning not in ['y', 'yes']:
            break
```

--------------------------------

### DSPy Module with Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to create a DSPy module (a basic LM call) using a defined signature. This shows the core concept of composing LM interactions.

```python
import dspy

class BasicModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.basic_lm = dspy.OpenAI(model='gpt-3.5-turbo')

    def forward(self, input_text):
        prediction = self.basic_lm(input_text=input_text, signature=dspy.Signature("input_text -> output_text"))
        return prediction

# Example usage:
# module = BasicModule()
# result = module('What is the capital of France?')
# print(result.output_text)

```

--------------------------------

### Build Multi-Hop RAG Systems with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/build_ai_program/index.md

Construct advanced RAG systems capable of multi-step reasoning across multiple information sources. Ideal for complex research and analysis tasks.

```Python
import dspy

# Conceptual example for Multi-Hop RAG (requires a more complex setup)
class MultiHopRAG(dspy.Module):
    def __init__(self, max_hops=3):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=3)
        self.generate_intermediate_answer = dspy.ChainOfThought(dspy.Answer)
        self.generate_final_answer = dspy.GenerateAnswer()
        self.max_hops = max_hops

    def forward(self, question):
        intermediate_question = question
        for _ in range(self.max_hops):
            context = self.retrieve(intermediate_question)
            intermediate_answer = self.generate_intermediate_answer(context=context, question=intermediate_question)
            # In a real scenario, you'd parse intermediate_answer to form the next question
            # For simplicity, we'll just use the original question again or a derived one
            intermediate_question = f"Based on '{intermediate_answer}', answer: {question}" # Simplified logic

        final_context = self.retrieve(intermediate_question)
        final_answer = self.generate_final_answer(context=final_context, question=intermediate_question)
        return final_answer

# Setup and usage:
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)
# multi_hop_rag = MultiHopRAG()
# question = "Who directed the movie that starred the actor from The Matrix?"
# print(multi_hop_rag(question))
```

--------------------------------

### Connect Notebook to MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

Connects the current notebook to the MLflow tracking server and sets the experiment name to 'DSPy'.

```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
```

--------------------------------

### DSPy Program for Emotion-Style TTS Instructions

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/audio/index.ipynb

Defines a DSPy Signature and Module for generating TTS instructions. The `EmotionStylePromptSignature` specifies inputs for raw text and target emotion, and an output for the TTS instruction. The `EmotionStylePrompter` module uses this signature with a Chain-of-Thought approach and integrates the `generate_dspy_audio` function to produce the final audio output.

```Python
class EmotionStylePromptSignature(dspy.Signature):
    """Generate an OpenAI TTS instruction that makes the TTS model speak the given line with the target emotion or style."""
    raw_line: str = dspy.InputField()
    target_style: str = dspy.InputField()
    openai_instruction: str = dspy.OutputField()

class EmotionStylePrompter(dspy.Module):
    def __init__(self):
        self.prompter = dspy.ChainOfThought(EmotionStylePromptSignature)

    def forward(self, raw_line, target_style):
        out = self.prompter(raw_line=raw_line, target_style=target_style)
        audio = generate_dspy_audio(raw_line, out.openai_instruction)
        return dspy.Prediction(audio=audio)
    
dspy.settings.configure(lm=dspy.LM(model='gpt-4o-mini'))
```

--------------------------------

### Compile a dspy Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates how to compile a dspy Module using a specific optimizer. Compilation involves automatically tuning the module's prompts and weights.

```python
import dspy

# Assume 'MyModule' and 'llm' are defined as above

# Compile the module using the BootstrapFewShot optimizer
compiled_module = dspy.settings.configure(lm=llm)(dspy.BootstrapFewShot)(MyModule)

# Now you can use the compiled_module
# result = compiled_module(question='What is a large language model?')
# print(result.answer)
```

--------------------------------

### Serve MLflow Model

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/deployment/index.md

Serves a logged MLflow model locally on a specified port. Replace `{run_id}` with the actual run ID obtained from the MLflow UI or console output.

```bash
> mlflow models serve -m "runs:/{run_id}/model" -p 6000
```

--------------------------------

### DSPy Framework Overview

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet provides a high-level overview of the DSPy framework, highlighting its core functionalities for programming large language models. It touches upon prompt engineering, model-based reasoning, and data augmentation.

```Python
Project: /stanfordnlp/dspy
Content:
rE/AW2cz61tFC0iABBQgIHWr69evr2lyfgrw8AMKKKWACgwWACt2AzXuHsCWTdZHHnlEAc9QBRIInMC1a9eQOnVq7caBAweiWrVqgQ9ioztcJYjkVH3GjBltZFngpty+fRtySl9EShK5+loEPpJ5d0hmiMtvy9sD1YuZN3ckZyrZC9j5i67B39OBNClia+P6/oHkQOeqwHvlges39cbGR84BX3UBnsgQSQvCP/eFK0AGvTUL5s+fj3r16oV/Us5AAiRAAiRAAhYkwGCBBZ1GlUmABEiABMwhMGTIEHTr1g0PpgT++sicOa0wS5tPgPFfA8PqAZ2qWEFj43XcfxIo1E0fV8pdFCpUyPhJOCIJmEDg6NGjyJlTT5uaPXs2ihYtasKsak7hKkFUsGBBreY9BXj55Zdx9uxZdOnSBfJOVF2+//57rTycyPeDgYLZVNc4NP16fQZ8vgeQd5JL8mWB1q9h0jtAiqT6p976EElD4w9fBTpUApK5ZRuEppHad6dtDvx9HRg8eDC6du1qkLI8uWYQSA5DAgoR4M+1Qs6gKhEgwGBBBKBzShIgARIgAWsQkHIcEydORP7HgB/U3yOxBlSbaHnpGpD+Xd2YL774ApUrO6TWhU38RzPuEZAmvuXKldM++Prrr/Hoo486Fs/169e12vxp06ZF5syZHcvB3fBGjRppfVms0sx91apVqFJFj2JfnAakS0U3ugjIe+v4eeDOHeDJjM5kU6ArcOAUIE3dJ0yYwMVBAiRAAiRAAiTghQCDBVwWJEACJEACJOCDQO3atbF06VJULACsMeoAGmnbhkCqJsD1G8D06dPRtGlT29hFQ5xFwL3c2p49e3D//Q45YuwsNwdtbYcOHbR+BeXLl8f69euDHsesG2fMmIFmzZohZTLgmrP7U5uF3FLzvDwEWPsDUKtWLSxZssRSulNZEiABEiABEjCLAIMFZpHmPCRAAiRAApYj8OKLL+Lbb79Fg+eBuS0tpz4VDjOBxz8Efr1gdDmDMCvN4UnAg8D48ePRpk0bpEmTBlu3biUfEohFQPpYLFiwAAUKFMD+/fuVp+MqH5j9YeDEWOXVpYImE2g4CZi3FXjhhRewefNmk2fndCRAAiRAAiRgDQIMFljDT9SSBEiABEggAgRkc+TAgQNo/TIwvnEEFOCUShMo2gPYewLo3Lkzhg4dqrSuVI4EfBHo168foqKikDVrVnz55ZcERQKxCEgwadq0adr6OHXqlPJ0pLfCsGHDUORxYM9A5dWlgiYT+GA2MGENkD9/fvzwww8mz87pSIAESIAESMAaBBgssIafqCUJkAAJkEAECGTPnh0nT55E9+rAwDoRUIBTKk2g7ABg00/A+++/j8mTJyutK5UjAV8EOnbsiJEjRyJPnjz47LPPCIoEYhH4+OOPMWrUKC3z5O+//1aeTosWLTBlyhSUyQt801N5damgyQR6LAIGrQCyZcum9SehkAAJkAAJkAAJxCXAYAFXBQmQAAmQAAn4IJAhQwZcuHBBCxRIwIBCAu4EKg0DvvwekAags2fPJhwSsCSBli1basGuwoULY86cOZa0gUqHj4D0tBg0aBCSJEmCW7duhW8ig0Zu3LgxPvnkE7xWCFjd2aBBOYxtCEigQAIGDz/8MM6fP28bu2gICZAACZAACRhJgMECI2lyLBIgARIgAVsRePDBB3H58mUMrw90rGwr02iMAQRqjAJW7Abq1q0L2VCjkIAVCUgzWGkKW6JECcycyY6wVvRhOHVevHgx+vbtq03x33//IXHixOGcLuSx69Wrp/VYqF4MWN4+5OE4gM0IjFgFdJoPy2TK2Aw/zSEBEiABErAIAQYLLOIoqkkCJEACJGA+gQceeABXr17FyAZA+0rmz88Z1SZQewywdCdQp04dLFy4UG1lqR0J+CDQpEkTSKmZUqVKYfr06eREArEILFu2DL1799Y+k8wCyTBQWd58800sWrQItUoAS9qqrCl1iwSBUauBDvOA1KlT48qVK5FQgXOSAAmQAAmQgPIEGCxQ3kVUkARIgARIIFIEpEaz/DI5ogHQgcGCSLlB2XlrjgaW7wJkc0pOslJIwIoEmjZtqmUUlCxZUsswoJCAO4ElS5agT58+2ke3b9/GfffdpzQgyfSS4G2N4sCydkqrSuUiQGDkaqDjPEAOg0jmKIUESIAESIAESCAuAQYLuCpIgARIgARIwAeBhx56CBcvXsTgN4Gu1YiJBGITqDICWLUXaNiwIWu9c3FYloA06J46dSqKFi3K3huW9WL4FJeN9wEDBmjlh6QMkery1ltvYe7cuahcBPiio+raUj+zCQz5HOi2EEifPj3+/PNPs6d3znzRABI5x1xaSgIkQAJ2I8Bggd08SntIgARIgAQMI5A1a1acOXMGvWsBfWsbNiwHsgmBCoOADQeB5s2bY9q0aTaximY4jUDbtm0xduxYPP3008yQcZrz/bBXmgUPHz4cqVKl0sryqS7vvvsuPvroI5R/GljfXXVtqZ9ZBKKWAP2WAlmyZMHp06fNnp7zkQAJkAAJkIAlCDBYYAk3UUkSIAESIIFIEMiTJw8OHz6Mdq8BoxpGQgPOqTKBUr2BHceAdu3aYdSoUSqrSt1IwCeBXr16aSfHH3/8caxcuZKkSCAWgcmTJ2PSpEnImDEjzp07pzyd9u3bY/To0Sj5JLC9n/LqUkGTCbSfC4z+EsidOzcOHTpk8uycjgRIgARIgASsQYDBAmv4iVqSAAmQAAlEgMAzzzyD7du3450ywMx3I6BAkFNGRwOr90Erw+Au/90B9p4Afv8beCEPkCZFcBMcPgv8fBb4+zrwxCNA0ceBFEn9G+vSNeDHM8CBU8CB00D/N/RM9W1HgNcK+TeGKlfl6gAcOQf07ds3pgGoKrpRDxLwl8DIkSPRsWNHSNm1b775xt/blLhOns+FChVC8uTJY+lz8uRJHDlyBAUKFMAjjzwSlK7Xrl3Dzz//rGWXSTPUJ598Eo899pjPsaRk3e7du3H27FlkyJABxYoVizP3//73P0gQOm3atEHpFImbhg0bppVZs8rmar9+/RAVFYWcmYCfR0aCWHBzhvu9ffYv4OBp4LdLwKPpgMLZgYcfSFjXf24Ce04Az+eKe+3iHUCNYkAStdtYxFK8yTTg403QGrrLzyOFBEiABEiABEggLgEGC7gqSIAESIAESMAHgSpVqmDVqlWoWhT4vIM1MP17C2g+HciSDhhS957OPRYB478GXswLyC//Uj6nejFgbksgdex9Np+GnvwTaPmxXqdfSjzcug18exjIml4fp0xe34yu/gsMWgEM/hwokQN4qzRQsQCQ51FAAghlBwDP5dQzOPwNPETaI+nf1XWfMGECWrVqFWl1OD8JBEVg1qxZeOedd7Sa9N9//31QY0Tipvnz52PDhg3az58rWLBmzRrtVHnKlCm1zf0vv/wSefPmxeDBg7W/+yuLFy/GiBEjkCxZMm3Tf9u2bZDgweuvv47u3bvj/vvvjzWUexNg9y9ko/21116L+Wj58uWafvJHekRYQbp164YvvvgCzz//PLZs2aK8yhMnTkTr1q2RLhVw0SLV4cL53paxuy/UT9NLYD/jg8CXd3/MJ74NtKzo3aU3bgGzNgO9F0MLvGyJinvd21OAo78Dn7YGHntI+aWhKVhtJLByD1C5cmVtXVNIgARIgARIgATiEmCwgKuCBEiABEiABHwQaNq0KWbOnKltbu/orz6mC1eAGqOASoWB7tXv6TtqNdBhHmL1XpANf2nQKwGDJW2B+xLHb9/1m0CR7npGwYGhwNNZ9et/OgPk6ww8kBw4NEI/segpy3YB788A/rgMjGwAfPhq3PkuXgUqDtY3HBZ/qP5JRdmASfG2bqlsLNauzaYW6v+EUENvBL766quYDW3JLJAMA5VFmuwOHTpUO8Hv2tAXffft2wdpbisnhqV0jmzoS9mcGjVqaJkBn332GdKl8/KA8jBWSjFJQKBq1aoxjX1v3rypzblo0SLIe0H6PLhE+HXq1AktWrRA/vz5tewCCQpIpoHI+vXrY2UYrFixAj179tSaSVshYCA9WeQEtjzj5FmnukjgRoI6Iv/MApLHjusop34439tibNNpwMxNwLRmQPNyuvnyvi03ENh/EljdOW5Wn1wftRg4rS9hLavAW7BAshVbzATWHwS2RgGZLJAwU7IXsPMXoEmTJpgxY4Zy64EKkQAJkAAJkIAKBBgsUMEL1IEESIAESEBJAr1790b//v2ROS3w20QlVYxR6txfwPN9odVpllN+LtlyGHihn76Z/8eU2Bsnz0YB/zsKDK0HdK4Sv33LdwE1R+ubCrK54C61RgMSEJBSTVKyyV3kBJ+c5BORoEStEr7n+fMq8MSHQMPSwKR31OYtpylzttd1/O677yAlqygkYEUC+/fv10r5iCxcuBD58uVT1ow7d+7gww8/xNGjR7XNfwkCiPz111+oXr26tkHvaYNkHkydOlU7GT9lypQEbZPgwrFjxzBv3jwULFgw5nopSSQb5unTp8emTZu0z2/fvo0KFSpoPUskA8ElUgZJTi6LjBkzRrvGXSSYIcGCBQsWaL0iVJZq11arh+PHjaNOmjdYIW3WRwMazzz6rqXlkFPBURnU1Dvd7W0oOZmqp2+8ZOJm4Fmg9S8/y+6RFbEZymKBCfj3IP/tb38ECuetONFBhIHDxGvBdXyClnyUJI+WVR1sBUpJJerVIySoKCZAACZAACZBAXAIMFnBVkAAJkAAJkIAPAnLqrFmzZtq31z9WuzyOnO6bsh44N0kvM+CStyYDc7cATcsC05vHNnTBd0C9CXoZoV/HAYmleYAPkRJGbT7xvmnQaDIwZwswvjHQ+uV7A0g9/2I9gCv/Am1eAcY2Snip9V+mlz2QxpQS+FBV1h3QMyFEfv31V2TLlk1VVakXCcRL4M8//8TDDz+sXSOb3hUr+qhLogBHKSvUuXNnbdO6fPnyMRotXbpUq1MvTXjXrVsXS9Pff/8d
```

--------------------------------

### DSPy Module Composition

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet illustrates how to compose multiple DSPy signatures and modules to create more complex language model pipelines. It demonstrates building a system with sequential or parallel processing of language model calls.

```Python
import dspy

# Assume BasicQA and SentimentAnalysis signatures are defined as above

class AdvancedPipeline(dspy.Module):
    def __init__(self):
        super().__init__()
        self.qa = dspy.Chain(BasicQA)
        self.sentiment = dspy.Chain(SentimentAnalysis)

    def forward(self, question):
        # First, answer the question
        qa_result = self.qa(question=question)
        
        # Then, analyze the sentiment of the answer
        sentiment_result = self.sentiment(text=qa_result.answer)
        
        return dspy.Prediction(answer=qa_result.answer, sentiment=sentiment_result.sentiment)

# Initialize LLM and create an instance of the pipeline
llm = dspy.OpenAI(model='gpt-3.5-turbo')
pipeline = AdvancedPipeline()

# Compile and run the pipeline
# compiled_pipeline = pipeline.compile(llm=llm, ...)
# result = compiled_pipeline(question="What is the weather like today?")
# print(f"Answer: {result.answer}")
# print(f"Sentiment: {result.sentiment}")
```

--------------------------------

### Connect Notebook to MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/agents/index.ipynb

Sets the MLflow tracking URI to a local server and defines the experiment name as 'DSPy'. This connects the current notebook session to the MLflow tracking server.

```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
```

--------------------------------

### dspy.Audio Class

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/primitives/Audio.md

Detailed documentation for the dspy.Audio class, covering its members, methods, and usage within the dspy framework.

```APIDOC
## dspy.Audio

### Description
Represents audio data within the dspy framework. This class provides methods for creating, loading, and processing audio content.

### Methods

- **description**: Returns a textual description of the audio object.
- **extract_custom_type_from_annotation**: Extracts custom types from annotations.
- **format**: Returns the audio in a specific format.
- **from_array**: Creates an Audio object from a NumPy array.
- **from_file**: Creates an Audio object from a local audio file.
- **from_url**: Creates an Audio object from an audio file URL.
- **is_streamable**: Checks if the audio is streamable.
- **parse_lm_response**: Parses a language model response related to audio.
- **parse_stream_chunk**: Parses a chunk of an audio stream.
- **serialize_model**: Serializes the audio model.
- **validate_input**: Validates the input audio data.

### Usage Examples

```python
# Example of creating Audio from a file
# audio_obj = dspy.Audio.from_file("path/to/audio.wav")

# Example of getting audio description
# print(audio_obj.description)
```

### Source Code

```python
class Audio:
    """Represents audio data."""

    def description(self) -> str:
        """Return a textual description of the audio object."""
        ...

    @classmethod
    def extract_custom_type_from_annotation(cls, annotation: Any) -> Type:
        """Extract custom types from annotations."""
        ...

    def format(self, format: str = "wav") -> bytes:
        """Return the audio in a specific format."""
        ...

    @classmethod
    def from_array(cls, array: np.ndarray, sample_rate: int = 44100) -> "Audio":
        """Create an Audio object from a numpy array."""
        ...

    @classmethod
    def from_file(cls, file: Union[str, pathlib.Path], **kwargs) -> "Audio":
        """Create an Audio object from a file."""
        ...

    @classmethod
    def from_url(cls, url: str, **kwargs) -> "Audio":
        """Create an Audio object from a url."""
        ...

    def is_streamable(self) -> bool:
        """Check if the audio is streamable."""
        ...

    def parse_lm_response(self, response: Any) -> Any:
        """Parse a language model response."""
        ...

    def parse_stream_chunk(self, chunk: bytes) -> Any:
        """Parse a stream chunk."""
        ...

    def serialize_model(self, model: Any) -> Any:
        """Serialize a model."""
        ...

    def validate_input(self, audio: Any) -> Any:
        """Validate the input audio."""
        ...
```
```

--------------------------------

### Enable DSPy Tracing with MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/tool_use/index.ipynb

Enables automatic logging for DSPy functionalities within MLflow.

```python
mlflow.dspy.autolog()
```

--------------------------------

### Import MCP and DSPy Libraries (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

This Python code imports necessary libraries from MCP and DSPy, including `ClientSession`, `StdioServerParameters`, `stdio_client`, and `dspy`.

```Python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

import dspy
```

--------------------------------

### DSPy: Create a Retrieval-Augmented Generation (RAG) Pipeline

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/llms_txt_generation/index.md

Illustrates the creation of a RAG pipeline using DSPy. This involves retrieving relevant documents based on a query and then generating a coherent response using those documents, seamlessly integrating retrieval and generation.

```Python
from dspy import Module, Signature, dsp

# Example Signature for RAG
class RAG(Signature):
    """Retrieve relevant documents and generate an answer."""
    query: str
    context: str
    answer: str

# Example Module for RAG (simplified)
class BasicRAG(Module):
    def __init__(self, retriever, generator):
        super().__init__()
        self.retriever = retriever # Assumes a retriever module
        self.generate = dsp.Generate(RAG)

    def forward(self, query):
        retrieved_docs = self.retriever(query)
        context = "\n".join(retrieved_docs)
        return self.generate(query=query, context=context)

# Usage:
# retriever = ... # Initialize your retriever
# generator = ... # Initialize your generator
# rag_pipeline = BasicRAG(retriever, generator)
# response = rag_pipeline('What is DSPy?')
# print(response.answer)
```

--------------------------------

### Basic DSPy Signature

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Demonstrates a basic DSPy signature for a question-answering task. Signatures define the input and output fields for an LLM call.

```Python
import dspy

class BasicQA(dspy.Signature):
    """Answer the question based on the context."""

    context = dspy.InputField(prefix="Context: ")
    question = dspy.InputField()
    answer = dspy.OutputField(prefix="Answer: ")
```

--------------------------------

### DSPy Program with Multiple Signatures

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates a DSPy program that uses multiple signatures for a more complex task, such as multi-hop question answering.

```Python
class MultiHopQA(dspy.Signature):
    """Answer the question based on the context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

class MultiHopQA(dspy.Module):
    def __init__(self):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=3)
        self.generate_answer = dspy.Chain(
            BasicQA,
            answer_prefix="The answer is "
        )

    def forward(self, question):
        context = self.retrieve(question)
        return self.generate_answer(context=context, question=question)

```

--------------------------------

### DSPy Optimizers

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Explains the use of optimizers in dspy for automatically tuning language model prompts and modules. Optimizers help improve the performance and accuracy of dspy pipelines.

```Python
from dspy.teleprompt import BootstrapFewShot

optimizer = BootstrapFewShot(metric=dspy.Accuracy)
optimized_chain = optimizer(SimpleChain(llm), trainset=[example])

print(optimized_chain('DSPy is a framework for programming large language models.'))
```

--------------------------------

### Instantiate ReAct Agent with Tools

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/customer_service_agent/index.ipynb

Creates an instance of a ReAct agent using dspy.ReAct. It requires a signature (DSPyAirlineCustomerService) and a list of available tools to process user requests.

```python
agent = dspy.ReAct(
    DSPyAirlineCustomerService,
    tools = [
        fetch_flight_info,
        fetch_itinerary,
        pick_flight,
        book_flight,
        cancel_itinerary,
        get_user_info,
        file_ticket,
    ]
)
```

--------------------------------

### Save and Log Finetuned Agent with MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/games/index.ipynb

This code snippet demonstrates how to save and log the finetuned agent program using MLflow. MLflow helps with dependency management, experiment tracking, and collaboration by saving the frozen environment metadata and performance metrics.

```Python
import mlflow

# Start an MLflow Run and save the program
with mlflow.start_run(run_name="optimized"):
    model_info = mlflow.dspy.log_model(
        finetuned_4o_mini,
        artifact_path="model", # Any name to save the program in MLflow
    )

# Load the program back from MLflow
loaded = mlflow.dspy.load_model(model_info.model_uri)
```

--------------------------------

### DocumentationFetcher Class

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/sample_code_generation/index.md

A Python class designed to fetch and process documentation from web URLs. It handles HTTP requests, parses HTML content, converts it to markdown, and includes retry logic for robustness. Dependencies include `requests`, `BeautifulSoup`, and `html2text`.

```python
import requests
import time
from bs4 import BeautifulSoup
import html2text
import dspy
from typing import Dict

class DocumentationFetcher:
    """Fetches and processes documentation from URLs."""
    
    def __init__(self, max_retries=3, delay=1):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.max_retries = max_retries
        self.delay = delay
        self.html_converter = html2text.HTML2Text()
        self.html_converter.ignore_links = False
        self.html_converter.ignore_images = True
    
    def fetch_url(self, url: str) -> dict[str, str]:
        """Fetch content from a single URL."""
        for attempt in range(self.max_retries):
            try:
                print(f"📡 Fetching: {url} (attempt {attempt + 1})")
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Remove script and style elements
                for script in soup(["script", "style", "nav", "footer", "header"]):
                    script.decompose()
                
                # Convert to markdown for better LLM processing
                markdown_content = self.html_converter.handle(str(soup))
                
                return {
                    "url": url,
                    "title": soup.title.string if soup.title else "No title",
                    "content": markdown_content,
                    "success": True
                }
                
            except Exception as e:
                print(f"❌ Error fetching {url}: {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(self.delay)
                else:
                    return {
                        "url": url,
                        "title": "Failed to fetch",
                        "content": f"Error: {str(e)}",
                        "success": False
                    }
        
        return {"url": url, "title": "Failed", "content": "", "success": False}
    
    def fetch_documentation(self, urls: list[str]) -> list[dict[str, str]]:
        """Fetch documentation from multiple URLs."""
        results = []
        
        for url in urls:
            result = self.fetch_url(url)
            results.append(result)
            time.sleep(self.delay)  # Be respectful to servers
        
        return results
```

--------------------------------

### DSPy: Using ChainOfThought Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet illustrates the use of the ChainOfThought (CoT) module in DSPy, which enables LLMs to generate step-by-step reasoning to arrive at an answer.

```Python
import dspy

# Assume a language model is configured
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a question-answering task
class QuestionAnswering(dspy.Signature):
    """Answer the question based on the provided context."""

    context = dspy.InputField(desc="Context containing the answer")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Create a ChainOfThought program using the signature
# qa_chain = dspy.ChainOfThought(QuestionAnswering)

# Example usage:
# context = "The Eiffel Tower is located in Paris, France."
# question = "Where is the Eiffel Tower located?"
# result = qa_chain(context=context, question=question)
# print(result.answer)
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the core functionality of DSPy, likely involving the definition of signatures, modules, and the compilation of language model calls. It's the foundational element for building DSPy programs.

```Python
import dspy

# Example of defining a signature
class BasicQA(dspy.Signature):
    """Answer questions based on the context."""
    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField()

# Example of a simple module
class BasicQAModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.qa = dspy.ChainOfThought(BasicQA)

    def forward(self, context, question):
        return self.qa(context=context, question=question)

# Example of compiling and running a program
# Assuming a language model is configured
# program = BasicQAModule()
# result = program(context="The sky is blue.", question="What color is the sky?")
# print(result.answer)
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the fundamental usage of the dspy library, likely involving the definition of a language model, a signature, and a module for processing. It showcases the core programming paradigm of dspy.

```Python
import dspy

# Initialize a language model (e.g., OpenAI)
llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a task
class Summarize(dspy.Signature):
    """Summarize the following text."""
    article = dspy.InputField(prefix="article:")
    summary = dspy.OutputField()

# Create a module using the signature
class SummarizeModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.summarize = dspy.ChainOfThought(Summarize)

    def forward(self, article):
        return self.summarize(article=article)

# Instantiate the module and run it
sg = dspy.Singularity(SummarizeModule)
result = sg(article="The quick brown fox jumps over the lazy dog.")

print(result.summary)
```

--------------------------------

### Define User Profiles (Python)

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/mcp/index.md

This Python code defines a dictionary to store user profiles, simulating a simple database for user data.

```Python
user_database = {
    "Adam": UserProfile(user_id="1", name="Adam", email="adam@gmail.com"),
    "Bob": UserProfile(user_id="2", name="Bob", email="bob@gmail.com"),
    "Chelsie": UserProfile(user_id="3", name="Chelsie", email="chelsie@gmail.com"),
    "David": UserProfile(user_id="4", name="David", email="david@gmail.com"),
}
```

--------------------------------

### Audio Processing with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial explores audio-related tasks and processing using DSPy. It likely covers functionalities such as speech recognition, audio generation, or audio analysis.

```Python
import dspy

# Example of audio processing with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class AudioProcessor(dspy.Module):
    def __init__(self):
        super().__init__()
        self.transcribe = dspy.SpeechToText()
        self.generate_speech = dspy.TextToSpeech()

    def forward(self, audio_file=None, text=None):
        if audio_file:
            transcription = self.transcribe(audio=audio_file)
            return transcription
        elif text:
            audio_output = self.generate_speech(text=text)
            return audio_output
        return None

# Usage example (placeholder)
# processor = AudioProcessor()
# transcription = processor(audio_file='input.wav')
# print(f'Transcription: {transcription}')
# audio_response = processor(text='Hello, world!')
# print(f'Generated audio: {audio_response}')
```

--------------------------------

### Output Refinement with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial covers techniques for refining the output of DSPy models. It focuses on improving the quality, format, or accuracy of generated responses using methods like Best-of-N and Refine.

```Python
import dspy

# Example of output refinement using Best-of-N and Refine in DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.

# Assume 'generate_candidate_outputs' function exists

# class OutputRefiner(dspy.Module):
#     def __init__(self):
#         super().__init__()
#         self.refine = dspy.ChainOfThought(dspy.Answer)
#
#     def forward(self, query, candidates):
#         # Select the best candidate and refine it
#         best_candidate = max(candidates, key=lambda c: c.score) # Example selection
#         refined_output = self.refine(context=best_candidate.output, question=query)
#         return refined_output

# Usage example (placeholder)
# refiner = OutputRefiner()
# query = 'Explain DSPy briefly.'
# candidates = [{'output': 'DSPy is a framework.', 'score': 0.8}, {'output': 'DSPy helps build AI.', 'score': 0.9}]
# refined_result = refiner(query, candidates)
# print(f'Refined output: {refined_result}')
```

--------------------------------

### DSPy: Optimize Prompts for Language Models

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/llms_txt_generation/index.md

Explains how to use DSPy for automatic prompt optimization. The system learns to improve prompts based on performance metrics, leading to better language model responses without manual tuning.

```Python
from dspy import Module, Signature, dsp
from dspy.teleprompt import BootstrapFewShot

# Example Signature for a task
class Summarize(Signature):
    """Summarize the input text."""
    text: str
    summary: str

# Example Module
class Summarizer(Module):
    def __init__(self):
        super().__init__()
        self.predict = dsp.Predict(Summarize)

    def forward(self, text):
        return self.predict(text=text)

# Usage with optimization:
# summarizer = Summarizer()
# optimizer = BootstrapFewShot(metric='rouge') # Example metric
# optimized_summarizer = optimizer(summarizer, trainset=...) # trainset contains examples
# print(optimized_summarizer('Long input text...'))
```

--------------------------------

### DSPy: Chain of Thought Prompting

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates how to implement Chain of Thought (CoT) prompting within dspy. CoT encourages the model to generate intermediate reasoning steps, leading to more accurate answers.

```Python
import dspy

llm = dspy.OpenAI(model='gpt-3.5-turbo')

class CoTQA(dspy.Signature):
    """Answer questions based on the provided context, thinking step-by-step."""

    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField(desc="step-by-step reasoning and the final answer")

cot_qa = dspy.ChainOfThought(CoTQA)

# Example usage:
# print(cot_qa(context="The Eiffel Tower is in Paris. Paris is the capital of France.", question="Where is the Eiffel Tower?").answer)
```

--------------------------------

### DSPy: Advanced Optimization Techniques

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Explores advanced optimization strategies within DSPy, such as using different optimizers and metrics to fine-tune LLM performance. This snippet demonstrates how to leverage DSPy's optimization capabilities for better results.

```Python
import dspy

# Assume llm is already configured
# llm = dspy.OpenAI(model='gpt-3.5-turbo')
# dspy.settings.configure(lm=llm)

# Define a signature for a task that can be optimized
class TranslateAndSimplify(dspy.Signature):
    """Translate the text to French and simplify it."""
    text = dspy.InputField(desc="text to translate and simplify")
    translated_simplified_text = dspy.OutputField()

# Create a module
class Translator(dspy.Module):
    def __init__(self, dspy_llm):
        super().__init__()
        self.predict = dspy.Chain(TranslateAndSimplify)

    def forward(self, text):
        return self.predict(text=text)

# Example data
class Example:
    def __init__(self, text, translated_simplified_text):
        self.text = text
        self.translated_simplified_text = translated_simplified_text

examples = [
    Example(text="The quick brown fox jumps over the lazy dog.", translated_simplified_text="Le renard brun rapide saute par-dessus le chien paresseux."),
    Example(text="Artificial intelligence is transforming many industries.", translated_simplified_text="L'intelligence artificielle transforme de nombreuses industries.")
]

# Instantiate the module
translator_module = Translator(dspy_llm=dspy.settings.lm)

# Compile the module with an optimizer
compiled_translator = dspy.Chain(TranslateAndSimplify)

# Use a simple optimizer like BootstrapFewShot
compiled_translator.compile(optimizer=dspy.BootstrapFewShot(metric=dspy.Levenshtein), trainset=examples)

# Test the compiled module
input_text = "DSPy makes LLM programming easier."
prediction = compiled_translator(text=input_text)

print(f"Original: {input_text}")
print(f"Translated and Simplified: {prediction.translated_simplified_text}")
```

--------------------------------

### Game Loop and State Management in Python

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

This Python code snippet demonstrates the main game loop, which handles different game states such as the main menu, playing the game, and game over. It manages player input, updates the game state, and provides options for character creation, loading a game, and exiting the game. It uses the `typer` library for command-line interface and `console` for formatted output.

```Python
def main():
    """Main game function."""
    while game.running:
        if game.state == GameState.MENU:
            choice = main_menu()
            
            if choice == "1":
                game.player = create_new_character()
                game.context = GameContext()
                game.state = GameState.PLAYING
                console.print("\n[italic]Your adventure begins...[/italic]")
                typer.prompt("Press Enter to start")
                
            elif choice == "2":
                if game.load_game():
                    game.state = GameState.PLAYING
                typer.prompt("Press Enter to continue")
                
            elif choice == "3":
                show_help()
                
            elif choice == "4":
                game.running = False
                console.print("[bold]Thanks for playing! Goodbye![/bold]")
            
        elif game.state == GameState.PLAYING:
            game_loop()
            
        elif game.state == GameState.GAME_OVER:
            console.print("\n[bold]Game Over[/bold]")
            restart = typer.confirm("Would you like to return to the main menu?")
            if restart:
                game.state = GameState.MENU
            else:
                game.running = False

if __name__ == "__main__":
    main()
```

--------------------------------

### Connect Notebook to MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/entity_extraction/index.ipynb

Connects the current notebook environment to a running MLflow tracking server, setting the tracking URI and defining an experiment name for organizing runs.

```Python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
```

--------------------------------

### Connect Notebook to MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/classification_finetuning/index.ipynb

Connects the current Python notebook environment to a running MLflow instance, setting the tracking URI and experiment name for logging.

```Python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
```

--------------------------------

### Define and Run DSPy ChainOfThought Module

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/learn/programming/language_models.md

Demonstrates how to define a ChainOfThought module with a specific signature and then execute it with a question. It shows the basic interaction pattern for DSPy modules and assumes a default LM is already configured.

```python
# Define a module (ChainOfThought) and assign it a signature (return an answer, given a question).
qa = dspy.ChainOfThought('question -> answer')

# Run with the default LM configured with `dspy.configure` above.
response = qa(question="How many floors are in the castle David Gregory inherited?")
print(response.answer)
```

--------------------------------

### Retrieval-Augmented Generation (RAG) with DSPy

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/index.md

This tutorial covers implementing Retrieval-Augmented Generation (RAG) systems using DSPy. It demonstrates how to integrate retrieval mechanisms with generative models for enhanced response accuracy.

```Python
import dspy

# Example of RAG implementation with DSPy
# This is a placeholder and would be replaced by actual code from the tutorial.
class RAGPipeline(dspy.Module):
    def __init__(self, retriever_name='default_retriever'):
        super().__init__()
        self.retrieve = dspy.Retrieve(index_name=retriever_name)
        self.generate_answer = dspy.GenerateAnswer()

    def forward(self, question):
        context = self.retrieve(question)
        answer = self.generate_answer(context=context, question=question)
        return answer

# Initialize and use the RAG pipeline (example)
# rag_pipeline = RAGPipeline()
# response = rag_pipeline('What are the benefits of DSPy?')
# print(response)
```

--------------------------------

### Generate Image with Fal AI and Display Image

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/image_generation_prompting/index.ipynb

Contains two functions: `generate_image` submits a prompt to the 'fal-ai/flux-pro' model to generate an image and returns it as a DSPy Image object. `display_image` downloads an image from a URL, resizes it, and displays it using IPython.display.

```python
import requests
from PIL import Image
from io import BytesIO

def generate_image(prompt):

    request_id = fal_client.submit(
        "fal-ai/flux-pro/v1.1-ultra",
        arguments={
            "prompt": prompt
        },
    ).request_id

    result = fal_client.result("fal-ai/flux-pro/v1.1-ultra", request_id)
    url = result["images"][0]["url"]

    return dspy.Image.from_url(url)

def display_image(image):
    url = image.url
    # download the image
    response = requests.get(url)
    image = Image.open(BytesIO(response.content))

    # display at 25% of original size
    display(image.resize((image.width // 4, image.height // 4)))
```

--------------------------------

### DSPy Program Optimization with Signatures

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet showcases how DSPy's signature-based approach facilitates program optimization. By clearly defining inputs and outputs, DSPy can automatically tune prompts and module configurations for better performance.

```Python
import dspy

# Assume llm is already initialized
# llm = dspy.OpenAI(model='gpt-3.5-turbo')

# Define a signature for a specific task
class ExtractKeywords(dspy.Signature):
    """Extract the most relevant keywords from a given text."""
    text = dspy.InputField(desc="The input text.")
    keywords = dspy.OutputField(desc="A comma-separated list of keywords.")

# Create a module using the signature
class KeywordExtractor(dspy.Module):
    def __init__(self):
        super().__init__()
        self.extract = dspy.Predict(ExtractKeywords)

    def forward(self, text):
        return self.extract(text=text)

# Example usage
input_text = "DSPy is a framework for developing and deploying large language model applications. It helps organize prompts, manage context, and evaluate performance."

extractor = KeywordExtractor()

# DSPy's optimizer can be used here to tune the 'extract' module
# For demonstration, we'll just run it directly
result = extractor(text=input_text)

print(f"Input Text: {input_text}")
print(f"Extracted Keywords: {result.keywords}")
```

--------------------------------

### Demosy Signature with Multiple Fields

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

Illustrates a more complex signature with multiple input and output fields, demonstrating how to handle structured data. This is useful for tasks requiring detailed input processing and structured output generation.

```Python
import dspy

signature = dspy.Signature(
    "Extract entities and their types from text: \nText: {text}\nEntities:",
    "Extract all named entities from the text and classify their types.",
    "entities": "List[Tuple[str, str]]"
)
```

--------------------------------

### GRPO Training Arguments Configuration

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/rl_papillon/index.ipynb

Defines the hyperparameters for training a dspy program using GRPO. This includes batch size, gradient accumulation, learning rate, and LoRA settings. These arguments are passed to the training process.

```python
train_kwargs = {
    "per_device_train_batch_size": 8,
    "gradient_accumulation_steps": 4,
    "temperature": 1.0,
    "beta": 0.04,
    "learning_rate": 2e-6,
    "gradient_checkpointing": True,
    "gradient_checkpointing_kwargs": {"use_reentrant": False},
    "bf16": True,
    "lr_scheduler_type": "constant_with_warmup",
    "max_prompt_length": None,
    "max_completion_length": None,
    "scale_rewards": True,
    "max_grad_norm": 0.5,
    "lora": True,
}
```

--------------------------------

### DSPy Core Functionality

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/gepa_facilitysupportanalyzer/index.ipynb

This snippet demonstrates the core functionalities of the DSPy framework, likely involving the definition and execution of language models and their interactions. It may require specific DSPy libraries or configurations.

```Python
import dspy

# Initialize DSPy with a language model
llm = dspy.OpenAI(model='gpt-3.5-turbo')
dspy.settings.configure(lm=llm)

# Define a simple DSPy module
class SimpleModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.generate_thought = dspy.ChainOfThought(dspy.Predict("input -> output"))

    def forward(self, input):
        return self.generate_thought(input=input)

# Instantiate and run the module
module = SimpleModule()
result = module(input="What is the capital of France?")

print(result.output)
```

--------------------------------

### Connect Notebook to MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Connects the current notebook to the MLflow tracking server, setting the tracking URI and experiment name.

```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("DSPy")
```

--------------------------------

### Save DSPy Program with MLflow

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/multihop_search/index.ipynb

Logs a DSPy program as an MLflow model within an MLflow run, enabling better reproducibility and collaboration. It also demonstrates loading the program back from MLflow using its model URI.

```python
import mlflow

# Start an MLflow Run and save the program
with mlflow.start_run(run_name="optimized"):
    model_info = mlflow.dspy.log_model(
        optimized,
        artifact_path="model", # Any name to save the program in MLflow
    )

# Load the program back from MLflow
loaded = mlflow.dspy.load_model(model_info.model_uri)
```

--------------------------------

### Configure DSPy LM

Source: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/tutorials/ai_text_game/index.md

Sets up the Large Language Model (LLM) for DSPy, specifying the model to be used (e.g., 'openai/gpt-4o-mini'). This is a foundational step for enabling AI-driven interactions within the game.

```Python
import dspy

lm = dspy.LM(model='openai/gpt-4o-mini')
dspy.configure(lm=lm)
```