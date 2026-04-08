---
epic: 1
story_num: 2
story_id: 1.2
story_key: 1-2-initialize-node-express-backend
status: review
created: 2026-04-08
---

# Story 1.2: Initialize Node/Express Backend

Status: review

## Story

As a Developer,
I want to initialize a Node.js + Express backend server,
so that API logic is separate from the frontend.

## Acceptance Criteria

1. **Given** the Next.js frontend created
   **When** I create a `server/` folder with `npm init` and install express, mongoose, cors, dotenv, helmet
   **Then** an Express server runs on port 3001

2. **And** CORS is configured to allow frontend (localhost:3000) requests

3. **And** basic health check endpoint responds at `/api/health`

4. **And** project follows Clean Architecture folder structure

5. **And** environment variables are configured via .env

6. **And** TypeScript is configured for the backend

7. **And** basic logging is set up

## Tasks / Subtasks

- [x] Task 1: Initialize backend project (AC: 1, 6)
  - [x] Create server/ directory at project root
  - [x] Initialize npm project with package.json
  - [x] Install dependencies: express, mongoose, cors, dotenv, helmet, typescript, ts-node, @types/express, @types/cors, @types/node
  - [x] Configure TypeScript for backend
- [x] Task 2: Set up Express server (AC: 1, 7)
  - [x] Create src/index.ts as entry point
  - [x] Configure Express app with middleware (helmet, cors, json)
  - [x] Set up basic logging
- [x] Task 3: Configure CORS (AC: 2)
  - [x] Configure CORS to allow localhost:3000
  - [x] Verify frontend can make requests
- [x] Task 4: Create health check endpoint (AC: 3)
  - [x] Implement GET /api/health
  - [x] Return JSON with status: "ok", timestamp
- [x] Task 5: Create Clean Architecture folders (AC: 4)
  - [x] Create src/domain, src/application, src/infrastructure, src/routes
  - [x] Add basic index.ts exports
- [x] Task 6: Configure environment (AC: 5)
  - [x] Create .env.example with PORT, NODE_ENV, CORS_ORIGIN
  - [x] Create .env for development

## Dev Notes

### Architecture Alignment

Based on `_bmad-output/planning-artifacts/architecture.md`:

- **Backend:** Node.js + Express.js
- **Port:** 3001 (separate from frontend at 3000)
- **Database:** MongoDB (mongoose)
- **Clean Architecture:** Domain/Application/Infrastructure layers

### Key Requirements from Architecture

1. Express.js is battle-tested for REST APIs
2. Backend independence allows scaling frontend/backend separately
3. Clear separation of concerns with Clean Architecture
4. Backend can be deployed to Render/Railway/Fly.io

### Source Tree Components

```
server/
├── src/
│   ├── domain/         # Business entities, type guards (zero-dependency)
│   ├── application/    # Use cases, services
│   ├── infrastructure/  # Database, external services
│   ├── routes/         # API route handlers
│   └── index.ts        # Entry point
├── package.json
├── tsconfig.json
└── .env
```

### API Endpoints

- `GET /api/health` - Health check endpoint
- Future: `/api/universities`, `/api/recommendations`, etc.

### Testing Standards

- Verify server starts: `npm run dev` (using ts-node)
- Verify health endpoint: `curl http://localhost:3001/api/health`
- TypeScript compiles without errors: `npx tsc`

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter-Template-Evaluation]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]

## Dev Agent Record

### Agent Model Used

big-pickle

### Debug Log References

- Express 4.21.0
- Mongoose 8.4.1
- Helmet 7.1.0
- TypeScript 5.3.3

### Completion Notes List

- Server already existed with all ACs satisfied
- Express server runs on port 3001
- CORS configured to allow localhost:3000
- Health check endpoint at /api/health returns {status: "ok", timestamp}
- Clean Architecture folders: domain, application, infrastructure, routes
- Environment variables configured via .env
- TypeScript compiles without errors

### File List

(server already existed - no new files created, existing setup verified)