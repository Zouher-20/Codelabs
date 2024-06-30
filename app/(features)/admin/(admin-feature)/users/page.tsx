'use client';
import { planType } from '@/app/@types/plan';
import { findUsers, getplanName } from '@/app/api/(modules)/admin/service/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserViewHeader from './components/headea';
import DeleteUserModal from './components/modal/delete-user-modal';
import UpdateUserPlanModal from './components/modal/update-user-plan-modal';
import UsersTable, { UserTableType } from './components/user-table';

const Users = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [users, setUsers] = useState<Array<UserTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');
    const [modalUserId, setModalUserId] = useState('');
    const [currentPlan, setCurrentPlan] = useState<planType | null>(null);
    const [serverPlans, setServerPlans] = useState<Array<string>>([]);
    const [selectedSearchPlan, setSelectedSearchPlan] = useState<string>('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getUser({ newSearchWord: searchWord, planText: selectedSearchPlan, page: pageNumber });
        getServerPlanNames();
    }, []);
    const getServerPlanNames = async () => {
        try {
            const res = await getplanName();
            setServerPlans(res.map<string>(e => e.name ?? ''));
        } catch (error: any) {
            toast.error(error.message);
        }
    };
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
                        email: e.email,
                        id: e.id,
                        name: e.username,
                        labs: 1,
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
        getUser({ newSearchWord: searchWord, planText: selectedSearchPlan, page: index });
    };
    const onChangeSearchPlan = (planText: string) => {
        updateCurrentPage(1);
        setTotalPageCount(0);
        setSelectedSearchPlan(planText);
        getUser({ newSearchWord: searchWord, planText: planText, page: currentPage });
    };
    return (
        <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-col">
                <UserViewHeader
                    onChangeSearchPlan={onChangeSearchPlan}
                    selectedSearchPlan={selectedSearchPlan}
                    searchWord={searchWord}
                    onFieldChanged={e => {
                        setSearchWord(e);
                        updateCurrentPage(1);
                        setTotalPageCount(0);
                        getUser({ newSearchWord: e, planText: selectedSearchPlan, page: 1 });
                    }}
                    plans={serverPlans}
                />
                <ManageState
                    empty={users.length == 0}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getUser({
                            newSearchWord: searchWord,
                            planText: selectedSearchPlan,
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
                            planText: selectedSearchPlan,
                            page: currentPage
                        });
                    }}
                />
                <CustomToaster />
                <UpdateUserPlanModal plan={currentPlan} onEditPlan={() => {}} />
            </div>
        </div>
    );
};

export default Users;
