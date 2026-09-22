---
title: "09 Habit Tracking"
description: "Recurring behaviours tracked via streaks and completion rate"
draft: false
revision: "1.1"
revision_date: "20-Sep-2026"
---

Habits are a recurring behaviour, distinct from a Goal or Task rather than a special
case of one — many goals are achieved through repetition rather than a single task.

## FEAT-0901 Habit creation and cadence {#feat-0901}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Create entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0001) |

### Description

The user can create a Habit with a title, an optional description, and a
link to the parent [Goal](/nailed-it-docs/design-documentation/features/03-goal-hierarchy) it serves
(e.g. a "Meditate daily" habit supporting a specific Goal, or standing alone).

Cadence is configurable as one of:

- Daily
- Weekly
- A target count per time period (e.g. "3x/week")
- Specific days of the week

## FEAT-0902 Habit check-in {#feat-0902}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The user can check in on a Habit for a given day:

- A simple done/not-done by default
- A count for quantity-based habits (e.g. glasses of water)
- An optional note

## FEAT-0903 Streak and completion-rate calculation {#feat-0903}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Current streak and a completion-rate view (e.g. last 30 days) are shown, computed
from the check-in log rather than stored as separate mutable state that could drift
out of sync.

## FEAT-0904 Habit archiving {#feat-0904}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Habits can be archived (deactivated) without losing their historical log —
consistency history matters even after a habit is dropped or retired.

## FEAT-0905 Habit visibility {#feat-0905}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Habits are visible from the
[Areas of Focus](/nailed-it-docs/design-documentation/features/06-areas-of-focus) view, grouped by Life
Area alongside Goals and Tasks, and from the linked Goal's detail view when one is
set.

## FEAT-0906 Habit check-in reminders {#feat-0906}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

Habit check-in reminders use the same notification channels as reviews (browser
push, email, Telegram — see
[10 Accounts and Settings](/nailed-it-docs/design-documentation/features/10-accounts-and-settings)), on
the habit's own cadence rather than the review schedule.

#### Note

Phased alongside the review engine's notification delivery (Phase 2), since it
shares the same notification infrastructure.

## Revision History

### Version 1.1 - 20-Sep-2026

- FEAT-0901 - Updated the description to remove the "optional" nature of a link to a goal. Updated the Cadence to a count per time period, rather than specifying it weekly.
- FEAT-0907 - Removed this feature becuase a Habit's link to a Goal is no longer optional.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.2 - 13-Sep-2026

- FEAT-0901: split the Life Area line out to FEAT-0907, since it now depends on
  whether the Habit is linked to a Goal.
- Added FEAT-0907: a Goal-linked Habit derives its Life Area live from that Goal's
  current primary, matching Task; a standalone Habit keeps its own independent,
  multi-select Life Area tag(s). Linking switches a standalone Habit to derived;
  unlinking freezes the last-derived value as its new independent starting tags.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
