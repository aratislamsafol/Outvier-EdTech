---
epic: 3
story_num: 2
story_id: 3.2
story_key: 3-2-profile-to-university-matching-algorithm
status: done
created: 2026-04-09
---

# Story 3.2: Profile-to-University Matching Algorithm

Status: done

## Story

As a System, I want to match student profiles to suitable universities based on budget and academic fit, so that students receive personalized recommendations.

## Acceptance Criteria

1. **Given** a student profile with GPA, field of study, and budget
   **When** the matching algorithm processes the profile
   **Then** universities are ranked by fit score (budget match, academic fit)
   **And** results are returned within the performance NFR (<1s response)

## Tasks / Subtasks

- [ ] Task 1: Create Matching Algorithm Service (AC: #1)
  - [ ] Subtask 1.1: Implement budget match scoring
  - [ ] Subtask 1.2: Implement academic fit scoring (GPA threshold)
  - [ ] Subtask 1.3: Combine scores into overall fit ranking
  - [ ] Subtask 1.4: Add API endpoint for recommendations
- [ ] Task 2: Integrate with Frontend (AC: #1)
  - [ ] Subtask 2.1: Create recommendation display component
  - [ ] Subtask 2.2: Connect to profile form submission

## Dev Notes

### Project Structure Notes

- Backend: `server/src/` - Express with Clean Architecture
- Frontend: `outvier/src/` - Next.js
- Profile data from Story 3-1: `StudentProfile` with gpa, fieldOfStudy, budgetMin, budgetMax

### Architecture Patterns

- Algorithm in Application layer (server/src/application/services/)
- API route: `server/src/routes/recommendations.ts`
- Frontend hook: `useRecommendations(profile)`

### Fields Required

- Student: GPA (0-4.0), Field of Study, Budget Range
- University: tuition, fieldOfStudy, ranking, scholarships
- Output: ranked list with fit score

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

- Created MatchingService with budget and academic scoring algorithms
- Implemented field of study matching with category mapping
- Added ROI calculation (cost / expected salary)
- Created API endpoint POST /api/recommendations/match
- Created useRecommendations hook for frontend
- Integrated recommendations display in Dashboard
- Both frontend and backend build successfully

### File List

- `server/src/application/services/MatchingService.ts` - NEW
- `server/src/application/dto/index.ts` - MODIFIED
- `server/src/routes/recommendations.ts` - MODIFIED
- `server/src/infrastructure/persistence/mongodb/connection.ts` - MODIFIED
- `outvier/src/hooks/useRecommendations.ts` - NEW
- `outvier/src/components/Dashboard.tsx` - MODIFIED

### Change Log

- 2026-04-09: Story created - Profile-to-university matching algorithm
- 2026-04-09: Implementation complete - matching algorithm, API, frontend integration
- 2026-04-09: Code review - changes requested (budget scoring fix)
- 2026-04-09: Fix applied - improved budget scoring logic
