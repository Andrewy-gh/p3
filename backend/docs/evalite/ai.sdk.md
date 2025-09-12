[Skip to content](https://www.evalite.dev/examples/ai-sdk#_top)
[ Evalite  ](https://www.evalite.dev/)
Search ` `Ctrl``K` `
Cancel 
Select theme DarkLightAuto
# AI SDK
Vercel’s is a great way to get started with AI in your apps.
It abstracts away the differences between different AI providers, so you can **switch between them easily**.
## Tracing
You can use the `traceAISDKModel` function to trace the calls to the AI SDK:
my-eval.eval.ts```

import { openai } from"@ai-sdk/openai";
import { streamText } from"ai";
import { Factuality, Levenshtein } from"autoevals";
import { evalite } from"evalite";
import { traceAISDKModel } from"evalite/ai-sdk";
evalite("Test Capitals", {
data: async()=> [
{
input: `What's the capital of France?`,
expected: `Paris`,
},
{
input: `What's the capital of Germany?`,
expected: `Berlin`,
},
],
task: async(input)=> {
const result = streamText({
model: traceAISDKModel(openai("gpt-4o-mini")),
system: `
Answer the question concisely. Answer in as few words as possible.
Remove full stops from the end of the output.
If the country has no capital, return '<country> has no capital'.
If the country does not exist, return 'Unknown'.
`,
prompt: input,
});
returnawait result.text;
},
scorers: [Factuality, Levenshtein],
});

```

## Testing Whole Conversations
You can also pass messages to the `input` property of the eval. To get autocomplete, you can pass the `CoreMessage` type to the `evalite` function as a type argument.
The three type parameters for `evalite` are:
  * The type of the input
  * The type of the output
  * The type of the expected output (optional)


my-eval.eval.ts```

import { openai } from"@ai-sdk/openai";
import { streamText, type CoreMessage } from"ai";
import { Levenshtein } from"autoevals";
import { evalite } from"evalite";
import { traceAISDKModel } from"evalite/ai-sdk";
evalite<CoreMessage[], string, string>("Test Capitals", {
data: async()=> [
{
input: [
{
content: `What's the capital of France?`,
role: "user",
},
],
expected: `Paris`,
},
],
task: async(input)=> {
const result = streamText({
model: traceAISDKModel(openai("gpt-4o-mini")),
system: `
Answer the question concisely. Answer in as few words as possible.
Remove full stops from the end of the output.
If the country has no capital, return '<country> has no capital'.
If the country does not exist, return 'Unknown'.
`,
messages: input,
});
returnawait result.text;
},
scorers: [Levenshtein],
});

```

