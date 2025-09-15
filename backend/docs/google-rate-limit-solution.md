  "You exceeded your current quota, please check your plan and billing details. For more information on this error,
  head to: https://ai.google.dev/gemini-api/docs/rate-limits."

  This is happening for "Adversarial Prompt Resistance" tests, and it's failing after 3 attempts each time.

  Looking at the rate-limits.md file, I can see the rate limits for different tiers and models. The user is currently
  using gemini-2.0-flash model (I can see this from the workout.eval.ts file: model: google('gemini-2.0-flash')).

  From the rate limits table:

  For Free Tier:
  - Gemini 2.0 Flash: 15 RPM, 1,000,000 TPM, 200 RPD

  For Tier 1 (with billing enabled):
  - Gemini 2.0 Flash: 2,000 RPM, 4,000,000 TPM, * RPD

  The key issue here is likely the RPD (Requests Per Day) limit of 200 for the free tier. Since the user has added
  more test cases (originally there were 8 test cases, now there are 15), and if they ran the eval multiple times or
  if there are retries, they could easily hit the 200 requests per day limit.

  The user is asking:
  1. Should they change to a lesser model?
  2. Should they wait to run the evals?
  3. When do the rates refresh?

  From the documentation: "Requests per day (RPD) quotas reset at midnight Pacific time."

  Options:
  1. Switch to a model with higher free tier limits
  2. Wait until midnight Pacific time for the quota to reset
  3. Enable billing to upgrade to Tier 1

  Looking at the free tier limits, let me compare models:

  I notice the Gemini 2.5 Flash-Lite offers a significantly improved daily request capacity. With 1,000 RPD compared
  to the current model's 200 RPD, this alternative provides more flexibility for running extensive test cases. The
  higher daily limit could prevent quota exhaustion during evaluation processes.

● Looking at the errors and rate limits, you've hit the daily quota limit for Gemini 2.0 Flash on the free tier (200
   requests per day). With 15 test cases now, plus any retries, you've likely exceeded this.

  Here are your options:

  1. Switch to Gemini 2.5 Flash-Lite - It has a much higher daily limit (1,000 RPD vs 200 RPD) on the free tier
  2. Wait until midnight Pacific time - Daily quotas reset then
  3. Enable billing - Tier 1 removes most daily limits

  I'd recommend switching to gemini-2.5-flash-lite since it has 5x higher daily limits and should handle your eval
  workload better. Want me to update the model in the eval file?