import React, { ReactElement, UIEvent, useEffect, useRef, useState } from 'react';

import style from '../components/Dialogs/dialogs.module.css';

import { Textarea } from 'common/components/Textarea/Textarea';
import { DialogItems } from 'components/Dialogs';
import { Message } from 'components/Dialogs/Messages';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addMessage, createChatWS, removeChatWS } from 'redux/dialogsReducer';
import { getDialogs, getMessages } from 'selectors';
import { validationPostAndDialog } from 'validation/validation';

const Dialogs = (): ReactElement => {
  const dispatch = useAppDispatch();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [isScroll, setIsScroll] = useState(true);

  const dialogs = useAppSelector(getDialogs);
  const messages = useAppSelector(getMessages);

  const onAddNewMessagesClick = (value: string): void => {
    dispatch(addMessage(value));
  };

  const scrollToBottom = (): void => {
    if (isScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onDialogItemScroll = (e: UIEvent<HTMLElement>): void => {
    const maxScrollPosition = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;

    // eslint-disable-next-line no-magic-numbers
    if (Math.abs(maxScrollPosition - e.currentTarget.scrollTop) > 5) {
      setIsScroll(false);
    } else {
      setIsScroll(true);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(createChatWS());

    return () => dispatch(removeChatWS());
  }, []);

  return (
    <div className={style.dialogs}>
      <ul>
        {dialogs.map(item => (
          <DialogItems key={item.id} name={item.name} id={`${item.id}`} />
        ))}
      </ul>
      <div className={style.message}>
        <ul className={style.dialogItem} onScroll={onDialogItemScroll}>
          {messages.length > 0 &&
            messages.map((item, index) => (
              <Message
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                message={item.message}
                photo={item.photo}
                userId={item.userId}
                userName={item.userName}
              />
            ))}
          <div ref={messagesEndRef} />
        </ul>
        <div className={style.addMessage}>
          <Textarea
            callback={onAddNewMessagesClick}
            validationSchema={validationPostAndDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
