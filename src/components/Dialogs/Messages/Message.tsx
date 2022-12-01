import React, { ReactElement } from 'react';

import style from './message.module.css';

import { MessageType } from 'type';

export const Message = ({ message, photo, userName }: MessageType): ReactElement => {
  if (message.length < 1) {
    return <div>Сообщений нет</div>;
  }

  return (
    <div className={style.message}>
      <div className={style.avatar}>
        <img src={photo} alt="avatar" />
      </div>
      <div className={style.blockMessage}>
        <div>
          <div className={style.name}>{userName}</div>
          <div className={style.messageText}>{message}</div>
        </div>
      </div>
    </div>
  );
};
