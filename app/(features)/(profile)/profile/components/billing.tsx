import { planType } from "@/app/@types/plan";
import UserPlanCard from "@/app/components/cards/user-plan-card";
import { basicPlan, plusPlan, premiumPlan } from "@/app/constants/plans";
import Link from "next/link";

const Billing = ({ plan }: { plan: string }) => {
    const userPlan = (plan == 'basic') ? basicPlan : (plan == 'plus') ? plusPlan : premiumPlan
    return (
        <div className="flex max-md:flex-col gap-4">
            <div className="w-fit"><UserPlanCard plan={userPlan} /></div>
            <div className="flex flex-col gap-4  rounded-3xl border-2 justify-center p-4 border-base-100">
                <p className="text-4xl ">Upgrade your <span className="text-primary">plan</span></p>
                <p className="text-center">
                    <span style={{}}></span>
                    We offer a variety of plans to suit your specific needs and budget.<br />
                    Select the plan that best aligns with your lifestyle and financial requirements.
                </p>
                <Link href={'/plans'} className="btn btn-primary self-end" >See Our Plans</Link>
            </div>
        </div>
    );
}
export default Billing;