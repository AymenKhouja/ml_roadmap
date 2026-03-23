# Python for ML

!!! prerequisite "Before You Start"
    Complete the [Math Foundations](../math-foundations/index.md) section before starting here. Basic Python knowledge (variables, loops, functions, lists) is assumed.

*Total time: ~25-33 hours* | :green_circle: Beginner to :yellow_circle: Intermediate

## Why Python for ML?

Python is the dominant language in machine learning, and four libraries form its essential toolkit. NumPy provides the array computation engine. Pandas handles data loading, cleaning, and transformation -- the work that consumes 60-80% of a practitioner's time. Matplotlib and Seaborn turn data into visual insights. Scikit-learn ties everything together with a consistent API for building, evaluating, and selecting models.

These libraries are not optional extras -- they are assumed knowledge in every ML course, textbook, and job posting. Kaggle competitions, Andrew Ng's courses, fast.ai, and Stanford's CS229 all use this exact stack. Mastering these tools here means you can focus on algorithms and theory in later sections rather than fighting with tooling.

!!! tip "Why This Path"
    roadmap.sh, Andrew Ng's ML Specialization, fast.ai, and Kaggle all assume fluency with NumPy, Pandas, Matplotlib, and Scikit-learn. We teach these tools before ML algorithms so that when you reach the Core ML section, you can focus on understanding the models rather than struggling with data loading and preprocessing. This matches the learning path recommended by virtually every ML educator.

## Section Overview

| Topic | Time | Difficulty | What You'll Learn |
|-------|------|-----------|-------------------|
| [NumPy](numpy.md) | ~6-8 hrs | :green_circle: Beginner | Arrays, vectorization, broadcasting -- the computation engine |
| [Pandas](pandas.md) | ~7-9 hrs | :green_circle: Beginner to :yellow_circle: Intermediate | Data loading, cleaning, transformation -- 80% of ML work |
| [Visualization](visualization.md) | ~5-7 hrs | :green_circle: Beginner to :yellow_circle: Intermediate | Matplotlib, Seaborn -- seeing your data and model results |
| [Scikit-learn](scikit-learn.md) | ~7-9 hrs | :yellow_circle: Intermediate | The ML API: fit, predict, evaluate -- your first models |

## Recommended Order

**NumPy first** -- it provides the array operations that everything else builds on. **Pandas second** -- it extends NumPy arrays into labeled DataFrames for real-world data work. **Visualization third** -- it turns your DataFrames into visual insights using Matplotlib and Seaborn. **Scikit-learn last** -- it ties NumPy arrays, Pandas DataFrames, and visualization into a complete ML workflow. Each page builds on the previous one, so follow this order for the smoothest experience.

!!! info "Progress Tracking"
    Your progress is saved in your browser. Check off action items as you complete them -- your checkmarks persist across sessions using localStorage.
