import {
    getAllBlog,
    getBlogByCreatedAt,
    getMyBlog,
    getTrendingBlog
} from '@/app/api/(modules)/blog/services/action';
import toast from 'react-hot-toast';

export const getBlogs = async (
    currentTab: string,
    page: number,
    pageSize: number,
    blogTitle?: string
) => {
    try {
        let data;
        if (currentTab == 'Blogs') data = await getAllBlog({ page, pageSize, blogTitle });
        else if (currentTab == 'Trending Blogs')
            data = await getTrendingBlog({ page, pageSize, blogTitle });
        else if (currentTab == 'My Blogs') data = await getMyBlog({ page, pageSize, blogTitle });
        else data = await getBlogByCreatedAt({ page, pageSize, blogTitle });
        return data.projects;
    } catch (err: any) {
        toast.error(err.message);
    }
};
