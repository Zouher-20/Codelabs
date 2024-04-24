'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { object } from 'yup';

import { signIn } from '@/app/api/(modules)/auth/service/actions';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { email, password } from '@/app/schemas';
import { ROLE } from '@prisma/client';
import { Play } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../../../components/globals/form/input';
import AuthCardComponent from '../components/auth-card';
const play = Play({ subsets: ['latin'], weight: '400' });

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            const user = await signIn(values.email, values.password);
            if (user) {
                if (user.role === ROLE.ADMIN) {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const Schemas = object().shape({
        email: email,
        password: password
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
                <button
                    disabled={loading}
                    className="btn btn-primary btn-sm max-w-sm"
                    type="submit"
                >
                    Login
                </button>
                <div className="divider my-4 text-center">or</div>
                <Link href={'register'} className="text-center hover:underline ">
                    <h4 className=" font-light text-white">
                        Signup to{' '}
                        <span className={play.className}>
                            <span className="text-primary">Code</span>
                            <span className="text-white">Labs</span>
                        </span>
                    </h4>
                </Link>
            </form>
            <CustomToaster />
        </AuthCardComponent>
    );
}
