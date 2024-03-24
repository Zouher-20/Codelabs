'use client';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Challenge from './components/cards/challenge';
import PlanCard from './components/cards/plan-card';
import UserPlanCard from './components/cards/user-plan-card';
import Button from './components/globals/form/button';
import Input from './components/globals/form/input';
import Textarea from './components/globals/form/text-area';
import ClassLab from './components/globals/lab/class-lab';
import InteractionsLab from './components/globals/lab/interactions-lab';
import Lab from './components/globals/lab/lab';
import LabCard from './components/globals/lab/lab-card';
import SubmittedLab from './components/globals/lab/submitted-lab';
import CircleChart from './components/statistics/circle';
import RadialChart from './components/statistics/radial';
import PageContainer from './components/layout/page-container';
import { basicPlan, plusPlan, premiumPlan } from './constants/plans';
import { email, password, textField, textarea } from './schemas';
import RadioButtonGroup from './components/globals/form/type-multi-select/radio-button-group';

export default function Home() {

    const types = [
        {
            label: "Vue js",
            name: "button-types",
            icon: 'logos:vue'
        },
        {
            label: "React js",
            name: "button-types",
            icon: 'logos:react'
        },
        {
            label: "Angular js",
            name: "button-types",
            icon: 'vscode-icons:file-type-angular'
        },
    ];

    const HandleClick = () => {
        console.log('hi');
    };
    const onSubmit = (values: {}) => {
        console.log(values);
    };
    const Schemas = {};
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: '',
            textarea: ''
        },
        validationSchema: yup.object().shape({ textField, email, password, textarea }),
        onSubmit
    });

    return (
        <PageContainer>
            <div className="grid gap-4 p-8">
                <div className="flex gap-4">
                    <Button onClick={HandleClick} label="basic" style="basic" />
                    <Button onClick={HandleClick} label="outline" style="outline" />
                    <Button onClick={HandleClick} label="fill" style="fill" />
                    <Button onClick={HandleClick} label="any" style="any" />
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
                <div className='flex flex-wrap gap-2'>
                    <Lab />
                    <InteractionsLab react={[754, 213, 30, 84]} />
                    <LabCard title='A new code Lab Sidebar' />
                    <ClassLab name='Class lab name' type='Type' />
                    <SubmittedLab />
                </div>
                <Challenge
                    name='Challenge name'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, aliquam? Veritatis voluptates reprehenderit maxime neque totam quidem quibusdam, ex earum velit adipisci tenetur atque accusamus!'
                    onClick={() => 'hi'}
                />
                <div className='flex gap-8'>
                    <CircleChart labels={['Apple', 'Mango']} series={[30, 80]} colors={['#282C2B', '#50FA7B']} width={300} height={300} />
                    <RadialChart labels={['']} series={[40]} colors={['#50FA7B', '#282C2B']} width={300} height={300} />
                </div>
                <div className='w-1/3'>
                    <RadioButtonGroup options={types} onChange={(e) => { console.log('value is:' + e.target.value) }} />
                </div>
            </div>
        </PageContainer>
    );
}
