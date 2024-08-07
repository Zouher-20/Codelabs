import { ManageState } from '@/app/components/page-state/state_manager';
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
    return (
        <div>
            <ReportsViewHeader onFieldChanged={() => {}} title="Blogs Comments" searchWord="" />
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
                        deleteBlogCommentButtonClicked={blogComment => {}}
                    />
                }
            />
        </div>
    );
};
export default BlogsCommentCommentsTab;
