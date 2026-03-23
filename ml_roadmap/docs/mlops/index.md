# MLOps

!!! prerequisite "Before You Start"
    Complete the [Core ML](../core-ml/index.md) section before starting here. Familiarity with
    [Deep Learning Frameworks](../deep-learning/frameworks.md) is recommended -- the deployment
    and monitoring pages assume you can train models with PyTorch or scikit-learn and understand
    model artifacts (`.pkl`, `.pt`). You should be comfortable with Python, REST APIs, and
    basic command-line usage.

*Total time: ~22-29 hours* | :yellow_circle::red_circle: Intermediate-Advanced

## Why MLOps?

Most ML courses end at model training. You fit a model on a dataset, evaluate it on a test set, get a good metric, and stop. But in practice, model training is the beginning, not the end. Deploying that model reliably, keeping it accurate as real-world data drifts, and understanding how all the system components fit together -- these skills are what separate a data scientist who does experiments from an ML engineer who ships reliable systems.

The gap between "model in a notebook" and "model serving production traffic" is where most ML projects stall or fail. MLOps is the discipline of bridging that gap: the practices, tools, and architectures that make ML systems reliable, reproducible, and maintainable over time. Research by Gartner found that the majority of ML models never make it to production. MLOps exists to change that ratio.

!!! tip "Why This Path"
    Three authoritative sources converge on the same curriculum order as this roadmap: Chip Huyen's "Designing ML Systems" builds from lifecycle to deployment to monitoring to system architecture (exactly the order used here). Full Stack Deep Learning covers the same arc in their course, explicitly noting that most ML courses skip operations entirely. Google's "Rules of ML" document begins with "Rule #1: Don't be afraid to launch a product without machine learning" -- emphasizing that understanding the full production context is prerequisite to good ML engineering. This roadmap covers MLOps after deep learning because production ML requires understanding both classical ML and neural networks to reason about deployment constraints, latency tradeoffs, and drift patterns.

## Section Overview

| Topic | Time | Difficulty | What You'll Learn |
|-------|------|-----------|-------------------|
| [Project Lifecycle](project-lifecycle.md) | ~5-7 hrs | :yellow_circle: Intermediate | Problem framing, data management with DVC, experiment tracking with MLflow, reproducibility, team workflow |
| [Model Deployment](model-deployment.md) | ~6-8 hrs | :yellow_circle: Intermediate | Serialization (joblib/ONNX), FastAPI serving, Docker containerization, batch vs real-time, cloud patterns |
| [Monitoring & Maintenance](monitoring-maintenance.md) | ~5-7 hrs | :yellow_circle::red_circle: Intermediate-Advanced | Drift taxonomy (data/concept/schema), KS test, prediction monitoring, retraining strategies, decision frameworks |
| [System Design](system-design.md) | ~6-7 hrs | :red_circle: Advanced | End-to-end architecture, feature stores, pipeline orchestration, online vs offline serving, interview patterns |

## Recommended Order

**Project Lifecycle first** -- it establishes the vocabulary and workflow structure (experiment tracking, reproducibility, team process) that all other pages assume. **Model Deployment second** -- once you understand the lifecycle, deployment is the natural next step: how do trained models get out of notebooks and into serving infrastructure? **Monitoring third** -- deployed models need observability; this page covers the statistical and operational techniques for maintaining model quality after deployment.

**System Design is last as the capstone.** It requires concepts from all three preceding pages: lifecycle for reproducible pipelines, deployment for serving infrastructure, and monitoring for the feedback loop. System design ties everything together into a coherent end-to-end architecture view and adds feature stores and orchestration as the final components.

The narrative arc of this section is: structure your project correctly (lifecycle), get the model into production (deployment), keep it accurate over time (monitoring), and understand how all the pieces fit into a complete system (design). Each page's "Next up" link reinforces this progression.

!!! info "Progress Tracking"
    Your progress is saved in your browser. Check off action items as you complete them -- your checkmarks persist across sessions using localStorage. Clearing browser data will reset your progress.

