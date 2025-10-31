# Documentation Directory

Reference documentation for DSPy, optimization techniques, and development tools used in this project.

## Documents

### Core DSPy Documentation

#### [dspy-docs.md](./dspy-docs.md)
**Size:** ~479KB | **Focus:** Comprehensive DSPy reference

**Contents:**
- Complete DSPy framework documentation
- Signatures, modules, and predictors
- All available DSPy modules (ChainOfThought, ReAct, etc.)
- Compiler and optimizer details
- Integration guides
- Best practices

**When to use:**
- Learning DSPy fundamentals
- Looking up specific module APIs
- Understanding compiler behavior
- Troubleshooting DSPy issues

### Optimization

#### [miprov2.md](./miprov2.md)
**Size:** 3.8KB | **Focus:** Quick MIPROv2 reference

**Contents:**
- MIPROv2 optimizer overview
- Configuration parameters
- Usage examples
- Common patterns

**When to use:**
- Quick MIPROv2 reference
- Understanding optimization parameters
- Troubleshooting optimization issues

#### [dspy-mipro2-docs.md](./dspy-mipro2-docs.md)
**Size:** 25KB | **Focus:** Detailed MIPROv2 documentation

**Contents:**
- In-depth MIPROv2 algorithm explanation
- Bayesian optimization details
- Instruction proposal mechanism
- Advanced configuration options
- Performance tuning

**When to use:**
- Deep dive into MIPROv2 internals
- Advanced optimization scenarios
- Research and experimentation
- Understanding optimization failures

### Prompting

#### [prompts.md](./prompts.md)
**Size:** 3.5KB | **Focus:** Manual prompt engineering

**Contents:**
- Traditional prompt engineering techniques
- Prompt patterns and templates
- Few-shot example formatting
- Best practices for manual prompts

**When to use:**
- Understanding prompt engineering basics
- Manually crafting prompts
- Comparing manual vs automated optimization
- Fallback when DSPy optimization isn't available

### Development Tools

#### [uv-usage.md](./uv-usage.md)
**Size:** 6.5KB | **Focus:** UV package manager commands

**Contents:**
- UV installation and setup
- Common commands (install, sync, add, remove)
- Project management
- Virtual environment handling
- Migration from pip/poetry

**When to use:**
- Managing project dependencies
- Running Python scripts
- Setting up development environment
- Troubleshooting package issues

## Quick Reference

### Need to...

**Learn DSPy basics?**
→ Start with [../quick-start-app/README.md](../quick-start-app/README.md)
→ Then read [dspy-docs.md](./dspy-docs.md) sections 1-3

**Optimize prompts?**
→ Quick: [miprov2.md](./miprov2.md)
→ Detailed: [dspy-mipro2-docs.md](./dspy-mipro2-docs.md)
→ Practical: [../tasks/NEXT-SESSION-README.md](../tasks/NEXT-SESSION-README.md)

**Understand prompt engineering?**
→ [prompts.md](./prompts.md) for manual techniques
→ [dspy-docs.md](./dspy-docs.md) for DSPy approach

**Manage dependencies?**
→ [uv-usage.md](./uv-usage.md)

**Debug optimization issues?**
→ [../tasks/optimization-status.md](../tasks/optimization-status.md)
→ [../tasks/NEXT-SESSION-README.md](../tasks/NEXT-SESSION-README.md)

**Build production apps?**
→ [../coach-app/README.md](../coach-app/README.md)
→ [dspy-docs.md](./dspy-docs.md) - Compilers section

## Documentation Organization

```
docs/
├── README.md                   # This file - Documentation index
├── dspy-docs.md               # Core DSPy reference (read first)
├── miprov2.md                 # Quick MIPROv2 guide
├── dspy-mipro2-docs.md        # Detailed MIPROv2 docs
├── prompts.md                 # Manual prompt engineering
└── uv-usage.md                # Package manager reference

Related:
├── ../README.md               # Project overview
├── ../quick-start-app/README.md  # Learning examples
├── ../coach-app/README.md     # Production app guide
└── ../tasks/                  # Project planning
    ├── NEXT-SESSION-README.md
    ├── optimization-status.md
    └── full-implementation-plan.md
```

## Learning Path

### Beginner

1. **Start here:** [../README.md](../README.md) - Project overview
2. **Run example:** [../quick-start-app/README.md](../quick-start-app/README.md)
3. **Learn DSPy:** [dspy-docs.md](./dspy-docs.md) - Sections 1-3
4. **Explore coach app:** [../coach-app/README.md](../coach-app/README.md)

### Intermediate

1. **Understand modules:** [dspy-docs.md](./dspy-docs.md) - Sections 4-6
2. **Learn optimization:** [miprov2.md](./miprov2.md)
3. **Run optimization:** [../tasks/NEXT-SESSION-README.md](../tasks/NEXT-SESSION-README.md)
4. **Study results:** [../tasks/optimization-status.md](../tasks/optimization-status.md)

### Advanced

1. **Deep optimization:** [dspy-mipro2-docs.md](./dspy-mipro2-docs.md)
2. **Custom metrics:** [../coach-app/metrics.py](../coach-app/metrics.py)
3. **Production deployment:** [../coach-app/README.md](../coach-app/README.md) - Production section
4. **Compare approaches:** [prompts.md](./prompts.md) vs DSPy optimization

## External Resources

### DSPy
- [Official Docs](https://dspy-docs.vercel.app/)
- [GitHub Repository](https://github.com/stanfordnlp/dspy)
- [Research Paper](https://arxiv.org/abs/2310.03714)
- [MIPROv2 Paper](https://arxiv.org/abs/2406.11695)

### Tools
- [UV Package Manager](https://docs.astral.sh/uv/)
- [Pydantic](https://docs.pydantic.dev/)
- [Python 3.13](https://docs.python.org/3.13/)

### LLM Providers
- [Google Gemini](https://ai.google.dev/)
- [OpenAI](https://platform.openai.com/)
- [Anthropic Claude](https://docs.anthropic.com/)

## Contributing Documentation

Found an issue or want to add documentation?

### Adding New Docs

1. Create markdown file in `docs/`
2. Add entry to this README
3. Link from relevant README files
4. Follow existing formatting conventions

### Updating Existing Docs

1. Maintain section structure
2. Update "Last updated" date
3. Keep examples working
4. Test all links

### Documentation Style

- **Headers:** Use sentence case
- **Code:** Use syntax highlighting
- **Links:** Relative paths for internal docs
- **Examples:** Include runnable code
- **Sections:** Clear, focused topics

## Common Questions

### Q: Which doc should I read first?

**A:** Start with [../README.md](../README.md) for overview, then [../quick-start-app/README.md](../quick-start-app/README.md) for hands-on learning.

### Q: Where's the API reference?

**A:** Complete DSPy API is in [dspy-docs.md](./dspy-docs.md). Module-specific APIs are in the respective READMEs.

### Q: How do I find optimization troubleshooting?

**A:** Check [../tasks/NEXT-SESSION-README.md](../tasks/NEXT-SESSION-README.md) for step-by-step troubleshooting and [../tasks/optimization-status.md](../tasks/optimization-status.md) for latest results.

### Q: What's the difference between miprov2.md and dspy-mipro2-docs.md?

**A:**
- `miprov2.md` - Quick reference, practical usage
- `dspy-mipro2-docs.md` - Detailed algorithm explanation, advanced topics

### Q: Where are code examples?

**A:**
- Basic: [../quick-start-app/](../quick-start-app/)
- Advanced: [../coach-app/](../coach-app/)
- Snippets: Throughout all documentation

### Q: How do I update the docs after running optimization?

**A:** Update [../tasks/optimization-status.md](../tasks/optimization-status.md) with new metrics and results.

---

**Documentation maintained:** October 2025
**Project version:** 0.1.0
**DSPy version:** 3.0.3+
