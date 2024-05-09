'use client';
import { MyOptionType } from '@/app/@types/select';
import { tag } from '@/app/@types/tag';
import { addChallenge, getChallenge, getTag } from '@/app/api/(modules)/admin/service/action';
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
import { challengeType } from '@/app/@types/challenge';
import CodeLabDatePicker from '@/app/components/globals/form/input/date-picker';
import { useRouter } from 'next/navigation';

const AddChallenge = ({ params }: { params: { id: number } }) => {
    const router = useRouter();
    let isUpdate: boolean = false;
    let date = new Date();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tOptions, setTOptions] = useState<Array<MyOptionType>>([]);
    const [defaultValues, setDefaultValues] = useState<challengeType>(
        {
            name: '',
            difficulty: 'Medium',
            endAt: date,
            startedAt: date,
            description: '',
            resources: '',
            tagId: []
        }
    );
    let difficultyOptions = [
        { label: 'easy', value: 'easy' },
        { label: 'difficult', value: 'difficult' },
        { label: 'Medium', value: 'Medium' }
    ]
    useEffect(() => {
        gettagId();
        console.log('params.id', params.id);
        if (params.id) {
            getChallengesByID(params.id);
            isUpdate = true;
        } else isUpdate = false;
    }, []);

    const gettagId = async () => {
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
    };

    const createChallenge = async (values: challengeType) => {
        try {
            const res = await addChallenge(values);
            return res;
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const validationSchema = yup.object().shape({
        name: textField,
    });

    const onSubmit = (values: challengeType) => {
        let res = createChallenge(values)
        if (res != undefined) router.push('/admin/challenges')
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
                {isUpdate ? 'Create Challenge' : 'Update Challenge'}
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
                            <Field
                                className="mb-4"
                                name="difficulty"
                                options={difficultyOptions}
                                component={Select}
                                placeholder="Select a difficulty..."
                                isMulti={false}
                                validate={(value: string) => {

                                    console.log(value)
                                    value ? 'Required' : undefined
                                }
                                }
                                errors={
                                    props.errors.difficulty && props.touched.difficulty
                                        ? props.errors.difficulty
                                        : null
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className=" capitalize">start At</label>
                            <CodeLabDatePicker
                                icon="solar:sort-by-time-bold-duotone"
                                date={startDate}
                                onChange={e => setStartDate(e)}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className=" capitalize">end At</label>
                            <CodeLabDatePicker
                                icon="solar:sort-by-time-bold-duotone"
                                date={endDate}
                                onChange={e => setEndDate(e)}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className=" flex gap-4 capitalize">
                                tag
                                <label
                                    className="btn btn-xs tooltip tooltip-right tooltip-primary rounded-md bg-base-300"
                                    data-tip="Add New Tag"
                                    onClick={openModal}
                                >
                                    <IconRenderer
                                        icon={'ic:baseline-plus'}
                                        className="text-primary"
                                        width={24}
                                        height={24}
                                    ></IconRenderer>
                                </label>
                            </label>
                            <Field
                                className="mb-4"
                                name="tagId"
                                options={tOptions}
                                component={Select}
                                placeholder="Select multi tagId..."
                                isMulti={true}
                                validate={(value: Array<any>) =>
                                    value.length == 0 ? 'Required' : undefined
                                }
                                errors={
                                    props.errors.tagId && props.touched.tagId
                                        ? props.errors.tagId
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
