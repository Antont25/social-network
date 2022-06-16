import React, {useState} from 'react';
import SuperButton from "./SuperButton/SuperButton";


type TextareaPropsType = {
    text: string
    onChangeHandler: (newtext: string) => void
    add: () => void

}

export const Textarea: React.FC<TextareaPropsType> = (props) => {
    return (
        < >
            <textarea
                value={props.text}
                onChange={(e) => props.onChangeHandler(e.currentTarget.value)}/>
            <SuperButton onClick={props.add}>
                ADD
            </SuperButton>
        </ >
    );
};

