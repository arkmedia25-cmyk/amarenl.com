/**
 * AmareNL Affiliate Tracking Systeem — 3-katmanlı koruma
 *
 * Katman 1 — localStorage: Ziyaretçinin tarayıcısına affiliate ID kaydeder.
 *   Buton tıklamalarında her zaman bu ID URL'ye eklenir.
 * Katman 2 — Akıllı Yönlendirme (/go): localStorage'daki ID ile
 *   otomatik amare.com'a yönlendirir. Bookmark için ideal.
 * Katman 3 — Geri Dönen Ziyaretçi Banner'ı: Daha önce gelmiş
 *   ziyaretçiye özel karşılama ve hızlı Amare yönlendirmesi.
 */

const STORAGE_KEY = "amarenl_aff";
const AFFILIATE_ID = "2075008";
const AMARE_BASE = `https://www.amare.com/${AFFILIATE_ID}/nl-nl`;

export { AFFILIATE_ID, AMARE_BASE };

/**
 * Geçerli affiliate ID'yi döndürür.
 * Önce localStorage'a bakar, yoksa varsayılan ID'yi kullanır.
 */
export function getAffiliateId(): string {
  if (typeof window === "undefined") return AFFILIATE_ID;
  return localStorage.getItem(STORAGE_KEY) || AFFILIATE_ID;
}

/**
 * Ziyaretçinin tarayıcısına affiliate ziyaret kaydı bırakır.
 * Her buton tıklamasında ve sayfa ziyaretinde çağrılır.
 */
export function storeAffiliateVisit(): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  localStorage.setItem(STORAGE_KEY, AFFILIATE_ID);
  localStorage.setItem(`${STORAGE_KEY}_ts`, String(now));
}

/**
 * Ziyaretçi daha önce bu siteden gelmiş mi?
 * Banner göstermek için kullanılır.
 */
export function isReturnVisitor(): boolean {
  if (typeof window === "undefined") return false;
  const ts = localStorage.getItem(`${STORAGE_KEY}_ts`);
  if (!ts) return false;
  // En az 1 saat önce gelmişse "geri dönen" sayılır
  return Date.now() - parseInt(ts, 10) > 3600000;
}

/**
 * Ziyaretçi bu siteyi kaç kez ziyaret etmiş?
 */
export function getVisitCount(): number {
  if (typeof window === "undefined") return 0;
  const count = localStorage.getItem(`${STORAGE_KEY}_visits`);
  return count ? parseInt(count, 10) : 0;
}

/**
 * Ziyaret sayısını 1 artırır.
 */
export function incrementVisitCount(): void {
  if (typeof window === "undefined") return;
  const count = getVisitCount();
  localStorage.setItem(`${STORAGE_KEY}_visits`, String(count + 1));
}

/**
 * Amare ürün linkini oluşturur.
 * /go sayfası için.
 */
export function getAmareUrl(productPath?: string): string {
  if (productPath) {
    return `${AMARE_BASE}/${productPath}`;
  }
  return AMARE_BASE;
}
