'use client';
import { planType } from '@/app/@types/plan';
import PlanCard from '@/app/components/cards/plan-card';
import Button from '@/app/components/globals/form/button';
import { useEffect, useState } from 'react';
import NewPlanModal from './components/new-plan-modal';

const Plans = () => {
    const [plans, setCurrentPlans] = useState<Array<planType>>([]);
    useEffect(() => {}, []);
    const getPlanFromServer = async () => {};
    const clickHandler = (plan: planType, type: number) => {
        if (document) {
            (document.getElementById('update-plan-modal') as HTMLFormElement)?.showModal();
        }
    };
    const addPlanModal = () => {
        if (document) {
            (document.getElementById('new-plan-modal') as HTMLFormElement)?.showModal();
        }
    };
    const onPlanAdded = (plan: planType) => {
        setCurrentPlans([...plans, plan]);
    };
    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex w-full justify-between">
                <h1 className="text-4xl font-bold text-white">Plan</h1>
                <Button label="+ New Plan" color="any" onClick={addPlanModal} />
            </div>
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:flex xl:flex-row">
                {plans.map(e => (
                    <PlanCard
                        plan={e}
                        active={true}
                        onClick={() => clickHandler(e, 1)}
                        isAdmin={true}
                    />
                ))}
            </div>
            {/* <UpdatePlan plan={currentPlan} planValues={(val: planType) => {}} /> */}
            <NewPlanModal onPlanAdded={onPlanAdded} />
        </div>
    );
};

export default Plans;
