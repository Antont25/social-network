import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, store} from "./redux/state";
import {render} from "./render";




render(store)