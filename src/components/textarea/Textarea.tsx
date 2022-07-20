import React, {useState} from 'react';
import SuperButton from "../SuperButton/SuperButton";
import style from './textarea.module.css'
import TextField from '@material-ui/core/TextField';


type TextareaPropsType = {
    text: string
    onChangeHandler: (newtext: string) => void
    add: () => void
}

export const Textarea: React.FC<TextareaPropsType> = (props) => {
    return (
        < >

            <TextField
                label="новый пост"
                placeholder="новый пост"
                multiline
                variant="outlined"
                value={props.text}
                className={style.textareaBloc}
                onChange={(e) => props.onChangeHandler(e.currentTarget.value)}
            />
            <SuperButton onClick={props.add}>
                ADD
            </SuperButton>
        </ >
    );
};

