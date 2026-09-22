---
title: "08 AI Assistant"
description: "Goal critique and pattern insight, on a swappable AI provider backend"
draft: false
revision: "1.1"
revision_date: "13-Sep-2026"
---

The AI assistant is valuable but depends on the rest of the data model existing first
— it is reasonable to build after the core hierarchy, task, review, and habit
features have real data to work with. If no AI provider is configured, AI
functionality is not visible to the user.

#### Note on scope

This is **Version 2** scope — see the
[Roadmap](/nailed-it-docs/roadmap/roadmap#version-2-and-beyond). Version 2's phase
numbering restarts at 1, independent of Version 1's Phase 0–4 sequence, and hasn't
been finalized yet; it will be decided once Version 1 is complete or nearly so. FEAT
items below are marked **Phase: TBD (Version 2)** rather than continuing Version 1's
numbering as a literal "Phase 5."

## FEAT-0801 Goal critique against SMARTER and Well-Formed Outcome {#feat-0801}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | TBD (Version 2) |

### Description

Given a goal in progress, the AI assistant can critique it against its SMARTER
fields (e.g. flag a missing measurable component) and, if
[Well-Formed Outcome depth](/nailed-it-docs/design-documentation/features/04-goal-depth-well-formed-outcome)
has been added, against the seven-section framework — noting thin or skipped sections
rather than requiring them.

## FEAT-0802 Pattern insight from reviews {#feat-0802}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | TBD (Version 2) |

### Description

During or after a [review](/nailed-it-docs/design-documentation/features/07-review-cycle), the AI
assistant can surface pattern-level insight — for example, "Health goals have been
rescheduled 3 months running," or "Your meditation habit has slipped 3 weeks in a
row." Insight is described qualitatively, not as a hard analytics dashboard.

## FEAT-0803 Accept, dismiss, or edit suggestions {#feat-0803}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | TBD (Version 2) |

### Description

AI suggestions are presented as accept/dismiss/edit — never silently applied.

## FEAT-0804 Assistant data access scope {#feat-0804}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | TBD (Version 2) |

### Description

The assistant has access to the user's Life Areas, Goals, Tasks, Habits, and review
history as needed to ground its suggestions.

#### Note

When a cloud provider (OpenAI) is active, only the minimum context needed for the
assistant's current task is sent by default — not the user's full goal/review history
— per the privacy policy set out in
[10 Accounts and Settings](/nailed-it-docs/design-documentation/features/10-accounts-and-settings). The UI
indicates when a cloud provider is in use for a given request, versus a local one.

## FEAT-0805 Swappable AI provider backend {#feat-0805}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | TBD (Version 2) |

### Description

The backend is swappable between OpenAI API, Ollama, and LM Studio, with model
selection, per
[FEAT-1005 - AI provider configuration](/nailed-it-docs/design-documentation/features/10-accounts-and-settings#feat-1005).
No assistant feature assumes a specific provider.

## Revision History

### Version 1.1 - 13-Sep-2026

- Changed Phase from 5 to TBD (Version 2) on all FEAT items (FEAT-0801–FEAT-0805).
  Version 1's Phase 0–4 sequence does not continue into Version 2 as previously
  implied; Version 2's own phase numbering restarts at 1 and is not yet finalized —
  see the [Roadmap](/nailed-it-docs/roadmap/roadmap#version-2-and-beyond). Added a
  Note on scope explaining this.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
