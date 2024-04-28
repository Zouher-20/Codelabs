'use client';
import { deleteMyAccount } from '@/app/api/(modules)/auth/service/actions';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { password } from '@/app/schemas';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const DeleteAccountModal = () => {
    const validationSchema = yup.object().shape({
        password: password
    });
    const [loadin, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async () => {
        setLoading(true);
        try {
            await deleteMyAccount({ password: values.password });
            router.replace('/login');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit
    });

    return (
        <dialog id="delete-account-modal" className="modal">
            <div className="modal-box flex w-1/2 max-w-5xl flex-col gap-4 ">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Delete account</h3>
                </form>
                <p className="text-red-600">
                    Please proceed with the deletion of my account and ensure that all associated
                    personal data and information are permanently removed from your servers.
                    Additionally, I would appreciate confirmation once this process is completed.
                </p>
                <form className="flex flex-col " onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col gap-2 py-4 md:grid md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label>Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                                icon="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errors={
                                    errors.password && touched.password ? errors.password : null
                                }
                            />
                        </div>
                    </div>
                    {loadin ? (
                        <div className="flex w-full justify-end">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <Button style="w-fit self-end" color="any" label="Continue" type="submit" />
                    )}
                </form>
            </div>
        </dialog>
    );
};

export default DeleteAccountModal;
