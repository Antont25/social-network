import React, { ChangeEvent, ReactElement } from 'react';

import TextField from '@material-ui/core/TextField';

import style from './input.module.css';

export const Input = ({
  id,
  onChange,
  autoFocus,
  label,
  error,
  type,
  name,
  className,
  value,
  onBlur,
  touched,
}: InputType): ReactElement => {
  const finalClassName = className
    ? `${style.inputBloc} ${className}`
    : `${style.inputBloc}`;

  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      value={value}
      type={type}
      onChange={onChange}
      error={touched && Boolean(error)}
      helperText={touched && error}
      style={{ marginTop: '10px' }}
      onBlur={onBlur}
      autoFocus={autoFocus}
      className={finalClassName}
    />
  );
};
// type
type InputType = {
  id: string;
  name: string;
  label?: string;
  value: string | null;
  type?: string;
  error?: string | undefined;
  autoFocus?: boolean;
  touched?: boolean | undefined;
  onChange: (e: ChangeEvent<any>) => void;
  onBlur?: () => void;
  className?: string;
};
