import { db } from "@/app/api/core/db/db";
import { promises as fs } from "fs";
import path from "path";

class LabRepository {
    static async saveCodeLab(payload: { labId: string; jsoncontan: string }, userId: string) {

        const mylab = await db.lab.findUnique({
            where: {
                id: payload.labId,
            },
            include: {
                UserProject: true,
                ChallengeParticipation: true,
                ClassProject: {
                    include: {
                        memberClass: true
                    }
                }
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

        const jsonFilePath = path.join(process.cwd(), 'public', 'lab', mylab.jsonFile);

        try {
            const originalJsonContent = await fs.readFile(jsonFilePath, 'utf8');

            const originalJson = JSON.parse(originalJsonContent);

            const updatedJson = {
                ...originalJson,
                ...JSON.parse(payload.jsoncontan),
            };

            await fs.writeFile(jsonFilePath, JSON.stringify(updatedJson, null, 2));

            await db.lab.update({
                where: {
                    id: payload.labId
                },
                data: { jsonFile: jsonFilePath },
            });

            console.log('JSON file updated:', jsonFilePath);
        } catch (error) {
            console.error('Error reading or writing JSON file:', error);
            throw new Error('Failed to save updated JSON file');
        }
    }
}

export default LabRepository;
