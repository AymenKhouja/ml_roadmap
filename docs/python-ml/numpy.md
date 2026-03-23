# NumPy

!!! prerequisite "Before You Start"
    Complete the [Math Foundations](../math-foundations/index.md) section (especially Linear Algebra) before starting here. Basic Python knowledge (variables, loops, functions, lists) is assumed.

*Total time: ~6-8 hours* | :green_circle: Beginner

## Learning Outcomes

By the end of this section, you will:

- Create and manipulate n-dimensional arrays for storing ML data
- Use vectorized operations and broadcasting to write fast, loop-free numerical code
- Apply NumPy's linear algebra functions to perform matrix computations central to ML
- Generate reproducible random data and compute summary statistics for exploratory analysis
- Understand why NumPy is the foundation under Pandas, Scikit-learn, PyTorch, and TensorFlow

---

## Arrays and Array Creation

*⏱ ~45 minutes*

Everything in machine learning starts with arrays. A dataset with 1000 samples and 10 features is a 2D array of shape `(1000, 10)`. A batch of 32 grayscale images at 28x28 resolution is a 3D array of shape `(32, 28, 28)`. Model weights, gradients, predictions -- all arrays. NumPy's `ndarray` is the data structure that makes all of this possible in Python.

Creating arrays is straightforward. You can convert Python lists, or use helper functions that generate arrays of specific shapes filled with zeros, ones, or evenly spaced values. Every array has a `shape` (its dimensions) and a `dtype` (the data type of its elements, usually `float64` for ML work).

```python linenums="1"
import numpy as np

# From a Python list
a = np.array([1.0, 2.0, 3.0, 4.0])
print(f"1D array: {a}, shape: {a.shape}, dtype: {a.dtype}")

# 2D array: 3 samples, 4 features (common ML layout)
X = np.array([
    [5.1, 3.5, 1.4, 0.2],
    [4.9, 3.0, 1.4, 0.2],
    [7.0, 3.2, 4.7, 1.4]
])
print(f"2D array shape: {X.shape}")  # (3, 4)

# Common creation functions
zeros = np.zeros((3, 4))        # 3x4 matrix of zeros
ones = np.ones((2, 3))          # 2x3 matrix of ones
rng = np.arange(0, 10, 2)      # [0, 2, 4, 6, 8]
lin = np.linspace(0, 1, 5)     # [0.0, 0.25, 0.5, 0.75, 1.0]
```

```text
1D array: [1. 2. 3. 4.], shape: (4,), dtype: float64
2D array shape: (3, 4)
```

!!! tip "Why This Path"
    NumPy is the foundation under every Python ML library. Pandas DataFrames are built on NumPy arrays. Scikit-learn expects NumPy arrays as input and returns them as output. PyTorch tensors and TensorFlow tensors have nearly identical APIs to NumPy arrays. Every major ML curriculum -- Andrew Ng's Coursera specialization, fast.ai, Stanford CS231n -- assumes NumPy fluency. Learning NumPy well means every subsequent library feels familiar.

!!! tip "Teaching Moment"
    Always specify `dtype` explicitly when precision matters. ML models typically use `float32` for training (half the memory of `float64`, faster on GPUs) and `int64` for labels. You can set this at creation: `np.array([1, 2, 3], dtype=np.float32)`.

!!! action "What to Do"
    - [ ] :books: Read the [NumPy Quickstart Tutorial](https://numpy.org/doc/stable/user/quickstart.html) on numpy.org for the official introduction to arrays
    - [ ] :computer: Create arrays of shapes `(5,)`, `(3, 4)`, and `(2, 3, 4)` using `np.zeros()` and print their `shape` and `dtype`
    - [ ] :computer: Load the Iris dataset features into a NumPy array: `from sklearn.datasets import load_iris; X = load_iris().data` and inspect its shape, dtype, and first 5 rows

**Resources:**

- :books: [NumPy Quickstart Tutorial](https://numpy.org/doc/stable/user/quickstart.html) -- Official introduction covering array creation, printing, and basic operations (Free)
- :movie_camera: [CS231n Python/NumPy Tutorial](https://cs231n.github.io/python-numpy-tutorial/) -- Stanford's ML-focused NumPy tutorial with practical examples (Free)
- :books: [From Python to NumPy](https://www.labri.fr/perso/nrougier/from-python-to-numpy/) -- Nicolas Rougier's free online book for deeper array understanding (Free)
- :computer: [Kaggle Learn: Python](https://www.kaggle.com/learn/python) -- Hands-on exercises covering Python and NumPy basics with immediate feedback (Free)

---

## Indexing, Slicing, and Reshaping

*⏱ ~1 hour*

Once you have an array, you need to extract parts of it. In ML, this means selecting specific features (columns), filtering samples by condition (rows), or reshaping data to match a model's expected input format. NumPy provides three powerful indexing mechanisms: basic slicing, fancy indexing with arrays of indices, and boolean indexing with condition masks.

Slicing uses the familiar `start:stop:step` syntax from Python lists but extends to multiple dimensions. The key insight is that slicing returns a **view** (not a copy) of the original array, so modifications to the slice affect the original data. Fancy indexing and boolean indexing return copies.

```python linenums="1"
import numpy as np

np.random.seed(42)
# Simulate a dataset: 5 samples, 4 features
X = np.random.randn(5, 4)
labels = np.array([0, 1, 0, 1, 1])

# Basic slicing
first_three = X[:3]           # First 3 rows (samples)
feat_cols = X[:, 1:3]         # Columns 1 and 2 (features)

# Boolean indexing: select samples where label == 1
class_1 = X[labels == 1]
print(f"Class 1 samples: {class_1.shape}")  # (3, 4)

# Fancy indexing: select specific rows
selected = X[[0, 3, 4]]
print(f"Selected rows shape: {selected.shape}")  # (3, 4)

# Reshaping: flatten a 2D array to 1D (common for model input)
flat = X.reshape(-1)           # -1 means "infer this dimension"
print(f"Flattened: {flat.shape}")  # (20,)

# Reshape for batch processing: (5, 4) -> (5, 2, 2)
reshaped = X.reshape(5, 2, 2)
print(f"Reshaped: {reshaped.shape}")  # (5, 2, 2)
```

```text
Class 1 samples: (3, 4)
Selected rows shape: (3, 4)
Flattened: (20,)
Reshaped: (5, 2, 2)
```

!!! tip "Teaching Moment"
    Boolean indexing is one of the most powerful patterns in ML data work. Instead of writing a loop to find all samples where a feature exceeds a threshold, you write `X[X[:, 0] > 0.5]`. This single expression filters rows where the first feature is greater than 0.5 -- no loop, no temporary list, and it runs at C speed inside NumPy.

!!! action "What to Do"
    - [ ] :movie_camera: Watch [NumPy Indexing Explained](https://numpy.org/doc/stable/user/basics.indexing.html) in the official docs for visual examples of slicing
    - [ ] :computer: Create a 10x5 random array with `np.random.seed(0)`, then select rows where the sum across columns exceeds 0 using boolean indexing
    - [ ] :computer: Practice reshaping: create a 1D array of 24 elements and reshape it to `(2, 3, 4)`, `(4, 6)`, and `(6, 4)` -- verify each shape

**Resources:**

- :books: [NumPy Indexing Guide](https://numpy.org/doc/stable/user/basics.indexing.html) -- Official documentation covering all indexing modes with examples (Free)
- :movie_camera: [Real Python: NumPy Array Indexing](https://realpython.com/numpy-array-programming/) -- Practical walkthrough of indexing patterns with ML context (Free)
- :orange_book: [Python Data Science Handbook, Ch. 2](https://jakevdp.github.io/PythonDataScienceHandbook/) -- Jake VanderPlas covers NumPy indexing with clear visual explanations (Free online)
- :computer: [NumPy 100 Exercises](https://github.com/rougier/numpy-100) -- Progressively harder exercises to build indexing fluency (Free)

---

## Array Operations and Vectorization

*⏱ ~1.5 hours*

Vectorization is the reason NumPy exists. When you write `a + b` with NumPy arrays, the addition happens in optimized C code across all elements simultaneously -- no Python loop, no per-element function call overhead. This is typically 10-100x faster than equivalent Python loops, and the speed difference compounds with dataset size.

NumPy provides **universal functions (ufuncs)** that operate element-wise on arrays: arithmetic (`+`, `-`, `*`, `/`), comparison (`>`, `==`), math (`np.exp()`, `np.log()`, `np.sqrt()`), and aggregation (`np.sum()`, `np.mean()`, `np.max()`). The `axis` parameter controls which dimension to aggregate along: `axis=0` operates down rows (per-column), `axis=1` operates across columns (per-row).

```python linenums="1"
import numpy as np
import time

# Demonstrate vectorization speed difference
size = 1_000_000
a = np.random.randn(size)
b = np.random.randn(size)

# Python loop (slow)
start = time.time()
result_loop = [a[i] + b[i] for i in range(size)]
loop_time = time.time() - start

# NumPy vectorized (fast)
start = time.time()
result_vec = a + b
vec_time = time.time() - start

print(f"Loop: {loop_time:.3f}s | NumPy: {vec_time:.4f}s | Speedup: {loop_time/vec_time:.0f}x")
```

```text
Loop: 0.312s | NumPy: 0.0014s | Speedup: 223x
```

The `axis` parameter is essential for ML computations. Computing per-feature statistics on a dataset means aggregating along `axis=0`:

```python linenums="1"
import numpy as np

# 4 samples, 3 features
X = np.array([
    [1.0, 5.0, 2.0],
    [3.0, 2.0, 8.0],
    [2.0, 4.0, 5.0],
    [4.0, 3.0, 1.0]
])

print(f"Mean per feature (axis=0): {X.mean(axis=0)}")   # [2.5, 3.5, 4.0]
print(f"Mean per sample (axis=1):  {X.mean(axis=1)}")   # [2.67, 4.33, 3.67, 2.67]
print(f"Global mean:               {X.mean()}")          # 3.33
```

!!! tip "Teaching Moment"
    A common mistake is confusing `axis=0` and `axis=1`. Think of it this way: `axis=0` collapses the rows (result has one value per column), `axis=1` collapses the columns (result has one value per row). When you compute `X.mean(axis=0)` on a dataset, you get one mean per feature -- exactly what you need for feature scaling.

!!! action "What to Do"
    - [ ] :movie_camera: Watch [StatQuest: NumPy Basics](https://numpy.org/doc/stable/user/quickstart.html) and run the vectorization speed comparison on your own machine
    - [ ] :computer: Write a Python loop and a NumPy vectorized version to compute the Euclidean distance between two 1D arrays -- compare timing with `time.time()`
    - [ ] :computer: Load the Iris dataset and compute per-feature mean, std, min, and max using `axis=0` aggregations

**Resources:**

- :books: [NumPy: Universal Functions](https://numpy.org/doc/stable/reference/ufuncs.html) -- Official reference for all ufuncs with performance notes (Free)
- :orange_book: [Python Data Science Handbook: Computation on Arrays](https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html) -- Clear explanation of ufuncs and vectorization with benchmarks (Free online)
- :movie_camera: [NumPy in 5 Minutes](https://www.youtube.com/watch?v=xECXZ3tyONo) -- Quick video overview of vectorized operations (Free)
- :computer: [NumPy Performance Tips](https://numpy.org/doc/stable/user/basics.html) -- Official guidance on writing fast NumPy code (Free)

---

## Broadcasting

*⏱ ~1 hour*

Broadcasting is NumPy's mechanism for performing operations on arrays of different shapes. Without it, you would need explicit loops or manual array duplication to do things like subtract the mean from every row of a matrix. With broadcasting, you write `X - X.mean(axis=0)` and NumPy handles the shape mismatch automatically.

Broadcasting follows three rules: (1) if arrays have different numbers of dimensions, the smaller array is padded with ones on the left; (2) arrays with size 1 in a dimension act as if they have the size of the largest array in that dimension; (3) if sizes disagree and neither is 1, broadcasting fails. The most common ML use case is feature standardization:

$$z = \frac{x - \mu}{\sigma}$$

where \(\mu\) and \(\sigma\) are computed per-feature (shape `(n_features,)`) and broadcast across all samples in the data matrix (shape `(n_samples, n_features)`).

```python linenums="1"
import numpy as np

# Simulate dataset: 100 samples, 4 features
np.random.seed(42)
X = np.random.randn(100, 4) * np.array([10, 1, 100, 0.1]) + np.array([50, 5, 200, 0.5])

print(f"Before: means = {X.mean(axis=0).round(1)}")
print(f"Before: stds  = {X.std(axis=0).round(1)}")

# Standardize using broadcasting
mean = X.mean(axis=0)    # shape: (4,)
std = X.std(axis=0)      # shape: (4,)
X_std = (X - mean) / std  # broadcasting: (100, 4) - (4,) / (4,)

print(f"After:  means = {X_std.mean(axis=0).round(1)}")
print(f"After:  stds  = {X_std.std(axis=0).round(1)}")
```

```text
Before: means = [ 50.5   5.0 195.3   0.5]
Before: stds  = [  9.7   1.0  97.6   0.1]
After:  means = [-0.  0. -0.  0.]
After:  stds  = [1. 1. 1. 1.]
```

!!! tip "Teaching Moment"
    Broadcasting is not magic -- it follows three strict rules. The most common pattern in ML: when you write `X - X.mean(axis=0)`, NumPy broadcasts the 1D mean array (shape `(4,)`) across every row of the 2D matrix (shape `(100, 4)`). This single expression replaces a Python for-loop and runs 100x faster. If broadcasting fails with a shape error, print both shapes and check the rules.

!!! action "What to Do"
    - [ ] :books: Read [NumPy Broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html) in the official docs for visual diagrams of the rules
    - [ ] :computer: Standardize the Iris dataset features using broadcasting (subtract mean, divide by std per feature) and verify the result has zero mean and unit variance
    - [ ] :computer: Add a bias vector of shape `(4,)` to every row of a `(100, 4)` matrix using broadcasting -- this is how neural networks add bias terms

**Resources:**

- :books: [NumPy Broadcasting Guide](https://numpy.org/doc/stable/user/basics.broadcasting.html) -- Official documentation with visual diagrams of broadcasting rules (Free)
- :orange_book: [Python Data Science Handbook: Broadcasting](https://jakevdp.github.io/PythonDataScienceHandbook/02.05-computation-on-arrays-broadcasting.html) -- Jake VanderPlas explains broadcasting with clear shape annotations (Free online)
- :movie_camera: [3Blue1Brown-style Broadcasting Visual](https://numpy.org/doc/stable/user/basics.broadcasting.html) -- The NumPy docs include diagrams that make the rules intuitive (Free)
- :dart: [Stanford CS231n: NumPy Tutorial](https://cs231n.github.io/python-numpy-tutorial/) -- Broadcasting explained in the context of neural network operations (Free)

---

## Linear Algebra with NumPy

*⏱ ~1 hour*

Machine learning is built on linear algebra. Dot products compute similarity between vectors. Matrix multiplication transforms data through model layers. Eigendecomposition powers PCA for dimensionality reduction. SVD is behind recommendation systems and matrix factorization. NumPy provides all of these operations through `np.linalg` and the `@` operator.

The `@` operator (Python 3.5+) is the preferred way to do matrix multiplication. It is cleaner than `np.dot()` for 2D arrays and makes code read like the math: if the formula says \(y = Xw\), you write `y = X @ w`. Use `np.linalg` for decompositions (`eig`, `svd`), solving systems (`solve`), and computing inverses (`inv`) and determinants (`det`).

```python linenums="1"
import numpy as np

# Dot product: similarity between two vectors
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(f"Dot product: {a @ b}")  # 32

# Matrix multiplication: transform data through weights
X = np.random.randn(5, 3)   # 5 samples, 3 features
W = np.random.randn(3, 2)   # Weight matrix: 3 inputs -> 2 outputs
output = X @ W               # (5, 3) @ (3, 2) = (5, 2)
print(f"Output shape: {output.shape}")  # (5, 2)

# Eigendecomposition (used in PCA)
cov_matrix = np.array([[2.0, 1.0], [1.0, 3.0]])
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
print(f"Eigenvalues: {eigenvalues.round(2)}")
print(f"Eigenvectors:\n{eigenvectors.round(2)}")

# Solving a linear system: Ax = b
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)
print(f"Solution: {x}")  # [2. 3.]
```

!!! tip "Teaching Moment"
    Use the `@` operator instead of `np.dot()` for matrix multiplication. They produce the same result for 2D arrays, but `@` is more readable and behaves consistently for higher-dimensional arrays. When you see ML code with `@`, it maps directly to the math: the formula \(\hat{y} = X \mathbf{w} + b\) becomes `y_hat = X @ w + b`. See the [Linear Algebra](../math-foundations/linear-algebra.md) section for the mathematical foundations behind these operations.

!!! action "What to Do"
    - [ ] :books: Read [NumPy Linear Algebra](https://numpy.org/doc/stable/reference/routines.linalg.html) in the official docs for the full API reference
    - [ ] :computer: Compute the covariance matrix of the Iris dataset features using `X.T @ X / n` and compare with `np.cov(X.T)` -- they should match
    - [ ] :computer: Implement a simple linear regression using the normal equation: \(\mathbf{w} = (X^T X)^{-1} X^T y\) using `np.linalg.solve()` on the California Housing dataset

**Resources:**

- :books: [NumPy Linear Algebra Reference](https://numpy.org/doc/stable/reference/routines.linalg.html) -- Official API docs for all linalg functions (Free)
- :orange_book: [Mathematics for Machine Learning, Ch. 2-4](https://mml-book.github.io/) -- Free textbook covering the linear algebra theory behind these operations (Free)
- :dart: [MIT 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) -- Gilbert Strang's legendary course for deep understanding (Free)
- :computer: [NumPy Linear Algebra Tutorial](https://numpy.org/doc/stable/reference/routines.linalg.html) -- Worked examples of decompositions and solvers (Free)

---

## Random Number Generation and Statistics

*⏱ ~45 minutes*

Randomness is woven into every part of machine learning. Train/test splits shuffle data randomly. Neural network weights are initialized randomly. Data augmentation adds random perturbations. Cross-validation uses random folds. Without reproducibility controls, you cannot debug models or compare experiments -- the same code would give different results each run.

NumPy provides `np.random` for generating random numbers from various distributions, and statistical functions like `np.mean()`, `np.std()`, and `np.percentile()` for summarizing data. The key practice is **always setting a seed** (`np.random.seed()`) at the start of your script so results are reproducible.

```python linenums="1"
import numpy as np

# Set seed for reproducibility
np.random.seed(42)

# Common random generation patterns
uniform = np.random.rand(3, 4)           # Uniform [0, 1), shape (3, 4)
normal = np.random.randn(3, 4)           # Standard normal, shape (3, 4)
integers = np.random.randint(0, 10, 5)   # Random ints in [0, 10), length 5
choice = np.random.choice([0, 1], size=100, p=[0.3, 0.7])  # Weighted sampling

# Simulate a dataset and compute statistics
data = np.random.randn(1000) * 15 + 100  # Mean ~100, std ~15
print(f"Mean:    {np.mean(data):.1f}")
print(f"Std:     {np.std(data):.1f}")
print(f"Median:  {np.median(data):.1f}")
print(f"25th %:  {np.percentile(data, 25):.1f}")
print(f"75th %:  {np.percentile(data, 75):.1f}")
print(f"Min/Max: {data.min():.1f} / {data.max():.1f}")
```

```text
Mean:    99.7
Std:     14.9
Median:  99.5
25th %:  89.5
75th %:  110.1
Min/Max: 48.3 / 152.1
```

!!! tip "Teaching Moment"
    The newer `np.random.default_rng()` API (NumPy 1.17+) is preferred over `np.random.seed()` for new code. It creates an independent random generator that does not affect global state: `rng = np.random.default_rng(42); data = rng.standard_normal(100)`. The old API works fine and you will see it everywhere in existing tutorials and codebases, but the new API is better for reproducibility in complex projects with multiple random streams.

!!! action "What to Do"
    - [ ] :books: Read [NumPy Random Sampling](https://numpy.org/doc/stable/reference/random/index.html) for the full random generation API
    - [ ] :computer: Generate 1000 samples from a normal distribution with mean 50 and std 10, then compute the mean, std, and percentiles to verify they match
    - [ ] :computer: Demonstrate reproducibility: run `np.random.seed(0); print(np.random.randn(5))` twice and verify identical output, then remove the seed and verify different output

**Resources:**

- :books: [NumPy Random Generator Guide](https://numpy.org/doc/stable/reference/random/generator.html) -- Official docs for the modern random API (Free)
- :orange_book: [Python Data Science Handbook: Aggregations](https://jakevdp.github.io/PythonDataScienceHandbook/02.04-computation-on-arrays-aggregates.html) -- Statistical aggregations with NumPy explained clearly (Free online)
- :movie_camera: [StatQuest: Histograms](https://www.youtube.com/watch?v=qBigTkBLU6g) -- Visual intuition for distributions and summary statistics (Free)
- :computer: [NumPy Statistics Functions](https://numpy.org/doc/stable/reference/routines.statistics.html) -- Complete reference for mean, std, percentile, and more (Free)

---

## Key Takeaways

- **Arrays are the universal data structure** -- every ML dataset, model weight, and prediction flows through NumPy arrays; understanding shapes and dtypes is foundational
- **Vectorization replaces loops** -- writing `X @ W + b` instead of nested loops gives 100x+ speedups and makes code read like the math
- **Broadcasting handles shape mismatches** -- feature standardization, bias addition, and element-wise operations across different-shaped arrays all rely on broadcasting rules
- **Linear algebra operations power ML** -- dot products for similarity, matrix multiply for transformations, eigendecomposition for PCA, SVD for dimensionality reduction
- **Reproducibility requires seeds** -- always set `np.random.seed()` or use `np.random.default_rng()` so experiments are repeatable and debuggable

---

**Next up:** [Pandas](pandas.md) -- learn to load, clean, and transform real-world datasets using the tool built on top of NumPy arrays
