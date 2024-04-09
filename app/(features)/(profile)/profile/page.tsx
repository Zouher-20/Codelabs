import { userType } from "@/app/@types/user";
import Avatar from "./components/avatar";
import Billing from "./components/billing";
import PersonalInfo from "./components/personal-info";
import Statistics from "./components/statistics";


const user: userType = {
    name: 'User name',
    email: 'username903@gmail.com',
    image: null,
    plan: 'plus',
    bio: 'A few word about you',
    position: 'Developer',
    labs: 4,
    classes: 1
}
const Profile = () => {
    const tabs = [
        { name: 'Personal informatio', component: <PersonalInfo user={user} /> },
        { name: 'Billing', component: <Billing plan={user.plan} /> },
        { name: 'Statistics', component: <Statistics user={user} /> },
    ]

    return (
        <div className="flex flex-col gap-4 px-2">
            <h1 className=" text-2xl">Account Setting</h1>
            <Avatar user={user} />
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
                        <div role="tabpanel" className="tab-content py-6 max-sm:pt-8">{component}</div>
                    </>
                ))
                }
                <div className="tab mr-4"></div>
            </div>
        </div>
    );
}

export default Profile;