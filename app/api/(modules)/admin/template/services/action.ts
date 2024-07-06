'use server';
import { ROLE } from '@prisma/client';
import { getSession } from '../../../auth/service/actions';
import {
    DeleteTemplateInput,
    addTemplateInput,
    getAllTemplateInput,
    uploadTemplateImageInput
} from '../../types';
import TemplateActionRepostiory from '../repository/action-repository';
import TemplateRepository from '../repository/template-repository';

export const uploadImage = async (payload: uploadTemplateImageInput) => {
    return TemplateRepository.uploadImage(payload);
};

export const addTemplate = async (payload: addTemplateInput) => {
    const session = await getSession();
    const role = session?.role;
    if (role == ROLE.ADMIN) {
        return TemplateRepository.addTemplate(payload);
    } else {
        throw new Error('you are dont admin');
    }
};
export const getAllTemplate = async (payload: getAllTemplateInput) => {
    return TemplateActionRepostiory.getAllTemplate(payload);
};

export const deletTemplate = async (payload: DeleteTemplateInput) => {
    const session = await getSession();
    const role = session?.role;
    if (role == ROLE.ADMIN) {
        return TemplateActionRepostiory.deleteTemplate(payload);
    } else {
        throw new Error('you are dont admin');
    }
};
