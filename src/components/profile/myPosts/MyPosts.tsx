import React from 'react';
import {MyPost} from "./myPost/MyPost";
import {Paper} from "@material-ui/core";
import style from './myPosts.module.css'
import {PostsType} from "../../../redux/profileReducer";
import {Textarea} from "../../common/textarea/Textarea";
import {validationPostAndDialog} from "../../../utils/validation/validation";

type PostPageType = {
    posts: Array<PostsType>
    photoUser: string | null
    addPost: (newText: string) => void
}
export const MyPosts = (props: PostPageType) => {

    let newPost = props.posts.map(item => <MyPost key={item.id} massage={item.massage} likes={item.likes}
                                                  photoUser={props.photoUser}/>)
    return (
        <Paper elevation={3} className={style.postBloc}>
            <h2>Мои посты</h2>
            <div className={style.addPostBloc}>
                <Textarea callback={props.addPost}
                          validationSchema={validationPostAndDialog}
                />
            </div>

            {newPost}
        </Paper>
    );
};

