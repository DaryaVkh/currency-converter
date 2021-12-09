import {CurrencyNames, CurrencyRates} from "../api/currency-api.interfaces";
import {AppAction} from "../../redux/reducers/app-reducer/app-reducer.interfaces";

export interface AppStateProps {
    currentBaseCurrency: string,
    currentBaseCurrencyValue: string,
    additionCurrencies: string[],
    currencyNames: CurrencyNames,
    currencyRates: CurrencyRates,
    isLoaded: boolean
}

export interface AppDispatchProps {
    onGetCurrencyNamesAndRates: () => Promise<void>,
    onGetCurrencyRate: (newRate: string) => Promise<void>,
    onUpdateCurrencyRate: () => Promise<void>,
    onChangeBaseCurrency: (newBaseCurrency: string) => AppAction,
    onChangeBaseCurrencyValue: (newBaseCurrencyValue: string) => AppAction,
    onAddCurrency: (newCurrency: string) => AppAction,
    onDeleteCurrency: (deletedCurrency: string) => AppAction
}

export interface AppState {
    appReducer: AppStateProps
}

export type AppProps = AppStateProps & AppDispatchProps;