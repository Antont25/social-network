import React, { ReactElement } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useAppDispatch, useAppSelector } from 'hooks';
import { setServerError } from 'redux/appSlice';
import { getServerError } from 'selectors';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = (): ReactElement => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(getServerError);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setServerError(null));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};
