import InteractionsLab from "./interactions-lab";
import UserAvatar from "../user-avatar";

const LabCard = ({ title }: { title: string }) => {
    return (
        <div className="bg-base-100 h-fit rounded-xl pb-2 flex flex-col gap-2">
            <InteractionsLab react={[754, 213, 30, 84]} />
            <div className="px-4">
                <p className="text-lg">{title}</p>
                <UserAvatar />
            </div>
        </div>
    );
}

export default LabCard;