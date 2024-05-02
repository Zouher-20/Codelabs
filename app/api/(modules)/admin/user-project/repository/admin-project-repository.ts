import { db } from '@/app/api/core/db/db';

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
