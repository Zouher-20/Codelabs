import PlanCard from "@/app/components/cards/plan-card";
import UserPlanCard from "@/app/components/cards/user-plan-card";
import Button from "@/app/components/globals/form/button";
import { basicPlan, plusPlan, premiumPlan } from "@/app/constants/plans";

const Billing = ({ plan }: { plan: string }) => {
    return (
        <div className="flex  gap-4">
            <UserPlanCard plan={basicPlan} />
            <div className="w-1/2 self-center flex flex-col gap-4 rounded-3xl  border-4 p-4 border-primary">
                <p className="text-4xl ">Upgrade your <span className="text-primary">plan</span></p>
                <p className="text-center">
                    <span style={{}}></span>
                    We offer a variety of plans to suit your specific needs and budget.<br />
                    Select the plan that best aligns with your lifestyle and financial requirements.
                </p>
                <button className="btn btn-primary self-end" >See Our Plans</button>
            </div>
        </div>
    );
}

export default Billing;
// <div className="flex flex-col xl:flex xl:flex-row sm:grid sm:grid-cols-2 gap-4 max-xl:justify-center pt-4">
//     <PlanCard plan={basicPlan} active={plan == "basic" ? true : false} />
//     <PlanCard plan={plusPlan} active={plan == "plus" ? true : false} />
//     <PlanCard plan={premiumPlan} active={plan == "premuim" ? true : false} />
// </div>