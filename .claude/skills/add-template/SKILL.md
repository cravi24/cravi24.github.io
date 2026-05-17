---
name: add-template
description: Scaffold a new resume template in the resume-builder project. Triggers on phrases like "add a <Name> template", "create a new template", "add Compact template", "/add-template Compact". Creates `src/templates/<Name>/index.jsx` + `.scss` and registers it in `src/templates/index.js`. Skip when editing an existing template — use Edit directly for that. Skip if the request is about resume data (use the editor) or about layout tweaks to existing templates.
---

# Add Template Skill

Scaffold a new EM-targeted resume template.

## Arguments

If invoked as `/add-template <Name>`, take `<Name>` as the template name (PascalCase, e.g. `Compact`, `TechLead`, `Minimal`).

If invoked from natural language without an explicit name, extract the name from the request (e.g. "add a Compact template" → `Compact`). Convert to PascalCase. The registry key is the camelCase form (`compact`, `techLead`).

If the user gives a stylistic hint, apply it. If not, ask **one** focused question: single-column vs two-column? Color accent or none? Serif or sans? Then proceed.

## What to create

For a template named `<Name>` with registry key `<key>`:

1. **`src/templates/<Name>/index.jsx`**
   - Base on `src/templates/Modern/index.jsx` (single column) or `src/templates/Traditional/index.jsx` (two column) — pick whichever layout family matches the request.
   - Same props contract: `({ resume })` destructures `{ personal, summary, experience, skills, education }`.
   - Render all 5 sections. Don't omit any — even if styled minimally.
   - Class name root: `<Name>Template` with BEM modifiers.

2. **`src/templates/<Name>/index.scss`**
   - Start from the same template's `.scss` you used for `.jsx`.
   - Use `@use '../../styling/colors' as colors;` for `colors.$teal-blue`, `colors.$navy-blue`, `colors.$bloody-mimosa`.
   - Use `@use '../../styling/media-queries' as mq;` for `@include mq.from-medium()`, etc.
   - Include a `@media print { .NameTemplate { padding: 0; } }` block at the end.

3. **`src/templates/index.js`** — append to the registry:
   ```js
   import <Name> from './<Name>';
   // ...add to Object.freeze({...}):
   <key>: { name: '<Display Name>', component: <Name> },
   ```
   Display Name is the user-facing label in the dropdown (e.g. "Compact", "Tech Lead").

## Variant hints — apply when the name or user request suggests them

| Hint | Apply |
|---|---|
| "Compact" / "One-page" | Smaller font sizes (0.85rem body), tighter line-height (1.35), single column, no accent borders |
| "Classic" / "Serif" | Times New Roman, no accent colors, plain dividers |
| "Minimal" | No colored accents, hairline dividers only, lots of whitespace |
| "Sidebar" / "Two-column" | Two-column grid with contact/skills/education on left |
| "Header-card" / "Bold" | Big colored header block at top (use `colors.$bloody-mimosa` gradient), content below |
| "Executive" | Larger name/headline, more space between sections, serif accent |

## Verify

After scaffolding:
1. Run `npm run build` (use Node 24 PATH per `reference_node_path_quirk.md` memory).
2. Confirm the new template appears in the TemplatePicker dropdown.
3. Confirm selecting it renders the EM dummy without console errors.

## Out of scope

- Editing an existing template — use Edit directly.
- Adding new resume fields (e.g. `certifications`, `publications`) — touches schema; do via plan mode.
- Visual polish beyond initial scaffolding — iterate after the user sees the first render.
- Building a `<Name>Template` to look like a non-EM resume (e.g. designer portfolio) — flag back to the user; this project is EM-focused.
