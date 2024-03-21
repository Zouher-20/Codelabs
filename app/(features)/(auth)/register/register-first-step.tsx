import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../../../components/globals/form/input';

export function RegisterFirstStep({
    nextPageCallback
}: {
    nextPageCallback: (callback: () => Promise<string>) => Promise<void>;
}) {
    const Schemas = yup.object().shape({
        email: yup.string().email('Please enter a valid email').required('Required')
    });
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Schemas,
        onSubmit
    });

    async function onSubmit(values: {}) {
        await nextPageCallback(async () => {
            return values.email;
        });
        console.log(values);
    }
    return (
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
            <button className="btn btn-primary btn-sm  max-w-sm" type="submit">
                Register
            </button>
        </form>
    );
}
