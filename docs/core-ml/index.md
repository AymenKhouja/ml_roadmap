# Core ML

!!! prerequisite "Before You Start"
    Complete the [Python for ML](../python-ml/index.md) section before starting here. You will need NumPy, Pandas, visualization skills, and scikit-learn basics to work through these pages.

*Total time: ~28-32 hours* | :yellow_circle: Intermediate

## Why Classical ML?

Classical ML algorithms are the foundation every ML engineer must understand before moving to deep learning. These methods dominate tabular data problems in industry -- Random Forests, XGBoost, and logistic regression power the majority of production ML systems. More importantly, the conceptual framework you build here (bias-variance tradeoff, evaluation methodology, feature engineering) applies to every ML approach, including deep learning.

!!! tip "Why This Path"
    roadmap.sh, Andrew Ng's ML Specialization, fast.ai, and Stanford's CS229 all teach classical ML before deep learning. The consensus is clear: if you skip classical ML and jump straight to neural networks, you will lack the evaluation discipline and feature intuition that separates working ML systems from overfit experiments. Classical ML is faster to train, easier to debug, and often more accurate on structured data -- learn it first.

## Section Overview

| Topic | Time | Difficulty | What You'll Learn |
|-------|------|-----------|-------------------|
| [Supervised Learning](supervised-learning.md) | ~8 hrs | :yellow_circle: Intermediate | Regression, classification, decision trees, ensembles, SVMs |
| [Unsupervised Learning](unsupervised-learning.md) | ~6-8 hrs | :yellow_circle: Intermediate | Clustering, PCA, t-SNE/UMAP, anomaly detection |
| [Model Evaluation](model-evaluation.md) | ~6-8 hrs | :yellow_circle: Intermediate | Metrics, cross-validation, bias-variance, hyperparameter tuning |
| [Feature Engineering](feature-engineering.md) | ~6-8 hrs | :yellow_circle: Intermediate | Scaling, encoding, selection, pipelines, data leakage prevention |

## Recommended Order

**Supervised learning first** -- it builds intuition for labeled data, algorithm selection, and the train/evaluate workflow. **Unsupervised learning second** -- it contrasts with supervised by working without labels and introduces clustering and dimensionality reduction. **Model evaluation third** -- it applies to both supervised and unsupervised methods, teaching the metrics and methodology that make your results trustworthy. **Feature engineering last** -- it references evaluation metrics, builds complete preprocessing pipelines, and ties the whole section together.

!!! info "Progress Tracking"
    Your progress is saved in your browser. Check off action items as you complete them -- your checkmarks persist across sessions using localStorage.
