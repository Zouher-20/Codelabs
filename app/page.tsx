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
import RadioOption from './components/globals/form/type-multi-select/radio-option';
import { basicPlan, plusPlan, premiumPlan } from './constants/plans';
import { email, password, textField, textarea } from './schemas';
import { types } from './constants/types';
import MultiSelectForm from './components/globals/form/select/useSelect';
import SelectField from './components/globals/form/select/select';

export default function Home() {

    const HandleClick = () => {
        console.log('hi');
    };
    const onSubmit = () => {
        console.log(values);
    };
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: '',
            textarea: '',
            tag: [{ label: '', value: '' }]
        },
        validationSchema: yup.object().shape({ textField, email, password, textarea }),
        onSubmit
    });

    return (
        <PageContainer>
            <div className="grid gap-4 p-8">
                <div className="flex gap-4">
                    <Button onClick={HandleClick} label="basic" color="basic" />
                    <Button onClick={HandleClick} label="outline" color="outline" />
                    <Button onClick={HandleClick} label="fill" color="fill" />
                    <Button onClick={HandleClick} label="any" color="any" />
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
                <MultiSelectForm />

                <div className='w-1/3'>
                    <RadioOption options={types} onChange={(e) => { console.log('value is:' + e.target.value) }} />
                </div>

            </div>
        </PageContainer>
    );
}
