export interface CurrencyInputProps {
    abbreviation: string;
    fullName: string;
    rate: number;
    allRates: Record<string, number>;
    isAdditionCurrency: boolean;
    deleteAdditionCurrency?: (deletedCurrency: string) => void;
    onChangeBaseCurrencyValue: (newBaseCurrencyValue: string) => void;
    onChangeBaseCurrency: (newBaseCurrency: string) => void;
    baseCurrency: string;
    baseValue: string;
}