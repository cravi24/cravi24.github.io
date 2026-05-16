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





