import { db } from '@/app/api/core/db/db';

class AdminRepository {
    static async findManyUser(page: number, pageSize: number, args: any) {
        const skip = (page - 1) * pageSize;
        const users = await db.user.findMany({
            take: pageSize,
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
