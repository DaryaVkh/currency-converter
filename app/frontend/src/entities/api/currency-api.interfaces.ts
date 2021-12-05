export interface CurrentRates {
    rates: Record<string, number>;
}

export interface CurrencyNames {
    symbols: {
        [key: string]: CurrencyDescription;
    }
}

export interface CurrencyDescription {
    description: string;
}