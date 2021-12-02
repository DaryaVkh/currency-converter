import React, {FC} from 'react';
import { CurrencyInputProps } from '../../entities/currency-input/currency-input.interfaces';
import classes from './currency-input.module.css';

const CurrencyInput: FC<CurrencyInputProps> = props => {
    return (
        <div className={classes.CurrencyWrapper}>
            <div className={classes.InputWrapper}>
                <label className={classes.CurrencyLabel} htmlFor={props.name}>
                    {props.abbreviation}
                </label>
                <input className={classes.CurrencyInput} type='number' id={props.name} />
            </div>
            <p className={classes.CurrencyName}>{props.fullName}</p>
        </div>
    );
}

export default CurrencyInput;