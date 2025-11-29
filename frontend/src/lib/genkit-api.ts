/**
 * TypeScript types and API utilities for Genkit server integration
 *
 * This file defines the API contract between the frontend and the Go-based Genkit server.
 * The Genkit server runs on port 3400 and provides a /chatFlow endpoint for fitness coaching.
 */

// ===========================
// Request/Response Types
// ===========================

/**
 * Message format for conversation history
 */
export interface ConversationMessage {
  role: 'user' | 'model';
  content: string;
}

/**
 * Request payload for the Genkit /chatFlow endpoint
 * Wrapped in Genkit's standard flow input format
 */
export interface GenkitChatRequest {
  data: {
    message: string;
    conversationHistory?: ConversationMessage[];
  };
}

/**
 * Response from the Genkit /chatFlow endpoint
 * Contains the AI-generated text and tool execution metadata
 */
export interface ChatResponse {
  text: string;
  hasToolOutput: boolean;
  toolName?: string;
}

/**
 * Genkit flow response wrapper
 * All Genkit flows return results in this format
 */
export interface GenkitFlowResponse<T> {
  result: T;
}

// ===========================
// Workout Data Types
// ===========================

/**
 * Represents a single set in an exercise
 */
export interface WorkoutSet {
  reps: number;
  setType: 'warmup' | 'working';
  weight?: number;
}

/**
 * Represents a single exercise in a workout plan
 */
export interface WorkoutExercise {
  name: string;
  sets: WorkoutSet[];
}

/**
 * Complete workout plan output from the generateWorkout tool
 */
export interface WorkoutOutput {
  exercises: WorkoutExercise[];
  notes?: string;
  workoutFocus?: string;
}

/**
 * Input parameters for the generateWorkout tool
 */
export interface WorkoutToolInput {
  fitnessLevel: string;
  fitnessGoal: string;
  equipment: string;
  sessionDuration: number;
  workoutFocus: string;
}

// ===========================
// Error Types
// ===========================

/**
 * Error response from the Genkit server
 */
export interface GenkitError {
  error: string;
}

/**
 * Custom error class for Genkit API errors
 */
export class GenkitApiError extends Error {
  public statusCode?: number;
  public originalError?: unknown;

  constructor(
    message: string,
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'GenkitApiError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

// ===========================
// API Utilities
// ===========================

/**
 * Calls the Genkit /chatFlow endpoint
 *
 * @param message - The user's message
 * @param conversationHistory - Optional conversation history
 * @returns The chat response from the Genkit server
 * @throws GenkitApiError if the request fails
 */
export async function sendChatMessage(
  message: string,
  conversationHistory?: ConversationMessage[]
): Promise<ChatResponse> {
  try {
    const requestBody: GenkitChatRequest = {
      data: {
        message,
        ...(conversationHistory && conversationHistory.length > 0
          ? { conversationHistory }
          : {}),
      },
    };

    const response = await fetch('/genkit-api/chatFlow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 429) {
        throw new GenkitApiError(
          "You're sending requests too quickly. Please wait a moment and try again.",
          429
        );
      }

      // Handle other HTTP errors
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = (await response.json()) as GenkitError;
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // If JSON parsing fails, use the default error message
      }

      throw new GenkitApiError(errorMessage, response.status);
    }

    const data = (await response.json()) as GenkitFlowResponse<ChatResponse>;
    return data.result;
  } catch (error) {
    if (error instanceof GenkitApiError) {
      throw error;
    }

    // Handle network errors or other unexpected errors
    throw new GenkitApiError(
      'Failed to connect to the server. Please check your connection and try again.',
      undefined,
      error
    );
  }
}

/**
 * Parses workout data from the chat response text
 *
 * The Genkit server embeds workout data in the response text as JSON.
 * This function attempts to extract and parse that data.
 *
 * @param responseText - The text response from the Genkit server
 * @returns Parsed workout output or null if not found
 */
export function parseWorkoutFromResponse(
  responseText: string
): WorkoutOutput | null {
  try {
    // Try to find JSON in the response text
    const jsonMatch = responseText.match(/\{[\s\S]*"exercises"[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as WorkoutOutput;
      // Validate it has the expected structure
      if (parsed.exercises && Array.isArray(parsed.exercises)) {
        return parsed;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Type guard to check if an error is a GenkitApiError
 */
export function isGenkitApiError(error: unknown): error is GenkitApiError {
  return error instanceof GenkitApiError;
}
