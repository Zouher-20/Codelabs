"use client"
import { getCommentBlog } from "@/app/api/(modules)/blog/services/action";
import IconRenderer from "@/app/components/globals/icon";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Comments = ({ id }: { id: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userComment, setUserComment] = useState<string>('');
    const [comment, setComment] = useState<any>()

    const comments = [
        'What kind of nonsense is this',
        'Put me on the Council and not make me a Master!??',
        'Thats never been done in the history of the Jedi.Its insulting!',
        'Calm down, Anakin.',
        'You have been given a great honor.',
        'To be on the Council at your age.',
        'Put me on the Council and not make me a Master!??',
        'Thats never been done in the history of the Jedi.Its insulting!',
        'Put me on the Council and not make me a Master!??',
        'Thats never been done in the history of the Jedi.Its insulting!',
    ]
    useEffect(() => {
        const getComments = async () => {
            return await getCommentBlog({
                blogId: id,
                page: 1,
                pageSize: 100
            })
        }
        getComments().then((res) => console.log('comment', res))
    }, [])

    let dir = 2;

    const commentHandler = async (payload: string) => {
        try {
            // const res = await addCommentBlog(payload)
            toast.success('You comment added successfully')
            setUserComment('')
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
            <IconRenderer
                icon={'solar:chat-round-broken'}
                width={24} height={24}
                className={"cursor-pointer " + (isOpen ? 'text-primary' : '')}
                onClick={() => { toggleModal() }}
            />
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
                            {
                                comments.map((comment, index) => (
                                    <div key={index} className={"chat " + (dir++ % 2 == 0 ? 'chat-start' : 'chat-end')}>
                                        <div className="chat-bubble">{comment}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </dialog>
            </div>
        </span>
    </div>
}

export default Comments;