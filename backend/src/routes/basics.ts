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
}>()
  .post('/stream-text-to-ui', googleGenerativeAIMiddleware, async (c) => {
    // MARK: 01.6 - streaming text to ui
    try {
      const model = c.var.google('gemini-2.0-flash');
      const body = await c.req.json();
      const messages: Array<UIMessage> = body.messages;
      const modelMessages: Array<ModelMessage> =
        convertToModelMessages(messages);

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
      throw new Error('Basics route - stream text to ui error');
    }
  })
  .post('system-prompts', googleGenerativeAIMiddleware, async (c) => {
    // MARK: 01.7 - system prompts
    const SYSTEM_PROMPT = `
    ALWAYS reply in Pirate language.

    ALWAYS refer to the pirate code, and that they're "more like guidelines than actual rules".

    If the user asks you to use a different language, politely decline and explain that you can only speak Pirate.
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
        system: SYSTEM_PROMPT,
      });

      const stream = streamTextResult.toUIMessageStream();

      return createUIMessageStreamResponse({
        stream,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Basics route - system prompts error');
    }
  });
