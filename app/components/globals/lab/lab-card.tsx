import UserAvatar from '../user-avatar';
import InteractionsLab from './interactions-lab';

const LabCard = ({ title }: { title: string }) => {
    return (
        <div className="flex w-64 flex-col gap-2 rounded-xl bg-base-300">
            <InteractionsLab react={[754, 213, 30, 84]} />
            <div className="px-4">
                <p className="text-sm">{title}</p>
                <UserAvatar />
            </div>
        </div>
    );
};

export default LabCard;
