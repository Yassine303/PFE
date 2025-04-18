import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load the dataset (use the demographics data with new labels)
df = pd.read_csv("demographics_behavior_100.csv")

# Create a new column for categories based on conditions
def categorize_student(row):
    if row['Social Media Usage'] > 5 and row['Stress (1-10)'] <= 5:
        return 'Active Social Media User'
    elif row['Stress (1-10)'] > 7 and row['Absences/Month'] > 5 and row['Friends'] < 3:
        return 'Potential at-Risk Student'
    else:
        return 'Low Engagement Student'

df['Student Category'] = df.apply(categorize_student, axis=1)

# Features and target
X = df[['Social Media Usage', 'Absences/Month', 'Stress (1-10)', 'Friends']]
y = df['Student Category']

# Split the data into training and test sets (80% for training, 20% for testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Random Forest model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Predict on test data
y_pred = clf.predict(X_test)

# Visualization of predicted categories (Bar chart)
category_counts = pd.Series(y_pred).value_counts()
category_counts.plot(kind='bar', color=['blue', 'green', 'orange'])
plt.title('Predicted Student Categories')
plt.xlabel('Category')
plt.ylabel('Number of Students')
plt.xticks(rotation=0)
plt.show()

# Print classification report
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))
