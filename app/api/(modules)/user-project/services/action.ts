'use server';

import { getSession } from '../../auth/service/actions';
import UserProjectRepository from '../repository/user-project-repository';
import { UserProjectInput } from '../types';

export const addUserProject = async (payload: UserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.addUserProjectLab(payload, userId);
};
