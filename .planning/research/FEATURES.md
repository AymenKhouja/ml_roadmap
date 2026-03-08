# Feature Research

**Domain:** ML Learning Roadmap / Educational Documentation Site (MKDocs)
**Researched:** 2026-03-08
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear linear learning path | Every competitor (roadmap.sh, fast.ai, Coursera, Odin Project) has a structured sequence. Users come to avoid decision paralysis -- the core value proposition. | LOW | Markdown content hierarchy in MKDocs nav. Core path vs optional branches must be visually obvious. |
| Curated resource links per topic | All roadmap sites (roadmap.sh, awesome-machine-learning, GitHub roadmaps) link to external resources. A roadmap without links is just an outline. | LOW | Markdown links. Free-first resources with paid alternatives noted. Must verify links are alive at launch. |
| Search | MKDocs Material has built-in search out of the box. Users expect instant search on any documentation site. | LOW | Built-in to Material theme -- zero custom work. |
| Dark mode toggle | MKDocs Material supports light/dark mode toggle natively. Standard expectation on developer-facing sites in 2026. | LOW | Built-in config in mkdocs.yml. Both auto (OS preference) and manual toggle supported. |
| Responsive / mobile-friendly design | Material theme is responsive by default. Educational content is consumed on phones/tablets frequently. | LOW | Built-in to Material theme. No custom work needed. |
| Clean navigation with sections | Odin Project, fast.ai, Stanford course sites all have sidebar nav with clear section hierarchy. Users need to orient themselves in a large curriculum. | LOW | MKDocs Material nav config. Use navigation tabs for top-level sections, sidebar for subsections. |
| Code blocks with syntax highlighting | ML content requires Python code examples. Every competitor shows code. MKDocs Material has excellent code block support with line numbers, highlighting, and copy button. | LOW | Built-in SuperFences extension. Add line numbers, highlight specific lines, copy-to-clipboard. |
| Math equation rendering | ML roadmap requires linear algebra, calculus, probability notation. Stanford CS229/CS231n course notes use LaTeX heavily. Any ML educational site without math rendering feels amateur. | LOW | MKDocs Material supports MathJax and KaTeX via Arithmatex extension. Use KaTeX for speed (sufficient LaTeX subset for ML content). |
| Learning outcomes per section | Coursera specializations, Odin Project, and fast.ai all state what learners will know after each section. Sets expectations and aids self-assessment. | LOW | Markdown content -- admonition boxes ("By the end of this section, you will..."). |
| Action items per step | Odin Project and fast.ai both tell learners exactly what to do (read this, build that, complete this exercise). Passive content without actionable steps loses learners. | LOW | Markdown content with task lists and clear imperative instructions. |
| Admonitions / callouts | MKDocs Material has 12 admonition types. Essential for tips, warnings, prerequisites, "key concept" boxes. Every educational MKDocs site uses these heavily. | LOW | Built-in. Use note, tip, warning, info, example types. Critical for the "mentor guiding you" feel. |
| Content tabs | Useful for showing alternative approaches (e.g., TensorFlow vs PyTorch implementations). MKDocs Material supports natively. | LOW | Built-in via pymdownx.tabbed extension. |
| Prerequisites clearly stated | fast.ai, Coursera, Stanford courses all state prerequisites upfront. Target audience is "programmers who know Python" -- state this clearly. | LOW | Markdown content on landing page and at top of each major section. |
| Free and open access | Odin Project, fast.ai, roadmap.sh, GitHub roadmaps are all free. Paid content is an anti-feature for this project. | LOW | Static site on GitHub Pages. Already decided in PROJECT.md. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Visual progress tracking (localStorage) | roadmap.sh requires login for progress tracking. Odin Project requires sign-up. Most GitHub roadmaps have zero tracking. Client-side progress tracking with no account required is a genuine differentiator for a static site. Users can check off completed topics and see their progress without creating an account. | MEDIUM | Custom JavaScript + localStorage. Clickable checkboxes that persist state. Pattern exists (codepen examples, MKDocs discussion #5235). Key: URL-based keys so state survives across sessions. |
| Progress bars showing completion | roadmap.sh shows "0% Done" but requires login. Visual progress bars per section showing percentage complete provide motivation and orientation. Rare on static educational sites. | MEDIUM | Depends on progress tracking. Custom JS that reads checkbox state from localStorage and renders progress bars in sidebar or section headers. |
| Teach + link hybrid format | Most roadmaps are pure link dumps (awesome-machine-learning, GitHub roadmaps). Coursera/fast.ai are pure courses. Brief explanations with key concepts and teaching moments PLUS curated links is a format gap in the market. The "mentor guiding you" feel. | LOW | Content authoring approach, not technical complexity. Each topic gets: concept explanation, key insight/"aha" moment, then curated resource links. |
| Core path vs specialization visual distinction | roadmap.sh shows everything as equal weight. Most roadmaps don't distinguish "everyone does this" from "pick one specialization." Clear visual separation (e.g., different styling, collapsible specialization branches) reduces overwhelm for the full-spectrum curriculum. | MEDIUM | MKDocs Material admonitions, custom CSS for specialization sections, possibly collapsible details blocks. Navigation structure must make core path obvious and specializations clearly optional. |
| Mermaid diagrams for topic relationships | roadmap.sh uses custom SVG flowcharts. Most GitHub roadmaps use static images. MKDocs Material has native Mermaid.js support for flowcharts. Show how topics connect and what feeds into what -- learners understand dependencies. | MEDIUM | Built-in Mermaid support in Material theme. Flowcharts showing topic prerequisites and relationships. Must be selective -- not every page needs a diagram. |
| Opinionated "one path" consolidation | The core differentiator per PROJECT.md. Dozens of roadmaps exist but none consolidate the best of roadmap.sh + Andrew Ng + fast.ai + Stanford courses into one definitive path. Every other resource is either one person's view or a link dump. This is the curated, researched consolidation. | LOW (technical) / HIGH (content) | Content curation effort, not technical complexity. The value is in the editorial judgment, not the technology. |
| MLOps / production ML section | roadmap.sh has a separate MLOps roadmap. Most learning roadmaps stop at model building. Including deployment, monitoring, and production skills in one path (not a separate track) reflects what employers actually want. | LOW | Content authoring. Integrated into the main path rather than a separate roadmap. |
| Guidelines and teaching moments | fast.ai excels at this -- weaving practical advice into technical content ("don't tune hyperparameters for more than 2 hours on your first pass"). Most roadmaps are dry lists. Embedded wisdom from practitioners differentiates. | LOW | Content authoring. Admonition boxes with "tip" or "warning" types. "Common mistake" and "pro tip" callouts. |
| Estimated time per section | Coursera shows "5 hours/week for 3 weeks." Most GitHub roadmaps give no time guidance. Time estimates help learners plan and set realistic expectations. | LOW | Markdown content. Add estimated hours at the top of each section. Based on research of course durations from source materials. |
| Difficulty level indicators | Coursera marks "Introductory" / "Intermediate" / "Advanced." Helps learners calibrate expectations. Simple visual badge per section. | LOW | Custom CSS badge or admonition. Simple visual indicator (e.g., colored tag). |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| User accounts / backend auth | "Let me save progress across devices." | Requires backend infrastructure, database, auth system. Violates static-site constraint. Massive complexity increase for marginal benefit. roadmap.sh has 2.8M users and still most people don't sign up. | localStorage progress tracking. Add optional JSON export/import of progress state for device transfer. |
| Community features (forums, comments) | "I want to discuss topics with other learners." | Static site cannot host forums. Adding Disqus/similar adds bloat, moderation burden, and privacy concerns. Community features need full-time moderation. | Link to existing communities: fast.ai forums, Reddit r/MachineLearning, Discord servers. Don't build what already exists. |
| Interactive code execution | "Let me run code in the browser." | Jupyter-in-browser (e.g., JupyterLite, Pyodide) is heavy, unreliable for ML workloads (no GPU), and adds significant complexity. ML code needs real compute. | Link to Kaggle Notebooks and Google Colab with pre-made starter notebooks. fast.ai does this successfully. |
| Video content creation | "Make video tutorials for each topic." | Enormous production effort. Videos go stale. Competes with Andrew Ng, fast.ai who have polished video already. | Embed/link to the best existing videos (YouTube, Coursera previews). Curate, don't create. |
| Gamification (badges, points, leaderboards) | "Make learning fun with achievements." | Requires backend for leaderboards. Badges without social validation feel hollow. Can trivialize serious learning. Gamification research shows diminishing returns. | Simple progress bars and completion percentages provide sufficient motivation without the complexity. Celebrate milestones with visual indicators. |
| AI tutor / chatbot | roadmap.sh added an AI Tutor. "Let me ask questions." | Requires API keys, costs money per query, hallucination risk in educational context, and ongoing maintenance. Not feasible for a free static site. | Curate existing AI-assisted learning tools (ChatGPT prompts for ML topics, Claude for code review). Teach learners how to use AI assistants effectively as a skill. |
| Custom roadmap creation | roadmap.sh allows custom roadmaps. "Let me make my own path." | Undermines the core value proposition: ONE opinionated path to eliminate decision paralysis. Custom paths reintroduce the paradox of choice. | Provide optional specialization branches that are clearly marked. The core path is the core path. |
| Mobile app | "I want an app for learning on the go." | Native app development and maintenance for a content site is unjustified overhead. | Responsive web design. MKDocs Material is fully responsive. PWA could be a future consideration with minimal effort. |
| Spaced repetition / quizzes | "Test my knowledge with quizzes." | Building a quiz engine adds significant JS complexity. Good quiz design is hard. Poor quizzes are worse than none. | Provide "check your understanding" questions as markdown content (no interactivity needed). Link to existing flashcard resources (Anki decks for ML). |
| Certification / credentials | "Give me a certificate when I finish." | Certificates from unknown sources have zero market value. Creates false expectations. Requires verification infrastructure. | Focus on portfolio projects that demonstrate skills. Link to recognized certifications (Coursera, AWS ML, Google ML). |

## Feature Dependencies

```
[MKDocs Material Setup]
    |
    |-- built-in --> [Search]
    |-- built-in --> [Dark Mode]
    |-- built-in --> [Responsive Design]
    |-- built-in --> [Code Blocks]
    |-- built-in --> [Admonitions]
    |-- built-in --> [Content Tabs]
    |-- config --> [Math Rendering (KaTeX)]
    |-- config --> [Mermaid Diagrams]
    |
    └──requires──> [Navigation Structure]
                       |
                       └──requires──> [Content Hierarchy (core vs optional)]
                                          |
                                          └──enables──> [Core Path vs Specialization Styling]

[Progress Tracking (localStorage JS)]
    |
    └──enables──> [Progress Bars per Section]
    └──enables──> [Overall Completion Dashboard]

[Content Authoring]
    |
    |-- parallel --> [Teach + Link Format per Topic]
    |-- parallel --> [Learning Outcomes per Section]
    |-- parallel --> [Action Items per Step]
    |-- parallel --> [Time Estimates]
    |-- parallel --> [Difficulty Indicators]
    |-- parallel --> [Guidelines / Teaching Moments]
    └-- parallel --> [Resource Curation + Link Verification]

[Mermaid Diagrams] ──enhances──> [Content Authoring]

[Progress Tracking] ──conflicts──> [User Accounts]
    (localStorage approach means no accounts; they are mutually exclusive design decisions)
```

### Dependency Notes

- **Navigation Structure requires Content Hierarchy:** You must decide the core path vs specialization structure before configuring MKDocs navigation. The nav is the skeleton.
- **Progress Bars require Progress Tracking:** The visual progress indicators read from localStorage state set by checkbox interactions. Build checkboxes first, then aggregate into bars.
- **Math Rendering is independent but early:** KaTeX config is a one-time setup in mkdocs.yml. Do it during initial project setup so content authors can use it from day one.
- **Content authoring tasks are parallelizable:** Once the MKDocs skeleton is up, multiple content sections can be written in parallel since they're independent Markdown files.
- **Progress Tracking conflicts with User Accounts:** The localStorage design decision explicitly excludes backend auth. This is a feature, not a limitation -- it enables privacy and zero infrastructure.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what's needed to validate the concept.

- [ ] MKDocs Material site with clean navigation (tabs + sidebar) -- the skeleton everything hangs on
- [ ] Core learning path content: Foundations through intermediate ML (math, Python ML libs, supervised/unsupervised learning, neural networks) -- at least 60% of core path content
- [ ] Teach + link format for each topic (brief explanation, key concepts, curated resources) -- the differentiating content format
- [ ] Search, dark mode, responsive design -- all built-in, zero effort
- [ ] Math rendering with KaTeX -- one-time config
- [ ] Code blocks with syntax highlighting -- built-in
- [ ] Admonitions for tips, warnings, prerequisites -- built-in
- [ ] Learning outcomes and action items per section -- content effort
- [ ] Prerequisites stated on landing page -- content effort
- [ ] GitHub Pages deployment -- MKDocs built-in

### Add After Validation (v1.x)

Features to add once core is working and initial feedback is received.

- [ ] localStorage progress tracking with checkboxes -- add when core content is solid, so there's something to track
- [ ] Progress bars per section -- add after checkbox tracking works
- [ ] Mermaid diagrams for topic relationship visualization -- add to key sections, not everywhere
- [ ] Time estimates per section -- add once content is stable enough to estimate
- [ ] Difficulty level badges -- add after content sections are finalized
- [ ] Specialization branches (NLP, CV, recommender systems) -- add after core path is complete
- [ ] MLOps / production ML section -- add as the capstone of the core path
- [ ] JSON export/import of progress state -- add if device-transfer requests come in

### Future Consideration (v2+)

Features to defer until the site has users and feedback.

- [ ] Overall completion dashboard page -- defer until progress tracking is proven useful
- [ ] PWA support for offline access -- defer, low demand for static content site
- [ ] Contribution guide for community content PRs -- defer until content is stable
- [ ] Anki deck links per topic -- defer, nice-to-have

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Core learning path content | HIGH | HIGH (content effort) | P1 |
| MKDocs Material site skeleton | HIGH | LOW | P1 |
| Teach + link format | HIGH | MEDIUM (content effort) | P1 |
| Search | HIGH | LOW (built-in) | P1 |
| Dark mode | MEDIUM | LOW (built-in) | P1 |
| Responsive design | HIGH | LOW (built-in) | P1 |
| Code blocks + syntax highlighting | HIGH | LOW (built-in) | P1 |
| Math rendering (KaTeX) | HIGH | LOW (config) | P1 |
| Admonitions | HIGH | LOW (built-in) | P1 |
| Learning outcomes per section | HIGH | LOW (content) | P1 |
| Action items per step | HIGH | LOW (content) | P1 |
| Prerequisites stated | MEDIUM | LOW (content) | P1 |
| Content tabs | MEDIUM | LOW (built-in) | P1 |
| Navigation structure (tabs + sidebar) | HIGH | LOW (config) | P1 |
| localStorage progress tracking | HIGH | MEDIUM (custom JS) | P2 |
| Progress bars per section | MEDIUM | MEDIUM (custom JS) | P2 |
| Mermaid diagrams | MEDIUM | MEDIUM (content + config) | P2 |
| Core vs specialization visual distinction | HIGH | MEDIUM (CSS + nav) | P2 |
| Time estimates | MEDIUM | LOW (content) | P2 |
| Difficulty badges | LOW | LOW (CSS) | P2 |
| Specialization branches (NLP, CV, etc.) | MEDIUM | HIGH (content) | P2 |
| MLOps section | MEDIUM | HIGH (content) | P2 |
| Guidelines / teaching moments | MEDIUM | LOW (content) | P2 |
| JSON progress export/import | LOW | LOW (JS) | P3 |
| Overall completion dashboard | LOW | MEDIUM (JS) | P3 |
| PWA offline support | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible (v1.x)
- P3: Nice to have, future consideration (v2+)

## Competitor Feature Analysis

| Feature | roadmap.sh | fast.ai | Odin Project | GitHub Roadmaps | Stanford Course Sites | Coursera/DeepLearning.AI | **Our Approach** |
|---------|-----------|---------|-------------|----------------|----------------------|------------------------|-----------------|
| Learning path structure | Visual flowchart nodes | Linear lesson sequence | Linear with projects | Static markdown/images | Module-based course notes | Week-by-week courses | Linear core path with clearly marked optional branches |
| Progress tracking | Requires account login | None | Requires account login | None | None | Requires paid enrollment | localStorage, no account needed |
| Content format | Click node for resources | Video + notebook + book | Text lessons + external links | Markdown link lists | Lecture notes + slides | Video + quizzes + labs | Teach + link hybrid (brief explanations + curated resources) |
| Interactivity | Clickable flowchart | Jupyter notebooks | Exercises + projects | None | Assignments (offline) | Graded quizzes + labs | Checkboxes for progress, Mermaid diagrams for relationships |
| Search | Yes | No (simple site) | Yes | No (GitHub) | No | Platform search | Yes (MKDocs built-in) |
| Dark mode | Yes | No | Yes | GitHub default | No | No | Yes (Material built-in) |
| Math support | No | In notebooks only | N/A | No | MathJax in notes | In platform | KaTeX rendering in all content |
| Code examples | Minimal | Extensive (notebooks) | Minimal (links out) | None | Assignment code | In-platform labs | Syntax-highlighted code blocks with explanations |
| Community | Discord (45K), GitHub | Forums (forums.fast.ai) | Discord | GitHub issues | Ed forum (per term) | Coursera forums | Link to existing communities (not hosted) |
| Cost | Free (premium features) | Free | Free | Free | Free notes / paid enrollment | $49/month | Free, all content accessible |
| Prerequisites shown | Implicit in flowchart | Landing page | Landing page | README | Course catalog | Course page | Landing page + per-section admonitions |
| Time estimates | None | ~90 min per lesson | None | None | Per-quarter schedule | "5 hrs/week for X weeks" | Per-section time estimates |
| Opinionated path | One flowchart per role | One sequence | One curriculum | Varies by author | One course sequence | One specialization | ONE consolidated path from all best sources |
| MLOps coverage | Separate roadmap | Minimal | N/A | Some repos | Not typically | Separate specialization | Integrated into core path |

## Sources

- [roadmap.sh Machine Learning Roadmap](https://roadmap.sh/machine-learning) -- Feature analysis of interactive flowchart, progress tracking (requires login), AI Tutor, 350K GitHub stars, 2.8M users, Discord community
- [roadmap.sh Home](https://roadmap.sh/) -- Platform features: custom roadmaps, project ideas, best practices, 25+ role-based and 60+ skill-based roadmaps
- [fast.ai Practical Deep Learning for Coders](https://course.fast.ai/) -- Course structure, top-down teaching methodology, Jupyter notebooks on Kaggle, video lessons, forums, prerequisite requirements
- [The Odin Project](https://www.theodinproject.com/) -- Progress tracking via account, project-based curriculum, Discord community, lesson + project interleaving, light/dark mode
- [Stanford CS231n Course Notes](https://cs231n.github.io/) -- Module-based structure, MathJax rendering, assignment structure, GitHub integration, progressive complexity
- [DeepLearning.AI Machine Learning Specialization](https://www.deeplearning.ai/courses/machine-learning-specialization/) -- 3-course structure, time estimates, visual-first pedagogy, certificates, graded assignments, 4.8M historical enrollees
- [Material for MkDocs Reference](https://squidfunk.github.io/mkdocs-material/reference/) -- Admonitions, annotations, code blocks, content tabs, diagrams, math, tooltips, grids, formatting
- [Material for MkDocs Diagrams](https://squidfunk.github.io/mkdocs-material/reference/diagrams/) -- Native Mermaid.js integration for flowcharts, sequence diagrams, class diagrams
- [Material for MkDocs Math](https://squidfunk.github.io/mkdocs-material/reference/math/) -- KaTeX and MathJax support via Arithmatex extension
- [MKDocs Material Checkbox Discussion #5235](https://github.com/squidfunk/mkdocs-material/discussions/5235) -- localStorage checkbox persistence pattern, URL-based key storage
- [GitHub mrdbourke/machine-learning-roadmap](https://github.com/mrdbourke/machine-learning-roadmap) -- 7.8K stars, PNG/PDF visual format, 5-category organization, video walkthrough
- [GitHub josephmisiti/awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning) -- Curated link list format organized by language, framework categories
- [Notion AI/ML Learning Roadmap Template](https://www.notion.com/templates/ai-ml-learning-roadmap) -- Checkbox tracking, structured phases, goal setting, YouTube links per topic
- [roadmap.sh Alternatives (AlternativeTo)](https://alternativeto.net/software/roadmap-sh/) -- Competitor comparison: freeCodeCamp, Odin Project, Learn Anything, Hyperskill
- [Docusaurus Interactive Tasks Plugin](https://www.npmjs.com/package/@sp-days-framework/docusaurus-plugin-interactive-tasks) -- Task components with localStorage persistence, progress indicators in sidebar, hints/solutions pattern

---
*Feature research for: ML Learning Roadmap / Educational Documentation Site (MKDocs)*
*Researched: 2026-03-08*
