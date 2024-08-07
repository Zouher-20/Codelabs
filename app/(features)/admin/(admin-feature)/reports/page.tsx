'use client';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import ReportsTabs from './components/tab-view';

const Users = () => {
    return (
        <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-col">
                <ReportsTabs />
                <CustomToaster />
            </div>
        </div>
    );
};

export default Users;
