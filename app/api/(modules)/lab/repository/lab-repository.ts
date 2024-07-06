import { db } from '@/app/api/core/db/db';
import { promises as fs } from 'fs';
import path from 'path';

class LabRepository {
    static async saveCodeLab(payload: { labId: string; codeJsonContents: string }, userId: string) {
        const mylab = await db.lab.findUnique({
            where: {
                id: payload.labId
            },
            include: {
                Tamblate: true,
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
        const isTemplate = !!mylab.Tamblate;

        const userHasAccess =
            isTemplate ||
            (mylab.UserProject && mylab.UserProject.userId === userId) ||
            (mylab.ChallengeParticipation && mylab.ChallengeParticipation.userId === userId) ||
            (mylab.ClassProject &&
                mylab.ClassProject.memberClass &&
                mylab.ClassProject.memberClass.userId === userId);

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
            },
            include: {
                UserProject: true,
                Tamblate: true,
                ClassProject: true
            }
        });

        if (!lab) throw 'lab not found';

        const jsonFilePath = path.join(process.cwd(), 'public', lab.jsonFile ?? '');
        const labContents = await fs.readFile(jsonFilePath);
        if (lab.UserProject) {
            const labAuthor = await db.user.findUnique({ where: { id: lab.UserProject.userId } });
            return {
                name: lab.UserProject?.name,
                code: labContents,
                author: labAuthor
            };
        } else if (lab.Tamblate) {
            return {
                name: lab.Tamblate?.nameTemplate,
                code: labContents
            };
        } else if (lab.ClassProject) {
            const memberClass = await db.memberClass.findUnique({
                where: { id: lab.ClassProject.memberClassId as string },
                include: {
                    user: true
                }
            });
            return {
                name: lab.ClassProject?.romId,
                code: labContents,
                author: memberClass?.user
            };
        }
    }
}

export default LabRepository;
