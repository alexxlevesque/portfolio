# 🏌️ Golf Performance Modeling with Regression & Machine Learning

### **About the Project**

This project analyzes curated professional golf performance data to identify the key factors driving low scores. By leveraging regression techniques and machine learning models, it aims to quantify how environmental conditions, course characteristics, and player profiles influence performance. The goal is to build a reliable modeling pipeline—starting with Ordinary Least Squares (OLS) regression as a benchmark—before exploring more advanced predictive techniques.

I built this project when I started playing a lot more golf and wanted to dive into data science. It served as my introduction to web scraping with BeautifulSoup and advancing my knowledge in data manipulation in Pandas. Furthermore, this project was my avenue to further experimentation in Scikit-learn.

---

### **Project Phases**

1. **📊 Data Integration**
    - Scrape player statistics from [pgatour.com/stats](https://www.pgatour.com/stats) for **2017–2025** using requests and BeautifulSoup.
    - For each stats page: extract headers, player names, and key metrics into pandas DataFrames.
    - Retain only relevant columns, standardize identifiers (player, course, event), and loop through yearly data.
    - Store the cleaned data in a **SQLite3 database** for efficient access and integration.
    - Optionally merge with weather and course metadata to enrich the dataset.

2. **🔍 Feature Engineering**
    - Develop domain-specific features such as:
        - **Weather-adjusted Strokes Gained**
        - **Course Aggressiveness Score**
        - **Player Risk-Reward Profiles**
    - Normalize course difficulty using slope, rating, and hole complexity metrics.

3. **📈 Benchmark Modeling with OLS Regression**
    - Train an Ordinary Least Squares regression model to estimate round scores based on:
        - Weather variables (wind, precipitation, temperature)
        - Course design (length, par, green speed)
        - Player tendencies (driving accuracy, short game, aggressiveness)
    - Use interaction terms to capture non-linear dynamics (e.g., wind × aggression).
    - Interpret coefficients to draw actionable insights (e.g., "Wind affects aggressive players 1.5x more than conservative ones").

4. **🤖 Machine Learning Extension (Planned)**
    - Compare OLS performance to:
        - **Regularized regression** (Lasso, Ridge)
        - **Tree-based models** (Random Forest, XGBoost)
        - **Unsupervised methods** for player archetype discovery (K-means)
    - Evaluate models using cross-validation, RMSE, and interpretability metrics.

5. **📊 Visualization & Simulation (Optional/Future)**
    - Develop dashboards or scenario simulators to answer "what-if" questions.
    - Visual outputs may include:
        - Radar plots for player comparison
        - Heatmaps for weather-sensitive hole performance
        - Score simulations under hypothetical conditions

---

## 🛠️ Tools & Libraries
- Python (Pandas, NumPy, Scikit-learn, Statsmodels, Matplotlib, Seaborn, XGBoost)
- Jupyter Notebook
- Git/GitHub for version control
- SQLite3 for data storage
- BeautifulSoup for web scraping

---

## 📌 Future Directions
- Integrate real-time data sources (e.g., API-based weather updates)
- Expand unsupervised learning to cluster course types and player styles
- Build an interactive dashboard (e.g., with Plotly or Streamlit)
- Implement automated data collection pipeline for continuous updates
