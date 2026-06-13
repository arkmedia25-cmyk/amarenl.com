#!/usr/bin/env python3
"""AmareNL web search — multi-backend with fallbacks"""
import urllib.request, urllib.parse, re, sys, json, html as html_mod, random, time

USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
]


def fetch(url, timeout=15):
    ua = random.choice(USER_AGENTS)
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    return urllib.request.urlopen(req, timeout=timeout).read().decode("utf-8", errors="ignore")


def search_wikipedia(query, lang="nl"):
    """Wikipedia API — always available, no CAPTCHA"""
    encoded = urllib.parse.quote(query)
    url = (
        f"https://{lang}.wikipedia.org/w/api.php"
        f"?action=query&list=search&srsearch={encoded}&format=json&srlimit=10"
    )
    try:
        data = json.loads(fetch(url, 10))
        results = data.get("query", {}).get("search", [])
        if results:
            snippets = []
            for r in results:
                title = r["title"]
                snippet = html_mod.unescape(re.sub(r"<[^>]+>", "", r.get("snippet", "")))
                snippets.append(f"{title}: {snippet}")
            return snippets
    except Exception:
        pass
    return []


def search_ddg(query):
    """DuckDuckGo lite — best results but may be blocked on some IPs"""
    encoded = urllib.parse.quote(query)
    try:
        raw = fetch(f"https://lite.duckduckgo.com/lite/?q={encoded}")
        # Check for CAPTCHA/redirect
        if any(x in raw.lower() for x in ["captcha", "complete the following challenge", "verify you are human"]):
            return []
        snippets = re.findall(r'class="result-snippet"[^>]*>([^<]+)', raw)
        if not snippets:
            text = re.sub(r"<[^>]+>", "\n", raw)
            text = html_mod.unescape(text)
            snippets = [l.strip() for l in text.split("\n") if len(l.strip()) > 40 and "DuckDuckGo" not in l]
        return snippets[:10]
    except Exception:
        return []


def search(query):
    # Strategy 1: DDG lite (fast, quality results when available)
    ddg_results = search_ddg(query)
    if ddg_results:
        return "\n---\n".join(ddg_results[:12])

    # Strategy 2: Wikipedia NL (always available, good for health topics)
    wiki_results = search_wikipedia(query, "nl")
    if not wiki_results:
        wiki_results = search_wikipedia(query, "en")
    if wiki_results:
        return "[Wikipedia resultaten]\n" + "\n---\n".join(wiki_results[:12])

    return "NO_RESULTS"


if __name__ == "__main__":
    q = " ".join(sys.argv[1:])
    print(search(q))
