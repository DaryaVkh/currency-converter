import React, {FC, useEffect, useState} from 'react';
import classes from './app.module.scss';
import CurrencyInput from './components/currency-input/currency-input';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CurrencyOption from './components/currency-option/currency-option';
import { CurrencyApiService } from './api/currency-api.service';
import {CurrencyDescription, CurrencyNames, CurrentRates } from './entities/api/currency-api.interfaces';
import { defaultCurrencies, unsupportedCurrencies } from './entities/common/common.constants';

const App: FC = () => {
    const [currencyRate, setCurrencyRate] = useState<CurrentRates>({rates: {}});
    const [currencyName, setCurrencyName] = useState<CurrencyNames>();
    const [additionCurrencies, setAdditionCurrencies] = useState<string[]>([]);
    const [currencyValue, setCurrencyValue] = useState<string>("0");
    const [changedCurrency, setChangedCurrency] = useState<string>('EUR');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        CurrencyApiService.getCurrentRate(defaultCurrencies)
            .then(setCurrencyRate)
            .then(() => {
                CurrencyApiService.getAllCurrencies().then(setCurrencyName);
            })
            .then(() => {
                setIsLoaded(true);
            });
    }, []);

    useEffect(() => {
        const closeMenuOnClick = (event: MouseEvent) => {
            let element = event.target as HTMLElement;
            let otherCurrencies = document.querySelector(`.${classes.OtherCurrencies}`) as HTMLUListElement;
            if (!element.classList.contains(`.${classes.OtherCurrency}`) && otherCurrencies.classList.contains(classes.active)) {
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

        return Object.entries(currencyName.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (defaultCurrencies.includes(key)) {
                return <CurrencyInput key={key} abbreviation={key} fullName={value.description}
                                      rate={currencyRate.rates[key]}
                                      rates={currencyRate.rates}
                                      isAdditionCurrency={false}
                                      changedValue={currencyValue}
                                      onValueChange={setCurrencyValue}
                                      onCurrentCurrencyChange={setChangedCurrency}
                                      changedCurrency={changedCurrency} />
            } else {
                return null;
            }
        });
    }

    const renderAdditionCurrencies = () => {
        if (!currencyName || !currencyRate) {
            return;
        }

        return Object.entries(currencyName.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (additionCurrencies.includes(key)) {
                return <CurrencyInput key={key} abbreviation={key} fullName={value.description}
                                      rate={currencyRate.rates[key]}
                                      rates={currencyRate.rates}
                                      isAdditionCurrency={true}
                                      deleteAdditionCurrency={setAdditionCurrencies}
                                      changedValue={currencyValue}
                                      onValueChange={setCurrencyValue}
                                      onCurrentCurrencyChange={setChangedCurrency}
                                      changedCurrency={changedCurrency} />
            } else {
                return null;
            }
        });
    }

    const renderOptions = () => {
        if (!currencyName || !currencyRate) {
            return;
        }

        return Object.entries(currencyName.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (!defaultCurrencies.includes(key) && !additionCurrencies.includes(key) && !unsupportedCurrencies.includes(key)) {
                return <CurrencyOption key={key} abbreviation={key} name={value.description} onAddCurrency={setAdditionCurrencies} onAddRate={setCurrencyRate} />
            } else {
                return null;
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
                {
                    isLoaded
                        ?
                            <React.Fragment>
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
                            </React.Fragment>
                        :
                            <svg className={classes.loading}>
                                <circle className={classes.loadingSvg} cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10" />
                            </svg>
                }
            </div>
        </div>
    );
}

export default App;
