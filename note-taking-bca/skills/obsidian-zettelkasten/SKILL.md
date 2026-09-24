---
name: obsidian-zettelkasten
description: Create, organize, categorize and link notes in the Obsidian vault `WorkingNotes` (Activity, Project, Knowledge, Daily, Task List) following Zettelkasten rules ZTK-001..ZTK-010. Use whenever the user gives raw notes, meeting notes, tasks, or asks to update the Obsidian vault.
---

# Obsidian Zettelkasten

Trigger when creating, organizing, or linking notes in the Obsidian vault (`WorkingNotes`).

## Vault Structure

```
Root-Notes.md
├── Dashboard.md
├── Activity/
│   └── YYYY-MM-DD <Description>.md (meeting, implementation, discussion notes)
├── Project/
│   └── <Project Name>.md (project tracker: Status, TODO, Summary Activity)
├── Knowledge/
│   └── <Topic>.md (conceptual/knowledge notes)
├── Daily/
│   └── YYYY-MM-DD Kerjaan.md
├── Template/
│   ├── Activity Template.md
│   ├── Project Template.md
│   └── Daily Template.md
├── Base/
│   ├── Activity Base.base
│   ├── Project Base.base
│   └── Daily Base.base
├── Task List/
│   └── <Task>.md
├── Attachment/
│   └── images, files
└── Archive/
    ├── Track 9/ (legacy)
    └── Sidejob/ (legacy)
```

## Core Concepts

### Activity
Catatan aktivitas (meeting, kickoff, implementation, deployment, discussion). Setiap activity dikaitkan dengan Project via `Project` field di frontmatter.

### Project
Tracker project/task. Memiliki Status (Explore, Ongoing, Done), TODO list, dan Summary Activity yang otomatis mengambil semua Activity terkait.

### Dashboard
Menampilkan overview:
- Ongoing Project (Track 9) — filter `tag: track9`
- Ongoing Sidejob — filter `tag: sidejob`
- Daily Activity

## Rules

### 1. Always Check Project First

Before creating any new note:
- Check if an **Project** already exists in `Project/` for the related project.
- If not, create an Project note using `Template/Project Template.md`.
- Activity notes link to Project via `Project: - "[[Project Name]]"` in frontmatter.

### 2. Map Context Automatically

When creating a new note from user input:
- **Identify the type:**
  - Meeting, kickoff, implementation, deployment, discussion → `Activity/`
  - Project tracker with TODO → `Project/`
  - Conceptual/knowledge → `Knowledge/`
  - Daily summary → `Daily/`
- **Identify the Project (project):**
  - "IPO SBN", "SBN Valas" → Project: `IPO SBN Valas`
  - "Avantrade" → Project: `Avantrade`
  - "Tiket" → Project: `Tiket`
  - "Portfolio FI" → Project: `Informasi Portfolio FI`
  - "Autodebet" → Project: `Autodebet Proteksi`
  - "Proteksi Leave Contact" → Project: `Proteksi Leave Contact`
  - "Loket" → Project: `Loket`
  - "ADHOC Reward" → Project: `Project ADHOC Reward`
  - "Pemisahan biaya admin" → Project: `Project pemisahan biaya admin`
  - "Pembiayaan emas Bsya" → Project: `Pembiayaan emas Bsya`
  - "Automation", "SAQ", "Webhook" → Project: `Automation Context Window SAQ Webhook`
  - "Obsidian", "Zettelkasten", "Skill" → Project: `Obsidian Zettelkasten Skill`
  - "Angular 20" → Project: `Angular 20`
  - "Prettier" → Project: `Prettier HTML Whitespace Ignore`
- Create the note with proper frontmatter (see below).

### 3. Activity Note Structure

```yaml
---
id: "<YYYYMMDDHHmm>"
Category:
  - Meeting | Kickoff | Implementation | Deployment | Discussion | Documentation
Project:
  - "[[<Project Name>]]"
Date: YYYY-MM-DD
Summary: |
  - 1-2 line summary of the activity
---

<Body content preserved>
```

- Naming: `YYYY-MM-DD <Description>.md`
- `Category` determines the type of activity.
- `Project` links to the Project note (wiki-link format).
- `Summary` is used by Project's "Summary Activity" view.
- `Date` enables daily filtering in Dashboard.

### 4. Project Note Structure

```yaml
---
id: "<YYYYMMDDHHmm>"
Status: Explore | Ongoing | Done
Followup Date: YYYY-MM-DD
todo:
tags:
  - track9 | sidejob
---

### TODO

> [!TODO] TODO
> - [ ] task 1
> - [ ] task 2

### Summary Activity
![[Activity Base.base#Specific Activity]]
```

- `Status` controls visibility in Dashboard (Ongoing shown, Done archived).
- `tags` determines Dashboard section (`track9` → Project, `sidejob` → Sidejob).
- `Summary Activity` embeds all Activity notes linked to this Project.
- One Project per project. Do NOT duplicate.

### 5. Daily Notes

- Daily files live in `Daily/` with format `YYYY-MM-DD Kerjaan.md`.
- **Daily notes contain summaries, not links.** Write a brief conclusion/summary of the work done under each topic.
- Tag daily notes with `daily` + relevant project tags.
- Every daily note MUST include `[[Daily-Notes]]` right after the frontmatter.
- Use `Template/Daily Template.md` as reference.

### 6. Linking

- Activity → Project via `Project` field in frontmatter.
- Project → Activity via `![[Activity Base.base#Specific Activity]]` embed.
- Dashboard → Project via `![[Project Base.base#Ongoing Project]]` and `![[Project Base.base#Ongoing Sidejob]]`.
- Images use `![[Pasted image YYYYMMDDHHmmss.png]]` format, stored in `Attachment/`.

### 7. Knowledge Notes

- For conceptual/knowledge notes that don't tie to a specific project.
- Use ZTK rules (atomic, unique ID, linking).
- Frontmatter:
```yaml
---
id: "<YYYYMMDDHHmm>"
title: "<Title>"
type: PERMANENT
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [knowledge, <topic>]
links: [related_ids]
---
```

### 8. Archive

- Old folder structures (`Track 9/`, `Sidejob/`) are archived in `Archive/`.
- Do NOT create new notes in `Archive/`.
- Reference archived notes if needed, but prefer creating new Activity/Project notes.

### 9. Naming Convention

- Activity: `YYYY-MM-DD <Description>.md`
- Project: `<Project Name>.md`
- Daily: `YYYY-MM-DD Kerjaan.md`
- Knowledge: `<Topic>.md`
- Use ISO date format (`YYYY-MM-DD`) so files sort chronologically.
- Keep description concise (max ~60 chars).

### 10. Base Files

- `Base/Activity Base.base` — defines table views for Activity notes.
- `Base/Project Base.base` — defines table views for Project notes (All, Ongoing Project, Ongoing Sidejob, Explore).
- `Base/Daily Base.base` — defines table views for Daily Activity.
- Do NOT modify base files unless explicitly requested.

## Zettelkasten Core Rules (ZTK-001 to ZTK-010)

### ZTK-001: Atomic Notes (Satu Ide, Satu Catatan)
Setiap catatan HANYA BOLEH berisi SATU ide utama atau konsep tunggal. Pecah catatan yang mencakup banyak ide menjadi beberapa catatan terpisah.

### ZTK-002: Unique Identifier (ID Unik)
Setiap catatan WAJIB memiliki ID unik. Format: `YYYYMMDDHHmm` pada frontmatter. ID tidak boleh berubah meskipun judul catatan berubah.

### ZTK-003: Judul Catatan
Setiap catatan WAJIB memiliki judul yang singkat, jelas, dan representatif. Berbentuk pernyataan bermakna atau frasa konsep.

### ZTK-004: Isi Catatan (Body)
Isi catatan WAJIB ditulis dengan bahasa sendiri dan cukup untuk dipahami tanpa membaca sumber aslinya. Singkat, padat, dan kontekstual.

### ZTK-005: Linking (Tautan Antar Catatan)
Setiap catatan HARUS memiliki minimal SATU tautan ke catatan lain yang relevan. Activity link ke Project via `Project` field.

### ZTK-006: Tipe Catatan
Kategorikan setiap catatan:
- `[FLEETING]` → Catatan cepat/kasar, perlu diproses (max 2 hari)
- `[LITERATURE]` → Catatan dari sumber eksternal
- `[PERMANENT]` → Catatan final dalam bahasa sendiri
- `[INDEX]` → Catatan peta/daftar topik besar
- `[HUB]` → Catatan penghubung cluster topik

### ZTK-007: Metadata Catatan
Setiap catatan WAJIB menyertakan metadata frontmatter sesuai tipe:
- **Activity:** `id`, `Category`, `Project`, `Date`, `Summary`
- **Project:** `id`, `Status`, `Followup Date`, `todo`, `tags`
- **Knowledge/Daily:** `id`, `title`, `type`, `created`, `updated`, `tags`, `links`

### ZTK-008: Tagging
Minimal 1, maksimal 5 tags. Gunakan kata benda/frasa konsep, lowercase, tanda hubung untuk multi-word. Primary tags: `track9`, `sidejob`, `daily`, `knowledge`.

### ZTK-009: Sumber Referensi
Jika catatan berasal dari sumber eksternal, WAJIB cantumkan nama sumber, halaman/timestamp, dan tanggal akses.

### ZTK-010: Review dan Pemeliharaan
- FLEETING → Review max 2 hari
- LITERATURE → Review max 1 minggu
- PERMANENT → Review min 1 bulan atau saat ada catatan baru relevan
- DILARANG menghapus PERMANENT yang sudah ada. Buat catatan baru yang merevisi/perluas ide.

## Templates

### Activity Template (`Template/Activity Template.md`)
```yaml
---
Category:
  - Meeting
Project:
  - "[[Replace With Project Name]]"
Date: {{date}}
Summary: |
  -
---
```

### Project Template (`Template/Project Template.md`)
```yaml
---
Status: Ongoing
Followup Date:
todo:
tags:
  -
---

### TODO

> [!TODO] TODO
> - [ ]

### Summary Activity
![[Activity Base.base#Specific Activity]]
```

### Daily Template (`Template/Daily Template.md`)
```yaml
---
Date: {{date}}
tags:
  - daily
---

## Activity

| Time | Project | Category | Summary |
| --- | --- | --- | --- |
| | | | |

## Notes

-

## Tomorrow

- [ ]
```

## Zettelkasten Note Template (Knowledge)

```markdown
---
id: YYYYMMDDHHmm
title: "Judul Catatan"
type: PERMANENT
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [knowledge, tag1, tag2]
links: [ID-001, ID-002]
---

# Judul Catatan

[Inti ide dalam bahasa sendiri]

## Mengapa Penting
[Konteks dan alasan]

## Tautan
- Berkaitan dengan [[ID|Judul]] karena [alasan]
```
