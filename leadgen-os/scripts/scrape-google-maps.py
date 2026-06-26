#!/usr/bin/env python3
"""
Google Maps scraper — vind lokale bedrijven in Nederland.
Gebruikt DuckDuckGo als fallback search engine (geen API key nodig).
"""

import sys
import json
import urllib.request
import urllib.parse


def search_businesses(query: str, location: str = "Nederland") -> list[dict]:
    """Zoek bedrijven via DuckDuckGo HTML search."""
    full_query = f"{query} {location} contact email site"
    encoded = urllib.parse.quote(full_query)
    url = f"https://html.duckduckgo.com/html/?q={encoded}"

    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1"
            },
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")

        import re

        snippets = re.findall(r'class="result__snippet">(.*?)</a>', html, re.DOTALL)
        titles = re.findall(
            r'class="result__title">.*?<a.*?>(.*?)</a>', html, re.DOTALL
        )
        links = re.findall(r'class="result__url".*?>(.*?)</a>', html, re.DOTALL)

        results = []
        for i, title in enumerate(titles):
            title_clean = re.sub(r"<[^>]+>", "", title).strip()
            snippet = (
                re.sub(r"<[^>]+>", "", snippets[i] if i < len(snippets) else "").strip()
            )
            link = links[i].strip() if i < len(links) else ""

            results.append(
                {
                    "title": title_clean,
                    "snippet": snippet[:300],
                    "url": link,
                }
            )
        return results
    except Exception as e:
        print(f"Search error: {e}", file=sys.stderr)
        return []


def format_leads(results: list[dict], category: str) -> list[dict]:
    """Converteer search results naar lead format."""
    import re

    leads = []
    for r in results:
        combined = r.get("snippet", "") + " " + r.get("title", "")
        email_match = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", combined)
        phone_match = re.search(r"(\+31|0)[\d\s-]{8,}", r.get("snippet", ""))

        lead = {
            "name": r.get("title", "Onbekend")[:100],
            "email": email_match.group(0) if email_match else "",
            "phone": phone_match.group(0) if phone_match else "",
            "website": r.get("url", ""),
            "category": category,
            "location": "Nederland",
        }
        if lead.get("email") or ".nl" in lead.get("website", ""):
            leads.append(lead)
    return leads


if __name__ == "__main__":
    query = sys.argv[1] if len(sys.argv) > 1 else "fysiotherapeut amsterdam"
    category = sys.argv[2] if len(sys.argv) > 2 else "gezondheid"

    print(f"Zoeken naar: {query}...", file=sys.stderr)
    results = search_businesses(query)
    leads = format_leads(results, category)

    print(json.dumps(leads, indent=2, ensure_ascii=False))
