import { planType } from "@/app/@types/plan";
import Button from "../../globals/form/button";
import IconRenderer from "../../globals/icon";

const PlanCard = ({ plan, active }: { plan: planType, active?: boolean }) => {
    const { title, subtitle, price, duration, advantages } = plan
    return (
        <div className={"p-5 flex flex-col gap-4  rounded-3xl border-base-100 border-2 " + (active ? 'bg-base-100' : '')}>
            <div className="flex justify-between">
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
            <Button label="start now" style={active ? 'basic' : 'outline'} />
            <div className="flex flex-col gap-3">
                {advantages && Advantages(advantages, active)}
            </div>
        </div>
    );
}
export default PlanCard;

function Advantages(advantages: Array<string>, active?: boolean) {
    return advantages.map((advantage: string, index: number) => (
        <div key={index} className="flex gap-3">
            <IconRenderer className={active ? 'text-white' : 'text-primary'} fontSize={28} icon="solar:check-read-broken" />
            <p>{advantage}</p>
        </div>
    ))
}