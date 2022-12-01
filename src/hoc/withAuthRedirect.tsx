import React, { ComponentType } from 'react';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { StatusAuthorizedType } from 'redux/appSlice';
import { AppStoreType } from 'redux/store';

const MSTP = (state: AppStoreType): MSTPType => {
  return {
    authorizedStatus: state.app.authorizedStatus,
  };
};

export function withAuthRedirect<T>(Component: ComponentType<T>): any {
  const AuthRedirect = (props: MSTPType): any => {
    const { authorizedStatus, ...restProps } = props;

    if (authorizedStatus === 'fail') {
      return <Navigate to="/Login" />;
    }

    // @ts-ignore
    return <Component {...restProps} />;
  };

  return connect(MSTP)(AuthRedirect);
}

// type
type MSTPType = {
  authorizedStatus: StatusAuthorizedType;
};
