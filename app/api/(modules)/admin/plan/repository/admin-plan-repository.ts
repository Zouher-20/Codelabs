import { db } from '@/app/api/core/db/db';
import { NAMEPLAN } from '@prisma/client';

class AdminPlanRepository {
    static async createPlan(payload: {
        title: string;
        subtitle: string;
        endAt: Date;
        price: number;
        featurePlans: { name: NAMEPLAN; value: number }[];
        name: string;
    }) {
        const newPlan = await db.plan.create({
            data: {
                title: payload.title,
                endAt: payload.endAt,
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
}

export default AdminPlanRepository;
