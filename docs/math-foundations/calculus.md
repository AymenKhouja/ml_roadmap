# Calculus

!!! prerequisite "Before You Start"
    Complete [Linear Algebra](linear-algebra.md) before this section. You will need vectors and matrices to understand gradients and optimization.

*Total time: ~7-9 hours* | :yellow_circle: Beginner-Intermediate

## Learning Outcomes

By the end of this section, you will:

- Compute derivatives and understand them as rates of change of loss functions
- Calculate partial derivatives and assemble them into gradient vectors
- Apply the chain rule and connect it directly to backpropagation in neural networks
- Walk through gradient descent step by step with concrete numbers
- Understand optimization landscapes: local minima, saddle points, and convergence

---

## Derivatives and Rates of Change

*:timer: ~1 hour*

A derivative measures how fast a function's output changes when you nudge its input. If \(f(x)\) is your loss function and \(x\) is a model parameter, then the derivative \(\frac{df}{dx}\) tells you: "if I increase this parameter by a tiny amount, how much does the loss change?"

$$\frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

In ML, you almost never compute this limit by hand. Instead, you use rules:

- **Power rule:** \(\frac{d}{dx} x^n = n x^{n-1}\)
- **Sum rule:** \(\frac{d}{dx}[f + g] = \frac{df}{dx} + \frac{dg}{dx}\)
- **Product rule:** \(\frac{d}{dx}[f \cdot g] = f\frac{dg}{dx} + g\frac{df}{dx}\)

For example, the mean squared error loss for a single prediction is \(L = (y - \hat{y})^2\). Its derivative with respect to \(\hat{y}\) is \(\frac{dL}{d\hat{y}} = -2(y - \hat{y})\). This tells the model exactly how to adjust its prediction: if the error is positive, decrease \(\hat{y}\); if negative, increase it.

!!! tip "Teaching Moment"
    You do not need to be able to derive every formula from scratch. Modern ML frameworks (PyTorch, TensorFlow) compute derivatives automatically using **automatic differentiation**. What you need is the intuition: the derivative tells you the direction and magnitude of change. If the derivative of the loss with respect to a weight is large and positive, that weight is making the loss worse -- decrease it.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's "The paradox of the derivative" and "Derivative formulas through geometry" (20 min total) for visual intuition
    - [ ] :blue_book: Read MML book Section 5.1 on single-variable differentiation
    - [ ] :computer: Use Python's `sympy` library to compute derivatives symbolically, then verify numerically with small finite differences

**Resources:**

- :movie_camera: [3Blue1Brown: Essence of Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) -- Visual geometric approach to derivatives and integrals (Free)
- :blue_book: [MML Book Ch. 5.1: Differentiation](https://mml-book.github.io/book/mml-book.pdf) -- Single-variable derivatives with ML motivation (Free PDF)
- :books: [Khan Academy: Derivatives](https://www.khanacademy.org/math/calculus-1/cs1-derivatives-definition-and-basic-rules) -- Step-by-step practice from first principles (Free)
- :movie_camera: [StatQuest: Derivatives](https://www.youtube.com/watch?v=CfW845LNObM) -- Clear explanation focused on practical understanding (Free)

---

## Partial Derivatives and Gradients

*:timer: ~1.5 hours*

Real ML models have many parameters, not just one. A neural network might have millions of weights. To optimize them all, you need **partial derivatives** -- the derivative of the loss with respect to each parameter individually, holding the others fixed.

If \(f(x_1, x_2, \ldots, x_n)\) is a function of multiple variables, its partial derivative with respect to \(x_i\) is:

$$\frac{\partial f}{\partial x_i} = \lim_{h \to 0} \frac{f(x_1, \ldots, x_i + h, \ldots, x_n) - f(x_1, \ldots, x_i, \ldots, x_n)}{h}$$

The **gradient** collects all partial derivatives into a single vector:

$$\nabla f = \begin{bmatrix} \frac{\partial f}{\partial x_1} \\ \frac{\partial f}{\partial x_2} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{bmatrix}$$

The gradient has a critical geometric property: **it points in the direction of steepest ascent**. If you want to minimize a loss function (which is always the goal in ML), you go in the **opposite** direction of the gradient. This is the entire basis of gradient descent.

For a linear regression model with weights \(\vec{w}\), the loss is \(J(\vec{w}) = \frac{1}{n}\sum_{i=1}^{n}(y_i - \vec{w} \cdot \vec{x}_i)^2\), and the gradient is:

$$\nabla_{\vec{w}} J = -\frac{2}{n} X^T (\vec{y} - X\vec{w})$$

This is a matrix equation -- linear algebra and calculus working together.

!!! tip "Teaching Moment"
    The gradient is a vector. This connects directly to linear algebra: the gradient lives in the same space as the parameters. When you "take the gradient of the loss," you are computing one number per parameter -- each number tells you how sensitive the loss is to that parameter. Parameters with large gradient components are the most impactful to adjust.

!!! action "What to Do"
    - [ ] :movie_camera: Watch Khan Academy's "Gradient" video (10 min) for visual intuition on gradients as slope vectors
    - [ ] :blue_book: Read MML book Section 5.2-5.3 on partial derivatives and gradients
    - [ ] :computer: Compute the gradient of a simple 2-variable function analytically, then verify with numerical approximation using small perturbations in NumPy

**Resources:**

- :movie_camera: [Khan Academy: Gradient](https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/gradient-and-directional-derivatives) -- Visual explanation of gradient vectors and directional derivatives (Free)
- :blue_book: [MML Book Ch. 5.2-5.3: Partial Derivatives and Gradients](https://mml-book.github.io/book/mml-book.pdf) -- ML-focused treatment of multivariate calculus (Free PDF)
- :movie_camera: [3Blue1Brown: Gradient Descent](https://www.youtube.com/watch?v=IHZwWFHWa-w) -- How the gradient connects to optimization (Free)
- :dart: [DeepLearning.AI: Calculus for ML](https://www.coursera.org/learn/machine-learning-calculus) -- Full course on calculus with ML applications (Free to audit)

---

## The Chain Rule

*:timer: ~1 hour*

The chain rule tells you how to differentiate composite functions -- functions applied inside other functions. If \(z = f(g(x))\), then:

$$\frac{dz}{dx} = \frac{dz}{dg} \cdot \frac{dg}{dx}$$

This extends to any number of compositions. If \(z = f(g(h(x)))\):

$$\frac{dz}{dx} = \frac{dz}{df} \cdot \frac{df}{dg} \cdot \frac{dg}{dh} \cdot \frac{dh}{dx}$$

**The chain rule IS backpropagation.** A neural network is a sequence of composed functions: input goes through layer 1 (linear transformation + activation), then layer 2, then layer 3, and so on. To compute how the loss changes with respect to weights in layer 1, you apply the chain rule through every subsequent layer.

Consider a simple two-layer network:

$$\text{loss} = L(\sigma(W_2 \cdot \sigma(W_1 \cdot \vec{x})))$$

To find \(\frac{\partial \text{loss}}{\partial W_1}\), you chain through: how loss changes with the output, how the output changes with the second layer, how the second layer changes with the first layer's output, and how that changes with \(W_1\). Each step is a local derivative multiplied together.

This is computed efficiently as a backward pass through the **computational graph** -- starting from the loss and propagating gradients backward through each operation. PyTorch and TensorFlow build this graph automatically and compute all gradients in one backward pass.

!!! tip "Teaching Moment"
    When someone says "backprop," they mean "the chain rule applied to a computational graph." There is no separate algorithm -- backpropagation is the chain rule plus clever bookkeeping to avoid recomputing shared sub-expressions. If you understand the chain rule, you understand the mathematical core of deep learning training.

!!! action "What to Do"
    - [ ] :movie_camera: Watch 3Blue1Brown's "Backpropagation, what is it really doing?" (14 min) for the connection between chain rule and neural network training
    - [ ] :blue_book: Read MML book Section 5.4 on the chain rule and computational graphs
    - [ ] :computer: Build a simple 2-layer function in Python, compute its gradient by hand using the chain rule, then verify with PyTorch's `autograd`

**Resources:**

- :movie_camera: [3Blue1Brown: Backpropagation](https://www.youtube.com/watch?v=Ilg3gGewQ5U) -- Definitive visual explanation of backprop as the chain rule (Free)
- :blue_book: [MML Book Ch. 5.4: Chain Rule](https://mml-book.github.io/book/mml-book.pdf) -- Formal treatment with computational graph diagrams (Free PDF)
- :movie_camera: [StatQuest: Backpropagation](https://www.youtube.com/watch?v=IN2XmBhILt4) -- Step-by-step numerical walkthrough (Free)
- :dart: [DeepLearning.AI: Calculus for ML](https://www.coursera.org/learn/machine-learning-calculus) -- Chain rule module with neural network examples (Free to audit)

---

## Gradient Descent

*:timer: ~1.5 hours*

Gradient descent is THE algorithm for training ML models. The idea is simple: compute the gradient of the loss, then take a small step in the opposite direction. Repeat until the loss stops decreasing.

The update rule:

$$\theta_{t+1} = \theta_t - \alpha \nabla_\theta J(\theta_t)$$

where \(\theta\) represents all model parameters, \(\alpha\) is the **learning rate** (step size), and \(\nabla_\theta J\) is the gradient of the loss function.

**Concrete walkthrough:** Suppose you have a single weight \(w\) and loss \(J(w) = (w - 3)^2\). The gradient is \(\frac{dJ}{dw} = 2(w - 3)\). Starting at \(w_0 = 0\) with learning rate \(\alpha = 0.1\):

| Step | \(w_t\) | \(\nabla J\) | Update | \(w_{t+1}\) |
|------|---------|------------|--------|-------------|
| 0 | 0.0 | -6.0 | \(0 - 0.1 \times (-6)\) | 0.6 |
| 1 | 0.6 | -4.8 | \(0.6 - 0.1 \times (-4.8)\) | 1.08 |
| 2 | 1.08 | -3.84 | \(1.08 - 0.1 \times (-3.84)\) | 1.464 |
| ... | ... | ... | ... | ... |
| 20 | ~2.99 | ~-0.02 | ... | ~2.99 |

The weight converges toward \(w = 3\), where the loss is minimized. Each step reduces the gradient magnitude, so the steps get smaller as you approach the optimum.

**Variants that matter in practice:**

- **Stochastic Gradient Descent (SGD):** Compute the gradient on a random subset (mini-batch) instead of the full dataset. Faster per step, noisier gradient, but works surprisingly well.
- **Adam:** Adapts the learning rate per-parameter using momentum and gradient history. The default optimizer for most deep learning -- it usually "just works."
- **Learning rate scheduling:** Start with a larger learning rate and decrease over time, allowing fast initial progress and fine-grained convergence later.

!!! tip "Why This Path"
    Andrew Ng's ML courses center heavily on gradient descent -- he builds the concept from a single variable all the way to training neural networks. You do not need a full calculus course to understand ML. You need derivatives, the chain rule, and gradient descent. That covers roughly 80% of the calculus used in ML practice. The remaining 20% (Hessians, constrained optimization) can be learned when you encounter it in specific algorithms.

!!! tip "Teaching Moment"
    The learning rate \(\alpha\) is the most important hyperparameter in gradient descent. Too large and the updates overshoot the minimum, causing the loss to diverge. Too small and training takes forever. Finding a good learning rate is often the first thing practitioners tune. Learning rate schedulers (like cosine annealing or warm-up) automate this adjustment.

!!! action "What to Do"
    - [ ] :movie_camera: Watch StatQuest's "Gradient Descent, Step-by-Step" (10 min) for a clear numerical walkthrough
    - [ ] :movie_camera: Watch 3Blue1Brown's "Gradient descent, how neural networks learn" (21 min) for the big picture
    - [ ] :blue_book: Read Google's ML Crash Course module on gradient descent for practical intuition
    - [ ] :computer: Implement gradient descent from scratch in Python for linear regression: initialize weights, compute gradient, update, repeat, and plot the loss curve

**Resources:**

- :movie_camera: [StatQuest: Gradient Descent](https://www.youtube.com/watch?v=sDv4f4s2SB8) -- The clearest step-by-step walkthrough of gradient descent (Free)
- :movie_camera: [3Blue1Brown: Gradient Descent](https://www.youtube.com/watch?v=IHZwWFHWa-w) -- How neural networks learn through gradient descent (Free)
- :dart: [Google ML Crash Course: Gradient Descent](https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent) -- Practical interactive module with visualizations (Free)
- :blue_book: [MML Book Ch. 7: Optimization](https://mml-book.github.io/book/mml-book.pdf) -- Gradient descent variants and convergence analysis (Free PDF)
- :dart: [DeepLearning.AI: Calculus for ML](https://www.coursera.org/learn/machine-learning-calculus) -- Full gradient descent module with exercises (Free to audit)

---

## Optimization Landscape

*:timer: ~1 hour*

The loss function of an ML model defines a surface (or hypersurface in high dimensions) called the **optimization landscape**. Gradient descent navigates this landscape, and understanding its shape helps you understand why training sometimes fails or gets stuck.

**Key features of the landscape:**

- **Global minimum:** The lowest point on the entire surface -- the best possible parameters. For convex functions (like linear regression loss), there is exactly one minimum and gradient descent will find it.
- **Local minima:** Low points that are not the global minimum. Non-convex functions (like neural network losses) have many local minima. Gradient descent can get trapped in one.
- **Saddle points:** Points where the gradient is zero but the point is neither a maximum nor a minimum -- it goes up in some directions and down in others. In high dimensions, saddle points are far more common than local minima and are the main obstacle for optimization.

**Convexity** is the key property. A function is convex if any line segment between two points on the function lies above the function. Convex functions have a single global minimum and gradient descent is guaranteed to find it. Linear regression and logistic regression have convex loss functions. Neural networks do not.

In practice, modern deep learning works despite non-convexity because: (1) SGD noise helps escape shallow local minima, (2) most local minima in high-dimensional networks have similar loss values, and (3) Adam and learning rate scheduling navigate the landscape effectively.

!!! tip "Teaching Moment"
    A common misconception is that local minima are the main problem in training neural networks. Research has shown that in high-dimensional spaces, true local minima are rare -- saddle points are far more common and problematic. Algorithms like Adam handle saddle points well by using momentum to push through flat regions.

!!! action "What to Do"
    - [ ] :movie_camera: Watch a visualization of loss landscapes for neural networks (search "loss landscape visualization") to see what these surfaces actually look like
    - [ ] :blue_book: Read the Google ML Crash Course section on learning rate and convergence
    - [ ] :computer: Plot the loss surface of a simple 2-parameter model, run gradient descent with different learning rates, and visualize the optimization path on the surface

**Resources:**

- :movie_camera: [3Blue1Brown: Neural Network Learning](https://www.youtube.com/watch?v=IHZwWFHWa-w) -- Visualizes gradient descent on loss surfaces (Free)
- :dart: [Google ML Crash Course: Learning Rate](https://developers.google.com/machine-learning/crash-course/linear-regression/hyperparameters) -- Interactive exploration of learning rate effects (Free)
- :blue_book: [MML Book Ch. 7: Optimization](https://mml-book.github.io/book/mml-book.pdf) -- Convexity, convergence guarantees, and practical optimization (Free PDF)
- :movie_camera: [StatQuest: Adam Optimizer](https://www.youtube.com/watch?v=MD2fYip6QUQ) -- How Adam handles the optimization landscape better than vanilla SGD (Free)

---

## Multivariable Calculus Intuition

*:timer: ~45 minutes*

This section is supplementary -- the concepts here appear in advanced optimization methods but are not required for understanding most ML algorithms.

The **Jacobian** matrix generalizes the gradient to vector-valued functions. If \(f: \mathbb{R}^n \to \mathbb{R}^m\), the Jacobian is an \(m \times n\) matrix of all partial derivatives:

$$J = \begin{bmatrix} \frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_n} \end{bmatrix}$$

The Jacobian appears in backpropagation when a layer maps vectors to vectors (not just to scalars).

The **Hessian** is the matrix of second derivatives -- it tells you about the curvature of the loss surface. Where the gradient says "which direction is downhill," the Hessian says "how steep is it, and is it curving up or down?"

$$H = \begin{bmatrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} \\ \frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} \end{bmatrix}$$

Second-order optimization methods (like Newton's method) use the Hessian to take smarter steps, but computing the full Hessian is prohibitively expensive for large models. Approximations like L-BFGS are used when they are feasible.

!!! tip "Teaching Moment"
    You will rarely compute Jacobians or Hessians by hand in ML practice. But knowing they exist helps you understand why some optimizers converge faster (they use curvature information) and why training large models is computationally expensive (even approximating curvature is costly). Think of this as vocabulary for reading papers, not skills for daily practice.

!!! action "What to Do"
    - [ ] :blue_book: Read MML book Section 5.3 on Jacobians and Section 5.4 on Hessians for formal definitions
    - [ ] :movie_camera: Watch Khan Academy's "Hessian matrix" video for visual intuition on second derivatives and curvature
    - [ ] :computer: Compute the Jacobian of a simple function using `sympy.Matrix.jacobian()` and verify numerically

**Resources:**

- :blue_book: [MML Book Ch. 5.3-5.4: Jacobians and Hessians](https://mml-book.github.io/book/mml-book.pdf) -- ML-relevant treatment of higher-order derivatives (Free PDF)
- :books: [Khan Academy: Hessian Matrix](https://www.khanacademy.org/math/multivariable-calculus/applications-of-multivariable-derivatives/second-partial-derivative-test) -- Visual explanation of second derivative tests and curvature (Free)
- :dart: [DeepLearning.AI: Calculus for ML](https://www.coursera.org/learn/machine-learning-calculus) -- Advanced optimization module covering second-order methods (Free to audit)

---

## Key Takeaways

- **Derivatives measure sensitivity**: the derivative of the loss with respect to a parameter tells you how much that parameter affects the loss -- this is the foundation of all gradient-based training
- **The gradient points uphill**: to minimize a loss function, move in the opposite direction of the gradient -- this is gradient descent, the algorithm that trains virtually every ML model
- **The chain rule IS backpropagation**: computing gradients through a neural network is just the chain rule applied to composed functions -- there is no separate "backprop algorithm"
- **Gradient descent is simple but powerful**: the update rule \(\theta_{t+1} = \theta_t - \alpha \nabla J\) is all you need -- the art is in choosing the learning rate and variant (SGD, Adam)
- **You need less calculus than you think**: derivatives, partial derivatives, the chain rule, and gradient descent cover the vast majority of calculus used in ML practice

---

**Next up:** [Probability & Statistics](probability-statistics.md) -- distributions, Bayes' theorem, and the mathematical framework for reasoning under uncertainty
