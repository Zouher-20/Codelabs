'use server';

import { getSession } from '@/app/api/(modules)/auth/service/actions';
import BlogRepository from '@/app/api/(modules)/blog/repository/blog-repository';
import {
    AddAndDeleteStarBlogInput,
    AddBlogCommentInput,
    AddBlogInput,
    DeleteMyBlogInput,
    DeleteMyCommentInBlogInput,
    EditBlogInput,
    GetAllBlogs,
    GetBlogByCreatedAtInput,
    GetCommentBlogInput,
    GetDetailsBlogInput,
    GetTrendingBlogInput,
    getMyBlogInput,
    uploadImageInput
} from '@/app/api/(modules)/blog/type';
import exp from 'constants';

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
    const session = await getSession();
    const userId = session?.id
    return BlogRepository.getBlogByCreatedAt(payload, userId);
};
export const getTrendingBlog = async (payload: GetTrendingBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.getTrendingBlog(payload, userId);
};
export const getAllBlog = async (payload: GetAllBlogs) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.getAllBlog(payload, userId);
};

export const getDetailsBlog = async (payload: GetDetailsBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.getDetailsBlog(payload, userId);
};

export const addBlogComment = async (payload: AddBlogCommentInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.addBlogComment(payload, userId);
};

export const getCommentBlog = async (payload: GetCommentBlogInput) => {
    return BlogRepository.getCommentBlog(payload);
}

export const addAndDeleteStarBlog = async (payload: AddAndDeleteStarBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.addAndDeleteStarBlog(payload, userId);
}

export const deleteMyCommentInBlog = async (payload: DeleteMyCommentInBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.deleteMyCommentInBlog(payload, userId);
}
export const getMyBlog = async (payload: getMyBlogInput) => {
    const session = await getSession();
    const userId = session?.id;
    return BlogRepository.getMyBlogs(payload, userId);
}