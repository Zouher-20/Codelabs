'use client';
import { User } from '@prisma/client';
import { useState } from 'react';

export default function LabAvatar({ user }: { user: User }) {
    const [imgError, setImageError] = useState(false);
    const onImgError = () => {
        setImageError(true);
    };
    return (
        <>
            {!imgError ? (
                <img
                    className="rounded"
                    src={`http://localhost:3000${user?.userImage?.replace(/\\/g, '/')}`}
                    alt="user-image"
                    width={48}
                    height={48}
                    onError={onImgError}
                />
            ) : (
                <div className="avatar placeholder rounded">
                    <div className="w-12 rounded-md bg-base-100 capitalize text-neutral-content">
                        <span className="text-sm">{user?.username?.at(0) ?? ''}</span>
                    </div>
                </div>
            )}
        </>
    );
}
