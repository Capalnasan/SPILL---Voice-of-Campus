# Spill — Project Progress Report

**Project:** Spill — Voice of Campus

**Stage:** Frontend prototype and product validation

**Updated:** October 21, 2026

## 1. Project overview

Spill is a pseudonymous campus community platform designed to help students share honest thoughts, ask questions, celebrate small wins, and take part in safer conversations.

The product combines the familiarity of a social feed with privacy-first posting, clear community rules, user-controlled safety tools, and a moderation workflow. Anonymous posts hide a student's identity from the public while preserving the accountability needed for future server-side abuse handling.

## 2. What has been completed

### Product experience

- Responsive public landing page introducing the Spill concept.
- Login and registration interfaces with client-side validation and feedback states.
- Main feed with **For you**, **Fresh**, and **Following** views.
- Full post composer with:
  - anonymous or public posting;
  - local photo selection, preview, and removal;
  - polls with two to four options;
  - optional content notes;
  - validation and success feedback.
- Interactive post cards with reactions, bookmarks, sharing controls, polls, and menus.
- Dedicated conversation pages with nested replies, sorting, reactions, and reply targeting.
- Explore, activity, saved posts, profile, settings, and moderation pages.
- Community rules, privacy policy, and terms pages.
- Light and dark themes with persisted system-aware preferences.
- Responsive desktop, tablet, and mobile layouts, including mobile header and bottom navigation.

### Local persistence and state

- Posts, replies, reactions, bookmarks, poll votes, and profile edits persist between refreshes.
- Local data is versioned and validated before it is restored.
- Existing version-one feed data is migrated without losing saved content.
- Replies remain attached to the correct conversation.
- Deleting a reply preserves its child replies and updates reply counts correctly.
- Anonymous posts are excluded from the public profile.
- Missing or deleted posts display explicit states instead of unrelated content.

### Latest milestone: preferences and activity

- The **Anonymous by default** preference now controls both the quick composer and full composer.
- The desktop **Your space** panel reflects whether anonymous mode is on or off.
- Legacy settings are migrated to the new versioned preference format.
- Activity read/unread state persists across navigation and browser refreshes.
- Navigation badges show the real unread activity count on desktop and mobile.
- Opening an activity marks only that item as read; **Mark all read** clears every unread item.
- Preference controls wait for local state hydration, preventing saved settings from overwriting a fast user action.

### Profile and identity

- Users can edit their display name and biography.
- Profile changes persist locally.
- Profile tabs display public posts, replies, and media.
- Anonymous content never appears as public profile content.

### Moderation and safety prototype

- Post menus include report, mute, block, edit, and delete actions where appropriate.
- The moderation dashboard demonstrates a review queue and moderation decisions.
- Success, error, empty, loading, and missing-content states are represented throughout the product.
- Product documentation defines the intended anonymity and moderation model.

## 3. Technical implementation

### Current stack

- **Next.js 16** with the App Router
- **React 19**
- **TypeScript** with strict type checking
- **CSS Modules** and shared design tokens
- **Lucide React** icons
- **Vitest** and React Testing Library
- **Playwright** for desktop and mobile browser testing
- **npm workspaces** in a monorepo structure

### Repository structure

```text
apps/web/        Next.js frontend application
apps/api/        Reserved for the future NestJS API
apps/mobile/     Reserved for a later mobile application
packages/        Reserved for shared UI, types, and API client code
docs/            Product, architecture, safety, and design documentation
prisma/          Database schema scaffold for the backend phase
```

### Frontend architecture

- Features are separated into feed, post, profile, activity, saved, settings, explore, and moderation modules.
- Shared application UI lives in reusable app, brand, theme, and UI components.
- A repository layer isolates local persistence from React components.
- The central provider coordinates the current single-device prototype state.
- Versioned repositories provide a migration path from local fixtures to a future API-backed implementation.

## 4. Quality and verification

The current frontend passes:

- ESLint with zero warnings;
- strict TypeScript checking;
- 10 unit and component tests;
- 20 Playwright end-to-end tests across desktop Chromium and a Pixel 7 mobile viewport;
- the optimized Next.js production build.

Automated browser coverage includes:

- entering and refreshing the feed;
- persistent light/dark themes;
- post and poll creation;
- voting, reactions, and bookmarks;
- photo preview and keyboard dismissal;
- conversation-specific nested replies;
- reply deletion and count updates;
- missing and deleted post handling;
- persisted profile edits and anonymous-profile privacy;
- synchronized anonymous defaults;
- persisted activity read state and dynamic unread badges;
- responsive moderation layout.

Rendered desktop and mobile views were also compared with the approved Spill design references. Typography, palette, navigation, spacing, controls, badges, and responsive behavior remain consistent with the established design system.

## 5. Suggested presentation demo

1. Start on the landing page and explain Spill's campus-community goal.
2. Enter the feed and show the desktop navigation and responsive layout.
3. Open the composer and create an anonymous spill with a poll or content note.
4. Vote, react, save the post, and open its conversation.
5. Add and target a reply, then refresh to demonstrate persistence.
6. Edit the local profile and explain why anonymous posts are excluded.
7. Open Settings, turn **Anonymous by default** off, and reopen the composer.
8. Show the live activity count, mark notifications as read, and refresh the page.
9. Open the moderation dashboard and describe the planned safety workflow.
10. Finish with the backend roadmap and MVP definition of done.

## 6. Current project boundary

The frontend is a functional, high-fidelity prototype. It intentionally uses browser-local data so the product experience can be validated before the backend contract is frozen.

The following capabilities are not yet production-backed:

- real authentication and user sessions;
- shared server-side data;
- PostgreSQL and Prisma migrations;
- server-side authorization and role enforcement;
- photo object storage;
- real notifications, reports, blocks, and mutes;
- API-backed moderation and audit history;
- CI, monitoring, backups, and production deployment.

## 7. Next planned work

### Remaining frontend refinement

1. Add a report-reason form and reviewable local report records.
2. Make mute and block preferences reversible from Settings.
3. Add confirmation before deleting an entire spill.
4. Complete account-recovery screens and verify every authentication link.
5. Run a focused accessibility pass for tabs, menus, dialogs, and keyboard focus.
6. Obtain final frontend approval before beginning backend implementation.

### Backend phase after approval

1. Freeze the API contract and consistent error format.
2. Design the PostgreSQL schema with Prisma.
3. Scaffold the NestJS API, health checks, validation, logging, and OpenAPI documentation.
4. Implement secure authentication and authorization.
5. Replace local prototype data one feature at a time with persisted API data.
6. Complete production moderation, testing, CI, deployment, monitoring, and backup processes.

## 8. Current outcome

Spill now demonstrates its complete primary frontend experience on desktop and mobile. The core product idea, design language, anonymous posting model, conversation flow, local persistence, profile privacy, activity system, and moderation direction can all be presented and tested in a real browser.

The project is ready for the remaining frontend safety and accessibility refinements, followed by explicit approval to begin the backend contract and persistence phases.
