import React, {FC, useEffect} from 'react';
import { CurrencyInputProps } from '../../entities/currency-input/currency-input.interfaces';
import classes from './currency-input.module.scss';
import ClearIcon from '@mui/icons-material/Clear';

const CurrencyInput: FC<CurrencyInputProps> = props => {
    useEffect(() => {
        function handleNumberInputWheel() {
            const numberTypeInput = document.activeElement as HTMLInputElement;
            if (numberTypeInput && numberTypeInput.type === 'number') {
                numberTypeInput.blur();
            }
        }

        document.addEventListener('wheel', handleNumberInputWheel);

        return () => {
            document.removeEventListener('wheel', handleNumberInputWheel);
        }
    }, []);

    const handleChangeValue = (event: React.SyntheticEvent) => {
        const inputValue = (event.target as HTMLInputElement).value;
        props.onChangeBaseCurrencyValue(inputValue);
        if (props.baseCurrency !== props.abbreviation) {
            props.onChangeBaseCurrency(props.abbreviation);
        }
    }

    const handleDeleteAdditionCurrency = () => {
        props.deleteAdditionCurrency?.(props.abbreviation);
    }

    return (
        <div className={classes.currencyWrapper}>
            <div className={classes.inputWrapper}>
                <input className={classes.currencyInput} type='number' id={props.abbreviation}
                       value={
                           props.abbreviation === props.baseCurrency
                               ? props.baseValue
                               : Math.round(+props.baseValue / props.allRates[props.baseCurrency] * props.rate * 100) / 100 || 0}
                       onChange={handleChangeValue} />
                <label className={classes.currencyLabel} htmlFor={props.abbreviation}>{props.abbreviation}</label>
                {
                    props.isAdditionCurrency
                        ? <ClearIcon sx={{order: 2, position: 'absolute', right: '-5%', color: 'darkgray', cursor: 'pointer', fontSize: '1.5vw'}}
                                     onClick={handleDeleteAdditionCurrency} />
                        : null
                }
            </div>
            <p className={classes.currencyName}>{props.fullName}</p>
        </div>
    );
}

export default CurrencyInput;