import { createFileRoute } from '@tanstack/react-router';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Wrapper } from '@/components/wrapper';
import { Message } from '@/components/message';
import { ChatInput } from '@/components/chat-input';
import { DefaultChatTransport } from 'ai';

export const Route = createFileRoute('/stream-text-to-ui')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/basics/stream-text-to-ui',
    }),
  });

  const [input, setInput] = useState(`What's the capital of France?`);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">01.6 - Streaming text to UI</h1>
      <Wrapper>
        {messages.map((message) => (
          <Message key={message.id} role={message.role} parts={message.parts} />
        ))}
        <ChatInput
          input={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({
              text: input,
            });
            setInput('');
          }}
        />
      </Wrapper>
    </div>
  );
}
