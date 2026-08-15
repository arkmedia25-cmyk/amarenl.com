#!/usr/bin/env python3
import sys
import json
import urllib.request

ENV_PATH = "/Users/ark/projects/amarenl.com/analytics/.env"


def read_env():
    values = {}
    with open(ENV_PATH) as f:
        for line in f:
            if "=" in line and not line.strip().startswith("#"):
                k, _, v = line.strip().partition("=")
                values[k] = v
    return values


def main():
    env = read_env()
    app_secret = env.get("TEMP_APP_SECRET")
    short_token = env.get("TEMP_SHORT_LIVED_TOKEN")

    if not app_secret or not short_token:
        print("ERROR: TEMP_APP_SECRET or TEMP_SHORT_LIVED_TOKEN is empty in .env")
        sys.exit(1)

    url = (
        "https://graph.facebook.com/v21.0/oauth/access_token"
        "?grant_type=fb_exchange_token"
        "&client_id=1936506310377907"
        f"&client_secret={app_secret}"
        f"&fb_exchange_token={short_token}"
    )

    with urllib.request.urlopen(url) as resp:
        data = json.load(resp)

    token = data.get("access_token")
    if not token:
        print("ERROR:", data)
        sys.exit(1)

    with open(ENV_PATH) as f:
        lines = f.readlines()

    lines = [
        l
        for l in lines
        if not l.startswith(("TEMP_APP_SECRET=", "TEMP_SHORT_LIVED_TOKEN="))
        and "Geçici: sadece token" not in l
    ]
    lines = [
        f"META_USER_ACCESS_TOKEN={token}\n"
        if l.startswith("META_USER_ACCESS_TOKEN=")
        else l
        for l in lines
    ]

    with open(ENV_PATH, "w") as f:
        f.writelines(lines)

    print("OK: META_USER_ACCESS_TOKEN saved, temp lines removed.")


if __name__ == "__main__":
    main()
