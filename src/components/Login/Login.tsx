import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import style from './login.module.css'
import Button from '../common/Button/Button';
import {Input} from '../common/Input/Input';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/hooks';
import {fetchAuthorization} from '../../redux/appReducer';
import {useNavigate} from 'react-router-dom';
import {validationLogin} from '../../utils/validation/validation';


export const Login = () => {
    const dispatch = useAppDispatch()
    const authorizedStatus = useAppSelector(state => state.app.authorizedStatus)
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
                <div className={style.testBlock}>
                    <span>Данные тестового аккаунта:</span>
                    <div>Email: free@samuraijs.com</div>
                    <div>Password: free</div>
                </div>
                <Input id={'email'}
                       label={'Email'}
                       {...formik.getFieldProps('email')}
                       error={formik.errors.email}
                       touched={formik.touched.email}
                       onBlur={() => formik.setFieldTouched('email', true)}
                />
                <Input id="password"
                       label="Password"
                       type="password"
                       {...formik.getFieldProps('password')}
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