# Model Deployment

!!! prerequisite "Before You Start"
    Complete [ML Project Lifecycle](project-lifecycle.md) and the [Python ML Ecosystem](../python-ml/index.md) section before this page. You should be comfortable training and saving scikit-learn or PyTorch models.

*Total time: ~6-8 hours* | 🟡🔴 Intermediate-Advanced

## Learning Outcomes

By the end of this section, you will:

- Know how to serialize and package trained models for deployment using joblib, torch.save, and ONNX
- Be able to wrap a trained model in a REST API using FastAPI with proper input validation and error handling
- Understand how to write a Dockerfile for an ML application and build a containerized model server
- Know the tradeoffs between batch and real-time inference and when to use each
- Understand the cloud deployment landscape at a conceptual level -- enough to evaluate options and communicate with infrastructure teams

---

## Model Serialization and Packaging

*⏱ ~1 hour*

Before you can deploy a model, you need to save it in a format that can be loaded by a separate process -- your serving infrastructure. This is model serialization, and the right approach depends on the framework you used to train.

**Scikit-learn models** are typically serialized with `joblib`, which handles NumPy arrays efficiently. The `pickle` module also works but is slower for large arrays. Loading is symmetric: `joblib.load("model.pkl")` returns the exact object you saved, including preprocessing pipelines if you wrapped your model in one.

```python linenums="1"
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Save a full pipeline (preprocessor + model)
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", RandomForestClassifier(n_estimators=100))
])
pipeline.fit(X_train, y_train)
joblib.dump(pipeline, "model.pkl")

# Load for serving
loaded_pipeline = joblib.load("model.pkl")
prediction = loaded_pipeline.predict(X_test)
```

**PyTorch models** are saved with `torch.save()`. The recommended approach saves the state dictionary rather than the full model object, which is more portable across PyTorch versions. For deployment, this means you need the model class definition available at load time.

**ONNX (Open Neural Network Exchange)** is a framework-agnostic serialization format that lets you train in PyTorch or TensorFlow and serve with optimized runtimes like ONNX Runtime. ONNX is worth knowing for production systems where inference speed matters -- ONNX Runtime often achieves 2-5x speedup over PyTorch's native inference.

!!! tip "Teaching Moment"
    Versioning your serialized models is as important as versioning your code. A model file named `model.pkl` with no version information is a ticking time bomb: you will eventually overwrite it with a different model and lose the ability to reproduce past behavior. Use semantic versioning or timestamp suffixes (`model_v1.2.pkl`, `model_20260315.pkl`) and track model versions in MLflow's Model Registry or a simple metadata file.

!!! action "What to Do"
    1. 💻 Train a scikit-learn pipeline and save it with `joblib.dump()`, then load it in a separate Python script and verify predictions match
    2. 💻 Save a PyTorch model's state dict with `torch.save(model.state_dict(), "model.pt")` and reload it with `model.load_state_dict(torch.load("model.pt"))`
    3. 📖 Read the ONNX documentation overview to understand when the framework-agnostic format is worth the extra complexity
    4. 📖 Read the MLflow Model documentation to understand how MLflow abstracts model serialization across frameworks

**Resources:**

- 💻 [Scikit-learn: Model Persistence](https://scikit-learn.org/stable/model_persistence.html) -- Official guide to saving and loading scikit-learn models with joblib (Free)
- 📖 [PyTorch: Saving and Loading Models](https://pytorch.org/tutorials/beginner/saving_loading_models.html) -- Complete guide covering state dicts, full models, and best practices (Free)
- 📖 [ONNX Documentation](https://onnx.ai/onnx/intro/) -- Introduction to the open model format and the ONNX Runtime inference engine (Free)
- 💻 [MLflow: Model Format](https://mlflow.org/docs/latest/models.html) -- MLflow's unified model format across frameworks, with serving integrations (Free)
- 📖 [Made With ML: Versioning](https://madewithml.com/) -- Practical model versioning as part of end-to-end MLOps workflow (Free)

---

## REST API Serving

*⏱ ~1.5 hours*

The most common way to deploy an ML model is as a REST API: a web service that accepts JSON requests containing input features and returns JSON responses containing predictions. Any application -- mobile apps, other backend services, dashboards -- can call your model by making an HTTP POST request.

**FastAPI** is the modern Python framework for building REST APIs. It generates automatic API documentation, validates request and response schemas using Python type hints and Pydantic models, supports async operations for high-throughput serving, and is significantly faster than Flask at the framework level. Full Stack Deep Learning explicitly recommends FastAPI over Flask for new ML API projects.

```python linenums="1"
# Serving a trained model with FastAPI
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="ML Model API", version="1.0.0")

# Load model at startup (not per-request)
model = joblib.load("model.pkl")

class PredictionRequest(BaseModel):
    features: list[float]

    class Config:
        json_schema_extra = {
            "example": {"features": [1.5, 2.3, 0.8, 1.2]}
        }

class PredictionResponse(BaseModel):
    prediction: int
    confidence: float

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    if len(request.features) == 0:
        raise HTTPException(status_code=422, detail="Features list cannot be empty")

    features_array = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features_array)[0]
    confidence = model.predict_proba(features_array).max()

    return PredictionResponse(prediction=int(prediction), confidence=float(confidence))

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Run with: uvicorn app:app --reload --port 8000
```

Key serving patterns: load the model **once at startup**, not per request (model loading is expensive). Add a `/health` endpoint for load balancer health checks. Validate input dimensions before inference to avoid cryptic NumPy errors. Use Pydantic models for request and response schemas so FastAPI generates accurate API documentation automatically.

!!! tip "Teaching Moment"
    The biggest mistake in ML API serving is treating input validation as optional. Your model was trained on clean, preprocessed data with specific feature ranges and types. Production inputs will be missing values, wrong types, out-of-range values, and sometimes completely wrong fields. Without validation, these inputs silently produce garbage predictions. Pydantic's field validators let you enforce constraints (non-null, within range, correct length) before the input ever reaches the model.

!!! tip "Why This Path"
    FastAPI has largely replaced Flask for new Python API projects in the ML community. The key advantages for ML serving: Pydantic validation catches input errors before they reach the model, automatic async support handles concurrent requests without manual threading, and automatic OpenAPI documentation makes your API immediately testable. Full Stack Deep Learning's FSDL 2022 course specifically covers FastAPI as the recommended ML serving framework. Flask remains common in legacy systems, so be aware of it, but build new projects with FastAPI.

!!! action "What to Do"
    1. 💻 Install FastAPI and uvicorn (`pip install fastapi uvicorn`), build the model serving example above, and test it using the auto-generated docs at `http://localhost:8000/docs`
    2. 💻 Add input validation: enforce that the features list has the expected length and that all values are within a reasonable range using Pydantic field validators
    3. 📖 Read the FastAPI documentation on "Body - Nested Models" to understand how to handle more complex input schemas (e.g., multiple feature groups)
    4. 💻 Test your API with both valid and invalid inputs to verify that error handling works as expected

**Resources:**

- 📖 [FastAPI Documentation](https://fastapi.tiangolo.com/) -- Complete official docs; the "Tutorial - User Guide" section covers everything needed for ML serving (Free)
- 🎯 [Full Stack Deep Learning: Model Serving](https://fullstackdeeplearning.com/course/2022/) -- Course lectures on REST API serving patterns for ML, including FastAPI (Free)
- 💻 [Made With ML: API Serving](https://madewithml.com/) -- End-to-end example of FastAPI serving integrated with a real ML project (Free)
- 📖 [Pydantic Documentation](https://docs.pydantic.dev/) -- The validation library underlying FastAPI; essential for robust input handling (Free)
- 🎥 [ArjanCodes: FastAPI Tutorial](https://www.youtube.com/c/ArjanCodes) -- Practical FastAPI tutorials with Python best practices (Free)

---

## Containerization with Docker

*⏱ ~1.5 hours*

The problem with "it works on my machine" is a classic: your model runs perfectly locally but fails in production because the server has a different Python version, missing dependencies, or incompatible system libraries. Docker solves this by packaging your application and all its dependencies into a self-contained unit -- a **container** -- that runs identically everywhere.

Understanding why containerization matters is more important than the mechanics. A Docker container encapsulates everything: the Python version, the exact package versions, any system libraries, and your application code and model files. When a container is deployed to any machine running Docker (your laptop, a staging server, a cloud VM), it runs the same code in the same environment.

A **Dockerfile** is a recipe for building a container image. For an ML serving application:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy and install dependencies first (Docker layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY model.pkl .
COPY app.py .

# Expose the port FastAPI runs on
EXPOSE 8000

# Run the API server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Key Dockerfile patterns for ML: copy `requirements.txt` and run `pip install` *before* copying your code, so Docker's layer cache avoids reinstalling packages on every code change. Use `python:3.11-slim` (not `python:3.11`) to get a smaller image without unnecessary system tools. Use `--no-cache-dir` to avoid caching pip downloads in the image, which inflates image size.

**Multi-stage builds** are worth knowing for large ML models: you can use one stage to install build dependencies, then copy only the runtime artifacts into a minimal final image. This can reduce image size dramatically when your model has complex build-time dependencies.

!!! tip "Teaching Moment"
    GPU support in Docker adds complexity: you need NVIDIA Docker (now part of the NVIDIA Container Toolkit) installed on the host machine, and you must use a CUDA-compatible base image. For production inference, the standard pattern is to use `nvidia/cuda` base images for GPU models. For the vast majority of learning and CPU inference use cases, you do not need this complexity -- start with the slim Python image and add GPU support only when the model genuinely requires it.

!!! action "What to Do"
    1. 💻 Install Docker (docker.com/get-started), write the Dockerfile above for your FastAPI model server, and build it with `docker build -t ml-model .`
    2. 💻 Run your container with `docker run -p 8000:8000 ml-model` and verify the API responds the same as running it locally
    3. 📖 Read the Docker "Get Started" guide (Part 1-3) to understand images, containers, and the build process
    4. 💻 Experiment with layer caching: make a code change and rebuild to see how Docker reuses cached layers for the dependency installation step

**Resources:**

- 📖 [Docker: Get Started](https://docs.docker.com/get-started/) -- Official getting-started guide; covers images, containers, Dockerfiles, and volumes in a few hours (Free)
- 💻 [Made With ML: Docker for ML](https://madewithml.com/) -- Docker integration in an end-to-end ML serving workflow (Free)
- 🎯 [Full Stack Deep Learning: Infrastructure](https://fullstackdeeplearning.com/course/2022/) -- Lecture on Docker and containerized ML deployment (Free)
- 📖 [Docker: Best Practices for Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) -- Official best practice guide covering layer caching, image size, and security (Free)
- 🎥 [TechWorld with Nana: Docker Tutorial](https://www.youtube.com/c/TechWorldwithNana) -- Beginner-friendly video introduction to Docker concepts (Free)

---

## Batch vs Real-Time Inference

*⏱ ~1 hour*

Not all ML inference is the same. Understanding the distinction between batch and real-time inference is essential for choosing the right architecture for your use case.

**Real-time inference** (also called online inference) produces predictions synchronously, on-demand, with low latency. A user requests a recommendation and gets one immediately. A fraud detection system evaluates a transaction as it happens. This pattern requires a deployed model server (like the FastAPI service you built) that is always running and can respond within milliseconds to seconds.

**Batch inference** runs predictions on a large dataset asynchronously, typically on a schedule. An email marketing system might run a churn prediction model on all active users every night and store the results in a database for the marketing team to use. A document classifier might process all new documents uploaded that day. Batch inference has no latency requirements but benefits from throughput optimization.

The choice depends on your use case:

| Pattern | When to Use | Latency | Throughput |
|---------|------------|---------|------------|
| Real-time API | Synchronous user-facing features | <100ms to 2s | Moderate |
| Batch pipeline | Offline analysis, pre-computed features | Minutes to hours | Very high |
| Streaming | Event-driven, near-real-time | Seconds | High |

**Latency vs throughput tradeoff** is fundamental: a model optimized for real-time serving (small batches, low latency) will typically have lower throughput than the same model processing large batches. GPU hardware makes this tradeoff more extreme -- large batches on GPU are very efficient, but small batches often underutilize GPU capacity.

!!! tip "Teaching Moment"
    A common architectural mistake is defaulting to real-time inference when batch inference would work. Real-time serving requires always-on infrastructure (a running API server, load balancers, auto-scaling), which is significantly more expensive and operationally complex than a nightly batch job. Before building a real-time serving system, ask: "Does this prediction need to be available in under a second?" Often the answer is no -- the recommendation can be precomputed, the report can run overnight, the analysis can complete within the hour.

!!! action "What to Do"
    1. 📖 Read Chip Huyen "Designing ML Systems" Ch. 7 on ML deployment patterns -- the batch vs real-time distinction is covered in depth
    2. 💻 Convert your FastAPI real-time server to a batch script that reads inputs from a CSV, runs inference on all rows, and writes predictions to a new CSV
    3. 🎥 Watch the Full Stack Deep Learning deployment lecture on serving patterns and when to use each
    4. 💻 Benchmark your model's throughput: time how long it takes to predict on 1, 10, 100, and 1000 samples and observe how batch size affects efficiency

**Resources:**

- 📘 [Chip Huyen: Designing ML Systems, Ch. 7](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Model deployment chapter covering batch, online, and streaming inference patterns (~$50)
- 🎥 [Full Stack Deep Learning: Deployment](https://fullstackdeeplearning.com/course/2022/) -- Lecture comparing deployment patterns with real architecture examples (Free)
- 📖 [Google Cloud: Batch Prediction vs Online Prediction](https://cloud.google.com/vertex-ai/docs/predictions/overview) -- Cloud vendor's explanation of the patterns with concrete use cases (Free)
- 💻 [Made With ML: Prediction Service](https://madewithml.com/) -- Practical examples of both batch and real-time prediction workflows (Free)
- 📖 [AWS: ML Inference Patterns](https://aws.amazon.com/blogs/machine-learning/) -- AWS blog covering inference patterns and cost optimization (Free)

---

## Cloud Deployment Patterns

*⏱ ~1 hour*

At some point, your local Docker container needs to run in production -- on hardware that is always available, can scale to handle load, and does not depend on your laptop staying on. Cloud providers offer managed ML serving infrastructure that handles the operational complexity of running model servers at scale.

The goal of this section is **awareness**, not tutorials. Cloud platforms evolve rapidly, and specific platform details will be outdated before you read this. What you need is a conceptual model of the options and tradeoffs, so you can evaluate them and communicate with infrastructure teams.

**The three major platforms** each offer managed ML serving: AWS SageMaker, Google Cloud Vertex AI, and Azure ML. All three follow a similar pattern: you provide a containerized model, specify compute resources, and the platform handles deployment, scaling, load balancing, and monitoring. The differences are in UX, pricing, integration with other platform services, and enterprise features.

**Managed endpoints** are the simplest option: you deploy a container image and the platform runs it as an API endpoint with autoscaling. This is the cloud equivalent of your local Docker container, with operational complexity offloaded to the platform.

**Serverless inference** (AWS Lambda with ML, Google Cloud Run, Azure Container Apps) runs your model code only when a request arrives, with no always-on server costs. This is cost-effective for low-traffic models but introduces cold-start latency (the time to spin up the container on the first request after idle periods).

**Cost considerations** are significant: GPU-backed serving instances cost $0.50-$5.00 per hour on major platforms, which adds up quickly. Many teams use CPU inference for serving even when GPU was used for training, because the cost difference is large and many models are fast enough on CPU for real-time use.

!!! tip "Teaching Moment"
    The core insight about cloud ML deployment is that the concepts transfer across platforms: containerized model, managed endpoint, autoscaling, health checks. Once you understand the pattern with one platform, learning another takes hours rather than weeks. Focus on understanding the concepts (what a managed endpoint does, how autoscaling works, what serverless trading latency for cost means), not on memorizing specific platform CLIs or APIs. Your employer will determine which platform you use.

!!! action "What to Do"
    1. 📖 Read the Google Cloud Vertex AI overview to understand what a managed ML platform looks like at a conceptual level (do not need to run anything)
    2. 📖 Read the AWS SageMaker documentation on endpoints for comparison
    3. 🎯 If you want hands-on practice, use Google Cloud Run or AWS Lambda free tier with a small model -- these serverless options are inexpensive for learning
    4. 📖 Read Chip Huyen Ch. 7 on cloud deployment patterns to understand the architectural decisions underlying platform choices

**Resources:**

- 📖 [Google Cloud: Vertex AI Overview](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform) -- Conceptual overview of a managed ML platform without requiring account setup (Free)
- 📖 [AWS: SageMaker Concepts](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html) -- AWS documentation on ML deployment concepts and endpoint types (Free)
- 🎥 [Full Stack Deep Learning: Cloud Platforms](https://fullstackdeeplearning.com/course/2022/) -- Lecture comparing cloud ML platforms at a conceptual level (Free)
- 📘 [Chip Huyen: Designing ML Systems, Ch. 7](https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/) -- Cloud deployment patterns including cost optimization and platform tradeoffs (~$50)
- 🎯 [Google Cloud Skills Boost: Free Tier](https://cloud.google.com/free) -- Free cloud credits for learning, sufficient for deploying a simple model endpoint (Free credits)

---

## Key Takeaways

- **Serialization format depends on the framework**: joblib for scikit-learn, state dicts for PyTorch, ONNX for cross-framework portability -- version your saved models
- **FastAPI is the modern standard**: REST APIs wrap your model in a web service; Pydantic validation prevents garbage inputs from reaching the model silently
- **Docker eliminates "works on my machine"**: containerization packages your entire runtime environment, making deployment reproducible across any Docker-capable host
- **Choose batch vs real-time based on latency needs**: most ML predictions do not need sub-second latency -- batch inference is simpler and cheaper when it fits
- **Cloud platforms provide the concepts, not the vendor lock-in**: learn what managed endpoints and autoscaling mean; the specific platform is a configuration choice, not an architectural one

---

**Next up:** [Monitoring & Maintenance](monitoring-maintenance.md) -- how to detect when deployed models degrade, track production metrics, and decide when to retrain
