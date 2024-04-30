'use client';

import { planType } from '@/app/@types/plan';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useFormik } from 'formik';

const UpdatePlan = ({
    plan,
    planValues
}: {
    plan: planType;
    planValues: (val: planType) => void;
}) => {
    const onSubmit = () => {
        planValues(values);
        (document.getElementById('update-plan-modal') as HTMLDialogElement).close();
    };
    const { values, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: plan.title,
            subtitle: plan.subtitle,
            duration: plan.duration,
            price: plan.price,
            features: plan.features
        },
        onSubmit
    });
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        handleChange(`features[${index}].value`)(newValue);
    };
    return (
        <dialog id="update-plan-modal" className="modal">
            <div className="modal-box flex w-8/12 max-w-3xl flex-col gap-4 p-8">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">{plan.title} Plan</h3>
                </form>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex gap-6">
                        <span className="w-full min-w-24"></span>
                        <span>Unlimited</span>
                        <span className="min-w-72">Number</span>
                    </div>
                    {plan.features.map((feature, index) => (
                        <div key={index} className="flex gap-12 ">
                            <span className="w-full min-w-24">{feature.name}</span>
                            <input
                                type="checkbox"
                                className="checkbox-primary checkbox mt-1 rounded-sm"
                                checked={
                                    values.features[index].value < ('0' as unknown as number)
                                        ? true
                                        : false
                                }
                                onChange={event => {
                                    event.target.checked
                                        ? handleChange(`features[${index}].value`)('-1')
                                        : handleChange(`features[${index}].value`)('0');
                                }}
                            />
                            {feature.name != 'participate' ? (
                                <Input
                                    id={feature.name}
                                    name={feature.name}
                                    type="number"
                                    placeholder={feature.name}
                                    disabled={values.features[index].value < 0 ? true : false}
                                    value={
                                        values.features[index].value == -1 ||
                                        values.features[index].value == 0
                                            ? values.features[index].name
                                            : (values.features[index].value as unknown as string)
                                    }
                                    onChange={event => handleInputChange(index, event)}
                                />
                            ) : (
                                <div className="flex w-full"></div>
                            )}
                        </div>
                    ))}
                    <div className="mt-8 flex gap-12">
                        <span className="w-full min-w-24">Price</span>
                        <div className=" relative">
                            <input
                                type="checkbox"
                                className="checkbox-primary checkbox mt-1 rounded-sm"
                                checked={values.price < 0 ? true : false}
                                onChange={event => {
                                    event.target.checked
                                        ? handleChange(`price`)('-1')
                                        : handleChange(`price`)('0');
                                }}
                            />
                            <span className="absolute -left-1 -top-7 ">Free</span>
                        </div>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="price"
                            disabled={values.price < 0 ? true : false}
                            value={
                                values.price == -1 || values.price == 0
                                    ? 'price'
                                    : (values.price as unknown as string)
                            }
                            onChange={event => handleChange(`price`)(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary self-end">
                        Update
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default UpdatePlan;
