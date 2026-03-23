# ML Project Lifecycle

!!! prerequisite "Before You Start"
    Complete the [Core ML](../core-ml/index.md) section and [Deep Learning Frameworks](../deep-learning/frameworks.md) before this section. Familiarity with Python, scikit-learn, and at least one deep learning framework is assumed.

*Total time: ~5-6 hours* | 🟡 Intermediate

## Learning Outcomes

By the end of this section, you will:

- Know how to frame an ML problem correctly and assess feasibility before writing a single line of model code
- Understand data collection, labeling strategies, and how to version datasets with tools like DVC
- Be able to track experiments systematically using MLflow and compare runs across parameter configurations
- Understand what "reproducibility" means in ML and how to ensure others can replicate your results
- Know how to communicate ML project progress and uncertainty to non-technical stakeholders

---

## Problem Framing and Feasibility

*⏱ ~45 minutes*

The most important decision in any ML project happens before the first line of code is written: deciding whether machine learning is the right tool for the problem, and if so, what exact problem to solve. This sounds obvious, but it is where most ML projects go wrong.

A well-framed ML problem has three properties. First, there is a clear **input** (what the model receives) and a clear **output** (what the model must predict). Second, there is a measurable **success criterion** tied to a business objective -- not just "high accuracy" but "accuracy above 95% on the test set, with false negative rate below 2%." Third, you have convincing evidence that the task is **learnable from data** -- that historical examples contain the signal needed to predict future outcomes.

Common framing mistakes: converting a business problem into the wrong ML formulation (optimizing for accuracy when F1 or AUC is the right metric), setting up the problem in a way that leaks future information into training, or failing to establish a simple baseline before investing in complex models.

Before starting any ML project, always ask: "What does success look like, and could a rule-based system solve this adequately?" A well-tuned heuristic or decision tree often outperforms an under-resourced ML project. ML is the right choice when the rules are too complex or variable to specify manually, and when labeled data is available. And even when ML is clearly appropriate, start simple -- a logistic regression baseline often captures 80% of the value of a complex deep learning model.

!!! tip "Teaching Moment"
    The "feasibility" conversation is not just technical -- it is also about data availability. Even a perfectly framed problem is unworkable if you cannot get labeled training data. Before committing to a project, verify that you can collect the training data you need, that labels are obtainable (and accurate), and that the training distribution will match the deployment distribution. Chip Huyen calls this the "data distribution check" and treats it as a prerequisite to any model development.

!!! tip "Why This Path"
    Both Chip Huyen ("Designing ML Systems," Ch. 2) and Full Stack Deep Learning explicitly state that most ML projects fail at the problem framing stage, not the modeling stage. The typical failure mode: a team spends months building a sophisticated model for the wrong metric or the wrong problem. This roadmap puts problem framing and feasibility first -- before data management, before experiment tracking -- because getting this wrong invalidates all downstream work.

!!! note
    "ML is not a solution in search of problems" -- Google's Rule #1 of ML. Every technique in this roadmap exists in service of a specific, well-defined problem. The clearer your problem definition, the more effective every technique becomes.

!!! action "What to Do"
    1. 📖 Read Google's "Rules of ML" introduction (the first 10 rules) for practical advice on when to use ML vs simpler approaches
    2. 📘 Read Chip Huyen "Designing ML Systems" Ch. 2 for the full problem framing framework
    3. 🎥 Watch the Full Stack Deep Learning "ML Projects" lecture for real-world framing examples
    4. 💻 For any dataset you are working with, write down: (a) the exact input/output, (b) the business metric that matters, (c) the ML metric that proxies for it, and (d) a naive baseline (e.g., always predict the majority class)

**Resources:**

- 📖 [Google: Rules of ML](https://developers.google.com/machine-learning/guides/rules-of-ml) -- 43 best practices for production ML from Google engineers; Rule 1-10 are essential for framing (Free)
- 📘 [Chip Huyen: Designing ML Systems, Ch. 2](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- The definitive guide to ML problem framing, from objective functions to business alignment (~$50, often available at libraries)
- 🎥 [Full Stack Deep Learning: ML Projects](https://fullstackdeeplearning.com/course/2022/) -- Practical lecture on ML project structure and failure modes (Free)
- 📖 [Made With ML: Problem Framing](https://madewithml.com/) -- End-to-end guide with problem framing as the starting point (Free)
- 🎯 [Andrew Ng: Structuring ML Projects](https://www.coursera.org/learn/machine-learning-projects) -- Dedicated course on ML strategy and problem decomposition (Free to audit)

---

## Data Management and Versioning

*⏱ ~1.5 hours*

Data is the foundation of every ML project, and managing it properly is what separates hobbyist projects from production systems. Poor data management shows up as unreproducible experiments, silent data bugs, and teams that cannot collaborate because nobody knows which dataset version was used to train which model.

**Data collection** is a continuous process in production ML, not a one-time event. You will often start with historical data, then move to data flywheels (where model predictions generate more labeled data), active learning (requesting labels for high-uncertainty examples), or weak supervision (programmatic labeling using heuristics). Each approach has different cost and quality tradeoffs.

**Data versioning** treats datasets the same way Git treats code: every change is tracked, you can reproduce any past state, and teams can collaborate without overwriting each other's work. DVC (Data Version Control) is the leading open-source tool for this. DVC tracks data files in Git-compatible metadata files while storing the actual data in a remote storage backend (S3, GCS, local). This means your Git history includes pointers to exact data versions, enabling full experiment reproducibility.

**Data quality** is often the most underestimated part of ML. Silent data issues -- mislabeled examples, missing values with non-random patterns, distribution shifts between data splits -- are far harder to debug than code bugs. Dataset cards (structured documentation of dataset characteristics, collection process, and known biases) are a simple practice that saves enormous debugging time.

A concrete data quality checklist worth running before any training run:

- Check class distribution: is your dataset balanced, or will you need class weighting?
- Check for duplicates: near-duplicate examples in both train and test sets cause optimistic evaluation
- Verify temporal ordering: for time-series data, ensure no future data leaks into training
- Sample and manually inspect 50-100 examples: nothing replaces looking at your data
- Check feature distributions: are test-set distributions similar to training? Large differences signal distribution shift

!!! tip "Teaching Moment"
    The phrase "garbage in, garbage out" is the most consistently true statement in ML. A model trained on 100k high-quality, well-labeled examples will almost always outperform the same model trained on 1M noisily labeled examples. When a model underperforms, the first question to ask is not "should I try a different architecture?" but "is my training data actually correct?" Experienced ML engineers spend more time on data than on modeling -- and that is the right allocation.

!!! action "What to Do"
    1. 💻 Install DVC (`pip install dvc`) and initialize it in a project with `dvc init`; track a dataset file and push it to a local remote
    2. 📖 Read the DVC "Get Started" tutorial (versioning section) to understand how DVC integrates with Git
    3. 📘 Read Chip Huyen "Designing ML Systems" Ch. 3-4 for data engineering and feature engineering in production
    4. 💻 Document a dataset you are working with using a simple dataset card: name, source, collection process, size, known limitations, preprocessing applied

**Resources:**

- 💻 [DVC Documentation: Get Started](https://dvc.org/doc/start) -- Official tutorial for data versioning with Git integration; covers the core workflow in under an hour (Free)
- 📘 [Chip Huyen: Designing ML Systems, Ch. 3-4](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Data engineering and feature engineering chapters; covers collection, labeling, and quality (~$50)
- 📖 [Made With ML: Data](https://madewithml.com/) -- Practical data management guide with code examples (Free)
- 🎯 [Full Stack Deep Learning: Data Management](https://fullstackdeeplearning.com/course/2022/) -- Lecture covering data pipelines, labeling strategies, and versioning (Free)
- 📖 [Hugging Face: Dataset Cards](https://huggingface.co/docs/hub/datasets-cards) -- Template and guidance for documenting datasets professionally (Free)

---

## Experiment Tracking

*⏱ ~1.5 hours*

When you start an ML project, it is tempting to try a model, see how it does, and iterate. After a few experiments, you cannot remember which hyperparameters gave the best result, or whether the model you trained last Thursday was the same as the one you deployed last Friday. This is the experiment tracking problem.

Experiment tracking systems log every run of your training script: the hyperparameters you used, the metrics you achieved, the model artifact produced, and optionally the data version and code version used. This gives you a searchable history of your entire experimental process, so you can answer questions like "what was my best validation F1, and what hyperparameters achieved it?" or "did changing the learning rate from 0.01 to 0.001 actually help?"

**MLflow** is the most widely adopted open-source experiment tracker. It has four components: Tracking (logging params, metrics, artifacts), Projects (packaging code for reproducibility), Models (model format for multi-framework serving), and Model Registry (lifecycle management for production models). The Tracking component is what you will use most.

```python linenums="1"
# Basic MLflow experiment tracking
import mlflow

mlflow.set_experiment("my-classification-project")

with mlflow.start_run():
    mlflow.log_param("model_type", "random_forest")
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 10)
    mlflow.log_metric("accuracy", 0.92)
    mlflow.log_metric("f1_score", 0.89)
    mlflow.log_metric("val_loss", 0.23)
    mlflow.sklearn.log_model(model, "model")
    # MLflow UI: mlflow ui (then visit http://localhost:5000)
```

**Weights & Biases (W&B)** is the commercial alternative with a richer UI, better visualization, and a generous free tier. It requires creating a free account but many teams prefer its experiment comparison interface and sweep functionality for hyperparameter search. W&B Sweeps is particularly powerful for automated hyperparameter search -- you define the parameter space and W&B runs multiple agents exploring it in parallel. For solo projects and learning, either tool works well; many practitioners use MLflow locally and W&B for team collaboration.

Beyond logging individual runs, experiment trackers let you compare multiple runs side-by-side, visualize how metrics change across epochs, set alerts for runs that exceed cost thresholds, and tag or annotate runs with notes. These features matter most when you have dozens or hundreds of experiments -- which happens faster than you expect once you start systematic hyperparameter tuning.

!!! tip "Teaching Moment"
    Jupyter notebooks are not experiment tracking. They are excellent for exploration, but a notebook does not reliably record which cells ran in which order, what the random seed was, or how it compares to the notebook from last week. The moment you start training models and comparing results, you need a proper experiment tracker. Think of MLflow as a lab notebook that never loses data and lets you search your history.

!!! action "What to Do"
    1. 💻 Install MLflow (`pip install mlflow`) and add tracking to an existing training script -- log at least 2 parameters and 2 metrics per run
    2. 💻 Run the MLflow UI (`mlflow ui`) and compare 3-5 runs with different hyperparameters in the comparison view
    3. 📖 Read the MLflow Quickstart to understand the full workflow from tracking to the model registry
    4. 🎥 Watch the W&B quickstart video to see what a richer experiment tracking interface looks like as an alternative

**Resources:**

- 💻 [MLflow Quickstart](https://mlflow.org/docs/latest/quickstart.html) -- Official getting-started guide; covers tracking, runs, and the UI in 30 minutes (Free)
- 💻 [Weights & Biases: Get Started](https://docs.wandb.ai/quickstart) -- Free tier, excellent UI; great alternative to MLflow with richer visualization (Free tier available)
- 🎯 [Made With ML: Experiment Tracking](https://madewithml.com/) -- End-to-end tutorial integrating experiment tracking into a real project (Free)
- 🎥 [Full Stack Deep Learning: Experiment Management](https://fullstackdeeplearning.com/course/2022/) -- Lecture on experiment tracking best practices and tool comparison (Free)
- 📖 [MLflow Documentation: Tracking](https://mlflow.org/docs/latest/tracking.html) -- Complete reference for logging params, metrics, artifacts, and using the Model Registry (Free)

---

## Reproducibility

*⏱ ~1 hour*

Reproducibility means that if you (or anyone else) runs your experiment again with the same setup, they get the same result. This sounds simple but is surprisingly hard to achieve in ML. The sources of non-reproducibility are numerous: random initialization, non-deterministic GPU operations, underspecified dependencies, missing data preprocessing steps, and environment differences.

**Environment reproducibility** is the first layer. Specify exact dependency versions in a `requirements.txt` or `environment.yml` file. Better yet, use Docker to freeze the entire runtime environment. A model that works in your environment but not your colleague's is not a reproducible model.

**Algorithmic reproducibility** requires setting random seeds everywhere they appear: Python's `random.seed()`, NumPy's `numpy.random.seed()`, framework-specific seeds (`torch.manual_seed()`, `tf.random.set_seed()`). Also be aware that some GPU operations are inherently non-deterministic -- PyTorch provides `torch.use_deterministic_algorithms(True)` to enforce determinism at a performance cost.

**Experiment reproducibility** requires that every run is fully specified by a configuration file, not by code changes or command-line flags that get forgotten. Tools like Hydra or simple YAML config files let you store the complete experimental configuration alongside the results. When combined with MLflow, you can always reconstruct what exact settings produced a given result.

A minimal reproducibility checklist for any ML project:

```python linenums="1"
import random
import numpy as np
import torch

def set_seeds(seed: int = 42) -> None:
    """Set all random seeds for reproducibility."""
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)
    # Optional: enforce deterministic algorithms (slower but reproducible)
    # torch.use_deterministic_algorithms(True)

# Call at the top of your training script
set_seeds(42)
```

This is not sufficient on its own -- you also need pinned dependencies and data versioning -- but it is the most frequently forgotten step.

!!! tip "Teaching Moment"
    The reproducibility crisis in academic ML is real: a significant fraction of published ML results cannot be reproduced by independent researchers. This matters for practitioners too -- if you cannot reproduce your own results from three months ago, you cannot iterate effectively or debug regressions. Treating reproducibility as a first-class concern is what separates professional ML work from research notebooks.

!!! action "What to Do"
    1. 💻 Add a random seed initialization block to an existing training script, verify that two identical runs produce identical results
    2. 💻 Create a `requirements.txt` using `pip freeze > requirements.txt` and test it by setting up a fresh virtual environment
    3. 📖 Read the MLflow documentation on "Reproducibility" to see how MLflow logs code version alongside runs
    4. 📖 Read the DVC documentation on experiment reproducibility to understand how data versioning integrates with code versioning

**Resources:**

- 📖 [MLflow: Reproducibility](https://mlflow.org/docs/latest/projects.html) -- MLflow Projects spec for packaging code for reproducible execution (Free)
- 💻 [DVC: Reproducibility](https://dvc.org/doc/use-cases/versioning-data-and-models) -- Data versioning to ensure the same dataset produces the same model (Free)
- 📖 [PyTorch: Reproducibility Guide](https://pytorch.org/docs/stable/notes/randomness.html) -- Official guide to seed setting and deterministic operations in PyTorch (Free)
- 📖 [Made With ML: Reproducibility](https://madewithml.com/) -- Practical reproducibility practices integrated into real ML workflows (Free)
- 📘 [Chip Huyen: Designing ML Systems, Ch. 4](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Feature and data pipeline practices that affect reproducibility (~$50)

---

## Team Workflow and Communication

*⏱ ~30 minutes*

ML projects differ from software projects in ways that frequently cause friction with stakeholders and teammates. The biggest difference: ML is inherently iterative and uncertain. You cannot reliably estimate how long it will take to reach a target accuracy, because you do not know until you try. Managing this uncertainty professionally is a core MLOps skill.

Effective ML project communication has a few principles. First, always set a baseline before claiming model progress -- "our model achieves 87% accuracy" means nothing without knowing what the naive baseline achieves. Second, communicate in business metrics, not ML metrics -- stakeholders care about revenue impact or user retention, not F1 score. Third, be explicit about what you are trying to learn in each experimental iteration, so the team can evaluate whether the experiment answered its question.

ML project timelines should include explicit decision points: milestones where the team evaluates whether to continue, pivot the approach, or stop. The "sunk cost" fallacy is particularly dangerous in ML -- teams often continue optimizing a fundamentally flawed approach because they have invested significant compute time. Build in stopping criteria from the start.

A practical ML project phase structure:

1. **Scoping (1-2 weeks)**: Define the problem, gather stakeholder alignment, establish success criteria, identify data sources
2. **Data baseline (1-2 weeks)**: Data audit, quality checks, establish a simple baseline (majority class, linear model, rule-based)
3. **Modeling sprint (2-4 weeks)**: Experiment with 2-3 model families, track experiments in MLflow, converge on a promising approach
4. **Hardening (1-2 weeks)**: Reproducibility, testing, integration with serving infrastructure
5. **Production review**: Evaluate against success criteria before deployment -- does this solve the original problem?

Each phase ends with a checkpoint: "Should we continue, change direction, or stop?" Building this rhythm prevents the common pathology of endless optimization without deployment.

!!! tip "Teaching Moment"
    The phrase "good enough" is undervalued in ML. Iterating from 94% to 95% accuracy often requires 10x more effort than going from 80% to 94%. Know when you have reached diminishing returns and when business needs would be better served by deploying what you have and iterating based on real-world feedback rather than benchmark numbers. Chip Huyen calls this "the marginal returns on modeling effort" -- and most teams stop before they hit the point where more ML investment pays off.

!!! action "What to Do"
    1. 📖 Read Made With ML's section on ML project management for a template for iterative ML development
    2. 📘 Read Chip Huyen "Designing ML Systems" Ch. 4 on feature engineering and the productivity practices of effective ML teams
    3. 🎥 Watch the Full Stack Deep Learning "Teams and Roles" lecture for practical team structure advice
    4. 💻 For your next project, write a one-page project spec before training anything: problem definition, success criteria, baseline, data plan, and first experiment to run

**Resources:**

- 📖 [Made With ML: MLOps](https://madewithml.com/) -- Full-stack ML project workflow with team practices built in (Free)
- 📘 [Chip Huyen: Designing ML Systems, Ch. 2](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Objective functions, project framing, and stakeholder communication (~$50)
- 🎥 [Full Stack Deep Learning: Teams and Roles](https://fullstackdeeplearning.com/course/2022/) -- Lecture on ML team structure, roles, and project management (Free)
- 📖 [Google: Rules of ML (Rules 1-10)](https://developers.google.com/machine-learning/guides/rules-of-ml) -- Google's advice on ML project governance and iteration speed (Free)
- 🎯 [Andrew Ng: Structuring ML Projects](https://www.coursera.org/learn/machine-learning-projects) -- Full course on ML strategy, debugging, and priority-setting (Free to audit)

---

## Key Takeaways

- **Problem framing is the highest-leverage step**: most ML projects fail at framing, not modeling -- define success criteria and a baseline before writing model code
- **Data quality trumps model complexity**: 100k well-labeled examples beat 1M noisy ones; invest in data management before model tuning
- **Experiment tracking is not optional**: once you have more than a handful of experiments, a proper tracker like MLflow or W&B pays for itself immediately in time saved debugging
- **Reproducibility requires intentional effort**: set random seeds, pin dependencies, use config files -- if you cannot reproduce your own results, you cannot iterate effectively
- **Communicate in business terms**: stakeholders care about impact, not accuracy numbers; always translate ML metrics to business outcomes

---

**Next up:** [Model Deployment](model-deployment.md) -- how to package trained models as REST APIs, containerize them with Docker, and understand the cloud deployment landscape

