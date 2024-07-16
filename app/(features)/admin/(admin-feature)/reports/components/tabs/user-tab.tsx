import { ManageState } from '@/app/components/page-state/state_manager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReportsViewHeader from '../header';
import ReportUsersTable, { ReportUserTableType } from '../tables/report-user-table';

const UserTab = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [users, setUsers] = useState<Array<ReportUserTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
    }, []);
    const getUsersReports = async ({
        newSearchWord,
        page
    }: {
        newSearchWord: string;
        page: number;
    }) => {
        setLoading(true);
        setError(null);
        try {
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getUsersReports({ newSearchWord: searchWord, page: index });
    };

    return (
        <div>
            <ReportsViewHeader onFieldChanged={() => {}} title="Users" searchWord="" />
            <ManageState
                empty={users.length == 0}
                error={error}
                errorAndEmptyCallback={() => {
                    getUsersReports({
                        newSearchWord: searchWord,
                        page: currentPage
                    });
                }}
                loading={loading}
                loadedState={
                    <ReportUsersTable
                        users={users}
                        pageCount={totalPageCount / pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        deleteUserButtonClicked={user => {}}
                    />
                }
            />
        </div>
    );
};
export default UserTab;
