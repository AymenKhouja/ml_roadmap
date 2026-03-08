---
phase: 07-deep-learning-content
plan: 02
status: complete
duration: 8min
started: 2026-03-08T19:00:00Z
completed: 2026-03-08T19:08:00Z
---

# Plan 07-02 Summary: RNNs & Sequence Models + Transformers & Attention

## What Was Built

Two complete deep learning content pages maintaining the narrative arc from RNN limitations to Transformer motivation:

1. **RNNs & Sequence Models** (282 lines) -- 5 sub-topics covering sequence data motivation, vanilla RNNs with vanishing gradient problem, LSTMs and GRUs with gate equations in LaTeX, sequence-to-sequence models with context vector bottleneck, and historical context/limitations. The vanishing gradient problem and seq2seq bottleneck are explicitly framed as the motivation for attention and Transformers.

2. **Transformers & Attention** (351 lines) -- 6 sub-topics covering the attention mechanism, self-attention with scaled dot-product formula, BERT and encoder models, GPT and decoder models, modern LLMs and the current landscape, and Transformers beyond NLP. This is the most detailed page in the deep learning section as planned. Includes the full attention formula, multi-head attention, and positional encoding formulas.

## Key Decisions

- Transformers page has 6 sub-topics (not 5) as it is the most important page in the section
- LLM landscape framed as "rapidly evolving" per research pitfall 5 -- no model benchmarks or capability comparisons
- RLHF covered at awareness level with explanation of base vs aligned models
- ViT, CLIP, and diffusion models mentioned in beyond-NLP section
- State-space models (Mamba) mentioned as emerging alternative to Transformers
- Model type comparison table (encoder-only, decoder-only, encoder-decoder) added

## Self-Check: PASSED

All verification checks pass:
- Both pages meet minimum line counts (282, 351)
- All template elements present
- Narrative arc maintained: vanishing gradients -> gating -> bottleneck -> attention -> Transformers
- Transformers page is the longest in the section
- No content tabs used (reserved for frameworks.md)
- No specific model benchmarks or capability comparisons

## Key Files

### key-files.created
- docs/deep-learning/rnns-sequence-models.md
- docs/deep-learning/transformers-attention.md

### key-files.modified
(none)

## Tasks Completed

| # | Task | Status |
|---|------|--------|
| 1 | Write RNNs & Sequence Models page | Done |
| 2 | Write Transformers & Attention page | Done |
