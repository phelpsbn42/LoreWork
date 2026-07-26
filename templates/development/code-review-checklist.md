# Code Review Checklist

**Project**: {{project_name}}
**Feature/Task**: {{feature_name}}
**Generated**: {{generated_date}}

---

## Review Metadata

| Attribute | Value |
|-----------|-------|
| **Author** | {{author}} |
| **Reviewer(s)** | {{reviewers}} |
| **PR/MR Link** | {{pr_link}} |
| **Branch** | {{branch_name}} |
| **Related Task(s)** | {{related_tasks}} |

---

## Files Changed

| File | Lines Added | Lines Removed | Type |
|------|-------------|---------------|------|
{{#files_changed}}
| {{file}} | +{{added}} | -{{removed}} | {{change_type}} |
{{/files_changed}}

**Total**: +{{total_added}} / -{{total_removed}}

---

## Specification Compliance

### Requirements Traceability

| Requirement | Implemented | Verified | Notes |
|-------------|-------------|----------|-------|
{{#requirements}}
| {{requirement}} | {{implemented}} | {{verified}} | {{notes}} |
{{/requirements}}

### Use Case Coverage

{{#use_cases}}
- [ ] **{{id}}**: {{name}} - {{status}}
{{/use_cases}}

---

## Code Quality Checklist

### Correctness
- [ ] Code correctly implements the specified requirements
- [ ] Logic is sound with no obvious bugs
- [ ] Edge cases are handled appropriately
- [ ] Error conditions are handled gracefully
- [ ] No off-by-one errors or boundary issues

### Readability
- [ ] Code is self-documenting with clear naming
- [ ] Complex logic has explanatory comments
- [ ] Functions/methods are appropriately sized
- [ ] Code follows project style guidelines
- [ ] No unnecessary complexity

### Maintainability
- [ ] DRY principle followed (no excessive duplication)
- [ ] Single Responsibility Principle applied
- [ ] Dependencies are appropriate and minimal
- [ ] Code is modular and extensible
- [ ] Magic numbers/strings are extracted to constants

### Performance
- [ ] No obvious performance issues
- [ ] Appropriate data structures used
- [ ] Database queries are optimized (N+1 checked)
- [ ] Caching used where appropriate
- [ ] No unnecessary loops or iterations

### Security
- [ ] Input validation implemented
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Sensitive data properly handled
- [ ] Authentication/authorization checks present
- [ ] No secrets in code

### Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Test coverage meets standards ({{coverage_target}}%)
- [ ] Tests are meaningful (not just for coverage)
- [ ] Edge cases tested
- [ ] Error conditions tested

### Documentation
- [ ] Public APIs documented
- [ ] README updated if needed
- [ ] Changelog updated if needed
- [ ] Architecture docs updated if needed

---

## Specific Review Items

{{#review_items}}
### {{category}}

{{#items}}
- [ ] {{description}}
  {{#notes}}
  *Note: {{notes}}*
  {{/notes}}
{{/items}}

{{/review_items}}

---

## Architecture Alignment

- [ ] Follows established patterns (per ADRs)
- [ ] Component boundaries respected
- [ ] API contracts maintained
- [ ] No circular dependencies introduced
- [ ] Consistent with C4 diagrams

---

## Breaking Changes

{{#breaking_changes}}
- **{{area}}**: {{description}}
  - Migration: {{migration}}
{{/breaking_changes}}

{{^breaking_changes}}
*No breaking changes identified.*
{{/breaking_changes}}

---

## Deployment Considerations

{{#deployment_notes}}
- {{.}}
{{/deployment_notes}}

{{^deployment_notes}}
*No special deployment considerations.*
{{/deployment_notes}}

---

## Review Findings

### Issues Found

{{#issues}}
#### {{severity}}: {{title}}
- **File**: {{file}}:{{line}}
- **Description**: {{description}}
- **Suggestion**: {{suggestion}}
- **Status**: {{status}}
{{/issues}}

{{^issues}}
*No issues found.*
{{/issues}}

### Suggestions (Non-Blocking)

{{#suggestions}}
- {{.}}
{{/suggestions}}

{{^suggestions}}
*No suggestions.*
{{/suggestions}}

### Kudos

{{#kudos}}
- {{.}}
{{/kudos}}

---

## Review Outcome

| Outcome | Criteria |
|---------|----------|
| **Approved** | All checklist items pass, no blocking issues |
| **Approved with Comments** | Minor issues that author can address |
| **Changes Requested** | Blocking issues that must be resolved |
| **Rejected** | Fundamental problems requiring redesign |

### Final Verdict: {{verdict}}

### Reviewer Comments
{{reviewer_comments}}

---

## Follow-Up Items

{{#follow_up}}
- [ ] {{.}}
{{/follow_up}}

{{^follow_up}}
*No follow-up items.*
{{/follow_up}}

---

*Development Document - Code Review Checklist*

---

<sub>Built with [LoreWork](https://github.com/phelpsbn42/LoreWork) - Capture organizational knowledge through structured, AI-guided solution delivery.</sub>
