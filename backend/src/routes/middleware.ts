import { createMiddleware } from 'hono/factory';
import {
  createGoogleGenerativeAI,
  type GoogleGenerativeAIProvider,
} from '@ai-sdk/google';

export type GoogleGenerativeAIContext = {
  google: GoogleGenerativeAIProvider;
};

export const googleGenerativeAIMiddleware =
  createMiddleware<{ Variables: GoogleGenerativeAIContext }>(async (c, next) => {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    c.set('google', google);
    await next();
  });
