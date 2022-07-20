import React, {ChangeEvent, FC} from 'react';
import TextField from "@material-ui/core/TextField";
import style from './input.module.css'

type InputType = {
    id: string
    name: string
    label?: string
    value: string | null
    type?: string
    error?: string | undefined
    autoFocus?: boolean
    touched?: boolean | undefined
    onChange: (e: ChangeEvent<any>) => void
    onBlur?: () => void
    className?: string
}

export const Input: FC<InputType> = (props) => {
    const finalClassName = props.className ? `${style.inputBloc} ${props.className}` : `${style.inputBloc}`
    return (
        <TextField
            fullWidth
            id={props.id}
            name={props.name}
            label={props.label}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            error={props.touched && Boolean(props.error)}
            helperText={props.touched && props.error}
            style={{marginTop: '10px'}}
            onBlur={props.onBlur}
            autoFocus={props.autoFocus}
            className={finalClassName}
        />


    )
}
