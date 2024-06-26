'use client';
import { blogType } from '@/app/@types/blog';
import { getSession } from '@/app/api/(modules)/auth/service/actions';
import { addBlog, editBlog, getDetailsBlog } from '@/app/api/(modules)/blog/services/action';
import Avatar from '@/app/components/globals/avatar';
import CodeLabsQuill from '@/app/components/globals/codelabs-quill';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

interface FormValues {
    content: string;
    title: string;
    photo: File | string;
}

const EditBlog = ({ params }: { params: { id: string } }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [defaultValues, setDefaultValues] = useState<FormValues>({
        photo: '',
        content: '',
        title: ''
    });

    const router = useRouter();

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required')
    });

    useEffect(() => {
        const getDetails = async () => {
            try {
                setLoading(true);
                const data = await getDetailsBlog({ blogId: params.id });
                setDefaultValues({
                    photo: data.blog.photo ?? '',
                    content: data.blog.contant ?? '',
                    title: data.blog.title ?? ''
                });
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        getDetails();
    }, [params.id]);

    const onSubmit = async (values: FormValues) => {
        try {
            if (values.photo && values.photo instanceof File) {
                const formData = new FormData();
                formData.append('file', values.photo);
                const response = await fetch('/api/admin/template/image-upload', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                await editBlog({ ...values, photo: result.data, blogId: params.id });
            } else if (values.photo) await editBlog({ ...values, photo: values.photo, blogId: params.id });
            else await editBlog({ ...values, photo: '', blogId: params.id });
            const user = await getSession();
            if (user.role == 'ADMIN') {
                router.push('/admin/blogs');
            } else router.push('/blogs');
            toast.success('blog update successfully');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <ManageState
            loading={loading}
            error={error}
            errorAndEmptyCallback={() => { }}
            empty={false}
            loadedState={
                <div className="flex flex-col gap-4 p-8">
                    <span className="flex gap-2">
                        <Link href="/blogs" className="self-center">
                            <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                        </Link>
                        <h3 className="slef-center text-4xl font-bold">Create Blog</h3>
                    </span>
                    <Formik
                        initialValues={defaultValues}
                        onSubmit={(values: FormValues) => {
                            onSubmit(values);
                        }}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {props => (
                            <Form className="flex w-full flex-col gap-4">
                                <div className="flex gap-8 lg:flex-wrap">
                                    <div className="flex flex-col gap-2">
                                        <label>Add your blogs cover</label>
                                        <Avatar
                                            imagePath={props.values.photo as string}
                                            photo={(photo: File) => (props.values.photo = photo)} />
                                    </div>
                                    <div className="flex w-full flex-col gap-2  lg:w-3/5">
                                        <span className="grid gap-2">
                                            <label>Title</label>
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
                                        </span>
                                        <span>
                                            <label>Content</label>
                                            <CodeLabsQuill
                                                onChange={e => {
                                                    props.values.content = e;
                                                }}
                                                value={props.values.content}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => props.validateForm()}
                                    style="w-fit self-end "
                                    color="any"
                                    label="Update"
                                    type="submit"
                                />
                            </Form>
                        )}
                    </Formik>
                    <CustomToaster />
                </div>
            } />
    );
};

export default EditBlog;
