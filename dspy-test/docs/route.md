```ts
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
```