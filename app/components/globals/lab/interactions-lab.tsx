import { InteractionType } from "@/app/@types/Interaction";
import IconRenderer from "../icon";
import Lab from "./lab";

const interactions = [
    { icon: 'solar:heart-angle-bold', style: 'text-error' },
    { icon: 'solar:share-circle-bold-duotone', style: 'text-secondary' },
    { icon: 'solar:eye-bold-duotone', style: 'text-warning' },
    { icon: 'solar:chat-line-bold', style: 'text-info' }
]

const InteractionsLab = ({ react }: { react: Array<number> }) => {
    return (
        <Lab>
            <div className="px-3 pb-3 flex gap-2 flex-wrap">
                {interactions.map((interaction: InteractionType, index: number) => (
                    Interaction({ icon: interaction.icon, number: (react ? react[index] : 0), style: interaction.style, key: index })
                ))}
            </div>
        </Lab>
    );
}

export default InteractionsLab;

function Interaction({ icon, number, style, key }: InteractionType) {
    return (
        <section key={key} className="bg-base-100 flex gap-1 p-2 rounded-2xl min-w-[50px]">
            <IconRenderer className={'self-center ' + (style)} fontSize={16} icon={icon} />
            <p>{number}</p>
        </section>
    )
}