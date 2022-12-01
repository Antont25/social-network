import { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

import style from './page404.module.css';

export const Page404 = (): ReactElement => {
  return (
    <div className={style.mainBox}>
      <div className={style.errors}>
        <div className={style.err}>4</div>
        <div className={style.far}>
          <i className="far fa-question-circle fa-spin" />
        </div>
        <div className={style.err}>4</div>
      </div>
      <div className={style.msg}>
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in
        the first place?
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's go <NavLink to="/">home</NavLink> and try from there.
        </p>
      </div>
    </div>
  );
};
