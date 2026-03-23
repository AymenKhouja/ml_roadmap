# Monitoring & Maintenance

!!! prerequisite "Before You Start"
    Complete [Model Deployment](model-deployment.md) and [Model Evaluation](../core-ml/model-evaluation.md) before this page. You should be comfortable with ML metrics, deployed model APIs, and basic statistical concepts.

*Total time: ~5-7 hours* | 🟡🔴 Intermediate-Advanced

## Learning Outcomes

By the end of this section, you will:

- Understand why deployed models degrade over time and the different types of drift that cause it
- Know how to apply statistical tests (KS test, PSI) to detect when input distributions have shifted
- Be able to monitor deployed model performance using prediction distribution tracking and key metric dashboards
- Understand the tradeoffs between scheduled and triggered retraining strategies
- Have a decision framework for when to retrain, when to rebuild, and when to fall back to simpler rules

---

## Why Models Degrade

*⏱ ~30 minutes*

You deploy a model. It performs well for weeks, maybe months. Then, quietly, accuracy drops. Users start complaining. Predictions that used to be reliable are now wrong more often. You have not changed anything -- so what happened?

Models degrade because the world changes. Every ML model is trained on historical data that represents the world at a specific point in time. When reality shifts -- new user behavior, seasonal patterns, economic changes, product updates -- the gap between what the model learned and what it encounters in production widens. This gap is the root cause of model degradation.

There are three distinct types of shift to understand:

**Data drift** (also called covariate shift) occurs when the distribution of input features changes, but the relationship between inputs and outputs remains the same. Example: a fraud detection model trained mostly on web transactions suddenly receives a surge of mobile transactions with different feature distributions. The model may still be correct in principle, but its inputs look unfamiliar.

**Concept drift** occurs when the relationship between inputs and outputs changes -- what used to predict outcome X no longer predicts it. Example: a demand forecasting model trained on pre-pandemic data. The features (price, seasonality, promotions) are the same, but the consumer behavior underlying demand has fundamentally changed. The model's learned mapping is now wrong.

**Schema drift** is the simplest type: a feature is renamed, a field is added or removed, or a data type changes in the production data pipeline. This often manifests as runtime errors before it shows up as accuracy degradation.

!!! tip "Teaching Moment"
    The pandemic is the canonical real-world example of concept drift at scale. In 2020, demand forecasting models trained on years of historical data failed within weeks across retail, travel, and logistics. Features that had been reliable predictors (day of week, seasonality, historical demand) became meaningless. Every model that depended on "how humans behaved before March 2020" needed retraining. This was not a modeling failure -- it was a fundamental change in the relationship between inputs and outputs. No amount of model tuning could fix a world-model mismatch.

!!! tip "Why This Path"
    Monitoring is the most underestimated MLOps topic. Chip Huyen dedicates two full chapters (Ch. 8-9) to monitoring and continual learning in "Designing ML Systems" -- more than any other single topic. Most ML courses skip monitoring entirely, focusing on the satisfying work of model building and deployment. But model degradation is the number one reason production ML projects fail long-term. A model that is not monitored will silently degrade until users notice and complain -- at which point the damage is already done. This roadmap includes monitoring before system design because it is more fundamental to production ML success.

!!! action "What to Do"
    1. 📘 Read Chip Huyen "Designing ML Systems" Ch. 8 (introduction section) for a taxonomy of data distribution shifts and real-world examples
    2. 📖 Read the Evidently AI blog post "What is data drift?" for a practical introduction with visual examples
    3. 💻 Simulate concept drift: train a model on data from one time period, evaluate it on a later period, and observe the accuracy gap
    4. 📖 Read Google's "ML Test Score" paper (Section 4: ML Infrastructure Tests) for the monitoring tests Google recommends for production models

**Resources:**

- 📘 [Chip Huyen: Designing ML Systems, Ch. 8](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- The most comprehensive treatment of data distribution shifts and their causes; the essential reference (~$50)
- 📖 [Evidently AI: Data Drift Guide](https://www.evidentlyai.com/blog/machine-learning-monitoring-data-drift) -- Practical introduction with visualizations showing what drift looks like in real data (Free)
- 📖 [Google: The ML Test Score](https://arxiv.org/abs/1911.04695) -- Google's framework for evaluating production ML readiness, including monitoring requirements (Free)
- 🎥 [Full Stack Deep Learning: Testing and Monitoring](https://fullstackdeeplearning.com/course/2022/) -- Lecture on monitoring deployed models in production (Free)
- 📖 [Arize AI: ML Observability Guide](https://arize.com/blog-course/) -- Free blog course on monitoring and observability for production ML (Free)

---

## Data Drift Detection

*⏱ ~1.5 hours*

Detecting that drift has occurred requires comparing two distributions: the reference distribution (training data or a recent period when the model performed well) and the production distribution (current incoming data). Statistical hypothesis tests give you a principled way to quantify whether the difference between distributions is large enough to be concerning.

**The KS (Kolmogorov-Smirnov) test** is the most widely used test for continuous feature distributions. It measures the maximum distance between two cumulative distribution functions and returns a p-value. A low p-value (e.g., below 0.05) indicates the two samples are unlikely to come from the same distribution -- drift detected.

```python linenums="1"
from scipy import stats
import numpy as np

def detect_drift(reference_data: np.ndarray,
                 production_data: np.ndarray,
                 threshold: float = 0.05) -> dict:
    """
    KS test for feature distribution drift.

    Args:
        reference_data: Feature values from training/baseline period
        production_data: Feature values from current production window
        threshold: p-value threshold below which drift is flagged

    Returns:
        dict with statistic, p_value, and drift flag
    """
    statistic, p_value = stats.ks_2samp(reference_data, production_data)
    drift_detected = p_value < threshold

    return {
        "ks_statistic": round(statistic, 4),
        "p_value": round(p_value, 4),
        "drift_detected": drift_detected,
    }

# Example usage
reference = np.random.normal(0, 1, 1000)    # Training distribution
production = np.random.normal(0.5, 1, 200)  # Shifted production distribution

result = detect_drift(reference, production)
print(f"KS statistic: {result['ks_statistic']}, p-value: {result['p_value']}")
print(f"Drift detected: {result['drift_detected']}")
```

**PSI (Population Stability Index)** is preferred in some industries (particularly finance) because it provides an intuitive magnitude measure: PSI < 0.1 is stable, 0.1-0.2 is moderate drift, > 0.2 is significant drift. Unlike the KS test, PSI does not give a p-value but its thresholds are easier to communicate to non-statisticians.

**Chi-squared test** is the equivalent of the KS test for categorical features. When you have categorical inputs (user country, product category, device type), use chi-squared to detect shifts in their frequency distributions.

In practice, you will monitor many features simultaneously. This creates a **multiple testing problem**: if you run 100 tests at p < 0.05, you expect 5 false positives by chance. Adjust your significance thresholds (Bonferroni correction or Benjamini-Hochberg) or use a composite drift score across all features rather than individual feature tests.

!!! tip "Teaching Moment"
    Statistical drift tests are sensitive to sample size in ways that can mislead you. With very small production windows (say, 50 samples), even large distribution shifts may not reach statistical significance. With very large windows, tiny irrelevant shifts may be flagged as significant. This means drift detection requires engineering judgment alongside statistical tests -- set alert thresholds based on what drift magnitudes actually affect model performance, not just on statistical significance.

!!! action "What to Do"
    1. 💻 Run the KS test example above, then gradually shift the mean of the production distribution and observe at what point drift is detected
    2. 📖 Read the Evidently AI documentation on drift detection to understand how they implement multiple tests and composite drift scores
    3. 💻 Install Evidently AI (`pip install evidently`) and run a simple data drift report on two datasets -- observe the built-in visualizations
    4. 📖 Read about PSI and chi-squared tests for drift detection to understand when each is appropriate

**Resources:**

- 💻 [Evidently AI Documentation](https://docs.evidentlyai.com/) -- Open-source ML monitoring toolkit; data drift reports, test suites, and dashboards -- the recommended tool for learning drift detection (Free)
- 📖 [SciPy: ks_2samp](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html) -- Official documentation for the KS test function used in the example above (Free)
- 📘 [Chip Huyen: Designing ML Systems, Ch. 8](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Statistical tests for drift detection in the context of ML monitoring systems (~$50)
- 📖 [Evidently AI: PSI Tutorial](https://www.evidentlyai.com/blog/population-stability-index) -- Practical guide to PSI with worked examples and threshold interpretation (Free)
- 🎯 [Full Stack Deep Learning: Data Quality](https://fullstackdeeplearning.com/course/2022/) -- Lectures on data validation and drift detection in ML pipelines (Free)

---

## Model Performance Monitoring

*⏱ ~1.5 hours*

Drift detection tells you when inputs are changing. Model performance monitoring tells you whether those changes are actually hurting your model's ability to make correct predictions. Ideally, you monitor both -- but they require different approaches and different cadences.

The fundamental challenge of production monitoring is that ground truth labels are often delayed or unavailable. A recommendation system may not know if a recommendation was "good" for weeks (until purchase behavior is observed). A medical diagnosis model may not get feedback for months. This delayed labeling problem means you need multiple monitoring strategies, not just accuracy tracking.

**Prediction distribution monitoring** tracks how your model's output distribution changes over time. If your model is predicting "purchase probability" for e-commerce, and the average predicted probability shifts from 0.15 to 0.05 with no business explanation, something has changed. This does not require ground truth -- it just compares current prediction distributions to the reference period.

**Proxy metrics** are downstream business metrics that correlate with model quality and are available immediately. For a recommendation system: click-through rate, session length, or conversion rate. These cannot replace proper evaluation, but a sudden drop in proxy metrics is a strong signal that model quality has degraded.

**A/B testing** is the gold standard for evaluating model updates: route some traffic to the new model, compare business metrics between the two groups, and make a data-driven deployment decision. The main challenge is that running an A/B test requires holding back some users on the "worse" model -- sometimes for days or weeks. This is a business decision, not just a technical one.

**Shadow deployments** reduce risk for major model updates: run the new model in parallel with the current model, compare their predictions, but only serve the current model's predictions to users. This lets you evaluate the new model's behavior on real traffic without user impact. When you are satisfied with the comparison, you promote the new model.

**Canary releases** take a middle path: route a small percentage of traffic (say, 5-10%) to the new model, monitor metrics on both groups, and gradually increase the canary's share if metrics look good. This limits the blast radius if the new model has problems, while still allowing evaluation on real traffic.

!!! tip "Teaching Moment"
    The reason to monitor prediction distributions, not just accuracy, is that you can catch model degradation before it affects users. By the time your accuracy metric drops, the model has already been making worse predictions for some period. Prediction distribution shifts are often detectable earlier -- a shift in output confidence levels or prediction class frequencies can be a leading indicator of performance issues. Treat accuracy as the lagging indicator and prediction distributions as the leading indicator.

!!! action "What to Do"
    1. 💻 Implement a basic prediction distribution monitor: log the mean and standard deviation of your model's output probabilities for each day, plot these over time
    2. 📖 Read Chip Huyen Ch. 9 on continual learning for an overview of A/B testing, shadow deployments, and canary releases
    3. 🎥 Watch the Full Stack Deep Learning monitoring lecture for concrete examples of what production ML monitoring systems look like
    4. 💻 Set up an Evidently AI dashboard with both a data drift report and a model performance report on a sample dataset

**Resources:**

- 📘 [Chip Huyen: Designing ML Systems, Ch. 9](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Continual learning, A/B testing, shadow deployments, and canary releases (~$50)
- 🎥 [Full Stack Deep Learning: Monitoring](https://fullstackdeeplearning.com/course/2022/) -- Practical monitoring lecture with production architecture examples (Free)
- 💻 [Evidently AI: Model Monitoring Reports](https://docs.evidentlyai.com/reports) -- Built-in reports for prediction drift, data quality, and classification/regression performance (Free)
- 📖 [Google: Rules of ML (Monitoring Rules)](https://developers.google.com/machine-learning/guides/rules-of-ml#ml_phase_iii_slowed_growth_optimization_refinement_and_harvesting_for_other_products) -- Google's production monitoring rules from the "Rules of ML" guide (Free)
- 📖 [Arize AI: Model Performance Monitoring](https://arize.com/blog-course/ml-monitoring-basics/) -- Blog course on production model performance tracking (Free)

---

## Retraining Strategies

*⏱ ~1 hour*

When drift is detected and model performance is degrading, the response is retraining -- updating the model with newer data. But retraining is not as simple as "run the training script again." There are meaningful choices about when to retrain, what data to train on, and how to validate the new model before deploying it.

**Scheduled retraining** runs on a fixed cadence regardless of detected drift: weekly, monthly, or quarterly. It is simple to implement, easy to reason about, and works well for domains with predictable change rates. The downside: if rapid concept drift occurs between scheduled runs, the model underperforms until the next scheduled update.

**Triggered retraining** runs when a drift detector fires or a performance threshold is breached. This is more responsive to sudden changes but requires robust drift detection and monitoring infrastructure to avoid unnecessary retraining. False positive triggers waste compute resources and create operational noise.

**Data strategy for retraining** involves three choices:

1. **Full retrain on all historical data** -- most stable model but more expensive and may underweight recent patterns
2. **Sliding window retrain** -- train only on recent N days/weeks; fast to adapt but loses long-tail pattern coverage
3. **Weighted retrain** -- train on all data but upweight recent examples; balances stability and adaptation

There is no universal best approach. Financial time-series often use sliding windows (recent market behavior is more relevant than historical). E-commerce may use full retrain with freshness weighting (balance of seasonal history and recent trends). Choose based on how quickly your domain changes and how much historical context is valuable.

**Validation gates** are the safety net before any retrained model goes to production. A retrained model should pass the same evaluation pipeline as the original: held-out test set accuracy, performance on critical subgroups, comparison to the current production model on a holdout set, and any business-specific sanity checks. Skipping validation gates to speed up retraining is a common source of model regression incidents.

!!! tip "Teaching Moment"
    Automated retraining pipelines without human oversight are risky. A triggered retrain during a data pipeline incident can train a model on corrupted data and deploy it to production automatically -- much worse than the original drift problem. Best practice: automate the trigger and retraining steps, but require human approval for the final deployment step (or at minimum, set hard performance thresholds that must pass before auto-deployment). This "human in the loop" checkpoint prevents automated systems from amplifying data quality issues.

!!! action "What to Do"
    1. 📖 Read Chip Huyen Ch. 9 on retraining strategies and the tradeoffs between scheduled vs triggered approaches
    2. 💻 Implement a simple scheduled retrain: a script that loads recent data, retrains the model, evaluates it on a test set, and saves it only if performance exceeds a threshold
    3. 📖 Read Made With ML's guide on automated retraining pipelines to see how this fits into a CI/CD workflow for ML
    4. 💻 Add a validation gate to your retrain script: only save and log the new model if it beats the current model on validation metrics

**Resources:**

- 📘 [Chip Huyen: Designing ML Systems, Ch. 9](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Continual learning chapter covering retraining strategies and validation (~$50)
- 📖 [Made With ML: Retraining](https://madewithml.com/) -- CI/CD for ML with automated retraining pipelines integrated into the workflow (Free)
- 🎥 [Full Stack Deep Learning: Continual Learning](https://fullstackdeeplearning.com/course/2022/) -- Lecture on retraining strategies and when each is appropriate (Free)
- 📖 [Google: ML Test Score (Monitoring)](https://arxiv.org/abs/1911.04695) -- Google's recommended tests for retraining pipelines and model validation gates (Free)
- 💻 [MLflow: Model Registry](https://mlflow.org/docs/latest/model-registry.html) -- Using MLflow to manage model lifecycle, staging, and production promotion (Free)

---

## Decision Frameworks

*⏱ ~30 minutes*

When model performance is degrading, "retrain" is not always the right answer. Sometimes the right response is to rebuild the model with a different architecture. Sometimes it is to fall back to a rule-based system while you investigate. And sometimes "good enough" degradation does not warrant any action at all. Knowing which response to choose is a skill that comes from understanding the cost and benefit of each option.

**When to retrain:** The model's core approach is sound, but its parameters are stale. Drift is detected in input distributions. Performance has degraded but the task definition has not changed. Retraining is the low-risk, low-cost default response.

**When to rebuild:** The task itself has changed (you now need multi-label classification, not binary). The model architecture is fundamentally mismatched to the production constraints (latency, memory, throughput). Data quality has improved to the point where a better approach is now feasible. Performance ceiling has been reached with the current approach. Rebuilding is a larger investment -- treat it like a new project, including problem framing and data management.

**When to fall back to rules:** A model regression incident has occurred and you cannot quickly diagnose the cause. The new data environment is so different that any model will perform poorly. The cost of wrong predictions temporarily exceeds the cost of approximate rule-based outputs. A simple rule captures 80% of the value for 10% of the complexity. Rules are underrated -- they are interpretable, debuggable, and do not degrade.

**Cost-benefit of monitoring investment** should be proportional to model impact. A model making low-stakes recommendations in a non-user-facing context does not need real-time drift monitoring. A fraud detection model making high-stakes financial decisions needs multiple monitoring layers. Match your monitoring sophistication to the consequences of failure.

A practical monitoring tier framework:

| Model Impact | Monitoring Level | Examples |
|---|---|---|
| Low (internal tools) | Periodic batch quality checks | Data processing helpers |
| Medium (product features) | Daily drift reports + accuracy tracking | Recommendation widgets |
| High (core business) | Real-time alerts + A/B validation gates | Search ranking, pricing |
| Critical (safety/finance) | Multi-layer monitoring + human review | Fraud, medical, lending |

!!! tip "Teaching Moment"
    The best monitoring systems are boring -- they run quietly in the background and rarely fire alerts. If your monitoring system is firing alerts constantly, either your thresholds are wrong or your data pipeline has more issues than the model. Good monitoring requires iteration: start simple, observe what alerts are actionable vs noise, and calibrate thresholds based on actual production behavior. A monitoring system nobody trusts is worse than no monitoring system.

!!! action "What to Do"
    1. 📖 Read Chip Huyen Ch. 9 on monitoring decision frameworks and cost-benefit of different monitoring approaches
    2. 💻 Design a monitoring specification for a project you are working on: what metrics to monitor, what alert thresholds, and what the response playbook is for each alert type
    3. 📖 Read Made With ML's section on "Testing in Production" for a practical workflow combining monitoring, retraining triggers, and deployment gates
    4. 📖 Look at Evidently AI's "ML monitoring for teams" guide for how organizations implement monitoring processes at scale

**Resources:**

- 📘 [Chip Huyen: Designing ML Systems, Ch. 9](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Decision frameworks for continual learning, including cost-benefit analysis (~$50)
- 📖 [Made With ML: Testing in Production](https://madewithml.com/) -- Practical guide to production testing, monitoring alerts, and retraining triggers (Free)
- 📖 [Evidently AI: ML Monitoring for Teams](https://www.evidentlyai.com/blog) -- Blog series on how to build monitoring processes that teams actually use (Free)
- 🎥 [Full Stack Deep Learning: Production ML Systems](https://fullstackdeeplearning.com/course/2022/) -- End-to-end production ML lecture tying monitoring into the full system lifecycle (Free)
- 📖 [Google: Rules of ML (Rules 28-37)](https://developers.google.com/machine-learning/guides/rules-of-ml#ml_phase_iii_slowed_growth_optimization_refinement_and_harvesting_for_other_products) -- Google's production ML rules on monitoring, retraining, and decision-making (Free)

---

## Key Takeaways

- **Models degrade because the world changes**: data drift (input distribution shifts), concept drift (input-output relationship changes), and schema drift all happen in production -- plan for them
- **Statistical tests quantify drift**: KS test for continuous features, chi-squared for categorical, PSI for industry-standard magnitude; monitor many features with adjusted significance thresholds
- **Monitor leading indicators**: prediction distribution shifts are detectable before accuracy drops -- use them as early warning signals alongside proxy business metrics
- **Match retraining strategy to change rate**: scheduled retrain for predictable domains, triggered retrain for volatile ones; always validate before deploying the new model
- **Not all degradation warrants model retraining**: match your response (retrain / rebuild / fallback to rules) to the nature of the degradation and the cost-benefit of each option

---

**Next up:** [ML System Design](system-design.md) -- end-to-end architecture patterns for production ML, feature stores, orchestration, and how the lifecycle, deployment, and monitoring pieces connect into a full system
