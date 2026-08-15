import json

with open('data/extra-articles.json') as f:
    data = json.load(f)

content = data[0]['content']
# Find "voorkomt" as a whole word
import re
for m in re.finditer(r'\bvoorkomt\b', content):
    start = max(0, m.start() - 40)
    end = min(len(content), m.end() + 40)
    print(f"Position {m.start()}: ...{content[start:end]}...")
