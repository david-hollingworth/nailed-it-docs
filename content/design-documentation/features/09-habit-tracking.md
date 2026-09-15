---
title: "09 Habit Tracking"
description: "Recurring behaviours tracked via streaks and completion rate"
draft: false
revision: "1.0"
revision_date: "13-Sep-2026"
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

The user can create a Habit with a title, an optional description, and an optional
link to the parent [Goal](/nailed-it-docs/features/03-goal-hierarchy) it serves
(e.g. a "Meditate daily" habit supporting a specific Goal, or standing alone). Its
Life Area is set differently depending on that link — see
[FEAT-0907](#feat-0907-habit-life-area) below.

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

## FEAT-0907 Habit Life Area

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0901 - Habit creation and cadence](#feat-0901-habit-creation-and-cadence), [03 Goal Hierarchy, FEAT-0308 - Primary Life Area](/nailed-it-docs/features/03-goal-hierarchy#feat-0308-primary-life-area) |

### Description

Unlike a Task, a Habit's link to a Goal is optional (see
[FEAT-0901](#feat-0901-habit-creation-and-cadence)), so its Life Area can't purely
derive from a Goal it might not have. It works one of two ways depending on that
link:

- **Linked to a Goal** — the Habit's Life Area mirrors that Goal's *current* primary
  Life Area, live, exactly like a
  [Task](/nailed-it-docs/features/05-task-hierarchy#feat-0505-task-life-area) — not
  independently settable while the link holds.
- **Not linked to a Goal** — the Habit carries its own independent, directly-set
  Life Area, as one or more tags (multi-select, not a single primary — a Habit is
  never a Vision Board node, so there's no canvas edge forcing a single value the
  way there is for a Goal).

The two states transition rather than coexist:

- **Linking** a previously-standalone Habit to a Goal switches it to derived from
  that point forward, replacing whatever independent tags it had.
- **Unlinking** a Habit from its Goal freezes whatever Life Area it had most
  recently derived as its new independent starting tag(s), rather than clearing it
  to nothing — the Habit still needs a Life Area to be shown in
  [Areas of Focus](/nailed-it-docs/features/06-areas-of-focus) grouping.

## Revision History

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
