import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './loading.module.css'


export const Loading = () => {
    return (
        <div className={style.loadingBloc}>
            <CircularProgress className={style.authorized}/>
        </div>
    );
};

