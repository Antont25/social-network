import React, {useEffect} from 'react';
import style from '../components/Dialogs/dialogs.module.css'
import Message from '../components/Dialogs/Messages/Message';
import {DialogItems} from '../components/Dialogs/DialogItems';
import {Textarea} from '../common/components/Textarea/Textarea';
import {addMessage, createChatWS, removeChatWS} from '../redux/dialogsReducer';
import {validationPostAndDialog} from '../common/utils/validation/validation';
import {useAppDispatch, useAppSelector} from '../common/utils/hooks/hooks';


const Dialogs = () => {
    const dispatch = useAppDispatch()
    const dialogs = useAppSelector(state => state.dialogsPage.dialogs)
    const messages = useAppSelector(state => state.dialogsPage.messages)

    // const [messages, setMessage] = useState<MessageType[]>([])
    // const [ws, setWs] = useState<WebSocket>()

    const clickAddNewMessages = (value: string) => {
        dispatch(addMessage(value))
    }
    useEffect(() => {
        dispatch(createChatWS())
        return () => dispatch(removeChatWS())
    }, [])

    // const closeHandler = (e: WebSocketEventMap['close']) => {
    //     console.log('closeHandler')
    //     clearInterval(closeID)
    //     closeID = setInterval(() => createWS(), 3000)
    //
    // }

    // const openHandler = () => {
    //     setMessage([])
    //     clearInterval(closeID)
    // }


    //     const createWS = async () => {
    //         // const ws = await new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    //
    //         setWs(ws)
    //
    //         ws.addEventListener('message', messageHandler)
    //         ws.addEventListener('close', closeHandler)
    //         ws.addEventListener('open', openHandler)
    //     }
    //
    //     createWS()
    //
    //     return () => {
    //         clearInterval(closeID)
    //         ws?.removeEventListener('message', messageHandler)
    //         ws?.removeEventListener('close', closeHandler)
    //         ws?.close()
    //     }
    //
    // }, [])

    return (
        <div className={style.dialogs}>
            <ul>
                {dialogs.map(item => <DialogItems key={item.id} name={item.name} id={`${item.id}`}/>)}

            </ul>
            <div className={style.message}>
                <ul className={style.dialogItem}>
                    {messages.length > 0 && messages.map((item, index) => <Message key={index}
                                                                                   message={item.message}
                                                                                   photo={item.photo}
                                                                                   userId={item.userId}
                                                                                   userName={item.userName}/>)}

                </ul>
                <div className={style.addMessage}>
                    <Textarea callback={clickAddNewMessages}
                              validationSchema={validationPostAndDialog}
                    />
                </div>
            </div>

        </div>
    );
};


export default Dialogs;
