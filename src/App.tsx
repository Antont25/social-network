import React from 'react'
import './App.css';
import Header from "./components/header/Header";
import {NavBar} from "./components/navBar/NavBar";
import {HashRouter, Route, Routes} from "react-router-dom";
import {StoreType} from "./redux/state";
import Profile from "./components/profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";


const App: React.FC<StoreType> = (props) => {
    return (
        <HashRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className='appWraper'>
                    <Routes>
                        <Route path='/' element={<Profile posts={props.state.postPage.posts}
                                                          newPostText={props.state.postPage.newPostText}
                                                          dispatch={props.dispatch}/>}>

                        </Route>
                        <Route path='/dialogs/*'
                               element={<Dialogs dialogs={props.state.dialogsPage.dialogs}
                                                 massages={props.state.dialogsPage.massages}/>}>

                        </Route>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
