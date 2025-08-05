export default class applicationStorage {
    private k: string;
    constructor(key: string) {
        this.k = key;
    }

    set = (v: string): void => {
        window.localStorage.setItem(this.k, v);
    };

    get = (): string | null => {
        return window.localStorage.getItem(this.k);
    };

    remove = (): void => {
        return window.localStorage.removeItem(this.k);
    };
    clear = (): void => {
        return window.localStorage.clear();
    };

};