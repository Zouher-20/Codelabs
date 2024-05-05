'use server';

import { ProjectInput } from '../../types';
import AdminProjectRepository from '../repository/admin-project-repository';

export const getlab = async (payload: ProjectInput) => {
    return AdminProjectRepository.getUserProjects(payload);
};
