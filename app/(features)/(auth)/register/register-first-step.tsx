import { registerOtp } from '@/app/api/(modules)/verified/service/actions';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { email } from '@/app/schemas';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { object } from 'yup';
import Input from '../../../components/globals/form/input';

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
                toast.error(err);
            }
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
            <CustomToaster />
        </form>
    );
}
