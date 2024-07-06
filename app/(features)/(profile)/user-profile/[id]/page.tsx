import { userType } from '@/app/@types/user';
import { getUserDetails } from '@/app/api/(modules)/auth/service/actions';
import toast from 'react-hot-toast';
import Avatar from '../components/avatar';
import PersonalInfo from '../components/personal-info';

const UserProfile = async ({ params }: { params: { id: string } }) => {
    async function getData() {
        try {
            const data = await getUserDetails({ userId: params.id });
            return data;
        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const user = await getData();
    const tabs = [
        {
            name: 'Personal informatio',
            component: <PersonalInfo user={user as unknown as userType} />
        }
    ];

    return (
        <div className="flex flex-col gap-4 px-2">
            <h1 className=" text-2xl capitalize">{user?.username} Profile</h1>
            <Avatar
                user={{ username: user?.username as string, userimage: user?.userImage as string }}
            />
            <div role="tablist" className="tabs tabs-bordered" key="tabs">
                {tabs.map(({ name, component }, index) => (
                    <>
                        <input
                            key={index}
                            type="radio"
                            name="my_tabs"
                            role="tab"
                            className="tab sm:text-nowrap"
                            aria-label={name}
                            value={name}
                            defaultChecked={index === 0}
                        />
                        <div role="tabpanel" className="tab-content py-6 max-sm:pt-8">
                            {component}
                        </div>
                    </>
                ))}
                <div className="tab mr-4"></div>
            </div>
        </div>
    );
};

export default UserProfile;
