import { getReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReportsViewHeader from '../header';
import ReportBlogTable, { ReportBlogTableType } from '../tables/report-blog-table';

const BlogsTab = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [blogs, setBlogs] = useState<Array<ReportBlogTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getBlogsReports({ newSearchWord: '', page: currentPage });
    }, []);
    const getBlogsReports = async ({
        newSearchWord,
        page
    }: {
        newSearchWord: string;
        page: number;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getReport({ page: page, pageSize: 10, reportType: ReportType.BLOG });
            setBlogs(
                res.blogReported?.map(e => {
                    return {
                        blogId: e.ReportBlog?.blogId ?? '',
                        id: e.ReportBlog?.id ?? '',
                        name: e.ReportBlog?.user.username ?? '',
                        text: e.messageReport ?? '',
                        username: e.ReportBlog?.user.username ?? ''
                    };
                }) ?? []
            );
            setTotalPageCount(res.totalBlogReported ?? 0);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getBlogsReports({ newSearchWord: searchWord, page: index });
    };
    return (
        <div>
            <ReportsViewHeader
                onFieldChanged={value => {
                    setSearchWord(value);
                    getBlogsReports({ page: currentPage, newSearchWord: value });
                }}
                title="Blogs"
                searchWord={searchWord}
            />
            <ManageState
                empty={blogs.length == 0}
                error={error}
                errorAndEmptyCallback={() => {
                    getBlogsReports({
                        newSearchWord: searchWord,
                        page: currentPage
                    });
                }}
                loading={loading}
                loadedState={
                    <ReportBlogTable
                        blogs={blogs}
                        pageCount={totalPageCount / pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        deleteBlogsButtonClicked={blog => {}}
                    />
                }
            />
        </div>
    );
};
export default BlogsTab;
