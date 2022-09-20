import React from 'react';
import style from './textarea.module.css'
import TextField from '@material-ui/core/TextField';
import Button from '../Button/Button';
import {useFormik} from 'formik';


export const Textarea = (props: TextareaPropsType) => {

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: props.validationSchema,
        onSubmit: (values, {resetForm}) => {
            props.callback(values.text)
            resetForm()
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={style.addTextBloc}>
                <TextField
                    name={'text'}
                    label="новый пост"
                    placeholder="новый пост"
                    multiline
                    variant="outlined"
                    value={formik.values.text}
                    className={style.textareaBloc}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.text)}
                    helperText={formik.errors.text}
                    inputProps={{maxLength: 101}}
                />

                <Button type="submit"
                        className={style.addBtn}>
                    Добавить
                </Button>
            </div>
        </form>
    );
};
//type
type TextareaPropsType = {
    callback: (value: string) => void
    validationSchema: any
}


