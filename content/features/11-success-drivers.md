---
title: "11 Success Drivers"
description: "Personally-chosen affirmation statements a user attaches to their reviews"
draft: false
revision: "1.0"
revision_date: "03-Sep-2026"
---

Success Drivers add an affective, identity-level layer on top of the existing
progress-tracking chain (Vision → Life Area → Goal → Task). A driver is a short,
personally-chosen statement of belief or intent — either adopted from a provided
example library or written from scratch — that a user can attach to one or more of
their [reviews](/nailed-it-docs/features/07-review-cycle) to reinforce mindset
alongside progress-tracking. The feature is entirely optional and low-friction: it
adds motivational texture to a review, never a required step.

#### Note on priority and phasing

The PRD marks this feature Priority P0 ("core to the base product") but also states
it explicitly as "a later-phase feature" dependent on the review scheduling engine
being stable first, and the PRD's Suggested Phasing section was not updated to
include it. **Phase 6** and **Phase 7** are introduced here — extending the PRD's
existing 0–5 phase numbering — to reflect that stated dependency. This is flagged as
an assumption, consistent with the PRD's own practice of flagging details the source
material didn't fully specify.

## Non-Goals

- **Not a journaling or gratitude-log feature** — drivers are static, chosen
  statements re-shown over time, not new freeform entries per review.
- **Not social or shared content** — no community-authored or shared driver library,
  consistent with Nailed-It having no cross-account collaboration.
- **Not AI-generated in v1** — see Future Considerations below.
- **Not gamified** — no streaks, completion counts, or "stale driver" pressure.
- **Not tied to standalone push notifications in v1** — drivers surface inside
  reviews only.

## FEAT-1101 Example driver library

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |

### Description

A seeded set of original example drivers, grouped by category (e.g. Productivity,
Personal Growth).

#### Note

Content for this library needs to be written before the feature can ship, even in a
minimal form — flagged in the PRD as a dependency, not a last-minute blocker.

## FEAT-1102 Browse and adopt drivers

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

The user can browse the example driver library by category and add any example to
their personal set. Adopting a library driver creates an editable copy — the user's
copy is independent of the library entry from that point on (adopt-by-copy, not
adopt-by-reference).

#### Acceptance criteria

- Given the example library
- When a user selects a driver
- Then it is added to their personal set and becomes editable

## FEAT-1103 Custom driver authoring

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

The user can write and save their own driver as free text, independent of the
example library.

## FEAT-1104 Edit and deactivate drivers

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

The user can edit the wording of any driver in their personal set, whether
library-derived or custom, and deactivate (soft-delete) a driver without losing its
history.

#### Acceptance criteria

- Given a driver assigned to a review
- When the user deactivates the driver
- Then it stops appearing on future reviews, but the assignment history is retained

## FEAT-1105 Review assignment

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |

### Description

The user can attach a driver to one or more of their configured review
types/cadences, and remove that assignment later. This can be done from the driver
itself (choosing which review schedule(s) it should appear on when creating or
editing it) as well as from the review side.

#### Acceptance criteria

- Given a personal driver
- When a user assigns it to a review type
- Then it appears on that review's next occurrence

## FEAT-1106 Display in review

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |

### Description

Assigned driver(s) are shown as part of the corresponding review's flow. Where a
review has more than one assigned driver:

- The number of drivers to display per occurrence is configurable when defining the
  review cycle.
- Drivers are chosen at random from the assigned set (unless all assigned drivers
  have already been shown, at which point the set repeats).
- The selected drivers are displayed in a random order.

## FEAT-1107 First-time empty state

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |

### Description

The first time a user visits the Success Drivers area with no drivers yet in their
personal set, an inviting empty state explains what drivers are and how to get
started (browse the library or write a custom one) — not a blank screen.

## FEAT-1108 Empty review section omission

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |

### Description

A review with no drivers assigned to it renders normally, with the driver section
omitted entirely — no empty placeholder and no prompt to add one. The feature must
never feel like a required field.

#### Acceptance criteria

- Given a review with zero assigned drivers
- When the user opens that review
- Then no driver section is shown

## FEAT-1109 Per-account isolation

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 6 |

### Description

A user's custom drivers and library adoptions are private to their account, with no
cross-account visibility — consistent with Nailed-It's existing multi-account model
(see [10 Accounts and Settings](/nailed-it-docs/features/10-accounts-and-settings)).

## FEAT-1110 Rich text emphasis for driver wording

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 7 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

A driver's wording supports basic markdown-style emphasis (bold/italic).

## FEAT-1111 Driver usage visibility

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 7 |

### Description

The user can see simple usage information for a driver — e.g. the date it was last
shown on a review — so they can notice a driver has gone stale and consider
retiring it.

#### Note

This is a lightweight, non-gamified signal only. It is display information, not a
tracked streak or count — consistent with the feature's Non-Goals above.

## Future Considerations

The following ideas are explicitly deferred (PRD Priority P2) and are not yet
committed to a build phase. They are listed here for traceability, not as specified
features:

- **AI-assisted drafting** — the [AI assistant](/nailed-it-docs/features/08-ai-assistant)
  suggests a positively-framed driver, potentially seeded from a goal's Well-Formed
  Outcome "positively formulated outcome" answers — a natural bridge between
  Well-Formed Outcome and this feature. Any such integration must respect the
  existing "send minimal context" cloud-AI privacy default and UI indicator for
  active cloud providers (see
  [FEAT-1005 - AI provider configuration](/nailed-it-docs/features/10-accounts-and-settings#feat-1005-ai-provider-configuration)).
- **Goal-level attachment** — attach a driver to a specific Goal, not just a review
  type/cadence, so it appears whenever that goal is reviewed.
- **Standalone reminders** — surface a driver via push/email/Telegram independent of
  the review cycle (e.g. a daily affirmation), reusing the existing notification
  channels.
- **Resonance tracking** — let a user mark whether a driver "still resonates," as a
  lightweight, non-gamified signal for what to keep or retire.

## Revision History

### Version 1.0 - 03-Sep-2026

- Initial version, derived from the Nailed-It PRD v2.0, Section 10 (Success Drivers).
