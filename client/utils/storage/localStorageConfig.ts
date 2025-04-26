import logger from "../logger.ts";

export const setLocalStorageValue = (key: string, value: unknown): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        logger(`Error setting localStorage value for key "${key}": ${error}`, 'error');
    }
};

export const getLocalStorageValue = <T>(key: string): T | null => {
    try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) as T : null;
    } catch (error) {
        logger(`Error getting localStorage value for key "${key}": ${error}`, 'error'); 
        return null;
    }
};