# Content Authoring Checklist

This checklist codifies every structural element from the Supervised Learning reference page template. **Check every box for each new content page before shipping.** A page is complete only when all applicable items are checked. Use this as the single source of truth for content consistency across Phases 4-8.

---

## Page Header

- [ ] H1 title (`# Topic Name`) matching the topic name exactly
- [ ] `!!! prerequisite "Before You Start"` admonition immediately after H1
- [ ] Prerequisite admonition lists required sections with relative-path links (e.g., `[Section Name](../category/page.md)`)
- [ ] Metadata line with total time estimate and difficulty badge: `*Total time: ~X hours* | EMOJI Difficulty`
- [ ] Difficulty uses colored emoji: 🟢 Beginner, 🟡 Intermediate, 🔴 Advanced
- [ ] `## Learning Outcomes` section present
- [ ] Learning outcomes has 3-5 bullets, each starting with an action verb (Understand, Know, Be able to, Have trained, etc.)

## Per Sub-topic (repeat for each sub-topic on the page)

- [ ] H2 heading (`## Sub-topic Name`) with descriptive sub-topic name
- [ ] Italic time estimate on line after H2: `*⏱ ~X hours*` (or `*⏱ ~X minutes*`)
- [ ] 2-4 paragraphs of conceptual explanation (intuition + ML context, NOT textbook derivations)
- [ ] At least one `!!! tip "Teaching Moment"` admonition woven into the explanation
- [ ] Math notation (LaTeX, `$$...$$` or `\(...\)`) included where relevant to the topic
- [ ] `!!! action "What to Do"` admonition with numbered steps
- [ ] Action steps include a mix of activity types (watch, read, code) with emoji type icons
- [ ] `**Resources:**` section after the action admonition
- [ ] Resources section has 3-5 annotated items
- [ ] Each resource has an emoji type icon prefix (see Emoji Resource Type Mapping below)
- [ ] Each resource has a 1-sentence annotation explaining its specific value
- [ ] Free resources listed before paid resources
- [ ] Paid resources have inline price note in annotation (e.g., "Free to audit", "$49.99")
- [ ] Horizontal rule (`---`) after each sub-topic section

## Page Footer

- [ ] `## Key Takeaways` section present
- [ ] Key takeaways has 3-5 bullets with **bold key phrase** + explanation format
- [ ] Horizontal rule (`---`) after Key Takeaways
- [ ] `**Next up:**` line with link to next topic in learning path
- [ ] Next-up link includes brief teaser describing what comes next

## Content Quality

- [ ] Teaching depth = intuition + ML context (not textbook proofs or formal derivations)
- [ ] At least one `!!! tip "Why This Path"` admonition per page citing roadmap sources (roadmap.sh, Andrew Ng, fast.ai, Stanford, etc.)
- [ ] Resource variety per sub-topic: mix of video, text, interactive, and book where possible
- [ ] All internal links use relative paths to existing pages (e.g., `../category/page.md`)
- [ ] No broken links -- all link targets exist in `docs/`
- [ ] Code examples use syntax highlighting with language identifier (e.g., ` ```python `)
- [ ] Code examples use `linenums="1"` where appropriate for longer snippets

## Emoji Resource Type Mapping

Use these emoji prefixes consistently for all resource annotations:

| Emoji | Type | Usage |
|-------|------|-------|
| 🎥 | Video | YouTube, course lectures, conference talks |
| 📖 | Article or tutorial | Blog posts, written tutorials, documentation pages |
| 📘 | Book | Textbooks, reference books, book chapters |
| 💻 | Interactive or code | Kaggle notebooks, Jupyter exercises, coding platforms |
| 🎯 | Course | Structured learning paths, MOOCs, course modules |

## Admonition Type Reference

Use these admonition types consistently across all content pages:

| Admonition | Usage | Placement |
|------------|-------|-----------|
| `!!! prerequisite "Before You Start"` | Lists prerequisite sections with relative-path links | Page top only (once per page) |
| `!!! tip "Teaching Moment"` | Deepens understanding with insight or common misconception | Woven into sub-topic explanations (1+ per sub-topic) |
| `!!! tip "Why This Path"` | Opinionated consolidation citing roadmap.sh, Andrew Ng, fast.ai, Stanford | At least once per page, in the most relevant sub-topic |
| `!!! action "What to Do"` | Numbered action steps mixing watch/read/code activities | Once per sub-topic, after the conceptual explanation |
| `!!! note` | General supplementary information | As needed |
| `!!! warning` | Gotchas, common mistakes, important caveats | As needed |
| `!!! example` | Worked examples or case studies | As needed |
| `!!! info` | Background context or definitions | As needed |
