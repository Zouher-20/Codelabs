'use server';
import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import { challengeDetailsInput, deleteChallengeInput, getLabsInChallengeInput } from '../../types';
import AdminChallengeRepository from '../repository/admin-challenge-repositoy';

export const getDetailsChallenge = async (payload: challengeDetailsInput) => {
    const session = await getSession();
    const userId = session?.id;
    return AdminChallengeRepository.getDetailsChallenge(payload, userId);
};

export const getAllLabInChallengeDetails = async (payload: getLabsInChallengeInput) => {
    return AdminChallengeRepository.getAllLabInChallengeDetails(payload);
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
