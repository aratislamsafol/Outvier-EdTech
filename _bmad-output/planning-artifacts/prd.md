---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
inputDocuments: []
workflowType: 'prd'
---

# Product Requirements Document - Outvier EdTech Dashboard

**Author:** Arat
**Date:** 2026-04-07

## Executive Summary

Outvier is a web-based Comparative Analytics Dashboard that transforms unprocessed educational data into actionable financial decisions for students making high-stakes investment choices in higher education.

### What Makes This Special

Outvier solves the "affordability vs. outcome" information gap that existing ranking platforms ignore. Unlike static databases that present raw metrics, Outvier computes personalized ROI by combining:

- Tuition + hidden costs (living, materials, visa fees, health insurance, relocation)
- Employment probability by region/sector
- Program-specific salary projections
- Student's budget constraints and visa requirements

**Key Differentiators:**

- All-inclusive cost breakdown (not just tuition)
- Scholarship probability scoring
- Multi-currency normalization
- Visa pathway filtering
- Data freshness guarantee with verification workflow

### Risk Mitigation (Pre-mortem Insights)

- Auto-refresh data pipeline + manual verification
- Explicit AI input parameters for personalized outputs
- "Share comparison" feature for network effects
- Mobile-first D3.js optimization

### Stakeholder Considerations

- Privacy compliance (GDPR, education data sovereignty)
- Methodology transparency for ROI calculations
- University data verification partnerships

### Project Classification

| Attribute | Value |
|-----------|-------|
| Type | Web Application (SaaS) |
| Domain | EdTech / Higher Education Decision Support |
| Complexity | Moderate to High |
| Context | Brownfield (existing proposal.md) |

## Success Criteria

### User Success (Experience & Value)

- **Aha Moment:** The moment a student inputs their budget and academic profile, and the AI instantly generates a D3.js visualization showing which university offers the fastest ROI.
- **Completed Journey:** Student exports personalized comparison report as Secure PDF to share with parents/sponsors.
- **Time to Value:** Under 1 minute from landing to first meaningful university comparison.

### Technical Success (Engineering Excellence)

- **MVP Core:** University comparison engine built with Clean Architecture (Domain, Application, Infrastructure layers).
- **Non-Negotiables:**
  - **Security:** 100% Type-safe TypeScript with Zero-Dependency Domain Logic
  - **Performance:** Sub-1 second (<1s) page loads via Next.js SSR
  - **Code Quality:** "No Noisy Code" policy — no unused libraries, legacy boilerplate, or redundant logic

### Business Success (Growth & Metrics)

- **3-Month Goal:** 500+ active users, 100+ verified universities
- **Key Metric:** User Retention — percentage of students who create profiles and return for multiple sessions

### Product Scope

- **MVP:** Minimalist platform with 3 core pillars: Side-by-Side Comparison, ROI Calculator, Basic AI Program Recommender
- **Vision:** AI Career Consultant predicting global job market trends and long-term career pathways

## User Journey Mapping

### 1. Primary Journey: The "Fast-Track" Success Path

**Landing:** User arrives at minimalist page with single input: "Enter your study destination and total budget."

**Aha! Moment:** On 'Compare', AI Recommender matches profile → D3.js Visualization renders side-by-side ROI chart. User sees years-to-break-even based on local salary data.

**Export:** User selects top 2 choices → clicks "Secure Export" → generates tamper-proof PDF (tuition, living costs, visa-success roadmap) to share with parents/sponsors.

### 2. Edge Cases: Handling Failures Gracefully

| Scenario | System Action |
|----------|---------------|
| **No matches for budget** | AI suggests: "3 universities where you qualify for 20% scholarship to fit your range" |
| **Data outdated/missing** | University card shows "Last Verified" timestamp. Missing data shows "Estimated" tag + triggers admin update task |
| **User stuck on step** | "Need Help?" tooltip after 15s inactivity → 10-second ROI chart guide |

### 3. Secondary Users: Stakeholders & Partners

**Parents/Sponsors:**
- "Simplified Finance View" — TCO (Total Cost of Ownership) + Safety Ratings in clear, printable format

**University Partners (Phase 2):**
- Dedicated "Verification Dashboard" to update tuition fees and intake dates

### 4. Admin Flow: Data Integrity & Verification

| Stage | Action |
|-------|--------|
| **Ingestion** | Automated scrapers pull from official university portals |
| **Validation** | Data sits in "Pending Verification" state (Infrastructure layer) |
| **Human-in-loop** | Admin reviews via internal dashboard → "Verify" moves to Production DB |
| **Versioning** | Every change version-controlled — roll back to last stable version instantly |

### Journey Requirements Summary

- **Core capabilities:** University comparison, AI matching, D3.js ROI visualization, Secure PDF export
- **Error handling:** Graceful fallbacks with smart suggestions (not dead ends)
- **Secondary flows:** Simplified parent view, university partner dashboard
- **Admin capabilities:** Data verification workflow, versioning, audit trail

## Domain Requirements

### 1. Compliance & Regulatory

**Privacy (GDPR):**
- "Privacy by Design" approach
- Granular cookie consent: Strictly Necessary vs. Analytical
- User Entity includes `exportData()` and `deleteAccount()` methods — "Right to be Forgotten"

**Accessibility (WCAG 2.1):**
- High contrast ratios — non-negotiable
- Full keyboard navigation
- Semantic HTML + ARIA labels (or Radix UI)
- 100% screen reader compatibility

### 2. Technical Constraints

**Data Integrity:**
- Pipeline: Scraped → Pending Verification → Human Audit → Production
- Refresh frequency:
  - Tuition fees: Every 6 months
  - Employment data: Annual
  - Every record has `audit_timestamp`

**Internationalization:**
- Initial currencies: USD, GBP, EUR
- Auto-conversion via `Intl.NumberFormat` API
- Dynamic date/number formatting by user locale

### 3. Domain-Specific Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **AI recommendation liability** | Disclaimer on every ROI chart: "AI-generated insights are for guidance only. Verify with university's official admissions office." |
| **Data disputes** | "Report Error" feature on every university profile → Admin Dashboard → Resolved within 48 hours |
| **Transparency** | Published "Methodology" page detailing AI factor weightage (Tuition, Cost of Living, Salary Growth) |

## Innovation Focus

### Detected Innovation Areas

1. **The "Decision Engine" vs. "Search Engine"**
   - Traditional sites (QS, Times Higher Ed) provide static rankings
   - Outvier computes dynamic ROI — "what school costs you and earns you"
   - Moving from "finding a school" to "making a life-altering financial decision"

2. **Clean Architecture for EdTech**
   - Enterprise-grade security in student-focused product (rare in market)
   - Zero-dependency domain layer = tamper-proof financial calculations
   - Most EdTech prioritizes speed; Outvier prioritizes security + scalability

3. **Radical Transparency**
   - Hidden costs (insurance, visa fees, local inflation) — ignored by competitors, core to Outvier
   - All-inclusive TCO calculation as feature, not afterthought
   - Built-in verification workflow addresses data maintenance challenge

### Market Context & Competitive Landscape

- Existing players: QS World University Rankings, Times Higher Ed, College Board
- Gap: No "affordability vs outcome" decision support
- Outvier's position: First-mover in AI-driven ROI visualization for international students

### Validation Approach

- **MVP validation:** Track "time-to-first-insight" < 1 minute
- **Feature differentiation:** % users who export PDF (value recognition)
- **Retention:** Profile creation = trust in AI recommendations

### Risk Mitigation

- **Competitor copycat:** Moat is data pipeline + verification workflow + methodology transparency
- **AI inaccuracy:** Disclaimer on every chart + published methodology + human verification

## Project Type Analysis

### SaaS Specific Requirements

#### 1. Multi-tenancy: Single-App (B2C Focus)

- **Architecture:** Single-application for international students
- **Future-proofing:** Logical multi-tenancy principles — enables white-labeling for universities/institutions in Phase 2 without rewriting
- **Rationale:** Simple, secure, maintainable now → B2B scalable later

#### 2. Authentication: Hybrid Auth (Social + Passwordless)

- **Implementation:** NextAuth.js (Auth.js)
- **Providers:**
  - Google OAuth — lowest friction for international students
  - Magic Links (Email) — passwordless, eliminates credential stuffing risk
- **Security:** Auth decoupled from Domain layer, mapped to User Entity — ensures `exportData()` and `deleteAccount()` remain secure

#### 3. Session: Hybrid (Guest Mode + Persistent Accounts)

| Mode | Access | Trigger |
|------|--------|---------|
| **Guest** | Dashboard, budget input, AI ROI visualization | No auth required |
| **Persistent** | Save Comparison, Export Secure PDF | Auth required |

- **Rationale:** Lower barrier to "Aha! Moment" → drive retention via personalization

#### Technical Stack

- **Framework:** Next.js (SSR)
- **Auth:** NextAuth.js (Google OAuth + Magic Links)
- **Database:** MongoDB
- **Visualization:** D3.js
- **AI:** External API integration

## Project Scoping

### MVP Strategy & Philosophy

- **MVP Approach:** Problem-Solving MVP
- **Resource Requirements:** 5-person student team (full-stack, Clean Architecture)

### Phase 1: MVP (Weeks 1-8)

**Core Focus:** 50 Verified Universities + AI Matching

| Feature | Description |
|---------|-------------|
| **University Database** | 50 verified universities with tuition, employment data |
| **AI Matching** | Profile-to-university matching based on budget/country/ranking |
| **3 Filters** | Budget, Country, Ranking |
| **D3.js ROI Visualization** | Real-time side-by-side ROI charts |
| **Guest Mode** | Instant access without signup |

**Success Metric:** Time-to-first-insight < 1 minute

### Phase 2: Growth (Weeks 9-12)

| Feature | Description |
|---------|-------------|
| **Authentication** | NextAuth.js (Google OAuth + Magic Links) |
| **User Retention** | Saved comparisons, personalized profiles |
| **Database Expansion** | 100+ verified universities |
| **GDPR Compliance** | exportData(), deleteAccount() methods |
| **PDF Export** | Secure tamper-proof reports |

### Phase 3: Vision (Post-Launch)

| Feature | Description |
|---------|-------------|
| **Logical Multi-tenancy** | University Partner Portal for data updates |
| **AI Evolution** | Full Career Consultant with market predictions |
| **Scalability** | B2B white-label capabilities |

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Technical** | Clean Architecture reduces complexity; D3.js research in Week 1 |
| **Market** | MVP validates "affordability vs outcome" hypothesis with 50 unis |
| **Resource** | 5-person team with clear role splits; 1-week buffer for testing |

## Functional Requirements

### 1. University Discovery & Comparison

- FR1: Students can filter universities by budget range
- FR2: Students can filter universities by country/region
- FR3: Students can filter universities by ranking tier
- FR4: Students can view side-by-side comparison of 2-5 universities
- FR5: Students can view tuition costs for each university
- FR6: Students can view hidden costs (living, visa, insurance)
- FR7: Students can view employment rate data per university
- FR8: Students can view scholarship availability information

### 2. AI Recommendation Engine

- FR9: Students can input their academic profile (GPA, field of study)
- FR10: Students can input their total budget constraint
- FR11: System can match student profile to suitable universities
- FR12: System can suggest alternatives when no exact matches found
- FR13: System can display ROI calculation for each recommended university
- FR14: AI can recommend scholarship-eligible universities within budget

### 3. Data Visualization

- FR15: System can render D3.js ROI comparison charts
- FR16: Charts can display break-even timeline visualization
- FR17: Charts can show tuition vs expected salary comparison
- FR18: Visualization updates in real-time based on filter changes

### 4. User Management

- FR19: Guest users can access dashboard and view comparisons
- FR20: Users can create account via Google OAuth
- FR21: Users can create account via magic link (email)
- FR22: Users can save comparisons for later viewing
- FR23: Users can create personalized profiles
- FR24: Users can export their personal data (GDPR)
- FR25: Users can delete their account and associated data (GDPR)

### 5. Data Management (Admin)

- FR26: Admins can view pending verification university data
- FR27: Admins can verify and approve university data
- FR28: Admins can reject and flag data for correction
- FR29: System tracks audit timestamp for each data record
- FR30: System maintains version history for data changes
- FR31: Admins can roll back data to previous stable version

### 6. Reporting & Export

- FR32: Students can generate PDF comparison report
- FR33: PDF reports include tuition, living costs, visa roadmap
- FR34: PDF reports are tamper-proof (verification hash)
- FR35: Parents can view simplified finance view (TCO + Safety Rating)
- FR36: Users can share comparisons via unique link

### 7. Privacy & Compliance

- FR37: System displays cookie consent (Strictly Necessary vs Analytical)
- FR38: System respects user data retention preferences
- FR39: System provides data dispute reporting mechanism
- FR40: System resolves data disputes within 48 hours
- FR41: System displays "Last Verified" timestamp on university data
- FR42: System displays "Estimated" tag for unverified data
- FR43: System displays AI disclaimer on ROI charts

## Non-Functional Requirements

### Performance

| Metric | Target | Implementation |
|--------|--------|----------------|
| **Page Load** | < 1 second | Next.js SSR |
| **Chart Render** | < 200ms | D3.js direct DOM manipulation |
| **Data Fetching** | Instant after first load | SWR or React Query (caching) |

### Security

| Requirement | Implementation |
|-------------|----------------|
| **Input Validation** | Zod or TypeScript type guards in Domain Layer |
| **API Protection** | Rate limiting to prevent scrapers/bots |
| **Architecture** | Zero-dependency Domain Layer (tamper-proof) |

### Accessibility

| Feature | Requirement |
|---------|--------------|
| **Keyboard Navigation** | 100% functionality via Tab + Enter |
| **Screen Reader** | ARIA labels, Semantic HTML (Radix UI) |
| **Color Contrast** | WCAG 2.1 compliant, color-blind-friendly palette |
| **Motor Impairments** | Full keyboard-only operation |

### Reliability

| Metric | Target |
|--------|--------|
| **Uptime** | 99.9% |
| **Hosting** | Vercel or AWS with auto-scaling |
| **High-Traffic Periods** | January/September (application seasons)

## Document Polish