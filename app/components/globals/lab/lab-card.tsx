import { LabTableType } from '@/app/(features)/admin/discover/components/lab-table';
import UserAvatar from '../user-avatar';
import InteractionsLab from './interactions-lab';

const LabCard = ({
    lab,
    onLabClicked
}: {
    lab: LabTableType;
    onLabClicked: (lab: LabTableType) => void;
}) => {
    return (
        <div
            className="flex w-64 flex-col gap-2 rounded-xl bg-base-100 hover:cursor-pointer"
            onClick={() => {
                onLabClicked(lab);
            }}
        >
            <InteractionsLab react={[lab.starCount, 213, 30, lab.commentCount]} />
            <div className="px-4">
                <p className="text-sm">{lab.name}</p>
                <UserAvatar user={lab.user} />
            </div>
        </div>
    );
};

export default LabCard;
