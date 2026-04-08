---
epic: 1
story_num: 3
story_id: 1.3
story_key: 1-3-create-clean-architecture-folder-structure
status: review
created: 2026-04-08
---

# Story 1.3: Create Clean Architecture Folder Structure

Status: review

## Story

As a Developer,
I want to set up the Clean Architecture folder structure in the server/,
so that the codebase follows the zero-dependency domain principle.

## Acceptance Criteria

1. **Given** the Express backend initialized
   **When** I create folders `server/src/domain`, `server/src/application`, `server/src/infrastructure`, `server/src/routes`
   **Then** the folder structure matches the architecture document

2. **And** each layer has appropriate subdirectories

3. **And** index.ts files exist for barrel exports in each layer

4. **And** TypeScript paths are configured for clean imports

## Tasks / Subtasks

- [x] Task 1: Verify domain layer (AC: 1, 2)
  - [x] Confirm src/domain/entities and src/domain/types exist
  - [x] Verify index.ts for barrel exports
- [x] Task 2: Verify application layer (AC: 1, 2)
  - [x] Confirm src/application/ folder exists
  - [x] Add index.ts for barrel exports
- [x] Task 3: Verify infrastructure layer (AC: 1, 2)
  - [x] Confirm src/infrastructure/ folder structure exists
  - [x] Add index.ts for barrel exports
- [x] Task 4: Verify routes layer (AC: 1, 2)
  - [x] Confirm src/routes/ folder exists
  - [x] Add index.ts for barrel exports
- [x] Task 5: Configure TypeScript paths (AC: 4)
  - [x] Update tsconfig.json with path aliases

## Dev Notes

### Architecture Alignment

Based on `_bmad-output/planning-artifacts/architecture.md`:

- **Clean Architecture:** Domain/Application/Infrastructure layers with zero-dependency core
- **Zero-dependency Domain:** Domain layer must have no external dependencies

### Expected Structure

```
server/src/
├── domain/
│   ├── entities/      # Business entities (University, etc.)
│   ├── types/         # Type definitions, interfaces
│   └── index.ts       # Barrel exports
├── application/
│   ├── services/      # Use cases, business logic
│   ├── dto/           # Data transfer objects
│   └── index.ts       # Barrel exports
├── infrastructure/
│   ├── persistence/   # Database, repositories
│   ├── external/      # External API clients
│   └── index.ts       # Barrel exports
├── routes/
│   ├── universities.ts
│   ├── recommendations.ts
│   └── index.ts       # Barrel exports
└── index.ts           # Entry point
```

### Current State

Both frontend (outvier) and backend (server) already have:
- domain/entities and domain/types folders
- infrastructure/persistence folder for MongoDB
- Basic index.ts files

This story will verify and enhance the structure as needed.

### Testing Standards

- Verify folder structure matches architecture
- Verify TypeScript compilation works with new structure
- Verify imports work correctly

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Clean-Architecture]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3]

## Dev Agent Record

### Agent Model Used

big-pickle

### Debug Log References

- Created Clean Architecture folder structure
- Added barrel exports (index.ts) for each layer
- Created routes for universities and recommendations

### Completion Notes List

- Created server/src/domain/index.ts with barrel exports
- Created server/src/application/ with services and dto subfolders
- Created server/src/infrastructure/persistence/mongodb/index.ts
- Created server/src/routes/ with universities.ts and recommendations.ts
- Updated server/src/index.ts to use routes
- TypeScript compiles without errors

### File List

- server/src/domain/index.ts
- server/src/application/index.ts
- server/src/application/services/index.ts
- server/src/application/dto/index.ts
- server/src/infrastructure/index.ts
- server/src/infrastructure/persistence/index.ts
- server/src/infrastructure/persistence/mongodb/index.ts
- server/src/routes/index.ts
- server/src/routes/universities.ts
- server/src/routes/recommendations.ts
- server/src/index.ts (modified)