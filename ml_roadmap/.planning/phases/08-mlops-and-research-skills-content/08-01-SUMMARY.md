---
phase: 08-mlops-and-research-skills-content
plan: 01
subsystem: content
tags: [mlops, experiment-tracking, mlflow, fastapi, docker, drift-detection, scipy, evidently-ai]

# Dependency graph
requires:
  - phase: 07-deep-learning-content
    provides: Deep learning frameworks page (referenced as prerequisite in project-lifecycle.md)
  - phase: 06-classical-ml-content
    provides: Model evaluation page (referenced as prerequisite in monitoring-maintenance.md)
provides:
  - ML project lifecycle content page (docs/mlops/project-lifecycle.md)
  - Model deployment content page (docs/mlops/model-deployment.md)
  - Monitoring and maintenance content page (docs/mlops/monitoring-maintenance.md)
affects: [08-02-PLAN (system-design.md depends on these three pages as prerequisites)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "MLOps pages use decision frameworks instead of math notation (replace '$$formula$$' with table or numbered list)"
    - "Code examples stay local-only: MLflow with local tracking, FastAPI with uvicorn, Docker builds locally, scipy KS test"
    - "Cloud coverage at awareness level only: no platform tutorials, concepts and tradeoffs only"
    - "No content tabs for MLOps tools (unlike deep learning frameworks page)"

key-files:
  created:
    - docs/mlops/project-lifecycle.md
    - docs/mlops/monitoring-maintenance.md
  modified:
    - docs/mlops/model-deployment.md

key-decisions:
  - "MLOps pages teach concepts first with tool recommendations second -- not tool tutorials"
  - "All code examples runnable locally: MLflow local tracking, FastAPI+uvicorn, Docker local build, scipy KS test"
  - "Cloud deployment covered at awareness level only -- no AWS/GCP tutorials"
  - "No content tabs for MLOps tools (unlike frameworks.md); recommend MLflow as primary, W&B as alternative inline"
  - "project-lifecycle.md includes both MLflow code example and reproducibility seed initialization pattern"
  - "monitoring-maintenance.md includes KS test with documented function signature and monitoring tier table"

patterns-established:
  - "MLOps sub-topics use decision frameworks (tables/numbered lists) where math pages use equations"
  - "Why This Path cites Chip Huyen (Designing ML Systems) and Full Stack Deep Learning as primary authoritative sources"

requirements-completed: [MLOP-01, MLOP-02, MLOP-03]

# Metrics
duration: 8min
completed: 2026-03-23
---

# Phase 8 Plan 01: MLOps Content (Lifecycle, Deployment, Monitoring) Summary

**Three complete MLOps content pages covering experiment tracking with MLflow, model serving with FastAPI and Docker, and drift detection with KS tests -- 786 total lines following the CONTENT-CHECKLIST template**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-23T12:23:53Z
- **Completed:** 2026-03-23T12:32:00Z
- **Tasks:** 2 completed
- **Files modified:** 3

## Accomplishments

- project-lifecycle.md (250 lines): Problem framing, data management with DVC, experiment tracking with MLflow code example, reproducibility with seed initialization pattern, team workflow with phase structure
- model-deployment.md (281 lines): Model serialization (joblib/torch/ONNX), FastAPI serving with full annotated code example, Docker containerization with Dockerfile, batch vs real-time inference tradeoffs, cloud deployment patterns
- monitoring-maintenance.md (255 lines): Why models degrade (drift taxonomy), KS test drift detection with documented Python function, model performance monitoring strategies (A/B tests, shadow deployments, canary releases), retraining strategies, decision framework with monitoring tier table

## Task Commits

Each task was committed atomically:

1. **Task 1: Write project-lifecycle.md and model-deployment.md** - `bf39861` (feat)
2. **Task 2: Write monitoring-maintenance.md** - `118961b` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified

- `docs/mlops/project-lifecycle.md` - ML project lifecycle: 250 lines, 5 sub-topics, MLflow experiment tracking code example, reproducibility seed initialization, data quality checklist, project phase structure
- `docs/mlops/model-deployment.md` - Model deployment: 281 lines, 5 sub-topics, full FastAPI serving example with Pydantic validation, Dockerfile for ML app, batch vs real-time comparison table
- `docs/mlops/monitoring-maintenance.md` - Monitoring: 255 lines, 5 sub-topics, KS test drift detection function, monitoring tier table, retraining strategy comparison

## Decisions Made

- MLOps pages teach concepts first with tool recommendations second, not step-by-step tool tutorials (anti-patterns from 08-RESEARCH.md followed)
- All code examples are locally runnable: MLflow tracking with `mlflow ui`, FastAPI with `uvicorn`, Docker builds locally, KS test requires only scipy
- Cloud deployment covered at awareness level only -- concepts (managed endpoints, serverless, autoscaling) without platform-specific tutorials
- No content tabs for MLOps tools -- unlike deep-learning/frameworks.md which uses tabs for PyTorch vs TensorFlow
- project-lifecycle.md received data quality checklist and ML project phase structure for additional depth to reach 250-line minimum
- monitoring-maintenance.md received monitoring tier table (Low/Medium/High/Critical impact levels) to illustrate decision framework concretely

## Deviations from Plan

None -- plan executed exactly as written. All three pages follow CONTENT-CHECKLIST template, contain required admonitions (prerequisite, teaching moment, Why This Path, action, key takeaways), and link forward in sequence (lifecycle -> deployment -> monitoring -> system-design).

Minor deviation: project-lifecycle.md initially came in at 203 lines due to tight prose; expanded with data quality checklist, reproducibility seed initialization code block, and ML project phase structure to reach 250. Similarly monitoring-maintenance.md expanded with monitoring tier table. All additions are substantive content improvements, not padding.

## Issues Encountered

- project-lifecycle.md required three rounds of content expansion to reach 250-line minimum; each expansion added substantive content (data quality checklist, seed initialization code, project phase structure, ML Rule #1 note)
- monitoring-maintenance.md required one expansion (monitoring tier table) to reach 250 lines

## User Setup Required

None -- no external service configuration required. All code examples run locally.

## Next Phase Readiness

- Three MLOps content pages complete with forward links in sequence
- model-deployment.md links to monitoring-maintenance.md; monitoring-maintenance.md links to system-design.md
- 08-02-PLAN (system-design.md + mlops/index.md) can proceed immediately

---
*Phase: 08-mlops-and-research-skills-content*
*Completed: 2026-03-23*
