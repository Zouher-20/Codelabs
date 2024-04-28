'use client';

import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import Select from '@/app/components/globals/form/select/select';
import IconRenderer from '@/app/components/globals/icon';
import { tagOptions } from '@/app/constants/tag-options';
import { textField } from '@/app/schemas';
import { Field, Form, Formik } from 'formik';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import * as yup from 'yup';
import AddTagModal from '../../components/tags-modal';
import './styles.css';

const AddChallenge = ({ params }: { params: { id: number } }) => {
    const QuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const [tOptions, setTOptions] = useState(tagOptions); // Assuming initialTagOptions exists

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean']
        ]
    };
    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block'
    ];
    type FormValues = {
        name: string;
        difficulty: string;
        duration: string;
        tags: string[];
        description: string;
        resources: string;
    };
    type tag = { name: string; tagType: string };

    let createChallenge: boolean = false;
    let defaultValues: FormValues;
    if (params.id) {
        //get challenge details
        createChallenge = false;
        defaultValues = {
            name: 'name',
            difficulty: 'hard',
            duration: 'duration',
            tags: ['button', 'input'],
            description:
                "It's the final week of the Notifications challenge! Last week, we gave some love to the most unloveable type of notifications: error messages. Check out the Pens from week three in our #CodePenChallenge: Error Messages collection. This week, we'll gather up all kinds of notifications into one convenient place with a Notification Center 💁‍♂️ Our starter template includes a simple social notification center that opens & closes to reveal the notifications. It's not very stylish or user-friendly — yet. That's your challenge! We'll have lots of ideas and resources to help you tackle this challenge. And, as always, the template is just a starting point. Feel free to add or remove elements, change the content, or dismiss the whole thing and start over from scratch.",
            resources:
                "It's the final week of the Notifications challenge! Last week, we gave some love to the most unloveable type of notifications: error messages. Check out the Pens from week three in our #CodePenChallenge: Error Messages collection. This week, we'll gather up all kinds of notifications into one convenient place with a Notification Center 💁‍♂️ Our starter template includes a simple social notification center that opens & closes to reveal the notifications. It's not very stylish or user-friendly — yet. That's your challenge! We'll have lots of ideas and resources to help you tackle this challenge. And, as always, the template is just a starting point. Feel free to add or remove elements, change the content, or dismiss the whole thing and start over from scratch."
        };
    } else {
        createChallenge = true;
        defaultValues = {
            name: '',
            difficulty: '',
            duration: '',
            tags: [],
            description: '',
            resources: ''
        };
    }
    const validationSchema = yup.object().shape({
        name: textField,
        difficulty: textField,
        duration: textField
    });
    const onSubmit = (values: FormValues) => {
        // if (createChallenge)add challenge
        //or Update exist challenge
    };
    const openModal = () => {
        if (document) (document.getElementById('add-tag-modal') as HTMLDialogElement).showModal();
    };
    const handleTag = (tag: tag) => {
        const newtag = { value: tag.name, label: tag.name };
        setTOptions([...tagOptions, newtag]);
    };
    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-4xl font-bold text-white">
                {createChallenge ? 'Create Challenge' : 'Update Challenge'}
            </h1>
            <Formik
                initialValues={defaultValues}
                onSubmit={(values: FormValues) => {
                    onSubmit(values);
                }}
                validationSchema={validationSchema}
            >
                {props => (
                    <Form className="flex w-3/4 flex-col gap-4 self-center md:grid md:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <label className=" capitalize">name</label>
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
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className=" capitalize">Difficulty</label>
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
                        <div className="flex flex-col gap-4">
                            <label className=" capitalize">Duration</label>
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
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className=" flex gap-4 capitalize">
                                Tags
                                <label
                                    className="btn btn-xs tooltip tooltip-right tooltip-primary rounded-md bg-base-300"
                                    data-tip="Add New Tag"
                                    onClick={openModal}
                                >
                                    <IconRenderer
                                        icon={'ic:baseline-plus'}
                                        className="text-primary "
                                        width={24}
                                        height={24}
                                    ></IconRenderer>
                                </label>
                            </label>
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
                        </div>
                        <div className="divider col-span-2 h-0"></div>
                        <div className="col-span-2">
                            <label>Description</label>
                            <QuillEditor
                                value={props.values.description}
                                onChange={(value: string) => {
                                    props.values.description = value;
                                }}
                                modules={quillModules}
                                formats={quillFormats}
                                className="mt-4"
                            />
                        </div>
                        <div className="col-span-2">
                            <label>Resources</label>
                            <QuillEditor
                                value={props.values.resources}
                                onChange={(value: string) => {
                                    props.values.resources = value;
                                }}
                                modules={quillModules}
                                formats={quillFormats}
                                className="mt-4"
                            />
                        </div>
                        <span className="col-start-2 flex justify-end">
                            <Button
                                onClick={() => props.validateForm()}
                                style="w-fit"
                                color="any"
                                label="Continue"
                                type="submit"
                            />
                        </span>
                    </Form>
                )}
            </Formik>
            <AddTagModal tag={(tag: tag) => handleTag(tag)} />
        </div>
    );
};

export default AddChallenge;
