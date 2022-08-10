import React, {useState} from 'react'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks/hooks';
import {setServerError} from '../../../redux/appReducer';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
    const error = useAppSelector(state => state.app.serverError)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setServerError(null))
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
