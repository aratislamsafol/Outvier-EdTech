# Story 2.5: Side-by-Side Comparison View

Status: done

## Story

As a Student, I want to compare 2-5 universities side-by-side, so that I can evaluate my options visually.

## Acceptance Criteria

1. **AC1**: Given I have searched and found universities, when I select 2-5 universities, then a "Compare" button appears with selection count
2. **AC2**: When I click "Compare", then a comparison modal/panel displays all selected universities
3. **AC3**: Then key metrics (tuition, ranking, employment rate, visa pathway, country, city) are visible in columns
4. **AC4**: Given more than 5 universities selected, when I try to add more, then I see a warning that max 5 can be compared

## Tasks / Subtasks

- [x] Task 1: Add University Selection UI (AC: #1, #4)
  - [x] Subtask 1.1: Add checkbox to each university card
  - [x] Subtask 1.2: Add floating "Compare" button with count badge
  - [x] Subtask 1.3: Implement max 5 selection limit with warning
- [x] Task 2: Create Comparison Modal (AC: #2, #3)
  - [x] Subtask 2.1: Create comparison table component
  - [x] Subtask 2.2: Display universities in columns
  - [x] Subtask 2.3: Show key metrics (tuition, ranking, employment, visa, etc.)
  - [x] Subtask 2.4: Add close/remove individual university from comparison
- [x] Task 3: Selection State Management (AC: #1)
  - [x] Subtask 3.1: Track selected university IDs
  - [x] Subtask 3.2: Persist selection when scrolling/filtering

## Dev Notes

### Project Structure Notes

- Frontend: `outvier/src/components/Dashboard.tsx` - main dashboard with university list
- React Query hook: `outvier/src/hooks/useUniversities.ts` - data fetching
- Backend API: Already supports all needed data via `/api/universities`

### Key Fields Available

From university data:
- name, country, city, ranking, tuition, currency
- employmentRate, visaPathway, isVerified
- scholarships (array), hiddenCosts (array)

### Architecture Patterns

- Use React state for selected universities (array of IDs)
- Comparison in modal overlay (fixed position)
- Clear all selections when filters change (optional - may want to keep)

## Dev Agent Record

### Agent Model Used

big-pickle

### Debug Log References

### Completion Notes List

- Implemented checkbox selection on each university card with visual selection state (indigo border + ring)
- Added floating "Compare" button that appears when any university is selected
- Compare button shows selection count badge and is disabled when fewer than 2 selected
- Maximum 5 selection limit with warning message when limit reached
- Implemented comparison modal with table showing all key metrics (country, city, ranking, tuition, employment rate, visa pathway, verified status)
- Added remove button (X) on each university column in modal to allow removing from comparison
- Selection persists across filter changes (using React state)
- Build passes successfully

### File List

- outvier/src/components/Dashboard.tsx (modified)

### Change Log

- 2026-04-08: Story created - Side-by-side comparison view
- 2026-04-08: Implementation complete - all tasks completed, build passes
- 2026-04-08: Code review APPROVED

---

## Senior Developer Review (AI)

**Review Date:** 2026-04-08  
**Reviewer:** big-pickle (Code Review Workflow)  
**Outcome:** APPROVED

### Action Items

- [ ] Add tests for comparison functionality (Medium priority)
- [ ] Add Escape key to close modal (Low priority)

### Notes

All 4 Acceptance Criteria satisfied.