import { registerOtp } from '@/app/api/(modules)/verified/service/actions';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { email } from '@/app/schemas';
import { useFormik } from 'formik';
import { Play } from 'next/font/google';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { object } from 'yup';
import Input from '../../../components/globals/form/input';
const play = Play({ subsets: ['latin'], weight: '400' });

export function RegisterFirstStep({
    nextPageCallback
}: {
    nextPageCallback: (callback: () => Promise<string>) => Promise<void>;
}) {
    const Schemas = object().shape({
        email: email
    });
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Schemas,
        onSubmit: async ({ email }: { email: string }) => {
            try {
                await registerOtp({ email });
                await nextPageCallback(async () => {
                    return values.email;
                });
            } catch (err: any) {
                toast.error(err.message);
            }
        }
    });

    return (
        <form className="m-auto flex flex-col justify-center" onSubmit={handleSubmit}>
            <label className="mb-1" htmlFor="email">
                Email
            </label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="enter your email"
                icon="solar:user-bold"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.email && touched.email ? errors.email : null}
            />
            <button className="btn btn-primary btn-sm  max-w-sm" type="submit">
                Register
            </button>
            <div className="mt-6 text-center">
                Already registered?{' '}
                <Link href={'login'} className="inline hover:underline hover:decoration-primary">
                    <span className="font-light text-primary">Login</span>
                </Link>
            </div>
            <CustomToaster />
        </form>
    );
}
