export const WHATSAPP_NUMBER = "6581234567";

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