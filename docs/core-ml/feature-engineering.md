# Feature Engineering

!!! prerequisite "Before You Start"
    Complete [Pandas](../python-ml/pandas.md), [Scikit-learn Basics](../python-ml/scikit-learn.md), and
    [Supervised Learning](supervised-learning.md) before this section.

*Total time: ~6-8 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Know how to scale and transform numerical features for different algorithm types
- Understand categorical encoding strategies and their trade-offs
- Be able to apply feature selection methods to identify the most important features
- Build end-to-end preprocessing pipelines using scikit-learn's Pipeline and ColumnTransformer
- Understand data leakage in feature engineering and how to prevent it

---

## Why Feature Engineering?

*⏱ ~30 minutes*

"Garbage in, garbage out" is the oldest cliché in data science -- and also the most accurate. The quality of your features matters more than your choice of algorithm for most tabular data problems. A simple logistic regression with well-engineered features often beats a complex neural network with raw, unprocessed data.

Feature engineering is the process of transforming raw data into representations that a model can learn from effectively. This includes scaling numbers to appropriate ranges, converting categories into numbers, creating new features from existing ones, and removing features that add noise without information.

The reason features matter so much is that most ML algorithms learn linear or piecewise-linear relationships by default. If the true relationship between a feature and the target is non-linear (e.g., house price depends on the square of the living area), the raw feature will not capture it. But adding a squared feature makes the relationship linear again, and the model can learn it easily.

!!! tip "Teaching Moment"
    Kaggle grandmasters consistently report spending 80% of their time on feature engineering and 20% on model selection and tuning. The winning solutions to Kaggle competitions almost never come from exotic algorithms -- they come from creative feature engineering that extracts signal the algorithms can use. This is true in industry too: the teams that spend the most time understanding and transforming their data build the best models.

!!! action "What to Do"
    - [ ] 📖 Read the scikit-learn preprocessing guide overview for a map of all available transformations
    - [ ] 🎥 Watch a Kaggle competition walkthrough (search "Kaggle feature engineering tutorial") to see how top competitors approach feature creation
    - [ ] 💻 Load any tabular dataset and examine the raw features. Identify: which are numerical? Which are categorical? Which might need transformation?

**Resources:**

- 📖 [Scikit-learn: Preprocessing Guide](https://scikit-learn.org/stable/modules/preprocessing.html) -- Complete reference for all scaling, encoding, and transformation tools (Free)
- 🎯 [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering) -- Hands-on course with practical feature creation techniques (Free)
- 📘 [ISLR Ch. 6: Linear Model Selection and Regularization](https://www.statlearning.com/) -- Why feature selection and regularization matter (Free)
- 🎥 [StatQuest: Regularization](https://statquest.org/) -- Visual explanation of why fewer features can be better (Free)

---

## Numerical Features

*⏱ ~1 hour*

Most ML algorithms are sensitive to the scale of numerical features. **StandardScaler** transforms features to zero mean and unit variance -- essential for algorithms that use distance calculations (SVMs, k-nearest neighbors, PCA) or gradient-based optimization (logistic regression, neural networks). **MinMaxScaler** scales features to a fixed range, typically [0, 1], which is useful when you need bounded values or when the feature distribution is not Gaussian.

The key insight: **tree-based algorithms (Random Forest, XGBoost) do not need scaling** because they split on feature thresholds, and scaling does not change the order of values. Linear models, SVMs, and neural networks do need scaling because they compute weighted sums where feature magnitudes directly affect the result.

**Log transforms** handle right-skewed distributions (income, prices, counts) by compressing the long tail. After a log transform, the distribution becomes more symmetric, which helps linear models and can improve performance dramatically. **Binning** converts continuous features into categories (e.g., age into age groups), which can capture non-linear relationships but loses information. Use binning sparingly and only when you have domain knowledge suggesting meaningful boundaries.

**Polynomial features** create interaction terms and higher-order features. Adding \(x^2\), \(x_1 \cdot x_2\), etc., lets linear models capture non-linear relationships. But beware: polynomial features grow combinatorially -- 10 features with degree 2 become 65 features. Use `PolynomialFeatures` with low degree (2 or 3) and combine with feature selection.

```python
from sklearn.preprocessing import StandardScaler, PolynomialFeatures

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)  # fit on training data only!
X_test_scaled = scaler.transform(X_test)  # transform test with same parameters

poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X_scaled)
print(f"Original: {X_scaled.shape[1]} features -> Polynomial: {X_poly.shape[1]} features")
```

!!! tip "Teaching Moment"
    Why does scaling matter for distance-based algorithms but not tree-based ones? Consider two features: age (0-100) and salary (0-100,000). In a distance calculation, salary dominates because its values are 1000x larger. The algorithm effectively ignores age. Scaling puts both features on equal footing. Trees, on the other hand, ask "is salary > $50,000?" -- the actual magnitude does not affect the split quality.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "Feature Scaling" for visual intuition on why scaling matters
    - [ ] 📖 Read the scikit-learn preprocessing guide section on scaling
    - [ ] 💻 Train an SVM on unscaled data, then on StandardScaler-transformed data. Compare accuracy. The difference demonstrates why scaling matters for distance-based algorithms.
    - [ ] 💻 Apply a log transform to a skewed feature (e.g., income or house prices) and compare the distribution before and after

**Resources:**

- 📖 [Scikit-learn: Scaling Features](https://scikit-learn.org/stable/modules/preprocessing.html#standardization-or-mean-removal-and-variance-scaling) -- StandardScaler, MinMaxScaler, RobustScaler with examples (Free)
- 🎥 [StatQuest: Feature Scaling](https://statquest.org/) -- Visual explanation of standardization and normalization (Free)
- 💻 [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering) -- Hands-on exercises with numerical transformations (Free)
- 📘 [ISLR Ch. 6.2: Shrinkage Methods](https://www.statlearning.com/) -- Why feature scaling matters for regularized models (Free)

---

## Categorical Features

*⏱ ~1 hour*

ML algorithms work with numbers, not text. Converting categorical features (city names, product types, colors) into numerical representations is essential -- and the encoding choice affects model performance significantly.

**One-hot encoding** creates a binary column for each category. "Color = {red, blue, green}" becomes three columns: `is_red`, `is_blue`, `is_green`. This is the safest default because it does not impose any ordering. However, it creates high-dimensional sparse data when the feature has many categories (a "city" feature with 1,000 unique values creates 1,000 new columns). Tree models handle this well; linear models may struggle.

**Ordinal encoding** assigns integers to categories: red=0, blue=1, green=2. This only makes sense when there is a natural ordering (education level: high school=1, bachelor=2, master=3, PhD=4). For unordered categories, ordinal encoding misleads the model by implying that "green is greater than red."

**Target encoding** (mean encoding) replaces each category with the mean of the target variable for that category. For a "city" feature predicting house prices, each city gets replaced by the average house price in that city. This is powerful for high-cardinality features but dangerous: it can leak target information and cause overfitting. Always use regularization (add noise or smoothing) and compute target encoding on the training fold only in cross-validation.

```python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# One-hot encoding with scikit-learn
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
X_encoded = encoder.fit_transform(X_train[['color', 'size']])

# Or with pandas (simpler for exploration)
X_dummies = pd.get_dummies(df, columns=['color', 'size'], drop_first=True)
```

!!! tip "Teaching Moment"
    One-hot encoding creates sparse, high-dimensional data. A "city" feature with 1,000 unique values creates 1,000 binary columns, most of which are zero for any given row. Tree models handle this efficiently because they can split on individual columns. Linear models struggle because 1,000 mostly-zero features add noise and increase overfitting risk. For high-cardinality features with linear models, consider target encoding or feature hashing instead.

!!! action "What to Do"
    - [ ] 📖 Read the scikit-learn encoding guide for a comparison of all encoding strategies
    - [ ] 💻 One-hot encode a categorical feature using both `OneHotEncoder` and `pd.get_dummies`. Compare the outputs and understand when to use each.
    - [ ] 💻 Try ordinal encoding on an ordered feature (e.g., shirt size: S, M, L, XL) and a non-ordered feature (e.g., color). Train a model on each and see how the non-ordered encoding misleads the model.
    - [ ] 📖 Read about target encoding and why it requires careful handling to avoid data leakage

**Resources:**

- 📖 [Scikit-learn: Encoding Categorical Features](https://scikit-learn.org/stable/modules/preprocessing.html#encoding-categorical-features) -- OneHotEncoder, OrdinalEncoder, TargetEncoder with examples (Free)
- 🎯 [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering) -- Practical exercises on categorical encoding strategies (Free)
- 📖 [Category Encoders Library](https://contrib.scikit-learn.org/category_encoders/) -- Additional encoders including target encoding and binary encoding (Free)
- 🎥 [StatQuest: One-Hot Encoding](https://statquest.org/) -- Visual explanation of why and how to encode categories (Free)

---

## Feature Selection

*⏱ ~1.5 hours*

More features is not always better. Adding irrelevant or redundant features increases overfitting risk, slows training, and makes models harder to interpret. Feature selection identifies the features that actually contribute to prediction and removes the rest.

**Filter methods** rank features independently using statistical measures. **Correlation analysis** identifies features that are strongly correlated with the target (good candidates) or with each other (redundant -- drop one). **Mutual information** measures how much knowing a feature reduces uncertainty about the target -- it captures non-linear relationships that correlation misses. Filter methods are fast but do not consider feature interactions.

**Wrapper methods** evaluate subsets of features by training a model. **Recursive Feature Elimination (RFE)** trains a model, removes the least important feature, retrains, and repeats until the desired number of features remains. Wrapper methods find better feature subsets but are computationally expensive because they train many models.

**Embedded methods** perform feature selection as part of the model training process itself. **L1 regularization (Lasso)** adds a penalty proportional to the absolute value of weights, which drives unimportant feature weights to exactly zero -- effectively removing those features from the model. **Tree-based feature importances** measure how much each feature reduces impurity across all splits in the forest. You can use scikit-learn's `SelectFromModel` to automatically keep only features above an importance threshold.

Embedded methods are the most practical choice for most projects because they select features during training, not as a separate step. They also account for feature interactions, which filter methods miss.

```python
from sklearn.feature_selection import SelectKBest, mutual_info_classif

# Filter method: select top 10 features by mutual information
selector = SelectKBest(mutual_info_classif, k=10)
X_selected = selector.fit_transform(X_train, y_train)
selected_features = X_train.columns[selector.get_support()]
print(f"Selected: {list(selected_features)}")
```

!!! tip "Teaching Moment"
    The **curse of dimensionality** explains why more features can hurt. In high-dimensional space, data points become equidistant from each other, making it impossible for distance-based algorithms to distinguish neighbors from non-neighbors. Even tree models suffer: with many irrelevant features, they waste splits on noise. A good rule of thumb: if you have more features than samples, feature selection is not optional -- it is required.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "Regularization" videos (Ridge, Lasso) for visual intuition on L1 feature selection
    - [ ] 📘 Read ISLR Chapter 6.1-6.2 for the theory behind subset selection and regularization
    - [ ] 💻 Train a Random Forest, extract `feature_importances_`, and plot them. Remove the bottom 50% of features and retrain. Does performance improve?
    - [ ] 💻 Apply L1 regularization (`LogisticRegression(penalty='l1', solver='liblinear')`) and examine which feature weights become exactly zero

**Resources:**

- 🎥 [StatQuest: Lasso Regression](https://statquest.org/regularization-part-2-lasso-regression/) -- Visual explanation of L1 regularization and feature zeroing (Free)
- 📘 [ISLR Ch. 6: Linear Model Selection](https://www.statlearning.com/) -- Subset selection, Ridge, Lasso, and elastic net (Free)
- 💻 [Scikit-learn: Feature Selection Guide](https://scikit-learn.org/stable/modules/feature_selection.html) -- All selection methods with code examples (Free)
- 📖 [Kaggle: Feature Selection Tutorial](https://www.kaggle.com/) -- Practical guide to choosing selection methods (Free)
- 🎯 [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering) -- Hands-on exercises combining creation and selection (Free)

---

## Data Pipelines

*⏱ ~1.5 hours*

The single most important engineering pattern in ML preprocessing is the **Pipeline**. A scikit-learn Pipeline chains multiple preprocessing steps and a model into one object, ensuring that transformations are applied consistently and correctly. Without pipelines, you must manually apply each transformation in the right order -- and the most common mistake is fitting transformers on the full dataset instead of the training set only.

**ColumnTransformer** solves the problem of different columns needing different transformations. Numerical features need scaling; categorical features need encoding. ColumnTransformer applies different transformers to different column subsets and concatenates the results. Combined with Pipeline, it creates an end-to-end preprocessing workflow.

!!! warning "Data Leakage: The #1 Beginner Mistake"
    **Data leakage** occurs when information from the test set influences the training process. The most common form in feature engineering: fitting a scaler on the entire dataset (including test data) before splitting. The scaler's mean and standard deviation now contain information from test examples, giving you an optimistically biased evaluation.

    **The rule:** fit all transformers on training data only. Use `.fit_transform()` on training data and `.transform()` on test data. Pipelines enforce this automatically -- when you call `pipeline.fit(X_train, y_train)`, every transformer inside fits only on training data.

The end-to-end pattern combines ColumnTransformer for heterogeneous preprocessing with Pipeline for the full workflow. This is the pattern used in production ML systems and Kaggle competition solutions:

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

# Define column groups
num_features = ['age', 'income', 'credit_score']
cat_features = ['city', 'education']

# Build preprocessing
preprocessor = ColumnTransformer([
    ('num', StandardScaler(), num_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_features),
])

# Full pipeline: preprocess + model
pipe = Pipeline([
    ('preprocess', preprocessor),
    ('model', RandomForestClassifier(n_estimators=100))
])

pipe.fit(X_train, y_train)  # all fitting happens on training data only
score = pipe.score(X_test, y_test)  # transform + predict on test data
print(f"Test accuracy: {score:.3f}")
```

This pipeline can be passed directly to `cross_val_score` or `GridSearchCV`, and the preprocessing will be correctly refit on each training fold -- no leakage possible.

!!! tip "Why This Path"
    fast.ai's Jeremy Howard and Kaggle grandmasters consistently say that pipelines prevent the #1 beginner mistake in ML: data leakage through improper preprocessing. Andrew Ng's courses emphasize that proper train/test discipline extends to every preprocessing step, not just the model. roadmap.sh lists preprocessing pipelines as an essential skill. Building this habit early saves you from subtle, hard-to-debug evaluation errors that can waste weeks of work. See [Model Evaluation](model-evaluation.md) for the full evaluation methodology that pipelines support.

!!! action "What to Do"
    - [ ] 📖 Read the scikit-learn Pipeline and ColumnTransformer documentation
    - [ ] 💻 Build a complete pipeline for a dataset with mixed numerical and categorical features. Use ColumnTransformer for preprocessing and Pipeline for the full workflow.
    - [ ] 💻 Demonstrate data leakage: fit a StandardScaler on the full dataset before splitting, then fit it on training data only inside a pipeline. Compare the cross-validation scores -- the leaked version will be slightly higher (falsely optimistic).
    - [ ] 💻 Use `GridSearchCV` with your pipeline to tune both preprocessing and model hyperparameters simultaneously

**Resources:**

- 💻 [Scikit-learn: Pipeline Guide](https://scikit-learn.org/stable/modules/compose.html) -- Pipeline and ColumnTransformer with comprehensive examples (Free)
- 📖 [Scikit-learn: Data Leakage](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) -- Official guide to identifying and preventing leakage (Free)
- 🎯 [Kaggle Learn: Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) -- Hands-on pipeline and cross-validation exercises (Free)
- 📘 [ISLR Ch. 5: Resampling Methods](https://www.statlearning.com/) -- Why proper train/test discipline matters for every preprocessing step (Free)
- 🎥 [StatQuest: Cross-Validation](https://statquest.org/cross-validation-clearly-explained/) -- Why cross-validation must wrap all preprocessing (Free)

---

## Key Takeaways

- **Features matter more than algorithms**: well-engineered features with a simple model often beat raw features with a complex model on tabular data
- **Scale numerical features for distance-based models**: StandardScaler for SVMs, neural nets, and PCA; tree models do not need scaling
- **Choose encoding by cardinality**: one-hot for low-cardinality categories, target encoding (with care) for high-cardinality; never use ordinal encoding for unordered categories
- **Select features aggressively**: more features increase overfitting risk; use mutual information, tree importances, or L1 regularization to keep only what matters
- **Always use Pipelines**: they prevent data leakage, ensure reproducibility, and work seamlessly with cross-validation and grid search
- **Data leakage is subtle and deadly**: fitting transformers on test data gives falsely optimistic scores; pipelines enforce correct discipline automatically

---

**Next up:** [Deep Learning](../deep-learning/index.md) -- from classical ML to neural networks, CNNs, RNNs, and Transformers
