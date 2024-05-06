'use server';

import { deleteMyCommentUserProjectLabInput } from '@/app/api/(modules)/admin/types';
import { getSession } from '../../auth/service/actions';
import UserProjectRepository from '../repository/user-project-repository';
import {
    AddAndDeleteStarUserProjectInput,
    AddCommentUserProjectLabInput,
    DeleteMyUserProjectInput,
    GetCommentUserProjectLabInput,
    GetDetailsUserProjectLabInput,
    GetUserProjectInput,
    UserProjectInput,
    userProjectStaredInput
} from '../types';

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
export const addCommentUserProjectLab = async (payload: AddCommentUserProjectLabInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.addCommentUserProjectLab(payload, userId);
};

export const getDetailsUserProjectLab = async (payload: GetDetailsUserProjectLabInput) => {
    return UserProjectRepository.getDetailsUserProjectLab(payload);
};
export const getCommentUserProjectLab = async (payload: GetCommentUserProjectLabInput) => {
    return UserProjectRepository.getCommentUserProjectLab(payload);
};

export const deleteMyCommentUserProjectLab = async (
    payload: deleteMyCommentUserProjectLabInput
) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.deleteMyCommentUserProjectLab(payload, userId);
};

export const addAndDeleteStarUserProjectLab = async (payload: AddAndDeleteStarUserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.addAndDeleteStarUserProjectLab(payload, userId);
};

export const deleteMyUserProjectLab = async (payload: DeleteMyUserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.deleteMyUserProjectLab(payload, userId);
};

export const getStarredUserProjects = async (payload: userProjectStaredInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.getStarredUserProjects(payload, userId);
};
