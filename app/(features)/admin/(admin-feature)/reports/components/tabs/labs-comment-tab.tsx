import { ManageState } from '@/app/components/page-state/state_manager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReportsViewHeader from '../header';
import ReportLabCommentTable, {
    ReportLabCommentTableType
} from '../tables/report-lab-comment-table';

const LabsCommentCommentsTab = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [labsComment, setLabsComment] = useState<Array<ReportLabCommentTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
    }, []);
    const getLabsCommentReports = async ({
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
        getLabsCommentReports({ newSearchWord: searchWord, page: index });
    };
    return (
        <div>
            <ReportsViewHeader onFieldChanged={() => {}} title="Labs Comments" searchWord="" />
            <ManageState
                empty={labsComment.length == 0}
                error={error}
                errorAndEmptyCallback={() => {
                    getLabsCommentReports({
                        newSearchWord: searchWord,
                        page: currentPage
                    });
                }}
                loading={loading}
                loadedState={
                    <ReportLabCommentTable
                        labComments={labsComment}
                        pageCount={totalPageCount / pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        deleteLabCommentButtonClicked={labComment => {}}
                    />
                }
            />
        </div>
    );
};
export default LabsCommentCommentsTab;
