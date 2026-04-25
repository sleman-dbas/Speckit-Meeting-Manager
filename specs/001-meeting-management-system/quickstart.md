# Quickstart: Meeting Management System

## Prerequisites

- Node.js 20+ installed
- PostgreSQL 15+ database available
- npm or yarn installed
- SMS provider credentials (Twilio-compatible or another provider)

## Setup

1. Clone the repository and switch to the feature branch:

```powershell
cd c:\Users\ASUS\my-project
git checkout 001-meeting-management-system
```

2. Configure environment variables for backend and frontend.

```powershell
# backend/.env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=app_user
DATABASE_PASSWORD=secure_password
DATABASE_NAME=meeting_management
SMS_PROVIDER_API_KEY=...
SMS_PROVIDER_SENDER=...
JWT_SECRET=...

# frontend/.env
VITE_API_BASE_URL=http://localhost:3000/api
```

3. Install dependencies:

```powershell
cd backend
npm install
cd ..\frontend
npm install
```

4. Initialize the database:

```powershell
cd backend
npm run typeorm migration:run
```

## Running Locally

- Start backend:

```powershell
cd backend
npm run start:dev
```

- Start frontend:

```powershell
cd frontend
npm run dev
```

## Testing

- Run backend tests:

```powershell
cd backend
npm test
```

- Run frontend tests:

```powershell
cd frontend
npm test
```

- Run end-to-end tests:

```powershell
cd frontend
npm run e2e
```

## Quality Checks

- Lint backend and frontend:

```powershell
cd backend
npm run lint
cd ..\frontend
npm run lint
```

- Run type checks:

```powershell
cd backend
npm run typecheck
cd ..\frontend
npm run typecheck
```

## Notes

- Ensure no AGPL 3.0 dependencies are introduced.
- User-facing error messages must never expose system internals or file paths; use internal logs for diagnostics.
- Follow the updated constitution for documentation, testing, and security standards.
