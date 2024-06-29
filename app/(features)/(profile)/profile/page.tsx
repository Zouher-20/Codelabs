"use server";
import { userType } from '@/app/@types/user';
import PersonalInfo from './components/personal-info';
import Billing from './components/billing';
import Statistics from './components/statistics';
import { getMyInfo } from '@/app/api/(modules)/auth/service/actions';
import AvatarWrapper from './components/avatar-wrapper ';


async function getData() {
    const user = await getMyInfo()
    if (user) return (user as unknown as userType)
}
const Profile = async () => {

    const user = await getData()

    if (user) {
        const tabs = [
            { name: 'Personal informatio', component: <PersonalInfo /> },
            { name: 'Billing', component: <Billing user={user} /> },
            { name: 'Statistics', component: <Statistics user={user} /> }
        ];
        return (
            <div className="flex flex-col gap-4 px-2 max-w-screen-xl mx-auto">
                <h1 className=" text-2xl">Account Setting</h1>
                <AvatarWrapper initialImagePath={user.userImage as string} username={user.username} />
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
    }
};

export default Profile;
