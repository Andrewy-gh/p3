import { Hono } from 'hono';
import { googleGenerativeAIMiddleware } from './middleware';
import type { GoogleGenerativeAIContext } from './middleware';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
  type UIMessage,
} from 'ai';

export const basicsRoute = new Hono<{
  Variables: GoogleGenerativeAIContext;
}>().post('/stream-text-to-ui', googleGenerativeAIMiddleware, async (c) => {
  try {
    const model = c.var.google('gemini-2.0-flash');
    const body = await c.req.json();
    const messages: Array<UIMessage> = body.messages;
    const modelMessages: Array<ModelMessage> = convertToModelMessages(messages);

    const streamTextResult = streamText({
      model,
      messages: modelMessages,
    });

    streamTextResult.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    const stream = streamTextResult.toUIMessageStream();

    return createUIMessageStreamResponse({
      stream,
    });
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Basics route - stream text to ui error' }, 500);
  }
});
