# Tasks: Meeting Management System

**Input**: Design documents from `/specs/001-meeting-management-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, repository structure, and shared tooling.

- [ ] T001 Create backend project structure in backend/src with modules for meetings, participants, tasks, notifications, audit, auth, and common utilities
- [X] T002 Create frontend project structure in frontend/src with folders for components, pages, services, hooks, and styles
- [X] T003 Initialize backend/package.json and install NestJS, TypeORM, pg, class-validator, Jest, ESLint, and Prettier dependencies
- [X] T004 Initialize frontend/package.json and install React, Tailwind CSS, React Router, Axios, React Testing Library, ESLint, and Prettier dependencies
- [X] T005 [P] Create root configuration files: backend/tsconfig.json, frontend/tsconfig.json, backend/.eslintrc.js, frontend/.eslintrc.js, .prettierrc
- [X] T006 [P] Create backend/.env.example and frontend/.env.example with placeholder database and API values

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement core backend infrastructure required by all user stories.

- [X] T007 Setup PostgreSQL connection and TypeORM configuration in backend/src/ormconfig.ts
- [X] T008 Create backend/src/common/config/config.module.ts and config service for environment-based settings
- [X] T009 Implement backend/src/common/logging/logging.service.ts and global error handling interceptor in backend/src/common/interceptors/error.interceptor.ts
- [X] T010 Implement backend/src/auth/auth.module.ts, auth.service.ts, and auth.guard.ts for role-based access control
- [X] T011 Create backend/src/audit/audit.entity.ts and backend/src/audit/audit.module.ts for audit log persistence
- [X] T012 Create backend/src/notifications/notifications.module.ts and notifications.service.ts for SMS message queuing
- [X] T013 Create initial database migration in db/migrations/0001-initial-schema.ts
- [X] T014 [P] Create backend/src/common/guards/roles.guard.ts and backend/src/common/decorators/roles.decorator.ts
- [X] T015 [P] Implement frontend/src/services/apiClient.ts and authentication token handling for API requests

## Phase 3: User Story 1 - Schedule Meetings (Priority: P1) 🎯 MVP

**Goal**: Enable organizers to create, update, and view meetings with required metadata and confidentiality levels.

**Independent Test**: Verify that a meeting can be created, updated, and listed, and that confidentiality level and status are persisted.

- [X] T016 [P] [US1] Create backend/src/meetings/entities/meeting.entity.ts with fields for title, description, date, startTime, durationMinutes, location, confidentialityLevel, status, organizerId, minutes, outcomes, proposals, createdAt, updatedAt
- [X] T017 [P] [US1] Create backend/src/meetings/dto/create-meeting.dto.ts and update-meeting.dto.ts with validation decorators
- [X] T018 [US1] Implement backend/src/meetings/meetings.service.ts with createMeeting, updateMeeting, getMeetings, and getMeetingById methods
- [X] T019 [US1] Implement backend/src/meetings/meetings.controller.ts with POST /api/meetings, PATCH /api/meetings/:id, and GET /api/meetings endpoints
- [X] T020 [US1] Implement frontend/src/components/MeetingForm.tsx for meeting creation and editing
- [X] T021 [US1] Implement frontend/src/pages/MeetingsPage.tsx to display meeting list and create/edit controls
- [X] T022 [US1] Implement frontend/src/services/meetingService.ts for API calls to /api/meetings
- [X] T023 [US1] Add backend audit logging for meeting create and update operations in backend/src/audit/audit.service.ts
- [X] T024 [US1] Add validation and user-friendly error handling for meeting create/update in backend/src/meetings/meetings.controller.ts and frontend/src/components/MeetingForm.tsx

## Phase 4: User Story 2 - Manage Meeting Participants (Priority: P1)

**Goal**: Allow organizers to add, manage, and associate participants with meetings.

**Independent Test**: Verify participants can be added to a meeting and are linked correctly for notifications.

- [ ] T025 [P] [US2] Create backend/src/participants/entities/participant.entity.ts with meetingId, userId, role, responseStatus, phoneNumber, createdAt, updatedAt
- [ ] T026 [P] [US2] Create backend/src/participants/dto/add-participants.dto.ts with validation for participant input
- [ ] T027 [US2] Implement backend/src/participants/participants.service.ts with addParticipants and listParticipants methods
- [ ] T028 [US2] Implement backend/src/participants/participants.controller.ts with POST /api/meetings/:id/participants
- [ ] T029 [US2] Implement frontend/src/components/ParticipantList.tsx to add and display meeting participants
- [ ] T030 [US2] Update frontend/src/pages/MeetingsPage.tsx to manage participants per meeting
- [ ] T031 [US2] Implement backend meeting-participant association in backend/src/meetings/meetings.service.ts to return participant data with meetings
- [ ] T032 [US2] Add backend audit logging for participant management actions in backend/src/audit/audit.service.ts

## Phase 5: User Story 3 - Document Meeting Minutes (Priority: P1)

**Goal**: Enable capture of meeting minutes, outcomes, proposals, and automatic task creation.

**Independent Test**: Verify meeting minutes can be saved and tasks are created from decisions.

- [ ] T033 [P] [US3] Extend backend/src/meetings/entities/meeting.entity.ts with minutes, outcomes, and proposals fields if not already present
- [ ] T034 [US3] Create backend/src/meetings/dto/meeting-minutes.dto.ts with minutes, outcomes, proposals, and tasks arrays
- [ ] T035 [US3] Implement backend/src/meetings/meetings.controller.ts POST /api/meetings/:id/minutes
- [ ] T036 [US3] Implement backend/src/meetings/meetings.service.ts saveMeetingMinutes method to persist minutes and proposals
- [ ] T037 [US3] Implement backend/src/tasks/tasks.service.ts createTasksFromMinutes to generate tasks from meeting decisions
- [ ] T038 [US3] Implement frontend/src/components/MinutesEditor.tsx for entry of minutes, outcomes, proposals, and task assignments
- [ ] T039 [US3] Implement frontend/src/pages/MeetingDetailsPage.tsx with a minutes editor and task creation preview
- [ ] T040 [US3] Add audit logging for minutes and decisions save operations in backend/src/audit/audit.service.ts

## Phase 6: User Story 4 - Create and Follow Up Tasks (Priority: P1)

**Goal**: Implement task creation, assignment, progress tracking, and follow-up indicators.

**Independent Test**: Verify tasks can be created from meeting decisions, updated, and reflected in progress indicators.

- [ ] T041 [P] [US4] Create backend/src/tasks/entities/task.entity.ts with meetingId, title, description, assigneeId, status, dueDate, completedAt, createdAt, updatedAt
- [ ] T042 [P] [US4] Create backend/src/tasks/dto/create-task.dto.ts and update-task.dto.ts with validation rules
- [ ] T043 [US4] Implement backend/src/tasks/tasks.service.ts with createTask, updateTaskStatus, getTasksForUser, and getTasksByMeeting methods
- [ ] T044 [US4] Implement backend/src/tasks/tasks.controller.ts with GET /api/tasks and PATCH /api/tasks/:id
- [ ] T045 [US4] Implement frontend/src/pages/TasksPage.tsx with task list, status update controls, and assignment display
- [ ] T046 [US4] Implement frontend/src/components/TaskCard.tsx for task progress and update actions
- [ ] T047 [US4] Add backend audit logging for task creation and status updates in backend/src/audit/audit.service.ts

## Phase 7: User Story 5 - Send Notifications (Priority: P2)

**Goal**: Send SMS notifications for meeting scheduling and updates.

**Independent Test**: Verify that SMS notification requests are queued and sent when meetings are confirmed.

- [ ] T048 [P] [US5] Create backend/src/notifications/sms.provider.ts to wrap the Twilio-compatible SMS provider
- [ ] T049 [US5] Implement backend/src/notifications/notifications.service.ts with queueSms, sendSms, and retry logic
- [ ] T050 [US5] Implement backend/src/notifications/notifications.controller.ts with POST /api/notifications/sms for manual retry
- [ ] T051 [US5] Update backend/src/meetings/meetings.service.ts to trigger SMS notifications on meeting confirmation
- [ ] T052 [US5] Implement frontend notification status UI in frontend/src/pages/MeetingsPage.tsx or frontend/src/components/ParticipantList.tsx
- [ ] T053 [US5] Add audit logging for notification send attempts and failures in backend/src/audit/audit.service.ts

## Phase 8: User Story 6 - View and Filter Meetings (Priority: P2)

**Goal**: Provide meeting search, filter, and list capabilities.

**Independent Test**: Verify that users can search and filter meetings by date, status, and confidentiality.

- [ ] T054 [P] [US6] Implement meeting query filtering in backend/src/meetings/meetings.service.ts with status, confidentialityLevel, dateFrom, dateTo, and search support
- [ ] T055 [US6] Implement backend confidentiality enforcement in backend/src/meetings/meetings.service.ts based on the current user role
- [ ] T056 [US6] Implement frontend/src/components/MeetingFilters.tsx with filter inputs for date range, status, and confidentiality level
- [ ] T057 [US6] Update frontend/src/pages/MeetingsPage.tsx to apply filters and refresh meeting lists
- [ ] T058 [US6] Add backend pagination support to /api/meetings responses for scalable list rendering

## Phase 9: User Story 7 - Display Calendar (Priority: P2)

**Goal**: Display meetings visually in daily, weekly, and monthly calendar views.

**Independent Test**: Verify that calendar views render meetings on the correct dates and support view switching.

- [ ] T059 [P] [US7] Create frontend/src/components/CalendarView.tsx to render daily, weekly, and monthly meeting layouts
- [ ] T060 [US7] Implement frontend/src/pages/CalendarPage.tsx with view toggles and meeting tooltips
- [ ] T061 [US7] Extend backend/src/meetings/meetings.controller.ts or create /api/meetings/calendar endpoint to support date-range queries for calendar data
- [ ] T062 [US7] Add calendar query performance optimization in backend/src/meetings/meetings.service.ts

## Phase 10: User Story 8 - Generate Reports (Priority: P3)

**Goal**: Provide performance reports and follow-up indicators for meetings and tasks.

**Independent Test**: Verify that reports can be generated and display accurate meeting and task metrics.

- [ ] T063 [US8] Implement backend/src/reports/reports.module.ts and backend/src/reports/reports.service.ts for aggregated meeting and task reporting
- [ ] T064 [US8] Implement backend/src/reports/reports.controller.ts with GET /api/reports/meetings and GET /api/reports/tasks
- [ ] T065 [US8] Implement frontend/src/pages/ReportsPage.tsx with report filters and summary cards
- [ ] T066 [US8] Implement frontend/src/components/ReportMetrics.tsx to display statistics and follow-up indicators
- [ ] T067 [US8] Add backend report query performance tuning and caching considerations in backend/src/reports/reports.service.ts

## Phase 11: User Story 9 - Audit Logging (Priority: P3)

**Goal**: Record all operations in an audit log for compliance and traceability.

**Independent Test**: Verify that create, update, and notification actions are recorded and queryable without exposing sensitive data.

- [ ] T068 [US9] Implement backend/src/audit/audit.controller.ts with GET /api/audit for authorized roles
- [ ] T069 [US9] Implement backend/src/audit/audit.service.ts to persist audit entries and return sanitized details
- [ ] T070 [US9] Create backend/src/common/interceptors/audit.interceptor.ts to log actions on create/update/delete operations
- [ ] T071 [US9] Implement frontend/src/pages/AuditPage.tsx to display audit records for authorized users
- [ ] T072 [US9] Add audit security filtering to hide sensitive details from user-facing responses

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, documentation, security, and performance work.

- [ ] T073 [P] Update specs/001-meeting-management-system/quickstart.md with implementation-specific setup details
- [ ] T074 [P] Add end-to-end tests in frontend/tests/e2e/meeting-management.cy.ts covering meeting creation, participant notification, minutes capture, and task follow-up
- [ ] T075 [P] Add global type safety checks and fix TypeScript issues in backend and frontend
- [ ] T076 [P] Add performance optimization and indexing checks for backend/src/meetings/meetings.service.ts and backend/src/reports/reports.service.ts
- [ ] T077 [P] Add security hardening in backend/src/common/guards/roles.guard.ts and backend/src/common/interceptors/error.interceptor.ts
- [ ] T078 [P] Run lint and formatter checks across backend and frontend and fix any violations
- [ ] T079 [P] Add documentation updates to specs/001-meeting-management-system/plan.md, specs/001-meeting-management-system/research.md, and specs/001-meeting-management-system/data-model.md

## Dependencies & Execution Order

- Phase 1 must finish before Phase 2.
- Phase 2 must finish before any user story phase begins.
- User story phases may run in parallel after foundational work completes.
- User stories should still prioritize P1 stories first for MVP delivery.
- Polish tasks may begin once core stories are implemented.

## Parallel Opportunities

- Setup tasks T005 and T006 can run in parallel with project initialization tasks.
- Foundational tasks T014 and T015 can run in parallel with other backend foundation tasks.
- Story-specific model and DTO creation tasks can run in parallel within the same story where dependencies allow.
- Frontend page/component tasks can often run in parallel with backend endpoint implementation once API contracts are defined.

## Format Validation

- All tasks use `- [ ]` checklist format.
- Task IDs are sequential from T001 onward.
- Story labels are present for story-specific tasks.
- Exact file paths are included in task descriptions.
