import React, {useEffect} from 'react'
import './App.css';
import {fetchAuthorizedData} from '../redux/appReducer';
import {ErrorSnackbar} from '../components/common/ErrorSnackbar/ErrorSnackbar';
import {WitchRouting} from '../components/WitchRouting';
import {useAppDispatch, useAppSelector} from '../utils/hooks/hooks';
import {Loading} from '../components/common/Loading/Loading';


const App = () => {
    const dispatch = useAppDispatch()
    const authorizedStatus = useAppSelector(state => state.app.authorizedStatus)

    useEffect(() => {
        dispatch(fetchAuthorizedData())
    }, [])


    if (authorizedStatus === 'initialization') {
        return <Loading/>
    }

    return (
        <>
            <WitchRouting/>
            <ErrorSnackbar/>
        </>
    );
}

export default (App);

