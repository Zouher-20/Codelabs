import * as yup from 'yup';

import { addRomInClass } from '@/app/api/(modules)/class-room/services/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import CodeLabDatePicker from '@/app/components/globals/form/input/date-picker';
import Textarea from '@/app/components/globals/form/text-area';
import IconRenderer from '@/app/components/globals/icon';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddRoomInClassModal = ({
    classId,
    callbackFunction
}: {
    classId: string;
    callbackFunction: Function;
}) => {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [endDate, setEndDate] = useState(new Date());

    interface FormValues {
        name: string;
        description: string;
        type: string;
    }

    const defaultValues: FormValues = {
        name: '',
        description: '',
        type: ''
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Required'),
        type: yup.string().required('Required'),
        description: yup.string().required('Required')
    });

    const onSubmit = async (values: FormValues) => {
        setButtonLoading(true);
        try {
            await addRomInClass({
                classRomId: classId,
                type: values.type,
                description: values.description,
                name: values.name,
                endAt: endDate
            });
            callbackFunction();
            (document.getElementById('add-room-in-class') as HTMLDialogElement).close();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setButtonLoading(false);
        }
    };
    return (
        <dialog id="add-room-in-class" className="modal">
            <div className="modal-box flex w-8/12 max-w-5xl flex-col gap-4 max-md:w-11/12">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Create Room</h3>
                </form>
                <Formik
                    initialValues={defaultValues}
                    onSubmit={(values: FormValues) => {
                        onSubmit(values);
                    }}
                    validationSchema={validationSchema}
                >
                    {props => (
                        <Form className="flex w-full flex-col gap-4">
                            <div className="flex w-full flex-col md:py-12">
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="room name"
                                    icon="solar:user-bold"
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
                                    id="type"
                                    name="type"
                                    type="text"
                                    placeholder="type"
                                    icon="solar:bookmark-circle-broken"
                                    value={props.values.type}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    errors={
                                        props.errors.type && props.touched.type
                                            ? props.errors.type
                                            : null
                                    }
                                />
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="description"
                                    style="h-full"
                                    value={props.values.description}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    errors={
                                        props.errors.description && props.touched.description
                                            ? props.errors.description
                                            : null
                                    }
                                />
                                <CodeLabDatePicker
                                    icon="solar:sort-by-time-bold-duotone"
                                    date={endDate}
                                    onChange={e => setEndDate(e)}
                                />
                            </div>
                            <Button
                                style="w-fit self-end"
                                color="any"
                                label="Continue"
                                type="submit"
                                loading={buttonLoading}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <CustomToaster />
        </dialog>
    );
};

export default AddRoomInClassModal;
