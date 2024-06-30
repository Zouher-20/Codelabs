import { blogType } from '@/app/@types/blog';
import IconRenderer from '@/app/components/globals/icon';
import noImage from '@/public/images/no-image2.png';
import Image from 'next/image';
import Link from 'next/link';
import BlogSetting from './blog-setting';
import Favorite from './favorite';

const BlogCard = ({
    blog,
    userID,
    deleted
}: {
    blog: blogType;
    userID: string;
    deleted: (val: boolean) => void;
}) => {
    return (
        <div className="flex h-full w-80 flex-col gap-1" key={blog.id}>
            <div className="relative">
                <Image
                    src={blog.photo ? blog.photo.replace(/\\/g, '/') : noImage}
                    alt=""
                    width={320}
                    height={208}
                    className={' max-h-52 min-h-52 min-w-[320px] rounded-t-3xl'}
                />
            </div>
            <span className="my-2 line-clamp-3 font-bold">{blog.title}</span>
            <span className="flex gap-2 text-gray-500">
                <IconRenderer icon="solar:calendar-date-broken" width={24} height={24} />
                <p>{blog.createdAt?.toLocaleDateString()}</p>
                <Favorite
                    hasStarred={blog.hasStarred}
                    blogId={blog.id}
                    starCount={blog.starCount}
                />
                <div className="ml-auto flex gap-1">
                    <IconRenderer
                        icon={'fa6-solid:street-view'}
                        width={20}
                        height={24}
                        className={' text-warning'}
                    />
                    {blog.viewCount}
                </div>
                {userID == blog.user.id && (
                    <BlogSetting
                        blogID={blog.id}
                        deleted={val => {
                            deleted(val);
                        }}
                    />
                )}
            </span>
            <Link href={`/blogs/${blog.id}`} className="btn btn-link btn-sm w-fit p-0">
                Read more
            </Link>
        </div>
    );
};

export default BlogCard;
