# Stack Research

**Domain:** Interactive MKDocs documentation/learning site with progress tracking
**Project:** ML Engineer Roadmap
**Researched:** 2026-03-08
**Confidence:** HIGH

## Context: MKDocs Ecosystem Status (March 2026)

Material for MkDocs entered **maintenance mode** on 2025-11-11 (version 9.7.0). The creator's new project, Zensical, is intended as the successor. Critical facts:

- **MkDocs core** has been unmaintained since August 2024 (last release: 1.6.1)
- **Material for MkDocs** receives critical bug fixes and security patches until at least November 2026
- **Zensical** is at version 0.0.24 (pre-1.0, not production-ready, plugin ecosystem still being rebuilt)

**Recommendation: Use MkDocs + Material for MkDocs 9.7.x.** It is battle-tested, feature-complete, has excellent documentation, and its maintenance window covers our build timeline. Zensical is too immature (0.0.x versioning, incomplete module system, limited plugin support). When Zensical reaches 1.0, migration is designed to be straightforward (reads `mkdocs.yml` natively). There is zero urgency to adopt Zensical now. **Confidence: HIGH.**

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Python | 3.12.x or 3.13.x | Runtime for MkDocs and all plugins | 3.12 is mature/stable; 3.13 also supported. Avoid 3.14 (too new, potential compatibility issues with plugins). pymdown-extensions requires >=3.9. **Confidence: HIGH** |
| MkDocs | 1.6.1 | Static site generator core | Only version available; last release Aug 2024. Stable and proven despite being unmaintained. Material for MkDocs handles all the heavy lifting on top of it. **Confidence: HIGH** |
| mkdocs-material | 9.7.4 | Theme framework, navigation, search, styling | The de facto standard MkDocs theme. Version 9.7.x includes ALL previously Insiders-only features (social cards, blog, tags, privacy, optimize). Massive community (20k+ GitHub stars). **Confidence: HIGH** |
| pymdown-extensions | 10.21 | Markdown extensions (tabs, admonitions, task lists, code highlighting, math) | Required by Material for MkDocs. Provides the rich Markdown syntax that makes learning content interactive and well-structured. **Confidence: HIGH** |
| Pygments | 2.19.2 | Syntax highlighting for code blocks | Auto-installed with mkdocs-material. Powers all code block rendering. Essential for an ML roadmap with Python/code examples. **Confidence: HIGH** |

### Progress Tracking Stack (Client-Side)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vanilla JavaScript (ES6+) | N/A | Progress tracking logic, checkbox persistence, progress bars | No framework needed. Custom JS via `extra_javascript` in mkdocs.yml. Material for MkDocs provides `document$` RxJS observable for instant-loading-safe JS execution. localStorage API is native to all browsers. **Confidence: HIGH** |
| localStorage API | Browser native | Persist checkbox/completion state | Zero-backend, works offline, privacy-friendly, no GDPR concerns. Key schema: `{page_path}:{section}:{item_index}`. **Confidence: HIGH** |
| CSS Custom Properties | Browser native | Progress bar styling, dynamic visual feedback | Use Material's CSS custom properties for consistent theming across light/dark modes. **Confidence: HIGH** |

### Markdown Extensions (mkdocs.yml Configuration)

| Extension | Purpose | Why Essential for This Project |
|-----------|---------|-------------------------------|
| `admonition` | Note/warning/tip callout boxes | Teaching moments, prerequisites, key concepts. Table stakes for learning content. |
| `pymdownx.details` | Collapsible content sections | Hide optional deep-dives, solutions to exercises, additional resources. Reduces overwhelm. |
| `pymdownx.tabbed` | Content tabs | Show same concept in different contexts (e.g., TensorFlow vs PyTorch code). |
| `pymdownx.tasklist` | Checkbox task lists | Foundation for progress tracking. `custom_checkbox: true` enables styled checkboxes. |
| `pymdownx.superfences` | Enhanced code blocks + Mermaid diagrams | Code examples with highlighting + ML pipeline/architecture diagrams. Mermaid is built-in (no plugin needed). |
| `pymdownx.highlight` | Syntax highlighting configuration | Python, bash, YAML code examples throughout the roadmap. |
| `pymdownx.arithmatex` | Math equation rendering | ML requires math: linear algebra, calculus, probability notation. Integrates with MathJax or KaTeX. |
| `attr_list` | Custom HTML attributes on Markdown elements | Needed for custom CSS classes on progress elements, buttons, badges. |
| `md_in_html` | Markdown inside HTML blocks | Required for custom layout blocks (progress containers, hero sections). |
| `def_list` | Definition lists | Glossary terms, concept definitions throughout the roadmap. |
| `toc` | Table of contents with permalinks | Per-page navigation. Essential for long learning pages. |
| `pymdownx.emoji` | Icons and emoji | Visual indicators (checkmarks, warning signs, difficulty levels). Uses Material's Twemoji integration. |
| `pymdownx.keys` | Keyboard key rendering | Useful for tool shortcuts (Jupyter, VS Code). |
| `pymdownx.snippets` | Include content from other files | Reuse common blocks (prerequisites, standard disclaimers) across pages. |
| `abbr` | Abbreviation tooltips | Define ML jargon once, hover-explain everywhere. |
| `footnotes` | Reference footnotes | Citations to papers, courses, books. |

### Math Rendering

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| MathJax 3 (via CDN) | Render LaTeX math notation | Broader LaTeX support than KaTeX. ML content needs wide symbol coverage (matrices, gradients, loss functions). Slightly slower than KaTeX but supports more commands. Integrated via `pymdownx.arithmatex` + custom JS file using `document$` observable. **Confidence: HIGH** |

**KaTeX alternative:** Faster rendering but narrower LaTeX support. Use only if page load performance with many equations becomes measurable problem. For an ML roadmap, MathJax's broader compatibility wins.

### Supporting MkDocs Plugins

| Plugin | Version | Purpose | When to Use |
|--------|---------|---------|-------------|
| `search` (built-in) | Built-in | Full-text search across all pages | Always. Zero-config, works offline. **Confidence: HIGH** |
| `tags` (built-in) | Built-in | Categorize pages by topic (NLP, CV, MLOps, etc.) | Tag each roadmap page for cross-cutting discovery. Helps learners find related content across specializations. **Confidence: HIGH** |
| `social` (built-in) | Built-in | Auto-generate social cards (Open Graph images) | Enable for GitHub/Twitter sharing. Auto-generates preview images from page titles. **Confidence: MEDIUM** |
| `privacy` (built-in) | Built-in | Self-host external assets (fonts, CDN resources) | Enable if GDPR compliance needed or to eliminate external CDN dependencies for offline use. **Confidence: MEDIUM** |
| `mkdocs-glightbox` | 0.4.x | Image lightbox (zoom effect) | Use for ML diagrams, architecture images, paper figures that benefit from full-screen viewing. **Confidence: MEDIUM** |
| `mkdocs-minify-plugin` | 0.8.0 | Minify HTML/CSS/JS output | Enable for production builds. Reduces page size. **Confidence: MEDIUM** |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `mkdocs serve` | Local development server with hot reload | Built-in. Run `mkdocs serve` for live preview at localhost:8000. Auto-reloads on file changes. |
| `venv` / `uv` | Python virtual environment | Isolate project dependencies. Use `uv` if available (faster than pip), otherwise standard `venv`. |
| `requirements.txt` / `pyproject.toml` | Dependency pinning | Pin exact versions for reproducible builds. `pip freeze > requirements.txt` after initial setup. |
| GitHub Actions | CI/CD deployment to GitHub Pages | Official workflow provided by Material for MkDocs. Triggers on push to main, deploys to gh-pages branch. |

### Theme Features to Enable

| Feature | mkdocs.yml Key | Purpose |
|---------|---------------|---------|
| Instant loading | `navigation.instant` | SPA-like navigation, no full page reloads. Critical for progress tracking JS to persist across navigations. |
| Instant prefetch | `navigation.instant.prefetch` | Prefetch pages on hover for perceived speed. |
| Navigation tabs | `navigation.tabs` | Top-level sections (Foundations, Core ML, Deep Learning, Specializations, MLOps) as header tabs. |
| Sticky tabs | `navigation.tabs.sticky` | Tabs stay visible while scrolling. |
| Navigation sections | `navigation.sections` | Group sidebar items under section headers. |
| Section index pages | `navigation.indexes` | Section landing pages with overview + progress dashboard. |
| Back-to-top | `navigation.top` | Quick scroll-to-top button on long pages. |
| Table of contents following | `toc.follow` | TOC sidebar highlights current section while scrolling. |
| Navigation path | `navigation.path` | Breadcrumb trail showing position in roadmap hierarchy. |
| Navigation pruning | `navigation.prune` | Reduce rendered HTML size by only rendering visible nav items. |
| Dark/light toggle | `palette` with toggle | Respect user preference, toggle between light (default) and dark (slate) modes. |
| Search highlighting | `search.highlight` | Highlight search terms on target pages. |
| Search suggestions | `search.suggest` | Auto-complete search suggestions. |

---

## Installation

```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Core (installs mkdocs, pymdown-extensions, pygments automatically)
pip install mkdocs-material==9.7.4

# Optional plugins
pip install mkdocs-glightbox==0.4.0
pip install mkdocs-minify-plugin==0.8.0

# Pin versions for reproducibility
pip freeze > requirements.txt
```

**Alternative with uv (faster):**
```bash
uv venv
source .venv/bin/activate
uv pip install mkdocs-material==9.7.4 mkdocs-glightbox==0.4.0 mkdocs-minify-plugin==0.8.0
uv pip freeze > requirements.txt
```

---

## Minimal mkdocs.yml Skeleton

```yaml
site_name: ML Engineer Roadmap
site_url: https://username.github.io/ml-roadmap/
site_description: A comprehensive, opinionated study roadmap for ML engineers

theme:
  name: material
  custom_dir: overrides
  features:
    - navigation.instant
    - navigation.instant.prefetch
    - navigation.tabs
    - navigation.tabs.sticky
    - navigation.sections
    - navigation.indexes
    - navigation.top
    - navigation.path
    - navigation.prune
    - toc.follow
    - search.highlight
    - search.suggest
    - content.code.copy
    - content.tabs.link
  palette:
    - scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-4
        name: Switch to light mode

markdown_extensions:
  - abbr
  - admonition
  - attr_list
  - def_list
  - footnotes
  - md_in_html
  - tables
  - toc:
      permalink: true
  - pymdownx.arithmatex:
      generic: true
  - pymdownx.betterem
  - pymdownx.caret
  - pymdownx.mark
  - pymdownx.tilde
  - pymdownx.details
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - pymdownx.highlight:
      anchor_linenums: true
      use_pygments: true
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.keys
  - pymdownx.smartsymbols
  - pymdownx.snippets
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true

plugins:
  - search
  - tags
  - social
  - minify:
      minify_html: true
  - glightbox

extra_javascript:
  - javascripts/mathjax.js
  - https://unpkg.com/mathjax@3/es5/tex-mml-chtml.js
  - javascripts/progress.js

extra_css:
  - stylesheets/extra.css
```

---

## Custom JavaScript Architecture (Progress Tracking)

### File: `docs/javascripts/progress.js`

Key design decisions:

1. **Use `document$` observable** (not `DOMContentLoaded`) — Material for MkDocs uses instant loading; standard DOM events don't fire on SPA navigations. The `document$` observable from Material's RxJS integration fires on every page transition.

2. **localStorage key schema:** `ml-roadmap::{page_path}::{item_id}` — namespaced to avoid collision with other sites on same domain.

3. **Checkbox state persistence:** Query all `.task-list-item input[type=checkbox]` on page load, restore state from localStorage, attach change listeners to persist on click.

4. **Progress bar calculation:** Count checked items per section, render percentage in a custom CSS progress bar element injected via theme override or custom JS.

5. **Overall progress:** Aggregate completion across all pages, display on index/landing pages.

### File: `docs/javascripts/mathjax.js`

Standard MathJax configuration with `document$` integration for instant loading compatibility.

### File: `docs/stylesheets/extra.css`

Custom styles for progress bars, completion badges, difficulty indicators, and any visual elements beyond Material's built-in styling.

### Directory: `overrides/`

Theme overrides directory for extending base templates. Use `overrides/main.html` to inject progress tracking UI into page layout via Jinja2 block extensions.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| MkDocs + Material 9.7.x | Zensical 0.0.x | Only when Zensical reaches 1.0+ and module ecosystem matures. Currently too unstable (0.0.x) with incomplete plugin support. Migration path exists (reads mkdocs.yml natively) so switching later is low-risk. |
| MkDocs + Material | Docusaurus (React-based) | If you need heavy client-side interactivity (SPAs, complex state management). Overkill for a learning roadmap. Requires Node.js ecosystem, not Python-native. |
| MkDocs + Material | Hugo | If build speed is critical (thousands of pages). Hugo is faster but has no equivalent to Material's feature set. No Python ecosystem alignment for ML audience. |
| MkDocs + Material | Sphinx + Furo | If generating API documentation from Python docstrings. Sphinx is more powerful for API docs but worse for narrative content. Steeper learning curve. |
| MkDocs + Material | VitePress / Starlight | If targeting web developers who prefer Vue/Astro. Wrong audience for an ML roadmap. |
| Vanilla JS + localStorage | React/Vue for progress | If progress tracking logic becomes extremely complex (unlikely). For checkbox persistence + progress bars, vanilla JS is simpler, has zero bundle overhead, and avoids framework lock-in on a static site. |
| MathJax 3 | KaTeX | If rendering speed for math-heavy pages is measurably slow. KaTeX renders faster but supports fewer LaTeX commands. Start with MathJax; switch to KaTeX only with measured evidence of perf issues. |
| `mkdocs serve` | Docker (squidfunk/mkdocs-material) | If team members have Python environment issues. Docker provides identical environments but adds complexity for solo projects. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Zensical (today) | Pre-1.0 (v0.0.24), incomplete module system, limited plugin support, API still evolving. Starting a project on it now means absorbing breaking changes. | MkDocs + Material 9.7.x. Migrate to Zensical later when it stabilizes. |
| mkdocs-mermaid2-plugin | Unnecessary. Material for MkDocs has built-in Mermaid support via `pymdownx.superfences` custom fences. Adding this plugin creates conflicts and redundancy. | Built-in Mermaid via `pymdownx.superfences` configuration. |
| React/Vue/Svelte for progress tracking | Massive overkill for checkbox persistence on a static site. Adds build complexity, bundle size, and maintenance burden. | Vanilla JavaScript with `document$` observable. |
| Backend database for progress | Out of scope per PROJECT.md. Adds hosting costs, auth complexity, GDPR obligations, and maintenance burden for marginal benefit. | localStorage (client-side, zero infrastructure). |
| mkdocs-material Insiders | No longer exists as a separate tier. All Insiders features were merged into the free version in 9.7.0. Paying for Insiders sponsorship now supports Zensical development, not Material for MkDocs. | mkdocs-material 9.7.x (free, includes everything). |
| `pymdownx.magiclink` | Not officially supported/recommended by Material for MkDocs. Standard Markdown links suffice. | Standard `[text](url)` Markdown links. |
| `mkdocs-git-revision-date-plugin` | Adds git dependency to build process, slows CI builds, and "last updated" dates add marginal value for a learning roadmap. | Omit, or add manual dates in frontmatter if needed. |

---

## Stack Patterns by Variant

**If math content is minimal (few equations):**
- Skip MathJax entirely
- Render simple formulas as inline code or images
- Reduces page load time and external CDN dependency

**If math content is heavy (linear algebra, calculus sections):**
- Use MathJax 3 via CDN with `document$` integration
- Consider self-hosting MathJax via `privacy` plugin for offline support
- Add `pymdownx.arithmatex` with `generic: true`

**If deploying to custom domain (not GitHub Pages):**
- Same stack, different `site_url` in mkdocs.yml
- Can use Netlify/Cloudflare Pages instead of GitHub Pages
- Same build command: `mkdocs build`

**If content grows beyond 500 pages:**
- Enable `navigation.prune` (reduces HTML by 33%+)
- Enable `mkdocs-minify-plugin`
- Consider `privacy` plugin to self-host fonts (reduce CDN calls)
- Monitor build times; if slow, evaluate Zensical migration at that point

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| mkdocs-material 9.7.x | MkDocs 1.6.x | Material handles MkDocs compatibility internally. Pin Material version, not MkDocs separately. |
| mkdocs-material 9.7.x | pymdown-extensions 10.x | Auto-installed as dependency. Don't install separately unless pinning a specific version. |
| mkdocs-material 9.7.x | Python 3.9 - 3.13 | pymdown-extensions 10.21 requires >=3.9. Use Python 3.12.x for safest compatibility. |
| mkdocs-material 9.7.x | Pygments 2.x | Auto-installed. No known compatibility issues. |
| mkdocs-glightbox 0.4.x | mkdocs-material 9.x | Compatible. Enable after Material is configured. |
| mkdocs-minify-plugin 0.8.x | mkdocs-material 9.x | Compatible. Add last in plugin list. |
| MathJax 3.x (CDN) | pymdownx.arithmatex | Use `generic: true` mode. Works with instant loading via `document$`. |

---

## GitHub Actions Deployment

```yaml
# .github/workflows/ci.yml
name: ci
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: ~/.cache
          restore-keys: |
            mkdocs-material-
      - run: pip install -r requirements.txt
      - run: mkdocs gh-deploy --force
```

---

## Sources

- [mkdocs-material PyPI](https://pypi.org/project/mkdocs-material/) — Version 9.7.4 confirmed (released 2026-03-03). **HIGH confidence.**
- [MkDocs PyPI](https://pypi.org/project/mkdocs/) — Version 1.6.1 confirmed (released 2024-08-30). **HIGH confidence.**
- [pymdown-extensions PyPI](https://pypi.org/project/pymdown-extensions/) — Version 10.21 confirmed (released 2026-02-15). **HIGH confidence.**
- [Pygments PyPI](https://pypi.org/project/Pygments/) — Version 2.19.2 confirmed (released 2025-06-21). **HIGH confidence.**
- [Material for MkDocs Customization Docs](https://squidfunk.github.io/mkdocs-material/customization/) — `document$` observable, extra_javascript, theme overrides. **HIGH confidence.**
- [Material for MkDocs Extensions Docs](https://squidfunk.github.io/mkdocs-material/setup/extensions/python-markdown-extensions/) — Full extension configuration. **HIGH confidence.**
- [Material for MkDocs Navigation Docs](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/) — All navigation features. **HIGH confidence.**
- [Material for MkDocs Publishing Docs](https://squidfunk.github.io/mkdocs-material/publishing-your-site/) — GitHub Actions workflow. **HIGH confidence.**
- [Material for MkDocs Built-in Plugins](https://squidfunk.github.io/mkdocs-material/plugins/) — Plugin list and capabilities. **HIGH confidence.**
- [Material for MkDocs Math Reference](https://squidfunk.github.io/mkdocs-material/reference/math/) — MathJax/KaTeX configuration. **HIGH confidence.**
- [Material for MkDocs Insiders Announcement](https://squidfunk.github.io/mkdocs-material/blog/2025/11/11/insiders-now-free-for-everyone/) — Maintenance mode details, 12-month support window. **HIGH confidence.**
- [Zensical GitHub](https://github.com/zensical/zensical) — v0.0.24, pre-1.0 status confirmed. **HIGH confidence.**
- [Zensical Announcement Blog](https://squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/) — Migration path, maturity assessment. **HIGH confidence.**
- [GitHub Discussion #5235](https://github.com/squidfunk/mkdocs-material/discussions/5235) — localStorage checkbox persistence pattern. **MEDIUM confidence** (community source).
- [CodePen: Checkbox Progress Bar](https://codepen.io/kccnma/pen/BaBLZqY) — localStorage + progress bar implementation pattern. **MEDIUM confidence** (community source).
- [mkdocs-minify-plugin PyPI](https://pypi.org/project/mkdocs-minify-plugin/) — Version 0.8.0 confirmed. **HIGH confidence.**
- [mkdocs-glightbox GitHub](https://github.com/blueswen/mkdocs-glightbox) — Image lightbox plugin. **HIGH confidence.**

---
*Stack research for: ML Engineer Roadmap (Interactive MKDocs Learning Site)*
*Researched: 2026-03-08*
