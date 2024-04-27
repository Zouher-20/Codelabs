import { basicPlan } from '@/app/constants/plans';
import UserViewHeader from './components/headea';
import NewUserModel from './components/modal/new-user-modal';
import UpdateUserPlanModal from './components/modal/update-user-plan-modal';
import { UserTableType } from './components/user-table';
import { UserViewUserTable } from './components/users-user-table';

const Users = () => {
    var users: Array<UserTableType> = [
        {
            id: 1,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 2,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 3,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 4,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 5,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        }
    ];
    const pageSize = 4;

    return (
        <div className="flex flex-col gap-2 p-6">
            <UserViewHeader />
            <UserViewUserTable pageSize={pageSize} users={users} />
            <NewUserModel />
            <UpdateUserPlanModal plan={basicPlan} />
        </div>
    );
};

export default Users;
