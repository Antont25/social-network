import React, { ReactElement } from 'react';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';

import style from './myPost.module.css';

import avatar from 'assest/img/avatar.png';

export const MyPost: React.FC<MyPostPropsType> = ({
  massage,
  likes,
  photoUser,
}): ReactElement => {
  return (
    <Paper className={style.postBloc}>
      <Avatar className={style.img} alt="Remy Sharp" src={photoUser || avatar} />
      <div className={style.post}>
        <span>{massage}</span>

        <div className={style.likesBloc}>
          <IconButton color="secondary" size="small">
            <FavoriteIcon />
            <span className={style.likes}>{likes}</span>
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};
// type
type MyPostPropsType = {
  massage: string;
  likes: number;
  photoUser: string | null;
};
