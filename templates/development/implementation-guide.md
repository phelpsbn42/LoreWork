# Implementation Guide

**Project**: {{project_name}}
**Feature**: {{feature_name}}
**Generated**: {{generated_date}}

---

## Overview

{{feature_overview}}

### Goals
{{#goals}}
- {{.}}
{{/goals}}

### Non-Goals
{{#non_goals}}
- {{.}}
{{/non_goals}}

---

## Prerequisites

### Knowledge Required
{{#knowledge_required}}
- {{.}}
{{/knowledge_required}}

### Environment Setup
{{#environment_setup}}
- {{.}}
{{/environment_setup}}

### Dependencies
{{#dependencies}}
- **{{name}}** ({{version}}): {{purpose}}
{{/dependencies}}

---

## Architecture Context

### Component Diagram
```
{{component_diagram}}
```

### Where This Fits
{{architecture_context}}

### Related Components
{{#related_components}}
- **{{name}}**: {{relationship}}
{{/related_components}}

---

## Implementation Steps

{{#implementation_steps}}
## Step {{number}}: {{title}}

### Objective
{{objective}}

### Files to Modify/Create

| Action | File | Purpose |
|--------|------|---------|
{{#files}}
| {{action}} | `{{path}}` | {{purpose}} |
{{/files}}

### Detailed Instructions

{{instructions}}

### Code Examples

{{#code_examples}}
#### {{title}}

```{{language}}
{{code}}
```

{{#explanation}}
*{{explanation}}*
{{/explanation}}

{{/code_examples}}

### Verification
{{#verification}}
- [ ] {{.}}
{{/verification}}

### Common Pitfalls
{{#pitfalls}}
- {{.}}
{{/pitfalls}}

---

{{/implementation_steps}}

## Data Models

{{#data_models}}
### {{name}}

```{{language}}
{{schema}}
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
{{#fields}}
| {{name}} | {{type}} | {{required}} | {{description}} |
{{/fields}}

**Relationships**:
{{#relationships}}
- {{.}}
{{/relationships}}

---

{{/data_models}}

## API Contracts

{{#api_endpoints}}
### {{method}} {{path}}

**Description**: {{description}}

**Authentication**: {{authentication}}

**Request**:
```json
{{request_example}}
```

**Response (Success)**:
```json
{{response_success}}
```

**Response (Error)**:
```json
{{response_error}}
```

**Error Codes**:
| Code | Description |
|------|-------------|
{{#error_codes}}
| {{code}} | {{description}} |
{{/error_codes}}

---

{{/api_endpoints}}

## Testing Strategy

### Unit Tests

{{#unit_tests}}
#### {{name}}

**File**: `{{file}}`

**Test Cases**:
{{#cases}}
- {{description}}
{{/cases}}

**Example**:
```{{language}}
{{example}}
```

{{/unit_tests}}

### Integration Tests

{{#integration_tests}}
#### {{name}}

**Scope**: {{scope}}

**Setup**: {{setup}}

**Test Cases**:
{{#cases}}
- {{description}}
{{/cases}}

{{/integration_tests}}

### Manual Testing

{{#manual_tests}}
- [ ] {{description}}
{{/manual_tests}}

---

## Error Handling

### Expected Errors

| Error Condition | Error Type | Handling |
|-----------------|------------|----------|
{{#expected_errors}}
| {{condition}} | {{type}} | {{handling}} |
{{/expected_errors}}

### Retry Strategy
{{retry_strategy}}

### Logging
{{logging_guidance}}

---

## Performance Considerations

{{#performance_items}}
### {{area}}
{{consideration}}
{{/performance_items}}

---

## Security Considerations

{{#security_items}}
### {{area}}
{{consideration}}
{{/security_items}}

---

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
{{#env_vars}}
| {{name}} | {{required}} | {{default}} | {{description}} |
{{/env_vars}}

### Feature Flags

{{#feature_flags}}
| Flag | Default | Description |
|------|---------|-------------|
| {{name}} | {{default}} | {{description}} |
{{/feature_flags}}

---

## Rollout Plan

### Phases

{{#rollout_phases}}
#### Phase {{number}}: {{name}}
- **Scope**: {{scope}}
- **Validation**: {{validation}}
- **Rollback Trigger**: {{rollback_trigger}}
{{/rollout_phases}}

### Monitoring

{{#monitoring}}
- **{{metric}}**: {{threshold}} → {{action}}
{{/monitoring}}

---

## Rollback Procedure

{{rollback_procedure}}

---

## Definition of Done

{{#definition_of_done}}
- [ ] {{.}}
{{/definition_of_done}}

---

## References

### Specifications
{{#spec_references}}
- {{type}}: {{link}}
{{/spec_references}}

### External Documentation
{{#external_docs}}
- {{title}}: {{link}}
{{/external_docs}}

### Related ADRs
{{#related_adrs}}
- ADR-{{number}}: {{title}}
{{/related_adrs}}

---

## Open Questions

{{#open_questions}}
- {{.}}
{{/open_questions}}

{{^open_questions}}
*No open questions at this time.*
{{/open_questions}}

---

*Development Document - Implementation Guide*
