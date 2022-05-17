import React from 'react';
import style from './Dialogs.module.css'
import Message from "./Messages/Message";
import {DialogItems} from "./DialogItems";
import {DialogsPageType} from "../../redux/state";

export const Dialogs = (props:DialogsPageType) => {


    return (
        <div className={style.dialogs}>
            <ul>
                {props.dialogs.map(item=><DialogItems key={item.id} name={item.name} id={`${item.id}`}/>)}

            </ul>
            <ul className={style.dialogItem}>
                {props.massages.map(item=> <Message key={item.id} message={item.message}/>)}

            </ul>
        </div>
    );
};

