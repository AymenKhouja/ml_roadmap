# Scikit-learn

!!! prerequisite "Before You Start"
    Complete [NumPy](numpy.md), [Pandas](pandas.md), and [Data Visualization](visualization.md) before this section. Scikit-learn uses NumPy arrays as input, Pandas DataFrames for data loading, and you will need visualization skills to evaluate model results.

*Total time: ~7-9 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Use scikit-learn's consistent fit/predict/transform API pattern across all model types
- Load built-in datasets and split them into training and test sets with proper stratification
- Preprocess data using scalers and encoders without introducing data leakage
- Build reproducible ML pipelines that chain preprocessing and modeling into a single object
- Evaluate and select models using cross-validation, grid search, and classification reports

---

## The Estimator API Pattern

*⏱ ~1 hour*

Scikit-learn's greatest design achievement is its **consistent API**. Every model -- whether it is a linear regression, a random forest, or a support vector machine -- follows the same pattern: create the estimator, call `.fit()` to train it on data, and call `.predict()` to get predictions. Transformers (preprocessors) use `.fit()` and `.transform()` instead. This consistency means that once you learn the pattern, switching between models is a one-line change.

There are four types of estimators: **classifiers** (predict categories), **regressors** (predict numbers), **transformers** (modify data), and **clusterers** (find groups). They all share the same interface. This is not just convenient -- it enables powerful composition through Pipelines, where you chain transformers and a final estimator into a single object.

```python linenums="1"
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris, fetch_california_housing
from sklearn.model_selection import train_test_split

# Pattern 1: Regression -- same API regardless of algorithm
housing = fetch_california_housing()
X_train, X_test, y_train, y_test = train_test_split(
    housing.data, housing.target, test_size=0.2, random_state=42
)

reg = LinearRegression()          # Create estimator
reg.fit(X_train, y_train)         # Train
predictions = reg.predict(X_test)  # Predict
score = reg.score(X_test, y_test)  # Evaluate (R-squared)
print(f"Linear Regression R²: {score:.3f}")

# Pattern 2: Classification -- SAME API, different estimator
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

clf = DecisionTreeClassifier(random_state=42)  # Create estimator
clf.fit(X_train, y_train)                       # Train (same method!)
predictions = clf.predict(X_test)                # Predict (same method!)
score = clf.score(X_test, y_test)                # Evaluate (accuracy)
print(f"Decision Tree Accuracy: {score:.3f}")
```

```text
Linear Regression R²: 0.576
Decision Tree Accuracy: 0.967
```

!!! tip "Why This Path"
    Scikit-learn's fit/predict/transform pattern is so influential that PyTorch Lightning, Keras, XGBoost, LightGBM, and CatBoost all adopted similar interfaces. Andrew Ng's ML Specialization uses scikit-learn for all practical exercises. Mastering the API here means the Core ML section can focus on understanding algorithms rather than fighting with tooling. This is the Python API pattern for ML.

!!! tip "Teaching Moment"
    Notice that switching from `LinearRegression` to `DecisionTreeClassifier` required changing only the estimator creation line. The `.fit()`, `.predict()`, and `.score()` calls are identical. This is by design -- scikit-learn's API lets you swap models without rewriting your workflow. When you build Pipelines later in this section, this consistency becomes even more powerful.

!!! action "What to Do"
    - [ ] :books: Read the [Scikit-learn Getting Started Guide](https://scikit-learn.org/stable/getting_started.html) for the official introduction to the estimator API
    - [ ] :computer: Train both a `LinearRegression` and a `Ridge` regression on the California Housing dataset using the same fit/predict/score pattern -- compare R² scores
    - [ ] :computer: Train both a `DecisionTreeClassifier` and a `KNeighborsClassifier` on the Iris dataset -- swap one line and compare accuracy

**Resources:**

- :books: [Scikit-learn Getting Started](https://scikit-learn.org/stable/getting_started.html) -- Official 5-minute introduction to the estimator API pattern (Free)
- :dart: [Kaggle Learn: Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning) -- Hands-on exercises using scikit-learn with real datasets (Free)
- :orange_book: [Hands-On ML, Ch. 2](https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/) -- Aurelien Geron's end-to-end ML project using scikit-learn (Chapter preview available)
- :movie_camera: [DataSchool: Scikit-learn Tutorials](https://www.youtube.com/playlist?list=PL5-da3qGB5ICeMbQuqbbCOQWcS6OYBr5A) -- Clear video series covering the scikit-learn API step by step (Free)

---

## Datasets and Data Splitting

*⏱ ~45 minutes*

Scikit-learn includes several built-in datasets that are perfect for learning. `load_iris()` (classification, 150 samples, 4 features) and `fetch_california_housing()` (regression, 20k samples, 8 features) are the two you will use most often. These require no file downloads, no data cleaning, and work immediately -- letting you focus on the ML workflow.

The most critical data handling step is **splitting** your data into training and test sets. The model trains on the training set and is evaluated on the test set -- data it has never seen. Without this split, you cannot tell if your model has learned generalizable patterns or just memorized the training data. `train_test_split()` handles this in one call.

```python linenums="1"
from sklearn.datasets import load_iris, fetch_california_housing
from sklearn.model_selection import train_test_split

# Classification dataset
iris = load_iris()
print(f"Iris: {iris.data.shape} features, {len(set(iris.target))} classes")
print(f"Feature names: {iris.feature_names}")
print(f"Target names: {iris.target_names}")

# Regression dataset
housing = fetch_california_housing()
print(f"\nHousing: {housing.data.shape} features")
print(f"Feature names: {housing.feature_names}")

# Split with stratification (for classification -- preserves class proportions)
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target,
    test_size=0.2,       # 20% for testing
    random_state=42,     # Reproducibility
    stratify=iris.target # Preserve class balance in both splits
)

print(f"\nTrain: {X_train.shape}, Test: {X_test.shape}")
# Verify stratification preserved class balance
import numpy as np
print(f"Train class distribution: {np.bincount(y_train)}")
print(f"Test class distribution:  {np.bincount(y_test)}")
```

```text
Iris: (150, 4) features, 3 classes
Train: (120, 4), Test: (30, 4)
Train class distribution: [40 40 40]
Test class distribution:  [10 10 10]
```

!!! tip "Teaching Moment"
    Always use `stratify=y` when splitting classification datasets. Without it, you might accidentally put most of one class into the test set and almost none into the training set. This is especially important for imbalanced datasets where the minority class has few samples. For regression datasets, stratification is not needed (continuous targets cannot have class proportions).

!!! action "What to Do"
    - [ ] :books: Read the [Scikit-learn Dataset Loading](https://scikit-learn.org/stable/datasets.html) guide to see all available built-in datasets
    - [ ] :computer: Load the Iris dataset, split 80/20 with stratification, and verify that both sets have proportional class representation using `np.bincount()`
    - [ ] :computer: Load the California Housing dataset and split it 70/30 -- print shapes to confirm the split

**Resources:**

- :books: [Scikit-learn Datasets](https://scikit-learn.org/stable/datasets.html) -- Official guide to all built-in and downloadable datasets (Free)
- :books: [Scikit-learn train_test_split](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html) -- API reference with parameter explanations (Free)
- :dart: [Kaggle Learn: Model Validation](https://www.kaggle.com/learn/intro-to-machine-learning) -- Interactive exercises on train/test splitting and validation (Free)
- :movie_camera: [StatQuest: Training vs Testing](https://www.youtube.com/watch?v=fSytzGwwBVw) -- Visual explanation of why splitting data matters (Free)

---

## Preprocessing and Feature Scaling

*⏱ ~1.5 hours*

Most ML algorithms perform better (or only work correctly) when features are on similar scales. A feature ranging from 0 to 1 and another ranging from 0 to 1,000,000 will cause problems for distance-based algorithms (KNN, SVM) and gradient-based algorithms (neural networks, logistic regression). Scikit-learn provides transformer objects for scaling and encoding that follow the same fit/transform API.

The two most common scalers are **StandardScaler** (zero mean, unit variance) and **MinMaxScaler** (scales to [0, 1] range). For categorical features, **OneHotEncoder** converts categories to binary columns and **OrdinalEncoder** converts to ordered integers. The critical rule: **fit on training data only**, then transform both training and test data. Fitting on the entire dataset causes data leakage.

```python linenums="1"
from sklearn.preprocessing import StandardScaler, MinMaxScaler, OneHotEncoder
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
import numpy as np

# Load and split
housing = fetch_california_housing()
X_train, X_test, y_train, y_test = train_test_split(
    housing.data, housing.target, test_size=0.2, random_state=42
)

# StandardScaler: zero mean, unit variance
scaler = StandardScaler()
scaler.fit(X_train)                    # Learn mean and std from TRAINING data only
X_train_scaled = scaler.transform(X_train)  # Apply to training data
X_test_scaled = scaler.transform(X_test)    # Apply SAME transform to test data

print(f"Before scaling - Train mean: {X_train[:, 0].mean():.2f}, std: {X_train[:, 0].std():.2f}")
print(f"After scaling  - Train mean: {X_train_scaled[:, 0].mean():.2f}, std: {X_train_scaled[:, 0].std():.2f}")
print(f"After scaling  - Test mean:  {X_test_scaled[:, 0].mean():.2f}, std: {X_test_scaled[:, 0].std():.2f}")
```

```text
Before scaling - Train mean: 3.89, std: 1.90
After scaling  - Train mean: 0.00, std: 1.00
After scaling  - Test mean:  -0.02, std: 0.97
```

Notice that the test set mean is not exactly 0 and std is not exactly 1. This is correct -- we applied the **training set's** mean and std to the test data. If we had fit the scaler on the combined data, we would have leaked test information into our preprocessing. You can also use `fit_transform()` as a shortcut for the training set:

```python
# Shortcut: fit and transform in one call (training data only!)
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Only transform, never fit
```

```python linenums="1"
# OneHotEncoder for categorical features
import pandas as pd

# Example: encoding categorical columns
data = pd.DataFrame({
    'color': ['red', 'blue', 'green', 'red', 'blue'],
    'size': ['S', 'M', 'L', 'M', 'S']
})

encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
encoded = encoder.fit_transform(data)
print(f"Encoded shape: {encoded.shape}")
print(f"Feature names: {encoder.get_feature_names_out()}")
print(encoded)
```

!!! tip "Teaching Moment"
    The number one preprocessing mistake in ML is fitting the scaler on the entire dataset before splitting. This seems harmless but it means the test set's mean and standard deviation influenced the scaling -- information from the future leaked into your training process. Always split first, then fit preprocessing on training data only. Pipelines (next section) prevent this automatically.

!!! action "What to Do"
    - [ ] :books: Read the [Scikit-learn Preprocessing Guide](https://scikit-learn.org/stable/modules/preprocessing.html) for the complete reference on scalers and encoders
    - [ ] :computer: Scale the Iris dataset features with `StandardScaler` -- verify train mean is ~0 and std is ~1, and that test stats are close but not exact
    - [ ] :computer: Demonstrate the data leakage problem: fit a scaler on all data vs training data only, and show the test set statistics differ
    - [ ] :computer: Use `OneHotEncoder` to encode a categorical feature and inspect the resulting binary columns

**Resources:**

- :books: [Scikit-learn Preprocessing](https://scikit-learn.org/stable/modules/preprocessing.html) -- Official guide covering all scalers, encoders, and transformers (Free)
- :orange_book: [Hands-On ML, Ch. 2](https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/) -- Aurelien Geron covers preprocessing with Pipeline integration (Chapter preview)
- :movie_camera: [StatQuest: Data Normalization](https://www.youtube.com/watch?v=mnKm3YP56PY) -- Visual explanation of why and how to scale features (Free)
- :dart: [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering) -- Hands-on exercises on encoding and scaling with real datasets (Free)
- :books: [Scikit-learn ColumnTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html) -- Apply different transformers to different columns (Free)

---

## Building Pipelines

*⏱ ~1.5 hours*

A Pipeline chains multiple preprocessing steps and a final estimator into a single object. When you call `.fit()` on a Pipeline, it fits each transformer in sequence and then fits the final model. When you call `.predict()`, it transforms the data through each step and then predicts. This guarantees that preprocessing is applied consistently and prevents data leakage automatically.

The real power of Pipelines emerges with `ColumnTransformer`, which applies different transformations to different columns -- scaling numeric features and encoding categorical features in one step. Combined with a Pipeline, this creates a reproducible, leak-free workflow from raw data to predictions.

```python linenums="1"
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Simple Pipeline: scaling + classification
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42, stratify=iris.target
)

# Method 1: Pipeline with named steps
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression(random_state=42))
])

# One call fits the scaler AND the model (no leakage possible!)
pipe.fit(X_train, y_train)
score = pipe.score(X_test, y_test)
print(f"Pipeline accuracy: {score:.3f}")

# Method 2: make_pipeline (auto-generates step names)
pipe2 = make_pipeline(StandardScaler(), LogisticRegression(random_state=42))
pipe2.fit(X_train, y_train)
print(f"make_pipeline accuracy: {pipe2.score(X_test, y_test):.3f}")
```

```text
Pipeline accuracy: 0.967
make_pipeline accuracy: 0.967
```

For real-world datasets with mixed column types, `ColumnTransformer` is essential:

```python linenums="1"
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
import pandas as pd
import numpy as np

# Simulate mixed-type dataset
np.random.seed(42)
df = pd.DataFrame({
    'age': np.random.randint(20, 65, 200),
    'income': np.random.randint(30000, 150000, 200),
    'department': np.random.choice(['Engineering', 'Marketing', 'Sales'], 200),
    'level': np.random.choice(['Junior', 'Mid', 'Senior'], 200),
    'promoted': np.random.choice([0, 1], 200)
})

X = df.drop('promoted', axis=1)
y = df['promoted']

# Different transformers for different column types
numeric_features = ['age', 'income']
categorical_features = ['department', 'level']

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
])

# Full pipeline: preprocess + model
full_pipe = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression(random_state=42))
])

full_pipe.fit(X, y)
print(f"Pipeline with ColumnTransformer: {full_pipe.score(X, y):.3f}")
```

!!! tip "Teaching Moment"
    Pipelines prevent data leakage automatically. When you call `pipe.fit(X_train, y_train)`, the scaler inside the pipeline sees only training data. When you call `pipe.predict(X_test)`, the scaler applies the training-derived transform to the test data. Without a Pipeline, you must manually ensure this ordering -- and mistakes are easy to make and hard to detect.

!!! action "What to Do"
    - [ ] :books: Read the [Scikit-learn Pipeline Guide](https://scikit-learn.org/stable/modules/compose.html) for the full documentation on Pipeline and ColumnTransformer
    - [ ] :computer: Build a Pipeline with `StandardScaler` and `LogisticRegression` on the Iris dataset -- verify it gives the same result as manual scaling + training
    - [ ] :computer: Create a `ColumnTransformer` that scales numeric columns and one-hot encodes categorical columns on a mixed DataFrame
    - [ ] :computer: Demonstrate the leakage prevention: compare test accuracy of Pipeline (correct) vs fit-on-all-data (incorrect) approaches

**Resources:**

- :books: [Scikit-learn Pipeline Guide](https://scikit-learn.org/stable/modules/compose.html) -- Official documentation on Pipeline and ColumnTransformer (Free)
- :orange_book: [Hands-On ML, Ch. 2](https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/) -- Aurelien Geron covers Pipeline workflows in the end-to-end project chapter (Chapter preview)
- :movie_camera: [DataSchool: Pipeline Tutorial](https://www.youtube.com/watch?v=irHhDMbw3xo) -- Video walkthrough of building Pipelines step by step (Free)
- :dart: [Kaggle Learn: Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) -- Interactive exercises covering Pipelines with real datasets (Free)

---

## Model Selection and Cross-Validation

*⏱ ~1.5 hours*

A single train/test split gives you one number for model performance -- but how reliable is that number? Maybe you got lucky (or unlucky) with the split. **Cross-validation** solves this by splitting the data into K folds, training on K-1 folds and testing on the held-out fold, and repeating K times. You get K scores, and their mean and standard deviation tell you both how well the model performs and how stable that performance is.

Beyond evaluation, you need to **tune hyperparameters** -- the knobs you set before training (like regularization strength, tree depth, number of neighbors). `GridSearchCV` searches all combinations and `RandomizedSearchCV` samples randomly for faster searches. Both use cross-validation internally, so the scores are reliable.

```python linenums="1"
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

iris = load_iris()
X, y = iris.data, iris.target

# Cross-validation: compare two models reliably
models = {
    'Logistic Regression': make_pipeline(StandardScaler(), LogisticRegression(random_state=42)),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
}

for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
    print(f"{name}: {scores.mean():.3f} (+/- {scores.std():.3f})")
```

```text
Logistic Regression: 0.973 (+/- 0.027)
Random Forest: 0.960 (+/- 0.033)
```

```python linenums="1"
# GridSearchCV: find the best hyperparameters
from sklearn.svm import SVC

pipe = make_pipeline(StandardScaler(), SVC(random_state=42))

param_grid = {
    'svc__C': [0.1, 1, 10, 100],
    'svc__kernel': ['linear', 'rbf'],
    'svc__gamma': ['scale', 'auto']
}

grid_search = GridSearchCV(pipe, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid_search.fit(X, y)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.3f}")

# Classification report for detailed per-class metrics
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
grid_search.best_estimator_.fit(X_train, y_train)
y_pred = grid_search.best_estimator_.predict(X_test)
print(f"\n{classification_report(y_test, y_pred, target_names=iris.target_names)}")
```

!!! tip "Teaching Moment"
    Use `cross_val_score` for quick model comparison and `GridSearchCV` for hyperparameter tuning. When accessing Pipeline parameters in grid search, use the pattern `stepname__param` (double underscore). For example, `svc__C` refers to the `C` parameter of the step named `svc`. The `-1` in `n_jobs=-1` uses all CPU cores for parallel search -- always use this for grid search.

!!! action "What to Do"
    - [ ] :books: Read the [Scikit-learn Cross-Validation Guide](https://scikit-learn.org/stable/modules/cross_validation.html) for the full documentation on validation strategies
    - [ ] :computer: Compare 3 classifiers on the Iris dataset using `cross_val_score` with 5-fold CV -- which performs best?
    - [ ] :computer: Run a `GridSearchCV` on a `RandomForestClassifier` tuning `n_estimators` (50, 100, 200) and `max_depth` (3, 5, 10, None) -- print the best parameters and score
    - [ ] :computer: Generate a `classification_report` for your best model and interpret the precision, recall, and F1-score per class

**Resources:**

- :books: [Scikit-learn Cross-Validation](https://scikit-learn.org/stable/modules/cross_validation.html) -- Official guide to all cross-validation strategies (Free)
- :books: [Scikit-learn Grid Search](https://scikit-learn.org/stable/modules/grid_search.html) -- Official guide to hyperparameter tuning (Free)
- :movie_camera: [StatQuest: Cross-Validation](https://www.youtube.com/watch?v=fSytzGwwBVw) -- Clear visual explanation of why and how cross-validation works (Free)
- :orange_book: [Hands-On ML, Ch. 2-3](https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/) -- Model selection and evaluation methodology (Chapter preview)
- :dart: [Kaggle Learn: Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) -- Hands-on exercises on cross-validation and model selection (Free)

---

## End-to-End ML Workflow

*⏱ ~1 hour*

This section ties everything together: loading data with Pandas, preprocessing with Pipeline and ColumnTransformer, training with an estimator, and evaluating with cross-validation. This is the workflow you will follow for every ML project -- the only things that change are the dataset, the preprocessing steps, and the model.

The example below shows a complete, production-style workflow that avoids all common pitfalls: proper train/test splitting, no data leakage in preprocessing, cross-validated evaluation, and detailed per-class metrics. This is the pattern to internalize.

```python linenums="1"
import pandas as pd
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Step 1: Load data into DataFrame
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = iris.target

# Step 2: Quick EDA
print("Dataset shape:", df.shape)
print("\nClass distribution:")
print(df['species'].value_counts())
print("\nFeature statistics:")
print(df.describe().round(2))

# Step 3: Prepare features and target
X = df.drop('species', axis=1)
y = df['species']

# Step 4: Train/test split with stratification
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Step 5: Build pipeline (preprocessing + model)
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Step 6: Cross-validate for reliable estimation
cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='accuracy')
print(f"\nCV Accuracy: {cv_scores.mean():.3f} (+/- {cv_scores.std():.3f})")

# Step 7: Final training and evaluation
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

print(f"\nTest Accuracy: {pipeline.score(X_test, y_test):.3f}")
print(f"\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))
```

```text
Dataset shape: (150, 5)

Class distribution:
2    50
1    50
0    50

CV Accuracy: 0.958 (+/- 0.036)

Test Accuracy: 0.967

Classification Report:
              precision    recall  f1-score   support
      setosa       1.00      1.00      1.00        10
  versicolor       0.91      1.00      0.95        10
   virginica       1.00      0.90      0.95        10
    accuracy                           0.97        30
```

!!! tip "Teaching Moment"
    This seven-step workflow is the skeleton of every ML project: load, explore, prepare, split, build pipeline, cross-validate, evaluate. The specific dataset, features, preprocessing, and model change from project to project -- but the workflow stays the same. Write it once, reuse it always. The next section ([Supervised Learning](../core-ml/supervised-learning.md)) will teach you the theory behind the models you just used as black boxes.

!!! action "What to Do"
    - [ ] :computer: Run the complete workflow above and verify the output matches
    - [ ] :computer: Modify the workflow to use the California Housing dataset (regression) with `LinearRegression` -- change the scoring metric to `'r2'` and use `mean_squared_error` instead of `classification_report`
    - [ ] :computer: Try swapping `RandomForestClassifier` for `LogisticRegression` in the pipeline -- how does the CV accuracy change?
    - [ ] :books: Read [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html) for the complete reference on all available models and utilities

**Resources:**

- :orange_book: [Hands-On ML, Ch. 2](https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/) -- Aurelien Geron walks through a complete end-to-end ML project with this exact workflow (Chapter preview)
- :dart: [Kaggle Learn: Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning) -- Hands-on course walking through the full ML workflow (Free)
- :movie_camera: [DataSchool: ML with Scikit-learn](https://www.youtube.com/playlist?list=PL5-da3qGB5ICeMbQuqbbCOQWcS6OYBr5A) -- Video series covering the complete scikit-learn workflow (Free)
- :books: [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html) -- The comprehensive reference for every model, transformer, and utility (Free)

---

## Key Takeaways

- **The fit/predict/transform pattern is universal** -- every scikit-learn estimator uses the same API, and this pattern extends to PyTorch Lightning, Keras, XGBoost, and beyond
- **Always split before preprocessing** -- fit scalers and encoders on training data only; applying them to all data before splitting causes data leakage that inflates your metrics
- **Pipelines prevent leakage automatically** -- chaining preprocessing and modeling into a Pipeline guarantees correct ordering and makes your workflow reproducible
- **Cross-validation beats single splits** -- `cross_val_score` gives you reliable performance estimates with confidence intervals; never trust a single train/test split
- **This workflow is the skeleton** -- load, explore, prepare, split, pipeline, cross-validate, evaluate; the dataset and model change but the pattern stays the same

---

**Next up:** [Supervised Learning](../core-ml/supervised-learning.md) -- now that you know the scikit-learn API, learn the theory behind the algorithms you have been using as black boxes
