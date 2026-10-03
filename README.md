# Spill

Spill is a pseudonymous community conversation app designed for honest campus talk with clear safety controls. This repository currently contains the frontend prototype only; backend/API work is intentionally deferred.

## Frontend

The web app lives in `apps/web` and uses Next.js 16, React 19, TypeScript, CSS Modules, and local fixture state.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the public landing page or `http://localhost:3000/feed` for the product demo.

Useful checks:

```bash
npm run typecheck
npm run build
```

## Implemented frontend routes

- `/` — public landing page
- `/login`, `/register` — frontend-only authentication flow
- `/feed` — interactive feed and post composer
- `/post/[id]` — threaded conversation and replies
- `/explore`, `/activity`, `/saved`, `/profile`, `/settings` — supporting product surfaces
- `/admin` — frontend-only moderation queue demo
- `/community-rules`, `/privacy`, `/terms` — public trust pages

The mock data and local interactions are deliberately isolated in `apps/web/src/data` and `apps/web/src/providers` so a future API layer can replace them without redesigning the interface.
