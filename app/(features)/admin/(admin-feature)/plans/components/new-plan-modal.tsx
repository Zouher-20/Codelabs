'use client';

import { planType } from '@/app/@types/plan';
import { addPlan } from '@/app/api/(modules)/admin/plan/service/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { NAMEPLAN } from '@prisma/client';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NewPlanModal = ({ onPlanAdded }: { onPlanAdded: (plan: planType) => void }) => {
    const [loading, setLoading] = useState(false);
    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await addPlan({
                featurePlans: values.features.map(e => {
                    return { name: e.name, value: Number(e.value) };
                }),
                name: values.title,
                subtitle: values.subtitle,
                price: Number(values.price),
                duration: (values.duration ?? 0).toString()
            });
            onPlanAdded({
                createdAt: res.createdAt,
                duration: res.duration,
                features: values.features.map(e => {
                    return { name: e.name, value: Number(e.value) };
                }),
                id: res.id,
                name: res.name ?? '',
                price: res.price,
                subtitle: res.subtitle
            });
            (document.getElementById('new-plan-modal') as HTMLDialogElement).close();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const { values, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
            subtitle: '',
            duration: '',
            price: 0,
            features: Object.values(NAMEPLAN).map<{ name: NAMEPLAN; value: number }>(e => {
                return {
                    name: e,
                    value: 0
                };
            })
        },
        onSubmit
    });

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        handleChange(`features[${index}].value`)(newValue);
    };
    return (
        <dialog id="new-plan-modal" className="modal">
            <div className="modal-box flex w-8/12 max-w-3xl flex-col gap-4 p-8 ">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Add Plan</h3>
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
                        <span className="w-full min-w-24">duration</span>
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
                    {values.features.map((feature, index) => (
                        <div key={index} className="flex gap-12 ">
                            <span className="w-full min-w-24">
                                {feature.name == NAMEPLAN.labsInClass
                                    ? 'lab in class'
                                    : feature.name == NAMEPLAN.studentsInClass
                                      ? 'student in class'
                                      : feature.name}
                            </span>
                            <input
                                type="checkbox"
                                className="checkbox-primary checkbox mt-1 rounded-sm"
                                checked={values.features[index].value < ('0' as unknown as number)}
                                onChange={event => {
                                    event.target.checked
                                        ? handleChange(`features[${index}].value`)('-1')
                                        : handleChange(`features[${index}].value`)('0');
                                }}
                            />
                            {feature.name != NAMEPLAN.challenge ? (
                                <Input
                                    id={feature.name}
                                    name={feature.name}
                                    type="number"
                                    placeholder={
                                        feature.name == NAMEPLAN.labsInClass
                                            ? 'lab in class'
                                            : feature.name == NAMEPLAN.studentsInClass
                                              ? 'student in class'
                                              : feature.name
                                    }
                                    disabled={values.features[index].value < 0}
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
                    <div className="flex w-full justify-end">
                        <Button
                            label="Submit"
                            color="any"
                            type="submit"
                            loading={loading}
                            style="w-32"
                        />
                    </div>
                </form>
            </div>
            <CustomToaster />
        </dialog>
    );
};

export default NewPlanModal;
