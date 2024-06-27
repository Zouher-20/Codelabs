import Image from "next/image";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";
import noImage from '@/public/images/no-image2.png'
import { blogType } from "@/app/@types/blog";
import Favorite from "./favorite";
import BlogSetting from "./blog-setting";

const BlogCard = ({ blog, userID, deleted }: { blog: blogType, userID: string, deleted: (val: boolean) => void }) => {
    return <div className="w-80 h-full flex flex-col gap-1" key={blog.id}>
        <div className="relative">
            <Image
                src={blog.photo ? blog.photo.replace(/\\/g, '/') : noImage}
                alt="" width={320} height={208}
                className={" max-h-52 min-h-52 min-w-[320px] rounded-t-3xl"} />
        </div>
        <span className="font-bold line-clamp-3 my-2">{blog.title}</span>
        <span className="flex gap-2 text-gray-500">
            <IconRenderer icon='solar:calendar-date-broken' width={24} height={24} />
            <p>{blog.createdAt?.toLocaleDateString()}</p>
            <Favorite hasStarred={blog.hasStarred} blogId={blog.id} starCount={blog.starCount} />
            <div className="flex gap-1 ml-auto">
                <IconRenderer icon={'fa6-solid:street-view'} width={20} height={24} className={" text-warning"} />
                {blog.viewCount}
            </div>
            {userID == blog.user.id && <BlogSetting blogID={blog.id} deleted={(val) => { deleted(val) }} />}
        </span>
        <Link href={`/blogs/${blog.id}`} className="btn btn-sm p-0 w-fit btn-link" >Read more</Link>

    </div>
}

export default BlogCard;
