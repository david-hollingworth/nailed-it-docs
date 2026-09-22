---
title: "00 Base Entity Features"
description: "Shared create/edit/delete lifecycle that Life Areas, Goals, Tasks, and Habits extend"
draft: false
revision: "2.0"
revision_date: "22-Sep-2026"
---

## Overview

Life Areas, Goals, Tasks, and Habits share a common, genuinely generic create/edit/
delete lifecycle.

Goal- and Task-specific fields and lifecycle — core fields, date consistency across
the tree, Abandon/Recommit, Archive, and the Stale/Needs Review signal can be found in 
[03 Goal Hierarchy](/nailed-it-docs/design-documentation/features/03-goal-hierarchy) and [05 Task Hierarchy](/nailed-it-docs/design-documentation/features/05-task-hierarchy).

## FEAT-0001 Create entity {#feat-0001}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Life Areas, Goals, Tasks, and Habits are each created via a dedicated form. Creation is
available both from the entity's own list/board view and from the [Vision Board](/nailed-it-docs/design-documentation/features/02-vision-board), which stays
in sync with records created either way.

## FEAT-0002 Edit entity {#feat-0002}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The user can edit all editable properties of an existing Life Area, Goal, Task, or
Habit from a dedicated edit view. System-set fields (e.g. date created) are read-only.

## FEAT-0003 Delete entity {#feat-0003}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The user can delete a Life Area, Goal, Task, or Habit. The user is asked to confirm
before deletion takes place.

Deletes cascade. Deleting a goal or a task deletes all child goals, tasks and habits. If there 
are child entities then the user is asked a second time before the deletion takes place.

#### Note — scope relative to Abandon

Per [Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview),
Delete and [Abandon](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0312)
have distinct roles: Delete is for a Goal or Task that should never have existed (a
duplicate, a typo, a test entry) and needs no reason to exist. Abandon is for an entity the user simply stopped pursuing, and requires a mandatory reason. Both cascade to descendants
identically.

## Revision History

### Version 2.0 - 22-Sep-2026

- Approved at version 2.0.

### Version 1.2 - 19-Sep-2026

- FEAT-0001 - Removed the reference to a Core planning entity fields feature and renumbered the remaining features.
- FEAT-0001 - Now includes creating Habits via the Vision Board. This was changed to improve consistency of functionality between the Vision Board and the form based application.
- FEAT-0005 - Removed this relocated feature
- FEAT-0006 - Removed this superseded feature
- FEAT-0007 - Removed this relocated feature
- FEAT-0008 - Removed this relocated feature
- FEAT-0009 - Removed this relocated feature

### Version 1.1 - 17-Sep-2026

- Relocated FEAT-0001 (Core planning entity fields), FEAT-0005 (Due date
  consistency), FEAT-0007 (Abandon and recommit), FEAT-0008 (Archive a completed
  entity), and FEAT-0009 (Stale / Needs Review signal) to
  [03 Goal Hierarchy](/nailed-it-docs/design-documentation/features/03-goal-hierarchy), as FEAT-0310
  through FEAT-0314 respectively. None of these were ever actually shared with Life
  Area or Habit — each was scoped to "Goal and Task" in its own text — so this file
  now covers only the create/edit/delete lifecycle (FEAT-0002/0003/0004) genuinely
  shared across all four entity types. All five relocated IDs are kept here, marked
  Superseded, since other files link to them directly.
- Updated the Overview to describe the file's narrower, now-accurate scope.

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
