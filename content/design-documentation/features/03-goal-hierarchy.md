---
title: "03 Goal Hierarchy"
description: "Recursive sub-goal structure, duration-based Time-bound targets, and re-parenting"
draft: false
revision: "1.0"
revision_date: "13-Sep-2026"
---

All entities in this feature extend the base fields defined in
[00 Base Entity Features](/nailed-it-docs/features/00-base-entity-features).

The goal hierarchy is flexible and recursive: a Goal can have any number of sub-goals,
and a sub-goal can have its own sub-goals in turn, with no fixed depth or required
tier structure. A sub-goal is not necessarily a smaller time-slice of its parent —
siblings can share the same target timeframe while covering different objectives (a
large goal broken down by scope, not by schedule). Terms like Life, Year, Month, or
Decade are useful planning vocabulary for talking about how far out a goal sits, but
they are not stored fields, not enforced parent/child rules, and nothing the
application calculates or filters by — see Revision History for what this replaces.
Goals always carry their SMARTER fields — see
[04 Goal Depth](/nailed-it-docs/features/04-goal-depth-well-formed-outcome) for how
that works alongside the optional Well-Formed Outcome deep-dive.

## FEAT-0301 Time-bound target set as a duration

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

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

#### Note

Life, Year, Month, and Decade are not fields captured here, and are not derived or
stored anywhere. They're planning language a user (or the AI assistant) might use
while talking through how far out a goal sits — "that sounds like a five-year goal" —
but nothing in the application enforces, calculates, or filters by that label. 

## FEAT-0302 Goal parent/child progress rollup

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A Goal with sub-goals shows rolled-up progress from its children, all the way up
through however many levels of nesting exist below it — not limited to a fixed
number of tiers.

## FEAT-0303 Sub-goals

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

A Goal can have any number of sub-goals, at any depth. A sub-goal's own Time-bound
duration must resolve to a target date that is not later than its parent's — see
[00 Base Entity Features, FEAT-0005](/nailed-it-docs/features/00-base-entity-features#feat-0005-due-date-consistency-across-the-entity-tree)
for the cascade/block behaviour when an edit would violate this.

#### Note

This supports breaking a large or high-impact goal into a number of sub-goals, each
covering a different objective, before considering the tasks needed to achieve any of
them. Sub-goals split by *scope*, not necessarily by *schedule* — a large goal might
have several sub-goals targeting the same timeframe as their parent, each covering a
different part of the ambition, rather than each being a shorter step toward it.

There is no fixed rule for when something should be a sub-goal with tasks underneath
it, versus a task with its own sub-tasks — this is left to the user's judgement
rather than an enforced structural distinction.

## FEAT-0304 Goals calendar and timeline view

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A calendar/timeline view shows Goals positioned by their target date, zoomable
between a broader and finer view — a display convenience, not a reflection of any
stored tier. A simple overview lists top-level Goals (those with no parent) alongside
their nested sub-goals.

## FEAT-0305 Goal reassignment and re-parenting

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

A Goal's target date can be changed, or it can be re-parented to a different Goal (or
made top-level), without losing history.

#### Note

Re-parenting is subject to the same due date consistency check as a direct date
edit — see
[00 Base Entity Features, FEAT-0005](/nailed-it-docs/features/00-base-entity-features#feat-0005-due-date-consistency-across-the-entity-tree).

## FEAT-0306 Sub-goal primary Life Area default

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0303 - Sub-goals](#feat-0303-sub-goals), [FEAT-0308 - Primary Life Area](#feat-0308-primary-life-area) |

### Description

When a sub-goal is created, its primary Life Area defaults to its parent Goal's
*current* primary Life Area at that moment. This is a one-time default set at
creation, not an ongoing link — the sub-goal's primary can be changed independently
afterward exactly like any other Goal's (see
[FEAT-0308](#feat-0308-primary-life-area)), and a later change to the parent's own
primary does not retroactively update it (see
[FEAT-0307](#feat-0307-optional-life-area-cascade-on-primary-change) for the
separate, optional mechanism that does offer to update it).

On the [Vision Board](/nailed-it-docs/features/02-vision-board), this default is
expressed by drawing the sub-goal node's primary edge automatically at creation,
already pointing at the inherited Life Area — the "first canvas connection becomes
primary" rule (see
[Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview))
is never actually tested for a sub-goal, since there's no first drag to arbitrate;
it only applies to a genuinely new, unconnected top-level Goal.

## FEAT-0307 Optional Life Area cascade on primary change

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0308 - Primary Life Area](#feat-0308-primary-life-area) |

### Description

When a Goal's own primary Life Area is changed, its existing sub-goals are not
retroactively updated by default — each sub-goal's primary was only ever a one-time
default (see [FEAT-0306](#feat-0306-sub-goal-primary-life-area-default)), and may
since have been deliberately changed to something else.

The user is instead offered an **optional cascade**, in the same shape as
[00 Base Entity Features, FEAT-0005](/nailed-it-docs/features/00-base-entity-features#feat-0005-due-date-consistency-across-the-entity-tree)'s
due-date cascade: a confirmation dialog lists the affected sub-goals and, if
accepted, updates them to the new primary. Two rules distinguish it from a blanket
update:

- **Only sub-goals still matching the old primary are offered.** A sub-goal already
  deliberately changed to a different primary is left untouched — it was a
  considered decision, not a stale default, and the cascade must not silently
  overwrite it.
- **If accepted, the cascade recurses through the full descendant chain, at any
  depth** — matching FEAT-0005's "any depth" behaviour — again only ever touching
  descendants still matching the old primary at each level.

#### Acceptance criteria (example)

- Given Goal A (primary: Sport) has sub-goal B (primary: Sport, still matching —
  never changed) and sub-goal C (primary: Financial, deliberately changed)
- When the user changes Goal A's primary to Health
- Then a confirmation dialog offers to update B (still matching) but does not list
  C (already diverged)
- And accepting updates B's primary to Health, recursing into any of B's own
  sub-goals still matching Sport, while leaving C and C's descendants untouched

## FEAT-0308 Primary Life Area

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Core planning entity fields](/nailed-it-docs/features/00-base-entity-features#feat-0001-core-planning-entity-fields) |

### Description

*(Relocated from 00 Base Entity Features, FEAT-0001 — see that file's Revision
History.)*

Every Goal carries exactly one required **primary Life Area**. This drives
grouping, dashboards, and hierarchy sequencing without ambiguity — it's the
unambiguous answer to "which Life Area's goal list does this appear in." See
[Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview)
for the full data model and the Vision Board's edge-based representation, and
[FEAT-0309](#feat-0309-impacted-life-areas) for the separate, optional,
many-to-many Impacted Life Areas relationship — an annotation of consequence, not a
second ownership claim.

This field is Goal-specific. Tasks derive their Life Area from their parent Goal
instead of carrying their own — see
[05 Task Hierarchy, FEAT-0505](/nailed-it-docs/features/05-task-hierarchy#feat-0505-task-life-area).

## FEAT-0309 Impacted Life Areas

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Core planning entity fields](/nailed-it-docs/features/00-base-entity-features#feat-0001-core-planning-entity-fields), [FEAT-0308 - Primary Life Area](#feat-0308-primary-life-area) |

### Description

*(Relocated from 00 Base Entity Features, FEAT-0006 — see that file's Revision
History.)*

Separately from its single required primary Life Area, a Goal can carry zero or
more **Impacted Life Areas** — an annotation of consequence, not a second ownership
claim (e.g. a marathon-training Goal's primary Life Area is Sport, but it impacts
Family by drawing down weekend availability). Each Impacted Life Area is set via a
form (pick a Life Area, add a short note, soft limit ~120 characters) rather than a
canvas gesture — see [02 Vision Board](/nailed-it-docs/features/02-vision-board) for
how these render (icon badges, not edges). The note lives on the relationship
itself, so the same Goal can carry a different note per Impacted Life Area.

This relationship is Goal-specific — Tasks do not carry Impacted Life Areas.

Full data model: [Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview).

## Revision History

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
