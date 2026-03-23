# Linear Algebra

!!! prerequisite "Before You Start"
    No mathematical prerequisites beyond basic high school algebra. This is the starting point of the math foundations.

*Total time: ~8-10 hours* | :green_circle: Beginner

## Learning Outcomes

By the end of this section, you will:

- Represent data as vectors and understand geometric operations like dot products and norms
- Perform matrix operations and understand their role as data transformations
- Explain what eigenvalues and eigenvectors are and why they matter for PCA
- Understand how SVD decomposes data for dimensionality reduction and recommender systems
- Connect every linear algebra concept to a concrete ML application

---

## Vectors and Vector Operations

*:timer: ~1 hour*

In machine learning, every data point is a vector. A patient record with age, blood pressure, and cholesterol becomes a 3-dimensional vector. An image with 784 pixels becomes a 784-dimensional vector. Understanding vectors means understanding how ML algorithms see your data.

A vector \(\vec{v} = [v_1, v_2, \ldots, v_n]\) is simply an ordered list of numbers. The **dot product** measures similarity between two vectors:

$$\vec{a} \cdot \vec{b} = \sum_{i=1}^{n} a_i b_i = \|\vec{a}\| \|\vec{b}\| \cos\theta$$

When the dot product is large, the vectors point in similar directions -- this is exactly how cosine similarity works in recommendation engines and natural language processing. The **norm** (length) of a vector measures its magnitude:

$$\|\vec{v}\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}$$

Norms show up everywhere in ML: L2 regularization penalizes large weight vectors, distance metrics use norms to measure how far apart data points are, and normalization scales vectors to unit length.

!!! tip "Teaching Moment"
    When you hear "feature vector," it literally means the data point is stored as a vector. A dataset with 1000 samples and 5 features is 1000 vectors in 5-dimensional space. ML algorithms operate on these vectors -- they compute distances, angles, and projections to make predictions.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's "Vectors, what even are they?" (10 min) for geometric intuition on vectors as arrows in space
    - [ ] :blue_book: Read MML book Section 2.1-2.3 for formal vector definitions with ML context
    - [ ] :computer: Create vectors in NumPy and compute dot products, norms, and cosine similarity between feature vectors

**Resources:**

- :movie_camera: [3Blue1Brown: Vectors](https://www.youtube.com/watch?v=fNk_zzaMoSs) -- Visual introduction to vectors as arrows and as lists of numbers (Free)
- :blue_book: [MML Book Ch. 2: Linear Algebra](https://mml-book.github.io/book/mml-book.pdf) -- ML-specific treatment of vectors and vector spaces (Free PDF)
- :books: [Khan Academy: Vectors and Spaces](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces) -- Step-by-step basics for absolute beginners (Free)
- :dart: [Imperial College: Mathematics for ML on Coursera](https://www.coursera.org/learn/linear-algebra-machine-learning) -- Full course with ML motivation throughout (Free to audit)

---

## Linear Combinations and Span

*:timer: ~45 minutes*

A linear combination takes vectors and scales them by constants, then adds them together. Given vectors \(\vec{v}_1, \vec{v}_2, \ldots, \vec{v}_k\) and scalars \(c_1, c_2, \ldots, c_k\):

$$c_1\vec{v}_1 + c_2\vec{v}_2 + \cdots + c_k\vec{v}_k$$

The **span** of a set of vectors is the collection of all possible linear combinations of those vectors. If two vectors in 3D space are not parallel, their span is a plane. If three non-coplanar vectors exist, they span all of 3D space.

In ML, this matters because your feature space is the span of your feature vectors. **Linear independence** means no vector in the set can be written as a combination of the others -- each one adds new information. If your features are linearly dependent (e.g., temperature in Fahrenheit and Celsius), one is redundant and adds no predictive power.

The **basis** of a space is a minimal set of linearly independent vectors that span the entire space. PCA finds a new basis where the first basis vector captures the most variance in your data, the second captures the next most, and so on.

!!! tip "Teaching Moment"
    Feature engineering is really about choosing a good basis for your data. When you create polynomial features or interaction terms, you are expanding the span of your feature space. When you do PCA or feature selection, you are finding a smaller, better basis. Linear algebra gives you the vocabulary for what data scientists do intuitively.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's "Linear combinations, span, and basis vectors" (10 min) for the geometric picture
    - [ ] :blue_book: Read MML book Section 2.6 on linear independence and basis
    - [ ] :computer: Check if a set of feature vectors is linearly independent using NumPy's `np.linalg.matrix_rank()`

**Resources:**

- :movie_camera: [3Blue1Brown: Linear Combinations and Span](https://www.youtube.com/watch?v=k7RM-ot2NWY) -- Beautiful visualization of span as reachable space (Free)
- :blue_book: [MML Book Ch. 2.6: Linear Independence](https://mml-book.github.io/book/mml-book.pdf) -- Formal treatment with ML connections (Free PDF)
- :books: [Khan Academy: Linear Independence](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/linear-independence) -- Practice problems and step-by-step solutions (Free)

---

## Matrices and Matrix Operations

*:timer: ~1.5 hours*

A matrix is a rectangular grid of numbers. In ML, your entire dataset is a matrix: each row is a sample, each column is a feature. A dataset with 1000 patients and 10 measurements is a \(1000 \times 10\) matrix.

$$X = \begin{bmatrix} x_{11} & x_{12} & \cdots & x_{1n} \\ x_{21} & x_{22} & \cdots & x_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ x_{m1} & x_{m2} & \cdots & x_{mn} \end{bmatrix}$$

**Matrix multiplication** is the core operation. When you multiply a weight matrix \(W\) by a feature vector \(\vec{x}\), you get a prediction. Neural networks are literally chains of matrix multiplications with nonlinearities in between:

$$\vec{y} = W\vec{x} + \vec{b}$$

The **transpose** \(A^T\) flips rows and columns. The expression \(X^T X\) appears constantly in ML -- it computes the covariance structure of your features and is central to linear regression's normal equation:

$$\hat{w} = (X^T X)^{-1} X^T \vec{y}$$

The **inverse** \(A^{-1}\) "undoes" a matrix transformation. Not all matrices have inverses -- a singular matrix collapses information irreversibly, which is why you encounter numerical issues when features are highly correlated.

!!! tip "Teaching Moment"
    Every time you call `model.fit(X, y)` in scikit-learn, matrix operations happen under the hood. Linear regression solves a matrix equation. SVMs find separating hyperplanes using matrix operations. Neural networks are stacks of matrix multiplications. Understanding matrices is understanding what your models actually compute.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's "Nonsquare matrices as transformations" and "Matrix multiplication as composition" (20 min total)
    - [ ] :blue_book: Read MML book Section 2.2-2.3 on matrix operations
    - [ ] :computer: Multiply matrices in NumPy using `@` operator, compute \(X^T X\) for a dataset, and solve a linear regression manually with the normal equation

**Resources:**

- :movie_camera: [3Blue1Brown: Matrix Multiplication](https://www.youtube.com/watch?v=XkY2DOUCWMU) -- Matrix multiplication as composition of transformations (Free)
- :blue_book: [MML Book Ch. 2.2-2.3: Matrices](https://mml-book.github.io/book/mml-book.pdf) -- Formal operations with ML context (Free PDF)
- :books: [Khan Academy: Matrix Transformations](https://www.khanacademy.org/math/linear-algebra/matrix-transformations) -- Interactive exercises for matrix operations (Free)
- :movie_camera: [MIT OCW 18.06: Multiplication and Inverses](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) -- Gilbert Strang's legendary lectures for deeper understanding (Free)

---

## Linear Transformations

*:timer: ~1 hour*

A linear transformation is a function that maps vectors to vectors while preserving addition and scaling. Every matrix represents a linear transformation, and every linear transformation can be represented as a matrix.

When you multiply a vector by a matrix, you **transform** it -- stretching, rotating, projecting, or reflecting. A \(2 \times 2\) rotation matrix:

$$R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

rotates every vector by angle \(\theta\). A scaling matrix stretches space along specific axes.

In neural networks, each layer applies a linear transformation followed by a nonlinear activation. The weight matrix \(W\) in each layer is literally a learned transformation that reshapes the input space to make the data more separable. The network learns to compose these transformations so that, by the final layer, the data is linearly separable.

This is why deep learning works: each layer warps the space a little, and the composition of many small warps can represent extremely complex decision boundaries.

!!! tip "Teaching Moment"
    Think of a neural network layer as: take the input, multiply by a matrix (linear transformation), add a bias, then apply a nonlinearity. The matrix multiplication IS the learned transformation. When people say "a neural network learns a representation," they mean it learns transformation matrices that reshape data into a useful form.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's "Linear transformations and matrices" (12 min) for the geometric view of what matrices do to space
    - [ ] :blue_book: Read MML book Section 2.7 on linear mappings
    - [ ] :computer: Visualize how 2D points transform under different matrices: identity, rotation, scaling, and projection using matplotlib

**Resources:**

- :movie_camera: [3Blue1Brown: Linear Transformations](https://www.youtube.com/watch?v=kYB8IZa5AuE) -- Stunning visualization of how matrices transform space (Free)
- :blue_book: [MML Book Ch. 2.7: Linear Mappings](https://mml-book.github.io/book/mml-book.pdf) -- Formal definition with ML-relevant examples (Free PDF)
- :books: [Khan Academy: Transformations](https://www.khanacademy.org/math/linear-algebra/matrix-transformations) -- Practice visualizing and computing transformations (Free)

---

## Eigenvalues and Eigenvectors

*:timer: ~1.5 hours*

An eigenvector of a matrix \(A\) is a special vector that, when transformed by \(A\), only gets scaled -- it does not change direction. The scaling factor is the eigenvalue:

$$A\vec{v} = \lambda\vec{v}$$

where \(\vec{v}\) is the eigenvector and \(\lambda\) is the eigenvalue. This equation says: "applying transformation \(A\) to \(\vec{v}\) is the same as just stretching \(\vec{v}\) by \(\lambda\)."

Why does this matter for ML? **Principal Component Analysis (PCA)** -- the most common dimensionality reduction technique -- works by finding the eigenvectors of the covariance matrix. The eigenvector with the largest eigenvalue points in the direction of maximum variance in your data. The second eigenvector points in the direction of next-most variance, orthogonal to the first, and so on.

The covariance matrix of a dataset \(X\) is:

$$C = \frac{1}{n-1} X^T X$$

Its eigenvectors are the principal components. The eigenvalues tell you how much variance each component captures. If the first two eigenvalues are much larger than the rest, your high-dimensional data mostly lives on a 2D plane.

!!! tip "Why This Path"
    roadmap.sh, Andrew Ng, and fast.ai all agree that linear algebra is the first math prerequisite for ML. The key difference is depth -- we follow the MML book's philosophy of "just enough to understand ML" rather than a full semester course. You need eigenvalues for PCA, SVD for recommender systems, and matrix operations for understanding neural networks. Everything else can wait until you encounter it.

!!! tip "Teaching Moment"
    PCA is eigenvalue decomposition of the covariance matrix. That single sentence connects linear algebra to one of the most used techniques in data science. When someone says "I reduced 100 features to 10 using PCA," they mean they found the top 10 eigenvectors of the covariance matrix and projected the data onto them.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's "Eigenvectors and eigenvalues" (17 min) for the definitive geometric explanation
    - [ ] :blue_book: Read MML book Section 4.2-4.3 on eigenvalue decomposition and its role in PCA
    - [ ] :computer: Compute eigenvalues and eigenvectors of a covariance matrix using `np.linalg.eig()`, then verify that PCA from scikit-learn gives the same principal components

**Resources:**

- :movie_camera: [3Blue1Brown: Eigenvectors and Eigenvalues](https://www.youtube.com/watch?v=PFDu9oVAE-g) -- The best visual explanation of what eigenvectors mean geometrically (Free)
- :blue_book: [MML Book Ch. 4.2-4.3: Eigendecomposition](https://mml-book.github.io/book/mml-book.pdf) -- Connects eigenvalues directly to PCA and dimensionality reduction (Free PDF)
- :movie_camera: [StatQuest: PCA Step-by-Step](https://statquest.org/pca-clearly-explained/) -- Practical PCA walkthrough showing eigenvectors in action (Free)
- :movie_camera: [MIT OCW 18.06: Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) -- Gilbert Strang's deeper treatment for mathematical rigor (Free)

---

## Matrix Decompositions (SVD)

*:timer: ~1 hour*

Singular Value Decomposition (SVD) factors any matrix into three matrices:

$$A = U \Sigma V^T$$

where \(U\) contains the left singular vectors, \(\Sigma\) is a diagonal matrix of singular values (ordered largest to smallest), and \(V^T\) contains the right singular vectors. The singular values in \(\Sigma\) tell you how much "information" each component carries.

SVD is the generalization of eigenvalue decomposition to non-square matrices, which makes it directly applicable to real datasets (which are rarely square). Its applications in ML are widespread:

**Dimensionality reduction:** Keep only the top \(k\) singular values and their corresponding vectors. This gives the best rank-\(k\) approximation of your data -- PCA is actually SVD applied to the centered data matrix.

**Recommender systems:** The Netflix Prize was famously won using matrix factorization via SVD. A user-item rating matrix is decomposed to find latent factors (genres, preferences) that explain the ratings:

$$R \approx U_k \Sigma_k V_k^T$$

**Data compression:** Images, text embeddings, and other high-dimensional data can be compressed by keeping only the top singular values, trading a small amount of accuracy for major storage savings.

!!! tip "Teaching Moment"
    SVD answers the question: "What is the most compact way to represent this data?" By keeping only the largest singular values, you keep the signal and discard the noise. This is why SVD-based methods are so effective -- they automatically separate important patterns from random variation.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's discussion of SVD or Steve Brunton's "SVD" lecture (15 min) for visual intuition
    - [ ] :blue_book: Read MML book Section 4.5 on SVD and its connection to PCA
    - [ ] :computer: Apply SVD to an image matrix using `np.linalg.svd()`, reconstruct it with different numbers of singular values, and observe the quality-compression tradeoff

**Resources:**

- :movie_camera: [Steve Brunton: SVD](https://www.youtube.com/watch?v=nbBvuuNVfco) -- Excellent visual explanation of SVD with real applications (Free)
- :blue_book: [MML Book Ch. 4.5: SVD](https://mml-book.github.io/book/mml-book.pdf) -- Formal treatment connecting SVD to PCA and low-rank approximation (Free PDF)
- :movie_camera: [StatQuest: SVD](https://statquest.org/statquest-pca-clearly-explained/) -- Practical walkthrough with data science context (Free)
- :books: [Khan Academy: Singular Value Decomposition](https://www.khanacademy.org/math/linear-algebra) -- Step-by-step computation for learning the mechanics (Free)

---

## Key Takeaways

- **Data is vectors and matrices**: every dataset is a matrix, every data point is a vector -- linear algebra is the language ML algorithms use to process your data
- **Matrix multiplication is the core operation**: neural network layers, linear regression, PCA, and SVD all reduce to matrix operations under the hood
- **Eigenvalues reveal structure**: the eigenvectors of the covariance matrix point in the directions of maximum variance -- this is PCA, the most-used dimensionality reduction technique
- **SVD is the Swiss Army knife**: dimensionality reduction, recommender systems, data compression, and noise removal all use SVD to find the most compact representation of data
- **"Just enough" beats "all of it"**: you do not need a full semester course -- understanding vectors, matrices, eigenvalues, and SVD covers the linear algebra used in the vast majority of ML algorithms

---

**Next up:** [Calculus](calculus.md) -- derivatives, gradients, and the optimization algorithms that actually train ML models
