#!/usr/bin/env python3
"""AmareNL web search — DuckDuckGo lite with Python stdlib only"""
import urllib.request, urllib.parse, re, sys, html as html_mod

def search(query):
    encoded = urllib.parse.quote(query)
    url = f"https://lite.duckduckgo.com/lite/?q={encoded}"
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; AmareNL-Search/1.0)"}
    )
    try:
        raw = urllib.request.urlopen(req, timeout=15).read().decode("utf-8", errors="ignore")
    except Exception as e:
        return f"SEARCH_ERROR: {e}"

    # Extract result snippets from lite version
    # lite version has: <td class="result-snippet">snippet text</td>
    snippets = re.findall(r'class="result-snippet"[^>]*>([^<]+)', raw)

    if not snippets:
        # Fallback: extract any text content >40 chars outside HTML tags
        text = re.sub(r'<[^>]+>', '\n', raw)
        text = html_mod.unescape(text)
        lines = [l.strip() for l in text.split('\n') if len(l.strip()) > 40]
        snippets = lines[:12]

    if snippets:
        return "\n---\n".join(snippets[:12])
    return "NO_RESULTS"


if __name__ == "__main__":
    q = " ".join(sys.argv[1:])
    print(search(q))
