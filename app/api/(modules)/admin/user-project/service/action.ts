'use server';

import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import { ProjectInput } from '../../types';
import AdminProjectRepository from '../repository/admin-project-repository';

export const getlab = async (payload: ProjectInput) => {
    const { tagName, nameLab, pageSize, page } = payload;
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminProjectRepository.getUserProjects(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};
