class LocalStorageService {
    public get<T>(key: string) {
        const json = localStorage.getItem(key);
        if (json) {
            return JSON.parse(json) as T;
        }
        return null;
    }

    public getString(key: string) {
        return localStorage.getItem(key);
    }

    public save<T>(key: string, entity: T) {
        const json = JSON.stringify(entity);
        localStorage.setItem(key, json);
    }

    public saveString(key: string, str: string) {
        localStorage.setItem(key, str);
    }

    public remove(key: string) {
        localStorage.removeItem(key);
    }

    public existKey(key: string) {
        return localStorage.getItem(key) !== null;
    }
}

export default new LocalStorageService();
