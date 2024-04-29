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

    static async create(payload: CreateUserInput, planId?: string) {
        const requestedPlan = GlobalUtils.isNullOrUndefined(planId)
            ? await db.plan.findFirst({
                  where: {
                      price: 0
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
