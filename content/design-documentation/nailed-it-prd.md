---
title: "Nailed-It — Product Requirements Document"
description: "An overview of the features and requirements for the Nailed-It application."
draft: false
revision: "0.3"
revision_date: "03-Sep-2026"
---


# Nailed-It

*A personal life-planning app connecting a life vision to daily execution.*

> **Note on scope**: Nailed-It is a personal-use project, not a commercial product — but it's built as a PWA with username/password accounts so more than one person can each run their own private account on it. There's no collaboration, sharing, or cross-account visibility between users; every account's data is fully isolated. "The user" below generally means "whoever is logged into a given account," and success metrics remain personal-effectiveness ones rather than business/growth metrics. Where the source feature list didn't specify a detail, an assumption is stated and flagged in Open Questions.

---

## Problem Statement

Most goal-tracking tools are designed either from the simple to-do list or the project management perspective. Neither of these are very good at defining goals and neither are very good at tracking life goals. The strengths of Nailed-It are that it starts with a vision of the future and breaks that down into well structured goals. Coupled with a rigorous review system Nailed-It supports the user to attain their goals.

## Application Goals 

1. Every task in the system can be traced back to a life area and, from there, to the vision statement — no orphaned to-dos.
2. Goal-setting defaults to a structured format (SMARTER) so goals are rarely vague, with an optional deeper Well-Formed Outcome pass available for goals that warrant more scrutiny.
3. Reviews (daily/weekly/monthly/yearly/ad-hoc) actually get scheduled and surfaced on a cadence the user defines — not a generic fixed schedule.
4. The vision board makes it easy to go from an abstract mission statement to concrete life areas and goals without needing a rigid outline first.
5. The AI assistant measurably improves goal quality (specificity, measurability, realism) versus goals the user would have written alone.
6. The app's language and structure — goal framing, review prompts, AI assistant suggestions — draw on Neuro-Linguistic Programming (NLP) principles as a core value, not just as one optional goal-structure format.
7. Recurring behaviors (habits) are tracked for consistency — via streaks and completion rate — not just as one-off completions, since many goals are achieved through repetition rather than a single task.

## Not Included (v1)

- **No collaboration or sharing features** — the app supports multiple independent accounts (each person gets their own private data), but there's no cross-account visibility, comments, sharing, or team/shared goals. Each account is its own silo.
- **No gamification or social layer** (streaks-as-currency, leaderboards, sharing to social media) — the reflective/planning tone matters more than engagement mechanics.
- **No third-party integrations** (calendar sync, Todoist/Notion import, wearables) in v1 — adds surface area before the core loop is proven out.
- **No native mobile app.** — assumed responsive web app first that scales for mobile. 

## Primary User

One persona per account: **a user**, using Nailed-It for their own personal and professional life planning. The app is multi-account (username/password login, PWA) so it can run as a shared instance for more than one person, but each account only ever sees its own data — no admin roles, permissions, or org/team concepts are needed beyond basic authentication.

---

## Design Principle: NLP-Informed Throughout

Neuro-Linguistic Programming (NLP) isn't confined to the Well-Formed Outcome goal structure — it's meant to inform the app's values and language more broadly. The uploaded Well-Formed Outcomes template gives a concrete lens for what that means, beyond generic "be positive" framing:

- **Positive framing** — outcomes stated in terms of what's wanted, not what's being avoided.
- **Sensory-specific evidence** — progress described in terms of what you'd see, hear, feel, and think, not vague self-assessment.
- **Control** — checking whether the outcome is genuinely within the user's control, and who else it depends on.
- **Context** — a goal is scoped to when/where/with whom it's wanted, rather than assumed to apply universally.
- **Secondary gains** — surfacing what the *current* state might be quietly providing, since that's often why a goal stalls.
- **Resources** — an honest inventory of what's already available (internal and external) vs. what's still needed.
- **Consequences ecology** — checking effects in all four directions: what happens / doesn't happen if the goal is achieved, and what happens / doesn't happen if it isn't.

Feature 4 below builds these directly into the Well-Formed Outcome deep-dive. This seven-section lens stays exclusive to goals that explicitly opt into Well-Formed Outcome depth — plain SMARTER goals are not touched by it, so the default flow stays fast and low-friction. Lighter-touch NLP framing (positive language in copy and prompts generally) is a separate, uncontroversial style choice and isn't gated by this decision.

---

## Core Data Model (informing the requirements below)

- **User** — an account (username + password). All other entities below belong to exactly one User; there is no cross-account data access.
- **Vision Statement** — single, top-level free-text statement. One per user (versioned so history is kept when edited).
- **Vision Board** — a free-form mind-map canvas. Nodes can represent Life Areas or Goals; edges express "this goal serves this life area" or "this life area serves the vision."
- **Life Area** — a category (e.g., Health, Career, Relationships, Finance). Goals and Tasks are tagged with one or more Life Areas.
- **Goal** — always carries core SMARTER fields (Specific, Measurable, Achievable, Relevant, Time-bound, Evaluated, Reviewed). Has a time horizon: **Life, Year, or Month** — Life Goals are the top-level goal type; Year Goals roll up to a parent Life Goal; Month Goals roll up to a parent Year Goal. **NB**: Goals can have sub-goals. If a goal have a very large impact it is sometimes helpful to break it down into a number of sub-goals before considering the tasks. Sub-goals are still bound to life, year or month.
- **Well-Formed Outcome Detail** — optional one-to-one extension of a Goal, added when the user opts into the deeper reflective pass. Each of the ~30 sub-questions across the template's seven sections is its own stored field (not one free-text block per section), so the AI assistant and review flows can reference specific answers individually. Presence of this record is what "has Well-Formed Outcome depth" means — it does not replace or duplicate the Goal's SMARTER fields.
- **Task** — inherits from Goal (same base fields: title, description, life area(s), status, due date) plus task-specific attributes (e.g., estimated effort, recurrence, sub-task list, completion date). This mirrors the "task hierarchy needed to achieve goals" requirement directly.
- **Habit** — a recurring behavior, distinct from a Goal/Task rather than a special case of one. Has a cadence (daily, weekly, N times per week, or specific days), optional Life Area tag(s), and an optional link to the Goal it serves. Streaks and completion rate are computed from its log, not stored redundantly.
- **Habit Log** — one check-in record per Habit per day: completed (and optionally a count, for quantity-based habits like "8 glasses of water"), plus an optional note.
- **Review** — an instance of a review cycle. Has a `type` (Daily / Weekly / Monthly / Yearly / Ad-hoc), a `schedule_rule` (see Feature 7 below), a template of prompts, and a log of past completed reviews.
- **AI Suggestion** — a record of an AI-generated insight or recommendation, linked to the Goal/Review it was generated for, with an accepted/dismissed state.
- **AI Provider Config** — per-user setting for which AI backend to use (OpenAI API, Ollama, or LM Studio), which model, and the connection details (API key or local endpoint URL). If an AI provider isn't configured then AI functionality is not visible to the user.

---

## Technical Foundation

These weren't part of the original feature list but are now decided, and they shape several of the features below.

**Platform & Deployment**
- [ ] Built as a Django web application. A PWA my be considered for a later version.
- [ ] Initial UI target is desktop; layouts are built responsively from the start so mobile support can follow without a rebuild.
- [ ] Ships as a Docker stack (app + database + any worker/scheduler process the review-cycle engine needs) for easy self-hosting.

**Data Storage**
- [ ] SQLite is the default database (zero-config, fine for a single self-hosted instance).
- [ ] PostgreSQL is a supported, configurable alternative (e.g., an environment variable / settings switch) — no code changes required to switch.

**Accounts & Authentication**
- [ ] Username/password login, with standard account creation and email-based password-reset flow.
- [ ] Each account's data (Vision Statement, Vision Board, Goals, Tasks, Reviews) is fully isolated — no cross-account visibility, sharing, or collaboration.
- [ ] No roles/permissions beyond "logged in as this account," consistent with the no-collaboration non-goal above.
- [ ] Two-factor authentication is out of scope for v1 — planned as an optional feature in a later phase.

**Notifications**
- [ ] Scheduled reviews (Feature 7) can notify via browser push, email, or Telegram — user-configurable, with more than one channel enabled at once if desired.
- [ ] Notification channel configuration (email address, Telegram bot/chat linkage) lives in account settings.

**AI Provider Integration**
- [ ] The AI assistant (Feature 8) is provider-agnostic: supports OpenAI API, Ollama, and LM Studio as backends.
- [ ] User selects the provider and specific model, plus connection details (API key for OpenAI; local endpoint for Ollama/LM Studio).
- [ ] Provider/model choice is a per-account setting, not hardcoded — relevant since the local options (Ollama/LM Studio) keep personal goal data on-device, which some users may prefer over a cloud API.
- [ ] **Default privacy policy**: when a cloud provider (OpenAI) is active, only the minimum context needed for the assistant's current task is sent — not the user's full goal/review history by default. The UI indicates when a cloud provider is in use for a given request, versus a local one.

---

## Requirements by Feature

### 1. Life Vision Statement

**Priority: P0**

- [ ] User can write, edit, and save a single free-text life vision statement.
- [ ] Previous versions are retained and viewable (lightweight history, not full diffing).
- [ ] The current vision statement is visible/accessible from the vision board and from the areas-of-focus view, so it's never more than one click from any planning screen.

*As the user, I want to write and revisit my life vision statement so that everything else I plan has a clear anchor point.*

---

### 2. Vision Board (mind map)

**Priority: P0**

- [ ] Free-form canvas supporting nodes (Life Area, Goals, Tasks) and connecting edges.
- [ ] Nodes can be created, dragged, renamed, deleted, and connected/disconnected.
- [ ] Creating a Life Area, Goal or Task node on the board creates the corresponding Life Area, Goal or Task record (and vice versa — goals created elsewhere can be dropped onto the board).
- [ ] Board state persists between sessions (position, connections).
- [ ] Board is explicitly framed as a *devolving* tool: vision → life areas → goals, not a generic whiteboard — the UI should nudge that hierarchy (e.g., a fixed root node for the vision) without forbidding freeform arrangement.

*As the user, I want to freely mind-map my mission down into life areas, goals and tasks so that structure emerges organically instead of me having to outline it top-down.*

Some people think visually, some think in lists — Goals and Life Areas can be created in either place and stay in sync, both as first-class entry points into the same underlying data.

---

### 3. Goals by Life, Year, and Month

**Priority: P0**

- [ ] Goals can be created at a Life, Year, or Month horizon. **Life Goals are the top-level goal type** — every Year Goal rolls up to a parent Life Goal, and every Month Goal rolls up to a parent Year Goal.
- [ ] A Life Goal can have child Year Goals; a Year Goal can have child Month Goals. Progress on child goals is visible from each parent, all the way up to the Life Goal.
- [ ] At all levels goals can have sub-goals. For example a Life Goal might have several Year Goals and each of these might have Month Goals. Sub-goals can be created at the same or lower level. 
- [ ] Calendar/timeline view showing goals by year and by month, plus a simple overview listing Life Goals as the top of the hierarchy.
- [ ] Goals can be reassigned to a different month/year, or re-parented to a different Life/Year goal, without losing history.

*As the user, I want my life goals to break down into yearly and then monthly steps so that long-range ambitions become plannable in the near term.*

---

### 4. Goal Depth: SMARTER (default) + Well-Formed Outcome (optional deeper pass)

**Priority: P0**

Well-Formed Outcome isn't a separate, mutually-exclusive goal structure sitting alongside SMARTER — the template's own section 0 *is* "The SMART Goal." Well-Formed Outcome is built **on top of** a SMART(ER) goal as a deeper, optional reflective pass, not a replacement for it. This changes the data model from the original "pick one structure" framing to "every goal has its SMARTER core; Well-Formed Outcome adds seven extra layers of scrutiny on request."

- [ ] Every Goal always carries its core SMARTER fields (Specific, Measurable, Achievable, Relevant, Time-bound, Evaluated, Reviewed) — this is the base, not one of two alternatives.
- [ ] **SMARTER alone is the default** for new goals — no extra prompts unless the user opts in.
- [ ] A goal can optionally have **Well-Formed Outcome depth** added (a one-to-one extension record, not a different goal type), toggled on/off per goal at any time without affecting or duplicating the SMARTER fields already captured.
- [ ] When Well-Formed Outcome depth is added, the guided form walks through these seven sections, matching the template exactly:

  1. **Positively formulated outcome** — What specifically do you want to achieve? What will it give/do for you, and is that framed positively? Do you see yourself having this outcome? How will you know you've achieved it?
  2. **Described using sensory language** — When will you achieve it? What will you see, hear, feel, and think? If you can't picture it, how can you achieve it?
  3. **Control** — Are you in control of this outcome, and how well? Does it involve other people — who, specifically? Can you maintain your reactions/relationships around it? What actions are necessary?
  4. **Contexts** — Under what circumstances would achieving this be useless? When/where/how/with whom is it desired vs. undesired? Do you want it in *every* context, without limitation?
  5. **Secondary gains** — Why haven't you achieved this already? What will you lose by achieving it? When/where/with whom is the current lack of result normal or even preferred? Will you have to give up something important as a result?
  6. **Resources** — Do you have everything you need? What do you already have to work with? What are your internal resources (beliefs, personality traits, skills) and external resources (things, information, people, money)? What else is needed? Have you (or anyone you know) achieved something like this before, and how?
  7. **Consequences ecology** — What will happen if you achieve it? What will happen if you don't? What will *stop* happening if you achieve it? What will *stop* happening if you don't? (The full four-quadrant consequence check.)

- [ ] Given the volume (seven sections, ~30 guided sub-questions total), this is presented as a step-by-step wizard rather than one long form — consistent with it being an optional *deep* pass, not the everyday goal-entry flow. Each sub-question saves to its own field (resolved — see Core Data Model).
- [ ] Each sub-question can be left blank — this is a reflective tool, not a validation gate; the app shouldn't block saving a goal because Well-Formed Outcome fields are incomplete.
- [ ] Section 3's "what actions are necessary" answer can optionally be turned directly into one or more Tasks under the goal — a natural bridge into the Task Hierarchy feature. 
- [ ] If AI is configured each question shall allow the user to chat with the AI to refine the responses.

*As the user, I want SMARTER to be enough for most goals, with the option to run a goal through the full well-formed-outcome reflection when it's a big or sticky one, so the depth of process matches the weight of the goal.*

---

### 5. Task Hierarchy

**Priority: P0**

- [ ] Tasks inherit Goal's base fields (title, description, life area tagging, status) and extend with task-specific attributes: estimated effort/duration, recurrence rule, checklist of sub-tasks, actual completion date.
- [ ] Tasks link to exactly one parent Goal (a task exists to serve a goal — no orphan tasks, consistent with Goal 1 above).
- [ ] Tasks can be nested (sub-tasks) at least one level deep. Sub-tasks are linked to parent tasks, not to goals.
- [ ] Task status (Not started / In progress / Done / Blocked) rolls up into a visible completion percentage on the parent Goal or parent Task.

*As the user, I want my day-to-day tasks structurally tied to the goal they serve so that I always know why I'm doing something.*

---

### 6. Areas of Focus

**Priority: P0**

- [ ] Dedicated view listing all Life Areas, each showing its associated Goals and Tasks.
- [ ] Filtering across the whole app (vision board, goal list, task list) by one or more Life Areas.
- [ ] Simple visual indicator of relative attention across life areas (e.g., count of active goals/tasks per area) to surface imbalance — lightweight, not a scored "life wheel" unless that's wanted later.

*As the user, I want to see my goals and tasks grouped by life area so that I can spot when one area is being neglected.*

---

### 7. Structured Review Cycle

**Priority: P0** (engine) / **P1** (advanced custom scheduling)

This is the most structurally distinct feature — it needs its own small scheduling sub-model rather than a single fixed cadence per type.

- [ ] Built-in review types: Daily, Weekly, Monthly, Yearly, Ad-hoc.
- [ ] Each review type has a **default cadence** but the cadence is user-editable per type — e.g., the "Monthly" review type can be rescheduled to trigger every two weeks.
- [ ] Reviews can be scheduled by **rule**, not just by type — e.g., "every Friday at 17:00, run a review of next week's tasks." A rule needs: trigger (day-of-week/day-of-month/interval), time, and a template (which prompts/scope the review covers).
- [ ] Each review type has a default prompt template (e.g., Weekly: "What moved forward this week? What's blocked? What's next week's focus?") that's editable.
- [ ] Completed reviews are logged with timestamp and responses, viewable as history per Life Area or Goal.
- [ ] Reviews can reference and update the Goals/Tasks they touch directly from the review screen (not just as a separate journal entry) — and, separately, note which Habits were kept up or slipped during the review period (Feature 9).
- [ ] Ad-hoc reviews can be triggered manually at any time using any existing template.

*As the user, I want to define my own review rhythm — not just "weekly" or "monthly" out of the box — so that the cadence matches how I actually plan, not a generic default.*

**Acceptance criteria (example — scheduled review):**
- Given the user has set a rule "Friday 17:00 → next-week task review"
- When Friday 17:00 arrives
- Then the app surfaces that review — notifying via whichever channel(s) the user has enabled (browser push, email, and/or Telegram; see Technical Foundation) — pre-populated with next week's tasks.

---

### 8. AI Assistant (insight & goal-structure suggestions)

**Priority: P1** — valuable but dependent on the rest of the data model existing first; reasonable to build after Features 1–7 have real data to work with.

- [ ] Given a goal in progress, the AI assistant can critique it against its SMARTER fields (e.g., flag a missing measurable component) **and**, if Well-Formed Outcome depth has been added, against the seven-section framework (see Design Principle above) — noting thin or skipped sections rather than requiring them.
- [ ] During or after a review, the AI assistant can surface pattern-level insight (e.g., "Health goals have been rescheduled 3 months running," or "Your meditation habit has slipped 3 weeks in a row") — described qualitatively, not as a hard analytics dashboard.
- [ ] Suggestions are presented as accept/dismiss/edit — never silently applied.
- [ ] Assistant has access to the user's Life Areas, Goals, Tasks, Habits, and review history as needed to ground its suggestions (scope of what it reads is a data-access decision, not just a prompt decision — flagged below).
- [ ] Backend is swappable between OpenAI API, Ollama, and LM Studio with model selection, per the Technical Foundation section — no assistant feature should assume a specific provider.

*As the user, I want the assistant to provide assistance in setting the goals, sanity-check my goal structure and notice patterns across reviews so that I get an outside perspective without needing another person.*

---

### 9. Habit Tracking

**Priority: P0** — core to the base product.

- [ ] User can create a Habit: title, optional description, optional Life Area tag(s), and link it to the parent Goal it serves (e.g., a "Meditate daily" habit supporting a "Mental Health" Life Area or a specific Year Goal).
- [ ] Cadence is configurable: daily, weekly, a target count per week (e.g., "3x/week"), or specific days of the week.
- [ ] User can check in on a Habit for a given day — a simple done/not-done by default, or a count for quantity-based habits (e.g., glasses of water), plus an optional note.
- [ ] Current streak and a completion-rate view (e.g., last 30 days) are shown, computed from the check-in log rather than stored as separate mutable state that could drift out of sync.
- [ ] Habits can be archived (deactivated) without losing their historical log — consistency history matters even after a habit is dropped or retired.
- [ ] Habits are visible from the Areas of Focus view (Feature 6), grouped by Life Area alongside Goals and Tasks, and from the linked Goal's detail view when one is set.
- [ ] Habit check-in reminders use the same notification channels as reviews (browser push, email, Telegram — see Technical Foundation), on the habit's own cadence rather than the review schedule.

*As the user, I want to track the recurring behaviors that actually drive my goals — not just one-off tasks — so consistency itself is visible, not only whether I hit isolated milestones.*

---

### 10. Success Drivers

**Priority: P0** — core to the base product.

#### Problem Statement

Nailed-It currently chains a life vision down through Life Goals, Year Goals, Month Goals, and Tasks, with a review cycle to keep that chain alive. What's missing is an affective, identity-level layer: a short, personally-chosen statement of belief or intent that a user can attach to their reviews to reinforce mindset alongside progress-tracking. Without this, reviews are purely mechanical (did I do the task, am I on pace) with no space for the motivational or identity-reinforcement dimension that classic personal-development literature treat as important to sustained behavior change.

#### Goals

- Let a user build a personal set of affirmation-style statements ("drivers"), either chosen from a provided example library or written from scratch.
- Let a user choose which of their configured reviews each driver appears on, so the right affirmation surfaces at the right rhythm.
- Keep the feature entirely optional and low-friction — it should add motivational texture to a review, never a required step or a data-entry burden.
- Reinforce Nailed-It's existing positive-framing principle (the same NLP-informed positive-language ethos already used in WFO Section 1 and general copy) by making affirmations a first-class, positively-worded artifact.

#### Non-Goals

- **Not a journaling or gratitude-log feature.** Drivers are static, chosen statements re-shown over time, not new freeform entries per review. A journaling feature is a separate concern.
- **Not social or shared content.** Nailed-It has no cross-account collaboration; a community-authored or shared driver library is explicitly out of scope.
- **Not AI-generated in v1.** Personalized/AI-drafted drivers are a natural extension (see Future Considerations) but add cloud-AI privacy surface area that shouldn't gate the core feature.
- **Not gamified.** No streaks, completion counts, or "you haven't updated your drivers in X days" pressure. That cuts against the reflective, positively-framed intent of the feature.
- **Not tied to push notifications independent of the review cycle in v1.** Drivers surface inside reviews only; a standalone "affirmation of the day" notification is a possible later add-on, not part of this spec.

#### User Stories

- As a user, I want to browse a library of example drivers so I can quickly find ones that resonate with me.
- As a user, I want to write my own custom driver so it reflects my own goals and voice rather than a generic template.
- As a user, I want to adopt a library driver and then edit its wording, so I can use it as a starting point rather than an all-or-nothing pick.
- As a user, I want to choose which of my reviews (daily, weekly, Month Goal, Year Goal, etc.) a given driver appears on, so it shows up at the cadence where it's actually useful.
- As a user, I want to attach more than one driver to a review, so I'm not stuck with only one statement forever.
- As a user, I want to the drivers attached to a review to be displayed randomly so I don't, necessarily, see the same drivers displayed on each review.
- As a user, I want to the drivers attached to a review to be displayed in a random order.
- As a user, I want to deactivate a driver without deleting it, so I can retire it for a season and bring it back later without losing my history.
- As a user, I want an inviting empty state the first time I visit this feature, so it's clear what drivers are and how to get started rather than a blank screen.
- As a user, I want reviews with no drivers attached to simply omit that section, so the feature never feels like a required field.

### Requirements

#### Must-Have (P0)

- **Example driver library**: a seeded set of original example drivers, grouped by category (e.g., Productivity, Personal Growth). 
- **Browse & adopt**: user can browse the library by category and add any example to their personal set.
- **Custom authoring**: user can write and save their own driver as free text.
- **Edit & deactivate**: user can edit the text of any driver in their personal set (library-derived or custom) and deactivate (soft-delete) it without losing history.
- **Review assignment**: user can attach a driver to one or more of their configured review types/cadences, and remove that assignment later.
- **Display in review**: assigned driver(s) are shown as part of the corresponding review's flow.
- **Graceful empty state**: reviews with no assigned drivers render normally, with no empty placeholder or nag.
- **Per-account isolation**: consistent with Nailed-It's existing multi-account, no-cross-account-collaboration model — a user's custom drivers and adoptions are private to their account.

**Acceptance criteria (representative):**
- [ ] Given the example library, when a user selects a driver, then it is added to their personal set and becomes editable.
- [ ] Given a personal driver, when a user assigns it to a review type, then it appears on that review's next occurrence.
- [ ] Given a driver assigned to a review, when the user deactivates the driver, then it stops appearing on future reviews but the assignment history is retained.
- [ ] Given a review with zero assigned drivers, when the user opens that review, then no driver section is shown.

#### Nice-to-Have (P1)

- Markdown text emphasis (bold/italic) for a driver's wording.
- Simple usage visibility — e.g., last-shown date — so a user can see a driver has gone stale and consider retiring it.

#### Future Considerations (P2)

- **AI-assisted drafting**: the AI assistant suggests a positively-framed driver, potentially seeded from a goal's WFO "positively formulated outcome" answers (Section 1 of the WFO template) — a natural bridge between WFO and this feature. Must respect the existing "send minimal context" cloud-AI privacy default and the UI indicator for active cloud providers.
- **Goal-level attachment**: attach a driver to a specific Goal (not just a review type/cadence), so it appears whenever that particular goal is reviewed.
- **Standalone reminders**: surface a driver via push/email/Telegram independent of the review cycle (e.g., a daily affirmation), reusing the existing notification channels.
- **Resonance tracking**: let a user mark whether a driver "still resonates," as a lightweight, non-gamified signal for what to keep or retire.

#### Open Questions


- **Adopt-by-copy vs. adopt-by-reference**: when a user "adopts" a library driver, it creates a copy that the user can edit the wording of then, or at a later date.
- **Review-type integration**: When the user creates or edits a driver statement they can choose which review schedule to adopt for that statement.
- **Multiple drivers per review**: When defining a review cycle the user can choose the number of drivers to display per review. The drivers are chosen at random (unless all drivers have been selected to appear) and displayed in a random order.

#### Timeline Considerations

- No hard deadline — this is explicitly a later-phase feature.
- **Dependency**: the review scheduling engine (review types/cadences) needs to exist first, since driver display hooks into the review flow.
- **Dependency**: the example driver library needs original content written before this can ship, even in a minimal form — flagged so it isn't a last-minute blocker.
- Suggested phasing: ship P0 as a self-contained v1 once the review engine is stable; revisit P1 items as a fast follow; treat P2 (especially AI-assisted drafting) as a natural pairing with any future WFO-to-AI integration work rather than a standalone project.

### 11. Calendar Integration (Google Calendar, Nextcloud)

**Priority: Version 2** — not part of the v1 minimum viable product. The "Not Included (v1)" list already excludes third-party integrations, including calendar sync, from v1 scope; this section captures that deferred feature in enough detail that it isn't lost.

#### Problem Statement

Nailed-It's Tasks carry due dates and its Reviews run on a schedule, but both currently live only inside the app. A user who also keeps a personal or work calendar in Google Calendar or Nextcloud has to either check two systems separately or manually copy dates across — undermining the "reviews actually get scheduled and surfaced" application goal for anyone whose day-to-day planning happens in a calendar app rather than (or in addition to) Nailed-It itself.

#### Goals

- A user's Task due dates and scheduled Review occurrences appear automatically on a calendar they already check, without manual re-entry.
- At least two calendar providers are supported from the start — Google Calendar and Nextcloud (via CalDAV) — using the same provider-agnostic principle already established for AI backends: the provider is a per-account setting, not hardcoded.
- Sync is opt-in and configurable per entity type, so a user who only wants Reviews on their calendar (and not every Task) isn't forced into all-or-nothing sync.
- Nailed-It's own review scheduling engine (Feature 7) remains the single source of truth for when a review happens — calendar sync publishes that schedule outward, it doesn't replace or duplicate it.

#### Non-Goals

- **Not a full calendar client.** Nailed-It doesn't display or manage the user's existing external calendar entries — it only publishes events that originate in Nailed-It.
- **Not two-way task creation (v1 of this feature).** Creating an event directly in Google Calendar or Nextcloud does not create a Nailed-It Task. See Future Considerations.
- **Not a replacement for the review scheduling engine.** Review rules, cadences, and templates continue to be defined and owned inside Nailed-It (Feature 7); calendar events are a read-out of that schedule.
- **Not real-time by default.** Sub-minute, webhook-driven sync is not assumed for v1 of this feature — see Open Questions on sync mechanism.

#### User Stories

- As the user, I want my Task due dates to show up on my Google Calendar or Nextcloud calendar, so I see everything I need to do in one place instead of maintaining two systems.
- As the user, I want my scheduled reviews to appear as calendar events, so they sit alongside my other commitments rather than relying only on push/email/Telegram notifications.
- As the user, I want to choose which calendar provider my account(s) syncs to, and enter my own connection details, so the integration works with whichever service(s) I actually use.
- As the user, I want to turn sync on or off separately for Tasks and for Reviews, so I'm not flooded with calendar entries I don't want.
- As the user, I want editing, rescheduling, or deleting a Task or Review in Nailed-It to update or remove the corresponding calendar event, so the two stay consistent without manual cleanup.
- As the user, I want a clear indicator if my calendar connection stops working (an expired Google token, an invalid Nextcloud credential), so stale or missing sync doesn't go unnoticed.

#### Core Data Model additions

- **Calendar Provider Config** — per-user setting for which calendar backend to use (Google Calendar or Nextcloud/CalDAV), plus connection details (OAuth token for Google Calendar; server URL, calendar path, and credentials for Nextcloud). Mirrors the existing AI Provider Config pattern.
- **Calendar Sync Link** — one record per synced Task or Review occurrence, mapping the Nailed-It entity to the external calendar event's ID. Used to make updates and deletes idempotent, and to detect a broken link if the external event is removed independently.

#### Requirements

**Must-Have**
- [ ] User can connect a Google Calendar account via OAuth, or a Nextcloud calendar via CalDAV URL and credentials, as a per-account setting.
- [ ] A Task with a due date creates a corresponding calendar event on the connected calendar(s) when saved; editing the due date updates the event; deleting or completing the Task removes or updates the event accordingly.
- [ ] If enabled in the settings, each upcoming scheduled Review occurrence (per Feature 7's scheduling rules) creates a corresponding calendar event on the connected calendar(s).
- [ ] Sync can be independently enabled or disabled for Tasks and for Reviews.
- [ ] If a calendar connection becomes invalid (expired OAuth token, rejected CalDAV credentials), the user sees a clear indicator in account settings and can reconnect without losing existing sync links.

*As the user, I want my due dates and review schedule to just appear on the calendar I already use, so Nailed-It fits into my existing routine instead of asking me to adopt a new one.*

**Nice-to-Have**
- [ ] Habit occurrences can optionally be synced as recurring calendar events, matching the habit's cadence.
- [ ] Sync targets can be split by entity type — e.g. Tasks to one calendar, Reviews to another — rather than everything going to a single connected calendar.

**Future Considerations**
- Additional providers: Microsoft 365/Outlook, Apple Calendar (via CalDAV), or a generic read-only ICS feed subscription as a lighter-weight fallback for providers not directly supported.
- Two-way sync: an event created externally could optionally create a draft Task in Nailed-It, pending the open question below on sync direction.

#### Open Questions

- **Sync direction** — is this push-only (Nailed-It → external calendar), Yes, this is push only. It's not envisaged the it will ever be two-way. **Resolved**
- **Sync mechanism** — a background job. The frequency of sync can be set for each configured sync calendar separately in the connection settings. **Resolved**
- **CalDAV scope** — this should be a generic CALDAV client, tested against Nextcloud. **Resolved**
- **Habit inclusion** — should Habit occurrences be in the Must-Have set for v1 (not v2)? No, Habits is a must have but Habits are not planned to be sync'd. THe application can provide remindrs and tracking for Habits, there's no requirement to put these into a calendar. **Resolved**

#### Timeline Considerations

- Explicitly Version 2 scope, per the PRD's existing "Not Included (v1)" list.
- Dependency: Task due dates and the Review scheduling engine (Feature 7), including its notification delivery, need to exist and be stable first, since this feature reads from both.
- Dependency: whichever background worker/scheduler process ends up handling review-cycle triggers is the natural place to also run the calendar sync job, so this is most naturally sequenced after that infrastructure exists rather than built standalone.


## Success Metrics

Since this is a personal tool, "success" means *the system gets used the way it's designed to be used*, not growth/revenue metrics.

**Leading indicators:**
- Reviews completed vs. reviews scheduled (target: ≥80% completion rate after the first month of normal use).
- % of tasks with a traceable parent Goal → Life Area → Vision chain (target: 100%, since Goal 1 makes this a hard requirement, not aspirational).
- Time from opening the app to logging a completed review (should be fast — a heavy review flow will get skipped).
- Habit check-in completion rate (actual check-ins vs. expected, per each habit's own cadence) and % of active habits with a live streak.

**Lagging indicators:**
- Subjective check-in (a simple personal rating during monthly/yearly reviews): does the user feel their daily tasks reflect their stated life vision?
- Goal completion rate by Life Area, tracked over a quarter, to see if the tool actually surfaces neglected areas in a way that changes behavior.

---

## Suggested Phasing

1. **Phase 0 — Foundation**: Django/Docker project setup, SQLite (default) + PostgreSQL config switch, username/password accounts with data isolation.
2. **Phase 1 — Core hierarchy**: Vision Statement, Goals (Life/Year/Month, SMARTER default), Task hierarchy, Areas of Focus, **Habit Tracking**. This alone is a usable app.
3. **Phase 2 — Review engine**: Review types, custom scheduling rules, templates, history log, plus notification delivery (browser push, email, Telegram).
4. **Phase 3 — Vision Board**: mind-map UI over the data model built in Phase 1, with equal-footing web-form entry.
5. **Phase 4 — Well-Formed Outcome depth**: the optional seven-section extension on top of an existing SMARTER goal, built as a step-by-step wizard, per the finalized template.
6. **Phase 5 — AI Assistant**: goal critique (grounded in both structure rules and NLP well-formedness), then pattern insight across reviews, with OpenAI/Ollama/LM Studio provider support from the start.

## Revision History

### Version 0.1 - 02-Sep-2026

- Initial version.

### Version 0.2 - 03-Sep-2026

- Added section describing the success drivers feature.
- Addded section for calendar synchronization

