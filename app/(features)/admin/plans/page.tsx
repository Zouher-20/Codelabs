"use client"
import PlanCard from "@/app/components/cards/plan-card";
import { basicPlan, plusPlan, premiumPlan } from "@/app/constants/plans";
import UpdatePlan from "./update-plan-modal";
import { useState } from "react";
import { planType } from "@/app/@types/plan";

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
    }
    const handleChange = (val: planType) => {
        if (type == 1) setBasic(val)
        else if (type == 2) setPlus(val)
        else setPremium(val);
        console.log(val);
    }
    return <div className="p-6 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-white">Plans</h1>
        <div className="flex flex-col sm:grid-cols-2 sm:grid xl:flex xl:flex-row gap-4">
            <PlanCard plan={basic} active={true} onClick={() => clickHandler(basic, 1)} />
            <PlanCard plan={plus} onClick={() => clickHandler(plus, 2)} />
            <PlanCard plan={premium} onClick={() => clickHandler(premium, 3)} />
        </div>
        <UpdatePlan plan={currentPlan} planValues={(val: planType) => handleChange(val)} />
    </div>
}

export default Plans;