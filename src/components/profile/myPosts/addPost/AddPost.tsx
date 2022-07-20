import React from 'react';
import {Textarea} from "../../../textarea/Textarea";
import style from './addPost.module.css'

type AddPostPropsType = {
    newPostText: string
    addPostState: () => void
    newTextPost: (newText: string) => void
}

export const AddPost: React.FC<AddPostPropsType> = (props) => {
    function addPost() {
        props.addPostState()
        props.newTextPost('')
    }

    function onChangeNewTextHandler(newText: string) {
        props.newTextPost(newText)
    }

    return (
        <div className={style.addPostBloc}>
            <Textarea text={props.newPostText} add={addPost} onChangeHandler={onChangeNewTextHandler}/>
        </div>
    );
}


