#!/usr/bin/env python3
"""Email verzending via msmtp (lokaal) of Resend API (cloud)."""

import sys
import json
import os
import subprocess
from datetime import datetime

def send_via_msmtp(to: str, subject: str, body: str, from_addr: str = "info@amarenl.com") -> dict:
    """Verstuur via lokaal msmtp."""
    try:
        message = f"From: {from_addr}\nTo: {to}\nSubject: {subject}\nContent-Type: text/plain; charset=UTF-8\n\n{body}\n"
        proc = subprocess.run(
            ["msmtp", "-f", from_addr, to],
            input=message.encode("utf-8"),
            capture_output=True,
            timeout=30
        )
        if proc.returncode == 0:
            return {"success": True, "error": None, "method": "msmtp"}
        else:
            return {"success": False, "error": proc.stderr.decode()[:500], "method": "msmtp"}
    except FileNotFoundError:
        return {"success": False, "error": "msmtp not installed", "method": "msmtp"}
    except Exception as e:
        return {"success": False, "error": str(e)[:500], "method": "msmtp"}

def send_via_resend(to: str, subject: str, body: str, from_addr: str, api_key: str) -> dict:
    """Verstuur via Resend API."""
    import urllib.request
    payload = json.dumps({
        "from": from_addr,
        "to": [to],
        "subject": subject,
        "text": body,
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read())
            return {"success": True, "error": None, "method": "resend", "id": result.get("id")}
    except Exception as e:
        return {"success": False, "error": str(e)[:500], "method": "resend"}

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Gebruik: python3 send-email.py <to> <subject> [body via stdin]")
        print("Omgevingsvariabelen: EMAIL_PROVIDER=msmtp|resend, RESEND_API_KEY=..., EMAIL_FROM=...")
        sys.exit(1)

    to = sys.argv[1]
    subject = sys.argv[2]
    body = sys.stdin.read().strip() if not sys.stdin.isatty() else ""

    provider = os.environ.get("EMAIL_PROVIDER", "msmtp")
    from_addr = os.environ.get("EMAIL_FROM", "AmareNL <info@amarenl.com>")

    if provider == "resend":
        api_key = os.environ.get("RESEND_API_KEY", "")
        if not api_key:
            print("ERROR: RESEND_API_KEY niet ingesteld")
            sys.exit(1)
        result = send_via_resend(to, subject, body, from_addr, api_key)
    else:
        result = send_via_msmtp(to, subject, body, from_addr)

    print(json.dumps(result, indent=2))
    sys.exit(0 if result["success"] else 1)
