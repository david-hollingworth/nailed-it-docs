---
title: "03 Goal Hierarchy"
description: "Goals at Life, Year, and Month horizons, with sub-goals and rollup"
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
---

All entities in this feature extend the base fields defined in
[00 Base Entity Features](/nailed-it-docs/features/00-base-entity-features).

Life Goals are the top-level goal type. Every Year Goal rolls up to a parent Life
Goal, and every Month Goal rolls up to a parent Year Goal. Goals always carry their
SMARTER fields — see
[04 Goal Depth](/nailed-it-docs/features/04-goal-depth-well-formed-outcome) for how
that works alongside the optional Well-Formed Outcome deep-dive.

## FEAT-0301 Goal creation at Life, Year, or Month horizon

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

Goals can be created at a Life, Year, or Month horizon:

- A **Life Goal** is a top-level goal with no parent goal.
- A **Year Goal** must have a parent Life Goal.
- A **Month Goal** must have a parent Year Goal.

## FEAT-0302 Goal parent/child progress rollup

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A Life Goal can have child Year Goals; a Year Goal can have child Month Goals.
Progress on child goals is visible from each parent, all the way up to the Life Goal.

## FEAT-0303 Sub-goals

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

At all levels, goals can have sub-goals. Sub-goals can be created at the same or a
lower horizon as their parent.

#### Note

This supports breaking a large-impact goal into a number of sub-goals before
considering the tasks needed to achieve it — for example, a Life Goal might have
several Year Goals, each broken down further into Month Goals.

## FEAT-0304 Goals calendar and timeline view

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

A calendar/timeline view shows goals by year and by month, alongside a simple
overview listing Life Goals as the top of the hierarchy.

## FEAT-0305 Goal reassignment and re-parenting

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

Goals can be reassigned to a different month/year, or re-parented to a different
Life/Year goal, without losing history.

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
