'use client';

import PageContainer from './components/layout/page-container';
import Input from './components/globals/form/input';
import Button from './components/globals/form/button';
import Textarea from './components/globals/form/text-area';
import Schemas from './schemas';
import { useFormik } from 'formik';
import PlanCard from './components/plan-card';


export default function Home() {

    const HandleClick = () => {
        console.log('hi');
    };
    const onSubmit = (values: {}) => {
        console.log(values)
    }
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: '',
            textField: '',
            textarea: ''
        },
        validationSchema: Schemas,
        onSubmit
    })
    const basicPlan = {
        title: 'Basic',
        subtitle: 'Perfect plan for Starters.',
        price: 'Free',
        duration: 'For a life',
        advantages: [
            'Limited 5 labs',
            'Limited to 2 classes',
            'Only 5 students in the class',
            'Only 2 labs in the class',
            'Participate in challenges'
        ]
    }
    const plusPlan = {
        title: 'plus',
        subtitle: 'For users who want to do more.',
        price: '$5',
        duration: '/Year',
        advantages: [
            'Limited 10 labs',
            'Limited to 5 classes',
            'Only 10 students in the class',
            'Only 5 labs in the class',
            'Participate in challenges'
        ]
    }
    const premiumPlan = {
        title: 'premium',
        subtitle: 'For users who are seeking for the best',
        price: '$40',
        duration: '/Year',
        advantages: [
            'Unlimited labs',
            'Unlimited classes',
            'Up to 25 students in the class',
            'Up to 25 labs in the class',
            'Participate in challenges'
        ]
    }

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
        </div>
    </PageContainer>;
}