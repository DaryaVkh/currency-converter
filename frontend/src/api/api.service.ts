export class ApiService {
    protected static get(url: string, options?: RequestInit) {
        return fetch(url, options);
    }
}