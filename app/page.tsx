'use client';

import PageContainer from './components/layout/page-container';
import Input from './components/globals/form/input';
import Button from './components/globals/form/button';
import Textarea from './components/globals/form/text-area';
import Schemas from './schemas';
import { useFormik } from 'formik';


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
    return <PageContainer >
        <div className='p-8 grid gap-4'>
            <div className='flex gap-4'>
                <Button onClick={HandleClick} label='basic' style='basic' />
                <Button onClick={HandleClick} label='outline' style='outline' />
                <Button onClick={HandleClick} label='fill' style='fill' />
                <Button onClick={HandleClick} label='any' style='any' />
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                <Input
                    type='password'
                    icon='solar:lock-password-unlocked-bold'
                    placeholder='password'
                    id='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.password && touched.password ? errors.password : null}
                />
                <Input
                    type='text'
                    placeholder='textField'
                    id='textField'
                    name='textField'
                    value={values.textField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.textField && touched.textField ? errors.textField : null}
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
        </div>
    </PageContainer>;
}