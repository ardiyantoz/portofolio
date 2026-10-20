---
version: 1
slug: "note-taking-bca-app-index-html"
primary_target: "note-taking-bca/app/index.html"
related_targets: []
---

# WorkingNotes Hub: app shell (all tabs)

Scope: the whole single-file app `note-taking-bca/app/index.html` (Tasks, Projects, Capture notes, How it works, dialogs). Mode: Operate. Build path: code-led.

Audience and job: one BCA engineer, app open all day beside Obsidian and Mage; scan tasks, tick them done with a completion note, capture notes, copy prompts. Constraints: dark only (pinned by the owner); runs from file:// offline, so system fonts only (Segoe UI Variable, Cascadia Mono); must not be too decorative, too dense, or generic-AI.

Memorable moment: a finished task carries a dated red SELESAI teller stamp, and its completion notes read like printed passbook lines.

## Direction contract

THESIS: The vault is a passbook: every task line is an entry that gets posted, dated and stamped when it is closed with a reason. Refuses the generic dark dashboard (grey cards + one neon accent).

OWN-WORLD: Teller-counter green-black ground (#0c1411 to #15231e), passbook-print mono (Cascadia Mono) for every date, time, ID, path and count, Segoe UI Variable for task text and controls, ink-blue (#7fa8ff) for actions and selection, stamp red (#e0574b) only for stamps and lateness, posted green for done. Hairline passbook rules, 6 to 10px radii, no shadows, no glow.

STORY: The owner sees what is late, today and next at a glance, opens a task with its source and history, writes why it is done, and posts it.

FIRST VIEWPORT: App bar (brand, mono vault status, actions) over a mono path strip and tabs; left column task list grouped by project with mono due dates and right-aligned mono status; right column task detail: chips, title, To do / In progress / Done switch, actions, mono meta, source context, Notes & completion as passbook lines.

FORM: Passbook & teller stamp, #1 on my ordered list (Impeccable's pick, chosen by the owner over the rolled departure board). seed:8e0ca2877fc58969. Signature move: the SELESAI stamp lands on a task the moment it is posted, with a short stamp-down motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
