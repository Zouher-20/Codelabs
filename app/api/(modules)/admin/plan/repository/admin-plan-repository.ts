import { db } from '@/app/api/core/db/db';
import { NAMEPLAN } from '@prisma/client';

class AdminPlanRepository {
    static async createPlan(payload: {
        subtitle: string;
        duration: string;
        price: number;
        featurePlans: { name: NAMEPLAN; value: number }[];
        name: string;
    }) {
        const newPlan = await db.plan.create({
            data: {
                duration: payload.duration,
                subtitle: payload.subtitle,
                price: payload.price,
                name: payload.name,
                FeaturePlan: {
                    create: payload.featurePlans.map(feature => ({
                        name: feature.name,
                        value: feature.value
                    }))
                }
            },
            include: {
                FeaturePlan: true
            }
        });

        return newPlan;
    }

    static async getPlan() {
        const myPlans = await db.plan.findMany({
            include: {
                FeaturePlan: true
            }
        });

        return myPlans;
    }
    static async deletePlan(payload: { planId: string }) {
        const plan = await db.plan.findUnique({
            where: {
                id: payload.planId
            }
        });
        if (!plan) {
            throw new Error('Plan is not found');
        }
        await db.plan.delete({
            where: {
                id: plan.id
            }
        });
    }
}

export default AdminPlanRepository;
