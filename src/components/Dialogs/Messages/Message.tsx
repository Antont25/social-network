import React from 'react'
import style from './message.module.css'
import {MessageType} from '../../../api/chat-api';


function Message(props: MessageType) {
    return (
        <div className={style.message}>
            <div className={style.avatar}><img src={props.photo} alt="avatar"/></div>
            <div className={style.blockMessage}>
                <div>
                    <div className={style.name}>{props.userName}</div>
                    <div className={style.messageText}>{props.message}</div>
                </div>
            </div>
        </div>
    )
}

export default Message
//type

