import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Profile} from '../pages/Profile';
import Dialogs from '../pages/Dialogs';
import {Login} from './login/Login';
import {Page404} from './page404/Page404';
import {Layout} from './layout/Layout';
import {Loading} from './common/loading/Loading';

const Users = React.lazy(() => import('../pages/Users'));


export const WitchRouting = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path="/profile" element={<Profile/>}>
                        <Route path=":id" element={<Profile/>}/>
                    </Route>
                    <Route path="/dialogs" element={<Dialogs/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to={'not-found'}/>}/>
                </Route>
                <Route path="/not-found" element={<Page404/>}/>
            </Routes>
        </Suspense>

    );
};

