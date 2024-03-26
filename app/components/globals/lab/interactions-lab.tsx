import { InteractionType } from '@/app/@types/Interaction';
import IconRenderer from '../icon';
import Lab from './lab';

const interactions = [
    { icon: 'solar:heart-angle-bold', style: 'text-error' },
    { icon: 'solar:share-circle-bold-duotone', style: 'text-secondary' },
    { icon: 'solar:eye-bold-duotone', style: 'text-warning' },
    { icon: 'solar:chat-line-bold', style: 'text-info' }
];

const InteractionsLab = ({ react }: { react: Array<number> }) => {
    return (
        <Lab>
            <div className="flex flex-wrap gap-1 px-2 pb-1 text-xs">
                {interactions.map((interaction: InteractionType, index: number) =>
                    Interaction({
                        icon: interaction.icon,
                        number: react ? react[index] : 0,
                        style: interaction.style,
                        key: index
                    })
                )}
            </div>
        </Lab>
    );
};

export default InteractionsLab;

function Interaction({ icon, number, style, key }: InteractionType) {
    return (
        <section key={key} className="flex gap-1 rounded-md bg-base-100 p-2">
            <IconRenderer className={'self-center ' + style} fontSize={16} icon={icon} />
            <p>{number}</p>
        </section>
    );
}
