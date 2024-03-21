import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../../../components/globals/form/input';

export function RegisterThirdStep({
    nextPageCallback,
    email
}: {
    nextPageCallback: (callback: () => Promise<void>) => Promise<void>;
    email: String;
}) {
    const Schemas = yup.object().shape({
        name: yup.string().required('name field must not be empty'),
        password: yup.string().min(5).required('Required')
    });
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            name: '',
            password: ''
        },
        validationSchema: Schemas,
        onSubmit
    });

    async function onSubmit(values: {}) {
        await nextPageCallback(async () => {});
        console.log(values);
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
