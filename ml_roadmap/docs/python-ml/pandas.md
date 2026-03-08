# Pandas

!!! prerequisite "Before You Start"
    Complete [NumPy](numpy.md) before this section. Pandas is built on top of NumPy arrays, so understanding array operations, indexing, and dtypes will make everything here click faster.

*Total time: ~7-9 hours* | :green_circle: Beginner to :yellow_circle: Intermediate

## Learning Outcomes

By the end of this section, you will:

- Load real-world datasets from CSV files into Pandas DataFrames and inspect their structure
- Select, filter, and subset data using label-based and position-based indexing
- Clean messy data by handling missing values, duplicates, and incorrect types
- Aggregate and transform data using groupby operations for feature engineering
- Combine multiple data sources using merge, join, and concatenation operations

---

## DataFrames and Series

*⏱ ~1 hour*

A DataFrame is a two-dimensional labeled data structure -- think of it as a spreadsheet or SQL table in Python. Each column is a **Series** (a labeled 1D array), and each row is a sample or observation. In ML, your entire tabular dataset lives in a DataFrame: rows are samples, columns are features (plus the target variable).

DataFrames carry more information than raw NumPy arrays. Each column has a name and a data type. Each row has an index label. You can inspect the shape, data types, memory usage, and summary statistics with a few method calls. This metadata is what makes Pandas powerful for real-world data work where columns have meaning.

```python linenums="1"
import pandas as pd
import numpy as np

# Create a DataFrame from a dictionary
df = pd.DataFrame({
    'age': [25, 32, 47, 51, 23],
    'income': [50000, 72000, 95000, 120000, 38000],
    'education_years': [16, 18, 20, 16, 14],
    'purchased': [0, 1, 1, 1, 0]
})

print(df.head())        # First 5 rows
print(f"\nShape: {df.shape}")          # (5, 4)
print(f"\nData types:\n{df.dtypes}")
print(f"\nSummary statistics:\n{df.describe()}")
```

```text
   age  income  education_years  purchased
0   25   50000               16          0
1   32   72000               18          1
2   47   95000               20          1
3   51  120000               16          1
4   23   38000               14          0

Shape: (5, 4)
```

A single column of a DataFrame is a **Series** -- essentially a NumPy array with a label:

```python
# Accessing a single column returns a Series
ages = df['age']
print(type(ages))   # <class 'pandas.core.series.Series'>
print(ages.values)  # The underlying NumPy array
```

!!! tip "Teaching Moment"
    The `.info()` method is your first call on any new dataset. It shows column names, non-null counts (instantly revealing missing data), data types, and memory usage -- all in one output. A quick `df.info()` followed by `df.describe()` gives you a complete picture of your dataset in under a second.

!!! action "What to Do"
    - [ ] :books: Read [10 Minutes to Pandas](https://pandas.pydata.org/docs/user_guide/10min.html) on the official docs for a quick tour of DataFrame basics
    - [ ] :computer: Create a DataFrame from a dictionary with at least 4 columns and 10 rows, then call `.head()`, `.info()`, `.describe()`, and `.shape`
    - [ ] :computer: Load the Iris dataset as a DataFrame: `pd.DataFrame(load_iris().data, columns=load_iris().feature_names)` and explore its structure

**Resources:**

- :books: [10 Minutes to Pandas](https://pandas.pydata.org/docs/user_guide/10min.html) -- Official quickstart tutorial covering DataFrame creation and basic operations (Free)
- :dart: [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas) -- Hands-on micro-course with real datasets and immediate feedback (Free)
- :orange_book: [Python for Data Analysis](https://wesmckinney.com/book/) -- Wes McKinney (Pandas creator) covers DataFrames comprehensively (Free online, 3rd edition)
- :movie_camera: [Corey Schafer: Pandas Tutorials](https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS) -- Clear video walkthrough of DataFrame fundamentals (Free)

---

## Data Loading and Export

*⏱ ~45 minutes*

Real ML datasets come from files, not from dictionaries you type by hand. The most common format is CSV (comma-separated values), and `pd.read_csv()` is the function you will use most often. Pandas can also read JSON, Excel, SQL databases, and Parquet files -- but CSV covers the vast majority of cases in practice.

Loading data is rarely as simple as `pd.read_csv('file.csv')`. Real files have encoding issues, missing values encoded as strings like `"N/A"` or `"?"`, date columns that need parsing, and headers that need renaming. Knowing the key parameters of `read_csv()` saves hours of debugging.

```python linenums="1"
import pandas as pd

# Basic CSV loading (most common)
# df = pd.read_csv('housing.csv')

# Common parameters you'll use frequently
# df = pd.read_csv('data.csv',
#     sep=',',                    # Delimiter (default comma)
#     header=0,                   # Row number for column names
#     na_values=['?', 'N/A', ''], # Strings to treat as NaN
#     dtype={'zip_code': str},    # Force column types
#     parse_dates=['date'],       # Parse date columns
#     nrows=1000                  # Load only first 1000 rows (for testing)
# )

# Using scikit-learn's built-in dataset (no file needed)
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing(as_frame=True)
df = housing.frame

print(f"Shape: {df.shape}")
print(f"\nFirst 3 rows:\n{df.head(3)}")
print(f"\nColumn types:\n{df.dtypes}")

# Export to CSV
# df.to_csv('output.csv', index=False)  # index=False avoids writing row numbers
```

For quick data exploration, `.head()` and `.tail()` show the first and last rows:

```python
# Quick exploration pattern for any new dataset
print(df.head(3))   # First 3 rows
print(df.shape)     # (rows, columns)
df.info()           # Types, missing values, memory usage
```

!!! tip "Teaching Moment"
    Always pass `dtype` explicitly for columns that look like numbers but are not -- zip codes, phone numbers, and ID columns. Without this, Pandas will read `"02134"` as the integer `2134`, silently losing the leading zero. A quick `df.dtypes` check after loading catches these issues early.

!!! action "What to Do"
    - [ ] :books: Read [Pandas IO Tools](https://pandas.pydata.org/docs/user_guide/io.html) for the full list of supported file formats
    - [ ] :computer: Load the California Housing dataset using `fetch_california_housing(as_frame=True)` and inspect with `.info()` and `.describe()`
    - [ ] :computer: Download any CSV from [Kaggle Datasets](https://www.kaggle.com/datasets) and load it with `pd.read_csv()`, handling any issues that arise

**Resources:**

- :books: [Pandas IO Tools Guide](https://pandas.pydata.org/docs/user_guide/io.html) -- Official reference for reading and writing every supported format (Free)
- :computer: [Kaggle Datasets](https://www.kaggle.com/datasets) -- Thousands of real-world CSV datasets to practice loading (Free)
- :orange_book: [Python for Data Analysis, Ch. 6](https://wesmckinney.com/book/accessing-data.html) -- Data loading chapter from the Pandas creator (Free online)
- :movie_camera: [Real Python: Reading CSVs](https://realpython.com/python-csv/) -- Practical guide covering common CSV loading pitfalls (Free)

---

## Selecting and Filtering Data

*⏱ ~1 hour*

After loading data, the next step is selecting subsets. In ML, this means choosing which features (columns) to use, filtering samples that meet certain conditions (rows), and extracting training/validation splits. Pandas provides three main selection mechanisms: bracket notation `[]`, label-based `.loc[]`, and position-based `.iloc[]`.

The key distinction: `.loc[]` uses **labels** (column names, index values), while `.iloc[]` uses **integer positions** (0-based). For boolean filtering, any of them work -- you create a boolean mask and use it to select rows. Boolean filtering is the Pandas equivalent of SQL's `WHERE` clause and is the most common selection pattern in data analysis.

```python linenums="1"
import pandas as pd
from sklearn.datasets import fetch_california_housing

housing = fetch_california_housing(as_frame=True)
df = housing.frame

# Select specific columns
features = df[['MedInc', 'AveRooms', 'MedHouseVal']]
print(f"Selected features shape: {features.shape}")

# Label-based selection with .loc
subset = df.loc[:5, 'MedInc':'AveRooms']  # Rows 0-5, columns MedInc through AveRooms
print(f"\n.loc subset:\n{subset}")

# Position-based selection with .iloc
first_10 = df.iloc[:10, :3]  # First 10 rows, first 3 columns
print(f"\n.iloc subset shape: {first_10.shape}")

# Boolean filtering: high-value homes in high-income areas
mask = (df['MedHouseVal'] > 4.0) & (df['MedInc'] > 8.0)
expensive = df[mask]
print(f"\nHigh-value, high-income homes: {len(expensive)} samples")

# .query() for cleaner syntax on complex filters
result = df.query('MedHouseVal > 4.0 and MedInc > 8.0')
print(f"Same result with .query(): {len(result)} samples")
```

!!! tip "Teaching Moment"
    Use `.loc[]` when you know column names (most common in ML work), use `.iloc[]` when you need specific positions (e.g., "first 5 rows"). A common mistake is using chained indexing like `df[df['col'] > 0]['other_col'] = value` -- this triggers the SettingWithCopyWarning because you might be modifying a copy, not the original. Always use `.loc[]` for assignment: `df.loc[df['col'] > 0, 'other_col'] = value`.

!!! action "What to Do"
    - [ ] :books: Read [Pandas Indexing and Selecting Data](https://pandas.pydata.org/docs/user_guide/indexing.html) for the full guide on `.loc`, `.iloc`, and boolean indexing
    - [ ] :computer: Load the California Housing dataset and select only houses with `AveRooms > 6` and `MedInc > 5` -- how many are there?
    - [ ] :computer: Practice both `.loc` and `.iloc` on the Iris DataFrame: select the first 50 rows by position, then select all rows where `petal length (cm) > 3.0` by label

**Resources:**

- :books: [Pandas Indexing Guide](https://pandas.pydata.org/docs/user_guide/indexing.html) -- Official documentation on all selection methods (Free)
- :dart: [Kaggle Learn: Pandas - Indexing](https://www.kaggle.com/learn/pandas) -- Interactive exercises on selecting and filtering data (Free)
- :orange_book: [Python for Data Analysis, Ch. 5](https://wesmckinney.com/book/pandas-basics.html) -- Comprehensive coverage of DataFrame selection (Free online)
- :movie_camera: [Keith Galli: Pandas Filtering](https://www.youtube.com/watch?v=Lw2rlCxkag0) -- Video tutorial focused on filtering and selection patterns (Free)

---

## Data Cleaning and Missing Values

*⏱ ~1.5 hours*

Real-world datasets are messy. Columns have missing values. Rows are duplicated. Types are wrong -- a numeric column is stored as strings because one entry says "unknown". Dates are in inconsistent formats. This is not the exception; it is the norm. Data cleaning typically consumes 60-80% of an ML practitioner's time, and Pandas is the primary tool for this work.

The core cleaning operations are: detecting missing values (`.isna()`), filling them (`.fillna()`) or dropping them (`.dropna()`), removing duplicates (`.duplicated()`, `.drop_duplicates()`), replacing values (`.replace()`), and converting types (`.astype()`). The right strategy depends on your data -- dropping missing values is fine when you have plenty of data and few missing entries, but filling (imputation) is better when missingness is widespread.

```python linenums="1"
import pandas as pd
import numpy as np

# Create a messy dataset (simulating real-world issues)
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Alice', 'Eve', 'Frank'],
    'age': [25, np.nan, 35, 25, 28, np.nan],
    'salary': ['50000', '72000', 'unknown', '50000', '65000', '88000'],
    'department': ['Engineering', 'Marketing', 'Engineering', 'Engineering', None, 'Marketing']
})

print("Original data:")
print(df)
print(f"\nMissing values:\n{df.isna().sum()}")

# Step 1: Remove duplicates
df_clean = df.drop_duplicates()
print(f"\nAfter dedup: {len(df)} -> {len(df_clean)} rows")

# Step 2: Fix type issues (salary has 'unknown' string)
df_clean['salary'] = pd.to_numeric(df_clean['salary'], errors='coerce')

# Step 3: Handle missing values
df_clean['age'] = df_clean['age'].fillna(df_clean['age'].median())
df_clean['salary'] = df_clean['salary'].fillna(df_clean['salary'].median())
df_clean['department'] = df_clean['department'].fillna('Unknown')

print(f"\nCleaned data:")
print(df_clean)
print(f"\nRemaining missing: {df_clean.isna().sum().sum()}")
```

!!! tip "Why This Path"
    Data preparation is 60-80% of an ML practitioner's time, according to Kaggle's State of ML surveys and Andrew Ng's teaching. This is not a bug in the ML workflow -- it is the workflow. Andrew Ng's "data-centric AI" movement emphasizes that improving data quality often matters more than improving model architecture. Getting proficient at Pandas cleaning operations pays dividends across every ML project you will ever do.

!!! tip "Teaching Moment"
    Never fill missing values using statistics computed on the entire dataset including test data. This causes **data leakage** -- information from the test set bleeds into your training process. In practice, compute fill values (mean, median) on the training set only, then apply those same values to the test set. Scikit-learn's `SimpleImputer` inside a `Pipeline` handles this correctly, as you will learn in the [Scikit-learn](scikit-learn.md) section.

!!! action "What to Do"
    - [ ] :books: Read [Pandas Working with Missing Data](https://pandas.pydata.org/docs/user_guide/missing_data.html) for the official guide on NaN handling
    - [ ] :computer: Load any Kaggle dataset with missing values and practice the full cleaning workflow: check `.isna().sum()`, decide fill vs drop, fix types, remove duplicates
    - [ ] :computer: Compare strategies: take a dataset with missing values and try (a) dropping all rows with NaN, (b) filling with the median, (c) filling with the mean -- how many rows survive each approach?

**Resources:**

- :books: [Pandas Missing Data Guide](https://pandas.pydata.org/docs/user_guide/missing_data.html) -- Official documentation on NaN detection, filling, and dropping (Free)
- :dart: [Kaggle Learn: Data Cleaning](https://www.kaggle.com/learn/data-cleaning) -- Hands-on course covering missing values, inconsistent data, and character encoding (Free)
- :orange_book: [Python for Data Analysis, Ch. 7](https://wesmckinney.com/book/data-cleaning.html) -- Data cleaning patterns from the Pandas creator (Free online)
- :movie_camera: [Sentdex: Pandas Data Cleaning](https://www.youtube.com/watch?v=0s_1IsROgDc) -- Practical video walkthrough of common cleaning tasks (Free)
- :computer: [Kaggle Datasets](https://www.kaggle.com/datasets) -- Find messy real-world datasets to practice on (Free)

---

## Grouping, Aggregation, and Transformation

*⏱ ~1.5 hours*

Grouping is how you compute statistics per category -- average salary by department, default rate by credit score band, survival rate by passenger class. In ML, groupby operations are essential for feature engineering (creating new features from existing ones) and for understanding class distributions before modeling.

The pattern is always the same: **split** the data into groups by one or more columns, **apply** a function to each group, and **combine** the results. `.groupby()` handles the split, and you chain it with `.mean()`, `.sum()`, `.agg()`, or `.transform()` for the apply-combine steps. `.value_counts()` is a shortcut for the most common groupby operation: counting occurrences.

```python linenums="1"
import pandas as pd
import numpy as np

# Simulate employee dataset
np.random.seed(42)
df = pd.DataFrame({
    'department': np.random.choice(['Engineering', 'Marketing', 'Sales'], 100),
    'level': np.random.choice(['Junior', 'Mid', 'Senior'], 100),
    'salary': np.random.randint(40000, 150000, 100),
    'years_exp': np.random.randint(0, 20, 100)
})

# Basic groupby: average salary by department
print("Mean salary by department:")
print(df.groupby('department')['salary'].mean().round(0))

# Multiple aggregations at once
print("\nSalary stats by department:")
print(df.groupby('department')['salary'].agg(['mean', 'median', 'std', 'count']).round(0))

# Group by multiple columns
print("\nMean salary by department and level:")
print(df.groupby(['department', 'level'])['salary'].mean().round(0).unstack())

# value_counts for class distribution (essential before ML modeling)
print(f"\nDepartment distribution:\n{df['department'].value_counts()}")

# .transform() adds group stats back as a column (for feature engineering)
df['dept_avg_salary'] = df.groupby('department')['salary'].transform('mean')
print(f"\nWith department average added:\n{df[['department', 'salary', 'dept_avg_salary']].head()}")
```

!!! tip "Teaching Moment"
    `.transform()` is underused but incredibly valuable for feature engineering. Unlike `.agg()` which returns one row per group, `.transform()` returns a value for every row -- it broadcasts the group result back to the original DataFrame. This lets you create features like "how does this employee's salary compare to their department average?" with a single line: `df['salary_vs_dept'] = df['salary'] - df.groupby('department')['salary'].transform('mean')`.

!!! action "What to Do"
    - [ ] :books: Read [Pandas GroupBy Guide](https://pandas.pydata.org/docs/user_guide/groupby.html) for the complete groupby documentation
    - [ ] :computer: Load the Iris dataset as a DataFrame and use `.value_counts()` on the species column to check class balance -- are the classes evenly distributed?
    - [ ] :computer: Compute per-species mean and std for all four features using `.groupby('species').agg(['mean', 'std'])`
    - [ ] :computer: Use `.transform()` to add a column showing each sample's deviation from its species mean for petal length

**Resources:**

- :books: [Pandas GroupBy Guide](https://pandas.pydata.org/docs/user_guide/groupby.html) -- Official documentation with examples of split-apply-combine (Free)
- :orange_book: [Python for Data Analysis, Ch. 10](https://wesmckinney.com/book/data-aggregation.html) -- Comprehensive groupby coverage from the Pandas creator (Free online)
- :dart: [Kaggle Learn: Pandas - Grouping](https://www.kaggle.com/learn/pandas) -- Interactive groupby exercises with real datasets (Free)
- :movie_camera: [Corey Schafer: Pandas GroupBy](https://www.youtube.com/watch?v=txMdrV1Ut64) -- Clear video walkthrough of groupby patterns and aggregation (Free)

---

## Merging, Joining, and Concatenation

*⏱ ~1 hour*

Real ML projects rarely use a single data file. You might have customer features in one table, transaction history in another, and demographic data in a third. Combining these into a single DataFrame is essential for building a complete feature set. Pandas provides `pd.merge()` for SQL-style joins, `pd.concat()` for stacking DataFrames, and `.join()` as a convenience method for index-based joins.

The four merge types mirror SQL: **inner** (only matching rows), **left** (all rows from left, matching from right), **right** (all rows from right, matching from left), and **outer** (all rows from both). The choice depends on whether you want to keep all data or only matched records.

```python linenums="1"
import pandas as pd

# Two related datasets
customers = pd.DataFrame({
    'customer_id': [1, 2, 3, 4, 5],
    'name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'segment': ['Premium', 'Basic', 'Premium', 'Basic', 'Premium']
})

purchases = pd.DataFrame({
    'customer_id': [1, 1, 2, 3, 6],
    'product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Tablet'],
    'amount': [1200, 25, 75, 400, 500]
})

# Inner join: only customers who made purchases
inner = pd.merge(customers, purchases, on='customer_id', how='inner')
print(f"Inner join: {len(inner)} rows")

# Left join: all customers, purchases where available
left = pd.merge(customers, purchases, on='customer_id', how='left')
print(f"Left join: {len(left)} rows")
print(f"\n{left}")

# Concatenation: stacking DataFrames vertically
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
stacked = pd.concat([df1, df2], ignore_index=True)
print(f"\nStacked shape: {stacked.shape}")
```

```text
Inner join: 4 rows
Left join: 6 rows
```

Python's `pd.merge()` also supports suffix control for overlapping column names:

```python
# Handle overlapping column names with suffixes
merged = pd.merge(df1, df2, on='id', suffixes=('_left', '_right'))
```

!!! tip "Teaching Moment"
    Always check the result shape after merging. If an inner merge produces more rows than either input, you likely have duplicate keys causing a many-to-many join (each left key matches multiple right keys and vice versa). Use `validate='one_to_many'` or `validate='many_to_one'` in `pd.merge()` to catch this early -- it raises an error if the merge type does not match your expectation.

!!! action "What to Do"
    - [ ] :books: Read [Pandas Merge Guide](https://pandas.pydata.org/docs/user_guide/merging.html) for the full documentation on merge types and options
    - [ ] :computer: Create two DataFrames with a shared key column and practice inner, left, right, and outer merges -- check the row count after each to understand the differences
    - [ ] :computer: Use `pd.concat()` to stack three DataFrames vertically with `ignore_index=True`, then verify the resulting shape

**Resources:**

- :books: [Pandas Merge Guide](https://pandas.pydata.org/docs/user_guide/merging.html) -- Official documentation covering merge, join, and concatenation (Free)
- :orange_book: [Python for Data Analysis, Ch. 8](https://wesmckinney.com/book/data-wrangling.html) -- Wes McKinney covers all combining strategies with real examples (Free online)
- :movie_camera: [Corey Schafer: Merge and Join](https://www.youtube.com/watch?v=iYWKfUOtGaw) -- Video walkthrough of SQL-style joins in Pandas (Free)
- :computer: [Kaggle Pandas Course: Merging](https://www.kaggle.com/learn/pandas) -- Interactive exercises practicing merge operations (Free)

---

## Key Takeaways

- **DataFrames are labeled arrays** -- they carry column names, data types, and index labels that make real-world data work manageable and less error-prone than raw NumPy arrays
- **Data cleaning is 80% of the job** -- handling missing values, fixing types, removing duplicates, and validating data quality is where most ML practitioner time goes
- **Boolean filtering is your SQL WHERE clause** -- `df[df['col'] > threshold]` is the pattern you will use hundreds of times for selecting subsets
- **GroupBy enables feature engineering** -- computing per-category statistics with `.groupby().agg()` and `.transform()` creates powerful features for ML models
- **Merge wisely and verify** -- always check result shapes after joins, and use the `validate` parameter to catch unexpected many-to-many merges

---

**Next up:** [Data Visualization](visualization.md) -- learn to see your data through Matplotlib and Seaborn plots before building models
