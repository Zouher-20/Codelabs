import { deleteMyBlog } from "@/app/api/(modules)/blog/services/action";
import IconRenderer from "@/app/components/globals/icon";
import DeleteBlogModal from "@/app/components/modals/delete-blog-modal";
import Link from "next/link";
import toast from "react-hot-toast";

const BlogSetting = ({ blogID, deleted }: { blogID: string, deleted: (val: boolean) => void }) => {

    const HandleDelete = async (blogID: string) => {
        try {
            await deleteMyBlog({ blogId: blogID })
            toast.success('Blog delete successfully')
            deleted(true)
        } catch (e: any) {
            deleted(false)
            toast.error(e.message)
        }
    }
    const ToggleModal = () => {
        if (document) {
            (document.getElementById(`delete-blog-modal${blogID}`) as HTMLFormElement)?.showModal();
        }
    }
    return <div className="dropdown dropdown-end">
        <IconRenderer tabIndex={0} role="button" icon='solar:menu-dots-circle-broken' width={24} height={24} className=" cursor-pointer text-primary" />
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><Link href={`/blogs/edit-blog/${blogID}`} className="flex">
                <p className="mr-auto text-primary">Update</p>
                <IconRenderer icon={'solar:gallery-edit-line-duotone'} width={20} height={24} className={"cursor-pointer text-primary"} />
            </Link></li>
            <li
                onClick={ToggleModal}
            ><a className="flex">
                    <p className="mr-auto text-error">Delete</p>
                    <IconRenderer icon={'solar:trash-bin-2-bold-duotone'} width={20} height={24} className={"cursor-pointer text-error"} />
                </a></li>
        </ul>
        <DeleteBlogModal onDelete={() => { HandleDelete(blogID) }} index={blogID} />
    </div>
}

export default BlogSetting;