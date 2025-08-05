export default class sessionStorage {
    private k: string;
    constructor(key: string) {
        this.k = key;
    }

    set = (v: string): void => {
        window.sessionStorage.setItem(this.k, v);
    };

    get = (): string | null => {
        return window.sessionStorage.getItem(this.k);
    };

    remove = (): void => {
        return window.sessionStorage.removeItem(this.k);
    };
    clear = (): void => {
        return window.sessionStorage.clear();
    };

};