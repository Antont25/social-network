import React, { ReactElement, useEffect } from 'react';

import './App.css';
import { ErrorSnackbar } from 'common/components/ErrorSnackbar';
import { Loading } from 'common/components/Loading';
import { WitchRouting } from 'common/components/Routing';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchAuthorizedData } from 'redux/appSlice';
import { getAuthorizedStatus } from 'selectors';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const authorizedStatus = useAppSelector(getAuthorizedStatus);

  useEffect(() => {
    dispatch(fetchAuthorizedData());
  }, []);

  if (authorizedStatus === 'initialization') {
    return <Loading />;
  }

  return (
    <>
      <WitchRouting />
      <ErrorSnackbar />
    </>
  );
};

export default App;
