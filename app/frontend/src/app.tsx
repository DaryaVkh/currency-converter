import React, {FC, useEffect} from 'react';
import classes from './app.module.scss';
import CurrencyInput from './components/currency-input/currency-input';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CurrencyOption from './components/currency-option/currency-option';
import {CurrencyDescription} from './entities/api/currency-api.interfaces';
import {defaultCurrencies, unsupportedCurrencies} from './entities/common/common.constants';
import {AppProps} from './entities/app/app.interfaces';
import {observer} from "mobx-react";
import {useStores} from "./hooks/use-stores-hook/use-stores-hook";

const App: FC<AppProps> = observer(() => {
    const { appStore } = useStores();

    console.log(appStore.isLoaded)

    useEffect(() => {
        appStore.getCurrencyNamesAndRates();
        setTimeout(() => updateCurrencyRates(), 1800000);
    }, [appStore]);

    useEffect(() => {
        const closeDropdownOptionsOnClick = (event: MouseEvent) => {
            const clickedElement = event.target as HTMLElement;
            const additionCurrencies = document.querySelector(`.${classes.additionCurrencies}`) as HTMLUListElement;
            if (!clickedElement.classList.contains(`.${classes.additionCurrency}`)
                && additionCurrencies.classList.contains(classes.visibleAdditionCurrencies)) {
                additionCurrencies.classList.remove(classes.visibleAdditionCurrencies);
            }
        }

        document.addEventListener('click', closeDropdownOptionsOnClick);

        return () => {
            document.removeEventListener('click', closeDropdownOptionsOnClick);
        }
    }, []);

    function updateCurrencyRates() {
        appStore.updateCurrencyRates();
        setTimeout(() => {
            updateCurrencyRates()
        }, 1800000);
    }

    function renderDefaultCurrencies() {
        if (!appStore.currencyNames || !appStore.currencyRates) {
            return;
        }

        return Object.entries(appStore.currencyNames.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (defaultCurrencies.includes(key)) {
                return <CurrencyInput key={key} abbreviation={key}
                                      fullName={value.description}
                                      rate={appStore.currencyRates.rates[key]}
                                      allRates={appStore.currencyRates.rates}
                                      isAdditionCurrency={false}
                                      baseValue={appStore.currentBaseCurrencyValue}
                                      onChangeBaseCurrencyValue={appStore.changeBaseCurrencyValue}
                                      onChangeBaseCurrency={appStore.changeBaseCurrency}
                                      baseCurrency={appStore.currentBaseCurrency}/>
            } else {
                return null;
            }
        });
    }

    function renderAdditionCurrencies() {
        if (!appStore.currencyNames || !appStore.currencyRates) {
            return;
        }

        return Object.entries(appStore.currencyNames.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (appStore.additionCurrencies.includes(key)) {
                return <CurrencyInput key={key} abbreviation={key} fullName={value.description}
                                      rate={appStore.currencyRates.rates[key]}
                                      allRates={appStore.currencyRates.rates}
                                      isAdditionCurrency={true}
                                      deleteAdditionCurrency={appStore.deleteCurrency}
                                      baseValue={appStore.currentBaseCurrencyValue}
                                      onChangeBaseCurrencyValue={appStore.changeBaseCurrencyValue}
                                      onChangeBaseCurrency={appStore.changeBaseCurrency}
                                      baseCurrency={appStore.currentBaseCurrency}/>
            } else {
                return null;
            }
        });
    }

    function renderOptions() {
        if (!appStore.currencyNames || !appStore.currencyRates) {
            return;
        }

        return Object.entries(appStore.currencyNames.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (!defaultCurrencies.includes(key) && !appStore.additionCurrencies.includes(key) && !unsupportedCurrencies.includes(key)) {
                return <CurrencyOption key={key} abbreviation={key} name={value.description}
                                       onAddCurrency={appStore.addCurrency}
                                       onAddRate={appStore.getCurrencyRate} />
            } else {
                return null;
            }
        });
    }

    function handleAddCurrencyButtonClick(event: React.SyntheticEvent) {
        event.stopPropagation();
        const additionCurrencies = document.querySelector(`.${classes.additionCurrencies}`) as HTMLUListElement;
        additionCurrencies.classList.toggle(classes.visibleAdditionCurrencies);
    }

    return (
        <div className={classes.App}>
            <h1>Currency converter</h1>
            <div className={classes.converterWrapper}>
                {
                    appStore.isLoaded
                        ?
                        <React.Fragment>

                            {renderDefaultCurrencies()}
                            {renderAdditionCurrencies()}

                            <div className={classes.dropdownWrapper}>

                                <button className={classes.addCurrencyButton} onClick={handleAddCurrencyButtonClick}>
                                    <AddCircleOutlineOutlinedIcon sx={{marginRight: '0.5vw'}}/>
                                    Add currency
                                </button>

                                <ul className={classes.additionCurrencies}>
                                    {renderOptions()}
                                </ul>

                            </div>
                        </React.Fragment>
                        :
                        <svg className={classes.loading}>
                            <circle className={classes.loadingSvg} cx='50' cy='50' r='20' fill='none' strokeWidth='3'
                                    strokeMiterlimit='10' />
                        </svg>
                }
            </div>
        </div>
    );
});

export default App;
