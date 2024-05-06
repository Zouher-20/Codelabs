'use client';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Challenge from './components/cards/challenge';
import Button from './components/globals/form/button';
import Input from './components/globals/form/input';
import MultiSelectForm from './components/globals/form/select/useSelect';
import Textarea from './components/globals/form/text-area';
import RadioOption from './components/globals/form/type-multi-select/radio-option';
import ClassLab from './components/globals/lab/class-lab';
import InteractionsLab from './components/globals/lab/interactions-lab';
import Lab from './components/globals/lab/lab';
import SubmittedLab from './components/globals/lab/submitted-lab';
import PageContainer from './components/layout/page-container';
import CircleChart from './components/statistics/circle';
import RadialChart from './components/statistics/radial';
import { types } from './constants/types';
import { email, password, textField } from './schemas';

export default function Home() {
    const HandleClick = () => {};
    const onSubmit = () => {};
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: '',
            textarea: '',
            tag: [{ label: '', value: '' }]
        },
        validationSchema: yup.object().shape({ textField, email, password, textarea: textField }),
        onSubmit
    });

    return (
        <PageContainer>
            <div className="grid gap-4 p-8 ">
                <div className="flex gap-4">
                    <Button onClick={HandleClick} label="basic" color="basic" />
                    <Button onClick={HandleClick} label="outline" color="outline" />
                    <Button onClick={HandleClick} label="fill" color="fill" />
                    <Button onClick={HandleClick} label="any" color="any" />
                </div>
                <form className="flex flex-col " onSubmit={handleSubmit}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        icon="solar:user-bold"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errors={errors.email && touched.email ? errors.email : null}
                    />
                    <Textarea
                        id="textarea"
                        name="textarea"
                        placeholder="textarea"
                        value={values.textarea}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.textarea && touched.textarea ? errors.textarea : null}
                    />
                    <button className="btn btn-primary btn-sm  max-w-sm" type="submit">
                        Submit
                    </button>
                </form>
                <div className="flex flex-wrap gap-2">
                    <Lab />
                    <InteractionsLab react={[754, 213, 30, 84]} />
                    <ClassLab name="Class lab name" type="Type" />
                    <SubmittedLab />
                </div>
                <Challenge
                    name="Challenge name"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, aliquam? Veritatis voluptates reprehenderit maxime neque totam quidem quibusdam, ex earum velit adipisci tenetur atque accusamus!"
                ></Challenge>

                <div className="flex gap-8">
                    <CircleChart
                        labels={['Apple', 'Mango']}
                        series={[30, 80]}
                        colors={['#282C2B', '#50FA7B']}
                        width={300}
                        height={300}
                    />
                    <RadialChart
                        labels={['']}
                        series={[40]}
                        colors={['#50FA7B', '#282C2B']}
                        width={300}
                        height={300}
                    />
                </div>
                <MultiSelectForm />

                <div className="w-1/3">
                    <RadioOption options={types} onChange={e => {}} />
                </div>
            </div>
        </PageContainer>
    );
}
