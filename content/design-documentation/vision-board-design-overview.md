---
title: "Vision Board — Design Overview"
description: "Design philosophy and hard specification for the Vision Board: Life Area ownership vs. impact, card-based visual representation, status lifecycle, and the shared filter model"
draft: false
revision: "0.6"
revision_date: "04-Sep-2026"
---

> **Scope note**: This document sits alongside the
> [Nailed-It PRD](/nailed-it-docs/design-documentation/nailed-it-prd) as a focused design
> overview. It expands on the Vision → Life Area → Goal relationship, the Vision Board's
> visual model, and the filter system that applies to it and to the rest of the
> application, at a level of detail the PRD and feature files don't currently carry. See
> **Open Questions** at the end for where this reconciles with — and in places
> supersedes — existing feature documentation.

---

## Design Philosophy

### One Vision, integrated

The Vision Statement is singular per account. It is not split into separate
per-domain visions (work / personal / sport), because the value of a single Vision is
that it forces competing pulls into the open — a work ambition and a training schedule
have to be reconciled in one place rather than living in two documents that never speak
to each other. This is the same "whole system" thinking that the Well-Formed Outcome
Consequences Ecology section already applies at goal level, applied one level higher.

The Vision Statement carries:

- **A core Overview** — a single free-text field, cross-cutting, not tied to any one
  Life Area. This is where the integrating, "what this all adds up to" statement lives.
- **A per-Life-Area narrative** — one short text field per Life Area, describing how
  that Life Area serves and expresses the Vision. Rendered as a sub-section under the
  Overview, in Life Area display order.

The per-Life-Area narrative is a field on the Life Area record itself
(`Life Area.vision_narrative`), not a separate section/entity. A standalone
`VisionSection` model was considered and rejected: it would create two parallel lists
(Life Areas, and Vision Sections) that could drift out of sync. One field on Life Area
means there is exactly one place this content can live.

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

### Primary by edge, impacted by decoration

The canvas already models Life Areas as their own nodes, with edges as meaningful data
— this pre-existing design intent (see
[02 Vision Board](/nailed-it-docs/features/02-vision-board): "edges express 'this goal
serves this life area'") is retained, not replaced. **Primary Life Area** is
represented by a single draggable edge from the Goal/Task node to its Life Area node:
drawing, deleting, or redrawing that edge is how `primary_life_area` is set. Because
`primary_life_area` is required and single-valued, a Goal/Task node carries at most one
such edge; dragging a new edge to a different Life Area node re-parents the Goal
(replacing the existing edge) rather than adding a second one, and the canvas must not
allow the edge to be deleted without an immediate replacement — a Goal/Task node cannot
be left with zero primary edges.

**Impacted Life Areas** are different in kind, not just emphasis, and stay icon badges
only — no edge, no node-to-node connection. An edge-based or bounding-box
representation was considered for Impacted and rejected: a Goal can carry several
Impacted Life Areas at once, and a bare edge doesn't naturally carry the tooltip note
("Family: less weekend availability during training block") without edges themselves
becoming labelled, annotatable objects — a materially bigger feature than a badge.
Impacted Life Areas are set via a form (pick a Life Area, add a note) and rendered as a
small icon row on the card, each with its own hover tooltip.

The result is one Life Area entity with two distinct visual mechanisms depending on the
relationship: a node-to-node edge for the one relationship that is exclusive and
structural (primary), and a badge for the relationship that is additive and annotated
(impacted). Selecting a Life Area from a legend/filter strip still highlights every
card where it is primary (edge) or impacted (badge), and dims the rest — the highlight
mechanism is unaffected by which visual form the underlying relationship takes.

Board persistence (see
[FEAT-0203](/nailed-it-docs/features/02-vision-board#feat-0203-board-persistence))
must therefore persist the primary edge alongside node position. Impacted relationships
are not part of this board-state persistence — they persist as ordinary
`GoalImpactedLifeArea` rows, set via the form regardless of whether the Goal happens to
be on the canvas.

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
  attention; Abandoned is one of the outcomes a human can choose once confronted with
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
| `overview` | Free text. The single cross-cutting statement. |
| *(rendered, not stored)* | Per-Life-Area narrative is read from each `LifeArea.vision_narrative` in `display_order`, not duplicated onto the Vision Statement record. |

Versioned on edit (history retained), per the existing PRD data model for Vision
Statement.

### Life Area (additions)

| Field | Notes |
|---|---|
| `vision_narrative` | Free text. This Life Area's contribution to the Vision. Empty renders as a placeholder ("Not yet defined") rather than blocking anything. |
| `display_order` | Integer. Drives rendering order on the Vision Statement page and any ordered Life Area list. |
| `icon` | Icon reference, required for Vision Board card badges to be recognisable at a glance. |
| `color` | Optional, paired with `icon`. |

Archiving a Life Area hides its `vision_narrative` from the rendered Vision Statement;
the record and content are not hard-deleted.

### Goal (relationships to Life Area)

| Relationship | Cardinality | Represented on Vision Board as | Notes |
|---|---|---|---|
| `primary_life_area` | FK, required, one per Goal | A single draggable edge, Goal/Task node → Life Area node | Drives ownership: grouping, dashboards, sequencing. Redrawing the edge re-parents the Goal; the edge cannot be deleted without an immediate replacement. |
| Impacted Life Areas | M2M via `GoalImpactedLifeArea` | Icon badge on the card, one per relationship, with hover tooltip | Annotation of consequence, not ownership. Zero or more. Set via a form, not a canvas gesture. |

`GoalImpactedLifeArea` (through-model):

| Field | Notes |
|---|---|
| `goal` | FK → Goal |
| `life_area` | FK → LifeArea |
| `note` | Short text, soft limit ~120 characters. This is the tooltip content on hover. Empty note falls back to a generic prompt ("No details added") rather than a blank tooltip. |

The note lives on the relationship row, not on either side of it — the same Goal can
carry a different note for each Impacted Life Area (e.g. a different note for Family
than for Finances).

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
[FEAT-0004](/nailed-it-docs/features/00-base-entity-features#feat-0004-delete-entity).
Without this, abandoning a parent would leave its children active but effectively
orphaned — Tasks with no Goal still genuinely being pursued above them. Each cascaded
child gets its own `AbandonmentEvent` row rather than being silently hidden by its
parent's state, so a child's own history stays intact and independently reviewable.
A user who wants a child to survive the parent's abandonment (or deletion) needs to
re-parent it first, via the existing Goal reassignment feature
([FEAT-0305](/nailed-it-docs/features/03-goal-hierarchy#feat-0305-goal-reassignment-and-re-parenting))
— the cascade itself is not selectively skippable per child.

---

## Vision Board Presentation

### Card anatomy

- Primary Life Area: represented by an edge connecting the Goal/Task node to its Life
  Area node — not a badge. See **Primary by edge, impacted by decoration** above.
- Impacted Life Areas: zero or more small icon badges, e.g. a row along the card's
  bottom edge — no edge, no connection to a Life Area node.
- Hovering an Impacted Life Area badge shows its `note` as a tooltip. Multiple impacted
  badges each carry their own independent tooltip.
- Goal/Task nodes and Life Area nodes are both freely draggable. Only the primary
  relationship is ever expressed positionally (via its edge) — impacted relationships
  never are.

### Highlight-on-filter interaction

Selecting a Life Area (from a legend or filter control) highlights every card where
that Life Area is primary or impacted, and dims all other cards. This is the
recovery mechanism for the clustering insight a bounding-box layout would otherwise
have given for free, without constraining layout permanently.

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
  Goal/Task node renders in the colour of whichever Life Area it connects to via its
  primary edge. This gives an at-a-glance, zoomed-out read of which Life Area a
  cluster of activity belongs to, without reintroducing the bounding-box layout
  already rejected above.
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
| Goal Tier | Multi-select | All shown | Life / Year / Month / Task. |
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
  history**), it exists so a human can read the full sequence of reasons for
  themselves during review, on demand. The system does not compute a count, does not
  surface it as a badge or notification, and does not decide when repetition is
  "notable." That judgement stays with the user, not a metric the app calculates.
- **Bounding-box grouping of Goals by Life Area on the Vision Board.** Rejected in
  favour of edge/badge-based decoration — see **Primary by edge, impacted by
  decoration** above.

---

## Open Questions

These are raised here rather than silently resolved, consistent with this project's
working convention of flagging gaps explicitly:

- ~~Reconciliation with [02 Vision Board](/nailed-it-docs/features/02-vision-board)~~ —
  **Resolved**: the node/edge canvas and the card/badge model are not competing
  paradigms. Primary Life Area is a draggable edge (retaining 02's original intent);
  Impacted Life Area is an icon badge (no edge). See **Primary by edge, impacted by
  decoration** above. Feature file 02 (FEAT-0201–0204) still needs updating to
  cross-reference this document and to note the edge-deletion constraint.
- **Reconciliation with [06 Areas of Focus](/nailed-it-docs/features/06-areas-of-focus)
  FEAT-0602.** That feature currently describes Life Area filtering as a single
  cross-app capability; it predates the primary/impacted distinction and the fuller
  filter set defined here. Needs updating to point at this document.
- **Reconciliation with [00 Base Entity Features](/nailed-it-docs/features/00-base-entity-features)
  FEAT-0001.** The base entity model currently states Goals and Tasks carry "one or more
  Life Area tags" (an undifferentiated multi-value tag) and that Due date applies to
  Task only, with Goals using their SMARTER time-bound field instead. Both statements
  are superseded by this document — a single primary Life Area plus optional Impacted
  Life Areas, and a Due Date filter that this discussion applies to Goals as well as
  Tasks. FEAT-0001 needs updating, or an explicit note added on how a Goal's SMARTER
  time-bound field maps onto the Due Date filter presets.
- **Icon/colour source for Life Area.** `icon` and `color` are introduced here as new
  Life Area fields. Confirm whether these are user-selected (e.g. from a fixed icon
  set) or system-assigned by default with user override.
- ~~Archive has no symmetric "unarchive" action or history.~~ — **Resolved**: Archive
  is reachable only from Completed status, and there is no unarchive. This is a
  deliberate asymmetry with Abandoned/Recommit, not an oversight — a Completed Goal
  or Task has nothing left to reconsider the way an Abandoned one does.
- **Delete vs. Abandon for Goals/Tasks** (relates to
  [00 Base Entity Features](/nailed-it-docs/features/00-base-entity-features)
  FEAT-0004). Now that Abandon/Recommit exists, does a hard Delete still have a place?
  Recommendation: yes, but narrowed — Delete is for a Goal or Task that should never
  have existed (a duplicate, a typo, a test entry), not for one the user simply
  stopped pursuing. Abandon answers "I'm not doing this anymore"; Delete stays the
  answer to "this shouldn't be here at all," and unlike Abandon it needs no mandatory
  reason, since there's no decision to keep a history of. FEAT-0004 doesn't yet make
  this distinction and should be updated to.
- ~~Does abandoning a parent Goal cascade to its children?~~ — **Resolved**: yes,
  identically to Delete's cascade — this also confirms the cascade-delete behaviour
  FEAT-0004 had only assumed, not settled. See Data Model → **Abandonment history**.
  Reparenting a child before abandoning or deleting its parent (via the existing Goal
  reassignment feature) is the intended way to keep it out of the cascade — the
  cascade itself is not selectively skippable per child. Still open: whether a
  cascaded child's `AbandonmentEvent.reason` should simply reuse the parent's reason
  text, or be recorded distinctly (e.g. a reference back to the parent's event) so
  it isn't mistaken for an independent decision on that child when reviewed later.

---

## Revision History

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
