'use server';

import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import { DeleteUserProjectInput, ProjectInput } from '../../types';
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

export const deleteUserProjectAdmin = async (payload: DeleteUserProjectInput) => {
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminProjectRepository.deleteUserProjectLab(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};
