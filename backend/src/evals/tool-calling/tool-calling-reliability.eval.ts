import { generateText } from 'ai';
import { evalite } from 'evalite';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { CHAT_AGENT_PROMPT } from '../../prompts.js';
import { workoutTools } from '../../tools.js';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

/**
 * Tool Calling - Reliability Tests
 *
 * Tests 9-10: Ensures the AI agent calls tools immediately without hesitation
 */
evalite('Tool Calling - Reliability', {
  data: () => [
    {
      id: 'test-9-no-hesitation',
      input: 'Create a pull day workout. Intermediate level fitness, commercial gym with full gym access: barbells, dumbbells, kettlebells, and machines, 45 minutes, hypertrophy focused goal, no injuries.',
      expected: 'immediate_tool_call',
      description: 'Should call tool without hesitation or error messages',
      only: true,
    },
    {
      id: 'test-10-complete-info-immediate-call',
      input:
        'I need a beginner full body workout, bodyweight only, 20 minutes, general fitness, home, no injuries.',
      expected: 'immediate_tool_call',
      description: 'Should call tool immediately with complete info',
      only: true,
    },
  ],
  task: async (input) => {
      const result = await generateText({
      model: google('gemini-2.0-flash'),
      system: CHAT_AGENT_PROMPT,
      prompt: input,
      tools: workoutTools,
      temperature: 0,
    });
    const obj = {
      text: result.text,
      toolCalls: result.steps
        .flatMap((step) => step.toolCalls || [])
        .map((tc) => tc.toolName),
      steps: result.steps,
      firstStepHadToolCall:
        result.steps[0]?.toolCalls && result.steps[0].toolCalls.length > 0,
    };
    console.log('obj', obj);
    return obj;
  },
  scorers: [
    {
      name: 'calls_tool_in_first_step',
      scorer: ({ output }) => {
        return output.firstStepHadToolCall ? 1 : 0;
      },
    },
    {
      name: 'no_error_or_hiccup_messages',
      scorer: ({ output }) => {
        const text = output.text.toLowerCase();

        const errorPhrases = [
          'error',
          'hiccup',
          'issue',
          'problem',
          'unable',
          'cannot',
          "can't",
          'failed',
          'retry',
          'try again',
        ];

        const hasError = errorPhrases.some((phrase) => text.includes(phrase));

        return hasError ? 0 : 1;
      },
    },
  ],
  columns: async (result) => {
    return [
      {
        label: 'Input',
        value: result.input,
      },
      {
        label: 'Output',
        value: result.output.text,
      },
    ];
  },
});


