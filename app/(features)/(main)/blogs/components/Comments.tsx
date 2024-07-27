'use client';
import { blogType } from '@/app/@types/blog';
import { commentType } from '@/app/@types/comment';
import { userType } from '@/app/@types/user';
import {
    addBlogComment,
    deleteMyCommentInBlog,
    getCommentBlog
} from '@/app/api/(modules)/blog/services/action';
import { addReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import IconRenderer from '@/app/components/globals/icon';
import { SwalUtil } from '@/app/utils/swal-util';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Comments = ({
    blog,
    commentCount,
    user,
    isAdmin
}: {
    blog: blogType;
    commentCount: number;
    isAdmin: boolean;
    user: userType | null;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(commentCount);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState<Array<commentType>>([]);
    const route = useRouter();

    useEffect(() => {
        getComments().then(res => {
            setComments(res.comment as any);
        });
    }, []);
    const getComments = async () => {
        return await getCommentBlog({
            blogId: blog.id,
            page: 1,
            pageSize: 100
        });
    };
    const commentHandler = async (comment: string) => {
        try {
            if (comment != '') {
                await addBlogComment({ blogId: blog.id, comment: comment }).then(() => {
                    getComments().then(res => {
                        setComments(res.comment as any);
                    });
                    setCount(count + 1);
                    setUserComment('');
                });
                toast.success('You comment added successfully');
            } else toast.error('Empty Comment !');
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    const deleteCommentHandler = async (id: string) => {
        try {
            await deleteMyCommentInBlog({ blogId: blog.id, commentId: id }).then(() => {
                getComments().then(res => {
                    setComments(res.comment as any);
                });
                setCount(count - 1);
            });
            toast.success('You comment added successfully');
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    function toggleModal() {
        if (document) {
            (document.getElementById('Comments') as HTMLFormElement)?.showModal();
        }
        setIsOpen(!isOpen);
    }
    const reportComment = async ({ message, id }: { message: string; id: string }) => {
        try {
            const res = await addReport({
                commentBlogId: id,
                messageReport: message,
                reportType: ReportType.COMMENT_BLOG
            });
            toast.success(res);
        } catch (err: any) {
            toast.error(err.message);
        }
    };
    return (
        <div>
            <span>
                <div className="flex gap-1">
                    <IconRenderer
                        icon={'solar:chat-round-broken'}
                        width={24}
                        height={24}
                        className={'cursor-pointer ' + (isOpen ? 'text-primary' : '')}
                        onClick={() => {
                            toggleModal();
                        }}
                    />
                    {count}
                </div>
                <div className="">
                    <dialog id="Comments" className="modal ">
                        <div className="absolute right-0 top-0 flex h-screen w-screen flex-col gap-4 bg-base-100 p-8 sm:w-4/5 md:w-3/5 lg:w-2/5">
                            <form method="dialog">
                                <button
                                    onClick={() => toggleModal()}
                                    className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4 text-white"
                                >
                                    ✕
                                </button>
                            </form>
                            <h3 className="text-2xl font-bold text-white">Comments</h3>
                            <div>
                                <label className="input input-md input-bordered flex w-full max-w-sm items-center justify-between gap-2">
                                    <input
                                        id="comment"
                                        type="text"
                                        placeholder="What are you thoughts ?"
                                        className=""
                                        value={userComment}
                                        onChange={e => setUserComment(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') commentHandler(userComment);
                                        }}
                                    />
                                    <IconRenderer
                                        onClick={() => {
                                            commentHandler(userComment);
                                        }}
                                        icon={'lets-icons:send-duotone-line'}
                                        width={35}
                                        className="cursor-pointer text-primary"
                                    ></IconRenderer>
                                </label>
                            </div>
                            <div className="flex h-full flex-col gap-2 overflow-y-auto">
                                {comments &&
                                    comments.map((comment: commentType, index) => (
                                        <div key={index} className="mb-4 flex gap-2">
                                            {comment.user.userImage ? (
                                                <img
                                                    src={comment.user.userImage}
                                                    alt="user"
                                                    width={60}
                                                    onClick={() => {
                                                        route.push(
                                                            `/user-profile/${comment.user.id}`
                                                        );
                                                    }}
                                                    className="cursor-pointer rounded"
                                                />
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        route.push(
                                                            `/user-profile/${comment.user.id}`
                                                        );
                                                    }}
                                                    className="-mb-2 cursor-pointer self-start rounded-full bg-base-300 p-5 py-4 text-sm text-white"
                                                >
                                                    {comment.user.username.slice(0, 1)}
                                                </div>
                                            )}
                                            <div className="flex w-full flex-col gap-1 self-center">
                                                <div className="flex w-full justify-between gap-2">
                                                    <p
                                                        onClick={() => {
                                                            route.push(
                                                                `/user-profile/${comment.user.id}`
                                                            );
                                                        }}
                                                        className="cursor-pointer text-sm text-gray-500"
                                                    >
                                                        {comment.user.username}
                                                    </p>
                                                    <div className="dropdown dropdown-left">
                                                        <div
                                                            tabIndex={0}
                                                            role="button"
                                                            className="flex cursor-pointer items-center gap-2 rounded-btn hover:opacity-85"
                                                        >
                                                            <Icon
                                                                icon="solar:menu-dots-bold-duotone"
                                                                className="size-10 text-primary"
                                                            />
                                                        </div>

                                                        <ul
                                                            tabIndex={0}
                                                            className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow"
                                                        >
                                                            {(comment.user.id == user?.id ||
                                                                isAdmin) && (
                                                                <li
                                                                    onClick={() => {
                                                                        if (document) {
                                                                            (
                                                                                document.getElementById(
                                                                                    'Comments'
                                                                                ) as HTMLFormElement
                                                                            )?.close();
                                                                        }
                                                                        SwalUtil.showConfirm(() => {
                                                                            deleteCommentHandler(
                                                                                comment.id
                                                                            );
                                                                        });
                                                                    }}
                                                                >
                                                                    <div className="text-red-500">
                                                                        <Icon
                                                                            icon="solar:trash-bin-2-bold-duotone"
                                                                            className="size-8 text-red-500"
                                                                        />
                                                                        Delete Comment
                                                                    </div>
                                                                </li>
                                                            )}
                                                            <li
                                                                onClick={() => {
                                                                    if (document) {
                                                                        (
                                                                            document.getElementById(
                                                                                'Comments'
                                                                            ) as HTMLFormElement
                                                                        )?.close();
                                                                    }
                                                                    SwalUtil.showReportModalWithTextArea(
                                                                        value => {
                                                                            reportComment({
                                                                                id: comment.id,
                                                                                message: value
                                                                            });
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <div className="text-red-500">
                                                                    <Icon
                                                                        icon="solar:masks-bold-duotone"
                                                                        className="size-8 text-red-500"
                                                                    />
                                                                    Report Comment
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p className="pr-2 text-lg text-white">
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button></button>
                        </form>
                    </dialog>
                </div>
            </span>
        </div>
    );
};

export default Comments;
