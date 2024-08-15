import { deleteAnyReport, getReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import { ManageState } from '@/app/components/page-state/state_manager';
import { SwalUtil } from '@/app/utils/swal-util';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReportsViewHeader from '../header';
import ReportBlogCommentTable, {
    ReportBlogCommentTableType
} from '../tables/report-blog-comment-table';

const BlogsCommentCommentsTab = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [blogsComment, setBlogsComment] = useState<Array<ReportBlogCommentTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getBlogsCommentReports;
        getBlogsCommentReports({ newSearchWord: '', page: pageNumber });
    }, []);
    const getBlogsCommentReports = async ({
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
                reportType: ReportType.COMMENT_BLOG,
                searchWord: newSearchWord
            });

            setBlogsComment(
                res.commentBlogReported?.map(e => {
                    return {
                        commentId: e?.commentId ?? '',
                        comment: e?.comment.comment ?? '',
                        id: e.reportId,
                        blogId: e.comment.blogId ?? '',
                        text: e.report.messageReport ?? '',
                        username: e?.user.username ?? ''
                    };
                }) ?? []
            );
            setTotalPageCount(res.totalCommentBlogReported ?? 0);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getBlogsCommentReports({ newSearchWord: searchWord, page: index });
    };
    const deleteReport = async (id: string) => {
        try {
            await deleteAnyReport({ reportId: id });
            getBlogsCommentReports({ newSearchWord: searchWord, page: currentPage });
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
                    getBlogsCommentReports({ newSearchWord: value, page: currentPage });
                }}
                title="Blogs Comments"
                searchWord={searchWord}
            />
            <ManageState
                empty={blogsComment.length == 0}
                error={error}
                errorAndEmptyCallback={() => {
                    getBlogsCommentReports({
                        newSearchWord: searchWord,
                        page: currentPage
                    });
                }}
                loading={loading}
                loadedState={
                    <ReportBlogCommentTable
                        blogComments={blogsComment}
                        pageCount={totalPageCount / pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        deleteBlogCommentButtonClicked={blogComment => {
                            SwalUtil.showConfirm(() => {
                                deleteReport(blogComment.id);
                            });
                        }}
                    />
                }
            />
        </div>
    );
};
export default BlogsCommentCommentsTab;
