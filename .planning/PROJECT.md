# ML Engineer Roadmap

## What This Is

A comprehensive, opinionated study roadmap for becoming a great ML engineer — consolidating the best existing roadmaps (roadmap.sh, Andrew Ng's courses, fast.ai, Stanford CS229/CS231n, and others) into one definitive path. Delivered as a polished MKDocs site with interactive progress tracking, deployable on GitHub Pages. For programmers who already know Python.

## Core Value

Eliminate decision paralysis — one curated, well-structured path that a learner can commit to and follow from ML foundations through to being job-ready, capable of shipping ML products, and research-literate.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Consolidate popular ML roadmaps into one opinionated study plan
- [ ] Clear core path from foundations to advanced (never overwhelming)
- [ ] Optional specialization branches (NLP, CV, recommender systems, etc.) clearly marked
- [ ] MLOps/deployment section covering production ML skills
- [ ] Research skills section (reading papers, reproducing results)
- [ ] Teach + link format: brief explanations, key concepts, teaching moments, then curated resource links
- [ ] Free-first resources with paid alternatives noted when significantly better
- [ ] Action points at each step — what the learner should do
- [ ] Learning outcomes at each step — what the learner should know by the end
- [ ] Guidelines and teaching moments woven throughout
- [ ] Visual progress tracking per section (localStorage-based, no backend)
- [ ] Interactive progress bars showing completion
- [ ] MKDocs site with clean navigation and structure
- [ ] Deployable on GitHub Pages
- [ ] Well-structured so full spectrum content doesn't confuse users

### Out of Scope

- Backend/database for progress tracking — localStorage only
- Video content creation — curate existing videos, don't create new ones
- Mobile app — web-first, responsive design sufficient
- Paid/premium tier — all content freely accessible
- Community features (forums, comments) — this is a static site

## Context

- Target audience: programmers who know Python, no ML/math background required
- The problem: dozens of ML roadmaps exist (roadmap.sh, various GitHub repos, course sequences) but none are authoritative enough to just follow — learners waste time comparing instead of learning
- Popular sources to consolidate: roadmap.sh ML path, Andrew Ng's ML/DL specializations, fast.ai practical deep learning, Stanford CS229/CS231n/CS224n, Hands-On ML book, various GitHub awesome-lists
- The site should feel like a mentor guiding you, not a link dump or a textbook
- Structure must make it obvious what's core (everyone does this) vs. optional (pick your specialization)
- MKDocs chosen for its simplicity, Markdown-based authoring, and easy GitHub Pages deployment

## Constraints

- **Tech stack**: MKDocs with Material theme — proven, feature-rich, well-documented
- **Content format**: Markdown only — no custom CMS, easy to maintain and contribute to
- **Progress tracking**: Client-side only (localStorage + JS) — no backend infrastructure
- **Resources**: Must be verifiable and current — no broken links or outdated courses
- **Hosting**: GitHub Pages compatible — static site only

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| MKDocs over other SSGs | Markdown-native, Material theme has built-in search/nav, Python ecosystem fits ML audience | — Pending |
| localStorage for progress | No backend needed, works offline, zero hosting cost, privacy-friendly | — Pending |
| Free-first resource curation | Accessibility matters — everyone should be able to follow regardless of budget | — Pending |
| Teach + link over pure curation | Brief explanations add context and teaching moments, links provide depth — best of both worlds | — Pending |
| Core path + optional branches | Full spectrum without overwhelm — clear visual distinction between required and optional | — Pending |

---
*Last updated: 2026-03-08 after initialization*
