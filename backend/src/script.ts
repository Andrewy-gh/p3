import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, streamText, Output } from 'ai';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const model = google('gemini-2.0-flash');

console.dir(model, { depth: null });

// 01.3 - generating text
// const prompt = 'What is the capital of France?';

// const result = await generateText({
//   model,
//   prompt,
// });

// console.log(result.text);

// 01.4 - streaming text to terminal
// const stream = streamText({
//   model,
//   prompt: 'Give me the first paragraph of a story about an imaginary planet.',
// });

// for await (const chunk of stream.textStream) {
//   process.stdout.write(chunk);
// }

// 01.5 - ui message streams
// const stream = streamText({
//   model,
//   prompt: 'Give me a sonnet about a cat called Steven.',
// });

// for await (const chunk of stream.toUIMessageStream()) {
//   console.log(chunk);
// }

// experimental output example
// https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data#structured-output-with-generatetext
const { experimental_output } = await generateText({
  model,
  experimental_output: Output.object({
    schema: z.object({
      name: z.string(),
      age: z.number().nullable().describe('Age of the person.'),
      contact: z.object({
        type: z.literal('email'),
        value: z.string(),
      }),
      occupation: z.object({
        type: z.literal('employed'),
        company: z.string(),
        position: z.string(),
      }),
    }),
  }),
  prompt: 'Generate an example person for testing.',
});

console.log(experimental_output);
