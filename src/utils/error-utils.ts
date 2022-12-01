import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { setServerError } from 'redux/appSlice';

export const errorFromStatusCodeOrApplication = (
  error: Error | AxiosError,
  dispatch: Dispatch,
): void => {
  if (axios.isAxiosError(error)) {
    const setError = error.response
      ? (error.response.data as { error: string }).error
      : error.message;

    dispatch(setServerError(setError));
  } else {
    dispatch(setServerError(error.message || 'some error'));
  }
};
