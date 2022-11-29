import React, { ReactElement, UIEvent, useEffect, useRef, useState } from 'react';

import style from '../components/Dialogs/dialogs.module.css';
import Message from '../components/Dialogs/Messages/Message';

import { Textarea } from 'common/components/Textarea/Textarea';
import { useAppDispatch, useAppSelector } from 'common/utils/hooks/hooks';
import { validationPostAndDialog } from 'common/utils/validation/validation';
import { DialogItems } from 'components/Dialogs/DialogItems';
import { addMessage, createChatWS, removeChatWS } from 'redux/dialogsReducer';

const Dialogs = (): ReactElement => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isScroll, setIsScroll] = useState(true);

  const dispatch = useAppDispatch();
  const dialogs = useAppSelector(state => state.dialogsPage.dialogs);
  const messages = useAppSelector(state => state.dialogsPage.messages);

  const clickAddNewMessages = (value: string): void => {
    dispatch(addMessage(value));
  };
  const scrollToBottom = (): void => {
    if (isScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onScrollHandler = (e: UIEvent<HTMLElement>): void => {
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
        <ul className={style.dialogItem} onScroll={onScrollHandler}>
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
            callback={clickAddNewMessages}
            validationSchema={validationPostAndDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
