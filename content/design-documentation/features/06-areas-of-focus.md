---
title: "06 Areas of Focus"
description: "Life Areas grouping goals and tasks, and surfacing neglected areas"
draft: false
revision: "2.0"
revision_date: "22-Sep-2026"
---

Life Areas (e.g. Health, Career, Relationships, Finance) are the app's organising
category, though how an entity gets one differs by type: a Goal carries its own
independent primary Life Area (plus optional Impacted Life Areas); a Task derives
its Life Area, live, from the Goal it belongs to; a Habit does the same while
linked to a Goal, or carries its own independent tag(s) when standalone (see
[03 Goal Hierarchy](/nailed-it-docs/design-documentation/features/03-goal-hierarchy),
[05 Task Hierarchy](/nailed-it-docs/design-documentation/features/05-task-hierarchy), and
[09 Habit Tracking](/nailed-it-docs/design-documentation/features/09-habit-tracking) respectively). This
feature covers the dedicated view for browsing them by Life Area. The shared,
app-wide filter capability itself — including filtering by Life Area — lives in
[13 UI and Shared Features](/nailed-it-docs/design-documentation/features/13-ui-and-shared-features).

## FEAT-0601 Areas of Focus view {#feat-0601}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A dedicated view lists all Life Areas, each showing its associated Goals, Tasks, and
[Habits](/nailed-it-docs/design-documentation/features/09-habit-tracking).

## FEAT-0602 Attention indicator per Area of Focus {#feat-0602}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A simple visual indicator shows relative attention across life areas (e.g. count of
active goals/tasks per area), to surface imbalance.

#### Note

This is intentionally lightweight — not a scored "life wheel" — unless that's wanted
in a later phase.

## Revision History

### Version 2.0 - 22-Sep-2026

- Approved at version 2.0.

### Version 1.1 - 20-Sep-2026

- FEAT-0602 - Removed superseded feature definition. Renumbered following feature.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.4 - 13-Sep-2026

- Fixed the intro paragraph's stale "tagged with" framing — it hadn't been updated
  since Primary/Impacted was introduced. Now states how each entity type actually
  gets its Life Area: Goal (independent), Task and Goal-linked Habit (derived),
  standalone Habit (independent tags).

### Version 0.3 - 12-Sep-2026

- Updated links: 13 Filters was merged into 13 UI and Shared Features, so the intro
  paragraph, FEAT-0602's "Superseded by," and its FEAT-1303 cross-reference now
  point there.

### Version 0.2 - 12-Sep-2026

- Superseded FEAT-0602: Life Area filtering is now the shared, app-wide capability
  defined in [13 UI and Shared Features](/nailed-it-docs/design-documentation/features/13-ui-and-shared-features), not a standalone
  capability of this feature. Updated the intro paragraph to match.
- FEAT-0603: Renamed from "Attention indicator per Lite Area" to "Attention indicator per Area of Focus"

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
