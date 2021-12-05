import {CurrencyNames, CurrentRates } from "../entities/api/currency-api.interfaces";
import { ApiService } from "./api.service";

export class CurrencyApiService extends ApiService {
    static getAllCurrencies(): Promise<CurrencyNames> {
        return CurrencyApiService.get('/v1/api/currency-name').then(res => res.json());
        // return CurrencyApiService.get('https://api.exchangerate.host/symbols').then(res => res.json());
    }

    static getCurrentRate(query: string[]): Promise<CurrentRates> {
        // return CurrencyApiService.get(`https://api.exchangerate.host/latest?symbols=${query.toString()}`).then(res => res.json());
        return CurrencyApiService.get(`/v1/api/currency-rate?symbols=${query.toString()}`).then(res => res.json());
    }
}