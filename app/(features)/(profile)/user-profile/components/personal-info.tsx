'use client';

import { userType } from '@/app/@types/user';

const PersonalInfo = ({ user }: { user: userType }) => {
    const userInfo = { name: user.username, bio: 'Bio', position: 'Developber' };
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4 ">
                <h2 className="text-xl text-primary">User Information</h2>
            </div>
            <div className="flex flex-col gap-4 px-2">
                {Object.keys(userInfo).map(key => (
                    <div className="flex flex-col " key={key}>
                        <p className="capitalize">{key}</p>
                        <p key={key} className="text-gray-500">
                            {(userInfo as any)[key]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalInfo;
