import { ROLE } from "@prisma/client";
import { getSession } from "../../../auth/service/actions";
import { DeleteTemplateInput, addTemplateInput, getAllTemplateInput, uploadTemplateImageInput } from "../../types";
import TemplateRepository from "../repository/template-repository";

export const uploadImage = async (payload: uploadTemplateImageInput) => {

    return TemplateRepository.uploadImage(payload);

};

export const addTemplate = async (payload: addTemplateInput) => {
    const session = await getSession();
    const role = session?.role;
    if (role == ROLE.ADMIN) {
        return TemplateRepository.addTemplate(payload);
    }
    else {
        throw new Error("you are dont admin");
    }
};
export const getAllTemplate = async (payload: getAllTemplateInput) => {

    return TemplateRepository.getAllTemplate(payload);

};

export const deletTemplate = async (payload: DeleteTemplateInput) => {
    const session = await getSession();
    const role = session?.role;
    if (role == ROLE.ADMIN) {
        return TemplateRepository.deleteTemplate(payload);
    }
    else {
        throw new Error("you are dont admin");
    }
};

