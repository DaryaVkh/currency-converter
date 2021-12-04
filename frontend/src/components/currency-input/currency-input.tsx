import React, {FC, useEffect} from 'react';
import { useState } from 'react';
import { CurrencyInputProps } from '../../entities/currency-input/currency-input.interfaces';
import classes from './currency-input.module.scss';

const CurrencyInput: FC<CurrencyInputProps> = props => {
    useEffect(() => {
        function handleNumberInputWheel(event: WheelEvent) {
            if ((document.activeElement as HTMLInputElement)?.type === 'number') {
                (document.activeElement as HTMLInputElement).blur();
            }
        }

        document.addEventListener('wheel', handleNumberInputWheel);

        return () => {
            document.removeEventListener('wheel', handleNumberInputWheel);
        }
    }, []);

    const handleChangeValue = (event: React.SyntheticEvent) => {
        let input = (event.target as HTMLInputElement).value;
        props.onChangedCurrencyChange(props.abbreviation);
        props.onValueChange(input);
    }

    return (
        <div className={classes.CurrencyWrapper}>
            <div className={classes.InputWrapper}>
                <input className={classes.CurrencyInput} type='number' id={props.abbreviation}
                       value={
                           props.abbreviation === props.changedCurrency
                               ? props.changedValue
                               : Math.round(+props.changedValue / props.rates[props.changedCurrency] * props.rate * 100) / 100}
                       onChange={handleChangeValue} />
                <label className={classes.CurrencyLabel} htmlFor={props.abbreviation}>{props.abbreviation}</label>
            </div>
            <p className={classes.CurrencyName}>{props.fullName}</p>
        </div>
    );
}

export default CurrencyInput;