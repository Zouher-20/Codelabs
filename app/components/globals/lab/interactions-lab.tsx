import { InteractionType } from '@/app/@types/Interaction';
import Interaction from '@/app/components/globals/lab/interaction';
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
            <div className="absolute bottom-4 z-20 flex w-full flex-wrap gap-1 px-2  text-xs">
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
