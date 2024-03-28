import * as yup from 'yup'

import Input from "../globals/form/input";
import Button from "../globals/form/button";
import Textarea from "../globals/form/text-area";
import IconRenderer from "../globals/icon";
import RadioOption from '../globals/form/type-multi-select/radio-option';
import Select from '../globals/form/select/select';
import { Field, Form, Formik, FormikHelpers, useFormik } from "formik";
import { types } from "@/app/constants/types";
import { tagOptions } from '@/app/constants/tag-options';

const NewLabModal = () => {

    interface FormValues {
        name: string,
        option: string,
        description: string,
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
        description: yup.string().required('Required'),
    });

    const onSubmit = (values: FormValues) => {
        (document.getElementById('new-lab-modal') as HTMLDialogElement).close()
        console.log(values);
    };

    return (
        <dialog id="new-lab-modal" className="modal">
            <div className="modal-box flex flex-col gap-4 w-8/12 max-w-5xl ">
                <form className="flex gap-2" method="dialog">
                    <button ><IconRenderer fontSize={24} icon="solar:arrow-left-linear" /></button>
                    <h3 className="font-bold text-2xl slef-center">Create lab</h3>
                </form>
                <Formik
                    initialValues={defaultValues}
                    onSubmit={(values: FormValues) => { onSubmit(values) }}
                    validationSchema={validationSchema}
                >
                    {props => (
                        <Form className='flex flex-col w-full gap-4' >
                            <div className="flex gap-2">
                                <div className="flex flex-col w-full py-12">
                                    <Input
                                        id='name'
                                        name='name'
                                        type='text'
                                        placeholder='lab name'
                                        icon='solar:user-bold'
                                        value={props.values.name}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        errors={props.errors.name && props.touched.name ? props.errors.name : null}
                                    />
                                    <Field
                                        className="mb-4"
                                        name="tags"
                                        options={tagOptions}
                                        component={Select}
                                        placeholder="Select multi tags..."
                                        isMulti={true}
                                        validate={(value: Array<any>) => (value.length == 0) ? 'Required' : undefined}
                                        errors={props.errors.tags && props.touched.tags ? props.errors.tags : null}
                                    />
                                    <Textarea
                                        id='description'
                                        name='description'
                                        placeholder='description'
                                        style='h-full'
                                        value={props.values.description}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        errors={props.errors.description && props.touched.description ? props.errors.description : null}
                                    />
                                </div>
                                <div className="divider-horizontal divider"></div>
                                <div className="w-full py-12">
                                    <RadioOption
                                        options={types}
                                        onChange={(e) => { props.values.option = e.target.value }}
                                    />
                                </div>
                            </div>
                            <Button onClick={() => props.validateForm()} style="w-fit self-end" color="any" label="Continue" type="submit" />
                        </Form>
                    )}
                </Formik>
            </div>
        </dialog >
    );
}

export default NewLabModal;