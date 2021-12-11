import React, {FC, useEffect} from 'react';
import classes from './app.module.scss';
import CurrencyInput from './components/currency-input/currency-input';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CurrencyOption from './components/currency-option/currency-option';
import {CurrencyDescription} from './entities/api/currency-api.interfaces';
import {defaultCurrencies, unsupportedCurrencies} from './entities/common/common.constants';
import {connect} from 'react-redux';
import {AppProps, AppState, AppDispatchProps, AppStateProps} from './entities/app/app.interfaces';
import {
    addCurrency,
    changeBaseCurrency,
    changeBaseCurrencyValue,
    deleteCurrency,
    getCurrencyNamesAndRates,
    getCurrencyRate,
    updateCurrencyRates
} from './redux/actions/app-actions/app-actions';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppAction} from './redux/reducers/app-reducer/app-reducer.interfaces';

const App: FC<AppProps> = props => {
    useEffect(() => {
        props.onGetCurrencyNamesAndRates().then(() => {
            setTimeout(() => updateCurrencyRates(), 1800000);
        });
    }, []);

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
        props.onUpdateCurrencyRate();
        setTimeout(() => {
            updateCurrencyRates()
        }, 1800000);
    }

    function renderDefaultCurrencies() {
        if (!props.currencyNames || !props.currencyRates) {
            return;
        }

        return Object.entries(props.currencyNames.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (defaultCurrencies.includes(key)) {
                return <CurrencyInput key={key} abbreviation={key}
                                      fullName={value.description}
                                      rate={props.currencyRates.rates[key]}
                                      allRates={props.currencyRates.rates}
                                      isAdditionCurrency={false}
                                      baseValue={props.currentBaseCurrencyValue}
                                      onChangeBaseCurrencyValue={props.onChangeBaseCurrencyValue}
                                      onChangeBaseCurrency={props.onChangeBaseCurrency}
                                      baseCurrency={props.currentBaseCurrency}/>
            } else {
                return null;
            }
        });
    }

    function renderAdditionCurrencies() {
        if (!props.currencyNames || !props.currencyRates) {
            return;
        }

        return Object.entries(props.currencyNames.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (props.additionCurrencies.includes(key)) {
                return <CurrencyInput key={key} abbreviation={key} fullName={value.description}
                                      rate={props.currencyRates.rates[key]}
                                      allRates={props.currencyRates.rates}
                                      isAdditionCurrency={true}
                                      deleteAdditionCurrency={props.onDeleteCurrency}
                                      baseValue={props.currentBaseCurrencyValue}
                                      onChangeBaseCurrencyValue={props.onChangeBaseCurrencyValue}
                                      onChangeBaseCurrency={props.onChangeBaseCurrency}
                                      baseCurrency={props.currentBaseCurrency}/>
            } else {
                return null;
            }
        });
    }

    function renderOptions() {
        if (!props.currencyNames || !props.currencyRates) {
            return;
        }

        return Object.entries(props.currencyNames.symbols).map(([key, value]: [string, CurrencyDescription]) => {
            if (!defaultCurrencies.includes(key) && !props.additionCurrencies.includes(key) && !unsupportedCurrencies.includes(key)) {
                return <CurrencyOption key={key} abbreviation={key} name={value.description}
                                       onAddCurrency={props.onAddCurrency}
                                       onAddRate={props.onGetCurrencyRate} />
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
                    props.isLoaded
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
}

function mapStateToProps(state: AppState): AppStateProps {
    return {
        currentBaseCurrency: state.appReducer.currentBaseCurrency,
        currentBaseCurrencyValue: state.appReducer.currentBaseCurrencyValue,
        additionCurrencies: state.appReducer.additionCurrencies,
        currencyNames: state.appReducer.currencyNames,
        currencyRates: state.appReducer.currencyRates,
        isLoaded: state.appReducer.isLoaded
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, AppAction> & Dispatch<AppAction>): AppDispatchProps {
    return {
        onGetCurrencyNamesAndRates: async () => await dispatch(getCurrencyNamesAndRates()),
        onUpdateCurrencyRate: async () => await dispatch(updateCurrencyRates()),
        onGetCurrencyRate: async (newRate: string) => await dispatch(getCurrencyRate(newRate)),
        onChangeBaseCurrency: (newBaseCurrency: string) => dispatch(changeBaseCurrency(newBaseCurrency)),
        onChangeBaseCurrencyValue: (newBaseCurrencyValue: string) => dispatch(changeBaseCurrencyValue(newBaseCurrencyValue)),
        onAddCurrency: (newCurrency: string) => dispatch(addCurrency(newCurrency)),
        onDeleteCurrency: (deletedCurrency: string) => dispatch(deleteCurrency(deletedCurrency))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
