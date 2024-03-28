import { useFormik } from 'formik';
import * as yup from 'yup';
import * as z from 'zod';
import Input from '../../../components/globals/form/input';

const FormSchema = z.object({
    email: z.string().email()
});

const onSubmit = async (value: z.infer<typeof FormSchema>) => {
    const response = await fetch('api/veryfied/register-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: value.email
        })
    });
    if (response.ok) {
        console.log('Email sent successfully');
    } else {
        console.error('Failed to send email');
    }
};

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
        onSubmit: async values => {
            await onSubmit(values);
            await nextPageCallback(async () => {
                return values.email;
            });
        }
    });

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
