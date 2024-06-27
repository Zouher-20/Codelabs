import * as yup from 'yup';

import { classType } from '@/app/@types/class';
import { getClassCreateByMe } from '@/app/api/(modules)/class-room/services/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import CodeLabDatePicker from '@/app/components/globals/form/input/date-picker';
import Textarea from '@/app/components/globals/form/text-area';
import RadioOption from '@/app/components/globals/form/type-multi-select/radio-option';
import IconRenderer from '@/app/components/globals/icon';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CloneToClassModal = ({
    callbackFunction
}: {
    callbackFunction: (value: {
        name: string;
        description: string;
        type: string;
        endAt: Date;
        classId: string;
    }) => Promise<void>;
}) => {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [endDate, setEndDate] = useState(new Date());
    const [createdClass, setCreatedClass] = useState<Array<classType>>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

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
    useEffect(() => {
        getCreatedClass();
    }, []);
    const getCreatedClass = async () => {
        try {
            const res = await getClassCreateByMe({ page: 1, pageSize: 10 });
            setCreatedClass(
                res.classes.map<classType>(e => {
                    return {
                        id: e.id,
                        title: e.name,
                        description: e.description,
                        type: e.type
                    };
                })
            );
            setSelectedClass(res.classes[0].id);
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    const validationSchema = yup.object().shape({
        name: yup.string().required('Required'),
        type: yup.string().required('Required'),
        description: yup.string().required('Required')
    });

    const onSubmit = async (values: FormValues) => {
        setButtonLoading(true);
        try {
            await callbackFunction({
                type: values.type,
                description: values.description,
                name: values.name,
                endAt: endDate,
                classId: selectedClass ?? ''
            });
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setButtonLoading(false);
        }
    };
    return (
        <dialog id="clone-lab-to-class" className="modal">
            <div className="modal-box flex w-8/12 max-w-5xl flex-col gap-4 max-md:w-11/12">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Clone lab to class</h3>
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
                            <div className="flex gap-2 max-md:flex-wrap">
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
                                <div className="divider divider-horizontal max-md:hidden"></div>
                                <div className="w-full md:py-12">
                                    <div className="h-64 overflow-y-auto">
                                        <RadioOption
                                            options={createdClass.map(e => {
                                                return {
                                                    id: e.id ?? '',
                                                    icon: '',
                                                    label: e.title ?? '',
                                                    disabled: false,
                                                    name: 'type'
                                                };
                                            })}
                                            onChange={(e: any) => {
                                                setSelectedClass(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    style="w-fit self-end"
                                    color="any"
                                    label="Continue"
                                    type="submit"
                                    loading={buttonLoading}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <CustomToaster />
        </dialog>
    );
};

export default CloneToClassModal;
