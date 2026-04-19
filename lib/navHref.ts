/** Active when on category index or any nested path under that category (e.g. subcategory). */
export function isCategoryHrefActive(pathname: string, categoryHref: string): boolean {
    return pathname === categoryHref || pathname.startsWith(`${categoryHref}/`);
}
