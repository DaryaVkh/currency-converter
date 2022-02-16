import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import {RootStore} from "./store/store";
import { Provider } from 'mobx-react';
import {configure} from "mobx";

configure({enforceActions: 'observed'});
const store = new RootStore();
export const StoreContext = createContext<RootStore>(store);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'));
