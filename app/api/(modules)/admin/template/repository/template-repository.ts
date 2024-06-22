import { db } from "@/app/api/core/db/db";
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

class TemplateRepository {
    static async addTemplate(payload: { nameTemplate: string; imageTemplate: string }) {
        const newLab = await db.lab.create({
            data: {
                jsonFile: "",
            }
        });

        const existingTemplate = await db.tamblate.findUnique({
            where: {
                nameTemplate: payload.nameTemplate
            }
        });
        if (existingTemplate) {
            throw new Error("please choose another name");
        }
        const defaultJsonPath = join(process.cwd(), 'public', 'lab', 'default.json');
        const uploadDir = join(process.cwd(), 'public', 'lab');
        const newJsonFilePath = join(uploadDir, `${payload.nameTemplate}.json`);
        const defaultJsonContent = await readFile(defaultJsonPath, 'utf-8');
        await mkdir(uploadDir, { recursive: true });
        await writeFile(newJsonFilePath, defaultJsonContent);
        const newTemplate = await db.tamblate.create({
            data: {
                imageTemplate: payload.imageTemplate,
                nameTemplate: payload.nameTemplate,
                labId: newLab.id
            }
        });
        await db.lab.update({
            where: {
                id: newLab.id
            },
            data: {
                jsonFile: newJsonFilePath
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

            const uploadDir = join(process.cwd(), 'public', 'uploads', "images");
            const randomName = randomBytes(16).toString('hex');
            const extension = file.name.split('.').pop();
            const fileName = `${randomName}.${extension}`;

            const filePath = join(uploadDir, fileName);

            await mkdir(uploadDir, { recursive: true });

            await writeFile(filePath, buffer);

            console.log('File received:', file);

            const url = join('/uploads', fileName);

            return url;

        } catch (error) {
            throw new Error("Error during file upload");
        }
    }
}
export default TemplateRepository;



