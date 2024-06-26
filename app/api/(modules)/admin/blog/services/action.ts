"use server";
import AdminBlogRepository from '@/app/api/(modules)/admin/blog/repository/admin-blog-repository';
import { deleteAnyBlogInput } from '@/app/api/(modules)/admin/types';
import { getSession } from '@/app/api/(modules)/auth/service/actions';
import { ROLE } from '@prisma/client';

export const deleteChallenge = async (payload: deleteAnyBlogInput) => {
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminBlogRepository.adminDeleteBlog(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};
