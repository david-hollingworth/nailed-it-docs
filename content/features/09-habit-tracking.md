---
title: "09 Habit Tracking"
description: "Recurring behaviours tracked via streaks and completion rate"
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
---

Habits are a recurring behaviour, distinct from a Goal or Task rather than a special
case of one — many goals are achieved through repetition rather than a single task.

## FEAT-0901 Habit creation and cadence

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

The user can create a Habit with a title, an optional description, optional Life Area
tag(s), and an optional link to the parent [Goal](/nailed-it-docs/features/03-goal-hierarchy)
it serves (e.g. a "Meditate daily" habit supporting a "Mental Health" Life Area or a
specific Year Goal).

Cadence is configurable as one of:

- Daily
- Weekly
- A target count per week (e.g. "3x/week")
- Specific days of the week

## FEAT-0902 Habit check-in

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The user can check in on a Habit for a given day:

- A simple done/not-done by default
- A count for quantity-based habits (e.g. glasses of water)
- An optional note

## FEAT-0903 Streak and completion-rate calculation

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Current streak and a completion-rate view (e.g. last 30 days) are shown, computed
from the check-in log rather than stored as separate mutable state that could drift
out of sync.

## FEAT-0904 Habit archiving

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Habits can be archived (deactivated) without losing their historical log —
consistency history matters even after a habit is dropped or retired.

## FEAT-0905 Habit visibility

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Habits are visible from the
[Areas of Focus](/nailed-it-docs/features/06-areas-of-focus) view, grouped by Life
Area alongside Goals and Tasks, and from the linked Goal's detail view when one is
set.

## FEAT-0906 Habit check-in reminders

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

Habit check-in reminders use the same notification channels as reviews (browser
push, email, Telegram — see
[10 Accounts and Settings](/nailed-it-docs/features/10-accounts-and-settings)), on
the habit's own cadence rather than the review schedule.

#### Note

Phased alongside the review engine's notification delivery (Phase 2), since it
shares the same notification infrastructure.

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
