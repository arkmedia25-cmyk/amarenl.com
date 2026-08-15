CREATE TABLE IF NOT EXISTS amarenl_analytics.competitor_ads
(
    competitor               String,
    page_id                  String,
    page_name                String,
    ad_archive_id            String,
    ad_creative_body         String,
    ad_creative_link_title   String,
    ad_creative_link_caption String,
    ad_delivery_start_time   Nullable(Date),
    ad_delivery_stop_time    Nullable(Date),
    is_active                UInt8,
    publisher_platforms      String,
    snapshot_url             String,
    ingested_at              DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(ingested_at)
ORDER BY (competitor, ad_archive_id);
