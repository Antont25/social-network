import React, { ReactElement, useEffect } from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import style from './login.module.css';

import { Button } from 'common/components/Button';
import { Input } from 'common/components/Input';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchAuthorization } from 'redux/appSlice';
import { getAuthorizedStatus, getCaptchaUrl } from 'selectors';
import { validationLogin } from 'validation/validation';

export const Login = (): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const authorizedStatus = useAppSelector(getAuthorizedStatus);
  const captchaUrl = useAppSelector(getCaptchaUrl);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      captcha: '',
    },
    validationSchema: validationLogin,
    onSubmit: (values, { setStatus }) => {
      dispatch(
        fetchAuthorization(values.email, values.password, setStatus, values.captcha),
      );
    },
  });
  const disabled =
    formik.touched.password &&
    formik.touched.email &&
    !!(formik.errors.email || formik.errors.password);

  useEffect(() => {
    if (authorizedStatus === 'successfully') navigate('/');
  }, [authorizedStatus]);

  return (
    <div className={style.loginBloc}>
      <form onSubmit={formik.handleSubmit}>
        <div className={style.testBlock}>
          <span>Данные тестового аккаунта:</span>
          <div>Email: free@samuraijs.com</div>
          <div>Password: free</div>
        </div>
        <Input
          id="email"
          label="Email"
          {...formik.getFieldProps('email')}
          error={formik.errors.email}
          touched={formik.touched.email}
          onBlur={() => formik.setFieldTouched('email', true)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          {...formik.getFieldProps('password')}
          error={formik.errors.password || formik.status}
          touched={formik.touched.password}
          onBlur={() => formik.setFieldTouched('password', true)}
        />
        {captchaUrl && (
          <div>
            <img src={captchaUrl} alt="captcha" className={style.captchaImg} />
            <Input
              id="captcha"
              label="captcha"
              type="captcha"
              {...formik.getFieldProps('captcha')}
              error={formik.errors.captcha || formik.status}
              touched={formik.touched.captcha}
              onBlur={() => formik.setFieldTouched('captcha', true)}
            />
          </div>
        )}
        <Button type="submit" className={style.loginBtn} disabled={disabled}>
          Войти
        </Button>
      </form>
    </div>
  );
};
