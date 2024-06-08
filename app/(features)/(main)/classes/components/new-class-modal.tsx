import * as yup from 'yup';

import { addClassRoom } from '@/app/api/(modules)/class-room/services/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import Textarea from '@/app/components/globals/form/text-area';
import IconRenderer from '@/app/components/globals/icon';
import newClass from '@/public/images/classes/new-class.svg';
import { useFormik } from 'formik';
import { useState } from 'react';

const NewClassModal = ({ onClassAddedCallback }: { onClassAddedCallback: () => void }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await addClassRoom({
                name: values.name,
                description: values.description,
                type: values.tag
            });
            onClassAddedCallback();
            (document.getElementById('new-class-modal') as HTMLDialogElement).close();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            name: '',
            tag: '',
            description: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Required'),
            tag: yup.string().required('Required'),
            description: yup.string().required('Required')
        }),
        onSubmit
    });

    return (
        <dialog id="new-class-modal" className="modal">
            <div className="modal-box flex max-w-5xl flex-col gap-4 ">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Create Class</h3>
                </form>
                <div className="flex w-full max-lg:flex-col">
                    <img src={newClass.src} className="m-auto flex-1 p-10" />

                    <form
                        className="flex w-full flex-1 flex-col items-center"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex w-3/4 flex-col max-lg:w-1/2 max-sm:w-3/4 lg:py-12">
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="class name"
                                icon="solar:user-bold"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errors={errors.name && touched.name ? errors.name : null}
                            />
                            <Input
                                id="tag"
                                name="tag"
                                type="text"
                                placeholder="tag"
                                icon="solar:bookmark-circle-broken"
                                value={values.tag}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errors={errors.tag && touched.tag ? errors.tag : null}
                            />
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="description"
                                style="h-full"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                errors={
                                    errors.description && touched.description
                                        ? errors.description
                                        : null
                                }
                            />
                            {error != null ? <p className="text-red-500">{error}</p> : null}
                        </div>
                        <Button
                            loading={loading}
                            style="w-fit self-end"
                            color="any"
                            label="Continue"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default NewClassModal;
