import React, {FC} from 'react';
import { CurrencyApiService } from '../../api/currency-api.service';
import { CurrencyOptionProps } from '../../entities/currency-option/currency-option.interfaces';
import classes from './currency-option.module.scss';
import {merge} from 'lodash-es';

const CurrencyOption: FC<CurrencyOptionProps> = props => {
    const handleAddCurrency = () => {
        CurrencyApiService.getCurrentRate([props.abbreviation])
            .then(newRate => props.onAddRate(rate => merge(rate, newRate)))
            .then(() => props.onAddCurrency(arr => [...arr, props.abbreviation]));
    }
    
    return <li className={classes.OtherCurrency} onClick={handleAddCurrency}><b>{props.abbreviation}</b> {props.name}</li>
}

export default CurrencyOption;