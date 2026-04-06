# Chat App

Real-time chat application (MVP-version) built with React, TypeScript and Supabase, 
structured using Feature-Sliced Design (FSD).

## Tech Stack

- **React + TypeScript**
- **Vite**
- **Zustand** (client/realtime state)
- **React Query** (server state & caching)
- **Supabase** (auth, database, realtime, storage)
- **Tailwind CSS**
- **Vitest + RTL**
- **Playwright**

---

## Features

- Authentication (sign up / sign in / sign out)
- Real-time messaging
- Chat list & users list
- Message history
- Typing indicators
- Online/offline status
- Last seen tracking
- Profile editing (avatar, username, about)

---

## Architecture

The project follows **Feature-Sliced Design**:

```
src/
  app/
  entities/
  features/
  widgets/
  shared/
```

### State separation

- **Zustand** → UI + realtime state (typing indicator, online/offline presence)
- **React Query** → server state

### Realtime flow

1. User action → mutation
2. Supabase updates data
3. Realtime event received
4. React Query cache updates
5. UI re-renders

---

## Getting Started

### Install

```
npm install
```

### Run

```
npm run dev
```

### Build

```
npm run build
```

---

## Environment

Create `.env`:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

---

## Testing

### Unit / Component

```
npm run test:run
```

### E2E

```
npm run e2e
```

First run:

```
npx playwright install
```

---

## Lint

```
npm run lint
```

---

## Notes

- Realtime-first architecture (no polling)
- Clear separation between client and server state
- Structure designed for scalability without over-engineering

