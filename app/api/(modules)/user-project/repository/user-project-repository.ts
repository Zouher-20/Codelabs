import { db } from '@/app/api/core/db/db';
import { NAMEPLAN, Prisma } from '@prisma/client';

class UserProjectRepository {
    static async addUserProjectLab(
        payload: {
            name?: string;
            description?: string;
            tagId: string[];
            jsonFile: string;
            templateId?: string | null;
        },
        userId: string
    ) {
        // Check if the user has a plan subscription
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
            // Create Lab record and associate it with the new user project
            const newLab = await db.lab.create({
                data: {
                    jsonFile: payload.jsonFile,
                    tamblateId: payload.templateId
                }
            });

            // Create the new user project and associate it with the lab record
            const newUserProject = await db.userProject.create({
                data: {
                    name: payload.name,
                    description: payload.description,
                    userId: userId,
                    Lab: {
                        connect: {
                            id: newLab.id
                        }
                    }
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
        } else {
            throw new Error('User does not have access to create more user projects.');
        }
    }

    static async getUserProjectsLab(payload: {
        page: number;
        pageSize: number;
        nameLab?: string;
        tagName?: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.nameLab && payload.tagName) {
            args = {
                AND: [
                    {
                        name: { contains: payload.nameLab }
                    },
                    {
                        TagMorph: {
                            tag: {
                                tagename: { contains: payload.tagName }
                            }
                        }
                    }
                ]
            };
        } else if (payload.nameLab) {
            args = {
                name: { contains: payload.nameLab }
            };
        } else if (payload.tagName) {
            args = {
                TagMorph: {
                    tag: {
                        tagename: { contains: payload.tagName }
                    }
                }
            };
        }
        const myProjects = await db.userProject.findMany({
            take: payload.pageSize,
            skip: skip,
            orderBy: { createdAt: 'desc' },
            include: {
                user: true
            },
            where: {
                ...args
            }
        });

        const projectsWithCounts = await Promise.all(
            myProjects.map(async project => {
                const commentCount = await db.comment.count({
                    where: { userprojectId: project.id }
                });

                const starCount = await db.star.count({
                    where: { userprojectId: project.id }
                });

                return {
                    ...project,
                    commentCount,
                    starCount
                };
            })
        );

        const totalCount = await db.userProject.count({
            where: {
                ...args
            }
        });

        return {
            projects: projectsWithCounts,
            totalCount: totalCount
        };
    }
    static async getTrendingUserProjectsLab(payload: {
        page: number;
        pageSize: number;
        nameLab?: string;
        tagName?: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.nameLab && payload.tagName) {
            args = {
                AND: [
                    {
                        name: { contains: payload.nameLab }
                    },
                    {
                        TagMorph: {
                            tag: {
                                tagename: { contains: payload.tagName }
                            }
                        }
                    }
                ]
            };
        } else if (payload.nameLab) {
            args = {
                name: { contains: payload.nameLab }
            };
        } else if (payload.tagName) {
            args = {
                TagMorph: {
                    tag: {
                        tagename: { contains: payload.tagName }
                    }
                }
            };
        }
        const myProjects = await db.userProject.findMany({
            take: payload.pageSize,
            skip: skip,
            orderBy: [
                {
                    Comment: {
                        _count: Prisma.SortOrder.desc
                    }
                },
                {
                    Star: {
                        _count: Prisma.SortOrder.desc
                    }
                }
            ],
            include: {
                user: true
            },
            where: {
                ...args
            }
        });

        const projectsWithCounts = await Promise.all(
            myProjects.map(async project => {
                const commentCount = await db.comment.count({
                    where: { userprojectId: project.id }
                });

                const starCount = await db.star.count({
                    where: { userprojectId: project.id }
                });

                return {
                    ...project,
                    commentCount,
                    starCount
                };
            })
        );

        const totalCount = await db.userProject.count({
            where: {
                ...args
            }
        });

        return {
            projects: projectsWithCounts,
            totalCount: totalCount
        };
    }
}

export default UserProjectRepository;
