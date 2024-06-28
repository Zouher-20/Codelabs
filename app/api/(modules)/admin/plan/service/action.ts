'use server';

import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import { PlanInput, PlanPaginationInput, editPlanInput } from '../../types';
import AdminPlanRepository from '../repository/admin-plan-repository';

export const addPlan = async (payload: PlanInput) => {
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminPlanRepository.createPlan(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};

export const getPlan = async () => {
    return AdminPlanRepository.getPlan();
};
export const editPlan = async (payload: editPlanInput) => {
    const { subtitle, duration, price, featurePlans, planId, name } = payload;
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminPlanRepository.editPlan(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};
export const deletePlan = async (payload: PlanPaginationInput) => {
    const session = await getSession();
    if (session?.role === ROLE.ADMIN) {
        return AdminPlanRepository.deletePlan(payload);
    } else {
        throw new Error('Access denied: You are not an admin.');
    }
};
