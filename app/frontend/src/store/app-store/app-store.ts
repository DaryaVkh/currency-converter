import {action, observable, makeObservable, runInAction} from "mobx";
import {CurrencyNames, CurrencyRates} from "../../entities/api/currency-api.interfaces";
import {merge} from "lodash-es";
import {defaultCurrencies} from "../../entities/common/common.constants";
import {CurrencyApiService} from "../../api/currency-api.service";

export class AppStore {
    currencyNames: CurrencyNames = {symbols: {}};
    currencyRates: CurrencyRates = {rates: {}};
    isLoaded: boolean = false;
    currentBaseCurrency: string = 'EUR';
    currentBaseCurrencyValue: string = '0';
    additionCurrencies: string[] = [];

    constructor() {
        makeObservable(this, {
            currencyNames: observable,
            currencyRates: observable,
            isLoaded: observable,
            currentBaseCurrency: observable,
            currentBaseCurrencyValue: observable,
            additionCurrencies: observable,
            setCurrencyNames: action,
            setCurrencyRates: action,
            changeBaseCurrency: action,
            changeBaseCurrencyValue: action,
            addCurrency: action,
            deleteCurrency: action,
            updateCurrencyRates: action,
            getCurrencyRate: action,
            getCurrencyNamesAndRates: action,
            setLoaded: action,
        });
    }

    setCurrencyNames = (currencyNames: CurrencyNames) => {
        this.currencyNames = currencyNames;
    }

    setCurrencyRates = (currencyRates: CurrencyRates) => {
        this.currencyRates = merge(this.currencyRates, currencyRates);
    }

    changeBaseCurrency = (newBaseCurrency: string) => {
        this.currentBaseCurrency = newBaseCurrency;
    }

    changeBaseCurrencyValue = (newBaseCurrencyValue: string) => {
        this.currentBaseCurrencyValue = newBaseCurrencyValue;
    }

    addCurrency = (newCurrency: string) => {
        this.additionCurrencies.push(newCurrency);
    }

    deleteCurrency = (deletedCurrency: string) => {
        this.additionCurrencies = this.additionCurrencies.filter(ac => ac !== deletedCurrency);
        this.currencyRates = {rates: Object.fromEntries(Object.entries(this.currencyRates.rates).filter(([key, _]) => key !== deletedCurrency)) as Record<string, number>}
    }

    updateCurrencyRates = (): Promise<void> => {
        const actualCurrencies = [...defaultCurrencies, ...this.additionCurrencies];
        return CurrencyApiService.getCurrencyRate([...actualCurrencies])
            .then((currencyRates) => {
                this.setCurrencyRates(currencyRates);
            });
    }

    getCurrencyRate = (newCurrency: string): Promise<void> => {
        return CurrencyApiService.getCurrencyRate([newCurrency])
            .then((currencyRates) => {
                this.setCurrencyRates(currencyRates);
            });
    }

    getCurrencyNamesAndRates = (): Promise<void> => {
        return CurrencyApiService.getAllCurrencies()
            .then((currencyNames) => {
                runInAction(() => {
                    this.currencyNames = currencyNames;
                });
            })
            .then(() => CurrencyApiService.getCurrencyRate(defaultCurrencies))
            .then((currencyRates) => {
                this.setCurrencyRates(currencyRates);
            })
            .then(() => {
                this.setLoaded();
            });
    }

    setLoaded = () => {
        this.isLoaded = true;
    }
}