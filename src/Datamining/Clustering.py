from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import pandas as pd

# Load the data (features for clustering)
df = pd.read_csv("demographics_behavior_100.csv")
X = df[['Social Media Usage', 'Absences/Month', 'Stress (1-10)', 'Friends']]

# Apply KMeans clustering with 3 clusters (Low, Moderate, High Risk)
kmeans = KMeans(n_clusters=3, random_state=42)
df['Cluster'] = kmeans.fit_predict(X)

# Map clusters to risk levels (based on feature importance or average cluster values)
cluster_labels = {0: 'Low Risk', 1: 'Moderate Risk', 2: 'High Risk'}
df['Risk Level (Cluster)'] = df['Cluster'].map(cluster_labels)

# Visualization: Bar Chart showing the distribution of students across risk levels
risk_level_counts = df['Risk Level (Cluster)'].value_counts()
risk_level_counts.plot(kind='bar', color=['green', 'orange', 'red'])
plt.title('Distribution of Students Across Risk Levels')
plt.xlabel('Risk Level')
plt.ylabel('Number of Students')
plt.xticks(rotation=0)  # Keeps x-axis labels horizontal
plt.show()

# Display the updated dataframe with risk levels from clustering
print("\nClustering Results (Risk Levels):\n")
print(df[['ID', 'Risk Level (Cluster)']])
