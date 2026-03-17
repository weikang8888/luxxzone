import { getClothingSubItems } from "@/lib/constants";

// 导航分类 - Desktop 与 Mobile menu 共用
export const leftCategories = [
    { label: "New Arrivals", href: "/category/new-arrivals" },
    { label: "Clothing", href: "/category/clothing" },
    { label: "Shoes", href: "/category/shoes" },
    { label: "Bags", href: "/category/bags" },
    { label: "Accessories", href: "/category/accessories" },
    { label: "Sale", href: "/sale" },
];

export const rightCategories = [
    { label: "Shoes", href: "/category/shoes" },
    { label: "Clothing", href: "/category/clothing" },
    { label: "New Arrivals", href: "/category/new-arrivals" },
    { label: "Sale", href: "/sale" },
    { label: "Accessories", href: "/category/accessories" },
    { label: "Bags", href: "/category/bags" },
];

// 带 dropdown 的分类及其子项 (mobile menu)
export const categorySubItems: Record<string, { label: string; href: string }[]> = {
    Clothing: getClothingSubItems(),
    Shoes: [
        { label: "Shop All Shoes", href: "/category/shoes" },
        { label: "Sneakers", href: "/category/shoes?type=sneakers" },
        { label: "Boots", href: "/category/shoes?type=boots" },
        { label: "Loafers", href: "/category/shoes?type=loafers" },
    ],
    Bags: [
        { label: "Shop All Bags", href: "/category/bags" },
        { label: "Backpacks", href: "/category/bags?type=backpacks" },
        { label: "Crossbody", href: "/category/bags?type=crossbody" },
        { label: "Totes", href: "/category/bags?type=totes" },
    ],
    Accessories: [
        { label: "Shop All Accessories", href: "/category/accessories" },
        { label: "Belts", href: "/category/accessories?type=belts" },
        { label: "Hats", href: "/category/accessories?type=hats" },
        { label: "Jewelry", href: "/category/accessories?type=jewelry" },
    ],
};

export const DROPDOWN_CATEGORIES = ["Clothing", "Shoes", "Bags", "Accessories"];
