import React, { ReactElement } from 'react';

import { useFormik } from 'formik';

import style from '../userInfo.module.css';

import { Button } from 'common/components/Button';
import { Input } from 'common/components/Input';
import { useAppDispatch, useAppSelector } from 'hooks';
import { updateDateProfile } from 'redux/profileSlice';
import { getContacts } from 'selectors';

export const FormContacts = ({
  setEditMode,
  onClosedEditModeClick,
}: FormContactsType): ReactElement => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(getContacts);

  const formik = useFormik({
    initialValues: {
      facebook: contacts.facebook,
      website: contacts.website,
      vk: contacts.vk,
      twitter: contacts.twitter,
      instagram: contacts.instagram,
      youtube: contacts.youtube,
      github: contacts.github,
      mainLink: contacts.mainLink,
    },

    onSubmit: values => {
      dispatch(updateDateProfile(values));
      setEditMode(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <Input
        id="facebook"
        label="Facebook"
        {...formik.getFieldProps('facebook')}
        error={formik.errors.facebook}
        touched={formik.touched.facebook}
        onBlur={() => formik.setFieldTouched('facebook', true)}
      />
      <Input
        id="website"
        label="Website"
        {...formik.getFieldProps('website')}
        error={formik.errors.website}
        touched={formik.touched.website}
        onBlur={() => formik.setFieldTouched('website', true)}
      />
      <Input
        id="vk"
        label="vk"
        {...formik.getFieldProps('vk')}
        error={formik.errors.vk}
        touched={formik.touched.vk}
        onBlur={() => formik.setFieldTouched('vk', true)}
      />
      <Input
        id="twitter"
        label="Twitter"
        {...formik.getFieldProps('twitter')}
        error={formik.errors.twitter}
        touched={formik.touched.twitter}
        onBlur={() => formik.setFieldTouched('twitter', true)}
      />
      <Input
        id="youtube"
        label="Youtube"
        {...formik.getFieldProps('youtube')}
        error={formik.errors.youtube}
        touched={formik.touched.youtube}
        onBlur={() => formik.setFieldTouched('youtube', true)}
      />
      <Input
        id="github"
        label="Github"
        {...formik.getFieldProps('github')}
        error={formik.errors.github}
        touched={formik.touched.github}
        onBlur={() => formik.setFieldTouched('github', true)}
      />
      <Input
        id="mainLink"
        label="MainLink"
        {...formik.getFieldProps('mainLink')}
        error={formik.errors.mainLink}
        touched={formik.touched.mainLink}
        onBlur={() => formik.setFieldTouched('mainLink', true)}
      />
      <div className={style.btnBlock}>
        <Button className={style.btn} type="submit">
          сохранить
        </Button>
        <Button className={style.btn} onClick={onClosedEditModeClick}>
          отмена
        </Button>
      </div>
    </form>
  );
};
// type
type FormContactsType = {
  setEditMode: (value: boolean) => void;
  onClosedEditModeClick?: () => void;
};
