"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyApiService = void 0;
const api_service_1 = require("./api.service");
class CurrencyApiService extends api_service_1.ApiService {
    static getAllCurrencies() {
        return CurrencyApiService.get('https://api.exchangerate.host/symbols').then(res => res.json());
    }
    static getCurrentRate(query) {
        return CurrencyApiService.get(`https://api.exchangerate.host/latest?symbols=${query}`).then(res => res.json());
    }
}
exports.CurrencyApiService = CurrencyApiService;
