import { ROLE } from '@prisma/client';
import { getSession } from '../../auth/service/actions';
import AdminRepository from './../repository/admin-repository';
export default interface paginationInput {
    page?: number;
    pageSize?: number;
    searchWord?: string;
    date?: Date;
}

export const findUsers = async (req: paginationInput) => {
    try {
        const { page, pageSize, searchWord, date }: paginationInput = req;
        // AdminValidator.userPaginationValidator(req);
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
                args = {
                    createdAt: date
                };
            }

            return AdminRepository.findManyUser(page ?? 1, pageSize ?? 10, args);
        } else {
            throw { message: 'you are not admin ' };
        }
    } catch (err) {
        console.log('Asdgsdgs');
        console.log(err);
        throw { message: 'there is an  error' };
    }
};
