'use client';
import { planType } from '@/app/@types/plan';
import PlanCard from '@/app/components/cards/plan-card';
import { basicPlan, plusPlan, premiumPlan } from '@/app/constants/plans';
import { useState } from 'react';
import UpdatePlan from './update-plan-modal';

const Plans = () => {
    const [currentPlan, setCurrentPlan] = useState<planType>(basicPlan);
    const [type, setType] = useState<number>(1);
    const [basic, setBasic] = useState<planType>(basicPlan);
    const [plus, setPlus] = useState<planType>(plusPlan);
    const [premium, setPremium] = useState<planType>(premiumPlan);

    const clickHandler = (plan: planType, type: number) => {
        setCurrentPlan(plan);
        setType(type);

        if (document) {
            (document.getElementById('update-plan-modal') as HTMLFormElement)?.showModal();
        }
    };
    const handleChange = (val: planType) => {
        if (type == 1) setBasic(val);
        else if (type == 2) setPlus(val);
        else setPremium(val);
    };
    return (
        <div className="flex flex-col gap-8 p-6">
            <h1 className="text-4xl font-bold text-white">Plans</h1>
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:flex xl:flex-row">
                <PlanCard
                    plan={basic}
                    active={true}
                    onClick={() => clickHandler(basic, 1)}
                    isAdmin={true}
                />
                <PlanCard plan={plus} onClick={() => clickHandler(plus, 2)} isAdmin={true} />
                <PlanCard plan={premium} onClick={() => clickHandler(premium, 3)} isAdmin={true} />
            </div>
            <UpdatePlan plan={currentPlan} planValues={(val: planType) => handleChange(val)} />
        </div>
    );
};

export default Plans;
