import { db } from '@/app/api/core/db/db';

class AdminRepository {
    static async findManyUser(payload: {
        page: number;
        pageSize: number;
        searchWord?: string;
        date?: Date;
        args: any;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;
        const users = await db.user.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                ...payload.args
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
}

export default AdminRepository;
