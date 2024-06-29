'use client'
import Image from "next/image";
import noImage from '@/public/images/no-image2.png'
import { useState } from "react";

const Avatar = ({ user }: { user: { username: string, userimage: string } }) => {
    const [userImageState, setUserImageState] = useState(user.userimage);

    const handleError = () => {
        setUserImageState('/images/no-image2.png');
    };
    return (
        <div className="flex gap-4 py-1">
            <div className="avatar w-[140px] h-[140px]">
                <Image
                    className="rounded-xl"
                    height={140}
                    width={140}
                    alt="user"
                    src={userImageState ? userImageState.replace(/\\/g, '/') : noImage}
                    onError={handleError}
                />
            </div>
            <section className="self-start flex flex-col">
                <span className="text-lg ">{user.username}</span>
            </section>
        </div>
    );
}

export default Avatar;