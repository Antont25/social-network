import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import { store,} from "./redux/state";


export const render = () => {
    ReactDOM.render(
        <App state={store.state} addPost={store.addPost.bind(store)}
        changeNewPostText={store.changeNewPostText.bind(store)}
        subscriber={store.subscriber.bind(store)}
        render={store.render}/>,
        document.getElementById('root')
    );
}

render()

store.subscriber(render)