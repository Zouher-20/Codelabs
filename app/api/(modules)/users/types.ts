import { ROLE } from '@prisma/client';

export interface CreateUserInput {
    email: string;
    password: string;
    role: ROLE;
    username: string;
}
