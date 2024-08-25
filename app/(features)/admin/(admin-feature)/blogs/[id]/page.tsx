'use client';
import Comments from '@/app/(features)/(main)/blogs/components/Comments';
import Favorite from '@/app/(features)/(main)/blogs/components/favorite';
import { blogType } from '@/app/@types/blog';
import { userType } from '@/app/@types/user';
import { getMyInfo } from '@/app/api/(modules)/auth/service/actions';
import { getDetailsBlog } from '@/app/api/(modules)/blog/services/action';
import IconRenderer from '@/app/components/globals/icon';
import { ManageState } from '@/app/components/page-state/state_manager';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { blogTableType } from '../components/table/blog-table';
import Image from 'next/image';

const BlogDetails = ({ params }: { params: { id: string } }) => {
    const [blog, setBlog] = useState<blogTableType | null>(null);
    const [blogDetail, setBlogDetail] = useState<any>(null);
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const data = await getDetailsBlog({ blogId: params.id });
                setBlog(data.blog as any);
                setBlogDetail(data)
                const userRes = await getMyInfo();
                setUser(userRes as any);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [params.id]);

    if (blog && user)
        return (
            <ManageState
                loading={loading}
                error={error}
                errorAndEmptyCallback={() => { }}
                empty={false}
                loadedState={
                    <div className="relative mx-auto flex flex-col gap-2 px-4 py-8 ">
                        <div className="flex gap-4 lg:-ml-8">
                            <Link href="/admin/blogs" className="mb-4 self-center ">
                                <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                            </Link>
                            <h1 className="slef-center mb-6 flex gap-2 text-4xl font-bold text-white">
                                {blog?.title}
                            </h1>
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
                                hasStarred={blogDetail?.isStarred ?? false}
                                blogId={blog?.id ?? ''}
                                starCount={blogDetail?.starCount ?? 0}
                            />
                            {blog && (
                                <Comments
                                    blog={blog as unknown as blogType}
                                    commentCount={blogDetail?.commentCount}
                                    user={user}
                                    isAdmin={true}
                                />
                            )}
                            <div className="flex gap-1">
                                <IconRenderer
                                    icon={'fa6-solid:street-view'}
                                    width={20}
                                    height={24}
                                    className={' text-warning'}
                                />
                                {blogDetail.viewCount}
                            </div>
                            <p>Your feedback would be greatly appreciated.</p>
                        </div>
                        <div className="divider m-0"></div>
                        {blog?.photo && <img src={blog.photo} alt="blog" className="lg:max-w-[51vw]" />}
                        {blog?.contant && (
                            <div
                                dangerouslySetInnerHTML={{ __html: blog.contant }}
                                className="lg:max-w-[51vw]"
                            ></div>
                        )}
                    </div>
                }
            />
        );
};

export default BlogDetails;
