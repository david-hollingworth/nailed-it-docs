---
title: "05 Task Hierarchy"
description: "Tasks structurally tied to the goal they serve, with sub-tasks and rollup"
draft: false
revision: "1.2"
revision_date: "20-Sep-2026"
---

Tasks exist to serve a Goal — there are no orphan tasks, consistent with Application
Goal 1 in the PRD (every task traces back to a life area and, from there, to the
vision statement).

Task shares a large common core with Goal — base fields, due date consistency across
the tree, and lifecycle (Abandon/Recommit, Archive, Stale/Needs Review) — defined in
[03 Goal Hierarchy](/nailed-it-docs/design-documentation/features/03-goal-hierarchy), since neither is
genuinely shared with Life Area or Habit. FEAT-0506 through FEAT-0509 below exist to
give each of those shared behaviours its own Task-side FEAT id to relate
requirements to — they extend Goal's version identically, with no Task-specific
variation, rather than describing something that differs.

## FEAT-0501 Task fields {#feat-0501}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0310 - Core planning entity fields](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0310) |

### Description

Tasks inherit the base fields shared with Goals (title, description, status, active, due-date) and
extend them with task-specific attributes:

- Estimated effort or duration
- Recurrence rule
- Actual completion date

Tasks also carry a Life Area, but not as an independently-set field the way Goals
do — see [FEAT-0505](#feat-0505) below.

## FEAT-0502 Task-to-goal linkage {#feat-0502}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Tasks link to exactly one parent Goal. A task exists to serve a goal — no orphan
tasks are permitted.

## FEAT-0503 Sub-tasks {#feat-0503}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Create entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0001) |

### Description

Tasks can be nested (sub-tasks) to an unlimited depth. Sub-tasks are linked to
their parent task, not directly to a goal.

## FEAT-0504 Task status rollup {#feat-0504}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0310 - Core planning entity fields](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0310) |

### Description

Task status (Not Started / In Progress / Completed / On Hold / Blocked — see
[03 Goal Hierarchy, FEAT-0310](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0310))
rolls up into a visible completion percentage on the parent Goal or parent Task.
Abandoned and Archived (see
[03 Goal Hierarchy, FEAT-0312](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0312)
and [FEAT-0313](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0313))
are separate flags layered on top of Status, not additional values in this rollup.

## FEAT-0505 Task Life Area {#feat-0505}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0308 - Primary Life Area](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0308) |

### Description

A Task has no independent Life Area of its own. It always mirrors its parent Goal's
*current* primary Life Area, live — if the Goal's primary changes, every Task under
it reflects the new value immediately, with no separate sync step and nothing to
confirm (unlike the optional cascade offered for sub-goals, see
[03 Goal Hierarchy, FEAT-0307](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0307) —
a Task never had an independent value that a change could overwrite).

A Task's Life Area is filterable (see
[13 UI and Shared Features](/nailed-it-docs/design-documentation/features/13-ui-and-shared-features)) but
not independently settable, and carries no Impacted Life Areas of its own — those
are a Goal-only concept (see
[03 Goal Hierarchy, FEAT-0309](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0309)).

On the [Vision Board](/nailed-it-docs/design-documentation/features/02-vision-board), a Task node has no
Life Area edge at all — its Life Area shows as a single badge only, reflecting the
derived value.

## FEAT-0506 Task due date consistency {#feat-0506}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0311 - Due date consistency across the entity tree](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0311) |

### Description

A Task's due date is subject to the same due date consistency rule as a Goal's
target date — it cannot remain later than any ancestor's date (its parent Goal, or
an ancestor Task via nesting), and is subject to the same ascending/descending
cascade behaviour, including on re-parenting. No Task-specific variation — see
[03 Goal Hierarchy, FEAT-0311](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0311)
for the full rule.

## FEAT-0507 Task Abandon and Recommit {#feat-0507}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0312 - Abandon and recommit](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0312) |

### Description

A Task can be marked Abandoned and later Recommitted identically to a Goal — a
mandatory reason on both actions, an append-only event log, and cascade to
descendant sub-tasks. No Task-specific variation — see
[03 Goal Hierarchy, FEAT-0312](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0312)
for the full rule.

## FEAT-0508 Task Archive {#feat-0508}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0313 - Archive a completed entity](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0313) |

### Description

A Task can be Archived identically to a Goal — reachable only from Completed status,
with no reversal. No Task-specific variation — see
[03 Goal Hierarchy, FEAT-0313](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0313)
for the full rule.

## FEAT-0509 Task Stale / Needs Review {#feat-0509}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0314 - Stale / Needs Review signal](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0314) |

### Description

A Task is flagged Stale/Needs Review identically to a Goal — computed from no
update in N days, an overdue scheduled review or  N days past its Due-Date, independent of its `status`
value. No Task-specific variation — see
[03 Goal Hierarchy, FEAT-0314](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0314)
for the full rule.

## Revision History

### Version 1.2 - 20-Sep-2026

- FEAT-0501 - Added "Active" and "due-date" as a core fields. Removed Cheecklist of sub-tasks. Sub-tasks are theirs own inedpendnt entities and any checklists can be built dynamicaally.
- FEAT-0503 - Changed "to at least one level deep" to "unlimited depth"
- FEAT-0504 - Added Blocked as a task status.
- FEAT-0509 - Added "N days past Due-Date" as a task trigger for the Stale/Needs Review flag.

### Version 1.1 - 17-Sep-2026

- Added FEAT-0506, FEAT-0507, FEAT-0508, and FEAT-0509: explicit Task-side entries
  extending 03 Goal Hierarchy's relocated Due Date Consistency, Abandon/Recommit,
  Archive, and Stale/Needs Review features respectively. Previously these applied
  to Task only implicitly, via the base-entity file's own "Goal or Task" scoping,
  with no Task-side FEAT id to relate a Task-specific requirement to.
- FEAT-0502: removed the due-date-consistency note, now superseded by the explicit
  FEAT-0506.
- FEAT-0501 and FEAT-0504: updated Extends/references from
  [00 Base Entity Features](/nailed-it-docs/design-documentation/features/00-base-entity-features) to the
  relocated FEAT-0310/FEAT-0312/FEAT-0313 in
  [03 Goal Hierarchy](/nailed-it-docs/design-documentation/features/03-goal-hierarchy). File order
  remains by FEAT number.

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
