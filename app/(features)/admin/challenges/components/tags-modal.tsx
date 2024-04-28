import * as yup from 'yup';

import { tag } from '@/app/@types/tag';
import { addTag } from '@/app/api/(modules)/admin/service/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useFormik } from 'formik';
import { useState } from 'react';

const AddTagModal = ({
    newTagCallbackFunction
}: {
    newTagCallbackFunction: (tag: tag) => void;
}) => {
    const validationSchema = yup.object().shape({
        name: yup.string().required('Required')
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await addTag(values.name);
            newTagCallbackFunction(res);
            resetForm();
            (document.getElementById('add-tag-modal') as HTMLDialogElement).close();
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const { values, errors, touched, resetForm, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues: {
                name: ''
            },
            validationSchema: validationSchema,
            onSubmit
        });
    return (
        <dialog id="add-tag-modal" className="modal">
            <div className="modal-box flex w-1/3 max-w-2xl flex-col gap-4 max-md:w-1/2">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Add Tag</h3>
                </form>
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                    <div className="flex gap-2 max-md:flex-col">
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="tag"
                            icon="solar:user-bold"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            errors={errors.name && touched.name ? errors.name : null}
                        />
                    </div>
                    {loading ? (
                        <p className="flex w-full justify-end">loading</p>
                    ) : (
                        <div className="flex w-full flex-col items-end">
                            <Button
                                style="w-fit self-end"
                                color="any"
                                label="Continue"
                                type="submit"
                            />
                            {error.length != 0 ? (
                                <p className="text-sm text-red-600">{error}</p>
                            ) : null}
                        </div>
                    )}
                </form>
            </div>
        </dialog>
    );
};

export default AddTagModal;
