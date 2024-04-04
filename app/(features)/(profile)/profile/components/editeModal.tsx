'use client'
import * as yup from 'yup'
import { useFormik } from "formik";
import IconRenderer from '@/app/components/globals/icon';
import Input from '@/app/components/globals/form/input';
import { email, textField } from '@/app/schemas';
import Button from '@/app/components/globals/form/button';

type userInfo = {
    name: string, email: string, bio?: string, location?: string
}
const EditModal = ({ userInfo }: { userInfo: userInfo }) => {

    const validationSchema = yup.object().shape({
        name: textField,
        email: email,
        bio: textField,
        location: textField,
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
            <div className="modal-box flex flex-col gap-4 w-6/12 max-w-5xl ">
                <form className="flex gap-2" method="dialog">
                    <button ><IconRenderer fontSize={24} icon="solar:arrow-left-linear" /></button>
                    <h3 className="font-bold text-2xl slef-center">Update your personal data</h3>
                </form>
                <form className='flex flex-col ' onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full py-4 md:grid md:grid-cols-2 gap-2">
                        {Object.keys(userInfo).map((key) => (
                            <div className='flex flex-col gap-2' key={key}>
                                <label>{key}</label>
                                <Input
                                    id={key}
                                    name={key}
                                    type='text'
                                    placeholder={key}
                                    icon={key == 'name' ? 'solar:people-nearby-bold-duotone'
                                        : key == 'email' ? 'solar:user-bold'
                                            : key == 'bio' ? 'mingcute:user-info-fill' : 'mdi:location'}
                                    value={values[key as keyof typeof userInfo]}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    errors={errors[key as keyof typeof userInfo] && touched[key as keyof typeof userInfo] ? errors[key as keyof typeof userInfo] : null}
                                />
                            </div>
                        ))}
                    </div>
                    <Button style="w-fit self-end" color="any" label="Continue" type="submit" />
                </form>
            </div>
        </dialog >
    );
}

export default EditModal;