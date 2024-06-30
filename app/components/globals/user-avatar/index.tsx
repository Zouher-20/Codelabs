import { userType } from '@/app/@types/user';

const UserAvatar = ({ user }: { user?: userType | undefined | null }) => {
    return (
        <div className="flex items-center gap-1 py-1">
            {(user?.userImage ?? '') != '' ? (
                <div className="avatar">
                    <div className="w-9 rounded-3xl">
                        <img src={`http://localhost:3000${user?.userImage?.replace(/\\/g, '/')}`} />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder">
                    <div className="w-9 rounded-full bg-neutral text-neutral-content">
                        <span className="text-sm">{user?.username?.at(0) ?? ''}</span>
                    </div>
                </div>
            )}
            <span className="text-sm">{user?.username ?? 'userName'}</span>
        </div>
    );
};

export default UserAvatar;
