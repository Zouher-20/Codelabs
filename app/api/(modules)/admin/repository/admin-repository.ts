import { db } from '@/app/api/core/db/db';
import { DIFFICULTTYPE } from '@prisma/client';

class AdminRepository {
    static async findManyUser(payload: {
        page: number;
        pageSize: number;
        searchWord?: string;
        date?: Date;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        let args = {};
        if (payload.searchWord && payload.date) {
            args = {
                AND: [
                    {
                        OR: [
                            { email: { contains: payload.searchWord } },
                            { username: { contains: payload.searchWord } }
                        ]
                    },
                    { createdAt: payload.date }
                ]
            };
        } else if (payload.searchWord) {
            args = {
                OR: [
                    { email: { contains: payload.searchWord } },
                    { username: { contains: payload.searchWord } }
                ]
            };
        } else if (payload.date) {
            args = { createdAt: payload.date };
        }
        const users = await db.user.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                ...args
            }
        });
        const userCount = await db.user.count();
        return {
            user: { users },
            userCount: userCount
        };
    }

    static async findManyTag(payload: { page: number; pageSize: number; tagName?: string }) {
        const skip = (payload.page - 1) * payload.pageSize;
        const tags = await db.tag.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                tagename: { contains: payload.tagName }
            }
        });
        return {
            tags
        };
    }

    static async addTag(tag: string) {
        const existingTag = await db.tag.findUnique({
            where: {
                tagename: tag
            }
        });

        if (existingTag) {
            throw new Error('Tag already exists.');
        }

        const newTag = await db.tag.create({
            data: {
                tagename: tag
            }
        });

        return newTag;
    }

    static async findManyChallenge(payload: {
        page: number;
        pageSize: number;
        tagName?: string;
        challengeType?: DIFFICULTTYPE;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        let where = {};

        if (payload.tagName || payload.challengeType) {
            const filter: any = {};

            if (payload.tagName) {
                filter.tagMorph = { some: { tag: { tagename: payload.tagName } } };
            }

            if (payload.challengeType) {
                filter.difficulty = payload.challengeType;
            }

            where = { ...where, ...filter };
        }

        const challenges = await db.challenge.findMany({
            take: payload.pageSize,
            skip: skip,
            where,
            include: {
                ChallengeParticipation: true,
                broketag: {
                    include: {
                        tag: true
                    }
                }
            }
        });

        const challengeCount = await db.challenge.count(where);

        return {
            challenges,
            challengeCount
        };
    }
    static async getDifficultChallenge() {
        const typeChallenge = Object.values(DIFFICULTTYPE);
        return typeChallenge;
    }

    static async deleteUser(payload: { userId: string }) {
        const requestingUser = await db.user.findUnique({
            where: {
                id: payload.userId
            }
        });
        if (!requestingUser) {
            throw new Error('User not found');
        }
        await db.user.deleteMany({
            where: {
                id: payload.userId
            }
        });
    }
}

export default AdminRepository;
