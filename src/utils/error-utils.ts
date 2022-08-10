import axios, {AxiosError} from 'axios';
import {setServerError} from '../redux/appReducer';
import {Dispatch} from 'redux';

export const errorFromStatusCodeOrApplication = (error: Error | AxiosError, dispatch: Dispatch) => {
    if (axios.isAxiosError(error)) {
        const setError = error.response
            ? (error.response.data as ({ error: string })).error
            : error.message
        dispatch(setServerError(setError))
    } else {
        dispatch(setServerError(error.message || 'some error'))
    }
}