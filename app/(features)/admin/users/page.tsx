'use client';
import { basicPlan } from '@/app/constants/plans';
import UpdateUserPlanModal from './components/modal/update-user-plan-modal';
import { UserViewUserTable } from './components/users-user-table';

const Users = () => {
    const pageSize = 1;

    return (
        <div className="flex flex-col gap-2 p-6">
            <UserViewUserTable pageSize={pageSize} />
            {/* <NewUserModel /> */}
            <UpdateUserPlanModal plan={basicPlan} />
        </div>
    );
};

export default Users;
