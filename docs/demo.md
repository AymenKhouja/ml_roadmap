# Features Demo

This page demonstrates all the infrastructure features available for content authoring.
Use it as a reference when writing new pages for the ML Mastery Roadmap.

---

## Code Blocks

Python code blocks support syntax highlighting, line numbers, and a copy button (top-right corner).

``` python linenums="1"
import numpy as np

def gradient_descent(X, y, lr=0.01, epochs=1000):
    """Train a simple linear regression model using gradient descent."""
    m, n = X.shape
    weights = np.zeros(n)
    bias = 0.0

    for epoch in range(epochs):
        predictions = X @ weights + bias
        error = predictions - y

        weights -= lr * (2 / m) * (X.T @ error)
        bias -= lr * (2 / m) * np.sum(error)

        if epoch % 200 == 0:
            loss = np.mean(error ** 2)
            print(f"Epoch {epoch}: MSE = {loss:.4f}")

    return weights, bias
```

You can also use `inline code` for short references like `np.array([1, 2, 3])` or variable names like `learning_rate`.

---

## Math Equations

### Inline Math

The gradient descent update rule is \(\theta = \theta - \alpha \nabla J(\theta)\), where \(\alpha\) is the learning rate and \(\nabla J(\theta)\) is the gradient of the cost function.

### Display Math

The mean squared error cost function used in linear regression:

$$
J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right)^2
$$

The softmax function maps a vector of logits to a probability distribution:

$$
\sigma(z)_j = \frac{e^{z_j}}{\sum_{k=1}^{K} e^{z_k}} \quad \text{for } j = 1, \ldots, K
$$

---

## Admonitions

!!! note "A Note on Learning"
    Machine learning is an iterative discipline. Expect to revisit foundational
    concepts like linear algebra and calculus multiple times as you progress
    through more advanced topics. Each revisit deepens your understanding.

!!! tip "Practical Tip"
    When training models, always normalize your input features to have zero mean
    and unit variance. This simple step often improves convergence speed by an
    order of magnitude and prevents features with large scales from dominating.

!!! warning "Common Pitfall"
    Never evaluate your model on the same data you used for training. This leads
    to overfitting, where the model memorizes the training data but fails to
    generalize. Always hold out a separate test set or use cross-validation.

!!! example "Worked Example: Bias-Variance Tradeoff"
    Consider a polynomial regression model. A degree-1 polynomial (straight line)
    has **high bias** and underfits the data. A degree-20 polynomial has **high
    variance** and overfits. The sweet spot is typically found through
    cross-validation, balancing model complexity against generalization error.

??? info "Collapsible: Why Regularization Works"
    Regularization adds a penalty term to the loss function that discourages
    large weight values. For L2 regularization (Ridge), the modified cost
    function becomes:

    $$
    J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2 + \frac{\lambda}{2m} \sum_{j=1}^{n} \theta_j^2
    $$

    The hyperparameter \(\lambda\) controls the strength of regularization.
    Larger values push weights toward zero, reducing model complexity and
    helping prevent overfitting.

---

## Content Tabs

=== "PyTorch"

    ``` python
    import torch
    import torch.nn as nn

    model = nn.Sequential(
        nn.Linear(784, 128),
        nn.ReLU(),
        nn.Linear(128, 10),
    )
    loss_fn = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
    ```

=== "TensorFlow"

    ``` python
    import tensorflow as tf
    from tensorflow import keras

    model = keras.Sequential([
        keras.layers.Dense(128, activation="relu", input_shape=(784,)),
        keras.layers.Dense(10, activation="softmax"),
    ])
    model.compile(
        optimizer="adam",
        loss="sparse_categorical_crossentropy",
    )
    ```

---

## Mermaid Diagrams

The following flowchart shows a simplified ML project pipeline from data collection through deployment:

``` mermaid
graph LR
    A[Data Collection] --> B[Preprocessing]
    B --> C[Feature Engineering]
    C --> D[Model Training]
    D --> E{Evaluation}
    E -->|Meets threshold| F[Deployment]
    E -->|Below threshold| G[Hyperparameter Tuning]
    G --> D
    F --> H[Monitoring]
    H -->|Drift detected| B
```

This diagram renders as an interactive SVG. In dark mode, colors automatically adapt to the current theme.
