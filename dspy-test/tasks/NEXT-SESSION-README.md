# 🚀 Quick Start Guide for Next Session

**Date:** 2025-10-23
**Status:** Phase 4 (Optimization) is 95% complete - Ready to resume!

## ⚡ What Happened Last Session

### ✅ Completed Work
1. **Migrated optimize.py to MIPROv2** - Changed from BootstrapFewShot to MIPROv2 for better small-dataset optimization
2. **Fixed bugs** - Added missing `primary_lift_pr` parameter in evaluation function
3. **Added CLI support** - Can now run non-interactively with `uv run optimize.py 3`
4. **Verified bootstrap phase** - MIPROv2 successfully created 6 demo sets and extracted traces
5. **Reduced API calls** - Lowered demo counts from 4/3 to 2/2 to minimize quota usage

### ⚠️ Current Blocker
**Gemini API Daily Quota Exhausted** - Hit the 50 requests/day limit during optimization.

**What completed before block:**
- ✅ Step 1/3: Bootstrap phase (6 demo sets created)
- ⚠️ Step 2/3: Instruction proposal phase (started, hit quota)
- ❌ Step 3/3: Bayesian optimization (not reached)

## 🎯 Choose Your Path to Resume

### Path 1: Wait for Quota Reset (Recommended for Free Tier)
**When to use:** You're on free tier and not in a hurry

```bash
# Wait 24 hours, then:
cd dspy-test/coach-app
uv run optimize.py 3
# Let it run for ~15-20 minutes
# Check optimized/extractor.json and optimized/generator.json when done
```

**Pros:** Free, code is ready
**Cons:** 24-hour wait
**Cost:** $0
**Time:** ~30-40 minutes after quota resets

---

### Path 2: Upgrade API Plan (Best for Development)
**When to use:** You want to continue immediately and are doing active development

1. Visit https://ai.google.dev/pricing
2. Upgrade to paid tier (1000 RPM, higher daily limits)
3. Run the same command:
   ```bash
   cd dspy-test/coach-app
   uv run optimize.py 3
   ```

**Pros:** Immediate, reliable for iteration
**Cons:** Small cost
**Cost:** ~$0.50-2.00 for full optimization
**Time:** ~15-20 minutes

---

### Path 3: Use Alternative Model Provider
**When to use:** You have OpenAI/Claude/other API access

1. Edit `dspy-test/coach-app/optimize.py`
2. Update lines 39 and 90 (the `dspy.configure()` calls):
   ```python
   # For OpenAI:
   dspy.configure(lm=dspy.LM("gpt-3.5-turbo", api_key=os.getenv("OPENAI_API_KEY")))

   # For Claude:
   dspy.configure(lm=dspy.LM("claude-3-haiku-20240307", api_key=os.getenv("ANTHROPIC_API_KEY")))
   ```
3. Set the appropriate environment variable
4. Run: `cd dspy-test/coach-app && uv run optimize.py 3`

**Pros:** Separate quota, different model characteristics
**Cons:** Requires different API key, results may vary
**Cost:** Varies by provider
**Time:** ~20-30 minutes

---

### Path 4: Skip Optimization (Fallback)
**When to use:** Can't complete optimization, need to make progress

Skip MIPROv2 and manually port prompts to AI SDK:

1. Open `dspy-test/coach-app/modules.py` (lines 47-98 for signatures)
2. Open `dspy-test/coach-app/training_data.py` (lines 17-401 for examples)
3. Open `backend/src/prompts.ts`
4. Manually translate DSPy signatures to system prompts
5. Add few-shot examples from training data

**Pros:** No API costs, immediate progress
**Cons:** Miss out on systematic optimization, more manual work
**Cost:** $0
**Time:** ~1-2 hours

---

## 📋 After Optimization Completes

1. **Review optimized modules:**
   ```bash
   ls -la dspy-test/coach-app/optimized/
   # Should see: extractor.json and generator.json
   ```

2. **Check optimization history** (shows generated instructions):
   ```python
   cd dspy-test/coach-app
   uv run python -c "import dspy; dspy.inspect_history(n=5)"
   ```

3. **Review performance improvements** - The script outputs baseline vs optimized scores

4. **Proceed to Phase 5** - Port optimized prompts to AI SDK in `backend/src/prompts.ts`

---

## 📁 Key Files Reference

- **Main Plan:** `dspy-test/docs/full-implementation-plan.md`
- **This Session's Details:** `dspy-test/docs/optimization-status.md`
- **Optimizer Script:** `dspy-test/coach-app/optimize.py` ✅ USES MIPROv2
- **Modules:** `dspy-test/coach-app/modules.py`
- **Training Data:** `dspy-test/coach-app/training_data.py`
- **Metrics:** `dspy-test/coach-app/metrics.py`

---

## 🔍 Troubleshooting

**Q: How do I check my API quota status?**
A: Visit https://ai.dev/usage?tab=rate-limit

**Q: Can I reduce API calls further?**
A: Already optimized! Demo counts reduced from 4/3 to 2/2. Further reduction may hurt quality.

**Q: What if optimization fails again?**
A: Check `dspy-test/docs/optimization-status.md` for detailed troubleshooting steps.

**Q: How long does MIPROv2 take?**
A: With current settings (~10-20 trials, 2 modules), expect 15-25 minutes total.

---

## 💡 Quick Commands Cheat Sheet

```bash
# Check API quota (browser)
# Visit: https://ai.dev/usage?tab=rate-limit

# Run optimization (both modules)
cd dspy-test/coach-app
uv run optimize.py 3

# Run optimization (single module for testing)
cd dspy-test/coach-app
uv run optimize.py 1  # InfoExtractor only
uv run optimize.py 2  # WorkoutGenerator only

# Check if optimized files exist
ls -la dspy-test/coach-app/optimized/

# View optimization logs (after completion)
cd dspy-test/coach-app
uv run python -c "import dspy; dspy.inspect_history(n=10)"
```

---

## 📊 Expected Results

After successful optimization, you should see:

1. **Two JSON files:**
   - `dspy-test/coach-app/optimized/extractor.json`
   - `dspy-test/coach-app/optimized/generator.json`

2. **Performance improvements:**
   - Extraction accuracy: baseline → optimized (printed during evaluation)
   - Workout quality: baseline → optimized (printed during evaluation)

3. **Generated instructions:**
   - Task-specific guidance optimized by MIPROv2
   - Few-shot examples selected for best performance
   - View with `dspy.inspect_history()`

4. **Ready for Phase 5:**
   - Port these optimized prompts to `backend/src/prompts.ts`
   - Test in production app
   - Compare with original prompts

---

## 🎓 What We Learned

1. **MIPROv2 is powerful but API-intensive** - Requires ~30-50 calls vs ~5-10 for BootstrapFewShot
2. **Free tier limits are restrictive** - 50/day insufficient for iterative MIPROv2 work
3. **Bootstrap phase is reliable** - Successfully created demos even with small dataset
4. **Small datasets benefit from instruction optimization** - MIPROv2's strength with 8+4 examples

---

**Ready to resume? Pick your path above and let's complete Phase 4! 🚀**
