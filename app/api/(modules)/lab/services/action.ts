'use server';
import { getSession } from '../../auth/service/actions';
import LabRepository from '../repository/lab-repository';
import { SaveCodeLabInput } from '../type';

export const saveCodeLab = async (payload: SaveCodeLabInput) => {
    const session = await getSession();
    const userId = session?.id;
    return LabRepository.saveCodeLab(payload, userId);
};

export const getLabById = async (payload: string) => {
    return LabRepository.getLab(payload);
};
