import * as yup from 'yup';

import { TempletsTableType } from '@/app/@types/templetes';
import { getAllTemplate } from '@/app/api/(modules)/admin/template/services/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import CodeLabDatePicker from '@/app/components/globals/form/input/date-picker';
import Textarea from '@/app/components/globals/form/text-area';
import RadioOption from '@/app/components/globals/form/type-multi-select/radio-option';
import IconRenderer from '@/app/components/globals/icon';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { types } from '@/app/constants/types';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
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
    const [template, setTemplate] = useState<Array<TempletsTableType>>([]);
    const [templateId, setTemplateId] = useState<string | null>(null);

    useEffect(() => {
        getServerData();
    }, []);
    const getServerData = () => {
        getTempletes();
    };

    const getTempletes = async () => {
        try {
            const res = await getAllTemplate({ page: 1, pageSize: 100 });
            setTemplate(
                res.templates.map<TempletsTableType>(e => {
                    return {
                        createdAt: e.createdAt,
                        id: e.id ?? '',
                        image: e.imageTemplate ?? '',
                        labId: e.labId ?? '',
                        name: e.nameTemplate ?? ''
                    };
                })
            );
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    interface FormValues {
        name: string;
        description: string;
        type: string;
        option: string;
    }

    const defaultValues: FormValues = {
        name: '',
        option: types[0].label,

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
            const response2 = await fetch('/api/class-room/room-from-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    classRomId: classId,
                    type: values.type,
                    description: values.description,
                    name: values.name,
                    endAt: endDate,
                    templateId: templateId
                })
            });
            const result2 = await response2.json();
            if (result2.statusCode >= 300) {
                throw new Error(result2.data);
            }
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
                                            options={[
                                                types[0],
                                                ...template.map(e => {
                                                    return {
                                                        icon: e.image ?? '',
                                                        id: e.id ?? '',
                                                        label: e.name ?? '',
                                                        disabled: false,
                                                        name: 'type'
                                                    };
                                                })
                                            ]}
                                            onChange={e => {
                                                props.values.option = e.target.value;
                                                setTemplateId(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
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
