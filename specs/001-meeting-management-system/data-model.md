# Data Model: Meeting Management System

## Entities

### Meeting
- **id**: UUID
- **title**: string
- **description**: string
- **date**: date
- **startTime**: time
- **durationMinutes**: integer
- **location**: string
- **confidentialityLevel**: enum [Public, Internal, Restricted]
- **status**: enum [Pending, Confirmed, Postponed, Canceled, Completed]
- **organizerId**: UUID
- **minutes**: text
- **outcomes**: text
- **proposals**: text
- **createdAt**: timestamp
- **updatedAt**: timestamp

### Participant
- **id**: UUID
- **meetingId**: UUID
- **userId**: UUID
- **role**: enum [Attendee, Presenter, Observer]
- **responseStatus**: enum [Pending, Accepted, Declined]
- **phoneNumber**: string
- **createdAt**: timestamp
- **updatedAt**: timestamp

### Task
- **id**: UUID
- **meetingId**: UUID
- **title**: string
- **description**: string
- **assigneeId**: UUID
- **status**: enum [Open, InProgress, Completed]
- **dueDate**: date
- **completedAt**: timestamp | null
- **createdAt**: timestamp
- **updatedAt**: timestamp

### User
- **id**: UUID
- **displayName**: string
- **email**: string
- **role**: enum [Admin, Organizer, Participant, Viewer]
- **phoneNumber**: string
- **createdAt**: timestamp
- **updatedAt**: timestamp

### AuditEntry
- **id**: UUID
- **actorId**: UUID
- **action**: string
- **entityType**: string
- **entityId**: UUID | null
- **details**: JSON
- **createdAt**: timestamp

### Notification
- **id**: UUID
- **recipientId**: UUID
- **channel**: enum [SMS]
- **status**: enum [Pending, Sent, Failed]
- **message**: string
- **providerResponse**: JSON | null
- **sentAt**: timestamp | null
- **createdAt**: timestamp

## Relationships

- Meeting 1:N Participant
- Meeting 1:N Task
- Meeting 1:N AuditEntry
- Meeting 1:N Notification
- User 1:N Participant
- User 1:N Task (assignee)
- User 1:N AuditEntry (actor)

## Validation Rules

- Meeting title, date, time, duration, location, confidentiality level, and status are required.
- Duration must be a positive integer.
- Confidentiality level must be one of Public, Internal, Restricted.
- Task title, description, assignee, and due date are required.
- AuditEntry details must be sanitized JSON and not expose credentials.
- Notification phone numbers must follow a normalized international format.

## State Transitions

- Meeting: Pending → Confirmed | Postponed | Canceled → Completed
- Task: Open → InProgress → Completed

## Notes

- Confidentiality filtering is enforced at the API layer, ensuring users can only query meetings within their permitted level.
- Audit entries store actions for every create/update/delete event, with sensitive data stripped from user-facing outputs.
