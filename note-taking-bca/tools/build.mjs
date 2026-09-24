// Embeds the skill text and the sample vault into app/index.html (idempotent).
// Usage: node tools/build.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "app", "index.html");
const skill = readFileSync(join(root, "skills", "obsidian-zettelkasten", "SKILL.md"), "utf8")
  .replace(/^---\n[\s\S]*?\n---\n+/, ""); // drop opencode frontmatter, keep the skill body
const vaultDir = join(root, "sample-vault", "WorkingNotes");

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".md")) files.push({ path: relative(vaultDir, p).split("\\").join("/"), content: readFileSync(p, "utf8") });
  }
})(vaultDir);

const safe = v => JSON.stringify(v).replace(/</g, "\\u003c");
let html = readFileSync(htmlPath, "utf8");
html = html.replace(/(<script id="skill-text" type="application\/json">)[\s\S]*?(<\/script>)/, (_, a, b) => a + safe(skill) + b);
html = html.replace(/(<script id="demo-vault" type="application\/json">)[\s\S]*?(<\/script>)/, (_, a, b) => a + safe(files) + b);
writeFileSync(htmlPath, html);
console.log(`Embedded skill (${skill.length} chars) and ${files.length} demo notes into app/index.html`);
