import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from "./redux/store";


export const render = (props:any) => {
    ReactDOM.render(
        <App  dialogsPage={props.dialogsPage} postPage={props.postPage}/>,
        document.getElementById('root')
    );
}

render(store.getState())

store.subscribe(()=>render(store.getState()))