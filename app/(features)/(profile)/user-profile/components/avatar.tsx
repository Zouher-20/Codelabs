'use client';
import noImage from '@/public/images/no-image2.png';
import Image from 'next/image';
import { useState } from 'react';

const Avatar = ({ user }: { user: { username: string; userimage: string } }) => {
    const [userImageState, setUserImageState] = useState(user.userimage);

    const handleError = () => {
        setUserImageState('/images/no-image2.png');
    };
    return (
        <div className="flex gap-4 py-1">
            <div className="avatar h-[140px] w-[140px]">
                <Image
                    className="rounded-xl"
                    height={140}
                    width={140}
                    alt="user"
                    src={userImageState ? userImageState.replace(/\\/g, '/') : noImage}
                    onError={handleError}
                />
            </div>
            <section className="flex flex-col self-start">
                <span className="text-lg ">{user.username}</span>
            </section>
        </div>
    );
};

export default Avatar;
