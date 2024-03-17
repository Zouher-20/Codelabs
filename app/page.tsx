'use client';

import PageContainer from './components/layout/page-container';
import Input from './components/globals/form/input';
import Schemas from './schemas';
import { useFormik } from 'formik';

export default function Home() {

    const onSubmit = (values: {}) => {
        console.log(values)
    }
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: '',
            textField: ''
        },
        validationSchema: Schemas,
        onSubmit
    })
    return <PageContainer >
        <div className='p-8 grid gap-4'>
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
                    type='textField'
                    placeholder='textField'
                    id='textField'
                    name='textField'
                    value={values.textField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.textField && touched.textField ? errors.textField : null}
                />
                <button className='btn btn-sm max-w-sm  btn-primary' type="submit">Submit</button>
            </form>
        </div>
    </PageContainer>;
}
