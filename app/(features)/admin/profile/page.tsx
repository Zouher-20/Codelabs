import { userType } from '@/app/@types/user';
import Avatar from '../../(profile)/profile/components/avatar';
import PersonalInfo from '../../(profile)/profile/components/personal-info';

const user: userType = {
    name: 'User name',
    email: 'username903@gmail.com',
    image: null,
    id: '1',
    plan: 'plus',
    bio: 'A few word about you',
    position: 'Developer',
    labs: 4,
    classes: 1
};
const Profile = () => {
    return (
        <div className="flex flex-col gap-4 px-2">
            <h1 className=" text-2xl">Account Setting</h1>
            <Avatar user={user} />
            <div className="mb-4">
                <PersonalInfo user={user} />
            </div>
        </div>
    );
};

export default Profile;
