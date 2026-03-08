# Unsupervised Learning

!!! prerequisite "Before You Start"
    Complete [Supervised Learning](supervised-learning.md) and
    [Scikit-learn Basics](../python-ml/scikit-learn.md) before this section.

*Total time: ~6-8 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Understand the difference between supervised and unsupervised learning and when to use each
- Know how K-Means clustering works and how to choose the number of clusters
- Be able to apply PCA for dimensionality reduction and t-SNE/UMAP for visualization
- Understand anomaly detection methods and their practical applications
- Have a decision framework for choosing the right unsupervised method

---

## What is Unsupervised Learning?

*⏱ ~30 minutes*

Unsupervised learning works with **unlabeled data** -- there are no target values to predict. Instead of learning a mapping from inputs to outputs, the algorithm must discover **structure** in the data on its own. This is fundamentally different from supervised learning, where a teacher (the labels) guides the learning process.

There are three main tasks in unsupervised learning. **Clustering** groups similar data points together (customer segments, document topics). **Dimensionality reduction** compresses data into fewer features while preserving important patterns (preprocessing for visualization or downstream models). **Anomaly detection** identifies data points that do not fit the normal pattern (fraud, defects, intrusions).

Unsupervised learning is everywhere in practice. Recommendation systems use clustering to find similar users. Data scientists use PCA to reduce 100 features to 10 before training a classifier. Security teams use anomaly detection to flag unusual network activity. These techniques are often preprocessing steps that feed into supervised models downstream.

A common misconception is that unsupervised learning is "less useful" than supervised learning because there are no labels to optimize. In reality, unsupervised methods are often the first step in any ML project -- you explore and understand your data with clustering and visualization before building any predictive model. In many domains (customer analytics, bioinformatics, social network analysis), unsupervised learning IS the primary tool because meaningful labels simply do not exist.

!!! tip "Teaching Moment"
    The key conceptual shift from supervised to unsupervised learning is this: with labels, you can measure exactly how wrong your model is (loss function). Without labels, there is no single "right answer" -- you must evaluate results using indirect measures like cluster compactness or explained variance. This makes unsupervised learning harder to validate but also more exploratory and discovery-oriented.

!!! action "What to Do"
    - [ ] 🎥 Watch Andrew Ng's "Unsupervised Learning" lecture (10 min) for the conceptual contrast with supervised learning
    - [ ] 📖 Read ISLR Chapter 12.1 for the statistical perspective on unsupervised learning challenges
    - [ ] 💻 Load the Iris dataset WITHOUT labels and explore: can you visually identify clusters?

    ```python
    from sklearn.datasets import load_iris
    import matplotlib.pyplot as plt

    X, _ = load_iris(return_X_y=True)  # discard labels
    plt.scatter(X[:, 0], X[:, 1], alpha=0.6)
    plt.xlabel("Sepal Length")
    plt.ylabel("Sepal Width")
    plt.title("Can you see clusters without labels?")
    plt.show()
    ```

**Resources:**

- 🎥 [Andrew Ng: Unsupervised Learning](https://www.coursera.org/learn/machine-learning) -- Clear framing of the difference between supervised and unsupervised learning (Free to audit)
- 📘 [ISLR Ch. 12: Unsupervised Learning](https://www.statlearning.com/) -- Statistical treatment covering PCA, clustering, and the challenges of working without labels (Free)
- 📖 [Scikit-learn: Unsupervised Learning Overview](https://scikit-learn.org/stable/unsupervised_learning.html) -- Practical overview of all unsupervised methods with code links (Free)
- 🎥 [StatQuest: Unsupervised Learning Intro](https://statquest.org/) -- Visual overview of clustering and dimensionality reduction concepts (Free)

---

## K-Means and Clustering

*⏱ ~1.5 hours*

K-Means is the most widely used clustering algorithm. The idea is simple: assign each data point to the nearest **centroid** (cluster center), then update centroids to be the mean of their assigned points. Repeat until assignments stop changing. The algorithm converges quickly and scales well to large datasets.

The algorithm starts by randomly placing K centroids. Then it alternates two steps: (1) **assign** each point to the nearest centroid, and (2) **update** each centroid to be the mean of its assigned points. This continues until no points change assignment. Because initialization is random, K-Means can converge to different solutions -- scikit-learn runs the algorithm multiple times (`n_init=10` by default) and keeps the best result.

The key challenge is **choosing K** -- the number of clusters. The **elbow method** plots the total within-cluster variance (inertia) for different values of K and looks for the "bend" where adding more clusters gives diminishing returns. The **silhouette score** measures how similar each point is to its own cluster compared to neighboring clusters, giving a score from -1 (wrong cluster) to +1 (well-clustered). In practice, use both: the elbow plot narrows the range and the silhouette score picks the winner.

K-Means is not the only clustering option. **Hierarchical clustering** builds a tree of nested clusters (dendrogram) and does not require choosing K upfront -- you can cut the dendrogram at different heights to get different numbers of clusters. This is useful for exploratory analysis when you do not know how many groups exist. The linkage method (single, complete, average, or Ward) controls how distances between clusters are measured and significantly affects the results.

**DBSCAN** (Density-Based Spatial Clustering of Applications with Noise) takes a fundamentally different approach. Instead of assuming a fixed number of spherical clusters, it finds regions of high density separated by regions of low density. It has two parameters: `eps` (neighborhood radius) and `min_samples` (minimum points to form a dense region). DBSCAN can discover clusters of arbitrary shape and automatically labels outlier points as noise -- something K-Means cannot do. Use K-Means when you expect roughly spherical clusters and know approximately how many groups exist; use DBSCAN when cluster shapes are irregular or you need automatic outlier detection.

```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
kmeans.fit(X)
labels = kmeans.labels_
score = silhouette_score(X, labels)
print(f"Silhouette score: {score:.3f}")
```

!!! tip "Teaching Moment"
    K-Means can fail silently. It always produces exactly K clusters even if the data has a different natural grouping. It assumes spherical clusters of roughly equal size. If your data has elongated clusters, clusters of very different sizes, or clusters within clusters, K-Means will give misleading results. Always visualize your clusters and check the silhouette score -- do not blindly trust the algorithm.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "K-Means Clustering" (9 min) for visual intuition on the assign-update loop
    - [ ] 📘 Read ISLR Chapter 12.4.1 for the mathematical framework behind K-Means
    - [ ] 💻 Run K-Means on the Iris dataset (without labels) for K=2,3,4,5. Plot the elbow curve and silhouette scores. Which K best matches the true 3 species?
    - [ ] 💻 Try DBSCAN on the same data with different `eps` values and compare the cluster shapes to K-Means results

**Resources:**

- 🎥 [StatQuest: K-Means Clustering](https://statquest.org/k-means-clustering/) -- Best visual explanation of the algorithm and convergence (Free)
- 📘 [ISLR Ch. 12.4: Clustering Methods](https://www.statlearning.com/) -- K-Means, hierarchical clustering, and practical considerations (Free)
- 💻 [Scikit-learn: Clustering Guide](https://scikit-learn.org/stable/modules/clustering.html) -- Comprehensive comparison of all clustering algorithms with code (Free)
- 🎯 [Kaggle Learn: Unsupervised Learning](https://www.kaggle.com/learn/intro-to-machine-learning) -- Hands-on clustering exercises (Free)
- 🎥 [StatQuest: Hierarchical Clustering](https://statquest.org/hierarchical-clustering/) -- Visual guide to dendrograms and linkage methods (Free)

---

## Dimensionality Reduction

*⏱ ~1.5 hours*

When your data has dozens or hundreds of features, many of them are correlated or redundant. **Principal Component Analysis (PCA)** finds new axes (principal components) that capture the maximum variance in the data, letting you project high-dimensional data into fewer dimensions with minimal information loss.

PCA works by computing the eigenvectors of the data's covariance matrix. Each eigenvector defines a direction of maximum variance, and its corresponding eigenvalue tells you how much variance that direction explains. The first principal component captures the most variance, the second captures the most remaining variance (orthogonal to the first), and so on.

If you studied [Linear Algebra](../math-foundations/linear-algebra.md), you will recognize eigenvalues and eigenvectors here -- this is one of the most direct applications of linear algebra in ML. The proportion of variance explained helps you decide how many components to keep:

$$\text{Variance explained ratio}_k = \frac{\lambda_k}{\sum_{i=1}^{p} \lambda_i}$$

A practical rule of thumb: keep enough components to explain **95% of the variance**. This often reduces hundreds of features down to tens, dramatically speeding up training and reducing overfitting risk. You can visualize this with a cumulative explained variance plot -- the point where the curve flattens is your target number of components.

For **visualization**, linear PCA often is not enough to reveal clusters in 2D. **t-SNE** (t-distributed Stochastic Neighbor Embedding) uses a non-linear method to preserve local neighborhoods, making it excellent for visualizing high-dimensional data in 2D or 3D. However, t-SNE is slow on large datasets (quadratic time complexity) and its results are sensitive to the perplexity hyperparameter -- different settings can produce very different-looking plots of the same data.

**UMAP** (Uniform Manifold Approximation and Projection) is a newer alternative that has rapidly become the preferred visualization tool. It is significantly faster than t-SNE (handles millions of points), better preserves global structure (clusters that are far apart in high dimensions stay far apart in the plot), and has more interpretable hyperparameters. If you learn one visualization method, learn UMAP.

```python
from sklearn.decomposition import PCA
import numpy as np

pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)
print(f"Variance explained: {pca.explained_variance_ratio_}")
print(f"Total: {np.sum(pca.explained_variance_ratio_):.1%}")
```

!!! tip "Teaching Moment"
    PCA has two distinct use cases that beginners often conflate. **As preprocessing**, PCA reduces features before training a model -- you might go from 100 features to 20, keeping 95% of the variance. This speeds up training and can reduce overfitting. **As visualization**, you project to 2-3 dimensions for plotting. t-SNE and UMAP are better for visualization because they preserve non-linear relationships. Never use t-SNE/UMAP as preprocessing for a downstream model -- they are designed for visualization only.

!!! action "What to Do"
    - [ ] 🎥 Watch StatQuest's "PCA" (20 min) for the best visual explanation of eigenvectors and variance
    - [ ] 📘 Read ISLR Chapter 12.2 for the mathematical foundations of PCA
    - [ ] 💻 Apply PCA to the digits dataset (`from sklearn.datasets import load_digits`), plot the cumulative variance explained, and determine how many components capture 95% of the variance
    - [ ] 💻 Compare PCA, t-SNE, and UMAP (if installed) visualizations of the same dataset -- notice how t-SNE/UMAP reveal cluster structure that PCA misses

**Resources:**

- 🎥 [StatQuest: PCA Main Ideas](https://statquest.org/pca-main-ideas/) -- Best visual walkthrough of PCA, step by step (Free)
- 📘 [ISLR Ch. 12.2: Principal Components Analysis](https://www.statlearning.com/) -- Rigorous but accessible PCA treatment (Free)
- 💻 [Scikit-learn: Decomposition](https://scikit-learn.org/stable/modules/decomposition.html) -- PCA, kernel PCA, and other decomposition methods (Free)
- 📖 [UMAP Documentation](https://umap-learn.readthedocs.io/) -- Official docs with comparison to t-SNE and practical usage guide (Free)
- 🎥 [StatQuest: t-SNE](https://statquest.org/tsne-clearly-explained/) -- Visual explanation of how t-SNE preserves local structure (Free)

---

## Anomaly Detection

*⏱ ~1 hour*

Anomaly detection identifies data points that deviate significantly from the normal pattern. Unlike classification, you typically have very few (or zero) labeled anomalies to learn from -- the model must learn what "normal" looks like and flag anything that does not fit. This is sometimes called **one-class learning** or **novelty detection** depending on whether you expect anomalies in your training data.

The simplest approaches use statistical rules (flag anything beyond 3 standard deviations), but these fail on multi-dimensional data or non-Gaussian distributions. ML-based methods handle complex, high-dimensional data where simple statistics break down.

**Isolation Forest** works on an elegant intuition: anomalies are easier to isolate. The algorithm builds random trees by picking random features and random split values. Normal points require many splits to isolate (they are surrounded by similar points), while anomalies are isolated in just a few splits. The number of splits needed to isolate a point becomes its anomaly score.

**Local Outlier Factor (LOF)** compares the local density around each point to the density around its neighbors. A point with much lower density than its neighbors is likely an anomaly -- this makes LOF sensitive to context, detecting points that are anomalous relative to their local neighborhood even if they would look normal globally. **One-Class SVM** learns a tight boundary around the normal data in high-dimensional space and flags anything outside the boundary.

Each method has different strengths. Isolation Forest is fastest and works well on high-dimensional tabular data -- it should be your default choice. LOF excels at detecting local anomalies in clustered data where "normal" varies by region. One-Class SVM works well when the normal data has a clear, compact structure and you need a precise decision boundary. In practice, many teams combine multiple methods and flag points that multiple detectors agree on.

The `contamination` parameter tells the algorithm what fraction of data you expect to be anomalous. Setting this correctly requires domain knowledge -- in credit card fraud, it might be 0.1%, while in manufacturing defect detection, it could be 2-5%.

```python
from sklearn.ensemble import IsolationForest

iso = IsolationForest(contamination=0.05, random_state=42)
predictions = iso.fit_predict(X)  # -1 for anomalies, 1 for normal
n_anomalies = (predictions == -1).sum()
print(f"Detected {n_anomalies} anomalies out of {len(X)} points")
```

!!! tip "Teaching Moment"
    Anomaly detection is underemphasized in most ML courses but critical in industry. Fraud detection, manufacturing quality control, network intrusion detection, and medical monitoring all rely on anomaly detection. The challenge is evaluation: if you have no labeled anomalies, you cannot compute precision or recall. In practice, you tune the contamination rate (expected proportion of anomalies) based on domain knowledge and review flagged points manually.

!!! action "What to Do"
    - [ ] 🎥 Watch the Isolation Forest explanation from the scikit-learn documentation walkthrough
    - [ ] 📖 Read the scikit-learn novelty and outlier detection guide for a comparison of all methods
    - [ ] 💻 Generate a 2D dataset with `make_blobs`, inject 5% random outlier points, and use Isolation Forest to detect them. Visualize the results with anomalies highlighted in red
    - [ ] 💻 Compare Isolation Forest and LOF on the same dataset -- which one detects more of the true outliers?

**Resources:**

- 📖 [Scikit-learn: Novelty and Outlier Detection](https://scikit-learn.org/stable/modules/outlier_detection.html) -- Comprehensive guide comparing all anomaly detection methods (Free)
- 🎥 [StatQuest: Isolation Forest](https://statquest.org/) -- Visual explanation of the isolation principle (Free)
- 💻 [Kaggle: Fraud Detection Tutorial](https://www.kaggle.com/) -- Real-world anomaly detection on credit card data (Free)
- 📘 [ISLR Ch. 12: Unsupervised Learning](https://www.statlearning.com/) -- Statistical context for outlier detection (Free)

---

## Practical Applications

*⏱ ~30 minutes*

Knowing the algorithms is only half the battle -- you need a framework for choosing when to use each one.

The key question is: **what do you want to learn from your data?** If you want to find groups, use clustering. If you want to simplify, use dimensionality reduction. If you want to find weirdness, use anomaly detection. Here is a practical decision guide for specific scenarios:

**Customer segmentation:** Use K-Means or hierarchical clustering. Start with K-Means for speed, use hierarchical to explore different numbers of segments via the dendrogram. Marketing teams use this to target different customer groups with different messaging. E-commerce companies segment customers by purchase behavior, browsing patterns, and demographics to personalize recommendations and pricing.

**Data preprocessing:** Use PCA to reduce feature dimensions before training a supervised model. This is especially valuable when you have more features than samples (genomics, NLP with bag-of-words). Keep enough components to explain 95% of the variance. PCA also helps when features are highly correlated -- it decorrelates them, which benefits algorithms like logistic regression that assume feature independence.

**Image and signal compression:** PCA can compress images by keeping only the top principal components. While not used for production image compression (JPEG is better), this is a powerful teaching example and has real applications in face recognition (eigenfaces) and signal denoising.

**Visualization:** Use UMAP (preferred) or t-SNE to create 2D scatter plots of high-dimensional data. This helps you spot clusters, outliers, and data quality issues before building a model. Always a good first step in exploratory data analysis.

**Fraud and anomaly monitoring:** Use Isolation Forest for real-time detection in production systems (fast, scales well). Use LOF when anomalies are context-dependent (a purchase is anomalous relative to a specific customer's history, not globally). Combine with [Model Evaluation](model-evaluation.md) techniques when labeled anomaly data is available for validation.

**Text and document analysis:** Cluster documents by topic using K-Means on TF-IDF vectors. Reduce dimensionality with PCA or truncated SVD before clustering when working with high-dimensional text data. UMAP visualizations of document embeddings can reveal topic structure and identify mislabeled documents.

**Recommendation preprocessing:** Cluster users or items to reduce the search space for collaborative filtering. Dimensionality reduction on user-item interaction matrices is the foundation of matrix factorization methods used by Netflix, Spotify, and Amazon.

**When NOT to use unsupervised learning:** If you have labeled data and a clear prediction target, start with supervised learning. Unsupervised methods are for exploration, preprocessing, and situations where labels are unavailable or prohibitively expensive to collect. Do not use clustering as a substitute for classification when you have labels -- the supervised approach will always be more accurate.

A powerful hybrid approach is **semi-supervised learning**: use unsupervised methods to cluster your unlabeled data, then label a few examples per cluster and train a supervised model. This dramatically reduces labeling cost while still leveraging the structure unsupervised methods discover. This technique is increasingly common in industry where unlabeled data is abundant but expert annotation is expensive.

!!! tip "Why This Path"
    roadmap.sh and Andrew Ng both cover PCA and K-Means as essential unsupervised methods. We add anomaly detection because it is underemphasized in academic courses but shows up constantly in industry -- fraud detection alone is a multi-billion dollar application of ML. fast.ai and Kaggle grandmasters consistently use PCA and clustering as preprocessing steps, not just as standalone methods. Understanding unsupervised learning as a toolkit for data understanding (not just algorithm collection) is what separates practitioners from students.

!!! action "What to Do"
    - [ ] 📖 Read the scikit-learn clustering comparison page to see how different algorithms handle different data shapes
    - [ ] 💻 Pick a Kaggle dataset and apply the full unsupervised workflow: visualize with PCA/UMAP, cluster with K-Means, check for anomalies with Isolation Forest
    - [ ] 📖 Review the decision framework above and identify which method you would use for 3 different real-world scenarios

**Resources:**

- 💻 [Scikit-learn: Clustering Comparison](https://scikit-learn.org/stable/auto_examples/cluster/plot_cluster_comparison.html) -- Visual comparison of clustering algorithms on different data shapes (Free)
- 🎯 [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering) -- Practical exercises using clustering and PCA as features (Free)
- 🎥 [Andrew Ng: Unsupervised Learning Applications](https://www.coursera.org/learn/machine-learning) -- Lectures on PCA and clustering use cases (Free to audit)
- 📖 [Google ML Crash Course: Clustering](https://developers.google.com/machine-learning/clustering) -- Production-oriented guide to clustering at scale (Free)

---

## Key Takeaways

- **Unsupervised learning finds structure without labels**: clustering groups similar points, dimensionality reduction compresses features, anomaly detection flags outliers
- **K-Means is your starting point for clustering**: fast and effective, but validate with silhouette scores and visualizations -- do not trust it blindly
- **PCA reduces dimensions, t-SNE/UMAP visualizes them**: use PCA as preprocessing for downstream models, use UMAP for 2D exploration plots
- **Anomaly detection is critical in industry**: fraud, defects, intrusions -- learn Isolation Forest as your go-to method
- **Unsupervised methods are often preprocessing steps**: clustering features, PCA components, and anomaly scores frequently feed into supervised models
- **Evaluation is indirect but essential**: without labels, use silhouette scores for clustering, explained variance for PCA, and domain expertise for anomaly detection -- never skip validation

---

**Next up:** [Model Evaluation](model-evaluation.md) -- metrics, cross-validation, and the methodology that separates reliable ML from overfit experiments
