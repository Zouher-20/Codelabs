import { userType } from '@/app/@types/user';

const UserAvatar = ({
    user,
    labName
}: {
    user?: userType | undefined | null;
    labName?: string;
}) => {
    return (
        <div className="flex items-center gap-3 py-1">
            {(user?.userImage ?? '') != '' ? (
                <div className="avatar">
                    <div className="w-12 rounded-md">
                        <img src={`http://localhost:3000${user?.userImage?.replace(/\\/g, '/')}`} />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder">
                    <div className="w-12 rounded-md bg-neutral text-neutral-content">
                        <span className="text-sm">{user?.username?.at(0) ?? ''}</span>
                    </div>
                </div>
            )}
            <div className="-mt-2 flex flex-col gap-1 overflow-hidden">
                {labName && <span className="line-clamp-1 text-lg font-bold">{labName}</span>}
                <span className="self-start text-sm">{user?.username ?? 'userName'}</span>
            </div>
        </div>
    );
};

export default UserAvatar;
