import { getReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReportsViewHeader from '../header';
import ReportLabTable, { ReportLabTableType } from '../tables/report-lab-table';

const LabsTab = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [labs, setLabs] = useState<Array<ReportLabTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getLabsReports({ newSearchWord: '', page: pageNumber });
    }, []);
    const getLabsReports = async ({
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
                reportType: ReportType.USER_PROJECT
            });

            setLabs(
                res.labReported?.map(e => {
                    return {
                        description: e.ReportUserProject?.userProject.description ?? '',
                        id: e.ReportUserProject?.id ?? '',
                        labId: e.ReportUserProject?.userprojectId ?? '',
                        name: e.ReportUserProject?.user.username ?? '',
                        text: e.messageReport ?? ''
                    };
                }) ?? []
            );
            setTotalPageCount(res.totalLabReported ?? 0);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getLabsReports({ newSearchWord: searchWord, page: index });
    };
    return (
        <div>
            <ReportsViewHeader
                onFieldChanged={value => {
                    setSearchWord(value);
                    getLabsReports({
                        newSearchWord: value,
                        page: currentPage
                    });
                }}
                title="Labs"
                searchWord={searchWord}
            />
            <ManageState
                empty={labs.length == 0}
                error={error}
                errorAndEmptyCallback={() => {
                    getLabsReports({
                        newSearchWord: searchWord,
                        page: currentPage
                    });
                }}
                loading={loading}
                loadedState={
                    <ReportLabTable
                        labs={labs}
                        pageCount={totalPageCount / pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        deleteLabsButtonClicked={user => {}}
                    />
                }
            />
        </div>
    );
};
export default LabsTab;
