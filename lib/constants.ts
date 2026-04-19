export const WHATSAPP_NUMBER = "60142918390";

/** Canonical origin for product/WhatsApp links (no trailing slash). Override via NEXT_PUBLIC_SITE_URL. */
export const SITE_ORIGIN =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
    "https://www.luxxzone.shop";

export function productCanonicalUrl(productId: number): string {
    return `${SITE_ORIGIN}/product/${productId}`;
}

/** Prefilled WhatsApp: "Hi, I want to purchase: NAME\nURL" */
export function whatsappPurchaseInquiryHref(productName: string, productPageUrl: string): string {
    const text = `Hi, I want to purchase: ${productName}\n${productPageUrl}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const TELEGRAM_URL = "https://t.me/LuxxZoneee";

export const PLACEHOLDER_IMAGE = "/fallback.jpg";

/** Default link preview image when there is no product photo. */
export const DEFAULT_BRAND_OG_PATH = "/logo-horizontal-bg-white.png";

export function defaultBrandOgImageUrl(): string {
    return `${SITE_ORIGIN}${DEFAULT_BRAND_OG_PATH}`;
}