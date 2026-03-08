# Model Evaluation

!!! prerequisite "Before You Start"
    Complete [Supervised Learning](supervised-learning.md) and
    [Scikit-learn Basics](../python-ml/scikit-learn.md) before this section.

*Total time: ~6-8 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Know the key classification metrics (accuracy, precision, recall, F1, AUC-ROC) and when each matters
- Understand regression metrics (MSE, RMSE, MAE, R-squared) and their trade-offs
- Be able to implement cross-validation for reliable model evaluation
- Understand the bias-variance tradeoff and how to diagnose underfitting vs overfitting
- Have a practical workflow for hyperparameter tuning using GridSearchCV and RandomizedSearchCV

---

## Why Evaluation Matters

*⏱ ~20 minutes*

A model that memorizes training data looks perfect -- until it sees new data. This is the **overfitting trap**, and proper evaluation is the skill that catches it. The difference between a demo and a production ML system often comes down to one thing: did you evaluate correctly?

The core principle is simple: **never evaluate on the data you trained on.** Training accuracy is meaningless because the model has already seen those examples. You must hold out data the model has never seen (test set) and measure performance there. This gives you an honest estimate of how the model will perform on real, unseen data.

This principle extends to every step of the ML workflow. Feature scaling must be fit on training data only. Hyperparameter tuning must use cross-validation on training data only. The test set is a sacred holdout -- touched once, at the very end, to get your final performance number. Any time test data influences a training decision, you have **data leakage** and your estimates are unreliable.

The train/test split is the minimum. You split your data (typically 80/20 or 70/30), train on the larger portion, and evaluate on the smaller one. But a single split can be misleading -- you might get lucky or unlucky with which examples end up in each set. Cross-validation (covered later in this page) solves this by repeating the split multiple times.

!!! tip "Teaching Moment"
    "Accuracy on training data is meaningless." This is the single most important sentence in model evaluation. A decision tree with no depth limit achieves 100% training accuracy on any dataset -- it simply memorizes every example. The test accuracy is what tells you whether the model actually learned useful patterns. If you take away one thing from this page, take this: always evaluate on held-out data.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "Machine Learning Fundamentals: Bias and Variance" (6 min) for why evaluation matters
    - [ ] 📖 Read ISLR Chapter 2.2 for the statistical framework behind train/test evaluation
    - [ ] 💻 Train a DecisionTreeClassifier with no depth limit on any dataset. Compare training accuracy (perfect or near-perfect) to test accuracy (lower). This demonstrates why training metrics are misleading.

**Resources:**

- 🎥 [StatQuest: Machine Learning Fundamentals](https://statquest.org/) -- Visual explanation of fitting, testing, and the core evaluation concepts (Free)
- 📘 [ISLR Ch. 2.2: Assessing Model Accuracy](https://www.statlearning.com/) -- The "what" and "why" of model evaluation from a statistical perspective (Free)
- 📖 [Scikit-learn: Model Evaluation Overview](https://scikit-learn.org/stable/modules/model_evaluation.html) -- Comprehensive guide to all evaluation tools in scikit-learn (Free)
- 🎯 [Andrew Ng ML Specialization, Course 2](https://www.coursera.org/learn/advanced-learning-algorithms) -- Lectures on evaluation methodology and practical advice (Free to audit)

---

## Classification Metrics

*⏱ ~1.5 hours*

**Accuracy** is the simplest metric: the fraction of predictions that are correct. It works well when classes are balanced (roughly equal numbers of each class). But accuracy is dangerously misleading on imbalanced data. A spam filter that predicts "not spam" for every email achieves 99% accuracy if only 1% of emails are spam -- but it catches zero spam.

The **confusion matrix** breaks accuracy down into four categories. **True Positives (TP)**: correctly predicted positive. **False Positives (FP)**: incorrectly predicted positive (Type I error). **True Negatives (TN)**: correctly predicted negative. **False Negatives (FN)**: incorrectly predicted negative (Type II error). Every classification metric is computed from these four numbers.

**Precision** answers: "Of all the examples I predicted positive, how many were actually positive?" High precision means few false alarms. **Recall** answers: "Of all the actual positives, how many did I find?" High recall means few missed cases. There is a fundamental tension between precision and recall -- increasing one usually decreases the other.

$$\text{Precision} = \frac{TP}{TP + FP} \qquad \text{Recall} = \frac{TP}{TP + FN}$$

**F1 score** is the harmonic mean of precision and recall, useful when you need a single number that balances both:

$$F_1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$

**AUC-ROC** (Area Under the Receiver Operating Characteristic curve) measures a model's ability to distinguish between classes across all possible classification thresholds. The ROC curve plots the True Positive Rate (recall) against the False Positive Rate at different thresholds. AUC = 1.0 means perfect separation; AUC = 0.5 means no better than random (the diagonal line).

AUC-ROC is especially useful for comparing models because it is threshold-independent -- it evaluates the model's ranking ability, not its calibrated probabilities. For imbalanced datasets, **AUC-PR** (Area Under the Precision-Recall curve) can be more informative than AUC-ROC because it focuses on the positive class.

When does each metric matter? Use **precision** when false positives are costly (spam filtering -- marking legitimate email as spam is bad). Use **recall** when false negatives are costly (medical diagnosis -- missing a disease is worse than a false alarm). Use **F1** when both matter equally. Use **AUC-ROC** for overall model comparison.

```python
from sklearn.metrics import classification_report, confusion_matrix

print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))
# Shows precision, recall, F1 per class plus macro/weighted averages
```

!!! tip "Teaching Moment"
    Accuracy is misleading on imbalanced data -- this is one of the most common beginner mistakes. Consider a credit card fraud detector: 99.8% of transactions are legitimate. A model that predicts "not fraud" for everything achieves 99.8% accuracy but catches zero fraud. Precision, recall, and F1 give you the real picture. Always check class distribution before choosing your evaluation metric.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "Sensitivity and Specificity" (12 min) and "ROC and AUC" (16 min) for visual intuition
    - [ ] 📘 Read ISLR Chapter 4.4.3 for the statistical perspective on classification error types
    - [ ] 💻 Train a classifier on an imbalanced dataset (e.g., credit card fraud from Kaggle). Compare accuracy vs F1 vs AUC-ROC. Notice how accuracy looks great while F1 reveals the problem.
    - [ ] 💻 Generate a confusion matrix and classification report using scikit-learn and interpret each number

**Resources:**

- 🎥 [StatQuest: Sensitivity and Specificity](https://statquest.org/sensitivity-and-specificity/) -- Clear visual explanation of TP, FP, TN, FN and derived metrics (Free)
- 🎥 [StatQuest: ROC and AUC](https://statquest.org/roc-and-auc-clearly-explained/) -- How ROC curves work and why AUC summarizes model performance (Free)
- 📘 [ISLR Ch. 4: Classification](https://www.statlearning.com/) -- Statistical treatment of classification error metrics (Free)
- 💻 [Scikit-learn: Classification Metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics) -- API docs for all classification metrics with examples (Free)
- 📖 [Google ML Crash Course: Classification](https://developers.google.com/machine-learning/crash-course/classification) -- Production-oriented guide to precision, recall, and thresholds (Free)

---

## Regression Metrics

*⏱ ~45 minutes*

Regression models predict continuous values, so we need metrics that measure how far predictions are from actual values. The choice of metric depends on how you want to penalize different types of errors.

**Mean Squared Error (MSE)** is the average of squared differences between predicted and actual values. Squaring penalizes large errors more heavily than small ones. **Root Mean Squared Error (RMSE)** is the square root of MSE, bringing the units back to the original scale (e.g., dollars, degrees) which makes it more interpretable:

$$\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2 \qquad \text{RMSE} = \sqrt{\text{MSE}}$$

**Mean Absolute Error (MAE)** is the average of absolute differences. Unlike MSE, it treats all errors equally -- a $100 error counts the same whether it comes from one big miss or many small ones. MAE is more robust to outliers because it does not square them.

**R-squared** (\(R^2\)) measures the proportion of variance in the target that the model explains. An \(R^2\) of 0.85 means the model explains 85% of the variance; the remaining 15% is unexplained noise. \(R^2 = 1\) means perfect prediction; \(R^2 = 0\) means the model is no better than predicting the mean. It can even be negative if the model is worse than always predicting the mean.

$$R^2 = 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}$$

**Adjusted R-squared** penalizes adding useless features. Regular \(R^2\) always increases (or stays the same) when you add features, even random noise features. Adjusted \(R^2\) accounts for the number of features and only increases if the new feature genuinely improves the model. Use adjusted \(R^2\) when comparing models with different numbers of features.

When should you use each? Use **RMSE** when large errors are particularly bad (predicting house prices -- being off by $100K is much worse than being off by $10K). Use **MAE** when you want a robust measure that is not dominated by outliers (e.g., predicting delivery times where a few extreme delays should not distort the overall picture). Use **R-squared** for a quick summary of model fit, but always pair it with RMSE or MAE to understand errors in real units.

One more consideration: **MAPE** (Mean Absolute Percentage Error) expresses errors as percentages, making it easier to communicate to non-technical stakeholders. "Our model is off by 8% on average" is more intuitive than "RMSE = $24,000." However, MAPE is undefined when actual values are zero and is biased toward underprediction.

```python
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"RMSE: {rmse:.2f}, MAE: {mae:.2f}, R²: {r2:.3f}")
```

!!! tip "Teaching Moment"
    A common mistake is reporting only \(R^2\) and concluding "my model is great" when \(R^2 = 0.95\). Always check RMSE or MAE in the original units to understand what the errors actually mean. An \(R^2\) of 0.95 on house prices might still mean the model is off by $30,000 on average -- whether that is acceptable depends on the application, not the \(R^2\) value.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "R-squared" (11 min) for visual intuition on explained variance
    - [ ] 📘 Read ISLR Chapter 3.1.3 for the statistical interpretation of RSE and R-squared
    - [ ] 💻 Train a LinearRegression on the California Housing dataset. Compute MSE, RMSE, MAE, and R-squared. Interpret: what does the RMSE mean in terms of dollars?
    - [ ] 💻 Add random noise features and observe how R-squared increases while adjusted R-squared does not

**Resources:**

- 🎥 [StatQuest: R-squared](https://statquest.org/r-squared-clearly-explained/) -- Best visual explanation of R-squared and its limitations (Free)
- 📘 [ISLR Ch. 3.1.3: Assessing Accuracy](https://www.statlearning.com/) -- RSE, R-squared, and their interpretation (Free)
- 💻 [Scikit-learn: Regression Metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics) -- API docs for all regression metrics (Free)
- 📖 [Google ML Crash Course: Regression](https://developers.google.com/machine-learning/crash-course/descending-into-ml) -- Practical guide to loss functions and regression evaluation (Free)

---

## Cross-Validation

*⏱ ~1 hour*

A single train/test split gives you one number -- but how reliable is that number? If you got unlucky with the split, your estimate could be misleadingly high or low. **K-fold cross-validation** solves this by splitting the data into K equal parts (folds), training K times (each time using a different fold as the test set), and averaging the results.

The standard is **5-fold or 10-fold** cross-validation. With 5-fold, you train 5 models, each tested on 20% of the data. The result is 5 scores whose mean is your performance estimate and whose standard deviation tells you how stable that estimate is. A large standard deviation means your model's performance varies a lot depending on which data it sees -- a warning sign.

**Stratified K-fold** is essential for classification. It ensures each fold has roughly the same class distribution as the full dataset. Without stratification, some folds might have very few examples of the minority class, giving unreliable estimates. Scikit-learn's `cross_val_score` uses stratified K-fold by default for classifiers.

**Leave-One-Out (LOO)** is the extreme case: K equals the number of samples. Each sample is the test set exactly once. LOO gives an almost unbiased estimate but is computationally expensive (you train N models) and has high variance because each training set differs by only one example. Use it only when your dataset is very small (under 100 samples) and every data point is precious.

**Time-series split** is mandatory when your data has a temporal ordering (stock prices, sensor readings, user activity logs). Standard K-fold shuffles data randomly, which means your model might train on future data to predict the past -- a severe form of data leakage. Time-series split ensures the training set always comes before the test set chronologically. Scikit-learn's `TimeSeriesSplit` implements this with expanding or sliding windows.

```python
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

scores = cross_val_score(
    RandomForestClassifier(n_estimators=100),
    X, y, cv=5, scoring='f1_macro'
)
print(f"F1: {scores.mean():.3f} (+/- {scores.std():.3f})")
```

!!! tip "Teaching Moment"
    Cross-validation gives you a **distribution** of scores, not a single number. Always report the mean AND standard deviation: "F1 = 0.87 +/- 0.03" is much more informative than "F1 = 0.87". The standard deviation tells you how stable the model is. If it is 0.15, your model's performance is unreliable and you need more data or a simpler model.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "Cross-Validation" (6 min) for visual intuition on K-fold
    - [ ] 📘 Read ISLR Chapter 5.1 for the theory behind cross-validation and why it works
    - [ ] 💻 Compare a single train/test split to 5-fold and 10-fold cross-validation on the same model and dataset. How much does the single split estimate differ from the cross-validation mean?
    - [ ] 💻 Use `TimeSeriesSplit` from scikit-learn on a time-ordered dataset and compare results to regular K-fold

**Resources:**

- 🎥 [StatQuest: Cross-Validation](https://statquest.org/cross-validation-clearly-explained/) -- Best visual explanation of K-fold cross-validation (Free)
- 📘 [ISLR Ch. 5: Resampling Methods](https://www.statlearning.com/) -- Cross-validation and bootstrap methods with mathematical foundations (Free)
- 💻 [Scikit-learn: Cross-Validation Guide](https://scikit-learn.org/stable/modules/cross_validation.html) -- All cross-validation strategies with code examples (Free)
- 🎯 [Kaggle Learn: Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) -- Hands-on cross-validation exercises (Free)

---

## Bias-Variance Tradeoff

*⏱ ~1 hour*

The bias-variance tradeoff is the fundamental concept underlying all of model evaluation. Every model's prediction error can be decomposed into three components:

$$\text{Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Noise}$$

**Bias** is the error from overly simplistic assumptions. A linear model trying to fit curved data has high bias -- it systematically misses the pattern (underfitting). **Variance** is the error from sensitivity to training data fluctuations. A deep decision tree with no regularization changes dramatically with different training samples -- it memorizes noise (overfitting). **Irreducible noise** is inherent randomness in the data that no model can capture.

The tradeoff: as you increase model complexity, bias decreases (the model can capture more patterns) but variance increases (the model becomes more sensitive to training data). The optimal complexity is where the total error (bias + variance) is minimized.

**Learning curves** are the diagnostic tool for bias-variance problems. Plot training error and validation error as a function of training set size:

- **High bias (underfitting):** Both training and validation error are high, and they converge as training size increases. More data will not help -- you need a more complex model, better features, or fewer regularization constraints.
- **High variance (overfitting):** Training error is low but validation error is high, with a large gap between the two curves. More data may help close this gap. You can also reduce model complexity, add regularization, use dropout (for neural networks), or use an ensemble method like Random Forest.
- **Good fit:** Both errors are low and close together. The model has found the sweet spot between underfitting and overfitting.

You can generate learning curves in scikit-learn with the `learning_curve` function, which handles the train/test splitting and scoring automatically.

!!! tip "Why This Path"
    Andrew Ng calls the bias-variance tradeoff THE differentiator between ML engineers who get results and those who do not. In his ML courses, he emphasizes: "Before trying a new algorithm, diagnose whether you have a bias or variance problem." Kaggle grandmasters use learning curves and validation strategies to guide every modeling decision. roadmap.sh and fast.ai both treat this as foundational knowledge. Understanding this concept changes how you approach every ML project.

!!! tip "Teaching Moment"
    The most common beginner mistake is always trying more complex models when performance is poor. If your problem is high bias (underfitting), a more complex model helps. But if your problem is high variance (overfitting), a more complex model makes things worse. Learning curves tell you which problem you have -- always diagnose before treating.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "Bias and Variance" (7 min) for the clearest visual explanation of the tradeoff
    - [ ] 📘 Read ISLR Chapter 2.2.2 for the mathematical decomposition of prediction error
    - [ ] 💻 Use scikit-learn's `learning_curve` function to plot training and validation error for a DecisionTreeClassifier at different depths. Identify which depth shows underfitting, good fit, and overfitting
    - [ ] 💻 Train models of increasing complexity (linear regression, degree-3 polynomial, degree-20 polynomial) and plot the learning curves for each

**Resources:**

- 🎥 [StatQuest: Bias and Variance](https://statquest.org/the-bias-variance-tradeoff/) -- Best visual explanation of the fundamental tradeoff (Free)
- 📘 [ISLR Ch. 2.2: The Bias-Variance Trade-Off](https://www.statlearning.com/) -- Mathematical decomposition with intuitive explanation (Free)
- 💻 [Scikit-learn: Learning Curves](https://scikit-learn.org/stable/auto_examples/model_selection/plot_learning_curve.html) -- Code example for generating and interpreting learning curves (Free)
- 🎯 [Andrew Ng: Advice for Applying ML](https://www.coursera.org/learn/machine-learning) -- Practical diagnostic framework using bias-variance analysis (Free to audit)
- 📖 [Kaggle: Overfitting and Underfitting](https://www.kaggle.com/learn/intro-to-machine-learning) -- Interactive exercises on the bias-variance tradeoff (Free)

---

## Hyperparameter Tuning

*⏱ ~1 hour*

Every ML model has two kinds of parameters. **Learned parameters** are optimized during training (weights in linear regression, split thresholds in decision trees). **Hyperparameters** are set before training and control the model's behavior (learning rate, tree depth, number of estimators, regularization strength). Tuning hyperparameters can dramatically improve performance -- but doing it wrong introduces data leakage.

Common hyperparameters you will tune: `max_depth` and `n_estimators` for tree models, `C` and `kernel` for SVMs, `alpha` for regularized linear models, and `learning_rate` for gradient boosting. See [Supervised Learning](supervised-learning.md) for algorithm-specific guidance on which parameters matter most.

**GridSearchCV** exhaustively tries every combination of hyperparameter values you specify. It is thorough but slow: 5 values for each of 3 hyperparameters means \(5^3 = 125\) combinations, each evaluated with cross-validation. **RandomizedSearchCV** samples random combinations from specified distributions. It is faster and often finds equally good results because not all hyperparameters are equally important -- random search is more likely to hit the important values.

The practical workflow: start with **RandomizedSearchCV** using broad ranges and 50-100 iterations to identify the promising region. Then optionally narrow down with **GridSearchCV** around the best values found. Always use cross-validation inside the search -- never tune on the test set.

**Early stopping** is a form of implicit hyperparameter tuning for iterative algorithms (gradient boosting, neural networks). Monitor validation error during training and stop when it starts increasing -- this indicates the model has started overfitting. Early stopping automatically finds the right number of iterations without grid search and is essential for gradient boosting methods like XGBoost and LightGBM.

More advanced methods include **Bayesian optimization** (using libraries like Optuna or scikit-optimize) which learns from previous evaluations to choose the next hyperparameter combination intelligently. These methods are more efficient than random search for expensive models but add complexity. Start with RandomizedSearchCV and graduate to Bayesian optimization when your models take hours to train.

```python
from sklearn.model_selection import RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from scipy.stats import randint

param_dist = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
}
search = RandomizedSearchCV(
    RandomForestClassifier(), param_dist,
    n_iter=50, cv=5, scoring='f1_macro', random_state=42
)
search.fit(X_train, y_train)
print(f"Best F1: {search.best_score_:.3f}")
print(f"Best params: {search.best_params_}")
```

!!! tip "Teaching Moment"
    Tuning hyperparameters on the test set is **data leakage** -- you are indirectly using test data to make training decisions. The test set must be touched only once, at the very end. GridSearchCV and RandomizedSearchCV solve this by using cross-validation on the training set only. The test set gives you the final, unbiased performance estimate after all tuning is complete.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "Hyperparameter Tuning" for an overview of grid search and random search
    - [ ] 📘 Read ISLR Chapter 5 for the theory behind resampling methods used in hyperparameter selection
    - [ ] 💻 Use RandomizedSearchCV to tune a RandomForestClassifier. Compare the default model's F1 to the tuned model's F1. How much did tuning improve performance?
    - [ ] 💻 Implement early stopping with XGBoost's `early_stopping_rounds` parameter and observe how it prevents overfitting

**Resources:**

- 🎥 [StatQuest: Hyperparameter Tuning](https://statquest.org/) -- Visual overview of grid search vs random search trade-offs (Free)
- 📘 [ISLR Ch. 5: Resampling Methods](https://www.statlearning.com/) -- The statistical foundation for hyperparameter selection via cross-validation (Free)
- 💻 [Scikit-learn: Tuning Hyperparameters](https://scikit-learn.org/stable/modules/grid_search.html) -- GridSearchCV, RandomizedSearchCV, and HalvingSearchCV with examples (Free)
- 📖 [XGBoost: Parameter Tuning Guide](https://xgboost.readthedocs.io/en/latest/tutorials/param_tuning.html) -- Practical guide to tuning gradient boosting hyperparameters (Free)
- 🎯 [Kaggle Learn: Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) -- Hands-on tuning exercises with real competition data (Free)

---

## Key Takeaways

- **Never evaluate on training data**: training accuracy is meaningless -- always use held-out test data or cross-validation for honest performance estimates
- **Choose metrics that match your problem**: accuracy for balanced classes, precision/recall/F1 for imbalanced data, RMSE vs MAE depending on how you penalize errors
- **Cross-validation gives reliable estimates**: always report mean AND standard deviation; a single train/test split can be misleading
- **Diagnose before treating**: use learning curves to identify bias (underfitting) vs variance (overfitting) before changing your model
- **Hyperparameter tuning uses cross-validation, never the test set**: the test set is for final evaluation only -- touching it during tuning is data leakage

---

**Next up:** [Feature Engineering](feature-engineering.md) -- transforming raw data into model-ready features, the skill that separates good models from great ones
