---
title: "05 Task Hierarchy"
description: "Tasks structurally tied to the goal they serve, with sub-tasks and rollup"
draft: false
revision: "1.0"
revision_date: "13-Sep-2026"
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

Tasks inherit the base fields shared with Goals (title, description, status) and
extend them with task-specific attributes:

- Estimated effort or duration
- Recurrence rule
- Checklist of sub-tasks
- Actual completion date

Tasks also carry a Life Area, but not as an independently-set field the way Goals
do — see [FEAT-0505](#feat-0505-task-life-area) below.

## FEAT-0502 Task-to-goal linkage

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Tasks link to exactly one parent Goal. A task exists to serve a goal — no orphan
tasks are permitted.

#### Note

A Task's due date is subject to the same due date consistency rule as Goals — it
cannot remain later than any ancestor's date (its parent Goal, or an ancestor Task
via nesting) — see
[00 Base Entity Features, FEAT-0005](/nailed-it-docs/features/00-base-entity-features#feat-0005-due-date-consistency-across-the-entity-tree).

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
| **Extends** | [FEAT-0001 - Core planning entity fields](/nailed-it-docs/features/00-base-entity-features#feat-0001-core-planning-entity-fields) |

### Description

Task status (Not Started / In Progress / Completed / On Hold — see
[FEAT-0001](/nailed-it-docs/features/00-base-entity-features#feat-0001-core-planning-entity-fields))
rolls up into a visible completion percentage on the parent Goal or parent Task.
Abandoned and Archived (see
[FEAT-0007](/nailed-it-docs/features/00-base-entity-features#feat-0007-abandon-and-recommit)
and [FEAT-0008](/nailed-it-docs/features/00-base-entity-features#feat-0008-archive-a-completed-entity))
are separate flags layered on top of Status, not additional values in this rollup.

## FEAT-0505 Task Life Area

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0308 - Primary Life Area](/nailed-it-docs/features/03-goal-hierarchy#feat-0308-primary-life-area) |

### Description

A Task has no independent Life Area of its own. It always mirrors its parent Goal's
*current* primary Life Area, live — if the Goal's primary changes, every Task under
it reflects the new value immediately, with no separate sync step and nothing to
confirm (unlike the optional cascade offered for sub-goals, see
[03 Goal Hierarchy, FEAT-0307](/nailed-it-docs/features/03-goal-hierarchy#feat-0307-optional-life-area-cascade-on-primary-change) —
a Task never had an independent value that a change could overwrite).

A Task's Life Area is filterable (see
[13 UI and Shared Features](/nailed-it-docs/features/13-ui-and-shared-features)) but
not independently settable, and carries no Impacted Life Areas of its own — those
are a Goal-only concept (see
[03 Goal Hierarchy, FEAT-0309](/nailed-it-docs/features/03-goal-hierarchy#feat-0309-impacted-life-areas)).

On the [Vision Board](/nailed-it-docs/features/02-vision-board), a Task node has no
Life Area edge at all — its Life Area shows as a single badge only, reflecting the
derived value.

## Revision History

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.4 - 13-Sep-2026

- FEAT-0501: removed "life area tagging" from the shared-fields list — a Task's
  Life Area isn't an independently-set field like a Goal's.
- Added FEAT-0505: a Task's Life Area is derived, live, from its parent Goal's
  current primary — filterable, not settable, no Impacted Life Areas, shown as a
  single badge (no edge) on the Vision Board.

### Version 0.3 - 12-Sep-2026

- Reconciled FEAT-0504's Status values (Not started/In progress/Done/Blocked) with
  FEAT-0001's four-value enum (Not Started/In Progress/Completed/On Hold) in 00 Base
  Entity Features, and noted Abandoned/Archived are separate flags, not additional
  rollup values.

### Version 0.2 - 07-Sep-2026

- Noted in FEAT-0502 that a Task's due date is subject to the FEAT-0005 due date
  consistency rule in 00 Base Entity Features.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
