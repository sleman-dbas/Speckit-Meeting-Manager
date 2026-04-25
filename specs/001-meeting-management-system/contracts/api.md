# API Contract: Meeting Management System

## Base URL

`/api`

## Authentication

- All endpoints require authenticated access.
- Authorization is role-based: Admin, Organizer, Participant, Viewer.
- Confidentiality filtering applies to meeting queries.

## Endpoints

### Meetings

#### GET /api/meetings
Retrieve meetings accessible to the current user.

Request query parameters:
- `status` (optional)
- `confidentialityLevel` (optional)
- `dateFrom` (optional)
- `dateTo` (optional)
- `search` (optional)
- `view` (optional: daily, weekly, monthly)

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "date": "YYYY-MM-DD",
      "startTime": "HH:MM:SS",
      "durationMinutes": 60,
      "location": "string",
      "confidentialityLevel": "Public|Internal|Restricted",
      "status": "Pending|Confirmed|Postponed|Canceled|Completed",
      "organizerId": "uuid"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "pageSize": 20
  }
}
```

#### POST /api/meetings
Create a new meeting.

Request body:
```json
{
  "title": "string",
  "description": "string",
  "date": "YYYY-MM-DD",
  "startTime": "HH:MM:SS",
  "durationMinutes": 60,
  "location": "string",
  "confidentialityLevel": "Public|Internal|Restricted",
  "status": "Pending|Confirmed",
  "participants": [
    { "userId": "uuid", "role": "Attendee|Presenter|Observer", "phoneNumber": "string" }
  ]
}
```

Response:
```json
{
  "id": "uuid",
  "message": "Meeting created successfully"
}
```

#### PATCH /api/meetings/:id
Update meeting details.

Request body may include any updatable fields:
```json
{
  "title": "string",
  "description": "string",
  "date": "YYYY-MM-DD",
  "startTime": "HH:MM:SS",
  "durationMinutes": 60,
  "location": "string",
  "confidentialityLevel": "Public|Internal|Restricted",
  "status": "Pending|Confirmed|Postponed|Canceled|Completed"
}
```

Response:
```json
{
  "message": "Meeting updated successfully"
}
```

### Participants

#### POST /api/meetings/:id/participants
Add participants to a meeting.

Request body:
```json
{
  "participants": [
    { "userId": "uuid", "role": "Attendee|Presenter|Observer", "phoneNumber": "string" }
  ]
}
```

Response:
```json
{
  "message": "Participants added successfully"
}
```

### Minutes and Tasks

#### POST /api/meetings/:id/minutes
Save meeting minutes and create tasks.

Request body:
```json
{
  "minutes": "string",
  "outcomes": "string",
  "proposals": "string",
  "tasks": [
    {
      "title": "string",
      "description": "string",
      "assigneeId": "uuid",
      "dueDate": "YYYY-MM-DD"
    }
  ]
}
```

Response:
```json
{
  "message": "Minutes saved and tasks created"
}
```

### Tasks

#### GET /api/tasks
Retrieve tasks assigned to or created by the current user.

Response includes task status and meeting context.

#### PATCH /api/tasks/:id
Update task status or details.

Request body:
```json
{
  "status": "Open|InProgress|Completed",
  "description": "string"
}
```

### Reports

#### GET /api/reports/meetings
Generate meeting performance reports.

Query parameters:
- `dateFrom`
- `dateTo`
- `status`
- `confidentialityLevel`

Response includes counts and completion metrics.

#### GET /api/reports/tasks
Generate task progress and follow-up indicators.

### Audit

#### GET /api/audit
Retrieve audit entries for authorized users.

Response fields:
- `actorId`
- `action`
- `entityType`
- `entityId`
- `details`
- `createdAt`

### Notifications

#### POST /api/notifications/sms
Send or retry an SMS notification.

Request body:
```json
{
  "meetingId": "uuid",
  "recipientId": "uuid",
  "message": "string"
}
```

Response:
```json
{
  "message": "SMS queued"
}
```

## Error Handling

- All errors return sanitized messages.
- Internal diagnostics are written to logs only.
- 400-level errors indicate client validation failures, 403 indicates unauthorized/confidentiality restrictions, 500 indicates server errors.
