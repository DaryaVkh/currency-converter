import {AppAction, AppReducerState} from './app-reducer.interfaces';
import {merge} from 'lodash-es';
import {
    SET_CURRENCY_NAMES,
    SET_CURRENCY_RATES,
    SET_LOADED,
    ADD_CURRENCY,
    CHANGE_BASE_CURRENCY,
    CHANGE_BASE_CURRENCY_VALUE,
    DELETE_CURRENCY
} from '../../actions/app-actions/app-action-types';
import {Reducer} from 'redux';

const initialState: AppReducerState = {
    currencyNames: {symbols: {}},
    currencyRates: {rates: {}},
    isLoaded: false,
    currentBaseCurrency: 'EUR',
    currentBaseCurrencyValue: '0',
    additionCurrencies: []
}

export const appReducer: Reducer<AppReducerState, AppAction> = (state: AppReducerState = initialState, action: AppAction): AppReducerState => {
    switch (action.type) {
        case SET_CURRENCY_NAMES:
            return {
                ...state,
                currencyNames: action.payload
            } as AppReducerState;
        case SET_CURRENCY_RATES:
            return {
                ...state,
                currencyRates: merge(state.currencyRates, action.payload)
            } as AppReducerState;
        case SET_LOADED:
            return {
                ...state,
                isLoaded: true
            } as AppReducerState;
        case CHANGE_BASE_CURRENCY:
            return {
                ...state,
                currentBaseCurrency: action.payload
            } as AppReducerState;
        case CHANGE_BASE_CURRENCY_VALUE:
            return {
                ...state,
                currentBaseCurrencyValue: action.payload
            } as AppReducerState;
        case ADD_CURRENCY:
            return {
                ...state,
                additionCurrencies: [...state.additionCurrencies, action.payload]
            } as AppReducerState;
        case DELETE_CURRENCY:
            return {
                ...state,
                additionCurrencies: [...state.additionCurrencies.filter(ac => ac !== action.payload)],
                currencyRates: {rates: Object.fromEntries(Object.entries(state.currencyRates.rates).filter(([key, _]) => key !== action.payload)) as Record<string, number>}
            } as AppReducerState;
        default:
            return state;
    }
}