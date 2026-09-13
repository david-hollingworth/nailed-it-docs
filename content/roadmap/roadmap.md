---
title: "Roadmap"
description: "Planned versions and phases for Nailed-It, derived from the PRD"
draft: false
revision: "1.0"
revision_date: "13-Sep-2026"
weight: 5
---

This roadmap works from a single assumption: **Versions sit above Phases.** A Phase is a development cycle *within* a software release Version — Version 1 isn't "done" until
all of Phase 0 through Phase 4 have shipped. A Version boundary (Version 1, Version
2, ...) is a higher-level release boundary, used for scope explicitly deferred past
the initial release, such as [Calendar Integration](/nailed-it-docs/features/12-calendar-integration).
Phase numbering restarts at 1 within each Version — Version 2's phases are not a
continuation of Version 1's Phase 0–4 sequence.

This is a working document, not a source of truth in its own right — where it
disagrees with the PRD or the feature files, those win. Its purpose is to provide a higher level overview of the development and release plan.

## Version 1 — Minimum Viable Product

All of Phases 0–4 below are in scope for Version 1.

### Phase 0 — Foundation

- Django/Docker project setup.
- SQLite as the default database, with a PostgreSQL config switch.
- Username/password accounts with full data isolation.

**Feature files:** 

- [10 Accounts and Settings](/nailed-it-docs/features/10-accounts-and-settings)
(FEAT-1001 – FEAT-1003).

### Phase 1 — Core hierarchy

- Vision Statement.
- Goals at Life/Year/Month horizons, with the SMARTER core fields as the default
  (no Well-Formed Outcome depth yet).
- Task hierarchy.
- Areas of Focus.
- Habit Tracking.
- Shared markdown rendering and the app-wide filter specification.
- Due date cascade settings (ascending/descending).

**Feature files:** 

- [00 Base Entity Features](/nailed-it-docs/features/00-base-entity-features),
- [01 Life Vision Statement](/nailed-it-docs/features/01-life-vision),
- [03 Goal Hierarchy](/nailed-it-docs/features/03-goal-hierarchy),
- [04 Goal Depth](/nailed-it-docs/features/04-goal-depth-well-formed-outcome) (FEAT-0401 only),
- [05 Task Hierarchy](/nailed-it-docs/features/05-task-hierarchy),
- [06 Areas of Focus](/nailed-it-docs/features/06-areas-of-focus),
- [09 Habit Tracking](/nailed-it-docs/features/09-habit-tracking) (excluding FEAT-0906, see Phase 2),
- [10 Accounts and Settings](/nailed-it-docs/features/10-accounts-and-settings) (FEAT-1006 – FEAT-1007, the due date cascade settings),
- [13 UI and Shared Features](/nailed-it-docs/features/13-ui-and-shared-features) (FEAT-1301 – FEAT-1308).

*This alone is a usable app, per the PRD.*

### Phase 2 — Review engine

- Review types, custom scheduling rules, templates, and history log.
- Notification delivery (browser push, email, Telegram) and the account settings
  that configure it.
- Habit check-in reminders, since they share the same notification infrastructure.

**Feature files:** 

- [07 Structured Review Cycle](/nailed-it-docs/features/07-review-cycle),
- [FEAT-1004 - Notification channel configuration](/nailed-it-docs/features/10-accounts-and-settings#feat-1004-notification-channel-configuration),
- [FEAT-0906 - Habit check-in reminders](/nailed-it-docs/features/09-habit-tracking#feat-0906-habit-check-in-reminders).

### Phase 3 — Vision Board

- Mind-map UI over the data model built in Phase 1, with equal-footing web-form
  entry.

**Feature files:** [02 Vision Board](/nailed-it-docs/features/02-vision-board).

### Phase 4 — Well-Formed Outcome depth

- The optional seven-section extension on top of an existing SMARTER goal, built as
  a step-by-step wizard.
- Field-level contextual help (hover for short help, click for a longer
  explanation).

**Feature files:** 

- [04 Goal Depth](/nailed-it-docs/features/04-goal-depth-well-formed-outcome)
(FEAT-0402 – FEAT-0405; FEAT-0406 depends on the AI Assistant and ships in Version 2),
- [13 UI and Shared Features](/nailed-it-docs/features/13-ui-and-shared-features) (FEAT-1309, Field-level contextual help).

## Version 2 and beyond

Scope explicitly deferred past Version 1. **Phase numbering restarts at 1 within
Version 2** — it does not continue Version 1's Phase 0–4 sequence. Which specific
phase each item below lands in hasn't been decided yet; that will be worked out once
Version 1 is complete, or nearly so. The feature files below currently mark these
items **Phase: TBD (Version 2)** rather than asserting a phase number ahead of that
decision.

- **AI Assistant** — [08 AI Assistant](/nailed-it-docs/features/08-ai-assistant),
  plus [FEAT-1005 - AI provider configuration](/nailed-it-docs/features/10-accounts-and-settings#feat-1005-ai-provider-configuration)
  in 10 Accounts and Settings.
- **Calendar Integration** (Google Calendar, generic CalDAV/Nextcloud) — 
  [12 Calendar Integration](/nailed-it-docs/features/12-calendar-integration).
- **Success Drivers** - [11 Success Drivers](/nailed-it-docs/features/11-success-drivers)
- **Two Factor Authentication (2FA)** - There is currently no feature file for this feature. It will be defined later.


## Revision History

### Version 1.0 - 13-Sep-2026

- Document approved at version 1.0

### Version 0.3 - 13-Sep-2026

- Version 2 phase numbering now explicitly restarts at 1 rather than continuing
  Version 1's Phase 0–4 sequence; specific Version 2 phase assignment deferred until
  Version 1 is complete or nearly so, matching the corresponding update in 08 AI
  Assistant and 11 Success Drivers (both now Phase: TBD).
- Added missing Phase 1 citations: 13 UI and Shared Features (FEAT-1301–FEAT-1308)
  and 10 Accounts and Settings' due date cascade settings (FEAT-1006–FEAT-1007).
- Added missing Phase 4 citation: 13 UI and Shared Features, FEAT-1309 (Field-level
  contextual help).
- Added FEAT-1005 (AI provider configuration) to the Version 2 AI Assistant entry.

### Version 0.2 - 04-Sep-2026

- Resolved the Open Questions and updated the document layout.
- Moved AI features to Version 2.
- Removed references to the PRD's suggested phasing as that information now exists in this document.

### Version 0.1 - 03-Sep-2026

- Initial version, derived from the Nailed-It PRD v0.3.
