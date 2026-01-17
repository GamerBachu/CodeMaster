export function saveToDb(date: string | Date): string {
    let formattedDate: string;
    if (!date) return "";
    else if (typeof date === 'string') {
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

export function dbToDateTimeInput(now: Date | string | undefined): string {
    let value = new Date();
    if (!now) return "";
    else if (typeof now === 'string') {
        value = new Date(now);
    }
    else {
        value = now;
    }

    value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
    return value.toISOString().slice(0, 16);
}


export function getDateString(): string {

    return new Date().toISOString();
}