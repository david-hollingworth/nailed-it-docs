---
title: "00 Base Entity Features"
description: "Shared field and lifecycle patterns that Nailed-It's planning entities extend."
draft: false
revision: "1.0"
revision_date: "13-Sep-2026"
---

## Overview

Several of Nailed-It's planning entities — Goals, Tasks, Habits, and Life Areas — share
a common set of base fields and lifecycle behaviours. The feature definitions below are
intended to be generic. Each concrete feature file states which of these it extends and
how.

This does not cover the Vision Statement (a single versioned record, not a list of
entities — see [01 Life Vision Statement](/nailed-it-docs/features/01-life-vision)) or
Reviews (instantiated by the review engine rather than created directly by the user —
see [07 Structured Review Cycle](/nailed-it-docs/features/07-review-cycle)).

## FEAT-0001 Core planning entity fields

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Every Goal and Task carries a common base set of fields, per the PRD's Core Data Model:

- Title
- Description
- Status — one of Not Started / In Progress / Completed / On Hold. Abandoned and
  Archived are separate flags layered on top of Status, not additional enum values
  — see [FEAT-0007](#feat-0007-abandon-and-recommit) and
  [FEAT-0008](#feat-0008-archive-a-completed-entity).
- Due date / target date — captured differently by entity type: a Task's due date is set directly by the user; a Goal's target date is computed from its SMARTER Time-bound duration (years + months) rather than picked directly — see [03 Goal Hierarchy](/nailed-it-docs/features/03-goal-hierarchy) and [04 Goal Depth](/nailed-it-docs/features/04-goal-depth-well-formed-outcome). Both resolve to a real, storable date, so filtering, sorting, and calendar views can treat Goals and Tasks uniformly.

Life Area is not one of these shared fields — it's handled differently by entity
type. A Goal carries its own independent primary Life Area (plus optional Impacted
Life Areas) — see
[03 Goal Hierarchy, FEAT-0308](/nailed-it-docs/features/03-goal-hierarchy#feat-0308-primary-life-area)
and [FEAT-0309](/nailed-it-docs/features/03-goal-hierarchy#feat-0309-impacted-life-areas).
A Task has no independent Life Area of its own; it derives one, live, from its
parent Goal — see
[05 Task Hierarchy, FEAT-0505](/nailed-it-docs/features/05-task-hierarchy#feat-0505-task-life-area).

Concrete entity types extend this base with their own additional fields — see
[03 Goal Hierarchy](/nailed-it-docs/features/03-goal-hierarchy) and
[05 Task Hierarchy](/nailed-it-docs/features/05-task-hierarchy).

## FEAT-0002 Create entity

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Life Areas, Goals, Tasks, and Habits are each created via a dedicated form. Creation is
available both from the entity's own list/board view and — for Life Areas, Goals, and
Tasks — from the [Vision Board](/nailed-it-docs/features/02-vision-board), which stays
in sync with records created either way.

## FEAT-0003 Edit entity

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The user can edit all editable properties of an existing Life Area, Goal, Task, or
Habit from a dedicated edit view. System-set fields (e.g. date created) are read-only.

## FEAT-0004 Delete entity

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The user can delete a Life Area, Goal, Task, or Habit. The user is asked to confirm
before deletion takes place.

Deletes cascade. Deleting a goal or a task deletes all child goals or tasks. If there 
are child entities then the user is asked a second time before the deletion takes place.

#### Note — scope relative to Abandon

Per [Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview),
Delete and [Abandon](#feat-0007-abandon-and-recommit) now have distinct roles: Delete
is for a Goal or Task that should never have existed (a duplicate, a typo, a test
entry) and needs no reason. Abandon is for one the user simply stopped pursuing, and
requires a mandatory reason — see FEAT-0007. Both cascade to descendants identically.

## FEAT-0005 Due date consistency across the entity tree

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Core planning entity fields](/nailed-it-docs/features/00-base-entity-features#feat-0001-core-planning-entity-fields) |

### Description

Across the full Goal/Task tree — sub-goals, a Goal's Tasks, and a Task's sub-tasks, at
any depth — if a descendant's due date/target date is edited to fall after one of its
ancestors' dates, this is the **ascending** case: the ancestor's date would need to
move out to stay consistent, since it cannot reach 100% progress (see
[FEAT-0302](/nailed-it-docs/features/03-goal-hierarchy#feat-0302-goal-parentchild-progress-rollup))
by a date one of its parts hasn't yet reached. For example, a Task due 15-Sep-2026
sits under a Goal targeting 31-Oct-2026; if the Task's due date is moved to
15-Nov-2026, the Goal's target date would need to move out to at least 15-Nov-2026.

Conversely, if an ancestor's date is edited to fall before one or more of its
descendants' dates, this is the **descending** case: those descendants' dates would
need to move earlier to fit inside the shortened window. For example, a Goal targets
31-Oct-2026 and has a child Task due 15-Oct-2026; if the Goal's Time-bound duration is
shortened so its target date becomes 01-Oct-2026, the Task's due date would need to
move in to on or before 01-Oct-2026.

This check applies whenever a due date (Task) or Time-bound duration (Goal, see
[03 Goal Hierarchy, FEAT-0301](/nailed-it-docs/features/03-goal-hierarchy#feat-0301-time-bound-target-set-as-a-duration))
is directly edited, and whenever an entity is re-parented (see
[03 Goal Hierarchy, FEAT-0305](/nailed-it-docs/features/03-goal-hierarchy#feat-0305-goal-reassignment-and-re-parenting)).

Two independent settings (see
[10 Accounts and Settings](/nailed-it-docs/features/10-accounts-and-settings)) govern
what happens when a change would cause either case above, one setting per direction:

- **Ascending** — default: cascade allowed.
- **Descending** — default: cascade blocked.

When the relevant setting allows the cascade, a confirmation dialog lists every
affected ancestor or descendant and states their dates will be updated to match.
Confirming updates all of them and saves the original change.

When the setting blocks the cascade, an informational dialog lists the affected
entities. Only the due date field on the form being edited reverts to its prior
value — any other unsaved changes on that form are retained and the record stays
open in its edit view, so the user can pick a different date and save without losing
other edits.

When a cascade changes a Goal's target date, that Goal's stored Time-bound duration
(years + months) is recalculated from the new date, rounded to the nearest month.

#### Acceptance criteria (example — ascending cascade allowed)

- Given a Task due 15-Sep-2026, under a Goal targeting 30-Sep-2026, under a Goal targeting 31-Oct-2026
- When the user edits the Task's due date to 15-Nov-2026
- Then a confirmation dialog lists both ancestor Goals and states their target dates will move to 15-Nov-2026
- And confirming updates both Goals' target dates and recalculates each Goal's stored duration to the nearest month, and saves the Task's new due date

#### Acceptance criteria (example — descending cascade blocked)

- Given a Goal targeting 31-Oct-2026 with a child Task due 15-Oct-2026
- When the user shortens the Goal's Time-bound duration so its target date would become 01-Oct-2026, while also editing the Goal's title
- Then an informational dialog lists the child Task and its due date
- And the Goal's target date field reverts to 31-Oct-2026, the edited title remains unsaved but present on the form, and the form stays open

## FEAT-0006 Impacted Life Areas — superseded

| | |
|---|---|
| **Status** | Superseded |
| **Superseded by** | [03 Goal Hierarchy, FEAT-0309](/nailed-it-docs/features/03-goal-hierarchy#feat-0309-impacted-life-areas) |

### Description

Impacted Life Areas is a Goal-specific relationship, not a shared base-entity
concept, so it's been relocated to
[03 Goal Hierarchy, FEAT-0309](/nailed-it-docs/features/03-goal-hierarchy#feat-0309-impacted-life-areas),
alongside the rest of the Goal-specific Life Area features.

#### Note

The ID is kept rather than removed, in case anything still links to it directly.

## FEAT-0007 Abandon and recommit

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A user can mark a Goal or Task **Abandoned** — a deliberate, conscious decision to
stop pursuing it before completion (typically surfaced during a review of a Stale
item), not something inferred from neglect. A reason is **mandatory**. Abandoning a
parent cascades to all its descendants, identically to
[Delete's cascade](#feat-0004-delete-entity); each cascaded child gets its own event
row rather than being silently hidden by its parent's state.

Abandoned is reversible: a user can **Recommit** a previously Abandoned Goal or Task,
returning it to active pursuit. Recommitting requires an equally mandatory reason and
is recorded with its own timestamp — reversing a considered decision is itself a
considered decision.

Because a Goal or Task can cycle through Abandoned and Recommitted more than once,
this is tracked as an append-only event log (Abandoned/Recommitted, each with its own
reason and timestamp), not a pair of fields that would overwrite earlier history.
`is_abandoned` is derived from the most recent event, not independently settable.

No recurring review cycle applies to an Abandoned item, and there is no forced
touchpoint requiring it to be resolved one way or the other — it simply stays
Abandoned, hidden from default views (see [13 UI and Shared Features](/nailed-it-docs/features/13-ui-and-shared-features#feat-1305-status-abandoned-and-archived-filters)),
until the user chooses to Recommit.

#### Note

An automated "abandoned N times" reflective metric or nudge was explicitly
considered and rejected — the event log exists so a user can read the full sequence
of reasons for themselves during review; the system does not compute or surface a
count.

Full data model: [Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview).

## FEAT-0008 Archive a completed entity

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A user can **Archive** a Goal or Task — deliberate, neutral retirement ("done with
this, put away"), reachable only from **Completed** status. No failure is implied,
and there is no reversal: Archive is not offered as an outcome for Abandoned or any
other non-Completed state, and there is no "unarchive" action. Consistent with the
soft-delete pattern used elsewhere (hard data stays, visibility changes), Archived
items are hidden from default views and exposed via their own tri-state filter — see
[13 UI and Shared Features](/nailed-it-docs/features/13-ui-and-shared-features#feat-1305-status-abandoned-and-archived-filters).

This asymmetry with Abandon/Recommit is deliberate: a Completed Goal or Task has
nothing left to reconsider the way an Abandoned one does.

## FEAT-0009 Stale / Needs Review signal

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A computed signal, not a stored status: a Goal or Task with no update in N days, or
overdue for its next scheduled review, is flagged Stale/Needs Review regardless of
its current `status` value. This is what surfaces neglect for the user's attention —
[Abandon](#feat-0007-abandon-and-recommit) is one of the outcomes a user can choose
once confronted with a Stale item, the others being recommit/update or
[Archive](#feat-0008-archive-a-completed-entity). Filterable — see
[13 UI and Shared Features](/nailed-it-docs/features/13-ui-and-shared-features#feat-1306-needs-review--stale-filter).

## Revision History

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.6 - 13-Sep-2026

- FEAT-0001: removed the Primary Life Area bullet — Life Area is no longer a shared
  Goal/Task field; a Goal carries its own independent primary (plus Impacted Life
  Areas), a Task derives one from its parent Goal. Added pointers to 03 Goal
  Hierarchy and 05 Task Hierarchy instead.
- FEAT-0006: marked Superseded. Impacted Life Areas relocated to
  [03 Goal Hierarchy, FEAT-0309] — it's Goal-specific, not a shared base-entity
  concept.

### Version 0.5 - 12-Sep-2026

- Updated links to the shared filter feature: 13 Filters was merged into
  13 UI and Shared Features, so FEAT-0007, FEAT-0008, and FEAT-0009 now point
  there, at the filter FEAT items' renumbered IDs (FEAT-1305, FEAT-1306).

### Version 0.4 - 12-Sep-2026

- Updated FEAT-0001: Life Area tags replaced with primary Life Area (required,
  singular) plus a cross-reference to the new Impacted Life Areas relationship;
  Status enum values stated explicitly, with Abandoned/Archived clarified as
  separate flags rather than enum values. Flagged 05 Task Hierarchy's FEAT-0504 as
  needing reconciliation to the same Status values.
- Updated FEAT-0004: noted the distinct scope of Delete vs. the new Abandon
  capability (FEAT-0007).
- Added FEAT-0006 (Impacted Life Areas), FEAT-0007 (Abandon and recommit),
  FEAT-0008 (Archive a completed entity), and FEAT-0009 (Stale / Needs Review
  signal), reconciling with vision-board-design-overview.md.

### Version 0.3 - 07-Sep-2026

- Added FEAT-0005: due date consistency across the Goal/Task tree, with independent
  ascending/descending cascade settings and partial-revert-on-block behaviour.

### Version 0.2 - 07-Sep-2026

- Updated FEAT-0001: Goals now resolve to a real target date too (computed from a
  Time-bound duration), not just Tasks — see 03 Goal Hierarchy and 04 Goal Depth.
  Previously this stated Goals had no due-date-equivalent at all, which is no longer
  accurate.
- Updated FEAT-0004: Specified that all deletes cascade.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
