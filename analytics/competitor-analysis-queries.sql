-- 1) Rakip başına şu an aktif (hâlâ yayında) reklam sayısı — kim daha çok kampanya koşturuyor?
SELECT
    competitor,
    countDistinct(ad_archive_id) AS active_ads
FROM competitor_ads FINAL
WHERE is_active = 1
GROUP BY competitor
ORDER BY active_ads DESC;


-- 2) Son 7 günde yeni başlayan reklamlar — kim yeni bir şey test ediyor?
SELECT
    competitor,
    ad_archive_id,
    page_name,
    ad_creative_body,
    ad_delivery_start_time,
    snapshot_url
FROM competitor_ads FINAL
WHERE ad_delivery_start_time >= today() - 7
ORDER BY competitor, ad_delivery_start_time DESC;


-- 3) Rakip başına ortalama reklam yayın süresi (durmuş reklamlar için) — kim uzun süre aynı kreatifte kalıyor (evergreen/kazanan sinyali)?
SELECT
    competitor,
    round(avg(dateDiff('day', ad_delivery_start_time, ad_delivery_stop_time)), 1) AS avg_run_days,
    count() AS stopped_ads
FROM competitor_ads FINAL
WHERE is_active = 0 AND ad_delivery_start_time IS NOT NULL AND ad_delivery_stop_time IS NOT NULL
GROUP BY competitor
ORDER BY avg_run_days DESC;


-- 4) En uzun süredir kesintisiz aktif olan reklamlar — muhtemelen "kazanan" kreatifler
SELECT
    competitor,
    page_name,
    ad_creative_body,
    ad_delivery_start_time,
    dateDiff('day', ad_delivery_start_time, today()) AS days_running,
    snapshot_url
FROM competitor_ads FINAL
WHERE is_active = 1 AND ad_delivery_start_time IS NOT NULL
ORDER BY days_running DESC
LIMIT 20;
