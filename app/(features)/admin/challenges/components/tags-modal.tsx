import * as yup from 'yup';

import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import Textarea from '@/app/components/globals/form/text-area';
import IconRenderer from '@/app/components/globals/icon';
import { useFormik } from 'formik';

type tag = { name: string, tagType: string }

const AddTagModal = ({ tag }: { tag: (tag: tag) => void }) => {
    const validationSchema = yup.object().shape({
        name: yup.string().required('Required'),
        tagType: yup.string().required('Required')
    });

    const onSubmit = () => {
        tag(values);
        resetForm();
        (document.getElementById('add-tag-modal') as HTMLDialogElement).close();
        console.log(values);
    };

    const { values, errors, touched, resetForm, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            name: '',
            tagType: '',
        },
        validationSchema: validationSchema,
        onSubmit
    });
    return (
        <dialog id="add-tag-modal" className="modal">
            <div className="modal-box flex flex-col gap-4 w-8/12 max-w-2xl max-md:w-11/12">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Add Tag</h3>
                </form>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                    <div className='flex max-md:flex-col gap-2'>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="tag"
                            icon="solar:user-bold"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            errors={
                                errors.name && touched.name
                                    ? errors.name
                                    : null
                            }
                        />
                        <Input
                            id="tagType"
                            name="tagType"
                            type="text"
                            icon="solar:bookmark-circle-broken"
                            placeholder="tag type"
                            value={values.tagType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={
                                errors.tagType && touched.tagType
                                    ? errors.tagType
                                    : null
                            }
                        />
                    </div>
                    <Button style="w-fit self-end" color="any" label="Continue" type="submit" />
                </form>
            </div>
        </dialog>
    );
};

export default AddTagModal;
