import { getAllBlog, getBlogByCreatedAt, getTrendingBlog } from "@/app/api/(modules)/blog/services/action";
import { blogTableType } from "./components/table/blog-table";
import toast from "react-hot-toast";

export const GetBlogs = async (filter: string, debouncedSearch?: string) => {
    let res;
    try {
        if (filter == 'All Blogs') res = await getAllBlog({
            blogTitle: debouncedSearch ? debouncedSearch : '',
            blogContent: debouncedSearch ? debouncedSearch : '',
            page: 1, pageSize: 100
        });
        else if (filter == 'Trending Blogs') res = await getTrendingBlog({
            blogTitle: debouncedSearch ? debouncedSearch : '',
            blogContent: debouncedSearch ? debouncedSearch : '',
            page: 1, pageSize: 100
        });
        else res = await getBlogByCreatedAt({
            blogTitle: debouncedSearch ? debouncedSearch : '',
            blogContent: debouncedSearch ? debouncedSearch : '',
            page: 1, pageSize: 100
        });
        return (res.projects as blogTableType[])
    } catch (error: any) {
        toast.error(error.message);
    }
};