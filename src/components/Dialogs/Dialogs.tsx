import React from 'react';
import style from './Dialogs.module.css'
import Message from "./Messages/Message";
import {DialogItems} from "./DialogItems";

export const Dialogs = () => {
    let dialogs = [
        {id:1, name:'Amdrey'},
        {id:2, name:'Any'}
    ]
    let massages = [
        {id:1, message:'yoooo'},
        {id:1, message:'ysss'},
    ]

    return (
        <div className={style.dialogs}>
            <ul>
                {dialogs.map(item=><DialogItems key={item.id} name={item.name} id={`${item.id}`}/>)}

            </ul>
            <ul className={style.dialogItem}>
                {massages.map(item=> <Message key={item.id} message={item.message}/>)}

            </ul>
        </div>
    );
};

