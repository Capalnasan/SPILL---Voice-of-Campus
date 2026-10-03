# What is next for Spill

This file is the working roadmap from the completed frontend prototype to a production-ready MVP. Phase 1 is finished and frozen; backend work starts only after explicit approval.

## Working agreement

- Implement product changes directly in the application.
- Do not generate design concepts or preview images unless explicitly requested.
- Keep the current frontend behavior and visual contract stable while the backend is introduced.
- Update this roadmap whenever a phase or material task is completed.

## Current state

Already implemented:

- Next.js 16 and React 19 web application in `apps/web`.
- Public landing page, login/register screens, feed, composer, post replies, explore, activity, saved posts, profile, settings, moderation dashboard, and policy pages.
- Responsive desktop and mobile layouts.
- Persisted light/dark theme with system preference fallback and no-flash startup.
- Mock posts/replies and interactive client-side state persisted in `localStorage`.
- Design concepts and tokens under `docs/design`.
- ESLint, TypeScript type-check, unit-test, Playwright, and production-build scripts.
- Component tests for authentication validation, the composer, post actions, and moderation.
- Desktop and mobile smoke tests for theme persistence, photo handling, posting, polls, reactions, bookmarks, replies, keyboard operation, and responsive moderation.

Still simulated or empty:

- Authentication and user sessions.
- All server-side data and API calls.
- PostgreSQL/Prisma schema and migrations.
- Post, reply, reaction, bookmark, notification, report, and moderation persistence.
- Server-side photo uploads and poll persistence.
- Authorization and admin role enforcement.
- CI, monitoring, and deployment configuration.
- `apps/api`, `apps/mobile`, `packages/*`, `prisma/schema.prisma`, `.env.example`, and `docker-compose.yml` are still scaffolds.

## Phase 0 — Protect the work

- [x] Initialize Git and connect this folder to the existing GitHub repository.
- [x] Commit the current frontend as the baseline before backend work begins.
- [x] Keep generated folders out of source control: `.next`, `node_modules`, test reports, screenshots, preview artifacts, and TypeScript build info.
- [ ] Decide whether `apps/mobile` is part of the MVP. Recommendation: finish the responsive web MVP first and treat mobile as a later phase.

Exit condition: the current frontend can be restored from version control.

## Phase 1 — Finish and freeze the frontend — COMPLETE

### Visual and responsive QA

- [x] Review `/`, `/feed`, `/post/midnight-library`, `/explore`, `/activity`, `/saved`, `/profile`, `/settings`, `/login`, `/register`, and `/admin` in a real browser.
- [x] Check at minimum 1440 × 1024, 1024 × 768, 768 × 1024, and 390 × 844 viewports.
- [x] Compare the landing, feed, and mobile flow against the light and dark concepts in `docs/design`.
- [x] Fix clipping, accidental wrapping, inconsistent spacing, modal overflow, bottom-navigation overlap, and missing focus states.
- [x] Verify reduced-motion behavior and keyboard-only navigation.

### Complete the frontend-only interactions

- [x] Make photo attachment selection work locally, including preview and removal.
- [x] Implement the complete poll editor: question, 2–4 options, validation, preview, and vote state.
- [x] Add content-note input and rendering.
- [x] Add post menu UI for report, mute, block, edit, and delete actions.
- [x] Add confirmation/success/error states for login, registration, post creation, replies, reports, and moderation actions.
- [x] Add loading skeletons and explicit empty/error states for every data surface.
- [x] Decide which settings are MVP features and remove controls that will not be supported by the first backend.

### Frontend cleanup

- [x] Consolidate the duplicate brand components under `src/components/brand` and `src/components/app`.
- [x] Move repeated page headings and empty states into shared UI primitives; keep feature-specific controls local when their behavior differs.
- [x] Replace direct fixture imports with a temporary repository interface so the API implementation can be swapped in cleanly.
- [x] Add ESLint and a `lint` script.
- [x] Add component tests for the composer, post actions, auth validation, and moderation queue.
- [x] Add a Playwright smoke test for the main flow: open feed → create post → react → save → open post → reply.

Exit condition: complete. The frontend has no knowingly inert core controls and passes lint, type-check, component tests, Playwright tests, production build, responsive QA, and the production dependency audit. The UI contract is now frozen until a requested product change requires an update.

## Phase 2 — Lock the backend contract

Recommended backend for the existing scaffold:

- NestJS API in `apps/api`.
- PostgreSQL as the source of truth.
- Prisma for schema, migrations, and database access.
- HTTP-only cookie sessions or short-lived access tokens plus rotating refresh tokens.
- S3-compatible object storage for photos.
- Redis only when needed for rate limiting, session revocation, queues, or feed caching; it is not required on day one.

Before coding:

- [ ] Write the API resource list and request/response shapes.
- [ ] Define a consistent error envelope with machine-readable codes.
- [ ] Decide pagination conventions. Recommendation: cursor pagination for feeds, replies, activity, and moderation queues.
- [ ] Define upload constraints: MIME types, maximum size, dimensions, and retention.
- [ ] Define roles: `USER`, `MODERATOR`, and `ADMIN`.
- [ ] Define how anonymous posts work internally and publicly.

Important anonymity rule: anonymous should mean hidden from other users, not untraceable to the safety system. Store the author relationship securely for abuse handling, but never expose it in public API responses.

Exit condition: frontend and backend can be developed against a written, stable contract.

## Phase 3 — Design the database

Create the Prisma schema and migrations for at least:

- [ ] `User` — account status, role, verification state, timestamps.
- [ ] `Profile` — username, display name, bio, avatar, campus/community visibility.
- [ ] `Session` or `RefreshToken` — rotation, expiry, revocation metadata.
- [ ] `Community` and `CommunityMember` — membership and moderation roles.
- [ ] `Topic` and post-topic relationships.
- [ ] `Post` — body, visibility, anonymous flag, content note, status, timestamps.
- [ ] `PostMedia` — storage key, MIME type, dimensions, alt text.
- [ ] `Poll`, `PollOption`, and `PollVote`.
- [ ] `Comment` — parent comment for threaded replies, status, timestamps.
- [ ] `PostReaction` and `CommentReaction` with uniqueness constraints.
- [ ] `Bookmark` with a unique user/post constraint.
- [ ] `Follow` for users and/or topics, depending on the final feed rules.
- [ ] `Notification` — type, actor, target, read timestamp.
- [ ] `Report` — reporter, target type/id, reason, evidence, status.
- [ ] `ModerationAction` — moderator, decision, reason, target, audit timestamp.
- [ ] `Block` and `MutedWord`.

Database requirements:

- [ ] Add indexes for feed ordering, comment lookup, notification lookup, moderation status, and text search.
- [ ] Use soft deletion for moderated user content where auditability is required.
- [ ] Add seed data matching the current frontend fixtures.
- [ ] Test migrations from an empty database and document the reset/seed workflow.

Exit condition: a fresh PostgreSQL database can be migrated and seeded with one command.

## Phase 4 — Build the API foundation

- [ ] Scaffold `apps/api` with NestJS and strict TypeScript.
- [ ] Add configuration validation; fail startup when required environment variables are missing.
- [ ] Add Prisma integration with clean shutdown handling.
- [ ] Add global DTO validation, serialization, exception filters, and request IDs.
- [ ] Add `/health/live` and `/health/ready` endpoints.
- [ ] Generate OpenAPI/Swagger documentation.
- [ ] Add CORS and secure cookie configuration for local and deployed environments.
- [ ] Add structured logging with secrets and personal data redacted.
- [ ] Fill `.env.example` with names and safe examples, never real credentials.
- [ ] Fill `docker-compose.yml` with the API, PostgreSQL, and optional Redis services.

Exit condition: the API starts locally, connects to the database, exposes health/docs endpoints, and has a repeatable developer setup.

## Phase 5 — Authentication, identity, and authorization

- [ ] Register with email and password, validate input, and hash passwords with Argon2id.
- [ ] Log in, refresh sessions, log out, and revoke all sessions.
- [ ] Add email verification and password-reset flows.
- [ ] Protect app routes and redirect signed-out users to `/login`.
- [ ] Implement role guards for moderator/admin endpoints.
- [ ] Add account suspension and deletion flows.
- [ ] Add login and registration rate limits.
- [ ] Prevent username enumeration and return safe auth errors.
- [ ] Add CSRF protection if authentication is cookie-based.

Exit condition: a real user can safely register, verify, sign in, refresh, sign out, and access only authorized routes.

## Phase 6 — Core social features

Implement and test in this order:

1. [ ] Profiles and current-user endpoint.
2. [ ] Create/read/edit/delete posts.
3. [ ] Feed pagination and `For you`, `Fresh`, and `Following` behavior.
4. [ ] Threaded replies with safe maximum depth.
5. [ ] Reactions with idempotent toggle behavior.
6. [ ] Bookmarks.
7. [ ] Search for posts, topics, and people.
8. [ ] Photo upload and deletion.
9. [ ] Poll creation and one-vote-per-user enforcement.
10. [ ] Notifications and read/unread state.
11. [ ] Profile follow/unfollow and topic/community membership.

For every mutation:

- Validate ownership and authorization on the server.
- Return the updated canonical resource.
- Record audit data when moderation or privacy may be involved.
- Add integration tests for success, invalid input, unauthenticated access, and forbidden access.

Exit condition: the complete primary loop works using persisted data instead of fixtures.

## Phase 7 — Moderation and safety

This is an MVP requirement for an anonymous community product, not a later enhancement.

- [ ] Submit reports for posts, replies, and users.
- [ ] Implement block, mute, and muted-word filtering.
- [ ] Build a real moderation queue with filters and cursor pagination.
- [ ] Add moderator actions: dismiss, warn, remove content, suspend user, restore content.
- [ ] Record every moderation decision in an immutable audit trail.
- [ ] Prevent moderators from learning anonymous author identity unless their role and the case explicitly require it.
- [ ] Add server-side spam controls and per-action rate limits.
- [ ] Add content length, upload, and duplicate-post protections.
- [ ] Define escalation rules for threats, self-harm, illegal content, and personal-information exposure.
- [ ] Replace the draft policy pages with reviewed community rules, privacy policy, and terms.

Exit condition: users can protect themselves, reports reach moderators, and every moderation action is authorized and auditable.

## Phase 8 — Connect the frontend to the API

- [ ] Create `packages/api-client` from the OpenAPI schema or a typed manual client.
- [ ] Add one server-state solution. Recommendation: TanStack Query for client mutations, caching, retries, and optimistic updates.
- [ ] Replace `mock-data.ts` and `SpillProvider` persistence one feature at a time.
- [ ] Keep only ephemeral UI state in React context; server data should live in the query/cache layer.
- [ ] Add authenticated route handling without flashing protected content.
- [ ] Add optimistic reactions, bookmarks, post creation, and replies with rollback on failure.
- [ ] Add upload progress and recoverable failure messages.
- [ ] Make all loading, empty, error, offline, and retry states visible and accessible.
- [ ] Connect the admin dashboard only to role-protected moderation endpoints.
- [ ] Remove all `frontend-only`, `backend hookup`, and mock-data messages when their real behavior exists.

Exit condition: refreshing the browser preserves all real data, different users see correct authorization boundaries, and no product feature relies on `localStorage` as its source of truth.

## Phase 9 — Testing and quality gates

### Automated tests

- [ ] Unit tests for business rules, DTO validation, and utility functions.
- [ ] API integration tests against a disposable PostgreSQL database.
- [ ] Authorization tests for every protected operation.
- [ ] End-to-end tests for registration/login, posting, replying, reacting, saving, reporting, and moderation.
- [ ] Accessibility checks with axe for public, auth, feed, composer, and moderation screens.
- [ ] Visual regression screenshots for the landing page, desktop feed, mobile feed, composer, and post detail.

### Required CI checks

- [ ] Install with the lockfile.
- [ ] Lint.
- [ ] Type-check.
- [ ] Unit/integration tests.
- [ ] Production build.
- [ ] End-to-end smoke test.
- [ ] Prisma migration validation.
- [ ] Dependency and secret scanning.

Exit condition: a pull request cannot merge when a required quality gate fails.

## Phase 10 — Production and deployment

- [ ] Choose hosting for the web app, API, PostgreSQL, object storage, and optional Redis.
- [ ] Add production Dockerfiles and complete `infrastructure` only for the chosen platform.
- [ ] Configure separate development, staging, and production environments.
- [ ] Store secrets in the hosting provider, not in Git or images.
- [ ] Run database migrations as a controlled deployment step.
- [ ] Configure HTTPS, trusted proxy settings, secure cookies, CSP, HSTS, and restrictive CORS.
- [ ] Add database backups and verify a restore.
- [ ] Add error tracking, structured log collection, uptime checks, and basic product metrics.
- [ ] Define data retention, account deletion, and incident-response procedures.
- [ ] Run a staging smoke test before every production promotion.

Exit condition: staging and production are reproducible, monitored, backed up, and recoverable.

## Phase 11 — Mobile app, after the web MVP

- [ ] Confirm the mobile scope and whether Expo/React Native remains the preferred stack.
- [ ] Reuse `packages/api-client`, types, validation, and design tokens.
- [ ] Build authentication, feed, composer, post detail, activity, profile, and settings first.
- [ ] Add push notifications only after server notification semantics are stable.
- [ ] Add mobile-specific accessibility, offline, deep-link, and store-release testing.

## Recommended implementation order by sprint

### Sprint 1 — Frontend sign-off and contracts

- [x] Finish and verify Phase 1.
- [x] Protect the frontend baseline with Git before backend implementation.
- [ ] Lock API shapes from Phase 2.
- [ ] Initialize CI basics.

### Sprint 2 — Data and API foundation

- Complete Phases 3 and 4.
- Deliver migrations, seed data, health endpoints, OpenAPI, and Docker Compose.

### Sprint 3 — Authentication and persisted feed

- Complete Phase 5.
- Implement profiles, posts, feed pagination, and replies from Phase 6.
- Connect those flows to the frontend.

### Sprint 4 — Engagement and media

- Implement reactions, bookmarks, search, uploads, polls, and notifications.
- Complete their frontend integration and error states.

### Sprint 5 — Safety and administration

- Complete Phase 7.
- Connect and secure the moderation dashboard.
- Review community rules and privacy behavior.

### Sprint 6 — Quality and release

- Complete Phases 9 and 10.
- Run accessibility, performance, security, backup/restore, and staging acceptance tests.

## MVP definition of done

Spill is ready for an MVP release only when all of the following are true:

- A user can register, verify, sign in, sign out, and recover access.
- A signed-in user can create, edit, delete, browse, search, react to, save, and reply to persisted posts.
- Anonymous posts hide identity from other users while remaining safely accountable on the server.
- Users can block, mute, and report content or accounts.
- Authorized moderators can review reports and take audited actions.
- The application enforces authorization server-side, rate-limits abuse-prone operations, and handles uploads safely.
- Desktop and mobile web flows meet accessibility and visual QA requirements.
- Type-check, lint, tests, production build, migrations, and end-to-end smoke tests pass in CI.
- Production has HTTPS, secure secrets, logs, error tracking, uptime checks, and verified database backups.
- No core user flow depends on fixtures, `localStorage`, inert buttons, or placeholder backend messages.

## The next concrete task

Phase 1 is complete. Do not begin backend implementation until approval is given.

When backend work is approved:

1. Decide whether `apps/mobile` belongs in the MVP; the current recommendation is responsive web first.
2. Complete Phase 2 in a new `docs/api-contract.md` file.
3. Define resources and request/response shapes for authentication, users, profiles, posts, media, polls, replies, reactions, bookmarks, follows, activity, notifications, reports, blocks, mutes, and moderation actions.
4. Define the error envelope, cursor pagination, upload limits, roles, anonymous-post privacy rules, and authorization expectations.
5. Review and freeze that contract before creating the Prisma schema or NestJS endpoints.
