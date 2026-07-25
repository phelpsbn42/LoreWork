# Inception Deck

**Project**: {{project_name}}
**Generated**: {{generated_date}}

---

# Section 1: Why Are We Here?

## Problem Statement

{{problem_statement}}

## Who Experiences This Problem?

{{#affected_parties}}
- **{{name}}**: {{description}}
{{/affected_parties}}

## Current State

{{current_state}}

## Consequences of Inaction

{{#consequences}}
- {{.}}
{{/consequences}}

## Vision of Success

{{success_vision}}

### Success Criteria

{{#success_criteria}}
- [ ] {{.}}
{{/success_criteria}}

## Key Drivers

{{#key_drivers}}
- **{{driver}}**: {{rationale}}
{{/key_drivers}}

---

# Section 2: Elevator Pitch

## The Pitch

> For **{{target_customer}}**
> who **{{customer_need}}**,
> the **{{product_name}}**
> is a **{{product_category}}**
> that **{{key_benefit}}**.
> Unlike **{{competitors}}**,
> our product **{{differentiator}}**.

## Breakdown

### Target Customer
{{target_customer_detail}}

### Customer Need
{{customer_need_detail}}

### Product Name
**{{product_name}}**

### Product Category
{{product_category}}

### Key Benefit
{{key_benefit_detail}}

### Competition / Alternatives
{{#competitors_list}}
- **{{name}}**: {{weakness}}
{{/competitors_list}}

### Our Differentiator
{{differentiator_detail}}

## Tagline Options

{{#taglines}}
- "{{.}}"
{{/taglines}}

## Compelling Reason to Act Now

{{urgency}}

---

# Section 3: Product Box

## Front of Box

### Product Name
# {{product_name}}

### Tagline
*"{{tagline}}"*

### Hero Image Description
{{hero_image_description}}

### Top 3 Features

{{#top_features}}
### {{headline}}
{{description}}

{{/top_features}}

## Back of Box

### Product Description
{{product_description}}

### Key Benefits

{{#key_benefits}}
- {{icon}} **{{benefit}}**: {{detail}}
{{/key_benefits}}

### Technical Highlights

{{#technical_highlights}}
- {{.}}
{{/technical_highlights}}

### Requirements / Prerequisites

{{#requirements}}
- {{.}}
{{/requirements}}

## Quick Facts

| Attribute | Value |
|-----------|-------|
| Version | {{version}} |
| Platform | {{platform}} |
| License | {{license}} |
| Support | {{support}} |

## Testimonial (Aspirational)

> "{{testimonial_quote}}"
>
> — {{testimonial_author}}, {{testimonial_role}}

## Call to Action

{{call_to_action}}

---

# Section 4: NOT List

## Purpose

This section explicitly defines what is **out of scope** for {{product_name}}. Clear boundaries prevent scope creep and set appropriate expectations.

## Definitely NOT Doing (Out of Scope)

{{#not_doing}}
### {{item}}
- **Why excluded**: {{rationale}}
- **Common misconception**: {{misconception}}
{{/not_doing}}

## Not Doing *Right Now* (Future Consideration)

{{#not_now}}
### {{item}}
- **Why deferred**: {{rationale}}
- **Potential timeline**: {{timeline}}
- **Dependencies**: {{dependencies}}
{{/not_now}}

## In Scope (For Clarity)

{{#in_scope}}
- {{.}}
{{/in_scope}}

## Scope Boundaries

### User Types NOT Supported
{{#excluded_users}}
- {{.}}
{{/excluded_users}}

### Platforms NOT Supported
{{#excluded_platforms}}
- {{.}}
{{/excluded_platforms}}

### Integrations NOT Included
{{#excluded_integrations}}
- {{.}}
{{/excluded_integrations}}

### Features Explicitly Excluded
{{#excluded_features}}
- {{.}}
{{/excluded_features}}

## Decision Log

| Item | Decision | Date | Decided By |
|------|----------|------|------------|
{{#decisions}}
| {{item}} | {{decision}} | {{date}} | {{decided_by}} |
{{/decisions}}

## Escalation Path

If stakeholders request out-of-scope items:
1. Reference this NOT List
2. Discuss with {{escalation_contact}}
3. If approved, update Inception Deck formally
4. Re-baseline estimates and timeline

---

# Section 5: Meet the Neighbors

## Core Team

{{#core_team}}
### {{name}}
- **Role**: {{role}}
- **Responsibilities**: {{responsibilities}}
- **Availability**: {{availability}}
- **Contact**: {{contact}}
{{/core_team}}

## Key Stakeholders

{{#key_stakeholders}}
### {{name}}
- **Title/Role**: {{title}}
- **Interest in Project**: {{interest}}
- **Influence Level**: {{influence}}
- **Engagement Strategy**: {{engagement}}
- **Key Concerns**: {{concerns}}
- **Communication Preference**: {{comm_preference}}
{{/key_stakeholders}}

## Stakeholder Matrix

| Stakeholder | Interest | Influence | Strategy |
|-------------|----------|-----------|----------|
{{#stakeholder_matrix}}
| {{name}} | {{interest}} | {{influence}} | {{strategy}} |
{{/stakeholder_matrix}}

### Engagement Strategies
- **Manage Closely** (High Interest, High Influence): Regular updates, involve in decisions
- **Keep Satisfied** (Low Interest, High Influence): Address concerns, don't overwhelm
- **Keep Informed** (High Interest, Low Influence): Regular communication, gather feedback
- **Monitor** (Low Interest, Low Influence): Minimal effort, periodic updates

## External Dependencies

### Teams We Depend On

{{#dependent_teams}}
### {{team_name}}
- **What we need**: {{dependency}}
- **Contact**: {{contact}}
- **Risk if unavailable**: {{risk}}
{{/dependent_teams}}

### Teams That Depend On Us

{{#consuming_teams}}
### {{team_name}}
- **What they need**: {{dependency}}
- **Contact**: {{contact}}
- **Timeline**: {{timeline}}
{{/consuming_teams}}

## External Systems / Services

{{#external_systems}}
### {{system_name}}
- **Integration Type**: {{integration_type}}
- **Owner**: {{owner}}
- **SLA/Availability**: {{sla}}
- **Documentation**: {{docs_link}}
{{/external_systems}}

## Communication Plan

| Audience | Frequency | Channel | Content | Owner |
|----------|-----------|---------|---------|-------|
{{#communication_plan}}
| {{audience}} | {{frequency}} | {{channel}} | {{content}} | {{owner}} |
{{/communication_plan}}

## Decision Authority (RACI)

| Decision Area | Responsible | Accountable | Consulted | Informed |
|--------------|-------------|-------------|-----------|----------|
{{#raci}}
| {{area}} | {{responsible}} | {{accountable}} | {{consulted}} | {{informed}} |
{{/raci}}

## Potential Blockers

{{#potential_blockers}}
- **{{blocker}}**: {{mitigation}}
{{/potential_blockers}}

---

# Section 6: Show the Solution

## High-Level Solution Overview

{{solution_overview}}

## Solution Diagram

```
{{solution_diagram}}
```

{{#solution_diagram_description}}
*{{solution_diagram_description}}*
{{/solution_diagram_description}}

## Key Components

{{#components}}
### {{name}}
- **Purpose**: {{purpose}}
- **Technology**: {{technology}}
- **Interactions**: {{interactions}}
{{/components}}

## User Journeys

{{#user_journeys}}
### {{journey_name}}
**Actor**: {{actor}}

{{#steps}}
{{number}}. {{description}}
{{/steps}}

{{/user_journeys}}

## Technical Approach

### Architecture Style
{{architecture_style}}

### Key Technologies
{{#technologies}}
- **{{category}}**: {{choice}} - {{rationale}}
{{/technologies}}

### Data Flow
{{data_flow_description}}

```
{{data_flow_diagram}}
```

## Integration Points

{{#integrations}}
### {{system_name}}
- **Integration Method**: {{method}}
- **Data Exchanged**: {{data}}
- **Frequency**: {{frequency}}
- **Error Handling**: {{error_handling}}
{{/integrations}}

## Security Considerations

{{#security_considerations}}
- **{{area}}**: {{approach}}
{{/security_considerations}}

## Scalability Approach

{{scalability_approach}}

### Expected Load
- **Users**: {{expected_users}}
- **Transactions**: {{expected_transactions}}
- **Data Volume**: {{expected_data_volume}}

## Deployment Model

{{deployment_model}}

### Environments
{{#environments}}
- **{{name}}**: {{purpose}}
{{/environments}}

---

# Section 7: Risks

## Risk Summary

| ID | Risk | Likelihood | Impact | Score | Status |
|----|------|------------|--------|-------|--------|
{{#risks_summary}}
| {{id}} | {{title}} | {{likelihood}} | {{impact}} | {{score}} | {{status}} |
{{/risks_summary}}

**Risk Score**: Likelihood (1-5) x Impact (1-5)

## Detailed Risk Register

{{#risks}}
### {{id}}: {{title}}

**Category**: {{category}}

**Description**
{{description}}

**Likelihood**: {{likelihood}}/5 - {{likelihood_rationale}}

**Impact**: {{impact}}/5 - {{impact_rationale}}

**Risk Score**: {{score}} ({{risk_level}})

**Triggers / Warning Signs**
{{#triggers}}
- {{.}}
{{/triggers}}

**Mitigation Strategy**
{{mitigation}}

**Contingency Plan**
{{contingency}}

**Owner**: {{owner}}

**Status**: {{status}}

**Review Date**: {{review_date}}

---

{{/risks}}

## Risk Categories

### Technical Risks
{{#technical_risks}}
- {{.}}
{{/technical_risks}}

### Schedule Risks
{{#schedule_risks}}
- {{.}}
{{/schedule_risks}}

### Resource Risks
{{#resource_risks}}
- {{.}}
{{/resource_risks}}

### External Risks
{{#external_risks}}
- {{.}}
{{/external_risks}}

### Business Risks
{{#business_risks}}
- {{.}}
{{/business_risks}}

## Assumptions

{{#assumptions}}
- **{{assumption}}**: If false, {{consequence}}
{{/assumptions}}

## Dependencies

{{#dependencies}}
- **{{dependency}}**: {{owner}} - Risk if delayed: {{risk}}
{{/dependencies}}

## Risk Response Strategies

| Strategy | When to Use |
|----------|-------------|
| **Avoid** | Eliminate the threat by removing the cause |
| **Mitigate** | Reduce likelihood or impact |
| **Transfer** | Shift risk to third party (insurance, contracts) |
| **Accept** | Acknowledge and prepare contingency |

## Risk Review Schedule

- **Weekly**: High risks (score 15+)
- **Bi-weekly**: Medium risks (score 8-14)
- **Monthly**: Low risks (score 1-7)

**Next Review Date**: {{next_review_date}}

---

# Section 8: Sizing

## Executive Summary

**Overall Size**: {{overall_size}} (S / M / L / XL)

**Estimated Duration**: {{estimated_duration}}

**Confidence Level**: {{confidence_level}}

## T-Shirt Sizing Reference

| Size | Duration | Team Size | Complexity |
|------|----------|-----------|------------|
| S | {{s_duration}} | {{s_team}} | Low - well understood |
| M | {{m_duration}} | {{m_team}} | Moderate - some unknowns |
| L | {{l_duration}} | {{l_team}} | High - significant unknowns |
| XL | {{xl_duration}} | {{xl_team}} | Very High - research required |

## Size Breakdown by Area

{{#size_breakdown}}
### {{area}}
- **Size**: {{size}}
- **Rationale**: {{rationale}}
- **Key Efforts**:
{{#efforts}}
  - {{.}}
{{/efforts}}
{{/size_breakdown}}

## Estimation Approach

**Methodology**: {{estimation_methodology}}

{{methodology_description}}

### Estimation Participants
{{#estimation_participants}}
- {{name}} ({{role}})
{{/estimation_participants}}

### Estimation Date
{{estimation_date}}

## Rough Timeline

### Phases

{{#phases}}
#### Phase {{number}}: {{name}}
- **Duration**: {{duration}}
- **Key Deliverables**:
{{#deliverables}}
  - {{.}}
{{/deliverables}}
- **Dependencies**: {{dependencies}}
{{/phases}}

### Milestones

| Milestone | Target Date | Dependencies |
|-----------|-------------|--------------|
{{#milestones}}
| {{name}} | {{target_date}} | {{dependencies}} |
{{/milestones}}

## Effort Distribution

| Category | Percentage | Notes |
|----------|------------|-------|
{{#effort_distribution}}
| {{category}} | {{percentage}}% | {{notes}} |
{{/effort_distribution}}

## Complexity Factors

### Increasing Complexity
{{#complexity_increase}}
- {{.}}
{{/complexity_increase}}

### Reducing Complexity
{{#complexity_decrease}}
- {{.}}
{{/complexity_decrease}}

## Comparison to Similar Projects

{{#similar_projects}}
### {{name}}
- **Actual Duration**: {{duration}}
- **Team Size**: {{team_size}}
- **Similarity**: {{similarity}}
- **Key Differences**: {{differences}}
{{/similar_projects}}

## Estimation Confidence

**Confidence Level**: {{confidence_level}}/5

### Confidence Factors
{{#confidence_factors}}
- {{.}}
{{/confidence_factors}}

### Uncertainty Areas
{{#uncertainty_areas}}
- {{.}}
{{/uncertainty_areas}}

## Buffer / Contingency

**Recommended Buffer**: {{buffer_percentage}}%

**Rationale**: {{buffer_rationale}}

---

# Section 9: Tradeoffs

## The Tradeoff Sliders

Every project balances competing priorities. These sliders show where {{product_name}} sits.

### Scope
```
Fixed                                              Flexible
  1 -------- 2 -------- 3 -------- 4 -------- 5
                        {{scope_position}}
```
**Position**: {{scope_value}}/5
**Rationale**: {{scope_rationale}}

### Timeline
```
Fixed                                              Flexible
  1 -------- 2 -------- 3 -------- 4 -------- 5
                        {{timeline_position}}
```
**Position**: {{timeline_value}}/5
**Rationale**: {{timeline_rationale}}

### Budget
```
Fixed                                              Flexible
  1 -------- 2 -------- 3 -------- 4 -------- 5
                        {{budget_position}}
```
**Position**: {{budget_value}}/5
**Rationale**: {{budget_rationale}}

### Quality
```
Fixed                                              Flexible
  1 -------- 2 -------- 3 -------- 4 -------- 5
                        {{quality_position}}
```
**Position**: {{quality_value}}/5
**Rationale**: {{quality_rationale}}

## Tradeoff Summary

| Dimension | Flexibility | Priority Rank |
|-----------|-------------|---------------|
| Scope | {{scope_value}}/5 | {{scope_rank}} |
| Timeline | {{timeline_value}}/5 | {{timeline_rank}} |
| Budget | {{budget_value}}/5 | {{budget_rank}} |
| Quality | {{quality_value}}/5 | {{quality_rank}} |

**Primary Constraint**: {{primary_constraint}}

**Most Flexible**: {{most_flexible}}

## What This Means

### If We're Behind Schedule
{{schedule_pressure_response}}

### If We're Over Budget
{{budget_pressure_response}}

### If Scope Expands
{{scope_pressure_response}}

### If Quality Issues Emerge
{{quality_pressure_response}}

## Quality Dimensions

### Code Quality
- **Target Level**: {{code_quality_target}}
- **Minimum Acceptable**: {{code_quality_minimum}}
- **Measurement**: {{code_quality_measurement}}

### Test Coverage
- **Target Level**: {{test_coverage_target}}
- **Minimum Acceptable**: {{test_coverage_minimum}}
- **Types Required**: {{test_types_required}}

### Documentation
- **Target Level**: {{documentation_target}}
- **Minimum Acceptable**: {{documentation_minimum}}
- **Required Artifacts**: {{documentation_required}}

### Performance
- **Target Level**: {{performance_target}}
- **Minimum Acceptable**: {{performance_minimum}}
- **Key Metrics**: {{performance_metrics}}

## Acceptable Compromises

{{#acceptable_compromises}}
- {{.}}
{{/acceptable_compromises}}

## Unacceptable Compromises

{{#unacceptable_compromises}}
- {{.}}
{{/unacceptable_compromises}}

## Decision Framework

When tradeoff decisions arise:

1. **Consult**: {{tradeoff_decision_maker}}
2. **Consider**: Impact on {{primary_constraint}} first
3. **Document**: Record decision and rationale
4. **Communicate**: Inform {{tradeoff_stakeholders}}

---

# Section 10: What It Takes

## Executive Summary

To deliver {{product_name}}, we need:

- **Team**: {{team_summary}}
- **Duration**: {{duration_summary}}
- **Budget**: {{budget_summary}}
- **Key Dependencies**: {{dependencies_summary}}

## Team Composition

### Required Roles

{{#required_roles}}
#### {{role}}
- **Count**: {{count}}
- **Level**: {{level}}
- **Key Skills**: {{skills}}
- **Allocation**: {{allocation}}
- **Duration**: {{duration}}
- **Status**: {{status}}
{{/required_roles}}

### Team Structure

```
{{team_structure_diagram}}
```

### Total Headcount
- **Core Team**: {{core_headcount}}
- **Extended Team**: {{extended_headcount}}
- **Total FTE**: {{total_fte}}

## Skills Matrix

| Skill | Required Level | Available | Gap |
|-------|----------------|-----------|-----|
{{#skills_matrix}}
| {{skill}} | {{required}} | {{available}} | {{gap}} |
{{/skills_matrix}}

### Skill Gap Mitigation

{{#skill_gaps}}
- **{{skill}}**: {{mitigation}}
{{/skill_gaps}}

## Tools & Infrastructure

### Development Tools
{{#dev_tools}}
- **{{tool}}**: {{purpose}} - {{cost}}
{{/dev_tools}}

### Infrastructure
{{#infrastructure}}
- **{{item}}**: {{purpose}} - {{cost}}
{{/infrastructure}}

### Licenses & Subscriptions
{{#licenses}}
- **{{name}}**: {{count}} seats - {{cost}}
{{/licenses}}

## Budget Breakdown

| Category | Estimated Cost | Notes |
|----------|----------------|-------|
{{#budget_breakdown}}
| {{category}} | {{cost}} | {{notes}} |
{{/budget_breakdown}}

**Total Estimated Budget**: {{total_budget}}

**Contingency ({{contingency_percentage}}%)**: {{contingency_amount}}

**Grand Total**: {{grand_total}}

## Timeline Requirements

### Key Dates

| Milestone | Date | Dependency |
|-----------|------|------------|
{{#key_dates}}
| {{milestone}} | {{date}} | {{dependency}} |
{{/key_dates}}

### Critical Path
{{#critical_path}}
1. {{.}}
{{/critical_path}}

## Dependencies

### Internal Dependencies
{{#internal_dependencies}}
- **{{dependency}}**: {{owner}} - {{status}}
{{/internal_dependencies}}

### External Dependencies
{{#external_dependencies}}
- **{{dependency}}**: {{owner}} - {{status}}
{{/external_dependencies}}

## Environment Requirements

### Development
{{#dev_environment}}
- {{.}}
{{/dev_environment}}

### Testing
{{#test_environment}}
- {{.}}
{{/test_environment}}

### Production
{{#prod_environment}}
- {{.}}
{{/prod_environment}}

## Governance & Process

### Methodology
{{methodology}}

### Ceremonies
{{#ceremonies}}
- **{{name}}**: {{frequency}} - {{participants}}
{{/ceremonies}}

### Reporting
{{#reporting}}
- **{{report}}**: {{frequency}} - {{audience}}
{{/reporting}}

## Support Requirements

### During Development
{{support_during_dev}}

### Post-Launch
{{support_post_launch}}

## Success Factors

### Must Have
{{#must_have}}
- {{.}}
{{/must_have}}

### Should Have
{{#should_have}}
- {{.}}
{{/should_have}}

### Nice to Have
{{#nice_to_have}}
- {{.}}
{{/nice_to_have}}

## Commitment Request

We are asking for:

{{#commitments}}
- {{.}}
{{/commitments}}

### Approval Required From
{{#approvers}}
- {{name}} ({{role}}): {{approval_for}}
{{/approvers}}

---

# Open Questions

{{#open_questions}}
- {{.}}
{{/open_questions}}

{{^open_questions}}
*No open questions at this time.*
{{/open_questions}}

---

*Inception Deck - Complete Document*
