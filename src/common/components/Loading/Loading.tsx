import React, { ReactElement } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import style from './loading.module.css';

export const Loading = (): ReactElement => {
  return (
    <div className={style.loadingBloc}>
      <CircularProgress className={style.authorized} />
    </div>
  );
};
