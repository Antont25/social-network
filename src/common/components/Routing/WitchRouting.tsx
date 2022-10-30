import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Profile} from '../../../pages/Profile';
import Dialogs from '../../../pages/Dialogs';
import {Login} from '../../../components/Login/Login';
import {Page404} from '../../../components/Page404/Page404';
import {Layout} from '../Layout/Layout';
import {Loading} from '../Loading/Loading';
import {InDeveloping} from '../InDeveloping/InDeveloping';

const Users = React.lazy(() => import('../../../pages/Users'));

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
                    <Route path="/in-developing" element={<InDeveloping/>}/>
                    <Route path="*" element={<Navigate to={'not-found'}/>}/>
                </Route>
                <Route path="/not-found" element={<Page404/>}/>
            </Routes>
        </Suspense>

    );
};

