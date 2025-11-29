import { createFileRoute } from '@tanstack/react-router';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input';
import { Actions, Action } from '@/components/ai-elements/actions';
import { useState, Fragment } from 'react';
import { Response } from '@/components/ai-elements/response';
import { CopyIcon, RefreshCcwIcon } from 'lucide-react';
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolOutput,
} from '@/components/ai-elements/tool';
import { WorkoutComponent } from '@/components/workout-message';
import { Loader } from '@/components/ai-elements/loader';
import {
  sendChatMessage,
  type ConversationMessage,
  type WorkoutOutput,
  parseWorkoutFromResponse,
  isGenkitApiError,
} from '@/lib/genkit-api';

export const Route = createFileRoute('/genkit-chat')({
  component: RouteComponent,
});

/**
 * Status of the chat interface
 */
type ChatStatus = 'ready' | 'submitted' | 'streaming' | 'error';

/**
 * Represents a message in the UI
 */
interface UIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hasToolOutput?: boolean;
  toolName?: string;
  workoutData?: WorkoutOutput;
  timestamp: number;
}

function RouteComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationMessage[]
  >([]);
  const [status, setStatus] = useState<ChatStatus>('ready');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Sends a message to the Genkit server and handles the response
   */
  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) {
      return;
    }

    setStatus('submitted');
    setErrorMessage(null);

    // Add user message to UI
    const userMessage: UIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Call Genkit API
      const response = await sendChatMessage(messageText, conversationHistory);

      // Parse workout data if tool was called
      let workoutData: WorkoutOutput | null = null;
      if (response.hasToolOutput && response.toolName === 'generateWorkout') {
        workoutData = parseWorkoutFromResponse(response.text);
      }

      // Add assistant message to UI
      const assistantMessage: UIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.text,
        hasToolOutput: response.hasToolOutput,
        toolName: response.toolName,
        workoutData: workoutData || undefined,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Update conversation history for next request
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', content: messageText },
        { role: 'model', content: response.text },
      ]);

      setStatus('ready');
    } catch (error) {
      console.error('Failed to send message:', error);

      // Display user-friendly error message
      let errorText = 'Failed to send message. Please try again.';
      if (isGenkitApiError(error)) {
        errorText = error.message;
      }

      setErrorMessage(errorText);
      setStatus('error');

      // Remove the user message if request failed
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  /**
   * Handles form submission from PromptInput
   */
  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    handleSendMessage(input);
    setInput('');
  };

  /**
   * Regenerates the last assistant response
   */
  const handleRegenerate = async () => {
    if (messages.length < 2) {
      return;
    }

    // Find the last user message
    let lastUserMessageIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        lastUserMessageIndex = i;
        break;
      }
    }
    if (lastUserMessageIndex === -1) {
      return;
    }

    const lastUserMessage = messages[lastUserMessageIndex];

    // Remove all messages after and including the last user message
    setMessages((prev) => prev.slice(0, lastUserMessageIndex));

    // Rebuild conversation history up to that point
    const newHistory: ConversationMessage[] = [];
    for (let i = 0; i < lastUserMessageIndex; i += 2) {
      if (i + 1 < messages.length) {
        newHistory.push({
          role: 'user',
          content: messages[i].content,
        });
        newHistory.push({
          role: 'model',
          content: messages[i + 1].content,
        });
      }
    }
    setConversationHistory(newHistory);

    // Resend the last user message
    await handleSendMessage(lastUserMessage.content);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message, index) => (
              <Fragment key={message.id}>
                <Message from={message.role}>
                  <MessageContent>
                    <Response>{message.content}</Response>
                  </MessageContent>
                </Message>

                {/* Show workout tool output if available */}
                {message.role === 'assistant' &&
                  message.hasToolOutput &&
                  message.toolName === 'generateWorkout' &&
                  message.workoutData && (
                    <Tool defaultOpen={true}>
                      <ToolHeader
                        type="tool-generateWorkout"
                        state="output-available"
                      />
                      <ToolContent>
                        <ToolOutput
                          output={
                            <WorkoutComponent
                              content={JSON.stringify(message.workoutData)}
                            />
                          }
                        />
                      </ToolContent>
                    </Tool>
                  )}

                {/* Show actions for the last assistant message */}
                {message.role === 'assistant' &&
                  index === messages.length - 1 && (
                    <Actions className="mt-2">
                      <Action onClick={handleRegenerate} label="Retry">
                        <RefreshCcwIcon className="size-3" />
                      </Action>
                      <Action
                        onClick={() =>
                          navigator.clipboard.writeText(message.content)
                        }
                        label="Copy"
                      >
                        <CopyIcon className="size-3" />
                      </Action>
                    </Actions>
                  )}
              </Fragment>
            ))}

            {/* Show loading indicator */}
            {status === 'submitted' && <Loader />}

            {/* Show error message */}
            {status === 'error' && errorMessage && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <p className="font-medium">Error</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Ask me about workouts..."
            />
          </PromptInputBody>
          <PromptInputSubmit
            disabled={(!input.trim() && status === 'ready') || status === 'submitted'}
            status={status === 'submitted' ? 'submitted' : 'ready'}
          />
        </PromptInput>
      </div>
    </div>
  );
}
