---
title: "08 AI Assistant"
description: "Goal critique and pattern insight, on a swappable AI provider backend"
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
---

The AI assistant is valuable but depends on the rest of the data model existing first
— it is reasonable to build after the core hierarchy, task, review, and habit
features have real data to work with. If no AI provider is configured, AI
functionality is not visible to the user.

## FEAT-0801 Goal critique against SMARTER and Well-Formed Outcome

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |

### Description

Given a goal in progress, the AI assistant can critique it against its SMARTER
fields (e.g. flag a missing measurable component) and, if
[Well-Formed Outcome depth](/nailed-it-docs/features/04-goal-depth-well-formed-outcome)
has been added, against the seven-section framework — noting thin or skipped sections
rather than requiring them.

## FEAT-0802 Pattern insight from reviews

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |

### Description

During or after a [review](/nailed-it-docs/features/07-review-cycle), the AI
assistant can surface pattern-level insight — for example, "Health goals have been
rescheduled 3 months running," or "Your meditation habit has slipped 3 weeks in a
row." Insight is described qualitatively, not as a hard analytics dashboard.

## FEAT-0803 Accept, dismiss, or edit suggestions

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |

### Description

AI suggestions are presented as accept/dismiss/edit — never silently applied.

## FEAT-0804 Assistant data access scope

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |

### Description

The assistant has access to the user's Life Areas, Goals, Tasks, Habits, and review
history as needed to ground its suggestions.

#### Note

When a cloud provider (OpenAI) is active, only the minimum context needed for the
assistant's current task is sent by default — not the user's full goal/review history
— per the privacy policy set out in
[10 Accounts and Settings](/nailed-it-docs/features/10-accounts-and-settings). The UI
indicates when a cloud provider is in use for a given request, versus a local one.

## FEAT-0805 Swappable AI provider backend

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |

### Description

The backend is swappable between OpenAI API, Ollama, and LM Studio, with model
selection, per
[FEAT-1005 - AI provider configuration](/nailed-it-docs/features/10-accounts-and-settings#feat-1005-ai-provider-configuration).
No assistant feature assumes a specific provider.

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
