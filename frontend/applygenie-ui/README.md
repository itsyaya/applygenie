# ApplyGenie Frontend

Modern Next.js frontend for ApplyGenie with JWT auth, dashboard, resume and job tracking.

## Setup

1. `cd frontend/applygenie-ui`
2. `npm install`
3. `npm run dev`

## API Configuration

Set `NEXT_PUBLIC_API_BASE_URL` to your backend root, for example:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Features

- Landing page
- Register / login
- JWT auth stored in localStorage
- Protected dashboard
- Resume and job tracking
- React Query, Axios, Framer Motion, Tailwind CSS
