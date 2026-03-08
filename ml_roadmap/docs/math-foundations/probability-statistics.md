# Probability & Statistics

!!! prerequisite "Before You Start"
    No strict math prerequisites -- this section can be studied in parallel with [Linear Algebra](linear-algebra.md). Familiarity with basic algebra is sufficient. Completing Linear Algebra first provides helpful context for covariance matrices and multivariate distributions.

*Total time: ~8-10 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Apply probability rules to reason about uncertainty in ML predictions
- Recognize and work with key distributions (Normal, Bernoulli, Uniform) used in data modeling
- Derive and apply Bayes' theorem to classification and inference problems
- Understand maximum likelihood estimation as the training objective for many ML models
- Use descriptive statistics and hypothesis testing to evaluate data and compare models

---

## Probability Basics and Rules

*:timer: ~1 hour*

Probability is how ML models express uncertainty. When a classifier says "90% chance this email is spam," that is a probability. When a Bayesian model updates its beliefs after seeing new data, that is probability. The entire field of ML is built on probabilistic reasoning.

The probability of an event \(A\) is a number between 0 and 1: \(0 \leq P(A) \leq 1\). The fundamental rules:

- **Addition rule:** \(P(A \cup B) = P(A) + P(B) - P(A \cap B)\)
- **Multiplication rule:** \(P(A \cap B) = P(A) \cdot P(B|A)\)
- **Complement:** \(P(\overline{A}) = 1 - P(A)\)

**Conditional probability** is the probability of \(A\) given that \(B\) has occurred:

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

This is the most important formula in this section. Nearly every ML prediction is a conditional probability: "given these features, what is the probability of this label?" A classifier computes \(P(\text{class} | \text{features})\).

**Independence** means knowing one event tells you nothing about the other: \(P(A \cap B) = P(A) \cdot P(B)\). The Naive Bayes classifier assumes all features are independent given the class -- a strong assumption that works surprisingly well in practice.

!!! tip "Teaching Moment"
    Conditional probability is where most confusion starts. \(P(A|B)\) is NOT the same as \(P(B|A)\). The probability that you have a disease given a positive test result is very different from the probability of a positive test given that you have the disease. Confusing these two is called the "base rate fallacy" and it leads to serious errors in medical testing, legal reasoning, and ML evaluation.

!!! action "What to Do"
    - [ ] :movie_camera: Watch Khan Academy's "Basic probability" and "Conditional probability" videos (20 min total) for intuitive foundations
    - [ ] :blue_book: Read MML book Section 6.1 on probability spaces and rules
    - [ ] :computer: Compute conditional probabilities from a contingency table in Python -- create a confusion matrix and compute precision, recall, and F1 score (these are all conditional probabilities)

**Resources:**

- :movie_camera: [Khan Academy: Probability](https://www.khanacademy.org/math/statistics-probability/probability-library) -- Step-by-step basics with practice problems (Free)
- :blue_book: [MML Book Ch. 6.1: Probability Spaces](https://mml-book.github.io/book/mml-book.pdf) -- Formal treatment with ML motivation (Free PDF)
- :movie_camera: [StatQuest: Probability Fundamentals](https://www.youtube.com/watch?v=uzkc-qNVoOk) -- Visual, ML-focused probability basics (Free)
- :dart: [DeepLearning.AI: Probability & Statistics for ML](https://www.coursera.org/learn/machine-learning-probability-and-statistics) -- Full course with ML applications (Free to audit)

---

## Probability Distributions

*:timer: ~1.5 hours*

A probability distribution describes how likely different outcomes are. In ML, distributions model your data, your noise, and your uncertainty.

The **Normal (Gaussian) distribution** is the most important distribution in ML:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

where \(\mu\) is the mean and \(\sigma^2\) is the variance. It appears everywhere: measurement noise is often Gaussian, many ML algorithms assume Gaussian errors (linear regression), and the Central Limit Theorem guarantees that averages of large samples are approximately Gaussian regardless of the underlying distribution.

**Key distributions for ML:**

| Distribution | Type | ML Use |
|-------------|------|--------|
| Normal \(\mathcal{N}(\mu, \sigma^2)\) | Continuous | Noise modeling, regression errors, weight initialization |
| Bernoulli \(\text{Ber}(p)\) | Discrete | Binary classification outcomes |
| Uniform \(U(a, b)\) | Continuous | Random initialization, data augmentation |
| Multinomial | Discrete | Multi-class classification, text modeling |
| Poisson \(\text{Poi}(\lambda)\) | Discrete | Count data, event modeling |

The **expected value** (mean) is the long-run average:

$$E[X] = \sum_x x \cdot P(X=x) \quad \text{or} \quad E[X] = \int x \cdot f(x) \, dx$$

The **variance** measures spread:

$$\text{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2$$

!!! tip "Teaching Moment"
    When a neural network is initialized, the weights are typically drawn from a distribution -- often Normal or Uniform. The choice of initialization distribution affects whether the network trains well or gets stuck. Xavier initialization uses \(\mathcal{N}(0, 1/n)\) to keep activations from exploding or vanishing. Understanding distributions helps you understand why these choices matter.

!!! action "What to Do"
    - [ ] :movie_camera: Watch StatQuest's "Normal Distribution" and "Probability Distributions" videos (20 min total) for visual intuition
    - [ ] :blue_book: Read MML book Section 6.2 on discrete and continuous distributions
    - [ ] :computer: Generate samples from Normal, Uniform, and Bernoulli distributions using `numpy.random`, plot their histograms, and compute empirical mean and variance

**Resources:**

- :movie_camera: [StatQuest: Normal Distribution](https://www.youtube.com/watch?v=rzFX5NWojp0) -- Clear visual explanation of the bell curve and its parameters (Free)
- :blue_book: [MML Book Ch. 6.2: Distributions](https://mml-book.github.io/book/mml-book.pdf) -- ML-relevant distributions with formal definitions (Free PDF)
- :books: [Khan Academy: Distributions](https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library) -- Interactive practice with common distributions (Free)
- :book: [Think Stats Ch. 2-3](https://greenteapress.com/thinkstats2/) -- Python-based approach to distributions and PMFs (Free online)

---

## Bayes' Theorem

*:timer: ~1.5 hours*

Bayes' theorem is arguably the single most important formula in machine learning. It tells you how to update your beliefs when you see new evidence:

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

In ML terms:

$$P(\text{hypothesis} | \text{data}) = \frac{P(\text{data} | \text{hypothesis}) \cdot P(\text{hypothesis})}{P(\text{data})}$$

- **Prior** \(P(\text{hypothesis})\): What you believed before seeing data
- **Likelihood** \(P(\text{data} | \text{hypothesis})\): How likely the data is under this hypothesis
- **Posterior** \(P(\text{hypothesis} | \text{data})\): Your updated belief after seeing data
- **Evidence** \(P(\text{data})\): A normalizing constant

**The Naive Bayes classifier** applies Bayes' theorem directly. To classify an email as spam or not spam, it computes:

$$P(\text{spam} | \text{words}) \propto P(\text{words} | \text{spam}) \cdot P(\text{spam})$$

The "naive" assumption is that word probabilities are independent given the class, which makes the computation tractable. Despite this strong assumption, Naive Bayes works remarkably well for text classification, spam filtering, and sentiment analysis.

Beyond Naive Bayes, Bayesian thinking pervades ML:
- **Bayesian optimization** uses Bayes' theorem to efficiently search hyperparameter spaces
- **Bayesian neural networks** place distributions over weights instead of point estimates
- **Probabilistic graphical models** use Bayesian networks to model complex dependencies
- **Regularization** in many models can be interpreted as placing a prior on the weights

!!! tip "Why This Path"
    Stanford CS229 and Andrew Ng both emphasize that probability is the language of ML. Bayes' theorem alone underpins Naive Bayes classifiers, Bayesian optimization for hyperparameter tuning, probabilistic graphical models, and the entire field of Bayesian deep learning. When a model outputs a probability instead of a hard prediction, Bayesian thinking is at work. This section gives you the vocabulary to understand what your models are actually computing.

!!! tip "Teaching Moment"
    The power of Bayes' theorem is that it flips conditional probabilities. You often know \(P(\text{symptoms} | \text{disease})\) from medical studies, but what you actually want is \(P(\text{disease} | \text{symptoms})\). Bayes' theorem converts one into the other. In ML, you know how data is generated under each class (the likelihood), and Bayes gives you the classification probability.

!!! action "What to Do"
    - [ ] :movie_camera: Watch StatQuest's "Bayes' Theorem" (12 min) for a clear visual walkthrough
    - [ ] :movie_camera: Watch 3Blue1Brown's "Bayes' theorem" (17 min) for geometric intuition
    - [ ] :blue_book: Read MML book Section 6.3 on Bayes' theorem and Bayesian inference
    - [ ] :computer: Implement a Naive Bayes spam classifier from scratch using Bayes' theorem, then compare with scikit-learn's `GaussianNB`

**Resources:**

- :movie_camera: [StatQuest: Bayes' Theorem](https://www.youtube.com/watch?v=9wCnvr7Xw4E) -- Clear, practical walkthrough of Bayes' theorem (Free)
- :movie_camera: [3Blue1Brown: Bayes' Theorem](https://www.youtube.com/watch?v=HZGCoVF3YvM) -- Beautiful geometric visualization of updating beliefs (Free)
- :blue_book: [MML Book Ch. 6.3: Bayesian Inference](https://mml-book.github.io/book/mml-book.pdf) -- Formal Bayesian framework with ML applications (Free PDF)
- :dart: [Harvard Stat 110: Bayes](https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo) -- Joe Blitzstein's probability course, excellent Bayes coverage (Free)

---

## Maximum Likelihood Estimation

*:timer: ~1 hour*

Maximum Likelihood Estimation (MLE) answers the question: "given the data I observed, what parameters make this data most likely?" It is the training objective for many ML models, from logistic regression to neural networks.

Given data points \(x_1, x_2, \ldots, x_n\) assumed to come from a distribution with parameter \(\theta\), the likelihood is:

$$L(\theta) = \prod_{i=1}^{n} P(x_i | \theta)$$

MLE finds the parameter that maximizes this:

$$\hat{\theta} = \arg\max_\theta \prod_{i=1}^{n} P(x_i | \theta)$$

In practice, you maximize the **log-likelihood** instead (products become sums, which are numerically stable and easier to differentiate):

$$\ell(\theta) = \sum_{i=1}^{n} \log P(x_i | \theta)$$

**MLE connects to loss functions you already know:**

- Linear regression with Gaussian noise: MLE gives you the mean squared error loss
- Logistic regression: MLE gives you the cross-entropy loss
- Neural network classification: MLE gives you the softmax cross-entropy loss

When you minimize cross-entropy loss in PyTorch, you are doing MLE. The loss function IS the negative log-likelihood.

!!! tip "Teaching Moment"
    The connection between MLE and loss functions is one of the most important insights in ML. Every time you call `loss.backward()` in PyTorch, you are computing the gradient of the negative log-likelihood. Minimizing the loss IS maximizing the likelihood of the data under the model. This unifying view connects the statistical theory (MLE) to the practical implementation (loss functions and gradient descent).

!!! action "What to Do"
    - [ ] :movie_camera: Watch StatQuest's "Maximum Likelihood" (10 min) for visual intuition on finding the best parameters
    - [ ] :blue_book: Read MML book Section 8.1 on MLE and its connection to empirical risk minimization
    - [ ] :computer: Estimate the mean and variance of a Gaussian distribution using MLE: generate samples, write the log-likelihood function, and find the parameters that maximize it using `scipy.optimize`

**Resources:**

- :movie_camera: [StatQuest: Maximum Likelihood](https://www.youtube.com/watch?v=XepXtl9YKwc) -- The clearest visual explanation of MLE (Free)
- :blue_book: [MML Book Ch. 8.1: MLE](https://mml-book.github.io/book/mml-book.pdf) -- Connects MLE to linear regression and empirical risk (Free PDF)
- :books: [Khan Academy: Maximum Likelihood](https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library) -- Step-by-step MLE for common distributions (Free)
- :dart: [DeepLearning.AI: Probability & Statistics for ML](https://www.coursera.org/learn/machine-learning-probability-and-statistics) -- MLE module with ML applications (Free to audit)

---

## Descriptive Statistics and Distributions

*:timer: ~1.5 hours*

Before building any model, you explore your data. Descriptive statistics are the tools for this exploration -- they summarize your dataset's characteristics so you can make informed modeling decisions.

**Central tendency:**

$$\text{Mean: } \bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i \qquad \text{Median: middle value when sorted}$$

The mean is sensitive to outliers; the median is robust. If your data has extreme values (income, home prices), the median is more representative. Many ML preprocessing steps (like standardization) use the mean and standard deviation.

**Spread:**

$$\text{Variance: } \sigma^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2 \qquad \text{Std Dev: } \sigma = \sqrt{\sigma^2}$$

High variance in a feature means wide spread -- that feature has high dynamic range. Features with very different scales (e.g., age 0-100 vs. salary 0-1,000,000) need **normalization** or **standardization** before many ML algorithms work well.

**Percentiles and IQR:** The interquartile range (25th to 75th percentile) captures the middle 50% of data. Values outside 1.5 times the IQR from the quartiles are potential outliers. Boxplots visualize this.

**Correlation:** The Pearson correlation coefficient \(r\) measures linear relationship between two variables:

$$r = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum(x_i - \bar{x})^2 \sum(y_i - \bar{y})^2}}$$

Correlation matrices help identify redundant features (high correlation) and potential predictors (high correlation with the target).

!!! tip "Teaching Moment"
    Exploratory Data Analysis (EDA) is where descriptive statistics meets data science. Before training any model, you should compute summary statistics, plot distributions, check for missing values, and examine correlations. This is not busy work -- it prevents modeling disasters. A single extreme outlier can dominate a linear regression. A feature with zero variance adds no information. EDA catches these issues before they waste your time.

!!! action "What to Do"
    - [ ] :movie_camera: Watch StatQuest's "Histograms" and "Box Plots" videos (15 min total) for visual data exploration techniques
    - [ ] :blue_book: Read Think Stats Chapter 1-2 for a Python-based approach to descriptive statistics
    - [ ] :computer: Load a Kaggle dataset with `pandas`, compute `.describe()`, plot histograms and boxplots, and create a correlation heatmap using `seaborn.heatmap()`

**Resources:**

- :movie_camera: [StatQuest: Histograms and Box Plots](https://www.youtube.com/watch?v=BE8CVGJuftI) -- Visual data exploration techniques (Free)
- :book: [Think Stats by Allen Downey](https://greenteapress.com/thinkstats2/) -- Entire book on statistics using Python, free online (Free)
- :books: [Khan Academy: Summarizing Data](https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data) -- Interactive practice with mean, median, variance (Free)
- :dart: [DeepLearning.AI: Probability & Statistics for ML](https://www.coursera.org/learn/machine-learning-probability-and-statistics) -- EDA and descriptive statistics module (Free to audit)

---

## Hypothesis Testing and Statistical Thinking

*:timer: ~1 hour*

Hypothesis testing provides a framework for making decisions from data -- is this model better than that one? Did this A/B test produce a real improvement, or was it just noise?

The framework:

1. **Null hypothesis** \(H_0\): "There is no difference" (the default assumption)
2. **Alternative hypothesis** \(H_1\): "There is a difference"
3. Compute a **test statistic** from your data
4. Calculate the **p-value**: the probability of seeing results this extreme if \(H_0\) is true
5. If p-value < significance level \(\alpha\) (commonly 0.05), reject \(H_0\)

**Confidence intervals** provide a range estimate: "I am 95% confident the true mean lies between 3.2 and 4.8." A 95% confidence interval for the mean is:

$$\bar{x} \pm z_{\alpha/2} \frac{\sigma}{\sqrt{n}}$$

**In ML practice, hypothesis testing appears in:**

- **A/B testing:** "Did the new recommendation model increase click-through rates?" Compare means with a t-test.
- **Model comparison:** "Is model A significantly better than model B?" Use paired tests on cross-validation scores.
- **Feature importance:** "Is this feature's coefficient significantly different from zero?" Check confidence intervals.
- **Fairness auditing:** "Does the model perform significantly differently across demographic groups?"

The **multiple testing problem** arises when you run many tests -- if you test 100 features for significance at \(\alpha = 0.05\), you expect 5 false positives by chance. Corrections like Bonferroni or FDR control are essential.

!!! tip "Teaching Moment"
    P-values are widely misunderstood. A p-value of 0.03 does NOT mean "there is a 3% chance the null hypothesis is true." It means "if the null hypothesis were true, there is a 3% chance of observing data this extreme." The distinction matters for interpreting ML experiments correctly. Also, statistical significance does not imply practical significance -- a model improvement might be statistically significant but too small to matter in production.

!!! action "What to Do"
    - [ ] :movie_camera: Watch StatQuest's "p-values" and "Hypothesis Testing" videos (20 min total) for clear visual explanations
    - [ ] :blue_book: Read Think Stats Chapter 7-9 on hypothesis testing and estimation
    - [ ] :computer: Run a t-test comparing two model's cross-validation scores using `scipy.stats.ttest_rel()` and interpret the p-value and confidence interval

**Resources:**

- :movie_camera: [StatQuest: p-values](https://www.youtube.com/watch?v=vemZtEM63GY) -- The most intuitive p-value explanation available (Free)
- :movie_camera: [StatQuest: Hypothesis Testing](https://www.youtube.com/watch?v=0oc49DyA3hU) -- Full walkthrough of the testing framework (Free)
- :book: [Think Stats Ch. 7-9](https://greenteapress.com/thinkstats2/) -- Python-based hypothesis testing with real data (Free online)
- :books: [Khan Academy: Significance Tests](https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample) -- Practice problems with step-by-step solutions (Free)
- :dart: [Harvard Stat 110](https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo) -- Deeper probability and inference coverage (Free)

---

## Key Takeaways

- **Probability is the language of ML**: every prediction with confidence, every classification probability, and every uncertainty estimate uses probability theory
- **Bayes' theorem is foundational**: it converts likelihood into posterior probability -- this single formula powers Naive Bayes classifiers, Bayesian optimization, and probabilistic reasoning throughout ML
- **MLE connects theory to practice**: minimizing cross-entropy loss IS maximizing likelihood -- the loss functions you use daily are negative log-likelihoods
- **EDA before modeling**: descriptive statistics catch data issues (outliers, missing values, correlated features) before they become modeling disasters
- **Statistical thinking prevents false conclusions**: hypothesis testing and p-values help you determine whether model improvements are real or just noise from random variation

---

**Next up:** [NumPy](../python-ml/numpy.md) -- from math theory to Python practice, starting with the numerical computing library that powers all of scientific Python
