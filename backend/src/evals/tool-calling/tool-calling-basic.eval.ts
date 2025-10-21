import { generateText } from 'ai';
import { evalite } from 'evalite';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { CHAT_AGENT_PROMPT } from '../prompts.js';
import { workoutTools } from '../tools.js';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

/**
 * Tool Calling - Basic Behavior Tests
 *
 * Tests 1-2: Ensures the AI agent:
 * 1. Uses the generateWorkout tool (not text) for workouts
 * 2. Never lists/describes exercises in text responses
 */
evalite('Tool Calling - Basic Behavior', {
  data: () => [
    {
      id: 'test-1-calls-tool-with-complete-info',
      input:
        'I want a chest workout. I have dumbbells, 45 minutes, intermediate level, hypertrophy goal, home gym, no injuries.',
      expected: 'calls_tool_no_exercises',
      description: 'Should call generateWorkout tool and not list exercises',
    },
    {
      id: 'test-2-no-exercise-listing',
      input:
        'Generate me a leg day workout. Advanced level, barbell and rack available, 60 minutes, strength goal, commercial gym, no injuries.',
      expected: 'calls_tool_no_exercises',
      description: 'Should call tool immediately without describing exercises',
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
        .flatMap((step) => step.toolCalls || [])
        .map((tc) => tc.toolName),
      response: result.response,
    };
  },
  scorers: [
    {
      name: 'calls_generateWorkout_tool',
      scorer: ({ output }) => {
        const calledTool = output.toolCalls?.includes('generateWorkout');
        return calledTool ? 1 : 0;
      },
    },
    {
      name: 'no_exercise_names_in_text',
      scorer: ({ output }) => {
        const text = output.text.toLowerCase();

        // Common exercise keywords that shouldn't appear
        const exerciseKeywords = [
          'bench press',
          'squat',
          'deadlift',
          'curl',
          'press',
          'row',
          'pull-up',
          'push-up',
          'lunge',
          'dip',
          'fly',
          'raise',
          'extension',
          'tricep',
          'bicep',
        ];

        const hasExercises = exerciseKeywords.some((keyword) =>
          text.includes(keyword.toLowerCase())
        );

        return hasExercises ? 0 : 1;
      },
    },
  ]
});
