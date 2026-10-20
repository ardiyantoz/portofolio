# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static, single-file HTML/CSS/JS (`note-taking-bca/app/index.html`), opened directly from the local PC via `file://` in Chrome or Edge on a Windows company laptop. No server, no build step for the user, no external network dependencies (no hosted fonts, CDNs or APIs required). `tools/build.mjs` only embeds the skill text and the demo vault.

## Users

One person: the owner, an engineer at BCA, using it as a personal work tool. It stays open all day on a monitor beside Obsidian and Mage (opencode running a local Qwen 3.6). They glance at it often, tick tasks off, and work with tasks, notes, projects and prompts.

## Product Purpose

WorkingNotes Hub is the working surface over an Obsidian Zettelkasten vault (`WorkingNotes`). It lists every task in the vault, shows each task with its source note, Project note and related Activity notes, lets the owner tick tasks done with a written completion note, captures raw notes into an inbox, and generates very detailed prompts that Mage/Qwen uses to file notes and work on tasks. Success is that tasks get reviewed, closed with an explanation, and notes reach the vault without the owner hand-editing Markdown.

## Positioning

It is not a task manager with its own database. The vault's Markdown files are the only source of truth: ticks and completion notes are written back into the exact lines of the notes, and anything the app cannot write becomes an exact, line-by-line prompt for a local LLM. It is tuned to one specific Obsidian skill (Activity / Project / Knowledge / Daily / Task List, ZTK-001 to ZTK-010).

## Operating Context

- Windows company laptop; Chrome or Edge; endpoint security makes each file read slow, so loading relies on parallel reads, a browser cache and an optional PowerShell snapshot.
- Vault at `C:\Users\<user>\Documents\catatan-yanto\WorkingNotes`; skills at `C:\Users\<user>\.mage\skills`.
- Daily loop: open vault, scan tasks, tick with completion notes, capture notes, copy prompts into Mage, reload after Mage edits the vault.
- Content language is mostly Bahasa Indonesia mixed with English; UI chrome is English.

## Capabilities and Constraints

- Tabs: Tasks (list + detail), Projects, Capture notes (form + inbox), How it works; dialogs for prompts, settings, snapshot, completion note.
- Vault access: Open vault (File System Access, can write ticks/notes), Compatible (folder upload, read-only), Snapshot (one JSON file, read-only), Demo vault.
- Writes are limited to checkbox characters, task-note Status/Log lines and indented completion-note lines; everything else goes through Mage prompts.
- Must keep working from `file://` with no network; localStorage and IndexedDB hold settings, inbox, drafts, pending changes and the note cache.
- Pinned by the owner: dark mode only.

## Evidence on Hand

- Real vault structure and project names from the owner's skill file (`note-taking-bca/skills/obsidian-zettelkasten/SKILL.md`).
- Sample vault in `note-taking-bca/sample-vault/WorkingNotes/` (synthetic demo content, labelled as demo in the app).
- No testimonials, metrics or team usage exist; do not invent any.

## Product Principles

1. The vault is the truth: never hold task state the vault does not show without saying so ("unsaved").
2. A task is only done with a reason: completion notes are part of closing work.
3. Glanceable all day: state, lateness and what is next must be readable at a glance from across the desk.
4. Precise over flashy: it is a bank engineer's work instrument; restraint and clarity beat decoration.
5. Prompts are first-class output: what the app hands to Mage must be complete and exact.

## Accessibility & Inclusion

No specific requirement was established beyond comfortable all-day use in dark mode; keep WCAG AA contrast and keyboard access.
