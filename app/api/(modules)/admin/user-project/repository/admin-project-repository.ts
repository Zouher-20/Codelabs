import { db } from '@/app/api/core/db/db';

class AdminProjectRepository {
    static async getUserProjects(payload: { page: number; pageSize: number }) {
        const skip = (payload.page - 1) * payload.pageSize;

        const myProjects = await db.userProject.findMany({
            take: payload.pageSize,
            skip: skip,
            include: {
                Comment: true,
                Star: true
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

        return projectsWithCounts;
    }
}

export default AdminProjectRepository;
