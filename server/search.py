#!/usr/bin/env python3
"""AmareNL web search — DuckDuckGo with fallback strategies"""
import urllib.request, urllib.parse, re, sys, html as html_mod, random, time

USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
]


def fetch(url, timeout=15):
    ua = random.choice(USER_AGENTS)
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    return urllib.request.urlopen(req, timeout=timeout).read().decode("utf-8", errors="ignore")


def search_ddg_lite(query):
    """DuckDuckGo Lite — simplest HTML, least likely to show CAPTCHA"""
    encoded = urllib.parse.quote(query)
    url = f"https://lite.duckduckgo.com/lite/?q={encoded}"
    raw = fetch(url)
    snippets = re.findall(r'class="result-snippet"[^>]*>([^<]+)', raw)
    if not snippets:
        # Fallback: strip all HTML tags, extract paragraphs >40 chars
        text = re.sub(r'<[^>]+>', '\n', raw)
        text = html_mod.unescape(text)
        snippets = [l.strip() for l in text.split('\n') if len(l.strip()) > 40]
    return snippets[:12] if snippets else []


def search_ddg_html(query):
    """DuckDuckGo HTML — richer results, more likely to CAPTCHA"""
    encoded = urllib.parse.quote(query)
    url = f"https://html.duckduckgo.com/html/?q={encoded}"
    raw = fetch(url)
    snippets = re.findall(r'class="result__snippet">([^<]+)', raw)
    return snippets[:12] if snippets else []


def is_captcha(raw_text):
    """Detect if DDG returned a CAPTCHA or challenge page"""
    text_lower = raw_text.lower()
    indicators = [
        "complete the following challenge",
        "please confirm",
        "are you a human",
        "captcha",
        "g-recaptcha",
        "verify you are human",
    ]
    return any(ind in text_lower for ind in indicators)


def search(query):
    # Strategy 1: DDG lite (most reliable)
    try:
        raw = fetch(f"https://lite.duckduckgo.com/lite/?q={urllib.parse.quote(query)}")
        if not is_captcha(raw):
            snippets = re.findall(r'class="result-snippet"[^>]*>([^<]+)', raw)
            if not snippets:
                text = re.sub(r'<[^>]+>', '\n', raw)
                text = html_mod.unescape(text)
                snippets = [l.strip() for l in text.split('\n') if len(l.strip()) > 40]
            if snippets:
                return "\n---\n".join(snippets[:12])
    except Exception:
        pass

    # Strategy 2: DDG html with short delay
    time.sleep(2)
    try:
        raw = fetch(f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}")
        if not is_captcha(raw):
            snippets = re.findall(r'class="result__snippet">([^<]+)', raw)
            if snippets:
                return "\n---\n".join(snippets[:12])
    except Exception:
        pass

    # Strategy 3: DDG lite with different user agent
    time.sleep(1)
    try:
        raw = fetch(f"https://lite.duckduckgo.com/lite/?q={urllib.parse.quote(query)}")
        if not is_captcha(raw):
            text = re.sub(r'<[^>]+>', '\n', raw)
            text = html_mod.unescape(text)
            snippets = [l.strip() for l in text.split('\n') if len(l.strip()) > 40 and 'DuckDuckGo' not in l]
            if snippets:
                return "\n---\n".join(snippets[:12])
    except Exception:
        pass

    return "NO_RESULTS"


if __name__ == "__main__":
    q = " ".join(sys.argv[1:])
    print(search(q))
