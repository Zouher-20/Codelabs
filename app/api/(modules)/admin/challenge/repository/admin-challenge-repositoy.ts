import { db } from '@/app/api/core/db/db';

class AdminChallengeRepository {
    static async getDetailsChallenge(payload: {
        page: number;
        pageSize: number;
        challengeId: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        const challenge = await db.challenge.findUnique({
            where: {
                id: payload.challengeId
            },
            include: {
                ChallengeParticipation: true,
                TagMorph: {
                    include: {
                        tag: true
                    }
                }
            }
        });

        const labs = await db.challengeParticipation.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                challengeId: payload.challengeId
            },
            include: {
                Lab: true
            }
        });

        const tags = await db.tagMorph.findMany({
            where: {
                challengeId: payload.challengeId
            },
            include: {
                tag: true
            }
        });

        return { challenge, labs, tags };
    }
    static async deleteChallenge(payload: { challengeId: string[] }) {
        const hasChallenge = await db.challenge.findMany({
            where: {
                id: {
                    in: payload.challengeId
                }
            }
        });

        if (hasChallenge.length === 0) {
            throw new Error('Challenge is not found.');
        }

        await db.challenge.deleteMany({
            where: {
                id: {
                    in: payload.challengeId
                }
            }
        });
    }
}

export default AdminChallengeRepository;