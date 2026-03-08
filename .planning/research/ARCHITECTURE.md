# Architecture Research

**Domain:** ML Learning Roadmap -- MKDocs Static Site with Progress Tracking
**Researched:** 2026-03-08
**Confidence:** HIGH

## System Overview

```
+-----------------------------------------------------------------------+
|                        Presentation Layer                             |
|  +-------------+  +-------------+  +--------------+  +-------------+ |
|  | Nav Tabs    |  | Sidebar     |  | Content Page |  | Progress    | |
|  | (top-level  |  | (section    |  | (markdown    |  | Dashboard   | |
|  |  sections)  |  |  nav tree)  |  |  rendered)   |  | (overview)  | |
|  +------+------+  +------+------+  +------+-------+  +------+------+ |
|         |                |                |                  |        |
+---------|----------------|----------------|------------------+--------+
|                        Content Layer                                  |
|  +------------------+  +------------------+  +---------------------+ |
|  | Markdown Pages   |  | MKDocs Config    |  | Theme Overrides     | |
|  | (docs/**/*.md)   |  | (mkdocs.yml)     |  | (overrides/)        | |
|  +------------------+  +------------------+  +---------------------+ |
|                                                                       |
+-----------------------------------------------------------------------+
|                        Behavior Layer                                 |
|  +------------------+  +------------------+  +---------------------+ |
|  | progress.js      |  | dashboard.js     |  | extra.css           | |
|  | (checkbox state   |  | (aggregate stats |  | (progress bars,    | |
|  |  per page)       |  |  across sections)|  |  custom styling)    | |
|  +--------+---------+  +--------+---------+  +---------------------+ |
|           |                      |                                    |
+-----------+----------------------+------------------------------------+
|                        Storage Layer                                  |
|  +----------------------------------------------------------------+  |
|  |                   localStorage (browser)                       |  |
|  |  Key: "mlroadmap:{section}:{page}:{item_id}"                  |  |
|  |  Value: boolean (checked/unchecked)                            |  |
|  +----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

## Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **MKDocs Config** (`mkdocs.yml`) | Defines site structure, nav hierarchy, plugins, extensions, theme features | YAML config file -- single source of truth for site skeleton |
| **Navigation Tabs** | Top-level content sections (Foundations, Core ML, Deep Learning, etc.) | `navigation.tabs` + `navigation.tabs.sticky` in theme features |
| **Sidebar** | Section-level navigation within each tab -- topic tree | Auto-generated from `nav:` config + directory structure |
| **Markdown Pages** (`docs/**/*.md`) | All learning content: explanations, action items, resource links, task lists | Markdown files with front matter, admonitions, task lists |
| **Progress JS Module** (`docs/javascripts/progress.js`) | Intercepts task list checkbox clicks, persists state to localStorage, restores state on page load | Custom JS subscribing to `document$` observable |
| **Dashboard JS Module** (`docs/javascripts/dashboard.js`) | Reads all localStorage keys, computes per-section and overall completion percentages, renders progress bars | Custom JS that aggregates checkbox state across pages |
| **Custom CSS** (`docs/stylesheets/extra.css`) | Progress bar styling, visual distinction between core/optional paths, custom admonition types | CSS file referenced via `extra_css` |
| **Theme Overrides** (`overrides/`) | Template-level customizations (footer with progress summary, custom page template for dashboard) | Jinja2 templates extending `base.html` |
| **Tags Plugin** | Categorizes pages as `core-path`, `specialization`, `project`, `optional` | Built-in Material tags plugin with front matter tags |
| **localStorage** | Persists all progress data client-side | Browser Web Storage API, no backend |

## Recommended Project Structure

```
ml-engineer-roadmap/
+-- mkdocs.yml                      # Site config, nav, plugins, extensions
+-- docs/
|   +-- index.md                    # Landing page / home
|   +-- how-to-use.md              # Guide: how to use this roadmap
|   +-- progress.md                # Progress dashboard page
|   +-- stylesheets/
|   |   +-- extra.css              # Custom styles (progress bars, path markers)
|   +-- javascripts/
|   |   +-- progress.js            # Checkbox persistence logic
|   |   +-- dashboard.js           # Progress aggregation + rendering
|   +-- foundations/
|   |   +-- index.md               # Section overview + section progress bar
|   |   +-- math-essentials.md
|   |   +-- statistics.md
|   |   +-- python-for-ml.md
|   |   +-- numpy-pandas.md
|   |   +-- data-visualization.md
|   +-- core-ml/
|   |   +-- index.md
|   |   +-- supervised-learning.md
|   |   +-- unsupervised-learning.md
|   |   +-- model-evaluation.md
|   |   +-- feature-engineering.md
|   |   +-- ml-workflow.md
|   +-- deep-learning/
|   |   +-- index.md
|   |   +-- neural-networks.md
|   |   +-- cnns.md
|   |   +-- rnns-sequences.md
|   |   +-- transformers-attention.md
|   |   +-- training-practices.md
|   +-- mlops/
|   |   +-- index.md
|   |   +-- experiment-tracking.md
|   |   +-- model-deployment.md
|   |   +-- containerization.md
|   |   +-- monitoring-drift.md
|   |   +-- ci-cd-ml.md
|   +-- specializations/              # Optional branches
|   |   +-- index.md                  # Overview of specialization paths
|   |   +-- nlp/
|   |   |   +-- index.md
|   |   |   +-- text-preprocessing.md
|   |   |   +-- language-models.md
|   |   |   +-- llms-transformers.md
|   |   +-- computer-vision/
|   |   |   +-- index.md
|   |   |   +-- image-classification.md
|   |   |   +-- object-detection.md
|   |   |   +-- generative-models.md
|   |   +-- recommender-systems/
|   |   |   +-- index.md
|   |   |   +-- collaborative-filtering.md
|   |   |   +-- content-based.md
|   |   +-- reinforcement-learning/
|   |       +-- index.md
|   |       +-- fundamentals.md
|   |       +-- deep-rl.md
|   +-- research-skills/
|   |   +-- index.md
|   |   +-- reading-papers.md
|   |   +-- reproducing-results.md
|   |   +-- experiment-design.md
|   +-- projects/
|       +-- index.md
|       +-- beginner-projects.md
|       +-- intermediate-projects.md
|       +-- capstone-projects.md
+-- overrides/
    +-- main.html                    # Block overrides (e.g., footer progress)
    +-- partials/                    # Partial template overrides if needed
```

### Structure Rationale

- **`docs/` mirrors the nav hierarchy:** Each top-level folder becomes a nav tab. Each file within becomes a sidebar entry. This 1:1 mapping keeps mental model simple.
- **`index.md` in every section:** Enables `navigation.indexes` feature -- section landing pages that show overview + section progress bar before diving into topics.
- **`javascripts/` and `stylesheets/` inside `docs/`:** MKDocs serves these as static assets via `extra_javascript` and `extra_css` config. No build step required.
- **`overrides/` at project root:** MKDocs Material convention for theme extension. Keeps template customizations separate from content.
- **`specializations/` nested one level deeper:** Visually and structurally separates optional content from the core path. Tags reinforce this distinction.
- **`projects/` section separate from theory sections:** Action-oriented content gets its own top-level tab so learners can find hands-on work easily.

## Architectural Patterns

### Pattern 1: Checkbox-as-Progress via Task Lists

**What:** Use Markdown task lists (`- [ ] item`) as the atomic unit of progress tracking. Each checkbox represents one learnable action item (watch video, read chapter, complete exercise). Custom JS persists checkbox state to localStorage.

**When to use:** Every content page that has action items the learner should complete.

**Trade-offs:** Simple to author (just Markdown), no build step, works with MKDocs Material's `pymdownx.tasklist` extension natively. Downside: localStorage is per-browser, per-domain -- no cross-device sync.

**Implementation:**

```yaml
# mkdocs.yml
markdown_extensions:
  - pymdownx.tasklist:
      custom_checkbox: true
      clickable_checkbox: true
```

```javascript
// docs/javascripts/progress.js
// Subscribe to Material's document$ observable for instant-loading compatibility
document$.subscribe(function() {
  const pageKey = window.location.pathname;
  const checkboxes = document.querySelectorAll('.task-list-item input[type="checkbox"]');

  checkboxes.forEach(function(cb, index) {
    const storageKey = 'mlroadmap:' + pageKey + ':' + index;

    // Restore state
    if (localStorage.getItem(storageKey) === 'true') {
      cb.checked = true;
    }

    // Persist state on change
    cb.addEventListener('change', function() {
      localStorage.setItem(storageKey, cb.checked);
      // Trigger progress bar update
      updatePageProgress();
    });
  });
});
```

### Pattern 2: Section Index Pages as Progress Aggregators

**What:** Each section's `index.md` page serves dual purpose: (1) overview of what the section covers and learning outcomes, (2) a progress summary showing how many items the learner has completed across all pages in that section. The dashboard JS reads localStorage keys matching the section prefix and renders a progress bar.

**When to use:** Every section index page.

**Trade-offs:** Gives learners a sense of accomplishment and orientation. Requires the dashboard JS to scan localStorage keys by prefix, which is fast for hundreds of items but would need optimization for thousands.

### Pattern 3: Core vs. Optional Path Distinction via Tags + Visual Markers

**What:** Every content page gets front matter tags (`core-path` or `specialization`) and a visual marker (custom admonition or badge). Navigation uses `navigation.tabs` where core sections are always visible and specializations are grouped under one tab.

**When to use:** All content pages.

**Trade-offs:** Tags enable filtering and search. Visual markers prevent learners from feeling overwhelmed by optional content. Requires discipline in tagging every page.

**Implementation:**

```yaml
# Front matter on a core page
---
tags:
  - core-path
  - supervised-learning
---
```

```yaml
# Front matter on a specialization page
---
tags:
  - specialization
  - nlp
---
```

### Pattern 4: Teach-then-Link Content Structure

**What:** Each topic page follows a consistent structure: (1) Learning Outcomes box, (2) Brief conceptual explanation with teaching moments, (3) Action items as task lists, (4) Curated resource links in a structured table. This is implemented using admonitions for outcomes, regular Markdown for explanations, task lists for actions, and data tables for resources.

**When to use:** Every topic page.

**Example page skeleton:**

```markdown
---
tags:
  - core-path
  - supervised-learning
---

# Supervised Learning

!!! success "Learning Outcomes"
    By the end of this section, you should be able to:

    - Explain the difference between classification and regression
    - Train a model using scikit-learn
    - Evaluate model performance with appropriate metrics

## What is Supervised Learning?

[2-3 paragraphs of clear explanation with teaching moments]

!!! tip "Key Insight"
    The most common beginner mistake is...

## Action Items

- [ ] Read Chapter 4 of Hands-On ML (estimated: 2 hours)
- [ ] Complete the scikit-learn classification tutorial
- [ ] Train a model on the Iris dataset and evaluate it
- [ ] Watch Andrew Ng's lecture on linear regression (45 min)

## Resources

| Resource | Type | Cost | Time | Notes |
|----------|------|------|------|-------|
| Hands-On ML Ch. 4 | Book | Free online | 2h | Best conceptual explanation |
| fast.ai Lesson 1 | Video | Free | 1.5h | Practical, top-down approach |
| CS229 Lecture 2 | Video | Free | 1.5h | Mathematical depth |
| Coursera ML Specialization | Course | Paid | 10h | Most structured path |
```

## Data Flow

### Progress Tracking Flow

```
[User clicks checkbox on content page]
    |
    v
[progress.js: change event listener fires]
    |
    v
[localStorage.setItem("mlroadmap:/core-ml/supervised-learning/:3", "true")]
    |
    v
[updatePageProgress() recounts checked vs total on current page]
    |
    v
[Page-level progress bar re-renders (e.g., "3/7 items complete")]
```

### Dashboard Aggregation Flow

```
[User navigates to section index or progress dashboard]
    |
    v
[dashboard.js: document$.subscribe fires]
    |
    v
[Scan localStorage keys matching "mlroadmap:{current-section}:*"]
    |
    v
[Count checked (value==="true") vs total keys per section]
    |
    v
[Render progress bars per section + overall percentage]
    |
    v
[Optional: render visual roadmap with color-coded completion]
```

### Key Data Flows

1. **Checkbox Persistence:** User interaction -> JS event -> localStorage write -> UI update. Unidirectional. No server involved.
2. **Progress Aggregation:** localStorage read -> key prefix scan -> percentage calculation -> DOM injection. Read-only scan, computed on page load.
3. **Navigation:** `mkdocs.yml` nav config -> MKDocs build -> static HTML with sidebar/tabs. No runtime computation. Navigation is baked at build time.
4. **Search:** MKDocs builds search index at build time. Tags are indexed. Instant loading preserves search index across page navigations.

## MKDocs Configuration Architecture

The `mkdocs.yml` file is the architectural spine. Here is the recommended configuration structure:

```yaml
# mkdocs.yml -- Architectural skeleton
site_name: ML Engineer Roadmap
site_url: https://username.github.io/ml-engineer-roadmap/

theme:
  name: material
  custom_dir: overrides
  features:
    - navigation.instant           # SPA-like page transitions
    - navigation.instant.progress  # Loading progress bar
    - navigation.tabs              # Top-level sections as tabs
    - navigation.tabs.sticky       # Tabs stay visible on scroll
    - navigation.sections          # Group second-level items
    - navigation.indexes           # Section index pages
    - navigation.top               # Back-to-top button
    - navigation.tracking          # URL updates with anchor
    - navigation.path              # Breadcrumbs
    - navigation.prune             # Reduce HTML size for large sites
    - search.suggest               # Search suggestions
    - search.highlight             # Highlight search terms
    - content.tabs.link            # Linked content tabs
    - toc.follow                   # TOC follows scroll

  palette:
    - scheme: default
      primary: indigo
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      primary: indigo
      toggle:
        icon: material/brightness-4
        name: Switch to light mode

plugins:
  - search
  - tags:
      tags_file: tags.md

markdown_extensions:
  - pymdownx.tasklist:
      custom_checkbox: true
      clickable_checkbox: true
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - attr_list
  - md_in_html
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - tables
  - toc:
      permalink: true

extra_css:
  - stylesheets/extra.css

extra_javascript:
  - javascripts/progress.js
  - javascripts/dashboard.js

nav:
  - Home:
    - index.md
    - How to Use: how-to-use.md
    - Your Progress: progress.md
  - Foundations:
    - foundations/index.md
    - Math Essentials: foundations/math-essentials.md
    - Statistics & Probability: foundations/statistics.md
    - Python for ML: foundations/python-for-ml.md
    - NumPy & Pandas: foundations/numpy-pandas.md
    - Data Visualization: foundations/data-visualization.md
  - Core ML:
    - core-ml/index.md
    - Supervised Learning: core-ml/supervised-learning.md
    - Unsupervised Learning: core-ml/unsupervised-learning.md
    - Model Evaluation: core-ml/model-evaluation.md
    - Feature Engineering: core-ml/feature-engineering.md
    - ML Workflow: core-ml/ml-workflow.md
  - Deep Learning:
    - deep-learning/index.md
    - Neural Networks: deep-learning/neural-networks.md
    - CNNs: deep-learning/cnns.md
    - RNNs & Sequences: deep-learning/rnns-sequences.md
    - Transformers & Attention: deep-learning/transformers-attention.md
    - Training Best Practices: deep-learning/training-practices.md
  - MLOps:
    - mlops/index.md
    - Experiment Tracking: mlops/experiment-tracking.md
    - Model Deployment: mlops/model-deployment.md
    - Containerization: mlops/containerization.md
    - Monitoring & Drift: mlops/monitoring-drift.md
    - CI/CD for ML: mlops/ci-cd-ml.md
  - Specializations:
    - specializations/index.md
    - NLP:
      - specializations/nlp/index.md
      - Text Preprocessing: specializations/nlp/text-preprocessing.md
      - Language Models: specializations/nlp/language-models.md
      - LLMs & Transformers: specializations/nlp/llms-transformers.md
    - Computer Vision:
      - specializations/computer-vision/index.md
      - Image Classification: specializations/computer-vision/image-classification.md
      - Object Detection: specializations/computer-vision/object-detection.md
      - Generative Models: specializations/computer-vision/generative-models.md
    - Recommender Systems:
      - specializations/recommender-systems/index.md
      - Collaborative Filtering: specializations/recommender-systems/collaborative-filtering.md
      - Content-Based: specializations/recommender-systems/content-based.md
    - Reinforcement Learning:
      - specializations/reinforcement-learning/index.md
      - RL Fundamentals: specializations/reinforcement-learning/fundamentals.md
      - Deep RL: specializations/reinforcement-learning/deep-rl.md
  - Research Skills:
    - research-skills/index.md
    - Reading Papers: research-skills/reading-papers.md
    - Reproducing Results: research-skills/reproducing-results.md
    - Experiment Design: research-skills/experiment-design.md
  - Projects:
    - projects/index.md
    - Beginner Projects: projects/beginner-projects.md
    - Intermediate Projects: projects/intermediate-projects.md
    - Capstone Projects: projects/capstone-projects.md
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 30-50 pages (initial) | Single `mkdocs.yml`, flat JS modules, straightforward localStorage keys. No optimization needed. |
| 50-150 pages (mature) | Enable `navigation.prune` to reduce HTML size. Consider splitting progress.js into per-section modules if performance degrades. localStorage scan remains fast (sub-millisecond for hundreds of keys). |
| 150+ pages (extensive) | Consider `mkdocs-monorepo-plugin` or Material's `projects` plugin to split into sub-sites. Progress tracking would need a shared localStorage namespace strategy. Unlikely to reach this scale for a learning roadmap. |

### Scaling Priorities

1. **First bottleneck: Content volume in nav.** If the sidebar becomes unwieldy, use `navigation.prune` and ensure section index pages provide orientation. Already addressed in recommended config.
2. **Second bottleneck: localStorage key proliferation.** At 50 pages with 10 checkboxes each = 500 keys. localStorage handles this easily (5MB limit = millions of small key-value pairs). Not a real concern for this project.

## Anti-Patterns

### Anti-Pattern 1: Flat Navigation Without Tabs

**What people do:** Put all 40+ pages in a single flat sidebar list.
**Why it's wrong:** Overwhelms learners. Contradicts the "never overwhelming" requirement. Learners cannot see where they are in the overall journey.
**Do this instead:** Use `navigation.tabs` for top-level sections (Foundations, Core ML, Deep Learning, etc.). Each tab reveals only its section's sidebar. Learners see one manageable chunk at a time.

### Anti-Pattern 2: Progress Tracking via Page-Level Metadata

**What people do:** Try to track "page complete" as a single boolean per page.
**Why it's wrong:** Too coarse. A page with 8 action items is not binary. Learners partially complete pages across sessions. Binary tracking discourages returning to finish.
**Do this instead:** Track at the checkbox/action-item level. Aggregate upward to page-level and section-level percentages. Each checkbox is an independent unit of progress.

### Anti-Pattern 3: Server-Side Progress or Databases

**What people do:** Reach for a backend database or API to store progress.
**Why it's wrong:** Violates the static-site constraint. Adds hosting complexity, cost, authentication requirements. Kills the "deploy to GitHub Pages" simplicity.
**Do this instead:** localStorage only. Accept the trade-off that progress is per-browser. Optionally add an export/import JSON feature later so users can backup their progress.

### Anti-Pattern 4: Mixing Core and Optional Content Without Visual Distinction

**What people do:** Interleave required and optional content in the same navigation level with no markers.
**Why it's wrong:** Learners cannot tell what is essential vs. optional. They either skip important things or burn out on optional depth.
**Do this instead:** Core path sections are top-level tabs. Specializations live under a single "Specializations" tab. Use tags (`core-path` vs `specialization`) and visual markers (admonition banners, badges) to reinforce the distinction on every page.

### Anti-Pattern 5: Link Dump Pages Without Teaching Context

**What people do:** Create pages that are just lists of links to external resources.
**Why it's wrong:** No different from an "awesome list" on GitHub. Provides no guidance, no teaching moments, no reason to use this roadmap over any other.
**Do this instead:** Follow the Teach-then-Link pattern (Pattern 4). Every page explains concepts briefly, provides key insights, then links to resources with structured metadata (type, cost, time, notes).

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | `mkdocs gh-deploy` CLI command | Builds and pushes to `gh-pages` branch. Zero config hosting. |
| GitHub Actions | CI workflow runs `mkdocs build` on push | Automate deployment. Use `actions/setup-python` + `pip install mkdocs-material`. |
| Google Analytics | `extra.analytics` config in mkdocs.yml | Optional. Material has built-in GA4 support. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Markdown content <-> progress.js | DOM: JS reads `.task-list-item` elements generated by `pymdownx.tasklist` | JS must subscribe to `document$` for instant-loading compatibility. Content authors write standard Markdown task lists -- no awareness of JS needed. |
| progress.js <-> localStorage | Web Storage API: `getItem`/`setItem` | Key naming convention (`mlroadmap:{path}:{index}`) is the contract. Must be consistent. |
| dashboard.js <-> localStorage | Web Storage API: key prefix scan via iteration | Dashboard reads but never writes. Unidirectional dependency. |
| dashboard.js <-> DOM | DOM injection: creates progress bar elements | Targets specific container elements (e.g., `#progress-dashboard` div) placed in Markdown pages via raw HTML or custom template blocks. |
| mkdocs.yml <-> theme overrides | Jinja2 template inheritance | `custom_dir: overrides` enables extending `base.html`. Overrides mirror original theme structure. |
| Tags plugin <-> front matter | YAML front matter `tags:` key | Every content page must include appropriate tags. `.meta.yml` can set defaults per directory. |

## Build Order (What Depends on What)

This is the recommended implementation sequence based on architectural dependencies:

```
Phase 1: Skeleton (no dependencies)
  +-- mkdocs.yml with nav structure, theme config, extensions
  +-- docs/ directory structure with empty index.md files
  +-- Basic theme config (palette, features)
  +-- Verify: `mkdocs serve` shows navigable empty site
      |
Phase 2: Content Foundation (depends on Phase 1)
  +-- Page template/pattern established (teach-then-link structure)
  +-- Foundations section content (first complete section)
  +-- extra.css for custom styling (progress bars, badges, admonitions)
  +-- Verify: one fully-styled section with consistent page structure
      |
Phase 3: Progress Tracking (depends on Phase 1 + Phase 2)
  +-- progress.js (checkbox persistence)
  +-- Task lists in content pages (already from Phase 2 pattern)
  +-- Verify: checkboxes persist across page reloads and navigation
      |
Phase 4: Dashboard (depends on Phase 3)
  +-- dashboard.js (aggregation logic)
  +-- Progress dashboard page (progress.md)
  +-- Section index pages with progress bars
  +-- Verify: dashboard shows accurate counts from localStorage
      |
Phase 5: Core Content (depends on Phase 2 pattern)
  +-- Core ML section content
  +-- Deep Learning section content
  +-- MLOps section content
  +-- Research Skills section content
  +-- Can be parallelized -- each section is independent
      |
Phase 6: Specializations (depends on Phase 2 pattern)
  +-- NLP content
  +-- Computer Vision content
  +-- Recommender Systems content
  +-- Reinforcement Learning content
  +-- Can be parallelized -- each specialization is independent
      |
Phase 7: Projects & Polish (depends on Phase 5)
  +-- Projects section with concrete project descriptions
  +-- Tags setup and verification
  +-- Landing page (index.md) with site overview
  +-- How-to-use guide
  +-- Cross-linking between related topics
      |
Phase 8: Deployment (depends on all above)
  +-- GitHub Actions workflow
  +-- gh-deploy verification
  +-- Link checking (broken link audit)
  +-- Final polish
```

**Critical path:** Phase 1 -> Phase 2 -> Phase 3 -> Phase 4. The progress tracking system must be designed before content is written at scale, because the task list format and key naming convention must be consistent from the start. Content phases (5, 6, 7) can run in parallel once the page template pattern is established in Phase 2.

## Sources

- [Material for MkDocs -- Official Documentation](https://squidfunk.github.io/mkdocs-material/)
- [Material for MkDocs -- Navigation Setup](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/)
- [Material for MkDocs -- Customization (JS/CSS/Overrides)](https://squidfunk.github.io/mkdocs-material/customization/)
- [Material for MkDocs -- Tags Plugin](https://squidfunk.github.io/mkdocs-material/setup/setting-up-tags/)
- [Material for MkDocs -- Reference Features](https://squidfunk.github.io/mkdocs-material/reference/)
- [Material for MkDocs -- Python Markdown Extensions](https://squidfunk.github.io/mkdocs-material/setup/extensions/python-markdown-extensions/)
- [MkDocs -- Writing Your Docs (nav configuration)](https://www.mkdocs.org/user-guide/writing-your-docs/)
- [MKDocs Material Discussion #5235 -- Persistent Checkbox State](https://github.com/squidfunk/mkdocs-material/discussions/5235)
- [roadmap.sh -- Machine Learning Roadmap](https://roadmap.sh/machine-learning) (content structure reference)
- [Codepen -- Checkbox List with Progress Bar and LocalStorage](https://codepen.io/kccnma/pen/BaBLZqY)

---
*Architecture research for: ML Engineer Roadmap MKDocs Site*
*Researched: 2026-03-08*
