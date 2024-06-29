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
        const memberclass = await db.memberClass.findFirst({
            where: {
                userId: userId,
                classRomId: myClass?.id
            }
        });

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
                    labId: newLab.id,
                    memberClassId: memberclass?.id
                }
            });

            const labId = newLab.id
            await db.userProject.update({
                where: {
                    labId: payload.labId
                },
                data: {
                    clone: {
                        increment: 1
                    }
                }
            });
            return { labId };
        } else {
            throw new Error('Rom limit reached for this class.');
        }
    }


    // static async cloneLabFromUserProject(
    //     payload: {
    //         labId: string;
    //         roomId: string
    //     },
    //     userId: string
    // ) {
    //     let labJsonFilePath: string;

    //     const mylab = await db.lab.findUnique({
    //         where: {
    //             id: payload.labId ?? ''
    //         }
    //     });
    //     if (!mylab) {
    //         throw new Error('this project not found code lab');
    //     }

    //     labJsonFilePath = path.join(
    //         process.cwd(),
    //         'public',
    //         mylab.jsonFile ?? ""
    //     );

    //     if (hasLabsPlan && countMyUserProject < userPlan.plan.FeaturePlan[0].value) {
    //         const newJsonFileName = `${uuidv4()}.json`;
    //         const newJsonFilePath = path.join(
    //             process.cwd(),
    //             'public',
    //             'uploads',
    //             'labs',
    //             newJsonFileName
    //         );

    //         try {
    //             const templateJsonContent = await fs.readFile(labJsonFilePath, 'utf8');
    //             await fs.writeFile(newJsonFilePath, templateJsonContent);

    //             const newLab = await db.lab.create({
    //                 data: {
    //                     jsonFile: `/uploads/labs/${newJsonFileName}`
    //                 }
    //             });

    //             const newUserProject = await db.userProject.create({
    //                 data: {
    //                     name: payload.name,
    //                     description: payload.description,
    //                     userId: userId,
    //                     labId: newLab.id
    //                 }
    //             });

    //             const tags = await db.tag.findMany({
    //                 where: {
    //                     id: {
    //                         in: payload.tagId
    //                     }
    //                 }
    //             });

    //             if (tags.length !== payload.tagId.length) {
    //                 throw new Error(`One or more tags not found.`);
    //             }

    //             const tagMorphCreatePromises = tags.map(tag =>
    //                 db.tagMorph.create({
    //                     data: {
    //                         tagId: tag.id,
    //                         userprojectId: newUserProject.id
    //                     }
    //                 })
    //             );

    //             await db.userProject.update({
    //                 where: {
    //                     labId: payload.labId
    //                 },
    //                 data: {
    //                     clone: {
    //                         increment: 1
    //                     }
    //                 }
    //             });
    //             await Promise.all(tagMorphCreatePromises);

    //             return newUserProject;
    //         } catch (error) {
    //             console.error('Error reading or writing JSON file:', error);
    //             throw new Error('Failed to create lab from template');
    //         }
    //     } else {
    //         throw new Error('User does not have access to create more user projects.');
    //     }
    // }











}

export default ActoinRoomRepository;
