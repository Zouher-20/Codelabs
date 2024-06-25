import { blogType } from "@/app/@types/blog";
import BlogCard from "./blog-card";

const Content = ({ blogs, userID }: { blogs: Array<blogType>, userID?: string }) => {

    return (
        <div className="flex flex-wrap gap-8 max-xl:justify-center">
            {blogs.map((blog, index) => (
                <span key={index}>
                    {userID && <BlogCard blog={blog} userID={userID} />}
                </span>
            ))}
        </div>
    );
};

export default Content;