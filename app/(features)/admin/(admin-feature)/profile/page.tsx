import Avatar from '@/app/(features)/(profile)/profile/components/avatar';
import PersonalInfo from '@/app/(features)/(profile)/profile/components/personal-info';
import { userType } from '@/app/@types/user';

const user: userType = {
    email: 'username903@gmail.com',
    id: '1',
    bio: 'A few word about you',
    position: 'Developer'
};
const Profile = () => {
    return (
        <div className="flex flex-col gap-4 px-2">
            <h1 className=" text-2xl">Account Setting</h1>
            <Avatar
                username={user.username ?? ''}
                photo={function (photo: File): void {
                    throw new Error('Function not implemented.');
                }}
            />
            <div className="mb-4">
                <PersonalInfo />
            </div>
        </div>
    );
};

export default Profile;
