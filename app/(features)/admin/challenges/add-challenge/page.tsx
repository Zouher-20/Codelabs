"use client"
import * as yup from 'yup';

import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import Select from '@/app/components/globals/form/select/select';
import Textarea from '@/app/components/globals/form/text-area';
import RadioOption from '@/app/components/globals/form/type-multi-select/radio-option';
import IconRenderer from '@/app/components/globals/icon';
import { tagOptions } from '@/app/constants/tag-options';
import { types } from '@/app/constants/types';
import { Field, Form, Formik } from 'formik';

const AddChallenge = () => {
    interface FormValues {
        name: string;
        difficulty: string;
        duration: string,
        tags: string
        description: string;
        resourses: string,
    }

    const defaultValues: FormValues = {
        name: '',
        difficulty: '',
        duration: '',
        tags: '',
        resourses: '',
        description: '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Required'),
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        difficulty: yup.string().required('Required'),
        duration: yup.string().required('Required'),
        tags: yup.string().required('Required')
    });

    const onSubmit = (values: FormValues) => {
        console.log(values);
    };

    return (
        <div className="p-6 flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-white">Create Challenge</h1>
            <div className="flex flex-col xl:flex-row gap-4">
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
                                <div className="flex w-full gap-2 flex-col ">
                                    <label>Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="name"
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
                                    <label>Difficulty</label>
                                    <Input
                                        id="difficulty"
                                        name="difficulty"
                                        type="text"
                                        placeholder="difficulty"
                                        icon="solar:bonfire-line-duotone"
                                        value={props.values.difficulty}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        errors={
                                            props.errors.difficulty && props.touched.difficulty
                                                ? props.errors.difficulty
                                                : null
                                        }
                                    />
                                </div>
                                <div className="divider divider-horizontal max-md:hidden -ml-8 "></div>
                                <div className='flex gap-2 w-full flex-col pl-24'>
                                    <label>Duration</label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        type="text"
                                        placeholder="duration"
                                        icon="solar:clock-square-bold-duotone"
                                        value={props.values.duration}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        errors={
                                            props.errors.duration && props.touched.duration
                                                ? props.errors.duration
                                                : null
                                        }
                                    />
                                    <label>Tags</label>
                                    <Input
                                        id="tags"
                                        name="tags"
                                        type="text"
                                        placeholder="tags"
                                        icon="solar:hashtag-bold-duotone"
                                        value={props.values.tags}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        errors={
                                            props.errors.tags && props.touched.tags
                                                ? props.errors.tags
                                                : null
                                        }
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
        </div>
    );
};

export default AddChallenge;