'use server';
import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import { challengeDetailsInput, deleteChallengeInput } from '../../types';
import AdminChallengeRepository from '../repository/admin-challenge-repositoy';

export const getDetailsChallenge = async (payload: challengeDetailsInput) => {
    const { page, pageSize, challengeId } = payload;
    const session = await getSession();
    return AdminChallengeRepository.getDetailsChallenge(payload);
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
