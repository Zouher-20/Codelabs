import { db } from '@/app/api/core/db/db';
import { NAMEPLAN } from '@prisma/client';

class ClassRoomRepository {
    static async addClassRoom(
        payload: {
            name?: string;
            description?: string;
            type?: string;
        },
        userId: string
    ) {
        // Check if the user has a plan subscription
        const countMyClassRoom = await db.classRom.count({
            where: {
                MemberClass: {
                    some: {
                        userId: userId
                    }
                }
            }
        });

        const userPlan = await db.planSubscription.findUnique({
            where: {
                userId: userId
            },
            include: {
                plan: {
                    include: {
                        FeaturePlan: true
                    }
                }
            }
        });

        if (!userPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const hasLabsPlan = userPlan.plan.FeaturePlan.some(
            featurePlan => featurePlan.name === NAMEPLAN.classes
        );

        if (hasLabsPlan && countMyClassRoom < userPlan.plan.FeaturePlan[0].value) {
            const newClassRoom = await db.classRom.create({
                data: {
                    name: payload.name ?? '',
                    description: payload.description ?? '',
                    type: payload.type ?? '',
                    MemberClass: {
                        create: {
                            userId: userId,
                            isTeacher: true
                        }
                    }
                }
            });
            return newClassRoom;
        } else {
            throw new Error('User does not have access to create more classRoom.');
        }
    }
}
export default ClassRoomRepository;
