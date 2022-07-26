import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import style from './login.module.css'
import SuperButton from "../SuperButton/SuperButton";
import {Input} from "../input/Input";
import {useAppDispatch, useAppSelector} from "../../redux/app/hooks";
import {fetchAuthorization} from "../../redux/authorizedReducer";
import {Navigate, useNavigate} from "react-router-dom";


const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const Login = () => {
    const dispatch = useAppDispatch()
    const authorizedCode = useAppSelector(state => state.authorized.authorizedCode)
    const navigate = useNavigate()
    useEffect(() => {
        if (authorizedCode === 0) navigate('/')
    }, [authorizedCode])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            dispatch(fetchAuthorization(values.email, values.password));
        },
    });

    return (
        <div className={style.loginBloc}>
            <form onSubmit={formik.handleSubmit}>
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