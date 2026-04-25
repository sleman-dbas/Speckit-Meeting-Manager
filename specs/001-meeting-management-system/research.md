# Research: Meeting Management System

## Decision: Service-Oriented Architecture

- **Chosen**: Separate NestJS backend service and React + Tailwind frontend.
- **Rationale**: This provides a clean separation between API, business rules, and UI behavior. It also supports robust role-based access control, confidentiality filtering, and independent testing.
- **Alternatives considered**: Full-stack monolith (Next.js) and backend-driven server rendering. Those were not chosen because the user explicitly requested a service-oriented architecture and because a separate API service better isolates audit logging, SMS notifications, and reporting.

## Decision: PostgreSQL + TypeORM

- **Chosen**: PostgreSQL with TypeORM for data persistence.
- **Rationale**: PostgreSQL offers strong relational support for meetings, participants, tasks, audit logs, and report aggregation. TypeORM matches the TypeScript-based NestJS stack and supports migrations, entity validation, and query safety.
- **Alternatives considered**: NoSQL document stores were rejected because relational joins and confidentiality filtering are easier to model in PostgreSQL.

## Decision: React + Tailwind CSS for frontend

- **Chosen**: React for UI and Tailwind CSS for styling.
- **Rationale**: React provides a responsive UI and component-driven architecture. Tailwind enables consistent styling and faster layout development while keeping design consistent across daily, weekly, and monthly calendar views.
- **Alternatives considered**: Component libraries such as Angular or Vue were not chosen because the prompt specifically requested React.

## Decision: Testing and quality tooling

- **Chosen**: Jest for unit testing, React Testing Library for frontend, and Cypress/Playwright for E2E. ESLint and Prettier for code quality.
- **Rationale**: These tools align with the updated constitution's requirements for code quality, comprehensive testing, and robust error handling.

## Licensing and security

- **Chosen**: Avoid any AGPL 3.0 libraries, use permissive or compatible open-source licenses.
- **Rationale**: The constitution explicitly forbids AGPL 3.0 dependencies.
- **Security note**: User-facing errors will never expose file paths or system internals. Sensitive details are logged internally only.
