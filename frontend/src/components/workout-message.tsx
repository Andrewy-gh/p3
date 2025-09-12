import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import ReactMarkdown from 'react-markdown';
import { useState, useMemo } from 'react';

// Custom components for different content types
const SummaryComponent = ({ content }: { content: string }) => (
  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 my-4">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
      <span className="text-blue-300 font-medium text-sm uppercase tracking-wide">
        Summary
      </span>
    </div>
    <p className="text-gray-200">{content.trim()}</p>
  </div>
);

export const WorkoutComponent = ({ content }: { content: string }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  try {
    const workout = JSON.parse(content.trim());

    return (
      <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 my-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-300 font-medium text-sm uppercase tracking-wide">
              🏋️ Your Workout Plan
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-green-300 hover:text-green-200 text-sm px-2 py-1 rounded border border-green-700 hover:border-green-600 transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>

        <div className="text-gray-200">
          {workout.workoutFocus && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 font-medium">Focus:</span>
              <span className="bg-green-800/50 px-2 py-1 rounded text-sm font-medium">
                {workout.workoutFocus}
              </span>
            </div>
          )}

          {isExpanded && (
            <div className="space-y-4">
              <div className="grid gap-4">
                {workout.exercises.map((exercise: any, idx: number) => {
                  const warmupSets = exercise.sets.filter((set: any) => set.setType === 'warmup');
                  const workingSets = exercise.sets.filter((set: any) => set.setType === 'working');
                  
                  return (
                    <div key={idx} className="bg-black/20 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-green-200 mb-3 text-lg">
                        {idx + 1}. {exercise.name}
                      </h4>
                      
                      {warmupSets.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-orange-300 font-medium text-sm mb-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                            Warmup Sets
                          </h5>
                          <div className="flex gap-2 flex-wrap">
                            {warmupSets.map((set: any, setIdx: number) => (
                              <div
                                key={setIdx}
                                className="bg-orange-800/30 border border-orange-700 px-3 py-2 rounded text-sm flex items-center gap-2"
                              >
                                <span className="font-mono">{set.reps} reps</span>
                                {set.weight && (
                                  <span className="text-orange-300">@ {set.weight} lbs</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {workingSets.length > 0 && (
                        <div>
                          <h5 className="text-green-300 font-medium text-sm mb-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                            Working Sets
                          </h5>
                          <div className="flex gap-2 flex-wrap">
                            {workingSets.map((set: any, setIdx: number) => (
                              <div
                                key={setIdx}
                                className="bg-green-800/40 border border-green-600 px-3 py-2 rounded text-sm flex items-center gap-2 font-medium"
                              >
                                <span className="font-mono">{set.reps} reps</span>
                                {set.weight && (
                                  <span className="text-green-300">@ {set.weight} lbs</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {workout.notes && (
                <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                  <h5 className="text-blue-300 font-medium text-sm mb-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Coach Notes
                  </h5>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {workout.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-4 text-xs text-gray-400 pt-2 border-t border-gray-700">
                <span>Total Exercises: {workout.exercises.length}</span>
                <span>
                  Total Sets: {workout.exercises.reduce((acc: number, ex: any) => acc + ex.sets.length, 0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch {
    return (
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 my-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <span className="text-red-300 font-medium text-sm">
            ⚠️ Workout Data (Raw)
          </span>
        </div>
        <pre className="text-gray-300 text-sm overflow-x-auto bg-black/20 p-2 rounded">{content}</pre>
      </div>
    );
  }
};

// Streaming-safe parser that handles incomplete tags gracefully
const parseStreamingContent = (text: string) => {
  const parts: Array<{
    type: 'text' | 'summary' | 'workout' | 'streaming_tag';
    content: string;
    tagType?: string;
  }> = [];

  // Pattern for complete tags
  const completeTagPattern = /<(summary|workout)>([\s\S]*?)<\/\1>/g;

  let lastIndex = 0;
  let match;

  // Find all complete tags
  const completeMatches = [];
  while ((match = completeTagPattern.exec(text)) !== null) {
    completeMatches.push({
      fullMatch: match[0],
      tagType: match[1],
      content: match[2],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  // Reset regex
  completeTagPattern.lastIndex = 0;

  for (const completeMatch of completeMatches) {
    // Add text before this complete tag
    if (completeMatch.start > lastIndex) {
      const beforeText = text.slice(lastIndex, completeMatch.start);
      if (beforeText.trim()) {
        // Check if this text contains an incomplete opening tag
        const incompleteStart = beforeText.lastIndexOf('<');
        if (incompleteStart !== -1) {
          const beforeIncomplete = beforeText.slice(0, incompleteStart);
          const potentialTag = beforeText.slice(incompleteStart);

          if (beforeIncomplete.trim()) {
            parts.push({ type: 'text', content: beforeIncomplete });
          }

          // Only show incomplete tag if it looks like it could be a valid tag
          if (
            potentialTag.match(/^<(summary|workout)/) &&
            !potentialTag.includes('>')
          ) {
            parts.push({
              type: 'streaming_tag',
              content: potentialTag,
              tagType: potentialTag.match(/<(summary|workout)/)?.[1],
            });
          } else {
            parts.push({ type: 'text', content: potentialTag });
          }
        } else {
          parts.push({ type: 'text', content: beforeText });
        }
      }
    }

    // Add the complete tag
    parts.push({
      type: completeMatch.tagType as 'summary' | 'workout',
      content: completeMatch.content,
    });

    lastIndex = completeMatch.end;
  }

  // Handle remaining text after the last complete tag
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);

    // Check for incomplete tags at the end
    const incompleteStart = remainingText.lastIndexOf('<');
    if (incompleteStart !== -1) {
      const beforeIncomplete = remainingText.slice(0, incompleteStart);
      const potentialTag = remainingText.slice(incompleteStart);

      if (beforeIncomplete.trim()) {
        parts.push({ type: 'text', content: beforeIncomplete });
      }

      // Check if this looks like the start of a tag we care about
      if (potentialTag.match(/^<(summary|workout)/)) {
        parts.push({
          type: 'streaming_tag',
          content: potentialTag,
          tagType: potentialTag.match(/<(summary|workout)/)?.[1],
        });
      } else {
        parts.push({ type: 'text', content: potentialTag });
      }
    } else if (remainingText.trim()) {
      parts.push({ type: 'text', content: remainingText });
    }
  }

  // If no parts were found, return the entire text
  if (parts.length === 0 && text.trim()) {
    parts.push({ type: 'text', content: text });
  }

  return parts;
};

const StreamingTagPlaceholder = ({
  tagType,
  content,
}: {
  tagType?: string;
  content: string;
}) => {
  const bgColor =
    tagType === 'summary'
      ? 'bg-blue-900/20'
      : tagType === 'workout'
        ? 'bg-green-900/20'
        : 'bg-gray-900/20';
  const borderColor =
    tagType === 'summary'
      ? 'border-blue-700/50'
      : tagType === 'workout'
        ? 'border-green-700/50'
        : 'border-gray-700/50';
  const textColor =
    tagType === 'summary'
      ? 'text-blue-300'
      : tagType === 'workout'
        ? 'text-green-300'
        : 'text-gray-300';

  return (
    <div
      className={`${bgColor} border ${borderColor} rounded-lg p-4 my-4 animate-pulse`}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span
          className={`${textColor} font-medium text-sm uppercase tracking-wide`}
        >
          {tagType ? `Loading ${tagType}...` : 'Loading...'}
        </span>
      </div>
      <div className="mt-2 text-gray-400 font-mono text-xs">{content}</div>
    </div>
  );
};

export const Message = ({
  role,
  parts,
}: {
  role: string;
  parts: UIMessagePart<UIDataTypes, UITools>[];
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

  const parsedParts = useMemo(() => parseStreamingContent(text), [text]);

  return (
    <div className="my-6">
      {parsedParts.map((part, index) => {
        switch (part.type) {
          case 'summary':
            return <SummaryComponent key={index} content={part.content} />;
          case 'workout':
            return <WorkoutComponent key={index} content={part.content} />;
          case 'streaming_tag':
            return (
              <StreamingTagPlaceholder
                key={index}
                tagType={part.tagType}
                content={part.content}
              />
            );
          case 'text':
            return (
              <div key={index} className="prose prose-invert">
                <ReactMarkdown>
                  {index === 0 && part.content
                    ? prefix + part.content
                    : part.content}
                </ReactMarkdown>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
