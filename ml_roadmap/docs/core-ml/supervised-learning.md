# Supervised Learning

!!! prerequisite "Before You Start"
    Complete [Linear Algebra](../math-foundations/linear-algebra.md) and
    [Scikit-learn Basics](../python-ml/scikit-learn.md) before this section.

*Total time: ~8 hours* | 🟡 Intermediate

## Learning Outcomes

By the end of this section, you will:

- Understand the difference between regression and classification problems
- Know how key algorithms work: linear/logistic regression, decision trees, ensemble methods, SVMs
- Be able to select the right algorithm for a given problem type and dataset
- Have trained and evaluated models on real datasets using scikit-learn
- Understand the bias-variance tradeoff and how it guides model selection

---

## What is Supervised Learning?

*⏱ ~30 minutes*

Supervised learning is the branch of machine learning where you learn from **labeled data** -- each training example comes with an input and the correct output. The algorithm's job is to learn a mapping from inputs to outputs that generalizes to unseen data.

There are two main types. **Regression** predicts a continuous number (house price, temperature, stock return). **Classification** predicts a discrete category (spam vs not spam, cat vs dog, disease vs healthy). The choice between them is determined by what you are predicting, not by the algorithm -- many algorithms have both regression and classification variants.

The supervised learning workflow follows a consistent pattern: collect labeled data, split into training and test sets, choose a model, train it on training data, evaluate on test data, and iterate. Every algorithm in this section follows this same loop -- what changes is the model itself.

!!! tip "Teaching Moment"
    The word "supervised" comes from the idea that labeled data acts like a teacher supervising the learning process. The model makes a prediction, compares it to the known answer, and adjusts. This is fundamentally different from unsupervised learning, where there are no labels and the algorithm must find structure on its own.

!!! action "What to Do"
    1. 🎥 Watch Andrew Ng's "What is Machine Learning?" lecture (10 min) for the big picture of supervised vs unsupervised learning
    2. 📖 Read the scikit-learn introduction to supervised learning for a practical overview
    3. 💻 Load the Iris dataset in scikit-learn (`from sklearn.datasets import load_iris`) and explore its structure -- features, labels, and shapes

**Resources:**

- 🎥 [Andrew Ng: What is Machine Learning?](https://www.coursera.org/learn/machine-learning) -- The opening lecture that frames the entire field; sets up supervised vs unsupervised clearly (Free to audit)
- 📖 [Scikit-learn: Supervised Learning Overview](https://scikit-learn.org/stable/supervised_learning.html) -- Practical overview of all supervised methods with code links (Free)
- 📘 [ISLR Ch. 2: Statistical Learning](https://www.statlearning.com/) -- The "what" and "why" of supervised learning from a statistical perspective (Free)
- 🎥 [StatQuest: Machine Learning Fundamentals](https://statquest.org/statquest-machine-learning-fundamentals-cross-validation-and-the-bias-variance-tradeoff/) -- Visual explanation of the core concepts: fitting, testing, bias-variance (Free)

---

## Linear Regression

*⏱ ~1.5 hours*

Linear regression is the simplest supervised learning model and the best place to start. It finds the best-fitting line (or hyperplane) through your data by minimizing the sum of squared errors between predictions and actual values.

The model learns a weight (coefficient) for each feature. A positive weight means that feature pushes the prediction up; a negative weight pushes it down. The magnitude tells you how much influence that feature has. The intercept (bias term) shifts the entire prediction up or down.

$$\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \cdots + w_n x_n$$

The training process finds the weights that minimize the **mean squared error (MSE)** -- the average squared difference between predicted and actual values. This can be solved directly (normal equation) or iteratively (gradient descent). Scikit-learn uses the direct solution by default, which is exact and fast for moderate-sized datasets.

!!! tip "Teaching Moment"
    "Linear" in linear regression refers to the model being linear in its **parameters** (weights), not in its features. You can add polynomial features like \(x^2\) or \(x_1 \cdot x_2\) and still use linear regression -- the model remains a linear combination of (now non-linear) features. This makes linear regression far more flexible than its name suggests.

!!! action "What to Do"
    1. 🎥 Watch StatQuest's "Linear Regression" (11 min) for visual intuition on least squares and R-squared
    2. 📘 Read ISLR Chapter 3.1-3.2 for the statistical foundations of simple and multiple regression
    3. 💻 Train a `LinearRegression` on the California Housing dataset using scikit-learn, evaluate with R-squared, and inspect the learned coefficients

**Resources:**

- 🎥 [StatQuest: Linear Regression Clearly Explained](https://statquest.org/linear-regression/) -- Best visual walkthrough of least squares, R-squared, and p-values (Free)
- 📘 [ISLR Ch. 3: Linear Regression](https://www.statlearning.com/) -- Rigorous but accessible treatment of simple and multiple regression (Free)
- 💻 [Kaggle Learn: Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning) -- Hands-on exercises with real datasets and immediate feedback (Free)
- 🎯 [Andrew Ng ML Specialization, Course 1](https://www.coursera.org/learn/machine-learning) -- Full video lectures covering linear regression with gradient descent (Free to audit)
- 📖 [Scikit-learn: LinearRegression](https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares) -- Official docs with code examples and mathematical details (Free)

---

## Logistic Regression

*⏱ ~1 hour*

Logistic regression extends linear regression to classification problems. Instead of predicting a continuous value, it predicts the **probability** that an input belongs to a particular class. Despite the name, it is a classification algorithm, not a regression one.

The key idea is the **sigmoid function**, which squashes any real number into the range (0, 1):

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

The model computes a linear combination of features (just like linear regression), then passes the result through the sigmoid to get a probability. If the probability is above 0.5, predict class 1; otherwise, predict class 0. The **decision boundary** is the surface where the probability equals exactly 0.5.

Training uses **log loss** (cross-entropy) instead of MSE, which penalizes confident wrong predictions heavily. This is optimized with gradient descent since there is no closed-form solution like in linear regression.

!!! tip "Teaching Moment"
    The name "logistic regression" confuses almost everyone. It is called "regression" because it regresses on the log-odds (logarithm of the odds ratio), which is a continuous value. But in practice, you use it for classification. When you see "logistic regression" in a job posting or paper, think "classification."

!!! action "What to Do"
    1. 🎥 Watch StatQuest's "Logistic Regression" (15 min) for the intuition behind the sigmoid and log-odds
    2. 📖 Read ISLR Chapter 4.1-4.3 for the statistical foundations of logistic regression
    3. 💻 Train a `LogisticRegression` on a binary classification dataset (e.g., Breast Cancer Wisconsin), plot the decision boundary, and examine the confusion matrix

**Resources:**

- 🎥 [StatQuest: Logistic Regression](https://statquest.org/logistic-regression/) -- Clear visual explanation of sigmoid, log-odds, and maximum likelihood estimation (Free)
- 📘 [ISLR Ch. 4: Classification](https://www.statlearning.com/) -- Logistic regression in the context of classification methods (Free)
- 💻 [Scikit-learn: Logistic Regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) -- Official docs with regularization options and solver choices (Free)
- 🎯 [Andrew Ng ML Specialization, Course 1](https://www.coursera.org/learn/machine-learning) -- Logistic regression lectures with gradient descent derivation (Free to audit)

---

## Decision Trees

*⏱ ~1.5 hours*

Decision trees learn a series of if-then rules from data, splitting features at thresholds that best separate the target classes (or reduce prediction error for regression). Think of it as a flowchart: at each node, the tree asks "Is feature X above threshold T?" and branches accordingly.

The key insight is **how trees choose splits**. For classification, they maximize **information gain** (or minimize **Gini impurity**) -- picking the split that creates the purest child nodes. For regression, they minimize the variance of predictions in each leaf. The tree grows greedily, choosing the best split at each step without looking ahead.

Decision trees are easy to interpret -- you can visualize the entire decision logic as a tree diagram. However, they have a critical weakness: they **overfit** easily. A tree with no depth limit will memorize the training data perfectly, creating one leaf per training example. Controlling tree depth, minimum samples per leaf, and pruning are essential for practical use.

!!! tip "Teaching Moment"
    Decision trees are the foundation for the most powerful tabular ML methods (Random Forests, XGBoost, LightGBM). Understanding how a single tree works -- and *why* it overfits -- is essential for understanding why ensembles solve that problem. If you only learn one thing here, learn why deep trees memorize and shallow trees generalize.

!!! action "What to Do"
    1. 🎥 Watch StatQuest's "Decision Trees" (18 min) for visual intuition on splits and Gini impurity
    2. 📘 Read ISLR Chapter 8.1 for the mathematical framework of tree-based methods
    3. 💻 Train a `DecisionTreeClassifier` on the Iris dataset, visualize it with `sklearn.tree.plot_tree()`, and experiment with `max_depth` to see how depth affects overfitting

**Resources:**

- 🎥 [StatQuest: Decision Trees](https://statquest.org/decision-and-classification-trees-clearly-explained/) -- Best visual explanation of Gini impurity and information gain (Free)
- 📘 [ISLR Ch. 8.1: Tree-Based Methods](https://www.statlearning.com/) -- Statistical treatment of decision trees (Free)
- 💻 [Scikit-learn: Decision Trees](https://scikit-learn.org/stable/modules/tree.html) -- Official docs with visualization examples and parameter tuning guidance (Free)
- 🎯 [Andrew Ng: Decision Trees (Course 2, Week 4)](https://www.coursera.org/learn/advanced-learning-algorithms) -- Video lectures covering trees with practical intuition (Free to audit)
- 📖 [Kaggle: Decision Tree Tutorial](https://www.kaggle.com/learn/intro-to-machine-learning) -- Hands-on coding with immediate feedback (Free)

---

## Ensemble Methods

*⏱ ~1.5 hours*

Ensemble methods combine multiple models to produce better predictions than any single model alone. The two main strategies are **bagging** (train many independent models and average) and **boosting** (train models sequentially, each fixing the previous one's mistakes).

**Random Forests** are the classic bagging approach: train many decision trees on random subsets of data and features, then average their predictions. Each individual tree overfits differently, but the average cancels out the noise. Random Forests are hard to get wrong -- they work well out of the box with minimal tuning.

**Gradient Boosting** (XGBoost, LightGBM, CatBoost) is the boosting approach: train trees sequentially, where each new tree focuses on the errors of all previous trees. Gradient boosting is more powerful than Random Forests but requires more careful tuning of learning rate, tree depth, and number of iterations. In practice, XGBoost and LightGBM dominate Kaggle competitions and production ML on tabular data.

!!! tip "Why This Path"
    roadmap.sh lists SVMs as a core supervised learning topic with equal weight to tree methods. Andrew Ng's updated ML Specialization has shifted emphasis toward tree-based methods and neural networks. fast.ai's Jeremy Howard is explicit: "Random forests should be your first model for any structured data problem." We cover SVMs for completeness (next section) but recommend spending more time here -- ensemble methods are what you will actually use in practice for tabular data.

!!! tip "Teaching Moment"
    The power of ensembles comes from **variance reduction**. A single deep tree has low bias but high variance (it memorizes training data). By averaging many such trees (each trained on slightly different data), the variance drops dramatically while bias stays low. This is the bias-variance tradeoff in action -- ensembles solve the overfitting problem without sacrificing model complexity.

!!! action "What to Do"
    1. 🎥 Watch StatQuest's "Random Forests" (10 min) and "XGBoost" series (4 parts, ~40 min total) for visual intuition on bagging and boosting
    2. 📘 Read ISLR Chapter 8.2 for the theory behind bagging, random forests, and boosting
    3. 💻 Train a `RandomForestClassifier` on the Iris dataset, compare accuracy with a single `DecisionTreeClassifier`, then try `XGBClassifier` from the xgboost library

**Resources:**

- 🎥 [StatQuest: Random Forests](https://statquest.org/random-forests-clearly-explained/) -- Clear visual explanation of bagging and feature randomization (Free)
- 🎥 [StatQuest: XGBoost Series](https://statquest.org/xgboost-part-1-regression/) -- 4-part series covering gradient boosting from scratch (Free)
- 📘 [ISLR Ch. 8.2: Bagging, Random Forests, Boosting](https://www.statlearning.com/) -- Theoretical foundations for all ensemble methods (Free)
- 💻 [XGBoost Documentation](https://xgboost.readthedocs.io/) -- Official docs with tutorials and parameter tuning guide (Free)
- 🎯 [Kaggle Learn: Intermediate Machine Learning](https://www.kaggle.com/learn/intermediate-machine-learning) -- Hands-on XGBoost exercises with real competition data (Free)

---

## Support Vector Machines

*⏱ ~1 hour*

Support Vector Machines (SVMs) find the hyperplane that maximizes the **margin** -- the distance between the decision boundary and the closest data points from each class. These closest points are called "support vectors" because they are the only points that matter for defining the boundary.

The geometric intuition is simple: among all possible separating hyperplanes, pick the one that stays as far as possible from both classes. This maximum-margin approach tends to generalize well because it finds the most "cautious" boundary.

For non-linearly separable data, SVMs use the **kernel trick** -- a mathematical technique that maps data into a higher-dimensional space where a linear separator exists, without actually computing the transformation. Common kernels include polynomial and RBF (radial basis function). The kernel trick makes SVMs powerful for complex decision boundaries but also harder to tune and scale.

!!! tip "Teaching Moment"
    SVMs were the dominant ML method from the late 1990s through the early 2010s. They still have genuine advantages: they work well on small datasets with high-dimensional features (text classification, genomics) and have strong theoretical guarantees. However, for most tabular data problems with moderate-to-large datasets, tree ensembles are faster, easier to tune, and equally accurate. Know SVMs for interviews and for the specific cases where they shine.

!!! action "What to Do"
    1. 🎥 Watch StatQuest's "Support Vector Machines" (20 min) for the geometric intuition of margins and kernels
    2. 📖 Read the scikit-learn SVM guide for practical usage patterns and kernel choices
    3. 💻 Train an `SVC` on a 2D dataset, visualize the decision boundary and support vectors, then experiment with different kernels (linear, RBF, polynomial)

**Resources:**

- 🎥 [StatQuest: Support Vector Machines](https://statquest.org/support-vector-machines-clearly-explained/) -- Best visual explanation of margins, support vectors, and the kernel trick (Free)
- 📘 [ISLR Ch. 9: Support Vector Machines](https://www.statlearning.com/) -- Thorough treatment from maximal margin to kernel SVMs (Free)
- 💻 [Scikit-learn: SVM Guide](https://scikit-learn.org/stable/modules/svm.html) -- Official docs with kernel comparison and practical tips (Free)
- 🎯 [Andrew Ng: SVMs (Course 1)](https://www.coursera.org/learn/machine-learning) -- Lectures covering the intuition behind large margin classification (Free to audit)

---

## Model Selection and Practical Tips

*⏱ ~1 hour*

Knowing individual algorithms is necessary but not sufficient -- you need a framework for choosing the right one. Model selection depends on your data, your constraints, and your goals.

**A practical decision framework:**

- **Small dataset, high dimensions** (e.g., genomics, text with TF-IDF): Start with SVMs or logistic regression with regularization
- **Medium-to-large tabular data** (most business problems): Start with Random Forest, then try XGBoost/LightGBM
- **Need interpretability** (medical, legal, finance): Start with logistic regression or shallow decision trees
- **Binary classification with linear boundary**: Logistic regression is hard to beat
- **Don't know where to start**: Random Forest first -- it works well out of the box with minimal tuning

!!! tip "Teaching Moment"
    The "No Free Lunch" theorem states that no single algorithm is best for every problem. In practice, this means you should always try multiple approaches and compare them on held-out data. But it does *not* mean you should try every algorithm randomly -- the decision framework above gives you informed starting points based on decades of practitioner experience.

!!! action "What to Do"
    1. 📖 Read the scikit-learn algorithm cheat sheet for a visual guide to model selection
    2. 💻 Pick a Kaggle dataset and practice the full workflow: explore data, choose 2-3 algorithms based on the framework above, train, evaluate with cross-validation, compare results
    3. 📖 Read about cross-validation and train/test splits in ISLR Chapter 5 to understand why evaluation methodology matters as much as algorithm choice

**Resources:**

- 📖 [Scikit-learn: Choosing the Right Estimator](https://scikit-learn.org/stable/machine_learning_map.html) -- Visual flowchart for algorithm selection based on data characteristics (Free)
- 📘 [ISLR Ch. 5: Resampling Methods](https://www.statlearning.com/) -- Cross-validation and bootstrap methods for model evaluation (Free)
- 🎥 [StatQuest: Cross-Validation](https://statquest.org/cross-validation-clearly-explained/) -- Visual explanation of k-fold cross-validation and why it matters (Free)
- 💻 [Kaggle Learn: Intermediate Machine Learning](https://www.kaggle.com/learn/intermediate-machine-learning) -- Practical exercises on pipelines, cross-validation, and XGBoost (Free)
- 🎯 [fast.ai: Practical Deep Learning, Lesson 6](https://course.fast.ai/) -- Jeremy Howard's practical approach to model selection for tabular data (Free)

---

## Key Takeaways

- **Supervised learning = labeled data**: every algorithm here learns a mapping from inputs to known outputs; the quality of your labels determines the ceiling of your model
- **No free lunch**: no single algorithm wins everywhere -- trees for tabular data, linear models for interpretability, SVMs for small high-dimensional datasets
- **Ensemble methods dominate practice**: Random Forests and gradient boosting (XGBoost/LightGBM) are the workhorses of production ML on structured data
- **Bias-variance tradeoff is fundamental**: simple models underfit (high bias), complex models overfit (high variance) -- regularization and ensembles navigate this tradeoff
- **Always evaluate properly**: train/test split at minimum, cross-validation for reliable estimates -- never evaluate on training data

---

**Next up:** [Unsupervised Learning](unsupervised-learning.md) -- clustering, dimensionality reduction, and finding structure in unlabeled data
