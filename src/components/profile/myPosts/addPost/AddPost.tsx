import React, {useRef,MouseEvent} from 'react';
import SuperButton from "../../../../common/SuperButton/SuperButton";

type AddPostPropsType={
    addPost?:(text:string)=>void
}

export const AddPost: React.FC<AddPostPropsType> = (props) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const addPost=()=>{
       if(textareaRef.current && props.addPost){
          props.addPost(textareaRef.current.value)
       }
    }
    return (
        <div>
           <textarea ref={textareaRef}></textarea>
            <SuperButton onClick={addPost}
            >ADD</SuperButton>
        </div>
    );
};

