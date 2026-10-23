#!/usr/bin/env python3
"""Publiceert één artikel uit de concept-PR-wachtrij per aanroep.

Waarom niet gewoon de PR mergen: één PR kan meerdere artikelen bevatten
(#98 heeft er 6). Mergen zou ze allemaal op dezelfde dag publiceren. Dit script
neemt daarom per publicatiedag **één** artikel, zet de publicatiedatum op
vandaag en schrijft het naar `data/extra-articles.json` op main. De rest van de
PR blijft in de wachtrij staan tot de volgende publicatiedag.

De site verbergt artikelen met een toekomstdatum (lib/blog.ts → isPublished),
dus de datum bepaalt wanneer het artikel online komt.

Gebruik:
    python3 scripts/publish_next_draft.py --dry-run    # alleen tonen
    python3 scripts/publish_next_draft.py              # echt publiceren + pushen

Vereist: gh CLI (ingelogd of GH_TOKEN), git, schrijfrechten op main.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import date, datetime, timezone
from pathlib import Path

DATA_FILE = "data/extra-articles.json"
PREFIX = "draft/"


def run(cmd: list[str], check: bool = True) -> str:
    return subprocess.run(cmd, capture_output=True, text=True, check=check).stdout


def git(*args: str, check: bool = True) -> str:
    return run(["git", *args], check=check)


def main_articles() -> list[dict]:
    data = json.loads(Path(DATA_FILE).read_text(encoding="utf-8"))
    return data if isinstance(data, list) else data.get("articles", [])


def draft_prs() -> list[dict]:
    """Alle open PR's; per PR bepalen we of er nieuwe artikelen in zitten."""
    out = run(
        [
            "gh", "pr", "list", "--state", "open", "--limit", "100",
            "--json", "number,headRefName,createdAt,title",
        ]
    )
    return sorted(json.loads(out), key=lambda p: p["createdAt"])


def articles_on_branch(pr_number: int) -> list[dict]:
    """Artikelen uit een open PR (via de pull-ref, geen lokale branch nodig)."""
    try:
        git("fetch", "-q", "origin", f"pull/{pr_number}/head")
        raw = git("show", f"FETCH_HEAD:{DATA_FILE}")
    except subprocess.CalledProcessError:
        return []
    data = json.loads(raw)
    return data if isinstance(data, list) else data.get("articles", [])


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--today", default=None, help="YYYY-MM-DD (standaard: vandaag)")
    args = ap.parse_args()

    today = args.today or date.today().isoformat()

    git("fetch", "-q", "origin", "main")
    have = {a.get("slug") for a in main_articles()}

    queue: list[tuple[str, int, dict]] = []
    for pr in draft_prs():
        for art in articles_on_branch(pr["number"]):
            slug = art.get("slug")
            if slug and slug not in have:
                queue.append((pr["headRefName"], pr["number"], art))

    if not queue:
        print("Wachtrij leeg — geen concept-artikelen meer open.")
        return 0

    branch, pr_number, art = queue[0]
    slug = art["slug"]
    art = dict(art)
    art["date"] = today

    print(f"Vandaag publiceren: {slug} (uit PR #{pr_number}, branch {branch})")
    print(f"  titel: {art.get('title')}")
    print(f"  datum: {today}  |  wachtrij: {len(queue)} artikel(en) over")

    if args.dry_run:
        print("DRY RUN — niets geschreven.")
        return 0

    data = main_articles()
    data.append(art)
    data.sort(key=lambda a: (a.get("date") or "", a.get("slug") or ""))
    Path(DATA_FILE).write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    git("add", DATA_FILE)
    git(
        "commit", "-m",
        f"publish: {slug} (concept-wachtrij, PR #{pr_number}, schema {today})",
    )
    git("push", "origin", "main")
    print("Gepusht naar main — deploy-workflow neemt het over.")

    # PR sluiten zodra al zijn artikelen op main staan
    remaining = [
        a for a in articles_on_branch(pr_number)
        if a.get("slug") and a["slug"] not in {x.get("slug") for x in data}
    ]
    if not remaining:
        run([
            "gh", "pr", "close", str(pr_number), "--comment",
            f"Alle artikelen uit deze PR zijn nu één voor één gepubliceerd "
            f"(laatste: `{slug}` op {today}). Sluiten om dubbel publiceren te voorkomen.",
        ], check=False)
        print(f"PR #{pr_number} gesloten — alle artikelen waren gepubliceerd.")
    else:
        print(f"PR #{pr_number} blijft open — nog {len(remaining)} artikel(en) in de wachtrij.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
