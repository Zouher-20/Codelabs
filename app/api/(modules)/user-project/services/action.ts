'use server';

import { getSession } from '../../auth/service/actions';
import UserProjectRepository from '../repository/user-project-repository';
import { GetUserProjectInput, UserProjectInput } from '../types';

export const addUserProject = async (payload: UserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.addUserProjectLab(payload, userId);
};

export const getUserProjectsLab = async (payload: GetUserProjectInput) => {
    return UserProjectRepository.getUserProjectsLab(payload);
};

export const getTrendingUserProjectsLab = async (payload: GetUserProjectInput) => {
    return UserProjectRepository.getTrendingUserProjectsLab(payload);
};
