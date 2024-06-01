class Storage {
    private storage: Record<string, string> = {};

    get(key: string): string | undefined {
        return this.storage[key];
    }

    set(key: string, value: string): void {
        this.storage[key] = value;
    }
}

export const storage = new Storage();
