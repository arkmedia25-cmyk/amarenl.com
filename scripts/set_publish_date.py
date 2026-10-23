#!/usr/bin/env python3
"""Zet de publicatiedatum van de artikelen uit een concept-PR op vandaag.

Gebruik (vanuit de repo-root, op de branch van de PR):

    python3 scripts/set_publish_date.py --today 2026-10-25

Welke artikelen: de slugs die in `git diff origin/main...HEAD` aan
data/extra-articles.json zijn toegevoegd. Zonder toegevoegde slugs (bv. een
PR die alleen bestaande artikelen aanpast) wordt er niets gewijzigd.

De site verbergt artikelen met een toekomstdatum (lib/blog.ts → isPublished),
dus deze datum bepaalt wanneer het artikel écht online komt.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

DEFAULT_FILE = "data/extra-articles.json"


def added_slugs(base: str, path: str) -> set[str]:
    """Slugs die in deze branch zijn toegevoegd t.o.v. `base`."""
    diff = subprocess.run(
        ["git", "diff", "--unified=0", f"{base}...HEAD", "--", path],
        capture_output=True,
        text=True,
        check=True,
    ).stdout
    slugs: set[str] = set()
    for line in diff.splitlines():
        if not line.startswith("+") or line.startswith("+++"):
            continue
        if '"slug"' not in line:
            continue
        rest = line.split('"slug"', 1)[1]
        parts = rest.split('"')
        if len(parts) >= 2 and parts[1]:
            slugs.add(parts[1])
    return slugs


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--today", required=True, help="YYYY-MM-DD")
    ap.add_argument("--file", default=DEFAULT_FILE)
    ap.add_argument("--base", default="origin/main")
    args = ap.parse_args()

    path = Path(args.file)
    if not path.exists():
        print(f"FOUT: {path} bestaat niet", file=sys.stderr)
        return 2

    slugs = added_slugs(args.base, args.file)
    if not slugs:
        print("Geen toegevoegde artikelen gevonden in deze PR — niets gewijzigd.")
        return 0

    data = json.loads(path.read_text(encoding="utf-8"))
    articles = data if isinstance(data, list) else data.get("articles", [])

    changed = 0
    for art in articles:
        if art.get("slug") in slugs and art.get("date") != args.today:
            print(f"datum {art.get('date')} -> {args.today}: {art.get('slug')}")
            art["date"] = args.today
            changed += 1

    if not changed:
        print("Alle artikelen hadden al de juiste datum.")
        return 0

    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"{changed} artikel(en) bijgewerkt.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
