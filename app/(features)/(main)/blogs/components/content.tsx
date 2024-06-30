import { blogType } from '@/app/@types/blog';
import BlogCard from './blog-card';

const Content = ({
    blogs,
    userID,
    deleted
}: {
    blogs: Array<blogType>;
    userID: string;
    deleted: (val: boolean, index: number) => void;
}) => {
    return (
        <div className="flex flex-wrap gap-8 pb-8 max-xl:justify-center">
            {blogs.map((blog, index) => (
                <span key={index}>
                    <BlogCard
                        blog={blog}
                        userID={userID}
                        deleted={val => {
                            deleted(val, index);
                        }}
                    />
                </span>
            ))}
        </div>
    );
};

export default Content;
