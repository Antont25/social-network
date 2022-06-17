import React from 'react';
import style from './Dialogs.module.css'
import Message from "./Messages/Message";
import {DialogItems} from "./DialogItems";
import {Textarea} from "../../common/Textarea";
import {addMessage, DialogsType, MessagesType, newMessageText} from "../../redux/dialogsReduser";
import {connect} from "react-redux";
import {AppStoreType} from "../../redux/store";

type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType


type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    massages: Array<MessagesType>
    textMessages: string
}
type MapDispatchToPropsType = {
    newMessageText: (newText: string) => void
    addMessage: () => void
}

const Dialogs = (props: DialogsPropsType) => {


    function addMessagesHandler() {
        props.addMessage()
        props.newMessageText('')
    }

    function onChangeMessagesHandler(newText: string) {
        props.newMessageText(newText)
    }

    return (
        <div className={style.dialogs}>
            <ul>
                {props.dialogs.map(item => <DialogItems key={item.id} name={item.name} id={`${item.id}`}/>)}

            </ul>

            <ul className={style.dialogItem}>
                <Textarea text={props.textMessages}
                          onChangeHandler={onChangeMessagesHandler}
                          add={addMessagesHandler}
                />

                {props.massages.map(item => <Message key={item.id} message={item.message}/>)}

            </ul>
        </div>
    );
};

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => {
    return {
        textMessages: state.dialogsPage.newTextMessages,
        dialogs: state.dialogsPage.dialogs,
        massages: state.dialogsPage.messages
    }
}


export default connect(mapStateToProps, {addMessage, newMessageText})(Dialogs);