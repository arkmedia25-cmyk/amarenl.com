import json

with open('/tmp/article.json') as f:
    article = json.load(f)

slug = article['slug']
title = article['title']
date = article['date']
category = article['category']
excerpt = article['excerpt']
content_html = article['content']

# Escape backticks in content since we're using template literals
content_escaped = content_html.replace('\\', '\\\\').replace('`', '\\`')
# But the HTML already has escaped quotes — leave those
# Actually the content from JSON doesn't have backslashes, it's raw HTML
content_escaped = content_html.replace('`', '\\`')

ts_entry = f'''
  {{
    slug: "{slug}",
    title: "{title}",
    date: "{date}",
    category: "{category}",
    excerpt: "{excerpt}",
    content: `{content_html}`,
    image: "/images/blog/{slug}.jpg"
  }}'''

print(ts_entry)
