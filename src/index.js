import React from 'react';
import { ReactDOM } from 'react';
import 'index.css';
import RoutesSwitch from 'routes';
import { Provider } from 'react';
import { store } from 'toolkitRedux/store';
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
    document.getElementById('root');
)