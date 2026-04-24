# Spill - Voice of the Campus

Spill is an anonymous but verified reporting platform for the Universitatea Politehnica Timisoara community. Students, teachers, assistants, and staff can report real academic and campus-related issues while remaining anonymous inside the app.

## Project Structure

```text
.
├── apps
│   ├── api              # Node.js / NestJS backend API
│   ├── mobile           # React Native mobile app
│   └── web              # React web app
├── database             # PostgreSQL schema, migrations, seeds
├── docs                 # Product, architecture, security, and AI docs
├── infra                # Deployment and local infrastructure config
├── packages
│   ├── shared           # Shared types, constants, schemas
│   └── ui               # Shared UI ideas/components between apps
└── scripts              # Utility scripts for development and automation
```

## Core Modules

- Verified university authentication
- Anonymous post creation
- AI relevance and clarity review
- Moderated public feed
- Sensitive-case manual review
- Three-key identity reveal mechanism
- Weekly and monthly institutional reports

## Suggested Stack

- Web: React
- Mobile: React Native
- Backend: Node.js / NestJS
- Database: PostgreSQL
- AI: moderation, rewrite guidance, categorization, and report summaries
