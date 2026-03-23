# Deep Learning

!!! prerequisite "Before You Start"
    Complete the [Core ML](../core-ml/index.md) section and review
    [Math Foundations](../math-foundations/index.md) (especially linear algebra and calculus)
    before starting here. You need classical ML concepts (evaluation, bias-variance tradeoff)
    and mathematical foundations (matrix operations, derivatives, chain rule) to work through
    these pages effectively.

*Total time: ~34-44 hours* | :red_circle: Advanced

## Why Deep Learning?

Deep learning automates **feature extraction** -- the laborious process of hand-engineering input representations that classical ML requires. Instead of designing features by hand (edge detectors for images, TF-IDF for text), deep networks learn hierarchical representations directly from raw data. This ability to learn features from data is why deep learning dominates unstructured data problems: image classification, natural language processing, speech recognition, and generative AI.

The shift from handcrafted features to learned representations is the defining characteristic of deep learning. A classical ML pipeline for image classification requires a human expert to design feature extractors (HOG, SIFT, color histograms), then trains a classifier (SVM, Random Forest) on those features. A deep learning pipeline feeds raw pixels into a neural network that learns both the features and the classifier end-to-end. This end-to-end learning is what enables deep learning to achieve superhuman performance on tasks that were previously intractable.

!!! tip "Why This Path"
    roadmap.sh, Andrew Ng's ML Specialization, fast.ai, and Stanford's CS229/CS231n all teach deep learning after classical ML. The consensus is clear: classical ML builds the evaluation discipline, feature intuition, and bias-variance understanding that deep learning builds upon. If you skip classical ML and jump straight to neural networks, you will lack the foundation to diagnose training failures, evaluate model quality, and know when a simpler model would actually work better.

## Section Overview

| Topic | Time | Difficulty | What You'll Learn |
|-------|------|-----------|-------------------|
| [Neural Network Fundamentals](neural-network-fundamentals.md) | ~8-10 hrs | :yellow_circle: Intermediate | Perceptrons, feedforward networks, activation functions, backpropagation, regularization |
| [CNNs](cnns.md) | ~6-8 hrs | :yellow_circle: Intermediate | Convolution operations, architectures (LeNet to ResNet), transfer learning |
| [RNNs & Sequence Models](rnns-sequence-models.md) | ~6-8 hrs | :yellow_circle::red_circle: Intermediate-Advanced | Vanishing gradients, LSTMs, GRUs, seq2seq, context vector bottleneck |
| [Transformers & Attention](transformers-attention.md) | ~8-10 hrs | :red_circle: Advanced | Attention mechanism, self-attention, BERT, GPT, modern LLMs |
| [Frameworks](frameworks.md) | ~6-8 hrs | :yellow_circle: Intermediate | PyTorch, TensorFlow/Keras, training pipelines, ecosystem tools |

## Recommended Order

**Neural Network Fundamentals first** -- it builds the toolkit (neurons, backpropagation, activation functions, regularization) that every architecture page assumes. **CNNs and RNNs can be done in either order** -- both build directly on fundamentals and are independent of each other. However, **Transformers should come after RNNs** because the vanishing gradient problem and seq2seq bottleneck from the RNNs page provide the essential context for why attention and Transformers were invented. Without this context, Transformers lose their "why." **Frameworks can be studied alongside or after the architecture pages** -- it is designed to complement the architecture learning, not replace it.

The narrative arc of this section is: fundamentals build the toolkit, CNNs and RNNs show how to apply it to specific domains, RNN limitations motivate attention, attention enables Transformers, and frameworks make it all practical. Each page's "Next up" link reinforces this progression.

If you are pressed for time, the minimum viable path is: Neural Network Fundamentals, then Transformers & Attention (reading the RNNs motivation sections referenced within), then Frameworks. This gives you the core concepts and practical skills, though the full path provides deeper understanding.

!!! info "Progress Tracking"
    Your progress is saved in your browser. Check off action items as you complete them -- your checkmarks persist across sessions using localStorage.
