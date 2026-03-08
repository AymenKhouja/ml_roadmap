# Roadmap: ML Engineer Roadmap

## Overview

This roadmap delivers a complete MKDocs-based study roadmap site for ML engineering -- from an empty repository to a deployed, interactive GitHub Pages site. The approach is: build the site skeleton first, establish the content template and validate it, wire up progress tracking, then fill in content section by section following the curriculum sequence (math foundations through MLOps/research), and finally polish the landing page and deploy. Content phases (4-8) are parallelizable once the template and progress tracking are locked.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Project Skeleton and Configuration** - MKDocs site with Material theme, extensions, navigation structure, and all infrastructure features enabled
- [ ] **Phase 2: Content Template System** - Teach+link content format established, validated with a reference section, and all content formatting requirements met
- [ ] **Phase 3: Progress Tracking** - localStorage-based interactive checkboxes and progress bars working across all pages with instant-loading compatibility
- [ ] **Phase 4: Math Foundations Content** - Complete math foundations section covering linear algebra, calculus, and probability/statistics for ML
- [ ] **Phase 5: Python ML Ecosystem Content** - Complete Python ML toolkit section covering NumPy, Pandas, visualization, and Scikit-learn
- [ ] **Phase 6: Classical ML Content** - Complete classical ML section covering supervised, unsupervised, evaluation, and feature engineering
- [ ] **Phase 7: Deep Learning Content** - Complete deep learning section covering neural nets, CNNs, RNNs, Transformers, and frameworks
- [ ] **Phase 8: MLOps and Research Skills Content** - Complete MLOps section and research skills section covering production ML and paper literacy
- [ ] **Phase 9: Landing Page, Deployment, and Polish** - Landing page, visual roadmap overview, navigation polish, and live deployment to GitHub Pages

## Phase Details

### Phase 1: Project Skeleton and Configuration
**Goal**: A learner can open the site locally and see a fully navigable, professionally themed MKDocs site with all infrastructure features working -- even before content exists
**Depends on**: Nothing (first phase)
**Requirements**: SITE-01, SITE-02, SITE-03, SITE-04, SITE-05, SITE-06, SITE-07, SITE-08, SITE-09
**Success Criteria** (what must be TRUE):
  1. Running `mkdocs serve` produces a site with tabbed top-level navigation and sidebar subsections matching the curriculum structure
  2. Full-text search returns results across all placeholder pages
  3. Dark mode toggle works and respects OS preference on first visit
  4. Site renders correctly on mobile viewport (375px width) with readable text and functional navigation
  5. A test page demonstrates working syntax-highlighted Python code blocks with copy button, rendered LaTeX math equations, admonition boxes, content tabs, and a Mermaid diagram
**Plans**: 3 plans

Plans:
- [x] 01-01: Project skeleton with MkDocs Material, navigation, 30 placeholder pages
- [x] 01-02: Features demo page validating all extensions (math rendering deferred)
- [x] 01-03: Fix MathJax math rendering (gap closure for SITE-06)

### Phase 2: Content Template System
**Goal**: The teach+link content format is fully defined, documented as a reusable template, and validated on one complete reference section -- so all subsequent content authoring follows a proven pattern
**Depends on**: Phase 1
**Requirements**: CFMT-01, CFMT-02, CFMT-03, CFMT-04, CFMT-05, CFMT-06, CFMT-07, CFMT-08, CFMT-09
**Success Criteria** (what must be TRUE):
  1. A reference content page exists that demonstrates the complete teach+link format: learning outcomes at top, concept explanation with teaching moments in admonition callouts, action items telling the learner what to do, and a curated resource table with free-first ordering
  2. Every content page template includes prerequisite callout, time estimate, and difficulty indicator at the top
  3. The reference section demonstrates the opinionated consolidation approach -- citing and reconciling specific recommendations from roadmap.sh, Andrew Ng, fast.ai, and Stanford sources into one clear path
  4. A content authoring checklist exists that can be used to verify any new page follows the template before it ships
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md -- Custom admonition CSS and Supervised Learning reference page
- [ ] 02-02-PLAN.md -- Content authoring checklist

### Phase 3: Progress Tracking
**Goal**: A learner can check off completed items on any page, see their progress persist across browser sessions, and view per-section progress bars -- all without creating an account
**Depends on**: Phase 2
**Requirements**: INTR-01, INTR-02, INTR-03
**Success Criteria** (what must be TRUE):
  1. Clicking a checkbox on any content page persists that state in localStorage and survives browser close/reopen
  2. Each section index page displays a progress bar showing percentage of completed items within that section
  3. Progress tracking works correctly when navigating between pages using MKDocs Material instant-loading (no full page reload required)
  4. All localStorage operations are wrapped in try/catch with a visible notice to users that progress is stored locally in their browser
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Math Foundations Content
**Goal**: A learner can work through the complete math foundations section and emerge understanding the linear algebra, calculus, and probability concepts needed for ML -- with clear teaching, guided action items, and curated resources
**Depends on**: Phase 2, Phase 3
**Requirements**: MATH-01, MATH-02, MATH-03
**Success Criteria** (what must be TRUE):
  1. Linear algebra section covers vectors, matrices, eigenvalues with ML-specific motivation (e.g., why eigenvalues matter for PCA) and includes rendered LaTeX notation
  2. Calculus section covers derivatives, gradients, chain rule, and optimization basics with concrete ML examples (e.g., gradient descent walkthrough)
  3. Probability section covers distributions, Bayes theorem, hypothesis testing, and statistical thinking with ML-relevant framing
  4. Every page in the section follows the validated content template: learning outcomes, teach+link format, action items, free-first resources, time estimate, difficulty indicator
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Python ML Ecosystem Content
**Goal**: A learner can work through the Python ML ecosystem section and become proficient with the core Python data science and ML libraries needed before tackling ML algorithms
**Depends on**: Phase 2, Phase 3
**Requirements**: PYML-01, PYML-02, PYML-03, PYML-04
**Success Criteria** (what must be TRUE):
  1. NumPy section covers array operations, broadcasting, and vectorized computation with practical exercises the learner can run
  2. Pandas section covers data loading, cleaning, transformation, and exploratory analysis with realistic dataset examples
  3. Visualization section covers Matplotlib and Seaborn with ML-specific plot types (confusion matrices, learning curves, feature distributions)
  4. Scikit-learn section covers the estimator API pattern, preprocessing pipelines, model selection, and evaluation with end-to-end workflow examples
  5. Every page follows the content template and all code blocks have syntax highlighting, line numbers, and copy buttons
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

### Phase 6: Classical ML Content
**Goal**: A learner can work through the complete classical ML section and understand core ML algorithms, evaluation methodology, and practical feature engineering
**Depends on**: Phase 2, Phase 3
**Requirements**: CLML-01, CLML-02, CLML-03, CLML-04
**Success Criteria** (what must be TRUE):
  1. Supervised learning section covers regression, classification, decision trees, ensemble methods, and SVMs with intuitive explanations and when-to-use guidance
  2. Unsupervised learning section covers clustering, dimensionality reduction, and anomaly detection with practical use cases
  3. Model evaluation section covers metrics, cross-validation, bias-variance tradeoff, and hyperparameter tuning with concrete methodology the learner can apply
  4. Feature engineering section covers feature selection, extraction, and data pipeline patterns with real-world examples
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### Phase 7: Deep Learning Content
**Goal**: A learner can work through the complete deep learning section from neural network fundamentals through modern Transformer architectures and gain practical framework skills
**Depends on**: Phase 2, Phase 3
**Requirements**: DEEP-01, DEEP-02, DEEP-03, DEEP-04, DEEP-05
**Success Criteria** (what must be TRUE):
  1. Neural network fundamentals section covers perceptrons, backpropagation, activation functions, and optimization with visual intuitions and math notation
  2. CNNs section covers convolutional layers, key architectures (ResNet etc.), and image classification with architecture diagrams
  3. RNNs section covers LSTMs, GRUs, and sequence-to-sequence patterns with clear explanation of the vanishing gradient motivation
  4. Transformers section covers self-attention, BERT, GPT architecture, and modern LLMs -- positioned as the current state of the art with historical context
  5. Frameworks section covers practical PyTorch and/or TensorFlow usage with content tabs showing both where applicable
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD

### Phase 8: MLOps and Research Skills Content
**Goal**: A learner can work through production ML skills and research literacy sections, completing the transition from "understands ML" to "can ship and stay current"
**Depends on**: Phase 2, Phase 3
**Requirements**: MLOP-01, MLOP-02, MLOP-03, MLOP-04, RSCH-01, RSCH-02, RSCH-03
**Success Criteria** (what must be TRUE):
  1. ML lifecycle section covers experiment tracking, reproducibility, and versioning with tool recommendations (MLflow, Weights & Biases, DVC)
  2. Deployment section covers model serving, APIs, containerization, and cloud platforms with concrete patterns the learner can follow
  3. Monitoring section covers data drift, model decay, and retraining strategies with observable indicators and decision frameworks
  4. ML system design section covers end-to-end architecture patterns with Mermaid diagrams showing production ML pipelines
  5. Research skills sections cover paper reading methodology, result reproduction workflow, and staying current via arXiv/conferences/community
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD

### Phase 9: Landing Page, Deployment, and Polish
**Goal**: A new visitor lands on the site, immediately understands what it is, who it is for, and how to navigate the learning path -- and the site is live on GitHub Pages
**Depends on**: Phase 1, Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Phase 7, Phase 8
**Requirements**: LAND-01, LAND-02, LAND-03, SITE-10
**Success Criteria** (what must be TRUE):
  1. Landing page clearly communicates what the site is (one curated ML learning path), who it is for (programmers who know Python), and how to get started
  2. Navigation structure makes the learning path sequence obvious -- a visitor can determine the intended order within 10 seconds of arriving
  3. A visual roadmap overview (Mermaid diagram or equivalent) shows all sections and their prerequisite relationships
  4. Site is deployed and publicly accessible on GitHub Pages with working search, navigation, progress tracking, and all content
**Plans**: TBD

Plans:
- [ ] 09-01: TBD
- [ ] 09-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
Note: Phases 4-8 (content phases) can be executed in parallel once Phases 2 and 3 are complete.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Skeleton and Configuration | 3/3 | Complete | 2026-03-08 |
| 2. Content Template System | 0/2 | Not started | - |
| 3. Progress Tracking | 0/0 | Not started | - |
| 4. Math Foundations Content | 0/0 | Not started | - |
| 5. Python ML Ecosystem Content | 0/0 | Not started | - |
| 6. Classical ML Content | 0/0 | Not started | - |
| 7. Deep Learning Content | 0/0 | Not started | - |
| 8. MLOps and Research Skills Content | 0/0 | Not started | - |
| 9. Landing Page, Deployment, and Polish | 0/0 | Not started | - |
