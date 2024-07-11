'use server';
import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import { ChallengeInput, challengeDetailsInput, deleteChallengeInput, getLabsInChallengeInput } from '../../types';
import AdminChallengeRepository from '../repository/admin-challenge-repositoy';

export const getDetailsChallenge = async (payload: challengeDetailsInput) => {
    const session = await getSession();
    const userId = session?.id;
    return AdminChallengeRepository.getDetailsChallenge(payload);
};

export const getAllUserProjectsInChallengeDetails = async (payload: getLabsInChallengeInput) => {
    return AdminChallengeRepository.getAllUserProjectsInChallengeDetails(payload);
};
export const deleteChallenge = async (payload: deleteChallengeInput) => {
    const { challengeId } = payload;
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminChallengeRepository.deleteChallenge(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};

export const addChallenge = async (payload: ChallengeInput) => {
    try {
        const session = await getSession();
        if (session?.role === ROLE.ADMIN) {
            return AdminChallengeRepository.addChallenge(payload);
        } else {
            throw new Error('Access denied: You are not an admin.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('An error occurred while adding a challenge.');
    }
};
