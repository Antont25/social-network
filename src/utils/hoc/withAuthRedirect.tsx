import React, {ComponentType} from 'react';

import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppStoreType} from '../../redux/store';
import {StatusAuthorizedType} from '../../redux/appReducer';


type MSTPType = {
    authorizedStatus: StatusAuthorizedType

}
const MSTP = (state: AppStoreType): MSTPType => {
    return {
        authorizedStatus: state.app.authorizedStatus
    }
}


export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const AuthRedirect = (props: MSTPType) => {
        const {authorizedStatus, ...restProps} = props
        if (authorizedStatus === 'fail') {
            return <Navigate to={'/login'}/>
        }


        // @ts-ignore
        return <Component {...restProps}/>
    }
    return connect(MSTP)(AuthRedirect)
}


