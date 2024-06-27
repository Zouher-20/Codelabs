import { db } from '@/app/api/core/db/db';
import { NAMEPLAN } from '@prisma/client';
import { DateTime } from 'next-auth/providers/kakao';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class ActoinRoomRepository {

    static async cloneLabForRoomInClass(
        payload: {
            classRomId: string;
            description?: string;
            name?: string;
            endAt: DateTime;
            type?: string;
            labId: string;
        },
        userId: string
    ) {

        const mylab = await db.lab.findUnique({
            where: {
                id: payload.labId
            }
        });

        if (!mylab) {
            throw new Error('This project not found code lab');
        }

        const labJsonFilePath = path.join(process.cwd(), 'public', mylab.jsonFile ?? '');

        const [myClass, userPlan, countMyRomInClassRoom] = await Promise.all([
            db.classRom.findFirst({
                where: {
                    MemberClass: {
                        some: {
                            userId: userId,
                            isTeacher: true
                        }
                    }
                }
            }),
            db.planSubscription.findUnique({
                where: {
                    userId: userId
                },
                include: {
                    plan: {
                        include: {
                            FeaturePlan: true
                        }
                    }
                }
            }),
            db.rom.count({
                where: {
                    classRomId: payload.classRomId
                }
            })
        ]);

        if (!myClass) {
            throw new Error('No class found');
        }

        if (!userPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const hasLabsPlan = userPlan.plan.FeaturePlan.some(
            featurePlan => featurePlan.name === NAMEPLAN.romsInClass
        );

        if (hasLabsPlan && countMyRomInClassRoom < userPlan.plan.FeaturePlan[0].value) {
            const newJsonFileName = `${uuidv4()}.json`;
            const newJsonFilePath = path.join(
                process.cwd(),
                'public',
                'uploads',
                'labs',
                newJsonFileName
            );

            const labJsonContent = await fs.readFile(labJsonFilePath, 'utf8');
            await fs.writeFile(newJsonFilePath, labJsonContent);

            const [newLab, newRoom] = await Promise.all([
                db.lab.create({
                    data: {
                        jsonFile: `/uploads/labs/${newJsonFileName}`
                    }
                }),
                db.rom.create({
                    data: {
                        classRomId: payload.classRomId,
                        type: payload.type ?? '',
                        name: payload.name ?? '',
                        endAt: payload.endAt,
                        description: payload.description ?? '',
                    }
                })
            ]);

            await db.classProject.create({
                data: {
                    romId: newRoom.id,
                    labId: newLab.id
                }
            });
            const labId = newLab.id

            return { labId };
        } else {
            throw new Error('Rom limit reached for this class.');
        }
    }
}

export default ActoinRoomRepository;
