# Convolutional Neural Networks (CNNs)

!!! prerequisite "Before You Start"
    Complete [Neural Network Fundamentals](neural-network-fundamentals.md) before this page.
    You need to understand feedforward networks, activation functions, and backpropagation.

*Total time: ~6-8 hours* | :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Understand convolution operations and how they detect features in spatial data
- Know the CNN building blocks: convolutional layers, pooling, batch normalization
- Recognize key architectures (LeNet to ResNet) and why each innovation mattered
- Apply transfer learning with pretrained models for practical image classification
- Be aware of CNN applications beyond classification (detection, segmentation)

---

## Convolution Operations

*⏱ ~1.5 hours*

A **convolution** slides a small filter (also called a kernel) across an input image, computing the dot product at each position to produce a **feature map**. Different filters detect different features: horizontal edges, vertical edges, textures, corners. The network learns which filters to use during training -- you never hand-design them.

The convolution operation for a 2D input with a single filter can be expressed as:

$$(\mathbf{X} * \mathbf{W})_{i,j} = \sum_{m} \sum_{n} X_{i+m, j+n} \cdot W_{m,n}$$

where \(\mathbf{X}\) is the input, \(\mathbf{W}\) is the filter, and the sums run over the filter dimensions. The output size depends on the input size, filter size, **stride** (how far the filter moves between positions), and **padding** (zeros added around the border):

$$\text{Output size} = \left\lfloor \frac{N - F + 2P}{S} \right\rfloor + 1$$

where \(N\) is the input size, \(F\) is the filter size, \(P\) is the padding, and \(S\) is the stride.

The key advantage of convolutions over fully connected layers is **parameter sharing**. A fully connected layer connecting a 224x224x3 image to 1000 hidden neurons would need 150 million parameters. A convolutional layer with 64 filters of size 3x3x3 (3x3 spatial, 3 input channels) needs only \(64 \times (3 \times 3 \times 3 + 1) = 1{,}792\) parameters -- the same filter is applied at every spatial position. This dramatically reduces parameters, prevents overfitting, and encodes the assumption that useful features can appear anywhere in the image.

In practice, a convolutional layer applies multiple filters simultaneously, each producing one feature map. If you apply 64 filters to a 224x224 input with padding to preserve spatial dimensions, the output is 224x224x64 -- 64 feature maps, each highlighting different features. Stacking convolutional layers produces increasingly abstract feature maps: early layers detect edges and textures, middle layers detect parts and patterns, and deep layers detect entire objects or scenes.

The **depth of the input** (number of channels) is an important detail. An RGB image has 3 channels, so filters in the first layer are 3D (e.g., 3x3x3). After the first convolution produces 64 feature maps, filters in the second layer are 3x3x64, each one integrating information across all 64 channels. This channel-wise integration is how CNNs combine information from different features at each spatial location.

**Padding** controls what happens at the image borders. "Valid" padding uses no padding, shrinking the output. "Same" padding adds zeros around the border so the output has the same spatial dimensions as the input. Same padding is the default in most modern architectures because it simplifies dimension tracking and allows information from edge pixels to be used more fully.

**1x1 convolutions** are a powerful technique that operates only across channels, not spatially. A 1x1 convolution with \(k\) filters takes an input with \(c\) channels and produces an output with \(k\) channels at the same spatial resolution. This is used to reduce channel dimensions (bottleneck layers in ResNet), mix information across channels, and add nonlinearity without changing spatial size. Despite looking trivially simple, 1x1 convolutions are a key building block of modern CNN architectures.

!!! tip "Teaching Moment"
    The word "convolution" sounds intimidating, but the operation is simple: slide a small window across the image, multiply element-wise, sum the result. Think of it as asking "how much does this local patch match my filter?" at every position. Early layers learn low-level filters (edges, gradients), while deeper layers combine them into high-level features (eyes, wheels, text characters). The network discovers this hierarchy entirely on its own.

!!! action "What to Do"
    - [ ] :clapper: Watch CS231n Lecture 5 on convolutional networks for the gold-standard visual explanation of convolution, stride, and padding
    - [ ] :book: Read d2l.ai Section 7.1 on convolutions for interactive code examples
    - [ ] :computer: Apply a simple edge-detection kernel (Sobel filter) to an image manually using NumPy -- then compare with a learned convolutional filter from a pretrained network

**Resources:**

- :clapper: [Stanford CS231n Lecture 5: Convolutional Neural Networks](http://cs231n.stanford.edu/) -- The gold standard for CNN education; visual explanations of convolution operations (Free)
- :open_book: [d2l.ai Ch. 7.1: From Fully Connected to Convolutions](https://d2l.ai/chapter_convolutional-neural-networks/why-conv.html) -- Interactive code showing why convolutions work (Free)
- :book: [Deep Learning Book Ch. 9: Convolutional Networks](https://www.deeplearningbook.org/contents/convnets.html) -- Mathematical treatment of convolution operations (Free)
- :dart: [Andrew Ng DL Specialization, Course 4](https://www.coursera.org/learn/convolutional-neural-networks) -- Full video lectures on CNNs with programming assignments (Free to audit)

---

## CNN Building Blocks

*⏱ ~1 hour*

Beyond convolution, CNNs use several key building blocks to construct complete architectures.

**Pooling layers** reduce the spatial dimensions of feature maps, making the network more computationally efficient and more robust to small translations. **Max pooling** takes the maximum value in each window (e.g., 2x2), keeping the strongest activation. **Average pooling** takes the mean. Max pooling is the default for most architectures because it preserves the most prominent features.

For a max pooling layer with pool size \(k\) and stride \(s\):

$$\text{MaxPool}(\mathbf{X})_{i,j} = \max_{0 \leq m,n < k} X_{i \cdot s + m, \; j \cdot s + n}$$

**Batch normalization** normalizes the activations within each mini-batch, stabilizing training and allowing higher learning rates. In CNNs, batch norm is typically applied after the convolution and before the activation function. It has become standard in virtually all modern CNN architectures.

**Fully connected layers** appear at the end of most CNNs, converting the spatial feature maps into a flat vector for classification. A typical pattern: convolutional layers extract features, a global average pooling layer reduces each feature map to a single number, and one or two fully connected layers produce the final class predictions. Modern architectures increasingly use **global average pooling** instead of multiple fully connected layers, reducing parameters and overfitting risk.

**Stride** in convolutional layers can also reduce spatial dimensions, serving a similar role to pooling. A convolution with stride 2 produces output with half the spatial dimensions, combining feature extraction and downsampling in a single operation. Modern architectures often use strided convolutions instead of separate pooling layers, as the learned downsampling can be more effective than fixed max pooling.

The **receptive field** is the region of the input image that influences a particular neuron's output. Early layers have small receptive fields (they see local patches), while deeper layers have progressively larger ones (they see more of the image). This growing receptive field is how CNNs build up from local features to global understanding -- a 3x3 filter in layer 5 might effectively "see" a 50x50 region of the original image.

**Dilated (atrous) convolutions** expand the receptive field without increasing parameters by inserting gaps between filter elements. A 3x3 filter with dilation rate 2 covers a 5x5 area. This is particularly useful in segmentation tasks where capturing large-scale context is important but pooling would lose spatial resolution.

A typical CNN block follows the pattern: **Conv -> BatchNorm -> ReLU -> (optional) Pooling**. This ordering is standard in most architectures and placing batch normalization before activation has been shown to help with training stability. Some architectures experiment with different orderings (pre-activation ResNets put BatchNorm and ReLU before the convolution), but the standard ordering is the safest starting point.

!!! tip "Teaching Moment"
    The receptive field concept explains why deeper networks can recognize larger objects. Each convolutional layer expands the effective viewing area. A network with 5 layers of 3x3 convolutions has a receptive field of 11x11 -- each neuron in the final layer integrates information from an 11x11 patch. Add pooling (which doubles the effective receptive field), and deep networks can "see" the entire image despite using only small 3x3 filters.

!!! action "What to Do"
    - [ ] :clapper: Watch CS231n coverage of pooling and batch normalization for visual explanations of how they transform feature maps
    - [ ] :book: Read d2l.ai Section 7.5 on pooling layers for interactive code
    - [ ] :computer: Build a small CNN in PyTorch (Conv -> BatchNorm -> ReLU -> MaxPool, repeated twice, then FC) and print the shape of the tensor at each layer to trace the spatial dimensions shrinking

**Resources:**

- :clapper: [Stanford CS231n: CNN Architectures](http://cs231n.stanford.edu/) -- Covers pooling, batch norm, and architectural choices in context (Free)
- :open_book: [d2l.ai Ch. 7.5: Pooling](https://d2l.ai/chapter_convolutional-neural-networks/pooling.html) -- Interactive pooling code examples (Free)
- :open_book: [d2l.ai Ch. 8.5: Batch Normalization](https://d2l.ai/chapter_convolutional-modern/batch-norm.html) -- Batch norm theory and implementation (Free)
- :book: [PyTorch: Building a CNN Tutorial](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html) -- Official tutorial building a CNN from scratch (Free)

---

## Key Architectures

*⏱ ~1.5 hours*

The history of CNN architectures is a story of solving specific problems. Each landmark architecture introduced an innovation that addressed a real limitation, and understanding this progression teaches you *why* modern networks look the way they do.

**LeNet-5** (1998) was the first successful CNN, designed by Yann LeCun for handwritten digit recognition. It proved that learned convolutional features outperform hand-designed ones. LeNet was small by modern standards -- two convolutional layers followed by three fully connected layers, with only about 60,000 parameters -- but it established the core CNN pattern that every subsequent architecture follows: convolution extracts features, pooling reduces dimensions, fully connected layers classify.

LeNet was deployed commercially by the US Postal Service for reading handwritten zip codes on envelopes. Despite this practical success, the broader ML community remained skeptical of neural networks, preferring SVMs and hand-crafted features. It took 14 more years and the ImageNet breakthrough for CNNs to gain widespread acceptance.

**AlexNet** (2012) won the ImageNet competition by a massive margin (reducing the top-5 error rate from 26% to 15%), triggering the modern deep learning revolution. Its innovations: deeper architecture (8 layers with 60 million parameters), ReLU activation (solving the vanishing gradient problem for CNNs), dropout for regularization, and training on two GPUs in parallel. AlexNet showed that scaling up CNNs with more data and compute produced dramatic improvements. This single result is widely credited with reigniting interest in neural networks across the entire research community.

**VGG** (2014) simplified architecture design by using only 3x3 convolutions stacked deep (16-19 layers). The insight: two stacked 3x3 convolutions have the same receptive field as one 5x5 (both cover a 5x5 area of the input), but with fewer parameters (2 x 9 = 18 vs 25) and more nonlinearity (two ReLU activations vs one). VGG demonstrated that depth with small filters outperforms shallow networks with large filters. The VGG design philosophy of "just stack 3x3 convolutions" was influential and remains a good starting point for custom architectures.

**ResNet** (2015) introduced **skip connections** (residual connections) that allow gradients to flow directly through the network, bypassing layers. This solved the degradation problem -- very deep networks (50, 101, 152 layers) were performing worse than shallower ones, not because of overfitting, but because gradients could not flow through so many layers effectively.

The skip connection adds the input of a block directly to its output: \(\mathbf{y} = F(\mathbf{x}) + \mathbf{x}\), where \(F(\mathbf{x})\) is the residual function learned by the convolutional layers. Instead of learning the full transformation, the network only needs to learn the **residual** -- the difference from the identity. If a layer should ideally perform an identity mapping (pass input through unchanged), a skip connection makes this trivially easy (just set \(F(\mathbf{x}) = 0\)), while learning the same mapping without skip connections is surprisingly difficult for gradient-based optimization. This insight made networks with 152+ layers trainable and remains one of the most important architectural innovations in deep learning.

```
ResNet-18 Architecture (simplified):
Input (224x224x3)
  -> Conv 7x7, stride 2, 64 filters -> BatchNorm -> ReLU -> MaxPool 3x3/2
  -> 2x [Conv 3x3, 64 -> Conv 3x3, 64 + skip connection]
  -> 2x [Conv 3x3, 128 -> Conv 3x3, 128 + skip connection]
  -> 2x [Conv 3x3, 256 -> Conv 3x3, 256 + skip connection]
  -> 2x [Conv 3x3, 512 -> Conv 3x3, 512 + skip connection]
  -> Global Average Pool -> FC 1000 (classes)

Key insight: skip connections let gradients flow directly
through the network, enabling much deeper architectures.

Total parameters: ~11.7 million
Each "2x [Conv 3x3, N -> Conv 3x3, N + skip]" is a residual block.
When spatial dimensions change, a 1x1 convolution adjusts the skip path.
```

The architecture table above shows ResNet-18, the smallest member of the family. Larger variants (ResNet-34, 50, 101, 152) add more residual blocks and use "bottleneck" blocks with 1x1 convolutions to manage computational cost. ResNet-50 replaces each 2-layer block with a 3-layer bottleneck: 1x1 (reduce channels) -> 3x3 (process) -> 1x1 (expand channels), maintaining similar compute with greater depth.

**EfficientNet** (2019) used neural architecture search to find optimal scaling of depth, width, and resolution simultaneously. Rather than scaling one dimension arbitrarily, it found a balanced compound scaling rule. EfficientNet achieves better accuracy than ResNet with fewer parameters.

Understanding when NOT to go deeper is equally important. Adding more layers has diminishing returns and eventually hurts performance (even with skip connections) due to increased training difficulty and overfitting on smaller datasets. For most practical tasks with limited data, a ResNet-18 or ResNet-50 with transfer learning will outperform a deeper custom architecture trained from scratch.

A summary of what each architecture taught the field:

| Architecture | Year | Key Innovation | What It Proved |
|-------------|------|---------------|----------------|
| LeNet-5 | 1998 | Learned conv filters | CNNs work for visual recognition |
| AlexNet | 2012 | Scale + GPU + ReLU | Deep learning is viable at scale |
| VGG | 2014 | Small 3x3 filters stacked deep | Depth with simple filters beats width |
| ResNet | 2015 | Skip connections | Extreme depth is trainable with residuals |
| EfficientNet | 2019 | Compound scaling | Balanced scaling beats arbitrary depth |

!!! tip "Why This Path"
    CS231n is THE gold standard for CNN education, and its approach of walking through the architecture progression (LeNet -> AlexNet -> VGG -> ResNet) is how most ML practitioners learn CNNs. Each architecture teaches a concept: LeNet shows CNNs work, AlexNet shows scale matters, VGG shows depth with small filters wins, ResNet shows skip connections enable extreme depth. Understanding *why* each innovation was needed matters more than memorizing layer counts.

!!! action "What to Do"
    - [ ] :clapper: Watch CS231n Lecture 9 on CNN architectures for the full historical progression
    - [ ] :book: Read d2l.ai Chapter 8 covering modern CNN architectures with code implementations
    - [ ] :computer: Load a pretrained ResNet-18 in PyTorch and print its architecture to see the skip connections in practice -- then run a forward pass on a sample image

**Resources:**

- :clapper: [Stanford CS231n Lecture 9: CNN Architectures](http://cs231n.stanford.edu/) -- Essential lecture covering LeNet through ResNet with architectural analysis (Free)
- :open_book: [d2l.ai Ch. 8: Modern CNNs](https://d2l.ai/chapter_convolutional-modern/) -- Interactive implementations of AlexNet, VGG, ResNet, and more (Free)
- :dart: [Andrew Ng DL Specialization, Course 4 Week 2](https://www.coursera.org/learn/convolutional-neural-networks) -- Classic network architectures with practical assignments (Free to audit)
- :book: [He et al.: Deep Residual Learning](https://arxiv.org/abs/1512.03385) -- The original ResNet paper; highly readable and influential (Free)

---

## Image Classification in Practice

*⏱ ~1 hour*

In practice, you almost never train a CNN from scratch. The standard workflow is **transfer learning**: take a model pretrained on a large dataset (typically ImageNet, with 1.2 million images across 1,000 classes) and adapt it to your specific task. This works because the early layers learn general features (edges, textures, colors) that transfer across domains.

There are two transfer learning strategies. **Feature extraction** freezes the pretrained layers and only trains a new classification head on top. This is fast, requires little data, and works well when your task is similar to the pretraining data. **Fine-tuning** unfreezes some or all pretrained layers and trains them with a small learning rate. This adapts the features to your domain and works better when your data is significantly different from ImageNet.

The reasoning behind transfer learning is intuitive: a network trained on ImageNet's 1.2 million images has already learned excellent low-level features (edges, textures, color gradients) and mid-level features (corners, shapes, parts). These features are general-purpose -- edges look the same whether you are classifying dogs, cars, or X-rays. Only the high-level features (specific object categories) need to change for a new task. By reusing the learned features and only training the classification head, you effectively get the benefit of training on millions of images even if your dataset has only hundreds.

**Model selection for transfer learning** depends on your computational budget. ResNet-18 (11.7M parameters) is fast and lightweight, suitable for quick experiments and edge deployment. ResNet-50 (25.6M parameters) offers a good balance of accuracy and speed. EfficientNet-B0 through B7 provides a smooth accuracy-compute tradeoff curve. For the highest accuracy regardless of cost, larger models like EfficientNet-B4 or ConvNeXt are preferred.

**Data augmentation** artificially increases training set size by applying random transformations: horizontal flips, rotations, crops, color jitter, and scaling. This teaches the network invariance to these transformations without collecting more data. Modern augmentation strategies like Mixup and CutMix blend training examples, further improving generalization.

The practical image classification workflow looks like this: (1) start with a pretrained model (ResNet, EfficientNet), (2) replace the final classification layer for your number of classes, (3) apply data augmentation to your training set, (4) train with a small learning rate (1e-4 to 1e-3), (5) monitor validation accuracy and use early stopping, (6) evaluate on a held-out test set.

**Common data augmentation** techniques include random horizontal flips, random crops with resizing, color jitter (brightness, contrast, saturation), and random rotation. For medical imaging and specialized domains, domain-specific augmentations matter more -- elastic deformations for pathology slides, rotation invariance for satellite images. Modern techniques like **Mixup** (blending two training images and their labels) and **CutMix** (cutting and pasting patches between images) further improve generalization by creating training examples the model has never seen.

When fine-tuning, a common strategy is **progressive unfreezing**: start by training only the new classification head (fast convergence), then unfreeze the last few convolutional blocks and train with a smaller learning rate, and optionally unfreeze all layers with an even smaller learning rate. This gives each layer a learning rate proportional to how much it needs to change, preventing catastrophic forgetting of useful pretrained features.

**Choosing between feature extraction and fine-tuning** depends on your dataset:

| Scenario | Strategy | Why |
|----------|----------|-----|
| Small dataset, similar to ImageNet | Feature extraction (freeze backbone) | Avoid overfitting the few samples |
| Small dataset, very different domain | Fine-tune last few layers | Adapt features while keeping generalization |
| Large dataset, similar to ImageNet | Fine-tune entire network | Enough data to refine all features |
| Large dataset, very different domain | Fine-tune with longer training | May need to unlearn some ImageNet features |

!!! tip "Teaching Moment"
    Training a CNN from scratch on a small dataset (under 10,000 images) is almost always a mistake. A pretrained ResNet fine-tuned on 500 images will outperform a CNN trained from scratch on the same 500 images. Transfer learning is not just a shortcut -- it is what practitioners actually do. The rare exceptions are domains with truly novel visual features (medical imaging, satellite imagery), and even there, ImageNet pretraining usually helps.

!!! action "What to Do"
    - [ ] :clapper: Watch the PyTorch transfer learning tutorial video for a practical walkthrough
    - [ ] :book: Read d2l.ai Section 14.2 on fine-tuning for the theory behind transfer learning
    - [ ] :computer: Fine-tune a pretrained ResNet-18 on a small image dataset (e.g., CIFAR-10 or a Kaggle dataset with fewer than 5,000 images) using PyTorch -- compare accuracy with and without pretrained weights

**Resources:**

- :computer: [PyTorch: Transfer Learning Tutorial](https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html) -- Official tutorial with complete code for fine-tuning and feature extraction (Free)
- :open_book: [d2l.ai Ch. 14.2: Fine-Tuning](https://d2l.ai/chapter_computer-vision/fine-tuning.html) -- Interactive fine-tuning with theory and code (Free)
- :dart: [Andrew Ng DL Specialization, Course 4 Week 2](https://www.coursera.org/learn/convolutional-neural-networks) -- Transfer learning lectures with practical guidance (Free to audit)
- :computer: [Kaggle: Image Classification Competition](https://www.kaggle.com/competitions) -- Practice transfer learning on real competition datasets (Free)
- :clapper: [fast.ai Practical Deep Learning, Lesson 1](https://course.fast.ai/) -- Top-down practical approach starting with transfer learning (Free)

---

## Beyond Classification

*⏱ ~30 minutes*

CNNs are most famous for image classification, but the same convolutional feature extraction powers a wide range of computer vision tasks. Awareness of these applications helps you understand the breadth of what CNNs enable, even if deep coverage is specialization territory.

**Object detection** identifies what objects are in an image and where they are, outputting bounding boxes and class labels. YOLO (You Only Look Once) processes the entire image in a single pass, making it fast enough for real-time applications like autonomous driving and security cameras. Faster R-CNN uses a two-stage approach (region proposals, then classification) for higher accuracy at the cost of speed.

**Semantic segmentation** classifies every pixel in the image, producing a detailed label map. U-Net (originally designed for medical imaging) and DeepLab are the most influential architectures. Applications include medical image analysis (tumor boundaries), autonomous driving (road vs sidewalk vs pedestrian), and satellite imagery (land use mapping). **Instance segmentation** goes further by distinguishing between individual objects of the same class (e.g., separating two overlapping people).

**Image generation** has evolved from GANs (Generative Adversarial Networks) to diffusion models (Stable Diffusion, DALL-E). While the generation mechanism is different, both rely on CNN-like architectures for the underlying feature processing. Understanding convolutional feature extraction gives you the foundation to understand generation architectures.

**Other applications** include style transfer (applying the artistic style of one image to the content of another), pose estimation (detecting human body joint positions), video analysis (action recognition, tracking), and 3D point cloud processing. The core CNN feature extraction is shared across all of these -- what changes is the output head and the loss function.

**Medical imaging** deserves special mention as a high-impact CNN application domain. CNNs assist radiologists in detecting tumors in mammograms, identifying diabetic retinopathy in retinal scans, and segmenting organs in CT scans. These applications often use U-Net architectures and require careful validation because the stakes are high -- a false negative could mean a missed diagnosis.

**Autonomous driving** combines multiple CNN tasks: object detection (identify cars, pedestrians, signs), semantic segmentation (road vs sidewalk vs building), and depth estimation (how far away objects are). Real-time performance is critical -- the system must process 30+ frames per second with latency under 100ms. This drives interest in efficient architectures (MobileNet, EfficientNet) and specialized hardware (NVIDIA's Jetson platform).

**Video understanding** extends CNNs to the temporal domain by processing sequences of frames. Common approaches include 3D convolutions (treating time as a third spatial dimension), two-stream networks (one for appearance, one for motion), and combining CNNs with temporal models (Transformers or RNNs) for action recognition and video captioning.

**Generative models** using CNNs include:

- **GANs (Generative Adversarial Networks)**: two networks compete -- a generator creates images, a discriminator tries to distinguish real from fake. GANs can generate photorealistic faces, artwork, and more
- **Variational Autoencoders (VAEs)**: learn a compressed latent representation of images and generate new ones by sampling from this space
- **Diffusion models**: the current state of the art for image generation (Stable Diffusion, DALL-E, Midjourney), using U-Net-like CNN architectures for iterative denoising

While generative models are fascinating, they are firmly in specialization territory for this roadmap. Understanding that CNNs power both discriminative (classification) and generative tasks demonstrates the versatility of convolutional feature extraction.

The key takeaway from beyond-classification applications: the CNN backbone you learn for classification directly transfers to all of these tasks.
A ResNet trained for classification can be repurposed as the feature extractor for a detection model (Faster R-CNN), a segmentation model (U-Net), or a generative model (GAN discriminator).
The investment in learning CNN fundamentals pays dividends across every computer vision application you encounter in practice.

!!! tip "Teaching Moment"
    If you are interested in specializing in computer vision, detection and segmentation are natural next steps after classification. However, be aware that Vision Transformers (ViT) are increasingly competitive with CNNs on all these tasks. The CNN fundamentals you learned here transfer to understanding ViTs -- both learn hierarchical features, just with different mechanisms. We cover Vision Transformers briefly in the [Transformers & Attention](transformers-attention.md) section.

!!! action "What to Do"
    - [ ] :book: Read an overview of YOLO and its evolution for understanding real-time object detection
    - [ ] :clapper: Watch a demo of semantic segmentation to see pixel-level classification in action
    - [ ] :open_book: Browse the Hugging Face model hub for computer vision models to see the breadth of available pretrained models

**Resources:**

- :clapper: [Stanford CS231n Lecture 11: Detection and Segmentation](http://cs231n.stanford.edu/) -- Overview of detection, segmentation, and other CNN applications (Free)
- :open_book: [d2l.ai Ch. 14: Computer Vision](https://d2l.ai/chapter_computer-vision/) -- Interactive coverage of detection and segmentation with code (Free)
- :book: [Papers With Code: Object Detection](https://paperswithcode.com/task/object-detection) -- Leaderboards and papers for state-of-the-art detection methods (Free)
- :dart: [Hugging Face: Computer Vision Models](https://huggingface.co/models?pipeline_tag=image-classification) -- Browse and try pretrained vision models (Free)

---

## Key Takeaways

- **Convolutions exploit spatial structure**: parameter sharing and local connectivity make CNNs dramatically more efficient than fully connected networks for image data -- the same filter applied everywhere means fewer parameters and better generalization
- **Pooling reduces dimensions, skip connections enable depth**: pooling makes computation manageable, while ResNet's skip connections solved the vanishing gradient problem for very deep networks -- these two innovations made modern CNNs possible
- **Architecture progression teaches principles**: LeNet proved CNNs work, AlexNet proved scale matters, VGG proved small filters win, ResNet proved skip connections enable extreme depth -- understanding *why* each innovation was needed is more valuable than memorizing layer counts
- **Transfer learning is the default practice**: pretrained models fine-tuned on your data almost always outperform training from scratch -- treat ImageNet-pretrained ResNet or EfficientNet as your starting point, not a last resort; feature extraction for small datasets, fine-tuning for larger ones
- **CNNs extend far beyond classification**: object detection (YOLO, Faster R-CNN), semantic segmentation (U-Net, DeepLab), medical imaging, autonomous driving, and video understanding all build on the same convolutional feature extraction -- the specialization is in the output head and loss function, not the backbone

---

**Next up:** [RNNs & Sequence Models](rnns-sequence-models.md) -- how to handle sequential data (text, time series, audio) where order matters and memory is needed, introducing the recurrent architectures that preceded Transformers
