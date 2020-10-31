import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { BrowserRouter } from 'react-router-dom';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import store from './../../redux/store';

import theme from '../../config/theme';

const Providers: FC = ({ children }) => (
    <EmotionThemeProvider theme={theme}>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        </MuiThemeProvider>
    </EmotionThemeProvider>
);

<h1>Hola</h1>;

export default Providers;
