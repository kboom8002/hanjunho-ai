---
description: Specification-Driven Development (SDD) Workflow
---

# Specification-Driven Development (SDD) Skill

## Overview
This skill instructs the agent to follow a strict Specification-Driven Development process. In this workspace, no functional code should be written without prior specification.

## Core Directives

1.  **Specification First**: Never write implementation code until a Product Requirement Document (PRD) and a Technical Specification (Tech Spec) have been written and approved by the user.
2.  **Read Existing Context**: Always read the existing PRD and Tech Specs in `docs/specs/` before suggesting architectural changes.
3.  **Use Templates**: Use the templates provided in `docs/templates/` to create new specifications. 
    - `docs/templates/prd_template.md`
    - `docs/templates/tech_spec_template.md`
4.  **Save in Specs Target**: Always save newly generated specs into `docs/specs/`.

## Workflow Phases

### Phase 1: Requirements Gathering (PRD)
When the user asks to build a new feature:
- Write or update a PRD using the PRD template. 
- Ask clarifying questions if the requirements are ambiguous.
- Present the PRD to the user for approval. Do not proceed until approved.

### Phase 2: Technical Design (Tech Spec)
Once the PRD is approved:
- Write a detailed Technical Specification based on the PRD using the Tech Spec template.
- Identify data models, APIs, component architectures, and testing strategies.
- Present the Tech Spec to the user for approval. 

### Phase 3: Implementation
Once the Tech Spec is approved:
- Break down the implementation into smaller tasks.
- If appropriate, build tests first. 
- Write the application code exactly conforming to the Tech Spec.

## Exception
If the user explicitly uses words like "prototype", "scratch", or "hack this together", you may bypass SDD and write code directly. However, strongly recommend creating a spec if the task is complex.
