---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ["_bmad-output/planning-artifacts/prd.md", "_bmad-output/planning-artifacts/architecture.md"]
workflowStatus: 'complete'
completedAt: '2026-04-08'
revisedAt: '2026-04-08'
revisedReason: 'Updated to Node/Express backend architecture'
project_name: 'Eligible Student'

# Eligible Student - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Outvier EdTech Dashboard, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**University Discovery & Comparison (FR1-FR8):**
- FR1: Students can filter universities by budget range
- FR2: Students can filter universities by country/region
- FR3: Students can filter universities by ranking tier
- FR4: Students can view side-by-side comparison of 2-5 universities
- FR5: Students can view tuition costs for each university
- FR6: Students can view hidden costs (living, visa, insurance)
- FR7: Students can view employment rate data per university
- FR8: Students can view scholarship availability information

**AI Recommendation Engine (FR9-FR14):**
- FR9: Students can input their academic profile (GPA, field of study)
- FR10: Students can input their total budget constraint
- FR11: System can match student profile to suitable universities
- FR12: System can suggest alternatives when no exact matches found
- FR13: System can display ROI calculation for each recommended university
- FR14: AI can recommend scholarship-eligible universities within budget

**Data Visualization (FR15-FR18):**
- FR15: System can render D3.js ROI comparison charts
- FR16: Charts can display break-even timeline visualization
- FR17: Charts can show tuition vs expected salary comparison
- FR18: Visualization updates in real-time based on filter changes

**User Management (FR19-FR25):**
- FR19: Guest users can access dashboard and view comparisons
- FR20: Users can create account via Google OAuth
- FR21: Users can create account via magic link (email)
- FR22: Users can save comparisons for later viewing
- FR23: Users can create personalized profiles
- FR24: Users can export their personal data (GDPR)
- FR25: Users can delete their account and associated data (GDPR)

**Data Management (Admin) (FR26-FR31):**
- FR26: Admins can view pending verification university data
- FR27: Admins can verify and approve university data
- FR28: Admins can reject and flag data for correction
- FR29: System tracks audit timestamp for each data record
- FR30: System maintains version history for data changes
- FR31: Admins can roll back data to previous stable version

**Reporting & Export (FR32-FR36):**
- FR32: Students can generate PDF comparison report
- FR33: PDF reports include tuition, living costs, visa roadmap
- FR34: PDF reports are tamper-proof (verification hash)
- FR35: Parents can view simplified finance view (TCO + Safety Rating)
- FR36: Users can share comparisons via unique link

**Privacy & Compliance (FR37-FR43):**
- FR37: System displays cookie consent (Strictly Necessary vs Analytical)
- FR38: System respects user data retention preferences
- FR39: System provides data dispute reporting mechanism
- FR40: System resolves data disputes within 48 hours
- FR41: System displays "Last Verified" timestamp on university data
- FR42: System displays "Estimated" tag for unverified data
- FR43: System displays AI disclaimer on ROI charts

### NonFunctional Requirements

**Performance:**
- NFR1: Page load time < 1 second (Next.js SSR)
- NFR2: Chart render time < 200ms (D3.js direct DOM)
- NFR3: Data fetching with caching (React Query/SWR)

**Security:**
- NFR4: Input validation via TypeScript guards in Domain Layer
- NFR5: API rate limiting to prevent scrapers/bots
- NFR6: Zero-dependency Domain Layer (tamper-proof)

**Accessibility:**
- NFR7: WCAG 2.1 compliance
- NFR8: 100% keyboard navigation (Tab + Enter)
- NFR9: Screen reader support (ARIA labels, Semantic HTML)
- NFR10: Color-blind-friendly chart palette

**Reliability:**
- NFR11: 99.9% uptime SLA
- NFR12: Vercel/AWS auto-scaling for high-traffic periods (Jan/Sep)

### Additional Requirements (Architecture)

- AR1: Initialize Next.js frontend with create-next-app (TypeScript, Tailwind, App Router)
- AR2: Initialize Node/Express backend (port 3001)
- AR3: Implement Clean Architecture folder structure (Domain/Application/Infrastructure in server/)
- AR4: Set up React Query for data fetching (calls Express backend API)
- AR5: Configure Express REST API routes (server/src/routes/)
- AR6: Set up CORS for frontend-backend communication
- AR7: Set up Vercel deployment for frontend, Railway/Render for backend
- AR8: Implement TypeScript strict mode with domain type guards

### UX Design Requirements

None found - UX design document not available.

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| AR1 | Epic 1 | Initialize create-next-app |
| AR2 | Epic 1 | Clean Architecture folders |
| AR3 | Epic 1 | React Query setup |
| AR4 | Epic 1 | REST API routes |
| AR5 | Epic 1 | Vercel deployment |
| AR6 | Epic 1 | TypeScript strict mode |
| FR1 | Epic 2 | Filter by budget |
| FR2 | Epic 2 | Filter by country |
| FR3 | Epic 2 | Filter by ranking |
| FR4 | Epic 2 | Side-by-side comparison |
| FR5 | Epic 2 | View tuition costs |
| FR6 | Epic 2 | View hidden costs |
| FR7 | Epic 2 | View employment data |
| FR8 | Epic 2 | View scholarship info |
| FR9 | Epic 3 | Input academic profile |
| FR10 | Epic 3 | Input budget constraint |
| FR11 | Epic 3 | Match profile to universities |
| FR12 | Epic 3 | Suggest alternatives |
| FR13 | Epic 3 | Display ROI calculation |
| FR14 | Epic 3 | Recommend scholarship options |
| FR15 | Epic 4 | Render D3.js ROI charts |
| FR16 | Epic 4 | Break-even timeline |
| FR17 | Epic 4 | Tuition vs salary comparison |
| FR18 | Epic 4 | Real-time chart updates |
| FR19 | Epic 5 | Guest mode access |
| FR20 | Epic 5 | Google OAuth login |
| FR21 | Epic 5 | Magic link login |
| FR22 | Epic 5 | Save comparisons |
| FR23 | Epic 5 | Create profiles |
| FR24 | Epic 5 | GDPR: exportData |
| FR25 | Epic 5 | GDPR: deleteAccount |
| FR26 | Epic 6 | View pending verification |
| FR27 | Epic 6 | Verify/approve data |
| FR28 | Epic 6 | Reject/flag data |
| FR29 | Epic 6 | Track audit timestamp |
| FR30 | Epic 6 | Version history |
| FR31 | Epic 6 | Rollback capability |
| FR32 | Epic 6 | Generate PDF report |
| FR33 | Epic 6 | PDF includes costs/visa |
| FR34 | Epic 6 | Tamper-proof PDF |
| FR35 | Epic 6 | Simplified finance view |
| FR36 | Epic 6 | Share via link |
| FR37 | Epic 6 | Cookie consent |
| FR38 | Epic 6 | Data retention preferences |
| FR39 | Epic 6 | Report error mechanism |
| FR40 | Epic 6 | 48-hour dispute resolution |
| FR41 | Epic 6 | Last Verified timestamp |
| FR42 | Epic 6 | Estimated tag |
| FR43 | Epic 6 | AI disclaimer |

## Epic List

### Epic 1: Project Setup & Foundation
Initialize the development environment with all required tooling and architecture patterns (Next.js frontend + Node/Express backend).
**FRs covered:** AR1, AR2, AR3, AR4, AR5, AR6, AR7, AR8

### Epic 2: University Discovery & Comparison
Enable students to discover and compare universities based on their criteria.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8

### Epic 3: AI-Powered Recommendations
Provide personalized university recommendations based on student profiles.
**FRs covered:** FR9, FR10, FR11, FR12, FR13, FR14

### Epic 4: Data Visualization
Deliver interactive D3.js visualizations for ROI analysis.
**FRs covered:** FR15, FR16, FR17, FR18

### Epic 5: User Management
Handle authentication, profiles, and user data control.
**FRs covered:** FR19, FR20, FR21, FR22, FR23, FR24, FR25

### Epic 6: Admin & Compliance
Manage data verification, reporting, and regulatory compliance.
**FRs covered:** FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR37, FR38, FR39, FR40, FR41, FR42, FR43

## Epic 1: Project Setup & Foundation

Initialize the development environment with all required tooling and architecture patterns (Next.js frontend + Node/Express backend).
**FRs covered:** AR1, AR2, AR3, AR4, AR5, AR6, AR7, AR8

### Story 1.1: Initialize Next.js Frontend

As a Developer, I want to initialize a Next.js project with TypeScript, Tailwind, and ESLint, so that I have a modern, type-safe frontend foundation.

**Acceptance Criteria:**

**Given** a clean development environment
**When** I run `npx create-next-app@latest outvier --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
**Then** a Next.js project is created with TypeScript, Tailwind, and App Router enabled
**And** the project compiles without errors

### Story 1.2: Initialize Node/Express Backend

As a Developer, I want to initialize a Node.js + Express backend server, so that API logic is separate from the frontend.

**Acceptance Criteria:**

**Given** the Next.js frontend created
**When** I create a `server/` folder with `npm init` and install express, mongoose, cors, dotenv, helmet
**Then** an Express server runs on port 3001
**And** CORS is configured to allow frontend (localhost:3000) requests

### Story 1.3: Create Clean Architecture Folder Structure

As a Developer, I want to set up the Clean Architecture folder structure in the server/, so that the codebase follows the zero-dependency domain principle.

**Acceptance Criteria:**

**Given** the Express backend initialized
**When** I create folders `server/src/domain`, `server/src/application`, `server/src/infrastructure`, `server/src/routes`
**Then** the folder structure matches the architecture document
**And** each layer has appropriate subdirectories

### Story 1.4: Configure React Query and API Integration

As a Developer, I want to configure React Query for data fetching from the Express backend, so that the frontend can fetch and cache data efficiently.

**Acceptance Criteria:**

**Given** both frontend and backend initialized
**When** I install and configure React Query (TanStack Query)
**Then** React Query provider wraps the Next.js application
**And** API calls go to `http://localhost:3001/api/` endpoints

### Story 1.5: Set Up TypeScript Strict Mode and Validation

As a Developer, I want to enable TypeScript strict mode and create domain type guards in the backend, so that the Domain Layer has zero dependencies and tamper-proof validation.

**Acceptance Criteria:**

**Given** the project setup
**When** I enable strict mode in tsconfig.json and create domain type guards in server/src/domain
**Then** TypeScript enforces strict type checking
**And** domain entities use pure TypeScript validation (no external libraries)

### Story 1.6: Configure Deployment

As a Developer, I want to configure the project for deployment, so that the application meets the 99.9% uptime NFR.

**Acceptance Criteria:**

**Given** the project setup
**When** I configure Vercel for frontend deployment and Railway/Render for backend deployment
**Then** both services can be deployed independently
**And** environment variables are properly configured

**Acceptance Criteria:**

**Given** the project is ready for deployment
**When** I deploy to Vercel with auto-scaling configuration
**Then** the application is accessible at a Vercel URL
**And** auto-scaling is enabled for high-traffic periods

### Story 1.6: Set Up Development Tools (ESLint, Prettier, Git)

As a Developer, I want to configure ESLint, Prettier, and Git workflow, so that code quality is maintained consistently.

**Acceptance Criteria:**

**Given** the Next.js project
**When** I configure ESLint and Prettier with consistent rules
**Then** the development environment enforces code quality
**And** `.gitignore` and initial commit workflow is established

## Epic 2: University Discovery & Comparison

Enable students to discover and compare universities based on their criteria.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8

### Story 2.1: University Data Model and Seed Data

As a Developer, I want to create the University entity with MongoDB schema and seed 50 universities, so that the system has initial data for discovery.

**Acceptance Criteria:**

**Given** MongoDB is available
**When** I create the University schema with fields (name, country, city, ranking, tuition, scholarships, employmentRate, visaPathway, hiddenCosts)
**Then** the schema is stored in Infrastructure layer
**And** 50 sample universities are seeded with verified data

### Story 2.2: Budget Filter Implementation

As a Student, I want to filter universities by my budget range, so that I only see affordable options.

**Acceptance Criteria:**

**Given** universities exist in the database
**When** I enter a budget range (min/max) and apply the filter
**Then** only universities within my budget are displayed
**And** the filter works in combination with other filters

### Story 2.3: Country/Region Filter Implementation

As a Student, I want to filter universities by country or region, so that I can focus on my preferred destinations.

**Acceptance Criteria:**

**Given** universities exist in the database
**When** I select a country or region from the dropdown
**Then** only universities in that location are shown
**And** the filter can combine with budget and ranking filters

### Story 2.4: Ranking Tier Filter Implementation

As a Student, I want to filter universities by ranking tier (e.g., Top 50, Top 100), so that I can focus on schools that match my academic profile.

**Acceptance Criteria:**

**Given** universities exist with ranking data
**When** I select a ranking tier filter
**Then** only universities within that tier are displayed
**And** the filter combines with budget and country filters

### Story 2.5: Side-by-Side Comparison View

As a Student, I want to compare 2-5 universities side-by-side, so that I can evaluate my options visually.

**Acceptance Criteria:**

**Given** I have searched and found universities
**When** I select 2-5 universities and click "Compare"
**Then** a comparison table displays all selected universities
**And** key metrics (tuition, ranking, employment) are visible in columns

### Story 2.6: University Detail View

As a Student, I want to view detailed information for each university including tuition, hidden costs, and employment data, so that I can make informed decisions.

**Acceptance Criteria:**

**Given** I am viewing the university list or comparison
**When** I click on a university card
**Then** a detail view shows tuition, hidden costs (living, visa, insurance), and employment rate
**And** data freshness indicators ("Last Verified" or "Estimated") are displayed

## Epic 3: AI-Powered Recommendations

Provide personalized university recommendations based on student profiles.
**FRs covered:** FR9, FR10, FR11, FR12, FR13, FR14

### Story 3.1: Student Profile Input Form

As a Student, I want to input my academic profile (GPA, field of study) and budget constraint, so that the system can understand my preferences.

**Acceptance Criteria:**

**Given** I am on the dashboard
**When** I fill out the profile form (GPA, field of study, budget) and submit
**Then** my profile is captured and sent to the recommendation engine
**And** validation ensures all required fields are provided

### Story 3.2: Profile-to-University Matching Algorithm

As a System, I want to match student profiles to suitable universities based on budget and academic fit, so that students receive personalized recommendations.

**Acceptance Criteria:**

**Given** a student profile with GPA, field of study, and budget
**When** the matching algorithm processes the profile
**Then** universities are ranked by fit score (budget match, academic fit)
**And** results are returned within the performance NFR (<1s response)

### Story 3.3: Alternative University Suggestions

As a System, I want to suggest alternative universities when no exact matches are found, so that students have options even with tight constraints.

**Acceptance Criteria:**

**Given** no universities exactly match the student's criteria
**When** the matching algorithm finds no exact matches
**Then** the system suggests 3 universities with scholarships that come closest to criteria
**And** the suggestion explains why these are alternatives

### Story 3.4: ROI Calculation Display

As a Student, I want to see ROI calculations for each recommended university, so that I understand the long-term value of my investment.

**Acceptance Criteria:**

**Given** universities are recommended
**When** I view the recommendations
**Then** each university shows estimated ROI (years to break-even based on expected salary)
**And** the calculation is based on tuition + hidden costs vs. expected salary

### Story 3.5: Scholarship-Eligible Recommendations

As a Student, I want to see universities where I qualify for scholarships within my budget, so that I can maximize my chances of affordability.

**Acceptance Criteria:**

**Given** my profile and budget constraints
**When** the AI processes recommendations
**Then** scholarship-eligible universities are flagged and prioritized
**And** scholarship probability is displayed where applicable

## Epic 4: Data Visualization

Deliver interactive D3.js visualizations for ROI analysis.
**FRs covered:** FR15, FR16, FR17, FR18

### Story 4.1: D3.js ROI Comparison Chart

As a Student, I want to see D3.js-powered ROI comparison charts, so that I can visually compare universities.

**Acceptance Criteria:**

**Given** I have selected universities to compare
**When** the comparison view renders
**Then** a D3.js chart displays tuition vs. expected salary for each university
**And** chart renders within <200ms (NFR)

### Story 4.2: Break-Even Timeline Visualization

As a Student, I want to see a break-even timeline showing how many years to recover my investment, so that I understand the long-term financial commitment.

**Acceptance Criteria:**

**Given** ROI calculations are available
**When** I view the visualization
**Then** a timeline shows years-to-break-even for each university
**And** the visualization is color-blind friendly

### Story 4.3: Real-Time Chart Updates

As a Student, I want charts to update in real-time as I adjust filters, so that I can explore different scenarios instantly.

**Acceptance Criteria:**

**Given** the visualization is rendered
**When** I change filter values (budget, country, ranking)
**Then** the charts update immediately without page reload
**And** updates feel instantaneous (<200ms)

## Epic 5: User Management

Handle authentication, profiles, and user data control.
**FRs covered:** FR19, FR20, FR21, FR22, FR23, FR24, FR25

### Story 5.1: Guest Mode Access

As a Guest User, I want to access the dashboard and view university comparisons without logging in, so that I can try the service before committing.

**Acceptance Criteria:**

**Given** I am a new visitor
**When** I arrive at the landing page
**Then** I can immediately use budget input and see AI recommendations
**And** I can view comparisons without any authentication

### Story 5.2: Google OAuth Authentication

As a Student, I want to sign up/login using my Google account, so that I can quickly create an account with minimal friction.

**Acceptance Criteria:**

**Given** I am on the login page
**When** I click "Sign in with Google"
**Then** I am redirected to Google OAuth flow
**And** upon success, I am logged in and can save comparisons

### Story 5.3: Magic Link Email Authentication

As a Student, I want to receive a magic link via email to sign in, so that I don't need to remember a password.

**Acceptance Criteria:**

**Given** I am on the login page
**When** I enter my email and request a magic link
**Then** I receive an email with a secure magic link
**And** clicking the link logs me in (passwordless)

### Story 5.4: Save Comparisons Feature

As a Logged-in User, I want to save my university comparisons for later viewing, so that I can return to my research.

**Acceptance Criteria:**

**Given** I am logged in and viewing comparisons
**When** I click "Save Comparison"
**Then** the comparison is stored in my profile
**And** I can access it from my saved items

### Story 5.5: User Profile Management

As a Logged-in User, I want to create and manage my personal profile, so that my preferences are remembered.

**Acceptance Criteria:**

**Given** I am logged in
**When** I access my profile settings
**Then** I can update my name, academic profile, and preferences
**And** changes are saved immediately

### Story 5.6: GDPR - Export Data

As a User, I want to export all my personal data, so that I can exercise my data rights.

**Acceptance Criteria:**

**Given** I am logged in
**When** I click "Export My Data" in settings
**Then** I receive a downloadable file with all my personal data
**And** the format is machine-readable (JSON)

### Story 5.7: GDPR - Delete Account

As a User, I want to delete my account and all associated data, so that I can exercise my "Right to be Forgotten."

**Acceptance Criteria:**

**Given** I am logged in
**When** I click "Delete Account" and confirm
**Then** my account and all personal data are permanently deleted
**And** I receive confirmation of deletion

## Epic 6: Admin & Compliance

Manage data verification, reporting, and regulatory compliance.
**FRs covered:** FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR37, FR38, FR39, FR40, FR41, FR42, FR43

### Story 6.1: Admin Data Verification Dashboard

As an Admin, I want to view pending university data awaiting verification, so that I can review and approve accurate data.

**Acceptance Criteria:**

**Given** I am an admin user
**When** I access the admin dashboard
**Then** I see a list of university data in "Pending Verification" state
**And** each record shows source, timestamp, and key fields

### Story 6.2: Approve/Reject University Data

As an Admin, I want to verify or reject university data, so that only accurate data reaches production.

**Acceptance Criteria:**

**Given** I am viewing pending verification data
**When** I click "Verify" or "Reject"
**Then** approved data moves to Production database
**And** rejected data is flagged for correction with notes

### Story 6.3: Audit Timestamp & Version History

As a System, I want to track audit timestamps and maintain version history for all data changes, so that data integrity is maintained.

**Acceptance Criteria:**

**Given** university data exists
**When** any data is modified
**Then** audit_timestamp is updated and version history is created
**And** admins can view the complete change history

### Story 6.4: Data Rollback Capability

As an Admin, I want to roll back university data to a previous stable version, so that I can recover from incorrect updates.

**Acceptance Criteria:**

**Given** version history exists for a university
**When** I select a previous version and click "Rollback"
**Then** the data is restored to that version
**And** a new version entry is created recording the rollback

### Story 6.5: PDF Report Generation

As a Student, I want to generate a PDF comparison report, so that I can share it with parents/sponsors.

**Acceptance Criteria:**

**Given** I have selected universities to compare
**When** I click "Export PDF"
**Then** a PDF is generated with tuition, living costs, and visa roadmap
**And** the PDF is downloadable

### Story 6.6: Tamper-Proof PDF Verification

As a Parent, I want to verify that the PDF report hasn't been tampered with, so that I can trust the data accuracy.

**Acceptance Criteria:**

**Given** I received a PDF report
**When** I use the verification tool
**Then** I can confirm the PDF is authentic via verification hash
**And** any tampering is detected

### Story 6.7: Simplified Finance View for Parents

As a Parent, I want to view a simplified Total Cost of Ownership (TCO) view, so that I can understand the financial commitment.

**Acceptance Criteria:**

**Given** a comparison is shared with me
**When** I access the "Simplified Finance View"
**Then** I see TCO (tuition + living + visa) in simple terms
**And** safety ratings are displayed

### Story 6.8: Share Comparisons via Link

As a Student, I want to share my comparison via a unique link, so that I can easily share with family members.

**Acceptance Criteria:**

**Given** I have a saved comparison
**When** I click "Share"
**Then** a unique link is generated
**And** recipients can view the comparison without logging in

### Story 6.9: Cookie Consent Implementation

As a User, I want to see a cookie consent dialog with options, so that I can control my privacy preferences.

**Acceptance Criteria:**

**Given** I am a new visitor
**When** I arrive at the site
**Then** a cookie consent dialog appears
**And** I can choose "Strictly Necessary" or "Analytical" cookies

### Story 6.10: Data Dispute Reporting

As a User, I want to report incorrect university data, so that errors can be corrected.

**Acceptance Criteria:**

**Given** I am viewing university data
**When** I click "Report Error"
**Then** a dispute form is submitted
**And** the dispute appears in the admin dashboard

### Story 6.11: 48-Hour Dispute Resolution

As an Admin, I want to resolve data disputes within 48 hours, so that user-reported issues are addressed promptly.

**Acceptance Criteria:**

**Given** a data dispute exists
**When** I resolve the dispute with correction or explanation
**Then** the resolution is logged with timestamp
**And** the user is notified of the resolution

### Story 6.12: Data Freshness Indicators

As a System, I want to display "Last Verified" timestamps and "Estimated" tags, so that users know data reliability.

**Acceptance Criteria:**

**Given** university data is displayed
**When** I view any university card or detail
**Then** "Last Verified" timestamp is shown for verified data
**And** "Estimated" tag is shown for unverified data

### Story 6.13: AI Disclaimer Display

As a System, I want to display a disclaimer on all AI-generated ROI charts, so that users understand AI insights are for guidance only.

**Acceptance Criteria:**

**Given** I am viewing AI-generated ROI visualizations
**When** the chart renders
**Then** a disclaimer is visible: "AI-generated insights are for guidance only. Verify with university's official admissions office."