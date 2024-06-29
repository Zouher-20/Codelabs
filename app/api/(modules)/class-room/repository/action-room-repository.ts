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


    static async cloneLabFromTeacherInRoom(
        payload: {
            roomId: string
        },
        userId: string
    ) {

        const myRoom = await db.rom.findUnique({
            where: {
                id: payload.roomId
            }
        });
        if (myRoom?.endAt && myRoom.endAt.getTime() > Date.now()) {
            throw new Error('this room duration has ended');

        }
        const lab = await db.classProject.findFirst({
            where: {
                romId: payload.roomId,
                memberClass: {
                    isTeacher: true
                }
            }
        });

        let labJsonFilePath: string;

        const mylab = await db.lab.findUnique({
            where: {
                id: lab?.labId
            }
        });
        if (!mylab) {
            throw new Error('this project not found code lab');
        }

        labJsonFilePath = path.join(
            process.cwd(),
            'public',
            mylab.jsonFile ?? ""
        );


        const hasClassProject = await db.classProject.findFirst({
            where: {
                romId: payload.roomId,
                memberClass: {
                    userId: userId
                }
            }
        });

        if (hasClassProject) {
            throw new Error('you have an project class in this room');
        }
        const memberClass = await db.memberClass.findFirst({
            where: {
                classRom: {
                    Rom: {
                        some: {
                            id: payload.roomId
                        }
                    }
                },
                userId: userId
            }
        });

        const newJsonFileName = `${uuidv4()}.json`;
        const newJsonFilePath = path.join(
            process.cwd(),
            'public',
            'uploads',
            'labs',
            newJsonFileName
        );

        try {
            const templateJsonContent = await fs.readFile(labJsonFilePath, 'utf8');
            await fs.writeFile(newJsonFilePath, templateJsonContent);

            const newLab = await db.lab.create({
                data: {
                    jsonFile: `/uploads/labs/${newJsonFileName}`
                }
            });
            await db.classProject.create({
                data: {
                    labId: newLab.id,
                    romId: payload.roomId,
                    memberClassId: memberClass?.id
                }
            });
        } catch (error) {
            console.error('Error reading or writing JSON file:', error);
            throw new Error('Failed to create lab from template');
        }

    }




    static async createRoomFromTemplate(
        payload: {
            classRomId: string;
            description?: string;
            name?: string;
            endAt: DateTime;
            type?: string;
            templateId: string
        },
        userId: string
    ) {


        let templateJsonFilePath: string;

        const myTemplate = await db.tamblate.findUnique({
            where: {
                id: payload.templateId ?? ''
            }
        });

        if (myTemplate?.id == null || payload.templateId === '') {
            templateJsonFilePath = path.join(
                process.cwd(),
                'public',
                'uploads',
                'labs',
                'default.json'
            );
        } else {
            templateJsonFilePath = path.join(
                process.cwd(),
                'public',
                'uploads',
                'labs',
                myTemplate.nameTemplate + '.json'
            );
        }


        const myClass = await db.classRom.findFirst({
            where: {
                MemberClass: {
                    some: {
                        userId: userId,
                        isTeacher: true
                    }
                }
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }


        const memberclass = await db.memberClass.findFirst({
            where: {
                userId: userId,
                classRomId: myClass?.id
            }
        });

        const userPlan = await db.planSubscription.findUnique({
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
        });
        const countMyRomInClassRoom = await db.rom.count({
            where: {
                classRomId: payload.classRomId
            }
        });

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
            try {
                const templateJsonContent = await fs.readFile(templateJsonFilePath, 'utf8');
                await fs.writeFile(newJsonFilePath, templateJsonContent);

                const newLab = await db.lab.create({
                    data: {
                        jsonFile: `/uploads/labs/${newJsonFileName}`
                    }
                });
                const newRoom = await db.rom.create({
                    data: {
                        classRomId: payload.classRomId,
                        type: payload.type ?? '',
                        name: payload.name ?? '',
                        endAt: payload.endAt,
                        description: payload.description ?? '',
                    }
                });

                await db.classProject.create({
                    data: {
                        labId: newLab.id,
                        romId: newRoom.id,
                        memberClassId: memberclass?.id
                    }
                });


            } catch (e) {
                console.error('Error reading or writing JSON file:', e);
                throw new Error('Failed to create room from template');
            }


            return { message: 'Rom added to class successfully' };
        } else {
            throw new Error('Rom limit reached for this class.');
        }
    }













}

export default ActoinRoomRepository;
