import toast from "react-hot-toast";
import Favorite from "../components/favorite";
import Comments from "../components/Comments";
import { getDetailsBlog } from "@/app/api/(modules)/blog/services/action";
import Image from "next/image";
import Link from "next/link";
import IconRenderer from "@/app/components/globals/icon";

const ChallengeDetails = async ({ params }: { params: { 'id': string } }) => {

    async function getData() {
        try {
            const data = await getDetailsBlog({ blogId: params.id })
            return data
        } catch (e: any) {
            toast.error(e.message)
        }
    }
    const data = await getData();
    if (data?.blog != undefined) {
        const blog = data?.blog
        return <div className="relative flex flex-col gap-2 mx-auto px-4 py-8 ">

            <div className="flex gap-4 -ml-8">
                <Link href="/blogs" className="self-center mb-4 ">
                    <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                </Link>
                <h1 className="text-white text-4xl mb-6 font-bold flex gap-2 slef-center">{blog.title}</h1>
            </div>
            <div className="flex gap-4 mb-6">
                <span className="rounded-full text-center w-14 p-4 bg-black capitalize">
                    {blog.user.userImage
                        ? <Image src={blog?.user.userImage} alt="user" />
                        : blog.user.username.slice(0, 1)
                    }
                </span>
                <span className="flex flex-col gap-1">
                    <h2>{blog.user.username}</h2>
                    <p>{blog.createdAt.toLocaleString()}</p>
                </span>
                {/* <span className="h-fit text-primary cursor-pointer hover:text-[#38a655]">Follow</span> */}
            </div>
            <div className="divider m-0"></div>
            <div className="flex gap-6 text-gray-500 px-4">
                <Favorite hasStarred={data.isStarred} blogId={blog.id} starCount={data.starCount} />
                {blog?.id && <Comments id={blog.id} />}
                <p>Your feedback would be greatly appreciated.</p>
            </div>
            <div className="divider m-0"></div>
            {blog?.photo && <img src={blog.photo} alt="dwwd" className="lg:max-w-[51vw]" />}
            {blog?.contant && <div dangerouslySetInnerHTML={{ __html: blog.contant }} className="lg:max-w-[51vw]"></div>}
        </div>
    }
}
export default ChallengeDetails;