import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter} from 'react-router-dom';


const theme = createTheme({
    palette: {
        primary: {
            main: '#41484f'
        },
        secondary: {
            main: '#f75411'
        }
    },
});

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);


