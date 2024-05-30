'use client';
import * as yup from 'yup';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { addBlog } from '@/app/api/(modules)/blog/services/action';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import CodeLabsQuill from '@/app/components/globals/codelabs-quill';
import Avatar from '@/app/components/globals/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormValues {
    content: string;
    title: string;
    photo?: string;
}

const AddBlog = () => {
    const router = useRouter()
    const defaultValues: FormValues = {
        photo: undefined,
        content: '',
        title: '',
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required')
    });

    const onSubmit = async (values: FormValues) => {
        try {
            await addBlog(values)
            toast.success('blog created successfully');
            router.push('/blogs')
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-8">
            <span className="flex gap-2">
                <Link href='/blogs' className='self-center'>
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
            >
                {props => (
                    <Form className="flex w-full flex-col gap-4">
                        <div className="flex max-md:flex-wrap gap-8">
                            <div className='flex flex-col gap-2'>
                                <label >Add your blogs cover</label>
                                <Avatar photo={(photo: string) => props.values.photo = photo} />
                            </div>
                            <div className="flex flex-col w-3/5  gap-2">
                                <span className='grid gap-2'>
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
                            label="Continue"
                            type="submit"
                        />
                    </Form>
                )}
            </Formik>
            <CustomToaster />
        </div>
    );
};

export default AddBlog;