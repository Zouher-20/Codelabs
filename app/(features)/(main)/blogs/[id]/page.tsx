import toast from "react-hot-toast";
import Favorite from "../components/favorite";
import Comments from "../components/Comments";
import { getDetailsBlog } from "@/app/api/(modules)/blog/services/action";
import Image from "next/image";
import Link from "next/link";
import IconRenderer from "@/app/components/globals/icon";
import { blogType } from "@/app/@types/blog";
import { CustomToaster } from "@/app/components/toast/custom-toaster";
import { getMyInfo } from "@/app/api/(modules)/auth/service/actions";

const ChallengeDetails = async ({ params }: { params: { 'id': string } }) => {

    async function getData() {
        try {
            const data = await getDetailsBlog({ blogId: params.id })
            const user = await getMyInfo()
            return { data: data, user: user }
        } catch (e: any) {
            toast.error(e.message)
        }
    }
    const data = await getData().then((res) => res?.data);
    const user = await getData().then((res) => res?.user);
    if (data?.blog != undefined && user) {
        const blog = data?.blog
        return <div className="relative flex flex-col gap-2 mx-auto px-4 py-8 ">

            <div className="flex gap-4 lg:-ml-8">
                <Link href="/blogs" className="self-center mb-4 ">
                    <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                </Link>
                <h1 className="text-white text-4xl mb-6 font-bold flex gap-2 slef-center">{blog.title}</h1>
            </div>
            <div className="flex gap-4 mb-6">
                <Link
                    href={(user.id == blog.user.id) ? '/profile' : `/user-profile/${blog.user.id}`}
                    className="cursor-pointer rounded-full text-center w-14 p-4 bg-black capitalize">
                    {blog.user.userImage
                        ? <Image src={blog?.user.userImage} alt="user" />
                        : blog.user.username.slice(0, 1)
                    }
                </Link>
                <span className="flex flex-col gap-1">
                    <Link
                        href={(user?.id == blog.user.id) ? '/profile' : `/user-profile/${blog.user.id}`}
                        className="cursor-pointer"
                    >{blog.user.username}</Link>
                    <p>{blog.createdAt.toLocaleString()}</p>
                </span>
            </div>
            <div className="divider m-0"></div>
            <div className="flex gap-6 text-gray-500 px-4">
                <Favorite hasStarred={data.isStarred} blogId={blog.id} starCount={data.starCount} />
                {blog && <Comments blog={blog as unknown as blogType} commentCount={data.commentCount} />}
                <p>Your feedback would be greatly appreciated.</p>
            </div>
            <div className="divider m-0"></div>
            {blog?.photo && <img src={blog.photo} alt="dwwd" className="lg:max-w-[51vw]" />}
            {blog?.contant && <div dangerouslySetInnerHTML={{ __html: blog.contant }} className="lg:max-w-[51vw]"></div>}
            <CustomToaster pos={true} />
        </div>
    }
}
export default ChallengeDetails;