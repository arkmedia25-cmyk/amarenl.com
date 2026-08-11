CREATE TABLE IF NOT EXISTS amarenl_analytics.ad_performance
(
    date         Date,
    campaign     String,
    creative     String,
    angle        String,
    impressions  UInt64,
    clicks       UInt64,
    spend        Float64,
    conversions  UInt64,
    ingested_at  DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(ingested_at)
ORDER BY (date, campaign, creative);
