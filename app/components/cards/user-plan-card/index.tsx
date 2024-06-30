'use client';
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
                <p className="text-xl capitalize text-white">{plan.name} Plan</p>
            </div>
            <p className="text-gray-400">{plan.subtitle}</p>
            <div className="grid gap-1">
                <p className={'text-4xl font-bold ' + (active ? 'text-white' : 'text-primary')}>
                    {plan.price > 0 ? '$' + plan.price : 'Free'}
                </p>
                <p>{plan.duration}</p>
            </div>
            <div className="flex flex-col gap-2">
                {plan.FeaturePlan.map((feature, index) =>
                    feature.value > 0 && feature.name === 'participate' ? null : (
                        <div key={index} className="flex gap-3">
                            <IconRenderer
                                className={active ? 'text-white' : 'text-primary'}
                                fontSize={28}
                                icon="solar:check-read-broken"
                            />
                            {feature.value > 0 ? (
                                feature.name === 'students in class' ||
                                feature.name === 'labs in class' ? (
                                    <p>
                                        Only {feature.value} {feature.name}
                                    </p>
                                ) : (
                                    <p>
                                        Limited {feature.value} {feature.name}
                                    </p>
                                )
                            ) : feature.name === 'participate' ? (
                                <p>Participate in challegens</p>
                            ) : feature.name === 'students in class' ||
                              feature.name === 'labs in class' ? (
                                <p>Up to 25 {feature.name}</p>
                            ) : (
                                <p>Unlimited {feature.name}</p>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
export default UserPlanCard;
