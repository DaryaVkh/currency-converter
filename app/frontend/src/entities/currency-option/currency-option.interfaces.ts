import { Dispatch, SetStateAction } from "react";
import { CurrentRates } from "../api/currency-api.interfaces";

export interface CurrencyOptionProps {
    abbreviation: string;
    name: string;
    onAddCurrency: Dispatch<SetStateAction<string[]>>;
    onAddRate: Dispatch<SetStateAction<CurrentRates>>;
}