# Task Breakdown

**Project**: {{project_name}}
**Sprint/Iteration**: {{sprint_name}}
**Generated**: {{generated_date}}

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Tasks** | {{total_tasks}} |
| **Total Story Points** | {{total_points}} |
| **Sprint Capacity** | {{sprint_capacity}} |
| **Utilization** | {{utilization}}% |

---

## Tasks by Priority

### Critical Path
{{#critical_tasks}}
- [{{status}}] **{{id}}**: {{title}} ({{points}} pts)
{{/critical_tasks}}

### High Priority
{{#high_priority_tasks}}
- [{{status}}] **{{id}}**: {{title}} ({{points}} pts)
{{/high_priority_tasks}}

### Medium Priority
{{#medium_priority_tasks}}
- [{{status}}] **{{id}}**: {{title}} ({{points}} pts)
{{/medium_priority_tasks}}

### Low Priority
{{#low_priority_tasks}}
- [{{status}}] **{{id}}**: {{title}} ({{points}} pts)
{{/low_priority_tasks}}

---

## Detailed Task List

{{#tasks}}
## {{id}}: {{title}}

| Attribute | Value |
|-----------|-------|
| **Status** | {{status}} |
| **Priority** | {{priority}} |
| **Story Points** | {{points}} |
| **Assignee** | {{assignee}} |
| **Estimated Hours** | {{estimated_hours}} |

### Description
{{description}}

### Acceptance Criteria
{{#acceptance_criteria}}
- [ ] {{.}}
{{/acceptance_criteria}}

### Technical Notes
{{technical_notes}}

### Dependencies
{{#dependencies}}
- **{{task_id}}**: {{title}} - {{status}}
{{/dependencies}}

{{^dependencies}}
*No dependencies*
{{/dependencies}}

### Blocked By
{{#blocked_by}}
- {{.}}
{{/blocked_by}}

{{^blocked_by}}
*Not blocked*
{{/blocked_by}}

### Sub-Tasks
{{#subtasks}}
- [ ] {{id}}: {{title}} ({{points}} pts)
{{/subtasks}}

### Related Specifications
{{#specifications}}
- {{type}}: {{reference}}
{{/specifications}}

### Test Strategy
{{test_strategy}}

### Definition of Done
{{#definition_of_done}}
- [ ] {{.}}
{{/definition_of_done}}

---

{{/tasks}}

## Dependency Graph

```
{{dependency_graph}}
```

---

## Sprint Goals

{{#sprint_goals}}
- {{.}}
{{/sprint_goals}}

---

## Risks & Blockers

| Risk/Blocker | Impact | Mitigation | Owner |
|--------------|--------|------------|-------|
{{#risks}}
| {{description}} | {{impact}} | {{mitigation}} | {{owner}} |
{{/risks}}

---

## Velocity Reference

| Sprint | Planned | Completed | Velocity |
|--------|---------|-----------|----------|
{{#velocity_history}}
| {{sprint}} | {{planned}} | {{completed}} | {{velocity}} |
{{/velocity_history}}

**Average Velocity**: {{average_velocity}} points

---

## Notes

{{notes}}

---

## Open Questions

{{#open_questions}}
- {{.}}
{{/open_questions}}

{{^open_questions}}
*No open questions at this time.*
{{/open_questions}}

---

*Development Document - Task Breakdown*

---

<sub>Built with [LoreWork](https://github.com/phelpsbn42/LoreWork) - Capture organizational knowledge through structured, AI-guided solution delivery.</sub>
