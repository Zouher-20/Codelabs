import toast from "react-hot-toast";
import Favorite from "../components/favorite";
import Comments from "../components/Comments";
import { getDetailsBlog } from "@/app/api/(modules)/blog/services/action";
import Image from "next/image";

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
    const blog = data?.blog;
    return <div className="relative flex flex-col gap-2 mx-auto px-4 py-8 ">
        <h1 className="text-white text-4xl mb-6 font-bold flex gap-2 self-start">{blog?.title}</h1>
        <div className="flex gap-4 mb-6">
            <span className="rounded-full text-center w-14 p-4 bg-black capitalize">
                {blog?.user.userImage
                    ? <Image src={blog?.user.userImage} alt="user" />
                    : blog?.user.username.slice(0, 1)
                }
            </span>
            <span className="flex flex-col gap-1">
                <h2>{blog?.user.username}</h2>
                <p>{blog?.createdAt.toLocaleString()}</p>
            </span>
            {/* <span className="h-fit text-primary cursor-pointer hover:text-[#38a655]">Follow</span> */}
        </div>
        <div className="divider m-0"></div>
        <div className="flex gap-6 text-gray-500 px-4">
            <Favorite count={data?.starCount as number} />
            <Comments />
            <p>Your feedback would be greatly appreciated.</p>
        </div>
        <div className="divider m-0"></div>
        {blog?.photo && <img src={blog.photo} alt="dwwd" className="lg:max-w-[51vw]" />}
        {blog?.contant && <div dangerouslySetInnerHTML={{ __html: blog.contant }} className="lg:max-w-[51vw]"></div>}
    </div>
}

export default ChallengeDetails;