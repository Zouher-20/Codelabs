import { Formik, FormikHelpers, Form, Field } from 'formik';
import Select from './select'
import Button from '../button';
import { tagOptions } from '@/app/constants/tag-options';

export interface FormValues {
    tags: string[];
}

const defaultValues: FormValues = {
    tags: []
};

function validation(value: Array<any>) {
    let error;
    if (value.length == 0) {
        error = 'Required';
    }
    return error;
};

const MultiSelectForm = () => {

    return (
        <Formik
            initialValues={defaultValues}
            onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
            }}
        >
            {props => (
                <Form className='flex flex-col gap-2'>
                    <Field
                        name="tags"
                        options={tagOptions}
                        component={Select}
                        placeholder="Select multi tags..."
                        isMulti={true}
                        validate={(value: Array<any>) => (value.length == 0) ? 'Required' : undefined}
                        errors={props.errors.tags && props.touched.tags ? props.errors.tags : null}
                    />
                    <Button onClick={() => props.validateForm()} style="w-fit" color="any" label="Continue" type="submit" />
                </Form>
            )}
        </Formik>
    );
};
export default MultiSelectForm;