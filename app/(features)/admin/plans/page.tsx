'use client';
import { planType } from '@/app/@types/plan';
import { deletePlan, getPlan } from '@/app/api/(modules)/admin/plan/service/action';
import PlanCard from '@/app/components/cards/plan-card';
import Button from '@/app/components/globals/form/button';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DeletePlanModal from './components/delete-plan-modal';
import NewPlanModal from './components/new-plan-modal';
import UpdatePlan from './components/update-plan-modal';

const Plans = () => {
    const [plans, setCurrentPlans] = useState<Array<planType>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<planType | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        getPlanFromServer();
    }, []);
    const getPlanFromServer = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await getPlan();
            setCurrentPlans(
                res.map<planType>(e => {
                    return {
                        createdAt: e.createdAt,
                        duration: e.duration,
                        features: e.FeaturePlan.map(feature => {
                            return { name: feature.name, value: feature.value };
                        }),
                        id: e.id,
                        name: e.name,
                        price: e.price,
                        subtitle: e.subtitle,
                        title: e.name
                    };
                })
            );
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const clickHandler = (plan: planType) => {
        setSelectedPlan(plan);
        if (document) {
            (document.getElementById('update-plan-modal') as HTMLFormElement)?.showModal();
        }
    };
    const openDeletePlan = (plan: planType) => {
        setSelectedPlan(plan);
        if (document) {
            (document.getElementById('delete-plan-modal') as HTMLFormElement)?.showModal();
        }
    };
    const addPlanModal = () => {
        if (document) {
            (document.getElementById('new-plan-modal') as HTMLFormElement)?.showModal();
        }
    };
    const onPlanAdded = (plan: planType) => {
        setCurrentPlans([...plans, plan]);
        toast.success('plan create successfully');
    };
    const onDeletePlan = async (plan: planType | null) => {
        try {
            await deletePlan({ planId: plan?.id ?? '' });
            const temp = plans.filter((item: planType) => item.id !== plan?.id);
            setCurrentPlans(temp);
            toast.success('Plan Deleted Successfully');
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div className="flex flex-col justify-center gap-8 p-6">
            <div className="flex w-full justify-between">
                <h1 className="text-4xl font-bold text-white">Plan</h1>
                <Button label="+ New Plan" color="any" onClick={addPlanModal} />
            </div>
            <div className="flex w-full flex-wrap justify-center gap-4">
                <ManageState
                    error={error}
                    empty={plans.length == 0}
                    errorAndEmptyCallback={() => {}}
                    loadedState={plans.map((e, index) => (
                        <PlanCard
                            key={index}
                            plan={e}
                            active={false}
                            onDeleteClicked={() => openDeletePlan(e)}
                            onEditClicked={() => clickHandler(e)}
                            isAdmin={true}
                        />
                    ))}
                    loading={loading}
                />
            </div>
            <UpdatePlan plan={selectedPlan} planValues={(val: planType) => {}} />
            <DeletePlanModal plan={selectedPlan} onDelete={onDeletePlan} />
            <NewPlanModal onPlanAdded={onPlanAdded} />
            <CustomToaster />
        </div>
    );
};

export default Plans;
