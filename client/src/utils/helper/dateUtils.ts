export function saveToDb(date: string | Date): string {
    let formattedDate: string;
    if (typeof date === 'string') {
        formattedDate = new Date(date).toUTCString();
    }
    else {
        formattedDate = date.toUTCString();
    }

    return formattedDate;
}

export function dbToDate(date: string): Date {
    return new Date(date);
}

export function dbToDateTimeInput(now: Date): string {

    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
}