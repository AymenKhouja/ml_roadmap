# Pitfalls Research

**Domain:** ML Engineer Learning Roadmap -- MKDocs Educational Site
**Researched:** 2026-03-08
**Confidence:** HIGH (multiple verified sources, community evidence, documented GitHub issues)

## Critical Pitfalls

### Pitfall 1: Link Dump Disguised as a Roadmap

**What goes wrong:**
The site becomes a glorified bookmark collection -- pages full of links to courses, videos, and articles with no explanatory context, no teaching moments, and no guidance on what the learner should actually do with each resource. Users bounce between external resources without understanding how they connect or what they should extract from each one.

**Why it happens:**
Curating links is dramatically easier than writing original teaching content. The project scope ("consolidate existing roadmaps") naturally pulls toward aggregation rather than synthesis. The temptation is to ship early with "just the links" and add context later -- but later never comes.

**How to avoid:**
Every page must follow the "Teach + Link" format from day one: brief explanations of key concepts, why this topic matters, what the learner should know by the end, concrete action points, and only then curated resource links. Write the teaching content first, add links second. If a page has more links than paragraphs of original content, it is not done.

**Warning signs:**
- Pages where the first element is a link or list of links rather than an explanation
- No "Learning Outcomes" or "Action Points" sections on topic pages
- Content review feels like scrolling through a bibliography
- Users report "I don't know where to start on this page"

**Phase to address:**
Content authoring phase -- establish the page template with mandatory sections (intro, key concepts, action points, learning outcomes) before any topic pages are written. Enforce the template in every content PR.

---

### Pitfall 2: Overwhelming Flat Structure -- No Clear Core vs. Optional Distinction

**What goes wrong:**
Every topic is presented at the same level of importance. A beginner lands on the site and sees NLP, Computer Vision, Recommender Systems, Reinforcement Learning, and MLOps all at once alongside fundamentals. They cannot tell what is required, what is optional, or what order to follow. The "decision paralysis" the project exists to solve is recreated inside the site itself.

**Why it happens:**
The completionist instinct: a roadmap "should" cover everything. Information architecture is treated as a content problem rather than a UX problem. Developers building the site already know what is foundational and what is specialized, so the navigation feels obvious to them but not to the target audience.

**How to avoid:**
Enforce a strict two-tier structure: **Core Path** (linear, everyone follows this) and **Specialization Branches** (optional, clearly marked). Use visual differentiation -- different icons, colors, sidebar grouping, or badges -- so the distinction is impossible to miss. The MKDocs Material theme supports navigation sections and icons; use them to separate core from optional content structurally, not just textually.

**Warning signs:**
- Sidebar navigation has more than 8-10 top-level items without grouping
- No visual indicator distinguishing required from optional content
- Users ask "what should I do first?" despite having the roadmap in front of them
- The landing page lists all topics without a clear starting point

**Phase to address:**
Site structure / information architecture phase -- before any content is written. The nav hierarchy in `mkdocs.yml` must encode the core-vs-optional distinction from the start.

---

### Pitfall 3: Resource Rot -- Broken and Outdated External Links

**What goes wrong:**
External course links break (Coursera restructures URLs, YouTube videos get deleted, GitHub repos go unmaintained). Worse, linked courses teach deprecated APIs: TensorFlow 1.x tutorials, old Keras standalone APIs, scikit-learn deprecated parameters, Python 2 code examples. The kamranahmedse/developer-roadmap project documented this exact failure -- most links under Mathematics, Statistics, EDA, MLOps, and Deep Learning sections broke, with all Coursera links broken simultaneously.

**Why it happens:**
The ML ecosystem moves faster than almost any other domain. Framework versions ship breaking changes annually. Course platforms restructure URLs without redirects. A roadmap curated in 2025 can have 20% broken or outdated links by 2027 if not actively maintained.

**How to avoid:**
1. Prefer resources with stable URL patterns (official documentation over third-party blog posts)
2. For each linked resource, record: URL, date added, framework version it targets, and a brief note on what it teaches
3. Implement automated link checking in CI (use `mkdocs-linkcheck` or a GitHub Action that runs weekly)
4. Prioritize free-first resources that are actively maintained (official docs, actively updated GitHub repos) over static content (old blog posts, one-off tutorials)
5. Always link to the latest edition/version of books and courses (e.g., Hands-On ML 3rd edition, not 2nd)
6. For each resource, include a "last verified" date in metadata or comments

**Warning signs:**
- No CI job checks external links
- Resources reference TensorFlow 1.x, standalone Keras (pre-integration), or Python 2
- Linked courses show "This course has been updated" banners
- Users file issues about broken links (the first one means there are many more)

**Phase to address:**
Content authoring phase (resource selection criteria) AND maintenance/CI phase (automated link checking). Must be addressed in both.

---

### Pitfall 4: localStorage Progress Tracking Data Loss

**What goes wrong:**
Users complete 60% of the roadmap over weeks, then lose all progress when they clear browser data, switch browsers, use private browsing, or when Safari's ITP auto-evicts data after 7 days of no visits. The user has no way to recover, export, or transfer their progress. This destroys trust and motivation.

**Why it happens:**
localStorage is chosen for simplicity (no backend), but its limitations are underestimated. Safari specifically evicts localStorage data created by scripts after 7 days without user interaction on the origin. Browser "clear data" dialogs wipe localStorage. There is no cross-browser sync. Users assume their progress is "saved" without understanding it is browser-local and ephemeral.

**How to avoid:**
1. Build an export/import feature from the start -- let users download their progress as a JSON file and restore it later. This is low-effort and eliminates the worst failure mode.
2. Display a clear, non-dismissible notice explaining that progress is stored locally in this browser only
3. Wrap all localStorage operations in try/catch for QuotaExceededError
4. Consider a simple progress key structure (e.g., `mlroadmap_progress` with a single JSON object) to minimize storage footprint and simplify export/import
5. Add a "last saved" timestamp visible to users so they can see their data is current
6. Test in Safari specifically -- its 7-day ITP eviction policy is the most aggressive

**Warning signs:**
- No export/import UI in the progress tracking feature
- No error handling around localStorage calls
- No user-facing explanation of where data is stored
- Safari not included in testing matrix
- Progress stored across many individual keys instead of one structured object

**Phase to address:**
Progress tracking implementation phase. The export/import feature is not a "nice to have" -- it must ship with the initial progress tracking implementation.

---

### Pitfall 5: Theory-First Ordering That Kills Motivation

**What goes wrong:**
The roadmap begins with weeks of linear algebra, calculus, probability, and statistics before the learner ever trains a model or sees a result. Learners drop off because they see no connection between eigenvalues and the ML career they are pursuing. The roadmap produces math students, not ML engineers.

**Why it happens:**
Traditional academic curricula go bottom-up: math foundations first, then algorithms, then applications. Many popular roadmaps (and the sources being consolidated) follow this academic ordering. The project's instinct is to "do it properly" by starting with prerequisites.

**How to avoid:**
Adopt a "motivation-first" structure: start with a quick win (train a simple model in the first section, even if the learner does not fully understand what is happening), then introduce math and theory as needed to explain what they just did. The fast.ai approach ("top-down") has proven this works. Structure the core path as: Quick Win -> Supervised Learning Basics -> Essential Math (just enough) -> Deep Learning -> More Math (as needed) -> Advanced Topics. Each theory section should follow a practical section that motivates it.

**Warning signs:**
- The first 3+ sections are purely mathematical with no code or hands-on exercises
- No "train your first model" moment in the first section
- Math sections lack concrete ML examples showing where the math is used
- Learners report the roadmap "starts slow" or "I gave up before getting to the ML part"

**Phase to address:**
Content ordering / learning path design phase. This is a structural decision that must be made before content is written -- retrofitting a top-down approach onto a bottom-up structure requires rewriting the entire sequence.

---

### Pitfall 6: Instant Loading Breaks Custom JavaScript

**What goes wrong:**
The progress tracking checkboxes, progress bars, and any custom interactive elements work on initial page load but break silently when users navigate between pages. Checkboxes stop persisting state, progress bars show stale data, and the UI appears functional but is not. This happens because MKDocs Material's instant loading feature uses XHR to swap page content without a full browser refresh, so `DOMContentLoaded` events never fire on subsequent navigations.

**Why it happens:**
Developers write JavaScript that initializes on `DOMContentLoaded` or `window.onload`, test it by refreshing pages, and assume it works. They do not realize that instant loading (enabled by default in Material theme) means subsequent page navigations are partial DOM swaps. This is well-documented in Material for MKDocs GitHub issues (#5816, #6196, #6954) but easy to miss.

**How to avoid:**
All custom JavaScript must use the `document$` RxJS observable exported by Material for MkDocs, not standard DOM events. The pattern is:

```javascript
document$.subscribe(function() {
  // Initialize checkboxes, progress bars, etc.
  // This fires on initial load AND on every instant navigation
});
```

Additionally, ensure `bundle.js` (Material's main script) loads before custom scripts, or the `document$` observable will not exist. Test navigation between pages without full refreshes during development.

**Warning signs:**
- Custom JS uses `DOMContentLoaded`, `window.onload`, or `$(document).ready()`
- Features work on page refresh but not when clicking internal links
- The word `document$` does not appear anywhere in custom JavaScript files
- Testing only involves refreshing pages, never clicking internal navigation links

**Phase to address:**
Progress tracking implementation phase AND site customization phase. Every custom JS file must be reviewed for this pattern before the first deployment.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded resource links in Markdown | Fast content authoring | Every broken link requires editing the Markdown file directly; no centralized link management | MVP only -- migrate to a links data file or shortcodes for v2 |
| One monolithic `extra.js` file | Quick to add features | Becomes unmaintainable as progress tracking, analytics, and UI enhancements pile up | Never -- split from the start: `progress.js`, `ui.js`, etc. |
| No automated link checking | Saves CI setup time | Broken links accumulate silently until users report them | Never -- add link check to CI in the first deployment pipeline |
| Skipping `site_url` configuration | Works locally with `mkdocs serve` | All asset paths break on GitHub Pages subdirectory deployment | Never -- configure `site_url` before first deploy |
| Storing progress as individual localStorage keys per checkbox | Simple per-checkbox logic | Hundreds of keys, impossible to export/import, no atomic updates, hard to debug | Never -- use a single JSON object from the start |

## Integration Gotchas

Common mistakes when connecting to external services and tools.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages deployment | Not setting `site_url` to include the repo name subdirectory (e.g., `https://user.github.io/repo-name/`), causing broken CSS/JS/image paths | Set `site_url` in `mkdocs.yml` to the full deployment URL including subdirectory; test with `mkdocs build` and open `site/index.html` locally to verify paths |
| MkDocs plugins in CI | Plugins installed locally (mkdocstrings, git-revision-date) but missing from CI environment `requirements.txt` | Maintain a `requirements.txt` or `pyproject.toml` with all MkDocs plugins pinned; test CI builds in a clean environment |
| External course/resource links | Linking to Coursera/Udemy course URLs that include session-specific or promotional parameters | Link to the canonical course URL (strip UTM parameters, session IDs); prefer `/learn/course-name` over full enrollment URLs |
| MkDocs Material theme updates | Custom CSS/JS overrides break when Material theme updates change class names or DOM structure | Pin the Material theme version in requirements; test custom overrides after any theme version bump |

## Performance Traps

Patterns that work at small scale but fail as content grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| All progress logic in a single `document$.subscribe()` | Sluggish page transitions, visible UI flicker as checkboxes render then update | Debounce localStorage reads; cache progress state in memory; only read localStorage once per page load | 50+ checkbox items across the site with instant loading |
| No lazy loading for progress bars on landing/overview pages | Landing page loads slowly as it queries localStorage for every section's progress | Compute aggregate progress on-demand or cache summary stats in a separate localStorage key | 20+ sections with progress bars on a single overview page |
| Unoptimized MkDocs search index | Search becomes slow; `search_index.json` grows large | Use Material's built-in search exclusion (`search.exclude`) for repetitive content; keep pages focused | 100+ pages of content |
| No image optimization | Large page sizes, slow loads on mobile | Use WebP format, compress images, use Material's lazy loading support | When the site includes diagrams, charts, or screenshots on most pages |

## UX Pitfalls

Common user experience mistakes in ML learning roadmap sites.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No estimated time per section | Users cannot plan study sessions; they start a section expecting 30 minutes and find 4 hours of content | Add time estimates to every section header (e.g., "~2 hours", "~1 week part-time") |
| Prerequisites not explicit | Users jump to Deep Learning without understanding gradient descent, get lost, blame the roadmap | Each section lists prerequisites with links; optionally add a "ready check" -- 3-5 quick questions to self-assess |
| No "you are here" orientation | Users lose track of where they are in the overall path, especially after returning days later | Progress overview page showing completed/current/upcoming; use breadcrumbs and a visual roadmap diagram |
| Wall-of-text pages | Users skim or bounce; educational content needs varied formatting | Use admonitions (tip, warning, note), code blocks, diagrams, collapsible sections, and task lists to break up prose |
| Mobile-hostile progress tracking | Checkboxes too small on mobile; progress bars not visible | Test all interactive elements on mobile; Material theme is responsive but custom JS elements may not be |
| No clear "what to do next" | Users finish a section and do not know what comes after | Every section ends with explicit "Next Steps" linking to the next section in the core path |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Progress tracking:** Often missing export/import -- verify users can back up and restore their progress
- [ ] **Progress tracking:** Often missing Safari testing -- verify localStorage persists beyond 7 days with ITP
- [ ] **Resource links:** Often missing version/date annotation -- verify each link notes what framework version it targets
- [ ] **Navigation structure:** Often missing mobile testing -- verify the sidebar collapses and core/optional distinction is visible on small screens
- [ ] **Custom JavaScript:** Often missing instant loading testing -- verify all interactive features work when navigating via internal links (not just page refresh)
- [ ] **Deployment:** Often missing `site_url` configuration -- verify the deployed site loads all CSS, JS, and images correctly on GitHub Pages
- [ ] **Content pages:** Often missing action points and learning outcomes -- verify every topic page has both, not just an explanation and links
- [ ] **Search:** Often missing search testing with real queries -- verify a user searching "gradient descent" or "CNN" finds the right page
- [ ] **Core path:** Often missing end-to-end walkthrough -- verify a new user can follow the core path from start to finish without hitting dead ends, circular references, or missing prerequisites

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Link dump (no teaching content) | HIGH | Rewrite affected pages with teaching content; cannot be automated. Prioritize most-visited pages first using analytics. |
| Flat structure (no core/optional distinction) | MEDIUM | Restructure `mkdocs.yml` nav; add visual badges/icons to pages; update landing page. Content itself does not change, but navigation and framing do. |
| Widespread broken links | MEDIUM | Run automated link checker to generate full report; batch-fix or remove broken links; add CI check to prevent regression. |
| localStorage data loss for users | LOW (technical) / HIGH (trust) | Ship export/import feature ASAP; cannot recover lost user data. Communicate transparently about the limitation. |
| Theory-first ordering | HIGH | Requires restructuring the entire content sequence and potentially rewriting transition sections. Much harder to fix after content is written. |
| Instant loading JS breakage | LOW | Refactor custom JS to use `document$.subscribe()`; systematic fix, well-documented pattern. |
| Broken GitHub Pages deployment | LOW | Set `site_url` correctly in `mkdocs.yml`; rebuild and redeploy. Usually a one-line fix once diagnosed. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Link dump / no teaching content | Content authoring | Every page reviewed against the page template (intro, concepts, actions, outcomes, links) |
| Flat / overwhelming structure | Site structure / IA design | User test: give a beginner the nav and ask "where do you start?" -- they should answer immediately |
| Resource rot / broken links | CI/CD pipeline setup + content authoring | Automated link checker runs in CI; no deploy if links are broken |
| localStorage data loss | Progress tracking implementation | Export/import works; Safari 7-day test passes; try/catch on all storage calls |
| Theory-first ordering | Learning path design | First section includes a hands-on exercise; math sections follow practical sections |
| Instant loading JS conflicts | Progress tracking + site customization | All custom JS uses `document$.subscribe()`; test by clicking through 5+ pages without refresh |
| GitHub Pages deployment breaks | Deployment / infrastructure setup | Deployed site loads correctly on first deploy; `site_url` matches actual deployment URL |
| Monolithic JavaScript | Progress tracking implementation | JS split into separate files by concern; each file under 200 lines |
| Missing time estimates | Content authoring | Every section header includes an estimated duration |
| No prerequisite clarity | Content authoring | Every section lists prerequisites with links to where they are covered |

## Sources

- [Clickable Tasklist/Checkbox that won't reset -- MkDocs Material Discussion #5235](https://github.com/squidfunk/mkdocs-material/discussions/5235)
- [Instant loading -- JavaScript not reloading on page change -- MkDocs Material Issue #5816](https://github.com/squidfunk/mkdocs-material/issues/5816)
- [document$ observable usage -- MkDocs Material Issue #6196](https://github.com/squidfunk/mkdocs-material/issues/6196)
- [Broken links in AI/Data Scientist Roadmap -- developer-roadmap Issue #7683](https://github.com/kamranahmedse/developer-roadmap/issues/7683)
- [Problem loading assets on GitHub Pages -- MkDocs Material Issue #4678](https://github.com/squidfunk/mkdocs-material/issues/4678)
- [site_url documentation gap -- MkDocs Material Issue #2520](https://github.com/squidfunk/mkdocs-material/issues/2520)
- [Storage quotas and eviction criteria -- MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [localStorage in Modern Applications -- RxDB](https://rxdb.info/articles/localstorage.html)
- [MkDocs Material Customization -- Official Docs](https://squidfunk.github.io/mkdocs-material/customization/)
- [Content Curation Best Practices for Learning Pathways -- tilr.com](https://www.tilr.com/blog/best-practices-for-content-curation-in-learning-pathways)
- [Conquering Content Curation -- SHIFT eLearning](https://www.shiftelearning.com/blog/conquering-content-curation-best-practices-for-instructional-designers)
- [MkDocs Common Issues & Troubleshooting Guide](https://albrittonanalytics.com/troubleshooting/common-issues/)

---
*Pitfalls research for: ML Engineer Learning Roadmap -- MKDocs Educational Site*
*Researched: 2026-03-08*
