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
                }
            });

            // Create the new user project and associate it with the lab record
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
        } else {
            throw new Error('User does not have access to create more user projects.');
        }
    }

    static async getStarredUserProjects(
        payload: { page: number; pageSize: number; searchWord?: string },
        userId: string
    ) {
        const skip = (payload.page - 1) * payload.pageSize;
        const starredUserProjects = await db.userProject.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                name: { contains: payload.searchWord },
                Star: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                user: true
            },
            skip: skip,
            take: payload.pageSize
        });

        const starredUserProjectCount = await db.userProject.count({
            where: {
                Star: {
                    some: {
                        userId: userId
                    }
                }
            }
        });
        const starredUserProjectsWithCounts = await Promise.all(
            starredUserProjects.map(async project => {
                const starCount = await db.star.count({
                    where: {
                        userprojectId: project.id
                    }
                });

                const commentCount = await db.comment.count({
                    where: {
                        userprojectId: project.id
                    }
                });
                const viewCount = await db.veiw.count({
                    where: {
                        userprojectId: project.id
                    }
                });

                return {
                    ...project,
                    starCount,
                    viewCount,
                    commentCount
                };
            })
        );
        return {
            starredUserProjects: starredUserProjectsWithCounts,
            starredUserProjectCount
        };
    }

    static async deleteMyCommentUserProjectLab(
        payload: {
            commentId: string;
        },
        userId: string
    ) {
        const myComment = await db.comment.findUnique({
            where: { id: payload.commentId, userId: userId }
        });
        if (!myComment) {
            throw new Error('your comment was deleted or this comment its not yours');
        }
        await db.comment.delete({
            where: { id: payload.commentId }
        });
    }

    static async editMyLab(payload: {
        userProjectid: string;
        name?: string;
        description?: string;
        tagId: string[];
    }, userId: string) {
        const myUserProject = await db.userProject.findUnique({
            where: {
                id: payload.userProjectid,
                userId: userId
            }
        });
        if (!myUserProject) {
            throw new Error('this lab not found');
        }


        const newUserProject = await db.userProject.update({
            where: { id: myUserProject.id },
            data: {
                name: payload.name,
                description: payload.description

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
            db.tagMorph.updateMany({
                where: {
                    tagId: tag.id,
                },
                data: {
                    tagId: tag.id,
                    userprojectId: newUserProject.id,
                }
            })
        );

        await Promise.all(tagMorphCreatePromises);
        return "";

    }

    static async getUserProjectsLab(
        payload: {
            page: number;
            pageSize: number;
            nameLab?: string;
            tagName?: string;
        },
        userId: string
    ) {
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
                user: true,
                lab: true,
                TagMorph: {
                    include: {
                        tag: true
                    }
                }
            },
            where: { ...args }
        });

        const projectsWithCounts = await Promise.all(
            myProjects.map(async project => {
                const commentCount = await db.comment.count({
                    where: { userprojectId: project.id }
                });

                const viewCount = await db.veiw.count({
                    where: { userprojectId: project.id }
                });

                const starCount = await db.star.count({
                    where: { userprojectId: project.id }
                });

                const starredProjectsIds = (
                    await db.star.findMany({
                        where: {
                            userId: userId,
                            userprojectId: {
                                in: myProjects.map(project => project.id)
                            }
                        },
                        select: {
                            userprojectId: true
                        }
                    })
                ).map(star => star.userprojectId);

                const hasStarred = starredProjectsIds.includes(project.id);

                return {
                    ...project,
                    commentCount,
                    starCount,
                    viewCount,
                    hasStarred
                };
            })
        );

        const totalCount = await db.userProject.count({
            where: { ...args }
        });

        return {
            projects: projectsWithCounts,
            totalCount: totalCount
        };
    }

    static async getTrendingUserProjectsLab(
        payload: {
            page: number;
            pageSize: number;
            nameLab?: string;
            tagName?: string;
        },
        userId: string
    ) {
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
                user: true,
                lab: true,
                TagMorph: {
                    include: {
                        tag: true
                    }
                }
            },
            where: { ...args }
        });

        const projectsWithCounts = await Promise.all(
            myProjects.map(async project => {
                const commentCount = await db.comment.count({
                    where: { userprojectId: project.id }
                });

                const starCount = await db.star.count({
                    where: { userprojectId: project.id }
                });

                const viewCount = await db.veiw.count({
                    where: { userprojectId: project.id }
                });

                const starredProjectsIds = (
                    await db.star.findMany({
                        where: {
                            userId: userId,
                            userprojectId: {
                                in: myProjects.map(project => project.id)
                            }
                        },
                        select: {
                            userprojectId: true
                        }
                    })
                ).map(star => star.userprojectId);

                const hasStarred = starredProjectsIds.includes(project.id);

                return {
                    ...project,
                    commentCount,
                    starCount,
                    viewCount,
                    hasStarred
                };
            })
        );

        const totalCount = await db.userProject.count({
            where: { ...args }
        });

        return {
            projects: projectsWithCounts,
            totalCount: totalCount
        };
    }

    static async getCommentUserProjectLab(payload: {
        page: number;
        pageSize: number;
        userProjectId: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        const lab = await db.userProject.findUnique({
            where: {
                id: payload.userProjectId
            }
        });
        if (!lab) {
            throw new Error('lab is not found');
        }
        const comment = await db.comment.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                userprojectId: payload.userProjectId
            },
            include: {
                user: true
            }
        });
        const countOfComment = await db.comment.count({
            where: {
                userprojectId: payload.userProjectId
            }
        });
        return {
            comment,
            countOfComment: countOfComment
        };
    }

    static async getDetailsUserProjectLab(payload: { userProjectId: string }, userId: string) {
        const lab = await db.userProject.findUnique({
            where: {
                id: payload.userProjectId
            },
            include: {
                user: true,
                TagMorph: {
                    include: {
                        tag: true
                    }
                },
                lab: true,
            }
        });
        const view = await db.veiw.findFirst(
            {
                where: {
                    userId: userId,
                    userprojectId: payload.userProjectId
                }
            }
        );
        if (!view) {
            await db.veiw.create({
                data: {
                    userId: userId,
                    userprojectId: payload.userProjectId
                }
            });
        }

        if (!lab) {
            throw new Error('Lab is not found');
        }
        const viewCount = await db.veiw.count({
            where: {
                userprojectId: payload.userProjectId
            }
        });

        const commentCount = await db.comment.count({
            where: { userprojectId: payload.userProjectId }
        });

        const starCount = await db.star.count({
            where: { userprojectId: payload.userProjectId }
        });

        const isStarred = await db.star.findFirst({
            where: {
                userId: userId,
                userprojectId: payload.userProjectId
            }
        });

        return {
            lab,
            commentCount,
            starCount,
            viewCount,
            isStarred: isStarred != null
        };
    }

    static async addCommentUserProjectLab(
        payload: { userProjectId: string; comment: string },
        userId: string
    ) {
        const lab = await db.userProject.findUnique({
            where: {
                id: payload.userProjectId
            }
        });
        if (!lab) {
            throw new Error('lab is not found');
        }

        await db.comment.create({
            data: {
                userId: userId,
                comment: payload.comment,
                userprojectId: payload.userProjectId
            }
        });
    }

    static async addAndDeleteStarUserProjectLab(
        payload: {
            userProjectId: string;
            action: boolean;
        },
        userId: string
    ) {
        const existingStar = await db.star.findFirst({
            where: {
                userId: userId,
                userprojectId: payload.userProjectId
            }
        });

        if (payload.action) {
            if (existingStar) {
                throw new Error('You have already starred this user project.');
            }

            const newStar = await db.star.create({
                data: {
                    userId: userId,
                    userprojectId: payload.userProjectId
                }
            });

            return newStar;
        } else {
            if (!existingStar) {
                throw new Error('You not have starred this user project.');
            }
            const deletedStar = await db.star.deleteMany({
                where: {
                    userId: userId,
                    userprojectId: payload.userProjectId
                }
            });

            return deletedStar;
        }
    }

    static async deleteMyUserProjectLab(
        payload: {
            userProjectId: string;
        },
        userId: string
    ) {
        const myUserProject = await db.userProject.findUnique({
            where: {
                id: payload.userProjectId,
                userId: userId
            }
        });
        if (!myUserProject) {
            throw new Error('you dont have lab or this lab not yours');
        }
        const deleteMyLab = await db.userProject.deleteMany({
            where: {
                id: myUserProject.id,
                userId: myUserProject.userId
            }
        });

        return deleteMyLab;
    }
    static async getMyUserProjectsLab(
        payload: {
            page: number;
            pageSize: number;
            searchWord?: string;
        },
        userId: string
    ) {
        const skip = (payload.page - 1) * payload.pageSize;

        const existingUser = await db.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!existingUser) {
            throw new Error('user not found');
        }

        let args = {};
        if (payload.searchWord) {
            args = {
                name: { contains: payload.searchWord }
            };
        }
        const myProjects = await db.userProject.findMany({
            take: payload.pageSize,
            skip: skip,
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
                lab: true,
                TagMorph: {
                    include: {
                        tag: true
                    }
                }
            },
            where: {
                ...args,
                userId: existingUser.id
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
                const viewCount = await db.veiw.count({
                    where: { userprojectId: project.id }
                });

                const starredProjectsIds = (
                    await db.star.findMany({
                        where: {
                            userId: userId,
                            userprojectId: {
                                in: myProjects.map(project => project.id)
                            }
                        },
                        select: {
                            userprojectId: true
                        }
                    })
                ).map(star => star.userprojectId);

                const hasStarred = starredProjectsIds.includes(project.id);

                return {
                    ...project,
                    commentCount,
                    viewCount,
                    starCount,
                    hasStarred
                };
            })
        );

        const totalCount = await db.userProject.count({
            where: { ...args }
        });

        return {
            projects: projectsWithCounts,
            totalCount: totalCount
        };
    }
}

export default UserProjectRepository;
