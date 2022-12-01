import React, { ReactElement, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { InDeveloping } from 'common/components/InDeveloping';
import { Layout } from 'common/components/Layout';
import { Loading } from 'common/components/Loading';
import { Login } from 'components/Login';
import { Page404 } from 'components/Page404';
import Dialogs from 'pages/Dialogs';
import { Profile } from 'pages/Profile';

const Users = React.lazy(() => import('pages/Users'));

export const WitchRouting = (): ReactElement => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="/profile" element={<Profile />}>
            <Route path=":id" element={<Profile />} />
          </Route>
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/in-developing" element={<InDeveloping />} />
          <Route path="*" element={<Navigate to="not-found" />} />
        </Route>
        <Route path="/not-found" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};
