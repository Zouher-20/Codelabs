import Image from "next/image";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";
import react from '@/public/images/blogs/react.jpg';
import reactWorld from '@/public/images/blogs/react-world.webp';

const BlogCard = ({ blog }: { blog: { id: number, title: string, createdAt: string, description: string } }) => {
    return <div className="w-80 h-full flex flex-col gap-2">
        <Image src={reactWorld} alt="" className=" w-80 h-52 rounded-t-3xl" />
        <span className="font-bold ">{blog.title}</span>
        <span className="flex gap-2 text-gray-500">
            <IconRenderer icon='solar:calendar-date-broken' width={24} height={24} />
            <p>{blog.createdAt}</p>
        </span>
        <Link href='' className="btn btn-sm p-0 w-fit btn-link" >Read more</Link>
    </div>
}

export default BlogCard;