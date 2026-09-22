---
title: "10 Accounts and Settings"
description: "Registration, login, notification channels, and AI provider configuration"
draft: false
revision: "1.2"
revision_date: "20-Sep-2026"
---

Unlike Features 01–09, this file is not numbered against one of the PRD's
"Requirements by Feature" sections directly — it is derived from the PRD's Technical
Foundation section, which covers platform, accounts, notifications, and AI provider
integration. It is grouped here as its own feature area because, like
[01 Life Vision Statement](/nailed-it-docs/design-documentation/features/01-life-vision), it has a clear
user-facing shape even though the source PRD described it as a technical decision
rather than a numbered feature.

Nailed-It is multi-account: each account's data (Vision Statement, Vision Board,
Goals, Tasks, Reviews) is fully isolated, with no cross-account visibility, sharing,
or collaboration, and no roles/permissions beyond "logged in as this account."

## FEAT-1001 User registration {#feat-1001}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 0 |

### Description

A new user can register an account using a username and password.

During application initialization an administration user is created seperately from the user's who will access the application's functionality.

## FEAT-1002 Login and logout {#feat-1002}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 0 |

### Description

A registered user can log in and log out of the application using their username and
password.

## FEAT-1003 Password reset {#feat-1003}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 0 |

### Description

A user can reset their password via an email-based password-reset flow.

If an email service isn't configured then the administration user can create a time limited one-time-code that will allow the user to reset their password.

If the administrator password has been lost then the command line can be used to reset the administrator's password. 

#### Note

Two-factor authentication is explicitly out of scope for v1 — planned as an optional
feature in a later version.

## FEAT-1004 Notification channel configuration {#feat-1004}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |
| **Extends** | [FEAT-0002 - Edit entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0002) |

### Description

Scheduled reviews and habit check-in reminders can notify via browser push, email, or
Telegram — user-configurable, with more than one channel enabled at once if desired.
Notification channel configuration (email address, Telegram bot/chat linkage) lives
in account settings.

## FEAT-1005 AI provider configuration {#feat-1005}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |
| **Extends** | [FEAT-0002 - Edit entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0002) |

### Description

The user selects an AI provider and specific model, plus connection details (an API
key for OpenAI; a local endpoint for Ollama or LM Studio). Provider/model choice is a
per-account setting, not hardcoded — relevant since the local options (Ollama/LM
Studio) keep personal goal data on-device, which some users may prefer over a cloud
API.

#### Note

**Default privacy policy.** When a cloud AI provider is active, each request
sends only the context required for the task in hand: the entity the user is
working on, the titles of its ancestors, and the user's own input. The user's
wider goal, review and vision history is not sent by default. Local providers
are not subject to this restriction. The user may add further context to a
single request explicitly; this does not persist. The UI shows, per request,
whether a cloud or local provider was used, and lets the user inspect what was
sent. The specific context for each task type is defined in the requirements. See also
[FEAT-0804 - Assistant data access scope](/nailed-it-docs/design-documentation/features/08-ai-assistant#feat-0804).

## FEAT-1006 Ascending due date cascade setting {#feat-1006}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Edit entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0002) |

### Description

Controls the ascending case of
[03 Goal Hierarchy, FEAT-0311](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0311)'s
due date consistency check — where an edit or re-parent pushes an entity's date
later than one of its ancestors'. Default: **ON**.

## FEAT-1007 Descending due date cascade setting {#feat-1007}

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0002 - Edit entity](/nailed-it-docs/design-documentation/features/00-base-entity-features#feat-0002) |

### Description

Controls the descending case of
[03 Goal Hierarchy, FEAT-0311](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0311)'s
due date consistency check — where an edit or re-parent pulls an ancestor's date
earlier than one or more of its descendants'. Default: **OFF**.

## Revision History

### Version 1.2 - 20-Sep-2026

- FEAT-1001 - Added the creation of a separate administration user.
- FEAT-1003 - Added descriptions for password reset if an email service hasn't been configured.
- FEAT-1005 - Updated the wording of the default privacy policy to make it more explanatory and to remove a reference to Open AI.

### Version 1.1 - 17-Sep-2026

- Repointed FEAT-1006 and FEAT-1007's links from
  [00 Base Entity Features, FEAT-0005] to
  [03 Goal Hierarchy, FEAT-0311](/nailed-it-docs/design-documentation/features/03-goal-hierarchy#feat-0311) —
  the due-date cascade feature relocated there, since it was never actually shared
  with Life Area or Habit.

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.2 - 07-Sep-2026

- Added FEAT-1006 and FEAT-1007: the ascending (default ON) and descending (default
  OFF) due date cascade settings referenced by 00 Base Entity Features, FEAT-0005.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
