import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, StoreType} from "./redux/state";


export const render = (store:StoreType) => {
    ReactDOM.render(
        <App postPage={store.postPage} dialogsPage={store.dialogsPage} addPost={addPost}/>,
        document.getElementById('root')
    );
}


