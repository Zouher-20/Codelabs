import PlanCard from "@/app/components/cards/plan-card";
import { basicPlan, plusPlan, premiumPlan } from "@/app/constants/plans";

const Plans = () => {
    //get user plan 
    let plan = 'plus';

    return <div className="p-6 flex flex-col gap-4">
        <h1 className=" text-4xl font-bold text-white">Plan</h1>
        <div className="flex flex-col xl:flex xl:flex-row sm:grid sm:grid-cols-2 gap-4 max-xl:justify-center pt-4">
            <PlanCard plan={basicPlan} active={plan == "basic" ? true : false} />
            <PlanCard plan={plusPlan} active={plan == "plus" ? true : false} />
            <PlanCard plan={premiumPlan} active={plan == "premuim" ? true : false} />
        </div>
    </div>
}

export default Plans;