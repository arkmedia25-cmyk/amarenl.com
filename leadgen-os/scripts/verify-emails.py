#!/usr/bin/env python3
"""Email verificatie via SMTP handshake + MX record check."""

import sys
import json
import socket
import smtplib
import re

def check_mx(domain: str) -> bool:
    """Check of domain MX records heeft."""
    try:
        import dns.resolver
        answers = dns.resolver.resolve(domain, 'MX')
        return len(answers) > 0
    except Exception:
        return False

def verify_smtp(email: str, timeout: int = 10) -> dict:
    """SMTP handshake verificatie (zonder mail te sturen)."""
    domain = email.split("@")[1] if "@" in email else ""

    result = {
        "email": email,
        "valid_syntax": bool(re.match(r'^[\w.+-]+@[\w-]+\.[\w.-]+$', email)),
        "domain_exists": False,
        "mx_found": False,
        "smtp_checked": False,
        "status": "unknown",
        "error": None,
    }

    if not result["valid_syntax"]:
        result["status"] = "invalid_syntax"
        return result

    # MX check
    try:
        socket.gethostbyname(domain)
        result["domain_exists"] = True
    except socket.gaierror:
        result["status"] = "domain_not_found"
        return result

    # DNS MX check (vereist dnspython, anders overslaan)
    try:
        import dns.resolver
        mx_records = dns.resolver.resolve(domain, 'MX')
        mx_host = str(mx_records[0].exchange).rstrip('.')
        result["mx_found"] = True
    except Exception:
        # Fallback: probeer domain zelf
        mx_host = domain
        result["mx_found"] = False

    # SMTP handshake
    try:
        server = smtplib.SMTP(timeout=timeout)
        server.connect(mx_host)
        server.helo("verify.local")
        server.mail("verify@verify.local")
        code, msg = server.docmd("RCPT TO:<%s>" % email)
        server.quit()

        if code == 250:
            result["status"] = "deliverable"
            result["smtp_checked"] = True
        elif code == 550:
            result["status"] = "undeliverable"
            result["smtp_checked"] = True
        else:
            result["status"] = "unknown"
            result["smtp_checked"] = True
            result["error"] = f"SMTP code {code}: {msg.decode() if isinstance(msg, bytes) else msg}"
    except Exception as e:
        result["status"] = "smtp_error"
        result["error"] = str(e)[:200]

    return result

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Gebruik: python3 verify-emails.py email1@domein.nl [email2@domein.nl ...]")
        print("Of: python3 verify-emails.py --json data/leads-raw.json")
        sys.exit(1)

    emails = []
    if sys.argv[1] == "--json":
        import os
        path = sys.argv[2] if len(sys.argv) > 2 else "data/leads-raw.json"
        if os.path.exists(path):
            with open(path) as f:
                leads = json.load(f)
                emails = [l.get("email", "") for l in leads if l.get("email")]
    else:
        emails = sys.argv[1:]

    results = []
    for email in emails:
        result = verify_smtp(email)
        results.append(result)
        status = result["status"]
        print(f"  {email}: {status}", file=sys.stderr)

    print(json.dumps(results, indent=2, ensure_ascii=False))

    # Samenvatting
    valid = sum(1 for r in results if r["status"] == "deliverable")
    invalid = sum(1 for r in results if r["status"] in ("undeliverable", "invalid_syntax", "domain_not_found"))
    unknown = len(results) - valid - invalid
    print(f"\nSamenvatting: {valid} deliverable, {invalid} invalid, {unknown} unknown", file=sys.stderr)
