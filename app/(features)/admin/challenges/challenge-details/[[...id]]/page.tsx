'use client';

import { MyOptionType } from '@/app/@types/select';
import { tag } from '@/app/@types/tag';
import { getChallenge, getTag } from '@/app/api/(modules)/admin/service/action';
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
import * as yup from 'yup';
import AddTagModal from '../../components/tags-modal';
import './styles.css';
import { DIFFICULTTYPE } from '@prisma/client';
import { challengeType } from '@/app/@types/challenge';

const AddChallenge = ({ params }: { params: { id: number } }) => {

    let date = new Date();
    let createChallenge: boolean = false;
    const [tOptions, setTOptions] = useState<Array<MyOptionType>>([]); // Assuming initialTagOptions exists
    const [defaultValues, setDefaultValues] = useState<challengeType>(
        {
            id: '',
            name: '',
            isComplete: false,
            difficulty: 'Medium',
            endAt: date,
            startedAt: date,
            createdAt: date,
            description: null,
            resources: null,
            tags: []
        }
    );
    const testData = {
        id: '1',
        name: 'Challenge',
        difficulty: 'Medium',
        startedAt: date,
        endAt: date,
        createdAt: date,
        isComplete: false,
        description: null,
        resources: null
    }

    useEffect(() => {
        getTags();
        console.log('params.id', params.id);
        if (params.id) {
            getChallengesByID(params.id);
            createChallenge = false;
        } else createChallenge = true;
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

    const getChallengesByID = async (id: number) => {
        try {
            const res = await getChallenge({ page: 1, pageSize: 100 });
            // setDefaultValues(res.challenges);
        } catch (error: any) {
            toast.error(error.message);
        }
        setDefaultValues({ ...testData, tags: ['bdkawd'] });
    };

    const validationSchema = yup.object().shape({
        name: textField,
        difficulty: textField,
        duration: textField
    });

    const onSubmit = (values: challengeType) => {
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
                onSubmit={(values: challengeType) => {
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
