import * as yup from 'yup';

import { tag } from '@/app/@types/tag';
import { addTag, editTage } from '@/app/api/(modules)/admin/service/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddTagModal = ({
    selecetedTag,
    newTagCallbackFunction
}: {
    selecetedTag?: tag | null;
    newTagCallbackFunction: (tag: tag) => void;
}) => {
    const validationSchema = yup.object().shape({
        name: yup.string().required('Required')
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setFieldValue('name', selecetedTag?.tagename ?? '');
    }, [selecetedTag]);
    const onSubmit = async () => {
        setLoading(true);
        try {
            let res;
            if (selecetedTag == null) {
                res = await addTag(values.name);
            } else {
                res = await editTage({ newTag: values.name, tagId: selecetedTag?.id ?? '' });
            }
            newTagCallbackFunction(res);
            resetForm();
            (document.getElementById('add-tag-modal') as HTMLDialogElement).close();
            toast.success('tag added successfully');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const {
        values,
        errors,
        touched,
        resetForm,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue
    } = useFormik({
        initialValues: {
            name: selecetedTag?.tagename ?? ''
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
                    <h3 className="slef-center text-2xl font-bold">
                        {selecetedTag != null ? 'Edit Tag' : 'Add Tag'}
                    </h3>
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
                    <div className="flex w-full flex-col items-end">
                        <Button
                            style="w-fit self-end"
                            color="any"
                            label="Continue"
                            type="submit"
                            loading={loading}
                        />
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default AddTagModal;
