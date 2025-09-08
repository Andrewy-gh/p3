import { createFileRoute } from '@tanstack/react-router';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { FileInput } from '@/components/file-input';
import { Wrapper } from '@/components/wrapper';
import { Message } from '@/components/message';
import { fileToDataURL } from '@/lib/utils';

export const Route = createFileRoute('/passing-imags-and-files')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/basics/stream-text-to-ui', // No need to create a new route for this
    }),
  });

  const [input, setInput] = useState('Could you describe this image?');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  return (
    <div>
      {' '}
      <Wrapper>
        {messages.map((message) => (
          <Message key={message.id} role={message.role} parts={message.parts} />
        ))}
        <FileInput
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onFileSelect={(file) => setSelectedFile(file)}
          selectedFile={selectedFile}
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target as HTMLFormElement);
            const file = formData.get('file') as File;
            sendMessage({
              parts: [
                { type: 'text', text: input },
                {
                  type: 'file',
                  mediaType: file.type,
                  url: await fileToDataURL(file),
                },
              ],
            });
            setInput('');
            setSelectedFile(null);
          }}
        />
      </Wrapper>
    </div>
  );
}
