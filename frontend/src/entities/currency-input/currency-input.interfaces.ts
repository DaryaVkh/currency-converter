import { Dispatch, SetStateAction } from "react";

export interface CurrencyInputProps {
    abbreviation: string;
    fullName: string;
    rate: number;
    // value: string;
    rates: Record<string, number>;
    onValueChange: Dispatch<SetStateAction<string>>;
    onChangedCurrencyChange: Dispatch<SetStateAction<string>>;
    changedCurrency: string;
    changedValue: string;
}