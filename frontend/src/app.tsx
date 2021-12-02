import React, {FC, useEffect, useState} from 'react';
import classes from './app.module.css';
import CurrencyInput from './components/currency-input/currency-input';
import { Data } from './entities/currency-input/currency-input.interfaces';

// let data: Data[];

const App: FC = () => {
    const [data, setData] = useState<Data[]>([]);
    useEffect(() => {
        fetch('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0')
            .then(res => res.json())
            .then(d => {
                setData(d);
                console.log(data);
            });
    }, []);
    
    const renderCurrencies = () => {
        return data.map((obj, ind) => {
            return <CurrencyInput key={ind} name={obj.Cur_Name} abbreviation={obj.Cur_Abbreviation} fullName={obj.Cur_Name} />
        });
    }
    
    return (
        <div className={classes.App}>
            <h1>Конвертер валют</h1>
            <div className={classes.ConverterWrapper}>
                {renderCurrencies()}

                <button></button>
            </div>
        </div>
    );
}

export default App;
