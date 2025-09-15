import { Hono } from 'hono';
import { rateLimiter } from 'hono-rate-limiter';
import { googleGenerativeAIMiddleware } from './middleware.js';
import type { GoogleGenerativeAIContext } from './middleware.js';
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
import { workoutTools } from '../tools.js';
import { CHAT_AGENT_PROMPT, WORKOUT_GENERATION_PROMPT } from '../prompts.js';

export const playgroundRoute = new Hono<{
  Variables: GoogleGenerativeAIContext;
}>()
  .post('/', googleGenerativeAIMiddleware, async (c) => {
    const PROMPT = `
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
      const modelMessages: Array<ModelMessage> =
        convertToModelMessages(messages);
      const streamTextResult = streamText({
        model,
        messages: modelMessages,
        system: CHAT_AGENT_PROMPT,
        tools: workoutTools,
        // stopWhen: [stepCountIs(10)],
      });

      const stream = streamTextResult.toUIMessageStream();

      return createUIMessageStreamResponse({
        stream,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Playground route - system prompts error');
    }
  })
  .post('/v2',
    rateLimiter({
      windowMs: 60 * 1000, // 1 minute window
      limit: 10, // Allow 10 requests per minute (lower than Google's 15 RPM limit)
      keyGenerator: (c) => {
        // Use IP address for rate limiting, fallback to a default key
        return c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'default-client';
      },
    }),
    googleGenerativeAIMiddleware,
    async (c) => {
    try {
      const model = c.var.google('gemini-2.0-flash');
      const body = await c.req.json();
      const messages: Array<UIMessage> = body.messages;
      const modelMessages: Array<ModelMessage> =
        convertToModelMessages(messages);
      const streamTextResult = streamText({
        model,
        messages: modelMessages,
        system: CHAT_AGENT_PROMPT,
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
