import React, {FC, useEffect} from 'react';
import { CurrencyInputProps } from '../../entities/currency-input/currency-input.interfaces';
import classes from './currency-input.module.scss';
import ClearIcon from '@mui/icons-material/Clear';

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
        props.onCurrentCurrencyChange(props.abbreviation);
        props.onValueChange(input);
    }

    const handleDeleteAdditionCurrency = (event: React.SyntheticEvent) => {
        props.deleteAdditionCurrency?.(additionCurrencies => additionCurrencies.filter(ac => ac !== props.abbreviation));
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
                {
                    props.isAdditionCurrency
                        ? <ClearIcon sx={{order: 2, position: 'absolute', right: '-5%', color: 'darkgray', cursor: 'pointer', fontSize: '1.5vw'}}
                                     onClick={handleDeleteAdditionCurrency} />
                        : null
                }
            </div>
            <p className={classes.CurrencyName}>{props.fullName}</p>
        </div>
    );
}

export default CurrencyInput;