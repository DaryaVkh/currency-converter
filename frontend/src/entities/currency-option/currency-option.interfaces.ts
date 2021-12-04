import { Dispatch, SetStateAction } from "react";

export interface CurrencyOptionProps {
    abbreviation: string;
    name: string;
    onAddCurrency: Dispatch<SetStateAction<string[]>>;
}