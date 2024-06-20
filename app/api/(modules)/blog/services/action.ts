'use server';

import { getSession } from '@/app/api/(modules)/auth/service/actions';
import BlogRepository from '@/app/api/(modules)/blog/repository/blog-repository';
import {
    AddBlogInput,
    DeleteMyBlogInput,
    EditBlogInput,
    GetAllBlogs,
    GetBlogByCreatedAtInput,
    GetDetailsBlogInput,
    GetTrendingBlogInput,
    uploadImageInput
} from '@/app/api/(modules)/blog/type';

export const addBlog = async (payload: AddBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.addBlog(payload, userId);
};
export const editBlog = async (payload: EditBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.editBlog(payload, userId);
};
export const deleteMyBlog = async (payload: DeleteMyBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.deleteMyBlog(payload, userId);
};
export const getBlogByCreatedAt = async (payload: GetBlogByCreatedAtInput) => {
    return BlogRepository.getBlogByCreatedAt(payload);
};
export const getTrendingBlog = async (payload: GetTrendingBlogInput) => {
    return BlogRepository.getTrendingBlog(payload);
};
export const getAllBlog = async (payload: GetAllBlogs) => {
    return BlogRepository.getAllBlog(payload);
};

export const getDetailsBlog = async (payload: GetDetailsBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.getDetailsBlog(payload, userId);
};

export const uploadImage = async (payload: uploadImageInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.uploadImage(payload);
};
