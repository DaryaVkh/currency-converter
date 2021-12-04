import React, {FC, useEffect, useState} from 'react';
import classes from './app.module.scss';
import CurrencyInput from './components/currency-input/currency-input';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CurrencyOption from './components/currency-option/currency-option';
import { CurrencyApiService } from './api/currency-api.service';
import { CurrentRates } from './entities/api/currency-api.interfaces';

const App: FC = () => {
    const [currencyRate, setCurrencyRate] = useState<CurrentRates>();
    const [currencyName, setCurrencyName] = useState<Record<string, string>>();
    const [additionCurrencies, setAdditionCurrencies] = useState<string[]>([]);
    const [currencyValue, setCurrencyValue] = useState<string>("0");
    const [changedCurrency, setChangedCurrency] = useState<string>('EUR');
    const defaultCurrencies = ['USD', 'EUR', 'BYN', 'RUB', 'UAH', 'PLN'];

    useEffect(() => {
        CurrencyApiService.getCurrentRate()
            .then(setCurrencyRate)
            .then(() => {
                CurrencyApiService.getAllCurrencies().then(setCurrencyName);
            });
    }, []);

    useEffect(() => {
        let otherCurrencies = document.querySelector(`.${classes.OtherCurrencies}`) as HTMLUListElement;

        const closeMenuOnClick = (event: MouseEvent) => {
            let el = event.target as HTMLElement;
            if (!el.classList.contains(`.${classes.OtherCurrency}`) && otherCurrencies.classList.contains(classes.active)) {
                otherCurrencies.classList.remove(classes.active);
            }
        }

        document.addEventListener('click', closeMenuOnClick);

        return () => {
            document.removeEventListener('click', closeMenuOnClick);
        }
    }, []);
    
    const renderDefaultCurrencies = () => {
        if (!currencyName || !currencyRate) {
            return;
        }
        console.log(changedCurrency);
        console.log(currencyValue);
        return Object.entries(currencyName).map(([key, value]: [string, string]) => {
            if (defaultCurrencies.includes(key)) {
                return <CurrencyInput key={key} abbreviation={key} fullName={value}
                                      rate={currencyRate.rates[key]}
                                      rates={currencyRate.rates}
                                      changedValue={currencyValue}
                                      onValueChange={setCurrencyValue}
                                      onChangedCurrencyChange={setChangedCurrency}
                                      changedCurrency={changedCurrency} />
            }
        });
    }

    const renderAdditionCurrencies = () => {

    }

    const renderOptions = () => {
        if (!currencyName || !currencyRate) {
            return;
        }
        return Object.entries(currencyName).map(([key, value]: [string, string]) => {
            if (!defaultCurrencies.includes(key) && key in currencyRate.rates) {
                return <CurrencyOption key={key} abbreviation={key} name={value} />
            }
        });
    }

    const handleAddButtonClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        let options = document.querySelector(`.${classes.OtherCurrencies}`) as HTMLUListElement;
        options.classList.toggle(classes.active);
    }
    
    return (
        <div className={classes.App}>
            <h1>Currency converter</h1>
            <div className={classes.ConverterWrapper}>
                {renderDefaultCurrencies()}
                {renderAdditionCurrencies()}

                <div className={classes.dropdownWrapper}>
                    <button className={classes.AddCurrencyButton} onClick={handleAddButtonClick}>
                        <AddCircleOutlineOutlinedIcon sx={{marginRight: '0.5vw'}} />
                        Add currency
                    </button>
                    <ul className={classes.OtherCurrencies}>
                        {renderOptions()}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
