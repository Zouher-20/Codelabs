import { planType } from "@/app/@types/plan";
import IconRenderer from "../../globals/icon";

const UserPlanCard = ({ plan, active }: { plan: planType, active?: boolean }) => {
    const { title, subtitle, price, duration } = plan
    return (
        <div className={"p-5 min-w-72 flex flex-col gap-4  rounded-3xl border-base-100 border-2 " + (active ? 'bg-base-100' : '')}>
            <div className="flex justify-between">
                <IconRenderer className={active ? 'text-white' : 'text-primary'} fontSize={33} icon="solar:link-circle-line-duotone" />
            </div>
            <div className="grid">
                <p className="text-2xl text-white">{title}</p>
                <p className="text-gray-400">{subtitle}</p>
            </div>
            <div className="grid gap-1">
                <p className={"text-4xl font-bold " + (active ? 'text-white' : 'text-primary')}>{price > 0 ? ('$' + price) : 'Free'}</p>
                <p>{duration}</p>
            </div>
        </div>
    );
}
export default UserPlanCard;