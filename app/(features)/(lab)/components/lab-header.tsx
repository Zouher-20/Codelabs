'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import BackBtn from './back-btn';
import CloneLabButton from './clone-lab';
import LabAvatar from './lab-avatar';

export default function LabHeader({
    name,
    author,
    labId
}: {
    name: string | null;
    author: User | null;
    labId: string;
}) {
    const [imgError, setImageError] = useState(false);
    const onImgError = () => {
        setImageError(true);
    };
    return (
        <>
            <div className="flex max-h-[8vh] items-center justify-between p-2">
                <div className="flex items-center gap-2">
                    <BackBtn />
                    {author && <LabAvatar user={author} />}
                    <div className="flex flex-col">
                        <div className="text-xl">{name}</div>
                        {author && <small className="text-sm">{author.username}</small>}
                    </div>
                </div>
                <div>
                    <CloneLabButton labId={labId} />
                </div>
            </div>
        </>
    );
}
