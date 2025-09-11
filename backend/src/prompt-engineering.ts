import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, streamText, Output } from 'ai';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const model = google('gemini-2.0-flash-lite');

const INPUT = `Do some research on who is the greatest player of all time in NBA History.`;

const result = await streamText({
  model,
  prompt: `
    <task-context>
    You are a helpful assistant that can generate titles for conversations.
    </task-context>

    <conversation-history>
    ${INPUT}
    </conversation-history>
    
    <rules>
    Give me exactly 5 suggested titles.
    Titles should be at most 30 characters.
    Titles should be formatted in sentence case, with capital letters at the start of each word. Do not provide a period at the end.
    </rules>

    <the-ask>
    Generate a title for the conversation.
    </the-ask>

    <output-format>
    Return only the title.
    </output-format>
  `,
});

for await (const chunk of result.textStream) {
  console.log(chunk);
}
