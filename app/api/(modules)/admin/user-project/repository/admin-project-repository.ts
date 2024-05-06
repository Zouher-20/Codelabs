import { db } from '@/app/api/core/db/db';
import { Prisma } from '@prisma/client';

class AdminProjectRepository {
    static async getUserProjects(payload: {
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
                            some: {
                                tag: {
                                    tagename: payload.tagName
                                }
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
                    some: {
                        tag: {
                            tagename: payload.tagName
                        }
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

    static async deleteUserProjectLab(payload: { userProjectId: string }) {
        const userProject = await db.userProject.findUnique({
            where: {
                id: payload.userProjectId
            }
        });
        if (!userProject) {
            throw new Error('there are no user projects or this project was deleted ');
        }
        const deleteLab = await db.userProject.deleteMany({
            where: {
                id: userProject.id
            }
        });

        return deleteLab;
    }

    static async getTrendingUserProjects(payload: {
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

export default AdminProjectRepository;
