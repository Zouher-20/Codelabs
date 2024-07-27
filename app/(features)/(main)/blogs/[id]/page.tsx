'use client';
import Comments from '@/app/(features)/(main)/blogs/components/Comments';
import Favorite from '@/app/(features)/(main)/blogs/components/favorite';
import { blogTableType } from '@/app/(features)/admin/(admin-feature)/blogs/components/table/blog-table';
import { blogType } from '@/app/@types/blog';
import { userType } from '@/app/@types/user';
import { getMyInfo } from '@/app/api/(modules)/auth/service/actions';
import { getDetailsBlog } from '@/app/api/(modules)/blog/services/action';
import { addReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import IconRenderer from '@/app/components/globals/icon';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { SwalUtil } from '@/app/utils/swal-util';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const BlogDetails = ({ params }: { params: { id: string } }) => {
    const [blog, setBlog] = useState<blogTableType | null>(null);
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const data = await getDetailsBlog({ blogId: params.id });
                setBlog({
                    commentCount: data.commentCount ?? 0,
                    contant: data.blog.contant ?? '',
                    createdAt: new Date(data.blog.createdAt),
                    id: data.blog.id,
                    photo: data.blog.photo ?? '',
                    starCount: data.starCount,
                    title: data.blog.title ?? '',
                    user: {
                        email: data.blog.user.email,
                        id: data.blog.user.id,
                        userImage: data.blog.user.userImage,
                        username: data.blog.user.username
                    },
                    userId: data.blog.userId,
                    isStarred: data.isStarred
                });
                const userRes = await getMyInfo();
                setUser(userRes as unknown as userType);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [params.id]);
    const reportBlog = async (message: string) => {
        try {
            const res = await addReport({
                blogId: params.id,
                messageReport: message,
                reportType: ReportType.BLOG
            });
            toast.success(res);
        } catch (err: any) {
            toast.error(err.message);
        }
    };
    return (
        <ManageState
            loading={loading}
            error={error}
            errorAndEmptyCallback={() => {}}
            empty={false}
            loadedState={
                <div className="relative mx-auto flex flex-col gap-2 px-4 py-8 ">
                    <div className="flex justify-between gap-4 lg:-ml-8">
                        <div className="flex">
                            <Link href="/blogs" className="mb-4 self-center ">
                                <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                            </Link>
                            <h1 className="slef-center mb-6 flex gap-2 text-4xl font-bold text-white">
                                {blog?.title}
                            </h1>
                        </div>
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
                                <li
                                    onClick={() => {
                                        SwalUtil.showReportModalWithTextArea(value => {
                                            reportBlog(value);
                                        });
                                    }}
                                >
                                    <div className="text-red-500">
                                        <Icon
                                            icon="solar:masks-bold-duotone"
                                            className="size-8 text-red-500"
                                        />
                                        Report Blog
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {blog?.user.userImage ? (
                            <Image
                                src={blog?.user.userImage.replace(/\\/g, '/')}
                                alt="user"
                                width={56}
                                height={56}
                                className="h-24 w-24 rounded-full bg-cover"
                            />
                        ) : (
                            <Link
                                href={
                                    user?.id == blog?.user.id
                                        ? '/profile'
                                        : `/user-profile/${blog?.user.id}`
                                }
                                className="w-14 cursor-pointer rounded-full bg-black p-4 text-center capitalize"
                            >
                                {blog?.user.username.slice(0, 1)}
                            </Link>
                        )}
                        <span className="flex flex-col gap-1">
                            <Link
                                href={
                                    user?.id == blog?.user.id
                                        ? '/profile'
                                        : `/user-profile/${blog?.user.id}`
                                }
                                className="cursor-pointer"
                            >
                                {blog?.user.username}
                            </Link>
                            <p>{blog?.createdAt.toLocaleString()}</p>
                        </span>
                    </div>
                    <div className="divider m-0"></div>
                    <div className="flex gap-6 px-4 text-gray-500">
                        <Favorite
                            hasStarred={blog?.isStarred ?? false}
                            blogId={blog?.id ?? ''}
                            starCount={blog?.starCount ?? 0}
                        />
                        {blog && (
                            <Comments
                                blog={blog as unknown as blogType}
                                commentCount={blog?.commentCount}
                                user={user}
                                isAdmin={false}
                            />
                        )}
                        <p>Your feedback would be greatly appreciated.</p>
                    </div>
                    <div className="divider m-0"></div>
                    {blog?.photo && (
                        <img src={blog.photo} alt="blog" className="mx-auto lg:max-w-[51vw]" />
                    )}
                    {blog?.contant && (
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.contant }}
                            className="mx-auto lg:max-w-[51vw]"
                        ></div>
                    )}
                    <CustomToaster />
                </div>
            }
        />
    );
};

export default BlogDetails;
