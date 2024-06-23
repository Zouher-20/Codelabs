'use client';
import { addTemplate } from '@/app/api/(modules)/admin/template/services/action';
import Avatar from '@/app/components/globals/avatar';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as yup from 'yup';

interface FormValues {
    title: string;
    photo?: File;
}

const AddTempelet = () => {
    const defaultValues: FormValues = {
        photo: undefined,
        title: ''
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required')
    });

    const onSubmit = async (values: FormValues) => {
        if (values.photo == null) {
            toast.error('selecte templete image');
        } else {
            try {
                const formData = new FormData();
                formData.append('file', values.photo);
                const response = await fetch('/api/admin/template/image-upload', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                console.log(result.data);
                // addTemplate({ imageTemplate: result, nameTemplate: values.title });
                // toast.success('template created successfully');
            } catch (e: any) {
                toast.error(e.message);
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
                                    <div className="flex flex-col ">
                                        <label>templete image</label>
                                        <Avatar
                                            imageSize={100}
                                            photo={(photo: File) => (props.values.photo = photo)}
                                        />
                                    </div>
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
                                <Button
                                    onClick={() => props.validateForm()}
                                    style="w-fit self-end "
                                    color="any"
                                    label="Continue"
                                    type="submit"
                                />
                            </Form>
                        )}
                    </Formik>
                    <CustomToaster />
                </div>
            </div>
        </dialog>
    );
};

export default AddTempelet;
