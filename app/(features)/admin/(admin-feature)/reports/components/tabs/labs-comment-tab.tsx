import { deleteAnyReport, getReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import { ManageState } from '@/app/components/page-state/state_manager';
import { SwalUtil } from '@/app/utils/swal-util';
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
        getLabsCommentReports({ newSearchWord: '', page: pageNumber });
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
            const res = await getReport({
                page: page,
                pageSize: 10,
                reportType: ReportType.COMMENT_USER_PROJECT,
                searchWord: newSearchWord
            });

            setLabsComment(
                res.commentLabReported?.map(e => {
                    return {
                        commentId: e?.commentUserProjectId ?? '',
                        comment: e?.comment.comment ?? '',
                        id: e.reportId,
                        text: e.report.messageReport ?? '',
                        username: e?.user.username ?? ''
                    };
                }) ?? []
            );
            setTotalPageCount(res.totalCommentLabReported ?? 0);
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
    const deleteReport = async (id: string) => {
        try {
            await deleteAnyReport({ reportId: id });
            getLabsCommentReports({ newSearchWord: searchWord, page: currentPage });
            toast.success('delete report done');
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    return (
        <div>
            <ReportsViewHeader
                onFieldChanged={value => {
                    setSearchWord(value);
                    getLabsCommentReports({ newSearchWord: value, page: currentPage });
                }}
                title="Labs Comments"
                searchWord={searchWord}
            />
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
                        deleteLabCommentButtonClicked={labComment => {
                            SwalUtil.showConfirm(() => {
                                deleteReport(labComment.id);
                            });
                        }}
                    />
                }
            />
        </div>
    );
};
export default LabsCommentCommentsTab;
