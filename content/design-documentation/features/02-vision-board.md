---
title: "02 Vision Board"
description: "A free-form mind-map canvas connecting the vision to life areas and goals"
draft: false
revision: "1.1"
revision_date: "19-Sep-2026"
---

The vision board is a devolving planning tool — vision → life areas → goals → tasks — rather
than a generic whiteboard. Some people think visually and some think in lists; nodes on
the board and the underlying Life Area/Goal/Task records stay in sync regardless of
where they were created, so both are first-class entry points into the same data.

## FEAT-0201 Vision board canvas

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

A free-form canvas supports nodes representing the Vision Staement, Life Areas, Goals, and Tasks, connected
by edges. Nodes can be:

- Created
- Dragged
- Deleted
- Connected to and disconnected from other nodes

Clicking a node opens a modal presenting the full underlying entity, using the same edit entity capability available 
elsewhere in the application. 

#### Primary Life Area edge constraint

A **Goal** node's primary Life Area is represented by exactly one draggable edge to
its Life Area node.

To change primary, the user **reconnects** the existing edge's endpoint onto a
different Life Area node — a distinct gesture from creating a fresh connection. The
vacated Life Area is not dropped; it's automatically added as an Impacted badge.
Separately, an existing Impacted badge can be promoted to primary via a
**"Make Primary"** action, which swaps the two. A Goal node must always carry
exactly one primary edge — the canvas must not allow it to be deleted without an
immediate replacement.

**Impacted Life Areas** (see
[03 Goal Hierarchy, FEAT-0309](/nailed-it-docs/features/03-goal-hierarchy#feat-0309-impacted-life-areas))
are visually distinct and not part of this edge model: they render as small icon
badges on the card, each with its own hover tooltip, and are set via a form, via the
reconnect/"Make Primary" mechanics above, or automatically as the residue of a
primary change — a Goal node can carry several at once, alongside its single
primary edge.

A **Task** node carries no edge at all, and no Impacted Life Areas — its Life Area
shows as a single badge only, reflecting its parent Goal's current primary, live
(see [05 Task Hierarchy, FEAT-0505](/nailed-it-docs/features/05-task-hierarchy#feat-0505-task-life-area)).

Full design rationale: [Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview).

#### Connections

On the Vision Board connections exist between:

- Goals and their Primary Life Area
- Sub-goals and their parent Goal
- Tasks and their parent Goal or Sub-Goal
- Habits and their parent Goal or Sub-Goal

## FEAT-0202 Board and record synchronisation

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

Creating a Life Area, Goal, Task or Habit node on the board creates the corresponding
record, and vice versa — Goals and Life Areas created elsewhere (e.g. via the standard
[create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity)
form) appear on the board as nodes, connected to any parent node.

#### Note

This synchronisation covers a Goal's primary Life Area edge — including changing it
via reconnect or "Make Primary" (see [FEAT-0201](#feat-0201-vision-board-canvas))
— and nothing else Life-Area-related. Impacted Life Area relationships set via the
form (see
[03 Goal Hierarchy, FEAT-0309](/nailed-it-docs/features/03-goal-hierarchy#feat-0309-impacted-life-areas))
are not created or modified by board interactions except where FEAT-0201 says
otherwise. A Task node's Life Area badge is not something board interactions create
or modify at all — it's a live reflection of its parent Goal's primary, not an
independent relationship.

## FEAT-0203 Board persistence

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

Board state — all node positions and connections — persists between sessions.

## FEAT-0204 Vision-led hierarchy

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

The board is explicitly framed as a devolving tool rather than a generic whiteboard.
The UI nudges the vision → life areas → goals hierarchy — for example, via a root
node representing the vision statement. All nodes can be repositioned on the canvas.

## FEAT-0205 Minimap navigation

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

As the board grows, a minimap overview shows a small rendered summary of every node
and the current viewport, letting the user pan the main canvas from the overview
instead of scrolling blind.

- **Node colour** — each node's minimap colour is driven by its Life Area's `color`
  field. A Life Area node renders in its own colour; a Goal node renders in the
  colour of whichever Life Area it connects to via its primary edge; a Task node,
  having no edge of its own, renders in the colour of its derived Life Area badge
  instead.
- **Icon/shape per node type** — Life Area nodes and Goal/Task nodes render as
  visually distinct shapes on the minimap, not just colour, so the primary-edge
  relationship stays legible at minimap scale.

Screen placement (corner, size) is an implementation detail, not specified here.

Full design rationale: [Vision Board — Design Overview](/nailed-it-docs/design-documentation/vision-board-design-overview).

## FEAT-0206 Highlight-on-filter interaction

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |
| **Extends** | [FEAT-1303 - Life Area filter: primary vs. impacted match](/nailed-it-docs/features/13-ui-and-shared-features#feat-1303-life-area-filter-primary-vs-impacted-match) |

### Description

Selecting a Life Area from a legend or filter control highlights every card where
that Life Area matches — primary (edge) or impacted (badge) for a Goal, or the
single derived badge for a Task — and dims all other cards, rather than hiding them
outright. This recovers the clustering insight a bounding-box layout would otherwise
have given for free, without constraining board layout permanently. See [13 UI and Shared Features](/nailed-it-docs/features/13-ui-and-shared-features#feat-1308-per-view-filter-application)
for how this compares to filter behaviour on other, list-style views.

## Revision History

### Version 1.1 - 19-Sep-2026

- FEAT-0201 - Removed a lot of incomprehensible waffle from the section about Primary Life Area edge constraint. Added a section to clarify the connections possible on the Vision Board
- FEAT-0202 - Added ceation of the Habit node to the Vision Board.
- FEAT-0203 - Removed the note about connections which was confusing.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.5 - 13-Sep-2026

- Rewrote FEAT-0201: scoped the primary edge to Goal nodes only; changing primary
  is now a reconnect (not a fresh drag) with the vacated Life Area kept as a badge;
  added the "Make Primary" action; Task nodes now explicitly carry no edge, single
  badge only. Links repointed to the relocated FEAT-0308/FEAT-0309 in 03 Goal
  Hierarchy.
- Updated FEAT-0202, FEAT-0203, FEAT-0205, and FEAT-0206 to add the Task case
  alongside the existing Goal behaviour.

### Version 0.4 - 12-Sep-2026

- Updated FEAT-0206's links: 13 Filters was merged into 13 UI and Shared Features,
  so the Extends reference and the per-view filter application link now point there
  at the renumbered FEAT-1303 and FEAT-1308.

### Version 0.3 - 12-Sep-2026

- Updated FEAT-0201: added the primary Life Area edge constraint (single edge,
  redraw re-parents, no deletion without replacement) and clarified Impacted Life
  Areas render as badges, not edges.
- Updated FEAT-0202 and FEAT-0203: noted that board synchronisation and persistence
  cover primary edges only — Impacted Life Areas are set and persisted via their own
  form, independent of the canvas.
- Added FEAT-0205 (Minimap navigation) and FEAT-0206 (Highlight-on-filter
  interaction), reconciling with vision-board-design-overview.md and 13 Filters.

### Version 0.2 - 07-Sep-2026

- Updated FEAT-0201: Removed the Rename capability and specified that clicking a node opens
a modal to display and edit the entire entity.
- Updated FEAT-0204: Changed the feature definition so that all nodes can be repositioned and that the 
Vision Statement field isn't fiwed in place.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
