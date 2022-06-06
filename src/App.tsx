import React from 'react'
import './App.css';
import Header from "./components/header/Header";
import {NavBar} from "./components/navBar/NavBar";
import {HashRouter, Route, Routes} from "react-router-dom";
import {StoreType} from "./redux/state";
import Profile from "./components/profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {store, StoreAppType} from "./redux/store";


const App: React.FC<StoreAppType> = (props) => {
    return (
        <HashRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className='appWraper'>
                    <Routes>
                        <Route path='/'
                               element={<Profile newPostText={props.postPage.newPostText}
                                                 posts={props.postPage.posts}
                                                  dispatch={store.dispatch}
                               />}>

                        </Route>
                        <Route path='/dialogs/*'
                               element={<Dialogs dialogs={props.dialogsPage.dialogs}
                                                 textMasseg={props.dialogsPage.newTextMasseg}
                                                 massages={props.dialogsPage.massages}
                                                 dispatch={store.dispatch}
                               />}>

                        </Route>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
