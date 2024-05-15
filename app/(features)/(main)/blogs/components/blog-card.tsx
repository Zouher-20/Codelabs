import Image from "next/image";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";
import noImage from '@/public/images/no-image2.png'

type blogType = {
    id: number,
    title: string,
    image?: string,
    description: string
    createdAt: string,
}
const BlogCard = ({ blog }: { blog: blogType }) => {
    return <div className="w-80 h-full flex flex-col gap-2">
        <Image src={blog.image ? blog.image : noImage} alt="" width={320} height={208} className={" max-h-52 min-h-52 min-w-[320px] rounded-t-3xl"} />
        <span className="font-bold line-clamp-3">{blog.title}</span>
        <span className="flex gap-2 text-gray-500">
            <IconRenderer icon='solar:calendar-date-broken' width={24} height={24} />
            <p>{blog.createdAt}</p>
        </span>
        <Link href='' className="btn btn-sm p-0 w-fit btn-link" >Read more</Link>
    </div>
}

export default BlogCard;