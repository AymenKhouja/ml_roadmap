# Data Visualization

!!! prerequisite "Before You Start"
    Complete [NumPy](numpy.md) and [Pandas](pandas.md) before this section. You will use NumPy arrays for numerical data and Pandas DataFrames for loading and structuring datasets.

*Total time: ~5-7 hours* | :green_circle: Beginner to :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Create publication-quality plots using Matplotlib's object-oriented API (Figure/Axes pattern)
- Build statistical visualizations with Seaborn for distributions, relationships, and correlations
- Generate the ML-specific plots needed for every project: confusion matrices, learning curves, ROC curves, and feature importance charts
- Follow a structured EDA workflow to visually explore any dataset before modeling
- Know when to use which plot type for different data analysis questions

---

## Matplotlib Fundamentals

*⏱ ~1.5 hours*

Matplotlib is the foundation of Python plotting. Seaborn, Pandas plotting, and many other libraries are built on top of it. There are two ways to use Matplotlib: the **pyplot state machine** (`plt.plot()`, `plt.show()`) and the **object-oriented API** (`fig, ax = plt.subplots()`). Always use the object-oriented API -- it gives you explicit control over every element and avoids the confusion of implicit global state.

The key objects are **Figure** (the entire window or page) and **Axes** (an individual plot within the figure). A Figure can contain multiple Axes arranged in a grid. You call methods on the Axes object to add data, set labels, and customize appearance. This pattern scales cleanly from one plot to a grid of subplots.

```python linenums="1"
import matplotlib.pyplot as plt
import numpy as np

# The object-oriented API: always use this pattern
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left plot: line plot
x = np.linspace(0, 10, 100)
axes[0].plot(x, np.sin(x), label='sin(x)', color='blue')
axes[0].plot(x, np.cos(x), label='cos(x)', color='red', linestyle='--')
axes[0].set_xlabel('x')
axes[0].set_ylabel('y')
axes[0].set_title('Trigonometric Functions')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Right plot: scatter plot (common for visualizing feature relationships)
np.random.seed(42)
x_data = np.random.randn(100)
y_data = 2 * x_data + np.random.randn(100) * 0.5
axes[1].scatter(x_data, y_data, alpha=0.6, c='steelblue', edgecolors='white')
axes[1].set_xlabel('Feature 1')
axes[1].set_ylabel('Feature 2')
axes[1].set_title('Feature Relationship')

plt.tight_layout()
plt.savefig('basic_plots.png', dpi=150, bbox_inches='tight')
plt.show()
```

This code produces two side-by-side plots: a line chart showing sine and cosine curves (useful for visualizing continuous functions and model predictions over time), and a scatter plot showing a linear relationship with noise (the most common way to visualize feature correlations in ML data).

!!! tip "Teaching Moment"
    Always call `plt.tight_layout()` before `plt.show()` or `plt.savefig()`. Without it, axis labels and titles overlap when using multiple subplots. For publication-quality figures, also pass `bbox_inches='tight'` to `savefig()` to remove whitespace around the edges.

!!! action "What to Do"
    - [ ] :books: Read the [Matplotlib Tutorials](https://matplotlib.org/stable/tutorials/index.html) starting with "Quick start guide" for the official introduction to Figure and Axes
    - [ ] :computer: Create a 2x2 grid of subplots using `plt.subplots(2, 2)` and put a different plot type in each: line, scatter, bar, and histogram
    - [ ] :computer: Load the Iris dataset and create scatter plots of petal length vs petal width, colored by species -- this is one of the most classic ML visualizations

**Resources:**

- :books: [Matplotlib Tutorials](https://matplotlib.org/stable/tutorials/index.html) -- Official tutorial series from basic to advanced (Free)
- :books: [Matplotlib Gallery](https://matplotlib.org/stable/gallery/index.html) -- Hundreds of example plots with source code -- browse for visual inspiration (Free)
- :dart: [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization) -- Hands-on course covering Matplotlib and Seaborn with real datasets (Free)
- :orange_book: [Fundamentals of Data Visualization](https://clauswilke.com/dataviz/) -- Claus Wilke's free book on principles of effective visualization (Free online)

---

## Customizing Plots for Publication

*⏱ ~45 minutes*

Default Matplotlib plots work for exploration but need polish for reports, papers, and presentations. Customization includes setting consistent styles, choosing color palettes, adjusting font sizes, adding annotations, and saving figures at the right resolution. A few lines of configuration at the top of your script can make every subsequent plot look professional.

Matplotlib provides built-in styles that you can activate with `plt.style.use()`. Seaborn's default styling is also popular. For ML papers and reports, the key is consistency: same font sizes, same color scheme, same figure dimensions across all plots.

```python linenums="1"
import matplotlib.pyplot as plt
import numpy as np

# Apply a clean style
plt.style.use('seaborn-v0_8-whitegrid')

# Global font size settings (do once at top of script)
plt.rcParams.update({
    'font.size': 12,
    'axes.titlesize': 14,
    'axes.labelsize': 12,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
})

fig, ax = plt.subplots(figsize=(8, 5))

# Bar chart with custom colors and annotations
categories = ['Linear\nRegression', 'Decision\nTree', 'Random\nForest', 'SVM', 'Neural\nNet']
scores = [0.72, 0.78, 0.85, 0.83, 0.87]
colors = ['#2196F3', '#2196F3', '#4CAF50', '#2196F3', '#4CAF50']

bars = ax.bar(categories, scores, color=colors, edgecolor='white', linewidth=1.5)
ax.set_ylabel('Accuracy')
ax.set_title('Model Comparison on Test Set')
ax.set_ylim(0.6, 0.95)

# Add value labels on top of bars
for bar, score in zip(bars, scores):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01,
            f'{score:.2f}', ha='center', va='bottom', fontsize=11)

plt.tight_layout()
plt.savefig('model_comparison.png', dpi=300, bbox_inches='tight')
plt.show()
```

This produces a bar chart comparing ML model accuracies -- a plot type you will create frequently when presenting results. The green bars highlight the top-performing models, value labels make exact numbers readable, and the y-axis starts at 0.6 to focus on the meaningful range of differences.

!!! tip "Teaching Moment"
    Save figures at 300 DPI (`dpi=300`) for print quality and 150 DPI for screen/web. Always use `bbox_inches='tight'` to avoid clipped labels. For consistent styling across a notebook or project, put your `plt.rcParams.update()` and `plt.style.use()` calls at the very top -- every subsequent plot inherits these settings.

!!! action "What to Do"
    - [ ] :books: Browse the [Matplotlib Style Gallery](https://matplotlib.org/stable/gallery/style_sheets/style_sheets_reference.html) and try 3 different styles on the same plot to see how they change appearance
    - [ ] :computer: Create a bar chart comparing 5 imaginary model accuracies with value labels on each bar, then save it at 300 DPI
    - [ ] :computer: Experiment with `plt.rcParams` to set global font sizes and then create two plots to verify the settings persist

**Resources:**

- :books: [Matplotlib Style Sheets](https://matplotlib.org/stable/gallery/style_sheets/style_sheets_reference.html) -- Visual gallery of all built-in styles (Free)
- :books: [Matplotlib Customization Guide](https://matplotlib.org/stable/tutorials/introductory/customizing.html) -- Official guide to rcParams, styles, and colors (Free)
- :orange_book: [Fundamentals of Data Visualization, Ch. 4-6](https://clauswilke.com/dataviz/) -- Principles of color, axes, and layout for effective communication (Free online)
- :movie_camera: [Sentdex: Matplotlib Styles](https://www.youtube.com/watch?v=UO98lJQ3QGI) -- Quick video tour of styling options (Free)

---

## Seaborn for Statistical Visualization

*⏱ ~1 hour*

Seaborn is a statistical visualization library built on Matplotlib. Where Matplotlib gives you low-level control, Seaborn provides high-level functions that create complex statistical plots with a single call. A `sns.pairplot()` creates a grid of scatter plots and histograms for every feature pair -- something that would take 20+ lines of Matplotlib code.

Seaborn excels at distribution plots (histograms, KDE, box plots, violin plots), relationship plots (scatter with regression lines, pair plots), and matrix plots (heatmaps for correlation matrices). It integrates directly with Pandas DataFrames, automatically using column names for axis labels.

```python linenums="1"
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.datasets import load_iris

# Load Iris as DataFrame
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)

# Set Seaborn theme
sns.set_theme(style='whitegrid', palette='Set2')

# Pairplot: all feature combinations colored by species
# This creates a grid showing distributions (diagonal) and
# scatter plots (off-diagonal) for every feature pair
sns.pairplot(df, hue='species', height=2.5)
plt.suptitle('Iris Dataset Feature Relationships', y=1.02)
plt.savefig('iris_pairplot.png', dpi=150, bbox_inches='tight')
plt.show()
```

The pair plot produces a grid where the diagonal shows the distribution of each feature per species (as histograms or KDE curves), and every off-diagonal cell shows a scatter plot of two features colored by species. You can immediately see that petal length and petal width separate the three species well -- this visual insight would guide your feature selection in an ML project.

```python linenums="1"
# Correlation heatmap: shows feature relationships at a glance
fig, ax = plt.subplots(figsize=(8, 6))
corr = df.drop('species', axis=1).corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', center=0, ax=ax)
ax.set_title('Feature Correlation Matrix')
plt.tight_layout()
plt.show()
```

The heatmap displays the Pearson correlation between every pair of features. Values near +1 (red) indicate strong positive correlation, near -1 (blue) indicate strong negative correlation, and near 0 (white) indicate no linear relationship. In the Iris dataset, petal length and petal width are highly correlated (0.96), which tells you they carry similar information -- useful to know before feature selection.

!!! tip "Why This Path"
    Visualization is not a nice-to-have -- it is essential for debugging models and communicating results. Andrew Ng emphasizes "look at your data" as step one of any ML project. fast.ai teaches exploratory visualization before any modeling. The specific plot types covered in this section (pair plots, heatmaps, distribution plots) are the ones you will use in every ML project to understand your data before building models.

!!! tip "Teaching Moment"
    Use `sns.set_theme()` (not the deprecated `sns.set()`) at the top of your notebook to set consistent styling. The `palette` parameter lets you choose color schemes -- `'Set2'` and `'husl'` work well for categorical data. For diverging data (like correlation matrices), use colormaps centered on zero with `center=0` in `sns.heatmap()`.

!!! action "What to Do"
    - [ ] :books: Browse the [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html) to see the full range of available plot types with source code
    - [ ] :computer: Create a pair plot of the Iris dataset colored by species -- which feature pairs best separate the classes?
    - [ ] :computer: Create a correlation heatmap of the Iris features with annotations -- which features are most correlated?
    - [ ] :computer: Create box plots of each feature grouped by species using `sns.boxplot()` to compare distributions

**Resources:**

- :books: [Seaborn Tutorial](https://seaborn.pydata.org/tutorial.html) -- Official tutorial covering all plot types with clear examples (Free)
- :books: [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html) -- Visual gallery of all plot types with source code -- browse for inspiration (Free)
- :dart: [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization) -- Hands-on Seaborn exercises with real datasets (Free)
- :orange_book: [Python Data Science Handbook: Visualization with Seaborn](https://jakevdp.github.io/PythonDataScienceHandbook/04.14-visualization-with-seaborn.html) -- Practical Seaborn guide with ML context (Free online)

---

## ML-Specific Visualizations

*⏱ ~1.5 hours*

Beyond general data visualization, ML has its own set of standard plots that every practitioner needs. Confusion matrices show classification performance per class. Learning curves reveal whether a model is underfitting or overfitting. ROC curves compare classifier performance across thresholds. Feature importance plots show which features drive predictions. These are the plots you will include in every ML report.

Each plot answers a specific question about your model. The confusion matrix answers "where does my classifier make mistakes?" The learning curve answers "do I need more data or a more complex model?" The ROC curve answers "how does my classifier trade off between false positives and false negatives?" Knowing which plot to reach for -- and how to interpret it -- is a core ML skill.

```python linenums="1"
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Confusion matrix visualization pattern
# (In practice, use sklearn.metrics.confusion_matrix to compute this)
confusion = np.array([
    [45, 3, 2],
    [5, 38, 7],
    [1, 4, 45]
])
class_names = ['Setosa', 'Versicolor', 'Virginica']

fig, ax = plt.subplots(figsize=(7, 6))
sns.heatmap(confusion, annot=True, fmt='d', cmap='Blues',
            xticklabels=class_names, yticklabels=class_names, ax=ax)
ax.set_xlabel('Predicted Label')
ax.set_ylabel('True Label')
ax.set_title('Confusion Matrix')
plt.tight_layout()
plt.show()
```

The confusion matrix is a grid where rows are true labels and columns are predicted labels. Diagonal entries (45, 38, 45) are correct predictions. Off-diagonal entries are errors -- for example, 7 Versicolor samples were misclassified as Virginica. Dark blue cells indicate higher counts. This immediately shows you which classes your model confuses.

```python linenums="1"
# Learning curve pattern: training vs validation performance over dataset size
train_sizes = [100, 200, 500, 1000, 2000, 5000]
train_scores = [0.99, 0.96, 0.93, 0.91, 0.90, 0.89]
val_scores = [0.60, 0.70, 0.78, 0.83, 0.86, 0.88]

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(train_sizes, train_scores, 'o-', label='Training Score', color='steelblue')
ax.plot(train_sizes, val_scores, 'o-', label='Validation Score', color='coral')
ax.fill_between(train_sizes, train_scores, val_scores, alpha=0.1, color='gray')
ax.set_xlabel('Training Set Size')
ax.set_ylabel('Accuracy')
ax.set_title('Learning Curve')
ax.legend(loc='best')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

The learning curve shows two lines converging as training set size increases. The gap between training accuracy (high) and validation accuracy (low) indicates overfitting -- the model memorizes training data but does not generalize. As more data is added, the gap narrows. If the lines converge at a low score, you need a more complex model. If they converge at a high score, you have enough data and model capacity.

!!! tip "Teaching Moment"
    The learning curve is one of the most diagnostic plots in ML. If training score is much higher than validation score, your model overfits (try regularization or more data). If both scores are low and converge, your model underfits (try a more complex model). If both scores are high and converge, your model is working well. Always plot learning curves before tuning hyperparameters -- they tell you what kind of improvement to pursue.

!!! action "What to Do"
    - [ ] :computer: Train a classifier on the Iris dataset and generate a confusion matrix using `sklearn.metrics.confusion_matrix`, then visualize it with `sns.heatmap()`
    - [ ] :computer: Generate a learning curve using `sklearn.model_selection.learning_curve` and plot training vs validation scores as a function of dataset size
    - [ ] :computer: Create a horizontal bar chart of feature importances from a trained `RandomForestClassifier` on the Iris dataset -- which features matter most?

**Resources:**

- :books: [Scikit-learn Visualization Gallery](https://scikit-learn.org/stable/auto_examples/index.html) -- Official examples of confusion matrices, ROC curves, and learning curves with code (Free)
- :orange_book: [Hands-On ML, Ch. 3](https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/) -- Aurelien Geron covers classification metrics and their visualizations thoroughly (Chapter available in preview)
- :movie_camera: [StatQuest: ROC and AUC](https://www.youtube.com/watch?v=4jRBRDbJemM) -- Clear visual explanation of ROC curves and when to use them (Free)
- :books: [Matplotlib Gallery: Statistics](https://matplotlib.org/stable/gallery/statistics/index.html) -- Statistical plot examples including boxplots, violins, and histograms (Free)

---

## Exploratory Data Analysis (EDA) Workflow

*⏱ ~1 hour*

Exploratory Data Analysis is the systematic process of visually examining your data before building any model. It reveals distributions, correlations, outliers, and patterns that inform every downstream decision -- which features to use, whether to scale data, what model types might work, and where data quality issues lurk. A structured EDA workflow prevents the common mistake of jumping straight to model training.

The workflow follows a consistent sequence: (1) check data shape and types, (2) examine distributions of individual features, (3) look at relationships between features, (4) check the target variable distribution, and (5) identify outliers and anomalies. Each step uses specific plot types.

```python linenums="1"
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing

# Load dataset
housing = fetch_california_housing(as_frame=True)
df = housing.frame

# Step 1: Shape and basic stats (no plots needed)
print(f"Shape: {df.shape}")
print(f"\nMissing values:\n{df.isna().sum()}")
print(f"\nBasic stats:\n{df.describe().round(2)}")

# Step 2: Distribution of target variable
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].hist(df['MedHouseVal'], bins=50, color='steelblue', edgecolor='white')
axes[0].set_xlabel('Median House Value ($100k)')
axes[0].set_ylabel('Count')
axes[0].set_title('Target Distribution')

# Step 3: Feature distributions
axes[1].hist(df['MedInc'], bins=50, color='coral', edgecolor='white')
axes[1].set_xlabel('Median Income ($10k)')
axes[1].set_ylabel('Count')
axes[1].set_title('Median Income Distribution')
plt.tight_layout()
plt.show()

# Step 4: Feature-target relationship
fig, ax = plt.subplots(figsize=(8, 5))
ax.scatter(df['MedInc'], df['MedHouseVal'], alpha=0.1, s=5, color='steelblue')
ax.set_xlabel('Median Income ($10k)')
ax.set_ylabel('Median House Value ($100k)')
ax.set_title('Income vs House Value')
plt.tight_layout()
plt.show()
```

Step 2 reveals that house values are capped at $500k (a data artifact worth noting). Step 3 shows income is right-skewed -- some neighborhoods are much wealthier than the median. Step 4 shows a clear positive relationship between income and house value, but with significant spread (many factors beyond income affect price). These insights guide preprocessing decisions: should you remove the capped values? Should you log-transform income?

!!! tip "Teaching Moment"
    A common EDA mistake is generating dozens of plots without interpreting them. Each plot should answer a specific question. "What does the target variable look like?" tells you if you need to handle class imbalance (classification) or skew (regression). "How do features relate to the target?" tells you which features are worth keeping. Write down one insight per plot -- if you cannot state what you learned, the plot was not useful.

!!! action "What to Do"
    - [ ] :books: Read [Kaggle Learn: EDA](https://www.kaggle.com/learn/data-visualization) for a structured introduction to exploratory analysis with real datasets
    - [ ] :computer: Perform a complete EDA on the California Housing dataset: distributions, correlations, scatter plots of top features vs target, and a heatmap -- write down 5 insights
    - [ ] :computer: Repeat the EDA workflow on the Iris dataset: distribution per species, pair plot, correlation heatmap -- compare what you learn from a classification vs regression dataset

**Resources:**

- :dart: [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization) -- Hands-on EDA course with guided exercises (Free)
- :orange_book: [Python Data Science Handbook, Ch. 4](https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html) -- Jake VanderPlas covers visualization for data exploration comprehensively (Free online)
- :computer: [Kaggle EDA Notebooks](https://www.kaggle.com/code?searchQuery=EDA) -- Browse top-voted EDA notebooks on Kaggle for real-world workflow examples (Free)
- :movie_camera: [Ken Jee: EDA Walkthrough](https://www.youtube.com/watch?v=QWgg4w1SpJ8) -- Video walkthrough of a complete EDA on a real dataset (Free)
- :books: [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html) -- Browse for plot ideas during your EDA workflow (Free)

---

## Key Takeaways

- **Use the object-oriented API** -- `fig, ax = plt.subplots()` gives you explicit control and scales from one plot to complex grids; avoid the pyplot state machine for anything beyond quick exploration
- **Seaborn for statistics, Matplotlib for control** -- Seaborn creates complex statistical plots in one line; drop to Matplotlib when you need pixel-level customization
- **Every ML project needs these plots** -- confusion matrices for classification errors, learning curves for diagnosing overfitting, and correlation heatmaps for feature selection
- **EDA before modeling** -- always explore distributions, correlations, and outliers visually before choosing features or training models; this prevents costly mistakes downstream
- **Describe plots clearly** -- in reports and documentation, always state what the plot shows and what insight it reveals; a plot without interpretation is just decoration

---

**Next up:** [Scikit-learn](scikit-learn.md) -- learn the standard Python API for building, evaluating, and selecting ML models using the data skills you have built so far
