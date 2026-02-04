import requests
import json
import argparse
import time
import os
from datetime import datetime

# Configuration
USER_AGENT = 'python:agent-scraper:v1.0 (by /u/unknown)'
# Resolve path relative to this script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# Output to dashboard/public (assuming script is in execution/ and dashboard is sibling)
OUTPUT_DIR = os.path.join(SCRIPT_DIR, '..', 'dashboard', 'public')

def fetch_posts(subreddit, limit=100):
    """Fetches recent posts from a subreddit using the public JSON API."""
    posts = []
    after = None
    base_url = f"https://www.reddit.com/r/{subreddit}/new.json"
    
    headers = {'User-Agent': USER_AGENT}
    
    print(f"Fetching posts from r/{subreddit}...")
    
    while len(posts) < limit:
        params = {'limit': 100}
        if after:
            params['after'] = after
            
        try:
            response = requests.get(base_url, headers=headers, params=params)
            
            if response.status_code != 200:
                print(f"Error fetching data: {response.status_code} - {response.text}")
                break
                
            data = response.json()
            if 'data' not in data or 'children' not in data['data']:
                print("Invalid response format.")
                break
                
            new_posts = data['data']['children']
            if not new_posts:
                break
                
            posts.extend(new_posts)
            after = data['data']['after']
            
            if not after:
                break
                
            # Be nice to the API
            time.sleep(1)
            
        except Exception as e:
            print(f"Exception occurred: {e}")
            break
            
    return posts[:limit]

def process_posts(raw_posts, subreddit):
    """Extracts relevant data and calculates engagement score."""
    processed = []
    for post in raw_posts:
        data = post['data']
        engagement = data.get('score', 0) + data.get('num_comments', 0)
        
        processed.append({
            'subreddit': subreddit,
            'title': data.get('title'),
            'url': data.get('url'),
            'permalink': f"https://www.reddit.com{data.get('permalink')}",
            'score': data.get('score'),
            'comments': data.get('num_comments'),
            'engagement': engagement,
            'created_utc': data.get('created_utc'),
            'selftext': data.get('selftext', '')[:200] + "..." if data.get('selftext') else ""
        })
    return processed

def main():
    parser = argparse.ArgumentParser(description="Fetch top engaged recent posts from Reddit.")
    parser.add_argument('--subreddits', nargs='+', required=True, help="List of subreddits to scrape")
    parser.add_argument('--limit', type=int, default=100, help="Max posts to fetch per subreddit")
    parser.add_argument('--top', type=int, default=5, help="Number of top posts to return")
    
    args = parser.parse_args()
    
    all_top_posts = {}
    
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    for sub in args.subreddits:
        raw_posts = fetch_posts(sub, args.limit)
        processed = process_posts(raw_posts, sub)
        
        # Sort by engagement
        processed.sort(key=lambda x: x['engagement'], reverse=True)
        
        top_posts = processed[:args.top]
        all_top_posts[sub] = top_posts
        
        print(f"\n--- Top {args.top} Posts in r/{sub} ---")
        for i, post in enumerate(top_posts, 1):
            print(f"{i}. [{post['engagement']}] {post['title']}")
            print(f"   Link: {post['url']}")
            
    # Save to file
    output_file = os.path.join(OUTPUT_DIR, 'reddit_top_posts.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_top_posts, f, indent=2)
        
    print(f"\nData saved to {output_file}")

if __name__ == "__main__":
    main()
