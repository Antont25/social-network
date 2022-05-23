import React, {useRef, MouseEvent} from 'react';
import SuperButton from "../../../../common/SuperButton/SuperButton";
import {ActionTypeAddPost, ActionTypeNewPost} from "../../../../redux/state";

type AddPostPropsType = {
    newPostText: string
    dispatch: (action: ActionTypeAddPost | ActionTypeNewPost) => void
}

export const AddPost: React.FC<AddPostPropsType> = ({ newPostText, dispatch}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    function addPost() {
        if (textareaRef.current ) {
            dispatch({type: 'ADD-POST'})
            dispatch({type:'NEW-TEXT',newText:''})
        }
    }

    function onChangeNewTextHandler() {
        if (textareaRef.current) {
            if (dispatch) {
                dispatch({type:'NEW-TEXT',newText:textareaRef.current.value})
            }
        }

    }

    return (
        <div>
           <textarea ref={textareaRef}
                     value={newPostText}
                     onChange={onChangeNewTextHandler}/>
            <SuperButton onClick={addPost}>
                ADD
            </SuperButton>
        </div>
    );
};

