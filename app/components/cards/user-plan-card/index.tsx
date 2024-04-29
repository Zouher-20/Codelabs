import { planType } from '@/app/@types/plan';
import IconRenderer from '../../globals/icon';

const UserPlanCard = ({ plan, active }: { plan: planType; active?: boolean }) => {
    const { title, subtitle, price, duration } = plan;
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
                <div className="text-xl">Current Plan</div>
            </div>
            <div className="grid">
                <p className="text-2xl text-white">{title}</p>
                <p className="text-gray-400">{subtitle}</p>
            </div>
            <div className="grid gap-1">
                <p className={'text-4xl font-bold ' + (active ? 'text-white' : 'text-primary')}>
                    {price > 0 ? '$' + price : 'Free'}
                </p>
                <p>{duration}</p>
            </div>
        </div>
    );
};
export default UserPlanCard;
