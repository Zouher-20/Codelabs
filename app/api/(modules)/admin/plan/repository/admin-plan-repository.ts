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
    static async editPlan(payload: {
        planId: string;
        subtitle: string;
        duration: string;
        price: number;
        featurePlans: { name: NAMEPLAN; value: number }[];
        name: string;
    }) {
        const existingPlan = await db.plan.findUnique({
            where: { id: payload.planId },
            include: { FeaturePlan: true }
        });

        if (!existingPlan) {
            throw new Error('Plan is not found');
        }

        const updateFeaturePlanPromises = payload.featurePlans.map(async feature => {
            const existingFeaturePlan = existingPlan.FeaturePlan.find(
                fp => fp.name === feature.name
            );
            if (existingFeaturePlan) {
                await db.featurePlan.update({
                    where: { id: existingFeaturePlan.id },
                    data: { value: feature.value }
                });
            } else {
                throw new Error(' Featuer Plan is not found');
            }
        });

        await Promise.all(updateFeaturePlanPromises);

        const updatedPlan = await db.plan.update({
            where: { id: payload.planId },
            data: {
                subtitle: payload.subtitle,
                duration: payload.duration,
                price: payload.price,
                name: payload.name
            }
        });

        return updatedPlan;
    }

    static async deletePlan(payload: { planId: string }) {
        const plan = await db.plan.findUnique({
            where: {
                id: payload.planId
            },
            include: { PlanSubscription: true }
        });
        if (!plan) {
            throw new Error('Plan is not found');
        }
        if (plan.PlanSubscription.length > 0) {
            throw new Error('Cannot delete plan with active subscriptions');
        }

        await db.plan.delete({
            where: {
                id: plan.id
            }
        });
    }
}

export default AdminPlanRepository;
