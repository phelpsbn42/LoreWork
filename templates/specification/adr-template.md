# ADR-{{adr_number}}: {{title}}

**Project**: {{project_name}}
**Date**: {{date}}
**Status**: {{status}}

---

## Context

{{context}}

### Problem Statement
{{problem_statement}}

### Forces at Play
{{#forces}}
- {{.}}
{{/forces}}

### Constraints
{{#constraints}}
- {{.}}
{{/constraints}}

---

## Decision Drivers

{{#decision_drivers}}
- **{{driver}}**: {{importance}} priority
{{/decision_drivers}}

---

## Considered Options

{{#options}}
### Option {{number}}: {{name}}

**Description**: {{description}}

**Pros**:
{{#pros}}
- {{.}}
{{/pros}}

**Cons**:
{{#cons}}
- {{.}}
{{/cons}}

**Cost**: {{cost}}

**Risk**: {{risk}}

---

{{/options}}

## Decision

**We will use**: {{chosen_option}}

### Rationale
{{rationale}}

### Decision Criteria Evaluation

| Criterion | Weight | {{#options}}{{name}} | {{/options}}
|-----------|--------|{{#options}}----------|{{/options}}
{{#criteria}}
| {{name}} | {{weight}} | {{#scores}}{{score}} | {{/scores}}
{{/criteria}}
| **Total** | | {{#totals}}**{{total}}** | {{/totals}}

---

## Consequences

### Positive
{{#positive_consequences}}
- {{.}}
{{/positive_consequences}}

### Negative
{{#negative_consequences}}
- {{.}}
{{/negative_consequences}}

### Neutral
{{#neutral_consequences}}
- {{.}}
{{/neutral_consequences}}

---

## Implementation

### Approach
{{implementation_approach}}

### Tasks
{{#implementation_tasks}}
- [ ] {{.}}
{{/implementation_tasks}}

### Timeline
{{implementation_timeline}}

---

## Validation

### Success Metrics
{{#success_metrics}}
- {{metric}}: {{target}}
{{/success_metrics}}

### Review Date
{{review_date}}

---

## Related Decisions

{{#related_adrs}}
- **ADR-{{number}}**: {{title}} - {{relationship}}
{{/related_adrs}}

---

## References

{{#references}}
- {{.}}
{{/references}}

---

## Stakeholders

### Decision Makers
{{#decision_makers}}
- {{name}} ({{role}})
{{/decision_makers}}

### Consulted
{{#consulted}}
- {{name}} ({{role}})
{{/consulted}}

### Informed
{{#informed}}
- {{name}} ({{role}})
{{/informed}}

---

## Change History

| Date | Change | Author |
|------|--------|--------|
{{#change_history}}
| {{date}} | {{change}} | {{author}} |
{{/change_history}}

---

## Open Questions

{{#open_questions}}
- {{.}}
{{/open_questions}}

{{^open_questions}}
*No open questions at this time.*
{{/open_questions}}

---

*Architectural Decision Record*

---

<sub>Built with [LoreWork](https://github.com/phelpsbn42/LoreWork) - Capture organizational knowledge through structured, AI-guided solution delivery.</sub>
