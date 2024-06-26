"use client"
import { blogType } from "@/app/@types/blog";
import { commentType } from "@/app/@types/comment";
import { userType } from "@/app/@types/user";
import { getMyInfo } from "@/app/api/(modules)/auth/service/actions";
import { addBlogComment, deleteMyCommentInBlog, getCommentBlog } from "@/app/api/(modules)/blog/services/action";
import IconRenderer from "@/app/components/globals/icon";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Comments = ({ blog, commentCount }: { blog: blogType, commentCount: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(commentCount);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState<Array<commentType>>([]);
    const [user, setUser] = useState<userType>();
    const route = useRouter();

    useEffect(() => {
        const getInfo = async () => {
            return await getMyInfo()
        }
        getComments().then((res) => {
            setComments(res.comment as any)
        })
        getInfo().then((res) => {
            setUser(res as unknown as userType)
        })
    }, [])
    const getComments = async () => {
        return await getCommentBlog({
            blogId: blog.id,
            page: 1,
            pageSize: 100
        })
    }
    const commentHandler = async (comment: string) => {
        try {
            if (comment != '') {
                await addBlogComment({ blogId: blog.id, comment: comment }).then(() => {
                    getComments().then((res) => {
                        setComments(res.comment as any)
                    })
                    setCount(count + 1)
                    setUserComment('')
                })
                toast.success('You comment added successfully')
            } else toast.error('Empty Comment !')
        } catch (e: any) {
            toast.error(e.message)
        }
    }
    const deleteCommentHandler = async (id: string) => {
        try {
            await deleteMyCommentInBlog({ blogId: blog.id, commentId: id }).then(() => {
                getComments().then((res) => {
                    setComments(res.comment as any)
                })
                setCount(count - 1)
            })
            toast.success('You comment added successfully')
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    function toggleModal() {
        if (document) {
            (document.getElementById('Comments') as HTMLFormElement)?.showModal();
        }
        setIsOpen(!isOpen)
    }
    return <div>
        <span>
            <div className="flex gap-1">
                <IconRenderer
                    icon={'solar:chat-round-broken'}
                    width={24} height={24}
                    className={"cursor-pointer " + (isOpen ? 'text-primary' : '')}
                    onClick={() => { toggleModal() }}
                />
                {count}
            </div>
            <div className="">
                <dialog id="Comments" className="modal ">
                    <div className="flex flex-col gap-4 w-screen sm:w-4/5 md:w-3/5 lg:w-2/5 bg-base-100 h-screen absolute top-0 right-0 p-8">
                        <form method="dialog">
                            <button onClick={() => toggleModal()} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white">✕</button>
                        </form>
                        <h3 className="font-bold text-2xl text-white">Comments</h3>
                        <div>
                            <label className="flex gap-2 justify-between input input-md input-bordered max-w-sm items-center w-full">
                                <input
                                    id="comment"
                                    type='text'
                                    placeholder="What are you thoughts ?"
                                    className=""
                                    value={userComment}
                                    onChange={(e) => setUserComment(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter')
                                            commentHandler(userComment);
                                    }}
                                />
                                <IconRenderer
                                    onClick={() => { commentHandler(userComment) }}
                                    icon={'lets-icons:send-duotone-line'}
                                    width={35}
                                    className="cursor-pointer text-primary"
                                ></IconRenderer>
                            </label>
                        </div>
                        <div className="flex flex-col gap-2 h-full overflow-y-auto">
                            {comments &&
                                comments.map((comment: commentType, index) => (
                                    <div key={index} className="flex gap-2 mb-4">
                                        {comment.user.userImage
                                            ? <img src={comment.user.userImage} alt="user" width={32}
                                                onClick={() => { route.push(`/user-profile/${comment.user.id}`) }}
                                                className="cursor-pointer" />
                                            : <div
                                                onClick={() => { route.push(`/user-profile/${comment.user.id}`) }}
                                                className="cursor-pointer text-sm bg-base-300 p-5 py-4 -mb-2 self-start rounded-full text-white">{comment.user.username.slice(0, 1)}</div>
                                        }
                                        <div className="flex flex-col gap-1 self-center ">
                                            <div className="flex gap-2">
                                                <p
                                                    onClick={() => { route.push(`/user-profile/${comment.user.id}`) }}
                                                    className="cursor-pointer text-sm text-gray-500">{comment.user.username}</p>
                                                {
                                                    comment.user.id == user?.id &&
                                                    <IconRenderer
                                                        icon={'solar:trash-bin-2-bold-duotone'}
                                                        width={20} height={24}
                                                        className={"cursor-pointer text-error"}
                                                        onClick={() => deleteCommentHandler(comment.id)} />
                                                }
                                            </div>
                                            <p className="text-lg text-white pr-2">{comment.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button></button>
                    </form>
                </dialog>
            </div>
        </span>
    </div>
}

export default Comments;