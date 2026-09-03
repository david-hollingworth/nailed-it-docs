---
title: "05 Task Hierarchy"
description: "Tasks structurally tied to the goal they serve, with sub-tasks and rollup"
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
---

Tasks exist to serve a Goal — there are no orphan tasks, consistent with Application
Goal 1 in the PRD (every task traces back to a life area and, from there, to the
vision statement).

## FEAT-0501 Task fields

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Core planning entity fields](/nailed-it-docs/features/00-base-entity-features#feat-0001-core-planning-entity-fields) |

### Description

Tasks inherit the base fields shared with Goals (title, description, life area
tagging, status) and extend them with task-specific attributes:

- Estimated effort or duration
- Recurrence rule
- Checklist of sub-tasks
- Actual completion date

## FEAT-0502 Task-to-goal linkage

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Tasks link to exactly one parent Goal. A task exists to serve a goal — no orphan
tasks are permitted.

## FEAT-0503 Sub-tasks

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

Tasks can be nested (sub-tasks) at least one level deep. Sub-tasks are linked to
their parent task, not directly to a goal.

## FEAT-0504 Task status rollup

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Task status (Not started / In progress / Done / Blocked) rolls up into a visible
completion percentage on the parent Goal or parent Task.

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
