# API Quota Solution: Two-Day Sequential Optimization

**Created:** 2025-10-24
**Status:** ✅ Ready to Execute

---

## Quick Reference

### The Problem
Running `uv run optimize.py 3` (both modules) requires **~50-90 API calls**, exceeding Gemini's free tier limit of **50 requests/day**.

### The Solution
Split optimization across two days using existing command-line options.

---

## Execution Plan

### Day 1: Optimize InfoExtractor

```bash
cd dspy-test/coach-app
uv run optimize.py 1
```

**What happens:**
- Optimizes InfoExtractor module only
- Uses ~25-45 API calls (within 50/day limit) ✅
- Saves result to `optimized/extractor.json`
- Takes ~10-15 minutes

**MIPROv2 Steps:**
1. Bootstrap Phase: Creates few-shot examples
2. Instruction Proposal: Generates task-specific instructions
3. Bayesian Optimization: Finds optimal instruction + example combinations

---

### Day 2: Optimize WorkoutGenerator

```bash
cd dspy-test/coach-app
uv run optimize.py 2
```

**What happens:**
- Optimizes WorkoutGenerator module only
- Uses ~25-45 API calls (within 50/day limit) ✅
- Saves result to `optimized/generator.json`
- Takes ~10-15 minutes

**MIPROv2 Steps:**
1. Bootstrap Phase: Creates few-shot examples
2. Instruction Proposal: Generates task-specific instructions
3. Bayesian Optimization: Finds optimal instruction + example combinations

---

### Day 3: Evaluate Results (Optional)

```bash
cd dspy-test/coach-app
uv run optimize.py 4
```

**What happens:**
- Loads both optimized modules
- Evaluates performance improvements
- Minimal API usage (inference only, not optimization)
- Takes ~5-10 minutes

---

## Why This Works

### API Call Breakdown

| Module                | API Calls | Fits in 50/day? |
|-----------------------|-----------|-----------------|
| InfoExtractor alone   | ~25-45    | ✅ Yes          |
| WorkoutGenerator alone| ~25-45    | ✅ Yes          |
| Both together (option 3) | ~50-90 | ❌ No           |

### Advantages

✅ **No code changes needed** - Script already supports this at `optimize.py:217-279`
✅ **Full optimization quality** - No parameter compromises required
✅ **Clear success/failure** - Each module optimized independently
✅ **Zero risk** - Uses designed functionality, not workarounds

---

## Command Reference

```bash
# Check quota reset time
# Visit: https://aistudio.google.com/app/apikey

# Option 1: Optimize InfoExtractor only
uv run optimize.py 1

# Option 2: Optimize WorkoutGenerator only
uv run optimize.py 2

# Option 3: Optimize both modules (requires ~50-90 calls - exceeds free tier!)
uv run optimize.py 3

# Option 4: Evaluate existing optimized modules
uv run optimize.py 4
```

---

## Key Insights

### Root Cause
- Option "3" optimizes both modules sequentially in one run
- Each module requires ~25-45 API calls
- Total: ~50-90 calls → exceeds 50/day limit

### Why MIPROv2 is API-Intensive

**Per Module API Calls:**
1. **Bootstrap Phase** (~10-15 calls): Creates and tests few-shot examples
2. **Instruction Proposal** (~5-10 calls): Generates 3 instruction candidates
3. **Bayesian Optimization** (~10-20 calls): Tests combinations to find optimal config

**Total:** ~25-45 calls per module with `auto="light"` setting

### Current Configuration

From `optimize.py:51-56` and `optimize.py:103-108`:

```python
optimizer = dspy.MIPROv2(
    metric=extraction_accuracy,  # or workout_quality
    auto="light",                # ~10-20 trials, auto-configures minibatch
    max_bootstrapped_demos=2,    # Reduced from 4 to minimize API calls
    max_labeled_demos=2,         # Reduced from 4 to minimize API calls
)
```

This is already optimized for minimal API usage while maintaining quality.

---

## Timeline

| Day | Task | Duration | API Calls |
|-----|------|----------|-----------|
| 1 | Optimize InfoExtractor | 10-15 min | ~25-45 |
| 2 | Optimize WorkoutGenerator | 10-15 min | ~25-45 |
| 3 | Evaluate both modules | 5-10 min | ~5-10 |
| **Total** | **Complete optimization** | **~30 min** | **~55-100** |

Note: Total API calls exceed 50, but spread across multiple days fits within daily limits.

---

## Next Steps After Optimization

Once both modules are optimized:

1. **Review Generated Files:**
   ```bash
   cat optimized/extractor.json
   cat optimized/generator.json
   ```

2. **Inspect Optimization History:**
   ```python
   dspy.inspect_history(n=5)
   ```

3. **Compare Performance:**
   - Check evaluation scores from option 4
   - Document improvement metrics
   - Note which instructions/examples worked best

4. **Proceed to Phase 5:**
   - Extract MIPROv2-generated instructions
   - Port optimized prompts to AI SDK
   - Integrate into production application

---

## Alternative Options (If Needed)

### Option A: Upgrade to Paid Tier
- **Cost:** ~$0.50-2.00 for full optimization run
- **Benefit:** Run both modules same day with `uv run optimize.py 3`
- **Link:** https://ai.google.dev/pricing

### Option B: Use Alternative Model Provider
- Configure OpenAI/Claude/local model in `optimize.py`
- Separate quota limits
- May require minor code adjustments

### Option C: Manual Prompt Engineering
- Skip MIPROv2 optimization entirely
- Manually craft prompts based on training data
- Faster but less systematic

---

## Troubleshooting

### "Still hitting quota limits"
- Ensure you're running only option 1 or 2, not option 3
- Check quota reset time: https://aistudio.google.com/app/apikey
- Verify no other processes using the same API key

### "Optimization fails mid-run"
- Check per-minute rate limit (10 requests/minute)
- Script should handle retries automatically
- If persistent, reduce `auto="light"` trials further

### "Want to see progress during optimization"
- MIPROv2 prints step-by-step progress
- Monitor console output for:
  - "STEP 1: BOOTSTRAP FEWSHOT EXAMPLES"
  - "STEP 2: PROPOSE INSTRUCTION CANDIDATES"
  - "STEP 3: BAYESIAN OPTIMIZATION"

---

## Files Modified

✅ `dspy-test/docs/optimization-status.md` - Updated with solution details
✅ `dspy-test/docs/api-quota-solution.md` - This reference guide (new)

**No changes needed to:**
- `dspy-test/coach-app/optimize.py` - Already supports sequential optimization
- Training data, modules, or metrics - All ready to use

---

## Summary

**The fix is simple:** Use options 1 and 2 on separate days instead of option 3.

**Why it works:** Each module fits comfortably within the 50 requests/day free tier limit.

**No compromises:** Full MIPROv2 optimization quality maintained.

**Time cost:** Wait one extra day between optimizations.
