'use server';

import { ROLE } from '@prisma/client';
import { getSession } from '../../auth/service/actions';
import AdminRepository from '../repository/admin-repository';
import {
    ChallengeInput,
    ChallengePaginationInput,
    TagPaginationInput,
    UsersPaginationInput,
    deleteUserInput
} from '../types';

export const findUsers = async (payload: UsersPaginationInput) => {
    try {
        const { page, pageSize, searchWord, date } = payload;
        const session = await getSession();
        if (session?.role === ROLE.ADMIN) {
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
        const session = await getSession();

        if (session?.role === ROLE.ADMIN) {
            return AdminRepository.addTag(tag, null);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (err) {
        console.error('An error occurred:', err);
        throw new Error('An error occurred while adding a tag.');
    }
};
export const getTag = async (payload: TagPaginationInput) => {
    try {
        const { page, pageSize, tagName } = payload;
        const session = await getSession();

        if (session?.role === ROLE.ADMIN) {
            return AdminRepository.findManyTag(payload);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('An error occurred while futching a tag.');
    }
};

export const getChallengeDifficult = async () => {
    try {
        const session = await getSession();
        if (session?.role === ROLE.ADMIN) {
            return AdminRepository.getDifficultChallenge();
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('An error occurred while fetching a type challenge.');
    }
};

export const addChallenge = async (payload: ChallengeInput) => {
    try {
        const session = await getSession();
        if (session?.role === ROLE.ADMIN) {
            return AdminRepository.addChallenge(payload);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('An error occurred while adding a challenge.');
    }
};

export const getChallenge = async (payload: ChallengePaginationInput) => {
    try {
        const { page, pageSize, name, challengeType } = payload;
        const session = await getSession();
        if (session?.role === ROLE.ADMIN) {
            return AdminRepository.findManyChallenge(payload);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('An error occurred while fetching challenges.');
    }
};

export const deleteUser = async (payload: deleteUserInput) => {
    try {
        const { userId } = payload;
        const session = await getSession();
        if (session?.role === ROLE.ADMIN) {
            return AdminRepository.deleteUser(payload);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('An error occurred while deleting user.');
    }
};
