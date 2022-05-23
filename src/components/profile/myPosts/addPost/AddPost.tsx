import React, {useRef, MouseEvent} from 'react';
import SuperButton from "../../../../common/SuperButton/SuperButton";

type AddPostPropsType = {
    newPostText: string
    addPost?: (text: string) => void
    changeNewPostText?: (text: string) => void
}

export const AddPost: React.FC<AddPostPropsType> = ({addPost: addPost1, changeNewPostText, newPostText}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    function addPost() {
        if (textareaRef.current && addPost1) {
            addPost1(textareaRef.current.value)
            if (changeNewPostText) {
                changeNewPostText('')
            }
        }
    }

    function onChangeNewTextHandler() {
        if (textareaRef.current) {
            if (changeNewPostText) {
                changeNewPostText(textareaRef.current.value)
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

