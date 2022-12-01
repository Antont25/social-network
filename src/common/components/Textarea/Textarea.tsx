import React, { ReactElement } from 'react';

import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';

import style from './textarea.module.css';

import { Button } from 'common/components/Button';

export const Textarea = ({
  callback,
  validationSchema,
}: TextareaPropsType): ReactElement => {
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      callback(values.text);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={style.addTextBloc}>
        <TextField
          name="text"
          label="новый пост"
          placeholder="новый пост"
          multiline
          variant="outlined"
          value={formik.values.text}
          className={style.textareaBloc}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.text)}
          helperText={formik.errors.text}
          inputProps={{ maxLength: 101 }}
        />

        <Button type="submit" className={style.addBtn}>
          Добавить
        </Button>
      </div>
    </form>
  );
};
// type
type TextareaPropsType = {
  callback: (value: string) => void;
  validationSchema: any;
};
