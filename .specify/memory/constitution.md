<!--
Version change: 1.0.0 → 1.1.0
List of modified principles: Added VI. Licensing Restrictions
Added sections: None
Removed sections: None
Templates requiring updates: plan-template.md (Constitution Check section), spec-template.md (may need alignment), tasks-template.md (task types for testing, performance)
Follow-up TODOs: None
-->
# My Project Constitution

## Core Principles

### I. Code Quality
All code must maintain high quality standards. Python functions and classes must be fully typed with type hints and include Google-style docstrings. The coding process must be robust, with mandatory double-checking for errors and security issues before commits.

### II. Testing Standards
Comprehensive testing is required for all features. This includes unit tests, integration tests, and performance tests. Test coverage must meet minimum thresholds, and tests must be written before or alongside code implementation.

### III. User Experience Consistency
User interfaces and experiences must be consistent across the application. Error messages displayed to users must not contain system information such as file paths or machine names; such details should be logged internally in the system log.

### IV. Performance Requirements
Code must meet defined performance benchmarks. Regular profiling and optimization are mandatory to ensure efficient resource usage and response times.

### V. Tool Usage
Deepwiki MCP may be used when needed for research, documentation, or code assistance to enhance development efficiency.

### VI. Licensing Restrictions
The use of any library licensed under AGPL 3.0 is strictly prohibited to avoid licensing conflicts.

## Development Workflow
The development process includes peer code reviews, automated linting and security scans, and integration of tools like Deepwiki MCP for enhanced productivity.

## Security and Error Handling
Security must be prioritized in all code. Error handling should be graceful, with sensitive information never exposed in user-facing messages.

## Governance
Constitution supersedes all other practices. Amendments require approval and documentation.

**Version**: 1.1.0 | **Ratified**: 2026-04-25 | **Last Amended**: 2026-04-25
