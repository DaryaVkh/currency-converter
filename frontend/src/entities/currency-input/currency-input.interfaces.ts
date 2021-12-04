import { Dispatch, SetStateAction } from "react";

export interface CurrencyInputProps {
    abbreviation: string;
    fullName: string;
    rate: number;
    rates: Record<string, number>;
    isAdditionCurrency: boolean;
    deleteAdditionCurrency?: Dispatch<SetStateAction<string[]>>;
    onValueChange: Dispatch<SetStateAction<string>>;
    onCurrentCurrencyChange: Dispatch<SetStateAction<string>>;
    changedCurrency: string;
    changedValue: string;
}