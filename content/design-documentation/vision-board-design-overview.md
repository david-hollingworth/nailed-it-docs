---
title: "Vision Board — Design Overview"
description: "Design philosophy and hard specification for the Vision Board: Life Area ownership vs. impact, card-based visual representation, status lifecycle, and the shared filter model"
draft: false
revision: "1.1"
revision_date: "17-Sep-2026"
weight: 20
---

> **Scope note**: This document sits alongside the
> [Nailed-It PRD](/nailed-it-docs/design-documentation/nailed-it-prd) as a focused design
> overview. It expands on the Vision → Life Area → Goal relationship, the Vision Board's
> visual model, and the filter system that applies to it and to the rest of the
> application, at a level of detail the PRD and feature files don't currently carry.

---

## Design Philosophy

### One Vision, integrated

The Vision Statement is a single, persisted document per account — not split into
separate per-domain documents (work / personal / sport). The value of a single Vision
is that it forces competing pulls into the open: a work ambition and a training
schedule have to be reconciled on the same page, not filed away in two documents that
never speak to each other. This is the same "whole system" thinking the Well-Formed
Outcome Consequences Ecology section already applies at Goal level, applied one level
higher.

"Singular" describes the *document*, not the *prose*. It's entirely natural — expected,
even — for a Vision Statement to be written in the language of Life Areas: paragraphs
that move through Career, then Health, then Family, or that weave them together in the
same sentence. That's exactly the integration this principle is after. What "singular"
rules out is a separate, persisted Vision *per* Life Area — not a user organising their
own writing however makes sense to them.

### The Vision Statement is the Overview

The Vision Statement is one field — `overview` — free text formatted with markdown
however the user likes. There is nothing else on the record, and nothing else rendered
on the Vision Statement page:

```
VISION STATEMENT

Overview
  <the user's own writing, in whatever structure feels natural —
   markdown headings, paragraphs per Life Area, one continuous
   essay, however they choose to organise it>
```

Having written it — including a version that's effectively organised by Life Area,
paragraph by paragraph — there is nothing further the user needs to do. The Vision
Statement isn't decomposed, split, or filed into per-Life-Area boxes afterward;
writing it is the complete act. An earlier version of this document rendered a
per-Life-Area narrative as a sub-section underneath the Overview on this same page,
which implied exactly that follow-up chore — going back to re-state, per Life Area,
something likely just said in the Overview. That's removed. See **Vision
Contribution**, below, for what that field actually is.

### Vision Contribution — separate from the Vision Statement, and not a copy of it

`Life Area.vision_contribution` is a short, optional field that answers one specific
question: "how does this Life Area serve the Vision?" It is not the Vision Statement,
and not an excerpt or copy of the Overview — it's the Life Area's own, independently
written account of its relationship to the Vision. 

It lives on the Life Area's own record, for a different purpose than the Vision
Statement: giving that Life Area's own detail page a brief answer to that question
without sending someone back to the full Vision Statement to find out. It does not
surface as Vision Board node hover text — an open question at the time this section
was first written, now resolved: detail page only (13-Sep-2026).

Because it's independent, there's no expectation that it's authored *from* the Vision
Statement, or written at the same time. A user can write their whole Vision Statement
and never touch it; add it to one Life Area and not others; or write it before the
Vision Statement even exists. If its content overlaps with something already said in
the Overview, that's fine — the two are read in different contexts, not compared
against each other for consistency.

### Markdown formats content, not structure

The Overview accepts markdown for formatting *within* the field — headings, bold,
lists, links. A user organising their Overview into `## Career`, `## Health`,
`## Family` sections is simply formatting their own writing; there's no second,
system-tracked structure for that markdown to conflict with, since the Overview is the
only thing on the record. Nothing in the application parses or depends on that
markdown to work out what belongs to which Life Area.

### Ownership vs. impact

A Goal belongs to exactly one **primary Life Area**. This stays singular for the same
reason the Vision stays singular: it is the unambiguous answer to "which Life Area's
goal list does this appear in," and it drives grouping, dashboards, and roadmap
sequencing without ambiguity.

Goals routinely have consequences outside their primary Life Area — training for a
marathon (Sport) draws down time that Family was otherwise getting. This is modelled
as a separate, optional, many-to-many relationship: **Impacted Life Areas**. Impacted
is explicitly an annotation of consequence, not a second ownership claim — it does not
duplicate the Goal into another Life Area's list.

Each Impacted Life Area relationship carries its own short note (e.g. "Family: less
weekend availability during training block"), because the relationship needs to support
a hover tooltip on the Vision Board, and a tooltip needs actual content, not a bare flag.

Both primary and Impacted Life Areas are Goal-specific. A Task carries neither
independently — see **Task and Habit: derived, not owned**, below, for how a Task
(and a Goal-linked Habit) gets its Life Area instead.

### Sub-goal default, not sync

A sub-goal's primary Life Area defaults to its parent Goal's *current* primary at
the moment the sub-goal is created — a convenience, not a rule enforced afterward.
Once set, it's an ordinary, independently-editable primary like any Goal's; a later
change to the parent's own primary does not retroactively update it. The user can,
however, opt into an **optional cascade** at the moment the parent's primary
changes — a confirmation dialog, in the same shape as the due-date cascade (see
[03 Goal Hierarchy, FEAT-0311](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0311)),
which offers to update descendant sub-goals still matching the old primary
(deliberately-diverged ones are left alone), recursing through the full descendant
chain if accepted. Full mechanics:
[03 Goal Hierarchy, FEAT-0306](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0306)
and [FEAT-0307](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0307).

### Task and Habit: derived, not owned

A Task carries no independent Life Area at all. It always mirrors its parent Goal's
*current* primary, live — filterable, not settable, and with no Impacted Life Areas
of its own. A Habit follows the same rule while linked to a Goal, but a Habit's
Goal link is optional, so a standalone Habit (no linked Goal) keeps its own
independent, multi-select Life Area tags instead — there's no Goal to derive from.
Full detail:
[05 Task Hierarchy, FEAT-0505](/nailed-it-docs/design-documentation/features/05-task-hierarchy#feat-0505).

This asymmetry matters for the Vision Board specifically: only Goals get a primary
edge. See **Primary by edge, impacted by decoration**, below.

### Primary by edge, impacted by decoration

The canvas already models Life Areas as their own nodes, with edges as meaningful data
— this pre-existing design intent (see
[02 Vision Board](/nailed-it-docs/design-documentation/features/02-vision-board): "edges express 'this goal
serves this life area'") is retained, not replaced, but scoped to **Goal** nodes
only — Task nodes carry no edge at all (see **Task and Habit: derived, not owned**,
above).

**Primary Life Area** is represented by a single draggable edge from a Goal node to
its Life Area node. A Goal node's first canvas connection becomes this primary
edge — relevant only to a genuinely new, unconnected top-level Goal, since a
sub-goal's edge is drawn automatically at creation, already pointing at its
inherited default (see **Sub-goal default, not sync**, above). To change primary,
the user doesn't drag a new connection at all: they **reconnect** the existing
primary edge's endpoint onto a different Life Area node — a distinct gesture from
drawing a fresh connection, so the two don't get confused. The Life Area moved away
from is not dropped; it's automatically added as an Impacted badge. Separately, an
existing Impacted badge can be promoted straight to primary via a **"Make Primary"**
action, which swaps the two: the badge becomes the edge, and the old primary demotes
to a badge in its place. Because `primary_life_area` is required, a Goal node must
always carry exactly one primary edge — the canvas must not allow it to be deleted
without an immediate replacement (a reconnect satisfies this; an outright deletion
with nothing to replace it does not).

**Impacted Life Areas** are different in kind, not just emphasis, and stay icon
badges only — no edge, no node-to-node connection, whether set directly or arising
as the residue of a primary change. An edge-based or bounding-box representation was
considered for Impacted and rejected: a Goal can carry several Impacted Life Areas
at once, and a bare edge doesn't naturally carry the tooltip note ("Family: less
weekend availability during training block") without edges themselves becoming
labelled, annotatable objects — a materially bigger feature than a badge. Impacted
Life Areas are set via a form (pick a Life Area, add a note), via the reconnect /
"Make Primary" mechanics above, or automatically as the residue of a primary change
— and render as a small icon row on the card, each with its own hover tooltip.

A **Task** node's Life Area is a single badge too, but a different kind from a
Goal's Impacted badges: it's a single, non-optional, non-annotated reflection of the
parent Goal's current primary (see **Task and Habit: derived, not owned**, above) —
not a chosen relationship, and carrying no note or tooltip the way an Impacted badge
does.

Selecting a Life Area from a legend/filter strip still highlights every card where
it matches — primary (edge) or impacted (badge) for a Goal, or the single derived
badge for a Task — and dims the rest.

Board persistence (see
[FEAT-0203](/nailed-it-docs/design-documentation/features/02-vision-board#feat-0203))
must therefore persist the Goal's primary edge alongside node position. Impacted
relationships are not part of this board-state persistence — they persist as
ordinary `GoalImpactedLifeArea` rows, set via the form (or the mechanics above)
regardless of whether the Goal happens to be on the canvas. A Task node's Life Area
badge is not persisted board state at all — it's computed at render time from the
parent Goal's current primary, live.

### Filtering is one shared capability, not a per-view feature

The filter set defined below is not specific to the Vision Board. It is a single
specification, implemented once, and applied — as a relevant subset — everywhere Goals
and Tasks are listed (Vision Board, list views, Life Area detail, Review screens). A
filter's meaning (what "Only Abandoned" shows, what "Due This Week" resolves to) and its
default state are properties of the filter itself, not of the view using it. Views may
omit filters that don't apply to them, but must not redefine the ones they do use.

### Status is a decision, not a diagnosis

Three lifecycle states are treated as more than plain workflow labels:

- **Archived** — deliberate, neutral retirement, reachable only from **Completed**
  status. "Done with this, put away." No failure implied, and no reversal needed —
  Archive is not offered as an outcome for Abandoned or any other non-Completed state,
  and there is no "unarchive." Consistent with the soft-delete pattern used elsewhere:
  hard data stays, visibility is what changes.
- **Abandoned** — a deliberate, conscious decision to stop pursuing a Goal or Task
  before completion, made by the user (typically surfaced during a review of a Stale
  item). It is not inferred from neglect. A reason is **mandatory** when a Goal or Task
  is set to Abandoned — the status exists specifically to capture a considered "I'm
  stopping this, and here's why," not a shrug.
- **Stale / Needs Review** — a computed signal, not a status. A Goal or Task with no
  update in N days, or overdue for its next scheduled review, is flagged Stale
  regardless of its current Status. Stale is what surfaces neglect for the user's
  attention; Abandoned is one of the outcomes a user can choose once confronted with
  it (the others being: recommit/update, or Archive).

No recurring review cycle applies to Abandoned items — the decision that produced the
status already resolved the "should I keep pursuing this" question, so there is nothing
left to progress-check on a schedule. Since Archive is reachable only from Completed
status (see Data Model, below), an Abandoned Goal or Task has no forced conversion
path: it simply stays Abandoned, hidden from default views like any other, until the
user chooses to Recommit — there is no scheduled touchpoint that requires resolving
it one way or the other.

A recurring "abandoned N times" reflective metric was considered and explicitly
rejected — see **Explicitly Out of Scope** below.

Abandoned is reversible. A user can **Recommit** a previously Abandoned Goal or Task,
returning it to active pursuit. The underlying `status` value is untouched by
Abandoned/Recommit — Abandoned is a flag layered on top of `status`, not a replacement
for it — so there is nothing to restore. Recommitting carries the same accountability
as abandoning did: a mandatory reason and a recorded timestamp, since reversing a
considered decision is itself a considered decision, not an unexamined shrug back the
other way.

Because a Goal or Task can cycle through Abandoned and Recommitted more than once over
its life, this can't live as a single pair of fields on the record — every Abandon and
every Recommit is its own row in a history log (see Data Model → **Abandonment
history**), so the full sequence of decisions and reasons survives for review. That
survival matters most for exactly the Goal that keeps coming back to this fork —
it's the raw material for deciding whether it needs re-evaluating rather than being
recommitted on autopilot.

---

## Data Model

### Vision Statement

| Field | Notes |
|---|---|
| `overview` | Free text (markdown). This is the entire Vision Statement — nothing else is persisted on, or rendered as part of, this record. |

Versioned on edit (history retained), per the existing PRD data model for Vision
Statement.

### Life Area (additions)

| Field | Notes |
|---|---|
| `vision_contribution` | Free text. Optional, independent of the Vision Statement — see **Vision Contribution** above. Not the Vision Statement text, nor an excerpt of it: this is the Life Area's own account of how it serves the Vision. Renders on the Life Area's own detail page only — not the Vision Statement page, and not as Vision Board node hover text (resolved 13-Sep-2026). Empty renders as a placeholder ("Not yet defined") rather than blocking anything. |
| `display_order` | Integer. Drives ordering in Life Area list views (e.g. a Life Areas management list, Vision Board legend) — no longer tied to Vision Statement rendering, since the Vision Statement no longer includes per-Life-Area content. |
| `icon` | Icon reference, required for Vision Board card badges to be recognisable at a glance. User-selected from a fixed icon set, not system-assigned (resolved 13-Sep-2026). |
| `color` | Optional, paired with `icon`. User-selected from a fixed colour set, same as `icon` (resolved 13-Sep-2026). |

Archiving a Life Area hides it — and its `vision_contribution` — from active views
(Life Area lists, Vision Board legend); the record and content are not hard-deleted.

### Goal (relationships to Life Area)

| Relationship | Cardinality | Represented on Vision Board as | Notes |
|---|---|---|---|
| `primary_life_area` | FK, required, one per Goal | A single draggable edge, Goal node → Life Area node | Drives ownership: grouping, dashboards, sequencing. A sub-goal defaults this to its parent's current primary at creation (see **Sub-goal default, not sync**). Reconnecting the edge's endpoint changes primary; the vacated Life Area becomes an Impacted badge rather than being dropped. The edge cannot be deleted without an immediate replacement. |
| Impacted Life Areas | M2M via `GoalImpactedLifeArea` | Icon badge on the card, one per relationship, with hover tooltip | Annotation of consequence, not ownership. Zero or more. Set via a form, a canvas reconnect, or automatically as the residue of a primary change. |

`GoalImpactedLifeArea` (through-model):

| Field | Notes |
|---|---|
| `goal` | FK → Goal |
| `life_area` | FK → LifeArea |
| `note` | Short text, soft limit ~120 characters. This is the tooltip content on hover. Empty note falls back to a generic prompt ("No details added") rather than a blank tooltip. |

The note lives on the relationship row, not on either side of it — the same Goal can
carry a different note for each Impacted Life Area (e.g. a different note for Family
than for Finances).

### Task (relationship to Life Area)

Unlike Goal, Task has no relationship rows of its own to persist — its Life Area is
computed, not stored as a relationship. See
[05 Task Hierarchy, FEAT-0505](/nailed-it-docs/design-documentation/features/05-task-hierarchy#feat-0505)
for the full rule: it always mirrors its parent Goal's current `primary_life_area`,
live, rendered on the Vision Board as a single badge with no edge.

### Status lifecycle fields

| Field | Notes |
|---|---|
| `status` | Enum: Not Started / In Progress / Completed / On Hold. Ordinary multi-select filter, visible by default. Abandoned and Archived are handled separately (below), not as additional values in this same list. |
| `is_abandoned` | Boolean/flag, derived from the most recent `AbandonmentEvent` for this Goal (see **Abandonment history** below), not an independently-set field — Abandoned if the latest event is Abandoned, not Abandoned otherwise. May be cached for fast filtering; the event log stays the source of truth. |
| `is_archived` | Boolean/flag, equivalent state outside the ordinary status enum. Settable only when `status` is Completed; there is no reverse ("unarchive") transition. |
| `archived_at` | Timestamp. |

Both Abandoned and Archived are hidden from default views and exposed via their own
tri-state visibility filters (see Filter Specification), rather than being two more
checkboxes inside the ordinary Status filter — they behave differently (hidden by
default, deliberately revealed) from the four "currently live" states.

### Abandonment history

Abandoned/Recommitted state is tracked as an append-only event log, not a pair of
fields on Goal/Task, because a Goal or Task can cycle through this more than once and
each cycle's reason needs to survive independently rather than being overwritten by
the next one.

`AbandonmentEvent`:

| Field | Notes |
|---|---|
| `goal` | FK → Goal. Also covers Task, via Task's multi-table inheritance from Goal — no separate Task FK needed. |
| `event_type` | Enum: Abandoned / Recommitted. |
| `occurred_at` | Timestamp, set automatically at creation. |
| `reason` | Free text, **mandatory** for both event types — abandoning and recommitting are both considered decisions, and both require a stated reason, not just the first of the two. |

This is what makes the review-time question answerable: not just "is this currently
Abandoned," but "how many times has this Goal been abandoned and recommitted, and what
did the user say each time."

Abandoning a parent Goal cascades to all its descendants (sub-goals and Tasks) —
mirroring, not diverging from, the existing cascade-delete assumption in
[FEAT-0003](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0003).
Without this, abandoning a parent would leave its children active but effectively
orphaned — Tasks with no Goal still genuinely being pursued above them. Each cascaded
child gets its own `AbandonmentEvent` row rather than being silently hidden by its
parent's state, so a child's own history stays intact and independently reviewable.
That row's `reason` is recorded distinctly — referencing the parent's event rather
than copying its reason text verbatim — so the child's record isn't mistaken later
for an independent decision it wasn't (resolved 13-Sep-2026).
A user who wants a child to survive the parent's abandonment (or deletion) needs to
re-parent it first, via the existing Goal reassignment feature
([FEAT-0305](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0305))
— the cascade itself is not selectively skippable per child.

---

## Vision Board Presentation

### Card anatomy

**Goal cards:**

- Primary Life Area: represented by an edge connecting the Goal node to its Life
  Area node — not a badge. See **Primary by edge, impacted by decoration** above.
- Impacted Life Areas: zero or more small icon badges, e.g. a row along the card's
  bottom edge — no edge, no connection to a Life Area node.
- Hovering an Impacted Life Area badge shows its `note` as a tooltip. Multiple
  impacted badges each carry their own independent tooltip.

**Task cards:**

- Life Area: a single badge, visually similar to a Goal's Impacted badges but
  carrying no note or tooltip — it's a derived reflection of the parent Goal's
  current primary, not a chosen relationship. No edge, ever.

Goal, Task, and Life Area nodes are all freely draggable. Only a Goal's primary
relationship is ever expressed positionally (via its edge) — Impacted relationships
and a Task's derived badge never are.

### Highlight-on-filter interaction

Selecting a Life Area (from a legend or filter control) highlights every card where
that Life Area matches — primary or impacted for a Goal, or the single derived
badge for a Task — and dims all other cards. This is the recovery mechanism for the
clustering insight a bounding-box layout would otherwise have given for free,
without constraining layout permanently.

### Minimap navigation

As the board grows — more Goal/Task and Life Area nodes, more primary-Life-Area edges
connecting them — a minimap overview becomes a genuine navigation aid rather than a
nicety: a small rendered summary of every node and the current viewport, letting the
user pan the main canvas from the overview instead of scrolling blind. This is confirmed
feasible in the canvas library under consideration (React Flow / `@xyflow/react`),
which ships a minimap component as a core, no-extra-cost part of the package rather
than a paid add-on.

Two aspects of the minimap are in scope for this overview, since both reuse decisions
already made elsewhere in this document rather than introducing new ones:

- **Node colour.** Each node's minimap colour is driven by its Life Area's `color`
  field (see Data Model → Life Area). A Life Area node renders in its own colour; a
  Goal node renders in the colour of whichever Life Area it connects to via its
  primary edge; a Task node, having no edge of its own, renders in the colour of
  its derived Life Area badge instead. This gives an at-a-glance, zoomed-out read of
  which Life Area a cluster of activity belongs to, without reintroducing the
  bounding-box layout already rejected above.
- **Icon/shape per node type.** Life Area nodes and Goal/Task nodes render as visually
  distinct shapes on the minimap, not just colour, so the primary-edge relationship
  stays legible even at minimap scale, where individual icons and edges are too small
  to read directly.

Minimap screen placement (corner, size) is an implementation detail, not a design
decision, and is left out of scope here.

---

## Filter Specification

One authoritative definition, applied — as a relevant subset — to the Vision Board and
to every other Goal/Task list view in the application (list views, Life Area detail,
Review screens). Defaults travel with the filter definition; a view does not redefine
them.

| Filter | Type | Default | Notes |
|---|---|---|---|
| Life Area | Multi-select | All shown | Distinguishes primary vs. impacted match. |
| Due Date | Preset + custom | All shown | Past Due, Due Today, Due This Week, Due Next Week, Due This Month, Due Next Month, Due This Year, Due Next Year, Due within 10 Years, Custom Due Date. |
| Status | Multi-select | All four visible | Not Started, In Progress, Completed, On Hold. |
| Abandoned | Tri-state | Hidden | Hidden / Include / Only. |
| Archived | Tri-state | Hidden | Hidden / Include / Only — identical control to Abandoned. |
| Has WFO Depth | Toggle | All shown | Goals that have opted into the Well-Formed Outcome deep-dive vs. plain SMARTER goals. |
| Needs Review / Stale | Toggle | All shown | Computed signal (no update in N days, or overdue for next scheduled review) — independent of `status`. |
| Progress / Completion | Range | All shown | e.g. 0–25%, 25–75%, near-complete. |
| Habit-linked | Toggle | All shown | Goals with an associated Habit vs. those without. |
| Free-text search | Text | — | Title/description keyword search. |

Abandoned and Archived are tri-state (Hidden / Include / Only) rather than ordinary
checkboxes, because "both hidden and shown" is not a meaningful combined state for
either — they sit outside, not inside, the ordinary Status multi-select.

---

## Explicitly Out of Scope

- **"Abandoned N times" as an automated reflective metric or nudge.** Still rejected —
  even though an Abandonment history log now exists (see Data Model → **Abandonment
  history**), it exists so a user can read the full sequence of reasons for
  themselves during review, on demand. The system does not compute a count, does not
  surface it as a badge or notification, and does not decide when repetition is
  "notable." That judgement stays with the user, not a metric the app calculates.
- **Bounding-box grouping of Goals by Life Area on the Vision Board.** Rejected in
  favour of edge/badge-based decoration — see **Primary by edge, impacted by
  decoration** above.

---

## Revision History

### Version 1.1 - 17-Sep-2026

- Repointed the **Sub-goal default, not sync** cross-reference from
  [00 Base Entity Features, FEAT-0005] to
  [03 Goal Hierarchy, FEAT-0311](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0311) —
  the due-date cascade feature relocated there, since it was never actually shared
  with Life Area or Habit.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.13 - 13-Sep-2026

- Resolved three open questions from the working list: `icon`/`color` on Life Area
  are user-selected from a fixed set, not system-assigned (Data Model).
  `vision_contribution` surfaces on the Life Area detail page only, not as Vision
  Board node hover text — corrected a stale reference to a tooltip in **Vision
  Contribution** that predated this decision. A cascaded child's
  `AbandonmentEvent.reason` is recorded distinctly, referencing the parent's event,
  rather than copying its reason text verbatim (Abandonment history).

### Version 0.12 - 13-Sep-2026

- Rewrote **Primary by edge, impacted by decoration**: scoped the edge model to
  Goal nodes only (Tasks never get one). Changing primary is now a reconnect of the
  existing edge, not a fresh drag — the vacated Life Area is kept as an Impacted
  badge rather than dropped. Added the "Make Primary" action for promoting an
  existing badge to primary.
- Added **Sub-goal default, not sync** and **Task and Habit: derived, not owned** —
  new subsections capturing this session's design discussion: a sub-goal's primary
  defaults from its parent at creation (one-time, not synced); an optional cascade
  exists for later parent-primary changes; Tasks (and Goal-linked Habits) derive
  their Life Area live from their Goal rather than owning one.
- Updated Data Model (Goal table's primary/impacted notes; added a Task
  relationship-to-Life-Area entry), Card Anatomy, Highlight-on-filter, and Minimap
  Node Colour to reflect the Goal/Task split.

### Version 0.11 - 12-Sep-2026

- Updated a stale link: the resolved "06 Areas of Focus FEAT-0602" open question
  pointed at 13 Filters, which has since been merged into 13 UI and Shared
  Features. Repointed accordingly.

### Version 0.10 - 12-Sep-2026

- Removed the **Goal Tier** filter (Life/Year/Month/Task) from the Filter
  Specification. Life/Year/Month was dropped as a stored or calculated concept
  elsewhere (PRD Core Data Model, and 03 Goal Hierarchy's flexible recursive model)
  — this document's filter table hadn't been updated to match. Confirmed: the PRD is
  correct, this document was out of date.
- Resolved the reconciliation-with-feature-files open questions (02 Vision Board,
  06 Areas of Focus FEAT-0602, 00 Base Entity Features FEAT-0001) and the Delete vs.
  Abandon open question, now that the corresponding feature files have been updated
  to match this document.

### Version 0.9 - 05-Sep-2026

- Renamed `Life Area.vision_narrative` to `vision_contribution`. The old name read as
  if the field held a fragment of the Vision Statement's own text; it never did — it's
  the Life Area's own, independently written account of how it serves the Vision.
  Reworded the section to state that distinction explicitly up front, rather than
  leaving it implied.

### Version 0.8 - 05-Sep-2026

- Decoupled `Life Area.vision_narrative` from the Vision Statement page entirely. It
  no longer renders as a sub-section under the Overview — that design forced an
  awkward workflow (write the Vision naturally, organised by Life Area as is natural,
  then repeat yourself in per-Life-Area boxes underneath). The Vision Statement is now
  just the `overview` field, full stop; the Life Area narrative is a separate,
  optional field that lives and displays on the Life Area's own page instead. Updated
  Data Model (Vision Statement, Life Area) to match. Added an open question on where
  `vision_narrative` should display now that it's decoupled.

### Version 0.7 - 05-Sep-2026

- Rewrote "One Vision, integrated" to resolve a contradiction: allowing the user to
  freely add markdown sections to the Vision Statement conflicted with the philosophy
  argument against per-domain splitting, and with the deliberate rejection of a
  flexible `VisionSection` model in favour of one fixed section per Life Area. Split
  the passage into three focused subsections (philosophy / page structure with a
  concrete mockup / markdown-as-formatting-not-structure) so the Overview →
  per-Life-Area layout is easier to visualize and markdown is scoped to formatting
  content within a field, not creating new sections.

### Version 0.6 - 04-Sep-2026

- Resolved: abandoning a parent Goal cascades to all descendants (sub-goals and
  Tasks), identically to Delete's cascade — closing the gap where cascade behaviour
  was only ever assumed for Delete (FEAT-0004), not confirmed. Reparenting a child via
  the existing Goal reassignment feature (FEAT-0305) is the intended way to keep it
  out of a parent's cascade; the cascade is not otherwise skippable per child. Left
  open: whether a cascaded child's abandonment reason reuses the parent's text or is
  recorded distinctly as a cascade.

### Version 0.5 - 04-Sep-2026

- Confirmed: Recommit reason is mandatory (symmetric with Abandon); the Abandonment
  history log is purely informational and drives no automated triggers or counts.
- Constrained Archive to be reachable only from Completed status, with no
  "unarchive" — resolved the earlier open question. Corrected the now-inconsistent
  claim that an Abandoned item gets offered Archive at its next review: an Abandoned
  Goal/Task simply stays Abandoned (hidden by default) until Recommitted, with no
  forced touchpoint.
- Added open questions on narrowing Delete's role now that Abandon/Recommit exists
  (FEAT-0004), and on whether abandoning a parent Goal cascades to its children.

### Version 0.4 - 04-Sep-2026

- Replaced the single `abandoned_at` / `abandonment_reason` fields with an append-only
  `AbandonmentEvent` history log (Abandoned / Recommitted, each with a mandatory
  reason and timestamp), so a Goal or Task can cycle through Abandoned and Recommitted
  more than once without losing earlier reasons. Introduced Recommit as the named,
  equally-accountable reversal of Abandoned. Reconciled this with the earlier
  rejection of an "abandoned N times" feature: the log now exists for manual review,
  but the app still does not compute or surface a count. Flagged Archive's lack of a
  symmetric reversible history as an open question.

### Version 0.3 - 04-Sep-2026

- Added minimap navigation as an in-scope design consideration: node colour driven by
  Life Area `color`, distinct icon/shape per node type (Life Area vs. Goal/Task).
  Screen placement noted as out of scope (implementation detail). Fixed a stale
  cross-reference to the renamed "Primary by edge, impacted by decoration" section.

### Version 0.2 - 04-Sep-2026

- Resolved the primary Life Area representation: a draggable node-to-node edge
  (Goal/Task → Life Area), retaining and building on 02 Vision Board's original
  edge-based canvas model, rather than an icon badge. Impacted Life Areas remain
  icon badges only. Updated Card Anatomy, Data Model, and Open Questions accordingly.

### Version 0.1 - 04-Sep-2026

- Initial version, capturing the Vision Board / Life Area design discussion: single
  Vision with per-Life-Area narrative sub-sections, primary vs. Impacted Life Area
  ownership model, icon-based (not bounding-box) card representation, Abandoned/Archived
  status lifecycle, and the shared, app-wide filter specification.
