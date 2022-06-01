import React from 'react';
import style from './Dialogs.module.css'
import Message from "./Messages/Message";
import {DialogItems} from "./DialogItems";
import {ActionType, addMessage, DialogsType, MassagesType, newMessageText} from "../../redux/state";
import {Textarea} from "../../common/Textarea";

type DialogsPropsType={
    dialogs: Array<DialogsType>
    massages: Array<MassagesType>
    textMasseg:string
    dispatch: (action: ActionType) => void
}

export const Dialogs = (props:DialogsPropsType) => {


    function addMassageHandler() {
        props.dispatch( addMessage())
    }

    function onChangeMassegHandler(newText:string) {
            props.dispatch(newMessageText(newText))
    }

    return (
        <div className={style.dialogs}>
            <ul>
                {props.dialogs.map(item=><DialogItems key={item.id} name={item.name} id={`${item.id}`}/>)}

            </ul>

            <ul className={style.dialogItem}>
                <Textarea text={props.textMasseg}
                          onChangeHandler={onChangeMassegHandler}
                          add={addMassageHandler}
                />

                {props.massages.map(item=> <Message key={item.id} message={item.message}/>)}

            </ul>
        </div>
    );
};

