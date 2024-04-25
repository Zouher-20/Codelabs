import { ROLE } from '@prisma/client';
import { getSession } from '../../auth/service/actions';
import AdminRepository from '../repository/admin-repository';

export default interface PaginationInput {
    page?: number;
    pageSize?: number;
    searchWord?: string;
    date?: Date;
}

export const findUsers = async (req: Request) => {
    try {
        const body = await req.json();

        const { page = 1, pageSize = 10, searchWord, date }: PaginationInput = body;
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

            return AdminRepository.findManyUser(page, pageSize, args);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (err) {
        console.error('An error occurred:', err);
        throw new Error('An error occurred while fetching users.');
    }
};
