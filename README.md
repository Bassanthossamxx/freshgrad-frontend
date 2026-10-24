# FreshGrad — Frontend

AI career guidance for Egyptian fresh grads. Upload your CV and university curriculum, see which tech roles you're closest to, the exact skill gaps (backed by real Egyptian job postings), and a week-by-week plan to close them.

Built for the ALX hackathon — Graduate Employability vertical.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **TanStack Query** for server state, **Zod** for validating API responses
- Backend: FastAPI (separate repo) — this app talks to it over REST

## Getting started

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Open http://localhost:3000. With `NEXT_PUBLIC_USE_MOCKS=true` (default) the whole flow works with demo data, no backend needed. Try `/analysis/demo`.

| Script              | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Dev server on port 3000           |
| `npm run build`     | Production build                  |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | TypeScript check                  |
| `npm run format`    | Prettier (sorts Tailwind classes) |

## Environment

| Variable                | Default                 | Meaning                                 |
| ----------------------- | ----------------------- | --------------------------------------- |
| `NEXT_PUBLIC_API_URL`   | `http://localhost:8000` | FastAPI base URL                        |
| `NEXT_PUBLIC_USE_MOCKS` | `true`                  | `true` = demo data from `src/lib/mocks` |

## Architecture

Feature-based structure: each product step owns its API calls, hooks and components. `app/` only holds routing.

```
src/
├── app/                        # Routes only (thin pages)
│   ├── page.tsx                # Landing
│   ├── (app)/                  # Product flow, shared shell
│   │   ├── upload/             # 1. Upload CV + curriculum
│   │   ├── analysis/[sessionId]/  # 2. Skills, role matches, gaps
│   │   └── roadmap/[sessionId]/   # 3. Plan, project, career path
│   ├── error.tsx, not-found.tsx
│   └── globals.css             # Design tokens (swap for brand colors)
├── features/
│   ├── upload/                 # api.ts · hooks.ts · components/
│   ├── analysis/
│   ├── chat/                   # Gap discussion that updates the score
│   └── roadmap/
├── components/
│   ├── ui/                     # Primitives (Button, Card, Progress)
│   ├── layout/                 # Header, Container
│   └── providers.tsx           # React Query provider
├── lib/
│   ├── api/client.ts           # Typed fetch wrapper + ApiError
│   ├── api/query-keys.ts       # React Query keys
│   ├── mocks/data.ts           # Demo data
│   ├── env.ts                  # Validated env vars
│   └── utils.ts                # cn() etc.
├── config/                     # Site name, route helpers
└── types/api.ts                # API contract (Zod) — mirror of backend Pydantic models
```

### Data flow

`component → feature hook (React Query) → feature api.ts → lib/api/client.ts → FastAPI`

Each `api.ts` function returns mock data when `NEXT_PUBLIC_USE_MOCKS=true`, so UI work never waits on the backend.

### API contract (expected backend endpoints)

| Method | Path                                                         | Returns     |
| ------ | ------------------------------------------------------------ | ----------- |
| POST   | `/api/sessions` (multipart: `cv`, `curriculum?`, `industry`) | `Session`   |
| GET    | `/api/sessions/{id}/analysis`                                | `Analysis`  |
| POST   | `/api/sessions/{id}/role` `{ role_id }`                      | `Analysis`  |
| POST   | `/api/sessions/{id}/chat` `{ content }`                      | `ChatReply` |
| GET    | `/api/sessions/{id}/roadmap`                                 | `Roadmap`   |

Shapes live in `src/types/api.ts`. If the backend changes a model, update the schema there.

## Conventions

- Pages in `app/` stay thin; logic goes in `features/*`.
- Use `routes` from `src/config/routes.ts` instead of hardcoded paths.
- Use token classes (`bg-primary`, `text-muted-foreground`), not raw hex colors.
- Current screens are **placeholders** that prove the data flow; they'll be replaced by the UI/UX design.
