import React, {useEffect, useRef, useState, UIEvent, useCallback, FC} from "react";
import style from "../components/Dialogs/dialogs.module.css"
import Message from "../components/Dialogs/Messages/Message";
import {DialogItems} from "../components/Dialogs/DialogItems";
import {Textarea} from "../common/components/Textarea/Textarea";
import {addMessage, createChatWS, removeChatWS} from "../redux/dialogsReducer";
import {validationPostAndDialog} from "../common/utils/validation/validation";
import {useAppDispatch, useAppSelector} from "../common/utils/hooks/hooks";


const Dialogs = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [isScroll, setIsScroll] = useState(true)

  const dispatch = useAppDispatch()
  const dialogs = useAppSelector(state => state.dialogsPage.dialogs)
  const messages = useAppSelector(state => state.dialogsPage.messages)

  const clickAddNewMessages = ( value: string ) => {
    dispatch(addMessage(value))
  }
  const scrollToBottom = () => {
    if (isScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const onScrollHandler = ( e: UIEvent<HTMLElement> ) => {
    const maxScrollPosition = e.currentTarget.scrollHeight - e.currentTarget.clientHeight
    if (Math.abs(maxScrollPosition - e.currentTarget.scrollTop) > 5) {
      setIsScroll(false)
    } else {
      setIsScroll(true)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    dispatch(createChatWS())
    return () => dispatch(removeChatWS())
  }, [])


  return (
    <div className={style.dialogs}>
      <ul>
        {dialogs.map(item => <DialogItems key={item.id} name={item.name} id={`${item.id}`}/>)}

      </ul>
      <div className={style.message}>
        <ul className={style.dialogItem} onScroll={onScrollHandler}>
          {messages.length > 0 && messages.map(( item, index ) => <Message key={index}
                                                                           message={item.message}
                                                                           photo={item.photo}
                                                                           userId={item.userId}
                                                                           userName={item.userName}/>)}
          <div ref={messagesEndRef}/>
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
