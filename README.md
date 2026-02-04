# Reddit Agent Intelligence Dashboard

A modern, automated system that scrapes top performing discussions from Reddit (specifically `r/n8n` and `r/automation`) and visualizes them in a premium React dashboard.

## 🏗 Architecture

This project uses a hybrid architecture:
1.  **Python Agent (`execution/`)**: A deterministic script that queries Reddit's API, analyzes engagement (Score + Comments), and extracts the top 5 trending posts.
2.  **JSON Data Bridge**: The script outputs a structured JSON file directly to the frontend's public directory.
3.  **React Dashboard (`dashboard/`)**: A Vite + React application styled with Tailwind CSS that consumes the JSON data and displays it in a beautiful, interactive UI.

## 🚀 Features

-   **Automated Scraping**: Fetches 100+ posts and smartly ranks them by engagement.
-   **Dark Mode UI**: Professional, glassmorphism-inspired design.
-   **Topic Filtering**: Switch easily between n8n and Automation topics.
-   **Direct Links**: Quick access to original Reddit threads.

## 🛠️ Prerequisites

-   **Python 3.8+**
-   **Node.js 18+**

## 🏁 How to Run Locally

### 1. Setup the Scraper
Install the Python dependencies:
```bash
pip install -r requirements.txt
```

Run the scraper to generate data:
```bash
python execution/fetch_reddit_posts.py --subreddits n8n automation --limit 100 --top 5
```
*This will save the data to `dashboard/public/reddit_top_posts.json`.*

### 2. Run the Dashboard
Navigate to the dashboard directory and start the server:
```bash
cd dashboard
npm install
npm run dev
```
Open your browser to `http://localhost:5173`.

## 📦 Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed instructions on deploying to GitHub and Vercel.

## 📂 Project Structure

-   `directives/`: Operational procedures (SOPs) for the agent.
-   `execution/`: Python scripts for data fetching.
-   `dashboard/`: The React frontend application.
-   `.tmp/`: Temporary intermediary files.
