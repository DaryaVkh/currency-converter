import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import {applyMiddleware, compose, createStore, Store} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers/root-reducer';
import reduxThunk from 'redux-thunk';
import {AppReducerState} from './redux/reducers/app-reducer/app-reducer.interfaces';

export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export interface AppStore {
    appReducer: AppReducerState
}

export const store: Store<AppStore> = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'));
