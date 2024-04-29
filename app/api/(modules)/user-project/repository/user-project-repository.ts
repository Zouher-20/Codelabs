import { db } from '@/app/api/core/db/db';

class UserProjectRepository {
    static async addUserProjectLab(
        payload: {
            name?: string;
            description?: string;
            tagId: string[];
        },
        userId: string
    ) {
        const newUserProject = await db.userProject.create({
            data: {
                name: payload.name,
                description: payload.description,
                userId: userId
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
                    challengeId: newUserProject.id
                }
            })
        );

        await Promise.all(tagMorphCreatePromises);

        return newUserProject;
    }
}

export default UserProjectRepository;
