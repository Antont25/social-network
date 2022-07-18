import React, {ChangeEvent, FC} from 'react';
import TextField from "@material-ui/core/TextField";

type InputType = {
    id: string
    name: string
    label: string
    value: string | null
    type?: string
    error?: string | undefined
    autoFocus?: boolean
    touched?: boolean | undefined
    onChange: (e: ChangeEvent<any>) => void
    onBlur?: () => void
}

export const Input: FC<InputType> = (props) => {
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
        />
    );
};

// <TextField
//     fullWidth
//     id="email"
//     name="email"
//     label="Email"
//     value={formik.values.email}
//     onChange={formik.handleChange}
//     error={formik.touched.email && Boolean(formik.errors.email)}
//     helperText={formik.touched.email && formik.errors.email}
// />
