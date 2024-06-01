
import Image from "next/image";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";
import noImage from '@/public/images/no-image2.png'
import { blogType } from "@/app/@types/blog";
import { useState } from "react";
import { editBlog } from "@/app/api/(modules)/blog/services/action";
import Favorite from "./favorite";

const BlogCard = ({ blog }: { blog: blogType }) => {

    return <div className="w-80 h-full flex flex-col gap-2">
        <div className="relative">
            <Image
                src={blog.photo ? blog.photo : noImage}
                alt="" width={320} height={208}
                className={" max-h-52 min-h-52 min-w-[320px] rounded-t-3xl"} />
        </div>
        <span className="font-bold line-clamp-3">{blog.title}</span>
        <span className="flex gap-2 text-gray-500">
            <IconRenderer icon='solar:calendar-date-broken' width={24} height={24} />
            <p className="mr-auto">{blog.createdAt?.toLocaleDateString()}</p>
            <Favorite count={blog.starCount} />
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
