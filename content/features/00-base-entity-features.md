---
title: "00 Base Entity Features"
description: "Shared field and lifecycle patterns that Nailed-It's planning entities extend."
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
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
- One or more Life Area tags
- Status
- Due date (Task only — Goals use their SMARTER time-bound field instead; see [04 Goal Depth](/nailed-it-docs/features/04-goal-depth-well-formed-outcome))

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

#### Note

The source PRD does not specify cascade-delete behaviour for child Goals or Tasks when
a parent is deleted. Assumed behaviour: deleting a Goal or Task also deletes its
children, consistent with the "no orphaned to-dos" application goal stated in the PRD.
This assumption is flagged here since it was not stated explicitly in the source
document.

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
