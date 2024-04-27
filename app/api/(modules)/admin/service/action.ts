import { ROLE } from '@prisma/client';
import { getSession } from '../../auth/service/actions';
import AdminRepository from '../repository/admin-repository';
import { TagPaginationInput, UsersPaginationInput } from '../types';

export const findUsers = async (payload: UsersPaginationInput) => {
    try {
        const { page, pageSize, searchWord, date, args } = payload;
        const session = await getSession();

        if (session?.role === ROLE.ADMIN) {
            let args = {};
            if (searchWord && date) {
                args = {
                    AND: [
                        {
                            OR: [
                                { email: { contains: searchWord } },
                                { username: { contains: searchWord } }
                            ]
                        },
                        { createdAt: date }
                    ]
                };
            } else if (searchWord) {
                args = {
                    OR: [
                        { email: { contains: searchWord } },
                        { username: { contains: searchWord } }
                    ]
                };
            } else if (date) {
                args = { createdAt: date };
            }

            return AdminRepository.findManyUser(payload);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (err) {
        console.error('An error occurred:', err);
        throw new Error('An error occurred while fetching users.');
    }
};
export const addTag = async (tag: string) => {
    try {
        return AdminRepository.addTag(tag);
    } catch (err) {
        console.error('An error occurred:', err);
        throw new Error('An error occurred while adding a tag.');
    }
};
export const getTag = async (payload: TagPaginationInput) => {
    try {
        const { page = 1, pageSize = 10, tagName } = payload;
        return AdminRepository.findManyTag(payload);
    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('An error occurred while futching a tag.');
    }
};
