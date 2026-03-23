# Neural Network Fundamentals

!!! prerequisite "Before You Start"
    Complete [Linear Algebra](../math-foundations/linear-algebra.md),
    [Calculus](../math-foundations/calculus.md), and the
    [Python for ML](../python-ml/index.md) ecosystem section before this page.
    You will need matrix operations, derivatives, and Python fluency.

*Total time: ~8-10 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Understand perceptrons and artificial neurons as the building blocks of neural networks
- Know how feedforward networks stack layers to learn increasingly abstract representations
- Compare activation functions (sigmoid, ReLU, and variants) and know when to use each
- Understand backpropagation via chain rule intuition -- how the network learns from errors
- Apply regularization techniques (dropout, batch norm, early stopping) to prevent overfitting

---

## The Perceptron and Artificial Neurons

*⏱ ~1 hour*

The perceptron is the simplest neural network -- a single neuron that takes weighted inputs, sums them, and passes the result through an activation function to produce an output. Invented by Frank Rosenblatt in 1958, it was inspired by a simplified model of biological neurons: inputs arrive along connections of varying strength (weights), combine at the cell body, and fire if the total exceeds a threshold.

Mathematically, a perceptron computes:

$$y = f\left(\sum_{i=1}^{n} w_i x_i + b\right) = f(\mathbf{w}^T \mathbf{x} + b)$$

where \(\mathbf{x}\) is the input vector, \(\mathbf{w}\) is the weight vector, \(b\) is the bias term, and \(f\) is the activation function. The bias shifts the decision boundary away from the origin, allowing the neuron to represent patterns that do not pass through zero.

A single perceptron with a step-function activation is a **linear classifier** -- it can separate data points that lie on different sides of a hyperplane. This works for linearly separable problems like AND and OR gates, but famously fails on the XOR problem. Minsky and Papert proved this limitation in 1969, temporarily halting neural network research for over a decade. The solution, discovered later, was stacking neurons into multiple layers -- the topic of the next section.

The perceptron learning rule updates weights based on the error between predicted and actual output: \(w_i \leftarrow w_i + \eta (y - \hat{y}) x_i\), where \(\eta\) is the learning rate. For linearly separable data, this rule is guaranteed to converge. The simplicity of this update rule makes the perceptron an excellent starting point for understanding how all neural networks learn -- the core idea (adjust weights to reduce error) scales from a single neuron to networks with billions of parameters.

!!! tip "Teaching Moment"
    The XOR problem is not just a historical footnote. It demonstrates the fundamental reason neural networks need multiple layers: a single neuron can only draw one straight line through the data. XOR requires at least two lines (one to separate each class region), which means at least one hidden layer. This is the simplest example of why **depth matters** in neural networks.

!!! action "What to Do"
    - [ ] :clapper: Watch 3Blue1Brown's "But what is a neural network?" (19 min) for the best visual intuition on neurons and weights
    - [ ] :book: Read Deep Learning book Chapter 6.1 on feedforward networks for mathematical rigor
    - [ ] :computer: Implement a single perceptron in Python (just NumPy) that learns the AND gate -- initialize random weights, train with the perceptron learning rule, verify it converges

**Resources:**

- :clapper: [3Blue1Brown: But what is a neural network?](https://www.youtube.com/watch?v=aircAruvnKk) -- The best visual introduction to neurons, layers, and weights; sets up the entire series (Free)
- :book: [Deep Learning Book Ch. 6: Deep Feedforward Networks](https://www.deeplearningbook.org/contents/mlp.html) -- Rigorous mathematical treatment of neurons and networks (Free)
- :clapper: [StatQuest: Neural Networks](https://statquest.org/neural-networks-part-1-inside-the-black-box/) -- Step-by-step visual walkthrough of neurons and layers (Free)
- :dart: [Andrew Ng DL Specialization, Course 1](https://www.coursera.org/learn/neural-networks-deep-learning) -- Full video lectures on neural network foundations (Free to audit)

---

## Feedforward Networks and Layers

*⏱ ~1.5 hours*

A feedforward network stacks multiple layers of neurons, where each layer's output becomes the next layer's input. The simplest architecture has three parts: an **input layer** (your features), one or more **hidden layers** (where the network learns internal representations), and an **output layer** (the prediction). Information flows in one direction -- forward from input to output -- hence the name "feedforward."

The power of hidden layers comes from **representation learning**. The first hidden layer might learn to detect simple patterns (edges in images, word frequencies in text). Deeper layers combine these simple patterns into increasingly abstract concepts (shapes, then objects, then scenes). This hierarchical feature extraction is what makes deep networks so effective -- they automatically learn the features that traditional ML requires you to engineer by hand.

The **Universal Approximation Theorem** states that a feedforward network with a single hidden layer containing enough neurons can approximate any continuous function to arbitrary precision. This sounds like one layer should be enough, but the catch is "enough neurons" -- in practice, that number can be astronomically large. Deeper networks with fewer neurons per layer are exponentially more efficient at representing complex functions than wide, shallow networks. This is why modern networks are "deep" (many layers) rather than "wide" (one huge layer).

The **width vs. depth tradeoff** is a practical design decision. Wider layers (more neurons per layer) increase the network's capacity to memorize but add parameters linearly. Deeper networks (more layers) enable hierarchical feature learning but are harder to train due to vanishing gradients (covered in the backpropagation section). Modern architectures balance both, often using techniques like residual connections to enable very deep networks.

A common notation: a network with layer sizes [784, 256, 128, 10] has 784 input neurons, two hidden layers of 256 and 128 neurons, and 10 output neurons. The total number of trainable parameters is (784 x 256 + 256) + (256 x 128 + 128) + (128 x 10 + 10) = 234,634. Each connection has a weight, and each neuron (except input) has a bias. Even this modest network has over 200,000 parameters -- modern networks have millions to billions.

**Weight initialization** matters more than most beginners realize. If all weights start at zero, every neuron computes the same thing and the network cannot learn. If weights start too large, activations saturate and gradients vanish. The standard approaches are **Xavier/Glorot initialization** (for sigmoid/tanh) and **He initialization** (for ReLU), both of which set the initial weight scale based on the layer dimensions to keep activations and gradients in a reasonable range. PyTorch and TensorFlow use sensible defaults, but understanding why initialization matters helps diagnose training failures.

The output layer design depends on the task:

| Task | Output Neurons | Activation | Loss Function |
|------|---------------|-----------|---------------|
| Binary classification | 1 | Sigmoid | Binary cross-entropy |
| Multi-class (C classes) | C | Softmax | Categorical cross-entropy |
| Regression | 1 | None (linear) | Mean squared error |
| Multi-label | C | Sigmoid (per class) | Binary cross-entropy (per class) |

Matching the output layer to the loss function is critical. Using the wrong combination (e.g., softmax with MSE) will produce poor results even if the rest of the architecture is correct.

!!! tip "Teaching Moment"
    Think of a feedforward network as an assembly line. Each layer takes the previous layer's output, transforms it, and passes it forward. Raw pixels enter the first layer; by the time they reach the output, the network has built up from edges to textures to object parts to full objects. You never tell the network what these intermediate representations should be -- it discovers them during training. This is fundamentally different from traditional ML, where you design features by hand.

!!! action "What to Do"
    - [ ] :clapper: Watch 3Blue1Brown's "Gradient descent, how neural networks learn" (21 min) for visualization of how layers transform data
    - [ ] :book: Read d2l.ai Section 5.1 on layers and blocks for a code-first understanding
    - [ ] :computer: Build a 2-layer network in PyTorch that classifies the Iris dataset -- experiment with different hidden layer sizes (8, 32, 128) and observe the effect on training loss:

    ```python
    import torch
    import torch.nn as nn

    model = nn.Sequential(
        nn.Linear(4, 8),    # input features -> hidden layer
        nn.ReLU(),           # activation function
        nn.Linear(8, 3)      # hidden -> output classes
    )
    output = model(torch.randn(1, 4))  # forward pass
    ```

**Resources:**

- :clapper: [3Blue1Brown: Gradient descent, how neural networks learn](https://www.youtube.com/watch?v=IHZwWFHWa-w) -- Visual explanation of how networks adjust weights layer by layer (Free)
- :open_book: [d2l.ai Ch. 5: Deep Learning Computation](https://d2l.ai/chapter_deep-learning-computation/) -- Interactive code-first approach to layers and blocks in PyTorch and TensorFlow (Free)
- :book: [Deep Learning Book Ch. 6.4: Architecture Design](https://www.deeplearningbook.org/contents/mlp.html) -- Theoretical guidance on depth, width, and network design (Free)
- :dart: [Andrew Ng DL Specialization, Course 1 Week 3](https://www.coursera.org/learn/neural-networks-deep-learning) -- Shallow vs deep networks with practical intuition (Free to audit)

---

## Activation Functions

*⏱ ~1 hour*

Activation functions introduce **nonlinearity** into the network. Without them, stacking multiple linear layers would collapse into a single linear transformation -- no matter how many layers you add, the network could only learn linear relationships. The activation function applied after each layer is what gives neural networks their power to model complex, nonlinear patterns.

The **sigmoid** function was the original choice, squashing any input into the range (0, 1):

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

Sigmoid is intuitive (outputs look like probabilities) but has a critical flaw: for very large or very small inputs, the gradient is nearly zero. This **saturation** causes gradients to vanish during backpropagation, making deep networks extremely difficult to train.

The **ReLU** (Rectified Linear Unit) solved the saturation problem with a deceptively simple formula:

$$\text{ReLU}(z) = \max(0, z)$$

ReLU does not saturate for positive inputs, computes instantly, and produces sparse activations (many neurons output zero). These properties make it the default activation in modern networks. However, ReLU has its own problem: neurons that receive only negative inputs during training produce zero gradients and stop learning entirely. This is the **dying ReLU** problem.

**Leaky ReLU** addresses the dying neuron issue by allowing a small gradient for negative inputs: \(\text{LeakyReLU}(z) = \max(\alpha z, z)\) where \(\alpha\) is typically 0.01. Variants like **ELU** and **GELU** offer smoother alternatives, with GELU becoming popular in Transformer architectures.

The **tanh** function is a scaled sigmoid that outputs values in the range (-1, 1):

$$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$$

Tanh is zero-centered (unlike sigmoid), which can help with optimization. It was the default before ReLU but still suffers from saturation at extreme values. You will encounter tanh in LSTM and GRU gates, where its bounded output range is useful.

For output layers, the choice depends on the task: sigmoid for binary classification, softmax for multi-class, and no activation (linear) for regression. The softmax function converts a vector of scores into a probability distribution: \(\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}\). This is used in the final layer of classification networks to produce class probabilities that sum to 1.

!!! tip "Why This Path"
    Every deep learning course and textbook -- Andrew Ng, fast.ai, CS231n -- spends significant time on activation functions because choosing the wrong one is a common beginner mistake. Using sigmoid in hidden layers of a deep network will cause vanishing gradients and training failure. The rule of thumb is simple: **ReLU (or a variant) for hidden layers, task-specific activation for the output layer.** Knowing why this rule exists matters more than memorizing formulas.

!!! action "What to Do"
    - [ ] :clapper: Watch StatQuest's "ReLU, Sigmoid, and Tanh" (7 min) for visual comparison of activation functions
    - [ ] :book: Read d2l.ai Section 5.1.2 on activation functions for interactive code examples
    - [ ] :computer: Plot sigmoid, tanh, ReLU, and Leaky ReLU side by side in Python -- observe where each function saturates (gradient near zero) and where it remains active:

    ```python
    import torch

    x = torch.linspace(-3, 3, 100)
    sigmoid = torch.sigmoid(x)
    relu = torch.relu(x)
    # sigmoid saturates at 0 and 1; ReLU is linear for x > 0
    ```

**Resources:**

- :clapper: [StatQuest: ReLU, Sigmoid, and Tanh](https://statquest.org/) -- Quick visual comparison of the most common activations (Free)
- :open_book: [d2l.ai Section 5.1: Activation Functions](https://d2l.ai/chapter_multilayer-perceptrons/mlp.html) -- Interactive code examples plotting each function and its derivative (Free)
- :book: [Deep Learning Book Ch. 6.3: Hidden Units](https://www.deeplearningbook.org/contents/mlp.html) -- Mathematical treatment of activation function properties (Free)
- :clapper: [3Blue1Brown: Neural Networks series](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) -- Activation functions in context of the full network (Free)

---

## Backpropagation and Training

*⏱ ~2 hours*

Backpropagation is how neural networks learn. The core idea is simple: **how much does each weight affect the final loss?** If you know the answer, you can adjust each weight to reduce the error. Backpropagation computes these sensitivities efficiently using the chain rule of calculus, propagating error information backward from the output to the input.

**The forward pass** computes the network's prediction by passing inputs through each layer sequentially. The prediction is compared to the true label using a **loss function**. For regression, the standard choice is **mean squared error (MSE)**:

$$\mathcal{L}_{\text{MSE}} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

For classification, **cross-entropy loss** is standard because it heavily penalizes confident wrong predictions:

$$\mathcal{L}_{\text{CE}} = -\sum_{i=1}^{C} y_i \log(\hat{y}_i)$$

**The backward pass** applies the chain rule to compute the gradient of the loss with respect to every weight in the network. The key intuition: if you change a weight in an early layer, it changes that layer's output, which changes the next layer's input, which changes the next layer's output, and so on until the final loss changes. The chain rule tracks this cascade of effects:

$$\frac{\partial \mathcal{L}}{\partial w} = \frac{\partial \mathcal{L}}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial h} \cdot \frac{\partial h}{\partial w}$$

Once you have gradients, **gradient descent** updates each weight in the direction that reduces the loss:

$$w \leftarrow w - \eta \frac{\partial \mathcal{L}}{\partial w}$$

where \(\eta\) is the **learning rate** -- the step size for each update. Too large and the network overshoots; too small and training takes forever. **Stochastic gradient descent (SGD)** computes gradients on random mini-batches rather than the full dataset, trading noise for speed. **Adam** (Adaptive Moment Estimation) is the most popular modern optimizer -- it adapts the learning rate per-parameter and includes momentum, making it robust to hyperparameter choices.

**Mini-batch training** is the standard practice: split the training data into small batches (32, 64, 128 examples), compute gradients on each batch, and update weights after each batch. One pass through the entire dataset is called an **epoch**. Training typically runs for tens to hundreds of epochs, monitoring loss on a held-out validation set to detect overfitting.

The choice of batch size affects training dynamics. Smaller batches (32-64) introduce more noise into gradient estimates, which can help escape local minima and improve generalization. Larger batches (256-1024) produce smoother gradients and train faster on GPUs but may converge to sharper minima that generalize worse. A batch size of 32-128 is a common starting point.

**Loss landscape intuition:** the loss function defines a surface over the weight space, and training is a walk across this surface seeking low points. SGD with momentum (and Adam) navigate this landscape more effectively than plain gradient descent by maintaining velocity that carries through flat regions and dampens oscillations in steep ravines. The learning rate controls the step size, and getting it right is often the difference between a model that converges in hours and one that fails to learn at all.

**Optimizer comparison** for practical use:

| Optimizer | Strengths | When to Use |
|-----------|-----------|-------------|
| SGD + Momentum | Best final performance, well-understood | Production models, when you can tune learning rate carefully |
| Adam | Fast convergence, adaptive, robust | Default starting choice, most experiments |
| AdamW | Adam + proper weight decay | Current best practice for most tasks |
| RMSProp | Adaptive learning rates | RNNs and situations where Adam is unstable |

Most practitioners start with **AdamW** (lr=1e-3 to 3e-4) and only switch to SGD with momentum for final performance tuning when the extra effort is justified. The combination of AdamW with cosine learning rate scheduling is the current standard recipe for training neural networks.

In modern frameworks like PyTorch and TensorFlow, backpropagation is handled automatically by the **autograd** system. You define the forward pass (the computation), and the framework builds a computation graph that tracks all operations. Calling `.backward()` traverses this graph in reverse, computing all gradients automatically. This means you never implement backpropagation by hand in practice -- but understanding what the framework is doing under the hood is essential for debugging training issues.

A common training pattern is to track both **training loss** and **validation loss** across epochs. When training loss decreases but validation loss increases, the model is overfitting -- it has memorized the training data rather than learning generalizable patterns. This divergence is the signal to apply regularization techniques (covered in the next section) or stop training early.

!!! tip "Teaching Moment"
    Backpropagation is not magic -- it is the chain rule applied systematically. The question it answers is: "If I wiggle this weight slightly, how much does the loss wiggle?" The chain rule lets you answer this question for every weight simultaneously in a single backward pass through the network. This is what makes neural networks trainable despite having millions of parameters. The full visual derivation by 3Blue1Brown is the single best resource for building this intuition.

!!! action "What to Do"
    - [ ] :clapper: Watch 3Blue1Brown's "What is backpropagation really doing?" (14 min) and "Backpropagation calculus" (10 min) for the definitive visual explanation
    - [ ] :book: Read Deep Learning book Chapter 6.5 on backpropagation for the mathematical details
    - [ ] :computer: Train a simple neural network in PyTorch on MNIST and observe the loss decrease over epochs -- focus on understanding the forward-backward-update loop:

    ```python
    import torch
    import torch.nn as nn

    # Simple training step
    model = nn.Sequential(nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 10))
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    loss_fn = nn.CrossEntropyLoss()

    # One training step
    X_batch = torch.randn(32, 784)   # mini-batch of 32 images
    y_batch = torch.randint(0, 10, (32,))  # labels
    output = model(X_batch)            # forward pass
    loss = loss_fn(output, y_batch)    # compute loss
    loss.backward()                    # backward pass (compute gradients)
    optimizer.step()                   # update weights
    optimizer.zero_grad()              # reset gradients for next step
    ```

    - [ ] :open_book: Read the d2l.ai backpropagation section interactively and trace the gradient flow for a 2-layer network by hand

**Resources:**

- :clapper: [3Blue1Brown: What is backpropagation really doing?](https://www.youtube.com/watch?v=Ilg3gGewQ5U) -- The definitive visual explanation of backpropagation; watch this before reading any textbook (Free)
- :clapper: [3Blue1Brown: Backpropagation calculus](https://www.youtube.com/watch?v=tIeHLnjs5U8) -- The mathematical details with visual derivation (Free)
- :book: [Deep Learning Book Ch. 6.5: Back-Propagation](https://www.deeplearningbook.org/contents/mlp.html) -- Full mathematical treatment for reference (Free)
- :open_book: [d2l.ai Section 5.3: Forward and Backward Propagation](https://d2l.ai/chapter_multilayer-perceptrons/backprop.html) -- Interactive code tracing gradient flow (Free)
- :dart: [Andrew Ng DL Specialization, Course 1 Week 2-3](https://www.coursera.org/learn/neural-networks-deep-learning) -- Lectures building up from logistic regression to full backprop (Free to audit)

---

## Regularization and Practical Training

*⏱ ~1.5 hours*

Deep networks have millions of parameters and will happily memorize the training data if left unchecked. **Regularization** is any technique that constrains the network to prevent overfitting -- encouraging it to learn general patterns rather than noise specific to the training set.

**Dropout** is the most widely used regularization technique in deep learning. During training, it randomly sets a fraction of neuron outputs to zero (typically 50% for hidden layers, 20% for input layers). This forces the network to be redundant -- no single neuron can become a critical bottleneck. At test time, all neurons are active but their outputs are scaled to compensate.

The intuition behind dropout is elegant: by randomly removing neurons during training, you prevent **co-adaptation** -- the phenomenon where neurons learn to depend on specific other neurons rather than learning generally useful features. Dropout effectively trains an ensemble of \(2^n\) different sub-networks (where \(n\) is the number of neurons) that share weights, producing a model that is more robust than any single network. The original dropout paper by Srivastava et al. (2014) showed consistent improvements across vision, speech, and text tasks.

**Batch normalization** normalizes the inputs to each layer by subtracting the mean and dividing by the standard deviation of the current mini-batch. This stabilizes training by preventing internal covariate shift -- the phenomenon where the distribution of inputs to each layer changes as earlier layers update their weights. Batch norm also acts as a mild regularizer and allows higher learning rates, significantly speeding up training.

**Weight decay** (L2 regularization) adds a penalty proportional to the square of the weights to the loss function: \(\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{data}} + \lambda \sum w_i^2\). This encourages smaller weights, producing smoother decision boundaries. The hyperparameter \(\lambda\) controls the strength of regularization.

**Early stopping** monitors validation loss during training and stops when it begins to increase, even if training loss is still decreasing. The gap between training and validation loss is the signature of overfitting -- early stopping catches it before it becomes severe. In practice, you save the model weights at the best validation score and restore them at the end. A **patience** parameter controls how many epochs of degrading validation loss you tolerate before stopping -- typical values are 5-10 epochs.

**Gradient clipping** prevents training instability by capping the gradient magnitude when it exceeds a threshold. While not strictly a regularization technique (it does not constrain the model), it is essential for training deep networks and especially RNNs where exploding gradients are common. A typical threshold is 1.0 or 5.0 for the gradient norm.

**Learning rate scheduling** adjusts the learning rate during training. Common strategies include step decay (reduce by a factor every N epochs), cosine annealing (smooth oscillation), and warm-up (start small, increase, then decay). The learning rate is often the single most important hyperparameter -- getting it right matters more than most architectural choices.

**Data augmentation** artificially increases training set diversity by applying random transformations (for images: flips, rotations, crops; for text: synonym replacement, back-translation). This is technically not regularization in the mathematical sense, but it serves the same purpose -- preventing the model from memorizing specific training examples by showing it variations.

In practice, these techniques stack: a well-trained deep network typically uses batch normalization in every layer, dropout in fully connected layers (0.2-0.5), weight decay in the optimizer (1e-4 to 1e-2), early stopping based on validation loss, and a learning rate schedule. The order of importance for getting a model to work: (1) correct implementation, (2) appropriate learning rate, (3) batch normalization, (4) sufficient data or augmentation, (5) regularization tuning.

!!! tip "Teaching Moment"
    In practice, the order of techniques to try is: (1) get a basic model training, (2) add batch normalization, (3) tune the learning rate, (4) add dropout if overfitting, (5) try learning rate scheduling, (6) experiment with weight decay. Most practitioners get 90% of the improvement from steps 1-3. Do not spend hours tuning regularization on a model that has not been properly trained with a good learning rate first.

!!! action "What to Do"
    - [ ] :clapper: Watch StatQuest's "Regularization" series (dropout, batch norm) for visual intuition on how each technique works
    - [ ] :book: Read d2l.ai Chapter 5.6 on dropout and Chapter 8.5 on batch normalization for code examples
    - [ ] :computer: Train the same network on MNIST with and without dropout -- compare training vs validation accuracy to see how dropout reduces the gap
    - [ ] :open_book: Read the PyTorch documentation on `torch.optim.lr_scheduler` for learning rate scheduling options

**Resources:**

- :clapper: [StatQuest: Regularization](https://statquest.org/) -- Visual explanation of L1, L2, and dropout regularization (Free)
- :open_book: [d2l.ai Ch. 5.6: Dropout](https://d2l.ai/chapter_multilayer-perceptrons/dropout.html) -- Interactive dropout implementation with training curves (Free)
- :open_book: [d2l.ai Ch. 8.5: Batch Normalization](https://d2l.ai/chapter_convolutional-modern/batch-norm.html) -- Batch norm theory and code (Free)
- :book: [Deep Learning Book Ch. 7: Regularization](https://www.deeplearningbook.org/contents/regularization.html) -- Comprehensive treatment of all regularization methods (Free)
- :dart: [Andrew Ng DL Specialization, Course 2](https://www.coursera.org/learn/deep-neural-network) -- Practical advice on hyperparameter tuning, regularization, and optimization (Free to audit)

---

## Key Takeaways

- **Neurons are weighted sums plus activation**: every neural network, from a single perceptron to GPT, builds on this same basic unit -- inputs multiplied by weights, summed with a bias, passed through a nonlinearity -- the complexity comes from how you connect them
- **Depth enables hierarchical learning**: deeper networks learn increasingly abstract representations, automatically discovering features that traditional ML requires you to engineer by hand
- **ReLU is the default activation**: it solves the vanishing gradient problem of sigmoid/tanh, is computationally simple, and works well in practice -- use it for hidden layers unless you have a specific reason not to
- **Backpropagation = chain rule applied systematically**: it answers "how much does each weight affect the loss?" and is the fundamental algorithm that makes training neural networks with millions of parameters tractable
- **Regularization prevents memorization**: dropout, batch normalization, weight decay, and early stopping work together to ensure the network learns general patterns rather than noise in the training data

---

**Next up:** [Convolutional Neural Networks (CNNs)](cnns.md) -- how to apply these neural network fundamentals to image data, exploiting spatial structure with shared filters and pooling operations
