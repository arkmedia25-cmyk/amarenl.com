# AmareNL Analytics — ClickHouse

Local ClickHouse instance for Meta Ads + Amare backoffice reporting. Not deployed anywhere — runs on the local machine via Docker.

## Status (2026-08-03)

**Fully working, end-to-end confirmed with real data:**
- Docker + ClickHouse running, `ad_performance` and `competitor_ads` tables live.
- Meta setup complete: business `holistiglow` (id `1372325337373227`) has a registered app **AmareNL Analytics** (id `1936506310377907`) and a System User **`amarenl-analytics`** (id `61592490879129`) with read-only access to the `HolistiGlow` ad account.
- `META_ACCESS_TOKEN` (System User token, never expires) + `META_AD_ACCOUNT_ID` set. `scripts/ingest-meta-ads.mjs` test-run against real API: works, zero errors. Returns 0 rows because the "Supplementenwijzer Leads" test campaign ([[project-amarenl-meta-ads-campaign]]) is still in Concept/paused status — re-run once that campaign is live.
- `META_USER_ACCESS_TOKEN` (personal, long-lived, 60-day) obtained and set via the token-exchange flow below.
- **`scripts/track-competitor-ads.mjs` ran for real and populated `competitor_ads`**: Vitakruid 1600 ads, Orthica 130, Vitals 2757 (noisy, generic search term, as expected), Nutriphyt 104. Active-ad-count query confirms real signal: Vitakruid 73 active, Nutriphyt 36, Orthica 11, Vitals 4.
- **Daily cron confirmed working end-to-end**: manually triggered via `launchctl kickstart`, ran with zero errors, ingested all 4 competitors' current data.

**Key finding — two different Meta tokens are required, not one:**
The Ad Library API **rejects System User tokens** for EU-reached ads (`OAuthException code 10, subcode 2332002`), even with a valid app + `ads_read` + completed identity verification on the system user's business. It requires a **personal, ID-verified User Access Token** instead. So `track-competitor-ads.mjs` uses `META_USER_ACCESS_TOKEN` (personal, 60-day) while `ingest-meta-ads.mjs` uses `META_ACCESS_TOKEN` (System User, permanent). See "Getting the User Access Token" below for the (now working, tested) exchange process — `scripts/exchange-token.py` handles the whole thing in one command.

**Reminder — recurring task**: `META_USER_ACCESS_TOKEN` expires in 60 days (~2026-10-02). The cron will start silently failing (`Missing META_USER_ACCESS_TOKEN` or an auth error) after that until it's refreshed. Re-running the "Getting the User Access Token" steps below regenerates it.

**Still open:**
- Amare backoffice CSV ingestion: not built, no sample export/columns provided yet.
- Once the Meta Ads test campaign goes live, re-run `ingest-meta-ads.mjs` and confirm real rows land in `ad_performance`.
- `competitors.json`: "Vitals" search is noisy (generic word) — once its real `page_id` is known from the data already collected, switch that entry to `search_page_ids` for precision.

## Getting the User Access Token (for `track-competitor-ads.mjs`)

Must be done by the account owner in their own browser/terminal — Claude never handles the token value itself, same rule as passwords. **Tested and confirmed working (2026-08-03).**

1. Go to `https://developers.facebook.com/tools/explorer/1936506310377907/` (the AmareNL Analytics app's Graph API Explorer).
2. **User or Page** → "Get Token" → "Get User Access Token", add the `ads_read` permission, approve the consent dialog ("Doorgaan als ...").
3. Copy the resulting **short-lived** token (~1-2 hours — it expires fast, do the next steps promptly).
4. Add two temp lines to `analytics/.env` if they're not already there (`TEMP_APP_SECRET=` and `TEMP_SHORT_LIVED_TOKEN=`), then fill them in with `nano analytics/.env` — App Secret from `developers.facebook.com/apps/1936506310377907/settings/basic/` → Show, and the token from step 3. Cursor to end of each line, paste, Ctrl+O, Enter, Ctrl+X.
   - **Use a fresh Terminal window/tab for this**, not one with other commands mid-entry — a stuck multi-line paste (e.g. an unclosed quote leaving a `dquote>` prompt) will silently corrupt the file if you type more commands into it. If a prompt ever looks stuck or unfamiliar, close the window and open a new one rather than trying to fix it in place.
5. Run:
   ```bash
   python3 /Users/ark/projects/amarenl.com/analytics/scripts/exchange-token.py
   ```
   This one script does the whole exchange: reads `TEMP_APP_SECRET`/`TEMP_SHORT_LIVED_TOKEN` from `.env`, calls Meta's token-exchange endpoint, writes the resulting long-lived token straight into `META_USER_ACCESS_TOKEN`, and removes the temp lines. The token value never appears in terminal output — only `OK: ...` or `ERROR: ...` does.
6. If it prints `ERROR: ...`, the short-lived token likely expired (only good for 1-2h) — go back to step 1 for a fresh one and re-run step 5.

## Start

```bash
cd analytics
cp .env.example .env   # edit CLICKHOUSE_PASSWORD before first run
docker compose up -d
```

`ad_performance` table is created automatically on first boot from `clickhouse-init/001_ad_performance.sql`.

## Connect

```bash
docker exec -it amarenl-clickhouse clickhouse-client --user amarenl --password
```

Or HTTP interface: `http://localhost:8123` (same user/password).

## Schema

`ad_performance(date, campaign, creative, angle, impressions, clicks, spend, conversions, ingested_at)` — `ReplacingMergeTree(ingested_at)`, ordered by `(date, campaign, creative)`. Re-running ingestion for the same date/campaign/creative is safe: ClickHouse keeps the newest `ingested_at` row on merge. If you need guaranteed-deduped reads immediately (before a background merge happens), add `FINAL` to the query or run `OPTIMIZE TABLE ad_performance FINAL`.

## Stop / reset

```bash
docker compose down          # stop, keep data
docker compose down -v       # stop, wipe data volumes
```

## Loading data

### Meta Ads (`scripts/ingest-meta-ads.mjs`)

Pulls ad-level daily insights (impressions, clicks, spend, leads) from the Meta Marketing API and inserts them into `ad_performance`. No dependencies — plain Node (needs Node 18+ for `fetch`).

```bash
export META_ACCESS_TOKEN=...       # system-user token with ads_read on the ad account
export META_AD_ACCOUNT_ID=...      # numeric id, no "act_" prefix
export CLICKHOUSE_PASSWORD=...     # same as analytics/.env

node scripts/ingest-meta-ads.mjs                                  # yesterday (default)
node scripts/ingest-meta-ads.mjs --since 2026-07-24 --until 2026-07-30
```

`angle` is not a Meta object — it's assigned by matching `ad_name` against `scripts/angle-map.json`. Add an entry there every time a new ad/creative goes live, or it lands in reporting as `angle = "unmapped"`.

Not yet wired up: `META_ACCESS_TOKEN` and `META_AD_ACCOUNT_ID` aren't in `.env.local` yet — only `META_CAPI_TOKEN` (a separate, CAPI-scoped token) exists there.

### Amare backoffice CSV

Not built yet — need a sample export (or its column headers) from the backoffice "Rapport downloaden" CSV first, since there's no API/webhook for it (manual export only). This is a separate reconciliation stream (real sales), not ad-level, so it likely lands in its own table rather than `ad_performance`.

### Competitor ad tracking (`scripts/track-competitor-ads.mjs`)

Pulls competitor ad creatives from the **Meta Ad Library** (Meta's public ad-transparency API — not scraping, an official documented endpoint) and writes them into `competitor_ads`. Tracks 4 NL supplement/wellness competitors defined in `scripts/competitors.json`: Vitakruid, Orthica, Vitals, Nutriphyt.

```bash
export META_USER_ACCESS_TOKEN=...  # personal, ID-verified User token — NOT the System User token, see "Getting the User Access Token" above
export CLICKHOUSE_PASSWORD=...

node scripts/track-competitor-ads.mjs
```

Confirmed (2026-08-01): requires the user's personal Meta account to have completed identity verification at `facebook.com/id` (EU Digital Services Act requirement for EU-reached ads), **and** requires a personal User Access Token — System User tokens are rejected even when everything else is correctly set up. See "Key finding" in Status above.

- **impressions/spend**: historically only populated for political/issue ads, not ordinary commercial ads — so for these 4 competitors those fields will likely come back empty. The tracker still captures creative text, page, platforms, start/stop dates, and a link to the actual ad (`snapshot_url`), which is the main point.

`competitors.json` note: "Vitals" is a generic English word, so free-text search will be noisy — once the first run surfaces their actual `page_id`, switch that entry to `search_page_ids` for precision.

**Analysis**: `competitor-analysis-queries.sql` has 4 ready queries — active ad count per competitor, new ads in the last 7 days, average ad run-length per competitor, and longest-running (likely "winning") active ads. All validated to run cleanly against the schema.

**Daily cron**: set up via macOS `launchd`, runs every day at 08:00.

```bash
# manage the job
launchctl load ~/Library/LaunchAgents/com.amarenl.analytics.competitor-ads.plist    # enable
launchctl unload ~/Library/LaunchAgents/com.amarenl.analytics.competitor-ads.plist  # disable
launchctl kickstart -k gui/$(id -u)/com.amarenl.analytics.competitor-ads            # run right now, don't wait for 08:00

# logs
tail -f analytics/logs/competitor-ads.log
tail -f analytics/logs/competitor-ads.err.log
```

Requirements for the cron to actually succeed:
- **Docker Desktop must be running** (so ClickHouse is reachable at `localhost:8123`) — Docker Desktop doesn't auto-start on login by default; enable that in Docker Desktop settings if you want this fully hands-off.
- **`analytics/.env` must have `META_ACCESS_TOKEN` filled in** — currently empty, the job will fail (see `competitor-ads.err.log`) until it's set. The wrapper script (`scripts/run-track-competitor-ads.sh`) sources `analytics/.env` at run time, so once you fill it in, no restart of the cron job is needed — the next scheduled run just picks it up.
