import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './App/ErrorBoundary';
import DefaultPaletteProvider from './Context/defaultPaletteContext';
import UserPaletteProvider from './Context/userPaletteContext';
import IsUserContextProvider from './Context/isUserContext';
ReactDOM.render(
    <BrowserRouter>
        <ErrorBoundary>

            <DefaultPaletteProvider>
                    <IsUserContextProvider>
                <UserPaletteProvider>
                        <App />
                </UserPaletteProvider>
                    </IsUserContextProvider>
            </DefaultPaletteProvider>

        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
