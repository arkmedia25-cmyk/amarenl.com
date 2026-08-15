import json

with open('data/extra-articles.json') as f:
    data = json.load(f)

article = [a for a in data if a['slug'] == 'natuurlijke-slaap-supplementen-beter-slapen-zonder-melatonine'][0]

# Build the TypeScript blog post entry
slug = article['slug']
title = article['title']
date = article['date']
category = article['category']
excerpt = article['excerpt']
content = article['content']

# Output as a JSON string for use in patch
print(json.dumps({
    'slug': slug,
    'title': title,
    'date': date,
    'category': category,
    'excerpt': excerpt,
    'content': content
}, ensure_ascii=False))
