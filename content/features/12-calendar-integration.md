---
title: "12 Calendar Integration"
description: "Push-only sync of Task due dates and Review occurrences to Google Calendar or CalDAV"
draft: false
revision: "1.1"
revision_date: "03-Sep-2026"
---

Calendar Integration publishes Task due dates and scheduled
[Review](/nailed-it-docs/features/07-review-cycle) occurrences outward to a calendar
the user already checks — Google Calendar, or a generic CalDAV calendar (tested
against Nextcloud). Nailed-It's own review scheduling engine remains the single
source of truth for when a review happens; calendar sync is a read-out of that
schedule, not a replacement for it.

#### Note on scope

This is **Version 2** scope, per the PRD's "Not Included (v1)" list, which
specifically excludes third-party integrations including calendar sync from v1.
Unlike Features 00–11, FEAT items in this file carry a **Version** field rather than
a **Phase** field — Phases 0–5 in the PRD's Suggested Phasing are development cycles
within Version 1, and this feature sits outside that sequence entirely rather than
at a later phase within it.

#### Resolved design decisions

The PRD's Open Questions for this feature are resolved as follows, and are reflected
in the FEAT items below:

- **Sync direction**: push-only (Nailed-It → external calendar). No read-back of
  changes made directly in the external calendar is planned.
- **Sync mechanism**: a background job, with sync frequency configurable separately
  per connected calendar in its connection settings.
- **CalDAV scope**: a generic CalDAV client, tested against Nextcloud — not a
  Nextcloud-specific integration.
- **Habit inclusion**: Habit tracking itself remains a must-have (Feature 9), but
  Habit occurrences are explicitly **not** synced to a calendar in any tier of this
  feature. In-app reminders and tracking are considered sufficient; there's no
  requirement to put Habits on a calendar.

## Non-Goals

- **Not a full calendar client** — Nailed-It doesn't display or manage the user's
  existing external calendar entries; it only publishes events that originate in
  Nailed-It.
- **Not two-way task creation** — creating an event directly in Google Calendar or a
  CalDAV calendar does not create a Nailed-It Task.
- **Not a replacement for the review scheduling engine** — review rules, cadences,
  and templates continue to be defined and owned inside
  [07 Structured Review Cycle](/nailed-it-docs/features/07-review-cycle); calendar
  events are a read-out of that schedule.
- **Not real-time** — sync runs as a background job on a configurable interval, not
  via sub-minute webhook-driven push.
- **Not Habit calendar sync** — Habits are tracked and reminded in-app only (see
  [09 Habit Tracking](/nailed-it-docs/features/09-habit-tracking)); Habit occurrences
  are not synced to external calendars.

## FEAT-1201 Connect a calendar provider

| | |
|---|---|
| **Status** | Draft |
| **Version** | 2 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

The user can connect a calendar as a per-account setting:

- A Google Calendar account, connected via OAuth.
- A CalDAV calendar (a generic CalDAV client, tested against Nextcloud), connected
  via server URL and credentials.

More than one calendar can be connected. Each connected calendar has its own sync
frequency setting, since sync runs as a background job rather than in real time.

#### Note

Mirrors the existing
[AI Provider Config](/nailed-it-docs/features/10-accounts-and-settings#feat-1005-ai-provider-configuration)
pattern: the provider is a per-account setting, not hardcoded. A Calendar Provider
Config record holds the connection details, and a Calendar Sync Link record maps
each synced Task or Review occurrence to its external calendar event, so updates and
deletes are idempotent and a broken link can be detected if the external event is
removed independently.

## FEAT-1202 Task due-date sync

| | |
|---|---|
| **Status** | Draft |
| **Version** | 2 |

### Description

A Task with a due date creates a corresponding calendar event on the connected
calendar(s) when saved. Editing the due date updates the event; deleting or
completing the Task removes or updates the event accordingly.

## FEAT-1203 Review occurrence sync

| | |
|---|---|
| **Status** | Draft |
| **Version** | 2 |

### Description

If enabled in settings, each upcoming scheduled
[Review](/nailed-it-docs/features/07-review-cycle) occurrence creates a
corresponding calendar event on the connected calendar(s), per the review's
scheduling rule.

## FEAT-1204 Per-entity-type sync toggle

| | |
|---|---|
| **Status** | Draft |
| **Version** | 2 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

Sync can be independently enabled or disabled for Tasks and for Reviews, so a user
who only wants Reviews on their calendar isn't forced into all-or-nothing sync.

## FEAT-1205 Broken connection indicator

| | |
|---|---|
| **Status** | Draft |
| **Version** | 2 |

### Description

If a calendar connection becomes invalid (an expired Google OAuth token, rejected
CalDAV credentials), the user sees a clear indicator in account settings and can
reconnect without losing existing sync links.

## FEAT-1206 Per-entity-type calendar targets

| | |
|---|---|
| **Status** | Draft |
| **Version** | 2 |
| **Extends** | [FEAT-1201 - Connect a calendar provider](#feat-1201-connect-a-calendar-provider) |

### Description

Sync targets can be split by entity type — e.g. Tasks to one connected calendar,
Reviews to another — rather than everything going to a single connected calendar.

## Future Considerations

The following ideas are not yet committed to Version 2 scope and are listed here for
traceability, not as specified features:

- **Additional providers** — Microsoft 365/Outlook, Apple Calendar (via CalDAV), or
  a generic read-only ICS feed subscription as a lighter-weight fallback for
  providers not directly supported.
- **Two-way sync** — an event created externally could optionally create a draft
  Task in Nailed-It. The resolved "sync direction" decision above (push-only, no
  read-back planned) makes this unlikely as currently scoped; it is retained here
  only as a hypothetical future idea.

## Revision History

### Version 1.1 - 03-Sep-2026

- Removed the Habit occurrence sync FEAT item and renumbered FEAT-1207 to FEAT-1206. The PRD's resolved "Habit inclusion" open question confirms Habit occurrences are explicitly not synced to a calendar in any tier of this feature, which the previous version had flagged as an unresolved inconsistency.

### Version 1.0 - 03-Sep-2026

- Initial version, derived from the Nailed-It PRD v0.3, Section 11 (Calendar Integration).
