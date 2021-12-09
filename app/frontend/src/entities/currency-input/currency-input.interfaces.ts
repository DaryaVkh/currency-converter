import { AppAction } from "../../redux/reducers/app-reducer/app-reducer.interfaces";

export interface CurrencyInputProps {
    abbreviation: string;
    fullName: string;
    rate: number;
    allRates: Record<string, number>;
    isAdditionCurrency: boolean;
    deleteAdditionCurrency?: (deletedCurrency: string) => AppAction;
    onChangeBaseCurrencyValue: (newBaseCurrencyValue: string) => AppAction;
    onChangeBaseCurrency: (newBaseCurrency: string) => AppAction;
    baseCurrency: string;
    baseValue: string;
}