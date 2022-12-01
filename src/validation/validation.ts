import * as yup from 'yup';

export const validationPostAndDialog = yup.object({
  // eslint-disable-next-line no-magic-numbers
  text: yup.string().max(100, 'max 100 symbol').required('Field is required'),
});

export const validationLogin = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    // eslint-disable-next-line no-magic-numbers
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
  captcha: yup.string().max(6, 'Captcha should be of maximum 6 characters length'),
});
