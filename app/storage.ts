class Storage {
    private storage: Record<string, string> = {};

    get(key: string): string | undefined {
        return this.storage[key];
    }

    set(key: string, value: string): void {
        this.storage[key] = value;
    }

    expireInMillis(key: string, millis: number): void {
        setTimeout(() => {
            delete this.storage[key];
        }, millis);
    }
}

export const storage = new Storage();
