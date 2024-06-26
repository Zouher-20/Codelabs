import Image from "next/image";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";
import noImage from '@/public/images/no-image2.png'
import { blogType } from "@/app/@types/blog";
import { editBlog } from "@/app/api/(modules)/blog/services/action";
import Favorite from "./favorite";
import BlogSetting from "./blog-setting";

const BlogCard = ({ blog, userID }: { blog: blogType, userID: string }) => {

    const formattedPath = blog.photo.replace(/\\/g, '/');

    return <div className="w-80 h-full flex flex-col gap-1" key={blog.id}>
        <div className="relative">
            <Image
                src={blog.photo ? formattedPath : noImage}
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
            {userID == blog.user.id && <BlogSetting blogID={blog.id} />}
        </span>
        <Link href={`/blogs/${blog.id}`} className="btn btn-sm p-0 w-fit btn-link" >Read more</Link>

    </div>
}

export default BlogCard;

// const Avatar = ({ userImage, name }: { userImage: string | null, name: string }) => {
//     return <span>
//         {userImage
//             ? <Image
//                 src={userImage}
//                 alt="" width={80}
//                 className=' absolute rounded-full left-0 bottom-0 ' />
//             : <span className="absolute text-2xl pt-2 text-center w-12 h-12 rounded-full left-4 bottom-4 bg-base-200 text-primary">{name.slice(0, 1)}</span>
//         }
//     </span>
// }
