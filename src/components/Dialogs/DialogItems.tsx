import React from 'react';
import {NavLink, To} from "react-router-dom";
import style from "./Dialogs.module.css";

type DialogItemsPropsType ={
    id: string
    name:string
}

export const DialogItems: React.FC<DialogItemsPropsType>= (props) => {
    return (
        <li>
            <NavLink to={props.id} className={(navData=>navData.isActive ? style.active+' '+style.dialog:style.dialog)}>
                {props.name}
            </NavLink>
        </li>
    );
};

