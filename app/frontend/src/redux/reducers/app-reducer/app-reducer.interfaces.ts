import {CurrencyNames, CurrencyRates} from '../../../entities/api/currency-api.interfaces';

export interface AppReducerState {
    currencyNames: CurrencyNames,
    currencyRates: CurrencyRates,
    isLoaded: boolean,
    currentBaseCurrency: string,
    currentBaseCurrencyValue: string,
    additionCurrencies: string[]
}

export interface AppAction {
    type: string,
    payload?: string | CurrencyNames | CurrencyRates
}