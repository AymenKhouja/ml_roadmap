# Deep Learning Frameworks

!!! prerequisite "Before You Start"
    Complete [Neural Network Fundamentals](neural-network-fundamentals.md) and at least one architecture
    section ([CNNs](cnns.md) or [RNNs](rnns-sequence-models.md)) before this page. You need to understand
    feedforward networks, backpropagation, and at least one application domain.
    This page is designed to be studied alongside the architecture pages, not necessarily after all of them.

*Total time: ~6-8 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Understand why deep learning frameworks exist (autograd, GPU acceleration, pre-built layers)
- Build and train models in PyTorch using tensors, nn.Module, and DataLoaders
- Build and train models in TensorFlow/Keras using the Sequential and Functional APIs
- Implement a complete training pipeline from data loading to evaluation in both frameworks
- Know the broader deep learning ecosystem (Hugging Face, experiment tracking, Colab)

---

## Why Frameworks Matter

*⏱ ~30 minutes*

Deep learning frameworks handle the three most tedious aspects of neural network development: **automatic differentiation** (computing gradients without manual calculus), **GPU acceleration** (running matrix operations on parallel hardware), and **pre-built components** (layers, optimizers, loss functions, data loaders). Without a framework, implementing backpropagation for a 50-layer network would require thousands of lines of error-prone gradient code. With a framework, it takes one line: `loss.backward()`.

The two dominant frameworks are **PyTorch** (developed by Meta AI) and **TensorFlow** (developed by Google Brain). Both are open-source, well-documented, and capable of implementing any neural network architecture. The choice between them is practical, not fundamental -- the concepts you learn in one transfer directly to the other.

The industry trend clearly favors PyTorch for research (over 80% of papers at major ML conferences use PyTorch) and increasingly for production as well (TorchServe, ONNX export). TensorFlow retains a strong presence in production systems (TensorFlow Serving, TFLite for mobile) and in Google's ecosystem. Many companies use both -- PyTorch for research and prototyping, TensorFlow for deployment.

Both frameworks use **eager execution** by default, meaning operations execute immediately (like normal Python code) rather than building a computation graph first. This makes debugging straightforward -- you can use print statements, breakpoints, and standard Python tools. Earlier versions of TensorFlow used graph mode, which was powerful but notoriously difficult to debug.

!!! tip "Why This Path"
    fast.ai uses PyTorch exclusively; Google's ML courses use TensorFlow/Keras. The industry trend favors PyTorch for research and increasingly for production. We cover both because job postings still list both, but PyTorch is the more versatile choice for newcomers. Content tabs on this page let you see both frameworks side-by-side and choose the one that fits your learning goals. If you must pick one to start with, choose PyTorch.

!!! action "What to Do"
    - [ ] :book: Read the PyTorch "What is PyTorch?" introduction for a 10-minute overview
    - [ ] :book: Read the TensorFlow "Get Started" page for comparison
    - [ ] :computer: Install both frameworks (`pip install torch torchvision` and `pip install tensorflow`) and verify they import correctly
    - [ ] :open_book: If you have a GPU, verify CUDA is available: `torch.cuda.is_available()` / `tf.config.list_physical_devices('GPU')`

**Resources:**

- :book: [PyTorch: What is PyTorch?](https://pytorch.org/tutorials/beginner/blitz/tensor_tutorial.html) -- Official 60-minute introduction to PyTorch tensors and autograd (Free)
- :book: [TensorFlow: Get Started](https://www.tensorflow.org/tutorials/quickstart/beginner) -- Official beginner quickstart for TensorFlow and Keras (Free)
- :clapper: [fast.ai: Practical Deep Learning](https://course.fast.ai/) -- Jeremy Howard's PyTorch-based practical course, top-down approach (Free)
- :open_book: [d2l.ai: Introduction](https://d2l.ai/) -- Interactive textbook covering both frameworks side-by-side (Free)

---

## PyTorch Fundamentals

*⏱ ~2 hours*

PyTorch's design philosophy is "Python first" -- it feels like writing normal Python with numpy-like tensors that happen to support automatic differentiation and GPU acceleration. This makes PyTorch intuitive for anyone comfortable with Python and NumPy.

**Tensors** are PyTorch's fundamental data structure -- multi-dimensional arrays that can live on CPU or GPU. They support the same operations as NumPy arrays (indexing, slicing, broadcasting, linear algebra) but add GPU acceleration and automatic gradient tracking:

```python
import torch

# Create tensors
x = torch.tensor([1.0, 2.0, 3.0])
W = torch.randn(3, 2)           # random 3x2 matrix
y = x @ W                        # matrix multiplication

# Move to GPU (if available)
if torch.cuda.is_available():
    x_gpu = x.cuda()
```

**Autograd** is PyTorch's automatic differentiation engine. When you set `requires_grad=True` on a tensor, PyTorch records all operations performed on it, building a computation graph. Calling `.backward()` traverses this graph in reverse to compute gradients:

```python
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 3 * x + 1           # y = x^2 + 3x + 1
y.backward()                      # compute dy/dx
print(x.grad)                     # tensor([7.]) -- dy/dx = 2x + 3 = 7
```

**nn.Module** is the base class for all neural network components. You define layers in `__init__` and the forward pass in `forward`. PyTorch automatically handles the backward pass through autograd:

```python
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.relu(self.layer1(x))
        return self.layer2(x)
```

**DataLoader** handles batching, shuffling, and parallel data loading. It wraps a Dataset object and provides an iterator that yields mini-batches:

```python
from torch.utils.data import DataLoader, TensorDataset

dataset = TensorDataset(X_train, y_train)
loader = DataLoader(dataset, batch_size=32, shuffle=True)
```

The **PyTorch training loop** is explicit -- you write every step yourself. This is verbose but gives you complete control and makes debugging straightforward:

```python
model = SimpleNet(784, 128, 10)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(10):
    for X_batch, y_batch in loader:
        output = model(X_batch)       # forward pass
        loss = loss_fn(output, y_batch)  # compute loss
        optimizer.zero_grad()          # clear previous gradients
        loss.backward()                # backward pass
        optimizer.step()               # update weights
```

!!! tip "Teaching Moment"
    The explicit training loop is PyTorch's defining feature. Unlike Keras's `model.fit()`, you see every step: forward pass, loss computation, gradient zeroing, backward pass, weight update. This transparency is why PyTorch is preferred for research -- when you need to modify the training process (custom loss functions, gradient accumulation, mixed precision), the explicit loop makes it straightforward. Learn the explicit loop first; use higher-level wrappers (Lightning) later once you understand what they abstract away.

!!! action "What to Do"
    - [ ] :clapper: Watch the official PyTorch beginner tutorial series for hands-on fundamentals
    - [ ] :book: Read d2l.ai Chapter 3 using the PyTorch tab for linear regression in PyTorch
    - [ ] :computer: Build a simple 2-layer network in PyTorch, train it on MNIST, and print loss per epoch
    - [ ] :open_book: Experiment with `model.parameters()` to inspect learned weights after training

**Resources:**

- :computer: [PyTorch: 60 Minute Blitz](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) -- Official quickstart tutorial covering tensors, autograd, and neural networks (Free)
- :open_book: [d2l.ai: Linear Regression in PyTorch](https://d2l.ai/chapter_linear-neural-networks/linear-regression-concise.html) -- Interactive PyTorch code for basic models (Free)
- :book: [PyTorch Documentation](https://pytorch.org/docs/stable/) -- Comprehensive API reference (Free)
- :dart: [fast.ai Practical Deep Learning](https://course.fast.ai/) -- Full course built on PyTorch with practical focus (Free)
- :clapper: [Andrej Karpathy: Neural Networks: Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) -- Build neural networks from scratch in PyTorch (Free)

---

## TensorFlow/Keras Fundamentals

*⏱ ~2 hours*

TensorFlow's Keras API provides a higher-level interface that prioritizes simplicity and rapid prototyping. The `model.compile() -> model.fit() -> model.evaluate()` pattern lets you train models with minimal code, making it excellent for beginners and production workflows.

**tf.Tensor** is TensorFlow's fundamental data type. Like PyTorch tensors, they support GPU acceleration and automatic differentiation. TensorFlow 2.x uses eager execution by default, so operations execute immediately:

```python
import tensorflow as tf

x = tf.constant([1.0, 2.0, 3.0])
W = tf.random.normal([3, 2])
y = tf.matmul(tf.expand_dims(x, 0), W)  # matrix multiplication
```

The **Keras Sequential API** is the simplest way to build a model -- stack layers in order:

```python
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])
```

The **Keras Functional API** handles more complex architectures (multiple inputs, skip connections, shared layers):

```python
inputs = keras.Input(shape=(784,))
x = keras.layers.Dense(128, activation='relu')(inputs)
x = keras.layers.Dropout(0.2)(x)
outputs = keras.layers.Dense(10, activation='softmax')(x)
model = keras.Model(inputs=inputs, outputs=outputs)
```

The **compile/fit/evaluate** pattern is Keras's signature workflow:

```python
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(X_train, y_train,
                    epochs=10,
                    batch_size=32,
                    validation_split=0.2)

test_loss, test_acc = model.evaluate(X_test, y_test)
```

**tf.data** provides a high-performance data pipeline for loading and preprocessing data. It handles batching, shuffling, prefetching, and parallel processing:

```python
dataset = tf.data.Dataset.from_tensor_slices((X_train, y_train))
dataset = dataset.shuffle(1000).batch(32).prefetch(tf.data.AUTOTUNE)
```

**SavedModel** is TensorFlow's standard format for saving and deploying models. It captures the complete model (architecture, weights, and optimizer state) in a portable format that works with TensorFlow Serving, TFLite, and TensorFlow.js:

```python
model.save('my_model')                    # save
loaded_model = keras.models.load_model('my_model')  # load
```

!!! tip "Teaching Moment"
    The `model.fit()` pattern hides the training loop behind a single function call. This is great for productivity but can feel like a black box. Under the hood, Keras is doing the same forward-backward-update loop as PyTorch's explicit code. If you need custom training behavior in TensorFlow, use `tf.GradientTape` for an explicit training loop that mirrors PyTorch's approach. Learning both the high-level and low-level APIs gives you flexibility.

!!! action "What to Do"
    - [ ] :clapper: Watch the official TensorFlow beginner tutorial for a quick overview of Keras
    - [ ] :book: Read d2l.ai Chapter 3 using the TensorFlow tab for comparison with PyTorch
    - [ ] :computer: Build the same 2-layer network in Keras, train on MNIST, and compare the code with your PyTorch version
    - [ ] :open_book: Plot `history.history['loss']` and `history.history['val_loss']` to visualize training curves

**Resources:**

- :computer: [TensorFlow: Beginner Quickstart](https://www.tensorflow.org/tutorials/quickstart/beginner) -- Official tutorial from data to trained model in 5 minutes (Free)
- :open_book: [d2l.ai: Linear Regression in TensorFlow](https://d2l.ai/chapter_linear-neural-networks/linear-regression-concise.html) -- Interactive TensorFlow code alongside PyTorch (Free)
- :book: [Keras Documentation](https://keras.io/) -- Comprehensive API reference with examples (Free)
- :dart: [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course) -- Google's free ML course using TensorFlow (Free)
- :clapper: [TensorFlow: Advanced Tutorials](https://www.tensorflow.org/tutorials) -- Collection of tutorials covering various model types (Free)

---

## Training a Model End-to-End

*⏱ ~1.5 hours*

This section shows the complete workflow from data loading to evaluation in both frameworks side-by-side. We use the MNIST handwritten digit dataset -- the "hello world" of deep learning -- to keep the focus on the training process rather than the data.

**Step 1: Load and preprocess data**

=== "PyTorch"

    ```python
    import torch
    from torchvision import datasets, transforms
    from torch.utils.data import DataLoader

    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])

    train_data = datasets.MNIST('./data', train=True, download=True,
                                transform=transform)
    test_data = datasets.MNIST('./data', train=False, transform=transform)

    train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
    test_loader = DataLoader(test_data, batch_size=1000)
    ```

=== "TensorFlow"

    ```python
    import tensorflow as tf

    (X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()

    # Normalize to [0, 1] and reshape
    X_train = X_train.astype('float32') / 255.0
    X_test = X_test.astype('float32') / 255.0
    X_train = X_train.reshape(-1, 784)
    X_test = X_test.reshape(-1, 784)
    ```

**Step 2: Define the model**

=== "PyTorch"

    ```python
    import torch.nn as nn

    model = nn.Sequential(
        nn.Flatten(),
        nn.Linear(784, 128),
        nn.ReLU(),
        nn.Dropout(0.2),
        nn.Linear(128, 10)
    )
    ```

=== "TensorFlow"

    ```python
    from tensorflow import keras

    model = keras.Sequential([
        keras.layers.Dense(128, activation='relu', input_shape=(784,)),
        keras.layers.Dropout(0.2),
        keras.layers.Dense(10, activation='softmax')
    ])
    ```

**Step 3: Set up training**

=== "PyTorch"

    ```python
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    loss_fn = nn.CrossEntropyLoss()
    ```

=== "TensorFlow"

    ```python
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    ```

**Step 4: Train the model**

=== "PyTorch"

    ```python
    model.train()
    for epoch in range(5):
        total_loss = 0
        for X_batch, y_batch in train_loader:
            output = model(X_batch)
            loss = loss_fn(output, y_batch)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {epoch+1}, Loss: {total_loss/len(train_loader):.4f}")
    ```

=== "TensorFlow"

    ```python
    history = model.fit(
        X_train, y_train,
        epochs=5,
        batch_size=64,
        validation_split=0.1,
        verbose=1
    )
    ```

**Step 5: Evaluate**

=== "PyTorch"

    ```python
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for X_batch, y_batch in test_loader:
            output = model(X_batch)
            _, predicted = torch.max(output, 1)
            total += y_batch.size(0)
            correct += (predicted == y_batch).sum().item()
    print(f"Test Accuracy: {correct/total:.4f}")
    ```

=== "TensorFlow"

    ```python
    test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
    print(f"Test Accuracy: {test_acc:.4f}")
    ```

**Step 6: Save the model**

=== "PyTorch"

    ```python
    torch.save(model.state_dict(), 'mnist_model.pth')
    # Load: model.load_state_dict(torch.load('mnist_model.pth'))
    ```

=== "TensorFlow"

    ```python
    model.save('mnist_model')
    # Load: model = keras.models.load_model('mnist_model')
    ```

Notice the key difference: PyTorch's training loop is explicit (you write every step), while Keras's `model.fit()` handles the loop internally. Both achieve the same result (~97% accuracy on MNIST with this simple architecture). The PyTorch approach gives you more control; the Keras approach gives you more brevity.

!!! tip "Teaching Moment"
    In practice, you will likely use higher-level wrappers rather than writing raw training loops for every project. **PyTorch Lightning** wraps the PyTorch training loop with built-in logging, checkpointing, distributed training, and mixed precision -- while still letting you define custom training steps. **Keras** already provides this high-level interface natively. The raw training loop matters because it teaches you what the wrappers abstract away -- when something goes wrong, you need to understand the underlying mechanics to debug it.

!!! action "What to Do"
    - [ ] :computer: Run the complete MNIST training pipeline in your preferred framework
    - [ ] :computer: Then translate it to the other framework using the content tabs as a guide
    - [ ] :open_book: Add training/validation loss plots to visualize learning curves
    - [ ] :book: Try modifying the architecture (add layers, change hidden sizes) and observe the effect on accuracy

**Resources:**

- :computer: [PyTorch: Training a Classifier](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html) -- Official tutorial with complete CIFAR-10 training pipeline (Free)
- :computer: [TensorFlow: Basic Classification](https://www.tensorflow.org/tutorials/keras/classification) -- Official Keras classification tutorial (Free)
- :open_book: [d2l.ai: Image Classification (both frameworks)](https://d2l.ai/chapter_convolutional-neural-networks/lenet.html) -- Side-by-side implementation in PyTorch and TensorFlow (Free)
- :dart: [PyTorch Lightning](https://lightning.ai/docs/pytorch/stable/) -- Higher-level wrapper for PyTorch training (Free)

---

## Framework Ecosystem and Tools

*⏱ ~30 minutes*

Modern deep learning is not just about frameworks -- it is an ecosystem of tools that handle everything from pre-trained model access to experiment tracking to free GPU compute. Knowing these tools is as important as knowing the framework itself.

**Hugging Face** has become the hub of the deep learning ecosystem. Their `transformers` library provides access to thousands of pre-trained models (BERT, GPT-2, ViT, Whisper, and more) with a consistent API. The Model Hub hosts community-uploaded models, and Datasets provides standardized access to training data. For most NLP and vision tasks, your starting point should be "Is there a pre-trained model on Hugging Face that I can fine-tune?"

```python
from transformers import pipeline

# Sentiment analysis in 3 lines
classifier = pipeline("sentiment-analysis")
result = classifier("I love learning deep learning!")
# [{'label': 'POSITIVE', 'score': 0.9998}]
```

**Experiment tracking** tools record hyperparameters, metrics, and artifacts across training runs. **Weights & Biases (W&B)** is the most popular standalone tool -- it logs metrics in real-time, compares runs visually, and stores model checkpoints. **TensorBoard** (originally for TensorFlow, now works with PyTorch too) provides similar functionality as a local tool. **MLflow** adds model registry and deployment features.

**Google Colab** provides free GPU access (typically T4 or V100) in a Jupyter notebook environment. It comes with PyTorch and TensorFlow pre-installed and is the easiest way to experiment with deep learning without local hardware. The free tier has usage limits, but it is sufficient for learning and small experiments. Kaggle Notebooks offer a similar free GPU environment.

**PyTorch Lightning** wraps the raw training loop with production-ready features: automatic distributed training, mixed-precision training, gradient accumulation, early stopping, checkpointing, and logging -- all without rewriting your model code. You define your model as a LightningModule (extending nn.Module with training_step and configure_optimizers methods), and the Trainer handles everything else.

**JAX** (by Google) is emerging as a third framework, especially popular in research for its functional programming style and excellent support for automatic vectorization and parallelism. JAX is not a neural network framework itself but a numerical computing library; **Flax** and **Haiku** provide the neural network layers on top. Unless you are doing research at Google or DeepMind, PyTorch or TensorFlow will serve you well.

!!! tip "Teaching Moment"
    In practice, your deep learning workflow will look less like writing training loops from scratch and more like: (1) find a pre-trained model on Hugging Face, (2) fine-tune it on your data using PyTorch Lightning or Keras, (3) track experiments with W&B, (4) deploy with ONNX or TorchServe. The raw training loop knowledge from this page is essential for understanding what these tools do under the hood, but production work increasingly uses these higher-level abstractions.

!!! action "What to Do"
    - [ ] :open_book: Browse the [Hugging Face Model Hub](https://huggingface.co/models) and run one of the inference demos
    - [ ] :computer: Open a Google Colab notebook, import PyTorch, and verify GPU is available
    - [ ] :book: Read the PyTorch Lightning quickstart to see how it simplifies the training loop you wrote earlier
    - [ ] :open_book: Try the Hugging Face `pipeline()` API for a quick text classification or image classification task

**Resources:**

- :open_book: [Hugging Face: Model Hub](https://huggingface.co/models) -- Browse and use thousands of pre-trained models (Free)
- :computer: [Google Colab](https://colab.research.google.com/) -- Free GPU access for deep learning experiments (Free)
- :book: [Weights & Biases](https://wandb.ai/) -- Experiment tracking and visualization (Free for individuals)
- :dart: [PyTorch Lightning](https://lightning.ai/) -- Higher-level training framework for PyTorch (Free)
- :book: [TensorBoard](https://www.tensorflow.org/tensorboard) -- Visualization toolkit for training metrics (Free)
- :open_book: [ONNX](https://onnx.ai/) -- Open format for model interoperability between frameworks (Free)

---

## Key Takeaways

- **Frameworks handle the hard parts**: automatic differentiation, GPU acceleration, and pre-built components let you focus on architecture and data rather than gradient math -- learn the concepts, let the framework handle the implementation
- **PyTorch and TensorFlow are both excellent**: PyTorch's explicit training loop gives you control and transparency (preferred for research); Keras's `model.fit()` gives you brevity and speed (preferred for prototyping) -- learn one deeply, understand both
- **The training loop is universal**: forward pass, compute loss, backward pass, update weights -- this pattern is the same regardless of framework, and understanding it is essential for debugging training issues
- **Start with pre-trained models**: for most practical tasks, fine-tuning a pre-trained model from Hugging Face will outperform training from scratch -- the ecosystem of pre-trained models is one of the most important tools in modern ML
- **The ecosystem matters as much as the framework**: Hugging Face for pre-trained models, W&B for experiment tracking, Colab for free GPU, Lightning for production training -- knowing these tools is part of being an effective ML engineer

---

**Next up:** [MLOps & Deployment](../mlops/index.md) -- how to take your trained models from experiments to production, covering the full lifecycle from project planning to monitoring deployed systems
