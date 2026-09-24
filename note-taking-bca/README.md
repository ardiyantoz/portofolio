# Note taking BCA: WorkingNotes Hub

WorkingNotes Hub is a local web page for my Obsidian vault `WorkingNotes`. The vault follows the **Obsidian Zettelkasten** skill. The page does three things:

1. **Lists every task** in the vault. You can review a task together with its source note, its Project note and every related Activity note.
2. **Creates a very detailed prompt for Mage** (opencode + Qwen 3.6) from any listed task. The prompt can ask Mage to *work on it*, *break it down*, *create a task note*, *review its status*, or *create a new task derived from it*.
3. **Captures raw notes** into an inbox. From the inbox it creates a prompt that tells the local LLM to **categorize and file** the notes into Activity, Project, Knowledge, Daily or Task List, exactly as the skill describes.

Every prompt starts with the two repositories the LLM needs: **1. Skill repository** and **2. Obsidian vault position**.

## Quick start (no install)

1. Unzip `note-taking-bca.zip`.
2. Open `app/index.html` in **Chrome or Edge** by double-clicking it.
3. Click the red chips at the top (or open ⚙ Settings) and fill in:
   - **SKILL_REPO**: the skills folder, e.g. `C:\Users\you\.mage\skills`, which contains `obsidian-zettelkasten\SKILL.md` (copy `skills/obsidian-zettelkasten/` there). Pasting the skill folder or the `SKILL.md` path also works: the app works out the correct paths either way.
   - **VAULT_ROOT**: the absolute path of your vault, e.g. `D:\Obsidian\WorkingNotes`.
   - Optional fields: WORK_REPO (the code repository for tasks), the Mage command template, the prompt download folder, and an OpenAI-compatible endpoint.
4. Click **📂 Open vault folder** and choose the **vault folder itself**: the folder that contains `.obsidian`, `Activity`, `Project`… (e.g. `C:\Users\you\Documents\catatan-yanto\WorkingNotes`), not its parent. Set the same folder as **VAULT_ROOT**. Files are only **read**, inside the browser. Nothing is uploaded.
   - The app reads **every `.md` note in every subfolder** of the vault. It skips dot-folders (`.obsidian`, `.playwright-mcp`) and the folders listed in Settings → *Folders to skip* (default `Archive, Attachment, node_modules`).
   - **Slow company laptop?** Security software can make each file read take several seconds. The first load then takes a while; the progress bar shows seconds per note and the time left. The app **caches** every note, so later loads only re-read changed notes (usually under a second), and the last copy shows immediately.
   - **Fastest option: 🗂 Snapshot.** Copy the PowerShell command shown there, run it, and load the resulting `vault-snapshot.json`. That's one file instead of hundreds, so it loads in about a second. Run the command again after Mage changes the vault.
   - **If the button does nothing** (company browser policy, Firefox, Brave), click **📁 Select folder (compatible)**. Chrome asks "Upload N files to this site?". Say yes: the files still stay on your computer.
   - Typing VAULT_ROOT in Settings does **not** load the vault, because a web page can't read a typed path. That path goes into the prompts. If VAULT_ROOT and the folder you opened don't match, a banner offers a one-click fix.
   - Click **Demo vault** to try the app on sample data first.

## Daily workflow

```
 ┌──────────────┐  Categorize prompt   ┌───────────────────┐  writes notes   ┌──────────────┐
 │ Capture note │ ───────────────────▶ │ Mage (Qwen 3.6)   │ ──────────────▶ │ Obsidian     │
 │   (inbox)    │  copy / .md / send   │ + Zettelkasten    │                 │ WorkingNotes │
 └──────────────┘                      │   skill           │ ◀────────────── └──────┬───────┘
        ▲                              └───────────────────┘   task prompt          │
        │                                        ▲             (work / break down / │
        │                                        └──── review / new task) ◀─────────┘
        └──────────────────── Reload vault ◀── Tasks tab lists & reviews tasks
```

- **Capture notes**: write a note, then **Save to inbox**. Select one or more notes and click **Categorize prompt**, then **Copy prompt** (or **Download .md** and run the command shown, e.g. `mage "C:\Users\me\Downloads\mage-prompt-….md"`). Mage files the notes and prints a filing report. Mark the notes as *filed* and press **Reload**.
- **Tasks**: filter the list, click a task to review its full context, then choose one of the actions:
  - 🤖 **Ask Mage to work on it**
  - **Break down**
  - **Create task note**
  - **Review status**
  - **New task from this** (describe the new task in "Extra instructions")

  To send several tasks at once, tick them and click **Prompt for selected**.
- **Ticking tasks off**: click the box in front of any task, or use ☐ To do / ◐ In progress / ☑ Done in the detail view. Task List notes get a clickable checklist.
  - With **📂 Open vault folder**, Chrome asks once to allow editing. After that, each tick is saved straight into the note file: `- [ ]` becomes `- [x]` (`[/]` for in progress), and a Task List note gets `Status: Done` plus a line in `## Log`. Only that one line changes. Obsidian shows it immediately, and **Undo** appears for a few seconds.
  - Opened via 🗂 Snapshot or 📁 Select folder (compatible)? The browser can't write then. Ticks are kept in the browser (✎ unsaved), and a yellow bar offers **💾 Save to vault** (pick the folder once) or **🤖 Prompt for Mage**, an exact "change this line to that line" prompt. The bar clears by itself once the vault shows the new state.
  - **Completion notes**: the bottom of *Source context* has a **📝 Notes & completion** box. Write what was done, the evidence, and why it can be checked off, then press **Mark done with this note** or **＋ Add note**. Ticking a task done anywhere asks for this note first (required by default; switch it off in Settings). Notes are saved as indented lines directly under the task, e.g. `> 	- 📝 2026-09-24 14:05: Form di-deploy ke SIT, QA OK`. Extra lines become sub-bullets. In a Task List note, the note goes into `## Log`. Existing notes are shown in the box and are included in Mage's review prompts.
  - Optional (Settings): add `✅ YYYY-MM-DD` when a task is ticked done.
- **Projects**: shows Ongoing, Explore and Done cards with overdue follow-ups. **Review prompt** creates a review prompt for one project or for all Ongoing projects.

### Execution modes (Settings)
| Mode | When to use | What the LLM does |
|---|---|---|
| **Agent** (default) | Mage/opencode has file tools | Reads the skill, edits the vault files itself, prints a report |
| **Chat** | Plain chat without file access | Prints complete `=== FILE: … ===` blocks that you paste yourself |

### Why the prompts are so long
Qwen 3.6 is a local model, so the prompts spell everything out:
- the paths table
- the execution mode
- the steps in a fixed order
- a type decision table and the category definitions
- the project keyword mapping
- exact frontmatter templates for every note type
- rules for IDs, file names, Project and Daily note updates
- the forbidden actions
- a 12-point self-check
- the report format and a worked example
- the full skill text as Appendix A

When a vault is loaded, the prompt also includes a **vault snapshot**: existing projects, IDs already in use, and the current content of the Project and Daily notes that will be updated. This keeps the model from creating duplicates and lets it edit those files correctly.

## Contents

| Path | What it is |
|---|---|
| `app/index.html` | **The app**: one self-contained HTML file with no dependencies. Works offline |
| `prompts/00-BUILD-WEBAPP-PROMPT.md` | Prompt for Mage/Qwen to rebuild or extend this app in **Angular 20** (paths to fill in at the top) |
| `prompts/01-CATEGORIZE-NOTES-PROMPT.md` | Static version of the categorize-notes prompt, for use without the app |
| `prompts/02-TASK-PROMPT-FOR-MAGE.md` | Static version of the task prompt (all 5 modes) |
| `skills/obsidian-zettelkasten/SKILL.md` | The Obsidian Zettelkasten skill with opencode frontmatter (`name`, `description`). Copy it into your skill repository |
| `sample-vault/WorkingNotes/` | Small demo vault (it is also embedded in the app as "Demo vault") |
| `tools/build.mjs` | Re-embeds the skill and the demo vault into `app/index.html` after you edit them: `node tools/build.mjs` |

## Notes and limits
- The inbox, settings and filters are stored in this browser's localStorage. Use **Export** in the Inbox and in Settings to back them up.
- **Open vault folder** remembers the folder in Chrome and Edge, and **Reload** re-reads it. With **Select folder (compatible)**, choose the folder again to refresh.
- **Send to local LLM** POSTs to `<base>/chat/completions`. Your server must allow CORS for pages opened from `file://`. If it doesn't, use Copy or Download.
- The app never writes to the vault. Only Mage does, through the prompt.
