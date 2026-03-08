# Project Research Summary

**Project:** ML Engineer Roadmap
**Domain:** Interactive Educational Documentation Site (MKDocs + Material)
**Researched:** 2026-03-08
**Confidence:** HIGH

## Executive Summary

The ML Engineer Roadmap is a static documentation site built with MKDocs and Material for MKDocs 9.7.x, delivering a curated learning path from ML foundations to production-ready skills. The technology stack is mature, battle-tested, and requires minimal custom engineering -- the vast majority of needed features (search, dark mode, responsive layout, code highlighting, math rendering, navigation tabs) ship built-in with Material for MKDocs. The only non-trivial custom engineering is the client-side progress tracking system (vanilla JavaScript + localStorage), which follows documented community patterns. This is fundamentally a **content curation and information architecture project** with a thin technical layer on top.

The recommended approach is to build the site skeleton and establish the content template first, then implement progress tracking, then fill in content section by section. The content template -- the "Teach + Link" hybrid format with learning outcomes, brief explanations, action items, and curated resource links -- is the product's core differentiator and must be enforced from the first page written. The architecture research confirms that content phases are parallelizable once the template is established, making the project well-suited to incremental delivery.

The primary risks are content-side, not technical. The top three threats are: (1) the site devolving into a link dump without teaching context, which destroys the core value proposition; (2) a flat navigation structure that recreates the decision paralysis the project exists to solve; and (3) localStorage progress data loss eroding user trust, particularly on Safari which aggressively evicts script-written storage. All three are preventable with upfront structural decisions rather than retroactive fixes. The technical stack carries almost no risk -- MKDocs + Material 9.7.x is a known quantity with HIGH confidence across all sources.

## Key Findings

### Recommended Stack

The stack centers on **mkdocs-material 9.7.4** (released 2026-03-03), which auto-installs MKDocs 1.6.1, pymdown-extensions 10.21, and Pygments 2.19.2. Material for MKDocs entered maintenance mode in November 2025 but receives security patches through at least November 2026, covering the entire build timeline. The successor project Zensical is at v0.0.24 and not production-ready; migration later is low-risk since Zensical reads `mkdocs.yml` natively.

**Core technologies:**
- **mkdocs-material 9.7.4**: Theme, navigation, search, all UI features -- the de facto standard with 20K+ GitHub stars
- **pymdownx extensions**: Task lists (progress tracking foundation), tabbed content, math rendering, Mermaid diagrams, syntax highlighting
- **Vanilla JavaScript + localStorage**: Progress tracking with zero backend, using Material's `document$` RxJS observable for instant-loading compatibility
- **MathJax 3 via CDN**: LaTeX rendering for ML math notation -- broader symbol support than KaTeX, necessary for matrices, gradients, loss functions
- **GitHub Actions + GitHub Pages**: CI/CD deployment with official Material workflow template

**Critical version requirement:** Python 3.12.x for safest plugin compatibility (3.13 also works; avoid 3.14).

### Expected Features

**Must have (table stakes):**
- Clear linear learning path with structured sequence -- the core value proposition
- Curated resource links per topic with free-first prioritization
- Search, dark mode, responsive design, code blocks with syntax highlighting (all built-in)
- Math equation rendering (KaTeX/MathJax -- one-time config)
- Learning outcomes and action items per section
- Admonitions for tips, warnings, prerequisites
- Clean navigation with tabs and sidebar sections
- Prerequisites stated on landing page and per section

**Should have (differentiators):**
- Visual progress tracking via localStorage checkboxes (no account required) -- the key UX differentiator vs. roadmap.sh and Odin Project which require login
- Progress bars showing per-section completion percentages
- "Teach + Link" hybrid content format (not a link dump, not a full course)
- Core path vs. specialization visual distinction with badges/tags
- Mermaid diagrams for topic dependency visualization
- Time estimates and difficulty indicators per section
- MLOps integrated into core path (not a separate track)
- Opinionated "one path" consolidation of roadmap.sh + Andrew Ng + fast.ai + Stanford

**Defer (v2+):**
- Overall completion dashboard page
- PWA offline support
- JSON progress export/import (though PITFALLS research argues this should ship with progress tracking -- see gaps below)
- Community contribution guide
- Anki deck integration

### Architecture Approach

The architecture is a four-layer static system: Presentation (Material theme with tabs/sidebar), Content (Markdown pages in a hierarchical directory structure), Behavior (two focused JS modules for progress tracking and dashboard aggregation), and Storage (browser localStorage). The `mkdocs.yml` file is the architectural spine -- it defines navigation hierarchy, plugins, extensions, and theme features. The project structure mirrors the nav hierarchy 1:1 (each top-level folder = one nav tab), with section `index.md` files serving as both overview pages and progress aggregation points.

**Major components:**
1. **MKDocs Config** (`mkdocs.yml`) -- single source of truth for site structure, navigation, plugins, extensions
2. **Markdown Content** (`docs/**/*.md`) -- all learning content following the Teach-then-Link template with front matter tags
3. **Progress JS** (`docs/javascripts/progress.js`) -- checkbox state persistence via `document$` observable + localStorage
4. **Dashboard JS** (`docs/javascripts/dashboard.js`) -- aggregates checkbox state into per-section and overall progress bars
5. **Theme Overrides** (`overrides/`) -- Jinja2 template extensions for progress UI injection
6. **Custom CSS** (`docs/stylesheets/extra.css`) -- progress bars, core/optional visual distinction, badges

### Critical Pitfalls

1. **Link dump without teaching content** -- Enforce the Teach+Link page template from day one: learning outcomes, concept explanation, action items, then curated links. If a page has more links than paragraphs of original writing, it is not done. This is the single highest-risk pitfall because it undermines the entire value proposition.

2. **Flat navigation that overwhelms** -- Use strict two-tier structure: Core Path tabs (Foundations, Core ML, Deep Learning, MLOps) visible by default, Specializations grouped under a single tab. Visual markers (tags, badges, icons) must make the core/optional distinction impossible to miss.

3. **localStorage data loss** -- Wrap all storage operations in try/catch, display a notice that progress is browser-local, and build export/import from JSON. Test Safari specifically for its 7-day ITP eviction policy. Store progress as a single structured JSON object rather than hundreds of individual keys.

4. **Theory-first ordering that kills motivation** -- Adopt "motivation-first" structure: the first section should include a hands-on quick win (train a simple model). Introduce math only after learners have seen what it enables. The fast.ai top-down approach is the proven model.

5. **Instant loading breaks custom JavaScript** -- All custom JS must use `document$.subscribe()`, not `DOMContentLoaded` or `window.onload`. This is the most common JS bug in MKDocs Material sites (documented in issues #5816, #6196, #6954). Must be verified by clicking through pages, not just refreshing.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Project Skeleton and Configuration

**Rationale:** All other work depends on the site being buildable and navigable. The `mkdocs.yml` configuration is the architectural spine. Navigation hierarchy must encode the core-vs-optional distinction before any content is written.
**Delivers:** A running MKDocs site with full navigation tabs, sidebar structure, theme configuration, all extensions enabled, empty section index pages, and working `mkdocs serve`.
**Addresses:** Clean navigation (table stakes), dark mode (built-in), responsive design (built-in), search (built-in)
**Avoids:** Flat navigation pitfall -- the structure is decided upfront, not emergent from content

### Phase 2: Content Template and First Section

**Rationale:** The Teach+Link content format is the product's core differentiator. A template must be established and validated on one complete section before scaling content authoring. The Foundations section is the natural first candidate because every learner starts here.
**Delivers:** A fully styled content template (learning outcomes, concept explanations, action items, resource tables), custom CSS for badges/admonitions, and the complete Foundations section as the reference implementation.
**Addresses:** Teach+Link format (differentiator), learning outcomes (table stakes), action items (table stakes), code blocks and math rendering (table stakes)
**Avoids:** Link dump pitfall -- the template enforces teaching content before links. Theory-first pitfall -- Foundations section should open with a quick-win hands-on exercise before diving into math.

### Phase 3: Progress Tracking System

**Rationale:** Depends on Phase 1 (site running) and Phase 2 (task lists exist in content to track). The progress tracking system is the primary interactive feature and the key UX differentiator. It must be designed before content scales because the localStorage key schema and task list format must be consistent across all pages.
**Delivers:** `progress.js` with checkbox persistence, `extra.css` progress bar styling, working progress on the Foundations section.
**Uses:** Vanilla JS, `document$` observable, localStorage API, `pymdownx.tasklist` with `custom_checkbox: true`
**Avoids:** Instant loading JS breakage -- uses `document$` from the start. localStorage data loss -- implements try/catch, single JSON object storage, and clear user-facing notice about browser-local storage.

### Phase 4: Core Content Sections

**Rationale:** With the template proven and progress tracking working, content authoring scales. Core ML, Deep Learning, and MLOps sections are the meat of the roadmap. These are parallelizable -- each section is an independent set of Markdown files following the established template.
**Delivers:** Core ML section, Deep Learning section, MLOps section, Research Skills section -- the complete core path.
**Addresses:** Opinionated "one path" consolidation (primary differentiator), MLOps integrated into core path (differentiator), curated resource links (table stakes)
**Avoids:** Link dump pitfall -- every page follows the template. Resource rot -- each resource link includes type, cost, time, and version metadata.

### Phase 5: Progress Dashboard and Section Aggregation

**Rationale:** Depends on Phase 3 (progress tracking) and Phase 4 (enough content to make a dashboard meaningful). The dashboard aggregates checkbox state across all sections into visual progress bars on index pages and a dedicated progress overview page.
**Delivers:** `dashboard.js`, progress dashboard page, section index pages with progress bars, overall completion percentage.
**Addresses:** Progress bars (differentiator), "you are here" orientation (UX)

### Phase 6: Specializations and Projects

**Rationale:** Optional content comes after the core path is complete. Specializations (NLP, CV, Recommender Systems, RL) and project suggestions are valuable but not on the critical path. These are parallelizable.
**Delivers:** All specialization branches, beginner/intermediate/capstone project pages, core-vs-optional visual styling.
**Addresses:** Specialization branches (differentiator), core vs. optional distinction (differentiator), difficulty indicators (nice-to-have)

### Phase 7: Landing Page, Polish, and Deployment

**Rationale:** The landing page needs to reference all completed content. Cross-linking, tag verification, time estimates, and the "How to Use" guide require the full content to exist. Deployment is the final step.
**Delivers:** Landing page with roadmap overview, "How to Use" guide, GitHub Actions CI/CD, link checking in CI, final deployment to GitHub Pages.
**Addresses:** Prerequisites stated (table stakes), time estimates (differentiator), automated link checking (prevents resource rot pitfall)
**Avoids:** GitHub Pages deployment pitfall -- `site_url` configured correctly before first deploy

### Phase Ordering Rationale

- **Phase 1 before everything:** The `mkdocs.yml` nav structure is the skeleton. Writing content without it means restructuring later.
- **Phase 2 before scaling content:** The page template prevents the link dump pitfall. One validated section is worth more than ten inconsistent ones.
- **Phase 3 before Phase 4:** The localStorage key schema and task list conventions must be locked before content scales, otherwise retrofitting is painful.
- **Phases 4/5/6 partially parallelizable:** Content sections are independent Markdown files. Dashboard development can overlap with late content authoring.
- **Phase 7 last:** Landing page and deployment require all content to exist for accurate overview and link verification.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Progress Tracking):** The localStorage key schema design, Safari ITP eviction behavior, and export/import architecture need careful specification. The community pattern from Discussion #5235 is a starting point but the single-JSON-object approach recommended by PITFALLS research diverges from the per-key approach in ARCHITECTURE research -- this tension needs resolution.
- **Phase 2 (Content Template):** The "motivation-first" ordering for the Foundations section (quick win before math) requires deciding exactly which exercise comes first and how much math is deferred. This is a pedagogical design decision, not a technical one.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Skeleton):** MKDocs + Material setup is thoroughly documented with exact config provided in STACK.md.
- **Phase 7 (Deployment):** GitHub Actions workflow template is provided verbatim in STACK.md. Standard pattern.
- **Phase 5 (Dashboard):** Straightforward DOM manipulation + localStorage reads. Well-scoped.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against PyPI. Material for MkDocs 9.7.x is stable and feature-complete. Maintenance window covers build timeline. Sources are official docs and package registries. |
| Features | HIGH | Competitor analysis covers 6+ major alternatives (roadmap.sh, fast.ai, Odin Project, Coursera, Stanford, GitHub roadmaps). Feature priorities are well-grounded in market analysis. |
| Architecture | HIGH | Patterns are proven (Material for MKDocs official docs, community implementations). localStorage approach is simple and well-understood. Build order is dependency-driven. |
| Pitfalls | HIGH | Pitfalls sourced from documented GitHub issues (#5235, #5816, #6196, #7683, #4678), MDN Web Docs, and community evidence. Recovery strategies included. |

**Overall confidence:** HIGH

### Gaps to Address

- **Export/import timing:** FEATURES.md places JSON export/import in v1.x (after validation), but PITFALLS.md argues it must ship with initial progress tracking to prevent data loss. **Recommendation: side with PITFALLS. Build export/import as part of Phase 3, not deferred.** The cost is low (simple JSON serialization) and the trust risk of data loss is high.
- **Single JSON object vs. per-key localStorage:** ARCHITECTURE.md uses per-checkbox individual keys (`mlroadmap:{path}:{index}`), while PITFALLS.md recommends a single JSON object for easier export/import and atomic updates. **Recommendation: use the single JSON object approach.** It simplifies export/import, avoids key proliferation, and allows atomic progress snapshots. Resolve this in Phase 3 planning.
- **MathJax vs. KaTeX:** STACK.md recommends MathJax 3 for broader LaTeX support. FEATURES.md mentions KaTeX for speed. **Recommendation: start with MathJax 3 as STACK.md suggests.** ML content needs wide symbol coverage. Switch to KaTeX only if measurable performance issues arise.
- **Content ordering within Foundations:** The "motivation-first" approach (PITFALLS) vs. traditional math-first ordering needs a concrete decision: what is the first hands-on exercise? This is a content design question to resolve during Phase 2 planning.
- **Safari ITP localStorage eviction:** The 7-day eviction policy for script-written localStorage is documented but the exact behavior with `document$`-driven writes needs testing. Plan a Safari-specific test during Phase 3.

## Sources

### Primary (HIGH confidence)
- [mkdocs-material PyPI](https://pypi.org/project/mkdocs-material/) -- v9.7.4 confirmed, 2026-03-03
- [MkDocs PyPI](https://pypi.org/project/mkdocs/) -- v1.6.1, last release 2024-08-30
- [Material for MkDocs Official Documentation](https://squidfunk.github.io/mkdocs-material/) -- navigation, customization, extensions, plugins, deployment
- [Material for MkDocs Insiders Announcement](https://squidfunk.github.io/mkdocs-material/blog/2025/11/11/insiders-now-free-for-everyone/) -- maintenance mode, support window
- [Zensical GitHub](https://github.com/zensical/zensical) -- v0.0.24, pre-1.0 status
- [MDN Web Docs - Storage Quotas and Eviction](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) -- Safari ITP behavior

### Secondary (MEDIUM confidence)
- [MkDocs Material Discussion #5235](https://github.com/squidfunk/mkdocs-material/discussions/5235) -- localStorage checkbox persistence pattern
- [MkDocs Material Issues #5816, #6196, #6954](https://github.com/squidfunk/mkdocs-material/issues/5816) -- instant loading JS compatibility
- [developer-roadmap Issue #7683](https://github.com/kamranahmedse/developer-roadmap/issues/7683) -- broken links in AI/ML roadmaps
- [roadmap.sh](https://roadmap.sh/machine-learning), [fast.ai](https://course.fast.ai/), [The Odin Project](https://www.theodinproject.com/) -- competitor analysis
- [CodePen: Checkbox Progress Bar](https://codepen.io/kccnma/pen/BaBLZqY) -- localStorage + progress bar implementation pattern

### Tertiary (LOW confidence)
- Content ordering ("motivation-first") -- based on fast.ai methodology and general pedagogy research, not empirically validated for this specific curriculum structure

---
*Research completed: 2026-03-08*
*Ready for roadmap: yes*
