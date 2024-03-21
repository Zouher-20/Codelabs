'use client';

import PageContainer from './components/layout/page-container';
import Input from './components/globals/form/input';
import Button from './components/globals/form/button';
import Textarea from './components/globals/form/text-area';
import { textField, email, password, textarea } from './schemas';
import { useFormik } from 'formik';
import PlanCard from './components/cards/plan-card';
import UserPlanCard from './components/cards/user-plan-card';
import { basicPlan, plusPlan, premiumPlan } from './constants/plans';
import Lab from './components/globals/lab/lab';
import InteractionsLab from './components/globals/lab/interactions-lab';
import LabCard from './components/globals/lab/lab-card';
import ClassLab from './components/globals/lab/class-lab';
import SubmittedLab from './components/globals/lab/submitted-lab';
import Challenge from './components/cards/challenge';
import * as yup from 'yup'

export default function Home() {

    const HandleClick = () => {
        console.log('hi');
    };
    const onSubmit = (values: {}) => {
        console.log(values)
    }
    const Schemas = {};
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: "",
            textarea: ''
        },
        validationSchema: yup.object().shape({ textField, email, password, textarea }),
        onSubmit
    })

    return <PageContainer >
        <div className='p-8 grid gap-4'>
            <div className='flex gap-4'>
                <Button onClick={HandleClick} label='basic' style='basic' />
                <Button onClick={HandleClick} label='outline' style='outline' />
                <Button onClick={HandleClick} label='fill' style='fill' />
                <Button onClick={HandleClick} label='any' style='any' />
            </div>
            <form className='flex flex-col ' onSubmit={handleSubmit}>
                <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='email'
                    icon='solar:user-bold'
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={errors.email && touched.email ? errors.email : null}
                />
                <Textarea
                    id='textarea'
                    name='textarea'
                    placeholder='textarea'
                    value={values.textarea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.textarea && touched.textarea ? errors.textarea : null}
                />
                <button className='btn btn-sm max-w-sm  btn-primary' type="submit">Submit</button>
            </form>
            <div className='flex gap-4'>
                <PlanCard plan={basicPlan} />
                <PlanCard plan={plusPlan} active={true} />
                <PlanCard plan={premiumPlan} />
            </div>
            <UserPlanCard plan={basicPlan} />
            <div className='grid grid-cols-4 gap-2'>
                <Lab />
                <InteractionsLab react={[754, 213, 30, 84]} />
                <LabCard title='A new code Lab Sidebar' />
                <ClassLab name='Class lab name' type='Type' />
                <SubmittedLab />
            </div>
            <div>
                <Challenge
                    name='Challenge name'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, aliquam? Veritatis voluptates reprehenderit maxime neque totam quidem quibusdam, ex earum velit adipisci tenetur atque accusamus!'
                    onClick={() => 'hi'}
                />
            </div>
        </div>
    </PageContainer>;
}