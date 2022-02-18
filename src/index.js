import React from 'react';
import  ReactDOM  from 'react-dom';
import 'index.css';
import RoutesSwitch from 'routes';
import { store } from 'redux/store';
import GlobalFonts from 'fonts/fonts';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <GlobalFonts />
        <Router>
            <RoutesSwitch />
        </Router>
    </Provider>,
    document.getElementById('root')
    ,
)