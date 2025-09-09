# This is a file for scaffolding project files

## Backend directory

**Endpoint:** naive-agents

- Check if this file exists in `backend/src/routes`

- **IF** it does not exist, create it

- Check `backend/src/index.ts` for the `apiRoutes` structure and how to add a new endpoint. If the endpoint name is kebab case, the route declaration should be camel case.

**Route Name:** tool-calling

**Request Method:** POST

- Add a new route handler that accepts a request method of the one specified above.

**Example route handler file name**: `./chat.md`

- Take a look at the markdown file specified above and use it as a template. Adapt it to the route handler we just created. Use `backend/src/routes/basics.ts` as a reference.

- Be sure to add the `googleGenerativeAIMiddleware` to the route handler.

- Don't forget to add the try catch block and console.logs at the end of the message length and token usage.

**Special case**

- Create a file called `file-system.functionality.ts` in `backend/src/`

- Copy the contents of `file-system-functionality.md` into the file we just created.

- Make sure the imports are correct for the route handler we just created.

## Frontend directory

- Create a file in with the below name in `frontend/src/routes`

**File name:** naive-agents.tsx

- These are the components that will be used:

- Create file-input.tsx inside `frontend/src/components`
- Remove any kind of background styles. `bg-gray-800` should be removed.
```tsx
export const FileInput = ({
  input,
  onChange,
  onSubmit,
  disabled,
}: {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
}) => (
  <form onSubmit={onSubmit}>
    <input
      className={`fixed bottom-0 w-full max-w-md p-2 mb-8 border-2 border-zinc-700 rounded shadow-xl bg-gray-800 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      value={input}
      placeholder={
        disabled
          ? 'Please handle tool calls first...'
          : 'Say something...'
      }
      onChange={onChange}
      disabled={disabled}
      autoFocus
    />
  </form>
);
```
- This is a template of which we are using:

```tsx
import { useChat } from '@ai-sdk/react';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ToolInput, Message, Wrapper } from './components.tsx';
import './tailwind.css';

const App = () => {
  const { messages, sendMessage } = useChat({});

  const [input, setInput] = useState(
    'Tell me what todo items I have today.',
  );

  return (
    <Wrapper>
      {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role}
          parts={message.parts}
        />
      ))}
      <ToolInput
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
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

- Your job is to adapt this template to work with the `naive-agents.tsx` file. Reference `stream-text-to-ui.tsx` on how it is structured in our codebase.

- Use this as the header text

**Header Text**: 02.1 - Tool Calling

- Check if this DropdownMenu Trigger exists in `__root.tsx`

**Trigger Name**: 02 - Naive Agents

- **IF** it does not exist, create it
- **ELSE** update with this next `DropdownMenuItem`:

**DropdownMenuItem Name**: 02.1 - Naive Agents

- Reference **__root.tsx** for the `DropdownMenuItem` structure
- Use the url for the route we just created.

