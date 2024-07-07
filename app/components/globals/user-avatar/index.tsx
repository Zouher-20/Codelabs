import { userType } from '@/app/@types/user';
import { useState } from 'react';

const UserAvatar = ({
    user,
    labName
}: {
    user?: userType | undefined | null;
    labName?: string;
}) => {
    const [imgError, setImageError] = useState(false);
    const onImageError = (event: Event) => {
        setImageError(true);
    };
    return (
        <div className="flex items-center gap-3 py-1">
            {((user?.userImage || user?.image) ?? '') != '' && !imgError ? (
                <div className="avatar">
                    <div className="w-12  rounded-md">
                        <img
                            onError={onImageError}
                            src={`http://localhost:3000${(user?.userImage || user?.image)?.replace(/\\/g, '/')}`}
                        />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder">
                    <div className="w-12 rounded-md bg-base-300 capitalize text-neutral-content">
                        <span className="text-sm">
                            {(user?.username || user?.name)?.at(0) ?? ''}
                        </span>
                    </div>
                </div>
            )}
            <div className="-mt-2 flex flex-col gap-1 overflow-hidden">
                {labName && <span className="line-clamp-1 text-lg font-bold">{labName}</span>}
                <span className="self-start text-sm">
                    {user?.username || user?.name || 'userName'}
                </span>
            </div>
        </div>
    );
};

export default UserAvatar;
