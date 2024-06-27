import { db } from '@/app/api/core/db/db';
import { promises as fs } from 'fs';
import path from 'path';

class LabRepository {
    static async saveCodeLab(payload: { labId: string; codeJsonContents: string }) {
        const mylab = await db.lab.findUnique({
            where: {
                id: payload.labId
            }
        });

        if (!mylab) {
            throw new Error('Lab not found');
        }

        const userHasAccess = (mylab.UserProject && mylab.UserProject.userId === userId) ||
            (mylab.ChallengeParticipation && mylab.ChallengeParticipation.userId === userId) ||
            (mylab.ClassProject && mylab.ClassProject.memberClass && mylab.ClassProject.memberClass.userId === userId);


        if (!userHasAccess) {
            throw new Error('Access denied');
        }


        if (mylab.jsonFile == null) {
            throw new Error('no code found ');
        }

        const jsonFilePath = path.join(process.cwd(), 'public', mylab.jsonFile);

        try {
            await fs.writeFile(jsonFilePath, payload.codeJsonContents);

            await db.lab.update({
                where: { id: payload.labId },
                data: { jsonFile: mylab.jsonFile }
            });

            console.log('JSON file updated:', jsonFilePath);
        } catch (error) {
            console.error('Error reading or writing JSON file:', error);
            throw new Error('Failed to save updated JSON file');
        }
    }

    static async getLab(id: string) {
        const lab = await db.lab.findUnique({
            where: {
                id
            }
        });

        if (!lab) throw 'lab not found';

        const jsonFilePath = path.join(process.cwd(), 'public', lab.jsonFile);
        const labContents = await fs.readFile(jsonFilePath);

        return labContents.toString();
    }
}

export default LabRepository;
