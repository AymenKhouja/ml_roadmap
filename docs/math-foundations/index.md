# Math Foundations

!!! prerequisite "Before You Start"
    No prerequisites -- this is the starting point of the roadmap. Basic high school algebra is assumed.

*Total time: ~25 hours* | :green_circle: Beginner to :yellow_circle: Intermediate

## Why Math for ML?

Machine learning algorithms are mathematical functions. Linear regression solves a matrix equation. Neural networks chain matrix multiplications with nonlinearities. Classifiers compute conditional probabilities. Without understanding the math, you can call `model.fit()` but you cannot debug why your model fails, choose the right algorithm for your problem, or read the papers that introduce new techniques.

The good news: you do not need a math degree. You need three specific areas -- linear algebra (how data is represented), calculus (how models learn), and probability (how models reason under uncertainty). These three cover the mathematical foundations used by the vast majority of ML algorithms.

!!! tip "Why This Path"
    roadmap.sh, Andrew Ng's ML Specialization, and fast.ai all list math foundations as the first prerequisite. We follow the Mathematics for Machine Learning (MML) book philosophy: learn just enough to understand the ML algorithms, then deepen as needed. You will not prove theorems -- you will build intuition for what your models actually compute.

## Section Overview

| Topic | Time | Difficulty | What You'll Learn |
|-------|------|-----------|-------------------|
| [Linear Algebra](linear-algebra.md) | ~8-10 hrs | :green_circle: Beginner | Vectors, matrices, eigenvalues -- the data representation layer |
| [Calculus](calculus.md) | ~7-9 hrs | :yellow_circle: Beginner-Intermediate | Derivatives, gradients, chain rule -- how models learn |
| [Probability & Statistics](probability-statistics.md) | ~8-10 hrs | :yellow_circle: Intermediate | Distributions, Bayes' theorem, MLE -- reasoning under uncertainty |

## Recommended Order

**Linear Algebra first** -- it provides the vocabulary (vectors, matrices) used everywhere else. **Calculus second** -- it builds on linear algebra (gradients are vectors, the normal equation uses matrices). **Probability third** -- it can be studied in parallel with Linear Algebra if you prefer, but the full sequence gives the most coherent learning experience.

!!! info "Progress Tracking"
    Your progress is saved in your browser. Check off action items as you complete them -- your checkmarks persist across sessions using localStorage.
