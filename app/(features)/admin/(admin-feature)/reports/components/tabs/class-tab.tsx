import { getReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReportsViewHeader from '../header';
import ReportClasssTable, { ReportClassTableType } from '../tables/report-class-table';

const ClassTab = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [classes, setClasss] = useState<Array<ReportClassTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getClasssReports({ newSearchWord: '', page: pageNumber });
    }, []);
    const getClasssReports = async ({
        newSearchWord,
        page
    }: {
        newSearchWord: string;
        page: number;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getReport({
                page: page,
                pageSize: 10,
                reportType: ReportType.CLASS
            });

            setClasss(
                res.classReported?.map(e => {
                    return {
                        classname: e.ReportClass?.classRom.name ?? '',
                        id: e.ReportClass?.id ?? '',
                        text: e.messageReport ?? '',
                        userId: e.ReportClass?.userId ?? '',
                        username: e.ReportClass?.user.username ?? ''
                    };
                }) ?? []
            );
            setTotalPageCount(res.totalClassgReported ?? 0);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getClasssReports({ newSearchWord: searchWord, page: index });
    };

    return (
        <div>
            <ReportsViewHeader
                onFieldChanged={value => {
                    setSearchWord(value);
                    getClasssReports({ newSearchWord: value, page: currentPage });
                }}
                title="Classs"
                searchWord={searchWord}
            />
            <ManageState
                empty={classes.length == 0}
                error={error}
                errorAndEmptyCallback={() => {
                    getClasssReports({
                        newSearchWord: searchWord,
                        page: currentPage
                    });
                }}
                loading={loading}
                loadedState={
                    <ReportClasssTable
                        classes={classes}
                        pageCount={totalPageCount / pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        deleteClassButtonClicked={e => {}}
                    />
                }
            />
        </div>
    );
};
export default ClassTab;
