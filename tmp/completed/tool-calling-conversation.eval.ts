import { generateText, type CoreMessage } from 'ai';
import { evalite } from 'evalite';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { CHAT_AGENT_PROMPT } from '../../prompts.js';
import { workoutTools } from '../../tools.js';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Type for conversation flow test data
type ConversationTestData = {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  expected: string;
  description: string;
};

// Type for task output
type TaskOutput = {
  text: string;
  toolCalls: string[];
  lastUserMessage?: string;
};

/**
 * Tool Calling - Conversation Flow Tests
 *
 * Tests 5-8: Ensures the AI agent handles conversation flow properly and modifications
 */
evalite<ConversationTestData, TaskOutput, string>('Tool Calling - Conversation Flow', {
  data: () => [
    {
      input: {
        messages: [
          { role: 'user' as const, content: 'I want to work on my arms.' },
          { role: 'assistant' as const, content: 'Great! To design the perfect arm workout, I need a few details:\n- What equipment do you have?\n- How much time do you have?\n- What\'s your experience level?' },
          { role: 'user' as const, content: 'Dumbbells, 30 minutes, intermediate' },
          { role: 'assistant' as const, content: 'Perfect! Two more quick questions:\n- What\'s your primary goal - strength, size, or endurance?\n- Any injuries I should know about?' },
          { role: 'user' as const, content: 'Size, no injuries' },
        ],
        expected: 'calls_tool_after_info_complete',
        description: 'Should call tool after gathering all info across conversation',
      },
      expected: 'calls_tool_after_info_complete',
    },
    {
      input: {
        messages: [
          { role: 'user' as const, content: 'The workout looks good but can I swap incline press for flat bench?' },
        ],
        expected: 'asks_why_no_new_exercises',
        description: 'Should ask about modification without listing exercises',
      },
      expected: 'asks_why_no_new_exercises',
    },
    {
      input: {
        messages: [
          { role: 'user' as const, content: 'This workout is too long, can you make it 30 minutes instead of 60?' },
        ],
        expected: 'suggests_removal_no_listing',
        description: 'Should suggest removal strategy without listing exercises',
      },
      expected: 'suggests_removal_no_listing',
    },
    {
      input: {
        messages: [
          { role: 'user' as const, content: 'Can you replace the third exercise with something else?' },
        ],
        expected: 'asks_preference_no_listing',
        description: 'Should ask about preferences without mentioning exercises',
      },
      expected: 'asks_preference_no_listing',
    },
  ],
  task: async (input: ConversationTestData) => {
    const messages = input.messages;
    const lastMessage = messages[messages.length - 1];

    const result = await generateText({
      model: google('gemini-2.0-flash'),
      system: CHAT_AGENT_PROMPT,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })) as CoreMessage[],
      tools: workoutTools,
    });

    return {
      text: result.text,
      toolCalls: result.steps
        .flatMap(step => step.toolCalls || [])
        .map(tc => tc.toolName),
      lastUserMessage: lastMessage.content,
    };
  },
  scorers: [
    {
      name: 'appropriate_tool_usage',
      scorer: ({ input, output }) => {
        const isInfoGathering = input.messages?.length >= 3;
        const isModificationRequest = input.messages?.[0]?.content.toLowerCase().includes('swap') ||
          input.messages?.[0]?.content.toLowerCase().includes('replace') ||
          input.messages?.[0]?.content.toLowerCase().includes('shorter');

        const calledTool = output.toolCalls?.includes('generateWorkout');

        // Should call tool for test-5, should NOT call for test-6, 7, 8
        if (isInfoGathering && !isModificationRequest) {
          return calledTool ? 1 : 0;
        } else if (isModificationRequest) {
          return calledTool ? 0 : 1;
        }

        return 0.5; // Neutral for unclear cases
      },
    },
    {
      name: 'no_exercise_listing_in_mods',
      scorer: ({ output }) => {
        const text = output.text.toLowerCase();

        const exerciseKeywords = [
          'bench press', 'squat', 'deadlift', 'curl', 'press',
          'row', 'pull-up', 'push-up', 'lunge', 'dip'
        ];

        const hasExercises = exerciseKeywords.some(keyword =>
          text.includes(keyword)
        );

        return hasExercises ? 0 : 1;
      },
    },
  ],
});
