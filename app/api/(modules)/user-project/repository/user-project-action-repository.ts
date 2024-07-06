import { db } from '@/app/api/core/db/db';
import { NAMEPLAN } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class UserProjectActionRepository {
    static async addUserProjectLab(
        payload: {
            name?: string;
            description?: string;
            tagId: string[];
            templateId: string;
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
        const countMyUserProject = await db.userProject.count({
            where: {
                userId: userId
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

        if (!userPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const hasLabsPlan = userPlan.plan.FeaturePlan.some(
            featurePlan => featurePlan.name === NAMEPLAN.labs
        );

        if (hasLabsPlan && countMyUserProject < userPlan.plan.FeaturePlan[0].value) {
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

                const newUserProject = await db.userProject.create({
                    data: {
                        name: payload.name,
                        description: payload.description,
                        userId: userId,
                        labId: newLab.id
                    }
                });

                const tags = await db.tag.findMany({
                    where: {
                        id: {
                            in: payload.tagId
                        }
                    }
                });

                if (tags.length !== payload.tagId.length) {
                    throw new Error(`One or more tags not found.`);
                }

                const tagMorphCreatePromises = tags.map(tag =>
                    db.tagMorph.create({
                        data: {
                            tagId: tag.id,
                            userprojectId: newUserProject.id
                        }
                    })
                );

                await Promise.all(tagMorphCreatePromises);

                return newUserProject;
            } catch (error) {
                console.error('Error reading or writing JSON file:', error);
                throw new Error('Failed to create lab from template');
            }
        } else {
            throw new Error('User does not have access to create more user projects.');
        }
    }

    static async cloneLabFromUserProject(
        payload: {
            name?: string;
            description?: string;
            tagId: string[];
            labId: string;
        },
        userId: string
    ) {
        let labJsonFilePath: string;

        const mylab = await db.lab.findUnique({
            where: {
                id: payload.labId ?? ''
            }
        });
        if (!mylab) {
            throw new Error('this project not found code lab');
        }

        labJsonFilePath = path.join(process.cwd(), 'public', mylab.jsonFile ?? '');

        const countMyUserProject = await db.userProject.count({
            where: {
                userId: userId
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

        if (!userPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const hasLabsPlan = userPlan.plan.FeaturePlan.some(
            featurePlan => featurePlan.name === NAMEPLAN.labs
        );

        if (hasLabsPlan && countMyUserProject < userPlan.plan.FeaturePlan[0].value) {
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

                const newUserProject = await db.userProject.create({
                    data: {
                        name: payload.name,
                        description: payload.description,
                        userId: userId,
                        labId: newLab.id
                    }
                });

                const tags = await db.tag.findMany({
                    where: {
                        id: {
                            in: payload.tagId
                        }
                    }
                });

                if (tags.length !== payload.tagId.length) {
                    throw new Error(`One or more tags not found.`);
                }

                const tagMorphCreatePromises = tags.map(tag =>
                    db.tagMorph.create({
                        data: {
                            tagId: tag.id,
                            userprojectId: newUserProject.id
                        }
                    })
                );

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
                await Promise.all(tagMorphCreatePromises);

                return newUserProject;
            } catch (error) {
                console.error('Error reading or writing JSON file:', error);
                throw new Error('Failed to create lab from template');
            }
        } else {
            throw new Error('User does not have access to create more user projects.');
        }
    }
}

export default UserProjectActionRepository;
