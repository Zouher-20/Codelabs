'use client';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { email, password, username } from '@/app/schemas';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

const NewUserModel = () => {
    interface FormValues {
        name: string;
        email: string;
        password: string;
    }

    const defaultValues: FormValues = {
        name: '',
        email: '',
        password: ''
    };

    const validationSchema = yup.object().shape({
        email: email,
        name: username,
        password: password
    });

    const onSubmit = (values: FormValues) => {
        (document.getElementById('new-user-modal') as HTMLDialogElement).close();
    };

    return (
        <dialog id="new-user-modal" className="modal">
            <div className="modal-box flex w-1/3 max-w-5xl flex-col gap-4 max-md:w-11/12">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">New User</h3>
                </form>
                <Formik
                    initialValues={defaultValues}
                    onSubmit={(values: FormValues) => {
                        onSubmit(values);
                    }}
                    validationSchema={validationSchema}
                >
                    {props => (
                        <Form className="flex w-full flex-col justify-center gap-4">
                            <div className="flex w-full flex-col items-center justify-center">
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="name"
                                    icon="solar:people-nearby-bold-duotone"
                                    value={props.values.name}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    errors={
                                        props.errors.name && props.touched.name
                                            ? props.errors.name
                                            : null
                                    }
                                />
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    icon="solar:user-bold"
                                    value={props.values.email}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    errors={
                                        props.errors.email && props.touched.email
                                            ? props.errors.email
                                            : null
                                    }
                                />
                                <Input
                                    id="password"
                                    name="password"
                                    type="text"
                                    placeholder="password"
                                    icon="solar:lock-unlocked-bold"
                                    value={props.values.password}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    errors={
                                        props.errors.password && props.touched.password
                                            ? props.errors.password
                                            : null
                                    }
                                />
                            </div>
                            <Button
                                onClick={() => props.validateForm()}
                                style="w-fit self-end"
                                color="any"
                                label="Continue"
                                type="submit"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </dialog>
    );
};

export default NewUserModel;
