import { db } from '@/app/api/core/db/db';
import GlobalUtils from '@/app/utils/global-utils';
import { CreateUserInput } from '../types';

class UsersRepository {
    static async find(args: any) {
        return await db.user.findUnique({
            where: {
                ...args
            },
            include: {
                PlanSubscription: {
                    include: {
                        plan: true
                    }
                }
            }
        });
    }
    static async getMyInfo(userId: string) {
        const myinfo = await db.user.findUnique({
            where: { id: userId },
            include: {
                PlanSubscription: {
                    include: {
                        plan: {
                            include: {
                                FeaturePlan: true
                            }
                        }
                    }
                }
            }
        });
        if (!myinfo) {
            throw new Error('user not found ');
        }
        return myinfo;
    }
    static async getUserDetails(payload: { userId: string }) {
        const userDetails = await db.user.findUnique({
            where: { id: payload.userId }
        });
        if (!userDetails) {
            throw new Error('user not found ');
        }
        return userDetails;
    }
    static async completeMyInfo(payload: { imagePath?: string, bio?: string, position?: string }, userId: string) {

        const existingUser = await db.user.findUnique({
            where: { id: userId }
        });
        if (!existingUser) {
            throw new Error('user not found');
        }
        if (payload.imagePath == null) {
            payload.imagePath = existingUser.userImage ?? ""
        }
        return await db.user.update({
            data: {
                userImage: payload.imagePath,
                bio: payload.bio,
                position: payload.position

            },
            where: {
                id: userId
            }
        });

    }

    // plan ,  lab , class 
    // get all plan (edit) 

    static async create(payload: CreateUserInput, planId?: string) {
        const requestedPlan = GlobalUtils.isNullOrUndefined(planId)
            ? await db.plan.findFirst({
                where: {
                    price: -1
                }
            })
            : await db.plan.findUnique({
                where: {
                    id: planId
                }
            });
        if (!requestedPlan) throw new Error('Cannot find requested plan');
        return await db.user.create({
            data: {
                username: payload.username,
                password: payload.password,
                role: payload.role,
                email: payload.email,
                PlanSubscription: {
                    create: {
                        planId: requestedPlan.id as string
                    }
                }
            },
            include: {
                PlanSubscription: {
                    include: {
                        plan: true
                    }
                }
            }
        });
    }
}
export default UsersRepository;
