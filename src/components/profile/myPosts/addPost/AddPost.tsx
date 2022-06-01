import React from 'react';
import {ActionType, addPostState, newTextPost} from "../../../../redux/state";
import {Textarea} from "../../../../common/Textarea";

type AddPostPropsType = {
    newPostText: string
    dispatch: (action: ActionType) => void
}

export const AddPost: React.FC<AddPostPropsType> = (props) => {


    function addPost() {
            props.dispatch(addPostState())
            props.dispatch(newTextPost(''))

    }

    function onChangeNewTextHandler(newtext:string) {
        if (newtext) {
            if (props.dispatch) {
                props.dispatch(newTextPost(newtext))
            }
        }}



return (
    <div>
        <Textarea text={ props.newPostText} add={addPost} onChangeHandler={onChangeNewTextHandler}/>

    </div>
);
}


