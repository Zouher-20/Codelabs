import { planType } from '@/app/@types/plan';
import Button from '../../globals/form/button';
import IconRenderer from '../../globals/icon';

const PlanCard = ({
    plan,
    active,
    isAdmin,
    onEditClicked,
    onDeleteClicked,
    onMainButtonClicked
}: {
    plan: planType;
    active?: boolean;
    isAdmin?: boolean;
    onEditClicked?: () => void;
    onDeleteClicked?: () => void;
    onMainButtonClicked?: () => void;
}) => {
    return (
        <div
            className={
                'flex min-w-72 max-w-80 flex-col gap-4  rounded-3xl border-2 border-base-100 p-5' +
                (active ? 'bg-base-100' : '')
            }
        >
            <div className="flex justify-between">
                <IconRenderer
                    className={active ? 'text-white' : 'text-primary'}
                    fontSize={33}
                    icon="solar:link-circle-line-duotone"
                />
                <div className="flex">
                    {isAdmin ? (
                        <div className="flex">
                            <IconRenderer
                                onClick={onDeleteClicked}
                                className={'self-center text-red-500 hover:opacity-65'}
                                fontSize={28}
                                icon="solar:trash-bin-2-bold-duotone"
                            />
                            <div className="w-4"></div>
                        </div>
                    ) : null}
                    <IconRenderer
                        onClick={onEditClicked}
                        className={
                            'self-center hover:opacity-65  ' +
                            (isAdmin ? '' : 'hidden ') +
                            (active ? 'text-white' : 'text-primary')
                        }
                        fontSize={28}
                        icon="solar:pen-2-bold-duotone"
                    />
                </div>
            </div>
            <div className="grid">
                <p className="text-2xl text-white">{plan.title}</p>
                <p className="text-gray-400">{plan.subtitle}</p>
            </div>
            <div className="grid gap-1">
                <p className={'text-4xl font-bold ' + (active ? 'text-white' : 'text-primary')}>
                    {plan.price > 0 ? '$' + plan.price : 'Free'}
                </p>
                <p>{plan.duration}</p>
            </div>
            <Button
                disabled={active ? true : false}
                label={isAdmin ? 'Details' : active ? 'my plan' : 'start now'}
                color={active ? 'basic' : 'outline'}
                onClick={onMainButtonClicked}
            />
            <div className="flex flex-col gap-3">{Advantages(plan, active)}</div>
        </div>
    );
};
export default PlanCard;

function Advantages(plan: planType, active?: boolean) {
    return (
        <div className="flex flex-col gap-2">
            {plan.features.map((feature, index) =>
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
    );
}
