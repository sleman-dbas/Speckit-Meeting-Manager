Feature: User Authentication

Overview:
Provide secure user registration, authentication, and token-based session management. All code must be fully typed, include Google-style docstrings, and avoid exposing system information in user-facing errors.

Requirements (from Constitution):
- All Python functions and classes are fully typed and use Google-style docstrings.
- Tests (unit + integration) are provided alongside the implementation.
- Error messages returned to users contain no system information (file paths, machine names). Detailed diagnostics are logged internally.
- Performance: authentication latency should be low (target: <50ms in simple in-memory flow); add profiling hooks.
- Security: use PBKDF2-HMAC for password hashing, HMAC-signed tokens, secrets stored via environment variables.

Scope:
- Register user (username, password)
- Authenticate user (username, password) -> token
- Verify token middleware
- Password hashing and verification
- Basic token expiry

Data models:
- User: username (str), salt (bytes), password_hash (bytes), created_at (float)

Acceptance criteria:
- Auth service implements required API and is fully typed with docstrings.
- Unit tests cover registration, authentication, password verification, and token generation/verification.
- No user-facing error reveals system details; errors must be generic and safe.
- A TODO list for integration with persistent DB and token revocation.

Testing & Performance:
- Include unit tests runnable with Python's unittest.
- Add simple timing hooks for profiling critical paths.

Security & Logging:
- Secret keys referenced from env: AUTH_SECRET
- Internal logs may include salts and stack traces but must not be shown to users.

Notes:
- This is a first-pass in-memory implementation suitable for local development and tests. Production deployment requires persistent storage, HTTPS, secure secret management, and token revocation.
