import React from 'react'
import style from './Message.module.css'

type MessageType = {
    avatar?: string
    name?: string
    message: string
    time?: string
}

function Message(props: MessageType) {
    return (
        <div className={style.message}>
            <div className={style.avatar}><img src={props.avatar} alt="avatar"/></div>
            <div className={style.blockMessage}>
                <div>
                    <div className={style.name}>{props.name}</div>
                    <div className={style.messageText}>{props.message}</div>
                    <div className={style.time}>{props.time}</div>
                </div>
            </div>
        </div>
    )
}

export default Message
