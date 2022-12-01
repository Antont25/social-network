import React, { ChangeEvent, ReactElement } from 'react';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { PhotoCamera } from '@material-ui/icons';

import style from '../userInfo.module.css';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateAvatar } from 'redux/profileSlice';

export const AvatarUser = ({ src }: AvatarParams): ReactElement => {
  const dispatch = useAppDispatch();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      dispatch(updateAvatar(e.target.files[0]));
    }
  };

  return (
    <div className={style.avaBlock}>
      <Avatar className={style.img} alt="Remy Sharp" src={src} />
      <div className={style.loadBtn}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={onChangeHandler}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
    </div>
  );
};
// type
type AvatarParams = {
  src: string;
};
