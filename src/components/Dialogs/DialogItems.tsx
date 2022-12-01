import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

import style from './dialogs.module.css';

export const DialogItems = ({ id, name }: DialogItemsPropsType): ReactElement => {
  return (
    <li>
      <NavLink
        to={id}
        className={navData =>
          navData.isActive ? `${style.active} ${style.dialog}` : style.dialog
        }
      >
        {name}
      </NavLink>
    </li>
  );
};
// type
type DialogItemsPropsType = {
  id: string;
  name: string;
};
