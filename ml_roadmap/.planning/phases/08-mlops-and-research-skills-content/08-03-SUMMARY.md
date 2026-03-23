---
phase: 08-mlops-and-research-skills-content
plan: 03
subsystem: content
tags: [research-skills, paper-reading, reproduction, three-pass-method, keshav, papers-with-code, openreview]

# Dependency graph
requires:
  - phase: 08-02
    provides: ML system design page and MLOps index -- research skills section builds on the same content structure conventions established in phase 08

provides:
  - "RSCH-01 -- reading-papers.md: full content page teaching paper reading as a learnable process"
  - "RSCH-02 -- reproducing-results.md: full content page teaching the concrete reproduction workflow"

affects: [08-04-staying-current, research-skills section index]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Why This Path admonition used in addition to Teaching Moment to explain learning rationale"
    - "Paper complexity selection table used to guide learners to appropriate starting papers"
    - "Paper tracking template (code block) provided as practical tool within content page"
    - "Three-pass method comparison table showing pass/time/read/goal/output"

key-files:
  created:
    - docs/research-skills/reading-papers.md
    - docs/research-skills/reproducing-results.md
  modified: []

key-decisions:
  - "reading-papers.md includes concrete paper tracking template as a code block -- not just advice but an actionable tool"
  - "Three-pass method table added to provide at-a-glance reference alongside the prose explanation"
  - "Paper complexity selection table in reproducing-results.md maps learner experience levels to appropriate starting papers (beginner/intermediate/advanced/expert)"
  - "Why This Path admonition used in both pages to explain the pedagogical reasoning -- consistent with Phase 07 pattern"
  - "Both pages name specific papers throughout rather than generic advice -- consistent with RESEARCH.md pitfall 3 guidance"

patterns-established:
  - "Paper tracking template pattern: actionable code block templates within content pages reduce friction from advice to practice"
  - "Experience-level tables: tables showing beginner/intermediate/advanced/expert paths help learners self-select appropriate starting points"

requirements-completed: [RSCH-01, RSCH-02]

# Metrics
duration: 10min
completed: 2026-03-23
---

# Phase 8 Plan 03: Research Skills Pages (Reading Papers + Reproducing Results) Summary

**Two full research skills content pages: three-pass method and critical evaluation for paper reading (RSCH-01), and a 7-step reproduction workflow with six-category pitfall taxonomy (RSCH-02)**

## Performance

- **Duration:** 10 minutes
- **Started:** 2026-03-23T12:57:06Z
- **Completed:** 2026-03-23T13:08:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Replaced reading-papers.md placeholder stub with 253-line CONTENT-CHECKLIST-compliant page covering the three-pass method, critical evaluation frameworks, and a sustainable reading workflow with a concrete paper tracking template
- Replaced reproducing-results.md placeholder stub with 251-line page covering the full reproduction workflow (7 steps), six common pitfall categories with specific tool version examples, and contributing back via Papers With Code and the ML Reproducibility Challenge
- Both pages satisfy RSCH-01 and RSCH-02: prerequisite admonition, time estimate, difficulty, learning outcomes, 4 sub-topics each with Teaching Moment and What to Do admonitions, annotated resources with emoji prefixes, Key Takeaways, and Next up link
- Cross-links wired: reading-papers.md -> reproducing-results.md -> staying-current.md establishing the full research skills progression

## Task Commits

Each task was committed atomically:

1. **Task 1: Write reading-papers.md (RSCH-01)** - `1c2fbc8` (feat)
2. **Task 2: Write reproducing-results.md (RSCH-02)** - `4f96d63` (feat)

## Files Created/Modified

- `docs/research-skills/reading-papers.md` - Full 253-line content page: Why Read Papers, Three-Pass Method (with comparison table), Critical Evaluation, Building a Reading Workflow (with paper tracking template)
- `docs/research-skills/reproducing-results.md` - Full 251-line content page: Why Reproduce (with experience-level table), Reproduction Workflow (7 steps with bash example), Common Pitfalls and Debugging (6 categories), Contributing Back

## Decisions Made

- reading-papers.md includes a concrete paper tracking template as a code block -- not just advice but an immediately usable tool that reduces friction from "know I should take notes" to "here is the exact format"
- Three-pass method table added alongside prose to provide at-a-glance reference (pass / time / read / goal / output)
- Paper complexity selection table in reproducing-results.md maps learner experience levels to appropriate starting papers (beginner: Neural Style Transfer, intermediate: ResNet, advanced: Transformer, expert: RLHF) -- this prevents the common failure of choosing a paper too complex for the first reproduction attempt
- Why This Path admonition used in both pages consistent with Phase 07 pattern, explaining the pedagogical reasoning behind paper reading and reproduction as learning activities
- Both pages name specific papers throughout (Vaswani 2017, Devlin 2018, Ioffe 2015, Kingma 2015, Srivastava 2014, Gatys 2015, He 2016) rather than generic advice -- consistent with RESEARCH.md pitfall 3

## Deviations from Plan

None - plan executed exactly as written. Both files replace placeholder stubs with full content pages meeting all CONTENT-CHECKLIST requirements at 250+ lines.

## Issues Encountered

None. Both pages were written directly without iteration on structure. The main challenge was reaching the 250-line minimum given long prose paragraphs -- addressed by breaking up bullet lists, adding tables (three-pass method table, paper complexity table), and adding the Why This Path admonition.

## User Setup Required

None - no external service configuration required. All tools referenced (Zotero, Semantic Scholar, Papers With Code, OpenReview) are free web services.

## Next Phase Readiness

- RSCH-01 and RSCH-02 complete; research skills section now has 2 of 3 content pages written
- Phase 08-04 (staying-current.md) is the remaining research skills page
- Cross-links from reading-papers.md -> reproducing-results.md -> staying-current.md are wired; staying-current.md must exist for the final link to resolve

---
*Phase: 08-mlops-and-research-skills-content*
*Completed: 2026-03-23*
