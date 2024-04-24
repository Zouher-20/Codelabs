import { db } from '@/app/api/core/db/db';
import { CreateUserInput } from '../types';

class UsersRepository {
    static async find(args: any) {
        return await db.user.findUnique({
            where: {
                ...args
            }
        });
    }

    static async create(payload: CreateUserInput) {
        return await db.user.create({
            data: {
                username: payload.username,
                password: payload.password,
                role: payload.role,
                email: payload.email
            }
        });
    }
}
export default UsersRepository;
