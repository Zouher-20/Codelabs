'use client';
import PlanDetailsHeader from '@/app/(features)/admin/(admin-feature)/plans/details/components/header';
import DeleteUserModal from '@/app/(features)/admin/(admin-feature)/users/components/modal/delete-user-modal';
import UsersTable, {
    UserTableType
} from '@/app/(features)/admin/(admin-feature)/users/components/user-table';
import { findUsers } from '@/app/api/(modules)/admin/service/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const PlanDetails = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [users, setUsers] = useState<Array<UserTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');
    const [modalUserId, setModalUserId] = useState('');
    const [planName, setPlanName] = useState('');
    useEffect(() => {
        const pageNumber = Number(params.get('id') ?? '1');
        const plan = params.get('plan') ?? '';
        setPlanName(plan);
        updateCurrentPage(pageNumber);
        getUser({ newSearchWord: searchWord, planText: plan, page: pageNumber });
    }, []);
    const getUser = async ({
        newSearchWord,
        planText,
        page
    }: {
        newSearchWord: string;
        planText: string;
        page: number;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const user = await findUsers({
                page: page,
                pageSize: pageSize,
                planName: planText === '' ? undefined : planText,
                searchWord: newSearchWord
            });
            setTotalPageCount(user.userCount);
            setUsers(
                user.user.users.map(e => {
                    return {
                        email: e.email ?? '',
                        id: e.id ?? '',
                        name: e.username ?? '',
                        labs: 1,
                        userimage: e.userImage ?? '',
                        role: e.role,
                        createdAt: e.createdAt,
                        classes: 1,
                        plan: {
                            duration: e.PlanSubscription?.plan.duration,
                            FeaturePlan: [],
                            id: e.PlanSubscription?.id,
                            name: e.PlanSubscription?.plan.name,
                            price: e.PlanSubscription?.plan.price,
                            subtitle: e.PlanSubscription?.plan.subtitle,
                            createdAt: e.PlanSubscription?.plan.createdAt
                        }
                    } as UserTableType;
                })
            );
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getUser({ newSearchWord: searchWord, planText: planName, page: index });
    };
    return (
        <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-col">
                <PlanDetailsHeader
                    planName={planName}
                    searchWord={searchWord}
                    onFieldChanged={(e: string) => {
                        setSearchWord(e);
                        updateCurrentPage(1);
                        setTotalPageCount(0);
                        getUser({ newSearchWord: e, planText: planName, page: 1 });
                    }}
                />
                <ManageState
                    empty={users.length == 0}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getUser({
                            newSearchWord: searchWord,
                            planText: planName,
                            page: currentPage
                        });
                    }}
                    loading={loading}
                    loadedState={
                        <UsersTable
                            users={users}
                            pageCount={totalPageCount / pageSize}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            deleteUserButtonClicked={user => {
                                setModalUserId(user.id);
                                if (document) {
                                    (
                                        document.getElementById(
                                            'delete-user-modal'
                                        ) as HTMLFormElement
                                    )?.showModal();
                                }
                            }}
                        />
                    }
                />
                <DeleteUserModal
                    userId={modalUserId}
                    callback={() => {
                        getUser({
                            newSearchWord: searchWord,
                            planText: planName,
                            page: currentPage
                        });
                    }}
                />
                <CustomToaster />
            </div>
        </div>
    );
};

export default PlanDetails;
