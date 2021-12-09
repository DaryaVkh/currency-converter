import { AppAction } from "../../redux/reducers/app-reducer/app-reducer.interfaces";

export interface CurrencyOptionProps {
    abbreviation: string;
    name: string;
    onAddCurrency: (newCurrency: string) => AppAction;
    onAddRate: (newRate: string) => Promise<void>;
}