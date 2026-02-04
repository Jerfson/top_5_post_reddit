# Scrape Reddit Top Posts

**Goal**: Fetch the most recent posts from specific subreddits, analyze their engagement, and extract the top performers.

**Inputs**:
- `subreddits`: List of subreddit names (e.g., "n8n", "automation").
- `fetch_limit`: Number of recent posts to fetch per subreddit (default: 100).
- `top_n`: Number of top posts to return per subreddit (default: 5).

**Outputs**:
- JSON file in `.tmp/` containing the full data of top posts.
- Console output summarizing the top posts (Title, Engagement Score, URL).

**Tools/Scripts**:
- `execution/fetch_reddit_posts.py`

**Process**:
1. Call `execution/fetch_reddit_posts.py` with the list of subreddits.
2. The script queries Reddit's public JSON API (`/new.json`) for each subreddit.
3. It paginates until `fetch_limit` is reached.
4. It calculates an `engagement_score = score + num_comments`.
5. It sorts posts by this score descending.
6. Returns the top `top_n` posts.

**Edge Cases & Learnings**:
- **Rate Limits**: Public API is strictly rate-limited. If 429 errors occur, wait and retry or reduce frequency.
- **User Agent**: Must use a custom User-Agent to avoid being blocked immediately.
- **Pinned Posts**: sticky posts might appear at the top; the script should handle or filter them if strictly "recent" is desired (though high engagement usually implies we want them).
