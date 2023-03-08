import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { store } from './store/rootStore';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { themeOptions } from './common/themeOptions';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={themeOptions}>
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
