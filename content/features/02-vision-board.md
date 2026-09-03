---
title: "02 Vision Board"
description: "A free-form mind-map canvas connecting the vision to life areas and goals"
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
---

The vision board is a devolving planning tool — vision → life areas → goals — rather
than a generic whiteboard. Some people think visually and some think in lists; nodes on
the board and the underlying Life Area/Goal/Task records stay in sync regardless of
where they were created, so both are first-class entry points into the same data.

## FEAT-0201 Vision board canvas

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

A free-form canvas supports nodes representing Life Areas, Goals, and Tasks, connected
by edges. Nodes can be:

- Created
- Dragged
- Renamed
- Deleted
- Connected to and disconnected from other nodes

## FEAT-0202 Board and record synchronisation

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

Creating a Life Area, Goal, or Task node on the board creates the corresponding
record, and vice versa — Goals and Life Areas created elsewhere (e.g. via the standard
[create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity)
form) can be dropped onto the board and appear as nodes.

## FEAT-0203 Board persistence

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

Board state — node positions and connections — persists between sessions.

## FEAT-0204 Vision-led hierarchy

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 3 |

### Description

The board is explicitly framed as a devolving tool rather than a generic whiteboard.
The UI nudges the vision → life areas → goals hierarchy — for example, via a fixed root
node representing the vision statement — without forbidding freeform arrangement
elsewhere on the canvas.

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
