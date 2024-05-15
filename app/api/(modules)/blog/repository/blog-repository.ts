import { db } from '@/app/api/core/db/db';
import { NAMEPLAN, Prisma } from '@prisma/client';

class BlogRepository {
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

    static async addBlog(
        payload: { content: string; title: string; photo?: string },
        userId: string
    ) {
        const countMyBlog = await db.blog.count({
            where: {
                userId: userId
            }
        });

        const blogPlan = await db.planSubscription.findUnique({
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

        if (!blogPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const hasBlogPlan = blogPlan.plan.FeaturePlan.some(
            featurePlan => featurePlan.name === NAMEPLAN.labs
        );

        if (hasBlogPlan && countMyBlog < blogPlan.plan.FeaturePlan[0].value) {
            const myBlog = await db.blog.create({
                data: {
                    contant: payload.content,
                    title: payload.title,
                    userId: userId,
                    photo: payload.photo
                }
            });
            return myBlog;
        } else {
            throw new Error('User does not have access to create more blogs.');
        }
    }

    static async getBlogByCreatedAt(payload: {
        page: number;
        pageSize: number;
        blogTitle?: string;
        blogContent?: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.blogTitle && payload.blogContent) {
            args = {
                AND: [
                    {
                        title: { contains: payload.blogTitle }
                    },
                    {
                        contant: { contains: payload.blogContent }
                    }
                ]
            };
        } else if (payload.blogTitle) {
            args = {
                title: { contains: payload.blogTitle }
            };
        } else if (payload.blogContent) {
            args = {
                contant: { contains: payload.blogContent }
            };
        }
        const myBlogs = await db.blog.findMany({
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

        const myBlogsWithCounts = await Promise.all(
            myBlogs.map(async blog => {
                const commentCount = await db.comment.count({
                    where: { blogId: blog.id }
                });

                const starCount = await db.star.count({
                    where: { blogId: blog.id }
                });

                return {
                    ...blog,
                    commentCount,
                    starCount
                };
            })
        );

        const totalCount = await db.blog.count({
            where: {
                ...args
            }
        });

        return {
            projects: myBlogsWithCounts,
            totalCount: totalCount
        };
    }

    static async getTrendingBlog(payload: {
        page: number;
        pageSize: number;
        blogTitle?: string;
        blogContent?: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.blogTitle && payload.blogContent) {
            args = {
                AND: [
                    {
                        title: { contains: payload.blogTitle }
                    },
                    {
                        contant: { contains: payload.blogContent }
                    }
                ]
            };
        } else if (payload.blogTitle) {
            args = {
                title: { contains: payload.blogTitle }
            };
        } else if (payload.blogContent) {
            args = {
                contant: { contains: payload.blogContent }
            };
        }

        const myBlogs = await db.blog.findMany({
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

        const myBlogsWithCounts = await Promise.all(
            myBlogs.map(async blog => {
                const commentCount = await db.comment.count({
                    where: { blogId: blog.id }
                });

                const starCount = await db.star.count({
                    where: { blogId: blog.id }
                });

                return {
                    ...blog,
                    commentCount,
                    starCount
                };
            })
        );

        const totalCount = await db.blog.count({
            where: {
                ...args
            }
        });

        return {
            projects: myBlogsWithCounts,
            totalCount: totalCount
        };
    }

    static async deleteMyBlog(payload: { blogId: string }, userId: string) {
        const myBlog = await db.blog.findUnique({
            where: {
                userId: userId,
                id: payload.blogId
            }
        });

        if (!myBlog) {
            throw new Error('blog is not found or was deleted please refresh again');
        }
        return await db.blog.delete({
            where: {
                id: myBlog.id,
                userId: userId
            }
        });
    }

    static async editBlog(
        payload: {
            content: string;
            title: string;
            blogId: string;
            photo?: string;
        },
        userId: string
    ) {
        const existingBlog = await db.blog.findUnique({
            where: {
                id: payload.blogId,
                userId: userId
            }
        });

        if (!existingBlog) {
            throw new Error('Blog not found or it does not belong to you.');
        }

        const updatedBlog = await db.blog.update({
            where: {
                id: payload.blogId
            },
            data: {
                contant: payload.content,
                title: payload.title,
                photo: payload.photo
            },
            include: {
                user: true
            }
        });

        const commentCount = await db.comment.count({
            where: { blogId: updatedBlog.id }
        });
        const starCount = await db.star.count({
            where: { blogId: updatedBlog.id }
        });
        return {
            ...updatedBlog,
            commentCount,
            starCount
        };
    }

    static async getAllBlog(payload: {
        page: number;
        pageSize: number;
        blogTitle?: string;
        blogContent?: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        const myBlogs = await db.blog.findMany({
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
            }
        });

        const myBlogsWithCounts = await Promise.all(
            myBlogs.map(async blog => {
                const commentCount = await db.comment.count({
                    where: { blogId: blog.id }
                });

                const starCount = await db.star.count({
                    where: { blogId: blog.id }
                });

                return {
                    ...blog,
                    commentCount,
                    starCount
                };
            })
        );

        const totalCount = await db.blog.count();

        return {
            projects: myBlogsWithCounts,
            totalCount: totalCount
        };
    }

    static async addBlogComment(payload: { blogId: string; comment: string }) {}
    static async getCommentBlog(payload: { blogId: string; page: number; pageSize: number }) {}
    static async addStarBlog(payload: { blogId: string }) {}
    static async getDetailsBlog(payload: { blogId: string }) {}
    static async deleteMyCommentInBlog(payload: { commentId: string }) {}
}
export default BlogRepository;
