import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {CurrencyNames, CurrencyRates} from '../../../entities/api/currency-api.interfaces';
import {CurrencyApiService} from '../../../api/currency-api.service';
import {defaultCurrencies} from '../../../entities/common/common.constants';
import {
    SET_CURRENCY_NAMES,
    SET_CURRENCY_RATES,
    SET_LOADED,
    ADD_CURRENCY,
    CHANGE_BASE_CURRENCY,
    CHANGE_BASE_CURRENCY_VALUE,
    DELETE_CURRENCY
} from './app-action-types';
import {AppAction} from '../../reducers/app-reducer/app-reducer.interfaces';
import {store} from '../../../index';

function setLoaded() {
    return {
        type: SET_LOADED
    };
}

function setCurrencyNames(currencyNames: CurrencyNames) {
    return {
        type: SET_CURRENCY_NAMES,
        payload: currencyNames
    };
}

function setCurrencyRates(currencyRates: CurrencyRates) {
    return {
        type: SET_CURRENCY_RATES,
        payload: currencyRates
    };
}

export const getCurrencyNamesAndRates = (): ThunkAction<Promise<void>, {}, {}, AppAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>): Promise<void> => {
        return CurrencyApiService.getAllCurrencies()
            .then((currencyNames) => {
                dispatch(setCurrencyNames(currencyNames));
            })
            .then(() => CurrencyApiService.getCurrencyRate(defaultCurrencies))
            .then((currencyRates) => {
                dispatch(setCurrencyRates(currencyRates))
            })
            .then(() => {
                dispatch(setLoaded())
            });
    };
}

export const getCurrencyRate = (newCurrency: string): ThunkAction<Promise<void>, {}, {}, AppAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>): Promise<void> => {
        return CurrencyApiService.getCurrencyRate([newCurrency])
            .then((currencyRates) => {
                dispatch(setCurrencyRates(currencyRates))
            });
    };
}

export const updateCurrencyRates = (): ThunkAction<Promise<void>, {}, {}, AppAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>): Promise<void> => {
        const actualCurrencies = [...defaultCurrencies, ...store.getState().appReducer.additionCurrencies]
        return CurrencyApiService.getCurrencyRate([...actualCurrencies])
            .then((currencyRates) => {
                dispatch(setCurrencyRates(currencyRates));
            });
    };
}

export function changeBaseCurrency(newBaseCurrency: string): AppAction {
    return {
        type: CHANGE_BASE_CURRENCY,
        payload: newBaseCurrency
    };
}

export function changeBaseCurrencyValue(newBaseCurrencyValue: string): AppAction {
    return {
        type: CHANGE_BASE_CURRENCY_VALUE,
        payload: newBaseCurrencyValue
    };
}

export function addCurrency(newCurrency: string): AppAction {
    return {
        type: ADD_CURRENCY,
        payload: newCurrency
    };
}

export function deleteCurrency(deletedCurrency: string): AppAction {
    return {
        type: DELETE_CURRENCY,
        payload: deletedCurrency
    };
}