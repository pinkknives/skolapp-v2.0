# Skolapp Constitution

**Purpose**  
Bare-minimum, enforceable baseline for a single codebase delivering a secure, accessible, performant, and visually appealing application that can leverage AI-powered functionality. The app must be installable as a PWA on iOS and Android, and fully usable from modern desktop browsers.

## Core Principles

### I. Cross-Platform First
One responsive codebase (no platform-specific forks) must run in iOS Safari (current−1), Android Chrome (current−1), and modern desktop browsers (Chrome/Edge/Firefox current−1, Safari current). Feature acceptance requires: mobile touch viewport, desktop pointer viewport, and offline degraded mode on critical read screens.

### II. PWA Baseline
HTTPS only, valid Web App Manifest (name, icons ≥512px, theme/background colors), and a Service Worker that provides installability, an offline shell (HTML+CSS+JS+critical API cache), and a 10s timeout fallback to cached/placeholder. No feature ships if it breaks install/offline.

### III. Accessibility & Usability
WCAG 2.1 AA intent: semantic HTML, correct focus order, keyboard access, contrast ≥4.5:1, labelled forms. No motion that blocks tasks.

### IV. Security & Privacy by Default
Least privilege. All network calls go through a typed client (auth, CSRF if cookies, input validation/output encoding). No persistent PII client-side beyond session. Secrets server-side. Strict CSP (no inline/eval).

### V. Simplicity & Proven Patterns
Choose the simplest stable solution. Build small vertical slices with tests; refactor only on measurable duplication or perf thresholds.

### VI. AI Assistance
AI is an assistive, optional, transparent layer (quiz suggestions, instant feedback, summaries). No raw student data to third-party AI without anonymization/consent. AI must not compromise performance, offline or accessibility.

### VII. Identity & Roles
Two entry paths: **Teacher** (authenticated) and **Student** (pseudonymous join with code+nickname). RBAC prevents cross-role access. SSO preferred via OIDC/SAML (e.g., Skolfederation); fallback email/password with MFA for teachers.

### VIII. GDPR-First Compliance
Data minimization; EU data residency; encryption at rest/in transit; lawful basis documented (RoPA); DPAs/SCCs with processors; user rights (access, rectification, deletion, export) with SLA; no analytics/AI on raw student content without consent or lawful basis.

### IX. Community & Sharing
Opt‑in publishing of quizzes/templates with license metadata; moderation/reporting/unpublish/versioning; search/tagging; author attribution preserved.

## Platform & Architecture Constraints

1. Target Runtime Matrix:
   - iOS Safari (current−1)
   - Android Chrome (current−1)
   - Desktop: Chrome, Edge, Firefox (current−1), Safari (current)
2. Rendering: Mobile‑first (≤600px), touch targets ≥44px, no fixed px for interactive areas.
3. Tech Stack (baseline):
   - Frontend: TypeScript, React or Svelte with routing; minimal global state
   - Styling: CSS variables + light/dark theme tokens; prefers system color-scheme
   - API: JSON over HTTPS (REST/GraphQL), versionable
   - AI Integration: Optional AI features (quiz generation, automated feedback, result summaries) via a controlled API layer; anonymize student data; label AI output; AI must never block core flows
4. Authentication & Roles:
   - Teacher (authenticated, MFA/SSO) and Student (pseudonymous join) flows; RBAC across APIs/UI
   - Support SSO for schools via OIDC/SAML (e.g., Skolfederation)
5. Community Layer (optional but encouraged):
   - Organization/public sharing of quizzes/templates; license selection; moderation/reporting/unpublish/versioning
6. Integrations with Swedish School Systems:
   - Prefer standards-based federation (OIDC/SAML); roster/schedule imports where feasible
   - Controlled integration layer; explicit consent and documented data flows per connector
7. Subscriptions & Payments:
   - Web: Stripe; Mobile: App Store/Play via RevenueCat; entitlement caching resilient to network loss; clear cancellation paths
8. Data Residency & Compliance:
   - EU storage/processing, encryption at rest/in transit (TLS ≥1.2), key rotation; DPIA/RoPA; DPAs/SCCs; logs/analytics exclude student content by default
9. Performance Budgets (mid‑tier mobile, 4G): TTI ≤5s; initial JS <200KB gzip; LCP <2.5s
10. Offline: Core dashboard (read‑only) available via cached last‑known data or clear fallback
11. Error Handling: Actionable errors with retry; no console spam
12. Telemetry: Anonymous perf/error events by default; opt‑out if required by law

## Development Workflow & Quality Gates

1. Branch Strategy: `main` is deployable; feature branches require review and checks
2. Mandatory Checks per PR: lint + type‑check; unit+integration tests (≥80% critical modules); Lighthouse PWA & a11y ≥90; bundle diff <+10% or justification
3. GDPR & Security Checks: DPIA/RoPA maintained; EU data residency verified; DPA/SCC validation for vendors (hosting/analytics/AI/payments); RBAC tests; privacy UI for export/delete; TLS enforced; CSP without inline; dependency audit clean (no high/critical)
4. Commit Scope: Conventional Commits
5. Testing Pyramid Minimum: unit (logic), integration (API client + SW), E2E smoke (install, login, offline read)
6. Release: SemVer, changelog from commits, tag = build hash
7. Rollback: Keep previous production build (N−1) ready for instant switch

## Governance

1. Exceptions require dated written waiver with expiry
2. Amendments: PR labeled `constitution-change`; 2 approvals (perf/a11y + security); version bump
3. Verification: Review checklist covers a11y, performance budgets, offline, security
4. Deprecations: Migration note + runtime warning for one release unless security fix
5. Documentation: Each feature merges with a README/MDX (purpose, API surface, failure modes)
6. Acceptance Criteria Examples:
   - Teacher login: email/password + MFA and OIDC/SAML SSO when enabled; Student join: code + nickname without account
   - Community publishing: opt‑in share with license metadata; searchable; retractable; moderation present
   - Subscriptions: start/cancel in‑app; entitlements update ≤1 min; offline‑tolerant
   - Integrations: Skolfederation SSO tested; roster import/export documented; failure modes fail‑safe
7. Task Generation: For each feature, Spec Kit/tasks must cover frontend, backend/API, tests, compliance (GDPR/security), docs. No feature is complete until all are closed.
8. Standard Pull Request Checklist: Refer to `.github/pull_request_template.md` and keep in sync with this Constitution.

**Version**: 1.0.0 | **Ratified**: 2025-09-16 | **Last Amended**: 2025-09-16