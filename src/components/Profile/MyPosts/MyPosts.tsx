import React from 'react';
import {MyPost} from './MyPost/MyPost';
import {Paper} from '@material-ui/core';
import style from './myPosts.module.css'
import {addPost, PostsType} from '../../../redux/profileReducer';
import {Textarea} from '../../../common/components/Textarea/Textarea';
import {validationPostAndDialog} from '../../../common/utils/validation/validation';
import {useAppDispatch} from '../../../common/utils/hooks/hooks';


export const MyPosts = (props: PostPageType) => {
    const dispatch = useAppDispatch()
    let newPost = props.posts.map(item => <MyPost key={item.id} massage={item.massage} likes={item.likes}
                                                  photoUser={props.photoUser}/>)
    const addPostHandler = (newText: string) => {
        dispatch(addPost(newText))
    }
    return (
        <Paper elevation={3} className={style.postBloc}>
            <h2>Мои посты</h2>
            <div className={style.addPostBloc}>
                <Textarea callback={addPostHandler}
                          validationSchema={validationPostAndDialog}
                />
            </div>

            {newPost}
        </Paper>
    );
};
//type
type PostPageType = {
    posts: Array<PostsType>
    photoUser: string | null
}

