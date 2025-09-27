

export function onlyNumberAllowed(value: string): boolean {
    if (!/^\d*\.?\d*$/.test(value)) {
        return false;
    }
    return true;
}