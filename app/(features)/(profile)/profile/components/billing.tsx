import UserPlanCard from '@/app/components/cards/user-plan-card';
import { basicPlan, plusPlan, premiumPlan } from '@/app/constants/plans';
import Link from 'next/link';

const Billing = ({ plan }: { plan: string }) => {
    const userPlan = plan == 'basic' ? basicPlan : plan == 'plus' ? plusPlan : premiumPlan;
    return (
        <div className="flex gap-4 max-md:flex-col">
            <div className="w-fit">
                <UserPlanCard plan={userPlan} />
            </div>
            <div className="flex flex-col justify-center  gap-4 rounded-3xl border-2 border-base-100 p-4">
                <h3 className="text-4xl">
                    Upgrade Your <span className="text-secondary">Plan</span>
                </h3>
                <span className="text-gray-400">
                    We offer a variety of plans to suit your specific needs and budget.
                    <br />
                    Select the plan that best aligns with your lifestyle and financial requirements.
                </span>
                <Link href={'/plans'} className="btn btn-secondary self-end">
                    See Our Plans
                </Link>
            </div>
        </div>
    );
};
export default Billing;
