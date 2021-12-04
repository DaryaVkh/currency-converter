import fetch from 'node-fetch';
import { RequestInit } from 'node-fetch';

export class ApiService {
    protected static get(url: string, options?: RequestInit) {
        return fetch(url, options);
    }
}