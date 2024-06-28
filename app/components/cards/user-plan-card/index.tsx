'use client'
import { planType } from '@/app/@types/plan';
import IconRenderer from '../../globals/icon';

const UserPlanCard = ({ plan, active }: { plan: planType; active?: boolean }) => {

    return (
        <div
            className={
                'flex min-w-72 flex-col gap-4 rounded-3xl  border-2 border-base-100 p-5 ' +
                (active ? 'bg-base-100' : '')
            }
        >
            <div className="flex items-center gap-3">
                <IconRenderer
                    className={active ? 'text-white' : 'text-primary'}
                    fontSize={33}
                    icon="solar:link-circle-line-duotone"
                />
                <p className="text-xl text-white capitalize">{plan.name} Plan</p>
            </div>
            <p className="text-gray-400">{plan.subtitle}</p>
            <div className="grid gap-1">
                <p className={'text-4xl font-bold ' + (active ? 'text-white' : 'text-primary')}>
                    {plan.price > 0 ? '$' + plan.price : 'Free'}
                </p>
                <p>{plan.duration}</p>
            </div>
            <div>
                {plan.FeaturePlan?.map((feature) => (
                    <div key={feature.id} className='flex gap-4 text-xl'>
                        <span>{feature.name} :</span>
                        <span>{feature.value}</span>
                    </div>

                ))}
            </div>
        </div>
    );
};
export default UserPlanCard;
