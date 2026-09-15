---
title: "10 Accounts and Settings"
description: "Registration, login, notification channels, and AI provider configuration"
draft: false
revision: "1.0"
revision_date: "13-Sep-2026"
---

Unlike Features 01–09, this file is not numbered against one of the PRD's
"Requirements by Feature" sections directly — it is derived from the PRD's Technical
Foundation section, which covers platform, accounts, notifications, and AI provider
integration. It is grouped here as its own feature area because, like
[01 Life Vision Statement](/nailed-it-docs/features/01-life-vision), it has a clear
user-facing shape even though the source PRD described it as a technical decision
rather than a numbered feature.

Nailed-It is multi-account: each account's data (Vision Statement, Vision Board,
Goals, Tasks, Reviews) is fully isolated, with no cross-account visibility, sharing,
or collaboration, and no roles/permissions beyond "logged in as this account."

## FEAT-1001 User registration

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 0 |

### Description

A new user can register an account using a username and password.

## FEAT-1002 Login and logout

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 0 |

### Description

A registered user can log in and log out of the application using their username and
password.

## FEAT-1003 Password reset

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 0 |

### Description

A user can reset their password via an email-based password-reset flow.

#### Note

Two-factor authentication is explicitly out of scope for v1 — planned as an optional
feature in a later phase.

## FEAT-1004 Notification channel configuration

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 2 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

Scheduled reviews and habit check-in reminders can notify via browser push, email, or
Telegram — user-configurable, with more than one channel enabled at once if desired.
Notification channel configuration (email address, Telegram bot/chat linkage) lives
in account settings.

## FEAT-1005 AI provider configuration

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 5 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

The user selects an AI provider and specific model, plus connection details (an API
key for OpenAI; a local endpoint for Ollama or LM Studio). Provider/model choice is a
per-account setting, not hardcoded — relevant since the local options (Ollama/LM
Studio) keep personal goal data on-device, which some users may prefer over a cloud
API.

#### Note

Default privacy policy: when a cloud provider (OpenAI) is active, only the minimum
context needed for the assistant's current task is sent by default — not the user's
full goal/review history. The UI indicates when a cloud provider is in use for a given
request, versus a local one. See also
[FEAT-0804 - Assistant data access scope](/nailed-it-docs/features/08-ai-assistant#feat-0804-assistant-data-access-scope).

## FEAT-1006 Ascending due date cascade setting

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

Controls the ascending case of
[00 Base Entity Features, FEAT-0005](/nailed-it-docs/features/00-base-entity-features#feat-0005-due-date-consistency-across-the-entity-tree)'s
due date consistency check — where an edit or re-parent pushes an entity's date
later than one of its ancestors'. Default: **ON**.

## FEAT-1007 Descending due date cascade setting

| | |
|---|---|
| **Status** | Draft |
| **Phase** | 1 |
| **Extends** | [FEAT-0003 - Edit entity](/nailed-it-docs/features/00-base-entity-features#feat-0003-edit-entity) |

### Description

Controls the descending case of
[00 Base Entity Features, FEAT-0005](/nailed-it-docs/features/00-base-entity-features#feat-0005-due-date-consistency-across-the-entity-tree)'s
due date consistency check — where an edit or re-parent pulls an ancestor's date
earlier than one or more of its descendants'. Default: **OFF**.

## Revision History

### Version 1.0 - 13-Sep-2026

- Approved at version 1.0.

### Version 0.2 - 07-Sep-2026

- Added FEAT-1006 and FEAT-1007: the ascending (default ON) and descending (default
  OFF) due date cascade settings referenced by 00 Base Entity Features, FEAT-0005.

### Version 0.1 - 02-Sep-2026

- Initial version, derived from the Nailed-It PRD v1.0.
