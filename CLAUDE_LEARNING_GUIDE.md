# Claude Code — Beginner's Guide

A hands-on guide written while learning, using the resume-builder project as the practice ground. Each lesson teaches one capability through a real task.

## How to read this

- Lessons are ordered. Earlier ones are prerequisites for later ones.
- Every lesson has: **What it is** → **Why it matters** → **How to use it** → **Practice**.
- Examples reference real files in this repo so you can try them.

## Curriculum (revised — each lesson advances the real rebuild)

**Project goal:** rebuild resume-builder on React 19.2 + Vite (CSR, npm), with engineering-manager-targeted templates and a dummy→real-data preview flow.

| # | Lesson | Real phase |
|---|---|---|
| 1 | What Claude Code is | — |
| 2 | Reading & exploring | — |
| 3 | First edit | FontSelector cleanup |
| 4 | Multi-file changes | Fonts extracted to constants |
| 5 | TodoWrite | Break rebuild into tracked phases |
| 6 | Plan mode | Design dep-upgrade + architecture |
| 7 | Subagents | Research current state, plan in parallel |
| 8 | Git/worktrees | One worktree per phase |
| 9 | Dep upgrade execution | CRA→Vite, React 17→19.2, sass, router 7, npm |
| 10 | Memory | Lock in arch decisions |
| 11 | Templates system | 2–3 EM templates, swap UI |
| 12 | Dummy data + forms scaffold | EM dummy fixture, form skeleton |
| 13 | Slash commands & skills | `/add-template` scaffolder |
| 14 | Form↔preview wiring | State, controlled inputs, live preview |
| 15 | Hooks & settings.json | Auto-lint, allowlists |
| 16 | MCP browser tools | Render templates in real browser |
| 17 | Scheduled tasks (optional) | Nightly outdated-check |

---

## Lesson 1 — What Claude Code is

A CLI in your terminal. Two channels per turn: **chat** (you/Claude text) and **tool calls** (Claude reading/editing files, running shell). Tool calls operate on real files. Destructive actions ask for approval.

**Day-1 facts:**
- Worktree mode = isolated branch checkout. Safe to experiment; `master` untouched.
- Memory persists across sessions, stored at `~/.claude/projects/<repo-hash>/memory/`.
- Global style/preferences go in `~/.claude/CLAUDE.md`; project-specific in `./CLAUDE.md`. Both auto-loaded.

**Prompting rules that matter early:**
- Specific > vague. Paste paths, errors, line numbers.
- Interrupt fast if Claude heads the wrong direction.
- Approve risky actions only if you'd accept the worst case.

## Lesson 2 — Reading & exploring code

**Three tools, by cost:**
| Tool | When |
|---|---|
| `Read` | Known file path |
| `Bash` grep/find | Known symbol/string/pattern |
| `Explore` subagent | Broad multi-file search |

**Rules:**
1. **Parallel independent calls.** One message, multiple tool blocks.
2. **Never `cat` — use `Read`** (line numbers → clickable `file:line` links).
3. **Delegate broad searches** to an Explore subagent to protect main context.

**Example from this repo:** finding FontSelector takes one `grep -rn "FontSelector" src` — shows definition at [src/components/FontSelector/index.js:3](src/components/FontSelector/index.js:3) and usage at [src/pages/ResumeBuilder/index.js:9](src/pages/ResumeBuilder/index.js:9).

## Lesson 3 — Editing files

**Two write tools:**
| Tool | Use for |
|---|---|
| `Edit` | Exact string replace in existing file (95% case) |
| `Write` | New file or full rewrite |

**Hard rules:**
1. **Must `Read` before `Edit`** — harness blocks otherwise.
2. **`old_string` must be unique** in the file, or use `replace_all: true`.
3. **No re-Read after Edit succeeds** — wasted tokens; trust the tool.

**Useful flags:**
- `replace_all: true` — renames across a file in one call.
- Multi-line `old_string`/`new_string` supported; indentation must match exactly.

**Read-output gotcha:** Read prefixes every line with `<lineno>\t`. That's NOT in the file — don't paste it into edits.

**Demo done in this repo:** [src/components/FontSelector/index.js:10](src/components/FontSelector/index.js:10) — replaced `document.getElementById(...).value` with idiomatic `e.target.value`.

## Lesson 4 — Multi-file changes

**Pattern:**
1. **Parallel context-gathering** — read all relevant files in one tool block.
2. **Coherent edits** — Write + Edit fired together when independent.
3. **Verify** — build/lint/tests confirm coherence across the files.

**Demo done in this repo:** extracted font list from `FontSelector` into [src/constants/Fonts.js](src/constants/Fonts.js) using `{label, value}` shape mirroring `Routes.js`. FontSelector now maps over the constant.

**Trust-but-verify principle:** after edits, Claude's "done" only describes intent. Run the build/tests yourself before believing a multi-file change is coherent.

## Lesson 5 — TodoWrite

A live, persistent task list shown to the user. Not optional formatting — it's the contract that exposes plan + progress.

**Use it when:** 3+ steps, complex/migration work, user listed multiple tasks.
**Skip it when:** single trivial change, Q&A, conversational.

**Rules:**
1. Exactly **one** task `in_progress` at a time.
2. Mark complete **the moment** a task is done — never batch.
3. Don't mark complete if blocked/partial. Convert blockers into new todos.

**As a user, push back when:**
- A task is marked complete but actually broken.
- Claude works outside the current `in_progress` task — that's drift.

## Lesson 6 — Plan mode

A **read-only mode** for non-trivial work. Tools that mutate (Edit, Write, Bash mutating cmds) are blocked. Only the plan file is writable.

**Workflow:** `EnterPlanMode` → Explore subagents → optional Plan subagents → write plan → `ExitPlanMode` → user approves/edits → execute.

**When to use:** new features, multi-file refactors, architectural decisions, anything where revising a plan is 100× cheaper than undoing the work.

**When NOT to use:** typos, single-line fixes, pure research (use Explore subagent instead).

**Mechanics worth knowing:**
- Plan file path is given by the harness on enter. Survives across sessions.
- User can **edit your plan during approval** — that's normal, plans are negotiated.
- `allowedPrompts` on `ExitPlanMode` pre-authorizes command categories so execution isn't blocked by permission prompts. Save yourself confirmation interruptions.
- Workflow defaults (Explore + Plan agents) are defaults, not rules. Skip a step when it adds no value (e.g. well-trodden migration).

**As a user, build the habit:** when Claude proposes something non-trivial, say "plan it first."

**Demo done in this repo:** Phase 0 migration plan saved to `~/.claude/plans/velvety-hugging-volcano.md` — CRA→Vite + React 19.2 + router 7 + sass + npm, with file-by-file diff list, risks, and verification checklist.

## Lesson 7 — Subagents

Independent agents with their own context window. They do work and return a summary; their raw output doesn't pollute your conversation.

**Types:**
| Agent | Use for |
|---|---|
| `Explore` | Broad/multi-step code search. Read-only. |
| `Plan` | Open-ended design / architecture proposals. |
| `general-purpose` | Multi-step tasks with full tool access (use sparingly). |

**Reach for one when:**
- Search would dump 200+ lines of grep output.
- Open-ended design with multiple valid angles.
- Work doesn't need your running conversation context.

**Don't reach for one when:**
- You know the file — just Read it.
- One grep is enough.
- Tight loop / iteration where context handoff costs more than direct work.

**Demo done:** plan-mode investigation used one Explore agent to map all CRA touchpoints (HTML, entry, env, routing v5 patterns, SCSS imports, gh-pages config) in a single 400-word report.

## Lesson 8 — Git & worktrees

A **worktree** is a separate working copy of the same repo on a different branch. Lives at `.claude/worktrees/<name>/`. Master is untouched while you work.

**Why use one:**
- Isolation: catastrophic migration failures don't touch master.
- Parallelism: multiple worktrees in flight (e.g. Phase 1 + Phase 2 simultaneously).
- Clean rollback: `git worktree remove <path>` discards the whole experiment.

**Mechanics:**
- Made automatically when you launch Claude in worktree mode (or with `git worktree add`).
- Each has its own branch (`claude/<worktree-name>`).
- To merge work back: commit → push branch → PR, or local `git merge`.

**As a user, develop the instinct:** when starting a phase-sized change, spin up a fresh worktree. Mistakes become free.

## Lesson 9 — Dep upgrade execution (the error loop)

The pattern that actually shipped Phase 0:

1. Run the next step (npm install, npm run build, etc.).
2. Read the error message *carefully*. Don't skim.
3. Make the **smallest fix** that addresses that specific error.
4. Re-run.
5. Repeat.

**Anti-patterns to avoid:**
- Pre-emptively fixing 5 things at once before re-running. You don't know which ones the build actually cares about.
- Reading the stack trace bottom-up. The first error is usually the cause; later errors are symptoms.
- Bulk-rewriting code when one-line fixes suffice.

**Demo done:** Two build errors in Phase 0:
- "JSX syntax not enabled" → renamed 21 `.js`→`.jsx` with one `find ... -exec mv`.
- "Cannot parse .md import" → swapped to Vite's `?raw` query, dropped the useEffect that was no longer needed.

Each fix was minimal and direct; build closed in 3 iterations total.

## Lesson 10 — Memory

Per-project persistent storage at `~/.claude/projects/<repo-hash>/memory/`. Auto-loaded each session.

**Four types:**
| Type | What | Lifetime |
|---|---|---|
| `user` | Who the user is, how they work | Long |
| `feedback` | Corrections + validated approaches | Long |
| `project` | Active goals/decisions/state | Medium — decays |
| `reference` | Pointers to external systems (Linear, Grafana, etc.) | Long |

**Anatomy:** each file has frontmatter (`name`/`description`/`type`) + body. `MEMORY.md` is the index — one line per file, kept ≤150 chars, lines beyond 200 truncated.

**Body structure for `feedback`/`project`:** lead with rule/fact, then `**Why:**` line and `**How to apply:**` line. Lets future-Claude judge edge cases instead of blindly following.

**Do NOT save:** code patterns/conventions/file paths (derivable), git history (authoritative), debugging recipes (in code), ephemeral task state (TodoWrite's job).

**Stale memory is dangerous.** Capture time-of-write context. Before acting on a memory like "the URL is X" or "function Y exists", verify against current state.

**Hygiene:** `/anthropic-skills:consolidate-memory` skill does a reflective pass — merges duplicates, fixes stale facts. Run after major phases.

**User commands:**
- "Remember X" → saved.
- "Forget X" / "that's wrong" → found and removed/updated.
- "What do you remember?" → list from MEMORY.md.

## Lesson 11 — Multi-file features in one shot

By Phase 1 the muscle memory is real. The win: a clean design upfront made execution single-pass.

**Pattern that worked:**
1. Two `AskUserQuestion` choices nailed the contract (how many templates? retire old code?).
2. Schema-as-example: dummy data IS the schema; no separate types file. Templates infer shape by destructuring.
3. **One tool wave** for 10 file writes (data + 2 template pairs + registry + picker + page rewrite), one wave for delete + build.
4. Zero build errors first try — vs Phase 0's 3 iterations — because the design was nailed before any code.

**The takeaway:** spend time on schema/contract decisions before code. Edits to a wrong design are expensive; edits to a right design are mechanical. Use plan mode or focused `AskUserQuestion`s, not freestyling.

**Counter-rule:** don't over-engineer the schema for hypothetical future fields. Add only what the templates and dummy data actually need today. YAGNI applies even to type definitions.

**Demo in this repo:** `src/data/dummyResume.em.js` as schema-by-example, `src/templates/Modern/` + `Traditional/` both consume `{ resume }` prop, `src/templates/index.js` registry indexed by key. Adding a 3rd template = one new file pair + one registry entry. Cost: ~5 minutes.

## Lesson 12 — State, forms, and the dummy-fallback pattern

**The architectural choice that earns its keep:**

Don't gate the preview behind "user has entered data." Always render the merged result: `merged = userPartial ⊕ dummy`. Empty user fields fall through to dummy. The preview is *never* blank, and the editor labels each section as `dummy` or filled so the user knows what's theirs.

**Three pieces:**
1. **Hook owns state + persistence + merge.** `useResume()` returns `{ user, setUser, merged, isDummy, reset }`. Components don't touch localStorage or merge logic directly — separation of concerns.
2. **Editor reads user, writes through setUser.** Controlled inputs only. Each field's `value` binds to `user.section.field || ''`; onChange dispatches a merge.
3. **Templates always consume merged.** Templates don't know whether data is user-supplied or dummy. That's the editor's concern.

**Why this beats alternatives:**
- "Show forms first, preview after submit" → bad UX, user can't see effect of their changes.
- "Replace dummy on first edit" → bad: clearing one field shows blank instead of falling back.
- "Empty state shows placeholders in preview" → looks broken; recruiters seeing the live page wouldn't know it's editable.

**Persistence pattern that's simple and good:**
- Version your localStorage key (`resume-builder.user-data.v1`). When the schema breaks compatibility, bump to `v2` and migrate.
- Wrap `JSON.parse` and `localStorage.setItem` in try/catch — private mode, quota, corruption are all real.
- Merge loaded data with `EMPTY` to handle new fields added since the user last saved.

**Deferred on purpose:** Experience editing (array of objects with nested achievements array) is the hardest section to scaffold cleanly. Built a placeholder, deferred the real impl. **Lesson:** ship the 4 easy sections to validate the pattern, then tackle the hard one with the pattern proven.

**Files in this repo:** `src/hooks/useResume.js`, `src/components/ResumeEditor/`, `src/pages/ResumeBuilder/index.jsx` (rewritten as split-view).

## Lesson 13 — Slash commands & custom skills

A **skill** is named, reusable instructions. Triggered by `/<name>` typed by you, OR auto-matched from your natural-language request via the skill's description.

**Two locations:**
| Where | Scope |
|---|---|
| `.claude/skills/<name>/SKILL.md` | Project-only (lives in the repo) |
| `~/.claude/skills/<name>/SKILL.md` | All your projects |

**`SKILL.md` shape:**
```markdown
---
name: <slug>
description: <when to trigger, what it does, when NOT to trigger>
---
<instructions Claude follows when the skill is invoked>
```

**The description is the trigger.** Vague description = never matches. Good description includes example phrases and explicit skip cases:
> "Triggers on phrases like 'add a Compact template'. Skip when editing an existing template — use Edit directly."

**Rule of thumb for *when* to invest:**
- If you'd give the same instructions 3+ times across sessions → skill.
- One-off task → just ask directly. Skill overhead isn't worth it.
- Complex skill with bundled scripts/evals → use `/anthropic-skills:skill-creator` to author it.

**Demo done in this repo:** `.claude/skills/add-template/SKILL.md` — scaffolds new resume templates (jsx + scss + registry entry). Invoke `/add-template <Name>` or say "add a Compact template."

**As a user, develop the instinct:** when you find yourself typing the same setup for similar tasks, that's a signal. Pause, write a skill, then keep going.

## Lesson 15 — settings.json (permissions + hooks)

`.claude/settings.json` configures the Claude Code harness for THIS project. Two main sections:

### Permissions allowlist

Pre-approve common commands so Claude doesn't prompt every time. Pattern matching uses prefix + glob:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm install*)",
      "Bash(npm run build*)",
      "Bash(git -C /Users/you/project status*)"
    ],
    "deny": [
      "Bash(git push*)",
      "Bash(npm publish*)"
    ]
  }
}
```

**The trade-off:**
- Too permissive → security risk (Claude can run anything matching).
- Too restrictive → friction (prompt fatigue, slower work).
- **Sweet spot:** allow read-only commands and locally-scoped writes; deny anything that touches the network, force-writes, or publishes.

**Rule of thumb for `allow`:**
- Read-only: `ls`, `find`, `grep`, `git status/log/diff/show`, `curl` to localhost.
- Locally-scoped writes: `npm install`, `npm run *`, `git add`, `git commit`.
- Whatever you're doing 5+ times per session.

**Rule of thumb for `deny`:**
- Network mutations: `git push`, `npm publish`, deploy scripts.
- Catastrophic ops: `rm -rf /`, `rm -rf ~`.
- Anything you'd want a second look at even if Claude is right.

### Hooks (mentioned, not configured in this project)

Run shell commands automatically on events: `PreToolUse`, `PostToolUse`, `SessionStart`, `Stop`. Useful for: auto-format on save, inject env vars, lint after edits, send notifications.

Sample shape:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "echo 'edit done'" }
        ]
      }
    ]
  }
}
```

**When to write a hook:** when an automation should run **every time** an event happens, not just when you remember. Otherwise: just ask Claude.

**Skills that help with this:**
- `/update-config` — guided config editing.
- `/fewer-permission-prompts` — scans your transcripts and proposes allowlist entries.

**Settings file scopes:**
| Path | Scope |
|---|---|
| `.claude/settings.json` | Project — committed to repo |
| `.claude/settings.local.json` | Project — gitignored, your overrides |
| `~/.claude/settings.json` | User — all projects |

**Demo in this repo:** `.claude/settings.json` — allowlist covers npm scripts and local git ops; deny list blocks push/publish/destructive rm. No hooks configured.

## Berlin templates (using the `/add-template` skill pattern)

Two new templates landed via the same pattern `/add-template` would have produced:

- **`Berlin · Modern`** ([src/templates/BerlinModern](src/templates/BerlinModern)) — Notion/Linear-style minimal. Sans-serif system stack, gray-on-white, chip-style skills. One-page-optimized typography. Good for product-led Berlin scale-ups (Trade Republic, N26 style).
- **`Berlin · Startup`** ([src/templates/BerlinStartup](src/templates/BerlinStartup)) — Bold gradient header card, accent-pink section dividers, gradient chips for leadership/technical skills, gray chips for domains. Energetic, brand-forward. Good for early-stage / DTC fintech.

Both consume the same `{ resume }` prop. Adding them = 4 new files + 2 lines in `src/templates/index.js`. Cost: ~10 minutes including SCSS polish. **This is the value of the template contract** — adding a new look doesn't touch the schema, the editor, or any other template.

## Lesson 16 — MCP browser tools (and the gotchas)

**What MCP gives you.** External tool servers exposing capabilities to Claude. Browser ones (`mcp__Claude_Preview__*`, `mcp__Claude_in_Chrome__*`) drive a real browser — navigate, click, screenshot, run JS in page context. Closes the loop on UI changes without you being the verification path.

**Tools you'll actually use:**
| Tool | For |
|---|---|
| `preview_start` | Boot a dev server from `.claude/launch.json` |
| `preview_list` | Get the serverId of a running server |
| `preview_screenshot` | Visual snapshot (JPEG) |
| `preview_click` | CSS-selector click; triggers real DOM events / React handlers |
| `preview_eval` | JS in page context for DOM queries, navigation, state asserts |
| `preview_inspect` | Read computed CSS — more reliable than screenshots for color/font checks |

**`.claude/launch.json` format:**
```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "<id>", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 5173 }
  ]
}
```

**Gotcha #1 — session CWD scoping.** Every MCP tool resolves paths relative to where the Claude Code session was launched. A session opened inside a stale worktree will preview *that worktree's* code, not master's, even if you've been editing master via absolute paths. **Demoed in this repo:** preview from a worktree on commit `a48b771` served the pre-Phase-1 build complete with old hardcoded data, while master had Phase 2 changes uncommitted.

**Fix:** the working tree the preview server sees must match the code you intend to verify. Options:
- Commit pending changes so worktree's branch catches up.
- Launch Claude Code from the directory whose code you actually want to preview.

**Gotcha #2 — runtime environment.** `preview_start` spawns commands via the user's shell env. Quirks like a broken `PATH` (we hit this — Node v10 ahead of v24) cause cryptic errors deep in `vite`. Wrap with a normalized PATH in `runtimeArgs`:
```json
"runtimeExecutable": "/bin/bash",
"runtimeArgs": ["-c", "export PATH=\"$HOME/.nvm/versions/node/v24.14.1/bin:$PATH\" && npm run dev"]
```
Use `$HOME` not literal usernames. Better long-term: fix your shell so the right Node is in `PATH` by default.

**Gotcha #3 — screenshots embed page content into the conversation.** For any UI that might surface personal data, prefer `preview_eval` (DOM queries, asserts) over `preview_screenshot`. If a page shows your real name, email, or address even briefly, the screenshot persists in the transcript.

**Rule of thumb for when to use browser MCP:**
- ✅ Verifying UI changes that landed in the running build.
- ✅ Asserting DOM state programmatically after an interaction.
- ✅ Catching regressions that don't fail the type check / build.
- ❌ For pages that may render sensitive data — use `preview_eval` to check specific selectors instead.
- ❌ Before the running build matches your intended state — verify the server is serving what you think first.

## Lesson 17 — Background, looping, and scheduled tasks

Three different "not synchronous" mechanisms — pick by *where* the work should live, not by *what* it does.

| Tool | Where it lives | Use when |
|---|---|---|
| `Bash(run_in_background: true)` | Current session | One-shot long-running cmd you'll revisit (dev servers, watch builds) |
| `/loop <interval> <cmd>` | Current session | Recurring polling while you're working |
| `/schedule` / `CronCreate` | **Remote** Anthropic infra | Recurring job that should fire whether or not Claude Code is open |
| Hooks (`PostToolUse` etc.) | Current session, event-driven | Automation triggered by an event (save, build, commit), not a clock |
| `ScheduleWakeup` | Current session | Pause-and-resume — Claude rewakes itself after a delay |

**Mental model:** `/loop` is for the duration of *your sitting at the desk*. `/schedule` is for the duration of *the world existing without you*. Hooks are for *events I care about, whenever they happen*.

**Anti-patterns:**
- Using `/loop` when the right trigger is an event → use a **hook**.
- Using `/schedule` for a one-off task → use `ScheduleWakeup` or just ask Claude later.
- Stacking `sleep` loops in Bash to "poll" → use `Monitor` or `run_in_background` with notifications.

**Cost note:** `/schedule` runs on Anthropic's infrastructure and bills each tick. Don't schedule a poll every minute when daily would do.

---

## Curriculum complete — what to do from here

You've shipped the full Lesson 1–17 curriculum AND a working resume-builder rebuild (deps, templates, forms, dummy fallback, persistence, custom skill). The patterns that matter from here:

1. **Plan mode for non-trivial work.** Cheap revision beats expensive undo.
2. **One in-progress todo at a time.** Don't drift.
3. **Hooks > loops > polling.** Pick the right trigger.
4. **Memory captures *why*, not what.** Code already says what.
5. **Skills earn their keep when you'd repeat the same instructions 3+ times.**
6. **Verify before you trust the screenshot.** Running build ≠ working tree.
7. **Never put personal paths in committed files.** Use `.local.json` for local-only.

The repo itself has two real follow-ups if you want them: Phase 3 print pagination polish, and the Experience editor UX (currently functional but minimal — could add reorder, duplicate, expand/collapse per job).





