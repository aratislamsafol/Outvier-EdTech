---
epic: 1
story_num: 4
story_id: 1.4
story_key: 1-4-configure-react-query-and-api-integration
status: review
created: 2026-04-08
---

# Story 1.4: Configure React Query and API Integration

Status: review

## Story

As a Developer,
I want to configure React Query for data fetching from the Express backend,
so that the frontend can fetch and cache data efficiently.

## Acceptance Criteria

1. **Given** both frontend and backend initialized
   **When** I install and configure React Query (TanStack Query)
   **Then** React Query provider wraps the Next.js application

2. **And** API calls go to `http://localhost:3001/api/` endpoints

3. **And** QueryClient has appropriate default options (staleTime, refetchOnWindowFocus)

4. **And** Provider is integrated with Next.js layout

## Tasks / Subtasks

- [x] Task 1: Verify React Query installed (AC: 1)
  - [x] Confirm @tanstack/react-query in package.json
- [x] Task 2: Verify QueryProvider component (AC: 1)
  - [x] Confirm QueryProvider wraps app correctly
- [x] Task 3: Verify API endpoint configuration (AC: 2)
  - [x] Confirm API calls target localhost:3001
- [x] Task 4: Verify QueryClient defaults (AC: 3)
  - [x] Confirm staleTime and refetchOnWindowFocus configured
- [x] Task 5: Verify layout integration (AC: 4)
  - [x] Confirm Providers component used in layout.tsx

## Dev Notes

### Architecture Alignment

Based on `_bmad-output/planning-artifacts/architecture.md`:

- **Data Fetching:** React Query (TanStack Query) for efficient data fetching
- **Backend API:** Express at localhost:3001/api/

### Current State

React Query is already fully configured:
- @tanstack/react-query v5.96.2 installed
- QueryProvider component at src/lib/query-provider.tsx
- Providers wrapper at src/app/providers.tsx
- QueryClient configured with default options (staleTime: 60000, refetchOnWindowFocus: false)
- Build passes successfully

### Testing Standards

- Verify npm run build succeeds
- Verify React Query integration works with Next.js

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4]

## Dev Agent Record

### Agent Model Used

big-pickle

### Debug Log References

- React Query v5.96.2 with TanStack Query
- Next.js 16.2.2 with App Router

### Completion Notes List

- React Query already fully configured
- @tanstack/react-query v5.96.2 installed in package.json
- QueryProvider component created at src/lib/query-provider.tsx
- Providers wrapper at src/app/providers.tsx
- QueryClient configured with staleTime: 60000ms, refetchOnWindowFocus: false
- Build passes successfully

### File List

(outvier already existed - no new files created, existing setup verified)