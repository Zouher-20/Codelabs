import { LabTableType } from '@/app/(features)/admin/(admin-feature)/discover/components/lab-table';
import { InteractionType } from '@/app/@types/Interaction';
import Interaction from '@/app/components/globals/lab/interaction';
import { interactions } from '@/app/constants/interactions';
import UserAvatar from '../user-avatar';
import Lab from './lab';
import './style.css';

const LabCard = ({
    lab,
    onLabClicked,
    onInteractionClicked
}: {
    lab: LabTableType;
    onLabClicked: (lab: LabTableType) => void;
    onInteractionClicked: (index: number) => void;
}) => {
    const react = [lab.starCount, lab.clone ?? 0, lab.viewCount ?? 0, lab.commentCount];
    return (
        <div
            className=" relative flex w-80 flex-col gap-2 rounded-xl hover:cursor-pointer "
            onClick={() => {
                onLabClicked(lab);
            }}
        >
            <div id="lab-card" className="card-style flex flex-col justify-center p-4">
                <Lab />
                <div className="z-10 w-full px-4 py-1">
                    <UserAvatar user={lab.user} labName={lab.name} />
                </div>
                <div id="interactions" className="z-20 flex w-full flex-wrap gap-1 px-4 text-xs">
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
            </div>
        </div>
    );
};

export default LabCard;
