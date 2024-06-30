'use client';
import { TempletsTableType } from '@/app/@types/templetes';
import Avatar from '@/app/components/globals/avatar';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

interface FormValues {
    title: string;
    photo?: File;
}

const AddTempelet = ({ callback }: { callback: (template: TempletsTableType) => void }) => {
    const defaultValues: FormValues = {
        photo: undefined,
        title: ''
    };
    const [loading, setLoading] = useState<boolean>(false);
    const validationSchema = yup.object().shape({
        title: yup.string().required('Required')
    });

    const onSubmit = async (values: FormValues) => {
        if (values.photo == null) {
            toast.error('selecte templete image');
        } else {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('file', values.photo);
                const response = await fetch('/api/admin/template/image-upload', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                const response2 = await fetch('/api/admin/template/add-template', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        imageTemplate: result.data,
                        nameTemplate: values.title
                    })
                });
                const result2 = await response2.json();
                if (result2.statusCode >= 300) {
                    throw new Error(result2.data);
                }
                (document.getElementById('add-templete-modal') as HTMLDialogElement).close();

                callback({
                    image: result2.data.imageTemplate,
                    name: result2.data.nameTemplate,
                    labId: result2.data.labId
                });
            } catch (e: any) {
                toast.error(e.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <dialog id="add-templete-modal" className="modal">
            <div className="modal-box flex w-1/2 max-w-5xl flex-col gap-4 max-md:w-3/4 ">
                <div className="flex flex-col gap-4 p-8">
                    <span className="flex gap-2">
                        <h3 className="slef-center text-4xl font-bold">Create Tempelete</h3>
                    </span>
                    <Formik
                        initialValues={defaultValues}
                        onSubmit={(values: FormValues) => {
                            onSubmit(values);
                        }}
                        validationSchema={validationSchema}
                    >
                        {props => (
                            <Form className="flex w-full flex-col ">
                                <div className="flex flex-wrap items-center gap-4">
                                    <Avatar
                                        imageSize={100}
                                        photo={(photo: File) => (props.values.photo = photo)}
                                    />
                                    <div className="flex flex-col">
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="title"
                                            icon="hugeicons:subtitle"
                                            value={props.values.title}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            errors={
                                                props.errors.title && props.touched.title
                                                    ? props.errors.title
                                                    : null
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        onClick={() => props.validateForm()}
                                        style="w-fit self-end "
                                        color="any"
                                        label="Continue"
                                        loading={loading}
                                        type="submit"
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </dialog>
    );
};

export default AddTempelet;
