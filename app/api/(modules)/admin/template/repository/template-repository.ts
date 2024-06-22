import { db } from '@/app/api/core/db/db';
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
            throw new Error('please choose another name ');
        }
        const newTemplate = await db.tamblate.create({
            data: {
                imageTemplate: payload.imageTemplate,
                nameTemplate: payload.nameTemplate
            }
        });
        return newTemplate;
    }

    static async uploadImage(payload: { base64: string; fileName: string }) {
        try {
            const { base64, fileName } = payload;
            if (!base64 || !fileName) {
                throw new Error('No base64 string or file name provided');
            }

            // Remove the base64 prefix if exists
            const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const uploadDir = join(process.cwd(), 'public', 'uploads');
            const filePath = join(uploadDir, fileName);

            await mkdir(uploadDir, { recursive: true });

            await writeFile(filePath, buffer);

            console.log('File received:', fileName);

            const url = join('/uploads', fileName);

            return url;
        } catch (error) {
            throw new Error('Error during file upload');
        }
    }
}
export default TemplateRepository;
