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


/**
 * 
 * Utilities for handling <input type="datetime-local"> and UTC Database storage
 */

/**
 * Converts the value from a datetime-local input to an ISO UTC string for the DB.
 * Example: "2026-01-31T13:14" -> "2026-01-31T07:44:00.000Z" (depending on local offset)
 */
export const toUTCForDB = (localDateTime: string | undefined | null): string => {
    if (!localDateTime) return "";
    const date = new Date(localDateTime);
    return date.toISOString();
};

/**
 * Converts a UTC ISO string from the DB back to the format <input type="datetime-local"> expects.
 * Format required by browser: YYYY-MM-DDThh:mm (24-hour clock)
 */
export const toLocalForInput = (utcString: string): string => {
    if (!utcString) return "";

    const date = new Date(utcString);

    // Offset conversion: Adjust UTC to Local
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);

    // Return formatted as YYYY-MM-DDThh:mm
    return localDate.toISOString().slice(0, 16);
};

/**
 * Formats a UTC string into a human-readable local string for display (not inputs).
 * Example: "Jan 31, 2026, 1:14 PM"
 */
export const toDisplayString = (utcString: string): string => {
    if (!utcString) return "N/A";
    return new Date(utcString).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
};