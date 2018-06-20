import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bootstrap'
import { AppRouter, history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

