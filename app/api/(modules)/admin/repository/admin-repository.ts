import { db } from '@/app/api/core/db/db';
import { TAGTYPE } from '@prisma/client';

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
        const userCount = await db.user.count({
            where: {
                ...args
            }
        });
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

    static async addTag(tag: string, tagType: TAGTYPE | null) {
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
                tagename: tag,
                tagtype: tagType ?? TAGTYPE.normal
            }
        });

        return newTag;
    }
}

export default AdminRepository;
