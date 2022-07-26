import React, {ComponentType} from 'react';

import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppStoreType} from "../redux/store";


type MSTPType = {
    authorized: null | number

}
const MSTP = (state: AppStoreType): MSTPType => {
    return {
        authorized: state.authorized.authorizedCode
    }
}


export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const AuthRedirect = (props: MSTPType) => {
        const {authorized, ...restProps} = props
        if (authorized === 1) {
            return <Navigate to={'/login'}/>
        }


        // @ts-ignore
        return <Component {...restProps}/>
    }
    return connect(MSTP)(AuthRedirect)
}


