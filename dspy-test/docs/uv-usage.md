# Instructions for Working with Python Projects Using uv

## Overview

This project uses **uv** by Astral as its Python package and project manager. uv is a modern, fast alternative to pip, pip-tools, poetry, and other traditional Python package managers. When working with this project, you should use uv commands exclusively instead of pip, poetry, pipenv, or other package managers.

## Key Principles

1. **Always use uv commands** - Never suggest or use `pip`, `poetry`, `pipenv`, or `conda` commands
2. **uv manages everything** - uv handles virtual environments, dependencies, Python versions, and package installation
3. **Speed and reliability** - uv is significantly faster than traditional tools and provides consistent dependency resolution

## Essential uv Commands

### Project Initialization

```bash
# Initialize a new Python project
uv init

# Initialize with a specific Python version
uv init --python 3.12
```

### Dependency Management

```bash
# Add a dependency to the project
uv add <package-name>

# Add a development dependency
uv add --dev <package-name>

# Add a specific version
uv add "package-name==1.2.3"

# Add with version constraints
uv add "package-name>=1.2,<2.0"

# Remove a dependency
uv remove <package-name>

# Update all dependencies
uv lock --upgrade

# Update a specific package
uv lock --upgrade-package <package-name>
```

### Running Python Code

```bash
# Run a Python script
uv run python script.py

# Run a module
uv run python -m module_name

# Run a command in the project environment
uv run <command>

# Example: Run pytest
uv run pytest

# Example: Run a CLI tool installed in the project
uv run black .
```

### Synchronizing Dependencies

```bash
# Install all dependencies from pyproject.toml/uv.lock
uv sync

# Install without development dependencies
uv sync --no-dev

# Force reinstall all packages
uv sync --reinstall
```

### Python Version Management

```bash
# Install a specific Python version
uv python install 3.12

# Use a specific Python version for the project
uv python pin 3.12

# List available Python versions
uv python list
```

### Virtual Environment (Usually Automatic)

```bash
# uv automatically manages virtual environments, but you can manually create one
uv venv

# Create with a specific Python version
uv venv --python 3.12

# Activate the virtual environment (if needed manually)
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows
```

### Package Installation (Direct)

```bash
# Install packages without adding to project dependencies
uv pip install <package-name>

# Install from requirements.txt
uv pip install -r requirements.txt

# Install in editable mode
uv pip install -e .
```

### Locking Dependencies

```bash
# Generate or update uv.lock file
uv lock

# Check if lock file is up to date
uv lock --check
```

### Building and Publishing

```bash
# Build the project
uv build

# Publish to PyPI
uv publish

# Publish to a custom index
uv publish --index-url https://custom.pypi.org/simple
```

## Project File Structure

uv projects typically use these files:

- **pyproject.toml** - Project metadata and dependencies
- **uv.lock** - Locked dependency versions (commit this to version control)
- **.venv/** - Virtual environment directory (do not commit)
- **.python-version** - Pinned Python version (optional)

## Common Workflows

### Starting Work on an Existing Project

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Sync dependencies (installs everything from uv.lock)
uv sync
```

### Adding a New Feature with Dependencies

```bash
# Add required packages
uv add requests httpx

# Add development tools
uv add --dev pytest black ruff

# Run tests
uv run pytest

# Format code
uv run black .
```

### Running Tests and Checks

```bash
# Run tests
uv run pytest

# Run tests with coverage
uv run pytest --cov

# Run linter
uv run ruff check .

# Run formatter
uv run black --check .

# Run type checker
uv run mypy .
```

### Updating Dependencies

```bash
# Update all dependencies to latest compatible versions
uv lock --upgrade

# Update a specific package
uv lock --upgrade-package requests

# Sync the updated dependencies
uv sync
```

## Important Notes

### DO NOT Use These Commands

❌ `pip install <package>`  
❌ `pip freeze > requirements.txt`  
❌ `poetry add <package>`  
❌ `pipenv install <package>`  
❌ `python -m venv venv`  
❌ `virtualenv venv`  

### DO Use These Instead

✅ `uv add <package>`  
✅ `uv lock` (lock file replaces requirements.txt)  
✅ `uv add <package>`  
✅ `uv add <package>`  
✅ `uv venv` (or let uv manage automatically)  
✅ `uv venv`  

## Why uv?

- **Fast** - Written in Rust, 10-100x faster than pip
- **Reliable** - Consistent dependency resolution across platforms
- **Modern** - Follows modern Python packaging standards (PEP 517, 621, etc.)
- **All-in-one** - Replaces pip, pip-tools, poetry, pyenv, and virtualenv
- **Compatible** - Works with existing PyPI packages and standards

## Troubleshooting

### Dependencies Not Found

```bash
# Ensure lock file is synced
uv lock
uv sync
```

### Python Version Issues

```bash
# Install required Python version
uv python install 3.12

# Pin it to the project
uv python pin 3.12
```

### Cache Issues

```bash
# Clear uv cache
uv cache clean
```

### Environment Issues

```bash
# Remove and recreate virtual environment
rm -rf .venv
uv sync
```

## Additional Resources

- Official Documentation: https://docs.astral.sh/uv/
- GitHub Repository: https://github.com/astral-sh/uv
- Migration Guide: https://docs.astral.sh/uv/guides/migration/

## Summary for LLMs

When working with this Python project:

1. Always use `uv add` instead of `pip install` when adding dependencies
2. Use `uv run` to execute Python scripts and commands
3. Use `uv sync` to install dependencies from the lock file
4. Use `uv lock` when you need to update the dependency lock file
5. Never suggest pip, poetry, pipenv, or conda commands
6. Assume uv is already installed and available in the environment

The workflow is simple: `uv add` to add packages, `uv run` to run code, and `uv sync` to install dependencies.