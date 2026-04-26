# Meeting Management System

A NestJS + React meeting management platform with role-based access, participant tracking, minutes/tasks capture, SMS notifications, and audit logging.

## Project Structure

- `backend/`: NestJS API backend with TypeORM, PostgreSQL, authentication, audit logging, notifications, and meeting/task management.
- `frontend/`: React + Vite UI with Tailwind CSS, meeting creation, listing, and service integration.
- `db/`: Database migration files.
- `specs/`: Feature specification, plan, data model, contracts, and checklists.

## Requirements

- Node.js 20+
- PostgreSQL 15+
- npm

## Setup

1. Clone the repository:

```powershell
cd c:\Users\ASUS\my-project
```

2. Install backend dependencies:

```powershell
cd backend
npm install --legacy-peer-deps
```

3. Install frontend dependencies:

```powershell
cd ..\frontend
npm install --legacy-peer-deps
```

4. Create backend environment variables:

```powershell
cd ..\backend
copy .env.example .env
```

Update `backend/.env` with your PostgreSQL credentials and any SMS provider values.

## Running Locally

### Backend

```powershell
cd backend
npm run start:dev
```

The backend runs on `http://localhost:3000` by default.

### Frontend

```powershell
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Database Migrations

Run migrations from the backend folder:

```powershell
cd backend
npm run build
npx typeorm migration:run
```

## Scripts

### Backend

- `npm run start:dev` — run backend in development mode
- `npm run build` — compile backend TypeScript
- `npm run lint` — run ESLint on backend source files
- `npm run test` — run backend tests
- `npm run typecheck` — run TypeScript type checks

### Frontend

- `npm run dev` — run frontend in development mode
- `npm run build` — build the frontend app
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint on frontend source files
- `npm run test` — run frontend tests
- `npm run typecheck` — run TypeScript type checks

## Environment Variables

### Backend environment variables (`backend/.env`)

- `DATABASE_HOST` — PostgreSQL host
- `DATABASE_PORT` — PostgreSQL port
- `DATABASE_USER` — PostgreSQL user
- `DATABASE_PASSWORD` — PostgreSQL password
- `DATABASE_NAME` — PostgreSQL database name
- `JWT_SECRET` — JWT secret used by auth stubs
- `SMS_PROVIDER_API_KEY` — SMS provider API key placeholder
- `SMS_PROVIDER_SENDER` — SMS provider sender placeholder

### Frontend environment variables (`frontend/.env`)

- `VITE_API_BASE_URL` — backend API base URL (e.g. `http://localhost:3000/api`)
- `VITE_API_TOKEN` — optional default API token for local auth stubs

## Notes

- The backend uses `dotenv` to load `.env` values in development.
- Auth is currently implemented as a stub with static bearer tokens for roles.
- PostgreSQL credentials must match your local database configuration.

## Recommended Workflow

1. Start the backend.
2. Start the frontend.
3. Visit the frontend URL and create meetings.
4. Use the backend API for advanced meeting, participant, and task features.

## Contact

For development help, open an issue or contact the maintainer through your repository workflow.
