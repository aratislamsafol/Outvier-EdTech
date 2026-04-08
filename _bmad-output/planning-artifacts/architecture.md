---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-04-08'
revisedAt: '2026-04-08'
revisedReason: 'Changed to Node/Express backend per user request'
project_name: 'Eligible Student'
user_name: 'Arat'
date: '2026-04-08'
inputDocuments: ["_bmad-output/planning-artifacts/prd.md"]
---

# Architecture Decision Document

_Revised: 2026-04-08 - Now using Node/Express backend with Next.js frontend_

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (43 FRs):**
- **University Discovery & Comparison** (FR1-8): Filters, side-by-side comparison, tuition, hidden costs, employment data
- **AI Recommendation Engine** (FR9-14): Profile matching, budget constraints, ROI calculations
- **Data Visualization** (FR15-18): D3.js ROI charts, break-even timelines, real-time updates
- **User Management** (FR19-25): Guest mode, OAuth, magic links, GDPR rights
- **Data Management (Admin)** (FR26-31): Verification workflow, versioning, rollback
- **Reporting & Export** (FR32-36): PDF generation, tamper-proof reports
- **Privacy & Compliance** (FR37-43): Cookie consent, data disputes, timestamps

**Non-Functional Requirements:**
- **Performance:** <1s page load, <200ms chart render
- **Security:** Zod/TypeScript guards, rate limiting, zero-dependency domain
- **Accessibility:** WCAG 2.1, keyboard navigation, screen reader support
- **Reliability:** 99.9% uptime, Vercel/AWS

### Key Architectural Aspects

| Aspect | Implication |
|--------|-------------|
| **Clean Architecture** | Domain/Application/Infrastructure layers with zero-dependency core |
| **Real-time D3.js** | Client-side visualization with SSR backbone |
| **GDPR Compliance** | exportData() / deleteAccount() built into Domain |
| **Hybrid Auth** | Passport.js with guest mode support |
| **Data Pipeline** | Scraped → Pending → Human Verify → Production |
| **Separate Backend** | Node/Express API server (port 3001), Next.js frontend (port 3000) |

### Scale Assessment

| Indicator | Value |
|-----------|-------|
| **Complexity** | Moderate to High |
| **Primary Domain** | Full-stack Web (Next.js Frontend + Node/Express Backend) |
| **Architectural Components** | ~10-12 major (2 separate servers) |
| **Cross-cutting** | Security, Performance, i18n, Accessibility |

## Starter Template Evaluation

### Primary Technology Domain

Full-stack Web Application with **separate frontend and backend**:
- **Frontend:** Next.js 16 (App Router)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB

### Starter Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Monolith Next.js** | Simple, one server | Less scalable, tight coupling |
| **Separate Backend** | Scalable, independent deploy, clear separation | More setup, 2 servers to manage |
| **tRPC + Next.js** | Type-safe, modern | More opinionated |

### Selected Architecture: Next.js (Frontend) + Node/Express (Backend)

**Rationale:**
- Backend independence allows scaling frontend/backend separately
- Clear separation of concerns with Clean Architecture
- Express.js is battle-tested for REST APIs
- Frontend can be deployed to Vercel, backend to Render/Railway/Fly.io

**Initialization Commands:**

Frontend (Next.js):
```bash
npx create-next-app@latest outvier \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Backend (Node/Express):
```bash
mkdir server && cd server
npm init -y
npm install express mongoose cors dotenv
npm install -D typescript @types/node @types/express tsx
```

**Folder Structure:**
```
project/
├── outvier/          # Next.js frontend (port 3000)
└── server/           # Node/Express backend (port 3001)
```

**Architectural Decisions Provided:**

- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS (minimal, utility-first)
- **Frontend:** Next.js 16 App Router
- **Backend:** Node.js + Express.js (separate server, port 3001)
- **API Communication:** REST with fetch/axios from Next.js to Express
- **Testing:** To be added (Vitest + React Testing Library)
- **Code Organization:** Clean Architecture layers

## Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- All decided via PRD and step 4 preferences

**Important Decisions (Shape Architecture):**
| Category | Decision | Rationale |
|----------|----------|-----------|
| Data Validation | TypeScript Guards | Zero-dependency, "No Noisy Code" policy |
| State Management | React Query | Caching, flexibility, no global store needed |
| API Design | REST | Simple, fits Clean Architecture |
| Hosting | Vercel | Auto-scaling, 99.9% uptime (NFR) |
| Styling | Tailwind | Utility-first, already in create-next-app |

**Deferred Decisions (Post-MVP):**
- tRPC (if type-safe API becomes critical)
- AWS migration (if Vercel insufficient)
- Complex state management (only if React Query insufficient)

### Data Architecture

- **Database:** MongoDB (per PRD)
- **Validation:** TypeScript Guards in Domain Layer (pure functions)
- **Caching:** React Query with SWR-like caching strategy
- **Data Pipeline:** Scraped → Pending → Human Verify → Production

### Authentication & Security

- **Auth:** Passport.js (Google OAuth + Magic Links)
- **Authorization:** Role-based (Guest, User, Admin)
- **Security Middleware:** Express.js built-in + express-rate-limit
- **Domain Security:** Zero-dependency domain, type guards prevent malicious input
- **CORS:** Configured for frontend (localhost:3000) → backend (localhost:3001)

### API & Communication Patterns

- **Design:** REST API (Express.js)
- **Backend Location:** `server/` folder, port 3001
- **Frontend Location:** `outvier/` folder, port 3000
- **Documentation:** OpenAPI/Swagger (post-MVP)
- **Error Handling:** Standard error response format
- **Rate Limiting:** express-rate-limit package
- **CORS:** Enabled for frontend-backend communication

### Frontend Architecture

- **Framework:** Next.js 16 (App Router)
- **State:** React Query (calls backend API at localhost:3001)
- **Components:** Atomic design pattern
- **Routing:** Next.js App Router
- **Performance:** React Query caching, D3.js direct DOM manipulation
- **Accessibility:** Radix UI for accessibility primitives
- **API Calls:** Use fetch/axios to Express backend

### Infrastructure & Deployment

- **Frontend Hosting:** Vercel (Next.js)
- **Backend Hosting:** Render/Railway/Fly.io (Node.js)
- **Database:** MongoDB Atlas
- **CI/CD:** Vercel for frontend, Railway/Render for backend
- **Environment:** Separate .env files for frontend and backend
- **Monitoring:** Vercel Analytics (post-MVP: Sentry)

## Implementation Patterns

### Critical Conflict Points Identified

6 areas where AI agents could make different choices

### Naming Patterns

**Database Naming Conventions:**
- Collections: `universities`, `users` (lowercase, plural)
- Fields: `user_id`, `created_at` (snake_case)
- Foreign Keys: `user_id` format

**API Naming Conventions:**
- Endpoints: `/api/universities`, `/api/comparisons` (plural, kebab-case)
- Query params: `budget_min`, `country`, `ranking_tier` (snake_case)
- Response wrapper: `{ data: [...], error: null }`

**Code Naming Conventions:**
- Components: `UniversityCard.tsx` (PascalCase)
- Hooks: `useUniversities.ts` (camelCase, use prefix)
- Utilities: `calculate-roi.ts` (kebab-case)
- Functions: `getUniversitiesByBudget` (camelCase)

### Structure Patterns

**Project Organization:**
- Tests: Co-located `*.test.ts` next to source files
- Components: By feature `presentation/features/university`
- Shared: `lib/utils`, `lib/types`
- Domain: `domain/entities`, `domain/value-objects` (no dependencies)

**File Structure:**
```
src/
├── domain/           # Zero dependencies
├── application/      # Use cases, ports
├── infrastructure/  # MongoDB, AI, external
├── presentation/    # UI, components
└── lib/             # Shared utilities
```

### Format Patterns

**API Response Formats:**
```typescript
// Success
{ data: University[], error: null }

// Error
{ data: null, error: { code: 'NOT_FOUND', message: '...' } }
```

**Data Exchange:**
- JSON fields: snake_case (`user_id`, `created_at`)
- Dates: ISO 8601 (`2024-01-15T10:30:00Z`)
- Booleans: true/false (not 1/0)

### Communication Patterns

**State Management:**
- React Query for server state
- Local state: `useState` only
- No global store (per your decision)

**Event/Action Naming:**
- Query keys: `['universities', filters]` (array format)
- Mutations: `useCreateComparison()`

### Process Patterns

**Error Handling:**
- API errors: `{ error: { code: string, message: string } }`
- HTTP status: 200, 400, 401, 404, 500
- User messages: Generic for security

**Loading States:**
- Component-level loading (not global)
- Skeleton loaders for UI
- React Query `isLoading`/`isError`

### Enforcement Guidelines

**All AI Agents MUST:**
- Use TypeScript strict mode
- Follow Clean Architecture layers (Domain → Application → Infrastructure)
- No external dependencies in Domain layer
- Use React Query for data fetching
- Co-locate tests with source

**Pattern Enforcement:**
- ESLint rules for naming conventions
- Prettier for formatting
- Code review for pattern violations

## Project Structure

### Complete Project Directory Structure

```
eligible_student/
├── outvier/                      # Next.js Frontend (port 3000)
│   ├── README.md
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── .env.local
│   ├── .env.example
│   ├── .gitignore
│   │
│   └── src/
│       ├── app/                 # Next.js App Router
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
│       │
│       ├── domain/              # Shared Types (frontend)
│       │   └── types/
│       │
│       ├── presentation/       # UI Layer
│       │   ├── components/
│       │   │   ├── ui/
│       │   │   ├── charts/     # D3.js
│       │   │   └── features/
│       │   └── hooks/          # React Query hooks calling backend API
│       │
│       └── lib/                 # Shared utilities
│
├── server/                      # Node/Express Backend (port 3001)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── .gitignore
│   │
│   └── src/
│       ├── index.ts             # Express app entry
│       ├── domain/              # Enterprise Business Rules (ZERO deps)
│       │   ├── entities/
│       │   │   ├── University.ts
│       │   │   ├── User.ts
│       │   │   ├── Comparison.ts
│       │   │   └── Program.ts
│       │   ├── value-objects/
│       │   └── types/index.ts
│       │
│       ├── application/         # Application Business Rules
│       │   ├── use-cases/
│       │   │   ├── CompareUniversities.ts
│       │   │   ├── GetRecommendations.ts
│       │   │   ├── CalculateROI.ts
│       │   │   └── ExportPDF.ts
│       │   ├── ports/
│       │   │   ├── IUniversityRepository.ts
│       │   │   ├── IUserRepository.ts
│       │   │   └── IAIRecommendationService.ts
│       │   └── dto/
│       │
│       ├── infrastructure/      # External Concerns
│       │   ├── persistence/mongodb/
│       │   │   ├── UniversityRepository.ts
│       │   │   ├── UserRepository.ts
│       │   │   └── Connection.ts
│       │   ├── ai/OpenAIAdapter.ts
│       │   └── pdf/PDFGenerator.ts
│       │
│       ├── routes/              # Express Routes
│       │   ├── universities.ts
│       │   ├── comparisons.ts
│       │   ├── auth.ts
│       │   └── users.ts
│       │
│       └── middleware/          # Express Middleware
│           ├── auth.ts
│           └── rateLimit.ts
│
└── docs/
```

### Requirements to Structure Mapping

| FR Category | Frontend Location | Backend Location |
|-------------|-------------------|-------------------|
| University Discovery | `presentation/components/features/university` | `server/src/application/use-cases` |
| AI Recommendations | `presentation/hooks/useRecommendations.ts` | `server/src/application/use-cases/GetRecommendations.ts` |
| D3.js Visualization | `presentation/components/charts` | — |
| User Management | `presentation/hooks/useAuth.ts` | `server/src/routes/auth.ts` |
| Admin Data Verification | — | `server/src/application/use-cases/VerifyUniversityData.ts` |
| PDF Export | — | `server/src/infrastructure/pdf/PDFGenerator.ts` |
| GDPR Compliance | — | `server/src/domain/entities/User.ts` |

### Architectural Boundaries

**Frontend → Backend Communication:**
```
Next.js (port 3000)  ←HTTP→  Express.js (port 3001)  ←→  MongoDB
     (UI)                  (API + Business Logic)      (Data)
```

**Backend Clean Architecture Flow:**
```
Routes → Application → Domain ← Infrastructure
           ↓              ↓           ↑
       (Use Cases)   (Entities)   (MongoDB)
```

- Frontend: React components, D3.js charts, React Query hooks
- Backend: Express routes, Use cases, Domain entities
- Domain: Zero dependencies, pure TypeScript
- Infrastructure: MongoDB repositories, external services

## Architecture Validation

### Coherence Validation ✅

**Decision Compatibility:**
- All technologies compatible: Next.js + React Query + MongoDB + D3.js + TypeScript
- Zero-dependency Domain Layer confirmed
- Clean Architecture boundaries properly enforced

**Pattern Consistency:**
- Naming conventions (snake_case DB, camelCase code, PascalCase components) consistent
- Implementation patterns align with technology choices
- Error handling and loading states standardized

**Structure Alignment:**
- Project structure supports all architectural decisions
- Clean Architecture layers properly separated
- Integration points clearly defined

### Requirements Coverage Validation ✅

| FR Category | Architectural Support |
|-------------|----------------------|
| University Discovery | ✅ `presentation/components/features/university` |
| AI Recommendations | ✅ `application/use-cases/GetRecommendations.ts` |
| D3.js Visualization | ✅ `presentation/components/charts` |
| User Management | ✅ Domain entities + NextAuth.js |
| Admin/Verification | ✅ Use cases + MongoDB |
| PDF Export | ✅ Infrastructure adapter |
| GDPR Compliance | ✅ Domain layer methods |

**NFR Coverage:**
- Performance: <1s page load, <200ms chart render ✅
- Security: TypeScript guards, rate limiting ✅
- Accessibility: WCAG 2.1, Radix UI ✅
- Reliability: Vercel auto-scaling ✅

### Implementation Readiness Validation ✅

**Decision Completeness:** ✅ All documented with versions
**Structure Completeness:** ✅ Full directory tree defined
**Pattern Completeness:** ✅ All conflict points addressed

### Gap Analysis

| Priority | Finding | Status |
|----------|---------|--------|
| Critical | None | — |
| Important | None | — |
| Nice-to-have | API documentation (OpenAPI) | Post-MVP |

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified (Next.js + Express)
- [x] Integration patterns defined (HTTP between frontend/backend)
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined (frontend + backend)
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** ✅ **READY FOR IMPLEMENTATION**

**Confidence Level:** High

**Key Strengths:**
- Clean Architecture with zero-dependency Domain Layer
- Complete technology stack decisions aligned with PRD
- Comprehensive patterns preventing AI agent conflicts
- Full requirements coverage with NFR support

**Areas for Future Enhancement:**
- OpenAPI documentation (post-MVP)
- Enhanced logging/monitoring (post-MVP)

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries (frontend/backend separation)
- Frontend (`outvier/`) calls backend API at `localhost:3001`
- Refer to this document for all architectural questions

**Implementation Setup:**

1. **Frontend (Next.js):**
```bash
npx create-next-app@latest outvier \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

2. **Backend (Node/Express):**
```bash
mkdir server && cd server
npm init -y
npm install express mongoose cors dotenv helmet
npm install -D typescript @types/node @types/express tsx
npx tsc --init
```

3. **Run Development:**
```bash
# Terminal 1 - Backend (port 3001)
cd server && npm run dev

# Terminal 2 - Frontend (port 3000)
cd outvier && npm run dev
```

**Environment Variables:**

Frontend (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Backend (`.env`):
```
PORT=3001
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=http://localhost:3000
```