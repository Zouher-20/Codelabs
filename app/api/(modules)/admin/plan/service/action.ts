import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import { PlanInput } from '../../types';
import AdminPlanRepository from '../repository/admin-plan-repository';

export const getChallenge = async (payload: PlanInput) => {
    const { title, subtitle, endAt, price, featurePlans } = payload;
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminPlanRepository.createPlan(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};
