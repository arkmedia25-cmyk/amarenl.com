#!/bin/bash
# Wrapper for launchd: loads analytics/.env, runs the competitor tracker, logs output.
set -euo pipefail

ANALYTICS_DIR="/Users/ark/projects/amarenl.com/analytics"
cd "$ANALYTICS_DIR"

export PATH="/Users/ark/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

set -a
source .env
set +a

exec node scripts/track-competitor-ads.mjs
