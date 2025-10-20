import { generateText } from 'ai';
import { evalite } from 'evalite';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { CHAT_AGENT_PROMPT } from '../prompts.js';
import { workoutTools } from '../tools.js';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

/**
 * Tool Calling - Missing Info Gating Tests
 *
 * Tests 3-4: Ensures the AI agent asks for missing info before calling tools
 */
evalite('Tool Calling - Missing Info Gating', {
  data: () => [
    {
      id: 'test-3-missing-multiple-params',
      input: 'I want a workout for my chest.',
      expected: 'asks_questions_no_tool',
      description: 'Should ask questions, not call tool with incomplete info',
    },
    {
      id: 'test-4-partial-info',
      input: 'I have dumbbells and 30 minutes. Help me build muscle.',
      expected: 'asks_questions_no_tool',
      description: 'Should ask for missing params (level, focus, space, injuries)',
    },
  ],
  task: async (input) => {
    const result = await generateText({
      model: google('gemini-2.0-flash'),
      system: CHAT_AGENT_PROMPT,
      prompt: input,
      tools: workoutTools,
    });

    return {
      text: result.text,
      toolCalls: result.steps
        .flatMap(step => step.toolCalls || [])
        .map(tc => tc.toolName),
    };
  },
  scorers: [
    {
      name: 'does_not_call_tool',
      scorer: ({ output }) => {
        const calledTool = output.toolCalls?.includes('generateWorkout');
        return calledTool ? 0 : 1;
      },
    },
    {
      name: 'asks_clarifying_questions',
      scorer: ({ output }) => {
        const text = output.text.toLowerCase();

        // Should contain question words and question marks
        const hasQuestionMark = text.includes('?');
        const hasQuestionWords = ['what', 'how', 'which', 'do you'].some(word =>
          text.includes(word)
        );

        return hasQuestionMark && hasQuestionWords ? 1 : 0;
      },
    },
  ],
});
