---
title: "13 UI and Shared Features"
description: "Cross-cutting interaction and rendering conventions, including the shared, app-wide filter specification, used across multiple features and views"
draft: false
revision: "1.0"
revision_date: "13-Sep-2026"
---

Unlike Features 00–12, this file doesn't correspond to a single PRD section or a
single entity type. It groups interaction and rendering conventions that apply across
multiple features and views, rather than behaviour owned by one entity or feature
area. Where [00 Base Entity Features](/nailed-it-docs/features/00-base-entity-features)
covers shared entity data fields and lifecycle (create/edit/delete), this file covers
shared UI/interaction conventions — some of which extend beyond the base entity model
to fields like the Vision Statement.

## FEAT-1301 Markdown-formatted text fields

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Free-text, multi-line fields across the application — including entity Description
fields (see [00 Base Entity Features](/nailed-it-docs/features/00-base-entity-features)),
the [Vision Statement](/nailed-it-docs/features/01-life-vision), and
[Well-Formed Outcome](/nailed-it-docs/features/04-goal-depth-well-formed-outcome)
answers — accept Markdown syntax on entry and are rendered with that formatting
applied wherever they are displayed, rather than as plain or raw text.

Raw HTML entered into these fields is sanitised — permitted tags are kept and
rendered, everything else is stripped — rather than escaped to literal text or
rejected outright (resolved 13-Sep-2026). This matches the existing
`django-markdownify` + `bleach` rendering pipeline already in use; the specific
allowed-tags list is an implementation detail, not specified here.

## FEAT-1302 Shared filter specification

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Filtering is one shared capability, not a per-view feature. This specification is
built from [Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview),
which defines it as a single specification, implemented once, and applied — as a
relevant subset — everywhere Goals and Tasks are listed: the
[Vision Board](/nailed-it-docs/features/02-vision-board), list views, Life Area
detail, and [Review](/nailed-it-docs/features/07-review-cycle) screens. A filter's
meaning (what a preset resolves to) and its default state are properties of the
filter itself, not of the view using it — a view may omit filters that don't apply to
it, but must not redefine the ones it does use.

One authoritative filter definition applies everywhere Goals and Tasks are listed.
The full set, with type and default:

| Filter | Type | Default |
|---|---|---|
| Life Area | Multi-select | All shown |
| Due Date | Preset + custom | All shown |
| Status | Multi-select | All four visible |
| Abandoned | Tri-state | Hidden |
| Archived | Tri-state | Hidden |
| Has WFO Depth | Toggle | All shown |
| Needs Review / Stale | Toggle | All shown |
| Progress / Completion | Range | All shown |
| Habit-linked | Toggle | All shown |
| Free-text search | Text | — |

A view may omit any filter that doesn't apply to it (e.g. a Review screen may not
expose Progress/Completion), but where it does expose a filter, that filter's
behaviour and default come from this specification, not a per-view redefinition.

## FEAT-1303 Life Area filter: primary vs. impacted match

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [03 Goal Hierarchy, FEAT-0308 - Primary Life Area](/nailed-it-docs/features/03-goal-hierarchy#feat-0308-primary-life-area), [FEAT-0309 - Impacted Life Areas](/nailed-it-docs/features/03-goal-hierarchy#feat-0309-impacted-life-areas) |

### Description

Multi-select by Life Area, defaulting to all shown. Matching differs by entity
type:

- A **Goal** matches if the selected Life Area is either its primary or one of its
  impacted Life Areas — the filter does not distinguish which kind of match it was
  for inclusion purposes, though the [Vision Board](/nailed-it-docs/features/02-vision-board)
  does visually distinguish primary (edge) from impacted (badge) on the cards
  themselves.
- A **Task** matches if the selected Life Area is the one it currently derives from
  its parent Goal (see [05 Task Hierarchy, FEAT-0505](/nailed-it-docs/features/05-task-hierarchy#feat-0505-task-life-area))
  — there's no primary/impacted distinction to make.
- A **Habit** matches on whichever applies: its derived Life Area if linked to a
  Goal, or its own independent tag(s) if standalone (see
  [09 Habit Tracking, FEAT-0907](/nailed-it-docs/features/09-habit-tracking#feat-0907-habit-life-area)).

## FEAT-1304 Due Date filter

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0001 - Core planning entity fields](/nailed-it-docs/features/00-base-entity-features#feat-0001-core-planning-entity-fields) |

### Description

Preset options, plus a custom range: Past Due, Due Today, Due This Week, Due Next
Week, Due This Month, Due Next Month, Due This Year, Due Next Year, Due within 10
Years, Custom Due Date. Applies uniformly to Tasks' due dates and Goals' computed
target dates (see FEAT-0001) — both resolve to a real, storable date, so this filter
treats Goals and Tasks the same way.

## FEAT-1305 Status, Abandoned, and Archived filters

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0007 - Abandon and recommit](/nailed-it-docs/features/00-base-entity-features#feat-0007-abandon-and-recommit), [FEAT-0008 - Archive a completed entity](/nailed-it-docs/features/00-base-entity-features#feat-0008-archive-a-completed-entity) |

### Description

- **Status** — ordinary multi-select over the four live states (Not Started, In
  Progress, Completed, On Hold), all visible by default.
- **Abandoned** — tri-state (Hidden / Include / Only), default Hidden.
- **Archived** — tri-state (Hidden / Include / Only), default Hidden, identical
  control to Abandoned.

Abandoned and Archived are deliberately tri-state rather than ordinary checkboxes
inside the Status multi-select — "both hidden and shown" isn't meaningful for
either, and both are hidden-by-default, deliberately-revealed states rather than
"currently live" ones.

## FEAT-1306 Needs Review / Stale filter

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0009 - Stale / Needs Review signal](/nailed-it-docs/features/00-base-entity-features#feat-0009-stale--needs-review-signal) |

### Description

Toggle, all shown by default. Filters on the computed Stale/Needs Review signal
(no update in N days, or overdue for its next scheduled review) — independent of the
entity's `status` value.

## FEAT-1307 Remaining filter dimensions

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

- **Has WFO Depth** — toggle. Goals that have opted into the
  [Well-Formed Outcome](/nailed-it-docs/features/04-goal-depth-well-formed-outcome)
  deep-dive vs. plain SMARTER goals.
- **Progress / Completion** — range (e.g. 0–25%, 25–75%, near-complete).
- **Habit-linked** — toggle. Goals with an associated [Habit](/nailed-it-docs/features/09-habit-tracking)
  vs. those without.
- **Free-text search** — title/description keyword search.

## FEAT-1308 Per-view filter application

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

How a filter selection visually manifests may differ by view. The
[Vision Board](/nailed-it-docs/features/02-vision-board#feat-0206-highlight-on-filter-interaction)
explicitly highlights matching cards and dims non-matching ones, keeping the full
canvas visible — documented behaviour, not an assumption. Ordinary list-style views
(Goal list, Task list, Life Area detail, Review screens) are assumed to hide
non-matching items in the conventional way; this isn't explicitly specified in the
source design document and is flagged here as an assumption rather than stated fact.

## FEAT-1309 Field-level contextual help

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 4 |

### Description

Some fields carry a small help icon. Which fields get one — and whether a given
field exposes just short-form help or both short and long — is decided per field as
each feature area is specified, not as a blanket app-wide rule.

- Hovering the icon opens a short help popup: a brief, one- or two-sentence
  explanation of the field.
- Clicking the icon opens a longer popup: a fuller explanation of what the field is
  for, how to fill it in well, and — for goal-planning fields — how a good answer
  contributes to the goal's chances of success. Not every field with short help also
  has long help.
- Short and long text are independently authored. For some fields the long form
  builds on the short one; for others it covers different ground entirely — this is
  a per-field content decision, not a structural rule, and authoring effort has no
  bearing on whether a field gets the split-level treatment.

### Icon differentiation

Fields with short help only use an outlined circle-question-mark icon; fields that
also carry long help use the same icon filled/solid. Colour is deliberately not used
as the distinguishing signal, since it fails for colour-blind users.

### Out of scope (this iteration)

- **Touch/mobile interaction.** Sketched for later — short press shows the short
  text, long press shows the full text, mirroring the desktop hover/click split —
  but mobile isn't in scope for the app at this stage and isn't specified further
  here.

## Revision History

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.5 - 13-Sep-2026

- Added FEAT-1309 Field-level contextual help: hover for short help, click for a
  longer explanation, decided per field rather than app-wide. Fields with long help
  use a filled circle-question-mark icon vs. outlined for short-only, avoiding
  colour as a differentiator. Touch/mobile interaction sketched but explicitly out
  of scope this iteration. Phase 4.

### Version 0.4 - 13-Sep-2026

- FEAT-1301: resolved the open question on raw HTML in markdown fields — sanitised
  (permitted tags kept, everything else stripped), matching the existing
  `django-markdownify` + `bleach` pipeline. The allowed-tags list itself remains an
  implementation detail.

### Version 0.3 - 13-Sep-2026

- FEAT-1303: split the match rule by entity type — Goal (primary or impacted),
  Task (its one derived value), Habit (derived when linked, own tags when
  standalone). Extends updated to point at the relocated FEAT-0308/FEAT-0309 in
  03 Goal Hierarchy.

### Version 0.2 - 12-Sep-2026

- Merged 13 Filters into this file, replacing the outdated FEAT-1302 filter list
  (which still referenced the since-dropped "Goal Tier" dimension) with the fuller
  specification originally built from Vision Board — Design Overview (13-filters.md
  v0.1) and since corrected on the Goal Tier conflict (13-filters.md v0.2). Filter
  items renumbered FEAT-1302 through FEAT-1308 to sit after this file's own
  FEAT-1301 (Markdown fields). 13-filters.md is retired; cross-references to it in
  00 Base Entity Features, 02 Vision Board, and 06 Areas of Focus updated to point
  here.

### Version 0.1 - 07-Sep-2026

- Initial version: Markdown-formatted text fields and the shared filter
  specification.
