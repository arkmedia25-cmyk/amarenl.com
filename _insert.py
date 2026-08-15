import json, re

# Read the article
with open('/tmp/article.json') as f:
    article = json.load(f)

slug = article['slug']
title = article['title']
date = article['date']
category = article['category']
excerpt = article['excerpt']
content_html = article['content']

# Escape backticks for template literal
content_escaped = content_html.replace('`', '\\`')

# Build the TS entry
ts_entry = f'''
  {{
    slug: "{slug}",
    title: "{title}",
    date: "{date}",
    category: "{category}",
    excerpt: "{excerpt}",
    content: `{content_escaped}`,
    image: "/images/blog/{slug}.jpg"
  }}'''

# Read blog.ts
with open('lib/blog.ts', 'r') as f:
    blog_ts = f.read()

# Find the first ]; after the blogPosts array
# The blogPosts array is at: export const blogPosts: BlogPost[] = [ ... ];
# We need to insert before the closing ]; of this array
# The pattern: look for the last } before ];
# Find the }: followed by ]; pattern

# Find the image line of the last entry in blogPosts (omega-3)
# Insert after that entry's closing }
marker = '    image: "/images/blog/omega-3-essentiele-vetzuren.jpg"\n  }\n];'

if marker not in blog_ts:
    print("ERROR: marker not found!")
    exit(1)

new_block = f'    image: "/images/blog/omega-3-essentiele-vetzuren.jpg"\n  }},' + ts_entry + '\n];'

blog_ts = blog_ts.replace(marker, new_block)

# Write back
with open('lib/blog.ts', 'w') as f:
    f.write(blog_ts)

print("DONE - Article inserted successfully")
print(f"Slug: {slug}")
