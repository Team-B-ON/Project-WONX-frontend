export function getYearFromDate(dateStr?: string): string {
    if (!dateStr) return '';
    return dateStr.slice(0, 4);
}