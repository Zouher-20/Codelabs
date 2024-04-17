import * as yup from 'yup';

import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import CodeLabDatePicker from '@/app/components/globals/form/input/date-picker';
import Select from '@/app/components/globals/form/select/select';
import Textarea from '@/app/components/globals/form/text-area';
import RadioOption from '@/app/components/globals/form/type-multi-select/radio-option';
import IconRenderer from '@/app/components/globals/icon';
import { tagOptions } from '@/app/constants/tag-options';
import { types } from '@/app/constants/types';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

const NewClassLabModal = () => {
    const [startDate, setStartDate] = useState(new Date());
    interface FormValues {
        name: string;
        option: string;
        description: string;
        tags: string[];
    }

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

    const onSubmit = (values: FormValues) => {
        (document.getElementById('new-class-lab-modal') as HTMLDialogElement).close();
        console.log(values);
    };

    return (
        <dialog id="new-class-lab-modal" className="modal">
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
                                    <Field
                                        className="mb-4"
                                        name="tags"
                                        options={tagOptions}
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
                                    <CodeLabDatePicker
                                        icon="solar:sort-by-time-bold-duotone"
                                        date={startDate}
                                        onChange={e => setStartDate(e)}
                                    />
                                </div>
                                <div className="divider divider-horizontal max-md:hidden"></div>
                                <div className="w-full md:py-12">
                                    <RadioOption
                                        options={types}
                                        onChange={e => {
                                            props.values.option = e.target.value;
                                        }}
                                    />
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
        </dialog>
    );
};

export default NewClassLabModal;
