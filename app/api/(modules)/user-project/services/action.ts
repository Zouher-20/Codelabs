'use server';

import { deleteMyCommentUserProjectLabInput } from '@/app/api/(modules)/admin/types';
import { getSession } from '../../auth/service/actions';
import UserProjectRepository from '../repository/user-project-repository';
import {
    AddAndDeleteStarUserProjectInput,
    AddCommentUserProjectLabInput,
    CloneCodeFromUserProjectInput,
    DeleteMyUserProjectInput,
    GetCommentUserProjectLabInput,
    GetDetailsUserProjectLabInput,
    GetUserProjectInput,
    MyUserProjectInput,
    UserProjectInput,
    userProjectStaredInput
} from '../types';
import UserProjectActionRepository from '../repository/user-project-action-repository';

export const createUserProjectLabFromTemplate = async (payload: UserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectActionRepository.addUserProjectLab(payload, userId);
};
export const cloneLabFromUserProject = async (payload: CloneCodeFromUserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectActionRepository.cloneLabFromUserProject(payload, userId);
};


export const getUserProjectsLab = async (payload: GetUserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.getUserProjectsLab(payload, userId);
};

export const getTrendingUserProjectsLab = async (payload: GetUserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.getTrendingUserProjectsLab(payload, userId);
};
export const addCommentUserProjectLab = async (payload: AddCommentUserProjectLabInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.addCommentUserProjectLab(payload, userId);
};

export const getDetailsUserProjectLab = async (payload: GetDetailsUserProjectLabInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.getDetailsUserProjectLab(payload, userId);
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
export const getMyUserProject = async (payload: MyUserProjectInput) => {
    const session = await getSession();
    const userId = session?.id;
    return UserProjectRepository.getMyUserProjectsLab(payload, userId);
};
