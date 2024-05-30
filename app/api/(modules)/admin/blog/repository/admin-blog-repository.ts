import { db } from '@/app/api/core/db/db';

class AdminBlogRepository {
    static async adminDeleteBlog(payload: { blogId: string }) {
        const myBlog = await db.blog.findUnique({
            where: {
                id: payload.blogId
            }
        });

        if (!myBlog) {
            throw new Error('blog is not found or was deleted please refresh again');
        }
        return await db.blog.delete({
            where: {
                id: myBlog.id
            }
        });
    }
}
export default AdminBlogRepository;
