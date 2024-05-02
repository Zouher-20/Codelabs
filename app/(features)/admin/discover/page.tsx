'use client';
import { getlab } from '@/app/api/(modules)/admin/user-project/service/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DiscoverHeader from './components/header';
import LabTable, { LabTableType } from './components/lab-table';
import { AdminDiscoverStatisticsComponent } from './components/statistics-container';

const Users = () => {
    const pageSize = 10;
    const [labs, setLabs] = useState<Array<LabTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        getUser({ newSearchWord: searchWord });
    }, []);
    const getUser = async ({ newSearchWord }: { newSearchWord: string }) => {
        setLoading(true);
        setError(null);
        try {
            const lab = await getlab({
                page: currentPage,
                pageSize: pageSize,
                nameLab: newSearchWord
            });
            setTotalPageCount(10);
            setLabs(
                lab.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        commentCount: e.commentCount,
                        description: e.description,
                        starCount: e.starCount,
                        user: {
                            email: e.user.email,
                            id: e.user.id,
                            name: e.user.username,
                            image: e.user.userImage,
                            role: e.user.role
                        }
                    } as LabTableType;
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
        getUser({ newSearchWord: searchWord });
    };
    return (
        <div className="flex flex-col gap-2 p-6">
            <AdminDiscoverStatisticsComponent icon="" text="Users" value={1256} />
            <div className="flex flex-col">
                <DiscoverHeader
                    searchWord={searchWord}
                    onFieldChanged={e => {
                        setSearchWord(e);
                        updateCurrentPage(1);
                        setTotalPageCount(0);
                        getUser({ newSearchWord: e });
                    }}
                />
                <ManageState
                    empty={labs.length == 0}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getUser({ newSearchWord: searchWord });
                    }}
                    loading={loading}
                    loadedState={
                        <LabTable
                            labs={labs}
                            pageCount={totalPageCount / pageSize}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            detailsClicked={() => {}}
                        />
                    }
                />

                <CustomToaster />
            </div>
        </div>
    );
};

export default Users;
