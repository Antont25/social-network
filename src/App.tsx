import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import {NavBar} from "./components/navBar/NavBar";
import Profile from "./components/profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className='appWraper'>
                    <Routes>
                        <Route path='/' element={<Profile/>}></Route>
                        <Route path='/dialogs/*' element={<Dialogs/>}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
