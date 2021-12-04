import { CurrentRates } from "../entities/api/currency-api.interfaces";
import { ApiService } from "./api.service";

export class CurrencyApiService extends ApiService {
    static getAllCurrencies(): Promise<Record<string, string>> {
        return CurrencyApiService.get('https://openexchangerates.org/api/currencies.json').then(res => res.json());
    }

    static getCurrentRate(): Promise<CurrentRates> {
        return CurrencyApiService.get('https://api.exchangerate.host/latest').then(res => res.json());
    }
}