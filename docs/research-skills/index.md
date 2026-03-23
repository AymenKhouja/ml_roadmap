# Research Skills

!!! prerequisite "Before You Start"
    Complete the [Core ML](../core-ml/index.md) section before starting here. You need
    familiarity with ML concepts -- supervised learning, model evaluation, and neural network
    fundamentals -- to read ML papers meaningfully. Reading a paper about attention mechanisms
    is significantly harder if you have never encountered sequence-to-sequence models. At minimum,
    review [Neural Network Fundamentals](../deep-learning/neural-network-fundamentals.md) before
    attempting any deep-dive reads on deep learning papers.

*Total time: ~9-12 hours* | :yellow_circle: Intermediate

## Why Research Skills?

ML evolves faster than any other engineering discipline -- the gap between "what textbooks teach"
and "what practitioners use" is measured in months, not years. The Transformer architecture
appeared in June 2017 and was textbook material by 2020, but practitioners were building production
NLP systems on it by 2018. If you only learn from textbooks and courses, you will always be
2-3 years behind the state of the art. Papers are the primary source of ML knowledge -- and
reading them is a learnable skill, not an innate talent.

Research literacy is not just for researchers. It is the skill that separates ML engineers who
can implement new techniques from those who wait for them to appear in Keras or scikit-learn.
Reading the original BERT paper, reproducing the training loop, understanding why bidirectional
pretraining works -- this is what makes architectural decisions legible rather than magical.
When a new architecture is published that would benefit your team's work, the engineer who can
read, understand, and prototype it in two weeks is irreplaceable. That capability does not come
from knowing more APIs; it comes from being able to read the source.

The research skills section teaches three complementary processes: how to read papers efficiently
and critically, how to implement them to transform reading comprehension into practical skill,
and how to stay current without being overwhelmed. Together, these complete the transition from
"understands ML" to "can grow with ML" -- from learning what others have built to contributing
to what gets built next.

!!! tip "Why This Path"
    Keshav's three-pass method (the canonical academic reference for reading papers), Andrew Ng's
    practical advice (reading a paper a day for two months to systematically enter a new field),
    and the ML Reproducibility Challenge (a NeurIPS community-endorsed practice of structured
    paper reproduction) all converge on the same core skills taught in this section. Most ML
    courses stop at model evaluation -- this section picks up where they leave off. The research
    skills here are not taught because they are academically interesting; they are taught because
    practitioners who have them consistently outperform those who do not, and the gap compounds
    over a career.

## Section Overview

| Topic | Time | Difficulty | What You'll Learn |
|-------|------|-----------|-------------------|
| [Reading Papers](reading-papers.md) | ~3-4 hrs | :yellow_circle: Intermediate | Three-pass method, critical evaluation, building a reading workflow |
| [Reproducing Results](reproducing-results.md) | ~4-5 hrs | :red_circle: Advanced | Reproduction workflow, common pitfalls, contributing back to the community |
| [Staying Current](staying-current.md) | ~2-3 hrs | :yellow_circle: Beginner-Intermediate | Publication landscape, curating an information feed, community engagement |

## Recommended Order

**Reading Papers first** -- it is the foundational process that the other two pages build on.
You cannot reproduce a paper without reading it, and you cannot evaluate your information feed
without knowing what a good paper looks like. The three-pass method and critical evaluation
framework from Reading Papers are explicitly referenced in both subsequent pages.

**Reproducing Results second** -- it builds directly on paper reading skills and requires a
working framework (PyTorch or TensorFlow) from the Deep Learning section. Reproduction is where
the transition from reading comprehension to practical skill happens. You need to have achieved
at least second-pass understanding of a paper before attempting to implement it, so the reading
workflow must come first.

**Staying Current third** -- it is the ongoing maintenance skill: how to keep your knowledge
current after you have the paper reading and implementation foundations in place. This order
mirrors the career arc: learn to read papers well, learn to implement them deeply, then build
the sustainable system for staying current as the field moves forward. Staying Current can also
be read early in the section as motivational framing -- understanding where ML knowledge comes
from (arXiv, conferences, industry blogs) gives useful context for why the reading and
reproduction skills matter. But the action items in Staying Current are more valuable once
you have the reading workflow in place.

!!! info "Progress Tracking"
    Your progress is saved in your browser. Check off action items as you complete them -- your
    checkmarks persist across sessions using localStorage.
