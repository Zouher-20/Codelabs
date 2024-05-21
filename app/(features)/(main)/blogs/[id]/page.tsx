import toast from "react-hot-toast";
import Favorite from "../components/favorite";
import Comments from "../components/Comments";

const ChallengeDetails = async ({ params }: { params: { 'id': string } }) => {

    async function getData() {
        try {
            // const data = await getBlogById(param.id)
            // return data
        } catch (e: any) {
            toast.error(e.message)
        }
    }
    const blog = await getData();

    return <div className="relative flex flex-col gap-2 mx-auto py-8 ">
        {/* <h1>{blog.title}</h1> */}
        <h1 className="text-white text-4xl mb-6 font-bold flex gap-2">React Conf 2024. React v19 RC</h1>
        <div className="flex gap-4 mb-6">
            {/* <h1>{blog.user}</h1> */}
            <span className="rounded-full text-center w-14 p-4 bg-black">A</span>
            <span className="flex flex-col gap-1">
                <h2>Alexander Savelyev</h2>
                <p>3 days ago</p>
            </span>
            <span className="h-fit text-primary cursor-pointer hover:text-[#38a655]">Follow</span>
        </div>
        <div className="divider m-0"></div>
        <div className="flex gap-4 text-gray-500">
            <Favorite count={15} />
            <Comments />
            <p className="ml-auto">Your feedback would be greatly appreciated.</p>
        </div>
        <div className="divider m-0"></div>
        {/* <div>{blog.photo}</div>
        <div>{blog.content}</div> */}
    </div>
}

export default ChallengeDetails;