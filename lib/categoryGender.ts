/** Categories API: 1 = men only, 2 = women only, 3 = show under both men and women. */
export function categoryMatchesGender(categorySexDegree: number, routeSexDegree: 1 | 2): boolean {
    return categorySexDegree === routeSexDegree || categorySexDegree === 3;
}
