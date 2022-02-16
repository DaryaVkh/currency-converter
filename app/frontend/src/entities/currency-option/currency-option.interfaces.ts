export interface CurrencyOptionProps {
    abbreviation: string;
    name: string;
    onAddCurrency: (newCurrency: string) => void;
    onAddRate: (newRate: string) => Promise<void>;
}