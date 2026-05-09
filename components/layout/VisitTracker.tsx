"use client";

import { useEffect, useRef } from "react";
import { storeAffiliateVisit, incrementVisitCount } from "@/lib/affiliate";

/**
 * Ziyaret takibi — her sayfa yüklemesinde çalışır.
 * localStorage'a affiliate ID + ziyaret sayısı kaydeder.
 */
export default function VisitTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    storeAffiliateVisit();
    incrementVisitCount();
  }, []);

  return null;
}
