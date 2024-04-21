import { register } from '@/app/api/(modules)/auth/service/actions';
import { password, textField } from '@/app/schemas';
import { useFormik } from 'formik';
import { object } from 'yup';
import Input from '../../../components/globals/form/input';

export function RegisterThirdStep({
    nextPageCallback,
    email,
    otp
}: {
    nextPageCallback: (callback: () => Promise<void>) => Promise<void>;
    email: string;
    otp: string;
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

    async function onSubmit() {
        await nextPageCallback(async () => {
            register({ email, otp, name: values.name, password: values.password });
        });
    }

    return (
        <form className="m-auto flex flex-col justify-center" onSubmit={handleSubmit}>
            <Input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                icon="solar:people-nearby-bold-duotone"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.name && touched.name ? errors.name : null}
            />
            <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                icon="solar:lock-unlocked-bold"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.password && touched.password ? errors.password : null}
            />
            <button className="btn btn-primary btn-sm  max-w-sm" type="submit">
                Register
            </button>
        </form>
    );
}
