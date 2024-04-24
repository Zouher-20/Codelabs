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
}

export default AdminRepository;
