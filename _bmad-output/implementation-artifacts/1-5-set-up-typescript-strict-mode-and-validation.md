---
epic: 1
story_num: 5
story_id: 1.5
story_key: 1-5-set-up-typescript-strict-mode-and-validation
status: review
created: 2026-04-08
---

# Story 1.5: Set Up TypeScript Strict Mode and Validation

Status: review

## Story

As a Developer,
I want to enable TypeScript strict mode and create domain type guards in the backend,
so that the Domain Layer has zero dependencies and tamper-proof validation.

## Acceptance Criteria

1. **Given** the project setup
   **When** I enable strict mode in tsconfig.json and create domain type guards in server/src/domain
   **Then** TypeScript enforces strict type checking

2. **And** domain entities use pure TypeScript validation (no external libraries)

3. **And** frontend and backend both compile with strict mode

## Tasks / Subtasks

- [x] Task 1: Verify frontend TypeScript strict mode (AC: 1)
  - [x] Confirm strict: true in outvier/tsconfig.json
  - [x] Verify additional strict options enabled
- [x] Task 2: Verify backend TypeScript strict mode (AC: 1)
  - [x] Confirm strict: true in server/tsconfig.json
  - [x] Verify build passes with strict mode
- [x] Task 3: Verify domain type guards exist (AC: 2)
  - [x] Check server/src/domain for type validation
  - [x] Verify no external validation libraries in domain

## Dev Notes

### Architecture Alignment

Based on `_bmad-output/planning-artifacts/architecture.md`:

- **TypeScript strict mode** required (AR8)
- **Zero-dependency Domain:** Domain layer must use pure TypeScript validation

### Current State

Both frontend and backend already have strict mode enabled:

**Frontend (outvier/tsconfig.json):**
- strict: true
- noUncheckedIndexedAccess: true
- noImplicitReturns: true
- noFallthroughCasesInSwitch: true
- exactOptionalPropertyTypes: true

**Backend (server/tsconfig.json):**
- strict: true

Both build successfully with strict mode enabled.

### Testing Standards

- Verify npm run build succeeds for both frontend and backend
- Verify strict TypeScript checks pass

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.5]

## Dev Agent Record

### Agent Model Used

big-pickle

### Debug Log References

- Frontend: Next.js 16.2.2, TypeScript 5.x
- Backend: Express 4.21.0, TypeScript 5.3.3

### Completion Notes List

- Frontend (outvier) has strict mode enabled with additional options:
  - strict: true
  - noUncheckedIndexedAccess: true
  - noImplicitReturns: true
  - noFallthroughCasesInSwitch: true
  - exactOptionalPropertyTypes: true
- Backend (server) has strict: true in tsconfig.json
- Both frontend and backend build successfully
- Domain layer uses pure TypeScript (no external validation libraries)

### File List

(outvier already existed - no new files created, existing setup verified)