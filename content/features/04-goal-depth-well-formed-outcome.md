---
title: "04 Goal Depth: SMARTER and Well-Formed Outcome"
description: "The SMARTER core every goal carries, plus the optional seven-section deep-dive"
draft: false
revision: "1.0"
revision_date: "02-Sep-2026"
---

Well-Formed Outcome is not a separate, mutually-exclusive goal structure sitting
alongside SMARTER — it is built **on top of** a SMARTER goal as a deeper, optional
reflective pass, not a replacement for it. Every goal always carries its SMARTER core;
Well-Formed Outcome adds seven extra layers of scrutiny on request, matching the
Well-Formed Outcomes template exactly.

## FEAT-0401 SMARTER core fields

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |

### Description

Every Goal always carries its core SMARTER fields — this is the base, not one of two
alternative structures:

- Specific
- Measurable
- Achievable
- Relevant
- Time-bound
- Evaluated
- Reviewed

SMARTER alone is the default for new goals — no extra prompts are shown unless the
user opts in to Well-Formed Outcome depth.

## FEAT-0402 Well-Formed Outcome opt-in

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 4 |

### Description

A goal can optionally have Well-Formed Outcome depth added — a one-to-one extension
record, not a different goal type — toggled on or off per goal at any time, without
affecting or duplicating the SMARTER fields already captured.

## FEAT-0403 Well-Formed Outcome guided wizard

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 4 |

### Description

When Well-Formed Outcome depth is added, a step-by-step wizard walks through the
following seven sections, matching the template exactly. Given the volume (seven
sections, roughly 30 guided sub-questions total), this is a wizard rather than one
long form, consistent with it being an optional deep pass rather than the everyday
goal-entry flow. Each sub-question saves to its own field.

1. **Positively formulated outcome** — What specifically do you want to achieve? What
   will it give or do for you, and is that framed positively? Do you see yourself
   having this outcome? How will you know you've achieved it?
2. **Described using sensory language** — When will you achieve it? What will you see,
   hear, feel, and think? If you can't picture it, how can you achieve it?
3. **Control** — Are you in control of this outcome, and how well? Does it involve
   other people — who, specifically? Can you maintain your reactions/relationships
   around it? What actions are necessary?
4. **Contexts** — Under what circumstances would achieving this be useless? When,
   where, how, and with whom is it desired vs. undesired? Do you want it in every
   context, without limitation?
5. **Secondary gains** — Why haven't you achieved this already? What will you lose by
   achieving it? When, where, and with whom is the current lack of result normal or
   even preferred? Will you have to give up something important as a result?
6. **Resources** — Do you have everything you need? What do you already have to work
   with? What are your internal resources (beliefs, personality traits, skills) and
   external resources (things, information, people, money)? What else is needed? Have
   you, or anyone you know, achieved something like this before, and how?
7. **Consequences ecology** — What will happen if you achieve it? What will happen if
   you don't? What will *stop* happening if you achieve it? What will *stop* happening
   if you don't?

## FEAT-0404 Optional, non-blocking fields

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 4 |

### Description

Each Well-Formed Outcome sub-question can be left blank. This is a reflective tool,
not a validation gate — the app does not block saving a goal because Well-Formed
Outcome fields are incomplete.

## FEAT-0405 Convert control actions into tasks

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 4 |
| **Extends** | [FEAT-0002 - Create entity](/nailed-it-docs/features/00-base-entity-features#feat-0002-create-entity) |

### Description

Section 3's ("Control") "what actions are necessary" answer can optionally be turned
directly into one or more [Tasks](/nailed-it-docs/features/05-task-hierarchy) under
the goal — a natural bridge into the task hierarchy.

## FEAT-0406 AI-assisted question refinement

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |

### Description

If an AI provider is configured (see
[08 AI Assistant](/nailed-it-docs/features/08-ai-assistant)), each Well-Formed Outcome
question allows the user to chat with the AI to refine their response before saving
it.

#### Note

This feature depends on the AI Assistant (Feature 8), which is a later build phase
than the rest of the Well-Formed Outcome wizard. The wizard itself does not require AI
to be configured — this is an enhancement on top of it.

## Revision History

### Version 1.0 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
