---
title: "07 Structured Review Cycle"
description: "Scheduled and ad-hoc reviews that reference and update goals, tasks, and habits"
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
---

The review cycle is the most structurally distinct feature area — it needs its own
small scheduling sub-model rather than a single fixed cadence per review type.

## FEAT-0701 Review types and default cadence

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

The app provides five built-in review types: Daily, Weekly, Monthly, Yearly, and
Ad-hoc. Each review type has a default cadence, which is user-editable per type — for
example, the "Monthly" review type can be rescheduled to trigger every two weeks.

## FEAT-0702 Custom review scheduling rules

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

Reviews can be scheduled by rule, not just by type — e.g. "every Friday at 17:00, run
a review of next week's tasks." A rule requires:

- A trigger (day-of-week, day-of-month, or interval)
- A time
- A template (which prompts/scope the review covers)

## FEAT-0703 Review prompt templates

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

Each review type has a default prompt template — for example, the Weekly template
might ask "What moved forward this week? What's blocked? What's next week's focus?"
Templates are editable.

## FEAT-0704 Review history log

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

Completed reviews are logged with a timestamp and responses, viewable as history per
Life Area or Goal.

## FEAT-0705 In-review goal, task, and habit updates

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

Reviews can reference and update the Goals and Tasks they touch directly from the
review screen, rather than only as a separate journal entry. Separately, a review
notes which [Habits](/nailed-it-docs/features/09-habit-tracking) were kept up or
slipped during the review period.

## FEAT-0706 Ad-hoc reviews

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

Ad-hoc reviews can be triggered manually at any time, using any existing template.

## FEAT-0707 Scheduled review notifications

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |

### Description

When a scheduled review rule triggers, the app surfaces that review, notifying via
whichever channel(s) the user has enabled in their
[account settings](/nailed-it-docs/features/10-accounts-and-settings) (browser push,
email, and/or Telegram), pre-populated with the relevant scope (e.g. next week's
tasks).

#### Acceptance criteria (example — scheduled review)

- Given the user has set a rule "Friday 17:00 → next-week task review"
- When Friday 17:00 arrives
- Then the app surfaces that review, notifying via the enabled channel(s), pre-populated with next week's tasks

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
