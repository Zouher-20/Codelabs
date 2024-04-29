import { getSession, register, signIn } from '@/app/api/(modules)/auth/service/actions';
import { password, textField } from '@/app/schemas';
import { ROLE } from '@prisma/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object } from 'yup';
import Input from '../../../components/globals/form/input';

export function RegisterThirdStep({
    nextPageCallback,
    email,
    otp,
    onBack
}: {
    nextPageCallback: (callback: () => Promise<void>) => Promise<void>;
    email: string;
    otp: string;
    onBack: () => void;
}) {
    const Schemas = object().shape({
        name: textField,
        password: password
    });
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            name: '',
            password: ''
        },
        validationSchema: Schemas,
        onSubmit
    });
    const router = useRouter();

    async function onSubmit() {
        await nextPageCallback(async () => {
            try {
                const user = await register({
                    email,
                    otp,
                    name: values.name,
                    password: values.password
                });
                if (user) {
                    await signIn(email, values.password);
                    const session = await getSession();
                    if (session) {
                        if (session.role === ROLE.ADMIN) {
                            router.push('/admin');
                        } else {
                            router.push('/');
                        }
                    }
                }
            } catch (e) {}
        });
    }

    return (
        <form className="m-auto flex flex-col justify-center" onSubmit={handleSubmit}>
            <label className="mb-1" htmlFor="name">
                Name
            </label>
            <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                icon="solar:people-nearby-bold-duotone"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.name && touched.name ? errors.name : null}
            />
            <label className="mb-1" htmlFor="name">
                Password
            </label>
            <Input
                id="password"
                name="password"
                type="password"
                placeholder="a strong one is prefered"
                icon="solar:lock-unlocked-bold"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.password && touched.password ? errors.password : null}
            />
            <div className="mt-2 grid grid-cols-1 gap-2">
                <button className="btn btn-primary btn-sm  max-w-sm" type="submit">
                    Register
                </button>
                <div className="btn btn-ghost btn-sm mx-auto w-1/3 text-start" onClick={onBack}>
                    back
                </div>
            </div>
        </form>
    );
}
