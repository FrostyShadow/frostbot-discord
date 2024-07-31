export function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

export function addMonths(date: Date, months: number): Date {
    date.setMonth(date.getMonth() + months);
    return date;
}

export function addYears(date: Date, years: number): Date {
    date.setFullYear(date.getFullYear() + years);
    return date;
}