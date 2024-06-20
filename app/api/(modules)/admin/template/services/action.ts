import { ROLE } from "@prisma/client";
import { getSession } from "../../../auth/service/actions";
import { addTemplateInput, uploadTemplateImageInput } from "../../types";
import TemplateRepository from "../repository/template-repository";

export const uploadImage = async (payload: uploadTemplateImageInput) => {
    const session = await getSession();
    const role = session?.role;
    if (role == ROLE.ADMIN) {
        return TemplateRepository.uploadImage(payload);
    }
    else {
        throw new Error("you are dont admin");
    }
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
