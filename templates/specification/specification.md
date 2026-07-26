# Technical Specification

**Project**: {{project_name}}
**Generated**: {{generated_date}}

---

# Assumptions Log

All assumptions made during the design process are documented here. These should be validated as the project progresses.

| ID | Assumption | Source | Impact if Wrong | Validation Plan | Status |
|----|------------|--------|-----------------|-----------------|--------|
{{#assumptions}}
| {{id}} | {{description}} | {{source}} | {{impact_if_wrong}} | {{validation_plan}} | {{status}} |
{{/assumptions}}

{{^assumptions}}
*No assumptions documented yet.*
{{/assumptions}}

---

# Technology Stack

## Overview

Key technologies selected for this solution:

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
{{#technology_stack}}
| {{layer}} | {{technology}} | {{version}} | {{rationale}} |
{{/technology_stack}}

## Technology Details

{{#technology_details}}
### {{technology}}

| Attribute | Value |
|-----------|-------|
| **Layer** | {{layer}} |
| **Version** | {{version}} |
| **License** | {{license}} |

**Selection Rationale**: {{rationale}}

**Alternatives Considered**:
{{#alternatives}}
- {{name}}: {{reason_rejected}}
{{/alternatives}}

**Risks/Limitations**:
{{#risks}}
- {{.}}
{{/risks}}

**Team Readiness**: {{team_readiness}}

{{/technology_details}}

---

# Architectural Patterns

Patterns applied to this solution:

{{#architectural_patterns}}
## {{name}}

| Attribute | Value |
|-----------|-------|
| **Category** | {{category}} |
| **Where Applied** | {{where_applied}} |

**Problem Solved**: {{problem_solved}}

**Implementation Notes**: {{implementation_notes}}

**Trade-offs**:
- **Benefits**: {{benefits}}
- **Complexity Added**: {{complexity}}

**References**:
{{#references}}
- {{.}}
{{/references}}

---

{{/architectural_patterns}}

{{^architectural_patterns}}
*No architectural patterns documented yet.*
{{/architectural_patterns}}

---

# Use Cases

## Use Case Summary

| ID | Name | Primary Actor | Priority |
|----|------|---------------|----------|
{{#use_cases_summary}}
| {{id}} | {{name}} | {{actor}} | {{priority}} |
{{/use_cases_summary}}

## Actors

{{#actors}}
### {{name}}
- **Type**: {{type}} (Primary / Secondary / System)
- **Description**: {{description}}
- **Goals**: {{goals}}
{{/actors}}

## Detailed Use Cases

{{#use_cases}}
### {{id}}: {{name}}

#### Overview
| Attribute | Value |
|-----------|-------|
| **Primary Actor** | {{primary_actor}} |
| **Priority** | {{priority}} |
| **Complexity** | {{complexity}} |
| **Status** | {{status}} |
| **Source** | {{source}} |

#### Description
{{description}}

#### Preconditions
{{#preconditions}}
- {{.}}
{{/preconditions}}

#### Postconditions (Success)
{{#postconditions_success}}
- {{.}}
{{/postconditions_success}}

#### Postconditions (Failure)
{{#postconditions_failure}}
- {{.}}
{{/postconditions_failure}}

#### Triggers
{{#triggers}}
- {{.}}
{{/triggers}}

#### Main Success Scenario

| Step | Actor | System |
|------|-------|--------|
{{#main_scenario}}
| {{step}} | {{actor_action}} | {{system_response}} |
{{/main_scenario}}

#### Extensions (Alternative Flows)

{{#extensions}}
##### {{id}}: {{name}}
**Condition**: {{condition}}
**Steps**:
{{#steps}}
- {{step}}. {{description}}
{{/steps}}
**Rejoins at**: Step {{rejoin_step}}
{{/extensions}}

#### Exceptions (Error Flows)

{{#exceptions}}
##### {{id}}: {{name}}
**Condition**: {{condition}}
**Handler**:
{{#handler_steps}}
- {{.}}
{{/handler_steps}}
**Outcome**: {{outcome}}
{{/exceptions}}

#### Business Rules
{{#business_rules}}
- **{{rule_id}}**: {{description}}
{{/business_rules}}

#### Data Requirements
{{#data_requirements}}
- **{{field}}**: {{type}} - {{constraints}}
{{/data_requirements}}

#### UI/UX Notes
{{ui_notes}}

#### Non-Functional Requirements
{{#nfr}}
- **{{category}}**: {{requirement}}
{{/nfr}}

---

{{/use_cases}}

## Use Case Relationships

### Include Relationships
{{#includes}}
- {{source}} includes {{target}}
{{/includes}}

### Extend Relationships
{{#extends}}
- {{extension}} extends {{base}} when {{condition}}
{{/extends}}

### Generalization
{{#generalizations}}
- {{specific}} specializes {{general}}
{{/generalizations}}

## Traceability

| Use Case | Inception Deck Section | Requirement ID |
|----------|----------------------|----------------|
{{#traceability}}
| {{use_case}} | {{inception_section}} | {{requirement_id}} |
{{/traceability}}

---

# C4 Context Diagram

## Overview

This diagram shows {{system_name}} in context with its users and external systems.

## Context Diagram

```mermaid
C4Context
    title System Context Diagram for {{system_name}}

    {{#persons}}
    Person({{id}}, "{{name}}", "{{description}}")
    {{/persons}}

    System({{system_id}}, "{{system_name}}", "{{system_description}}")

    {{#external_systems}}
    System_Ext({{id}}, "{{name}}", "{{description}}")
    {{/external_systems}}

    {{#relationships}}
    Rel({{from}}, {{to}}, "{{description}}"{{#technology}}, "{{technology}}"{{/technology}})
    {{/relationships}}
```

## System Under Design

### {{system_name}}

**Description**: {{system_description}}

**Key Responsibilities**:
{{#system_responsibilities}}
- {{.}}
{{/system_responsibilities}}

**Key Interfaces**:
{{#system_interfaces}}
- {{.}}
{{/system_interfaces}}

## Users / Personas

{{#persons}}
### {{name}}

| Attribute | Value |
|-----------|-------|
| **ID** | {{id}} |
| **Type** | {{type}} |
| **Description** | {{description}} |

**Goals**:
{{#goals}}
- {{.}}
{{/goals}}

**Interactions with System**:
{{#interactions}}
- {{.}}
{{/interactions}}

{{/persons}}

## External Systems

{{#external_systems}}
### {{name}}

| Attribute | Value |
|-----------|-------|
| **ID** | {{id}} |
| **Type** | {{type}} |
| **Owner** | {{owner}} |
| **Description** | {{description}} |

**Integration Purpose**: {{integration_purpose}}

**Data Exchanged**:
{{#data_exchanged}}
- **{{direction}}**: {{data}}
{{/data_exchanged}}

**Integration Method**: {{integration_method}}

**SLA / Availability**: {{sla}}

**Documentation**: {{documentation_link}}

{{/external_systems}}

## Relationships Summary

| From | To | Relationship | Protocol |
|------|-----|-------------|----------|
{{#relationships_table}}
| {{from_name}} | {{to_name}} | {{description}} | {{protocol}} |
{{/relationships_table}}

## Boundary Notes

### What's Inside the Boundary
{{#inside_boundary}}
- {{.}}
{{/inside_boundary}}

### What's Outside the Boundary
{{#outside_boundary}}
- {{.}}
{{/outside_boundary}}

## Key Constraints

{{#constraints}}
- **{{category}}**: {{description}}
{{/constraints}}

---

# C4 Container Diagram

## Overview

This diagram shows the high-level technology building blocks of {{system_name}}.

## Container Diagram

```mermaid
C4Container
    title Container Diagram for {{system_name}}

    {{#persons}}
    Person({{id}}, "{{name}}", "{{description}}")
    {{/persons}}

    System_Boundary({{system_id}}, "{{system_name}}") {
        {{#containers}}
        Container({{id}}, "{{name}}", "{{technology}}", "{{description}}")
        {{/containers}}

        {{#databases}}
        ContainerDb({{id}}, "{{name}}", "{{technology}}", "{{description}}")
        {{/databases}}

        {{#queues}}
        ContainerQueue({{id}}, "{{name}}", "{{technology}}", "{{description}}")
        {{/queues}}
    }

    {{#external_systems}}
    System_Ext({{id}}, "{{name}}", "{{description}}")
    {{/external_systems}}

    {{#relationships}}
    Rel({{from}}, {{to}}, "{{description}}", "{{technology}}")
    {{/relationships}}
```

## Container Inventory

{{#containers}}
### {{name}}

| Attribute | Value |
|-----------|-------|
| **ID** | {{id}} |
| **Type** | {{type}} |
| **Technology** | {{technology}} |
| **Description** | {{description}} |

**Responsibilities**:
{{#responsibilities}}
- {{.}}
{{/responsibilities}}

**Key Interfaces**:
| Interface | Protocol | Description |
|-----------|----------|-------------|
{{#interfaces}}
| {{name}} | {{protocol}} | {{description}} |
{{/interfaces}}

**Scaling Strategy**: {{scaling_strategy}}

**Deployment**: {{deployment}}

{{/containers}}

## Databases

{{#databases}}
### {{name}}

| Attribute | Value |
|-----------|-------|
| **ID** | {{id}} |
| **Technology** | {{technology}} |
| **Type** | {{db_type}} |
| **Description** | {{description}} |

**Data Stored**:
{{#data_stored}}
- {{entity}}: {{description}}
{{/data_stored}}

**Sizing Estimates**:
- **Initial Size**: {{initial_size}}
- **Growth Rate**: {{growth_rate}}
- **Retention**: {{retention}}

**Backup Strategy**: {{backup_strategy}}

{{/databases}}

## Message Queues / Event Streams

{{#queues}}
### {{name}}

| Attribute | Value |
|-----------|-------|
| **ID** | {{id}} |
| **Technology** | {{technology}} |
| **Description** | {{description}} |

**Message Types**:
{{#message_types}}
- **{{name}}**: {{description}}
{{/message_types}}

**Throughput**: {{throughput}}

**Retention**: {{retention}}

{{/queues}}

## Communication Patterns

### Synchronous Communication

| From | To | Protocol | Purpose |
|------|-----|----------|---------|
{{#sync_communication}}
| {{from}} | {{to}} | {{protocol}} | {{purpose}} |
{{/sync_communication}}

### Asynchronous Communication

| From | To | Mechanism | Purpose |
|------|-----|-----------|---------|
{{#async_communication}}
| {{from}} | {{to}} | {{mechanism}} | {{purpose}} |
{{/async_communication}}

## Technology Stack Summary

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
{{#tech_stack}}
| {{layer}} | {{technology}} | {{version}} | {{notes}} |
{{/tech_stack}}

## Security Boundaries

{{#security_boundaries}}
### {{name}}
- **Boundary Type**: {{type}}
- **Protection**: {{protection}}
- **Components**: {{components}}
{{/security_boundaries}}

## Cross-Cutting Concerns

### Authentication
{{authentication}}

### Authorization
{{authorization}}

### Logging
{{logging}}

### Monitoring
{{monitoring}}

### Error Handling
{{error_handling}}

---

# C4 Component Diagrams

{{#component_diagrams}}
## {{container_name}} Components

### Overview

This diagram shows the internal structure of the **{{container_name}}** container.

### Component Diagram

```mermaid
C4Component
    title Component Diagram for {{container_name}}

    Container_Boundary({{container_id}}, "{{container_name}}") {
        {{#components}}
        Component({{id}}, "{{name}}", "{{technology}}", "{{description}}")
        {{/components}}
    }

    {{#external_containers}}
    Container({{id}}, "{{name}}", "{{technology}}", "{{description}}")
    {{/external_containers}}

    {{#external_systems}}
    System_Ext({{id}}, "{{name}}", "{{description}}")
    {{/external_systems}}

    {{#relationships}}
    Rel({{from}}, {{to}}, "{{description}}"{{#technology}}, "{{technology}}"{{/technology}})
    {{/relationships}}
```

### Component Inventory

{{#components}}
#### {{name}}

| Attribute | Value |
|-----------|-------|
| **ID** | {{id}} |
| **Technology** | {{technology}} |
| **Layer** | {{layer}} |
| **Description** | {{description}} |

**Responsibilities**:
{{#responsibilities}}
- {{.}}
{{/responsibilities}}

**Dependencies**:
{{#dependencies}}
- {{component}}: {{purpose}}
{{/dependencies}}

**Interfaces Provided**:
{{#interfaces_provided}}
| Name | Type | Description |
|------|------|-------------|
| {{name}} | {{type}} | {{description}} |
{{/interfaces_provided}}

**Interfaces Consumed**:
{{#interfaces_consumed}}
| Component | Interface | Purpose |
|-----------|-----------|---------|
| {{component}} | {{interface}} | {{purpose}} |
{{/interfaces_consumed}}

{{/components}}

### Design Patterns Used

{{#patterns}}
#### {{name}}
- **Where Applied**: {{where}}
- **Rationale**: {{rationale}}
- **Components Involved**: {{components}}
{{/patterns}}

### Key Flows

{{#key_flows}}
#### {{name}}

{{description}}

```mermaid
sequenceDiagram
    {{#sequence}}
    {{from}}->>{{to}}: {{action}}
    {{/sequence}}
```

{{/key_flows}}

---

{{/component_diagrams}}

# Wireframes

## Navigation Structure

```mermaid
flowchart TD
    {{navigation_flowchart}}
```

## Screen Inventory

| ID | Screen Name | Primary Use Case | Priority |
|----|-------------|------------------|----------|
{{#screens_summary}}
| {{id}} | {{name}} | {{use_case}} | {{priority}} |
{{/screens_summary}}

## Wireframes

{{#wireframes}}
### {{id}}: {{name}}

#### Purpose
{{purpose}}

#### Related Use Cases
{{#related_use_cases}}
- {{.}}
{{/related_use_cases}}

#### Wireframe

```
{{ascii_wireframe}}
```

#### Layout Description
{{layout_description}}

#### Elements

| Element | Type | Description | Behavior |
|---------|------|-------------|----------|
{{#elements}}
| {{name}} | {{type}} | {{description}} | {{behavior}} |
{{/elements}}

#### States

{{#states}}
##### {{state_name}}
{{state_description}}
```
{{state_wireframe}}
```
{{/states}}

#### Interactions

| Trigger | Action | Result |
|---------|--------|--------|
{{#interactions}}
| {{trigger}} | {{action}} | {{result}} |
{{/interactions}}

#### Validation Rules
{{#validation_rules}}
- **{{field}}**: {{rule}}
{{/validation_rules}}

#### Accessibility Notes
{{#accessibility}}
- {{.}}
{{/accessibility}}

#### Responsive Behavior
| Breakpoint | Layout Changes |
|------------|----------------|
{{#responsive}}
| {{breakpoint}} | {{changes}} |
{{/responsive}}

---

{{/wireframes}}

## User Flows

{{#user_flows}}
### {{name}}

**Description**: {{description}}

```mermaid
flowchart TD
    {{#nodes}}
    {{id}}[{{label}}]
    {{/nodes}}
    {{#edges}}
    {{from}} -->{{#label}}|{{label}}|{{/label}} {{to}}
    {{/edges}}
```

**Steps**:
{{#steps}}
{{number}}. **{{screen}}**: {{action}}
{{/steps}}

---

{{/user_flows}}

## Component Library

{{#common_components}}
### {{name}}

**Description**: {{description}}

**Visual**:
```
{{visual}}
```

**Variants**:
{{#variants}}
- **{{name}}**: {{description}}
{{/variants}}

**Props/Parameters**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
{{#props}}
| {{name}} | {{type}} | {{required}} | {{description}} |
{{/props}}

{{/common_components}}

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
{{#colors}}
| {{name}} | {{value}} | {{usage}} |
{{/colors}}

### Typography
| Token | Value | Usage |
|-------|-------|-------|
{{#typography}}
| {{name}} | {{value}} | {{usage}} |
{{/typography}}

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
{{#spacing}}
| {{name}} | {{value}} | {{usage}} |
{{/spacing}}

## Error States

{{#error_states}}
### {{screen}}

**Error Conditions**:
{{#errors}}
- **{{condition}}**: {{display}}
{{/errors}}
{{/error_states}}

## Loading States

{{#loading_states}}
### {{screen}}
- **Trigger**: {{trigger}}
- **Indicator**: {{indicator}}
- **Duration Expectation**: {{duration}}
{{/loading_states}}

## Empty States

{{#empty_states}}
### {{screen}}
- **Condition**: {{condition}}
- **Message**: {{message}}
- **Call to Action**: {{cta}}
{{/empty_states}}

---

# Architectural Decision Records

{{#adrs}}
## ADR-{{adr_number}}: {{title}}

**Date**: {{date}}
**Status**: {{status}}

### Context

{{context}}

#### Problem Statement
{{problem_statement}}

#### Forces at Play
{{#forces}}
- {{.}}
{{/forces}}

#### Constraints
{{#constraints}}
- {{.}}
{{/constraints}}

### Decision Drivers

{{#decision_drivers}}
- **{{driver}}**: {{importance}} priority
{{/decision_drivers}}

### Considered Options

{{#options}}
#### Option {{number}}: {{name}}

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

{{/options}}

### Decision

**We will use**: {{chosen_option}}

#### Rationale
{{rationale}}

### Consequences

**Positive**:
{{#positive_consequences}}
- {{.}}
{{/positive_consequences}}

**Negative**:
{{#negative_consequences}}
- {{.}}
{{/negative_consequences}}

**Neutral**:
{{#neutral_consequences}}
- {{.}}
{{/neutral_consequences}}

### Implementation

**Approach**: {{implementation_approach}}

**Tasks**:
{{#implementation_tasks}}
- [ ] {{.}}
{{/implementation_tasks}}

**Timeline**: {{implementation_timeline}}

### Validation

**Success Metrics**:
{{#success_metrics}}
- {{metric}}: {{target}}
{{/success_metrics}}

**Review Date**: {{review_date}}

---

{{/adrs}}

# Open Questions

{{#open_questions}}
- {{.}}
{{/open_questions}}

{{^open_questions}}
*No open questions at this time.*
{{/open_questions}}

---

*Technical Specification - Complete Document*

---

<sub>Built with [LoreWork](https://github.com/phelpsbn42/LoreWork) - Capture organizational knowledge through structured, AI-guided solution delivery.</sub>
