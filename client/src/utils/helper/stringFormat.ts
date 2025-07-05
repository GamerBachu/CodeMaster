/**
 * Converts a date string or Date object to an ISO datetime string.
 * Performs type and validity checks (SOC: Separation of Concerns).
 * Returns an empty string if input is invalid.
 * @param input - Date string or Date object
 * @returns ISO datetime string or empty string if invalid
 */
export function toViewString(input: string | Date, withTime: boolean = false, emptyReplaceWith: string = "-"): string {
    let date: Date;

    if (input instanceof Date) {
        date = input;
    } else if (typeof input === 'string') {
        const parsed = new Date(input);
        if (isNaN(parsed.getTime())) return emptyReplaceWith;
        date = parsed;
    } else {
        return emptyReplaceWith;
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    if (withTime)
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
            + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    else
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `;
}

export default { toViewString };