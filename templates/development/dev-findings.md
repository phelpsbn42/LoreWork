# Development Findings

**Project**: {{project_name}}
**Generated**: {{generated_date}}

Concerns, questions, and issues discovered during implementation that require upstream attention or architectural decisions.

---

## Summary

| Severity | Open | In Discussion | Resolved |
|----------|------|---------------|----------|
| Critical | {{critical_open}} | {{critical_discussion}} | {{critical_resolved}} |
| High | {{high_open}} | {{high_discussion}} | {{high_resolved}} |
| Medium | {{medium_open}} | {{medium_discussion}} | {{medium_resolved}} |
| Low | {{low_open}} | {{low_discussion}} | {{low_resolved}} |

---

## Active Findings

{{#active_findings}}
### [{{id}}] {{title}}

| Attribute | Value |
|-----------|-------|
| **Severity** | {{severity}} |
| **Category** | {{category}} |
| **Related Artifact** | {{related_artifact}} |
| **Status** | {{status}} |
| **Discovered** | {{discovered_date}} |
| **Owner** | {{owner}} |

**Description**
{{description}}

**Impact**
{{impact}}

**Recommendation**
{{recommendation}}

{{#proposed_solutions}}
**Proposed Solutions**
{{#solutions}}
- **Option {{number}}**: {{description}}
  - Pros: {{pros}}
  - Cons: {{cons}}
{{/solutions}}
{{/proposed_solutions}}

**Next Steps**
{{#next_steps}}
- {{.}}
{{/next_steps}}

---

{{/active_findings}}

{{^active_findings}}
*No active findings at this time.*
{{/active_findings}}

---

## Resolved Findings

{{#resolved_findings}}
### [{{id}}] {{title}}

| Attribute | Value |
|-----------|-------|
| **Severity** | {{severity}} |
| **Category** | {{category}} |
| **Resolution** | {{resolution}} |
| **Resolved By** | {{resolved_by}} |
| **Resolved Date** | {{resolved_date}} |

**Original Issue**
{{description}}

**How Resolved**
{{resolution_details}}

{{#lessons_learned}}
**Lessons Learned**
{{lessons_learned}}
{{/lessons_learned}}

---

{{/resolved_findings}}

{{^resolved_findings}}
*No resolved findings yet.*
{{/resolved_findings}}

---

## Categories Reference

| Category | Description |
|----------|-------------|
| **Security** | OWASP vulnerabilities, authentication/authorization issues, data exposure |
| **Resiliency** | Single points of failure, missing timeouts, lack of graceful degradation |
| **Architecture** | Contradictions with ADRs, unclear integration points, scalability concerns |
| **Performance** | Potential bottlenecks, missing caching, inefficient algorithms |
| **Clarity** | Ambiguous requirements, missing specifications, conflicting documentation |

## Severity Levels

| Level | Response Time | Description |
|-------|---------------|-------------|
| **Critical** | Immediate | Blocks implementation or introduces serious risk |
| **High** | Within sprint | Significant issue that needs resolution soon |
| **Medium** | Planned | Should be addressed but not blocking |
| **Low** | Backlog | Minor concern or improvement suggestion |

---

## Escalation Path

For findings requiring architectural decisions:
1. Document finding in this file
2. Notify {{escalation_contact}}
3. Schedule review with Solution Architect if needed
4. Do NOT proceed with conflicting assumptions

---

*Development Document - Findings Log*

---

<sub>Built with [LoreWork](https://github.com/phelpsbn42/LoreWork) - Capture organizational knowledge through structured, AI-guided solution delivery.</sub>
