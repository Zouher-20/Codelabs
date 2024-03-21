import * as yup from 'yup';

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).(5,)$/;

export const textField = yup.string().required('Required');

export const textarea = yup.string().required('Required');

export const email = yup.string().email('Please enter a valid email').required('Required');

export const password = yup
    .string()
    .min(5)
    // .matches(passwordRules, { message: 'Please create a strong password' })
    .required('Required');
