import UserAvatar from '../user-avatar';
import Lab from './lab';

const SubmittedLab = () => {
    return (
        <div className="flex h-fit flex-col gap-2 rounded-xl bg-base-100 pb-2">
            <Lab />
            <div className="px-4">
                <UserAvatar />
            </div>
        </div>
    );
};

export default SubmittedLab;
