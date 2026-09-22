---
title: "01 Life Vision Statement"
description: "The single, top-level statement everything else in the app anchors to"
draft: false
revision: "2.0"
revision_date: "22-Sep-2026"
---

The life vision statement is the anchor point of the application: every Life Area,
Goal, and Task should ultimately trace back to it (Application Goal 1 in the PRD).
There is exactly one vision statement per user account.

## FEAT-0101 Write and edit vision statement {#feat-0101}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The user can write, edit, and save a single free-text life vision statement.

#### Note

Unlike Life Areas, Goals, Tasks, and Habits (see
[00 Base Entity Features](/nailed-it-docs/design-documentation/features/00-base-entity-features)), the vision
statement is a singleton with no separate creation flow and no delete operation.
Writing it the first time and editing it later use the same mechanism, so write and edit
are combined into one feature rather than split as they are for base entities.

## FEAT-0102 Vision statement version history {#feat-0102}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Previous versions of the vision statement are retained and viewable.

#### Note

This is a full diff/comparison history so that the user can see exactly what they changed over the different versions. 

## FEAT-0103 Vision statement quick access {#feat-0103}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

The current vision statement is visible or accessible from the
[Vision Board](/nailed-it-docs/design-documentation/features/02-vision-board) and from the
[Areas of Focus](/nailed-it-docs/design-documentation/features/06-areas-of-focus) view, so it is never more
than one click from any planning screen.

## Revision History

### Version 2.0 - 22-Sep-2026

- Approved at version 2.0.

### Version 1.1 - 19-Sep-2026

- FEAT-0102 - Updated this feature to become a full difference comparison between versions of the vision history.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.2 - 07-Sep-2026

- Updated FEAT-0101: Added explanatory note.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
