import BaseResponse from '@/app/api/core/base-response/base-response';
import { db } from '@/app/api/core/db/db';
import { NAMEPLAN, Prisma } from '@prisma/client';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'path';

class BlogRepository {
    static async uploadImage(payload: { file: File }): Promise<BaseResponse> {
        try {
            const { file } = payload;

            if (!file) {
                console.log('No file uploaded');
                return BaseResponse.returnResponse({
                    statusCode: 400,
                    message: 'No file uploaded',
                    data: null
                });
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads');
            const filePath = join(uploadDir, file.name);

            await mkdir(uploadDir, { recursive: true });

            await writeFile(filePath, buffer);

            console.log('File received:', file);

            const url = join('/uploads', file.name);

            return BaseResponse.returnResponse({
                statusCode: 200,
                message: 'File uploaded successfully',
                data: {
                    path: url
                }
            });
        } catch (error) {
            console.error('Error during file upload:', error);
            return BaseResponse.returnResponse({
                statusCode: 500,
                message: 'Error during file upload',
                data: null
            });
        }
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
            featurePlan => featurePlan.name === NAMEPLAN.blogs
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
    static async getBlogByCreatedAt(payload: { page: number; pageSize: number; blogTitle?: string }, userId: string) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.blogTitle) {
            args = {
                title: { contains: payload.blogTitle, mode: "insensitive" }
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

                const starredBlogsId = (
                    await db.star.findMany({
                        where: {
                            userId: userId,
                            blogId: {
                                in: myBlogs.map(blog => blog.id)
                            }
                        },
                        select: {
                            blogId: true
                        }
                    })
                ).map(star => star.blogId);



                const hasStarred = starredBlogsId.includes(blog.id);

                return {
                    ...blog,
                    commentCount,
                    starCount,
                    hasStarred
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
    static async getMyBlogs(
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
                title: { contains: payload.searchWord, mode: "insensitive" }
            };
        }
        const myBlogs = await db.blog.findMany({
            take: payload.pageSize,
            skip: skip,
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
            },
            where: {
                ...args,
                userId: existingUser.id
            }
        });

        const blogsWithCounts = await Promise.all(
            myBlogs.map(async blog => {
                const commentCount = await db.comment.count({
                    where: { blogId: blog.id }
                });

                const starCount = await db.star.count({
                    where: { blogId: blog.id }
                });

                const starredProjectsIds = (
                    await db.star.findMany({
                        where: {
                            userId: userId,
                            blogId: {
                                in: myBlogs.map(blog => blog.id)
                            }
                        },
                        select: {
                            blogId: true
                        }
                    })
                ).map(star => star.blogId);

                const hasStarred = starredProjectsIds.includes(blog.id);

                return {
                    ...blog,
                    commentCount,
                    starCount,
                    hasStarred
                };
            })
        );

        const totalCount = await db.blog.count({
            where: { ...args }
        });

        return {
            blogs: blogsWithCounts,
            totalCount: totalCount
        };
    }
    static async getTrendingBlog(payload: { page: number; pageSize: number; blogTitle?: string }, userId: string) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.blogTitle) {
            args = {
                title: { contains: payload.blogTitle, mode: "insensitive" }
            };
        }

        const myBlogs = await db.blog.findMany({
            take: payload.pageSize,
            skip: skip,
            orderBy: [
                // {
                //     Comment: {
                //         _count: Prisma.SortOrder.desc
                //     }
                // },
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

                const starredBlogsId = (
                    await db.star.findMany({
                        where: {
                            userId: userId,
                            blogId: {
                                in: myBlogs.map(blog => blog.id)
                            }
                        },
                        select: {
                            blogId: true
                        }
                    })
                ).map(star => star.blogId);



                const hasStarred = starredBlogsId.includes(blog.id);

                return {
                    ...blog,
                    commentCount,
                    starCount,
                    hasStarred
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
    static async getAllBlog(payload: { page: number; pageSize: number; blogTitle?: string }, userId: string) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.blogTitle) {
            args = {
                title: { contains: payload.blogTitle, mode: "insensitive" }
            };
        }
        const myBlogs = await db.blog.findMany({
            take: payload.pageSize,
            skip: skip,
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
                const starredBlogsId = (
                    await db.star.findMany({
                        where: {
                            userId: userId,
                            blogId: {
                                in: myBlogs.map(blog => blog.id)
                            }
                        },
                        select: {
                            blogId: true
                        }
                    })
                ).map(star => star.blogId);



                const hasStarred = starredBlogsId.includes(blog.id);

                return {
                    ...blog,
                    commentCount,
                    starCount,
                    hasStarred
                };
            })
        );

        const totalCount = await db.blog.count();

        return {
            projects: myBlogsWithCounts,
            totalCount: totalCount
        };
    }
    static async getDetailsBlog(payload: { blogId: string }, userId: string) {
        const blog = await db.blog.findUnique({
            where: {
                id: payload.blogId
            },
            include: {
                user: true
            }
        });

        if (!blog) {
            throw new Error('Lab is not found');
        }

        const commentCount = await db.comment.count({
            where: { blogId: payload.blogId }
        });

        const starCount = await db.star.count({
            where: { blogId: payload.blogId }
        });

        const isStarred = await db.star.findFirst({
            where: {
                userId: userId,
                blogId: payload.blogId
            }
        });

        return {
            blog,
            commentCount,
            starCount,
            isStarred: isStarred != null
        };
    }
    static async addBlogComment(payload: { blogId: string; comment: string }, userId: string) {

        const blog = await db.blog.findUnique({
            where: {
                id: payload.blogId
            }
        });
        if (!blog) {
            throw new Error('blog is not found');
        }

        await db.comment.create({
            data: {
                userId: userId,
                comment: payload.comment,
                blogId: payload.blogId
            }
        });
    }
    static async getCommentBlog(payload: { blogId: string; page: number; pageSize: number }) {
        const skip = (payload.page - 1) * payload.pageSize;

        const blog = await db.blog.findUnique({
            where: {
                id: payload.blogId
            }
        });
        if (!blog) {
            throw new Error('blog is not found');
        }
        const comment = await db.comment.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                blogId: payload.blogId
            },
            include: {
                user: true
            }
        });
        const countOfComment = await db.comment.count({
            where: {
                blogId: payload.blogId
            }
        });
        return {
            comment,
            countOfComment: countOfComment
        };
    }
    static async addAndDeleteStarBlog(
        payload: {
            blogId: string;
            action: boolean;
        },
        userId: string
    ) {
        const existingStar = await db.star.findFirst({
            where: {
                userId: userId,
                blogId: payload.blogId
            }
        });

        if (payload.action) {
            if (existingStar) {
                throw new Error('You have already starred this blog.');
            }

            const newStar = await db.star.create({
                data: {
                    userId: userId,
                    blogId: payload.blogId
                }
            });

            return newStar;
        } else {
            if (!existingStar) {
                throw new Error('You not have starred this blog.');
            }
            const deletedStar = await db.star.deleteMany({
                where: {
                    userId: userId,
                    blogId: payload.blogId
                }
            });

            return deletedStar;
        }
    }
    static async deleteMyCommentInBlog(payload: { commentId: string, blogId: string }, userId: string) {
        const existingBlog = await db.blog.findUnique({
            where: {
                id: payload.blogId
            }
        });
        if (!existingBlog) {
            throw new Error('blog is not found');
        }
        const myComment = await db.comment.findUnique({
            where: { id: payload.commentId, userId: userId, blogId: payload.blogId }
        });
        if (!myComment) {
            throw new Error('your comment was deleted or this comment its not yours');
        }
        await db.comment.delete({
            where: { id: payload.commentId }
        });
    }
}
export default BlogRepository;
