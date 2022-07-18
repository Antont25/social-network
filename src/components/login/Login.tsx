import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import style from './login.module.css'
import SuperButton from "../../common/SuperButton/SuperButton";
import {Input} from "../../common/input/Input";


const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className={style.loginBloc}>
            <form onSubmit={formik.handleSubmit}>
                {/*<TextField*/}
                {/*    fullWidth*/}
                {/*    id="email"*/}
                {/*    name="email"*/}
                {/*    label="Email"*/}
                {/*    value={formik.values.email}*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    error={formik.touched.email && Boolean(formik.errors.email)}*/}
                {/*    helperText={formik.touched.email && formik.errors.email}*/}
                {/*/>*/}
                <Input id={"email"}
                       name={"email"}
                       label={"Email"}
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       error={formik.errors.email}
                       touched={formik.touched.email}
                />
                <Input id="password"
                       name="password"
                       label="Password"
                       type="password"
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       error={formik.errors.password}
                       touched={formik.touched.password}
                />
                <SuperButton type="submit" className={style.loginBtn}>
                    Войти
                </SuperButton>
            </form>
        </div>
    );
};