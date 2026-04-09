---
epic: 3
story_num: 1
story_id: 3.1
story_key: 3-1-student-profile-input-form
status: done
created: 2026-04-09
---

# Story 3.1: Student Profile Input Form

Status: done

## Story

As a Student, I want to input my academic profile (GPA, field of study) and budget constraint, so that the system can understand my preferences.

## Acceptance Criteria

1. **Given** I am on the dashboard
   **When** I fill out the profile form (GPA, field of study, budget) and submit
   **Then** my profile is captured and sent to the recommendation engine
   **And** validation ensures all required fields are provided

## Tasks / Subtasks

- [x] Task 1: Create Profile Input Form Component (AC: #1)
  - [x] Subtask 1.1: Create form with GPA input (numeric, 0-4.0 scale)
  - [x] Subtask 1.2: Add field of study dropdown
  - [x] Subtask 1.3: Add budget constraint input
  - [x] Subtask 1.4: Add submit button
  - [x] Subtask 1.5: Add form validation (all fields required)
- [x] Task 2: Create Profile Submission Handler (AC: #1)
  - [x] Subtask 2.1: Create profile state in Dashboard
  - [x] Subtask 2.2: Store profile in state/context
  - [x] Subtask 2.3: Trigger recommendation engine (console log for now)

## Dev Notes

### Project Structure Notes

- Frontend: `outvier/src/app/` - Next.js App Router
- Dashboard exists at `outvier/src/components/Dashboard.tsx`
- React Query for state management (already configured)

### Architecture Patterns

- Use React state or context for profile data
- Follow existing component patterns (Tailwind styling)
- API route: `outvier/src/app/api/profile/route.ts`

### Fields Required

- GPA: number (0-4.0), required
- Field of Study: dropdown (Computer Science, Engineering, Business, Medicine, Arts, Sciences, Law, Other)
- Budget: number (min/max or single max), required

## Dev Agent Record

### Agent Model Used

big-pickle

### Debug Log References

### Completion Notes List

- Created ProfileForm component with GPA, field of study, and budget inputs
- GPA validation: 0-4.0 scale, required field
- Field of study dropdown with 8 options
- Budget range with min/max inputs (green/red color coding)
- Form validation - all fields required before submission
- Added "AI Recommendations" button in header
- Modal displays profile form with description
- After submission, shows banner with active profile info
- Profile state stored in Dashboard component
- Build passes successfully

### File List

- `outvier/src/components/ProfileForm.tsx` - NEW
- `outvier/src/components/Dashboard.tsx` - MODIFIED

### Change Log

- 2026-04-09: Story created - Student profile input form
- 2026-04-09: Implementation complete - all tasks completed, build passes
- 2026-04-09: Code review - changes requested (budget min>max validation, type fixes)
- 2026-04-09: Fixes applied - budget validation, type safety improvements