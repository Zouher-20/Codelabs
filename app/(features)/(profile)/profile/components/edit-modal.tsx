'use client';
import { completeMyInfo } from '@/app/api/(modules)/auth/service/actions';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { textField } from '@/app/schemas';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as yup from 'yup';

export type userInfo = {
    bio?: string;
    position?: string;
};
const EditModal = ({ userInfo, isUpdate }: { userInfo: userInfo, isUpdate: Function }) => {
    const validationSchema = yup.object().shape({
        bio: textField,
        position: textField
    });
    const onSubmit = async (values: userInfo) => {
        try {
            await completeMyInfo({ bio: values.bio, position: values.position });
            isUpdate(true);
            (document.getElementById('new-lab-modal') as HTMLDialogElement).close();
            toast.success('Update Your profile successfully')
        } catch (err: any) {
            toast.error(err);
        }
    };
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            bio: userInfo.bio ? userInfo.bio : '',
            position: userInfo.position ? userInfo.position : ''
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
                                        key == 'bio'
                                            ? 'mingcute:user-info-fill'
                                            : 'mdi:position'
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
