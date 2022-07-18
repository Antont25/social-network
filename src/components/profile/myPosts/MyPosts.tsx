import React from 'react';
import {AddPost} from "./addPost/AddPost";
import {MyPost} from "./myPost/MyPost";

import {Paper} from "@material-ui/core";
import style from './addPost/addPost.module.css'
import {PostsType} from "../../../redux/profileReducer";

type PostPageType = {
    posts: Array<PostsType>
    newPostText: string
    photoUser: string | null
    addPostState: () => void
    newTextPost: (newText: string) => void
}
export const MyPosts = (props: PostPageType) => {


    let newPost = props.posts.map(item => <MyPost key={item.id} massage={item.massage} likes={item.likes}
                                                  photoUser={props.photoUser}/>)
    return (
        <Paper elevation={3} className={style.postBloc}>
            <h2>Мои посты</h2>
            <AddPost newPostText={props.newPostText}
                     addPostState={props.addPostState}
                     newTextPost={props.newTextPost}
            />
            {newPost}
        </Paper>
    );
};

