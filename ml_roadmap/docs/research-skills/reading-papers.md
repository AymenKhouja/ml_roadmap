# Reading Papers

!!! prerequisite "Before You Start"
    Complete the [Core ML](../core-ml/index.md) section before this page. You need familiarity with ML concepts -- supervised learning, model evaluation, neural networks -- to understand the papers that discuss them. Reading a paper about attention mechanisms is much harder if you have never encountered sequence-to-sequence models. You should also have completed at least the [Neural Network Fundamentals](../deep-learning/neural-network-fundamentals.md) page before attempting third-pass reads on deep learning papers.

*Total time: ~3-4 hours* | 🟡 Intermediate

## Learning Outcomes

By the end of this section, you will:

- Apply the three-pass method to read any ML paper efficiently and stop at the right depth
- Identify the key contributions of a paper in under 10 minutes using the first pass
- Evaluate experimental methodology and spot common weaknesses before trusting results
- Build a sustainable reading workflow you can maintain over months and years
- Know which landmark papers to start with as a practitioner new to reading research

---

## Why Read Papers

*⏱ ~30 minutes*

Textbooks are excellent, but they are always behind. The time from research breakthrough to textbook chapter is typically 2-5 years. In ML, where the field moves faster than any other area of computer science, that lag means textbooks describe the landscape as it existed years ago. The Transformer architecture was published in 2017. Comprehensive textbook chapters on attention and self-attention appeared in 2020-2021 at the earliest. If you had only read textbooks in 2018, you would have known nothing about the technique that now underlies virtually every state-of-the-art NLP system.

Papers are the primary source of ML knowledge. When a technique appears in a framework, when a tool adds a new feature, when a benchmark gets a new state-of-the-art result -- there is a paper behind it. Reading that paper tells you not just what the technique does, but why it was designed that way, what it was tested against, and what the authors themselves believe its limitations are. Reading the API documentation for PyTorch's `nn.MultiheadAttention` gives you the interface. Reading "Attention Is All You Need" (Vaswani et al., 2017) gives you the design reasoning, the alternatives they considered, and the specific experiments that ruled out other approaches.

Career differentiation is real. Engineers who can read papers and implement techniques from scratch occupy a different tier from those who only use existing APIs. When a new architecture gets published that would genuinely benefit your team's work, the engineer who can read, understand, and prototype it in two weeks is invaluable. That skill is not an innate talent -- it is a learned process. Most researchers learned to read papers slowly and inefficiently before discovering structured approaches. This page teaches the process directly.

**Three papers every ML practitioner should know:**

- **"Attention Is All You Need"** (Vaswani et al., 2017) -- introduced the Transformer; the most
  influential ML paper of the last decade; practically everything interesting in NLP and many areas
  of computer vision now derives from this architecture
- **"BERT: Pre-training of Deep Bidirectional Transformers"** (Devlin et al., 2018) -- established
  bidirectional pretraining and fine-tuning as the dominant NLP paradigm; reading this paper
  demystifies why BERT embeddings are "context-aware" in a way that word2vec is not
- **"Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift"**
  (Ioffe and Szegedy, 2015) -- one of the most practically impactful techniques in deep learning;
  reading it explains exactly why training deep networks stabilized so dramatically in 2015

These are not assigned reading right now -- they are the destination. The goal of this page is to give you the method to read them (and any paper) effectively, so when you encounter them you have the tools to extract maximum value.

Understanding papers also changes your relationship with the tools you use every day. When you call `model.fit()`, you are invoking a gradient descent algorithm described in papers by Kingma, Ba, and others. When you use dropout for regularization, you are applying a technique from a 2014 paper that ran extensive experiments showing why it works. When you add batch normalization to a network, you are using an approach that Ioffe and Szegedy introduced after experimenting with alternatives. Knowing the papers gives you the why, not just the what.

!!! tip "Why This Path"
    Most ML learning resources skip paper reading entirely, treating it as something you pick up on your own or something only researchers need. This is a mistake for two reasons. First, the gap between what textbooks and courses cover and what top practitioners actually use is filled by papers. Second, reading papers is a skill with a well-known learning curve -- the first 5 papers are hard, the next 10 are easier, and by the time you have read 20 papers you have a mental model of how ML papers are structured that makes every subsequent paper faster to read. Teaching this skill explicitly dramatically accelerates the curve. Keshav's three-pass method and the critical evaluation framework on this page are what experienced ML researchers do intuitively after years of practice -- teaching them explicitly means you can start doing them deliberately from your first paper.

!!! tip "Teaching Moment"
    The reason to read papers is not to accumulate knowledge -- it is to understand why things work. Every production ML engineer eventually hits a situation where a standard technique fails and they do not know why. The engineers who can read the original paper, understand the assumptions the technique makes, and diagnose which assumption is violated are the engineers who solve those problems. The ones who only know the API move on and try another technique. Reading papers is not academic exercise -- it is the debugging skill that comes before all other debugging skills. When batch normalization fails to help your model, the engineer who has read the paper understands it assumes the statistics are consistent across the batch -- and can diagnose that your batch size of 4 is too small to get reliable statistics.

!!! action "What to Do"
    1. 📖 Read Keshav's "How to Read a Paper" (2007) -- free online; the three-pass method comes from this three-page paper and reading it takes 15 minutes; do this before reading any other paper
    2. 🎥 Watch Andrew Ng's "How to Read Research Papers" (Stanford CS230, on YouTube) for ML-specific practical advice and how he builds and manages his reading list
    3. 📖 Read the abstract and introduction of "Attention Is All You Need" -- just these two sections, nothing else; observe what information they contain and how the paper signals its contribution
    4. 📖 Read the "Introduction" section of the Batch Normalization paper; notice that the introduction sets up the problem (internal covariate shift), the gap in existing approaches, and a summary of the contribution in the final paragraph

**Resources:**

- 📖 [Keshav: How to Read a Paper](https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf) -- The canonical three-pass method in three pages; required reading before any other paper reading advice (Free)
- 🎥 [Andrew Ng: How to Read Research Papers](https://www.youtube.com/watch?v=733m6qBH-jI) -- Stanford CS230 lecture on building a reading practice; includes advice on breadth vs depth and managing a reading list (Free)
- 📖 [Attention Is All You Need](https://arxiv.org/abs/1706.03762) -- Vaswani et al. 2017; the Transformer paper; your first benchmark for applying the first-pass method (Free)
- 🎯 [Semantic Scholar](https://www.semanticscholar.org/) -- AI-powered research tool; citation graphs, related papers, and one-click access to free PDFs for most papers (Free)
- 🎯 [Connected Papers](https://www.connectedpapers.com/) -- Visual paper graph showing how papers relate to each other; excellent for exploring a new subfield or tracing the lineage of an idea (Free)

---

## The Three-Pass Method

*⏱ ~1 hour*

The single biggest mistake new paper readers make is starting on page one and reading to the end sequentially. This approach is slow, exhausting, and inefficient. Most papers contain large sections -- proofs, appendices, implementation details for baselines you do not care about -- that are not relevant to your goal. The three-pass method (Keshav, 2007) is a structured approach that lets you decide how deeply to engage with a paper before committing the time. It treats reading as a series of deliberate decisions rather than a passive activity.

**First pass (5-10 minutes):** Read only the title, abstract, introduction, and conclusions. Skim the section headings and glance at any figures or tables to understand their general shape -- you are not reading them yet. Do not read the body sections. The goal of the first pass is to answer one question: is this paper relevant to what I am trying to learn or build? After the first pass, you should know the problem the paper addresses, the high-level approach, and the claimed results. If the paper is not relevant, you stop here. If the paper is related but not central to your current work, you stop here and may return later. Most papers in a literature survey end at the first pass.

**Second pass (30-60 minutes):** Read the paper more carefully but skip mathematical proofs, derivations, and highly technical implementation subsections. Focus on figures, tables, and the results section -- figures and tables carry most of the information in well-written ML papers. Read the related work section to understand how the authors position their work against prior art. Read the introduction a second time now that you have the context of the full paper. The goal of the second pass is to answer: what do they actually claim to have done, and does the evidence support it? After the second pass, you should be able to write a three-sentence summary from memory: the problem, the approach, and the main result. If you cannot, you need to re-read.

**Third pass (2-4 hours):** Read every word, every figure, every appendix, every equation. Understand every technical detail well enough that you could reproduce the paper without additional information. Question every assumption. Try to identify alternative explanations for the results. Identify every place where the authors made a choice -- an architectural decision, a loss function, a training procedure -- and ask why they made that choice rather than an alternative. This is the pass that gives you implementation knowledge.

Most papers only need the first or second pass. A paper becomes a third-pass paper when you need to implement the technique, when you are writing research that builds on it, or when you are making a production decision about whether to adopt it. Doing a third pass on every paper you read is not sustainable and not necessary.

The three passes can be summarized this way:

| Pass | Time | Read | Goal | Output |
|------|------|------|------|--------|
| First | 5-10 min | Abstract, intro, conclusions, headings | Is this relevant? | Yes/No decision |
| Second | 30-60 min | Figures, tables, results, related work | What do they claim? | 3-sentence summary |
| Third | 2-4 hrs | Everything, every word | Could I reproduce this? | Implementation understanding |

**Papers to practice the three passes on:**

- **First pass practice:** "GPT-4 Technical Report" (OpenAI, 2023) -- set a timer for 10 minutes, extract what you can from abstract, introduction, and conclusions; you will find the high-level claims without getting lost in the fine-tuning details
- **Second pass practice:** "An Image is Worth 16x16 Words" (Dosovitskiy et al., 2020) -- the ViT paper; its figures and tables communicate the main findings clearly without reading the methods section
- **Third pass practice:** "Batch Normalization" (Ioffe and Szegedy, 2015) -- short enough (11 pages) to read fully in one session but technical enough to reward close reading; every practitioner uses batch norm and should understand it at source

!!! tip "Teaching Moment"
    The third pass is the real learning pass. Tutorials and YouTube explanations are summaries written by someone else who has already interpreted the paper for you. When you read the paper itself, you encounter the authors' actual reasoning -- including the things they tried that did not work, the tradeoffs they considered and rejected, and the assumptions that may not hold in your application. When you watch a Transformer tutorial, the presenter explains multi-head attention as if it were an obvious design choice. When you read the original paper, you see Vaswani et al. justifying why they use multiple heads (each head can attend to different positions), explaining the scaling factor in dot-product attention (prevents gradients from becoming too small in high dimensions), and showing ablations that ruled out alternatives. That is the explanation worth having -- the one with the reasoning, not just the conclusion.

!!! action "What to Do"
    1. 📖 Do a first pass on "Attention Is All You Need" right now -- title, abstract, introduction, conclusions, section headings only; set a timer for 10 minutes and stop when it goes off
    2. 📖 Do a second pass on the same paper or on "BERT" -- focus on figures, the main results table, and the related work section; aim for 45-60 minutes
    3. 💻 After any second-pass read, immediately write a 3-sentence summary from memory: (1) what problem they solved, (2) how they solved it, (3) what the main result was; store this in Zotero or a text file
    4. 📖 When ready for a third pass, choose "Batch Normalization" (Ioffe and Szegedy, 2015) -- 11 pages, foundational technique you use constantly, reward-to-effort ratio is very high

**Resources:**

- 📖 [Keshav: How to Read a Paper](https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf) -- the original source for the three-pass method; re-read it after you have tried the method once to appreciate how precisely Keshav describes the process (Free)
- 🎥 [Yannic Kilcher: Paper Reading Channel](https://www.youtube.com/c/YannicKilcher) -- ML researcher who reads papers live on YouTube; watching his process shows what expert third-pass reading looks like in practice (Free)
- 📖 [BERT Paper](https://arxiv.org/abs/1810.04805) -- Devlin et al. 2018; clean writing and clear figures make it a good second-pass exercise; the introduction is one of the best-structured in recent ML literature (Free)
- 📖 [Batch Normalization Paper](https://arxiv.org/abs/1502.03167) -- Ioffe and Szegedy 2015; a good third-pass exercise; short enough to read fully but technical enough to reward the investment (Free)
- 📖 [ViT Paper: An Image is Worth 16x16 Words](https://arxiv.org/abs/2010.11929) -- Dosovitskiy et al. 2020; good second-pass practice; the figures and ablation tables communicate the key findings without requiring the methods section (Free)

---

## Critical Evaluation

*⏱ ~1 hour*

Reading a paper is not the same as believing it. ML research has well-documented problems with reproducibility, cherry-picked baselines, and results that do not generalize outside the specific benchmark used. A 2019 study found that fewer than 15% of ML papers could be reproduced exactly, even with the original authors' code. Critical evaluation is the skill of reading a paper while simultaneously asking: how much should I trust this?

**Identifying key contributions:** Every paper claims several things, but usually advances the field in 1-2 specific ways. The key contribution is what would be missing from the literature if this paper were never published. Learn to separate the core contribution from the engineering effort around it. A new architecture is a contribution. Running it on six benchmarks is experimental validation, not an additional contribution. A new training procedure is a contribution. Achieving state-of-the-art on ImageNet is a result, not the contribution itself. Ask: if I had to describe what this paper adds to human knowledge in one sentence, what would that sentence be? If you cannot answer this after the second pass, the paper may be obscuring its contribution.

**Evaluating experimental methodology:** The most important questions for any ML paper are: Are the baselines appropriate? A paper that compares to a baseline from three years ago when competitive contemporaries exist is not a fair comparison -- check Papers With Code to see the state-of-the-art at publication time. Are the datasets standard? Results on a proprietary or curated dataset are harder to interpret than results on ImageNet, GLUE, or COCO. Do the ablation studies justify the design choices? A paper that proposes three new components but only shows results with all three and none individually leaves open the question of which component actually mattered. Are the evaluation metrics standard? Inventing a new metric that your method happens to excel on while avoiding standard metrics is a significant red flag.

**Common weaknesses to watch for:**

- **Missing baselines:** A new method compared only to methods the authors chose, not to the best available alternatives at publication time
- **Benchmark overfitting:** Strong results on one benchmark but no evaluation on others; may indicate the method was tuned to that specific benchmark's quirks
- **Cherry-picked qualitative examples:** Papers showing the model's best outputs without failure case analysis; honest papers include examples of where the model fails
- **No statistical significance:** Single-run results without standard deviations across multiple random seeds; especially concerning for results that barely exceed a baseline by 0.1-0.3% on standard metrics
- **Missing implementation details:** Vague descriptions of hyperparameter choices, learning rate schedules, or data augmentation strategies that prevent independent reproduction
- **Evaluation-train contamination:** Test sets used during development, or pre-training data that overlaps with evaluation benchmarks -- particularly common in large language model papers

A useful heuristic: the confidence you should have in a result is roughly proportional to the number of independent variables the authors controlled. A paper that shows the same technique working on five different datasets with five different baselines using four random seeds gives you much more confidence than a paper with one dataset, two baselines, and one seed -- even if both papers report "state-of-the-art."

**OpenReview.net** is one of the most underused resources in ML. NeurIPS, ICLR, and many top conferences use OpenReview for peer review, and the reviews are publicly visible. Reading the peer reviews of a paper teaches you what experts found weak about the paper -- reviewers often identify the missing baselines, flawed comparisons, and unsupported claims that you would otherwise miss as a non-expert reader. The author responses to reviews are equally valuable: authors defend their choices, and sometimes the defense is unconvincing, which tells you something about how much to trust the result.

The difference between an "interesting result" and a "reliable result" is the difference between a paper you find exciting at a conference and a paper you build production systems on. A result is interesting when it shows a technique can work under favorable conditions. A result is reliable when it includes thorough ablations, multiple competitive baselines, multiple datasets, statistical significance over multiple runs, and ideally an independent reproduction. When deciding whether to invest engineering effort implementing a paper, ask which category it falls into.

!!! tip "Teaching Moment"
    Reading peer reviews before reading the paper body is one of the highest-leverage habits you can build. Go to OpenReview.net, find the submission for any paper you want to read, and read all three or four reviewer comments first. You will arrive at the paper already knowing what the expert community found weak or unconvincing -- and you will be primed to look for those specific things as you read. This does not make you biased against the paper; it makes you a more efficient and accurate evaluator. Reviewers have already done the critical reading work for you. Use it.

!!! action "What to Do"
    1. 🎯 Go to [OpenReview.net](https://openreview.net/) and find the reviews for a paper you have recently read using second-pass method -- read all reviewer comments before re-reading the paper body
    2. 📖 For the next paper you read, write down explicitly: (1) the key contribution in one sentence, (2) the three most important baselines compared against, (3) one potential weakness in the experimental design
    3. 🎯 Look up the paper on [Papers With Code](https://paperswithcode.com/) and check the benchmark leaderboard -- was the paper actually SOTA at publication, or did it omit competitors that were already stronger?
    4. 📖 Read the "Limitations" or "Discussion" section of the next paper you read; its presence (and honesty) is itself a signal of paper quality

**Resources:**

- 🎯 [OpenReview.net](https://openreview.net/) -- Peer reviews for ICLR, NeurIPS, and other top venues; reading reviews teaches critical evaluation faster than reading 10 additional papers (Free)
- 🎯 [Papers With Code: State of the Art](https://paperswithcode.com/sota) -- Benchmark leaderboards for hundreds of tasks; the ground truth for whether a paper's results are actually competitive (Free)
- 📖 [NeurIPS 2021 Paper Checklist](https://neurips.cc/public/guides/PaperChecklist) -- The self-assessment checklist top conferences require authors to complete; reading it tells you exactly what reviewers look for (Free)
- 🎥 [Yannic Kilcher: Critical Paper Reviews](https://www.youtube.com/c/YannicKilcher) -- Watch how an expert reads skeptically; Kilcher's GPT-4 and DALL-E reviews are good starting examples (Free)
- 📖 [Sculley et al.: Technical Debt in ML Systems](https://research.google/pubs/machine-learning-the-high-interest-credit-card-of-technical-debt/) -- Google paper on what goes wrong in production ML; a good critical reading exercise about a topic you care about as a practitioner (Free)

---

## Building a Reading Workflow

*⏱ ~30 minutes*

The three-pass method is the micro-level skill -- how to read any individual paper well. A reading workflow is the macro-level system -- how you sustain reading over weeks and months without burning out or losing track of what you have learned. Most practitioners who "try to read more papers" fail not because of skill but because of system. They have no capture tool, no summary habit, and no cadence. Papers accumulate unread in browser tabs until the tab group is closed and lost.

**Tools for organizing papers:**

- **Zotero** (free, open-source) -- the most popular academic reference manager; browser extension that captures papers from arXiv, Semantic Scholar, or any journal page in one click; syncs across devices; built-in PDF reader with annotation and highlighting support; recommended for most practitioners as the starting point
- **Mendeley** (free, owned by Elsevier) -- similar to Zotero with slightly better group library features; owned by a large publisher which some researchers prefer to avoid for philosophical reasons
- **Paperpile** (paid, ~$36/year) -- deep Google Docs integration and an excellent mobile app; the preferred choice if you write in Google Docs regularly and want seamless citation insertion

**Annotation strategies that work:** Highlight the problem statement in the abstract. Highlight the single sentence in the introduction that states the key contribution. Highlight the best row in the main results table (the paper's headline number). Write a 3-sentence summary immediately after reading -- problem, approach, result -- in your own words, not copy-pasted from the abstract. Writing the summary while the paper is fresh takes 5 minutes and saves you from re-reading the paper six months later when you want to reference it in a conversation or a report.

**Reading groups for accountability:** Solo paper reading is difficult to sustain because there is no external accountability. A reading group of 2-5 people meeting weekly, with one person presenting a paper they read that week, dramatically increases consistency. The presenter is forced to achieve at least second-pass understanding and to synthesize the paper for others, which is one of the best ways to expose gaps in your own understanding. Discussions surface questions and critiques that solo reading misses. If you do not have colleagues, the ML subreddit (r/MachineLearning), Papers We Love (paperswelove.org), and various Discord communities run informal reading groups open to practitioners.

**Sustainable pace -- the real numbers:** For a practitioner (not a researcher whose job is reading papers), 2-3 papers per week is high-value and realistic. This means roughly 1-2 first-pass reads and 1 second-pass read per week -- about 2-3 hours total per week. Committing to reading 10 papers per week is a recipe for reading nothing at all after the first month. Start with 1 paper per week, build the habit first, and increase pace only once the habit is stable. Two papers read thoroughly with summaries written is worth more than twenty papers skimmed.

**Just-in-time reading:** The most sustainable approach for practitioners is not proactive reading -- building a general library of knowledge about topics you might one day need. It is reactive reading: read when you encounter a technique at work, read the paper for the algorithm when you implement it, do a first pass when a colleague references something you have not heard of, do a third pass when you need to implement or extend it. Just-in-time reading keeps motivation high because every paper you read is immediately applicable.

**How to find papers to read:** When a new technique appears in a blog post or tutorial, look for the paper it cites. Use Google Scholar or Semantic Scholar to search for the technique name. When you implement something from a library, check the library documentation for the paper reference (PyTorch, scikit-learn, and Hugging Face all cite their papers). When a colleague mentions a technique, ask for the paper name and do a first-pass read that week.

**Starting papers for practitioners new to reading research:**

1. **"Batch Normalization"** (Ioffe & Szegedy, 2015) -- 11 pages, clearly written, a technique you
   have almost certainly used; great first third-pass experience because you can verify your
   understanding against what you already know about the technique's behavior
2. **"Dropout: A Simple Way to Prevent Neural Networks from Overfitting"** (Srivastava et al., 2014)
   -- 19 pages but most are experiments; the core idea is simple and the writing is accessible;
   useful because dropout is everywhere and the paper is unusually well-written for practitioners
3. **"Adam: A Method for Stochastic Optimization"** (Kingma & Ba, 2015) -- 9 pages, you use Adam
   every day; understanding the first and second moment estimation derivation demystifies why
   `beta1=0.9, beta2=0.999` are the defaults

**A simple paper tracking template** you can use in Zotero notes or a text file:

```
Paper: [Title]
Authors: [Author list, year]
Venue: [NeurIPS/ICML/arXiv/etc.]
Date read: [YYYY-MM-DD]
Pass completed: [First / Second / Third]

Problem: [One sentence -- what gap does this paper address?]
Approach: [One sentence -- what is the core technique or contribution?]
Result: [One sentence -- what is the headline finding?]

Key strength: [What makes this paper convincing?]
Key weakness: [What would make you more confident in the result?]
Would implement: [Yes / No / Maybe -- and why]
```

This template takes 5-10 minutes to fill out after a second-pass read. After 20 papers, you have a
searchable knowledge base of what you have read and what you thought of it.

!!! tip "Teaching Moment"
    The trap most new paper readers fall into is reading too broadly too early. They collect papers into Zotero, plan to "read them later," and end up with a library of 500 papers they have never opened. The reading workflow that actually works is narrow and deep: pick one topic you are actively working on, read 3-5 highly cited papers in that topic over a month, write summaries for each, and move to the next topic when you feel solid. You will learn more from 5 papers read with written summaries than from 50 papers skimmed without retention. The library does not make you smarter -- the summaries do. Every summary you write is retrievable knowledge; every paper you skim and move past is not.

!!! action "What to Do"
    1. 💻 Install Zotero (free at zotero.org) and the browser extension -- capture the next paper you read by clicking the extension icon; add a one-sentence note explaining why you are reading it
    2. 📖 After your next paper reading session, write a 3-sentence summary immediately (problem, approach, result) and save it as a Zotero note or in a plain text file you keep for this purpose
    3. 💻 Set a recurring weekly calendar block of 60-90 minutes labeled "paper reading" -- treat it as a committed meeting; consistent scheduling beats occasional long sessions for building the habit
    4. 📖 Read one of the three starter papers listed above (Batch Normalization, Dropout, or Adam) using the three-pass method; aim for the second or third pass depending on how familiar you already are with the technique

**Resources:**

- 🎯 [Zotero](https://www.zotero.org/) -- Free, open-source reference manager; the recommended starting tool for capturing, organizing, and annotating papers (Free)
- 🎯 [Semantic Scholar](https://www.semanticscholar.org/) -- Search and organize papers; includes citation network visualization, alerts for new papers citing your saved papers, and AI-generated summaries (Free)
- 🎯 [arXiv Sanity Preserver](http://arxiv-sanity-lite.com/) -- Filters the arXiv daily ML paper flood by your reading history and interests; substantially reduces signal-to-noise for discovering relevant new work (Free)
- 🎯 [Papers With Code](https://paperswithcode.com/) -- Every paper linked to its code and benchmark results; the starting point for finding what to read in any ML subfield (Free)
- 📖 [Batch Normalization Paper](https://arxiv.org/abs/1502.03167) -- Ioffe & Szegedy 2015; recommended first third-pass paper for practitioners; short, foundational, immediately applicable (Free)
- 📖 [Adam Optimizer Paper](https://arxiv.org/abs/1412.6980) -- Kingma & Ba 2015; 9 pages; demystifies the optimizer you use in every training run (Free)
- 📖 [Dropout Paper](https://jmlr.org/papers/v15/srivastava14a.html) -- Srivastava et al. 2014; accessible writing style; good for understanding regularization at the source (Free)

---

## Key Takeaways

- **Papers are the primary source**: textbooks lag 2-5 years behind research frontiers; reading
  papers is the only way to understand new techniques at the level of design reasoning, not just
  API documentation
- **The three-pass method saves time**: first pass (5-10 min, is it relevant?), second pass
  (30-60 min, what do they claim?), third pass (2-4 hrs, could I reproduce this?); most papers
  only need the first or second pass -- stop early deliberately
- **Critical evaluation requires active skepticism**: identify the 1-2 key contributions, check
  whether baselines are competitive, look for ablations justifying design choices; read peer
  reviews on OpenReview.net to calibrate your evaluation against expert opinion
- **Sustainable beats intensive**: 2-3 papers per week with written summaries beats reading binges
  followed by months of nothing; just-in-time reading keeps every paper immediately applicable
- **Start with known quantities**: read papers for techniques you already use (Batch Norm, Dropout,
  Adam) to lower the barrier; you can verify understanding against your existing practical knowledge

---

**Next up:** [Reproducing Results](reproducing-results.md) -- from reading papers to implementing them, including the concrete step-by-step reproduction workflow, common pitfalls in matching reported numbers, and how to contribute reproductions back to the community
