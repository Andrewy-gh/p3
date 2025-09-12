import {
  tool,
  type UIMessage,
  type InferUITools,
  type UIDataTypes,
  generateText,
  Output,
} from 'ai';
import { z } from 'zod';
import * as fsTools from './file-system-functionality.js';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { WORKOUT_GENERATION_PROMPT } from './prompts.js';

export type MyUIMessage = UIMessage<never, never, InferUITools<typeof tools>>;
export type WorkoutUIMessage = UIMessage<
  never,
  never,
  InferUITools<typeof workoutTools>
>;

export const WorkoutSetInputSchema = z.object({
  reps: z.number(),
  setType: z.enum(['warmup', 'working']),
  weight: z.number().optional(),
});

export const WorkoutExerciseInputSchema = z.object({
  name: z.string(),
  sets: z.array(WorkoutSetInputSchema),
});

export const WorkoutCreateWorkoutRequestSchema = z.object({
  exercises: z.array(WorkoutExerciseInputSchema),
  notes: z.string().optional(),
  workoutFocus: z.string().optional(),
});

export const workoutTools = {
  generateWorkout: tool({
    description:
      'Generate a personalized workout plan based on user requirements',
    inputSchema: z.object({
      fitnessLevel: z
        .string()
        .describe('The fitness level (beginner, intermediate, advanced)'),
      fitnessGoal: z
        .string()
        .describe(
          'Primary fitness goal (strength, hypertrophy, endurance, power, general fitness)'
        ),
      equipment: z
        .string()
        .describe(
          'Available equipment (bodyweight, dumbbells, barbell+rack, machines, cables, bands, etc.)'
        ),
      sessionDuration: z.number().describe('Available workout time in minutes'),
      workoutFocus: z
        .string()
        .describe(
          'Workout focus (push/pull/legs, full body, specific muscle groups, etc.)'
        ),
      spaceConstraints: z
        .string()
        .describe(
          'Space/location constraints (home, gym, hotel room, outdoor, etc.)'
        ),
      injuries: z
        .string()
        .optional()
        .describe('Any current injuries or pain to work around'),
    }),
    execute: async ({
      fitnessLevel,
      fitnessGoal,
      equipment,
      sessionDuration,
      workoutFocus,
      spaceConstraints,
      injuries,
    }) => {
      const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      });
      const model = google('gemini-2.0-flash');

      const userInfo = `
        User Profile:
        - Fitness Level: ${fitnessLevel}
        - Primary Goal: ${fitnessGoal}
        - Available Equipment: ${equipment}
        - Session Duration: ${sessionDuration} minutes
        - Workout Focus: ${workoutFocus}
        - Space/Location: ${spaceConstraints}
        ${injuries ? `- Injuries/Pain: ${injuries}` : '- No injuries reported'}
      `;

      const { experimental_output } = await generateText({
        model,
        system: WORKOUT_GENERATION_PROMPT(userInfo),
        prompt: userInfo,
        experimental_output: Output.object({
          schema: WorkoutCreateWorkoutRequestSchema,
        }),
      });
      return experimental_output;
    },
  }),
};

export const tools = {
  writeFile: tool({
    description: 'Write to a file',
    inputSchema: z.object({
      path: z.string().describe('The path to the file to create'),
      content: z.string().describe('The content of the file to create'),
    }),
    execute: async ({ path, content }) => {
      return fsTools.writeFile(path, content);
    },
  }),
  readFile: tool({
    description: 'Read a file',
    inputSchema: z.object({
      path: z.string().describe('The path to the file to read'),
    }),
    execute: async ({ path }) => {
      return fsTools.readFile(path);
    },
  }),
  deletePath: tool({
    description: 'Delete a file or directory',
    inputSchema: z.object({
      path: z.string().describe('The path to the file or directory to delete'),
    }),
    execute: async ({ path }) => {
      return fsTools.deletePath(path);
    },
  }),
  listDirectory: tool({
    description: 'List a directory',
    inputSchema: z.object({
      path: z.string().describe('The path to the directory to list'),
    }),
    execute: async ({ path }) => {
      return fsTools.listDirectory(path);
    },
  }),
  createDirectory: tool({
    description: 'Create a directory',
    inputSchema: z.object({
      path: z.string().describe('The path to the directory to create'),
    }),
    execute: async ({ path }) => {
      return fsTools.createDirectory(path);
    },
  }),
  exists: tool({
    description: 'Check if a file or directory exists',
    inputSchema: z.object({
      path: z.string().describe('The path to the file or directory to check'),
    }),
    execute: async ({ path }) => {
      return fsTools.exists(path);
    },
  }),
  searchFiles: tool({
    description: 'Search for files',
    inputSchema: z.object({
      pattern: z.string().describe('The pattern to search for'),
    }),
    execute: async ({ pattern }) => {
      return fsTools.searchFiles(pattern);
    },
  }),
};
