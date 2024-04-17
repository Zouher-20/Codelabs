import { planType } from "@/app/@types/plan";
import IconRenderer from "../../globals/icon";

const UserPlanCard = ({ plan, active }: { plan: planType, active?: boolean }) => {
    const { title, subtitle, price, duration } = plan
    return (
        <div className={" py-4 px-6 max-w-xs flex flex-col gap-4  rounded-3xl border-base-100 border-2 " + (active ? 'bg-base-100' : '')}>
            <div className="flex justify-between ">
                <IconRenderer className={active ? 'text-white' : 'text-primary'} fontSize={33} icon="solar:link-circle-line-duotone" />
                <IconRenderer className={"self-center hover:opacity-65  " + (active ? 'text-white' : 'text-primary')} fontSize={28} icon="solar:pen-2-bold-duotone" />
            </div>
            <div className="grid">
                <p className="text-2xl text-white">{title}</p>
                <p className="text-gray-400">{subtitle}</p>
            </div>
            <div className="grid gap-1">
                <p className={"text-4xl font-bold " + (active ? 'text-white' : 'text-primary')}>{price}</p>
                <p>{duration}</p>
            </div>
        </div>
    );
}
export default UserPlanCard;