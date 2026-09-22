---
title: "03 Goal Hierarchy"
description: "Recursive sub-goal structure, duration-based time-bound targets, and re-parenting"
draft: false
revision: "1.2"
revision_date: "19-Sep-2026"
---

Goal and Task share a large common core — base fields, due date consistency across
the tree, and lifecycle (Abandon/Recommit, Archive, Stale/Needs Review) — defined
here since neither is genuinely shared with Life Area or Habit; see
[05 Task Hierarchy](/nailed-it-docs/design-documentation/features/05-task-hierarchy) for how Task extends
each shared piece. The create/edit/delete lifecycle that Life Area and Habit *do*
share stays in [00 Base Entity Features](/nailed-it-docs/design-documentation/features/00-base-entity-features).

The goal hierarchy is flexible and recursive: a Goal can have any number of sub-goals,
and a sub-goal can have its own sub-goals in turn, with no fixed depth or required
tier structure. A sub-goal is not necessarily a smaller time-slice of its parent —
siblings can share the same target timeframe while covering different objectives (a
large goal broken down by scope, not by schedule). Terms like Life, Year, Month, or
Decade are useful planning vocabulary for talking about how far out a goal sits, but
they are not stored fields, not enforced parent/child rules, and nothing the
application calculates or filters by — see Revision History for what this replaces.
Goals always carry their SMARTER fields — see
[04 Goal Depth](/nailed-it-docs/design-documentation/features/04-goal-depth-well-formed-outcome) for how
that works alongside the optional Well-Formed Outcome deep-dive.

## FEAT-0301 Time-bound target set as a duration {#feat-0301}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Create entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0001) |

### Description

When creating or editing a Goal, the user sets its SMARTER Time-bound value as a
duration — **years** and **months** — rather than picking a calendar date directly.
For example, a user says "within 5 years," not "by 7 September 2031." The
application converts this duration into a stored target date (today, or the date of
the most recent edit to the duration, plus the given years and months), so the rest
of the system — filtering, sorting, the calendar/timeline view (FEAT-0304) — has a
real date to work with, without the user ever having to think in dates while defining
the goal.

At least one of years or months must be greater than zero — a Goal always points at a
genuine point in the future.

When the Time-bound value for a goal is changed then the application recalculates the stored due date.

## FEAT-0302 Goal parent/child progress rollup {#feat-0302}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A Goal with sub-goals shows rolled-up progress from its children, all the way up
through however many levels of nesting exist below it — not limited to a fixed
number of tiers.

## FEAT-0303 Sub-goals {#feat-0303}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Create entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0001) |

### Description

A Goal can have any number of sub-goals, at any depth. A sub-goal's own Time-bound
duration must resolve to a target date that is not later than its parent's — see
[FEAT-0311](#feat-0311) below
for the cascade/block behaviour when an edit would violate this.

A Sub-goal always has a connector to its parent Goal. If its primary Life Area is the same as its parent's, that connector also serves as its connection to the Life Area. If the two differ, however that came about, the Sub-goal also has its own connection to its primary Life Area.

#### Note

This supports breaking a large or high-impact goal into a number of sub-goals, each
covering a different objective, before considering the tasks needed to achieve any of
them. Sub-goals split by *scope*, not necessarily by *schedule* — a large goal might
have several sub-goals targeting the same timeframe as their parent, each covering a
different part of the ambition, rather than each being a shorter step toward it.

There is no fixed rule for when something should be a sub-goal with tasks underneath
it, versus a task with its own sub-tasks — this is left to the user's judgement
rather than an enforced structural distinction.

## FEAT-0304 Goals calendar and timeline view {#feat-0304}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A calendar/timeline view shows Goals positioned by their target date, zoomable
between a broader and finer view — a display convenience, not a reflection of any
stored tier. A simple overview lists top-level Goals (those with no parent) alongside
their nested sub-goals.

## FEAT-0305 Goal reassignment and re-parenting {#feat-0305}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Edit entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0002) |

### Description

A Goal's target date can be changed, or it can be re-parented to a different Goal (or
made top-level), without losing history.

#### Note

Re-parenting is subject to the same due date consistency check as a direct date
edit — see [FEAT-0311](#feat-0311) below.

## FEAT-0306 Sub-goal primary Life Area default {#feat-0306}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0303 - Sub-goals](#feat-0303), [FEAT-0308 - Primary Life Area](#feat-0308) |

### Description

When a sub-goal is created, its primary Life Area defaults to its parent Goal's
*current* primary Life Area at that moment. This is a one-time default set at
creation, the sub-goal's primary can be changed independently
afterward exactly like any other Goal's (see
[FEAT-0308](#feat-0308)), and a later change to the parent's own
primary does not retroactively update it (see
[FEAT-0307](#feat-0307) for the
separate, optional mechanism that does offer to update it).

On the [Vision Board](/nailed-it-docs/design-documentation/features/02-vision-board), this default is
expressed by drawing the sub-goal node's primary edge automatically at creation,
already pointing at its parent Goal — the "first canvas connection becomes
primary" rule (see
[Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview))

## FEAT-0307 Optional Life Area cascade on primary change {#feat-0307}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0308 - Primary Life Area](#feat-0308) |

### Description

When a Goal's own primary Life Area is changed, its existing sub-goals are not
retroactively updated by default — each sub-goal's primary was only ever a one-time
default (see [FEAT-0306](#feat-0306)), and may
since have been deliberately changed to something else.

The user is instead offered an **optional cascade**, in the same shape as
[FEAT-0311](#feat-0311)'s
due-date cascade: a confirmation dialog lists the affected sub-goals and, if
accepted, updates them to the new primary. Two rules distinguish it from a blanket
update:

- **Only sub-goals still matching the old primary are offered.** A sub-goal already
  deliberately changed to a different primary is left untouched — it was a
  considered decision, not a stale default, and the cascade must not silently
  overwrite it.
- **If accepted, the cascade recurses through the full descendant chain, at any
  depth** — matching FEAT-0311's "any depth" behaviour — again only ever touching
  descendants still matching the old primary at each level.
- If the cascade is declined then a new connection is made from the Sub-goal(s) to the retained Life Area.

#### Acceptance criteria (example)

- Given Goal A (primary: Sport) has sub-goal B (primary: Sport, still matching —
  never changed) and sub-goal C (primary: Financial, deliberately changed)
- When the user changes Goal A's primary to Health
- Then a confirmation dialog offers to update B (still matching) but does not list
  C (already diverged)
- And accepting updates B's primary to Health, recursing into any of B's own
  sub-goals still matching Sport, while leaving C and C's descendants untouched

## FEAT-0308 Primary Life Area {#feat-0308}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0310 - Core planning entity fields](#feat-0310) |

### Description

Every Goal carries exactly one required **primary Life Area**. This drives
grouping, dashboards, and hierarchy sequencing without ambiguity — it's the
unambiguous answer to "which Life Area's goal list does this appear in." See
[Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview)
for the full data model and the Vision Board's edge-based representation, and
[FEAT-0309](#feat-0309) for the separate, optional,
many-to-many Impacted Life Areas relationship — an annotation of consequence, not a
second ownership claim.

This field is Goal-specific. Tasks derive their Life Area from their parent Goal
instead of carrying their own — see
[05 Task Hierarchy, FEAT-0505](/nailed-it-docs/design-documentation/features/05-task-hierarchy#feat-0505).

On the Vision Board the connection between a Goal and its Primary Life Area is represented by a visual connection.

## FEAT-0309 Impacted Life Areas {#feat-0309}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0310 - Core planning entity fields](#feat-0310), [FEAT-0308 - Primary Life Area](#feat-0308) |

### Description

Separately from its single required primary Life Area, a Goal can carry zero or
more **Impacted Life Areas** — an annotation of consequence, not a second ownership
claim (e.g. a marathon-training Goal's primary Life Area is Sport, but it impacts
Family by drawing down weekend availability). Each Impacted Life Area is set via a
form (pick a Life Area, add a short note) rather than a
canvas gesture — see [02 Vision Board](/nailed-it-docs/design-documentation/features/02-vision-board) for
how these render (icon badges, not edges). The note lives on the relationship
itself, so the same Goal can carry a different note per Impacted Life Area.

This relationship is Goal-specific — Tasks do not carry Impacted Life Areas.

## FEAT-0310 Core planning entity fields {#feat-0310}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Every Goal and Task carries a common base set of fields, per the PRD's Core Data Model:

- Title
- Description
- Status — one of Not Started / In Progress / Completed / On Hold / Blocked. Abandoned and
  Archived are separate flags layered on top of Status, not additional enum values
  — see [FEAT-0312](#feat-0312) and
  [FEAT-0313](#feat-0313) below.
- Due date / target date — captured differently by entity type: a Task's due date is
  set directly by the user; a Goal's target date is computed from its SMARTER
  Time-bound duration (years + months) rather than picked directly — see
  [FEAT-0301](#feat-0301) above and
  [05 Task Hierarchy](/nailed-it-docs/design-documentation/features/05-task-hierarchy). Both resolve to a
  real, storable date, so filtering, sorting, and calendar views can treat Goals and
  Tasks uniformly.
- Active / Inactive - a task cannot be active until its parent Goal is Active. 

Life Area is not one of these shared fields — it's handled differently by entity
type. A Goal carries its own independent primary Life Area (plus optional Impacted
Life Areas) — see [FEAT-0308](#feat-0308) and
[FEAT-0309](#feat-0309) above. A Task has no independent Life
Area of its own; the Life Area is inherited from its parent Goal — see
[05 Task Hierarchy, FEAT-0505](/nailed-it-docs/design-documentation/features/05-task-hierarchy#feat-0505).

Task extends this base with its own additional fields — see
[05 Task Hierarchy, FEAT-0501](/nailed-it-docs/design-documentation/features/05-task-hierarchy#feat-0501).

## FEAT-0311 Due date consistency across the entity tree {#feat-0311}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0310 - Core planning entity fields](#feat-0310) |

### Description

Across the full Goal/Task tree — sub-goals, a Goal's Tasks, and a Task's sub-tasks, at
any depth — if a descendant's due date/target date is edited to fall after one of its
ancestors' dates, this is the **ascending** case: the ancestor's date would need to
move out to stay consistent, since it cannot reach 100% progress (see
[FEAT-0302](#feat-0302))
by a date one of its parts hasn't yet reached. For example, a Task due 15-Sep-2026
sits under a Goal targeting 31-Oct-2026; if the Task's due date is moved to
15-Nov-2026, the Goal's target date would need to move out to at least 15-Nov-2026.

Conversely, if an ancestor's date is edited to fall before one or more of its
descendants' dates, this is the **descending** case: those descendants' dates would
need to move earlier to fit inside the shortened window. For example, a Goal targets
31-Oct-2026 and has a child Task due 15-Oct-2026; if the Goal's Time-bound duration is
shortened so its target date becomes 01-Oct-2026, the Task's due date would need to
move in to on or before 01-Oct-2026.

This check applies whenever a due date (Task) or Time-bound duration (Goal, see
[FEAT-0301](#feat-0301))
is directly edited, and whenever an entity is re-parented (see
[FEAT-0305](#feat-0305) above).

Two independent settings (see
[10 Accounts and Settings](/nailed-it-docs/design-documentation/features/10-accounts-and-settings)) govern
what happens when a change would cause either case above, one setting per direction:

- **Ascending** — default: cascade allowed.
- **Descending** — default: cascade blocked.

When the relevant setting allows the cascade, a confirmation dialog lists every
affected ancestor or descendant and states their dates will be updated to match.
Confirming updates all of them and saves the original change.

When the setting blocks the cascade, an informational dialog lists the affected
entities. Only the due date field on the form being edited reverts to its prior
value — any other unsaved changes on that form are retained and the record stays
open in its edit view, so the user can pick a different date and save without losing
other edits.

When a cascade changes a Goal's target date, that Goal's stored Time-bound duration
(years + months) is recalculated from the new date, rounded to the nearest month.

#### Acceptance criteria (example — ascending cascade allowed)

- Given a Task due 15-Sep-2026, under a Goal targeting 30-Sep-2026, under a Goal targeting 31-Oct-2026
- When the user edits the Task's due date to 15-Nov-2026
- Then a confirmation dialog lists both ancestor Goals and states their target dates will move to 15-Nov-2026
- And confirming updates both Goals' target dates and recalculates each Goal's stored duration to the nearest month, and saves the Task's new due date

#### Acceptance criteria (example — descending cascade blocked)

- Given a Goal targeting 31-Oct-2026 with a child Task due 15-Oct-2026
- When the user shortens the Goal's Time-bound duration so its target date would become 01-Oct-2026, while also editing the Goal's title
- Then an informational dialog lists the child Task and its due date
- And the Goal's target date field reverts to 31-Oct-2026, the edited title remains unsaved but present on the form, and the form stays open

## FEAT-0312 Abandon and recommit {#feat-0312}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A user can mark a Goal or Task **Abandoned** — a deliberate, conscious decision to
stop pursuing it before completion (typically surfaced during a review of a Stale
item), not something inferred from neglect. A reason is **mandatory**. Abandoning a
parent cascades to all its descendants, identically to
[Delete's cascade](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0003);
each cascaded child gets its own event row rather than being silently hidden by its
parent's state.

Abandoned is reversible: a user can **Recommit** a previously Abandoned Goal or Task,
returning it to active pursuit. Recommitting requires an equally mandatory reason and
is recorded with its own timestamp — reversing a considered decision is itself a
considered decision.

Because a Goal or Task can cycle through Abandoned and Recommitted more than once,
this is tracked as an append-only event log (Abandoned/Recommitted, each with its own
reason and timestamp), not a pair of fields that would overwrite earlier history.
`is_abandoned` is derived from the most recent event, not independently settable.

No recurring review cycle applies to an Abandoned item, and there is no forced
touchpoint requiring it to be resolved one way or the other — it simply stays
Abandoned, hidden from default views (see [13 UI and Shared Features](/nailed-it-docs/design-documentation/features/13-ui-and-shared-features#feat-1305)),
until the user chooses to Recommit.

#### Note

An automated "abandoned N times" reflective metric or nudge was explicitly
considered and rejected — the event log exists so a user can read the full sequence
of reasons for themselves during review; the system does not compute or surface a
count.

## FEAT-0313 Archive a completed entity {#feat-0313}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A user can **Archive** a Goal or Task — deliberate, neutral retirement ("done with
this, put away"), reachable only from **Completed** status. No failure is implied,
and there is no reversal: Archive is not offered as an outcome for Abandoned or any
other non-Completed state, and there is no "unarchive" action. Consistent with the
soft-delete pattern used elsewhere (hard data stays, visibility changes), Archived
items are hidden from default views and exposed via their own tri-state filter — see
[13 UI and Shared Features](/nailed-it-docs/design-documentation/features/13-ui-and-shared-features#feat-1305).

This asymmetry with Abandon/Recommit is deliberate: a Completed Goal or Task has
nothing left to reconsider the way an Abandoned one does.

## FEAT-0314 Stale / Needs Review signal {#feat-0314}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A computed signal, not a stored status: a Goal or Task with no update in N days,
overdue for its next scheduled review or N days past it's Due Date, is flagged Stale/Needs Review regardless of
its current `status` value. This is what surfaces neglect for the user's attention —
[Abandon](#feat-0312) is one of the outcomes a user can choose
once confronted with a Stale item, the others being recommit/update or
[Archive](#feat-0313). Filterable — see
[13 UI and Shared Features](/nailed-it-docs/design-documentation/features/13-ui-and-shared-features#feat-1306).

## Revision History

### Version 1.2 - 19-Sep-2026

- FEAT-0301 - Removed the Note that duplicated what had already been stated.
- FEAT-0303 - Added more details in the description on how connectors to Sub-goals are managed.
- FEAT-0306 - Clarified that a sub-goal's primary edge connection is to its parent Goal, not to a life area.
- FEAT-0307 - Added a bullet to describe whaat happens if a Life Area change caascade is declined.
- FEAT-0310 - Added a description of the visual representation of a Goal's connection to its Primary Life Area
- FEAT-0309 - Deferred the size of the "pick a Life Area, add a short note" to the requirements phase. Removed a reference to a full data model in the Vision Board Overview.
- FEAT-0310 - Added a "Blocked" status. Added an Active / Inactive field.
- FEAT-0314 - Added "N days past Due-Date" as a task trigger for the Stale/Needs Review flag.

### Version 1.1 - 17-Sep-2026

- Relocated FEAT-0001, FEAT-0005, FEAT-0007, FEAT-0008, and FEAT-0009 here from
  [00 Base Entity Features](/nailed-it-docs/design-documentation/features/00-base-entity-features), as
  FEAT-0310 (Core planning entity fields), FEAT-0311 (Due date consistency across
  the entity tree), FEAT-0312 (Abandon and recommit), FEAT-0313 (Archive a completed
  entity), and FEAT-0314 (Stale / Needs Review signal) respectively. None of these
  were ever actually shared with Life Area or Habit — each was scoped to "Goal and
  Task" in its own text — so they belong with the rest of the Goal/Task-shared
  feature set rather than the base-entity file. Original IDs kept there, marked
  Superseded.
- Updated internal cross-references accordingly (FEAT-0303, FEAT-0305, FEAT-0306,
  FEAT-0307, FEAT-0308, FEAT-0309 now link to FEAT-0310/FEAT-0311 within this file
  rather than to the old base-entity anchors). File order remains by FEAT number.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.4 - 13-Sep-2026

- Added FEAT-0306 (sub-goal primary Life Area default) and FEAT-0307 (optional
  cascade on primary change), formalising this session's Goal/Life-Area design
  discussion.
- Relocated FEAT-0001 (Primary Life Area) and FEAT-0006 (Impacted Life Areas) here
  from 00 Base Entity Features, as FEAT-0308 and FEAT-0309 — both are Goal-specific,
  not shared with Task, so they belong with the rest of the Goal-specific feature
  set rather than the shared base-entity file. FEAT-0001 and FEAT-0006 in 00 Base
  Entity Features updated accordingly (FEAT-0006 marked Superseded).

### Version 0.3 - 07-Sep-2026

- Corrected FEAT-0303: a sub-goal's Time-bound duration is no longer described as
  independent of its parent's — it's now bound by the FEAT-0005 due date consistency
  rule in 00 Base Entity Features. Noted in FEAT-0305 that re-parenting is subject to
  the same rule.

### Version 0.2 - 07-Sep-2026

- Removed the fixed Life/Year/Month three-tier structure and its enforced
  parent-tier rules (previously FEAT-0301). The goal hierarchy is now flexible and
  recursive: any Goal can have any number of sub-goals at any depth, and a sub-goal
  is not required to sit one tier below its parent. Life, Year, Month, and Decade are
  now described as informal planning vocabulary only, never stored, calculated, or
  filtered on. Replaced FEAT-0301 with the duration-based (years + months) Time-bound
  input that resolves to a stored target date. Reworded FEAT-0302 through FEAT-0305
  to remove tier-specific language and match the flexible model.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
