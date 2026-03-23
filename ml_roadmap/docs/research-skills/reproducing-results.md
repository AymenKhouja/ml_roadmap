# Reproducing Results

!!! prerequisite "Before You Start"
    Complete [Reading Papers](reading-papers.md) and [Deep Learning Frameworks](../deep-learning/frameworks.md) before this page. You need paper reading skills to study a paper thoroughly enough to implement it, and you need a working framework (PyTorch or TensorFlow) to build the architecture from scratch. Attempting to reproduce a paper without a solid framework foundation turns every implementation question into two parallel problems -- the paper's logic and the framework's API.

*Total time: ~4-5 hours* | 🔴 Advanced

## Learning Outcomes

By the end of this section, you will:

- Understand why reproduction is the highest-leverage learning activity in ML research
- Follow the concrete reproduction workflow from paper selection through comparison with official results
- Debug the most common failure modes that prevent matching reported numbers
- Reach out to authors productively when you are stuck
- Contribute your reproduction to the community via Papers With Code or the ML Reproducibility Challenge

---

## Why Reproduce

*⏱ ~30 minutes*

Reading a paper gives you a model of how something works -- a mental abstraction of the technique. Reproducing it forces you to confront every detail the authors glossed over, every implementation choice they made but did not explain, every discrepancy between the written description and the working code. The gap between "I understand how this works" and "I can make it work" is where real expertise lives. Reproduction is how you close that gap.

Consider the Transformer. You can read "Attention Is All You Need" and come away with a clear conceptual understanding of scaled dot-product attention, multi-head attention, and positional encoding. But when you try to implement it, you will immediately encounter questions the paper does not answer explicitly: What is the exact masking strategy for padding tokens? What is the warm-up schedule for the learning rate, and is it applied per-step or per-epoch? What weight initialization scheme was used for the attention projections? The paper mentions these in passing or in the appendix, and the answers matter -- using the wrong learning rate schedule can cause training to diverge entirely, making your "implementation" look like it failed even though your architecture is correct.

**The ML reproducibility crisis is real.** A 2019 study found that fewer than 15% of ML papers could be reproduced exactly, even by researchers with access to the original authors' code. Reasons include: missing hyperparameter details, undisclosed data augmentation, training tricks that did not make the paper, and random seed sensitivity in the results. When you attempt to reproduce a paper, you are joining an effort to ground ML as an empirical science. Your reproduction report -- even a negative one where you could not match the numbers -- is valuable information.

**Practical benefits for practitioners:**

- **Builds a portfolio of implementations**: a GitHub repository of paper reproductions is a
  concrete demonstration of ML research skills that a resume cannot adequately convey
- **Surfaces gaps in your own knowledge**: you cannot fake understanding when the code is wrong
  and the results diverge from the paper -- the divergence itself is information
- **Sometimes reveals important context**: papers sometimes report peak performance from extensive
  hyperparameter sweeps that are not disclosed; your reproduction may reveal that the "base"
  performance without tuning is much lower than the paper implies
- **Forces deep reading**: to reproduce, you must achieve third-pass understanding of the paper,
  which transforms passive knowledge into active implementation skill
- **Develops debugging intuition**: the pattern of errors you encounter across multiple papers
  builds a mental model of what commonly goes wrong in ML implementations -- a skill that
  transfers directly to production engineering

**The ML Reproducibility Challenge** (annual event, historically at NeurIPS) provides structured external motivation: you select a paper, attempt to reproduce its results, and submit a report. Accepted reports are published and cited. This turns a personal learning exercise into a community contribution.

!!! tip "Why This Path"
    Most ML learning resources stop at "read the paper and understand the concept." This page argues that reproduction is where real learning happens. The reasoning is empirical: practitioners who have reproduced papers make better engineers. They know which details matter, which hyperparameters are sensitive, and which reported results are robust vs fragile. They are better at debugging novel implementations because they have debugged implementations before against a known target. And they have a concrete portfolio of work that demonstrates practical ML ability beyond academic credentials. Reproduction is expensive -- a paper can take 10-40 hours to reproduce fully -- but the return per hour is higher than almost any other learning activity in ML.

**Selecting paper complexity for your experience level:**

| Level | Starting Paper | Why |
|-------|---------------|-----|
| Beginner | Neural Style Transfer (Gatys 2015) | Pretrained CNN, simple loss, visual results |
| Intermediate | ResNet (He 2016) | Clean architecture, well-documented, widely reproduced |
| Advanced | Transformer (Vaswani 2017) | Many subtle details, reward-to-effort is very high |
| Expert | RLHF (Christiano 2017) | Multi-stage training, reward modeling, policy optimization |

!!! tip "Teaching Moment"
    The counter-intuitive truth about reproduction is that failed reproductions are more valuable than successful ones -- for your learning. When you successfully reproduce a paper, you have confirmed that the method works under the conditions described. When you fail to reproduce it, you learn exactly which implementation details matter, which hyperparameters are sensitive, and what the paper assumes but does not state. These are the lessons that make you a better implementer and a better paper reader. Do not treat a result mismatch as failure. Treat it as the discovery of an implicit assumption or an undisclosed trick. Both outcomes deepen your understanding.

!!! action "What to Do"
    1. 📖 Read about the ML Reproducibility Challenge at [reproducibility-challenge.github.io](https://reproducibility-challenge.github.io/) to understand the structure and motivation
    2. 📖 Read the "Lessons Learned from Reproducing Papers" section of any ML blog post on reproducibility -- search for "paper reproduction blog post ML" to find practitioner accounts
    3. 🎯 Browse [Papers With Code](https://paperswithcode.com/) and look at 2-3 papers with "with code" entries; observe how the community tracks implementations and results
    4. 📖 Read "Reproducibility in Machine Learning" (Pineau et al., 2021) -- a short paper outlining the reproducibility problem and what the community is doing about it

**Resources:**

- 📖 [Pineau et al.: Improving Reproducibility in ML Research](https://arxiv.org/abs/2003.12206) -- overview of the reproducibility challenge and the NeurIPS checklist initiative; explains why reproduction matters scientifically (Free)
- 🎯 [ML Reproducibility Challenge](https://paperswithcode.com/rc2022) -- Annual structured reproduction event; past reports show what realistic reproduction attempts look like (Free)
- 🎯 [Papers With Code](https://paperswithcode.com/) -- Canonical starting point; links papers to code, benchmarks, and community reproductions (Free)
- 📖 [The Morning Paper Blog](https://blog.acolyer.org/) -- Adrian Colyer's systematic paper reading blog; shows what thorough paper analysis looks like (Free)

---

## Reproduction Workflow

*⏱ ~1.5 hours*

A systematic workflow prevents the most common failure mode of reproduction: implementing the wrong thing and only discovering it after days of debugging. Follow these steps in order.

**Step 1: Choose the right paper to start with.** Do not start with the most exciting paper you know. Start with a paper that has: (a) an official code release by the authors, (b) a Papers With Code entry with at least one third-party implementation, and (c) a well-documented training script. Papers from NeurIPS, ICML, and ICLR typically meet these criteria. "A Neural Algorithm of Artistic Style" (Gatys et al., 2015) is excellent for beginners -- simple architecture (no novel layers), clear loss function, and visually verifiable results. "Attention Is All You Need" is an excellent challenge paper for experienced practitioners -- everything is documented, but the implementation details are subtle.

**Step 2: Read the paper thoroughly using the three-pass method.** You must achieve third-pass understanding before writing a line of code. Pay particular attention to: the exact architecture diagram, the training procedure section, the data preprocessing description, the loss function formulation (especially if there are multiple terms with coefficients), and the appendix. Many papers put critical implementation details in the appendix because they ran out of space in the main text.

**Step 3: Find and study the official code.** Go to the paper's GitHub repository (linked from Papers With Code or the paper itself). Read the training script first -- `train.py` or equivalent -- before reading any model definition files. The training script reveals the real optimizer, real learning rate schedule, and real data augmentation that the paper describes only partially. Look at the command used to reproduce the paper's main result (often in a `README` under "reproduce results"). This is the ground truth.

**Step 4: Set up the exact environment.** Check the paper or repository for the Python version, framework version (PyTorch 1.x vs 2.x matters), CUDA version, and specific library versions. Create a conda or virtual environment with exactly these versions. Do not start with your current environment and hope it is compatible -- version mismatches are responsible for more reproduction failures than incorrect implementation.

```bash
# Example: recreate a paper's environment exactly
conda create -n paper-repro python=3.9
conda activate paper-repro
pip install torch==1.12.1+cu116 torchvision==0.13.1+cu116 -f https://download.pytorch.org/whl/torch_stable.html
pip install -r requirements.txt
```

**Step 5: Run the official code first.** Before writing any of your own code, run the official training script with the exact command from the README and verify that you get numbers close to (within 1-2%) the reported results. If you cannot match the official code's results with the official code, there is an environment issue, a data issue, or a random seed issue to resolve first. Do not proceed to your own implementation until the official code runs correctly.

**Step 6: Implement your own version from the paper.** Now write your implementation using only the paper as a reference -- not the official code. When you are stuck on a detail, go back to the paper first, then the appendix, then GitHub issues. Avoid looking at the official code until you have made a genuine attempt with the paper alone. The value of reproduction comes from encountering the ambiguities yourself.

**Step 7: Compare your results to the official results.** Run your implementation on the same dataset, with the same hyperparameters reported in the paper. Compare your numbers to the paper's reported numbers. Differences greater than 1-2% on a standard benchmark are worth investigating. Look at your implementation against the official code to find where they diverge.

!!! tip "Teaching Moment"
    The order matters: run official code first, then implement your own version. This two-step process gives you a verified target. If you implement your own version first and get poor results, you do not know whether the poor results are an implementation bug or a genuine limitation of the technique. With the official code validated first, you know the technique works and any difference in your results points to a specific implementation choice you got wrong. This is the difference between debugging with a known target and debugging without one.

!!! action "What to Do"
    1. 📖 Choose one paper from this list to attempt a reproduction: "Neural Style Transfer" (Gatys et al., 2015) for beginners; "ResNet" (He et al., 2016) for practitioners; "Transformer" (Vaswani et al., 2017) for experienced engineers
    2. 💻 Set up a dedicated conda environment for the paper; install the exact library versions from the paper's repository README before writing any code
    3. 💻 Run the official code and verify that you can match the headline result within 1-2% before starting your own implementation
    4. 💻 Implement the architecture from the paper's description only; make a list of every ambiguity you encounter -- these are the most valuable learning moments in the process

**Resources:**

- 🎯 [Papers With Code](https://paperswithcode.com/) -- Find official and community implementations; the benchmark leaderboard shows what results to target (Free)
- 📖 [Neural Style Transfer Paper](https://arxiv.org/abs/1508.06576) -- Gatys et al. 2015; recommended beginner reproduction target; architecture is CNN-based with a simple perceptual loss (Free)
- 📖 [ResNet Paper](https://arxiv.org/abs/1512.03385) -- He et al. 2016; excellent intermediate target; architecture is clear and widely reproduced (Free)
- 💻 [PyTorch Official Tutorials](https://pytorch.org/tutorials/) -- Framework documentation for implementing paper components; especially useful for custom training loops (Free)
- 🎯 [GitHub: Search `paper-reproduction`](https://github.com/search?q=paper+reproduction&type=repositories) -- Community paper reproductions to study and compare against (Free)

---

## Common Pitfalls and Debugging

*⏱ ~1.5 hours*

Most reproduction failures trace to a small set of well-known issues. Knowing them in advance makes debugging much faster.

**Missing implementation details** are the most common cause of result mismatches. Papers have page
limits and leave many implementation choices implicit. Check these specifically:

- *Batch normalization parameters*: momentum and epsilon values differ between frameworks by default; PyTorch's default `momentum=0.1` and TensorFlow's default `momentum=0.99` are very different and produce different results
- *Weight initialization*: many papers use specific initialization schemes (Kaiming normal, Xavier uniform) that are not mentioned in the main text but appear in the code or appendix
- *Learning rate scheduling*: the paper may say "cosine annealing" without specifying T_max, or "warmup" without specifying the number of warmup steps; these details are often in the code but not the paper
- *Data augmentation order*: if the paper says "random crop and horizontal flip," the order matters; augmentation sequences applied in a different order produce different results

**Hyperparameter sensitivity** is frequently underestimated. ML papers often report results from extensive hyperparameter searches that are not disclosed. The reported hyperparameters are the best values found after the search, not typical values that generalize. Your reproduction should start with the exact hyperparameters reported, not framework defaults. If you cannot match results with the reported hyperparameters, check GitHub issues for the repository -- authors often respond to questions about hyperparameter details.

**Library version differences** are responsible for more reproducibility failures than any other single cause:

- PyTorch 2.0 changed the default behavior of several operations compared to PyTorch 1.x
- NumPy changed random number generation in version 1.17 -- code using `np.random.seed()` may produce different sequences in newer versions
- CUDA and cuDNN versions affect numerical precision; operations that are deterministic on CPU may be non-deterministic on GPU without explicit seeding and `torch.use_deterministic_algorithms(True)`
- Hugging Face Transformers changes default tokenization behavior between versions

**Numerical precision issues** are subtle and environment-specific. Float16 (half precision) training produces different results than float32 for the same model and data. Automatic mixed precision (AMP) changes which operations run in float16 vs float32 and varies between framework versions. When comparing implementations, use float32 for both unless the paper explicitly uses float16.

**Dataset preprocessing differences** are easy to overlook:

- Normalization statistics: using ImageNet statistics (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) vs dataset-specific statistics matters for small datasets
- Train/val/test split strategy: some papers use specific stratification or cross-validation; check whether the official code uses a fixed split or computes it from a seed
- Augmentation at inference time: test-time augmentation (TTA) -- averaging predictions over multiple crops or flips -- is sometimes used to get the reported numbers but not always mentioned clearly

**Undocumented tricks** are the hardest to find. Check these sources in order:

1. The paper's appendix (sometimes omitted from arXiv preprint but present in the final conference
   proceedings version -- check the official proceedings page, not just arXiv)
2. GitHub issues in the official repository -- authors often clarify implementation details in
   responses to reproduction questions; search for "reproduce" or "results" in the issues tab
3. Author response in OpenReview (for ICLR/NeurIPS papers) -- reviewers sometimes ask about
   specific implementation choices and authors respond with details not in the paper
4. The first author's Twitter/X or personal blog, where researchers sometimes post clarifications
   or corrections after publication

!!! tip "Teaching Moment"
    When you are stuck on a result mismatch, the most efficient debugging strategy is binary search on the implementation. Make your implementation identical to the official code -- same dataset loading, same model definition, same training loop -- and verify you get matching results. Then swap out components one by one for your versions, running a few training steps after each swap to see where results diverge. The component that causes divergence when swapped is where your implementation differs from the paper. This is faster than reading code line by line trying to spot the difference.

!!! action "What to Do"
    1. 📖 Before starting a reproduction, write down a checklist of the 6 pitfall categories above and check each one as you set up your environment and implementation
    2. 💻 When results diverge, try explicitly setting all random seeds (`torch.manual_seed(42)`, `numpy.random.seed(42)`, `random.seed(42)`, `torch.cuda.manual_seed_all(42)`) and run both official and your code with the same seeds to isolate non-determinism
    3. 💻 Check the GitHub issues for the official repository -- search for "reproduce" or "mismatch" to find questions from others who hit the same problem
    4. 📖 Read the paper's appendix carefully -- many critical implementation details (learning rate schedules, data augmentation details, initialization schemes) are in the appendix, not the main text

**Resources:**

- 📖 [PyTorch: Reproducibility Guide](https://pytorch.org/docs/stable/notes/randomness.html) -- official documentation on making PyTorch operations deterministic and reproducible (Free)
- 📖 [Dodge et al.: Show Your Work](https://arxiv.org/abs/1909.03004) -- paper arguing for reporting the full hyperparameter search, not just the best result; useful for understanding why reproductions are hard (Free)
- 🎯 [Papers With Code: Methods](https://paperswithcode.com/methods) -- Descriptions of common techniques with notes on implementation details from the community (Free)
- 💻 [TorchMetrics](https://torchmetrics.readthedocs.io/) -- Standardized metric implementations; ensures your evaluation metric matches the paper's exactly (Free)

---

## Contributing Back

*⏱ ~30 minutes*

A completed reproduction, even a partial one, is valuable to the community. Contributing it back turns a personal learning exercise into public knowledge that saves others the same debugging time you spent.

**Opening GitHub issues effectively:** When you find a discrepancy or a missing detail, open a GitHub issue on the official repository. Be specific: describe exactly what you tried, what result you got, what result you expected, your environment details (Python version, framework version, CUDA version), and the exact command you ran. Generic questions like "I cannot reproduce your results" get ignored. Specific questions like "Your README says to use `--lr 1e-3` but with that setting I get 72% accuracy vs the reported 84%; I notice your training script uses a warmup scheduler that is not described in the README -- can you clarify the warmup steps?" get answered.

**Contributing to Papers With Code:** Papers With Code maintains a results table for every benchmark. When you have a working reproduction, you can submit your result as a new entry -- linking to your GitHub repository and noting that it is a community reproduction. The Papers With Code team reviews submissions and adds them to the leaderboard. This creates a permanent record that your implementation works and matches (or explains its divergence from) the paper's numbers.

**Writing a reproduction report:** A good reproduction report includes:

1. Which paper you reproduced and why you chose it
2. Your environment setup (hardware, software versions)
3. What you found in the paper vs what the official code actually does (discrepancies are valuable)
4. Your implementation choices for ambiguous details and why
5. Your results vs the paper's reported results, with a table showing the comparison
6. Analysis of any divergence: where do the numbers differ and what caused it?
7. Time spent and key lessons learned

**The ML Reproducibility Challenge** (annual, associated with NeurIPS) provides a formal venue for reproduction reports. You select an assigned paper, attempt to reproduce it, and submit a report. Accepted reports are published in a proceedings volume and become citable research contributions. This is one of the fastest paths to a publication-quality contribution for practitioners who are not yet writing original research.

**Hugging Face Model Hub** as a platform: if you implement a model architecture from a paper and train it to matching results, sharing it on the Hugging Face Hub makes it available to the entire ML community. The Hub supports model cards (structured documentation) that are an excellent format for documenting what paper the model comes from, what results it achieves, and any implementation notes.

!!! tip "Teaching Moment"
    The community norm in ML is that reproduction reports are a legitimate research contribution, not a lesser form of research. A paper showing that a result can be reproduced -- or documenting that it cannot -- advances the field. The ML Reproducibility Challenge was created precisely to formalize this. If you reproduce a paper and write a clear report of what you found (including any discrepancies), you are doing science. You are testing a claim that was made in the literature and reporting whether the claim holds under independent verification. This is the foundation of empirical science, and it is valuable regardless of whether your result matches the original.

!!! action "What to Do"
    1. 📖 After completing a reproduction, write a 1-2 page report using the structure above; even if you only completed steps 1-5 of the workflow, what you found is worth documenting
    2. 🎯 Submit your result to [Papers With Code](https://paperswithcode.com/contribute) -- add your GitHub repo link and result numbers to the benchmark leaderboard entry for the paper
    3. 📖 Browse past ML Reproducibility Challenge reports at [paperswithcode.com/rc2022](https://paperswithcode.com/rc2022) to see what a complete report looks like and calibrate your own effort
    4. 💻 If you implemented a new model from a paper, consider sharing it on the [Hugging Face Hub](https://huggingface.co/models) with a model card documenting the paper it comes from and how to use it

**Resources:**

- 🎯 [ML Reproducibility Challenge](https://paperswithcode.com/rc2022) -- Annual community event for structured reproductions; accepted reports are published (Free)
- 🎯 [Papers With Code: Contribute](https://paperswithcode.com/contribute) -- Submit your reproduction result to the community benchmark tracker (Free)
- 💻 [Hugging Face Hub](https://huggingface.co/docs/hub/index) -- Platform for sharing model implementations; model cards provide the documentation structure for a reproduction report (Free)
- 📖 [Pineau et al.: ML Reproducibility Checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf) -- The NeurIPS reproducibility checklist; filling this out for your reproduction ensures you document everything that matters (Free)

---

## Key Takeaways

- **Reproduction deepens understanding beyond reading**: every ambiguity in a paper becomes a
  concrete problem you must solve; the debugging process is where real ML expertise is built;
  failed reproductions teach more than successful ones
- **Follow the workflow in order**: run official code first to verify the technique works, then
  implement your own version from the paper alone -- this gives you a verified target for debugging
  and prevents the "is it the technique or my code?" confusion
- **Know the six pitfall categories**: missing implementation details, hyperparameter sensitivity,
  library version differences, numerical precision, dataset preprocessing, and undocumented tricks
  account for the vast majority of reproduction failures; check all six before concluding failure
- **Start with the right paper**: beginners should choose papers with official code and visual
  results; experienced practitioners should choose foundational papers that reward the time
  investment with deep understanding of widely-used techniques
- **Partial reproductions are still valuable**: if you cannot match the full result, documenting
  what you found and where results diverged is a genuine contribution to the community
- **Contribute back**: submit results to Papers With Code, open specific GitHub issues, write a
  reproduction report -- your work benefits every practitioner who reads that paper after you

---

---

**Next up:** [Staying Current](staying-current.md) -- building a sustainable system for tracking
ML developments, from curating your information feed to balancing deep-dive reading against
broad awareness of a rapidly evolving field
