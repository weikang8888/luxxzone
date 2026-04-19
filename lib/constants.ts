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

// 品牌列表 - 与 category 页 filter 及 Header mobile dropdown 共用
export const clothingBrandOptions = [
    "Shop All",
    "Amiri",
    "Balenciaga",
    "Balmain",
    "Bottega Veneta",
    "Burberry",
    "Casablanca",
    "Celine",
    "Chanel",
    "Chrome Hearts",
    "Christian Dior",
    "Fendi",
    "Givenchy",
    "Gucci",
    "Hermes",
    "Jil Sander",
    "Loewe",
    "Louis Vuitton",
    "Miu Miu",
    "Moncler",
    "Philipp Plein",
    "Prada",
    "Thom Browne",
    "Valentino",
    "Versace",
    "Vetements",
    "We11done",
    "YSL",
    "Other Tshirt",
];

export function getClothingSubItems(): { label: string; href: string }[] {
    return clothingBrandOptions.map((brand) => ({
        label: brand,
        href: brand === "Shop All" ? "/category/clothing" : `/category/clothing?brand=${brandToSlug(brand)}`,
    }));
}

function brandToSlug(brand: string): string {
    return brand.toLowerCase().replace(/\s+/g, "-");
}