'use client';
import { MyOptionType } from '@/app/@types/select';
import { tag } from '@/app/@types/tag';
import { getTag } from '@/app/api/(modules)/admin/service/action';
import CodeLabsQuill from '@/app/components/globals/codelabs-quill';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import Select from '@/app/components/globals/form/select/select';
import IconRenderer from '@/app/components/globals/icon';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { textField } from '@/app/schemas';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import * as yup from 'yup';
import AddTagModal from '../../components/tags-modal';
import './styles.css';

const AddChallenge = ({ params }: { params: { id: number } }) => {
    const [tOptions, setTOptions] = useState<Array<MyOptionType>>([]); // Assuming initialTagOptions exists
    useEffect(() => {
        getTags();
    }, []);
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
    type FormValues = {
        name: string;
        difficulty: string;
        duration: string;
        tags: string[];
        description: string;
        resources: string;
    };

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
        const newtag: MyOptionType = { value: tag.id, label: tag.tagename };
        setTOptions([...tOptions, newtag]);
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
                            <CodeLabsQuill
                                onChange={e => {
                                    props.values.description = e;
                                }}
                                value={props.values.description}
                            />
                        </div>
                        <div className="col-span-2">
                            <label>Resources</label>
                            <CodeLabsQuill
                                onChange={(value: string) => {
                                    props.values.resources = value;
                                }}
                                value={props.values.resources}
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
            <AddTagModal newTagCallbackFunction={(tag: tag) => handleTag(tag)} />
            <CustomToaster />
        </div>
    );
};

export default AddChallenge;
