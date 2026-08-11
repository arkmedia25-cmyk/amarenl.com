import json

with open('data/extra-articles.json') as f:
    data = json.load(f)

content = data[0]['content']
# Replace the forbidden word
old = 'het voorkomt de "jittery" bijwerking van cafeïne'
new = 'het dempt de "jittery" bijwerking van cafeïne'
if old in content:
    content = content.replace(old, new)
    data[0]['content'] = content
    with open('data/extra-articles.json', 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Fixed: 'voorkomt' replaced with 'dempt'")
else:
    print("String not found. Looking for alternatives...")
    # Try finding with escaped quotes
    if 'voorkomt de \\"jittery\\"' in content:
        content = content.replace('voorkomt de \\"jittery\\"', 'dempt de \\"jittery\\"')
        data[0]['content'] = content
        with open('data/extra-articles.json', 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Fixed using escaped quotes")
    else:
        print("Cannot find the string")
