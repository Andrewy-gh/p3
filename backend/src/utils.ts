import type {
  AssistantContent,
  AssistantModelMessage,
  ModelMessage,
  TextPart,
  UserModelMessage,
} from 'ai';

function isTextPart(p: any): p is TextPart {
  return (
    typeof p === 'object' &&
    p !== null &&
    p.type === 'text' &&
    typeof p.text === 'string'
  );
}

function hasArrayContent(
  m: ModelMessage
): m is Extract<ModelMessage, { content: any[] }> {
  return Array.isArray((m as any).content);
}

function hasStringContent(
  m: ModelMessage
): m is Extract<ModelMessage, { content: string }> {
  return typeof (m as any).content === 'string';
}

function isUserMessage(m: ModelMessage): m is UserModelMessage {
  return m.role === 'user';
}

// Convert a single message to plain text
function messageToText(m: ModelMessage): string {
  if (hasStringContent(m)) {
    return m.content.trim();
  }
  if (hasArrayContent(m)) {
    // Use reduce to avoid type narrowing issues with filter/map chain
    return m.content
      .reduce<string>((acc, p: any) => {
        if (isTextPart(p)) {
          return acc + (p as TextPart).text;
        }
        return acc;
      }, '')
      .trim();
  }
  return '';
}

// Escape XML-sensitive characters
function escapeXml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Convert messages to XML-tagged history string
export function toXmlHistory(messages: ModelMessage[]): string {
  const lines: string[] = [];
  for (const m of messages) {
    const text = messageToText(m);
    if (!text) continue;
    // Skip tool messages in history (adjust as needed)
    if (m.role === 'tool') continue;
    lines.push(`<msg role="${m.role}">${escapeXml(text)}</msg>`);
  }
  return lines.join('\n');
}

// Convert messages to flat role-prefixed history string
export function toFlatHistory(
  messages: ModelMessage[],
  sep = '\n---\n'
): string {
  const parts: string[] = [];
  for (const m of messages) {
    const text = messageToText(m);
    if (!text) continue;
    if (m.role === 'tool') continue;
    parts.push(`${m.role}: ${text}`);
  }
  return parts.join(sep);
}

// Get the last user question (last user message with text content)
export function getLastUserQuestion(messages: ModelMessage[]): string {
  // Use findLast if available, fallback to reverse loop
  const findFromEnd =
    (messages as any).findLast?.bind(messages) ??
    ((pred: (m: ModelMessage) => boolean) => {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (pred(messages[i]!)) return messages[i]!;
      }
      return undefined;
    });

  const lastUser = findFromEnd(
    (m: ModelMessage) => isUserMessage(m) && !!messageToText(m)
  );
  return lastUser ? messageToText(lastUser).trim() : '';
}

// Main function to process conversation for your prompt
export function processConversation(modelMessages: ModelMessage[]) {
  return {
    // Use either XML or flat format based on your preference
    conversationHistory: toXmlHistory(modelMessages), // or toFlatHistory(modelMessages)
    latestQuestion: getLastUserQuestion(modelMessages),
  };
}