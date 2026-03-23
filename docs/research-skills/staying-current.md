# Staying Current

!!! prerequisite "Before You Start"
    Complete [Reading Papers](reading-papers.md) before this page -- you need to know how to
    read a paper before knowing which papers to follow. Having a reference management system
    (Zotero or equivalent) set up before you start also makes the feed-curation actions on this
    page immediately actionable rather than theoretical.

*Total time: ~2-3 hours* | :yellow_circle: Beginner-Intermediate

## Learning Outcomes

By the end of this section, you will:

- Understand the ML publication landscape and how to locate papers at the right credibility tier
- Set up a sustainable information feed that surfaces important developments without 4 hours of daily reading
- Distinguish when to do a deep-dive read versus a broad awareness scan
- Find community resources for accountability, networking, and staying motivated over the long term

---

## The ML Publication Landscape

*⏱ ~30 minutes*

ML evolves faster than any other area of computer science -- faster, arguably, than any engineering
discipline in history. The Transformer architecture was published in June 2017. By the end of 2018,
practitioners were building production NLP systems on it. Textbook chapters covering Transformers
appeared in 2020-2021, three years after the paper. If you rely solely on textbooks and structured
courses, you will always be 2-3 years behind the techniques that practitioners actually use.

This is not a reason to panic -- it is a reason to understand the publishing ecosystem. Once you
know where research appears and in what order, you can make informed choices about where to pay
attention and how much credibility to assign to what you read.

**Three tiers of ML publication:**

**Tier 1 -- Preprints (arXiv):** Most ML research appears first on arXiv (arxiv.org), typically
months before formal peer review. The relevant categories are cs.LG (Machine Learning), cs.AI
(Artificial Intelligence), stat.ML (Statistics - Machine Learning), cs.CV (Computer Vision), and
cs.CL (Computation and Language / NLP). arXiv has no peer review -- any author can submit, and
papers appear the same day. This means the signal-to-noise ratio is lower than conferences, but
the latency is essentially zero. The most important papers in ML often appear on arXiv weeks before
any conference submission deadline.

**Tier 2 -- Top conferences:** Peer-reviewed and the gold standard for credibility. General ML:
NeurIPS (Neural Information Processing Systems), ICML (International Conference on Machine
Learning), ICLR (International Conference on Learning Representations). Computer vision: CVPR,
ECCV, ICCV. NLP: ACL, EMNLP, NAACL. Acceptance rates at NeurIPS and ICLR typically range from
20-30%, and reviewers are ML researchers who can evaluate methodology. Conference acceptance is the
primary credibility signal for ML research -- peer review at these venues is rigorous compared to
many other fields.

**Tier 3 -- Industry blogs and technical reports:** Google AI Blog, Meta AI Research, Hugging Face
Blog, OpenAI technical reports, Anthropic research blog, DeepMind publications. These often describe
high-quality applied research that does not appear in academic venues -- either because the work is
proprietary, the timeline is too short for conference cycles, or the audience is practitioners rather
than researchers. GPT-3, DALL-E, and AlphaFold's practical applications were all announced via
technical reports or blog posts. These are high-value but require more critical evaluation since they
are not peer reviewed and the authors have commercial interests.

**JMLR and TMLR:** The Journal of Machine Learning Research (JMLR) and Transactions on Machine
Learning Research (TMLR) are the main ML journals. JMLR is highly respected but slow -- publication
can take 1-2 years. TMLR, launched in 2022, attempts to combine journal rigor with faster turnaround.
Both publish work that did not fit conference format (very long papers, negative results, surveys).

**Workshop papers:** NeurIPS, ICML, and ICLR each have workshops -- focused satellite events
on narrow topics. Workshop papers are often early-stage work, are less rigorously reviewed than
main conference papers, but can surface cutting-edge ideas 1-2 years before they mature into main
conference contributions. Following workshops in your area of focus is a high signal/noise approach
for tracking the research frontier.

!!! tip "Teaching Moment"
    The most common credibility mistake is treating arXiv preprints as established fact. "A new
    paper shows that X is better than Y" -- if that paper is an arXiv preprint, the claim has not
    been peer reviewed. Reviewers catch methodological problems, missing baselines, and overfitted
    results that authors do not catch in self-review. Between 2018 and 2023, several widely-cited
    arXiv preprints that generated significant buzz failed to hold up under peer review or independent
    reproduction. Treat every preprint as "interesting claim" until it appears in a peer-reviewed
    venue. The appropriate response to an arXiv preprint is curiosity, not certainty.

!!! action "What to Do"
    1. 📖 Browse [arXiv cs.LG](https://arxiv.org/list/cs.LG/recent) for 10 minutes -- observe
       the volume of daily submissions and the range of topics; this gives you a ground-level sense
       of the publication landscape
    2. 🎯 Go to [NeurIPS 2023 Proceedings](https://proceedings.neurips.cc/paper_files/paper/2023)
       and look at the paper list -- browse titles for 5 minutes to understand what makes a
       conference paper; notice how the scope differs from arXiv
    3. 📖 Read one blog post from the [Hugging Face Blog](https://huggingface.co/blog) on a topic
       you already know -- notice what information is present vs absent compared to a paper on the
       same topic; observe how the framing differs (practitioner vs researcher audience)
    4. 📖 Read one ICLR 2023 paper (from [openreview.net](https://openreview.net/group?id=ICLR.cc/2023/Conference))
       and read its peer reviews alongside -- observe the gap between "paper as submitted" and
       "paper as evaluated by experts"

**Resources:**

- 🎯 [arXiv Machine Learning](https://arxiv.org/list/cs.LG/recent) -- Daily new submissions in
  ML; the unfiltered view of the publication landscape (Free)
- 🎯 [NeurIPS Proceedings](https://proceedings.neurips.cc/) -- Full archive of accepted papers;
  the gold standard for ML research quality (Free)
- 🎯 [OpenReview](https://openreview.net/) -- Peer reviews for ICLR, NeurIPS, and other venues;
  invaluable for understanding what experts find weak in any paper (Free)
- 🎯 [Hugging Face Blog](https://huggingface.co/blog) -- High-quality practitioner-focused
  technical posts; often the first clear explanation of new techniques (Free)
- 📖 [Papers With Code](https://paperswithcode.com/) -- Every paper linked to benchmarks and code;
  also a good view of what is actually being implemented vs just theorized (Free)

---

## Curating Your Information Feed

*⏱ ~45 minutes*

The goal is not to read everything -- it is to build a feed that surfaces the important
developments without requiring 4 hours of daily reading. Most practitioners who "try to stay
current" fail because they subscribe to too many sources simultaneously and burn out within a
month. The sustainable approach is selective and additive: start with one source in each category,
stick with it for a month, then add more as the habit stabilizes.

**arXiv filters:** Reading raw arXiv daily is not sustainable. Two filtering layers help:

- **arXiv Sanity Preserver** (arxiv-sanity-lite.com) -- Andrej Karpathy's tool that filters the
  daily arXiv ML feed based on your reading history and topic preferences. You "like" papers you
  find interesting and it learns to surface similar ones. Substantially reduces noise from the raw
  feed.
- **Hugging Face Papers** (huggingface.co/papers) -- A daily curated list of the most
  upvoted/discussed ML papers from the community. The curation effect is strong -- the papers that
  rise to the top are those practitioners actually find interesting, not just technically solid.

**Newsletters (pick one to start):**

- **The Batch** (deeplearning.ai/the-batch, weekly) -- Andrew Ng's team writes accessible
  summaries of the most important papers and developments from the previous week. Tone is practical
  and optimistic. Good entry point for someone early in their ML learning who wants broad coverage
  without deep technical depth.
- **Import AI** (Jack Clark, weekly at jack-clark.net) -- More technically focused than The Batch.
  Jack Clark was policy director at OpenAI and brings a research-forward perspective. Covers safety
  and governance topics alongside technical research. Better for someone who wants to understand
  the research community's priorities, not just the techniques.

**Social and community feeds:**

Following specific researchers is consistently more signal-dense than following ML "news" accounts.
Some researchers to follow on Twitter/X or whose writing to track:

- **Andrej Karpathy** -- Former Tesla AI director; writes about practical deep learning; his
  `makemore` and `nanoGPT` projects are excellent companion reading to research
- **Ilya Sutskever, Yann LeCun, Yoshua Bengio** -- Foundational figures whose posts signal what
  the field considers important
- **Percy Liang** -- Stanford AI Lab; writes thoughtfully about evaluation and benchmarking
- **Fei-Fei Li** -- Stanford AI Lab; broader ML community perspective

**YouTube for visual learners:**

- **Yannic Kilcher** -- Deep paper walkthroughs; watches him read papers in real time; excellent
  for understanding what expert third-pass reading looks like (warned: his older videos move very
  fast if you are new to the papers)
- **Two Minute Papers** -- Accessible 2-5 minute summaries of recent papers; good for broad
  awareness without technical depth; acts as a filtering layer (if the summary is interesting,
  read the paper)

**Community discussion:**

- **Reddit r/MachineLearning** -- Paper announcements, discussion threads on major results, and
  "Discussion" posts on broader questions. The upvote system surfaces important papers. Quality
  varies significantly but the community is technically knowledgeable.
- **Papers With Code** -- Every paper linked to its code and benchmarks; following a method or
  dataset surfaces all papers in that area

**The concrete setup recommendation:** Pick ONE arXiv feed (arXiv Sanity or Hugging Face Papers),
ONE newsletter (The Batch or Import AI), and ONE social channel (Twitter/X following 5-10
researchers, or r/MachineLearning). Do not subscribe to all of them simultaneously. One month of
consistent engagement with three sources builds the habit and gives you a baseline. Then you can
expand if you are genuinely underserved, not as a precaution against missing something.

!!! tip "Teaching Moment"
    Information overload in ML is not a resource problem -- it is a filtering problem. There is
    genuinely more valuable ML research published per week than any practitioner can read in a
    year. The practitioners who are most "current" in their knowledge do not have more hours in the
    day -- they have better filters. A researcher who reads 3 papers per week that are directly
    relevant to their work will be more effective than one who skims 20 papers per week across all
    of ML. The goal of your information feed is to surface the relevant 3, not to capture all 20.
    A good filter is a competitive advantage. A poor filter is a subscription to anxiety.

!!! action "What to Do"
    1. 🎯 Subscribe to [The Batch](https://www.deeplearning.ai/the-batch/) -- read the first issue
       end-to-end to calibrate the format; then commit to reading it weekly for one month before
       adding other sources
    2. 🎯 Go to [Hugging Face Papers](https://huggingface.co/papers) and bookmark it -- browse the
       current day's list and note which 1-2 papers look most relevant to what you are working on
    3. 💻 Set up [arXiv Sanity](http://arxiv-sanity-lite.com/) by browsing to at least 5 papers
       in your area and marking them as interesting -- the personalization engine needs this
       initial signal to be useful
    4. 📖 Choose 5 researchers to follow on Twitter/X whose work aligns with your interests and
       follow them; spend 10 minutes reading their recent posts to calibrate signal quality

**Resources:**

- 🎯 [arXiv Sanity Preserver](http://arxiv-sanity-lite.com/) -- Andrej Karpathy's ML paper filter;
  personalizes the arXiv flood by your reading history (Free)
- 🎯 [Hugging Face Papers](https://huggingface.co/papers) -- Community-curated daily ML papers
  with discussion; higher signal-to-noise than raw arXiv (Free)
- 📖 [The Batch](https://www.deeplearning.ai/the-batch/) -- deeplearning.ai weekly newsletter;
  accessible summaries for practitioners at all levels (Free)
- 📖 [Import AI](https://jack-clark.net/) -- Jack Clark's technically-focused weekly newsletter;
  better for research-forward readers (Free)
- 🎥 [Yannic Kilcher YouTube](https://www.youtube.com/c/YannicKilcher) -- Deep live paper
  walkthroughs by a researcher; one of the highest-quality sources for understanding paper
  reasoning, not just conclusions (Free)
- 🎥 [Two Minute Papers](https://www.youtube.com/c/TwoMinutePapers) -- Short accessible video
  summaries; good for broad awareness filtering (Free)
- 🎯 [r/MachineLearning](https://www.reddit.com/r/MachineLearning/) -- Community discussion and
  paper announcements; the upvote system surfaces the most important developments (Free)

---

## Deep Dives vs Broad Awareness

*⏱ ~30 minutes*

The 80/20 split that works for most practitioners: **80% broad awareness, 20% deep engagement.**
Broad awareness means you know something was published and can find it when you need it. Deep
engagement means you understand it well enough to apply or build on it. Both are necessary, and
confusing them is the source of much practitioner burnout.

**Broad awareness** requires only the first pass from the three-pass method: read the title,
abstract, and conclusions; skim section headings; note the venue and author affiliation. This takes
5-10 minutes per paper. The output is: you know this paper exists, what it claims, and whether
you should file it for future reference. Most papers end here. Broad awareness is the goal for
the majority of your feed-reading time.

**Deep engagement** requires the second or third pass. It means you read the methods section,
understand the architecture or algorithm fully, study the experimental results and their
limitations, and possibly implement the technique. This takes 30 minutes to 4 hours. Deep
engagement is only warranted when you need to apply or evaluate the technique, not proactively
for every paper that looks interesting.

**Just-in-time learning** is the principle that drives the most sustainable reading practice:
go deep on a paper when you are about to implement the technique, not proactively as insurance
against future need. Just-in-time learning keeps motivation high because every paper you read
deeply is immediately applicable. The alternative -- reading papers proactively "in case you need
them someday" -- tends to fade because the knowledge has no anchor to immediate work.

**Topic-focused following vs. general ML awareness:** If you work primarily in NLP, following ACL,
EMNLP, and NLP-focused researchers gives you a higher signal-to-noise ratio than following all of
ML. You will know when a vision technique has significant NLP implications (these crossovers are
usually major papers that will surface through any ML feed), but your deep reading time is better
spent inside your domain. The practitioner who knows 50 NLP papers deeply will generally be more
effective than one who has 5-paper breadth across 10 ML subfields.

**The anxiety of falling behind** is a genuine psychological barrier in ML because the field moves
so fast. Practical framing: no one reads everything. The leading researchers at top labs do not
read every important paper. They have very good filters, not more hours. The papers that matter in
5 years are a small fraction of the papers published this year -- the field self-selects through
citations, reproductions, and adoption. Most papers are eventually forgotten. Staying current means
staying current in your area of focus, not in all of ML simultaneously.

**Deciding when to go deep:**

- You are about to implement the technique in a project
- A colleague or team is making a decision based on this paper's claims
- The paper is directly relevant to a known gap in your understanding
- The paper has many citations within weeks of publication (suggests unusually high impact)
- A researcher you trust has signaled the paper is important

If none of these apply, first pass is enough.

!!! tip "Teaching Moment"
    The filter for "should I read this deeply?" is not "is this interesting?" -- it is "do I have
    or will I soon have a specific reason to apply this?" Interest is not scarce in ML; almost
    everything is interesting if you have the background. The scarce resource is time for deep
    engagement. Spending it on papers that are interesting but not actionable means the papers
    that are both interesting and immediately applicable get crowded out. The best readers in ML
    are not the ones with the broadest awareness -- they are the ones who know when to stop.

!!! action "What to Do"
    1. 📖 For the next 5 papers you encounter in your feed, practice the first-pass method (5-10
       min each) and deliberately stop; write one sentence about each: "relevant to current work
       because X" or "file for later because Y" or "not relevant right now"
    2. 📖 Identify one paper in your current feed that warrants a deep-dive because you are working
       on something related; do a full second pass on that paper this week
    3. 💻 Create a simple "to-read" list in your reference manager (Zotero) with two categories:
       "broad awareness done" and "deep read needed" -- this externalizes the prioritization
       decision so you do not re-evaluate the same paper repeatedly
    4. 📖 At the end of the week, review which papers you actually read deeply vs broadly -- if
       your ratio is less than 80/20, you may be reading too many papers shallowly; prioritize
       fewer, deeper reads

**Resources:**

- 📖 [Karpathy: How I Read Papers](https://karpathy.github.io/) -- Andrej Karpathy's reading
  practice (blog posts and tweets); illustrative of how a leading practitioner manages reading
  time (Free)
- 📖 [Andrew Ng: Career Advice for AI (Stanford CS230)](https://www.youtube.com/watch?v=733m6qBH-jI)
  -- His recommendation to read papers "just in time" rather than proactively is the best single
  piece of advice for practitioners building a reading habit (Free)
- 🎯 [Semantic Scholar Alerts](https://www.semanticscholar.org/) -- Set alerts for keywords or
  authors; surfaces papers matching your interests automatically without daily feed checking (Free)

---

## Community Engagement

*⏱ ~30 minutes*

Reading papers in isolation is less effective than reading them in community. Community provides
accountability, discussion partners who catch things you missed, and a professional network that
independently surfaces important work before it reaches your feed.

**Reading groups** are the highest-leverage community structure for practitioners. A reading group
of 2-5 people who meet weekly (or bi-weekly) to discuss one paper creates the external
accountability that solo reading lacks. The presenter is forced to achieve second-pass understanding
and synthesize the paper for others -- one of the most effective learning activities known. The
discussion exposes gaps in your own understanding that silent reading does not reveal. If you do not
have colleagues interested in reading groups:

- **Papers We Love** (paperswelove.org) -- Community organization with chapters in many cities
  that hold regular paper reading meetups; online chapters exist for remote participation
- **ML Discord servers** -- The Hugging Face Discord, fast.ai forums, and Eleuther AI Discord all
  have active paper discussion channels with practitioners at all experience levels
- **NLP-focused**: the ACL Discord has active community channels for NLP/CL research discussion

**Conference attendance and virtual access:** Top ML conferences have become more accessible with
hybrid and virtual options. NeurIPS and ICLR virtual tickets are significantly cheaper than
in-person attendance, and the talk recordings are typically released publicly within weeks of
the conference.

However: **talks are rarely the most valuable part of attending a conference.** All talks are
available online afterwards. The irreplaceable part is poster sessions, workshops, and social
events -- the conversations with researchers while they are standing next to their work, the
workshop discussions on narrow topics, the hallway conversations that surface research directions
not yet in any paper. If you can attend in person, the value is the network, not the talks.

**Contributing to open-source** puts you in direct contact with researchers and practitioners who
work on the methods you read about. Contributing to Hugging Face Transformers, PyTorch, scikit-learn,
or a specialized library (PEFT, trl, accelerate) means your changes are reviewed by researchers
who wrote the papers the library implements. GitHub issues, pull requests, and documentation
contributions all count and build relationships with people who are ahead of you on the learning curve.

**Sharing your own work:** Writing paper summaries, publishing implementation notes, or sharing
reproduction reports builds your professional network and sharpens your own understanding. The
act of explaining a technique clearly forces you to confront gaps in your understanding. Sharing
on LinkedIn, Twitter/X, or a personal blog surfaces your work to researchers and practitioners
who share your interests -- and often leads to conversations that are more valuable than reading
10 more papers in isolation.

**Building a professional network in ML:** The most connected practitioners in ML did not become
well-networked by attending every conference. They became connected by producing public work --
open-source contributions, paper summaries, blog posts, reproduction reports -- that gave others
a reason to reach out. Presence beats attendance.

!!! tip "Teaching Moment"
    The most underused community resource for staying current is asking questions. When you do not
    understand a paper, the authors are usually reachable -- email the first author, post a GitHub
    issue on the official repository, or ask a question in the paper's discussion thread on
    Hugging Face Papers or OpenReview. ML researchers are more responsive to thoughtful questions
    than most people expect. A question like "I tried to reproduce Table 3 and got 71.2% vs your
    reported 73.4% -- I noticed your code uses a different learning rate schedule than the paper
    describes; was the lr schedule from the paper or the code used to generate Table 3?" will get
    a response from most authors. This kind of direct contact with researchers is one of the most
    efficient ways to learn faster and build the relationships that constitute a professional network.

!!! action "What to Do"
    1. 🎯 Find a reading group or paper discussion community -- start with
       [Papers We Love](https://paperswelove.org/) or the Hugging Face Discord; attend one session
       or discussion thread before deciding whether to commit
    2. 💻 Identify one open-source ML project relevant to your work and read the CONTRIBUTING.md
       file -- this is the roadmap to your first contribution; even documentation fixes count and
       get you in the contributor community
    3. 📖 Write a 3-5 sentence summary of a paper you found valuable and share it -- LinkedIn,
       Twitter/X, a blog post, or even a Slack message to colleagues; the audience does not matter;
       the act of summarizing does
    4. 🎯 If you reproduced a paper or implemented a technique, submit your results to
       [Papers With Code](https://paperswithcode.com/contribute) -- this is a direct, permanent
       contribution to the ML community that takes less than 30 minutes

**Resources:**

- 🎯 [Papers We Love](https://paperswelove.org/) -- Community organization for paper reading
  meetups; chapters in many cities plus online participation (Free)
- 🎯 [Hugging Face Discord](https://discord.gg/huggingface) -- Active community with channels for
  research discussion, implementation questions, and paper walkthroughs (Free)
- 🎯 [fast.ai Forums](https://forums.fast.ai/) -- Practitioner-focused community with active
  discussion of new papers and techniques; beginner-friendly tone (Free)
- 🎯 [Eleuther AI Discord](https://www.eleuther.ai/) -- Open-source AI research community;
  particularly active for language model research and reproducibility efforts (Free)
- 🎯 [NeurIPS Virtual Registration](https://neurips.cc/) -- Virtual attendance at significantly
  reduced cost compared to in-person; recordings available post-conference (Paid, ~$50-100)
- 🎯 [Papers With Code: Contribute](https://paperswithcode.com/contribute) -- Submit reproduction
  results, link code to papers, and contribute to the community benchmark tracker (Free)

---

## Key Takeaways

- **Three tiers of credibility**: arXiv preprints (no peer review, read as "interesting claim"),
  top conference papers (peer reviewed, gold standard), industry technical reports (high quality
  but motivated by commercial interests); assign confidence accordingly
- **Sustainable beats comprehensive**: one arXiv filter plus one newsletter plus one community
  channel, maintained consistently, delivers more value than subscribing to everything and burning
  out within a month; build the habit before scaling the volume
- **80% broad awareness, 20% deep engagement**: first pass (5-10 min) for most papers; second
  or third pass only when you are about to apply or evaluate the technique; just-in-time reading
  keeps every deep read immediately actionable
- **The anxiety of falling behind is a filter problem, not a time problem**: the practitioners
  most current in their knowledge have better filters, not more hours; your goal is a feed that
  surfaces the relevant papers for your work, not a feed that captures all of ML
- **Community compounds the individual**: reading groups, open-source contributions, and sharing
  your own summaries all create network effects -- each adds to both your learning and your
  professional relationships in ways that isolated reading cannot

---

**Next up:** [MLOps](../mlops/index.md) -- production ML skills to complement your research
literacy, from experiment tracking and model serving to monitoring and system design
