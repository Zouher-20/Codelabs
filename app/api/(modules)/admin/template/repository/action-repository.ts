import { db } from "@/app/api/core/db/db";

class TemplateActionRepostiory {
    static async deleteTemplate(payload: {
        templateId: string
    }) {
        const template = await db.tamblate.findUnique({
            where: {
                id: payload.templateId
            }
        });

        if (!template) {
            throw new Error('template not found');
        }
        return await db.tamblate.delete({
            where: {
                id: payload.templateId
            }
        });
    }

    static async getAllTemplate(payload: {
        pageSize: number;
        page: number;
        searchWord?: string
    }) {
        const skip = (payload.page - 1) * payload.pageSize;
        const templates = await db.tamblate.findMany({
            include: {
                lab: true
            },
            where: {
                nameTemplate: { contains: payload.searchWord, mode: "insensitive" }
            },
            skip: skip,
            take: payload.pageSize
        });
        const templateCount = await db.tamblate.count(
            {
                where: {
                    nameTemplate: payload.searchWord
                }
            }
        );
        return {
            templates: templates,
            templateCount: templateCount
        }
    }

}
export default TemplateActionRepostiory;