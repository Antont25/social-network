import React, { ReactElement } from 'react';

import { Paper } from '@material-ui/core';

import { MyPost } from './MyPost';
import style from './myPosts.module.css';

import { Textarea } from 'common/components/Textarea/Textarea';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { addPost, PostsType } from 'redux/profileSlice';
import { validationPostAndDialog } from 'validation/validation';

export const MyPosts = ({ posts, photoUser }: PostPageType): ReactElement => {
  const dispatch = useAppDispatch();

  const newPost = posts.map(post => (
    <MyPost
      key={post.id}
      massage={post.massage}
      likes={post.likes}
      photoUser={photoUser}
    />
  ));

  const handleAddPost = (newText: string): void => {
    dispatch(addPost(newText));
  };

  return (
    <Paper elevation={3} className={style.postBloc}>
      <h2>Мои посты</h2>
      <div className={style.addPostBloc}>
        <Textarea callback={handleAddPost} validationSchema={validationPostAndDialog} />
      </div>

      {newPost}
    </Paper>
  );
};
// type
type PostPageType = {
  posts: Array<PostsType>;
  photoUser: string | null;
};
