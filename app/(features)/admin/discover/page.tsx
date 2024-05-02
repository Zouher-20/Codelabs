'use client';
import { getStatisticsAdmin } from '@/app/api/(modules)/admin/service/action';
import { getlab } from '@/app/api/(modules)/admin/user-project/service/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DiscoverHeader from './components/header';
import LabTable, { LabTableType } from './components/lab-table';
import { AdminDiscoverStatisticsComponent } from './components/statistics-container';

const Discover = () => {
    const params = useSearchParams();
    const pageSize = 10;
    const [labs, setLabs] = useState<Array<LabTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');
    const [statistics, setStatistics] = useState<{
        blogs: number;
        challenges: number;
        classes: number;
        labs: number;
        users: number;
    } | null>(null);

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getUser({ newSearchWord: searchWord, page: pageNumber });
        getServerStatistics();
    }, []);
    const getUser = async ({ newSearchWord, page }: { newSearchWord: string; page: number }) => {
        setLoading(true);
        setError(null);
        try {
            const lab = await getlab({
                page: page,
                pageSize: pageSize,
                nameLab: newSearchWord
            });
            setTotalPageCount(lab.totalCount);
            setLabs(
                lab.projects.map(e => {
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
    const getServerStatistics = async () => {
        try {
            const res = await getStatisticsAdmin();
            setStatistics(res);
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getUser({ newSearchWord: searchWord, page: index });
    };
    return (
        <div className="flex flex-col gap-2 p-6">
            {statistics ? (
                <div className="flex flex-wrap justify-center gap-4">
                    <AdminDiscoverStatisticsComponent
                        icon="solar:user-bold"
                        text="Users"
                        value={statistics.users}
                    />
                    <AdminDiscoverStatisticsComponent
                        icon="solar:test-tube-minimalistic-bold-duotone"
                        text="Labs"
                        value={statistics.labs}
                    />
                    <AdminDiscoverStatisticsComponent
                        icon="solar:cup-star-bold-duotone"
                        text="Challanges"
                        value={statistics.challenges}
                    />
                    <AdminDiscoverStatisticsComponent
                        icon="solar:square-academic-cap-bold-duotone"
                        text="Classes"
                        value={statistics.classes}
                    />
                    <AdminDiscoverStatisticsComponent
                        icon="solar:text-field-bold-duotone"
                        text="Blogs"
                        value={statistics.blogs}
                    />
                </div>
            ) : null}

            <div className="flex flex-col">
                <DiscoverHeader
                    searchWord={searchWord}
                    onFieldChanged={e => {
                        setSearchWord(e);
                        updateCurrentPage(1);
                        setTotalPageCount(0);
                        getUser({ newSearchWord: e, page: 1 });
                    }}
                />
                <ManageState
                    empty={labs.length == 0}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getUser({ newSearchWord: searchWord, page: currentPage });
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

export default Discover;
