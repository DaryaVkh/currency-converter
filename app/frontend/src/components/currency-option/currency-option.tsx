import React, {FC} from 'react';
import { CurrencyOptionProps } from '../../entities/currency-option/currency-option.interfaces';
import classes from './currency-option.module.scss';

const CurrencyOption: FC<CurrencyOptionProps> = props => {
    const handleAddCurrency = () => {
        props.onAddRate(props.abbreviation)
            .then(() => props.onAddCurrency(props.abbreviation));
    };
    
    return <li className={classes.otherCurrency} onClick={handleAddCurrency}><b>{props.abbreviation}</b> {props.name}</li>;
}

export default CurrencyOption;