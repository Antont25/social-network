import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Profile} from '../pages/Profile';
import Dialogs from '../pages/Dialogs';
import {Users} from '../pages/Users';
import {Login} from './login/Login';
import {Page404} from './page404/Page404';


export const WitchRouting = () => {
    return (
        <Routes>
            <Route index element={<Profile/>}/>
            <Route path="/profile" element={<Profile/>}>
                <Route path=":id" element={<Profile/>}/>
            </Route>
            <Route path="/dialogs" element={<Dialogs/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Navigate to={'not-found'}/>}/>
        </Routes>
    );
};

