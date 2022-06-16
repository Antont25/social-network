import React from 'react';
import {Textarea} from "../../../../common/Textarea";

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
        <div>
            <Textarea text={props.newPostText} add={addPost} onChangeHandler={onChangeNewTextHandler}/>
        </div>
    );
}


