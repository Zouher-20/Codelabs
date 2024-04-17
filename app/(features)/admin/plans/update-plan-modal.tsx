'use client'

import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useFormik } from 'formik';

const UpdatePlan = ({ plan }: { plan: string }) => {

    const items = ['labs', 'classes', 'students', 'labInClass']

    const onSubmit = () => {
        console.log('values', values);
    };
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            Unlimitedlabs: false,
            labs: '',
            Unlimitedclasses: false,
            classes: '',
            Unlimitedstudents: false,
            students: '',
            UnlimitedlabInClass: false,
            labInClass: '',

        },
        onSubmit
    });

    return (
        <dialog id="update-plan-modal" className="modal">
            <div className="modal-box flex flex-col gap-4 w-8/12 max-w-3xl p-8" >
                <form className="flex gap-2" method="dialog">
                    <button ><IconRenderer fontSize={24} icon="solar:arrow-left-linear" /></button>
                    <h3 className="font-bold text-2xl slef-center">{plan} Plan</h3>
                </form>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex gap-10'>
                        <span className='w-full min-w-24'></span>
                        <span>Unlimited</span>
                        <span className='min-w-52'>Number</span>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className='flex gap-12 '>
                            <span className='w-full min-w-24'>{item == 'labInClass' ? 'lab in class' : item}</span>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary rounded-sm mt-1"
                                onChange={(val) => {
                                    (values as unknown as { [key: string]: boolean })[`Unlimited${item}`] = val.target.checked
                                }}
                            />
                            <Input
                                id={item}
                                name={item}
                                type='text'
                                placeholder={item}
                                value={(values as unknown as { [key: string]: string })[item]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type='submit' className='btn btn-primary self-end'>Update</button>
                </form>
            </div>
        </dialog >
    );
}

export default UpdatePlan;