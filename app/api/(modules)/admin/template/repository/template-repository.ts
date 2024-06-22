import { db } from "@/app/api/core/db/db";
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'path';
class TemplateRepository {
    static async addTemplate(payload: { nameTemplate: string; imageTemplate: string }) {

        const existsingTemplate = await db.tamblate.findUnique({
            where: {
                nameTemplate: payload.nameTemplate
            }
        });
        if (existsingTemplate) {
            throw new Error("please choose another name ");
        }
        const newTemplate = await db.tamblate.create({
            data: {
                imageTemplate: payload.imageTemplate,
                nameTemplate: payload.nameTemplate
            }
        });
        return newTemplate;
    }

    static async uploadImage(payload: { file: File }) {
        try {
            const { file } = payload;
            if (!file) {
                throw new Error("No file uploaded");
            }
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads');
            const filePath = join(uploadDir, file.name);

            await mkdir(uploadDir, { recursive: true });

            await writeFile(filePath, buffer);

            console.log('File received:', file);

            const url = join('/uploads', file.name);

            return url;

        } catch (error) {
            throw new Error("Error during file upload");
        }
    }
}
export default TemplateRepository;



