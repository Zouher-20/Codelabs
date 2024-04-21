'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import * as z from 'zod';

import Input from '../../../components/globals/form/input';
import AuthCardComponent from '../components/auth-card';

export default function LoginPage() {
    const FormSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        // TODO call server action signin
    };

    const Schemas = yup.object().shape({
        email: yup.string().email('Please enter a valid email').required('Required'),
        password: yup.string().min(5).required('Required')
    });
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Schemas,
        onSubmit
    });

    return (
        <AuthCardComponent>
            <form className="m-auto flex flex-col justify-center" onSubmit={handleSubmit}>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    icon="solar:user-bold"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={errors.email && touched.email ? errors.email : null}
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    icon="solar:lock-unlocked-bold"
                    value={values.password} // Corrected from values.email to values.password
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={errors.email && touched.email ? errors.email : null}
                />
                <button className="btn btn-primary btn-sm  max-w-sm" type="submit">
                    Login
                </button>
                <Link href={'register'} className="flex w-full justify-center py-1 md:justify-end">
                    <h4 className="text-sm font-light text-white underline">register</h4>
                </Link>
            </form>
        </AuthCardComponent>
    );
}
