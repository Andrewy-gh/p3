import { Wrapper } from '@/components/wrapper';
import { createFileRoute } from '@tanstack/react-router';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Message } from '@/components/message';
import { ChatInput } from '@/components/chat-input';
import { useState } from 'react';

export const Route = createFileRoute('/system-prompts')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/basics/system-prompts',
    }),
  });
  const [input, setInput] = useState(
    'Could you give me some financial advice?'
  );
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">01.7 - System prompts</h1>
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
