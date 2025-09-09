import { Hono } from 'hono';
import { googleGenerativeAIMiddleware } from './middleware';
import type { GoogleGenerativeAIContext } from './middleware';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type ModelMessage,
  type UIMessage,
//   Output,
} from 'ai';
// import { z } from 'zod';
import { workoutTools } from '../tools';

export const playgroundRoute = new Hono<{
  Variables: GoogleGenerativeAIContext;
}>().post('/', googleGenerativeAIMiddleware, async (c) => {
  const SYSTEM_PROMPT = `
    You are a fitness assistant named Pete. Offer a tailor made workout plan if the user accepts. 
    Otherwise asks questions to understand the user's needs. 
    Do not answer any questions that are not related to the user's fitness needs.

    You have access to the following tools:
    - generateWorkout
    `;
  try {
    const model = c.var.google('gemini-2.0-flash');
    const body = await c.req.json();
    const messages: Array<UIMessage> = body.messages;
    const modelMessages: Array<ModelMessage> = convertToModelMessages(messages);

    const streamTextResult = streamText({
      model,
      messages: modelMessages,
      system: SYSTEM_PROMPT,
      tools: workoutTools,
      stopWhen: [stepCountIs(10)],
    });

    const stream = streamTextResult.toUIMessageStream();

    return createUIMessageStreamResponse({
      stream,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Playground route - system prompts error');
  }
});
