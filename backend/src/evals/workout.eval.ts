import { generateText } from 'ai';
import { evalite } from 'evalite';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { CHAT_AGENT_PROMPT } from '../prompts.js';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

evalite('Name', {
  data: () => [
    {
      input: 'Hello, what is your name',
      expected: 'Nova',
    },
  ],
  task: async (input) => {
    const capitalResult = await generateText({
      model: google('gemini-2.0-flash'),
      system: CHAT_AGENT_PROMPT,
      prompt: input,
    });

    return capitalResult.text;
  },
  scorers: [
    {
      name: 'includes',
      scorer: ({ input, output, expected }) => {
        return output.includes(expected!) ? 1 : 0;
      },
    },
  ],
});
