'use client';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { email, textField } from '@/app/schemas';
import { useFormik } from 'formik';
import * as yup from 'yup';

export type userInfo = {
    name?: string;
    email?: string;
    bio?: string;
    location?: string;
    position?: string;
};
const EditModal = ({ userInfo }: { userInfo: userInfo }) => {
    const validationSchema = yup.object().shape({
        name: textField,
        email: email,
        bio: textField,
        location: textField
    });
    const onSubmit = () => {
        console.log(values);
    };
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            name: userInfo.name,
            email: userInfo.email,
            bio: userInfo.bio ? userInfo.bio : '',
            location: userInfo.location ? userInfo.location : ''
        },
        validationSchema: validationSchema,
        onSubmit
    });

    return (
        <dialog id="new-lab-modal" className="modal">
            <div className="modal-box flex w-6/12 max-w-5xl flex-col gap-4 ">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Update your personal data</h3>
                </form>
                <form className="flex flex-col " onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col gap-2 py-4 md:grid md:grid-cols-2">
                        {Object.keys(userInfo).map(key => (
                            <div className="flex flex-col gap-2" key={key}>
                                <label>{key}</label>
                                <Input
                                    id={key}
                                    name={key}
                                    type="text"
                                    placeholder={key}
                                    icon={
                                        key == 'name'
                                            ? 'solar:people-nearby-bold-duotone'
                                            : key == 'email'
                                              ? 'solar:user-bold'
                                              : key == 'bio'
                                                ? 'mingcute:user-info-fill'
                                                : 'mdi:location'
                                    }
                                    value={values[key as keyof typeof userInfo]}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    errors={
                                        errors[key as keyof typeof userInfo] &&
                                        touched[key as keyof typeof userInfo]
                                            ? errors[key as keyof typeof userInfo]
                                            : null
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <Button style="w-fit self-end" color="any" label="Continue" type="submit" />
                </form>
            </div>
        </dialog>
    );
};

export default EditModal;
