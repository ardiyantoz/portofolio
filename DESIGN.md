---
name: WorkingNotes Hub
description: A dark passbook over an Obsidian vault, where every task line is an entry that gets posted, dated and stamped when it is closed with a reason.
colors:
  counter-black: "#0b1310"
  counter-black-raised: "#0e1814"
  app-rail: "#0f1915"
  ledger-panel: "#111c18"
  ledger-panel-2: "#15231e"
  ledger-panel-3: "#1a2b25"
  passbook-rule: "#1f2e28"
  passbook-rule-2: "#2a3c35"
  passbook-rule-3: "#364b43"
  ledger-ink: "#e6ece7"
  ledger-ink-2: "#bccac3"
  ledger-muted: "#90a39a"
  ledger-faint: "#7d9188"
  ink-blue: "#7fa8ff"
  ink-blue-hi: "#a3c0ff"
  ink-blue-ink: "#0a1325"
  ink-blue-wash: "rgba(127,168,255,.11)"
  ink-blue-line: "rgba(127,168,255,.38)"
  stamp-red: "#ee6b60"
  stamp-red-wash: "rgba(238,107,96,.11)"
  posted-green: "#5fd39a"
  posted-green-wash: "rgba(95,211,154,.11)"
  pending-amber: "#f0b45e"
  pending-amber-wash: "rgba(240,180,94,.11)"
typography:
  headline:
    fontFamily: "Segoe UI Variable Text, Segoe UI Variable, Segoe UI, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 620
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Segoe UI Variable Text, Segoe UI Variable, Segoe UI, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 620
    lineHeight: 1.3
  title-sm:
    fontFamily: "Segoe UI Variable Text, Segoe UI Variable, Segoe UI, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 620
    lineHeight: 1.3
  body:
    fontFamily: "Segoe UI Variable Text, Segoe UI Variable, Segoe UI, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  control:
    fontFamily: "Segoe UI Variable Text, Segoe UI Variable, Segoe UI, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 560
    lineHeight: 1.3
  print:
    fontFamily: "Cascadia Mono, Cascadia Code, Consolas, ui-monospace, Liberation Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "tnum"
  rubric:
    fontFamily: "Cascadia Mono, Cascadia Code, Consolas, ui-monospace, Liberation Mono, monospace"
    fontSize: "11.5px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.06em"
  stamp:
    fontFamily: "Cascadia Mono, Cascadia Code, Consolas, ui-monospace, Liberation Mono, monospace"
    fontSize: "10.5px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.09em"
rounded:
  stamp: "4px"
  chip: "5px"
  control: "6px"
  box: "8px"
  card: "10px"
  dialog: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  gutter: "22px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.ink-blue-ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.ink-blue-hi}"
    textColor: "{colors.ink-blue-ink}"
  button-secondary:
    backgroundColor: "{colors.ledger-panel-2}"
    textColor: "{colors.ledger-ink-2}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "32px"
  button-secondary-hover:
    backgroundColor: "{colors.ledger-panel-3}"
    textColor: "{colors.ledger-ink}"
  button-ghost:
    textColor: "{colors.ledger-muted}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "32px"
  button-small:
    rounded: "{rounded.control}"
    padding: "0 9px"
    height: "26px"
  input:
    backgroundColor: "{colors.counter-black-raised}"
    textColor: "{colors.ledger-ink}"
    rounded: "{rounded.control}"
    padding: "7px 10px"
    height: "34px"
  chip:
    backgroundColor: "{colors.ledger-panel-2}"
    textColor: "{colors.ledger-ink-2}"
    typography: "{typography.print}"
    rounded: "{rounded.chip}"
    padding: "0 7px"
    height: "21px"
  chip-active:
    backgroundColor: "{colors.ink-blue-wash}"
    textColor: "{colors.ink-blue}"
  chip-done:
    backgroundColor: "{colors.posted-green-wash}"
    textColor: "{colors.posted-green}"
  chip-overdue:
    backgroundColor: "{colors.stamp-red-wash}"
    textColor: "{colors.stamp-red}"
  chip-soon:
    backgroundColor: "{colors.pending-amber-wash}"
    textColor: "{colors.pending-amber}"
  card:
    backgroundColor: "{colors.ledger-panel}"
    rounded: "{rounded.card}"
    padding: "16px"
  dialog:
    backgroundColor: "{colors.ledger-panel}"
    textColor: "{colors.ledger-ink}"
    rounded: "{rounded.dialog}"
  stamp:
    textColor: "{colors.stamp-red}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "3px 6px 2px"
  task-row-selected:
    backgroundColor: "{colors.ink-blue-wash}"
    padding: "10px 14px 10px 16px"
---

# Design System: WorkingNotes Hub

## Overview

**Creative North Star: "The Passbook at the Teller Counter"**

WorkingNotes Hub is a bank engineer's work instrument laid out like a savings passbook on a teller counter. The ground is a green-black counter, every surface is a printed page separated by hairline rules, and every fact that a passbook would print (dates, times, IDs, paths, counts, statuses) is set in a monospaced print face. Task text and controls stay in a quiet humanist sans so the page reads as handwriting-free and calm. A task is not merely ticked: it is posted, gets a dated red SELESAI teller stamp, and its completion notes appear as printed passbook lines (date, kind, text).

The world is dark only, flat, and dense in the way a ledger is dense: rows are tight, aligned, and scannable from across a desk, never cramped. Colour is functional and rare. Ink-blue is the only action and selection colour, stamp red is reserved for stamps and lateness, posted green means done, and amber means "not yet in the vault". It explicitly refuses the generic dark dashboard of grey cards with one neon accent: no glow, no gradients, no decorative blur, no resting drop shadows.

The type faces are system faces on purpose: the app runs offline from `file://` on a Windows company laptop, so Segoe UI Variable and Cascadia Mono are the real faces and nothing is fetched.

**Key Characteristics:**
- Teller-counter green-black ground in stepped tonal layers, no shadows for depth.
- Monospaced "passbook print" for every date, time, path, ID, count and status word.
- Hairline passbook rules (1px) divide rows; dashed rules mark group breaks.
- One action colour (ink-blue); stamp red only for stamps and lateness.
- The SELESAI stamp: a rotated, outlined, dated mono stamp that lands with a short stamp-down motion.
- Completion notes render as passbook lines in a three-column date / kind / text grid.

## Colors

A low-chroma green-black neutral family (hue around 168 to 170 in OKLCH) carries everything; four functional hues each own exactly one meaning.

### Primary
- **Ink Blue** (`ink-blue`): every action and every selection. Primary buttons, links, focus outlines, the active tab underline, the selected task row ring, "in progress" status, Ongoing project chips, callout titles, input caret and the load progress bar. Its hover lift is **Ink Blue High** (`ink-blue-hi`), and text sitting on a solid ink-blue fill uses **Ink Blue Ink** (`ink-blue-ink`), a near-black navy.
- **Ink Blue Wash** and **Ink Blue Line** (`ink-blue-wash`, `ink-blue-line`): the translucent fill and 1px ring of a selected row, active chip, checked mode option, info banner and the inline posting box.

### Secondary
- **Stamp Red** (`stamp-red`): the SELESAI stamp, lateness ("20d late", overdue follow-ups, overdue counts), blocked state, missing Project notes, error banners and danger buttons. Its wash (`stamp-red-wash`) backs overdue chips and error banners.
- **Posted Green** (`posted-green`): done. The filled done tick, Done chips, the Done segment of the state switch, the CATATAN kind in passbook lines and the Notes & completion icon. Its wash (`posted-green-wash`) backs Done chips.

### Tertiary
- **Pending Amber** (`pending-amber`): due today or soon, and "unsaved" (changed here but not yet written into the vault). Warning banners, the pending-changes bar, highlighted source lines, the UNSAVED passbook kind and the "prompted" inbox pill. Its wash (`pending-amber-wash`) backs those banners and chips.

### Neutral
- **Counter Black** (`counter-black`): the page ground, and the inset well behind code blocks, frontmatter, prompt text and note textareas.
- **Counter Black Raised** (`counter-black-raised`): inputs, row hover, ledger header and group rows.
- **App Rail** (`app-rail`): the sticky app bar behind brand, actions, path strip and tabs.
- **Ledger Panel 1 / 2 / 3** (`ledger-panel`, `ledger-panel-2`, `ledger-panel-3`): card and dialog pages, then secondary buttons and chips, then button hover, the "on" switch segment, inline code and the toast. Each step is a small lightness lift, which is the whole depth model.
- **Passbook Rule 1 / 2 / 3** (`passbook-rule`, `passbook-rule-2`, `passbook-rule-3`): hairline row and section rules, then control borders and dashed group rules, then hover borders and scrollbar thumbs.
- **Ledger Ink** (`ledger-ink`): primary text, task titles, headings.
- **Ledger Ink 2** (`ledger-ink-2`): secondary text, values in meta lists, chip text, markdown body.
- **Ledger Muted** (`ledger-muted`): labels, hints, placeholders, open/"to do" status, ghost buttons.
- **Ledger Faint** (`ledger-faint`): the quietest print, such as path labels, tab counts, list markers and zero counts. It still clears AA for small text on the panels.

### Named Rules
**The One Meaning Per Hue Rule.** Blue acts, red stamps or warns of lateness, green is done, amber is unsaved or due soon. A hue never borrows another's job; decoration gets no hue at all.

**The Red Is Earned Rule.** Stamp red appears only on a stamp, a late date, a blocked task, a missing note or an error. If nothing is late or posted, the screen has no red.

**The Wash, Not Fill Rule.** Status chips and banners use an 11% wash of their hue with a 25 to 30% hue border and full-strength hue text. Only primary buttons and the done tick use a solid fill.

## Typography

**Body Font:** Segoe UI Variable (Text optical size first, with Segoe UI, system-ui, Helvetica Neue, Arial fallbacks)
**Label/Mono Font:** Cascadia Mono (with Cascadia Code, Consolas, ui-monospace, Liberation Mono fallbacks)

**Character:** A calm humanist sans for what the owner wrote and what they click, against a crisp monospaced print for everything a passbook machine would print. The pairing is the world: sans is the customer's handwriting, mono is the bank's printer. Variable weights (560, 600, 620) are used deliberately between regular and bold.

### Hierarchy
- **Headline** (620, 22px, 1.3, -0.012em): the selected task title in the detail pane, balanced, max 58ch.
- **Title** (620, 16px, 1.3): dialog titles, empty-state headings, the brand name (600).
- **Title Small** (620, 14px, 1.3): card headers such as "Task list"; Notes & completion heading at 13px.
- **Body** (400, 14px, 1.55): base text, task text (1.45 in rows), rendered markdown (1.6), passbook line text at 13.5px.
- **Control** (560, 13px): buttons and tabs (tabs 600 at 13.5px); primary buttons step up to 620; small buttons 12px.
- **Print** (mono 400, 12px, 1.4, tabular numbers): dates, due/status cells, task sub-lines, chips, meta-list terms, paths, counts, vault status, passbook rows (12.5px, 1.75).
- **Rubric** (mono 600, 11.5 to 12px, 0.06em, uppercase): project group headers in the task list, ledger column heads and group rows, detail section headings (followed by a hairline that runs to the edge), inbox pills (10.5px).
- **Stamp** (mono 700, 10.5px, 0.09em, uppercase; 13px on the large stamp): SELESAI with its date line beneath at 9.5px / 11px.

### Named Rules
**The Printed Facts Rule.** Every date, time, path, file name, ID, count and status word is set in the mono print face with tabular numbers. Prose and controls never are.

**The Dates Read Like a Passbook Rule.** Dates print as DD/MM/YY or DD/MM in rows, and the stamp prints DD MON YY with Indonesian month abbreviations (JAN, FEB, ..., MEI, AGU, OKT, DES).

## Layout

A centred working surface capped at 1560px with a 22px gutter (`gutter`). The sticky app bar holds the brand and vault actions, then a horizontally scrolling mono path strip (items separated by hairlines, faded at the right edge with a mask), then the tab row. The Tasks tab is a two-column grid: a list column of 340 to 560px and a fluid detail column, 18px apart, top-aligned. The task list scrolls inside its card with sticky group headers; the detail pane is one long page of sections.

Rhythm runs on 4px steps with 8px as the common gap: controls and chips sit 6 to 8px apart, card headers and bodies pad 13 to 16px, detail sections pad 20 to 24px and are spaced 24px apart. Task rows are a four-column grid (tick, text, right-aligned status, select box) with 10px vertical padding and a mono sub-line under the text.

Responsive: at 1000px and below the grid collapses to one column, the task list loses its height cap, the settings grid becomes one column, and secondary ledger columns hide. At 560px and below the app bar stops being sticky, the gutter drops to 12px, filters stack, button labels hide (icons remain), the large stamp moves into flow above the title, and passbook lines become two columns with the text on its own row.

## Elevation & Depth

Flat by construction. Depth is tonal layering: counter black ground, a slightly lighter rail and panels, and lighter steps again for controls and hover. Every surface boundary is a 1px passbook rule. Interactive emphasis uses rings, not shadows: the selected task row has an inset 1px ink-blue ring, focused inputs get a 3px ink-blue wash ring, ticks get a 4px wash halo on hover, and highlighted source lines get a 1px amber ring. Dialogs float on a dim green-black backdrop (`rgba(3,8,6,.72)`) with a border, not a shadow.

### Shadow Vocabulary
- **Toast lift** (`box-shadow: 0 12px 30px rgba(0,0,0,.4)`): the transient toast at the bottom of the screen, the one surface that floats over content without a backdrop.

### Named Rules
**The Hairline Not Shadow Rule.** Surfaces separate with 1px rules and tonal steps. A resting drop shadow, glow or blur on a card, row, chip or button is out of world; only the floating toast casts one.

## Shapes

Gently rounded, rectangular, and small-radius. Controls and inputs use 6px (`control`), chips 5px (`chip`), the stamp and tiny boxes 4px (`stamp`), callouts, code wells, banners and the state switch 8px (`box`), cards and the ledger table 10px (`card`), and dialogs 14px (`dialog`). Rules are 1px solid for rows and boxes and 1px dashed for group breaks and the capture detection box. The only rotated shape is the stamp, tilted -6 degrees. The brand mark is a 30px outlined square (7px radius) with "WN" in mono.

## Components

### Buttons
Tactile but quiet; they look like counter keys, not pills.
- **Shape:** gently rounded (6px), 32px tall, 12px side padding, icon plus label with a 7px gap; small variant 26px (28px in the detail head).
- **Primary:** solid ink-blue fill, near-black navy text, weight 620. One per area (Open vault, Ask Mage, Post as done, Prompt for selected).
- **Secondary:** ledger panel 2 fill, 1px rule-2 border, ink-2 text.
- **Ghost:** transparent, muted text; used for low-priority bar actions and Cancel.
- **Danger:** secondary with stamp-red text and a red-tinted border on hover.
- **Hover / Focus / Active:** hover lifts the fill one tonal step and brightens text (primary goes to ink-blue-hi); active drops to rule-2; focus is a 2px ink-blue outline offset 2px. Transitions 0.15s on background, border and colour. Disabled is 40% opacity.

### Chips
- **Style:** small mono facts. Panel-2 fill, 1px hairline border, 5px radius, 21px line, 12px mono, optional 12px icon.
- **State:** Ongoing / open uses the ink-blue wash; Done the posted-green wash; overdue and blocked the stamp-red wash; due-soon and unsaved the amber wash; cancelled is struck through in faint; tags are transparent.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** ledger panel on the counter-black ground.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px passbook rule; header separated by a hairline.
- **Internal Padding:** 13px 16px header, 16px body; the task detail uses 20 to 24px.

### Inputs / Fields
- **Style:** counter-black-raised fill, 1px rule-2 border, 6px radius, 34px min height, 7px 10px padding, ink-blue caret, muted placeholder. Selects use a drawn chevron; date-times and prompt or code textareas use mono.
- **Focus:** border turns ink-blue with a 3px ink-blue-wash ring; no outline.
- **Hover:** border steps to rule-3.

### Navigation
- **Tabs:** text buttons in 600 13.5px, muted at rest, ledger ink on hover and when selected. The selected tab carries a 2px ink-blue underline inset 12px from each side, and its mono count turns ink-blue.
- **Path strip:** mono 12px label/value pairs (faint label, ink-2 path) divided by hairlines; a path turns ink-blue on hover and stamp red when missing.
- **Mobile:** tabs scroll horizontally with an edge fade; button labels collapse to icons.

### Task Row (passbook entry)
A four-column row: a square tick, the task text with a mono sub-line (date, source kind, priority, file, "unsaved" in amber), a right-aligned mono status word, and a faint select box that brightens on hover. Status words: "Nd late" in stamp red, "today" and "tomorrow" in amber, "in progress" in ink-blue, "to do" in muted; done rows show the small stamp instead and strike their text in faint. Hover is the raised counter fill; selection is the ink-blue wash with an inset ring. Group headers above rows are sticky mono rubrics with project status and count, separated by a dashed rule.

### Tick
An 18px square checkbox with a 5px radius and a 1.5px muted-green border. Done fills posted green with a counter-black check; in progress is half-filled ink-blue; blocked has a stamp-red border; cancelled is a filled panel. Hover adds a 4px wash halo in ink-blue (or green when done).

### State Switch
A segmented control in a 1px rule-2 frame (8px radius, 3px inset) of small transparent buttons: To do, In progress, Done. The "on" segment takes the panel-3 fill and its state colour (green for Done, ink-blue otherwise).

### The SELESAI Stamp (signature)
An outlined, rotated (-6deg) stamp in stamp red: 1.5px border, 4px radius, mono 700 uppercase "SELESAI" with the posted date (DD MON YY) beneath, at 92% opacity. Small in the task row's status cell; large (13px, 2px border) pinned to the top right of the task detail head. When a task is posted in this session the stamp lands with the stamp-down motion: from -14deg at 1.7x scale and a slight blur, to rest in 0.32s on `cubic-bezier(.16,1,.3,1)`.

### Passbook Lines (Notes & completion)
Completion notes and log entries render as a three-column mono grid: date and time in muted print, a kind word (CATATAN and LOG in posted green, STATUS in ink-blue, UNSAVED in amber, letter-spaced), and the note text in the sans at 13.5px with any sub-points as a list. Rows are separated by hairlines between a rule-2 top and a hairline bottom. Below them sit the note textarea (counter-black well) and the "Post as done with this note" primary action.

### Posting Box
The inline completion prompt that opens inside the task row or under the state switch when a task is ticked: an 8px-radius box with an ink-blue line border on the raised counter fill, a label, a counter-black textarea, Post as done / Done without note / Cancel, and a mono hint. Posting is never a modal.

### Ledger Table (Projects)
A full-width table in a 10px-radius card: mono uppercase column heads on the raised counter fill, mono group rows (Ongoing, Explore, No status, Done) with faint counts, sans project names, right-aligned tabular counts (zero in faint) and mono follow-up dates coloured red when late and amber when soon. Above it, a mono summary line of bold counts, with the overdue count in stamp red.

### Banners and Dialogs
Banners are 8px boxes in the wash of their meaning (amber warn, red error, blue info) with matching text and a 25 to 30% border. Dialogs are panel pages with a 1px rule-2 border and 14px radius, header / scrolling body / footer separated by hairlines, entering with a 0.18s rise of 8px.

## Do's and Don'ts

### Do:
- **Do** set every date, time, path, file name, ID, count and status word in Cascadia Mono with tabular numbers, and everything the owner wrote or clicks in Segoe UI Variable.
- **Do** separate surfaces with 1px passbook rules and tonal steps of the green-black family; reserve the one shadow for the floating toast.
- **Do** keep ink-blue as the only action and selection colour, with one solid primary button per area.
- **Do** reserve stamp red for the SELESAI stamp, lateness, blocked, missing notes and errors.
- **Do** show unsaved, not-yet-in-the-vault state in pending amber wherever it appears (row sub-line, switch, passbook line, banner).
- **Do** mark a finished task with the dated SELESAI stamp and show its completion notes as passbook lines (date, kind, text).
- **Do** use 6px radii on controls, 10px on cards and 14px on dialogs; keep focus visible as a 2px ink-blue outline or a 3px ink-blue wash ring on fields.
- **Do** honour reduced motion: all animation and transition switches off.

### Don't:
- **Don't** build the generic dark dashboard: grey cards with one neon accent, glows, gradients or decorative blur.
- **Don't** give cards, rows, chips or buttons a resting drop shadow.
- **Don't** use stamp red, posted green or amber decoratively, or let one hue stand in for another's meaning.
- **Don't** add a light theme; the owner pinned dark only.
- **Don't** load web fonts, icon fonts or CDN assets; the app runs offline from `file://`, so faces are system faces and icons are the inline stroked SVG sprite (16px, 1.8 stroke, round caps).
- **Don't** set prose, task text or button labels in mono, or dates and counts in the sans.
