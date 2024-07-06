'use client';
import * as yup from 'yup';

import { MyOptionType } from '@/app/@types/select';
import { TempletsTableType } from '@/app/@types/templetes';
import { getTag } from '@/app/api/(modules)/admin/service/action';
import { getAllTemplate } from '@/app/api/(modules)/admin/template/services/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import Select from '@/app/components/globals/form/select/select';
import Textarea from '@/app/components/globals/form/text-area';
import RadioOption from '@/app/components/globals/form/type-multi-select/radio-option';
import IconRenderer from '@/app/components/globals/icon';
import { types } from '@/app/constants/types';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CustomToaster } from '../toast/custom-toaster';
interface FormValues {
    name: string;
    option: string;
    description: string;
    tags: string[];
}

const NewLabModal = () => {
    const [tOptions, setTOptions] = useState<Array<MyOptionType>>([]);
    const [template, setTemplate] = useState<Array<TempletsTableType>>([]);
    const [templateId, setTemplateId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        getServerData();
    }, []);
    const getServerData = () => {
        getTags();
        getTempletes();
    };
    const getTags = async () => {
        try {
            const res = await getTag({ page: 1, pageSize: 100 });
            setTOptions(
                res.tags.map<MyOptionType>(e => {
                    return {
                        value: e.id,
                        label: e.tagename
                    };
                })
            );
        } catch (error: any) {
            toast.error(error.message);
        }
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

    const defaultValues: FormValues = {
        name: '',
        option: types[0].label,
        description: '',
        tags: []
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Required'),
        description: yup.string().required('Required')
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const response2 = await fetch('/api/user-project/lab-from-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tagId: values.tags,
                    description: values.description,
                    name: values.name,
                    templateId: templateId
                })
            });
            const result2 = await response2.json();
            if (result2.statusCode >= 300) {
                throw new Error(result2.data);
            }
            toast.success('lab created successfully');
            router.push('/lab' + '/' + result2.data.labId);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <dialog id="new-lab-modal" className="modal">
            <div className="modal-box flex w-8/12 max-w-5xl flex-col gap-4 max-md:w-11/12">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Create lab</h3>
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
                                        placeholder="lab name"
                                        icon="solar:subtitles-bold"
                                        value={props.values.name}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        errors={
                                            props.errors.name && props.touched.name
                                                ? props.errors.name
                                                : null
                                        }
                                    />
                                    <Field
                                        className="mb-4"
                                        name="tags"
                                        options={tOptions}
                                        component={Select}
                                        placeholder="Select multi tags..."
                                        isMulti={true}
                                        validate={(value: Array<any>) =>
                                            value.length == 0 ? 'Required' : undefined
                                        }
                                        errors={
                                            props.errors.tags && props.touched.tags
                                                ? props.errors.tags
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
            <CustomToaster />
        </dialog>
    );
};

export default NewLabModal;
