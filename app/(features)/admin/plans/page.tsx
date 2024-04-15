"use client"
import PlanCard from "@/app/components/cards/plan-card";
import { basicPlan, plusPlan, premiumPlan } from "@/app/constants/plans";
import UpdatePlan from "./update-plan-modal";
import { useState } from "react";

const Plans = () => {

    const [currentPlan, setCurrentPlan] = useState('');
    const clickHandler = (plan: string) => {
        setCurrentPlan(plan);
        if (document) {
            (document.getElementById('update-plan-modal') as HTMLFormElement)?.showModal();
        }
    }

    return <div className="p-6 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-white">Plans</h1>
        <div className="flex flex-col sm:grid-cols-2 sm:grid xl:flex xl:flex-row gap-4">
            <PlanCard plan={basicPlan} active={true} onClick={() => clickHandler('Basic')} />
            <PlanCard plan={plusPlan} onClick={() => clickHandler('Plus')} />
            <PlanCard plan={premiumPlan} onClick={() => clickHandler('Premium')} />
        </div>
        <UpdatePlan plan={currentPlan} />
    </div>
}

export default Plans;