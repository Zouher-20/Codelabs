import * as yup from 'yup';

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).(5,)$/;

const Schemas = yup.object().shape({
    textField: yup.string().required('Required'),
    email: yup.string().email('Please enter a valid email').required('Required'),
    password: yup
        .string()
        .min(5)
        // .matches(passwordRules, { message: 'Please create a strong password' })
        .required('Required')
});

export default Schemas;
