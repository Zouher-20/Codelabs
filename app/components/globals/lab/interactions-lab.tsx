import { LabTableType } from '@/app/(features)/admin/discover/components/lab-table';
import { InteractionType } from '@/app/@types/Interaction';
import Interaction from '@/app/components/globals/lab/interaction';
import { interactions } from '@/app/constants/interactions';
import Lab from './lab';

const InteractionsLab = ({
    react,
    lab,
    onInteractionClicked
}: {
    onInteractionClicked: (index: number) => void;
    lab: LabTableType;
    react: Array<number>;
}) => {
    return (
        <Lab>
            <div className="absolute bottom-4 z-20 flex w-full flex-wrap gap-1 px-2  text-xs">
                {interactions.map((interaction: InteractionType, index: number) =>
                    Interaction({
                        icon: interaction.icon,
                        onClick: () => {
                            onInteractionClicked(index);
                        },
                        isSelected: (index == 0 && lab.isStared) || index != 0,
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
