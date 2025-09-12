import { createFileRoute } from '@tanstack/react-router';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Wrapper } from '@/components/wrapper';
import { ChatInput } from '@/components/chat-input';
import { DefaultChatTransport } from 'ai';
import type { WorkoutUIMessage } from '@backend/tools';
import ReactMarkdown from 'react-markdown';
import { WorkoutComponent } from '@/components/workout-message';

export const Route = createFileRoute('/playground')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages, sendMessage } = useChat<WorkoutUIMessage>({
    transport: new DefaultChatTransport({
      api: '/api/playground/v2',
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
            <div key={index} className="my-4">
              <div className="bg-blue-900/20 border border-blue-700 rounded p-3 text-sm mb-4">
                <div className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Workout Generated
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-blue-300">Fitness Level:</span>{' '}
                    <span className="font-medium">{part.input?.fitnessLevel || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Goals:</span>{' '}
                    <span className="font-medium">{part.input?.fitnessGoal || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Equipment:</span>{' '}
                    <span className="font-medium">{part.input?.equipment || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Duration:</span>{' '}
                    <span className="font-medium">{part.input?.sessionDuration ? `${part.input.sessionDuration} min` : 'Unknown'}</span>
                  </div>
                </div>
              </div>
              <WorkoutComponent content={JSON.stringify(part.output)} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
