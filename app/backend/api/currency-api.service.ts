import { CurrentRates } from "../entities/api/currency-api.interfaces";
import { ApiService } from "./api.service";

export class CurrencyApiService extends ApiService {
    static getAllCurrencies(): Promise<Record<string, string>> {
        return CurrencyApiService.get('https://api.exchangerate.host/symbols').then(res => res.json());
    }

    static getCurrentRate(query: string): Promise<CurrentRates> {
        return CurrencyApiService.get(`https://api.exchangerate.host/latest?${query}`).then(res => res.json());
    }
}