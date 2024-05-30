import { blogType } from "@/app/@types/blog";
import BlogCard from "./blog-card";

const Content = ({ blogs }: { blogs: Array<blogType> }) => {
    return (
        <div className="flex flex-wrap gap-8 max-xl:justify-center">
            {blogs.map((blog, index) => (
                <span key={index}>
                    <BlogCard blog={blog} />
                </span>
            ))}
        </div>
    );
};

export default Content;