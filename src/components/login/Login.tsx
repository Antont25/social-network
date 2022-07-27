import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import style from './login.module.css'
import Button from "../common/button/Button";
import {Input} from "../common/input/Input";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {fetchAuthorization} from "../../redux/authorizedReducer";
import {useNavigate} from "react-router-dom";
import {validationLogin} from "../../utils/validation/validation";


export const Login = () => {
    const dispatch = useAppDispatch()
    const authorizedStatus = useAppSelector(state => state.authorized.authorizedStatus)
    const navigate = useNavigate()

    useEffect(() => {
        if (authorizedStatus === 'successfully') navigate('/')
    }, [authorizedStatus])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationLogin,
        onSubmit: (values, {setStatus}) => {
            dispatch(fetchAuthorization(values.email, values.password, setStatus));
        },
    });
    const disabled = (formik.touched.password && formik.touched.email && !!(formik.errors.email || formik.errors.password))
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
                       onBlur={() => formik.setFieldTouched('email', true)}
                />
                <Input id="password"
                       name="password"
                       label="Password"
                       type="password"
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       error={formik.errors.password || formik.status}
                       touched={formik.touched.password}
                       onBlur={() => formik.setFieldTouched('password', true)}
                />
                <Button type="submit"
                        className={style.loginBtn}
                        disabled={disabled}
                >
                    Войти
                </Button>
            </form>
        </div>
    );
};