import React, {FC} from 'react';
import { CurrencyOptionProps } from '../../entities/currency-option/currency-option.interfaces';
import classes from './currency-option.module.scss';

const CurrencyOption: FC<CurrencyOptionProps> = props => {
    const handleAddCurrency = () => {
        
    }
    
    return <li className={classes.OtherCurrency} onClick={handleAddCurrency}><b>{props.abbreviation}</b> {props.name}</li>
}

export default CurrencyOption;