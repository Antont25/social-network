import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './dialogs.module.css';


export const DialogItems = (props: DialogItemsPropsType) => {
    return (
        <li>
            <NavLink to={props.id}
                     className={(navData => navData.isActive ? style.active + ' ' + style.dialog : style.dialog)}>
                {props.name}
            </NavLink>
        </li>
    );
};
//type
type DialogItemsPropsType = {
    id: string
    name: string
}


