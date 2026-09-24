# PROMPT: Build "WorkingNotes Hub" (Angular 20). A web page to browse tasks and capture notes for my Obsidian vault, using the Obsidian Zettelkasten skill

> Copy everything below the line into Mage (opencode) running **Qwen 3.6**.
> Fill in the four paths in section 0 first. Every other decision is already made in this prompt.
> A finished reference implementation is already in `REFERENCE_APP` (one vanilla HTML file). Rebuild it in Angular 20 with the same behaviour, or extend it.

---

## 0. REPOSITORIES & PATHS (fill these before running)

| Key | Value | Meaning |
|---|---|---|
| SKILL_REPO | `<<FILL: e.g. D:\repo\opencode-skills>>` | Repository that contains the skills used by Mage |
| SKILL_FILE | `<<SKILL_REPO>>\obsidian-zettelkasten\SKILL.md` | The Obsidian Zettelkasten skill. It is the source of truth for vault structure |
| VAULT_ROOT | `<<FILL: e.g. D:\Obsidian\WorkingNotes>>` | My Obsidian vault "WorkingNotes". The app **reads** it and never writes it |
| APP_REPO | `<<FILL: e.g. D:\repo\workingnotes-hub>>` | Empty folder where you create the Angular 20 project |
| REFERENCE_APP | `<<FILL: e.g. D:\tools\note-taking-bca\app\index.html>>` | Working single-file version of the same app. Read it first |

Rules for paths:
- Create or modify files **only inside APP_REPO**.
- Never write to VAULT_ROOT or SKILL_REPO. You may read them.
- Use the path separator that the values above use.

## 1. WHO YOU ARE AND HOW TO WORK

You are **Qwen 3.6** running as **Mage (opencode)**. You have file tools and a shell. You are a senior Angular 20 engineer.

- Work step by step, in the order of section 9. Finish and verify each step before you start the next one.
- Read before you write. Read `SKILL_FILE` and `REFERENCE_APP` in full before you write any code.
- Do not invent requirements. If something is not specified here, copy what REFERENCE_APP does.
- Use `npm` only. Add no dependencies beyond the Angular 20 CLI defaults. Do not add UI libraries, Markdown libraries or YAML libraries; write the small parsers yourself (spec in section 5).
- The app has no backend. It runs entirely in the browser.
- At the end, print the report in section 11.

## 2. WHAT THE APP IS FOR (product summary)

I keep work notes in an Obsidian vault that follows the skill in `SKILL_FILE`. The vault has these folders: `Activity/`, `Project/`, `Knowledge/`, `Daily/`, `Task List/`, `Template/`, `Base/`, `Attachment/` and `Archive/`. My local LLM (Qwen 3.6 in Mage/opencode) writes to the vault. This app does four things:

1. **Tasks.** List every task in the vault, filter the list, and show a detail view with the full context from the notes: the source note, the Project note and all related Activity notes.
2. **Task prompts.** For a task I pick, or for several tasks, create a very detailed prompt for Mage. The prompt can ask Mage to *work on it*, *break it down*, *create a task note*, *review its status*, or *create a new task derived from it*.
3. **Note capture.** I type raw notes into an inbox. The app then creates a very detailed prompt that tells Qwen to categorize the notes and file them into the vault exactly as the skill says (Activity / Project / Knowledge / Daily / Task List).
4. **Delivery.** Every prompt can be copied, downloaded as `.md` (with a ready-made `mage "<file>"` command), or sent to an OpenAI-compatible endpoint.

The two repositories (**SKILL_REPO** and **VAULT_ROOT**) must appear at the **top of every generated prompt**.

## 3. TECH STACK AND PROJECT SETUP

- Angular **20**. Use standalone components (no NgModules), **signals** (`signal`, `computed`, `effect`), the new control flow (`@if`, `@for`, `@switch`), `inject()`, and `ChangeDetectionStrategy.OnPush` everywhere. Make the app zoneless if the CLI offers it (`provideZonelessChangeDetection()`).
- Create the project with `npx -y @angular/cli@20 new workingnotes-hub --directory . --style=css --routing=false --ssr=false --skip-git` inside APP_REPO.
- Use plain CSS with CSS custom properties for theming (light and dark, following `prefers-color-scheme`, plus a manual toggle stored in localStorage). Copy the tokens from REFERENCE_APP (`--bg`, `--panel`, `--ink`, `--muted`, `--line`, `--accent`, …).
- The UI text is English. Note content keeps its original language, which is mostly Bahasa Indonesia.
- Layout must work from a 390 px wide phone to a 1500 px desktop, with no horizontal page scroll.
- Build output must also run from `file://`. Set `"baseHref": "./"` and emit a normal browser build. Document `npx http-server dist/workingnotes-hub/browser` as the alternative way to serve it.

Folder layout to create:

```
src/app/
  core/
    models.ts               # interfaces from section 4
    settings.service.ts     # settings signal + localStorage persistence
    vault.service.ts        # loading + indexing the vault (section 5)
    inbox.service.ts        # captured notes (section 7)
    prompt-builder.service.ts  # all prompt text (section 8)
    markdown.ts             # tiny Markdown renderer (section 5.4)
    frontmatter.ts          # tiny YAML frontmatter parser (section 5.2)
    detect.ts               # project keyword mapping + type/category guess (section 7.2)
    skill-text.ts           # export const SKILL_TEXT = `...` (copy of SKILL_FILE body)
    demo-vault.ts           # export const DEMO_VAULT: {path, content}[] (copy from REFERENCE_APP)
  features/
    tasks/     task-list.component.ts, task-detail.component.ts, project-detail.component.ts
    projects/  projects.component.ts
    notes/     note-form.component.ts, inbox.component.ts
    prompt/    prompt-dialog.component.ts
    settings/  settings-dialog.component.ts
    help/      help.component.ts
  app.component.ts          # header, path chips, tabs
```

## 4. DATA MODEL (`models.ts`)

```ts
export type TaskState = 'open' | 'doing' | 'done' | 'cancelled' | 'blocked';
export type NoteKind = 'activity' | 'project' | 'knowledge' | 'daily' | 'tasknote'
  | 'template' | 'archive' | 'base' | 'attachment' | 'other' | 'root';

export interface VaultFile {
  path: string;            // relative to vault root, '/' separated, e.g. 'Project/IPO SBN Valas.md'
  folder: string;          // first path segment ('' for root files)
  name: string;            // file name without .md
  kind: NoteKind;          // from folder: Activity→activity, Project→project, Knowledge→knowledge,
                           // Daily→daily, 'Task List'→tasknote, Template, Archive, Base, Attachment
  content: string;         // full raw text
  fm: Record<string, string | string[]>;  // parsed frontmatter
  fmRaw: string;           // raw YAML between the --- lines
  body: string;            // text after the closing ---
  bodyLineOffset: number;  // number of lines before the body (to compute real line numbers)
}
export interface Project {
  name: string; file: VaultFile | null; status: string; followup: string;
  tags: string[]; id: string; missing: boolean;   // missing = referenced by Activity but no Project/ file
}
export interface Activity {
  file: VaultFile; date: string; category: string; projects: string[]; summary: string;
}
export interface Task {
  id: string;              // `${path}#${bodyLineIndex}` or the path for task notes
  text: string;            // cleaned text (date emojis removed)
  raw: string;             // original text after the checkbox
  state: TaskState; due: string; priority?: string;
  file: VaultFile; kind: NoteKind; line: number; bodyIdx: number; heading: string;
  project: string;         // resolved project name or ''
  subtasks?: Omit<Task, 'id' | 'file' | 'kind' | 'project'>[];   // only for Task List notes
}
export interface InboxNote {
  id: string; title: string; capturedAt: string /* YYYY-MM-DDTHH:mm local */;
  type: 'Auto'|'Activity'|'Project'|'Knowledge'|'Daily'|'Task';
  category: 'Auto'|'Meeting'|'Kickoff'|'Implementation'|'Deployment'|'Discussion'|'Documentation';
  project: string; tags: string; source: string; text: string;
  status: 'draft' | 'prompted' | 'sent' | 'filed'; createdAt: string; updatedAt?: string;
}
export interface Settings {
  skillRepo: string; skillFile: string /* default 'obsidian-zettelkasten/SKILL.md' */;
  vaultPath: string; vaultName: string /* default 'WorkingNotes' */; workRepo: string;
  timezone: string /* 'Asia/Jakarta (WIB, UTC+7)' */; language: string;
  execMode: 'agent' | 'chat'; modelName: string /* 'Qwen 3.6' */;
  mageCommand: string /* 'mage "{{file}}"' */; promptFolder: string;
  embedSkill: boolean; includeVaultIndex: boolean; updateDaily: boolean; allowNewProject: boolean;
  llmBaseUrl: string; llmModel: string /* 'qwen3.6' */; llmApiKey: string;
  projectMap: string;      // text, one line per project, see 7.2
  skillText: string;       // '' = use built-in SKILL_TEXT
}
```

localStorage keys: `wnh.settings`, `wnh.inbox`, `wnh.filters`, `wnh.tab`, `wnh.theme`, `wnh.draft`. Wrap **every** read and write in try/catch. The app must still work when storage is blocked.

## 5. VAULT LOADING AND PARSING (`vault.service.ts`, `frontmatter.ts`, `markdown.ts`)

### 5.1 Loading
- The **"Open vault folder"** button calls `window.showDirectoryPicker({ id: 'wnh-vault', mode: 'read' })` when the browser supports it (Chrome, Edge). It walks the folder recursively and reads every `*.md` file. It skips names that start with `.` and skips the `Attachment/` folder. It saves the directory handle in IndexedDB (db `wnh`, store `kv`, key `vault`) so that **Reload** can re-read the folder later with `queryPermission`/`requestPermission`.
- Fallback: a hidden `<input type="file" webkitdirectory multiple>`. The relative path is `webkitRelativePath` with the first segment (the vault folder name) removed.
- **"Demo vault"** loads `DEMO_VAULT`.
- The app **never writes** to the vault.
- After loading, show `"<vault name> · N notes · P projects · loaded HH:MM"` in the header.

### 5.2 Frontmatter parser (no library)
- Normalize `\r\n` to `\n` and strip the BOM. Frontmatter exists only if the text starts with `---\n`. It ends at the next `\n---`.
- Support these forms: `key: value`; `key: "quoted"`; `key:` followed by indented `  - item` lines (→ array); `key: |` block scalar (→ multi-line string); inline arrays `[a, b]`. A value starting with `[[` is a string, not an array.
- Empty lists (`tags:` followed by `  -`) become `''`.
- Helper `linkName("[[Name|alias]]") → "Name"` strips `[[ ]]`, the alias and any `#heading`.

### 5.3 Indexing rules
- **Projects**: every file in `Project/`. `status = fm.Status`, `followup = fm['Followup Date']`, `tags = fm.tags`. Also add a *missing* project for every project name that an Activity references but that has no file.
- **Activities**: every file in `Activity/`. `date = fm.Date` (fallback: first 10 characters of the name), `category = fm.Category` joined, `projects = fm.Project.map(linkName)`, `summary = fm.Summary`. Sort newest first.
- **Tasks**: scan the body of every file except those of kind template, archive, base and attachment. A task line matches `^((?:\s*>)*\s*)[-*+]\s+\[([^\]])\]\s+(\S.*)$`, which also works inside `> [!TODO]` callouts.
  - State by checkbox character: `' '`→open, `x`/`X`→done, `/`→doing, `-`→cancelled, `!`→blocked.
  - Due date: `📅 YYYY-MM-DD`, `due:: YYYY-MM-DD` or `⏳ YYYY-MM-DD`. Remove these markers from the display text.
  - `heading` is the nearest heading above the line.
  - Project: for a Project file, its own name. For other files, `fm.Project[0]`. Otherwise, the first project that `detect()` finds in the task text (section 7.2).
  - **Task List notes** (`Task List/*.md`) become ONE task each. The text is `fm.title`, else the `# H1`, else the file name. State comes from `fm.Status` (Todo, In Progress, Blocked, Done, Cancelled). Due is `fm.Due` and priority is `fm.Priority`. The checkboxes inside the note become `subtasks` and are not separate tasks.
- Collect every `fm.id` into a set of used IDs.

### 5.4 Markdown renderer (no library, escape HTML first)
Support the following: headings (render `#` as h3, because the page already has headings); paragraphs; `-`/`*`/`1.` lists with indentation; checkboxes (styled boxes by state); fenced code with ``` and ~~~; tables; blockquotes; Obsidian callouts `> [!TODO] Title` (a box with a title); `**bold**`, `*italic*`, `` `code` ``, `==highlight==`, `[text](https://…)`; wiki-links `[[Note|alias]]`, which are clickable and open that note in a viewer dialog (or the project detail); embeds `![[…]]`, shown as a small chip. The renderer can also highlight one line, which is the task line in the source context.

## 6. SCREENS

### 6.1 Header
Show the brand "WorkingNotes Hub", the vault status, and the buttons **Open vault folder**, **Reload** (reads "Reconnect "<name>"" when a stored handle exists), **Demo vault**, **Settings** and a theme toggle.

Below that, show a row of **path chips**: `SKILL_REPO`, `SKILL_FILE`, `VAULT_ROOT`, `WORK_REPO`, `MODE`, `MODEL`. Each chip shows its current value. A chip that is empty and required turns red with the text "not set — click to fill". Clicking a chip opens Settings with that field focused.

Tabs: **Tasks (open count)** · **Projects (count)** · **Capture notes (pending inbox count)** · **How it works**.

### 6.2 Tasks tab (two columns on desktop, stacked on mobile)
Left column: the task list card.
- Filters, persisted to `wnh.filters`:
  - search text (matches task text, project, path, heading)
  - state: *Open (todo + in progress + blocked)* (default), *Done*, *All*
  - project status: *Active (Ongoing + Explore)* (default), *All*, *Ongoing*, *Explore*, *Done*
  - project: all, "(no project)", or each project
  - source: Project TODO, Task List notes, Activity action items, Daily, Other
  - tag: track9 or sidejob (matches project tags or note tags)
- Tasks are grouped by project, with a sticky group header showing the project name, a status chip, a "no Project note" warning and a count. Order the groups Ongoing → Explore → no status → Done, then by name, and put "No project" last. Within a group, open tasks come first, then tasks sorted by due date, then by file and line.
- Each row has a checkbox (multi-select), the task text (📄 prefix for Task notes), and chips for state, source, priority, due date and source file. The due chip is red when overdue, amber when due within 2 days, and shows "in Nd", "today" or "Nd late".
- A bottom bar shows "N selected", **Clear**, and **Prompt for selected** (opens the prompt dialog in *Work on it* mode for all selected tasks).
- A **＋ New task** button goes to Capture with the type hint set to *Task* and the project hint set to the current project filter.

Right column: **task detail**.
- Header: state, source and due chips, the task title, and the buttons **🤖 Ask Mage to work on it** · **Break down** · **Create task note** · **Review status** · **New task from this**. Each opens the prompt dialog in that mode.
- Meta list: Project (link to the project detail), project status, follow-up (due chip), tags, source path with line number and an "Obsidian ↗" link (`obsidian://open?vault=<vaultName>&file=<path without .md>`), and the section heading.
- Sections:
  1. **Source context**: the lines around the task (from the nearest heading above to the next heading, at most ±25 lines), with the task line highlighted. For a Task note, show its frontmatter and the whole body.
  2. **Project note**: collapsible. Shows the raw frontmatter and the rendered body.
  3. **Related activity (n)**: one collapsible card per Activity. Each card shows the date chip, the category chip, the title (file name without the date), the Summary, the path, an "Open in Obsidian" link and the rendered body. The newest card is open.
  4. **Other open tasks in <project>**: each one is clickable.
  5. **Also mentioned in**: non-Activity files that contain `[[<project>`.

**Project detail** replaces the task detail when you click a project name or a project card:
- Status chip.
- Buttons: **🧭 Review project prompt**, **🤖 Work on all open tasks**, **Break down open tasks**, **Open in Obsidian**.
- Meta list: status, follow-up, tags, file, task counts, activity count and last activity date.
- Sections: every task (with a state box, clickable), the full Project note, and the activity timeline.

### 6.3 Projects tab
- KPI cards: Ongoing projects, Exploring, Open tasks, Overdue tasks and follow-ups, Activities in the last 7 days, Activities today.
- A filter input and a **🧭 Review prompt: all Ongoing projects** button (review mode over every open task of every Ongoing project).
- Project cards grouped under the headings **Ongoing**, **Explore**, **No status / missing note** and **Done**. Each card shows the name, a status chip, tag chips, a follow-up chip, and the stats open, closed, activities and last activity date. Clicking a card opens the project detail in the Tasks tab.

### 6.4 Capture notes tab (two columns)
Left column: the form.
- Fields: Title (optional); Captured at (`datetime-local`, default now); Type hint (Auto, Activity, Project, Knowledge, Daily, Task); Category hint (Auto, Meeting, Kickoff, Implementation, Deployment, Discussion, Documentation); Project hint (text input with a `<datalist>` of all known and mapped projects); Extra tags; Source/reference (ZTK-009); Note (large textarea).
- The draft autosaves to `wnh.draft`. Ctrl/⌘+Enter saves.
- **Live analysis box**, updated on every input:
  - detected projects as chips (amber = not in the vault yet), with the matched keyword in a tooltip
  - suggested type and category, plus "(also: … → may be split)" when several types match
  - suggested file path
  - reserved ID
- Buttons: **Clear**, **Save to inbox**, **Save & create prompt**.

Right column: the **Inbox**.
- A filter (Pending, All, Filed) and one row per note: checkbox, title or first line, a status pill (draft, prompted, sent, filed), chips for the captured time, the type/category guess and the project guess, a 3-line preview, and the actions **Edit**, **Prompt**, **Mark filed/Unfile** and **Delete** (with confirmation).
- Bottom bar: **Select pending**, **Mark filed**, **Export** (JSON download), **Import** (JSON, merged by id), and **Categorize prompt** (for the selected notes).

### 6.5 Prompt dialog (modal)
- Title and a warning box when SKILL_REPO or VAULT_ROOT is empty. The prompt then contains `<<FILL…>>` placeholders, and the box has a link to Settings.
- For task prompts:
  - mode radio buttons (Work on it, Break down, Create task note, Review status, New task from this) with a one-line description
  - a WORK_REPO input for this prompt (default from settings)
- For note prompts:
  - checkbox "Also update the Daily note" (bound to the setting)
  - checkbox "Mark these notes as prompted when I copy, download or send"
- "Extra instructions for the LLM" textarea. It regenerates the prompt after a 300 ms debounce.
- The generated prompt in an editable monospace textarea. Show a stats line (characters, ~tokens = chars/3.6, lines).
- **Command line**: the `mageCommand` template with `{{file}}` replaced by `promptFolder + separator + downloaded file name`. The file name is `mage-prompt-YYYYMMDD-HHmm-<mode|categorize>.md`. A **Copy command** button sits next to it.
- Buttons:
  - **Send to local LLM**: POST `{base}/chat/completions` with `{model, temperature: 0.2, stream: false, messages: [{role: 'user', content: prompt}]}` and a `Bearer` key if one is set. Show the response text, or an error that explains CORS.
  - **Download .md**
  - **Copy prompt**: uses the clipboard API, with an `execCommand('copy')` fallback.
- Copy, download and send update the inbox status (`prompted`, or `sent` after a successful send).

### 6.6 Settings dialog
Group the fields into fieldsets:
- **Repositories & paths**: SKILL_REPO, skill file, VAULT_ROOT, vault name, WORK_REPO, timezone.
- **How the LLM runs**: execution mode (Agent or Chat), model name, Mage command template, prompt folder, output language rule, and the checkboxes embedSkill, includeVaultIndex, updateDaily and allowNewProject.
- **Optional endpoint**: base URL, model id, API key.
- **Project keyword mapping**: textarea.
- **Skill text**: textarea (empty = built-in).

Buttons: Save, Reset defaults (with confirmation), Export JSON (without the API key), and Import.

### 6.7 How it works tab
A short guide rendered with the Markdown renderer. Copy its text from REFERENCE_APP.

## 7. NOTE ANALYSIS (`detect.ts`)

### 7.1 IDs
- Format `YYYYMMDDHHmm` from `capturedAt`.
- Each raw note reserves a **block of 5 consecutive minute-IDs**, because one note may become several files. A block must not contain any ID already used in the vault or reserved by another note in the same prompt. If it does, shift the block forward one minute at a time.
- Process the notes in `capturedAt` order.

### 7.2 Project keyword mapping (default `projectMap`, exactly this text)
```
# keyword(s) => Project Name | tag(optional)
IPO SBN, SBN Valas => IPO SBN Valas
Avantrade => Avantrade
Tiket => Tiket
Portfolio FI => Informasi Portfolio FI
Autodebet => Autodebet Proteksi
Proteksi Leave Contact => Proteksi Leave Contact
Loket => Loket
ADHOC Reward => Project ADHOC Reward
Pemisahan biaya admin => Project pemisahan biaya admin
Pembiayaan emas Bsya => Pembiayaan emas Bsya
Automation, SAQ, Webhook => Automation Context Window SAQ Webhook
Obsidian, Zettelkasten, Skill => Obsidian Zettelkasten Skill
Angular 20 => Angular 20
Prettier => Prettier HTML Whitespace Ignore
```
Matching:
- Keywords match case-insensitively on Unicode word boundaries: `(^|[^\p{L}\p{N}])keyword(?=$|[^\p{L}\p{N}])` with the `iu` flags.
- Also match the exact names of existing vault projects.
- The user's project hint always comes first.

### 7.3 Type and category guess (a hint only; the LLM decides)
- **Type** is the first rule that matches:
  1. Activity: meeting, rapat, kickoff, diskusi, discussion, sync, call, standup, implement*, coding, deploy*, release, rilis, dokumentasi, documentation, presentasi, demo, uat, sit
  2. Task: task, tugas, todo, deadline, due, harus
  3. Knowledge: konsep, concept, belajar, learn*, til, definisi, how to, cara, tips, insight
  4. Daily: hari ini, today, daily
  5. Project: project baru, new project, inisiatif
  - If nothing matches: Activity when a project was detected, else Knowledge.
- **Category** is the first rule that matches:
  1. Kickoff: kick-off
  2. Deployment: deploy*, release, rilis, go-live
  3. Documentation: dokumentasi, documentation, docs, spec, confluence
  4. Implementation: implement*, coding, develop*, fix, refactor, migrasi, migration
  5. Meeting: meeting, rapat, presentasi, demo
  6. Discussion: diskusi, discussion, chat, sync, call
  - If nothing matches: Meeting for an Activity.
- **Suggested file**: `Activity/YYYY-MM-DD <first sentence ≤55 chars, cut at a word boundary>.md`. Other types use the matching folder and naming rule from the skill. Replace the characters `\ / : * ? " < > | # ^ [ ]` with a space.

## 8. PROMPT BUILDER (the most important part: copy the text from REFERENCE_APP and keep it this detailed)

Every generated prompt is plain Markdown, written for Qwen 3.6. Build it from these blocks, in this order:

1. **Title and role**: "You are **<modelName>** …", followed by the goal of the run and the working rules (precision over speed, follow the steps in order, never invent facts, list assumptions).
2. **`## 0. REPOSITORIES & PATHS ← read this first`**: a table with `SKILL_REPO`, `SKILL_FILE` (= SKILL_REPO joined with skillFile using SKILL_REPO's separator), `VAULT_ROOT`, `WORK_REPO` (task prompts only), `TODAY` (date and weekday), and `NOW` (with the timezone). An empty path becomes `<<FILL: …>>`. Add the path rules: full path = VAULT_ROOT + separator + relative path, with an example; keep spaces in names; never write outside VAULT_ROOT.
3. **`## 1. EXECUTION MODE`**:
   - *Agent*: "you have tools; read before edit; surgical edits; don't ask for confirmation; print only the report".
   - *Chat*: "output FILE BLOCKS with the complete final content; use a PATCH BLOCK for existing files whose content you were not given".
4. **`## 2. LOAD THE SKILL`**: read SKILL_FILE, where Appendix A holds the same text, and read the three templates. Priority order: this prompt's resolved decisions, then SKILL_FILE, then Template/.
5. **Vault snapshot** (when includeVaultIndex is on and a vault is loaded): a table of existing projects (name, status, tags, follow-up, open TODO count, whether the note exists); the 25 most recent Activity files with ids; Knowledge notes (id, link, title); Task List notes; the **full current content** of every Project and Daily note that will probably be updated; and the IDs already in use (last 60).
   - Without a snapshot: in agent mode, tell the model to list `Project/`, `Daily/` and `Task List/` itself. In chat mode, tell it to use PATCH blocks and flag "VERIFY".
6. Mode-specific sections (8.1 or 8.2).
7. **Output format** (agent: "write files, print only the report"; chat: FILE BLOCK / PATCH BLOCK formats).
8. **Report format** (tables).
9. **Extra instructions from me** (when the dialog field is not empty). This block has the highest priority.
10. **`APPENDIX A`**: the full skill text in a fence (when embedSkill is on).

Wrap user text in fences that cannot collide with its content. Use `~~~`, and make the fence longer than the longest run of `~` in the text.

### 8.1 Categorize-notes prompt: sections after the snapshot
- `## 4. RAW NOTES TO PROCESS (n)`: one block per note. Each block has a table (captured at, the reserved IDs block, title, type hint, category hint, project hint, extra tags, source, and the app's pre-analysis labelled "hint only, verify!") followed by the raw text, verbatim, in a fence.
- `## 5. PROCEDURE`, done for every note:
  - 5.1 understand (events, decisions, action items, dates, concepts, sources, images)
  - 5.2 resolve the project (a: hint → b: mapping → c: existing list, where near-duplicate names count as the same project → d: create a new project if allowed → e: no project means Knowledge → f: several projects)
  - 5.3 decide the note types (atomic split)
  - 5.4 build id → name → frontmatter → body
  - 5.5 update the Project note
  - 5.6 update the Daily note (if enabled)
  - 5.7 write the files
  - 5.8 self-check
  - 5.9 report
- `## 6. RESOLVED DECISIONS (authoritative)`:
  - 6.1 type decision table, plus the category definitions (Meeting, Kickoff, Implementation, Deployment, Discussion, Documentation)
  - 6.2 mapping table rendered from projectMap
  - 6.3 tag rules (Project: track9 by default, or sidejob; Knowledge: `knowledge` + topics; Daily: `daily` + project tags; Activity: no tags key; 1–5 tags, lowercase, hyphenated)
  - 6.4 ID rules (quoted, from the reserved block, never reused, Daily = `YYYYMMDD0000`)
  - 6.5 file names and forbidden characters
  - 6.6 exact frontmatter templates for Activity, Project, Knowledge, Daily and Task note (copy them from REFERENCE_APP)
  - 6.7 body rules (no information loss; Activity sections `## Konteks`, `## Poin Penting`, `## Keputusan`, `## Action Item`, `## Sumber`; Knowledge `## Mengapa Penting`, `## Tautan`; relative dates converted to absolute dates; the language rule)
  - 6.8 Project update rules (TODO lines inside the callout with the `> ` prefix; no duplicates; `[x]` only when a task is proven done; Followup Date only when the new date is sooner; Status only when the note says so; never touch Summary Activity)
  - 6.9 Daily note rules (`[[Daily-Notes]]` right after the frontmatter; one table row per Activity; plain text only, no wiki-links; Tomorrow section)
  - 6.10 forbidden actions (Archive/, Base/ and Template/ are off-limits; no deletes, no renames, no id changes, no duplicate projects)
- `## 7. SELF-CHECK`: a 12-question checklist.
- `## 9. REPORT`: a table `# | From note | Action | Type | Path | Project | id`, then Project updates, Assumptions and Questions.
- `## 10. WORKED EXAMPLE`: a meeting note about SBN Valas that becomes one Activity, one Knowledge note, one Project TODO update and one Daily row.

### 8.2 Task prompt ("PROMPT FOR MAGE"): sections after the header
- `## 3. PROJECT OVERVIEW` (the project table), plus `3b` with the full Project note(s) for project or review scopes.
- `## 4. THE TASK(S)`: for each task, a table (exact text, state, due, priority, project, project status/follow-up/tags, full source path and line), followed by:
  - the source context, or the full Task note
  - the Project note
  - other open tasks in the project
  - the activity history (all summaries)
  - the full text of the 3 newest Activity notes (only 1 when there are 4 to 8 tasks, and none when there are more than 8)
- `## 5. STEPS`, which depend on the mode:
  - **execute**: restate the task and its acceptance criteria. For code, work in WORK_REPO: plan, implement, run lint/tests/build, never push. If WORK_REPO is empty, stop after the plan and ask. For non-code work, deliver the result in the answer. Then log the work: one Activity note (Category Implementation), `[x]` or `[/]` in the TODO plus follow-ups, and a Daily row.
  - **breakdown**: 3–10 subtasks that each start with a verb, take at most one day and are testable. Order them by dependency. Write them as indented checkboxes under the parent (`>   - [ ]`) or into `## Subtasks` of the Task note. Estimate each as S, M or L. Implement nothing.
  - **tasknote**: create or update `Task List/<title>.md` with the full format (Description, Acceptance Criteria, Subtasks, Dependencies, Risks & Open Questions, Links, Log). Make sure the Project TODO references it.
  - **review**: give each task a verdict (Done, In progress, Not started, Blocked or Stale, with evidence). Check the dates, and propose next actions, a Followup Date and any Status change. Apply only the safe updates: follow-up date, new TODOs, and `[x]` when a task is proven done. Do not change Status. Write one review Activity note per project and a Daily row. Finish with a review table.
  - **derive**: the new task is described in the extra instructions (or propose 1–3 tasks if there are none). Add it to the Project TODO under the parent. Also create a Task note if it has details.
- `## 6. RULES` (the skill essentials, the used IDs, the forbidden actions, the language; in chat mode, the file-block format).
- `## 7. REPORT` (Result, Vault changes table, Code changes and Tests for execute, Next steps, Questions).

## 9. IMPLEMENTATION STEPS (do them in order)

1. Read SKILL_FILE, REFERENCE_APP and the folder tree of VAULT_ROOT (list only; do not modify it). Write down every rule you will enforce.
2. Scaffold the Angular 20 project (section 3). Run `npm run build` to prove that the empty app builds.
3. Implement `models.ts`, `frontmatter.ts`, `markdown.ts` and `detect.ts`. Write unit tests (the default Angular test runner) for:
   - the frontmatter parser: block scalar, list, quoted wiki-link, inline array, empty list
   - the task regex: a normal task, a callout task, `[/]`, `[x]`, a due-date emoji
   - `linkName`
   - project detection: "rapat SBN Valas" → IPO SBN Valas, and "skillset" must NOT match "Skill"
   - the ID block assignment with collisions
4. Implement `SettingsService`, `VaultService` (with the demo vault) and `InboxService`, all signal-based and with persistence.
5. Build the shell: header, path chips, tabs, and the theme toggle.
6. Build the Tasks tab (list, filters, detail, project detail). Check it against the demo vault: 10 open tasks; the Archive task must NOT appear.
7. Build the Projects tab.
8. Build Capture notes and the Inbox.
9. Build `PromptBuilderService` by copying the prompt texts from REFERENCE_APP **word for word**, then build the prompt dialog and the Settings dialog.
10. Build the How it works tab.
11. Run `npm run build` and `npm test -- --watch=false`. Fix everything until both pass with 0 errors.
12. Serve the build and check with the demo vault:
    - selecting a task shows its context
    - every mode produces a prompt with SKILL_REPO and VAULT_ROOT at the top
    - a note saved in Capture shows up in the Inbox
    - the categorize prompt contains the note, the reserved IDs and the snapshot
    - at 390 px width there is no horizontal scroll
13. Write `README.md` in APP_REPO covering install, run, build, how to open the vault, and the Mage workflow.

## 10. ACCEPTANCE CRITERIA (all must be true)

- [ ] Opening the vault folder lists tasks from Project TODO callouts, Activity notes, Daily notes and Task List notes. Nothing from `Archive/` or `Template/` appears.
- [ ] The task detail shows the source context with the task line highlighted, the Project note and every related Activity note.
- [ ] Each of the 5 task modes and the categorize prompt start with the paths table (SKILL_REPO, SKILL_FILE, VAULT_ROOT, …), include the snapshot, and (with embedSkill on) end with Appendix A.
- [ ] Empty paths produce `<<FILL: …>>` placeholders and a visible warning.
- [ ] Windows paths (`D:\…`) are joined with `\`. POSIX paths are joined with `/`.
- [ ] The inbox survives a page reload. Export and import round-trip it.
- [ ] Copy, Download and the command line work. Send to the LLM shows either the response or a clear CORS hint.
- [ ] The UI works in light and dark mode and at phone width.
- [ ] `npm run build` and the unit tests pass.

## 11. FINAL REPORT (print this at the end)

```markdown
### Build report
- Angular version: …
- Files created: (tree)
- Commands run + result: npm run build ✅/❌, npm test ✅/❌
- Acceptance criteria: (copy the list from section 10 with ✅/❌ and one line each)
- Differences from REFERENCE_APP: …
- How to run: …
- Questions for me: … (or "none")
```
