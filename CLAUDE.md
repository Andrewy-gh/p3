# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend
- **Development**: `cd backend && bun run dev` - Runs with hot reload and env file
- **Build**: `cd backend && bun run build` - TypeScript compilation
- **Evaluation**: `cd backend && bun run eval:dev` - Runs evalite watcher for AI evals
- **Script runner**: `cd backend && bun run script` - Runs evaluation scripts
- **TypeScript**: `cd backend && bun run tsc` - TypeScript compilation **Imporant** Run at the end of each step to test code changes

### Frontend
- **Development**: `cd frontend && bunx --bun vite` - Starts dev server with proxy to backend
- **Build**: `cd frontend && bunx --bun vite build` - Production build
- **Lint**: `cd frontend && eslint .` - ESLint checking
- **Test**: `cd frontend && vitest` - Run tests

## Project Architecture

This is a full-stack AI application demonstrating various AI SDK patterns and capabilities.

### Backend (Hono + Bun)
- **Framework**: Hono web framework running on Bun runtime
- **API Structure**: REST API with routes under `/api` basepath
- **Main Routes**:
  - `/api/playground` - Interactive AI chat playground
  - `/api/basics` - Basic AI SDK examples
  - `/api/naive-agents` - Agent-based AI patterns
- **AI Integration**: Uses Google's Gemini models via AI SDK
- **Tool System**: Implements file system tools for AI agents with sandboxed access
- **Middleware**: Google Generative AI provider setup with API key management

### Frontend (React + TanStack Router + Vite)
- **Framework**: React 19 with TanStack Router for file-based routing
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Build Tool**: Vite with TypeScript support
- **State Management**: TanStack Form for form handling, AI SDK React hooks for chat
- **Dev Tools**: TanStack Router Devtools available in development

### Key Technical Details
- **TypeScript**: Project-wide TypeScript with strict mode
- **AI Tools**: Custom tool definitions in `backend/src/tools.ts` for file operations
- **System Prompts**: Fitness coaching prompts in `backend/src/prompts.ts`
- **File System**: Sandboxed file operations in `data/file-system-db.local/`
- **Proxy Setup**: Frontend proxies `/api` requests to backend on port 3000
- **Testing**: Vitest for both frontend and backend with jsdom environment

### Project Structure
```
backend/
  src/
    routes/          # API route handlers
    tools.ts         # AI tool definitions
    prompts.ts       # System prompts
    middleware.ts    # Hono middleware
frontend/
  src/
    routes/          # File-based routing
    components/      # React components with UI kit
```

## Environment Setup
- Backend requires `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local`
- Frontend development server runs on default Vite port with API proxy
- Backend serves on port 3000 with 60s idle timeout