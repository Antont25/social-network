import React from 'react'
import './App.css';
import Header from "./components/header/Header";
import {NavBar} from "./components/navBar/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {StoreType} from "./redux/state";
import Profile from "./components/profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";


const App: React.FC<StoreType> = (props) => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className='appWraper'>
                    <Routes>
                        <Route path='/' element={<Profile posts={props.postPage.posts}
                                                          addPost={props.addPost}/>}>

                        </Route>
                        <Route path='/dialogs/*'
                               element={<Dialogs dialogs={props.dialogsPage.dialogs}
                                                 massages={props.dialogsPage.massages}/>}>

                        </Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
