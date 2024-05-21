import { getAllBlog, getBlogByCreatedAt, getTrendingBlog } from "@/app/api/(modules)/blog/services/action"

import {
    AddBlogInput,
    DeleteMyBlogInput,
    EditBlogInput,
    GetAllBlogs,
    GetBlogByCreatedAtInput,
    GetTrendingBlogInput
} from '@/app/api/(modules)/blog/type';
import toast from "react-hot-toast";

export const getBlogs = async (payload: GetAllBlogs) => {
    try {
        const data = await getAllBlog(payload)
        return data.projects
    } catch (err: any) {
        toast.error(err.message)
    }
}

export const getTrending = async (payload: GetTrendingBlogInput) => {
    try {
        const data = await getTrendingBlog(payload)
        return data.projects
    } catch (err: any) {
        toast.error(err.message)
    }
}
export const getLatest = async (payload: GetBlogByCreatedAtInput) => {
    try {
        const data = await getBlogByCreatedAt(payload)
        return data.projects
    } catch (err: any) {
        toast.error(err.message)
    }
}