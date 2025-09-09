import { createFileRoute } from '@tanstack/react-router';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Wrapper } from '@/components/wrapper';
import { ChatInput } from '@/components/chat-input';
import { DefaultChatTransport } from 'ai';
import type { WorkoutUIMessage } from '@backend/tools';
import ReactMarkdown from 'react-markdown';

export const Route = createFileRoute('/playground')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages, sendMessage } = useChat<WorkoutUIMessage>({
    transport: new DefaultChatTransport({
      api: '/api/playground',
    }),
  });

  const [input, setInput] = useState(`Hello, what is your name?`);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Playground</h1>
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

export const Message = ({
  role,
  parts,
}: {
  role: string;
  parts: WorkoutUIMessage['parts'];
}) => {
  const prefix = role === 'user' ? 'User: ' : 'AI: ';

  const text = parts
    .map((part) => {
      if (part.type === 'text') {
        return part.text;
      }
      return '';
    })
    .join('');
  return (
    <div className="flex flex-col gap-2">
      <div className="prose prose-invert my-6">
        <ReactMarkdown>{prefix + text}</ReactMarkdown>
      </div>
      {parts.map((part, index) => {
        if (part.type === 'tool-generateWorkout' && part.state === 'output-available') {
          return (
            <div
              key={index}
              className="bg-blue-900/20 border border-blue-700 rounded p-3 text-sm"
            >
              <div className="font-semibold mb-1">🏋️ Generated workout</div>
              <div>Age: {part.input?.age || 'Unknown'}</div>
              <div>Gender: {part.input?.gender || 'Unknown'}</div>
              <div>Fitness level: {part.input?.fitnessLevel || 'Unknown'}</div>
              <div>Goals: {part.input?.goals || 'Unknown'}</div>
              <div>Output:{JSON.stringify(part.output)}</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
