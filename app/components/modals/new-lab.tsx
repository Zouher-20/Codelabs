import * as yup from 'yup'

import Input from "../globals/form/input";
import Button from "../globals/form/button";
import Textarea from "../globals/form/text-area";
import IconRenderer from "../globals/icon";
import { useFormik } from "formik";
import { types } from "@/app/constants/types";
import RadioOption from '../globals/form/type-multi-select/radio-option';

const NewLabModal = () => {

    const onSubmit = () => {
        (document.getElementById('new-lab-modal') as HTMLDialogElement).close()
        console.log(values);
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            name: '',
            tag: '',
            option: types[0].label,
            description: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Required'),
            tag: yup.string().required('Required'),
            description: yup.string().required('Required'),
        }),
        onSubmit
    });

    return (
        <dialog id="new-lab-modal" className="modal">
            <div className="modal-box flex flex-col gap-4 w-8/12 max-w-5xl ">
                <form className="flex gap-2" method="dialog">
                    <button ><IconRenderer fontSize={24} icon="solar:arrow-left-linear" /></button>
                    <h3 className="font-bold text-2xl slef-center">Create lab</h3>
                </form>
                <form className='flex flex-col w-full' onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <div className="flex flex-col w-full py-12">
                            <Input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='lab name'
                                icon='solar:user-bold'
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errors={errors.name && touched.name ? errors.name : null}
                            />
                            <Input
                                id='tag'
                                name='tag'
                                type='text'
                                placeholder='tag'
                                icon='solar:bookmark-circle-broken'
                                value={values.tag}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errors={errors.tag && touched.tag ? errors.tag : null}
                            />
                            <Textarea
                                id='description'
                                name='description'
                                placeholder='description'
                                size='h-full'
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                errors={errors.description && touched.description ? errors.description : null}
                            />
                        </div>
                        <div className="divider-horizontal divider"></div>
                        <div className="w-full py-12">
                            <RadioOption
                                options={types}
                                onChange={(e) => { values.option = e.target.value }}
                            />
                        </div>
                    </div>
                    <Button style="w-fit self-end" color="any" label="Continue" type="submit" />
                </form>
            </div>
        </dialog >
    );
}

export default NewLabModal;