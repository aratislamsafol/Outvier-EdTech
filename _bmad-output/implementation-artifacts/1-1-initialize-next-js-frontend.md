---
epic: 1
story_num: 1
story_id: 1.1
story_key: 1-1-initialize-next-js-frontend
status: review
created: 2026-04-08
---

# Story 1.1: Initialize Next.js Frontend

Status: review

## Story

As a Developer,
I want to initialize a Next.js project with TypeScript, Tailwind, and ESLint,
so that I have a modern, type-safe frontend foundation.

## Acceptance Criteria

1. **Given** a clean development environment
   **When** I run `npx create-next-app@latest outvier --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
   **Then** a Next.js project is created with TypeScript, Tailwind, and App Router enabled

2. **And** the project compiles without errors

3. **And** the development server starts on port 3000

4. **And** TypeScript strict mode is enabled in tsconfig.json

5. **And** Tailwind CSS is properly configured

6. **And** ESLint runs without errors

7. **And** the project structure uses src/ directory with App Router

8. **And** import alias `@/*` is configured

## Tasks / Subtasks

- [x] Task 1: Initialize Next.js project (AC: 1, 2, 3)
  - [x] Run create-next-app with all required flags
  - [x] Verify project compiles and dev server starts
- [x] Task 2: Configure TypeScript strict mode (AC: 4)
  - [x] Update tsconfig.json to enable strict mode
  - [x] Verify strict checks pass
- [x] Task 3: Verify Tailwind configuration (AC: 5)
  - [x] Confirm tailwind.config.ts exists and is configured
  - [x] Verify Tailwind classes work in default page
- [x] Task 4: Verify ESLint configuration (AC: 6)
  - [x] Confirm .eslintrc.json or eslint.config.mjs exists
  - [x] Run lint and fix any errors
- [x] Task 5: Verify project structure (AC: 7, 8)
  - [x] Confirm src/ directory exists
  - [x] Confirm app/ directory (App Router) exists
  - [x] Verify import aliases work

## Dev Notes

### Architecture Alignment

Based on `_bmad-output/planning-artifacts/architecture.md`:

- **Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Port:** Frontend runs on localhost:3000
- **Project Name:** `outvier` (from PRD)
- **Structure:** Uses src/ directory with App Router pattern
- **Import Alias:** `@/*` maps to `src/*`

### Key Requirements from Architecture

1. Page load time < 1 second (NFR1)
2. TypeScript strict mode with domain type guards (AR8)
3. Clean Architecture folder structure for frontend components
4. React Query for data fetching (configured in Story 1.4)
5. Vercel deployment ready

### Source Tree Components

The frontend will have this initial structure:
```
outvier/
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # React components
│   └── lib/          # Utilities and helpers
├── public/           # Static assets
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

### Testing Standards

- No explicit E2E tests required for setup story
- Verify TypeScript compilation: `npm run build`
- Verify dev server starts: `npm run dev`
- ESLint should pass with no errors

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter-Template-Evaluation]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]

## Dev Agent Record

### Agent Model Used

big-pickle

### Debug Log References

- Next.js 16.2.2 with Turbopack
- React 19.2.4
- Tailwind CSS v4 with @tailwindcss/postcss

### Completion Notes List

- Project already existed with all ACs satisfied
- TypeScript strict mode already enabled (strict: true in tsconfig.json)
- ESLint configured via eslint.config.mjs
- Project structure uses src/app with App Router
- Import alias @/* configured and working
- Build passes successfully
- Lint runs without errors

### File List

(outvier already existed - no new files created, existing setup verified)
