'use client';

import { planType } from '@/app/@types/plan';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useFormik } from 'formik';

const UpdateUsePlanModal = ({
    plan,
    onEditPlan
}: {
    plan: planType | null;
    onEditPlan: (val: planType | null) => void;
}) => {
    const onSubmit = () => {
        onEditPlan({
            createdAt: plan?.createdAt,
            duration: values.duration,
            features: values.features,
            id: plan?.id ?? '',
            name: values.title,
            price: values.price,
            subtitle: values.subtitle
        });
        (document.getElementById('update-user-plan-modal') as HTMLDialogElement).close();
    };
    const { values, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: plan?.name ?? '',
            subtitle: plan?.subtitle ?? '',
            duration: plan?.duration ?? '',
            price: plan?.price ?? 0,
            features: plan?.features ?? []
        },
        onSubmit
    });
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        handleChange(`features[${index}].value`)(newValue);
    };
    return (
        <dialog id="update-user-plan-modal" className="modal">
            <div className="modal-box flex w-8/12 max-w-3xl flex-col gap-4 p-8">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">{plan?.name} Plan</h3>
                </form>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex gap-12 ">
                        <span className="w-full min-w-24">Plan name</span>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="name"
                            value={values.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-12 ">
                        <span className="w-full min-w-24">Plan description</span>
                        <Input
                            id="subtitle"
                            name="subtitle"
                            type="text"
                            placeholder="description"
                            value={values.subtitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-12 ">
                        <span className="w-full min-w-24">Plan description</span>
                        <Input
                            id="duration"
                            name="duration"
                            type="number"
                            placeholder="duration in days"
                            value={values.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-6">
                        <span className="w-full min-w-24"></span>
                        <span>Unlimited</span>
                        <span className="min-w-72">Number</span>
                    </div>
                    {plan?.features.map((feature, index) => (
                        <div key={index} className="flex gap-12 ">
                            <span className="w-full min-w-24">{feature.name}</span>
                            <input
                                type="checkbox"
                                className="checkbox-primary checkbox mt-1 rounded-sm"
                                checked={
                                    values.features[index]?.value < ('0' as unknown as number)
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
                                    disabled={values.features[index]?.value < 0 ? true : false}
                                    value={
                                        values.features[index]?.value == -1 ||
                                        values.features[index]?.value == 0
                                            ? values.features[index].name
                                            : (values.features[index]?.value as unknown as string)
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

export default UpdateUsePlanModal;
