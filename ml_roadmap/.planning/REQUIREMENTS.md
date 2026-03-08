# Requirements: ML Engineer Roadmap

**Defined:** 2026-03-08
**Core Value:** Eliminate decision paralysis -- one curated, well-structured path from ML foundations to job-ready, ship-capable, and research-literate

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Site Infrastructure

- [x] **SITE-01**: MKDocs Material site with tabbed navigation for top-level sections and sidebar for subsections
- [x] **SITE-02**: Full-text search across all content pages
- [x] **SITE-03**: Dark mode toggle with OS preference auto-detection
- [x] **SITE-04**: Responsive design that works on mobile and tablet
- [x] **SITE-05**: Python code blocks with syntax highlighting, line numbers, and copy button
- [x] **SITE-06**: Math equation rendering for linear algebra, calculus, and probability notation
- [x] **SITE-07**: Admonition boxes for tips, warnings, prerequisites, and key concepts
- [x] **SITE-08**: Content tabs for showing alternative approaches (e.g., TensorFlow vs PyTorch)
- [x] **SITE-09**: Mermaid diagrams showing topic prerequisites and relationships
- [ ] **SITE-10**: Site deployed and accessible on GitHub Pages

### Content Format

- [ ] **CFMT-01**: Each topic follows teach+link format: brief explanation, key concepts, teaching moments, then curated resource links
- [ ] **CFMT-02**: Learning outcomes stated at the start of each section ("By the end, you will...")
- [ ] **CFMT-03**: Action items per step telling the learner exactly what to do (read, build, complete)
- [ ] **CFMT-04**: Prerequisites clearly stated on landing page and at the top of each major section
- [ ] **CFMT-05**: Free-first resource curation with paid alternatives noted when significantly better
- [ ] **CFMT-06**: Time estimates at the top of each section (estimated hours to complete)
- [ ] **CFMT-07**: Difficulty level indicators per section (Beginner / Intermediate / Advanced)
- [ ] **CFMT-08**: Guidelines and teaching moments woven throughout as admonition callouts
- [ ] **CFMT-09**: Opinionated consolidation of popular roadmaps (roadmap.sh, Andrew Ng, fast.ai, Stanford, etc.) into one definitive path

### Core Content -- Math Foundations

- [ ] **MATH-01**: Linear algebra section covering vectors, matrices, eigenvalues, and their ML applications
- [ ] **MATH-02**: Calculus section covering derivatives, gradients, chain rule, and optimization basics
- [ ] **MATH-03**: Probability and statistics section covering distributions, Bayes theorem, hypothesis testing, and statistical thinking for ML

### Core Content -- Python ML Ecosystem

- [ ] **PYML-01**: NumPy section covering array operations, broadcasting, and vectorized computation
- [ ] **PYML-02**: Pandas section covering data loading, cleaning, transformation, and exploratory analysis
- [ ] **PYML-03**: Data visualization section covering Matplotlib and Seaborn for ML analysis
- [ ] **PYML-04**: Scikit-learn section covering the API pattern, preprocessing, model selection, and evaluation

### Core Content -- Classical ML

- [ ] **CLML-01**: Supervised learning section covering regression, classification, decision trees, ensemble methods, and SVMs
- [ ] **CLML-02**: Unsupervised learning section covering clustering, dimensionality reduction, and anomaly detection
- [ ] **CLML-03**: Model evaluation section covering metrics, cross-validation, bias-variance tradeoff, and hyperparameter tuning
- [ ] **CLML-04**: Feature engineering section covering feature selection, extraction, and practical data pipeline patterns

### Core Content -- Deep Learning

- [ ] **DEEP-01**: Neural network fundamentals section covering perceptrons, backpropagation, activation functions, and optimization
- [ ] **DEEP-02**: CNNs section covering convolutional layers, architectures (ResNet, etc.), and image classification
- [ ] **DEEP-03**: RNNs and sequence models section covering LSTMs, GRUs, and sequence-to-sequence patterns
- [ ] **DEEP-04**: Transformers and attention section covering self-attention, BERT, GPT architecture, and modern LLMs
- [ ] **DEEP-05**: Deep learning frameworks section covering PyTorch and/or TensorFlow practical usage

### Core Content -- MLOps & Production

- [ ] **MLOP-01**: ML project lifecycle section covering experiment tracking, reproducibility, and versioning
- [ ] **MLOP-02**: Model deployment section covering serving, APIs, containerization, and cloud platforms
- [ ] **MLOP-03**: Monitoring and maintenance section covering data drift, model decay, and retraining strategies
- [ ] **MLOP-04**: ML system design section covering end-to-end architecture patterns for production ML

### Core Content -- Research Skills

- [ ] **RSCH-01**: Paper reading section covering how to efficiently read and critically evaluate ML research papers
- [ ] **RSCH-02**: Reproducing results section covering how to implement papers, common pitfalls, and practical tips
- [ ] **RSCH-03**: Staying current section covering arXiv, conferences, key researchers, and community resources

### Interactivity

- [ ] **INTR-01**: localStorage-based progress tracking with clickable checkboxes that persist across sessions
- [ ] **INTR-02**: Progress bars per section showing percentage of completed items
- [ ] **INTR-03**: Checkboxes work correctly with MKDocs Material instant-loading (using document$ observable)

### Landing & Navigation

- [ ] **LAND-01**: Landing page clearly communicating what this is, who it's for, and how to use it
- [ ] **LAND-02**: Clear navigation structure that makes the learning path sequence obvious
- [ ] **LAND-03**: Visual roadmap overview showing all sections and their relationships

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Specializations

- **SPEC-01**: NLP specialization branch covering text processing, language models, and NLP applications
- **SPEC-02**: Computer Vision specialization branch covering object detection, segmentation, and generative models
- **SPEC-03**: Recommender Systems specialization branch covering collaborative filtering, content-based, and hybrid approaches
- **SPEC-04**: Reinforcement Learning specialization branch covering MDPs, policy gradients, and practical RL

### Enhanced Interactivity

- **EINT-01**: Core path vs specialization visual distinction (different styling for optional branches)
- **EINT-02**: JSON export/import of progress state for device transfer and Safari data loss prevention
- **EINT-03**: Overall completion dashboard page showing total roadmap progress

### Content Enhancements

- **CENH-01**: Portfolio project suggestions at key milestones
- **CENH-02**: Interview preparation tips integrated at relevant sections
- **CENH-03**: Community resource links (Discord servers, Reddit, fast.ai forums)

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts / backend auth | Static site only -- localStorage handles progress without infrastructure |
| Community features (forums, comments) | Moderation burden, existing communities serve this need |
| Interactive code execution | ML needs real compute (GPU) -- link to Kaggle/Colab instead |
| Video content creation | Curate existing excellent videos, don't compete with Andrew Ng/fast.ai |
| Gamification (badges, points) | Trivializes learning, requires backend for leaderboards |
| AI tutor / chatbot | API costs, hallucination risk, ongoing maintenance |
| Custom roadmap creation | Undermines core value of ONE opinionated path |
| Mobile app | Responsive web is sufficient |
| Spaced repetition / quizzes | Quiz engine adds complexity; use "check your understanding" as markdown |
| Certification | Certificates from unknown sources have zero market value |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-01 | Phase 1 | Complete |
| SITE-02 | Phase 1 | Complete |
| SITE-03 | Phase 1 | Complete |
| SITE-04 | Phase 1 | Complete |
| SITE-05 | Phase 1 | Pending |
| SITE-06 | Phase 1 | Complete |
| SITE-07 | Phase 1 | Complete |
| SITE-08 | Phase 1 | Complete |
| SITE-09 | Phase 1 | Complete |
| SITE-10 | Phase 9 | Pending |
| CFMT-01 | Phase 2 | Pending |
| CFMT-02 | Phase 2 | Pending |
| CFMT-03 | Phase 2 | Pending |
| CFMT-04 | Phase 2 | Pending |
| CFMT-05 | Phase 2 | Pending |
| CFMT-06 | Phase 2 | Pending |
| CFMT-07 | Phase 2 | Pending |
| CFMT-08 | Phase 2 | Pending |
| CFMT-09 | Phase 2 | Pending |
| MATH-01 | Phase 4 | Pending |
| MATH-02 | Phase 4 | Pending |
| MATH-03 | Phase 4 | Pending |
| PYML-01 | Phase 5 | Pending |
| PYML-02 | Phase 5 | Pending |
| PYML-03 | Phase 5 | Pending |
| PYML-04 | Phase 5 | Pending |
| CLML-01 | Phase 6 | Pending |
| CLML-02 | Phase 6 | Pending |
| CLML-03 | Phase 6 | Pending |
| CLML-04 | Phase 6 | Pending |
| DEEP-01 | Phase 7 | Pending |
| DEEP-02 | Phase 7 | Pending |
| DEEP-03 | Phase 7 | Pending |
| DEEP-04 | Phase 7 | Pending |
| DEEP-05 | Phase 7 | Pending |
| MLOP-01 | Phase 8 | Pending |
| MLOP-02 | Phase 8 | Pending |
| MLOP-03 | Phase 8 | Pending |
| MLOP-04 | Phase 8 | Pending |
| RSCH-01 | Phase 8 | Pending |
| RSCH-02 | Phase 8 | Pending |
| RSCH-03 | Phase 8 | Pending |
| INTR-01 | Phase 3 | Pending |
| INTR-02 | Phase 3 | Pending |
| INTR-03 | Phase 3 | Pending |
| LAND-01 | Phase 9 | Pending |
| LAND-02 | Phase 9 | Pending |
| LAND-03 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 48 total
- Mapped to phases: 48
- Unmapped: 0

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after roadmap creation*
