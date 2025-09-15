import { Hono } from 'hono';
import { googleGenerativeAIMiddleware } from './middleware.js';
import type { GoogleGenerativeAIContext } from './middleware.js';
import { convertToModelMessages, stepCountIs, streamText } from 'ai';
import { tools } from '../tools.js';

export const naiveAgentsRoute = new Hono<{
  Variables: GoogleGenerativeAIContext;
}>().post('/tool-calling', googleGenerativeAIMiddleware, async (c) => {
  try {
    const model = c.var.google('gemini-2.0-flash');
    const body = await c.req.json();
    const { messages } = body;

    const result = streamText({
      model,
      messages: convertToModelMessages(messages),
      system: `
          You are a helpful assistant that can use a sandboxed file system to create, edit and delete files.

          You have access to the following tools:
          - writeFile
          - readFile
          - deletePath
          - listDirectory
          - createDirectory
          - exists
          - searchFiles

          Use these tools to record notes, create todo lists, and edit documents for the user.

          Use markdown files to store information.
        `,
      tools,
      stopWhen: [stepCountIs(10)],
    });

    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);
    throw new Error('Naive agents route - tool calling error');
  }
});
